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
export class BingInfoBoxService {
    /**
     * Creates an instance of BingInfoBoxService.
     * \@memberof BingInfoBoxService
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Bing Maps V8. An instance of {\@link BingMapService}.
     * @param {?} _zone - An instance of NgZone to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
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
    AddInfoWindow(info) {
        const /** @type {?} */ options = {};
        if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
            options.position = {
                latitude: info.Latitude,
                longitude: info.Longitude
            };
        }
        if (typeof info.InfoWindowActions !== 'undefined' && info.InfoWindowActions.length > 0) {
            options.actions = [];
            info.InfoWindowActions.forEach((action) => {
                options.actions.push({
                    label: action.Label,
                    eventHandler: () => { action.ActionClicked.emit(null); }
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
        const /** @type {?} */ infoPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoPromise);
    }
    /**
     * Closes an InfoBoxComponent that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    Close(info) {
        return this._boxes.get(info).then((w) => w.Close());
    }
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
    CreateEventObservable(eventName, infoComponent) {
        const /** @type {?} */ eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._boxes.get(infoComponent).then((b) => {
                b.AddListener(eventNameTranslated, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    DeleteInfoWindow(info) {
        const /** @type {?} */ w = this._boxes.get(info);
        if (w == null) {
            return Promise.resolve();
        }
        return w.then((i) => {
            return this._zone.run(() => {
                i.Close();
                this._boxes.delete(info);
            });
        });
    }
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
    Open(info, loc) {
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes.
            this._boxes.forEach((v, i) => {
                if (info.Id !== i.Id) {
                    v.then(w => {
                        if (w.IsOpen) {
                            w.Close();
                            i.Close();
                        }
                    });
                }
            });
        }
        return this._boxes.get(info).then((w) => {
            const /** @type {?} */ options = {};
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
    }
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
    SetOptions(info, options) {
        return this._boxes.get(info).then((i) => i.SetOptions(options));
    }
    /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    SetPosition(info) {
        return this._boxes.get(info).then((i) => i.SetPosition({
            latitude: info.Latitude,
            longitude: info.Longitude
        }));
    }
}
BingInfoBoxService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingInfoBoxService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
function BingInfoBoxService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingInfoBoxService.prototype._boxes;
    /** @type {?} */
    BingInfoBoxService.prototype._mapService;
    /** @type {?} */
    BingInfoBoxService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQU01QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQVEzRSxNQUFNOzs7Ozs7OztJQWlCRixZQUFvQixXQUF1QixFQUFVLEtBQWE7UUFBOUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO3NCQWJMLElBQUksR0FBRyxFQUF5QztLQWF0Qzs7Ozs7Ozs7O0lBU2hFLGFBQWEsQ0FBQyxJQUFzQjtRQUN2Qyx1QkFBTSxPQUFPLEdBQXVCLEVBQUUsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE9BQU8sQ0FBQyxRQUFRLEdBQUc7Z0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDNUIsQ0FBQztTQUNMO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENB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QUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXpFLFdBQVcsQ0FBQyxJQUFzQjtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQy9ELFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDNUIsQ0FBQyxDQUFDLENBQUM7Ozs7WUFqTVgsVUFBVTs7OztZQVhGLFVBQVU7WUFQRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5mb2JveC1hY3Rpb24nO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZm9ib3gnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4vYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEJpbmdNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWV2ZW50cy1sb29rdXAnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9IGNvbnRyYWN0IGZvciB0aGUgQmluZyBNYXBzIFY4IGFyY2hpdGVjdHVyZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ0luZm9Cb3hTZXJ2aWNlIGltcGxlbWVudHMgSW5mb0JveFNlcnZpY2Uge1xyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2JveGVzOiBNYXA8SW5mb0JveENvbXBvbmVudCwgUHJvbWlzZTxJbmZvV2luZG93Pj4gPSBuZXcgTWFwPEluZm9Cb3hDb21wb25lbnQsIFByb21pc2U8SW5mb1dpbmRvdz4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nSW5mb0JveFNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIEJpbmcgTWFwcyBWOC4gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIEFuIGluc3RhbmNlIG9mIE5nWm9uZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBpbmZvIHdpbmRvdyB0byB0aGUgbWFwIG9yIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEluZm9XaW5kb3coaW5mbzogSW5mb0JveENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5mby5MYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm8uTG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGluZm8uTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5mby5JbmZvV2luZG93QWN0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5mby5JbmZvV2luZG93QWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBpbmZvLkluZm9XaW5kb3dBY3Rpb25zLmZvckVhY2goKGFjdGlvbjogSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hY3Rpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24uTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyOiAoKSA9PiB7IGFjdGlvbi5BY3Rpb25DbGlja2VkLmVtaXQobnVsbCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZm8uSHRtbENvbnRlbnQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZGVzY3JpcHRpb24gPSBpbmZvLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mby54T2Zmc2V0IHx8IGluZm8ueU9mZnNldCkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5waXhlbE9mZnNldCA9PSBudWxsKSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTsgfVxyXG4gICAgICAgICAgICBpZiAoaW5mby54T2Zmc2V0KSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQueCA9IGluZm8ueE9mZnNldDsgfVxyXG4gICAgICAgICAgICBpZiAoaW5mby55T2Zmc2V0KSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQueSA9IGluZm8ueU9mZnNldDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gaW5mby5WaXNpYmxlO1xyXG4gICAgICAgIGNvbnN0IGluZm9Qcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVJbmZvV2luZG93KG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2JveGVzLnNldChpbmZvLCBpbmZvUHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgYW4gSW5mb0JveENvbXBvbmVudCB0aGF0IGlzIG9wZW4uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIGNsb3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENsb3NlKGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm94ZXMuZ2V0KGluZm8pLnRoZW4oKHcpID0+IHcuQ2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGFuIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEBwYXJhbSBpbmZvQ29tcG9uZW50IC0gVGhlIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgaW5mb0NvbXBvbmVudDogSW5mb0JveENvbXBvbmVudCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZVRyYW5zbGF0ZWQgPSBCaW5nTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYm94ZXMuZ2V0KGluZm9Db21wb25lbnQpLnRoZW4oKGI6IEluZm9XaW5kb3cpID0+IHtcclxuICAgICAgICAgICAgICAgIGIuQWRkTGlzdGVuZXIoZXZlbnROYW1lVHJhbnNsYXRlZCwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGFuIGluZm9ib3guXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB3ID0gdGhpcy5fYm94ZXMuZ2V0KGluZm8pO1xyXG4gICAgICAgIGlmICh3ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdy50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpLkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3hlcy5kZWxldGUoaW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgYW4gaW5mb2JveCB0aGF0IGlzIGNsb3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gb3BlbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgT3BlbihpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBsb2M/OiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmIChpbmZvLkNsb3NlSW5mb0JveGVzT25PcGVuIHx8IGluZm8uTW9kYWwpIHtcclxuICAgICAgICAgICAgLy8gY2xvc2UgYWxsIG9wZW4gaW5mbyBib3hlcy5cclxuICAgICAgICAgICAgdGhpcy5fYm94ZXMuZm9yRWFjaCgodjogUHJvbWlzZTxJbmZvV2luZG93PiwgaTogSW5mb0JveENvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSWQgIT09IGkuSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2LnRoZW4odyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3LklzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdy5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fYm94ZXMuZ2V0KGluZm8pLnRoZW4oKHcpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIGlmIChpbmZvLkh0bWxDb250ZW50ICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5odG1sQ29udGVudCA9IGluZm8uSHRtbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpdGxlID0gaW5mby5UaXRsZTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGVzY3JpcHRpb24gPSBpbmZvLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHcuU2V0T3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvLkxhdGl0dWRlICYmIGluZm8uTG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICB3LlNldFBvc2l0aW9uKHsgbGF0aXR1ZGU6IGluZm8uTGF0aXR1ZGUsIGxvbmdpdHVkZTogaW5mby5Mb25naXR1ZGUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jKSB7XHJcbiAgICAgICAgICAgICAgICAvLy9cclxuICAgICAgICAgICAgICAgIC8vLyB0aGlzIHNpdHVhdGlvbiBpcyBzcGVjaWZpY2FsbHkgdXNlZCBmb3IgY2x1c3RlciBsYXllcnMgdGhhdCB1c2Ugc3BpZGVyaW5nLlxyXG4gICAgICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgICAgICB3LlNldFBvc2l0aW9uKGxvYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5mby5Ib3N0TWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB3LlNldFBvc2l0aW9uKHsgbGF0aXR1ZGU6IGluZm8uSG9zdE1hcmtlci5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBpbmZvLkhvc3RNYXJrZXIuTG9uZ2l0dWRlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHcuT3BlbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mb2JveCBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zIHRvIHNldC4gT3B0aW9ucyBwcm92aWRlZCBhcmVcclxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSBleGlzdGluZyBvcHRpb25zIG9mIHRoZSB1bmRlcmx5aW5nIGluZm9ib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBvcHRpb25zIGhhdmUgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm94ZXMuZ2V0KGluZm8pLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuU2V0T3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmZvYm94IGJhc2VkIG9uIHRoZSBwcm9wZXJ0aWVzIHNldCBvbiB0aGUgSW5mb0JveCBjb21wb25lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IHBvc2l0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLlNldFBvc2l0aW9uKHtcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGluZm8uTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogaW5mby5Mb25naXR1ZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==