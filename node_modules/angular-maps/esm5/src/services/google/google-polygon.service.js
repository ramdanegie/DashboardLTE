/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polygon Service abstract class for Google Maps.
 *
 * @export
 */
var GooglePolygonService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GooglePolygonService.
     * @param _mapService - {@link MapService} instance. The concrete {@link GoogleMapService} implementation is expected.
     * @param _layerService - {@link GoogleLayerService} instance.
     * The concrete {@link GoogleLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof GooglePolygonService
     */
    function GooglePolygonService(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polygons = new Map();
    }
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    GooglePolygonService.prototype.AddPolygon = /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof GooglePolygonService
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
        var /** @type {?} */ polygonPromise = this._mapService.CreatePolygon(o);
        this._polygons.set(polygon, polygonPromise);
    };
    /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof GooglePolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    GooglePolygonService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof GooglePolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, polygon) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._polygons.get(polygon).then(function (p) {
                p.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes a polygon.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    GooglePolygonService.prototype.DeletePolygon = /**
     * Deletes a polygon.
     *
     * \@memberof GooglePolygonService
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
     * \@memberof GooglePolygonService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GooglePolygonService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof GooglePolygonService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    function (e) {
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    };
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    GooglePolygonService.prototype.GetNativePolygon = /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolygonService
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
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    GooglePolygonService.prototype.SetOptions = /**
     * Set the polygon options.
     *
     * \@memberof GooglePolygonService
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
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    GooglePolygonService.prototype.UpdatePolygon = /**
     * Updates the Polygon path
     *
     * \@memberof GooglePolygonService
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
    GooglePolygonService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GooglePolygonService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: NgZone }
    ]; };
    return GooglePolygonService;
}());
export { GooglePolygonService };
function GooglePolygonService_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolygonService.prototype._polygons;
    /** @type {?} */
    GooglePolygonService.prototype._mapService;
    /** @type {?} */
    GooglePolygonService.prototype._layerService;
    /** @type {?} */
    GooglePolygonService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUs1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0lBYzVDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7OztPQVFHO0lBQ0gsOEJBQW9CLFdBQXVCLEVBQy9CLGVBQ0E7UUFGUSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixrQkFBYSxHQUFiLGFBQWE7UUFDYixVQUFLLEdBQUwsS0FBSzt5QkFqQitDLElBQUksR0FBRyxFQUF5QztLQWtCL0c7Ozs7Ozs7Ozs7SUFjTSx5Q0FBVTs7Ozs7Ozs7O2NBQUMsT0FBNEI7UUFDMUMscUJBQU0sQ0FBQyxHQUFvQjtZQUN2QixFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZ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Q0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBVTtZQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLE9BQU8sbUJBQWtCLE9BQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQzthQUM3QztTQUNKLENBQUMsQ0FBQzs7O2dCQWpLVixVQUFVOzs7O2dCQVBGLFVBQVU7Z0JBQ1YsWUFBWTtnQkFQQSxNQUFNOzsrQkFEM0I7O1NBZWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IE1hcFBvbHlnb25EaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5Z29uIFNlcnZpY2UgYWJzdHJhY3QgY2xhc3MgZm9yIEdvb2dsZSBNYXBzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQb2x5Z29uU2VydmljZSBpbXBsZW1lbnRzIFBvbHlnb25TZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfcG9seWdvbnM6IE1hcDxNYXBQb2x5Z29uRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlnb24+PiA9IG5ldyBNYXA8TWFwUG9seWdvbkRpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5Z29uPj4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1lbWJlcnMgYW5kIE1hcmtlclNlcnZpY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gYSBtYXAuIERlcGVuZGluZyBvbiB0aGUgcG9seWdvbiBjb250ZXh0LCB0aGUgcG9seWdvbiB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcclxuICAgICAqIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZFBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IElQb2x5Z29uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBvbHlnb24uSWQsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogcG9seWdvbi5DbGlja2FibGUsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWdvbi5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwb2x5Z29uLkVkaXRhYmxlLFxyXG4gICAgICAgICAgICBmaWxsQ29sb3I6IHBvbHlnb24uRmlsbENvbG9yLFxyXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogcG9seWdvbi5GaWxsT3BhY2l0eSxcclxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlnb24uR2VvZGVzaWMsXHJcbiAgICAgICAgICAgIGxhYmVsTWF4Wm9vbTogcG9seWdvbi5MYWJlbE1heFpvb20sXHJcbiAgICAgICAgICAgIGxhYmVsTWluWm9vbTogcG9seWdvbi5MYWJlbE1pblpvb20sXHJcbiAgICAgICAgICAgIHBhdGhzOiBwb2x5Z29uLlBhdGhzLFxyXG4gICAgICAgICAgICBzaG93TGFiZWw6IHBvbHlnb24uU2hvd0xhYmVsLFxyXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWdvbi5TaG93VG9vbHRpcCxcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHBvbHlnb24uU3Ryb2tlQ29sb3IsXHJcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBvbHlnb24uU3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5Z29uLlN0cm9rZVdlaWdodCxcclxuICAgICAgICAgICAgdGl0bGU6IHBvbHlnb24uVGl0bGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHBvbHlnb24uVmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBwb2x5Z29uLnpJbmRleCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHBvbHlnb25Qcm9taXNlOiBQcm9taXNlPFBvbHlnb24+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5Z29uKG8pO1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb25zLnNldChwb2x5Z29uLCBwb2x5Z29uUHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIHBvbHlnb24uXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgZXZlbnQuXHJcbiAgICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAgKlxyXG4gICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKS50aGVuKChwOiBQb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogRGVsZXRlcyBhIHBvbHlnb24uXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBoYXMgYmVlbiBkZWxldGVkLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLmRlbGV0ZShwb2x5Z29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBwb2x5Z29uIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGUubGF0TG5nLmxhdCgpLCBsb25naXR1ZGU6IGUubGF0TG5nLmxuZygpIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBwb2x5Z29uIG1vZGVsIGZvciB0aGUgcG9seWdvbiBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBwb2x5Z29uIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5Z29ufSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbikudGhlbigobDogUG9seWdvbikgPT4geyBsLlNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgUG9seWdvbiBwYXRoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsIHx8IHBvbHlnb24uUGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwb2x5Z29uLlBhdGhzKSB8fCBwb2x5Z29uLlBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9seWdvbi5QYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIGwuU2V0UGF0aHMocG9seWdvbi5QYXRocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wb2x5Z29uLlBhdGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=