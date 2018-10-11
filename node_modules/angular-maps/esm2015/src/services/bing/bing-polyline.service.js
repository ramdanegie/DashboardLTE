/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Bing Maps V8.
 *
 * @export
 */
export class BingPolylineService {
    /**
     * Creates an instance of BingPolylineService.
     * \@memberof BingPolylineService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link BingMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link BingLayerService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polylines = new Map();
    }
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * corresponding layer.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    AddPolyline(polyline) {
        const /** @type {?} */ o = {
            id: polyline.Id,
            clickable: polyline.Clickable,
            draggable: polyline.Draggable,
            editable: polyline.Editable,
            geodesic: polyline.Geodesic,
            path: polyline.Path,
            showTooltip: polyline.ShowTooltip,
            strokeColor: polyline.StrokeColor,
            strokeOpacity: polyline.StrokeOpacity,
            strokeWeight: polyline.StrokeWeight,
            title: polyline.Title,
            visible: polyline.Visible,
            zIndex: polyline.zIndex,
        };
        let /** @type {?} */ polylinePromise;
        if (polyline.InCustomLayer) {
            polylinePromise = this._layerService.CreatePolyline(polyline.LayerId, o);
        }
        else {
            polylinePromise = this._mapService.CreatePolyline(o);
        }
        this._polylines.set(polyline, polylinePromise);
    }
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof BingPolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polyline) {
        const /** @type {?} */ b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create((observer) => {
            this._polylines.get(polyline).then(p => {
                const /** @type {?} */ x = Array.isArray(p) ? p : [p];
                x.forEach(line => line.AddListener(eventName, (e) => this._zone.run(() => observer.next(e))));
            });
        });
    }
    /**
     * Deletes a polyline.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    DeletePolyline(polyline) {
        const /** @type {?} */ m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                const /** @type {?} */ x = Array.isArray(l) ? l : [l];
                x.forEach(line => line.Delete());
                this._polylines.delete(polyline);
            });
        });
    }
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof BingPolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.location) {
            return null;
        }
        return { latitude: e.location.latitude, longitude: e.location.longitude };
    }
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     */
    GetNativePolyline(polyline) {
        return this._polylines.get(polyline);
    }
    /**
     * Set the polyline options.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    SetOptions(polyline, options) {
        return this._polylines.get(polyline).then(l => {
            const /** @type {?} */ x = Array.isArray(l) ? l : [l];
            x.forEach(line => line.SetOptions(options));
        });
    }
    /**
     * Updates the Polyline path
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    UpdatePolyline(polyline) {
        const /** @type {?} */ m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(l => this._zone.run(() => {
            const /** @type {?} */ x = Array.isArray(l) ? l : [l];
            const /** @type {?} */ p = polyline.Path.length > 0 && Array.isArray(polyline.Path[0]) ? /** @type {?} */ (polyline.Path) : /** @type {?} */ ([polyline.Path]);
            x.forEach((line, index) => {
                if (p.length > index) {
                    line.SetPath(p[index]);
                }
            });
            if (Array.isArray(l) && l.length > p.length) {
                l.splice(p.length - 1).forEach(line => line.Delete());
            }
        }));
    }
}
BingPolylineService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingPolylineService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
function BingPolylineService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolylineService.prototype._polylines;
    /** @type {?} */
    BingPolylineService.prototype._mapService;
    /** @type {?} */
    BingPolylineService.prototype._layerService;
    /** @type {?} */
    BingPolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU1yRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFRaEQsTUFBTTs7Ozs7Ozs7OztJQXFCRixZQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7MEJBakJqQixJQUFJLEdBQUcsRUFBMkQ7S0FrQmpFOzs7Ozs7Ozs7O0lBY00sV0FBVyxDQUFDLFFBQThCO1FBQzdDLHVCQUFNLENBQUMsR0FBcUI7WUFDeEIsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO1lBQ2pDLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYTtZQUNyQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVk7WUFDbkMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1lB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cmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFwUG9seWxpbmVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1wb2x5bGluZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9seWxpbmUgU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWxpbmVTZXJ2aWNlIGltcGxlbWVudHMgUG9seWxpbmVTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfcG9seWxpbmVzOiBNYXA8TWFwUG9seWxpbmVEaXJlY3RpdmUsIFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPVxyXG4gICAgbmV3IE1hcDxNYXBQb2x5bGluZURpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlsaW5lU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS4gVGhlIGNvbmNyZXRlIHtAbGluayBCaW5nTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWVtYmVycyBhbmQgTWFya2VyU2VydmljZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gYSBtYXAuIERlcGVuZGluZyBvbiB0aGUgcG9seWxpbmUgY29udGV4dCwgdGhlIHBvbHlsaW5lIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxyXG4gICAgICogY29ycmVzcG9uZGluZyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogSVBvbHlsaW5lT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBvbHlsaW5lLklkLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHBvbHlsaW5lLkNsaWNrYWJsZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBwb2x5bGluZS5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwb2x5bGluZS5FZGl0YWJsZSxcclxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlsaW5lLkdlb2Rlc2ljLFxyXG4gICAgICAgICAgICBwYXRoOiBwb2x5bGluZS5QYXRoLFxyXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWxpbmUuU2hvd1Rvb2x0aXAsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5bGluZS5TdHJva2VDb2xvcixcclxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcG9seWxpbmUuU3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5bGluZS5TdHJva2VXZWlnaHQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5bGluZS5UaXRsZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogcG9seWxpbmUuVmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBwb2x5bGluZS56SW5kZXgsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcG9seWxpbmVQcm9taXNlOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj47XHJcbiAgICAgICAgaWYgKHBvbHlsaW5lLkluQ3VzdG9tTGF5ZXIpIHtcclxuICAgICAgICAgICAgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZVBvbHlsaW5lKHBvbHlsaW5lLkxheWVySWQsIG8pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvbHlsaW5lUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWxpbmUobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQocG9seWxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIGxpbmUuXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGI6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncmlnaHRjbGljaycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBtb3VzZW1vdmUgYW5kIHJpZ2h0Y2xpY2sgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgYmluZyBwb2x5Z29ucy5cclxuICAgICAgICAvLy9cclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShwKSA/IHAgOiBbcF07XHJcbiAgICAgICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIERlbGV0ZXMgYSBwb2x5bGluZS5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cclxuICAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWxpbmUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xyXG4gICAgICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gIGxpbmUuRGVsZXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzLmRlbGV0ZShwb2x5bGluZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICghZSkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIGlmICghZS5sb2NhdGlvbikgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiBlLmxvY2F0aW9uLmxhdGl0dWRlLCBsb25naXR1ZGU6IGUubG9jYXRpb24ubG9uZ2l0dWRlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgbW9kZWwgZm9yIHRoZSBtYXJrZXIgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBwb2x5bGluZSBtb2RlbC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgUG9seWxpbmV9XHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS4gRm9yIGNvbXBsZXggcGF0aHMsIHJldHVybnMgYW4gYXJyYXkgb2YgcG9seWxpbmVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWxpbmUgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KGwpID8gbCA6IFtsXTtcclxuICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gbGluZS5TZXRPcHRpb25zKG9wdGlvbnMpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIFBvbHlsaW5lIHBhdGhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbihsID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPVxyXG4gICAgICAgICAgICAgICAgcG9seWxpbmUuUGF0aC5sZW5ndGggPiAwICYmIEFycmF5LmlzQXJyYXkocG9seWxpbmUuUGF0aFswXSkgPyA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wb2x5bGluZS5QYXRoIDpcclxuICAgICAgICAgICAgICAgIDxBcnJheTxBcnJheTxJTGF0TG9uZz4+Pltwb2x5bGluZS5QYXRoXTtcclxuICAgICAgICAgICAgIHguZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICBpZiAocC5sZW5ndGggPiBpbmRleCkgeyBsaW5lLlNldFBhdGgocFtpbmRleF0pOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsKSAmJiBsLmxlbmd0aCA+IHAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBsLnNwbGljZShwLmxlbmd0aCAtIDEpLmZvckVhY2gobGluZSA9PiBsaW5lLkRlbGV0ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=