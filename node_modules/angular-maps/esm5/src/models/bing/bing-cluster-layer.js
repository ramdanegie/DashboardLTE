/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { Marker } from '../marker';
import { BingSpiderClusterMarker } from './bing-spider-cluster-marker';
import { BingMarker } from './bing-marker';
/**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
BingClusterLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof BingClusterLayer
     */
    function BingClusterLayer(_layer, _maps) {
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
    Object.defineProperty(BingClusterLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} Microsoft.Maps.ClusterLayer.
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
     * \@memberof BingClusterLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
            fn(e);
        });
    };
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
    BingClusterLayer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        var /** @type {?} */ isMarker = entity instanceof Marker;
        isMarker = entity instanceof BingMarker || isMarker;
        if (isMarker) {
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering) {
                var /** @type {?} */ p = this._layer.getPushpins();
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
    };
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.AddEntities = /**
     * Adds a number of markers to the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            var /** @type {?} */ e = entities.map(function (p) {
                _this._markerLookup.set(p.NativePrimitve, p);
                return p.NativePrimitve;
            });
            if (this._isClustering) {
                var /** @type {?} */ p = this._layer.getPushpins();
                p.push.apply(p, tslib_1.__spread(e));
                this._layer.setPushpins(p);
                (_a = this._markers).push.apply(_a, tslib_1.__spread(entities));
            }
            else {
                (_b = this._pendingMarkers).push.apply(_b, tslib_1.__spread(entities));
            }
        }
        var _a, _b;
    };
    /**
     * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
     * individual underlying pins.
     *
     * \@memberof BingClusterLayer
     * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.InitializeSpiderClusterSupport = /**
     * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
     * individual underlying pins.
     *
     * \@memberof BingClusterLayer
     * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
     *
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (this._useSpiderCluster) {
            return;
        }
        var /** @type {?} */ m = (/** @type {?} */ (this._maps)).MapInstance;
        this._useSpiderCluster = true;
        this._spiderLayer = new Microsoft.Maps.Layer();
        this._currentZoom = m.getZoom();
        this.SetSpiderOptions(options);
        m.layers.insert(this._spiderLayer);
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'click', function (e) { return _this.OnMapClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangestart', function (e) { return _this.OnMapViewChangeStart(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) { return _this.OnMapViewChangeEnd(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._layer, 'click', function (e) { return _this.OnLayerClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'click', function (e) { return _this.OnLayerClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseover', function (e) { return _this.OnSpiderMouseOver(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseout', function (e) { return _this.OnSpiderMouseOut(e); }));
    };
    /**
     * Deletes the clustering layer.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.Delete = /**
     * Deletes the clustering layer.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._useSpiderCluster) {
            this._spiderLayer.clear();
            (/** @type {?} */ (this._maps)).MapPromise.then(function (m) {
                m.layers.remove(_this._spiderLayer);
                _this._spiderLayer = null;
            });
            this._events.forEach(function (e) { return Microsoft.Maps.Events.removeHandler(e); });
            this._events.splice(0);
            this._useSpiderCluster = false;
        }
        this._markers.splice(0);
        this._spiderMarkers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        this._maps.DeleteLayer(this);
    };
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    BingClusterLayer.prototype.GetMarkerFromBingMarker = /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
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
     * \@memberof BingClusterLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    BingClusterLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        var /** @type {?} */ o = this._layer.getOptions();
        var /** @type {?} */ options = {
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
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    BingClusterLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._layer.getOptions().visible;
    };
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} - The abstract marker object representing the pushpin.
     *
     */
    BingClusterLayer.prototype.GetSpiderMarkerFromBingMarker = /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} - The abstract marker object representing the pushpin.
     *
     */
    function (pin) {
        var /** @type {?} */ m = this._spiderMarkerLookup.get(pin);
        return m;
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker - Entity to be removed from the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker - Entity to be removed from the layer.
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
                var /** @type {?} */ p = this._layer.getPushpins();
                var /** @type {?} */ i = p.indexOf(entity.NativePrimitve);
                if (i > -1) {
                    p.splice(i, 1);
                    this._layer.setPushpins(p);
                }
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        var /** @type {?} */ p = new Array();
        this._markers.splice(0);
        this._markerLookup.clear();
        entities.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                _this._markers.push(e);
                _this._markerLookup.set(e.NativePrimitve, e);
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._layer.setPushpins(p);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = BingConversions.TranslateClusterOptions(options);
        this._layer.setOptions(o);
        if (options.spiderClusterOptions) {
            this.SetSpiderOptions(options.spiderClusterOptions);
        }
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        var /** @type {?} */ o = this._layer.getOptions();
        o.visible = visible;
        this._layer.setOptions(o);
    };
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.StartClustering = /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        if (this._isClustering) {
            return;
        }
        var /** @type {?} */ p = new Array();
        this._markers.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._pendingMarkers.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._layer.setPushpins(p);
        this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        this._isClustering = true;
    };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.StopClustering = /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    };
    /**
     * Creates a copy of a pushpins basic options.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin Pushpin to copy options from.
     * @return {?} - A copy of a pushpins basic options.
     *
     */
    BingClusterLayer.prototype.GetBasicPushpinOptions = /**
     * Creates a copy of a pushpins basic options.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin Pushpin to copy options from.
     * @return {?} - A copy of a pushpins basic options.
     *
     */
    function (pin) {
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
    };
    /**
     * Hides the spider cluster and resotres the original pin.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.HideSpiderCluster = /**
     * Hides the spider cluster and resotres the original pin.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
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
    };
    /**
     * Click event handler for when a shape in the cluster layer is clicked.
     *
     * \@memberof BingClusterLayer
     * @param {?} e The mouse event argurment from the click event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnLayerClick = /**
     * Click event handler for when a shape in the cluster layer is clicked.
     *
     * \@memberof BingClusterLayer
     * @param {?} e The mouse event argurment from the click event.
     *
     * @return {?}
     */
    function (e) {
        if (e.primitive instanceof Microsoft.Maps.ClusterPushpin) {
            var /** @type {?} */ cp = /** @type {?} */ (e.primitive);
            var /** @type {?} */ showNewCluster = cp !== this._currentCluster;
            this.HideSpiderCluster();
            if (showNewCluster) {
                this.ShowSpiderCluster(/** @type {?} */ (e.primitive));
            }
        }
        else {
            var /** @type {?} */ pin = /** @type {?} */ (e.primitive);
            if (pin.metadata && pin.metadata.isClusterMarker) {
                var /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
                var /** @type {?} */ p = m.ParentMarker;
                var /** @type {?} */ ppin = p.NativePrimitve;
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
    };
    /**
     * Delegate handling the click event on the map (outside a spider cluster). Depending on the
     * spider options, closes the cluster or increments the click counter.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapClick = /**
     * Delegate handling the click event on the map (outside a spider cluster). Depending on the
     * spider options, closes the cluster or increments the click counter.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event
     *
     * @return {?}
     */
    function (e) {
        if (this._mapclicks === -1) {
            return;
        }
        else if (++this._mapclicks >= this._spiderOptions.collapseClusterOnNthClick) {
            this.HideSpiderCluster();
        }
        else {
            // do nothing as this._mapclicks has already been incremented above
        }
    };
    /**
     * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapViewChangeEnd = /**
     * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ z = (/** @type {?} */ (e.target)).getZoom();
        var /** @type {?} */ hasZoomChanged = (z !== this._currentZoom);
        this._currentZoom = z;
        if (hasZoomChanged) {
            this.HideSpiderCluster();
        }
    };
    /**
     * Delegate handling the map view change start event. Depending on the spider options, hides the
     * the exploded spider or does nothing.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapViewChangeStart = /**
     * Delegate handling the map view change start event. Depending on the spider options, hides the
     * the exploded spider or does nothing.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    function (e) {
        if (this._spiderOptions.collapseClusterOnMapChange) {
            this.HideSpiderCluster();
        }
    };
    /**
     * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    BingClusterLayer.prototype.OnSpiderMouseOut = /**
     * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            var /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickStyle);
        }
    };
    /**
     * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
     * on the underlying original marker dependent on the spider options.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    BingClusterLayer.prototype.OnSpiderMouseOver = /**
     * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
     * on the underlying original marker dependent on the spider options.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            var /** @type {?} */ m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickHoverStyle);
            if (this._spiderOptions.invokeClickOnHover) {
                var /** @type {?} */ p = m.ParentMarker;
                var /** @type {?} */ ppin = p.NativePrimitve;
                if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                    Microsoft.Maps.Events.invoke(ppin, 'click', e);
                }
            }
        }
    };
    /**
     * Sets the options for spider behavior.
     *
     * \@memberof BingClusterLayer
     * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetSpiderOptions = /**
     * Sets the options for spider behavior.
     *
     * \@memberof BingClusterLayer
     * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
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
    };
    /**
     * Expands a cluster into it's open spider layout.
     *
     * \@memberof BingClusterLayer
     * @param {?} cluster The cluster to show in it's open spider layout..
     *
     * @return {?}
     */
    BingClusterLayer.prototype.ShowSpiderCluster = /**
     * Expands a cluster into it's open spider layout.
     *
     * \@memberof BingClusterLayer
     * @param {?} cluster The cluster to show in it's open spider layout..
     *
     * @return {?}
     */
    function (cluster) {
        this.HideSpiderCluster();
        this._currentCluster = cluster;
        if (cluster && cluster.containedPushpins) {
            // Create spider data.
            var /** @type {?} */ m = (/** @type {?} */ (this._maps)).MapInstance;
            var /** @type {?} */ pins = cluster.containedPushpins;
            var /** @type {?} */ center = cluster.getLocation();
            var /** @type {?} */ centerPoint = /** @type {?} */ (m.tryLocationToPixel(center, Microsoft.Maps.PixelReference.control));
            var /** @type {?} */ stick = void 0;
            var /** @type {?} */ angle = 0;
            var /** @type {?} */ makeSpiral = pins.length > this._spiderOptions.circleSpiralSwitchover;
            var /** @type {?} */ legPixelLength = void 0;
            var /** @type {?} */ stepAngle = void 0;
            var /** @type {?} */ stepLength = void 0;
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
            for (var /** @type {?} */ i = 0, /** @type {?} */ len = pins.length; i < len; i++) {
                // Calculate spider pin location.
                if (!makeSpiral) {
                    angle = stepAngle * i;
                }
                else {
                    angle += this._spiderOptions.minSpiralAngleSeperation / legPixelLength + i * 0.0005;
                    legPixelLength += stepLength / angle;
                }
                var /** @type {?} */ point = new Microsoft.Maps.Point(centerPoint.x + legPixelLength * Math.cos(angle), centerPoint.y + legPixelLength * Math.sin(angle));
                var /** @type {?} */ loc = /** @type {?} */ (m.tryPixelToLocation(point, Microsoft.Maps.PixelReference.control));
                // Create stick to pin.
                stick = new Microsoft.Maps.Polyline([center, loc], this._spiderOptions.stickStyle);
                this._spiderLayer.add(stick);
                // Create pin in spiral that contains same metadata as parent pin.
                var /** @type {?} */ pin = new Microsoft.Maps.Pushpin(loc);
                pin.metadata = pins[i].metadata || {};
                pin.metadata.isClusterMarker = true;
                pin.setOptions(this.GetBasicPushpinOptions(pins[i]));
                this._spiderLayer.add(pin);
                var /** @type {?} */ spiderMarker = new BingSpiderClusterMarker(pin, null, this._spiderLayer);
                spiderMarker.Stick = stick;
                spiderMarker.ParentMarker = /** @type {?} */ (this.GetMarkerFromBingMarker(pins[i]));
                this._spiderMarkers.push(spiderMarker);
                this._spiderMarkerLookup.set(pin, spiderMarker);
            }
            this._mapclicks = 0;
        }
    };
    return BingClusterLayer;
}());
/**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
export { BingClusterLayer };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUl2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU8zQzs7Ozs7QUFBQTtJQWtESSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsMEJBQW9CLE1BQW1DLEVBQVUsS0FBaUI7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBNkI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZOzZCQXpEMUQsSUFBSTt3QkFDTSxJQUFJLEtBQUssRUFBVTs2QkFDUSxJQUFJLEdBQUcsRUFBa0M7K0JBQzdELElBQUksS0FBSyxFQUFVOzhCQUNILElBQUksS0FBSyxFQUEyQjttQ0FFNUUsSUFBSSxHQUFHLEVBQW1EO2lDQUMvQyxLQUFLOzBCQUNaLENBQUM7dUJBRThCLElBQUksS0FBSyxFQUE2Qjs0QkFDbkUsQ0FBQzs4QkFDd0I7WUFDNUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN6QiwwQkFBMEIsRUFBRSxLQUFLO1lBQ2pDLHlCQUF5QixFQUFFLENBQUM7WUFDNUIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixlQUFlLEVBQUUsRUFBRTtZQUNuQix3QkFBd0IsRUFBRSxFQUFFO1lBQzVCLG9CQUFvQixFQUFFLENBQUM7WUFDdkIsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixlQUFlLEVBQUUsQ0FBQzthQUNyQjtZQUNELGVBQWUsRUFB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Q0FBQyxDQUFDO2FBRW5EO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDdkI7OzJCQXBwQlQ7SUF1cEJDLENBQUE7Ozs7OztBQXZvQkQsNEJBdW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciB9IGZyb20gJy4vYmluZy1zcGlkZXItY2x1c3Rlci1tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi9iaW5nLW1hcmtlcic7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyaW5nIGxheWVyIGZvciB0aGUgQmluZyBNYXAgUHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nQ2x1c3RlckxheWVyIGltcGxlbWVudHMgTGF5ZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pc0NsdXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XHJcbiAgICBwcml2YXRlIF9tYXJrZXJMb29rdXA6IE1hcDxNaWNyb3NvZnQuTWFwcy5QdXNocGluLCBNYXJrZXI+ID0gbmV3IE1hcDxNaWNyb3NvZnQuTWFwcy5QdXNocGluLCBNYXJrZXI+KCk7XHJcbiAgICBwcml2YXRlIF9wZW5kaW5nTWFya2VyczogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJNYXJrZXJzOiBBcnJheTxCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlcj4gPSBuZXcgQXJyYXk8QmluZ1NwaWRlckNsdXN0ZXJNYXJrZXI+KCk7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJNYXJrZXJMb29rdXA6IE1hcDxNaWNyb3NvZnQuTWFwcy5QdXNocGluLCBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlcj4gPVxyXG4gICAgICAgICAgICAgICAgICAgICBuZXcgTWFwPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyPigpO1xyXG4gICAgcHJpdmF0ZSBfdXNlU3BpZGVyQ2x1c3RlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWFwY2xpY2tzID0gMDtcclxuICAgIHByaXZhdGUgX3NwaWRlckxheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcjtcclxuICAgIHByaXZhdGUgX2V2ZW50czogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZD4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZD4oKTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRab29tID0gMDtcclxuICAgIHByaXZhdGUgX3NwaWRlck9wdGlvbnM6IElTcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHtcclxuICAgICAgICBjaXJjbGVTcGlyYWxTd2l0Y2hvdmVyOiA5LFxyXG4gICAgICAgIGNvbGxhcHNlQ2x1c3Rlck9uTWFwQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICBjb2xsYXBzZUNsdXN0ZXJPbk50aENsaWNrOiAxLFxyXG4gICAgICAgIGludm9rZUNsaWNrT25Ib3ZlcjogdHJ1ZSxcclxuICAgICAgICBtaW5DaXJjbGVMZW5ndGg6IDYwLFxyXG4gICAgICAgIG1pblNwaXJhbEFuZ2xlU2VwZXJhdGlvbjogMjUsXHJcbiAgICAgICAgc3BpcmFsRGlzdGFuY2VGYWN0b3I6IDUsXHJcbiAgICAgICAgc3RpY2tTdHlsZToge1xyXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiAyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGlja0hvdmVyU3R5bGU6IHsgc3Ryb2tlQ29sb3I6ICdyZWQnIH0sXHJcbiAgICAgICAgbWFya2VyU2VsZWN0ZWQ6IG51bGwsXHJcbiAgICAgICAgbWFya2VyVW5TZWxlY3RlZDogbnVsbFxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRDbHVzdGVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbiA9IG51bGw7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEJpbmdDbHVzdGVyTGF5ZXIgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllciBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIuIE5hdGl2ZSBCaW5nIENsdXN0ZXIgTGF5ZXIgc3VwcG9ydGluZyB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqIEBwYXJhbSBfbWFwcyBNYXBTZXJ2aWNlLiBNYXBTZXJ2aWNlIGltcGxlbWVudGF0aW9uIHRvIGxldmVyYWdlIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllciwgcHJpdmF0ZSBfbWFwczogTWFwU2VydmljZSkgeyB9XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXHJcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX2xheWVyLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uIGFzIGl0IHdpbGxcclxuICAgICAqIHRyaWdnZXIgYSByZWNhbHVhdGlvbiBvZiB0aGUgY2x1c3RlcnMgKGFuZCBhc3NvY2lhdGVkIG1hcmtlcnMgaWYgYXBwcm9wcml0ZSkgZm9yXHJcbiAgICAgKiBlYWNoIGludm9jYXRpb24uIElmIHlvdSB1c2UgdGhpcyBtZXRob2QgdG8gYWRkIG1hbnkgbWFya2VycyB0byB0aGUgY2x1c3RlciwgdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRFbnRpdHkoZW50aXR5OiBNYXJrZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXNNYXJrZXI6IGJvb2xlYW4gPSBlbnRpdHkgaW5zdGFuY2VvZiBNYXJrZXI7XHJcbiAgICAgICAgaXNNYXJrZXIgPSBlbnRpdHkgaW5zdGFuY2VvZiBCaW5nTWFya2VyIHx8IGlzTWFya2VyO1xyXG4gICAgICAgIGlmIChpc01hcmtlcikge1xyXG4gICAgICAgICAgICBpZiAoZW50aXR5LklzRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvcENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IHRoaXMuX2xheWVyLmdldFB1c2hwaW5zKCk7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnNldFB1c2hwaW5zKHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChlbnRpdHkuTmF0aXZlUHJpbWl0dmUsIGVudGl0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc01hcmtlcikge1xyXG4gICAgICAgICAgICBpZiAoZW50aXR5LklzTGFzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydENsdXN0ZXJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBudW1iZXIgb2YgbWFya2VycyB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj4uIEVudGl0aWVzIHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xyXG4gICAgICAgICAgICBjb25zdCBlOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IGVudGl0aWVzLm1hcChwID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQocC5OYXRpdmVQcmltaXR2ZSwgcCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5OYXRpdmVQcmltaXR2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gdGhpcy5fbGF5ZXIuZ2V0UHVzaHBpbnMoKTtcclxuICAgICAgICAgICAgICAgIHAucHVzaCguLi5lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnNldFB1c2hwaW5zKHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goLi4uZW50aXRpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgc3BpZGVyIGJlaGF2aW9yIGZvciB0aGUgY2x1c2VyaW5nIGxheWVyICh3aGVuIGEgY2x1c3RlciBtYWtlciBpcyBjbGlja2VkLCBpdCBleHBsb2RlcyBpbnRvIGEgc3BpZGVyIG9mIHRoZVxyXG4gICAgICogaW5kaXZpZHVhbCB1bmRlcmx5aW5nIHBpbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSVNwaWRlckNsdXN0ZXJPcHRpb25zLiBPcHRpb25hbC4gT3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBzcGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEluaXRpYWxpemVTcGlkZXJDbHVzdGVyU3VwcG9ydChvcHRpb25zPzogSVNwaWRlckNsdXN0ZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZVNwaWRlckNsdXN0ZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBzKS5NYXBJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLl91c2VTcGlkZXJDbHVzdGVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zcGlkZXJMYXllciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5MYXllcigpO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRab29tID0gbS5nZXRab29tKCk7XHJcbiAgICAgICAgdGhpcy5TZXRTcGlkZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIG0ubGF5ZXJzLmluc2VydCh0aGlzLl9zcGlkZXJMYXllcik7XHJcblxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBBZGQgc3BpZGVyIHJlbGF0ZWQgZXZlbnRzLi4uLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICdjbGljaycsIGUgPT4gdGhpcy5Pbk1hcENsaWNrKGUpKSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgJ3ZpZXdjaGFuZ2VzdGFydCcsIGUgPT4gdGhpcy5Pbk1hcFZpZXdDaGFuZ2VTdGFydChlKSkpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICd2aWV3Y2hhbmdlZW5kJywgZSA9PiB0aGlzLk9uTWFwVmlld0NoYW5nZUVuZChlKSkpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX2xheWVyLCAnY2xpY2snLCBlID0+IHRoaXMuT25MYXllckNsaWNrKGUpKSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fc3BpZGVyTGF5ZXIsICdjbGljaycsIGUgPT4gdGhpcy5PbkxheWVyQ2xpY2soZSkpKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9zcGlkZXJMYXllciwgJ21vdXNlb3ZlcicsIGUgPT4gdGhpcy5PblNwaWRlck1vdXNlT3ZlcihlKSkpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3NwaWRlckxheWVyLCAnbW91c2VvdXQnLCBlID0+IHRoaXMuT25TcGlkZXJNb3VzZU91dChlKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgY2x1c3RlcmluZyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VTcGlkZXJDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwcykuTWFwUHJvbWlzZS50aGVuKG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbS5sYXllcnMucmVtb3ZlKHRoaXMuX3NwaWRlckxheWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKGUgPT4gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICB0aGlzLl91c2VTcGlkZXJDbHVzdGVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX3NwaWRlck1hcmtlcnMuc3BsaWNlKDApO1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKTtcclxuICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl9tYXBzLkRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3QgbWFya2VyIHVzZWQgdG8gd3JhcCB0aGUgQmluZyBQdXNocGluLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIE1hcmtlci4gVGhlIGFic3RyYWN0IG1hcmtlciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwdXNocGluLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRNYXJrZXJGcm9tQmluZ01hcmtlcihwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4pOiBNYXJrZXIge1xyXG4gICAgICAgIGNvbnN0IG06IE1hcmtlciA9IHRoaXMuX21hcmtlckxvb2t1cC5nZXQocGluKTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgSUNsdXN0ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0T3B0aW9ucygpOiBJQ2x1c3Rlck9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zID0gdGhpcy5fbGF5ZXIuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiBvLmdyaWRTaXplLFxyXG4gICAgICAgICAgICBsYXllck9mZnNldDogby5sYXllck9mZnNldCxcclxuICAgICAgICAgICAgY2x1c3RlcmluZ0VuYWJsZWQ6IG8uY2x1c3RlcmluZ0VuYWJsZWQsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBvLmNhbGxiYWNrLFxyXG4gICAgICAgICAgICBjbHVzdGVyZWRQaW5DYWxsYmFjazogby5jbHVzdGVyZWRQaW5DYWxsYmFjayxcclxuICAgICAgICAgICAgdmlzaWJsZTogby52aXNpYmxlLFxyXG4gICAgICAgICAgICB6SW5kZXg6IG8uekluZGV4XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIEJvb2xlYW4uIFRydWUgaXMgdGhlIGxheWVyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXIuZ2V0T3B0aW9ucygpLnZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhYnN0cmFjdCBtYXJrZXIgdXNlZCB0byB3cmFwIHRoZSBCaW5nIFB1c2hwaW4uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgYWJzdHJhY3QgbWFya2VyIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHB1c2hwaW4uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFNwaWRlck1hcmtlckZyb21CaW5nTWFya2VyKHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbik6IEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyIHtcclxuICAgICAgICBjb25zdCBtOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IHRoaXMuX3NwaWRlck1hcmtlckxvb2t1cC5nZXQocGluKTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIgLSBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSAmJiBlbnRpdHkuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fbWFya2Vycy5pbmRleE9mKGVudGl0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGs6IG51bWJlciA9IHRoaXMuX3BlbmRpbmdNYXJrZXJzLmluZGV4T2YoZW50aXR5KTtcclxuICAgICAgICAgICAgaWYgKGogPiAtMSkgeyB0aGlzLl9tYXJrZXJzLnNwbGljZShqLCAxKTsgfVxyXG4gICAgICAgICAgICBpZiAoayA+IC0xKSB7IHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZShrLCAxKTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IHRoaXMuX2xheWVyLmdldFB1c2hwaW5zKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpOiBudW1iZXIgPSBwLmluZGV4T2YoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuZGVsZXRlKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZW50aXRpZXMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+IGNvbnRhaW5pbmdcclxuICAgICAqIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+KCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmNsZWFyKCk7XHJcbiAgICAgICAgZW50aXRpZXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZS5OYXRpdmVQcmltaXR2ZSwgZSk7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUNsdXN0ZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc3BpZGVyQ2x1c3Rlck9wdGlvbnMpIHsgdGhpcy5TZXRTcGlkZXJPcHRpb25zKG9wdGlvbnMuc3BpZGVyQ2x1c3Rlck9wdGlvbnMpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGVzIHRoZSBjbHVzdGVyIGxheWVyIHZpc2liaWxpdHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgQm9vbGVhbiB0cnVlIHRvIG1ha2UgdGhlIGxheWVyIHZpc2libGUsIGZhbHNlIHRvIGhpZGUgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IHRoaXMuX2xheWVyLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBvLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0IG9mIGVudGl0aWVzXHJcbiAgICAgKiBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXHJcbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcclxuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RhcnRDbHVzdGVyaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+KCk7XHJcbiAgICAgICAgdGhpcy5fbWFya2Vycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5OYXRpdmVQcmltaXR2ZSAmJiBlLkxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5OYXRpdmVQcmltaXR2ZSAmJiBlLkxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcclxuICAgICAgICB0aGlzLl9tYXJrZXJzID0gdGhpcy5fbWFya2Vycy5jb25jYXQodGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKDApKTtcclxuICAgICAgICB0aGlzLl9pc0NsdXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0b3BDbHVzdGVyaW5nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDbHVzdGVyaW5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgYSBwdXNocGlucyBiYXNpYyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwaW4gUHVzaHBpbiB0byBjb3B5IG9wdGlvbnMgZnJvbS5cclxuICAgICAqIEByZXR1cm5zIC0gQSBjb3B5IG9mIGEgcHVzaHBpbnMgYmFzaWMgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEdldEJhc2ljUHVzaHBpbk9wdGlvbnMocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluKTogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIHtcclxuICAgICAgICByZXR1cm4gPE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucz57XHJcbiAgICAgICAgICAgIGFuY2hvcjogcGluLmdldEFuY2hvcigpLFxyXG4gICAgICAgICAgICBjb2xvcjogcGluLmdldENvbG9yKCksXHJcbiAgICAgICAgICAgIGN1cnNvcjogcGluLmdldEN1cnNvcigpLFxyXG4gICAgICAgICAgICBpY29uOiBwaW4uZ2V0SWNvbigpLFxyXG4gICAgICAgICAgICByb3VuZENsaWNrYWJsZUFyZWE6IHBpbi5nZXRSb3VuZENsaWNrYWJsZUFyZWEoKSxcclxuICAgICAgICAgICAgc3ViVGl0bGU6IHBpbi5nZXRTdWJUaXRsZSgpLFxyXG4gICAgICAgICAgICB0ZXh0OiBwaW4uZ2V0VGV4dCgpLFxyXG4gICAgICAgICAgICB0ZXh0T2Zmc2V0OiBwaW4uZ2V0VGV4dE9mZnNldCgpLFxyXG4gICAgICAgICAgICB0aXRsZTogcGluLmdldFRpdGxlKClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgdGhlIHNwaWRlciBjbHVzdGVyIGFuZCByZXNvdHJlcyB0aGUgb3JpZ2luYWwgcGluLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGlkZVNwaWRlckNsdXN0ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwY2xpY2tzID0gMDtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudENsdXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3BpZGVyTWFya2Vycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaWRlck1hcmtlckxvb2t1cC5jbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50Q2x1c3RlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IC0xO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkKSB7IHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyVW5TZWxlY3RlZCgpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xpY2sgZXZlbnQgaGFuZGxlciBmb3Igd2hlbiBhIHNoYXBlIGluIHRoZSBjbHVzdGVyIGxheWVyIGlzIGNsaWNrZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgVGhlIG1vdXNlIGV2ZW50IGFyZ3VybWVudCBmcm9tIHRoZSBjbGljayBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE9uTGF5ZXJDbGljayhlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZS5wcmltaXRpdmUgaW5zdGFuY2VvZiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbikge1xyXG4gICAgICAgICAgICBjb25zdCBjcDogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4gPSA8TWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4+ZS5wcmltaXRpdmU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dOZXdDbHVzdGVyOiBib29sZWFuID0gY3AgIT09IHRoaXMuX2N1cnJlbnRDbHVzdGVyO1xyXG4gICAgICAgICAgICB0aGlzLkhpZGVTcGlkZXJDbHVzdGVyKCk7XHJcbiAgICAgICAgICAgIGlmIChzaG93TmV3Q2x1c3Rlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93U3BpZGVyQ2x1c3Rlcig8TWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4+ZS5wcmltaXRpdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5wcmltaXRpdmU7XHJcbiAgICAgICAgICAgIGlmIChwaW4ubWV0YWRhdGEgJiYgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbTogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSB0aGlzLkdldFNwaWRlck1hcmtlckZyb21CaW5nTWFya2VyKHBpbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBCaW5nTWFya2VyID0gbS5QYXJlbnRNYXJrZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gcC5OYXRpdmVQcmltaXR2ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGlkZXJPcHRpb25zLm1hcmtlclNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZChwLCBuZXcgQmluZ01hcmtlcih0aGlzLl9jdXJyZW50Q2x1c3RlciwgbnVsbCwgbnVsbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5oYXNIYW5kbGVyKHBwaW4sICdjbGljaycpKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UocHBpbiwgJ2NsaWNrJywgZSk7IH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZCkgeyB0aGlzLl9zcGlkZXJPcHRpb25zLm1hcmtlclNlbGVjdGVkKHRoaXMuR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocGluKSwgbnVsbCk7IH1cclxuICAgICAgICAgICAgICAgIGlmIChNaWNyb3NvZnQuTWFwcy5FdmVudHMuaGFzSGFuZGxlcihwaW4sICdjbGljaycpKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UocGluLCAnY2xpY2snLCBlKTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBtYXAgKG91dHNpZGUgYSBzcGlkZXIgY2x1c3RlcikuIERlcGVuZGluZyBvbiB0aGVcclxuICAgICAqIHNwaWRlciBvcHRpb25zLCBjbG9zZXMgdGhlIGNsdXN0ZXIgb3IgaW5jcmVtZW50cyB0aGUgY2xpY2sgY291bnRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZSAtIE1vdXNlIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBPbk1hcENsaWNrKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyB8IE1pY3Jvc29mdC5NYXBzLklNYXBUeXBlQ2hhbmdlRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcGNsaWNrcyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKyt0aGlzLl9tYXBjbGlja3MgPj0gdGhpcy5fc3BpZGVyT3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk50aENsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSGlkZVNwaWRlckNsdXN0ZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nIGFzIHRoaXMuX21hcGNsaWNrcyBoYXMgYWxyZWFkeSBiZWVuIGluY3JlbWVudGVkIGFib3ZlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIG1hcCB2aWV3IGNoYW5nZWQgZW5kIGV2ZW50LiBIaWRlcyB0aGUgc3BpZGVyIGNsdXN0ZXIgaWYgdGhlIHpvb20gbGV2ZWwgaGFzIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE9uTWFwVmlld0NoYW5nZUVuZChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgfCBNaWNyb3NvZnQuTWFwcy5JTWFwVHlwZUNoYW5nZUV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHo6IG51bWJlciA9ICg8TWljcm9zb2Z0Lk1hcHMuTWFwPmUudGFyZ2V0KS5nZXRab29tKCk7XHJcbiAgICAgICAgY29uc3QgaGFzWm9vbUNoYW5nZWQ6IGJvb2xlYW4gPSAoeiAhPT0gdGhpcy5fY3VycmVudFpvb20pO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRab29tID0gejtcclxuICAgICAgICBpZiAoaGFzWm9vbUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgdmlldyBjaGFuZ2Ugc3RhcnQgZXZlbnQuIERlcGVuZGluZyBvbiB0aGUgc3BpZGVyIG9wdGlvbnMsIGhpZGVzIHRoZVxyXG4gICAgICogdGhlIGV4cGxvZGVkIHNwaWRlciBvciBkb2VzIG5vdGhpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE9uTWFwVmlld0NoYW5nZVN0YXJ0KGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyB8IE1pY3Jvc29mdC5NYXBzLklNYXBUeXBlQ2hhbmdlRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGludm9rZWQgb24gbW91c2Ugb3V0IG9uIGFuIGV4cGxvZGVkIHNwaWRlciBtYXJrZXIuIFJlc2V0cyB0aGUgaG92ZXIgc3R5bGUgb24gdGhlIHN0aWNrLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgT25TcGlkZXJNb3VzZU91dChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSA8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj5lLnByaW1pdGl2ZTtcclxuICAgICAgICBpZiAocGluIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiAmJiBwaW4ubWV0YWRhdGEgJiYgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICBjb25zdCBtOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IHRoaXMuR2V0U3BpZGVyTWFya2VyRnJvbUJpbmdNYXJrZXIocGluKTtcclxuICAgICAgICAgICAgbS5TdGljay5zZXRPcHRpb25zKHRoaXMuX3NwaWRlck9wdGlvbnMuc3RpY2tTdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlZCBvbiBtb3VzZSBvdmVyIG9uIGFuIGV4cGxvZGVkIHNwaWRlciBtYXJrZXIuIFNldHMgdGhlIGhvdmVyIHN0eWxlIG9uIHRoZSBzdGljay4gQWxzbyBpbnZva2VzIHRoZSBjbGljayBldmVudFxyXG4gICAgICogb24gdGhlIHVuZGVybHlpbmcgb3JpZ2luYWwgbWFya2VyIGRlcGVuZGVudCBvbiB0aGUgc3BpZGVyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBldmVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBPblNwaWRlck1vdXNlT3ZlcihlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSA8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj5lLnByaW1pdGl2ZTtcclxuICAgICAgICBpZiAocGluIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiAmJiBwaW4ubWV0YWRhdGEgJiYgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICBjb25zdCBtOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IHRoaXMuR2V0U3BpZGVyTWFya2VyRnJvbUJpbmdNYXJrZXIocGluKTtcclxuICAgICAgICAgICAgbS5TdGljay5zZXRPcHRpb25zKHRoaXMuX3NwaWRlck9wdGlvbnMuc3RpY2tIb3ZlclN0eWxlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMuaW52b2tlQ2xpY2tPbkhvdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBCaW5nTWFya2VyID0gbS5QYXJlbnRNYXJrZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gcC5OYXRpdmVQcmltaXR2ZTtcclxuICAgICAgICAgICAgICAgIGlmIChNaWNyb3NvZnQuTWFwcy5FdmVudHMuaGFzSGFuZGxlcihwcGluLCAnY2xpY2snKSkgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMuaW52b2tlKHBwaW4sICdjbGljaycsIGUpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciBzcGlkZXIgYmVoYXZpb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSVNwaWRlckNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIHNwaWRlciBjbHVzdGVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xyXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBTZXRTcGlkZXJPcHRpb25zKG9wdGlvbnM6IElTcGlkZXJDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyID0gb3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTWFwQ2hhbmdlID0gb3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljayA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljayA9IG9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuaW52b2tlQ2xpY2tPbkhvdmVyID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuaW52b2tlQ2xpY2tPbkhvdmVyID0gb3B0aW9ucy5pbnZva2VDbGlja09uSG92ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1pblNwaXJhbEFuZ2xlU2VwZXJhdGlvbiA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWluU3BpcmFsQW5nbGVTZXBlcmF0aW9uID0gb3B0aW9ucy5taW5TcGlyYWxBbmdsZVNlcGVyYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNwaXJhbERpc3RhbmNlRmFjdG9yID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5zcGlyYWxEaXN0YW5jZUZhY3RvciA9IG9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1pbkNpcmNsZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoID0gb3B0aW9ucy5taW5DaXJjbGVMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3RpY2tIb3ZlclN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrSG92ZXJTdHlsZSA9IG9wdGlvbnMuc3RpY2tIb3ZlclN0eWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN0aWNrU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuc3RpY2tTdHlsZSA9IG9wdGlvbnMuc3RpY2tTdHlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tYXJrZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZCA9IG9wdGlvbnMubWFya2VyU2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWFya2VyVW5TZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkID0gb3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy52aXNpYmxlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMudmlzaWJsZSA9IG9wdGlvbnMudmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlNldE9wdGlvbnMoPElDbHVzdGVyT3B0aW9ucz5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBhbmRzIGEgY2x1c3RlciBpbnRvIGl0J3Mgb3BlbiBzcGlkZXIgbGF5b3V0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjbHVzdGVyIFRoZSBjbHVzdGVyIHRvIHNob3cgaW4gaXQncyBvcGVuIHNwaWRlciBsYXlvdXQuLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgU2hvd1NwaWRlckNsdXN0ZXIoY2x1c3RlcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkhpZGVTcGlkZXJDbHVzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENsdXN0ZXIgPSBjbHVzdGVyO1xyXG5cclxuICAgICAgICBpZiAoY2x1c3RlciAmJiBjbHVzdGVyLmNvbnRhaW5lZFB1c2hwaW5zKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBzcGlkZXIgZGF0YS5cclxuICAgICAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBzKS5NYXBJbnN0YW5jZTtcclxuICAgICAgICAgICAgY29uc3QgcGluczogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4gPSBjbHVzdGVyLmNvbnRhaW5lZFB1c2hwaW5zO1xyXG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gY2x1c3Rlci5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBjZW50ZXJQb2ludDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPVxyXG4gICAgICAgICAgICAgICAgPE1pY3Jvc29mdC5NYXBzLlBvaW50Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKGNlbnRlciwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgICAgIGxldCBzdGljazogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmU7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ha2VTcGlyYWw6IGJvb2xlYW4gPSBwaW5zLmxlbmd0aCA+IHRoaXMuX3NwaWRlck9wdGlvbnMuY2lyY2xlU3BpcmFsU3dpdGNob3ZlcjtcclxuICAgICAgICAgICAgbGV0IGxlZ1BpeGVsTGVuZ3RoOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBzdGVwQW5nbGU6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IHN0ZXBMZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWtlU3BpcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBsZWdQaXhlbExlbmd0aCA9IHRoaXMuX3NwaWRlck9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoIC8gTWF0aC5QSTtcclxuICAgICAgICAgICAgICAgIHN0ZXBMZW5ndGggPSAyICogTWF0aC5QSSAqIHRoaXMuX3NwaWRlck9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGVwQW5nbGUgPSAyICogTWF0aC5QSSAvIHBpbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbGVnUGl4ZWxMZW5ndGggPSAodGhpcy5fc3BpZGVyT3B0aW9ucy5zcGlyYWxEaXN0YW5jZUZhY3RvciAvIHN0ZXBBbmdsZSAvIE1hdGguUEkgLyAyKSAqIHBpbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZ1BpeGVsTGVuZ3RoIDwgdGhpcy5fc3BpZGVyT3B0aW9ucy5taW5DaXJjbGVMZW5ndGgpIHsgbGVnUGl4ZWxMZW5ndGggPSB0aGlzLl9zcGlkZXJPcHRpb25zLm1pbkNpcmNsZUxlbmd0aDsgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcGlucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNwaWRlciBwaW4gbG9jYXRpb24uXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1ha2VTcGlyYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IHN0ZXBBbmdsZSAqIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmdsZSArPSB0aGlzLl9zcGlkZXJPcHRpb25zLm1pblNwaXJhbEFuZ2xlU2VwZXJhdGlvbiAvIGxlZ1BpeGVsTGVuZ3RoICsgaSAqIDAuMDAwNTtcclxuICAgICAgICAgICAgICAgICAgICBsZWdQaXhlbExlbmd0aCArPSBzdGVwTGVuZ3RoIC8gYW5nbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChjZW50ZXJQb2ludC54ICsgbGVnUGl4ZWxMZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBvaW50LnkgKyBsZWdQaXhlbExlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICA8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+bS50cnlQaXhlbFRvTG9jYXRpb24ocG9pbnQsIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBzdGljayB0byBwaW4uXHJcbiAgICAgICAgICAgICAgICBzdGljayA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShbY2VudGVyLCBsb2NdLCB0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIuYWRkKHN0aWNrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgcGluIGluIHNwaXJhbCB0aGF0IGNvbnRhaW5zIHNhbWUgbWV0YWRhdGEgYXMgcGFyZW50IHBpbi5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYyk7XHJcbiAgICAgICAgICAgICAgICBwaW4ubWV0YWRhdGEgPSBwaW5zW2ldLm1ldGFkYXRhIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwaW4uc2V0T3B0aW9ucyh0aGlzLkdldEJhc2ljUHVzaHBpbk9wdGlvbnMocGluc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIuYWRkKHBpbik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BpZGVyTWFya2VyOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IG5ldyBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlcihwaW4sIG51bGwsIHRoaXMuX3NwaWRlckxheWVyKTtcclxuICAgICAgICAgICAgICAgIHNwaWRlck1hcmtlci5TdGljayA9IHN0aWNrO1xyXG4gICAgICAgICAgICAgICAgc3BpZGVyTWFya2VyLlBhcmVudE1hcmtlciA9IDxCaW5nTWFya2VyPnRoaXMuR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocGluc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJNYXJrZXJzLnB1c2goc3BpZGVyTWFya2VyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck1hcmtlckxvb2t1cC5zZXQocGluLCBzcGlkZXJNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXBjbGlja3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19