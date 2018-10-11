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
var BingPolygonService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingPolygonService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link BingLayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingPolygonService
     */
    function BingPolygonService(_mapService, _layerService, _zone) {
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
    BingPolygonService.prototype.AddPolygon = /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    function (polygon) {
        var /** @type {?} */ o = {
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
        var /** @type {?} */ polygonPromise;
        if (polygon.InCustomLayer) {
            polygonPromise = this._layerService.CreatePolygon(polygon.LayerId, o);
        }
        else {
            polygonPromise = this._mapService.CreatePolygon(o);
        }
        this._polygons.set(polygon, polygonPromise);
    };
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
    BingPolygonService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof BingPolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, polygon) {
        var _this = this;
        var /** @type {?} */ b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create(function (observer) {
            _this._polygons.get(polygon).then(function (p) {
                p.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    BingPolygonService.prototype.DeletePolygon = /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    function (polygon) {
        var _this = this;
        var /** @type {?} */ m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.Delete();
                _this._polygons.delete(polygon);
            });
        });
    };
    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    BingPolygonService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    function (e) {
        var /** @type {?} */ x = /** @type {?} */ (e);
        return { latitude: x.location.latitude, longitude: x.location.longitude };
    };
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    BingPolygonService.prototype.GetNativePolygon = /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    function (polygon) {
        return this._polygons.get(polygon);
    };
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
    BingPolygonService.prototype.SetOptions = /**
     * Set the polygon options.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    function (polygon, options) {
        return this._polygons.get(polygon).then(function (l) { l.SetOptions(options); });
    };
    /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    BingPolygonService.prototype.UpdatePolygon = /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    function (polygon) {
        var /** @type {?} */ m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(/** @type {?} */ (polygon.Paths));
            }
        });
    };
    BingPolygonService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingPolygonService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: NgZone }
    ]; };
    return BingPolygonService;
}());
export { BingPolygonService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztJQWU1QyxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7T0FRRztJQUNILDRCQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7eUJBakIrQyxJQUFJLEdBQUcsRUFBeUM7S0FrQi9HOzs7Ozs7Ozs7O0lBVU0sdUNBQVU7Ozs7Ozs7OztjQUFDLE9BQTRCO1FBQzFDLHFCQUFNLENBQUMsR0FBb0I7WUFDdkIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtB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Z0JBQ1YsWUFBWTtnQkFSQSxNQUFNOzs2QkFBM0I7O1NBZ0JhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBNYXBQb2x5Z29uRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvbHlnb24gU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWdvblNlcnZpY2UgaW1wbGVtZW50cyBQb2x5Z29uU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3BvbHlnb25zOiBNYXA8TWFwUG9seWdvbkRpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5Z29uPj4gPSBuZXcgTWFwPE1hcFBvbHlnb25EaXJlY3RpdmUsIFByb21pc2U8UG9seWdvbj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWdvblNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgQmluZ0xheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5Z29uIGNvbnRleHQsIHRoZSBwb2x5Z29uIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxyXG4gICAgICogY29ycmVjc3BvbmRpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZFBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IElQb2x5Z29uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBvbHlnb24uSWQsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogcG9seWdvbi5DbGlja2FibGUsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWdvbi5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwb2x5Z29uLkVkaXRhYmxlLFxyXG4gICAgICAgICAgICBmaWxsQ29sb3I6IHBvbHlnb24uRmlsbENvbG9yLFxyXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogcG9seWdvbi5GaWxsT3BhY2l0eSxcclxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlnb24uR2VvZGVzaWMsXHJcbiAgICAgICAgICAgIGxhYmVsTWF4Wm9vbTogcG9seWdvbi5MYWJlbE1heFpvb20sXHJcbiAgICAgICAgICAgIGxhYmVsTWluWm9vbTogcG9seWdvbi5MYWJlbE1pblpvb20sXHJcbiAgICAgICAgICAgIHBhdGhzOiBwb2x5Z29uLlBhdGhzLFxyXG4gICAgICAgICAgICBzaG93TGFiZWw6IHBvbHlnb24uU2hvd0xhYmVsLFxyXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWdvbi5TaG93VG9vbHRpcCxcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHBvbHlnb24uU3Ryb2tlQ29sb3IsXHJcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBvbHlnb24uU3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5Z29uLlN0cm9rZVdlaWdodCxcclxuICAgICAgICAgICAgdGl0bGU6IHBvbHlnb24uVGl0bGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHBvbHlnb24uVmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBwb2x5Z29uLnpJbmRleCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBwb2x5Z29uUHJvbWlzZTogUHJvbWlzZTxQb2x5Z29uPjtcclxuICAgICAgICBpZiAocG9seWdvbi5JbkN1c3RvbUxheWVyKSB7XHJcbiAgICAgICAgICAgIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZVBvbHlnb24ocG9seWdvbi5MYXllcklkLCBvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5Z29uKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wb2x5Z29ucy5zZXQocG9seWdvbiwgcG9seWdvblByb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBwb2x5Z29uLlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxyXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYjogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ21vdXNlbW92ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdyaWdodGNsaWNrJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy8vIG1vdXNlbW92ZSBhbmQgcmlnaHRjbGljayBhcmUgbm90IHN1cHBvcnRlZCBieSBiaW5nIHBvbHlnb25zLlxyXG4gICAgICAgIC8vL1xyXG5cclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbikudGhlbigocDogUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcC5BZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIERlbGV0ZXMgYSBwb2x5Z29uLlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cclxuICAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAgKlxyXG4gICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMuZGVsZXRlKHBvbHlnb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIHBvbHlnb24gb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC4gRXhwZWN0ZWQgdG8gaW1wbGVtZW50IHtAbGluayBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3N9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcclxuICAgICAgICBjb25zdCB4OiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgPSA8TWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzPmU7XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IHgubG9jYXRpb24ubGF0aXR1ZGUsIGxvbmdpdHVkZTogeC5sb2NhdGlvbi5sb25naXR1ZGUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIHBvbHlnb24gbW9kZWwgZm9yIHRoZSBwb2x5Z29uIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlnb24gbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIFBvbHlnb259IGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pLnRoZW4oKGw6IFBvbHlnb24pID0+IHsgbC5TZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIFBvbHlnb24gcGF0aFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgICAgIGlmIChtID09IG51bGwgfHwgcG9seWdvbi5QYXRocyA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHBvbHlnb24uUGF0aHMpIHx8IHBvbHlnb24uUGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4gIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9seWdvbi5QYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIGwuU2V0UGF0aHMocG9seWdvbi5QYXRocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wb2x5Z29uLlBhdGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=