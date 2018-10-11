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
export class MapServiceFactory {
}
MapServiceFactory.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc2VydmljZWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBZ0IzQyxNQUFNOzs7WUFETCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4vcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi9wb2x5bGluZS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgZmFjdG9yeSB0byBjcmVhdGUgYWxsIHRoZSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZjIHNlcnZpY2VzIGZvciBhIG1hcCBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwU2VydmljZUZhY3Rvcnkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFwIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRpbmcgYSBzcGVjaWZpYyB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZSgpOiBNYXBTZXJ2aWNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY2x1c3RlciBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVDbHVzdGVyU2VydmljZShtYXA6IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGluZm8gYm94IHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXJrZXIgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJbmZvQm94U2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZUluZm9Cb3hTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbWFya2VyOiBNYXJrZXJTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXllciBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlTGF5ZXJTZXJ2aWNlKG1hcDogTWFwU2VydmljZSk6IExheWVyU2VydmljZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIG1hcmtlciBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGNsdXN0ZXJzICAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlTWFya2VyU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlLCBjbHVzdGVyczogQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWdvbiBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWdvblNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVQb2x5Z29uU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBwb2x5bGluZSBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWxpbmVTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2U7XHJcblxyXG59XHJcbiJdfQ==