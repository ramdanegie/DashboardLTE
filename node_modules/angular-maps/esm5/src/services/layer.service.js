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
var LayerService = /** @class */ (function () {
    function LayerService() {
    }
    LayerService.decorators = [
        { type: Injectable },
    ];
    return LayerService;
}());
export { LayerService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Z0JBaUJsRCxVQUFVOzt1QkFqQlg7O1NBa0JzQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNsYXNzIHRvIHRvIGRlZmluZSB0aGUgbGF5ZXIgc2VydmljZSBjb250cmFjdC4gTXVzdCBiZSByZWFsaXplZCBieSBpbXBsZW1lbnRpbmcgcHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllclNlcnZpY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxyXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllckRpcmVjdGl2ZSB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG1hcmtlciB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbWFya2VyLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBNYXJrZXIgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2VyLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBNYXJrZXIgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIG1hcmtlcnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIG1hcmtlcnMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBNYXJrZXIgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2Vycy5cclxuICAgICAqIEBwYXJhbSBtYXJrZXJJY29uIC0gT3B0aW9uYWwgaW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgY3VzdG9tIG1hcmtlcnMuIFRoaXMgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBtYXJrZXJzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgTWFya2VyIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVNYXJrZXJzKG9wdGlvbnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiwgbWFya2VySWNvbj86IElNYXJrZXJJY29uSW5mbyk6IFByb21pc2U8QXJyYXk8TWFya2VyPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBsaW5lLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5Z29ucy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWdvbnMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWdvbiBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlUG9seWdvbnMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlnb25PcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBsaW5lLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBtYXJrZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhblxyXG4gICAgICogYXJyYXkgb2YgcG9seWxpbmVzIGZvciBjb21wbGV4IHBhdGhzKSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlsaW5lIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZXMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXJcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBMYXllciBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBvciBNYXBMYXllcklkIGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIgbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIExheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldE5hdGl2ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZXxudW1iZXIpOiBQcm9taXNlPExheWVyPjtcclxufVxyXG4iXX0=