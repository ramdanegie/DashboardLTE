/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var BingClusterService = /** @class */ (function (_super) {
    tslib_1.__extends(BingClusterService, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingClusterService.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof BingClusterService
     */
    function BingClusterService(_mapService, _zone) {
        return _super.call(this, _mapService, _zone) || this;
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
    BingClusterService.prototype.AddLayer = /**
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
    function (layer) {
        var _this = this;
        var /** @type {?} */ options = {
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
            options.clusteredPinCallback = function (pin) { _this.CreateClusterPushPin(pin, layer); };
        }
        if (layer.CustomMarkerCallback) {
            options.clusteredPinCallback = function (pin) { _this.CreateCustomClusterPushPin(pin, layer); };
        }
        if (layer.SpiderClusterOptions) {
            options.spiderClusterOptions = layer.SpiderClusterOptions;
        }
        var /** @type {?} */ layerPromise = this._mapService.CreateClusterLayer(options);
        (/** @type {?} */ (this._mapService)).MapPromise.then(function (m) {
            Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) {
                if (layer.ClusteringEnabled && m.getZoom() === 19) {
                    layerPromise.then(function (l) {
                        l.SetOptions({ id: layer.Id, clusteringEnabled: false });
                    });
                }
                if (layer.ClusteringEnabled && m.getZoom() < 19) {
                    layerPromise.then(function (l) {
                        if (!l.GetOptions().clusteringEnabled) {
                            l.SetOptions({ id: layer.Id, clusteringEnabled: true });
                        }
                    });
                }
            });
        });
        this._layers.set(layer.Id, layerPromise);
    };
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
    BingClusterService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    function (layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    };
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
    BingClusterService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    function (layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    };
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
    BingClusterService.prototype.CreatePolyline = /**
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
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
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
    BingClusterService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
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
    BingClusterService.prototype.StartClustering = /**
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
    function (layer) {
        var _this = this;
        var /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.StartClustering();
            });
        });
    };
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
    BingClusterService.prototype.StopClustering = /**
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
    function (layer) {
        var _this = this;
        var /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.StopClustering();
            });
        });
    };
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
    BingClusterService.prototype.CreateClusterPushPin = /**
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
    function (cluster, layer) {
        var _this = this;
        this._layers.get(layer.Id).then(function (l) {
            if (layer.IconInfo) {
                var /** @type {?} */ o_1 = {};
                var /** @type {?} */ payload_1 = function (ico, info) {
                    o_1.icon = ico;
                    o_1.anchor = new Microsoft.Maps.Point((info.size && info.markerOffsetRatio) ? (info.size.width * info.markerOffsetRatio.x) : 0, (info.size && info.markerOffsetRatio) ? (info.size.height * info.markerOffsetRatio.y) : 0);
                    cluster.setOptions(o_1);
                };
                var /** @type {?} */ icon = Marker.CreateMarker(layer.IconInfo);
                if (typeof (icon) === 'string') {
                    payload_1(icon, layer.IconInfo);
                }
                else {
                    icon.then(function (x) {
                        payload_1(x.icon, x.iconInfo);
                    });
                }
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                l.InitializeSpiderClusterSupport();
            }
        });
    };
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
    BingClusterService.prototype.CreateCustomClusterPushPin = /**
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
    function (cluster, layer) {
        var _this = this;
        this._layers.get(layer.Id).then(function (l) {
            // assemble markers for callback
            var /** @type {?} */ m = new Array();
            cluster.containedPushpins.forEach(function (p) {
                var /** @type {?} */ marker = l.GetMarkerFromBingMarker(p);
                if (marker) {
                    m.push(marker);
                }
            });
            var /** @type {?} */ iconInfo = { markerType: MarkerTypeId.None };
            var /** @type {?} */ o = {};
            o.icon = layer.CustomMarkerCallback(m, iconInfo);
            if (o.icon !== '') {
                o.anchor = new Microsoft.Maps.Point((iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.width * iconInfo.markerOffsetRatio.x) : 0, (iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.height * iconInfo.markerOffsetRatio.y) : 0);
                if (iconInfo.textOffset) {
                    o.textOffset = new Microsoft.Maps.Point(iconInfo.textOffset.x, iconInfo.textOffset.y);
                }
                cluster.setOptions(o);
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                l.InitializeSpiderClusterSupport();
            }
        });
    };
    /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    BingClusterService.prototype.ZoomIntoCluster = /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ pin = /** @type {?} */ (e.target);
        if (pin && pin.containedPushpins) {
            var /** @type {?} */ bounds_1;
            var /** @type {?} */ locs_1 = new Array();
            pin.containedPushpins.forEach(function (p) { return locs_1.push(p.getLocation()); });
            bounds_1 = Microsoft.Maps.LocationRect.fromLocations(locs_1);
            // Zoom into the bounding box of the cluster.
            // Add a padding to compensate for the pixel area of the pushpins.
            (/** @type {?} */ (this._mapService)).MapPromise.then(function (m) {
                m.setView({ bounds: bounds_1, padding: 75 });
            });
        }
    };
    BingClusterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingClusterService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingClusterService;
}(BingLayerBase));
export { BingClusterService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTW5ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU03QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztJQVVWLDhDQUFhO0lBRWpELEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7T0FNRztJQUNILDRCQUFZLFdBQXVCLEVBQUUsS0FBYTtlQUM5QyxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDO0tBQzVCOzs7Ozs7Ozs7Ozs7SUFnQk0scUNBQVE7Ozs7Ozs7Ozs7O2NBQUMsS0FBNEI7O1FBQ3hDLHFCQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDNUMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFDMUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdB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LENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBSSxDQUFDLENBQUM7OztZQUl6RCxtQkFBaUIsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFxQjtnQkFDckUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ047OztnQkFyUlIsVUFBVTs7OztnQkFaRixVQUFVO2dCQWRFLE1BQU07OzZCQUEzQjtFQTJCd0MsYUFBYTtTQUF4QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XHJcbmltcG9ydCB7IEJpbmdDbHVzdGVyTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNsdXN0ZXItbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0xheWVyQmFzZSB9IGZyb20gJy4vYmluZy1sYXllci1iYXNlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBDbHVzdGVyU2VydmljZX0gY29udHJhY3QgZm9yIGEgIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ0NsdXN0ZXJTZXJ2aWNlIGV4dGVuZHMgQmluZ0xheWVyQmFzZSBpbXBsZW1lbnRzIENsdXN0ZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdDbHVzdGVyU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgQmluZyBNYXBzIFY4LiBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxyXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllciB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogbGF5ZXIuSWQsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGxheWVyLlZpc2libGUsXHJcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiBsYXllci5DbHVzdGVyaW5nRW5hYmxlZCxcclxuICAgICAgICAgICAgcGxhY2VtZW50TW9kZTogbGF5ZXIuQ2x1c3RlclBsYWNlbWVudE1vZGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChsYXllci5HcmlkU2l6ZSkgeyBvcHRpb25zLmdyaWRTaXplID0gbGF5ZXIuR3JpZFNpemU7IH1cclxuICAgICAgICBpZiAobGF5ZXIuTGF5ZXJPZmZzZXQpIHsgb3B0aW9ucy5sYXllck9mZnNldCA9IGxheWVyLkxheWVyT2Zmc2V0OyB9XHJcbiAgICAgICAgaWYgKGxheWVyLlpJbmRleCkgeyBvcHRpb25zLnpJbmRleCA9IGxheWVyLlpJbmRleDsgfVxyXG4gICAgICAgIGlmIChsYXllci5JY29uSW5mbykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmNsdXN0ZXJlZFBpbkNhbGxiYWNrID0gKHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pID0+IHsgdGhpcy5DcmVhdGVDbHVzdGVyUHVzaFBpbihwaW4sIGxheWVyKTsgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLkN1c3RvbU1hcmtlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuY2x1c3RlcmVkUGluQ2FsbGJhY2sgPSAocGluOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbikgPT4geyB0aGlzLkNyZWF0ZUN1c3RvbUNsdXN0ZXJQdXNoUGluKHBpbiwgbGF5ZXIpOyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF5ZXIuU3BpZGVyQ2x1c3Rlck9wdGlvbnMpIHsgb3B0aW9ucy5zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IGxheWVyLlNwaWRlckNsdXN0ZXJPcHRpb25zOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxheWVyUHJvbWlzZTogUHJvbWlzZTxMYXllcj4gPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zKTtcclxuICAgICAgICAoPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UpLk1hcFByb21pc2UudGhlbihtID0+IHtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgJ3ZpZXdjaGFuZ2VlbmQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJpbmdFbmFibGVkICYmIG0uZ2V0Wm9vbSgpID09PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyUHJvbWlzZS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGwuU2V0T3B0aW9ucyh7IGlkOiBsYXllci5JZCwgY2x1c3RlcmluZ0VuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJpbmdFbmFibGVkICYmIG0uZ2V0Wm9vbSgpIDwgMTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllclByb21pc2UudGhlbigobDogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWwuR2V0T3B0aW9ucygpLmNsdXN0ZXJpbmdFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLlNldE9wdGlvbnMoeyBpZDogbGF5ZXIuSWQsIGNsdXN0ZXJpbmdFbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIuSWQsIGxheWVyUHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29ucy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhbiBhcnJheVxyXG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5bGluZXMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlsaW5lcyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci4gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciB0aGUgaW5pdGlhbCBzZXQgb2YgZW50aXRpZXNcclxuICAgICAqIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgY2x1c3Rlci4gVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cclxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xyXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RhcnRDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XHJcbiAgICAgICAgaWYgKGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsLnRoZW4oKGwxOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsMS5TdGFydENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci5cclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXHJcbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcclxuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0b3BDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XHJcbiAgICAgICAgaWYgKGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsLnRoZW4oKGwxOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsMS5TdG9wQ2x1c3RlcmluZygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgZGVmYXVsdCBjbHVzdGVyIHB1c2hwaW4gYXMgYSBjYWxsYmFjayBmcm9tIEJpbmdNYXBzIHdoZW4gY2x1c3RlcmluZyBvY2N1cnMuIFRoZSB7QGxpbmsgQ2x1c3RlckxheWVyRGlyZWN0aXZlfSBtb2RlbFxyXG4gICAgICogY2FuIHByb3ZpZGUgYW4gSWNvbkluZm8gcHJvcGVydHkgdGhhdCB3b3VsZCBnb3Zlcm4gdGhlIGFwcGFyZW5hY2Ugb2YgdGhlIHBpbi4gVGhpcyBtZXRob2Qgd2lsbCBhc3NpZ24gdGhlIHNhbWUgcGluIHRvIGFsbFxyXG4gICAgICogY2x1c3RlcnMgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjbHVzdGVyIC0gVGhlIGNsdXN0ZXIgZm9yIHdoaWNoIHRvIGNyZWF0ZSB0aGUgcHVzaHBpbi5cclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSB7QGxpbmsgQ2x1c3RlckxheWVyRGlyZWN0aXZlfSBjb21wb25lbnQgcmVwcmVzZW50aW5nIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQ3JlYXRlQ2x1c3RlclB1c2hQaW4oY2x1c3RlcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4sIGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYXllci5JY29uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkOiAoaWNvOiBzdHJpbmcsIGluZm86IElNYXJrZXJJY29uSW5mbykgPT4gdm9pZCA9IChpY28sIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0gaWNvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmFuY2hvciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmZvLnNpemUgJiYgaW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoaW5mby5zaXplLndpZHRoICogaW5mby5tYXJrZXJPZmZzZXRSYXRpby54KSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5mby5zaXplICYmIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGluZm8uc2l6ZS5oZWlnaHQgKiBpbmZvLm1hcmtlck9mZnNldFJhdGlvLnkpIDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbjogc3RyaW5nfFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+ID0gTWFya2VyLkNyZWF0ZU1hcmtlcihsYXllci5JY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGljb24pID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQoaWNvbiwgbGF5ZXIuSWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkKHguaWNvbiwgeC5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3Rlcikge1xyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoY2x1c3RlciwgJ2NsaWNrJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4gdGhpcy5ab29tSW50b0NsdXN0ZXIoZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5TcGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdkYmxjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcclxuICAgICAgICAgICAgICAgIGwuSW5pdGlhbGl6ZVNwaWRlckNsdXN0ZXJTdXBwb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgaG9vayBmb3IgY29uc3VtZXJzIHRvIHByb3ZpZGUgYSBjdXN0b20gZnVuY3Rpb24gdG8gY3JlYXRlIGNsdXN0ZXIgYmlucyBmb3IgYSBjbHVzdGVyLiBUaGlzIGlzIHBhcnRpY3VhcmlseSB1c2VmdWxcclxuICAgICAqIGluIHNpdHVhdGlvbiB3aGVyZSB0aGUgcGluIHNob3VsZCBkaWZmZXIgdG8gcmVwcmVzZW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBwaW5zIGluIHRoZSBjbHVzdGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjbHVzdGVyIC0gVGhlIGNsdXN0ZXIgZm9yIHdoaWNoIHRvIGNyZWF0ZSB0aGUgcHVzaHBpbi5cclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSB7QGxpbmsgQ2x1c3RlckxheWVyRGlyZWN0aXZlfSBjb21wb25lbnRcclxuICAgICAqIHJlcHJlc2VudGluZyB0aGUgbGF5ZXIuIFNldCB0aGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5DdXN0b21NYXJrZXJDYWxsYmFja31cclxuICAgICAqIHByb3BlcnR5IHRvIGRlZmluZSB0aGUgY2FsbGJhY2sgZ2VuZXJhdGluZyB0aGUgcGluLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBDcmVhdGVDdXN0b21DbHVzdGVyUHVzaFBpbihjbHVzdGVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbiwgbGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gYXNzZW1ibGUgbWFya2VycyBmb3IgY2FsbGJhY2tcclxuICAgICAgICAgICAgY29uc3QgbTogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XHJcbiAgICAgICAgICAgIGNsdXN0ZXIuY29udGFpbmVkUHVzaHBpbnMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogTWFya2VyID0gbC5HZXRNYXJrZXJGcm9tQmluZ01hcmtlcihwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIpIHsgbS5wdXNoKG1hcmtlcik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25JbmZvOiBJTWFya2VySWNvbkluZm8gPSB7IG1hcmtlclR5cGU6IE1hcmtlclR5cGVJZC5Ob25lIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBvLmljb24gPSBsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjayhtLCBpY29uSW5mbyk7XHJcbiAgICAgICAgICAgIGlmIChvLmljb24gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBvLmFuY2hvciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChcclxuICAgICAgICAgICAgICAgICAgICAoaWNvbkluZm8uc2l6ZSAmJiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoaWNvbkluZm8uc2l6ZS53aWR0aCAqIGljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLngpIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAoaWNvbkluZm8uc2l6ZSAmJiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoaWNvbkluZm8uc2l6ZS5oZWlnaHQgKiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby55KSA6IDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkluZm8udGV4dE9mZnNldCkgeyBvLnRleHRPZmZzZXQgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoaWNvbkluZm8udGV4dE9mZnNldC54LCBpY29uSW5mby50ZXh0T2Zmc2V0LnkpOyB9XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3Rlcikge1xyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoY2x1c3RlciwgJ2NsaWNrJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4gdGhpcy5ab29tSW50b0NsdXN0ZXIoZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5TcGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdkYmxjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcclxuICAgICAgICAgICAgICAgIGwuSW5pdGlhbGl6ZVNwaWRlckNsdXN0ZXJTdXBwb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFpvb21zIGludG8gdGhlIGNsdXN0ZXIgb24gY2xpY2sgc28gdGhhdCB0aGUgbWVtYmVycyBvZiB0aGUgY2x1c3RlciBjb21mb3J0YWJsZSBmaXQgaW50byB0aGUgem9tbWVkIGFyZWEuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgWm9vbUludG9DbHVzdGVyKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4gPSA8TWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4+ZS50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHBpbiAmJiBwaW4uY29udGFpbmVkUHVzaHBpbnMpIHtcclxuICAgICAgICAgICAgbGV0IGJvdW5kczogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0O1xyXG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgICAgIHBpbi5jb250YWluZWRQdXNocGlucy5mb3JFYWNoKHAgPT4gbG9jcy5wdXNoKHAuZ2V0TG9jYXRpb24oKSkpO1xyXG4gICAgICAgICAgICBib3VuZHMgPSBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3QuZnJvbUxvY2F0aW9ucyhsb2NzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFpvb20gaW50byB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjbHVzdGVyLlxyXG4gICAgICAgICAgICAvLyBBZGQgYSBwYWRkaW5nIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBwaXhlbCBhcmVhIG9mIHRoZSBwdXNocGlucy5cclxuICAgICAgICAgICAgKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBTZXJ2aWNlKS5NYXBQcm9taXNlLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbS5zZXRWaWV3KHsgYm91bmRzOiBib3VuZHMsIHBhZGRpbmc6IDc1IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==