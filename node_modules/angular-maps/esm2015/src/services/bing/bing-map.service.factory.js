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
export class BingMapServiceFactory {
    /**
     * Creates an instance of BingMapServiceFactory.
     * \@memberof BingMapServiceFactory
     * @param {?} _loader - {\@link MapAPILoader} implementation for the Bing Map V8 provider.
     * @param {?} _zone - NgZone object to implement zone aware promises.
     *
     */
    constructor(_loader, _zone) {
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
    Create() {
        return new BingMapService(this._loader, this._zone);
    }
    /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    CreateClusterService(_mapService) {
        return new BingClusterService(_mapService, this._zone);
    }
    /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    CreateInfoBoxService(_mapService) {
        return new BingInfoBoxService(_mapService, this._zone);
    }
    /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    CreateLayerService(_mapService) {
        return new BingLayerService(_mapService, this._zone);
    }
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
    CreateMarkerService(_mapService, _layerService, _clusterService) {
        return new BingMarkerService(_mapService, _layerService, _clusterService, this._zone);
    }
    /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    CreatePolygonService(map, layers) {
        return new BingPolygonService(map, layers, this._zone);
    }
    /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    CreatePolylineService(map, layers) {
        return new BingPolylineService(map, layers, this._zone);
    }
}
BingMapServiceFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapServiceFactory.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU92RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQVE5RCxNQUFNOzs7Ozs7OztJQWFGLFlBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtLQUFLOzs7Ozs7OztJQWE5RCxNQUFNO1FBQ1QsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV2pELG9CQUFvQixDQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsb0JBQW9CLENBQUMsV0FBMkI7UUFDbkQsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdwRCxrQkFBa0IsQ0FBQyxXQUEyQjtRQUNqRCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhbEQsbUJBQW1CLENBQUMsV0FBMkIsRUFDbEQsYUFBK0IsRUFBRSxlQUFtQztRQUNwRSxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWW5GLG9CQUFvQixDQUFDLEdBQWUsRUFBRSxNQUFvQjtRQUM3RCxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZcEQscUJBQXFCLENBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBekcvRCxVQUFVOzs7O1lBckJGLFlBQVk7WUFIQSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7OztBQStJM0IsTUFBTSx1Q0FBdUMsU0FBdUIsRUFBRSxJQUFZO0lBQzlFLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNyRDs7Ozs7OztBQVFELE1BQU07SUFDRixNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLHNCQUFzQixFQUFFLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7Q0FDakciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuLi9tYXBzZXJ2aWNlZmFjdG9yeSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9wb2x5bGluZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcEFQSUxvYWRlciwgQmluZ01hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0luZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLWluZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLWxheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2JpbmctY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ1BvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLXBvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuL2JpbmctcG9seWxpbmUuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhIGZhY3RvcnkgdG8gY3JlYXRlIHRocmUgbmVjZXNzYXJ5IEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBzZXJ2aWNlIGluc3RhbmNlcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ01hcFNlcnZpY2VGYWN0b3J5IGltcGxlbWVudHMgTWFwU2VydmljZUZhY3Rvcnkge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5LlxyXG4gICAgICogQHBhcmFtIF9sb2FkZXIgLSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIEJpbmcgTWFwIFY4IHByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIG9iamVjdCB0byBpbXBsZW1lbnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvYWRlcjogTWFwQVBJTG9hZGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlRmFjdG9yeSBpbXBsZW1lbnRhdGlvbi5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFwIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZSgpOiBNYXBTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdNYXBTZXJ2aWNlKHRoaXMuX2xvYWRlciwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVyIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBDbHVzdGVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ0NsdXN0ZXJTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVDbHVzdGVyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nQ2x1c3RlclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGggaW5mbyBib3ggc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nSW5mb0JveFNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUluZm9Cb3hTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSk6IEluZm9Cb3hTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdJbmZvQm94U2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXllciBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdMYXllclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFya2VyIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ0xheWVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlcnMgIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nQ2x1c3RlclNlcnZpY2V9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFya2VyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcmtlclNlcnZpY2V9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlclNlcnZpY2UoX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlLFxyXG4gICAgICAgIF9sYXllclNlcnZpY2U6IEJpbmdMYXllclNlcnZpY2UsIF9jbHVzdGVyU2VydmljZTogQmluZ0NsdXN0ZXJTZXJ2aWNlKTogTWFya2VyU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nTWFya2VyU2VydmljZShfbWFwU2VydmljZSwgX2xheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlnb24gc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5Z29uU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmluZ1BvbHlnb25TZXJ2aWNlKG1hcCwgbGF5ZXJzLCB0aGlzLl96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlsaW5lIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxyXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWxpbmVTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpbmdQb2x5bGluZVNlcnZpY2UobWFwLCBsYXllcnMsIHRoaXMuX3pvbmUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBwbGFmb3JtIHNwZWNpZmljIE1hcFNlcnZpY2VGYWN0b3J5LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBhcGlMb2FkZXIgLSBBbiB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS4gVGhpcyBpcyBleHBlY3RlZCB0byB0aGUgYSB7QGxpbmsgQmluZ01hcEFQSUxvYWRlcn0uXHJcbiAqIEBwYXJhbSB6b25lIC0gQW4gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICpcclxuICogQHJldHVybnMgLSAgQSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGluc3RhbmNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeUZhY3RvcnkoYXBpTG9hZGVyOiBNYXBBUElMb2FkZXIsIHpvbmU6IE5nWm9uZSk6IE1hcFNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHJldHVybiBuZXcgQmluZ01hcFNlcnZpY2VGYWN0b3J5KGFwaUxvYWRlciwgem9uZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgcGxhZm9ybSBzcGVjaWZpYyBNYXBMb2FkZXJGYWN0b3J5LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEByZXR1cm5zIC0gQSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCaW5nTWFwTG9hZGVyRmFjdG9yeSgpOiBNYXBBUElMb2FkZXIge1xyXG4gICAgcmV0dXJuIG5ldyBCaW5nTWFwQVBJTG9hZGVyKG5ldyBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnKCksIG5ldyBXaW5kb3dSZWYoKSwgbmV3IERvY3VtZW50UmVmKCkpO1xyXG59XHJcbiJdfQ==