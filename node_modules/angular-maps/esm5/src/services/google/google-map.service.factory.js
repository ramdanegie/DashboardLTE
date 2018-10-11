/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
import { GoogleMapAPILoader, GoogleMapAPILoaderConfig } from './google-map-api-loader.service';
import { GoogleInfoBoxService } from './google-infobox.service';
import { GoogleMarkerService } from './google-marker.service';
import { GoogleMapService } from './google-map.service';
import { GoogleLayerService } from './google-layer.service';
import { GoogleClusterService } from './google-cluster.service';
import { GooglePolygonService } from './google-polygon.service';
import { GooglePolylineService } from './google-polyline.service';
/**
 * Implements a factory to create three necessary Google Maps specific service instances.
 *
 * @export
 */
var GoogleMapServiceFactory = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleMapServiceFactory.
     * @param _loader - {@link MapAPILoader} implementation for the Google Map provider.
     * @param _zone - NgZone object to implement zone aware promises.
     *
     * @memberof GoogleMapServiceFactory
     */
    function GoogleMapServiceFactory(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    /**
     * Creates the map service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
     *
     */
    GoogleMapServiceFactory.prototype.Create = /**
     * Creates the map service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
     *
     */
    function () {
        return new GoogleMapService(this._loader, this._zone);
    };
    /**
     * Creates the cluster service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateClusterService = /**
     * Creates the cluster service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
     *
     */
    function (_mapService) {
        return new GoogleClusterService(_mapService, this._zone);
    };
    /**
     * Creates thh info box service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _markerService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateInfoBoxService = /**
     * Creates thh info box service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _markerService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
     *
     */
    function (_mapService, _markerService) {
        return new GoogleInfoBoxService(_mapService, _markerService, this._zone);
    };
    /**
     * Creates the layer service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateLayerService = /**
     * Creates the layer service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
     *
     */
    function (_mapService) {
        return new GoogleLayerService(_mapService, this._zone);
    };
    /**
     * Creates the marker service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateMarkerService = /**
     * Creates the marker service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
     *
     */
    function (_mapService, _layerService, _clusterService) {
        return new GoogleMarkerService(_mapService, _layerService, _clusterService, this._zone);
    };
    /**
     * Creates the polygon service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    GoogleMapServiceFactory.prototype.CreatePolygonService = /**
     * Creates the polygon service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new GooglePolygonService(map, layers, this._zone);
    };
    /**
     * Creates the polyline service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    GoogleMapServiceFactory.prototype.CreatePolylineService = /**
     * Creates the polyline service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new GooglePolylineService(map, layers, this._zone);
    };
    GoogleMapServiceFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMapServiceFactory.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return GoogleMapServiceFactory;
}());
export { GoogleMapServiceFactory };
function GoogleMapServiceFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMapServiceFactory.prototype._map;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._mapResolver;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._loader;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._zone;
}
/**
 *  Creates a new instance of a plaform specific MapServiceFactory.
 *
 * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link GoogleMapAPILoader}.
 * @param {?} zone - An NgZone instance to provide zone aware promises.
 *
 * @return {?} - A {\@link MapServiceFactory} instance.
 */
export function GoogleMapServiceFactoryFactory(apiLoader, zone) {
    return new GoogleMapServiceFactory(apiLoader, zone);
}
/**
 * Creates a new instance of a plaform specific MapLoaderFactory.
 *
 * @export
 * @return {?} - A {\@link MapAPILoader} instance.
 */
export function GoogleMapLoaderFactory() {
    return new GoogleMapAPILoader(new GoogleMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVV2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7OztJQVk5RCxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxpQ0FBb0IsT0FBcUIsRUFBVSxLQUFhO1FBQWhFLGlCQUdDO1FBSG1CLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQ0wsSUFBSSxPQUFPLENBQTJCLFVBQUMsT0FBbUIsSUFBTyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4Rzs7Ozs7Ozs7SUFhTSx3Q0FBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVduRCxzREFBb0I7Ozs7Ozs7O2NBQUMsV0FBdUI7UUFDL0MsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZdEQsc0RBQW9COzs7Ozs7Ozs7Y0FBQyxXQUF1QixFQUFFLGNBQTZCO1FBQzlFLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV3RFLG9EQUFrQjs7Ozs7Ozs7Y0FBQyxXQUF1QjtRQUM3QyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhcEQscURBQW1COzs7Ozs7Ozs7O2NBQUMsV0FBdUIsRUFBRSxhQUFpQyxFQUFFLGVBQXFDO1FBQ3hILE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZckYsc0RBQW9COzs7Ozs7Ozs7Y0FBQyxHQUFlLEVBQUUsTUFBb0I7UUFDN0QsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXRELHVEQUFxQjs7Ozs7Ozs7O2NBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBOUdqRSxVQUFVOzs7O2dCQXhCRixZQUFZO2dCQUhBLE1BQU07O2tDQUEzQjs7U0E0QmEsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEhwQyxNQUFNLHlDQUF5QyxTQUF1QixFQUFFLElBQVk7SUFDaEYsTUFBTSxDQUFDLElBQUksdUJBQXVCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3ZEOzs7Ozs7O0FBUUQsTUFBTTtJQUNGLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksd0JBQXdCLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztDQUNyRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4uL21hcHNlcnZpY2VmYWN0b3J5JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9pbmZvYm94LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcclxuXHJcbmltcG9ydCB7IEdvb2dsZU1hcEFQSUxvYWRlciwgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9nb29nbGUtbWFwLWFwaS1sb2FkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFya2VyU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLW1hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlUG9seWdvblNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1wb2x5bGluZS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgZmFjdG9yeSB0byBjcmVhdGUgdGhyZWUgbmVjZXNzYXJ5IEdvb2dsZSBNYXBzIHNwZWNpZmljIHNlcnZpY2UgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeSBpbXBsZW1lbnRzIE1hcFNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHByaXZhdGUgX21hcDogUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+O1xyXG4gICAgcHJpdmF0ZSBfbWFwUmVzb2x2ZXI6ICh2YWx1ZT86IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gdm9pZDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5LlxyXG4gICAgICogQHBhcmFtIF9sb2FkZXIgLSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIEdvb2dsZSBNYXAgcHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgb2JqZWN0IHRvIGltcGxlbWVudCB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IE1hcEFQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwID1cclxuICAgICAgICAgICAgbmV3IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlRmFjdG9yeSBpbXBsZW1lbnRhdGlvbi5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFwIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZSgpOiBNYXBTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdvb2dsZU1hcFNlcnZpY2UodGhpcy5fbG9hZGVyLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBDbHVzdGVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlQ2x1c3RlclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2x1c3RlclNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVDbHVzdGVyU2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoaCBpbmZvIGJveCBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFya2VyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFya2VyU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJbmZvQm94U2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlSW5mb0JveFNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVJbmZvQm94U2VydmljZShfbWFwU2VydmljZSwgX21hcmtlclNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5ZXIgc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBMYXllclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdvb2dsZUxheWVyU2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXJrZXIgc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBjbHVzdGVycyAgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlfS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcmtlclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyU2VydmljZShfbWFwU2VydmljZTogTWFwU2VydmljZSwgX2xheWVyU2VydmljZTogR29vZ2xlTGF5ZXJTZXJ2aWNlLCBfY2x1c3RlclNlcnZpY2U6IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVNYXJrZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlLCBfbGF5ZXJTZXJ2aWNlLCBfY2x1c3RlclNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWdvbiBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWdvblNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvblNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdvb2dsZVBvbHlnb25TZXJ2aWNlKG1hcCwgbGF5ZXJzLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlsaW5lIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5bGluZVNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgR29vZ2xlUG9seWxpbmVTZXJ2aWNlKG1hcCwgbGF5ZXJzLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHBsYWZvcm0gc3BlY2lmaWMgTWFwU2VydmljZUZhY3RvcnkuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcGlMb2FkZXIgLSBBbiB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS4gVGhpcyBpcyBleHBlY3RlZCB0byB0aGUgYSB7QGxpbmsgR29vZ2xlTWFwQVBJTG9hZGVyfS5cclxuICogQHBhcmFtIHpvbmUgLSBBbiBOZ1pvbmUgaW5zdGFuY2UgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtIEEge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeUZhY3RvcnkoYXBpTG9hZGVyOiBNYXBBUElMb2FkZXIsIHpvbmU6IE5nWm9uZSk6IE1hcFNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwU2VydmljZUZhY3RvcnkoYXBpTG9hZGVyLCB6b25lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBwbGFmb3JtIHNwZWNpZmljIE1hcExvYWRlckZhY3RvcnkuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHJldHVybnMgLSBBIHtAbGluayBNYXBBUElMb2FkZXJ9IGluc3RhbmNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEdvb2dsZU1hcExvYWRlckZhY3RvcnkoKTogTWFwQVBJTG9hZGVyIHtcclxuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwQVBJTG9hZGVyKG5ldyBHb29nbGVNYXBBUElMb2FkZXJDb25maWcoKSwgbmV3IFdpbmRvd1JlZigpLCBuZXcgRG9jdW1lbnRSZWYoKSk7XHJcbn1cclxuIl19