/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polygon Service abstract class for Bing Maps V8.
 *
 * @export
 */
export class BingPolygonService {
    /**
     * Creates an instance of BingPolygonService.
     * \@memberof BingPolygonService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link BingMapService} implementation is expected.
     * @param {?} _layerService - {\@link BingLayerService} instance.
     * The concrete {\@link BingLayerService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polygons = new Map();
    }
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    AddPolygon(polygon) {
        const /** @type {?} */ o = {
            id: polygon.Id,
            clickable: polygon.Clickable,
            draggable: polygon.Draggable,
            editable: polygon.Editable,
            fillColor: polygon.FillColor,
            fillOpacity: polygon.FillOpacity,
            geodesic: polygon.Geodesic,
            labelMaxZoom: polygon.LabelMaxZoom,
            labelMinZoom: polygon.LabelMinZoom,
            paths: polygon.Paths,
            showLabel: polygon.ShowLabel,
            showTooltip: polygon.ShowTooltip,
            strokeColor: polygon.StrokeColor,
            strokeOpacity: polygon.StrokeOpacity,
            strokeWeight: polygon.StrokeWeight,
            title: polygon.Title,
            visible: polygon.Visible,
            zIndex: polygon.zIndex,
        };
        let /** @type {?} */ polygonPromise;
        if (polygon.InCustomLayer) {
            polygonPromise = this._layerService.CreatePolygon(polygon.LayerId, o);
        }
        else {
            polygonPromise = this._mapService.CreatePolygon(o);
        }
        this._polygons.set(polygon, polygonPromise);
    }
    /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof BingPolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polygon) {
        const /** @type {?} */ b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create((observer) => {
            this._polygons.get(polygon).then((p) => {
                p.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    DeletePolygon(polygon) {
        const /** @type {?} */ m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.Delete();
                this._polygons.delete(polygon);
            });
        });
    }
    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        const /** @type {?} */ x = /** @type {?} */ (e);
        return { latitude: x.location.latitude, longitude: x.location.longitude };
    }
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    GetNativePolygon(polygon) {
        return this._polygons.get(polygon);
    }
    /**
     * Set the polygon options.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    SetOptions(polygon, options) {
        return this._polygons.get(polygon).then((l) => { l.SetOptions(options); });
    }
    /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    UpdatePolygon(polygon) {
        const /** @type {?} */ m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then((l) => {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(/** @type {?} */ (polygon.Paths));
            }
        });
    }
}
BingPolygonService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingPolygonService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
function BingPolygonService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolygonService.prototype._polygons;
    /** @type {?} */
    BingPolygonService.prototype._mapService;
    /** @type {?} */
    BingPolygonService.prototype._layerService;
    /** @type {?} */
    BingPolygonService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBUWhELE1BQU07Ozs7Ozs7Ozs7SUFvQkYsWUFBb0IsV0FBdUIsRUFDL0IsZUFDQTtRQUZRLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQy9CLGtCQUFhLEdBQWIsYUFBYTtRQUNiLFVBQUssR0FBTCxLQUFLO3lCQWpCK0MsSUFBSSxHQUFHLEVBQXlDO0tBa0IvRzs7Ozs7Ozs7OztJQVVNLFVBQVUsQ0FBQyxPQUE0QjtRQUMxQyx1QkFBTSxDQUFDLEdBQW9CO1lBQ3ZCLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1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dCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBNYXBQb2x5Z29uRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvbHlnb24gU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWdvblNlcnZpY2UgaW1wbGVtZW50cyBQb2x5Z29uU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3BvbHlnb25zOiBNYXA8TWFwUG9seWdvbkRpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5Z29uPj4gPSBuZXcgTWFwPE1hcFBvbHlnb25EaXJlY3RpdmUsIFByb21pc2U8UG9seWdvbj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWdvblNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgQmluZ0xheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5Z29uIGNvbnRleHQsIHRoZSBwb2x5Z29uIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxyXG4gICAgICogY29ycmVjc3BvbmRpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZFBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IElQb2x5Z29uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBvbHlnb24uSWQsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogcG9seWdvbi5DbGlja2FibGUsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWdvbi5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwb2x5Z29uLkVkaXRhYmxlLFxyXG4gICAgICAgICAgICBmaWxsQ29sb3I6IHBvbHlnb24uRmlsbENvbG9yLFxyXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogcG9seWdvbi5GaWxsT3BhY2l0eSxcclxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlnb24uR2VvZGVzaWMsXHJcbiAgICAgICAgICAgIGxhYmVsTWF4Wm9vbTogcG9seWdvbi5MYWJlbE1heFpvb20sXHJcbiAgICAgICAgICAgIGxhYmVsTWluWm9vbTogcG9seWdvbi5MYWJlbE1pblpvb20sXHJcbiAgICAgICAgICAgIHBhdGhzOiBwb2x5Z29uLlBhdGhzLFxyXG4gICAgICAgICAgICBzaG93TGFiZWw6IHBvbHlnb24uU2hvd0xhYmVsLFxyXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWdvbi5TaG93VG9vbHRpcCxcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHBvbHlnb24uU3Ryb2tlQ29sb3IsXHJcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBvbHlnb24uU3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5Z29uLlN0cm9rZVdlaWdodCxcclxuICAgICAgICAgICAgdGl0bGU6IHBvbHlnb24uVGl0bGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHBvbHlnb24uVmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBwb2x5Z29uLnpJbmRleCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBwb2x5Z29uUHJvbWlzZTogUHJvbWlzZTxQb2x5Z29uPjtcclxuICAgICAgICBpZiAocG9seWdvbi5JbkN1c3RvbUxheWVyKSB7XHJcbiAgICAgICAgICAgIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZVBvbHlnb24ocG9seWdvbi5MYXllcklkLCBvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5Z29uKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wb2x5Z29ucy5zZXQocG9seWdvbiwgcG9seWdvblByb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBwb2x5Z29uLlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxyXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYjogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ21vdXNlbW92ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdyaWdodGNsaWNrJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy8vIG1vdXNlbW92ZSBhbmQgcmlnaHRjbGljayBhcmUgbm90IHN1cHBvcnRlZCBieSBiaW5nIHBvbHlnb25zLlxyXG4gICAgICAgIC8vL1xyXG5cclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbikudGhlbigocDogUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcC5BZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIERlbGV0ZXMgYSBwb2x5Z29uLlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cclxuICAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAgKlxyXG4gICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMuZGVsZXRlKHBvbHlnb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIHBvbHlnb24gb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC4gRXhwZWN0ZWQgdG8gaW1wbGVtZW50IHtAbGluayBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3N9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcclxuICAgICAgICBjb25zdCB4OiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgPSA8TWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzPmU7XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IHgubG9jYXRpb24ubGF0aXR1ZGUsIGxvbmdpdHVkZTogeC5sb2NhdGlvbi5sb25naXR1ZGUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIHBvbHlnb24gbW9kZWwgZm9yIHRoZSBwb2x5Z29uIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlnb24gbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIFBvbHlnb259IGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pLnRoZW4oKGw6IFBvbHlnb24pID0+IHsgbC5TZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIFBvbHlnb24gcGF0aFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgICAgIGlmIChtID09IG51bGwgfHwgcG9seWdvbi5QYXRocyA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHBvbHlnb24uUGF0aHMpIHx8IHBvbHlnb24uUGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4gIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9seWdvbi5QYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIGwuU2V0UGF0aHMocG9seWdvbi5QYXRocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wb2x5Z29uLlBhdGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=