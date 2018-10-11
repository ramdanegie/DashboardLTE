/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Google Maps.
 *
 * @export
 */
export class GooglePolylineService {
    /**
     * Creates an instance of GooglePolylineService.
     * \@memberof GooglePolylineService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link GoogleMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link GoogleLayerService} implementation is expected.
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
     * correcsponding layer.
     *
     * \@memberof GooglePolylineService
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
        const /** @type {?} */ polylinePromise = this._mapService.CreatePolyline(o);
        this._polylines.set(polyline, polylinePromise);
    }
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof GooglePolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polyline) {
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
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    DeletePolyline(polyline) {
        const /** @type {?} */ m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(l => {
            return this._zone.run(() => {
                const /** @type {?} */ x = Array.isArray(l) ? l : [l];
                x.forEach(line => line.Delete());
                this._polylines.delete(polyline);
            });
        });
    }
    /**
     * Obtains geo coordinates for the line on the click location
     *
     * @abstract
     * \@memberof GooglePolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
     *
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    }
    /**
     * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolylineService
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
     * \@memberof GooglePolylineService
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
     * \@memberof GooglePolylineService
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
GooglePolylineService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GooglePolylineService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
function GooglePolylineService_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolylineService.prototype._polylines;
    /** @type {?} */
    GooglePolylineService.prototype._mapService;
    /** @type {?} */
    GooglePolylineService.prototype._layerService;
    /** @type {?} */
    GooglePolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlsaW5lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQVFoRCxNQUFNOzs7Ozs7Ozs7O0lBcUJGLFlBQW9CLFdBQXVCLEVBQy9CLGVBQ0E7UUFGUSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixrQkFBYSxHQUFiLGFBQWE7UUFDYixVQUFLLEdBQUwsS0FBSzswQkFqQmIsSUFBSSxHQUFHLEVBQTJEO0tBaUJ4Qzs7Ozs7Ozs7OztJQWN2QixXQUFXLENBQUMsUUFBOEI7UUFDN0MsdUJBQU0sQ0FBQyxHQUFxQjtZQUN4QixFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDZixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO1lBQ3JDLFlBQVksRUFBRSxRQUFRLENBQUMsWUFBWTtZQUNuQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIs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RUFBQyxDQUFDLG1CQUM3RSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2FBQ3BELENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0osQ0FBQyxDQUFDLENBQUM7Ozs7WUEvS1gsVUFBVTs7OztZQVJGLFVBQVU7WUFDVixZQUFZO1lBUEEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFwUG9seWxpbmVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1wb2x5bGluZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9seWxpbmUgU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgR29vZ2xlIE1hcHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBvbHlsaW5lU2VydmljZSBpbXBsZW1lbnRzIFBvbHlsaW5lU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3BvbHlsaW5lczogTWFwPE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID1cclxuICAgICAgICBuZXcgTWFwPE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVQb2x5bGluZVNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBHb29nbGVMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWVtYmVycyBhbmQgTWFya2VyU2VydmljZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gYSBtYXAuIERlcGVuZGluZyBvbiB0aGUgcG9seWxpbmUgY29udGV4dCwgdGhlIHBvbHlsaW5lIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxyXG4gICAgICogY29ycmVjc3BvbmRpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgYWRkZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogSVBvbHlsaW5lT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBvbHlsaW5lLklkLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHBvbHlsaW5lLkNsaWNrYWJsZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBwb2x5bGluZS5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwb2x5bGluZS5FZGl0YWJsZSxcclxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlsaW5lLkdlb2Rlc2ljLFxyXG4gICAgICAgICAgICBwYXRoOiBwb2x5bGluZS5QYXRoLFxyXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWxpbmUuU2hvd1Rvb2x0aXAsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5bGluZS5TdHJva2VDb2xvcixcclxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcG9seWxpbmUuU3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5bGluZS5TdHJva2VXZWlnaHQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5bGluZS5UaXRsZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogcG9seWxpbmUuVmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBwb2x5bGluZS56SW5kZXgsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwb2x5bGluZVByb21pc2U6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWxpbmUobyk7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmVzLnNldChwb2x5bGluZSwgcG9seWxpbmVQcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbGluZS5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShwKSA/IHAgOiBbcF07XHJcbiAgICAgICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIERlbGV0ZXMgYSBwb2x5bGluZS5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cclxuICAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XHJcbiAgICAgICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiAgbGluZS5EZWxldGUoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZGVsZXRlKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBsaW5lIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIGxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAoIWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcubGF0IHx8ICFlLmxhdExuZy5sbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiBlLmxhdExuZy5sYXQoKSwgbG9uZ2l0dWRlOiBlLmxhdExuZy5sbmcoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyB0aGUgcG9seWxpbmUgbW9kZWwgZm9yIHRoZSBsaW5lIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIG9idGFpbiB0aGUgcG9seWxpbmUgbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIFBvbHlsaW5lfVxyXG4gICAgICogaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uIEZvciBjb21wbGV4IHBhdGhzLCByZXR1cm5zIGFuIGFycmF5IG9mIHBvbHlsaW5lcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWxpbmUgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xyXG4gICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLlNldE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgUG9seWxpbmUgcGF0aFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSk7XHJcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLnRoZW4obCA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID1cclxuICAgICAgICAgICAgICAgIHBvbHlsaW5lLlBhdGgubGVuZ3RoID4gMCAmJiBBcnJheS5pc0FycmF5KHBvbHlsaW5lLlBhdGhbMF0pID8gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cG9seWxpbmUuUGF0aCA6XHJcbiAgICAgICAgICAgICAgICA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5bcG9seWxpbmUuUGF0aF07XHJcbiAgICAgICAgICAgIHguZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmxlbmd0aCA+IGluZGV4KSB7IGxpbmUuU2V0UGF0aChwW2luZGV4XSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGwpICYmIGwubGVuZ3RoID4gcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGwuc3BsaWNlKHAubGVuZ3RoIC0gMSkuZm9yRWFjaChsaW5lID0+IGxpbmUuRGVsZXRlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==