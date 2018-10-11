/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map.service';
import { BingMapEventsLookup } from '../../models/bing/bing-events-lookup';
/**
 * Concrete implementation of the {\@link InfoBoxService} contract for the Bing Maps V8 architecture.
 *
 * @export
 */
var BingInfoBoxService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingInfoBoxService.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     * @param _zone - An instance of NgZone to provide zone aware promises.
     *
     * @memberof BingInfoBoxService
     */
    function BingInfoBoxService(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._boxes = new Map();
    }
    /**
     * Adds an info window to the map or layer.
     *
     * \@memberof BingInfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    BingInfoBoxService.prototype.AddInfoWindow = /**
     * Adds an info window to the map or layer.
     *
     * \@memberof BingInfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    function (info) {
        var /** @type {?} */ options = {};
        if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
            options.position = {
                latitude: info.Latitude,
                longitude: info.Longitude
            };
        }
        if (typeof info.InfoWindowActions !== 'undefined' && info.InfoWindowActions.length > 0) {
            options.actions = [];
            info.InfoWindowActions.forEach(function (action) {
                options.actions.push({
                    label: action.Label,
                    eventHandler: function () { action.ActionClicked.emit(null); }
                });
            });
        }
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
        options.visible = info.Visible;
        var /** @type {?} */ infoPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoPromise);
    };
    /**
     * Closes an InfoBoxComponent that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    BingInfoBoxService.prototype.Close = /**
     * Closes an InfoBoxComponent that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (w) { return w.Close(); });
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
    BingInfoBoxService.prototype.CreateEventObservable = /**
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
        var /** @type {?} */ eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._boxes.get(infoComponent).then(function (b) {
                b.AddListener(eventNameTranslated, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    BingInfoBoxService.prototype.DeleteInfoWindow = /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    function (info) {
        var _this = this;
        var /** @type {?} */ w = this._boxes.get(info);
        if (w == null) {
            return Promise.resolve();
        }
        return w.then(function (i) {
            return _this._zone.run(function () {
                i.Close();
                _this._boxes.delete(info);
            });
        });
    };
    /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    BingInfoBoxService.prototype.Open = /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    function (info, loc) {
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes.
            this._boxes.forEach(function (v, i) {
                if (info.Id !== i.Id) {
                    v.then(function (w) {
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
            if (info.Latitude && info.Longitude) {
                w.SetPosition({ latitude: info.Latitude, longitude: info.Longitude });
            }
            else if (loc) {
                w.SetPosition(loc);
            }
            else if (info.HostMarker) {
                w.SetPosition({ latitude: info.HostMarker.Latitude, longitude: info.HostMarker.Longitude });
            }
            w.Open();
        });
    };
    /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    BingInfoBoxService.prototype.SetOptions = /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    function (info, options) {
        return this._boxes.get(info).then(function (i) { return i.SetOptions(options); });
    };
    /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    BingInfoBoxService.prototype.SetPosition = /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (i) { return i.SetPosition({
            latitude: info.Latitude,
            longitude: info.Longitude
        }); });
    };
    BingInfoBoxService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingInfoBoxService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingInfoBoxService;
}());
export { BingInfoBoxService };
function BingInfoBoxService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingInfoBoxService.prototype._boxes;
    /** @type {?} */
    BingInfoBoxService.prototype._mapService;
    /** @type {?} */
    BingInfoBoxService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQU01QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7SUFjdkUsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsNEJBQW9CLFdBQXVCLEVBQVUsS0FBYTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7c0JBYkwsSUFBSSxHQUFHLEVBQXlDO0tBYXRDOzs7Ozs7Ozs7SUFTaEUsMENBQWE7Ozs7Ozs7O2NBQUMsSUFBc0I7UUFDdkMscUJBQU0sT0FBTyxHQUF1QixFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxRSxPQUFPLENBQUMsUUFBUSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzVCLENBQUM7U0FDTDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTyxD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QUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXpFLHdDQUFXOzs7Ozs7Ozs7Y0FBQyxJQUFzQjtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBYSxJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUMvRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUMsRUFIbUQsQ0FHbkQsQ0FBQyxDQUFDOzs7Z0JBak1YLFVBQVU7Ozs7Z0JBWEYsVUFBVTtnQkFQRSxNQUFNOzs2QkFBM0I7O1NBbUJhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZm9ib3gtYWN0aW9uJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9pbmZvYm94LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmZvYm94JztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nTWFwRXZlbnRzTG9va3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1ldmVudHMtbG9va3VwJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfSBjb250cmFjdCBmb3IgdGhlIEJpbmcgTWFwcyBWOCBhcmNoaXRlY3R1cmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdJbmZvQm94U2VydmljZSBpbXBsZW1lbnRzIEluZm9Cb3hTZXJ2aWNlIHtcclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9ib3hlczogTWFwPEluZm9Cb3hDb21wb25lbnQsIFByb21pc2U8SW5mb1dpbmRvdz4+ID0gbmV3IE1hcDxJbmZvQm94Q29tcG9uZW50LCBQcm9taXNlPEluZm9XaW5kb3c+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ0luZm9Cb3hTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JldGUge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciBCaW5nIE1hcHMgVjguIEFuIGluc3RhbmNlIG9mIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBBbiBpbnN0YW5jZSBvZiBOZ1pvbmUgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gaW5mbyB3aW5kb3cgdG8gdGhlIG1hcCBvciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMgPSB7fTtcclxuICAgICAgICBpZiAodHlwZW9mIGluZm8uTGF0aXR1ZGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBpbmZvLkxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBpbmZvLkxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBpbmZvLkxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGluZm8uSW5mb1dpbmRvd0FjdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIGluZm8uSW5mb1dpbmRvd0FjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmFjdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgaW5mby5JbmZvV2luZG93QWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUpID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYWN0aW9uLkxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcjogKCkgPT4geyBhY3Rpb24uQWN0aW9uQ2xpY2tlZC5lbWl0KG51bGwpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmZvLkh0bWxDb250ZW50ICE9PSAnJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmh0bWxDb250ZW50ID0gaW5mby5IdG1sQ29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPSBpbmZvLlRpdGxlO1xyXG4gICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZm8ueE9mZnNldCB8fCBpbmZvLnlPZmZzZXQpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGl4ZWxPZmZzZXQgPT0gbnVsbCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07IH1cclxuICAgICAgICAgICAgaWYgKGluZm8ueE9mZnNldCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0LnggPSBpbmZvLnhPZmZzZXQ7IH1cclxuICAgICAgICAgICAgaWYgKGluZm8ueU9mZnNldCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0LnkgPSBpbmZvLnlPZmZzZXQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmlzaWJsZSA9IGluZm8uVmlzaWJsZTtcclxuICAgICAgICBjb25zdCBpbmZvUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9ib3hlcy5zZXQoaW5mbywgaW5mb1Byb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGFuIEluZm9Cb3hDb21wb25lbnQgdGhhdCBpcyBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBoYXMgYmVlbiBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDbG9zZShpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3KSA9PiB3LkNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhbiBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcGFyYW0gaW5mb0NvbXBvbmVudCAtIFRoZSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGluZm9Db21wb25lbnQ6IEluZm9Cb3hDb21wb25lbnQpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBldmVudE5hbWVUcmFuc2xhdGVkID0gQmluZ01hcEV2ZW50c0xvb2t1cFtldmVudE5hbWVdO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JveGVzLmdldChpbmZvQ29tcG9uZW50KS50aGVuKChiOiBJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiLkFkZExpc3RlbmVyKGV2ZW50TmFtZVRyYW5zbGF0ZWQsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhbiBpbmZvYm94LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBoYXMgYmVlbiBkZWxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlSW5mb1dpbmRvdyhpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdyA9IHRoaXMuX2JveGVzLmdldChpbmZvKTtcclxuICAgICAgICBpZiAodyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHcudGhlbigoaTogSW5mb1dpbmRvdykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaS5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm94ZXMuZGVsZXRlKGluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGFuIGluZm9ib3ggdGhhdCBpcyBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIG9wZW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9wZW4oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbG9jPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoaW5mby5DbG9zZUluZm9Cb3hlc09uT3BlbiB8fCBpbmZvLk1vZGFsKSB7XHJcbiAgICAgICAgICAgIC8vIGNsb3NlIGFsbCBvcGVuIGluZm8gYm94ZXMuXHJcbiAgICAgICAgICAgIHRoaXMuX2JveGVzLmZvckVhY2goKHY6IFByb21pc2U8SW5mb1dpbmRvdz4sIGk6IEluZm9Cb3hDb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklkICE9PSBpLklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi50aGVuKHcgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAody5Jc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3LlNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mby5MYXRpdHVkZSAmJiBpbmZvLkxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbih7IGxhdGl0dWRlOiBpbmZvLkxhdGl0dWRlLCBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxvYykge1xyXG4gICAgICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8gdGhpcyBzaXR1YXRpb24gaXMgc3BlY2lmaWNhbGx5IHVzZWQgZm9yIGNsdXN0ZXIgbGF5ZXJzIHRoYXQgdXNlIHNwaWRlcmluZy5cclxuICAgICAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbihsb2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGluZm8uSG9zdE1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbih7IGxhdGl0dWRlOiBpbmZvLkhvc3RNYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogaW5mby5Ib3N0TWFya2VyLkxvbmdpdHVkZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3Lk9wZW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm9ib3ggb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucyB0byBzZXQuIE9wdGlvbnMgcHJvdmlkZWQgYXJlXHJcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgZXhpc3Rpbmcgb3B0aW9ucyBvZiB0aGUgdW5kZXJseWluZyBpbmZvYm94LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggb3B0aW9ucyBoYXZlIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMoaW5mbzogSW5mb0JveENvbXBvbmVudCwgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLlNldE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mb2JveCBiYXNlZCBvbiB0aGUgcHJvcGVydGllcyBzZXQgb24gdGhlIEluZm9Cb3ggY29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigoaTogSW5mb1dpbmRvdykgPT4gaS5TZXRQb3NpdGlvbih7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiBpbmZvLkxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=