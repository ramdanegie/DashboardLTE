/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { Marker } from '../marker';
import { BingSpiderClusterMarker } from './bing-spider-cluster-marker';
import { BingMarker } from './bing-marker';
/**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
export class BingClusterLayer {
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * \@memberof BingClusterLayer
     * @param {?} _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param {?} _maps MapService. MapService implementation to leverage for the layer.
     *
     */
    constructor(_layer, _maps) {
        this._layer = _layer;
        this._maps = _maps;
        this._isClustering = true;
        this._markers = new Array();
        this._markerLookup = new Map();
        this._pendingMarkers = new Array();
        this._spiderMarkers = new Array();
        this._spiderMarkerLookup = new Map();
        this._useSpiderCluster = false;
        this._mapclicks = 0;
        this._events = new Array();
        this._currentZoom = 0;
        this._spiderOptions = {
            circleSpiralSwitchover: 9,
            collapseClusterOnMapChange: false,
            collapseClusterOnNthClick: 1,
            invokeClickOnHover: true,
            minCircleLength: 60,
            minSpiralAngleSeperation: 25,
            spiralDistanceFactor: 5,
            stickStyle: {
                strokeColor: 'black',
                strokeThickness: 2
            },
            stickHoverStyle: { strokeColor: 'red' },
            markerSelected: null,
            markerUnSelected: null
        };
        this._currentCluster = null;
    }
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Microsoft.Maps.ClusterLayer.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, (e) => {
            fn(e);
        });
    }
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    AddEntity(entity) {
        let /** @type {?} */ isMarker = entity instanceof Marker;
        isMarker = entity instanceof BingMarker || isMarker;
        if (isMarker) {
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering) {
                const /** @type {?} */ p = this._layer.getPushpins();
                p.push(entity.NativePrimitve);
                this._layer.setPushpins(p);
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
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            const /** @type {?} */ e = entities.map(p => {
                this._markerLookup.set(p.NativePrimitve, p);
                return p.NativePrimitve;
            });
            if (this._isClustering) {
                const /** @type {?} */ p = this._layer.getPushpins();
                p.push(...e);
                this._layer.setPushpins(p);
                this._markers.push(...entities);
            }
            else {
                this._pendingMarkers.push(...entities);
            }
        }
    }
    /**
     * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
     * individual underlying pins.
     *
     * \@memberof BingClusterLayer
     * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
     *
     * @return {?}
     */
    InitializeSpiderClusterSupport(options) {
        if (this._useSpiderCluster) {
            return;
        }
        const /** @type {?} */ m = (/** @type {?} */ (this._maps)).MapInstance;
        this._useSpiderCluster = true;
        this._spiderLayer = new Microsoft.Maps.Layer();
        this._currentZoom = m.getZoom();
        this.SetSpiderOptions(options);
        m.layers.insert(this._spiderLayer);
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'click', e => this.OnMapClick(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangestart', e => this.OnMapViewChangeStart(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangeend', e => this.OnMapViewChangeEnd(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(this._layer, 'click', e => this.OnLayerClick(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'click', e => this.OnLayerClick(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseover', e => this.OnSpiderMouseOver(e)));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseout', e => this.OnSpiderMouseOut(e)));
    }
    /**
     * Deletes the clustering layer.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    Delete() {
        if (this._useSpiderCluster) {
            this._spiderLayer.clear();
            (/** @type {?} */ (this._maps)).MapPromise.then(m => {
                m.layers.remove(this._spiderLayer);
                this._spiderLayer = null;
            });
            this._events.forEach(e => Microsoft.Maps.Events.removeHandler(e));
            this._events.splice(0);
            this._useSpiderCluster = false;
        }
        this._markers.splice(0);
        this._spiderMarkers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        this._maps.DeleteLayer(this);
    }
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    GetMarkerFromBingMarker(pin) {
        const /** @type {?} */ m = this._markerLookup.get(pin);
        return m;
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GetOptions() {
        const /** @type {?} */ o = this._layer.getOptions();
        const /** @type {?} */ options = {
            id: 0,
            gridSize: o.gridSize,
            layerOffset: o.layerOffset,
            clusteringEnabled: o.clusteringEnabled,
            callback: o.callback,
            clusteredPinCallback: o.clusteredPinCallback,
            visible: o.visible,
            zIndex: o.zIndex
        };
        return options;
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._layer.getOptions().visible;
    }
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} - The abstract marker object representing the pushpin.
     *
     */
    GetSpiderMarkerFromBingMarker(pin) {
        const /** @type {?} */ m = this._spiderMarkerLookup.get(pin);
        return m;
    }
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker - Entity to be removed from the layer.
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
                const /** @type {?} */ p = this._layer.getPushpins();
                const /** @type {?} */ i = p.indexOf(entity.NativePrimitve);
                if (i > -1) {
                    p.splice(i, 1);
                    this._layer.setPushpins(p);
                }
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        const /** @type {?} */ p = new Array();
        this._markers.splice(0);
        this._markerLookup.clear();
        entities.forEach((e) => {
            if (e.NativePrimitve && e.Location) {
                this._markers.push(e);
                this._markerLookup.set(e.NativePrimitve, e);
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._layer.setPushpins(p);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = BingConversions.TranslateClusterOptions(options);
        this._layer.setOptions(o);
        if (options.spiderClusterOptions) {
            this.SetSpiderOptions(options.spiderClusterOptions);
        }
    }
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    SetVisible(visible) {
        const /** @type {?} */ o = this._layer.getOptions();
        o.visible = visible;
        this._layer.setOptions(o);
    }
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    StartClustering() {
        if (this._isClustering) {
            return;
        }
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
        this._layer.setPushpins(p);
        this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        this._isClustering = true;
    }
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    StopClustering() {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    }
    /**
     * Creates a copy of a pushpins basic options.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin Pushpin to copy options from.
     * @return {?} - A copy of a pushpins basic options.
     *
     */
    GetBasicPushpinOptions(pin) {
        return /** @type {?} */ ({
            anchor: pin.getAnchor(),
            color: pin.getColor(),
            cursor: pin.getCursor(),
            icon: pin.getIcon(),
            roundClickableArea: pin.getRoundClickableArea(),
            subTitle: pin.getSubTitle(),
            text: pin.getText(),
            textOffset: pin.getTextOffset(),
            title: pin.getTitle()
        });
    }
    /**
     * Hides the spider cluster and resotres the original pin.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    HideSpiderCluster() {
        this._mapclicks = 0;
        if (this._currentCluster) {
            this._spiderLayer.clear();
            this._spiderMarkers.splice(0);
            this._spiderMarkerLookup.clear();
            this._currentCluster = null;
            this._mapclicks = -1;
            if (this._spiderOptions.markerUnSelected) {
                this._spiderOptions.markerUnSelected();
            }
        }
    }
    /**
     * Click event handler for when a shape in the cluster layer is clicked.
     *
     * \@memberof BingClusterLayer
     * @param {?} e The mouse event argurment from the click event.
     *
     * @return {?}
     */
    OnLayerClick(e) {
        if (e.primitive instanceof Microsoft.Maps.ClusterPushpin) {
            const /** @type {?} */ cp = /** @type {?} */ (e.primitive);
            const /** @type {?} */ showNewCluster = cp !== this._currentCluster;
            this.HideSpiderCluster();
            if (showNewCluster) {
                this.ShowSpiderCluster(/** @type {?} */ (e.primitive));
            }
        }
        else {
            const /** @type {?} */ pin = /** @type {?} */ (e.primitive);
            if (pin.metadata && pin.metadata.isClusterMarker) {
                const /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
                const /** @type {?} */ p = m.ParentMarker;
                const /** @type {?} */ ppin = p.NativePrimitve;
                if (this._spiderOptions.markerSelected) {
                    this._spiderOptions.markerSelected(p, new BingMarker(this._currentCluster, null, null));
                }
                if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                    Microsoft.Maps.Events.invoke(ppin, 'click', e);
                }
                this._mapclicks = 0;
            }
            else {
                if (this._spiderOptions.markerSelected) {
                    this._spiderOptions.markerSelected(this.GetMarkerFromBingMarker(pin), null);
                }
                if (Microsoft.Maps.Events.hasHandler(pin, 'click')) {
                    Microsoft.Maps.Events.invoke(pin, 'click', e);
                }
            }
        }
    }
    /**
     * Delegate handling the click event on the map (outside a spider cluster). Depending on the
     * spider options, closes the cluster or increments the click counter.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event
     *
     * @return {?}
     */
    OnMapClick(e) {
        if (this._mapclicks === -1) {
            return;
        }
        else if (++this._mapclicks >= this._spiderOptions.collapseClusterOnNthClick) {
            this.HideSpiderCluster();
        }
        else {
            // do nothing as this._mapclicks has already been incremented above
        }
    }
    /**
     * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    OnMapViewChangeEnd(e) {
        const /** @type {?} */ z = (/** @type {?} */ (e.target)).getZoom();
        const /** @type {?} */ hasZoomChanged = (z !== this._currentZoom);
        this._currentZoom = z;
        if (hasZoomChanged) {
            this.HideSpiderCluster();
        }
    }
    /**
     * Delegate handling the map view change start event. Depending on the spider options, hides the
     * the exploded spider or does nothing.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    OnMapViewChangeStart(e) {
        if (this._spiderOptions.collapseClusterOnMapChange) {
            this.HideSpiderCluster();
        }
    }
    /**
     * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    OnSpiderMouseOut(e) {
        const /** @type {?} */ pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            const /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickStyle);
        }
    }
    /**
     * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
     * on the underlying original marker dependent on the spider options.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    OnSpiderMouseOver(e) {
        const /** @type {?} */ pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            const /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickHoverStyle);
            if (this._spiderOptions.invokeClickOnHover) {
                const /** @type {?} */ p = m.ParentMarker;
                const /** @type {?} */ ppin = p.NativePrimitve;
                if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                    Microsoft.Maps.Events.invoke(ppin, 'click', e);
                }
            }
        }
    }
    /**
     * Sets the options for spider behavior.
     *
     * \@memberof BingClusterLayer
     * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetSpiderOptions(options) {
        if (options) {
            if (typeof options.circleSpiralSwitchover === 'number') {
                this._spiderOptions.circleSpiralSwitchover = options.circleSpiralSwitchover;
            }
            if (typeof options.collapseClusterOnMapChange === 'boolean') {
                this._spiderOptions.collapseClusterOnMapChange = options.collapseClusterOnMapChange;
            }
            if (typeof options.collapseClusterOnNthClick === 'number') {
                this._spiderOptions.collapseClusterOnNthClick = options.collapseClusterOnNthClick;
            }
            if (typeof options.invokeClickOnHover === 'boolean') {
                this._spiderOptions.invokeClickOnHover = options.invokeClickOnHover;
            }
            if (typeof options.minSpiralAngleSeperation === 'number') {
                this._spiderOptions.minSpiralAngleSeperation = options.minSpiralAngleSeperation;
            }
            if (typeof options.spiralDistanceFactor === 'number') {
                this._spiderOptions.spiralDistanceFactor = options.spiralDistanceFactor;
            }
            if (typeof options.minCircleLength === 'number') {
                this._spiderOptions.minCircleLength = options.minCircleLength;
            }
            if (options.stickHoverStyle) {
                this._spiderOptions.stickHoverStyle = options.stickHoverStyle;
            }
            if (options.stickStyle) {
                this._spiderOptions.stickStyle = options.stickStyle;
            }
            if (options.markerSelected) {
                this._spiderOptions.markerSelected = options.markerSelected;
            }
            if (options.markerUnSelected) {
                this._spiderOptions.markerUnSelected = options.markerUnSelected;
            }
            if (typeof options.visible === 'boolean') {
                this._spiderOptions.visible = options.visible;
            }
            this.SetOptions(/** @type {?} */ (options));
        }
    }
    /**
     * Expands a cluster into it's open spider layout.
     *
     * \@memberof BingClusterLayer
     * @param {?} cluster The cluster to show in it's open spider layout..
     *
     * @return {?}
     */
    ShowSpiderCluster(cluster) {
        this.HideSpiderCluster();
        this._currentCluster = cluster;
        if (cluster && cluster.containedPushpins) {
            // Create spider data.
            const /** @type {?} */ m = (/** @type {?} */ (this._maps)).MapInstance;
            const /** @type {?} */ pins = cluster.containedPushpins;
            const /** @type {?} */ center = cluster.getLocation();
            const /** @type {?} */ centerPoint = /** @type {?} */ (m.tryLocationToPixel(center, Microsoft.Maps.PixelReference.control));
            let /** @type {?} */ stick;
            let /** @type {?} */ angle = 0;
            const /** @type {?} */ makeSpiral = pins.length > this._spiderOptions.circleSpiralSwitchover;
            let /** @type {?} */ legPixelLength;
            let /** @type {?} */ stepAngle;
            let /** @type {?} */ stepLength;
            if (makeSpiral) {
                legPixelLength = this._spiderOptions.minCircleLength / Math.PI;
                stepLength = 2 * Math.PI * this._spiderOptions.spiralDistanceFactor;
            }
            else {
                stepAngle = 2 * Math.PI / pins.length;
                legPixelLength = (this._spiderOptions.spiralDistanceFactor / stepAngle / Math.PI / 2) * pins.length;
                if (legPixelLength < this._spiderOptions.minCircleLength) {
                    legPixelLength = this._spiderOptions.minCircleLength;
                }
            }
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = pins.length; i < len; i++) {
                // Calculate spider pin location.
                if (!makeSpiral) {
                    angle = stepAngle * i;
                }
                else {
                    angle += this._spiderOptions.minSpiralAngleSeperation / legPixelLength + i * 0.0005;
                    legPixelLength += stepLength / angle;
                }
                const /** @type {?} */ point = new Microsoft.Maps.Point(centerPoint.x + legPixelLength * Math.cos(angle), centerPoint.y + legPixelLength * Math.sin(angle));
                const /** @type {?} */ loc = /** @type {?} */ (m.tryPixelToLocation(point, Microsoft.Maps.PixelReference.control));
                // Create stick to pin.
                stick = new Microsoft.Maps.Polyline([center, loc], this._spiderOptions.stickStyle);
                this._spiderLayer.add(stick);
                // Create pin in spiral that contains same metadata as parent pin.
                const /** @type {?} */ pin = new Microsoft.Maps.Pushpin(loc);
                pin.metadata = pins[i].metadata || {};
                pin.metadata.isClusterMarker = true;
                pin.setOptions(this.GetBasicPushpinOptions(pins[i]));
                this._spiderLayer.add(pin);
                const /** @type {?} */ spiderMarker = new BingSpiderClusterMarker(pin, null, this._spiderLayer);
                spiderMarker.Stick = stick;
                spiderMarker.ParentMarker = /** @type {?} */ (this.GetMarkerFromBingMarker(pins[i]));
                this._spiderMarkers.push(spiderMarker);
                this._spiderMarkerLookup.set(pin, spiderMarker);
            }
            this._mapclicks = 0;
        }
    }
}
function BingClusterLayer_tsickle_Closure_declarations() {
    /** @type {?} */
    BingClusterLayer.prototype._isClustering;
    /** @type {?} */
    BingClusterLayer.prototype._markers;
    /** @type {?} */
    BingClusterLayer.prototype._markerLookup;
    /** @type {?} */
    BingClusterLayer.prototype._pendingMarkers;
    /** @type {?} */
    BingClusterLayer.prototype._spiderMarkers;
    /** @type {?} */
    BingClusterLayer.prototype._spiderMarkerLookup;
    /** @type {?} */
    BingClusterLayer.prototype._useSpiderCluster;
    /** @type {?} */
    BingClusterLayer.prototype._mapclicks;
    /** @type {?} */
    BingClusterLayer.prototype._spiderLayer;
    /** @type {?} */
    BingClusterLayer.prototype._events;
    /** @type {?} */
    BingClusterLayer.prototype._currentZoom;
    /** @type {?} */
    BingClusterLayer.prototype._spiderOptions;
    /** @type {?} */
    BingClusterLayer.prototype._currentCluster;
    /** @type {?} */
    BingClusterLayer.prototype._layer;
    /** @type {?} */
    BingClusterLayer.prototype._maps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBSXZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBTzNDLE1BQU07Ozs7Ozs7OztJQThERixZQUFvQixNQUFtQyxFQUFVLEtBQWlCO1FBQTlELFdBQU0sR0FBTixNQUFNLENBQTZCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTs2QkF6RDFELElBQUk7d0JBQ00sSUFBSSxLQUFLLEVBQVU7NkJBQ1EsSUFBSSxHQUFHLEVBQWtDOytCQUM3RCxJQUFJLEtBQUssRUFBVTs4QkFDSCxJQUFJLEtBQUssRUFBMkI7bUNBRTVFLElBQUksR0FBRyxFQUFtRDtpQ0FDL0MsS0FBSzswQkFDWixDQUFDO3VCQUU4QixJQUFJLEtBQUssRUFBNkI7NEJBQ25FLENBQUM7OEJBQ3dCO1lBQzVDLHNCQUFzQixFQUFFLENBQUM7WUFDekIsMEJBQTBCLEVBQUUsS0FBSztZQUNqQyx5QkFBeUIsRUFBRSxDQUFDO1lBQzVCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsd0JBQXdCLEVBQUUsRUFBRTtZQUM1QixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsT0FBTztnQkFDcEIsZUFBZSxFQUFFLENBQUM7YUFDckI7WUFDRCxlQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQ3ZDLGNBQWMsRUFBRSxJ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QUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUN0QyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUzQix1QkFBTSxZQUFZLEdBQTRCLElBQUksdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3hHLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixZQUFZLENBQUMsWUFBWSxxQkFBZSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBRW5EO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDdkI7O0NBR1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lzcGlkZXItY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL2xheWVyJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbWFya2VyJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgfSBmcm9tICcuL2Jpbmctc3BpZGVyLWNsdXN0ZXItbWFya2VyJztcclxuaW1wb3J0IHsgQmluZ01hcmtlciB9IGZyb20gJy4vYmluZy1tYXJrZXInO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgY2x1c3RlcmluZyBsYXllciBmb3IgdGhlIEJpbmcgTWFwIFByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ0NsdXN0ZXJMYXllciBpbXBsZW1lbnRzIExheWVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaXNDbHVzdGVyaW5nID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX21hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfbWFya2VyTG9va3VwOiBNYXA8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiwgTWFya2VyPiA9IG5ldyBNYXA8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiwgTWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfcGVuZGluZ01hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfc3BpZGVyTWFya2VyczogQXJyYXk8QmluZ1NwaWRlckNsdXN0ZXJNYXJrZXI+ID0gbmV3IEFycmF5PEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfc3BpZGVyTWFya2VyTG9va3VwOiBNYXA8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiwgQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXI+ID1cclxuICAgICAgICAgICAgICAgICAgICAgbmV3IE1hcDxNaWNyb3NvZnQuTWFwcy5QdXNocGluLCBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlcj4oKTtcclxuICAgIHByaXZhdGUgX3VzZVNwaWRlckNsdXN0ZXIgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21hcGNsaWNrcyA9IDA7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJMYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXI7XHJcbiAgICBwcml2YXRlIF9ldmVudHM6IEFycmF5PE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ+KCk7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Wm9vbSA9IDA7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJPcHRpb25zOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2lyY2xlU3BpcmFsU3dpdGNob3ZlcjogOSxcclxuICAgICAgICBjb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgY29sbGFwc2VDbHVzdGVyT25OdGhDbGljazogMSxcclxuICAgICAgICBpbnZva2VDbGlja09uSG92ZXI6IHRydWUsXHJcbiAgICAgICAgbWluQ2lyY2xlTGVuZ3RoOiA2MCxcclxuICAgICAgICBtaW5TcGlyYWxBbmdsZVNlcGVyYXRpb246IDI1LFxyXG4gICAgICAgIHNwaXJhbERpc3RhbmNlRmFjdG9yOiA1LFxyXG4gICAgICAgIHN0aWNrU3R5bGU6IHtcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogMlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RpY2tIb3ZlclN0eWxlOiB7IHN0cm9rZUNvbG9yOiAncmVkJyB9LFxyXG4gICAgICAgIG1hcmtlclNlbGVjdGVkOiBudWxsLFxyXG4gICAgICAgIG1hcmtlclVuU2VsZWN0ZWQ6IG51bGxcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q2x1c3RlcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4gPSBudWxsO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbmF0aXZlIHByaW1pdGl2ZSB1bmRlcm5lYXRoIHRoZSBhYnN0cmFjdGlvbiBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBCaW5nQ2x1c3RlckxheWVyIGNsYXNzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyLiBOYXRpdmUgQmluZyBDbHVzdGVyIExheWVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gX21hcHMgTWFwU2VydmljZS4gTWFwU2VydmljZSBpbXBsZW1lbnRhdGlvbiB0byBsZXZlcmFnZSBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIsIHByaXZhdGUgX21hcHM6IE1hcFNlcnZpY2UpIHsgfVxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcywgTGF5ZXIgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHN0cmluZy4gVHlwZSBvZiBldmVudCB0byBhZGQgKGNsaWNrLCBtb3VzZW92ZXIsIGV0YykuIFlvdSBjYW4gdXNlIGFueSBldmVudCB0aGF0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZVxyXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9sYXllciwgZXZlbnRUeXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBmbihlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbiBhcyBpdCB3aWxsXHJcbiAgICAgKiB0cmlnZ2VyIGEgcmVjYWx1YXRpb24gb2YgdGhlIGNsdXN0ZXJzIChhbmQgYXNzb2NpYXRlZCBtYXJrZXJzIGlmIGFwcHJvcHJpdGUpIGZvclxyXG4gICAgICogZWFjaCBpbnZvY2F0aW9uLiBJZiB5b3UgdXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBtYW55IG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXIsIHVzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyLiBFbnRpdHkgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGlzTWFya2VyOiBib29sZWFuID0gZW50aXR5IGluc3RhbmNlb2YgTWFya2VyO1xyXG4gICAgICAgIGlzTWFya2VyID0gZW50aXR5IGluc3RhbmNlb2YgQmluZ01hcmtlciB8fCBpc01hcmtlcjtcclxuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcclxuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BDbHVzdGVyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSAmJiBlbnRpdHkuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4gPSB0aGlzLl9sYXllci5nZXRQdXNocGlucygpO1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlLCBlbnRpdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcclxuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRDbHVzdGVyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIG1hcmtlcnMgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdGllcyAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpICYmIGVudGl0aWVzLmxlbmd0aCAhPT0gMCApIHtcclxuICAgICAgICAgICAgY29uc3QgZTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4gPSBlbnRpdGllcy5tYXAocCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KHAuTmF0aXZlUHJpbWl0dmUsIHApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuTmF0aXZlUHJpbWl0dmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IHRoaXMuX2xheWVyLmdldFB1c2hwaW5zKCk7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goLi4uZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaCguLi5lbnRpdGllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHNwaWRlciBiZWhhdmlvciBmb3IgdGhlIGNsdXNlcmluZyBsYXllciAod2hlbiBhIGNsdXN0ZXIgbWFrZXIgaXMgY2xpY2tlZCwgaXQgZXhwbG9kZXMgaW50byBhIHNwaWRlciBvZiB0aGVcclxuICAgICAqIGluZGl2aWR1YWwgdW5kZXJseWluZyBwaW5zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElTcGlkZXJDbHVzdGVyT3B0aW9ucy4gT3B0aW9uYWwuIE9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgc3BpZGVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0aWFsaXplU3BpZGVyQ2x1c3RlclN1cHBvcnQob3B0aW9ucz86IElTcGlkZXJDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VTcGlkZXJDbHVzdGVyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9ICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwcykuTWFwSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5fdXNlU3BpZGVyQ2x1c3RlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIoKTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Wm9vbSA9IG0uZ2V0Wm9vbSgpO1xyXG4gICAgICAgIHRoaXMuU2V0U3BpZGVyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICBtLmxheWVycy5pbnNlcnQodGhpcy5fc3BpZGVyTGF5ZXIpO1xyXG5cclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gQWRkIHNwaWRlciByZWxhdGVkIGV2ZW50cy4uLi5cclxuICAgICAgICAvLy9cclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtLCAnY2xpY2snLCBlID0+IHRoaXMuT25NYXBDbGljayhlKSkpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICd2aWV3Y2hhbmdlc3RhcnQnLCBlID0+IHRoaXMuT25NYXBWaWV3Q2hhbmdlU3RhcnQoZSkpKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtLCAndmlld2NoYW5nZWVuZCcsIGUgPT4gdGhpcy5Pbk1hcFZpZXdDaGFuZ2VFbmQoZSkpKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9sYXllciwgJ2NsaWNrJywgZSA9PiB0aGlzLk9uTGF5ZXJDbGljayhlKSkpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3NwaWRlckxheWVyLCAnY2xpY2snLCBlID0+IHRoaXMuT25MYXllckNsaWNrKGUpKSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fc3BpZGVyTGF5ZXIsICdtb3VzZW92ZXInLCBlID0+IHRoaXMuT25TcGlkZXJNb3VzZU92ZXIoZSkpKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9zcGlkZXJMYXllciwgJ21vdXNlb3V0JywgZSA9PiB0aGlzLk9uU3BpZGVyTW91c2VPdXQoZSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGNsdXN0ZXJpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlU3BpZGVyQ2x1c3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGlkZXJMYXllci5jbGVhcigpO1xyXG4gICAgICAgICAgICAoPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcHMpLk1hcFByb21pc2UudGhlbihtID0+IHtcclxuICAgICAgICAgICAgICAgIG0ubGF5ZXJzLnJlbW92ZSh0aGlzLl9zcGlkZXJMYXllcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJMYXllciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChlID0+IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKGUpKTtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5fdXNlU3BpZGVyQ2x1c3RlciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXJrZXJzLnNwbGljZSgwKTtcclxuICAgICAgICB0aGlzLl9zcGlkZXJNYXJrZXJzLnNwbGljZSgwKTtcclxuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fbWFwcy5EZWxldGVMYXllcih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IG1hcmtlciB1c2VkIHRvIHdyYXAgdGhlIEJpbmcgUHVzaHBpbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBNYXJrZXIuIFRoZSBhYnN0cmFjdCBtYXJrZXIgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcHVzaHBpbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluKTogTWFya2VyIHtcclxuICAgICAgICBjb25zdCBtOiBNYXJrZXIgPSB0aGlzLl9tYXJrZXJMb29rdXAuZ2V0KHBpbik7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIElDbHVzdGVyT3B0aW9ucy4gVGhlIGxheWVyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE9wdGlvbnMoKTogSUNsdXN0ZXJPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IHRoaXMuX2xheWVyLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICBncmlkU2l6ZTogby5ncmlkU2l6ZSxcclxuICAgICAgICAgICAgbGF5ZXJPZmZzZXQ6IG8ubGF5ZXJPZmZzZXQsXHJcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiBvLmNsdXN0ZXJpbmdFbmFibGVkLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogby5jYWxsYmFjayxcclxuICAgICAgICAgICAgY2x1c3RlcmVkUGluQ2FsbGJhY2s6IG8uY2x1c3RlcmVkUGluQ2FsbGJhY2ssXHJcbiAgICAgICAgICAgIHZpc2libGU6IG8udmlzaWJsZSxcclxuICAgICAgICAgICAgekluZGV4OiBvLnpJbmRleFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyLmdldE9wdGlvbnMoKS52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3QgbWFya2VyIHVzZWQgdG8gd3JhcCB0aGUgQmluZyBQdXNocGluLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGFic3RyYWN0IG1hcmtlciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwdXNocGluLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRTcGlkZXJNYXJrZXJGcm9tQmluZ01hcmtlcihwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4pOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciB7XHJcbiAgICAgICAgY29uc3QgbTogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSB0aGlzLl9zcGlkZXJNYXJrZXJMb29rdXAuZ2V0KHBpbik7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyIC0gRW50aXR5IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUgJiYgZW50aXR5LkxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGo6IG51bWJlciA9IHRoaXMuX21hcmtlcnMuaW5kZXhPZihlbnRpdHkpO1xyXG4gICAgICAgICAgICBjb25zdCBrOiBudW1iZXIgPSB0aGlzLl9wZW5kaW5nTWFya2Vycy5pbmRleE9mKGVudGl0eSk7XHJcbiAgICAgICAgICAgIGlmIChqID4gLTEpIHsgdGhpcy5fbWFya2Vycy5zcGxpY2UoaiwgMSk7IH1cclxuICAgICAgICAgICAgaWYgKGsgPiAtMSkgeyB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoaywgMSk7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4gPSB0aGlzLl9sYXllci5nZXRQdXNocGlucygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaTogbnVtYmVyID0gcC5pbmRleE9mKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuc2V0UHVzaHBpbnMocCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmRlbGV0ZShlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPiBjb250YWluaW5nXHJcbiAgICAgKiB0aGUgZW50aXRpZXMgdG8gYWRkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIHJlcGxhY2VzIGFueSBleGlzdGluZyBlbnRpdGllcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPigpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5jbGVhcigpO1xyXG4gICAgICAgIGVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5OYXRpdmVQcmltaXR2ZSAmJiBlLkxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KGUuTmF0aXZlUHJpbWl0dmUsIGUpO1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuc2V0UHVzaHBpbnMocCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBJQ2x1c3Rlck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXHJcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVDbHVzdGVyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9sYXllci5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zKSB7IHRoaXMuU2V0U3BpZGVyT3B0aW9ucyhvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgPSB0aGlzLl9sYXllci5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgby52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgICAgICB0aGlzLl9sYXllci5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHRoZSBpbml0aWFsIHNldCBvZiBlbnRpdGllc1xyXG4gICAgICogaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPigpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuc2V0UHVzaHBpbnMocCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2VycyA9IHRoaXMuX21hcmtlcnMuY29uY2F0KHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKSk7XHJcbiAgICAgICAgdGhpcy5faXNDbHVzdGVyaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cclxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xyXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ2x1c3RlcmluZykgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLl9pc0NsdXN0ZXJpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIGEgcHVzaHBpbnMgYmFzaWMgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGluIFB1c2hwaW4gdG8gY29weSBvcHRpb25zIGZyb20uXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgY29weSBvZiBhIHB1c2hwaW5zIGJhc2ljIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZXRCYXNpY1B1c2hwaW5PcHRpb25zKHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbik6IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIDxNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnM+e1xyXG4gICAgICAgICAgICBhbmNob3I6IHBpbi5nZXRBbmNob3IoKSxcclxuICAgICAgICAgICAgY29sb3I6IHBpbi5nZXRDb2xvcigpLFxyXG4gICAgICAgICAgICBjdXJzb3I6IHBpbi5nZXRDdXJzb3IoKSxcclxuICAgICAgICAgICAgaWNvbjogcGluLmdldEljb24oKSxcclxuICAgICAgICAgICAgcm91bmRDbGlja2FibGVBcmVhOiBwaW4uZ2V0Um91bmRDbGlja2FibGVBcmVhKCksXHJcbiAgICAgICAgICAgIHN1YlRpdGxlOiBwaW4uZ2V0U3ViVGl0bGUoKSxcclxuICAgICAgICAgICAgdGV4dDogcGluLmdldFRleHQoKSxcclxuICAgICAgICAgICAgdGV4dE9mZnNldDogcGluLmdldFRleHRPZmZzZXQoKSxcclxuICAgICAgICAgICAgdGl0bGU6IHBpbi5nZXRUaXRsZSgpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSBzcGlkZXIgY2x1c3RlciBhbmQgcmVzb3RyZXMgdGhlIG9yaWdpbmFsIHBpbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhpZGVTcGlkZXJDbHVzdGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaWRlck1hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGlkZXJNYXJrZXJMb29rdXAuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudENsdXN0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBjbGlja3MgPSAtMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyVW5TZWxlY3RlZCkgeyB0aGlzLl9zcGlkZXJPcHRpb25zLm1hcmtlclVuU2VsZWN0ZWQoKTsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsaWNrIGV2ZW50IGhhbmRsZXIgZm9yIHdoZW4gYSBzaGFwZSBpbiB0aGUgY2x1c3RlciBsYXllciBpcyBjbGlja2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIFRoZSBtb3VzZSBldmVudCBhcmd1cm1lbnQgZnJvbSB0aGUgY2xpY2sgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBPbkxheWVyQ2xpY2soZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGUucHJpbWl0aXZlIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pIHtcclxuICAgICAgICAgICAgY29uc3QgY3A6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluPmUucHJpbWl0aXZlO1xyXG4gICAgICAgICAgICBjb25zdCBzaG93TmV3Q2x1c3RlcjogYm9vbGVhbiA9IGNwICE9PSB0aGlzLl9jdXJyZW50Q2x1c3RlcjtcclxuICAgICAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xyXG4gICAgICAgICAgICBpZiAoc2hvd05ld0NsdXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1NwaWRlckNsdXN0ZXIoPE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluPmUucHJpbWl0aXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUucHJpbWl0aXZlO1xyXG4gICAgICAgICAgICBpZiAocGluLm1ldGFkYXRhICYmIHBpbi5tZXRhZGF0YS5pc0NsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG06IEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyID0gdGhpcy5HZXRTcGlkZXJNYXJrZXJGcm9tQmluZ01hcmtlcihwaW4pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogQmluZ01hcmtlciA9IG0uUGFyZW50TWFya2VyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IHAuTmF0aXZlUHJpbWl0dmU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyU2VsZWN0ZWQocCwgbmV3IEJpbmdNYXJrZXIodGhpcy5fY3VycmVudENsdXN0ZXIsIG51bGwsIG51bGwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChNaWNyb3NvZnQuTWFwcy5FdmVudHMuaGFzSGFuZGxlcihwcGluLCAnY2xpY2snKSkgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMuaW52b2tlKHBwaW4sICdjbGljaycsIGUpOyB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBjbGlja3MgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyU2VsZWN0ZWQpIHsgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZCh0aGlzLkdldE1hcmtlckZyb21CaW5nTWFya2VyKHBpbiksIG51bGwpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmhhc0hhbmRsZXIocGluLCAnY2xpY2snKSkgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMuaW52b2tlKHBpbiwgJ2NsaWNrJywgZSk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBjbGljayBldmVudCBvbiB0aGUgbWFwIChvdXRzaWRlIGEgc3BpZGVyIGNsdXN0ZXIpLiBEZXBlbmRpbmcgb24gdGhlXHJcbiAgICAgKiBzcGlkZXIgb3B0aW9ucywgY2xvc2VzIHRoZSBjbHVzdGVyIG9yIGluY3JlbWVudHMgdGhlIGNsaWNrIGNvdW50ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgT25NYXBDbGljayhlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgfCBNaWNyb3NvZnQuTWFwcy5JTWFwVHlwZUNoYW5nZUV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXBjbGlja3MgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKCsrdGhpcy5fbWFwY2xpY2tzID49IHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLkhpZGVTcGlkZXJDbHVzdGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90aGluZyBhcyB0aGlzLl9tYXBjbGlja3MgaGFzIGFscmVhZHkgYmVlbiBpbmNyZW1lbnRlZCBhYm92ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgdmlldyBjaGFuZ2VkIGVuZCBldmVudC4gSGlkZXMgdGhlIHNwaWRlciBjbHVzdGVyIGlmIHRoZSB6b29tIGxldmVsIGhhcyBjaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBPbk1hcFZpZXdDaGFuZ2VFbmQoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzIHwgTWljcm9zb2Z0Lk1hcHMuSU1hcFR5cGVDaGFuZ2VFdmVudEFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB6OiBudW1iZXIgPSAoPE1pY3Jvc29mdC5NYXBzLk1hcD5lLnRhcmdldCkuZ2V0Wm9vbSgpO1xyXG4gICAgICAgIGNvbnN0IGhhc1pvb21DaGFuZ2VkOiBib29sZWFuID0gKHogIT09IHRoaXMuX2N1cnJlbnRab29tKTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Wm9vbSA9IHo7XHJcbiAgICAgICAgaWYgKGhhc1pvb21DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSGlkZVNwaWRlckNsdXN0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyB0aGUgbWFwIHZpZXcgY2hhbmdlIHN0YXJ0IGV2ZW50LiBEZXBlbmRpbmcgb24gdGhlIHNwaWRlciBvcHRpb25zLCBoaWRlcyB0aGVcclxuICAgICAqIHRoZSBleHBsb2RlZCBzcGlkZXIgb3IgZG9lcyBub3RoaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBPbk1hcFZpZXdDaGFuZ2VTdGFydChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgfCBNaWNyb3NvZnQuTWFwcy5JTWFwVHlwZUNoYW5nZUV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcGlkZXJPcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTWFwQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSGlkZVNwaWRlckNsdXN0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBpbnZva2VkIG9uIG1vdXNlIG91dCBvbiBhbiBleHBsb2RlZCBzcGlkZXIgbWFya2VyLiBSZXNldHMgdGhlIGhvdmVyIHN0eWxlIG9uIHRoZSBzdGljay5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZSAtIE1vdXNlIGV2ZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE9uU3BpZGVyTW91c2VPdXQoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5wcmltaXRpdmU7XHJcbiAgICAgICAgaWYgKHBpbiBpbnN0YW5jZW9mIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gJiYgcGluLm1ldGFkYXRhICYmIHBpbi5tZXRhZGF0YS5pc0NsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbTogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSB0aGlzLkdldFNwaWRlck1hcmtlckZyb21CaW5nTWFya2VyKHBpbik7XHJcbiAgICAgICAgICAgIG0uU3RpY2suc2V0T3B0aW9ucyh0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrU3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZWQgb24gbW91c2Ugb3ZlciBvbiBhbiBleHBsb2RlZCBzcGlkZXIgbWFya2VyLiBTZXRzIHRoZSBob3ZlciBzdHlsZSBvbiB0aGUgc3RpY2suIEFsc28gaW52b2tlcyB0aGUgY2xpY2sgZXZlbnRcclxuICAgICAqIG9uIHRoZSB1bmRlcmx5aW5nIG9yaWdpbmFsIG1hcmtlciBkZXBlbmRlbnQgb24gdGhlIHNwaWRlciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgT25TcGlkZXJNb3VzZU92ZXIoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5wcmltaXRpdmU7XHJcbiAgICAgICAgaWYgKHBpbiBpbnN0YW5jZW9mIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gJiYgcGluLm1ldGFkYXRhICYmIHBpbi5tZXRhZGF0YS5pc0NsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbTogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSB0aGlzLkdldFNwaWRlck1hcmtlckZyb21CaW5nTWFya2VyKHBpbik7XHJcbiAgICAgICAgICAgIG0uU3RpY2suc2V0T3B0aW9ucyh0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrSG92ZXJTdHlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zcGlkZXJPcHRpb25zLmludm9rZUNsaWNrT25Ib3Zlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogQmluZ01hcmtlciA9IG0uUGFyZW50TWFya2VyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IHAuTmF0aXZlUHJpbWl0dmU7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmhhc0hhbmRsZXIocHBpbiwgJ2NsaWNrJykpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmludm9rZShwcGluLCAnY2xpY2snLCBlKTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3Igc3BpZGVyIGJlaGF2aW9yLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElTcGlkZXJDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBzcGlkZXIgY2x1c3RlciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgU2V0U3BpZGVyT3B0aW9ucyhvcHRpb25zOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2lyY2xlU3BpcmFsU3dpdGNob3ZlciA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuY2lyY2xlU3BpcmFsU3dpdGNob3ZlciA9IG9wdGlvbnMuY2lyY2xlU3BpcmFsU3dpdGNob3ZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2UgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZSA9IG9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTnRoQ2xpY2sgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTnRoQ2xpY2sgPSBvcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTnRoQ2xpY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmludm9rZUNsaWNrT25Ib3ZlciA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLmludm9rZUNsaWNrT25Ib3ZlciA9IG9wdGlvbnMuaW52b2tlQ2xpY2tPbkhvdmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5TcGlyYWxBbmdsZVNlcGVyYXRpb24gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLm1pblNwaXJhbEFuZ2xlU2VwZXJhdGlvbiA9IG9wdGlvbnMubWluU3BpcmFsQW5nbGVTZXBlcmF0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zcGlyYWxEaXN0YW5jZUZhY3RvciA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3IgPSBvcHRpb25zLnNwaXJhbERpc3RhbmNlRmFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5DaXJjbGVMZW5ndGggPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLm1pbkNpcmNsZUxlbmd0aCA9IG9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN0aWNrSG92ZXJTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5zdGlja0hvdmVyU3R5bGUgPSBvcHRpb25zLnN0aWNrSG92ZXJTdHlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zdGlja1N0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrU3R5bGUgPSBvcHRpb25zLnN0aWNrU3R5bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWFya2VyU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyU2VsZWN0ZWQgPSBvcHRpb25zLm1hcmtlclNlbGVjdGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1hcmtlclVuU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyVW5TZWxlY3RlZCA9IG9wdGlvbnMubWFya2VyVW5TZWxlY3RlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudmlzaWJsZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLnZpc2libGUgPSBvcHRpb25zLnZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TZXRPcHRpb25zKDxJQ2x1c3Rlck9wdGlvbnM+b3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwYW5kcyBhIGNsdXN0ZXIgaW50byBpdCdzIG9wZW4gc3BpZGVyIGxheW91dC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBzaG93IGluIGl0J3Mgb3BlbiBzcGlkZXIgbGF5b3V0Li5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFNob3dTcGlkZXJDbHVzdGVyKGNsdXN0ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDbHVzdGVyID0gY2x1c3RlcjtcclxuXHJcbiAgICAgICAgaWYgKGNsdXN0ZXIgJiYgY2x1c3Rlci5jb250YWluZWRQdXNocGlucykge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgc3BpZGVyIGRhdGEuXHJcbiAgICAgICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9ICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwcykuTWFwSW5zdGFuY2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpbnM6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gY2x1c3Rlci5jb250YWluZWRQdXNocGlucztcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IGNsdXN0ZXIuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyUG9pbnQ6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID1cclxuICAgICAgICAgICAgICAgIDxNaWNyb3NvZnQuTWFwcy5Qb2ludD5tLnRyeUxvY2F0aW9uVG9QaXhlbChjZW50ZXIsIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG4gICAgICAgICAgICBsZXQgc3RpY2s6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBtYWtlU3BpcmFsOiBib29sZWFuID0gcGlucy5sZW5ndGggPiB0aGlzLl9zcGlkZXJPcHRpb25zLmNpcmNsZVNwaXJhbFN3aXRjaG92ZXI7XHJcbiAgICAgICAgICAgIGxldCBsZWdQaXhlbExlbmd0aDogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgc3RlcEFuZ2xlOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBzdGVwTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFrZVNwaXJhbCkge1xyXG4gICAgICAgICAgICAgICAgbGVnUGl4ZWxMZW5ndGggPSB0aGlzLl9zcGlkZXJPcHRpb25zLm1pbkNpcmNsZUxlbmd0aCAvIE1hdGguUEk7XHJcbiAgICAgICAgICAgICAgICBzdGVwTGVuZ3RoID0gMiAqIE1hdGguUEkgKiB0aGlzLl9zcGlkZXJPcHRpb25zLnNwaXJhbERpc3RhbmNlRmFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RlcEFuZ2xlID0gMiAqIE1hdGguUEkgLyBwaW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGxlZ1BpeGVsTGVuZ3RoID0gKHRoaXMuX3NwaWRlck9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3IgLyBzdGVwQW5nbGUgLyBNYXRoLlBJIC8gMikgKiBwaW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChsZWdQaXhlbExlbmd0aCA8IHRoaXMuX3NwaWRlck9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoKSB7IGxlZ1BpeGVsTGVuZ3RoID0gdGhpcy5fc3BpZGVyT3B0aW9ucy5taW5DaXJjbGVMZW5ndGg7IH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBpbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBzcGlkZXIgcGluIGxvY2F0aW9uLlxyXG4gICAgICAgICAgICAgICAgaWYgKCFtYWtlU3BpcmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBzdGVwQW5nbGUgKiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5nbGUgKz0gdGhpcy5fc3BpZGVyT3B0aW9ucy5taW5TcGlyYWxBbmdsZVNlcGVyYXRpb24gLyBsZWdQaXhlbExlbmd0aCArIGkgKiAwLjAwMDU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVnUGl4ZWxMZW5ndGggKz0gc3RlcExlbmd0aCAvIGFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQ6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID1cclxuICAgICAgICAgICAgICAgICAgICBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoY2VudGVyUG9pbnQueCArIGxlZ1BpeGVsTGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQb2ludC55ICsgbGVnUGl4ZWxMZW5ndGggKiBNYXRoLnNpbihhbmdsZSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgPE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPm0udHJ5UGl4ZWxUb0xvY2F0aW9uKHBvaW50LCBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgc3RpY2sgdG8gcGluLlxyXG4gICAgICAgICAgICAgICAgc3RpY2sgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUoW2NlbnRlciwgbG9jXSwgdGhpcy5fc3BpZGVyT3B0aW9ucy5zdGlja1N0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyLmFkZChzdGljayk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHBpbiBpbiBzcGlyYWwgdGhhdCBjb250YWlucyBzYW1lIG1ldGFkYXRhIGFzIHBhcmVudCBwaW4uXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MpO1xyXG4gICAgICAgICAgICAgICAgcGluLm1ldGFkYXRhID0gcGluc1tpXS5tZXRhZGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIHBpbi5tZXRhZGF0YS5pc0NsdXN0ZXJNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGluLnNldE9wdGlvbnModGhpcy5HZXRCYXNpY1B1c2hwaW5PcHRpb25zKHBpbnNbaV0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyLmFkZChwaW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaWRlck1hcmtlcjogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSBuZXcgQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIocGluLCBudWxsLCB0aGlzLl9zcGlkZXJMYXllcik7XHJcbiAgICAgICAgICAgICAgICBzcGlkZXJNYXJrZXIuU3RpY2sgPSBzdGljaztcclxuICAgICAgICAgICAgICAgIHNwaWRlck1hcmtlci5QYXJlbnRNYXJrZXIgPSA8QmluZ01hcmtlcj50aGlzLkdldE1hcmtlckZyb21CaW5nTWFya2VyKHBpbnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTWFya2Vycy5wdXNoKHNwaWRlck1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJNYXJrZXJMb29rdXAuc2V0KHBpbiwgc3BpZGVyTWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbWFwY2xpY2tzID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==