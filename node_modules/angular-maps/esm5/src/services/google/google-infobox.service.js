/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoBoxService } from '../infobox.service';
import { MarkerService } from '../marker.service';
import { MapService } from '../map.service';
import { GoogleMapEventsLookup } from '../../models/google/google-events-lookup';
var GoogleInfoBoxService = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleInfoBoxService, _super);
    ///
    /// Constructors
    ///
    /**
     * Creates an instance of GoogleInfoBoxService.
     * @param _mapService
     * @param _markerService
     * @param _zone
     *
     * @memberof GoogleInfoBoxService
     */
    function GoogleInfoBoxService(_mapService, _markerService, _zone) {
        var _this = _super.call(this) || this;
        _this._mapService = _mapService;
        _this._markerService = _markerService;
        _this._zone = _zone;
        _this._boxes = new Map();
        return _this;
    }
    /**
     * Creates a new instance of an info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.AddInfoWindow = /**
     * Creates a new instance of an info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    function (info) {
        var /** @type {?} */ options = {};
        if (info.HtmlContent !== '') {
            options.htmlContent = info.HtmlContent;
        }
        else {
            options.title = info.Title;
            options.description = info.Description;
        }
        if (info.xOffset || info.yOffset) {
            if (options.pixelOffset == null) {
                options.pixelOffset = { x: 0, y: 0 };
            }
            if (info.xOffset) {
                options.pixelOffset.x = info.xOffset;
            }
            if (info.yOffset) {
                options.pixelOffset.y = info.yOffset;
            }
        }
        options.disableAutoPan = info.DisableAutoPan;
        options.visible = info.Visible;
        if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
            options.position = { latitude: info.Latitude, longitude: info.Longitude };
        }
        var /** @type {?} */ infoWindowPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoWindowPromise);
    };
    /**
     * Closes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @return {?} -  A promise that is resolved when the info box is closed.
     *
     */
    GoogleInfoBoxService.prototype.Close = /**
     * Closes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @return {?} -  A promise that is resolved when the info box is closed.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (w) {
            w.Close();
        });
    };
    /**
     * Registers an event delegate for an info window.
     *
     * \@memberof GoogleInfoBoxService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    GoogleInfoBoxService.prototype.CreateEventObservable = /**
     * Registers an event delegate for an info window.
     *
     * \@memberof GoogleInfoBoxService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, infoComponent) {
        var _this = this;
        var /** @type {?} */ googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._boxes.get(infoComponent).then(function (b) {
                b.AddListener(googleEventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.DeleteInfoWindow = /**
     * Deletes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    function (info) {
        return Promise.resolve();
    };
    /**
     * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?=} loc
     * @return {?}
     */
    GoogleInfoBoxService.prototype.Open = /**
     * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?=} loc
     * @return {?}
     */
    function (info, loc) {
        var _this = this;
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes
            this._boxes.forEach(function (box, i) {
                if (info.Id !== i.Id) {
                    box.then(function (w) {
                        if (w.IsOpen) {
                            w.Close();
                            i.Close();
                        }
                    });
                }
            });
        }
        return this._boxes.get(info).then(function (w) {
            var /** @type {?} */ options = {};
            if (info.HtmlContent !== '') {
                options.htmlContent = info.HtmlContent;
            }
            else {
                options.title = info.Title;
                options.description = info.Description;
            }
            w.SetOptions(options);
            if (info.HostMarker != null) {
                return _this._markerService.GetNativeMarker(info.HostMarker).then(function (marker) {
                    return _this._mapService.MapPromise.then(function (map) { return (/** @type {?} */ (w)).Open((/** @type {?} */ (marker)).NativePrimitve); });
                });
            }
            return _this._mapService.MapPromise.then(function (map) {
                if (loc) {
                    w.SetPosition(loc);
                }
                w.Open();
            });
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} options
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.SetOptions = /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} options
     *
     * @return {?}
     */
    function (info, options) {
        return this._boxes.get(info).then(function (w) {
            w.SetOptions(options);
        });
    };
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} latlng
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.SetPosition = /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} latlng
     *
     * @return {?}
     */
    function (info, latlng) {
        this._boxes.get(info).then(function (w) {
            w.SetPosition(latlng);
        });
        return Promise.resolve();
    };
    GoogleInfoBoxService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleInfoBoxService.ctorParameters = function () { return [
        { type: MapService },
        { type: MarkerService },
        { type: NgZone }
    ]; };
    return GoogleInfoBoxService;
}(InfoBoxService));
export { GoogleInfoBoxService };
function GoogleInfoBoxService_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleInfoBoxService.prototype._boxes;
    /** @type {?} */
    GoogleInfoBoxService.prototype._mapService;
    /** @type {?} */
    GoogleInfoBoxService.prototype._markerService;
    /** @type {?} */
    GoogleInfoBoxService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm9ib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0lBR3ZDLGdEQUFjO0lBUXBELEdBQUc7SUFDSCxnQkFBZ0I7SUFDaEIsR0FBRztJQUVIOzs7Ozs7O09BT0c7SUFDSCw4QkFBb0IsV0FBdUIsRUFDL0IsZ0JBQ0E7UUFGWixZQUdJLGlCQUFPLFNBQ1Y7UUFKbUIsaUJBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isb0JBQWMsR0FBZCxjQUFjO1FBQ2QsV0FBSyxHQUFMLEtBQUs7dUJBaEI0QyxJQUFJLEdBQUcsRUFBK0M7O0tBa0JsSDs7Ozs7Ozs7O0lBU00sNENBQWE7Ozs7Ozs7O2NBQUMsSUFBc0I7UUFDdkMscUJBQU0sT0FBTyxHQUF1QixFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lB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LENBQUMsY0FBYyxDQUFDLEVBQWpFLENBQWlFLENBQUMsQ0FBQztpQkFDdkgsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDeEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0EseUNBQVU7Ozs7Ozs7OztjQUFDLElBQXNCLEVBQUUsT0FBMkI7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQW1CO1lBQ2xELENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVdBLDBDQUFXOzs7Ozs7Ozs7Y0FBQyxJQUFzQixFQUFFLE1BQWdCO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Z0JBM0toQyxVQUFVOzs7O2dCQU5GLFVBQVU7Z0JBRFYsYUFBYTtnQkFORCxNQUFNOzsrQkFBM0I7RUFjMEMsY0FBYztTQUEzQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5mb0JveENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5mb2JveCc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBHb29nbGVJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXInO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1ldmVudHMtbG9va3VwJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZUluZm9Cb3hTZXJ2aWNlIGV4dGVuZHMgSW5mb0JveFNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgcHJpdmF0ZSBfYm94ZXM6IE1hcDxJbmZvQm94Q29tcG9uZW50LCBQcm9taXNlPEluZm9XaW5kb3c+PiA9IG5ldyBNYXA8SW5mb0JveENvbXBvbmVudCwgUHJvbWlzZTxHb29nbGVJbmZvV2luZG93Pj4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvcnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVJbmZvQm94U2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZVxyXG4gICAgICogQHBhcmFtIF9tYXJrZXJTZXJ2aWNlXHJcbiAgICAgKiBAcGFyYW0gX3pvbmVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGFuIGluZm8gd2luZG93XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEluZm9XaW5kb3coaW5mbzogSW5mb0JveENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGlmIChpbmZvLkh0bWxDb250ZW50ICE9PSAnJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmh0bWxDb250ZW50ID0gaW5mby5IdG1sQ29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPSBpbmZvLlRpdGxlO1xyXG4gICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZm8ueE9mZnNldCB8fCBpbmZvLnlPZmZzZXQpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGl4ZWxPZmZzZXQgPT0gbnVsbCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07IH1cclxuICAgICAgICAgICAgaWYgKGluZm8ueE9mZnNldCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0LnggPSBpbmZvLnhPZmZzZXQ7IH1cclxuICAgICAgICAgICAgaWYgKGluZm8ueU9mZnNldCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0LnkgPSBpbmZvLnlPZmZzZXQ7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9ucy5kaXNhYmxlQXV0b1BhbiA9IGluZm8uRGlzYWJsZUF1dG9QYW47XHJcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gaW5mby5WaXNpYmxlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGluZm8uTGF0aXR1ZGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBpbmZvLkxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHsgbGF0aXR1ZGU6IGluZm8uTGF0aXR1ZGUsIGxvbmdpdHVkZTogaW5mby5Mb25naXR1ZGUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW5mb1dpbmRvd1Byb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fYm94ZXMuc2V0KGluZm8sIGluZm9XaW5kb3dQcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHJldHVybnMgLSAgQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgaW5mbyBib3ggaXMgY2xvc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ2xvc2UoaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbih3ID0+IHtcclxuICAgICAgICAgICAgdy5DbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhbiBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcGFyYW0gaW5mb0NvbXBvbmVudCAtIFRoZSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGluZm9Db21wb25lbnQ6IEluZm9Cb3hDb21wb25lbnQpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBnb29nbGVFdmVudE5hbWU6IHN0cmluZyA9IEdvb2dsZU1hcEV2ZW50c0xvb2t1cFtldmVudE5hbWVdO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JveGVzLmdldChpbmZvQ29tcG9uZW50KS50aGVuKChiOiBJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiLkFkZExpc3RlbmVyKGdvb2dsZUV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBpbmZvIHdpbmRvd1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuIFdpbmRvdyBvcGVucyBvbiBhIG1hcmtlciwgaWYgc3VwcGxpZWQsIG9yIGEgc3BlY2lmaWMgbG9jYXRpb24gaWYgZ2l2ZW5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHBhcmFtIFtsb2NdXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPcGVuKGluZm86IEluZm9Cb3hDb21wb25lbnQsIGxvYz86IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGluZm8uQ2xvc2VJbmZvQm94ZXNPbk9wZW4gfHwgaW5mby5Nb2RhbCkge1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBhbGwgb3BlbiBpbmZvIGJveGVzXHJcbiAgICAgICAgICAgIHRoaXMuX2JveGVzLmZvckVhY2goKGJveDogUHJvbWlzZTxJbmZvV2luZG93PiwgaTogSW5mb0JveENvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSWQgIT09IGkuSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3gudGhlbigodykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAody5Jc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3OiBHb29nbGVJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3LlNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLkhvc3RNYXJrZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuR2V0TmF0aXZlTWFya2VyKGluZm8uSG9zdE1hcmtlcikudGhlbigobWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZS50aGVuKChtYXApID0+ICg8R29vZ2xlSW5mb1dpbmRvdz53KS5PcGVuKCg8R29vZ2xlTWFya2VyPm1hcmtlcikuTmF0aXZlUHJpbWl0dmUpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobWFwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jKSB7IHcuU2V0UG9zaXRpb24obG9jKTsgfVxyXG4gICAgICAgICAgICAgICAgdy5PcGVuKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm94ZXMuZ2V0KGluZm8pLnRoZW4oKHc6IEdvb2dsZUluZm9XaW5kb3cpID0+IHtcclxuICAgICAgICAgICAgdy5TZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHBhcmFtIGxhdGxuZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbGF0bG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3KSA9PiB7XHJcbiAgICAgICAgICAgIHcuU2V0UG9zaXRpb24obGF0bG5nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==