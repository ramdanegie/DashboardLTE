/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
import { BingMapAPILoader, BingMapAPILoaderConfig } from './bing-map.api-loader.service';
import { BingInfoBoxService } from './bing-infobox.service';
import { BingMarkerService } from './bing-marker.service';
import { BingMapService } from './bing-map.service';
import { BingLayerService } from './bing-layer.service';
import { BingClusterService } from './bing-cluster.service';
import { BingPolygonService } from './bing-polygon.service';
import { BingPolylineService } from './bing-polyline.service';
/**
 * Implements a factory to create thre necessary Bing Maps V8 specific service instances.
 *
 * @export
 */
var BingMapServiceFactory = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMapServiceFactory.
     * @param _loader - {@link MapAPILoader} implementation for the Bing Map V8 provider.
     * @param _zone - NgZone object to implement zone aware promises.
     *
     * @memberof BingMapServiceFactory
     */
    function BingMapServiceFactory(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
    }
    /**
     * Creates the map service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
     *
     */
    BingMapServiceFactory.prototype.Create = /**
     * Creates the map service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
     *
     */
    function () {
        return new BingMapService(this._loader, this._zone);
    };
    /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    BingMapServiceFactory.prototype.CreateClusterService = /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    function (_mapService) {
        return new BingClusterService(_mapService, this._zone);
    };
    /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    BingMapServiceFactory.prototype.CreateInfoBoxService = /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    function (_mapService) {
        return new BingInfoBoxService(_mapService, this._zone);
    };
    /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    BingMapServiceFactory.prototype.CreateLayerService = /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    function (_mapService) {
        return new BingLayerService(_mapService, this._zone);
    };
    /**
     * Creates the marker service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
     *
     */
    BingMapServiceFactory.prototype.CreateMarkerService = /**
     * Creates the marker service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
     *
     */
    function (_mapService, _layerService, _clusterService) {
        return new BingMarkerService(_mapService, _layerService, _clusterService, this._zone);
    };
    /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    BingMapServiceFactory.prototype.CreatePolygonService = /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new BingPolygonService(map, layers, this._zone);
    };
    /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    BingMapServiceFactory.prototype.CreatePolylineService = /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new BingPolylineService(map, layers, this._zone);
    };
    BingMapServiceFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapServiceFactory.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return BingMapServiceFactory;
}());
export { BingMapServiceFactory };
function BingMapServiceFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMapServiceFactory.prototype._loader;
    /** @type {?} */
    BingMapServiceFactory.prototype._zone;
}
/**
 * Creates a new instance of a plaform specific MapServiceFactory.
 *
 * @export
 * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link BingMapAPILoader}.
 * @param {?} zone - An NgZone instance to provide zone aware promises.
 *
 * @return {?} -  A {\@link MapServiceFactory} instance.
 */
export function BingMapServiceFactoryFactory(apiLoader, zone) {
    return new BingMapServiceFactory(apiLoader, zone);
}
/**
 * Creates a new instance of a plaform specific MapLoaderFactory.
 *
 * @export
 * @return {?} - A {\@link MapAPILoader} instance.
 */
export function BingMapLoaderFactory() {
    return new BingMapAPILoader(new BingMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU92RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7SUFVMUQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsK0JBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtLQUFLOzs7Ozs7OztJQWE5RCxzQ0FBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXakQsb0RBQW9COzs7Ozs7OztjQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsb0RBQW9COzs7Ozs7OztjQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsa0RBQWtCOzs7Ozs7OztjQUFDLFdBQTJCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQWFsRCxtREFBbUI7Ozs7Ozs7Ozs7Y0FBQyxXQUEyQixFQUNsRCxhQUErQixFQUFFLGVBQW1DO1FBQ3BFLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZbkYsb0RBQW9COzs7Ozs7Ozs7Y0FBQyxHQUFlLEVBQUUsTUFBb0I7UUFDN0QsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXBELHFEQUFxQjs7Ozs7Ozs7O2NBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBekcvRCxVQUFVOzs7O2dCQXJCRixZQUFZO2dCQUhBLE1BQU07O2dDQUEzQjs7U0F5QmEscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7O0FBc0hsQyxNQUFNLHVDQUF1QyxTQUF1QixFQUFFLElBQVk7SUFDOUUsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3JEOzs7Ozs7O0FBUUQsTUFBTTtJQUNGLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksc0JBQXNCLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztDQUNqRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4uL21hcHNlcnZpY2VmYWN0b3J5JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9pbmZvYm94LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nTWFwQVBJTG9hZGVyLCBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9iaW5nLW1hcC5hcGktbG9hZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL2JpbmctaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcmtlclNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4vYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdMYXllclNlcnZpY2UgfSBmcm9tICcuL2JpbmctbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vYmluZy1jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nUG9seWdvblNlcnZpY2UgfSBmcm9tICcuL2JpbmctcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ1BvbHlsaW5lU2VydmljZSB9IGZyb20gJy4vYmluZy1wb2x5bGluZS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgZmFjdG9yeSB0byBjcmVhdGUgdGhyZSBuZWNlc3NhcnkgQmluZyBNYXBzIFY4IHNwZWNpZmljIHNlcnZpY2UgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50cyBNYXBTZXJ2aWNlRmFjdG9yeSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwU2VydmljZUZhY3RvcnkuXHJcbiAgICAgKiBAcGFyYW0gX2xvYWRlciAtIHtAbGluayBNYXBBUElMb2FkZXJ9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgQmluZyBNYXAgVjggcHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgb2JqZWN0IHRvIGltcGxlbWVudCB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2VGYWN0b3J5IGltcGxlbWVudGF0aW9uLlxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXAgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlKCk6IE1hcFNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmluZ01hcFNlcnZpY2UodGhpcy5fbG9hZGVyLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nQ2x1c3RlclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdDbHVzdGVyU2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoaCBpbmZvIGJveCBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdJbmZvQm94U2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmluZ0luZm9Cb3hTZXJ2aWNlKF9tYXBTZXJ2aWNlLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheWVyIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBMYXllclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUxheWVyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UpOiBMYXllclNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmluZ0xheWVyU2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXJrZXIgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBjbHVzdGVycyAgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdDbHVzdGVyU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFya2VyU2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UsXHJcbiAgICAgICAgX2xheWVyU2VydmljZTogQmluZ0xheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlOiBCaW5nQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdNYXJrZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlLCBfbGF5ZXJTZXJ2aWNlLCBfY2x1c3RlclNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWdvbiBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cclxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIFBvbHlnb25TZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25TZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5Z29uU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nUG9seWdvblNlcnZpY2UobWFwLCBsYXllcnMsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWxpbmUgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5bGluZVNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmluZ1BvbHlsaW5lU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHBsYWZvcm0gc3BlY2lmaWMgTWFwU2VydmljZUZhY3RvcnkuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGFwaUxvYWRlciAtIEFuIHtAbGluayBNYXBBUElMb2FkZXJ9IGluc3RhbmNlLiBUaGlzIGlzIGV4cGVjdGVkIHRvIHRoZSBhIHtAbGluayBCaW5nTWFwQVBJTG9hZGVyfS5cclxuICogQHBhcmFtIHpvbmUgLSBBbiBOZ1pvbmUgaW5zdGFuY2UgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtICBBIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gQmluZ01hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeShhcGlMb2FkZXI6IE1hcEFQSUxvYWRlciwgem9uZTogTmdab25lKTogTWFwU2VydmljZUZhY3Rvcnkge1xyXG4gICAgcmV0dXJuIG5ldyBCaW5nTWFwU2VydmljZUZhY3RvcnkoYXBpTG9hZGVyLCB6b25lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBwbGFmb3JtIHNwZWNpZmljIE1hcExvYWRlckZhY3RvcnkuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHJldHVybnMgLSBBIHtAbGluayBNYXBBUElMb2FkZXJ9IGluc3RhbmNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmdNYXBMb2FkZXJGYWN0b3J5KCk6IE1hcEFQSUxvYWRlciB7XHJcbiAgICByZXR1cm4gbmV3IEJpbmdNYXBBUElMb2FkZXIobmV3IEJpbmdNYXBBUElMb2FkZXJDb25maWcoKSwgbmV3IFdpbmRvd1JlZigpLCBuZXcgRG9jdW1lbnRSZWYoKSk7XHJcbn1cclxuIl19