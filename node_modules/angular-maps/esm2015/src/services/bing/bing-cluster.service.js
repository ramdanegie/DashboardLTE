/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Marker } from '../../models/marker';
import { MarkerTypeId } from '../../models/marker-type-id';
import { ClusterClickAction } from '../../models/cluster-click-action';
import { MapService } from '../map.service';
import { BingLayerBase } from './bing-layer-base';
/**
 * Implements the {\@link ClusterService} contract for a  Bing Maps V8 specific implementation.
 *
 * @export
 */
export class BingClusterService extends BingLayerBase {
    /**
     * Creates an instance of BingClusterService.
     * \@memberof BingClusterService
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Bing Maps V8. An instance of {\@link BingMapService}.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object.
     * Generally, MapLayer will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    AddLayer(layer) {
        const /** @type {?} */ options = {
            id: layer.Id,
            visible: layer.Visible,
            clusteringEnabled: layer.ClusteringEnabled,
            placementMode: layer.ClusterPlacementMode
        };
        if (layer.GridSize) {
            options.gridSize = layer.GridSize;
        }
        if (layer.LayerOffset) {
            options.layerOffset = layer.LayerOffset;
        }
        if (layer.ZIndex) {
            options.zIndex = layer.ZIndex;
        }
        if (layer.IconInfo) {
            options.clusteredPinCallback = (pin) => { this.CreateClusterPushPin(pin, layer); };
        }
        if (layer.CustomMarkerCallback) {
            options.clusteredPinCallback = (pin) => { this.CreateCustomClusterPushPin(pin, layer); };
        }
        if (layer.SpiderClusterOptions) {
            options.spiderClusterOptions = layer.SpiderClusterOptions;
        }
        const /** @type {?} */ layerPromise = this._mapService.CreateClusterLayer(options);
        (/** @type {?} */ (this._mapService)).MapPromise.then(m => {
            Microsoft.Maps.Events.addHandler(m, 'viewchangeend', (e) => {
                if (layer.ClusteringEnabled && m.getZoom() === 19) {
                    layerPromise.then((l) => {
                        l.SetOptions({ id: layer.Id, clusteringEnabled: false });
                    });
                }
                if (layer.ClusteringEnabled && m.getZoom() < 19) {
                    layerPromise.then((l) => {
                        if (!l.GetOptions().clusteringEnabled) {
                            l.SetOptions({ id: layer.Id, clusteringEnabled: true });
                        }
                    });
                }
            });
        });
        this._layers.set(layer.Id, layerPromise);
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    CreatePolygons(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    StartClustering(layer) {
        const /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.StartClustering();
            });
        });
    }
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    StopClustering(layer) {
        const /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.StopClustering();
            });
        });
    }
    /**
     * Creates the default cluster pushpin as a callback from BingMaps when clustering occurs. The {\@link ClusterLayerDirective} model
     * can provide an IconInfo property that would govern the apparenace of the pin. This method will assign the same pin to all
     * clusters in the layer.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component representing the layer.
     *
     * @return {?}
     */
    CreateClusterPushPin(cluster, layer) {
        this._layers.get(layer.Id).then((l) => {
            if (layer.IconInfo) {
                const /** @type {?} */ o = {};
                const /** @type {?} */ payload = (ico, info) => {
                    o.icon = ico;
                    o.anchor = new Microsoft.Maps.Point((info.size && info.markerOffsetRatio) ? (info.size.width * info.markerOffsetRatio.x) : 0, (info.size && info.markerOffsetRatio) ? (info.size.height * info.markerOffsetRatio.y) : 0);
                    cluster.setOptions(o);
                };
                const /** @type {?} */ icon = Marker.CreateMarker(layer.IconInfo);
                if (typeof (icon) === 'string') {
                    payload(icon, layer.IconInfo);
                }
                else {
                    icon.then(x => {
                        payload(x.icon, x.iconInfo);
                    });
                }
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', (e) => this.ZoomIntoCluster(e));
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', (e) => this.ZoomIntoCluster(e));
                l.InitializeSpiderClusterSupport();
            }
        });
    }
    /**
     * Provides a hook for consumers to provide a custom function to create cluster bins for a cluster. This is particuarily useful
     * in situation where the pin should differ to represent information about the pins in the cluster.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component
     * representing the layer. Set the {\@link ClusterLayerDirective.CustomMarkerCallback}
     * property to define the callback generating the pin.
     *
     * @return {?}
     */
    CreateCustomClusterPushPin(cluster, layer) {
        this._layers.get(layer.Id).then((l) => {
            // assemble markers for callback
            const /** @type {?} */ m = new Array();
            cluster.containedPushpins.forEach(p => {
                const /** @type {?} */ marker = l.GetMarkerFromBingMarker(p);
                if (marker) {
                    m.push(marker);
                }
            });
            const /** @type {?} */ iconInfo = { markerType: MarkerTypeId.None };
            const /** @type {?} */ o = {};
            o.icon = layer.CustomMarkerCallback(m, iconInfo);
            if (o.icon !== '') {
                o.anchor = new Microsoft.Maps.Point((iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.width * iconInfo.markerOffsetRatio.x) : 0, (iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.height * iconInfo.markerOffsetRatio.y) : 0);
                if (iconInfo.textOffset) {
                    o.textOffset = new Microsoft.Maps.Point(iconInfo.textOffset.x, iconInfo.textOffset.y);
                }
                cluster.setOptions(o);
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', (e) => this.ZoomIntoCluster(e));
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', (e) => this.ZoomIntoCluster(e));
                l.InitializeSpiderClusterSupport();
            }
        });
    }
    /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    ZoomIntoCluster(e) {
        const /** @type {?} */ pin = /** @type {?} */ (e.target);
        if (pin && pin.containedPushpins) {
            let /** @type {?} */ bounds;
            const /** @type {?} */ locs = new Array();
            pin.containedPushpins.forEach(p => locs.push(p.getLocation()));
            bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
            // Zoom into the bounding box of the cluster.
            // Add a padding to compensate for the pixel area of the pushpins.
            (/** @type {?} */ (this._mapService)).MapPromise.then((m) => {
                m.setView({ bounds: bounds, padding: 75 });
            });
        }
    }
}
BingClusterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingClusterService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFVbEQsTUFBTSx5QkFBMEIsU0FBUSxhQUFhOzs7Ozs7OztJQWFqRCxZQUFZLFdBQXVCLEVBQUUsS0FBYTtRQUM5QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7Ozs7Ozs7SUFnQk0sUUFBUSxDQUFDLEtBQTRCO1FBQ3hDLHVCQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDNUMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFDMUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFP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QWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O1lBSXpELG1CQUFpQixJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQXFCLEVBQUUsRUFBRTtnQkFDekUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ047Ozs7WUFyUlIsVUFBVTs7OztZQVpGLFVBQVU7WUFkRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nQ2x1c3RlckxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jbHVzdGVyLWxheWVyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdMYXllckJhc2UgfSBmcm9tICcuL2JpbmctbGF5ZXItYmFzZSc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGNvbnRyYWN0IGZvciBhICBCaW5nIE1hcHMgVjggc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdDbHVzdGVyU2VydmljZSBleHRlbmRzIEJpbmdMYXllckJhc2UgaW1wbGVtZW50cyBDbHVzdGVyU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nQ2x1c3RlclNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIEJpbmcgTWFwcyBWOC4gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfbWFwU2VydmljZTogTWFwU2VydmljZSwgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHN1cGVyKF9tYXBTZXJ2aWNlLCBfem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cclxuICAgICAqIEdlbmVyYWxseSwgTWFwTGF5ZXIgd2lsbCBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgICogTGF5ZXJTZXJ2aWNlIGFuZCB0aGVuIHNlbGYgcmVnaXN0ZXIgb24gaW5pdGlhbGl6YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGF5ZXIobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IGxheWVyLklkLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBsYXllci5WaXNpYmxlLFxyXG4gICAgICAgICAgICBjbHVzdGVyaW5nRW5hYmxlZDogbGF5ZXIuQ2x1c3RlcmluZ0VuYWJsZWQsXHJcbiAgICAgICAgICAgIHBsYWNlbWVudE1vZGU6IGxheWVyLkNsdXN0ZXJQbGFjZW1lbnRNb2RlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobGF5ZXIuR3JpZFNpemUpIHsgb3B0aW9ucy5ncmlkU2l6ZSA9IGxheWVyLkdyaWRTaXplOyB9XHJcbiAgICAgICAgaWYgKGxheWVyLkxheWVyT2Zmc2V0KSB7IG9wdGlvbnMubGF5ZXJPZmZzZXQgPSBsYXllci5MYXllck9mZnNldDsgfVxyXG4gICAgICAgIGlmIChsYXllci5aSW5kZXgpIHsgb3B0aW9ucy56SW5kZXggPSBsYXllci5aSW5kZXg7IH1cclxuICAgICAgICBpZiAobGF5ZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5jbHVzdGVyZWRQaW5DYWxsYmFjayA9IChwaW46IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluKSA9PiB7IHRoaXMuQ3JlYXRlQ2x1c3RlclB1c2hQaW4ocGluLCBsYXllcik7IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmNsdXN0ZXJlZFBpbkNhbGxiYWNrID0gKHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pID0+IHsgdGhpcy5DcmVhdGVDdXN0b21DbHVzdGVyUHVzaFBpbihwaW4sIGxheWVyKTsgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLlNwaWRlckNsdXN0ZXJPcHRpb25zKSB7IG9wdGlvbnMuc3BpZGVyQ2x1c3Rlck9wdGlvbnMgPSBsYXllci5TcGlkZXJDbHVzdGVyT3B0aW9uczsgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXllclByb21pc2U6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9ucyk7XHJcbiAgICAgICAgKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBTZXJ2aWNlKS5NYXBQcm9taXNlLnRoZW4obSA9PiB7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICd2aWV3Y2hhbmdlZW5kJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyaW5nRW5hYmxlZCAmJiBtLmdldFpvb20oKSA9PT0gMTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllclByb21pc2UudGhlbigobDogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsLlNldE9wdGlvbnMoeyBpZDogbGF5ZXIuSWQsIGNsdXN0ZXJpbmdFbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyaW5nRW5hYmxlZCAmJiBtLmdldFpvb20oKSA8IDE5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJQcm9taXNlLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsLkdldE9wdGlvbnMoKS5jbHVzdGVyaW5nRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbC5TZXRPcHRpb25zKHsgaWQ6IGxheWVyLklkLCBjbHVzdGVyaW5nRW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBsYXllclByb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWdvbiBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbnMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5Z29uIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBsaW5lLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBsaW5lLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW4gYXJyYXlcclxuICAgICAqIG9mIHBvbHlnb25zIGZvciBjb21wbGV4IHBhdGhzKSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlsaW5lIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZXMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+IHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0IG9mIGVudGl0aWVzXHJcbiAgICAgKiBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXHJcbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcclxuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpO1xyXG4gICAgICAgIGlmIChsID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbDEuU3RhcnRDbHVzdGVyaW5nKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gQ2x1c3RlckxheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpO1xyXG4gICAgICAgIGlmIChsID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbDEuU3RvcENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGRlZmF1bHQgY2x1c3RlciBwdXNocGluIGFzIGEgY2FsbGJhY2sgZnJvbSBCaW5nTWFwcyB3aGVuIGNsdXN0ZXJpbmcgb2NjdXJzLiBUaGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZX0gbW9kZWxcclxuICAgICAqIGNhbiBwcm92aWRlIGFuIEljb25JbmZvIHByb3BlcnR5IHRoYXQgd291bGQgZ292ZXJuIHRoZSBhcHBhcmVuYWNlIG9mIHRoZSBwaW4uIFRoaXMgbWV0aG9kIHdpbGwgYXNzaWduIHRoZSBzYW1lIHBpbiB0byBhbGxcclxuICAgICAqIGNsdXN0ZXJzIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlciAtIFRoZSBjbHVzdGVyIGZvciB3aGljaCB0byBjcmVhdGUgdGhlIHB1c2hwaW4uXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZX0gY29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIENyZWF0ZUNsdXN0ZXJQdXNoUGluKGNsdXN0ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluLCBsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCkudGhlbigobDogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGF5ZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZDogKGljbzogc3RyaW5nLCBpbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHZvaWQgPSAoaWNvLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uaWNvbiA9IGljbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5hbmNob3IgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5mby5zaXplICYmIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGluZm8uc2l6ZS53aWR0aCAqIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueCkgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZm8uc2l6ZSAmJiBpbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChpbmZvLnNpemUuaGVpZ2h0ICogaW5mby5tYXJrZXJPZmZzZXRSYXRpby55KSA6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3Rlci5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb246IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9IE1hcmtlci5DcmVhdGVNYXJrZXIobGF5ZXIuSWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihpY29uKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkKGljb24sIGxheWVyLkljb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24udGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCh4Lmljb24sIHguaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uU3BpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihjbHVzdGVyLCAnZGJsY2xpY2snLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB0aGlzLlpvb21JbnRvQ2x1c3RlcihlKSk7XHJcbiAgICAgICAgICAgICAgICBsLkluaXRpYWxpemVTcGlkZXJDbHVzdGVyU3VwcG9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGhvb2sgZm9yIGNvbnN1bWVycyB0byBwcm92aWRlIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjbHVzdGVyIGJpbnMgZm9yIGEgY2x1c3Rlci4gVGhpcyBpcyBwYXJ0aWN1YXJpbHkgdXNlZnVsXHJcbiAgICAgKiBpbiBzaXR1YXRpb24gd2hlcmUgdGhlIHBpbiBzaG91bGQgZGlmZmVyIHRvIHJlcHJlc2VudCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGlucyBpbiB0aGUgY2x1c3Rlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlciAtIFRoZSBjbHVzdGVyIGZvciB3aGljaCB0byBjcmVhdGUgdGhlIHB1c2hwaW4uXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZX0gY29tcG9uZW50XHJcbiAgICAgKiByZXByZXNlbnRpbmcgdGhlIGxheWVyLiBTZXQgdGhlIHtAbGluayBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuQ3VzdG9tTWFya2VyQ2FsbGJhY2t9XHJcbiAgICAgKiBwcm9wZXJ0eSB0byBkZWZpbmUgdGhlIGNhbGxiYWNrIGdlbmVyYXRpbmcgdGhlIHBpbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQ3JlYXRlQ3VzdG9tQ2x1c3RlclB1c2hQaW4oY2x1c3RlcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4sIGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFzc2VtYmxlIG1hcmtlcnMgZm9yIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGNvbnN0IG06IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xyXG4gICAgICAgICAgICBjbHVzdGVyLmNvbnRhaW5lZFB1c2hwaW5zLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXI6IE1hcmtlciA9IGwuR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyKSB7IG0ucHVzaChtYXJrZXIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvID0geyBtYXJrZXJUeXBlOiBNYXJrZXJUeXBlSWQuTm9uZSB9O1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgby5pY29uID0gbGF5ZXIuQ3VzdG9tTWFya2VyQ2FsbGJhY2sobSwgaWNvbkluZm8pO1xyXG4gICAgICAgICAgICBpZiAoby5pY29uICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgby5hbmNob3IgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgKGljb25JbmZvLnNpemUgJiYgaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGljb25JbmZvLnNpemUud2lkdGggKiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby54KSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgKGljb25JbmZvLnNpemUgJiYgaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGljb25JbmZvLnNpemUuaGVpZ2h0ICogaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueSkgOiAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGljb25JbmZvLnRleHRPZmZzZXQpIHsgby50ZXh0T2Zmc2V0ID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KGljb25JbmZvLnRleHRPZmZzZXQueCwgaWNvbkluZm8udGV4dE9mZnNldC55KTsgfVxyXG4gICAgICAgICAgICAgICAgY2x1c3Rlci5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uU3BpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihjbHVzdGVyLCAnZGJsY2xpY2snLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB0aGlzLlpvb21JbnRvQ2x1c3RlcihlKSk7XHJcbiAgICAgICAgICAgICAgICBsLkluaXRpYWxpemVTcGlkZXJDbHVzdGVyU3VwcG9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBab29tcyBpbnRvIHRoZSBjbHVzdGVyIG9uIGNsaWNrIHNvIHRoYXQgdGhlIG1lbWJlcnMgb2YgdGhlIGNsdXN0ZXIgY29tZm9ydGFibGUgZml0IGludG8gdGhlIHpvbW1lZCBhcmVhLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgRXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFpvb21JbnRvQ2x1c3RlcihlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluPmUudGFyZ2V0O1xyXG4gICAgICAgIGlmIChwaW4gJiYgcGluLmNvbnRhaW5lZFB1c2hwaW5zKSB7XHJcbiAgICAgICAgICAgIGxldCBib3VuZHM6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uUmVjdDtcclxuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpO1xyXG4gICAgICAgICAgICBwaW4uY29udGFpbmVkUHVzaHBpbnMuZm9yRWFjaChwID0+IGxvY3MucHVzaChwLmdldExvY2F0aW9uKCkpKTtcclxuICAgICAgICAgICAgYm91bmRzID0gTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0LmZyb21Mb2NhdGlvbnMobG9jcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBab29tIGludG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY2x1c3Rlci5cclxuICAgICAgICAgICAgLy8gQWRkIGEgcGFkZGluZyB0byBjb21wZW5zYXRlIGZvciB0aGUgcGl4ZWwgYXJlYSBvZiB0aGUgcHVzaHBpbnMuXHJcbiAgICAgICAgICAgICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwU2VydmljZSkuTWFwUHJvbWlzZS50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgICAgIG0uc2V0Vmlldyh7IGJvdW5kczogYm91bmRzLCBwYWRkaW5nOiA3NSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=