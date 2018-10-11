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
export class GoogleMapServiceFactory {
    /**
     * Creates an instance of GoogleMapServiceFactory.
     * \@memberof GoogleMapServiceFactory
     * @param {?} _loader - {\@link MapAPILoader} implementation for the Google Map provider.
     * @param {?} _zone - NgZone object to implement zone aware promises.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise((resolve) => { this._mapResolver = resolve; });
    }
    /**
     * Creates the map service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
     *
     */
    Create() {
        return new GoogleMapService(this._loader, this._zone);
    }
    /**
     * Creates the cluster service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
     *
     */
    CreateClusterService(_mapService) {
        return new GoogleClusterService(_mapService, this._zone);
    }
    /**
     * Creates thh info box service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _markerService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
     *
     */
    CreateInfoBoxService(_mapService, _markerService) {
        return new GoogleInfoBoxService(_mapService, _markerService, this._zone);
    }
    /**
     * Creates the layer service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
     *
     */
    CreateLayerService(_mapService) {
        return new GoogleLayerService(_mapService, this._zone);
    }
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
    CreateMarkerService(_mapService, _layerService, _clusterService) {
        return new GoogleMarkerService(_mapService, _layerService, _clusterService, this._zone);
    }
    /**
     * Creates the polygon service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    CreatePolygonService(map, layers) {
        return new GooglePolygonService(map, layers, this._zone);
    }
    /**
     * Creates the polyline service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    CreatePolylineService(map, layers) {
        return new GooglePolylineService(map, layers, this._zone);
    }
}
GoogleMapServiceFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapServiceFactory.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVV2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0FBUWxFLE1BQU07Ozs7Ozs7O0lBZUYsWUFBb0IsT0FBcUIsRUFBVSxLQUFhO1FBQTVDLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQ0wsSUFBSSxPQUFPLENBQTJCLENBQUMsT0FBbUIsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDeEc7Ozs7Ozs7O0lBYU0sTUFBTTtRQUNULE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV25ELG9CQUFvQixDQUFDLFdBQXVCO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXRELG9CQUFvQixDQUFDLFdBQXVCLEVBQUUsY0FBNkI7UUFDOUUsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXdEUsa0JBQWtCLENBQUMsV0FBdUI7UUFDN0MsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYXBELG1CQUFtQixDQUFDLFdBQXVCLEVBQUUsYUFBaUMsRUFBRSxlQUFxQztRQUN4SCxNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXJGLG9CQUFvQixDQUFDLEdBQWUsRUFBRSxNQUFvQjtRQUM3RCxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZdEQscUJBQXFCLENBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBOUdqRSxVQUFVOzs7O1lBeEJGLFlBQVk7WUFIQSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNKM0IsTUFBTSx5Q0FBeUMsU0FBdUIsRUFBRSxJQUFZO0lBQ2hGLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN2RDs7Ozs7OztBQVFELE1BQU07SUFDRixNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7Q0FDckciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuLi9tYXBzZXJ2aWNlZmFjdG9yeSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9wb2x5bGluZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5pbXBvcnQgeyBHb29nbGVNYXBBUElMb2FkZXIsIEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVJbmZvQm94U2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLWluZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcmtlclNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcFNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxheWVyU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLWxheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLWNsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZVBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtcG9seWxpbmUuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhIGZhY3RvcnkgdG8gY3JlYXRlIHRocmVlIG5lY2Vzc2FyeSBHb29nbGUgTWFwcyBzcGVjaWZpYyBzZXJ2aWNlIGluc3RhbmNlcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50cyBNYXBTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBwcml2YXRlIF9tYXA6IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPjtcclxuICAgIHByaXZhdGUgX21hcFJlc29sdmVyOiAodmFsdWU/OiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHZvaWQ7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeS5cclxuICAgICAqIEBwYXJhbSBfbG9hZGVyIC0ge0BsaW5rIE1hcEFQSUxvYWRlcn0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSBHb29nbGUgTWFwIHByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIG9iamVjdCB0byBpbXBsZW1lbnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9XHJcbiAgICAgICAgICAgIG5ldyBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHsgdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50YXRpb24uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIG1hcCBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGUoKTogTWFwU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVNYXBTZXJ2aWNlKHRoaXMuX2xvYWRlciwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVyIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKTogQ2x1c3RlclNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgR29vZ2xlQ2x1c3RlclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGggaW5mbyBib3ggc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcmtlclNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUluZm9Cb3hTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUluZm9Cb3hTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBfbWFya2VyU2VydmljZTogTWFya2VyU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgR29vZ2xlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2UsIF9tYXJrZXJTZXJ2aWNlLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheWVyIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVMYXllclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTGF5ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFya2VyIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlcnMgIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVDbHVzdGVyU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXJrZXJTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlclNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF9sYXllclNlcnZpY2U6IEdvb2dsZUxheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlOiBHb29nbGVDbHVzdGVyU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgR29vZ2xlTWFya2VyU2VydmljZShfbWFwU2VydmljZSwgX2xheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlnb24gc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cclxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIFBvbHlnb25TZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25TZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5Z29uU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVQb2x5Z29uU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBwb2x5bGluZSBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWxpbmVTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdvb2dsZVBvbHlsaW5lU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBwbGFmb3JtIHNwZWNpZmljIE1hcFNlcnZpY2VGYWN0b3J5LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXBpTG9hZGVyIC0gQW4ge0BsaW5rIE1hcEFQSUxvYWRlcn0gaW5zdGFuY2UuIFRoaXMgaXMgZXhwZWN0ZWQgdG8gdGhlIGEge0BsaW5rIEdvb2dsZU1hcEFQSUxvYWRlcn0uXHJcbiAqIEBwYXJhbSB6b25lIC0gQW4gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICpcclxuICogQHJldHVybnMgLSBBIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gR29vZ2xlTWFwU2VydmljZUZhY3RvcnlGYWN0b3J5KGFwaUxvYWRlcjogTWFwQVBJTG9hZGVyLCB6b25lOiBOZ1pvbmUpOiBNYXBTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5KGFwaUxvYWRlciwgem9uZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgcGxhZm9ybSBzcGVjaWZpYyBNYXBMb2FkZXJGYWN0b3J5LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEByZXR1cm5zIC0gQSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVNYXBMb2FkZXJGYWN0b3J5KCk6IE1hcEFQSUxvYWRlciB7XHJcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcEFQSUxvYWRlcihuZXcgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnKCksIG5ldyBXaW5kb3dSZWYoKSwgbmV3IERvY3VtZW50UmVmKCkpO1xyXG59XHJcbiJdfQ==