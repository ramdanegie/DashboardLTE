/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Marker } from '../../models/marker';
import { MarkerTypeId } from '../../models/marker-type-id';
import { ClusterClickAction } from '../../models/cluster-click-action';
import { MapService } from '../map.service';
import { GoogleLayerBase } from './google-layer-base';
export class GoogleClusterService extends GoogleLayerBase {
    /**
     * Creates an instance of GoogleClusterService.
     * \@memberof GoogleClusterService
     * @param {?} _mapService
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
        this._layers = new Map();
        this._layerStyles = new Map();
    }
    /**
     * Creates the cluster icon from the styles
     *
     * \@memberof GoogleClusterService
     * @param {?} styles
     * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
     * containing the hydrated cluster icons.
     */
    static CreateClusterIcons(styles) {
        const /** @type {?} */ i = new Promise((resolve, reject) => {
            const /** @type {?} */ pa = new Array();
            styles.forEach((style, index) => {
                if (style.iconInfo) {
                    const /** @type {?} */ s = Marker.CreateMarker(style.iconInfo);
                    if (typeof (s) === 'string') {
                        style.url = s;
                        if (style.width == null) {
                            style.width = style.iconInfo.size.width;
                            style.height = style.iconInfo.size.height;
                        }
                        if (style.iconInfo.markerOffsetRatio && style.iconInfo.size && style.anchor == null) {
                            const /** @type {?} */ o = style.iconInfo;
                            style.anchor = [
                                o.size.width * o.markerOffsetRatio.x,
                                o.size.height * o.markerOffsetRatio.y
                            ];
                        }
                        delete style.iconInfo;
                    }
                    else {
                        s.then(x => {
                            style.url = x.icon;
                            if (style.width == null) {
                                style.width = x.iconInfo.size.width;
                                style.height = x.iconInfo.size.height;
                            }
                            if (x.iconInfo.markerOffsetRatio && x.iconInfo.size && style.anchor == null) {
                                const /** @type {?} */ o = x.iconInfo;
                                style.anchor = [
                                    o.size.width * o.markerOffsetRatio.x,
                                    o.size.height * o.markerOffsetRatio.y
                                ];
                            }
                            delete style.iconInfo;
                        });
                        pa.push(s);
                    }
                }
            });
            if (pa.length === 0) {
                resolve(styles);
            }
            else {
                Promise.all(pa).then(() => {
                    resolve(styles);
                });
            }
        });
        return i;
    }
    /**
     * Adds the cluster layer to the map
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    AddLayer(layer) {
        const /** @type {?} */ options = {
            id: layer.Id,
            visible: layer.Visible,
            clusteringEnabled: layer.ClusteringEnabled,
            zoomOnClick: layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster
        };
        if (layer.GridSize) {
            options.gridSize = layer.GridSize;
        }
        if (layer.MinimumClusterSize) {
            options.minimumClusterSize = layer.MinimumClusterSize;
        }
        if (layer.Styles) {
            options.styles = layer.Styles;
        }
        if (layer.UseDynamicSizeMarkers) {
            options.styles = null;
            // do not to attempt to setup styles here as the dynamic call back will generate them.
        }
        else {
            options.styles = [{
                    height: 30,
                    width: 35,
                    textColor: 'white',
                    textSize: 11,
                    backgroundPosition: 'center',
                    iconInfo: {
                        markerType: MarkerTypeId.FontMarker,
                        fontName: 'FontAwesome',
                        fontSize: 30,
                        color: 'green',
                        text: '\uF111'
                    }
                }];
        }
        const /** @type {?} */ dynamicClusterCallback = (markers, numStyles, clusterer) => {
            // dynamically ensure that the necessary style for this cluster icon exists and
            // the clusterer is already hooked up to the styles array via pointer, so we only
            // need to update the style. Since the clusterer re-renders a cluster icon is the
            // the marker count changes, we will only need to retain the current icon as opposed
            // to all cluster icon.
            const /** @type {?} */ styles = this._layerStyles.get(layer.Id);
            const /** @type {?} */ iconInfo = {
                markerType: MarkerTypeId.None
            };
            const /** @type {?} */ icon = layer.CustomMarkerCallback(/** @type {?} */ (markers), iconInfo);
            styles[0] = {
                url: `\"data:image/svg+xml;utf8,${icon}\"`,
                height: iconInfo.size.height,
                width: iconInfo.size.width,
                textColor: 'white',
                textSize: 11,
                backgroundPosition: 'center',
            };
            return {
                text: markers.length.toString(),
                index: 1
            };
        };
        const /** @type {?} */ resetStyles = (clusterer) => {
            if (this._layerStyles.has(layer.Id)) {
                this._layerStyles.get(layer.Id).splice(0);
            }
            else {
                const /** @type {?} */ styles = new Array();
                styles.push({});
                this._layerStyles.set(layer.Id, styles);
                clusterer.setStyles(styles);
                // this is important for dynamic styles as the pointer to this array gets passed
                // around key objects in the clusterer. Therefore, it must be initialized here in order for
                // updates to the styles to be visible.
                // also, we need to add at least one style to prevent the default styles from being picked up.
            }
        };
        const /** @type {?} */ layerPromise = this._mapService.CreateClusterLayer(options);
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(l => {
            const /** @type {?} */ clusterer = /** @type {?} */ (l.NativePrimitve);
            if (options.styles) {
                const /** @type {?} */ s = GoogleClusterService.CreateClusterIcons(options.styles);
                s.then(x => {
                    clusterer.setStyles(/** @type {?} */ (x));
                });
            }
            else {
                resetStyles(clusterer);
                this._mapService.MapPromise.then((m) => {
                    m.addListener('zoom_changed', () => {
                        resetStyles(clusterer);
                    });
                });
                clusterer.setCalculator((m, n) => {
                    return dynamicClusterCallback(m, n, clusterer);
                });
            }
        });
    }
    /**
     * Create a marker in the cluster
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    CreateMarker(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            return this._mapService.CreateMarker(options)
                .then((marker) => {
                marker.IsFirst = options.isFirst;
                marker.IsLast = options.isLast;
                l.AddEntity(marker);
                return marker;
            });
        });
    }
    /**
     * Starts the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StartClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Stops the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StopClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
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
     * \@memberof GoogleClusterService
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
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
}
GoogleClusterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleClusterService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
function GoogleClusterService_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleClusterService.prototype._layers;
    /** @type {?} */
    GoogleClusterService.prototype._layerStyles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUd2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBUXRELE1BQU0sMkJBQTRCLFNBQVEsZUFBZTs7Ozs7OztJQWlGckQsWUFBWSxXQUF1QixFQUFFLEtBQWE7UUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzt1QkE3RW1CLElBQUksR0FBRyxFQUEwQjs0QkFDUixJQUFJLEdBQUcsRUFBOEM7S0E2RTlIOzs7Ozs7Ozs7SUEvRE0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQStCO1FBQzVELHVCQUFNLENBQUMsR0FBcUMsSUFBSSxPQUFPLENBQTBCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pHLHVCQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssRUFBc0QsQ0FBQztZQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDakIsdUJBQU0sQ0FBQyxHQUE4RCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekcsRUFBRSxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUNkLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3lCQUM3Qzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbEYsdUJBQU0sQ0FBQyxHQUFvQixLQUFLLENBQUMsUUFBUSxDQUFDOzRCQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFHO2dDQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dDQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs2QkFDeEMsQ0FBQzt5QkFDTDt3QkFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7cUJBQ3pCO29CQUNELElBQUksQ0FBQyxDQUFDO3dCQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ1AsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dDQUNwQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDekM7NEJBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQzFFLHVCQUFNLENBQUMsR0FBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQ0FDdEMsS0FBSyxDQUFDLE1BQU0sR0FBRztvQ0FDWCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQ0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUNBQ3hDLENBQUM7NkJBQ0w7NEJBQ0QsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO3lCQUN6QixDQUFDLENBQUM7d0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDZDtpQkFDSjthQUNKLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFBRTtZQUN6QyxJQUFJLENBQUMsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkIsQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUF1Qk4sUUFBUSxDQUFDLEtBQTRCO1FBQ3hDLHVCQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxrQkFBa0IsQ0FBQyxlQUFlO1NBQy9FLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUFFO1FBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQUU7UUFDeEYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FBRTtRQUNwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztTQUV6QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNkLE1BQU0sRUFBRSxFQUFFO29CQUNWLEtBQUssRUFBRSxFQUFFO29CQUNULFNBQVMsRUFBRSxPQUFPO29CQUNsQixRQUFRLEVBQUUsRUFBRTtvQkFDWixrQkFBa0IsRUFBRSxRQUFRO29CQUM1QixRQUFRLEVBQUU7d0JBQ04sVUFBVSxFQUFFLFlBQVksQ0FBQyxVQUFVO3dCQUNuQyxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsUUFBUSxFQUFFLEVBQUU7d0JBQ1osS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLFFBQVE7cUJBQ2pCO2lCQUNKLENBQUMsQ0FBQztTQUNOO1FBQ0QsdUJBQU0sc0JBQXNCLEdBQUcsQ0FBQyxPQUFxQyxFQUFFLFNBQWlCLEVBQ3BGLFNBQXlDLEVBQUUsRUFBRTs7Ozs7O1lBTTdDLHVCQUFNLE1BQU0sR0FBdUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25GLHVCQUFNLFFBQVEsR0FBb0I7Z0JBQzlCLFVBQVUsRUFBRSxZQUFZLENBQUMsSUFBSTthQUNoQyxDQUFDO1lBQ0YsdUJBQU0sSUFBSSxHQUFXLEtBQUssQ0FBQyxvQkFBb0IsbUJBQU0sT0FBTyxHQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDUixHQUFHLEVBQUUsNkJBQTZCLElBQUksSUFBSTtnQkFDMUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFDMUIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGtCQUFrQixFQUFFLFFBQVE7YUFDL0IsQ0FBQztZQUNGLE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNMLENBQUM7UUFDRix1QkFBTSxXQUFXLEdBQUcsQ0FBQyxTQUF5QyxFQUFFLEVBQUU7WUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUU7WUFDbkYsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsdUJBQU0sTUFBTSxHQUF1QyxJQUFJLEtBQUssRUFBK0IsQ0FBQztnQkFDNUYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDeEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7YUFLL0I7U0FDSixDQUFDO1FBRUYsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLHVCQUFNLFNBQVMscUJBQW1FLENBQUMsQ0FBQyxjQUFjLENBQUEsQ0FBQztZQUNuRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakIsdUJBQU0sQ0FBQyxHQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDUCxTQUFTLENBQUMsU0FBUyxtQkFBcUMsQ0FBQyxFQUFDLENBQUM7aUJBQzlELENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUEyQixFQUFFLEVBQUU7b0JBQzdELENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTt3QkFDL0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMxQixDQUFDLENBQUM7aUJBQ04sQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzdCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNsRCxDQUFDLENBQUM7YUFDTjtTQUNKLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLFlBQVksQ0FBQyxLQUFhLEVBQUUsT0FBdUI7UUFDdEQsdUJBQU0sQ0FBQyxHQUFtQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixLQUFLLHlCQUF5QixDQUFDLENBQUMsQ0FBQztTQUFFO1FBRXRGLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztpQkFDeEMsSUFBSSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUMvQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2pCLENBQUMsQ0FBQztTQUNWLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU0EsZUFBZSxDQUFDLEtBQTRCO1FBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7Ozs7OztJQVN0QixjQUFjLENBQUMsS0FBNEI7UUFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYXRCLGFBQWEsQ0FBQyxLQUFhLEVBQUUsT0FBd0I7UUFDeEQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYTdGLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBK0I7UUFDaEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWM3RixjQUFjLENBQUMsS0FBYSxFQUFFLE9BQXlCO1FBQzFELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQWE5RixlQUFlLENBQUMsS0FBYSxFQUFFLE9BQWdDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDLENBQUM7Ozs7WUF6UnhHLFVBQVU7Ozs7WUFSRixVQUFVO1lBUkUsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCB7IElDbHVzdGVySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XHJcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTGF5ZXJCYXNlIH0gZnJvbSAnLi9nb29nbGUtbGF5ZXItYmFzZSc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlQ2x1c3RlclNlcnZpY2UgZXh0ZW5kcyBHb29nbGVMYXllckJhc2UgaW1wbGVtZW50cyBDbHVzdGVyU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4gPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+KCk7XHJcbiAgICBwcm90ZWN0ZWQgX2xheWVyU3R5bGVzOiBNYXA8bnVtYmVyLCBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+PiA9IG5ldyBNYXA8bnVtYmVyLCBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFN0YXRpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgaWNvbiBmcm9tIHRoZSBzdHlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc3R5bGVzXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIGFuIEFycmF5IG9mIElDbHVzdGVySWNvbkluZm8gb2JqZWN0c1xyXG4gICAgICogY29udGFpbmluZyB0aGUgaHlkcmF0ZWQgY2x1c3RlciBpY29ucy5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUNsdXN0ZXJJY29ucyhzdHlsZXM6IEFycmF5PElDbHVzdGVySWNvbkluZm8+KTogUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4ge1xyXG4gICAgICAgIGNvbnN0IGk6IFByb21pc2U8QXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4+ID0gbmV3IFByb21pc2U8QXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGEgPSBuZXcgQXJyYXk8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4+KCk7XHJcbiAgICAgICAgICAgIHN0eWxlcy5mb3JFYWNoKChzdHlsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pY29uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHM6IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9IE1hcmtlci5DcmVhdGVNYXJrZXIoc3R5bGUuaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocykgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnVybCA9IHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS53aWR0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IHN0eWxlLmljb25JbmZvLnNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSBzdHlsZS5pY29uSW5mby5zaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8gJiYgc3R5bGUuaWNvbkluZm8uc2l6ZSAmJiBzdHlsZS5hbmNob3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbzogSU1hcmtlckljb25JbmZvID0gc3R5bGUuaWNvbkluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5hbmNob3IgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLndpZHRoICogby5tYXJrZXJPZmZzZXRSYXRpby54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uc2l6ZS5oZWlnaHQgKiBvLm1hcmtlck9mZnNldFJhdGlvLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0eWxlLmljb25JbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0geC5pY29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLndpZHRoID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IHguaWNvbkluZm8uc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSB4Lmljb25JbmZvLnNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHguaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8gJiYgeC5pY29uSW5mby5zaXplICYmIHN0eWxlLmFuY2hvciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbzogSU1hcmtlckljb25JbmZvID0geC5pY29uSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5hbmNob3IgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uc2l6ZS53aWR0aCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYS5wdXNoKHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChwYS5sZW5ndGggPT09IDApIHsgcmVzb2x2ZShzdHlsZXMpOyB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBfem9uZVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGNsdXN0ZXIgbGF5ZXIgdG8gdGhlIG1hcFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllclxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogbGF5ZXIuSWQsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGxheWVyLlZpc2libGUsXHJcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiBsYXllci5DbHVzdGVyaW5nRW5hYmxlZCxcclxuICAgICAgICAgICAgem9vbU9uQ2xpY2s6IGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGxheWVyLkdyaWRTaXplKSB7IG9wdGlvbnMuZ3JpZFNpemUgPSBsYXllci5HcmlkU2l6ZTsgfVxyXG4gICAgICAgIGlmIChsYXllci5NaW5pbXVtQ2x1c3RlclNpemUpIHsgb3B0aW9ucy5taW5pbXVtQ2x1c3RlclNpemUgPSBsYXllci5NaW5pbXVtQ2x1c3RlclNpemU7IH1cclxuICAgICAgICBpZiAobGF5ZXIuU3R5bGVzKSB7IG9wdGlvbnMuc3R5bGVzID0gbGF5ZXIuU3R5bGVzOyB9XHJcbiAgICAgICAgaWYgKGxheWVyLlVzZUR5bmFtaWNTaXplTWFya2Vycykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlcyA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0byBhdHRlbXB0IHRvIHNldHVwIHN0eWxlcyBoZXJlIGFzIHRoZSBkeW5hbWljIGNhbGwgYmFjayB3aWxsIGdlbmVyYXRlIHRoZW0uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlcyA9IFt7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM1LFxyXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGljb25JbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyVHlwZTogTWFya2VyVHlwZUlkLkZvbnRNYXJrZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udE5hbWU6ICdGb250QXdlc29tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcXHVGMTExJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZHluYW1pY0NsdXN0ZXJDYWxsYmFjayA9IChtYXJrZXJzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcixcclxuICAgICAgICAgICAgY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gZHluYW1pY2FsbHkgZW5zdXJlIHRoYXQgdGhlIG5lY2Vzc2FyeSBzdHlsZSBmb3IgdGhpcyBjbHVzdGVyIGljb24gZXhpc3RzIGFuZFxyXG4gICAgICAgICAgICAvLyB0aGUgY2x1c3RlcmVyIGlzIGFscmVhZHkgaG9va2VkIHVwIHRvIHRoZSBzdHlsZXMgYXJyYXkgdmlhIHBvaW50ZXIsIHNvIHdlIG9ubHlcclxuICAgICAgICAgICAgLy8gbmVlZCB0byB1cGRhdGUgdGhlIHN0eWxlLiBTaW5jZSB0aGUgY2x1c3RlcmVyIHJlLXJlbmRlcnMgYSBjbHVzdGVyIGljb24gaXMgdGhlXHJcbiAgICAgICAgICAgIC8vIHRoZSBtYXJrZXIgY291bnQgY2hhbmdlcywgd2Ugd2lsbCBvbmx5IG5lZWQgdG8gcmV0YWluIHRoZSBjdXJyZW50IGljb24gYXMgb3Bwb3NlZFxyXG4gICAgICAgICAgICAvLyB0byBhbGwgY2x1c3RlciBpY29uLlxyXG4gICAgICAgICAgICBjb25zdCBzdHlsZXM6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4gPSB0aGlzLl9sYXllclN0eWxlcy5nZXQobGF5ZXIuSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyVHlwZTogTWFya2VyVHlwZUlkLk5vbmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgaWNvbjogc3RyaW5nID0gbGF5ZXIuQ3VzdG9tTWFya2VyQ2FsbGJhY2soPGFueT5tYXJrZXJzLCBpY29uSW5mbyk7XHJcbiAgICAgICAgICAgIHN0eWxlc1swXSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogYFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCwke2ljb259XFxcImAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGljb25JbmZvLnNpemUuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGljb25JbmZvLnNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogbWFya2Vycy5sZW5ndGgudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXNldFN0eWxlcyA9IChjbHVzdGVyZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGF5ZXJTdHlsZXMuaGFzKGxheWVyLklkKSkgeyB0aGlzLl9sYXllclN0eWxlcy5nZXQobGF5ZXIuSWQpLnNwbGljZSgwKTsgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlczogQXJyYXk8R29vZ2xlTWFwVHlwZXMuQ2x1c3RlclN0eWxlPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+KCk7XHJcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaCh7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclN0eWxlcy5zZXQobGF5ZXIuSWQsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyZXIuc2V0U3R5bGVzKHN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgZm9yIGR5bmFtaWMgc3R5bGVzIGFzIHRoZSBwb2ludGVyIHRvIHRoaXMgYXJyYXkgZ2V0cyBwYXNzZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBhcm91bmQga2V5IG9iamVjdHMgaW4gdGhlIGNsdXN0ZXJlci4gVGhlcmVmb3JlLCBpdCBtdXN0IGJlIGluaXRpYWxpemVkIGhlcmUgaW4gb3JkZXIgZm9yXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlcyB0byB0aGUgc3R5bGVzIHRvIGJlIHZpc2libGUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxzbywgd2UgbmVlZCB0byBhZGQgYXQgbGVhc3Qgb25lIHN0eWxlIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgc3R5bGVzIGZyb20gYmVpbmcgcGlja2VkIHVwLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllci5JZCwgbGF5ZXJQcm9taXNlKTtcclxuICAgICAgICBsYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIgPSA8R29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyPmwuTmF0aXZlUHJpbWl0dmU7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN0eWxlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyAgPSBHb29nbGVDbHVzdGVyU2VydmljZS5DcmVhdGVDbHVzdGVySWNvbnMob3B0aW9ucy5zdHlsZXMpO1xyXG4gICAgICAgICAgICAgICAgcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJlci5zZXRTdHlsZXMoPEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+eCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0U3R5bGVzKGNsdXN0ZXJlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbS5hZGRMaXN0ZW5lcignem9vbV9jaGFuZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFN0eWxlcyhjbHVzdGVyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyZXIuc2V0Q2FsY3VsYXRvcigobSwgbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkeW5hbWljQ2x1c3RlckNhbGxiYWNrKG0sIG4sIGNsdXN0ZXJlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbWFya2VyIGluIHRoZSBjbHVzdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXIobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBQcm9taXNlPE1hcmtlcj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcblxyXG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcmtlcihvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG1hcmtlcjogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGwuQWRkRW50aXR5KG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcmtlcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHRoZSBjbHVzdGVyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgdGhlIGNsdXN0ZXJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RvcENsdXN0ZXJpbmcobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbnMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5Z29uIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhblxyXG4gICAgICogYXJyYXkgb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWxpbmVzIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlsaW5lcy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWxpbmVzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZXMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+IHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcbn1cclxuIl19