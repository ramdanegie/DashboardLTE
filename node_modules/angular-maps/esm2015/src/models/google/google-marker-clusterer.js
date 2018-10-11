/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleMarker } from './google-marker';
import { Marker } from '../marker';
import { ClusterPlacementMode } from '../cluster-placement-mode';
import { timer } from 'rxjs';
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
export class GoogleMarkerClusterer {
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     */
    constructor(_layer) {
        this._layer = _layer;
        this._isClustering = true;
        this._markerLookup = new Map();
        this._markers = new Array();
        this._pendingMarkers = new Array();
        this._mapclicks = 0;
        this._currentZoom = 0;
        this._visible = true;
    }
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} GoogleMapTypes.MarkerClusterer.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
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
    AddListener(eventType, fn) {
        throw (new Error('Events are not supported on Google Cluster Layers. You can still add events to individual markers.'));
    }
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
    AddEntity(entity) {
        let /** @type {?} */ isMarker = entity instanceof Marker;
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
    }
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            const /** @type {?} */ e = entities.map(p => {
                this._markerLookup.set(p.NativePrimitve, p);
                p.NativePrimitve.setMap(null);
                // remove the marker from the map as the clusterer will control marker visibility.
                return p.NativePrimitve;
            });
            if (this._isClustering && this._visible) {
                this._layer.addMarkers(e);
                this._markers.push(...entities);
            }
            else {
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                this._pendingMarkers.push(...entities);
            }
        }
    }
    /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    Delete() {
        this._layer.getMarkers().forEach(m => {
            m.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
    }
    /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    GetMarkerFromGoogleMarker(pin) {
        const /** @type {?} */ m = this._markerLookup.get(pin);
        return m;
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GetOptions() {
        const /** @type {?} */ options = {
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
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._visible;
    }
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    RemoveEntity(entity) {
        if (entity.NativePrimitve && entity.Location) {
            const /** @type {?} */ j = this._markers.indexOf(entity);
            const /** @type {?} */ k = this._pendingMarkers.indexOf(entity);
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
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        this._layer.getMarkers().forEach(m => {
            m.setMap(null);
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        const /** @type {?} */ p = new Array();
        entities.forEach((e) => {
            if (e.NativePrimitve && e.Location) {
                e.NativePrimitve.setMap(null);
                this._markerLookup.set(e.NativePrimitve, e);
                if (this._visible) {
                    this._markers.push(e);
                    p.push(e.NativePrimitve);
                }
                else {
                    this._pendingMarkers.push(e);
                }
            }
        });
        this._layer.addMarkers(p);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
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
    }
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    SetVisible(visible) {
        const /** @type {?} */ map = visible ? this._layer.getMap() : null;
        if (!visible) {
            this._layer.resetViewport(true);
        }
        else {
            const /** @type {?} */ p = new Array();
            if (this._pendingMarkers.length > 0) {
                this._pendingMarkers.forEach(e => {
                    if (e.NativePrimitve && e.Location) {
                        p.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.addMarkers(p);
                this._markers = this._markers.concat(this._pendingMarkers.splice(0));
            }
            else {
                this._layer.redraw();
            }
        }
        this._visible = visible;
    }
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    StartClustering() {
        if (this._isClustering) {
            return;
        }
        if (this._visible) {
            const /** @type {?} */ p = new Array();
            this._markers.forEach(e => {
                if (e.NativePrimitve && e.Location) {
                    p.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._pendingMarkers.forEach(e => {
                if (e.NativePrimitve && e.Location) {
                    p.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._layer.addMarkers(p);
            this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        }
        if (!this._visible) {
            // only add the markers if the layer is visible. Otherwise, keep them pending. They would be added once the
            // layer is set to visible.
            timer(0).subscribe(() => {
                this._layer.resetViewport(true);
            });
        }
        this._isClustering = true;
    }
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
    StopClustering() {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBTzdCLE1BQU07Ozs7Ozs7SUF3Q0YsWUFBb0IsTUFBc0M7UUFBdEMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0M7NkJBbkNsQyxJQUFJOzZCQUNnQyxJQUFJLEdBQUcsRUFBaUM7d0JBQ2xFLElBQUksS0FBSyxFQUFVOytCQUNaLElBQUksS0FBSyxFQUFVOzBCQUMvQixDQUFDOzRCQUNDLENBQUM7d0JBQ0osSUFBSTtLQTZCK0I7Ozs7Ozs7O1FBaEJwRCxjQUFjO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7SUErQmhCLFdBQVcsQ0FBQyxTQUFpQixFQUFFLEVBQVk7UUFDOUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG9HQUFvRyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBWXJILFNBQVMsQ0FBQyxNQUFjO1FBQzNCLHFCQUFJLFFBQVEsR0FBWSxNQUFNLFlBQVksTUFBTSxDQUFDO1FBQ2pELFFBQVEsR0FBRyxNQUFNLFlBQVksWUFBWSxJQUFJLFFBQVEsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBRW5DLEVBQUUs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cG9ydCB7IEdvb2dsZU1hcmtlciB9IGZyb20gJy4vZ29vZ2xlLW1hcmtlcic7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyaW5nIGxheWVyIGZvciB0aGUgR29vZ2xlIE1hcCBQcm92aWRlci5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIExheWVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaXNDbHVzdGVyaW5nID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX21hcmtlckxvb2t1cDogTWFwPEdvb2dsZU1hcFR5cGVzLk1hcmtlciwgTWFya2VyPiA9IG5ldyBNYXA8R29vZ2xlTWFwVHlwZXMuTWFya2VyLCBNYXJrZXI+KCk7XHJcbiAgICBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxNYXJrZXI+ID0gbmV3IEFycmF5PE1hcmtlcj4oKTtcclxuICAgIHByaXZhdGUgX3BlbmRpbmdNYXJrZXJzOiBBcnJheTxNYXJrZXI+ID0gbmV3IEFycmF5PE1hcmtlcj4oKTtcclxuICAgIHByaXZhdGUgX21hcGNsaWNrczogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRab29tOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGNsYXNzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyLiBOYXRpdmUgR29vZ2xlIE1hcHMgTWFya2VyIENsdXN0ZXJlciBzdXBwb3J0aW5nIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xheWVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIpIHsgfVxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcywgTGF5ZXIgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHN0cmluZy4gVHlwZSBvZiBldmVudCB0byBhZGQgKGNsaWNrLCBtb3VzZW92ZXIsIGV0YykuIFlvdSBjYW4gdXNlIGFueSBldmVudCB0aGF0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZVxyXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ0V2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBvbiBHb29nbGUgQ2x1c3RlciBMYXllcnMuIFlvdSBjYW4gc3RpbGwgYWRkIGV2ZW50cyB0byBpbmRpdmlkdWFsIG1hcmtlcnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uIGFzIGl0IHdpbGxcclxuICAgICAqIHRyaWdnZXIgYSByZWNhbHVhdGlvbiBvZiB0aGUgY2x1c3RlcnMgKGFuZCBhc3NvY2lhdGVkIG1hcmtlcnMgaWYgYXBwcm9wcml0ZSkgZm9yXHJcbiAgICAgKiBlYWNoIGludm9jYXRpb24uIElmIHlvdSB1c2UgdGhpcyBtZXRob2QgdG8gYWRkIG1hbnkgbWFya2VycyB0byB0aGUgY2x1c3RlciwgdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEVudGl0eShlbnRpdHk6IE1hcmtlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBpc01hcmtlcjogYm9vbGVhbiA9IGVudGl0eSBpbnN0YW5jZW9mIE1hcmtlcjtcclxuICAgICAgICBpc01hcmtlciA9IGVudGl0eSBpbnN0YW5jZW9mIEdvb2dsZU1hcmtlciB8fCBpc01hcmtlcjtcclxuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcclxuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbWFya2VyIGZyb20gdGhlIG1hcCBhcyB0aGUgY2x1c3RlcmVyIHdpbGwgY29udHJvbCBtYXJrZXIgdmlzaWJpbGl0eS5cclxuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BDbHVzdGVyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSAmJiBlbnRpdHkuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZyAmJiB0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXIoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlLCBlbnRpdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcclxuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRDbHVzdGVyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIG1hcmtlcnMgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xyXG4gICAgICAgICAgICBjb25zdCBlOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gZW50aXRpZXMubWFwKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChwLk5hdGl2ZVByaW1pdHZlLCBwKTtcclxuICAgICAgICAgICAgICAgIHAuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbWFya2VyIGZyb20gdGhlIG1hcCBhcyB0aGUgY2x1c3RlcmVyIHdpbGwgY29udHJvbCBtYXJrZXIgdmlzaWJpbGl0eS5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwLk5hdGl2ZVByaW1pdHZlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZyAmJiB0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGxheWVyIGlzIG5vdCB2aXNpYmxlLCBhbHdheXMgYWRkIHRvIHBlbmRpbmdNYXJrZXJzLiBTZXR0aW5nIHRoZSBsYXllciB0byB2aXNpYmxlIGxhdGVyXHJcbiAgICAgICAgICAgICAgICAvLyB3aWxsIHJlbmRlciB0aGUgbWFya2VycyBhcHByb3ByaWF0ZWx5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGNsdXN0ZXJpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xheWVyLmdldE1hcmtlcnMoKS5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgICAgICBtLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbWFya2VyIGZyb20gdGhlIG1hcCBhcyB0aGUgY2x1c3RlcmVyIHdpbGwgY29udHJvbCBtYXJrZXIgdmlzaWJpbGl0eS5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllci5jbGVhck1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLl9tYXJrZXJzLnNwbGljZSgwKTtcclxuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhYnN0cmFjdCBtYXJrZXIgdXNlZCB0byB3cmFwIHRoZSBHb29nbGUgTWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIE1hcmtlci4gVGhlIGFic3RyYWN0IG1hcmtlciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwdXNocGluLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE1hcmtlckZyb21Hb29nbGVNYXJrZXIocGluOiBHb29nbGVNYXBUeXBlcy5NYXJrZXIpOiBNYXJrZXIge1xyXG4gICAgICAgIGNvbnN0IG06IE1hcmtlciA9IHRoaXMuX21hcmtlckxvb2t1cC5nZXQocGluKTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgSUNsdXN0ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElDbHVzdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgZ3JpZFNpemU6IHRoaXMuX2xheWVyLmdldEdyaWRTaXplKCksXHJcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiB0aGlzLl9sYXllci5nZXRHcmlkU2l6ZSgpID09PSAwLFxyXG4gICAgICAgICAgICBtYXhab29tOiB0aGlzLl9sYXllci5nZXRNYXhab29tKCksXHJcbiAgICAgICAgICAgIG1pbmltdW1DbHVzdGVyU2l6ZTogdGhpcy5fbGF5ZXIuZ2V0TWluQ2x1c3RlclNpemUoKSxcclxuICAgICAgICAgICAgcGxhY2VtZW50TW9kZTogdGhpcy5fbGF5ZXIuaXNBdmVyYWdlQ2VudGVyKCkgPyBDbHVzdGVyUGxhY2VtZW50TW9kZS5NZWFuVmFsdWUgOiBDbHVzdGVyUGxhY2VtZW50TW9kZS5GaXJzdFBpbixcclxuICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5fdmlzaWJsZSxcclxuICAgICAgICAgICAgem9vbU9uQ2xpY2s6IHRoaXMuX2xheWVyLmlzWm9vbU9uQ2xpY2soKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0aGlzLl9sYXllci5nZXRTdHlsZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIgRW50aXR5IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSAmJiBlbnRpdHkuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fbWFya2Vycy5pbmRleE9mKGVudGl0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGs6IG51bWJlciA9IHRoaXMuX3BlbmRpbmdNYXJrZXJzLmluZGV4T2YoZW50aXR5KTtcclxuICAgICAgICAgICAgaWYgKGogPiAtMSkgeyB0aGlzLl9tYXJrZXJzLnNwbGljZShqLCAxKTsgfVxyXG4gICAgICAgICAgICBpZiAoayA+IC0xKSB7IHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZShrLCAxKTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5yZW1vdmVNYXJrZXIoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuZGVsZXRlKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZW50aXRpZXMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+IGNvbnRhaW5pbmdcclxuICAgICAqIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuZ2V0TWFya2VycygpLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICAgIG0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLmNsZWFyTWFya2VycygpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKTtcclxuICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+KCk7XHJcbiAgICAgICAgZW50aXRpZXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChlLk5hdGl2ZVByaW1pdHZlLCBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHAucHVzaChlLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKHApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIGxheWVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xyXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5wbGFjZW1lbnRNb2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKCdHb29nbGVNYXJrZXJDbHVzdGVyZXI6IFBsYWNlbWVudE1vZGUgb3B0aW9uIGNhbm5vdCBiZSBzZXQgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbi4nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnpvb21PbkNsaWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKCdHb29nbGVNYXJrZXJDbHVzdGVyZXI6IFpvb21PbkNsaWNrIG9wdGlvbiBjYW5ub3QgYmUgc2V0IGFmdGVyIGluaXRpYWwgY3JlYXRpb24uJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjayAhPSBudWxsKSB7fVxyXG4gICAgICAgIGlmIChvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIuc2V0TWluQ2x1c3RlclNpemUob3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA/IDEgOiAxMDAwMDAwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlc2V0Vmlld3BvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLmdyaWRTaXplICE9IG51bGwgJiYgKG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQgPT0gbnVsbCB8fCBvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRHcmlkU2l6ZShvcHRpb25zLmdyaWRTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVzZXRWaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubWF4Wm9vbSAhPSBudWxsKSB7IHRoaXMuX2xheWVyLnNldE1heFpvb20ob3B0aW9ucy5tYXhab29tKTsgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLm1pbmltdW1DbHVzdGVyU2l6ZSAhPSBudWxsKSB7IHRoaXMuX2xheWVyLnNldE1pbkNsdXN0ZXJTaXplKG9wdGlvbnMubWluaW11bUNsdXN0ZXJTaXplKTsgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnN0eWxlcyAhPSBudWxsKSB7IHRoaXMuX2xheWVyLnNldFN0eWxlcyhvcHRpb25zLnN0eWxlcyk7IH1cclxuICAgICAgICBpZiAob3B0aW9ucy52aXNpYmxlICE9IG51bGwpIHsgdGhpcy5TZXRWaXNpYmxlKG9wdGlvbnMudmlzaWJsZSk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSB2aXNpYmxlID8gdGhpcy5fbGF5ZXIuZ2V0TWFwKCkgOiBudWxsO1xyXG4gICAgICAgIGlmICghdmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nTWFya2Vycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5wdXNoKDxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VycyA9IHRoaXMuX21hcmtlcnMuY29uY2F0KHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5yZWRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci4gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciB0aGUgaW5pdGlhbCBzZXQgb2YgZW50aXRpZXNcclxuICAgICAqIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgY2x1c3Rlci4gVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cclxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xyXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHAucHVzaCg8R29vZ2xlTWFwVHlwZXMuTWFya2VyPmUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBwLnB1c2goPEdvb2dsZU1hcFR5cGVzLk1hcmtlcj5lLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMocCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlcnMgPSB0aGlzLl9tYXJrZXJzLmNvbmNhdCh0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgYWRkIHRoZSBtYXJrZXJzIGlmIHRoZSBsYXllciBpcyB2aXNpYmxlLiBPdGhlcndpc2UsIGtlZXAgdGhlbSBwZW5kaW5nLiBUaGV5IHdvdWxkIGJlIGFkZGVkIG9uY2UgdGhlXHJcbiAgICAgICAgICAgIC8vIGxheWVyIGlzIHNldCB0byB2aXNpYmxlLlxyXG4gICAgICAgICAgICB0aW1lcigwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVzZXRWaWV3cG9ydCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci5cclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXHJcbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcclxuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0b3BDbHVzdGVyaW5nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDbHVzdGVyaW5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==