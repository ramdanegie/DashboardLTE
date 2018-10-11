/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapAPILoader } from '../mapapiloader';
import { BingConversions } from './bing-conversions';
import { Marker } from '../../models/marker';
import { BingMarker } from '../../models/bing/bing-marker';
import { BingLayer } from '../../models/bing/bing-layer';
import { BingClusterLayer } from '../../models/bing/bing-cluster-layer';
import { BingInfoWindow } from '../../models/bing/bing-info-window';
import { BingPolygon } from '../../models/bing/bing-polygon';
import { BingPolyline } from '../../models/bing/bing-polyline';
import { MixinMapLabelWithOverlayView } from '../../models/bing/bing-label';
import { MixinCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingMapEventsLookup } from '../../models/bing/bing-events-lookup';
/**
 * Concrete implementation of the MapService abstract implementing a Bin Map V8 provider
 *
 * @export
 */
var BingMapService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMapService.
     * @param _loader MapAPILoader instance implemented for Bing Maps. This instance will generally be injected.
     * @param _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     * @memberof BingMapService
     */
    function BingMapService(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._modules = new Map();
        this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    Object.defineProperty(BingMapService.prototype, "LoadedModules", {
        get: /**
         * Gets an array of loaded Bong modules.
         *
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._modules; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapInstance", {
        get: /**
         * Gets the Bing Map control instance underlying the implementation
         *
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._mapInstance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapPromise", {
        get: /**
         * Gets a Promise for a Bing Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
         * are not sure if and when the instance will be created.
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapSize", {
        get: /**
         * Gets the maps physical size.
         *
         * \@readonly
         * @abstract
         * \@memberof BingMapService
         * @return {?}
         */
        function () {
            if (this.MapInstance) {
                var /** @type {?} */ s = { width: this.MapInstance.getWidth(), height: this.MapInstance.getHeight() };
                return s;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    BingMapService.prototype.CreateCanvasOverlay = /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    function (drawCallback) {
        return this._map.then(function (map) {
            var /** @type {?} */ overlay = new BingCanvasOverlay(drawCallback);
            map.layers.insert(overlay);
            return overlay;
        });
    };
    /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    BingMapService.prototype.CreateClusterLayer = /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            var /** @type {?} */ p = new Promise(function (resolve) {
                _this.LoadModule('Microsoft.Maps.Clustering', function () {
                    var /** @type {?} */ o = BingConversions.TranslateClusterOptions(options);
                    var /** @type {?} */ layer = new Microsoft.Maps.ClusterLayer(new Array(), o);
                    var /** @type {?} */ bl;
                    map.layers.insert(layer);
                    bl = new BingClusterLayer(layer, _this);
                    bl.SetOptions(options);
                    resolve(bl);
                });
            });
            return p;
        });
    };
    /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    BingMapService.prototype.CreateInfoWindow = /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    function (options) {
        return this._map.then(function (map) {
            var /** @type {?} */ loc;
            if (options.position == null) {
                loc = map.getCenter();
            }
            else {
                loc = new Microsoft.Maps.Location(options.position.latitude, options.position.longitude);
            }
            var /** @type {?} */ infoBox = new Microsoft.Maps.Infobox(loc, BingConversions.TranslateInfoBoxOptions(options));
            infoBox.setMap(map);
            return new BingInfoWindow(infoBox);
        });
    };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    BingMapService.prototype.CreateLayer = /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            var /** @type {?} */ layer = new Microsoft.Maps.Layer(options.id.toString());
            map.layers.insert(layer);
            return new BingLayer(layer, _this);
        });
    };
    /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    BingMapService.prototype.CreateMap = /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    function (el, mapOptions) {
        var _this = this;
        return this._loader.Load().then(function () {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // map startup...
            if (_this._mapInstance != null) {
                _this.DisposeMap();
            }
            var /** @type {?} */ o = BingConversions.TranslateLoadOptions(mapOptions);
            if (!o.credentials) {
                o.credentials = _this._config.apiKey;
            }
            var /** @type {?} */ map = new Microsoft.Maps.Map(el, o);
            _this._mapInstance = map;
            _this._mapResolver(map);
        });
    };
    /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    BingMapService.prototype.CreateMarker = /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    function (options) {
        if (options === void 0) { options = /** @type {?} */ ({}); }
        var /** @type {?} */ payload = function (icon, map) {
            var /** @type {?} */ loc = BingConversions.TranslateLocation(options.position);
            var /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            var /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
            var /** @type {?} */ marker = new BingMarker(pushpin, map, null);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
            }
            map.entities.push(pushpin);
            return marker;
        };
        return this._map.then(function (map) {
            if (options.iconInfo && options.iconInfo.markerType) {
                var /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, map));
                }
                else {
                    return s.then(function (x) {
                        return (payload(x.icon, map));
                    });
                }
            }
            else {
                return (payload(null, map));
            }
        });
    };
    /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    BingMapService.prototype.CreatePolygon = /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            var /** @type {?} */ locs = BingConversions.TranslatePaths(options.paths);
            var /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
            var /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, o);
            map.entities.push(poly);
            var /** @type {?} */ p = new BingPolygon(poly, _this, null);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return p.Metadata.set(k, v); });
            }
            if (options.title && options.title !== '') {
                p.Title = options.title;
            }
            if (options.showLabel != null) {
                p.ShowLabel = options.showLabel;
            }
            if (options.showTooltip != null) {
                p.ShowTooltip = options.showTooltip;
            }
            if (options.labelMaxZoom != null) {
                p.LabelMaxZoom = options.labelMaxZoom;
            }
            if (options.labelMinZoom != null) {
                p.LabelMinZoom = options.labelMinZoom;
            }
            if (options.editable) {
                p.SetEditable(options.editable);
            }
            return p;
        });
    };
    /**
     * Creates a polyline within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polygon.
     *
     */
    BingMapService.prototype.CreatePolyline = /**
     * Creates a polyline within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polygon.
     *
     */
    function (options) {
        var /** @type {?} */ polyline;
        return this._map.then(function (map) {
            var /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
            var /** @type {?} */ locs = BingConversions.TranslatePaths(options.path);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                map.entities.push(polyline);
                var /** @type {?} */ pl_1 = new BingPolyline(polyline, map, null);
                if (options.metadata) {
                    options.metadata.forEach(function (v, k) { return pl_1.Metadata.set(k, v); });
                }
                if (options.title && options.title !== '') {
                    pl_1.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl_1.ShowTooltip = options.showTooltip;
                }
                return pl_1;
            }
            else {
                var /** @type {?} */ lines_1 = new Array();
                locs.forEach(function (p) {
                    polyline = new Microsoft.Maps.Polyline(p, o);
                    map.entities.push(polyline);
                    var /** @type {?} */ pl = new BingPolyline(polyline, map, null);
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return pl.Metadata.set(k, v); });
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines_1.push(pl);
                });
                return lines_1;
            }
        });
    };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    BingMapService.prototype.DeleteLayer = /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        return this._map.then(function (map) {
            map.layers.remove(layer.NativePrimitve);
        });
    };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    BingMapService.prototype.DisposeMap = /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance.dispose();
            this._mapInstance = null;
            this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
    };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    BingMapService.prototype.GetCenter = /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    function () {
        return this._map.then(function (map) {
            var /** @type {?} */ center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.latitude,
                longitude: center.longitude
            });
        });
    };
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    BingMapService.prototype.GetBounds = /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    function () {
        return this._map.then(function (map) {
            var /** @type {?} */ box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorth(),
                maxLongitude: box.crossesInternationalDateLine() ? box.getWest() : box.getEast(),
                minLatitude: box.getSouth(),
                minLongitude: box.crossesInternationalDateLine() ? box.getEast() : box.getWest(),
                center: { latitude: box.center.latitude, longitude: box.center.longitude },
                padding: 0
            });
        });
    };
    /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    BingMapService.prototype.GetDrawingTools = /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    function (useSharedInstance) {
        var _this = this;
        if (useSharedInstance === void 0) { useSharedInstance = true; }
        return new Promise(function (resolve, reject) {
            _this.LoadModuleInstance('Microsoft.Maps.DrawingTools', useSharedInstance).then(function (o) {
                resolve(o);
            });
        });
    };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    BingMapService.prototype.GetZoom = /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    BingMapService.prototype.LoadModule = /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    function (moduleName, callback) {
        var _this = this;
        if (this._modules.has(moduleName)) {
            callback();
        }
        else {
            Microsoft.Maps.loadModule(moduleName, function () {
                _this._modules.set(moduleName, null);
                callback();
            });
        }
    };
    /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    BingMapService.prototype.LoadModuleInstance = /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    function (moduleName, useSharedInstance) {
        var _this = this;
        if (useSharedInstance === void 0) { useSharedInstance = true; }
        var /** @type {?} */ s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
        if (this._modules.has(moduleName)) {
            var /** @type {?} */ o = null;
            if (!useSharedInstance) {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
            }
            else if (this._modules.get(moduleName) != null) {
                o = this._modules.get(moduleName);
            }
            else {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                this._modules.set(moduleName, o);
            }
            return Promise.resolve(o);
        }
        else {
            return new Promise(function (resolve, reject) {
                try {
                    Microsoft.Maps.loadModule(moduleName, function () {
                        var /** @type {?} */ o = new (/** @type {?} */ (Microsoft.Maps))[s](_this._mapInstance);
                        if (useSharedInstance) {
                            _this._modules.set(moduleName, o);
                        }
                        else {
                            _this._modules.set(moduleName, null);
                        }
                        resolve(o);
                    });
                }
                catch (/** @type {?} */ e) {
                    reject('Could not load module or create instance.');
                }
            });
        }
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    BingMapService.prototype.LocationToPoint = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    function (loc) {
        return this._map.then(function (m) {
            var /** @type {?} */ l = BingConversions.TranslateLocation(loc);
            var /** @type {?} */ p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            if (p != null) {
                return { x: p.x, y: p.y };
            }
            return null;
        });
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    BingMapService.prototype.LocationsToPoints = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    function (locs) {
        return this._map.then(function (m) {
            var /** @type {?} */ l = locs.map(function (loc) { return BingConversions.TranslateLocation(loc); });
            var /** @type {?} */ p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            return p ? p : new Array();
        });
    };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    BingMapService.prototype.SetCenter = /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    function (latLng) {
        return this._map.then(function (map) { return map.setView({
            center: BingConversions.TranslateLocation(latLng)
        }); });
    };
    /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    BingMapService.prototype.SetMapOptions = /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            var /** @type {?} */ o = BingConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    BingMapService.prototype.SetViewOptions = /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            var /** @type {?} */ o = BingConversions.TranslateViewOptions(options);
            m.setView(o);
        });
    };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    BingMapService.prototype.SetZoom = /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    function (zoom) {
        return this._map.then(function (map) { return map.setView({
            zoom: zoom
        }); });
    };
    /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    BingMapService.prototype.SubscribeToMapEvent = /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    function (eventName) {
        var _this = this;
        var /** @type {?} */ eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._map.then(function (m) {
                Microsoft.Maps.Events.addHandler(m, eventNameTranslated, function (e) {
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    BingMapService.prototype.TriggerMapEvent = /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    function (eventName) {
        return this._map.then(function (m) { return Microsoft.Maps.Events.invoke(m, eventName, null); });
    };
    BingMapService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapService.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return BingMapService;
}());
export { BingMapService };
function BingMapService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMapService.prototype._map;
    /** @type {?} */
    BingMapService.prototype._mapInstance;
    /** @type {?} */
    BingMapService.prototype._mapResolver;
    /** @type {?} */
    BingMapService.prototype._config;
    /** @type {?} */
    BingMapService.prototype._modules;
    /** @type {?} */
    BingMapService.prototype._loader;
    /** @type {?} */
    BingMapService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBWSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQWUxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7OztJQThEdkUsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsd0JBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUFo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QUFnRCxDQUFDLENBQUM7OztnQkF2akJ0RixVQUFVOzs7O2dCQXZDRixZQUFZO2dCQUpBLE1BQU07O3lCQUEzQjs7U0E0Q2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuaW1wb3J0IHsgQmluZ01hcEFQSUxvYWRlciwgQmluZ01hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFya2VyVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlci10eXBlLWlkJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgQmluZ0xheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1sYXllcic7XHJcbmltcG9ydCB7IEJpbmdDbHVzdGVyTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNsdXN0ZXItbGF5ZXInO1xyXG5pbXBvcnQgeyBCaW5nSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1sYWJlbCc7XHJcbmltcG9ydCB7IE1peGluQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBCaW5nQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXNpemUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5cclxuaW1wb3J0IHsgQmluZ01hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctZXZlbnRzLWxvb2t1cCc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIE1hcFNlcnZpY2UgYWJzdHJhY3QgaW1wbGVtZW50aW5nIGEgQmluIE1hcCBWOCBwcm92aWRlclxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFwU2VydmljZSBpbXBsZW1lbnRzIE1hcFNlcnZpY2Uge1xyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgRGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICBwcml2YXRlIF9tYXA6IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPjtcclxuICAgIHByaXZhdGUgX21hcEluc3RhbmNlOiBNaWNyb3NvZnQuTWFwcy5NYXA7XHJcbiAgICBwcml2YXRlIF9tYXBSZXNvbHZlcjogKHZhbHVlPzogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlczogTWFwPHN0cmluZywgT2JqZWN0PiA9IG5ldyBNYXA8c3RyaW5nLCBPYmplY3Q+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgRGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBhcnJheSBvZiBsb2FkZWQgQm9uZyBtb2R1bGVzLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTG9hZGVkTW9kdWxlcygpOiBNYXA8c3RyaW5nLCBPYmplY3Q+IHsgcmV0dXJuIHRoaXMuX21vZHVsZXM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEJpbmcgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcEluc3RhbmNlKCk6IE1pY3Jvc29mdC5NYXBzLk1hcCB7IHJldHVybiB0aGlzLl9tYXBJbnN0YW5jZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIFByb21pc2UgZm9yIGEgQmluZyBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvbi4gVXNlIHRoaXMgaW5zdGVhZCBvZiB7QGxpbmsgTWFwSW5zdGFuY2V9IGlmIHlvdVxyXG4gICAgICogYXJlIG5vdCBzdXJlIGlmIGFuZCB3aGVuIHRoZSBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+IHsgcmV0dXJuIHRoaXMuX21hcDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBTaXplKCk6IElTaXplIHtcclxuICAgICAgICBpZiAodGhpcy5NYXBJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzOiBJU2l6ZSA9IHsgd2lkdGg6IHRoaXMuTWFwSW5zdGFuY2UuZ2V0V2lkdGgoKSwgaGVpZ2h0OiB0aGlzLk1hcEluc3RhbmNlLmdldEhlaWdodCgpIH07XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXBTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9sb2FkZXIgTWFwQVBJTG9hZGVyIGluc3RhbmNlIGltcGxlbWVudGVkIGZvciBCaW5nIE1hcHMuIFRoaXMgaW5zdGFuY2Ugd2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgTmdab25lIG9iamVjdCB0byBlbmFibGUgem9uZSBhd2FyZSBwcm9taXNlcy4gVGhpcyB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHsgdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSAoPEJpbmdNYXBBUElMb2FkZXI+dGhpcy5fbG9hZGVyKS5Db25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2UgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjYW52YXMgb3ZlcmxheSBsYXllciB0byBwZXJmb3JtIGN1c3RvbSBkcmF3aW5nIG92ZXIgdGhlIG1hcCB3aXRoIG91dFxyXG4gICAgICogc29tZSBvZiB0aGUgb3ZlcmhlYWQgYXNzb2NpYXRlZCB3aXRoIGdvaW5nIHRocm91Z2ggdGhlIE1hcCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIGRyYXdDYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbnZhcyBpcyByZWFkeSB0byBiZVxyXG4gICAgICogcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIENhbnZhc092ZXJsYXl9IG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5OiBCaW5nQ2FudmFzT3ZlcmxheSA9IG5ldyBCaW5nQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChvdmVybGF5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQmluZyBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUNsdXN0ZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IG5ldyBQcm9taXNlPExheWVyPihyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZE1vZHVsZSgnTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlcmluZycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVDbHVzdGVyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXllcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllcihuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4oKSwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsOiBCaW5nQ2x1c3RlckxheWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBibCA9IG5ldyBCaW5nQ2x1c3RlckxheWVyKGxheWVyLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBibC5TZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYmwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5mb3JtYXRpb24gd2luZG93IGZvciBhIG1hcCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9uc10gLSBJbmZvd2luZG93IG9wdGlvbnMuIFNlZSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIEluZm9XaW5kb3d9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkluZm9ib3ggb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zPzogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxJbmZvV2luZG93PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKG9wdGlvbnMucG9zaXRpb24ubGF0aXR1ZGUsIG9wdGlvbnMucG9zaXRpb24ubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpbmZvQm94OiBNaWNyb3NvZnQuTWFwcy5JbmZvYm94ID0gbmV3IE1pY3Jvc29mdC5NYXBzLkluZm9ib3gobG9jLCBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgICAgICAgICBpbmZvQm94LnNldE1hcChtYXApO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmdJbmZvV2luZG93KGluZm9Cb3gpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUxheWVyT3B0aW9uc31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5MYXllcihvcHRpb25zLmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmluZ0xheWVyKGxheWVyLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBIVE1MIGVsZW1lbnQgdG8gaG9zdCB0aGUgbWFwLlxyXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFwIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBJTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuTG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhcHBseSBtaXhpbnNcclxuICAgICAgICAgICAgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldygpO1xyXG4gICAgICAgICAgICBNaXhpbkNhbnZhc092ZXJsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1hcCBzdGFydHVwLi4uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3Bvc2VNYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9hZE9wdGlvbnMobWFwT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICghby5jcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgby5jcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5hcGlLZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWFwID0gbmV3IE1pY3Jvc29mdC5NYXBzLk1hcChlbCwgbyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEJpbmcgbWFwIG1hcmtlciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zPTxJTWFya2VyT3B0aW9ucz57fV0gLSBPcHRpb25zIGZvciB0aGUgbWFya2VyLiBTZWUge0BsaW5rIElNYXJrZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBNYXJrZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLlB1c2hQaW4gb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zID0gPElNYXJrZXJPcHRpb25zPnt9KTogUHJvbWlzZTxNYXJrZXI+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKGljb246IHN0cmluZywgbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApOiBCaW5nTWFya2VyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uICYmIGljb24gIT09ICcnKSB7IG8uaWNvbiA9IGljb247IH1cclxuICAgICAgICAgICAgY29uc3QgcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYywgbyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG1hcCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbWFya2VyLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgbWFwLmVudGl0aWVzLnB1c2gocHVzaHBpbik7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmljb25JbmZvICYmIG9wdGlvbnMuaWNvbkluZm8ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIob3B0aW9ucy5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzKSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIChwYXlsb2FkKHMsIG1hcCkpOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBheWxvYWQoeC5pY29uLCBtYXApKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGF5bG9hZChudWxsLCBtYXApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBCaW5nIE1hcHMgVjggbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlnb24uIFNlZSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5Z29ufSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRocyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG8pO1xyXG4gICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHAuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dMYWJlbCAhPSBudWxsKSB7IHAuU2hvd0xhYmVsID0gb3B0aW9ucy5zaG93TGFiZWw7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1heFpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWF4Wm9vbSA9IG9wdGlvbnMubGFiZWxNYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWluWm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNaW5ab29tID0gb3B0aW9ucy5sYWJlbE1pblpvb207IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRpdGFibGUpIHsgcC5TZXRFZGl0YWJsZShvcHRpb25zLmVkaXRhYmxlKTsgfVxyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwb2x5bGluZSB3aXRoaW4gdGhlIEJpbmcgTWFwcyBWOCBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWxpbmUuIFNlZSB7QGxpbmsgSVBvbHlsaW5lT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWxpbmV9IG9iamVjdCAob3IgYW4gYXJyYXkgdGhlcmVvZiBmb3IgY29tcGxleCBwYXRocyksXHJcbiAgICAgKiB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lIHwgQXJyYXk8UG9seWxpbmU+PiB7XHJcbiAgICAgICAgbGV0IHBvbHlsaW5lOiBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGggJiYgb3B0aW9ucy5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUobG9jc1swXSwgbyk7XHJcbiAgICAgICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5bGluZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCBtYXAsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwbC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xyXG4gICAgICAgICAgICAgICAgbG9jcy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKHAsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHlsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCBtYXAsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcGwuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHBsLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChwbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBMYXllciB0byBkZWxldGUuIFNlZSB7QGxpbmsgTGF5ZXJ9LiBUaGlzIG1ldGhvZCBleHBlY3RzIHRoZSBCaW5nIHNwZWNpZmljIExheWVyIG1vZGVsIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBMYXllcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgbWFwLmxheWVycy5yZW1vdmUobGF5ZXIuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGFvc2UgdGhlIG1hcCBhbmQgYXNzb2NpYXRlZCByZXNvdXJlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERpc3Bvc2VNYXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCA9PSBudWxsICYmIHRoaXMuX21hcEluc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWFwSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJbnN0YW5jZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGNlbnRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGNlbnRlci4gU2VlIHtAbGluayBJTGF0TG9uZ30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDZW50ZXIoKTogUHJvbWlzZTxJTGF0TG9uZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gPElMYXRMb25nPntcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjZW50ZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNlbnRlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGJvdW5kaW5nIGJveFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGJvdW5kaW5nIGJveC4gU2VlIHtAbGluayBJQm94fS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEJvdW5kcygpOiBQcm9taXNlPElCb3g+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IG1hcC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxJQm94PntcclxuICAgICAgICAgICAgICAgIG1heExhdGl0dWRlOiBib3guZ2V0Tm9ydGgoKSxcclxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogYm94LmNyb3NzZXNJbnRlcm5hdGlvbmFsRGF0ZUxpbmUoKSA/IGJveC5nZXRXZXN0KCkgOiBib3guZ2V0RWFzdCgpLFxyXG4gICAgICAgICAgICAgICAgbWluTGF0aXR1ZGU6IGJveC5nZXRTb3V0aCgpLFxyXG4gICAgICAgICAgICAgICAgbWluTG9uZ2l0dWRlOiBib3guY3Jvc3Nlc0ludGVybmF0aW9uYWxEYXRlTGluZSgpID8gYm94LmdldEVhc3QoKSA6IGJveC5nZXRXZXN0KCksXHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0aXR1ZGU6IGJveC5jZW50ZXIubGF0aXR1ZGUsIGxvbmdpdHVkZTogYm94LmNlbnRlci5sb25naXR1ZGUgfSxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBzaGFyZWQgb3IgcHJpdmF0ZSBpbnN0YW5jZSBvZiB0aGUgbWFwIGRyYXdpbmcgdG9vbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFt1c2VTaGFyZWRJbnN0YW5jZT10cnVlXSAtIFNldCB0byBmYWxzZSB0byBjcmVhdGUgYSBwcml2YXRlIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgd2hlbiByZXNvbHZlZCBjb250YWluc3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGRyYXdpbmcgdG9vbHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYXdpbmdUb29scyAodXNlU2hhcmVkSW5zdGFuY2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHM+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZE1vZHVsZUluc3RhbmNlKCdNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHMnLCB1c2VTaGFyZWRJbnN0YW5jZSkudGhlbigobzogTWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5nZXRab29tKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBtb2R1bGUgaW50byB0aGUgTWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtb2R1bGVOYW1lIC0gVGhlIG1vZHVsZSB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQ2FsbGJhY2sgdG8gY2FsbCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWRNb2R1bGUobW9kdWxlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tb2R1bGVzLmhhcyhtb2R1bGVOYW1lKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMubG9hZE1vZHVsZShtb2R1bGVOYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgbW9kdWxlIGludG8gdGhlIE1hcCBhbmQgZGVsaXZlcnMgYW5kIGluc3RhbmNlIG9mIHRoZSBtb2R1bGUgcGF5bG9hZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbW9kdWxlTmFtZSAtIFRoZSBtb2R1bGUgdG8gbG9hZC5cclxuICAgICAqIEBwYXJhbSB1c2VTaGFyZWRJbnN0YW5jZS0gVXNlIGEgc2hhcmVkIGluc3RhbmNlIGlmIHRydWUsIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBpZiBmYWxzZS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZE1vZHVsZUluc3RhbmNlKG1vZHVsZU5hbWU6IHN0cmluZywgdXNlU2hhcmVkSW5zdGFuY2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBzOiBzdHJpbmcgPSBtb2R1bGVOYW1lLnN1YnN0cihtb2R1bGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxKTtcclxuICAgICAgICBpZiAodGhpcy5fbW9kdWxlcy5oYXMobW9kdWxlTmFtZSkpIHtcclxuICAgICAgICAgICAgbGV0IG86IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghdXNlU2hhcmVkSW5zdGFuY2UpICB7XHJcbiAgICAgICAgICAgICAgICBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fbW9kdWxlcy5nZXQobW9kdWxlTmFtZSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMuX21vZHVsZXMuZ2V0KG1vZHVsZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbyA9IG5ldyAoPGFueT5NaWNyb3NvZnQuTWFwcylbc10odGhpcy5fbWFwSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxPYmplY3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5sb2FkTW9kdWxlKG1vZHVsZU5hbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVNoYXJlZEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0NvdWxkIG5vdCBsb2FkIG1vZHVsZSBvciBjcmVhdGUgaW5zdGFuY2UuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLiBUaGlzIHByb21pc2UgcmVzb2x2ZXMgdG8gbnVsbFxyXG4gICAgICogaWYgdGhlIGdvZSBjb29yZGluYXRlcyBhcmUgbm90IGluIHRoZSB2aWV3IHBvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obG9jKTtcclxuICAgICAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSA8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+bS50cnlMb2NhdGlvblRvUGl4ZWwobCwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgICAgIGlmIChwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHAueCwgeTogcC55IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uc1RvUG9pbnRzKGxvY3M6IEFycmF5PElMYXRMb25nPik6IFByb21pc2U8QXJyYXk8SVBvaW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsb2NzLm1hcChsb2MgPT4gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxvYykpO1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Qb2ludD4gPSA8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKGwsXHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwIDogbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENlbnRlcnMgdGhlIG1hcCBvbiBhIGdlbyBsb2NhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvQ29vcmRpbmF0ZXMgYXJvdW5kIHdoaWNoIHRvIGNlbnRlciB0aGUgbWFwLiBTZWUge0BsaW5rIElMYXRMb25nfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBjZW50ZXIgb3BlcmF0aW9ucyBoYXMgYmVlbiBjb21wbGV0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRDZW50ZXIobGF0TG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5zZXRWaWV3KHtcclxuICAgICAgICAgICAgY2VudGVyOiBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obGF0TG5nKVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdlbmVyaWMgbWFwIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG0uc2V0T3B0aW9ucyhvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVZpZXdPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVZpZXdPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBtLnNldFZpZXcobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHpvb20gLSBab29tIGxldmVsIHRvIHNldC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSB6b29tIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gbWFwLnNldFZpZXcoe1xyXG4gICAgICAgICAgICB6b29tOiB6b29tXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBldmVudCBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcmV0dXJucyAtIEFuIG9ic2VydmFibGUgb2YgdHB5ZSBFIHRoYXQgZmlyZXMgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3Vic2NyaWJlVG9NYXBFdmVudDxFPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8RT4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZVRyYW5zbGF0ZWQgPSBCaW5nTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RT4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgZXZlbnROYW1lVHJhbnNsYXRlZCwgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gRXZlbnQgdG8gdHJpZ2dlci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUcmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG0pID0+IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UobSwgZXZlbnROYW1lLCBudWxsKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==