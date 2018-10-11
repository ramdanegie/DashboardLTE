/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Implements a factory to create all the implementation specifc services for a map implementation
 *
 * @export
 * @abstract
 * @abstract
 */
var MapServiceFactory = /** @class */ (function () {
    function MapServiceFactory() {
    }
    MapServiceFactory.decorators = [
        { type: Injectable },
    ];
    return MapServiceFactory;
}());
export { MapServiceFactory };
function MapServiceFactory_tsickle_Closure_declarations() {
    /**
     * Creates the map service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @return {?} - {\@link MapService} implementing a specific underlying map architecture.
     *
     */
    MapServiceFactory.prototype.Create = function () { };
    /**
     * Creates the cluster service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @return {?} - {\@link ClusterService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateClusterService = function (map) { };
    /**
     * Creates the info box service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} marker - {\@link MarkerService} implementation for thh underlying marker archticture.
     * @return {?} - {\@link InfoBoxService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateInfoBoxService = function (map, marker) { };
    /**
     * Creates the layer service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @return {?} - {\@link LayerService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateLayerService = function (map) { };
    /**
     * Creates the marker service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @param {?} clusters  - {\@link ClusterService} implementation for the underlying map architecture.
     * @return {?} - {\@link MarkerService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateMarkerService = function (map, layers, clusters) { };
    /**
     * Creates the polygon service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreatePolygonService = function (map, layers) { };
    /**
     * Creates the polyline service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreatePolylineService = function (map, layers) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc2VydmljZWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7OztnQkFlMUMsVUFBVTs7NEJBZlg7O1NBZ0JzQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4vbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4vaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSBmYWN0b3J5IHRvIGNyZWF0ZSBhbGwgdGhlIGltcGxlbWVudGF0aW9uIHNwZWNpZmMgc2VydmljZXMgZm9yIGEgbWFwIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBTZXJ2aWNlRmFjdG9yeSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXAgc2VydmljZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGluZyBhIHNwZWNpZmljIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlKCk6IE1hcFNlcnZpY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVyIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZUNsdXN0ZXJTZXJ2aWNlKG1hcDogTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgaW5mbyBib3ggc2VydmljZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSB7QGxpbmsgTWFya2VyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcmtlciBhcmNodGljdHVyZS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlSW5mb0JveFNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBtYXJrZXI6IE1hcmtlclNlcnZpY2UpOiBJbmZvQm94U2VydmljZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheWVyIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVMYXllclNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFya2VyIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlcnMgIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVNYXJrZXJTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UsIGNsdXN0ZXJzOiBDbHVzdGVyU2VydmljZSk6IE1hcmtlclNlcnZpY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBwb2x5Z29uIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5Z29uU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZVBvbHlnb25TZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5Z29uU2VydmljZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlsaW5lIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5bGluZVNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZVNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlsaW5lU2VydmljZTtcclxuXHJcbn1cclxuIl19