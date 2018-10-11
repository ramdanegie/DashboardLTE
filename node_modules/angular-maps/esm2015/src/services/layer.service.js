/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract class to to define the layer service contract. Must be realized by implementing provider.
 *
 * @export
 * @abstract
 * @abstract
 */
export class LayerService {
}
LayerService.decorators = [
    { type: Injectable },
];
function LayerService_tsickle_Closure_declarations() {
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    LayerService.prototype.AddLayer = function (layer) { };
    /**
     * Adds a marker to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the marker.
     * @param {?} options - Marker options defining the marker.
     * @return {?} - A promise that when fullfilled contains the an instance of the Marker model.
     *
     */
    LayerService.prototype.CreateMarker = function (layer, options) { };
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    LayerService.prototype.CreateMarkers = function (options, markerIcon) { };
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polygon options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    LayerService.prototype.CreatePolygon = function (layer, options) { };
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    LayerService.prototype.CreatePolygons = function (layer, options) { };
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the marker.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polylines for complex paths) model.
     *
     */
    LayerService.prototype.CreatePolyline = function (layer, options) { };
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    LayerService.prototype.CreatePolylines = function (layer, options) { };
    /**
     * Deletes the layer
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    LayerService.prototype.DeleteLayer = function (layer) { };
    /**
     * Returns the Layer model represented by this layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object or MapLayerId for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    LayerService.prototype.GetNativeLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQWtCbkQsTUFBTTs7O1lBREwsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjbGFzcyB0byB0byBkZWZpbmUgdGhlIGxheWVyIHNlcnZpY2UgY29udHJhY3QuIE11c3QgYmUgcmVhbGl6ZWQgYnkgaW1wbGVtZW50aW5nIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cclxuICAgICAqIEdlbmVyYWxseSwgTWFwTGF5ZXJEaXJlY3RpdmUgd2lsbCBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgICogTGF5ZXJTZXJ2aWNlIGFuZCB0aGVuIHNlbGYgcmVnaXN0ZXIgb24gaW5pdGlhbGl6YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIG1hcmtlci5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTWFya2VyIG9wdGlvbnMgZGVmaW5pbmcgdGhlIG1hcmtlci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgTWFya2VyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBtYXJrZXJzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBtYXJrZXJzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTWFya2VyIG9wdGlvbnMgZGVmaW5pbmcgdGhlIG1hcmtlcnMuXHJcbiAgICAgKiBAcGFyYW0gbWFya2VySWNvbiAtIE9wdGlvbmFsIGluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGN1c3RvbSBtYXJrZXJzLiBUaGlzIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgbWFya2Vycy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIE1hcmtlciBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlTWFya2VycyhvcHRpb25zOiBBcnJheTxJTWFya2VyT3B0aW9ucz4sIG1hcmtlckljb24/OiBJTWFya2VySWNvbkluZm8pOiBQcm9taXNlPEFycmF5PE1hcmtlcj4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgbGluZS5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWdvbiBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29ucy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2VyLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW5cclxuICAgICAqIGFycmF5IG9mIHBvbHlsaW5lcyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlsaW5lcy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWxpbmVzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlUG9seWxpbmVzKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBEZWxldGVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTGF5ZXIgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3Qgb3IgTWFwTGF5ZXJJZCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIHRoZSBMYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXROYXRpdmVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmV8bnVtYmVyKTogUHJvbWlzZTxMYXllcj47XHJcbn1cclxuIl19