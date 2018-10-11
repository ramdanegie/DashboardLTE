/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { GoogleMarker } from './google-marker';
import { Marker } from '../marker';
import { ClusterPlacementMode } from '../cluster-placement-mode';
import { timer } from 'rxjs';
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
GoogleMarkerClusterer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof GoogleMarkerClusterer
     */
    function GoogleMarkerClusterer(_layer) {
        this._layer = _layer;
        this._isClustering = true;
        this._markerLookup = new Map();
        this._markers = new Array();
        this._pendingMarkers = new Array();
        this._mapclicks = 0;
        this._currentZoom = 0;
        this._visible = true;
    }
    Object.defineProperty(GoogleMarkerClusterer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} GoogleMapTypes.MarkerClusterer.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        throw (new Error('Events are not supported on Google Cluster Layers. You can still add events to individual markers.'));
    };
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        var /** @type {?} */ isMarker = entity instanceof Marker;
        isMarker = entity instanceof GoogleMarker || isMarker;
        if (isMarker) {
            entity.NativePrimitve.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering && this._visible) {
                this._layer.addMarker(entity.NativePrimitve);
                this._markers.push(entity);
            }
            else {
                this._pendingMarkers.push(entity);
            }
            this._markerLookup.set(entity.NativePrimitve, entity);
        }
        if (isMarker) {
            if (entity.IsLast) {
                this.StartClustering();
            }
        }
    };
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddEntities = /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            var /** @type {?} */ e = entities.map(function (p) {
                _this._markerLookup.set(p.NativePrimitve, p);
                p.NativePrimitve.setMap(null);
                // remove the marker from the map as the clusterer will control marker visibility.
                return p.NativePrimitve;
            });
            if (this._isClustering && this._visible) {
                this._layer.addMarkers(e);
                (_a = this._markers).push.apply(_a, tslib_1.__spread(entities));
            }
            else {
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                (_b = this._pendingMarkers).push.apply(_b, tslib_1.__spread(entities));
            }
        }
        var _a, _b;
    };
    /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.Delete = /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    function () {
        this._layer.getMarkers().forEach(function (m) {
            m.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
    };
    /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    GoogleMarkerClusterer.prototype.GetMarkerFromGoogleMarker = /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    function (pin) {
        var /** @type {?} */ m = this._markerLookup.get(pin);
        return m;
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GoogleMarkerClusterer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        var /** @type {?} */ options = {
            id: 0,
            gridSize: this._layer.getGridSize(),
            clusteringEnabled: this._layer.getGridSize() === 0,
            maxZoom: this._layer.getMaxZoom(),
            minimumClusterSize: this._layer.getMinClusterSize(),
            placementMode: this._layer.isAverageCenter() ? ClusterPlacementMode.MeanValue : ClusterPlacementMode.FirstPin,
            visible: this._visible,
            zoomOnClick: this._layer.isZoomOnClick(),
            styles: this._layer.getStyles()
        };
        return options;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GoogleMarkerClusterer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._visible;
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve && entity.Location) {
            var /** @type {?} */ j = this._markers.indexOf(entity);
            var /** @type {?} */ k = this._pendingMarkers.indexOf(entity);
            if (j > -1) {
                this._markers.splice(j, 1);
            }
            if (k > -1) {
                this._pendingMarkers.splice(k, 1);
            }
            if (this._isClustering) {
                this._layer.removeMarker(entity.NativePrimitve);
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        this._layer.getMarkers().forEach(function (m) {
            m.setMap(null);
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        var /** @type {?} */ p = new Array();
        entities.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                e.NativePrimitve.setMap(null);
                _this._markerLookup.set(e.NativePrimitve, e);
                if (_this._visible) {
                    _this._markers.push(e);
                    p.push(e.NativePrimitve);
                }
                else {
                    _this._pendingMarkers.push(e);
                }
            }
        });
        this._layer.addMarkers(p);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        if (options.placementMode != null) {
            throw (new Error('GoogleMarkerClusterer: PlacementMode option cannot be set after initial creation.'));
        }
        if (options.zoomOnClick != null) {
            throw (new Error('GoogleMarkerClusterer: ZoomOnClick option cannot be set after initial creation.'));
        }
        if (options.callback != null) { }
        if (options.clusteringEnabled != null) {
            this._layer.setMinClusterSize(options.clusteringEnabled ? 1 : 10000000);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.gridSize != null && (options.clusteringEnabled == null || options.clusteringEnabled)) {
            this._layer.setGridSize(options.gridSize);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.maxZoom != null) {
            this._layer.setMaxZoom(options.maxZoom);
        }
        if (options.minimumClusterSize != null) {
            this._layer.setMinClusterSize(options.minimumClusterSize);
        }
        if (options.styles != null) {
            this._layer.setStyles(options.styles);
        }
        if (options.visible != null) {
            this.SetVisible(options.visible);
        }
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        var /** @type {?} */ map = visible ? this._layer.getMap() : null;
        if (!visible) {
            this._layer.resetViewport(true);
        }
        else {
            var /** @type {?} */ p_1 = new Array();
            if (this._pendingMarkers.length > 0) {
                this._pendingMarkers.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        p_1.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.addMarkers(p_1);
                this._markers = this._markers.concat(this._pendingMarkers.splice(0));
            }
            else {
                this._layer.redraw();
            }
        }
        this._visible = visible;
    };
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.StartClustering = /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._isClustering) {
            return;
        }
        if (this._visible) {
            var /** @type {?} */ p_2 = new Array();
            this._markers.forEach(function (e) {
                if (e.NativePrimitve && e.Location) {
                    p_2.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._pendingMarkers.forEach(function (e) {
                if (e.NativePrimitve && e.Location) {
                    p_2.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._layer.addMarkers(p_2);
            this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        }
        if (!this._visible) {
            // only add the markers if the layer is visible. Otherwise, keep them pending. They would be added once the
            // layer is set to visible.
            timer(0).subscribe(function () {
                _this._layer.resetViewport(true);
            });
        }
        this._isClustering = true;
    };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     *
     */
    GoogleMarkerClusterer.prototype.StopClustering = /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     *
     */
    function () {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    };
    return GoogleMarkerClusterer;
}());
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
export { GoogleMarkerClusterer };
function GoogleMarkerClusterer_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMarkerClusterer.prototype._isClustering;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markerLookup;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._pendingMarkers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._mapclicks;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._currentZoom;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._visible;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7OztBQU83Qjs7Ozs7QUFBQTtJQTRCSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsK0JBQW9CLE1BQXNDO1FBQXRDLFdBQU0sR0FBTixNQUFNLENBQWdDOzZCQW5DbEMsSUFBSTs2QkFDZ0MsSUFBSSxHQUFHLEVBQWlDO3dCQUNsRSxJQUFJLEtBQUssRUFBVTsrQkFDWixJQUFJLEtBQUssRUFBVTswQkFDL0IsQ0FBQzs0QkFDQyxDQUFDO3dCQUNKLElBQUk7S0E2QitCOzBCQWhCcEQsaURBQWM7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JoQiwyQ0FBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0dBQW9HLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZckgseUNBQVM7Ozs7Ozs7Ozs7Y0FBQyxNQUFjO1FBQzNCLHFCQUFJLFFBQVEsR0FBWSxNQUFNLFlBQVksTUFBTSxDQUFDO1FBQ2pELFFBQVEsR0FBRyxNQUFNLFlBQVksWUFBWSxJQUFJLFFBQVEsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMs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SUFhdkIsOENBQWM7Ozs7Ozs7Ozs7O1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs7Z0NBM1duQztJQTZXQyxDQUFBOzs7Ozs7QUE5VkQsaUNBOFZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi9nb29nbGUtbWFya2VyJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IENsdXN0ZXJQbGFjZW1lbnRNb2RlIH0gZnJvbSAnLi4vY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNsdXN0ZXJpbmcgbGF5ZXIgZm9yIHRoZSBHb29nbGUgTWFwIFByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgTGF5ZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pc0NsdXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfbWFya2VyTG9va3VwOiBNYXA8R29vZ2xlTWFwVHlwZXMuTWFya2VyLCBNYXJrZXI+ID0gbmV3IE1hcDxHb29nbGVNYXBUeXBlcy5NYXJrZXIsIE1hcmtlcj4oKTtcclxuICAgIHByaXZhdGUgX21hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfcGVuZGluZ01hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfbWFwY2xpY2tzOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFpvb206IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBHb29nbGVNYXJrZXJDbHVzdGVyZXIgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllciBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIuIE5hdGl2ZSBHb29nbGUgTWFwcyBNYXJrZXIgQ2x1c3RlcmVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gX21hcHMgTWFwU2VydmljZS4gTWFwU2VydmljZSBpbXBsZW1lbnRhdGlvbiB0byBsZXZlcmFnZSBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGF5ZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlcikgeyB9XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXHJcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignRXZlbnRzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIEdvb2dsZSBDbHVzdGVyIExheWVycy4gWW91IGNhbiBzdGlsbCBhZGQgZXZlbnRzIHRvIGluZGl2aWR1YWwgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuIFVzZSB0aGlzIG1ldGhvZCB3aXRoIGNhdXRpb24gYXMgaXQgd2lsbFxyXG4gICAgICogdHJpZ2dlciBhIHJlY2FsdWF0aW9uIG9mIHRoZSBjbHVzdGVycyAoYW5kIGFzc29jaWF0ZWQgbWFya2VycyBpZiBhcHByb3ByaXRlKSBmb3JcclxuICAgICAqIGVhY2ggaW52b2NhdGlvbi4gSWYgeW91IHVzZSB0aGlzIG1ldGhvZCB0byBhZGQgbWFueSBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyLCB1c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlci4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGlzTWFya2VyOiBib29sZWFuID0gZW50aXR5IGluc3RhbmNlb2YgTWFya2VyO1xyXG4gICAgICAgIGlzTWFya2VyID0gZW50aXR5IGluc3RhbmNlb2YgR29vZ2xlTWFya2VyIHx8IGlzTWFya2VyO1xyXG4gICAgICAgIGlmIChpc01hcmtlcikge1xyXG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxyXG4gICAgICAgICAgICBpZiAoZW50aXR5LklzRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvcENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nICYmIHRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcihlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChlbnRpdHkuTmF0aXZlUHJpbWl0dmUsIGVudGl0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc01hcmtlcikge1xyXG4gICAgICAgICAgICBpZiAoZW50aXR5LklzTGFzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBudW1iZXIgb2YgbWFya2VycyB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj4uIEVudGl0aWVzIHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZW50aXRpZXMgIT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KGVudGl0aWVzKSAmJiBlbnRpdGllcy5sZW5ndGggIT09IDAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGU6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4gPSBlbnRpdGllcy5tYXAocCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KHAuTmF0aXZlUHJpbWl0dmUsIHApO1xyXG4gICAgICAgICAgICAgICAgcC5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuTmF0aXZlUHJpbWl0dmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nICYmIHRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goLi4uZW50aXRpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbGF5ZXIgaXMgbm90IHZpc2libGUsIGFsd2F5cyBhZGQgdG8gcGVuZGluZ01hcmtlcnMuIFNldHRpbmcgdGhlIGxheWVyIHRvIHZpc2libGUgbGF0ZXJcclxuICAgICAgICAgICAgICAgIC8vIHdpbGwgcmVuZGVyIHRoZSBtYXJrZXJzIGFwcHJvcHJpYXRlbHlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goLi4uZW50aXRpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgY2x1c3RlcmluZyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuZ2V0TWFya2VycygpLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICAgIG0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLmNsZWFyTWFya2VycygpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IG1hcmtlciB1c2VkIHRvIHdyYXAgdGhlIEdvb2dsZSBNYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgTWFya2VyLiBUaGUgYWJzdHJhY3QgbWFya2VyIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHB1c2hwaW4uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TWFya2VyRnJvbUdvb2dsZU1hcmtlcihwaW46IEdvb2dsZU1hcFR5cGVzLk1hcmtlcik6IE1hcmtlciB7XHJcbiAgICAgICAgY29uc3QgbTogTWFya2VyID0gdGhpcy5fbWFya2VyTG9va3VwLmdldChwaW4pO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBJQ2x1c3Rlck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE9wdGlvbnMoKTogSUNsdXN0ZXJPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICBncmlkU2l6ZTogdGhpcy5fbGF5ZXIuZ2V0R3JpZFNpemUoKSxcclxuICAgICAgICAgICAgY2x1c3RlcmluZ0VuYWJsZWQ6IHRoaXMuX2xheWVyLmdldEdyaWRTaXplKCkgPT09IDAsXHJcbiAgICAgICAgICAgIG1heFpvb206IHRoaXMuX2xheWVyLmdldE1heFpvb20oKSxcclxuICAgICAgICAgICAgbWluaW11bUNsdXN0ZXJTaXplOiB0aGlzLl9sYXllci5nZXRNaW5DbHVzdGVyU2l6ZSgpLFxyXG4gICAgICAgICAgICBwbGFjZW1lbnRNb2RlOiB0aGlzLl9sYXllci5pc0F2ZXJhZ2VDZW50ZXIoKSA/IENsdXN0ZXJQbGFjZW1lbnRNb2RlLk1lYW5WYWx1ZSA6IENsdXN0ZXJQbGFjZW1lbnRNb2RlLkZpcnN0UGluLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiB0aGlzLl92aXNpYmxlLFxyXG4gICAgICAgICAgICB6b29tT25DbGljazogdGhpcy5fbGF5ZXIuaXNab29tT25DbGljaygpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuX2xheWVyLmdldFN0eWxlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIEJvb2xlYW4uIFRydWUgaXMgdGhlIGxheWVyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlciBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBSZW1vdmVFbnRpdHkoZW50aXR5OiBNYXJrZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBqOiBudW1iZXIgPSB0aGlzLl9tYXJrZXJzLmluZGV4T2YoZW50aXR5KTtcclxuICAgICAgICAgICAgY29uc3QgazogbnVtYmVyID0gdGhpcy5fcGVuZGluZ01hcmtlcnMuaW5kZXhPZihlbnRpdHkpO1xyXG4gICAgICAgICAgICBpZiAoaiA+IC0xKSB7IHRoaXMuX21hcmtlcnMuc3BsaWNlKGosIDEpOyB9XHJcbiAgICAgICAgICAgIGlmIChrID4gLTEpIHsgdGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKGssIDEpOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlbW92ZU1hcmtlcihlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5kZWxldGUoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj4gY29udGFpbmluZ1xyXG4gICAgICogdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci4gVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXllci5nZXRNYXJrZXJzKCkuZm9yRWFjaChtID0+IHtcclxuICAgICAgICAgICAgbS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuY2xlYXJNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5jbGVhcigpO1xyXG5cclxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4oKTtcclxuICAgICAgICBlbnRpdGllcy5mb3JFYWNoKChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KGUuTmF0aXZlUHJpbWl0dmUsIGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKGUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMocCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBJQ2x1c3Rlck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXHJcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBsYWNlbWVudE1vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoJ0dvb2dsZU1hcmtlckNsdXN0ZXJlcjogUGxhY2VtZW50TW9kZSBvcHRpb24gY2Fubm90IGJlIHNldCBhZnRlciBpbml0aWFsIGNyZWF0aW9uLicpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuem9vbU9uQ2xpY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoJ0dvb2dsZU1hcmtlckNsdXN0ZXJlcjogWm9vbU9uQ2xpY2sgb3B0aW9uIGNhbm5vdCBiZSBzZXQgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbi4nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrICE9IG51bGwpIHt9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRNaW5DbHVzdGVyU2l6ZShvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkID8gMSA6IDEwMDAwMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVzZXRWaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZ3JpZFNpemUgIT0gbnVsbCAmJiAob3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA9PSBudWxsIHx8IG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnNldEdyaWRTaXplKG9wdGlvbnMuZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5tYXhab29tICE9IG51bGwpIHsgdGhpcy5fbGF5ZXIuc2V0TWF4Wm9vbShvcHRpb25zLm1heFpvb20pOyB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubWluaW11bUNsdXN0ZXJTaXplICE9IG51bGwpIHsgdGhpcy5fbGF5ZXIuc2V0TWluQ2x1c3RlclNpemUob3B0aW9ucy5taW5pbXVtQ2x1c3RlclNpemUpOyB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc3R5bGVzICE9IG51bGwpIHsgdGhpcy5fbGF5ZXIuc2V0U3R5bGVzKG9wdGlvbnMuc3R5bGVzKTsgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCkgeyB0aGlzLlNldFZpc2libGUob3B0aW9ucy52aXNpYmxlKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9IHZpc2libGUgPyB0aGlzLl9sYXllci5nZXRNYXAoKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCF2aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BlbmRpbmdNYXJrZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnB1c2goPEdvb2dsZU1hcFR5cGVzLk1hcmtlcj5lLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMocCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzID0gdGhpcy5fbWFya2Vycy5jb25jYXQodGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHRoZSBpbml0aWFsIHNldCBvZiBlbnRpdGllc1xyXG4gICAgICogaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RhcnRDbHVzdGVyaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5OYXRpdmVQcmltaXR2ZSAmJiBlLkxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKDxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHAucHVzaCg8R29vZ2xlTWFwVHlwZXMuTWFya2VyPmUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIuYWRkTWFya2VycyhwKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VycyA9IHRoaXMuX21hcmtlcnMuY29uY2F0KHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgICAgICAgLy8gb25seSBhZGQgdGhlIG1hcmtlcnMgaWYgdGhlIGxheWVyIGlzIHZpc2libGUuIE90aGVyd2lzZSwga2VlcCB0aGVtIHBlbmRpbmcuIFRoZXkgd291bGQgYmUgYWRkZWQgb25jZSB0aGVcclxuICAgICAgICAgICAgLy8gbGF5ZXIgaXMgc2V0IHRvIHZpc2libGUuXHJcbiAgICAgICAgICAgIHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faXNDbHVzdGVyaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cclxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xyXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RvcENsdXN0ZXJpbmcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5faXNDbHVzdGVyaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19