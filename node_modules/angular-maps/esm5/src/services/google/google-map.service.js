/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleMarkerClusterer } from '../../models/google/google-marker-clusterer';
import { GoogleInfoWindow } from '../../models/google/google-info-window';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapAPILoader } from '../mapapiloader';
import { MapTypeId } from '../../models/map-type-id';
import { Marker } from '../../models/marker';
import { MixinMapLabelWithOverlayView } from '../../models/google/google-label';
import { MixinCanvasOverlay } from '../../models/google/google-canvas-overlay';
import { GoogleCanvasOverlay } from '../../models/google/google-canvas-overlay';
import { GooglePolygon } from '../../models/google/google-polygon';
import { GooglePolyline } from '../../models/google/google-polyline';
import { GoogleConversions } from './google-conversions';
import { GoogleMarker } from '../../models/google/google-marker';
import { GoogleLayer } from '../../models/google/google-layer';
import { GoogleMapEventsLookup } from '../../models/google/google-events-lookup';
/**
 * Concrete implementation of the MapService abstract implementing a Google Maps provider
 *
 * @export
 */
var GoogleMapService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleMapService.
     * @param _loader MapAPILoader instance implemented for Google Maps. This instance will generally be injected.
     * @param _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     * @memberof GoogleMapService
     */
    function GoogleMapService(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    Object.defineProperty(GoogleMapService.prototype, "MapInstance", {
        get: /**
         * Gets the Google Map control instance underlying the implementation
         *
         * \@readonly
         * \@memberof GoogleMapService
         * @return {?}
         */
        function () { return this._mapInstance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMapService.prototype, "MapPromise", {
        get: /**
         * Gets a Promise for a Google Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
         * are not sure if and when the instance will be created.
         * \@readonly
         * \@memberof GoogleMapService
         * @return {?}
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMapService.prototype, "MapSize", {
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
                var /** @type {?} */ el = this.MapInstance.getDiv();
                var /** @type {?} */ s = { width: el.offsetWidth, height: el.offsetHeight };
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
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    GoogleMapService.prototype.CreateCanvasOverlay = /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    function (drawCallback) {
        return this._map.then(function (map) {
            var /** @type {?} */ overlay = new GoogleCanvasOverlay(drawCallback);
            overlay.SetMap(map);
            return overlay;
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GoogleMapService.prototype.CreateClusterLayer = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function (map) {
            var /** @type {?} */ updateOptions = false;
            var /** @type {?} */ markerClusterer = new MarkerClusterer(map, [], options);
            var /** @type {?} */ clusterLayer = new GoogleMarkerClusterer(markerClusterer);
            var /** @type {?} */ o = {
                id: options.id
            };
            if (!options.visible) {
                o.visible = false;
                updateOptions = true;
            }
            if (!options.clusteringEnabled) {
                o.clusteringEnabled = false;
                updateOptions = true;
            }
            if (updateOptions) {
                clusterLayer.SetOptions(o);
            }
            return clusterLayer;
        });
    };
    /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    GoogleMapService.prototype.CreateInfoWindow = /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            var /** @type {?} */ o = GoogleConversions.TranslateInfoWindowOptions(options);
            var /** @type {?} */ infoWindow = new google.maps.InfoWindow(o);
            return new GoogleInfoWindow(infoWindow, _this);
        });
    };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    GoogleMapService.prototype.CreateLayer = /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            return new GoogleLayer(map, _this, options.id);
        });
    };
    /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    GoogleMapService.prototype.CreateMap = /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
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
            // execute map startup
            if (!mapOptions.mapTypeId == null) {
                mapOptions.mapTypeId = MapTypeId.hybrid;
            }
            if (_this._mapInstance != null) {
                _this.DisposeMap();
            }
            var /** @type {?} */ o = GoogleConversions.TranslateOptions(mapOptions);
            var /** @type {?} */ map = new google.maps.Map(el, o);
            if (mapOptions.bounds) {
                map.fitBounds(GoogleConversions.TranslateBounds(mapOptions.bounds));
            }
            _this._mapInstance = map;
            _this._mapResolver(map);
            return;
        });
    };
    /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    GoogleMapService.prototype.CreateMarker = /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    function (options) {
        if (options === void 0) { options = /** @type {?} */ ({}); }
        var /** @type {?} */ payload = function (x, map) {
            var /** @type {?} */ marker = new google.maps.Marker(x);
            var /** @type {?} */ m = new GoogleMarker(marker);
            m.IsFirst = options.isFirst;
            m.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach(function (val, key) { return m.Metadata.set(key, val); });
            }
            marker.setMap(map);
            return m;
        };
        return this._map.then(function (map) {
            var /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                var /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o, map);
                }
                else {
                    return s.then(function (x) {
                        o.icon = x.icon;
                        return payload(o, map);
                    });
                }
            }
            else {
                return payload(o, map);
            }
        });
    };
    /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    GoogleMapService.prototype.CreatePolygon = /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    function (options) {
        return this._map.then(function (map) {
            var /** @type {?} */ o = GoogleConversions.TranslatePolygonOptions(options);
            var /** @type {?} */ polygon = new google.maps.Polygon(o);
            polygon.setMap(map);
            var /** @type {?} */ p = new GooglePolygon(polygon);
            if (options.metadata) {
                options.metadata.forEach(function (val, key) { return p.Metadata.set(key, val); });
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
            return p;
        });
    };
    /**
     * Creates a polyline within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
     * which models the underlying native polyline.
     *
     */
    GoogleMapService.prototype.CreatePolyline = /**
     * Creates a polyline within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
     * which models the underlying native polyline.
     *
     */
    function (options) {
        var /** @type {?} */ polyline;
        return this._map.then(function (map) {
            var /** @type {?} */ o = GoogleConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                o.path = GoogleConversions.TranslatePaths(options.path)[0];
                polyline = new google.maps.Polyline(o);
                polyline.setMap(map);
                var /** @type {?} */ pl_1 = new GooglePolyline(polyline);
                if (options.metadata) {
                    options.metadata.forEach(function (val, key) { return pl_1.Metadata.set(key, val); });
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
                var /** @type {?} */ paths = GoogleConversions.TranslatePaths(options.path);
                var /** @type {?} */ lines_1 = new Array();
                paths.forEach(function (p) {
                    o.path = p;
                    polyline = new google.maps.Polyline(o);
                    polyline.setMap(map);
                    var /** @type {?} */ pl = new GooglePolyline(polyline);
                    if (options.metadata) {
                        options.metadata.forEach(function (val, key) { return pl.Metadata.set(key, val); });
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
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    GoogleMapService.prototype.DeleteLayer = /**
     * Deletes a layer from the map.
     *
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        // return resolved promise as there is no conept of a custom layer in Google.
        return Promise.resolve();
    };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    GoogleMapService.prototype.DisposeMap = /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance = null;
            this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
    };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GoogleMapService.prototype.GetCenter = /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    function () {
        return this._map.then(function (map) {
            var /** @type {?} */ center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.lat(),
                longitude: center.lng()
            });
        });
    };
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    GoogleMapService.prototype.GetBounds = /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    function () {
        return this._map.then(function (map) {
            var /** @type {?} */ box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorthEast().lat(),
                maxLongitude: Math.max(box.getNorthEast().lng(), box.getSouthWest().lng()),
                minLatitude: box.getSouthWest().lat(),
                minLongitude: Math.min(box.getNorthEast().lng(), box.getSouthWest().lng()),
                center: { latitude: box.getCenter().lat(), longitude: box.getCenter().lng() },
                padding: 0
            });
        });
    };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GoogleMapService.prototype.GetZoom = /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    GoogleMapService.prototype.LocationToPoint = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    function (loc) {
        return this._map.then(function (m) {
            var /** @type {?} */ crossesDateLine = false;
            var /** @type {?} */ l = GoogleConversions.TranslateLocationObject(loc);
            var /** @type {?} */ p = m.getProjection();
            var /** @type {?} */ s = Math.pow(2, m.getZoom());
            var /** @type {?} */ b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            var /** @type {?} */ offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            var /** @type {?} */ offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            var /** @type {?} */ point = p.fromLatLngToPoint(l);
            return {
                x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                y: Math.floor((point.y - offsetY) * s)
            };
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
    GoogleMapService.prototype.LocationsToPoints = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    function (locs) {
        return this._map.then(function (m) {
            var /** @type {?} */ crossesDateLine = false;
            var /** @type {?} */ p = m.getProjection();
            var /** @type {?} */ s = Math.pow(2, m.getZoom());
            var /** @type {?} */ b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            var /** @type {?} */ offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            var /** @type {?} */ offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            var /** @type {?} */ l = locs.map(function (ll) {
                var /** @type {?} */ l1 = GoogleConversions.TranslateLocationObject(ll);
                var /** @type {?} */ point = p.fromLatLngToPoint(l1);
                return {
                    x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                    y: Math.floor((point.y - offsetY) * s)
                };
            });
            return l;
        });
    };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    GoogleMapService.prototype.SetCenter = /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    function (latLng) {
        return this._map.then(function (map) {
            var /** @type {?} */ center = GoogleConversions.TranslateLocationObject(latLng);
            map.setCenter(center);
        });
    };
    /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    GoogleMapService.prototype.SetMapOptions = /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            var /** @type {?} */ o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    GoogleMapService.prototype.SetViewOptions = /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            if (options.bounds) {
                m.fitBounds(GoogleConversions.TranslateBounds(options.bounds));
            }
            var /** @type {?} */ o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    GoogleMapService.prototype.SetZoom = /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    GoogleMapService.prototype.SubscribeToMapEvent = /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    function (eventName) {
        var _this = this;
        var /** @type {?} */ googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(googleEventName, function (e) {
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    GoogleMapService.prototype.TriggerMapEvent = /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName, null); });
    };
    GoogleMapService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMapService.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return GoogleMapService;
}());
export { GoogleMapService };
function GoogleMapService_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMapService.prototype._map;
    /** @type {?} */
    GoogleMapService.prototype._mapInstance;
    /** @type {?} */
    GoogleMapService.prototype._mapResolver;
    /** @type {?} */
    GoogleMapService.prototype._config;
    /** @type {?} */
    GoogleMapService.prototype._loader;
    /** @type {?} */
    GoogleMapService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFJaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7O0lBNEQ3RSxHQUFHO0lBQ0gsZUFBZTtJQUNm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LENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDOzs7Z0JBOWZuRixVQUFVOzs7O2dCQXpDRixZQUFZO2dCQUhBLE1BQU07OzJCQUYzQjs7U0ErQ2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlcic7XHJcbmltcG9ydCB7IEdvb2dsZUluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBBUElMb2FkZXIgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBBUElMb2FkZXIsIEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLWNsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSVNpemUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lzaXplJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXBUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFwLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbGFiZWwnO1xyXG5pbXBvcnQgeyBNaXhpbkNhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IEdvb2dsZUNhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbic7XHJcbmltcG9ydCB7IEdvb2dsZVBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4vZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcclxuaW1wb3J0IHsgR29vZ2xlTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1sYXllcic7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1ldmVudHMtbG9va3VwJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcclxuXHJcbmRlY2xhcmUgY29uc3QgZ29vZ2xlOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgTWFya2VyQ2x1c3RlcmVyOiBhbnk7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIE1hcFNlcnZpY2UgYWJzdHJhY3QgaW1wbGVtZW50aW5nIGEgR29vZ2xlIE1hcHMgcHJvdmlkZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwU2VydmljZSBpbXBsZW1lbnRzIE1hcFNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIERlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD47XHJcbiAgICBwcml2YXRlIF9tYXBJbnN0YW5jZTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwO1xyXG4gICAgcHJpdmF0ZSBfbWFwUmVzb2x2ZXI6ICh2YWx1ZT86IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IERlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWFwSW5zdGFuY2UoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHsgcmV0dXJuIHRoaXMuX21hcEluc3RhbmNlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgUHJvbWlzZSBmb3IgYSBHb29nbGUgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb24uIFVzZSB0aGlzIGluc3RlYWQgb2Yge0BsaW5rIE1hcEluc3RhbmNlfSBpZiB5b3VcclxuICAgICAqIGFyZSBub3Qgc3VyZSBpZiBhbmQgd2hlbiB0aGUgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+IHsgcmV0dXJuIHRoaXMuX21hcDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBTaXplKCk6IElTaXplIHtcclxuICAgICAgICBpZiAodGhpcy5NYXBJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbDogSFRNTERpdkVsZW1lbnQgPSB0aGlzLk1hcEluc3RhbmNlLmdldERpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBzOiBJU2l6ZSA9IHsgd2lkdGg6IGVsLm9mZnNldFdpZHRoLCBoZWlnaHQ6IGVsLm9mZnNldEhlaWdodCB9O1xyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXBTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9sb2FkZXIgTWFwQVBJTG9hZGVyIGluc3RhbmNlIGltcGxlbWVudGVkIGZvciBHb29nbGUgTWFwcy4gVGhpcyBpbnN0YW5jZSB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSBOZ1pvbmUgb2JqZWN0IHRvIGVuYWJsZSB6b25lIGF3YXJlIHByb21pc2VzLiBUaGlzIHdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvYWRlcjogTWFwQVBJTG9hZGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+KFxyXG4gICAgICAgICAgICAocmVzb2x2ZTogKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gKDxHb29nbGVNYXBBUElMb2FkZXI+dGhpcy5fbG9hZGVyKS5Db25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2UgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjYW52YXMgb3ZlcmxheSBsYXllciB0byBwZXJmb3JtIGN1c3RvbSBkcmF3aW5nIG92ZXIgdGhlIG1hcCB3aXRoIG91dFxyXG4gICAgICogc29tZSBvZiB0aGUgb3ZlcmhlYWQgYXNzb2NpYXRlZCB3aXRoIGdvaW5nIHRocm91Z2ggdGhlIE1hcCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIGRyYXdDYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbnZhcyBpcyByZWFkeSB0byBiZVxyXG4gICAgICogcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIENhbnZhc092ZXJsYXl9IG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjazogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpID0+IHZvaWQpOiBQcm9taXNlPENhbnZhc092ZXJsYXk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXk6IEdvb2dsZUNhbnZhc092ZXJsYXkgPSBuZXcgR29vZ2xlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICBvdmVybGF5LlNldE1hcChtYXApO1xyXG4gICAgICAgICAgICByZXR1cm4gb3ZlcmxheTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogQ3JlYXRlcyBhIEdvb2dsZSBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUNsdXN0ZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2x1c3RlckxheWVyKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlckNsdXN0ZXJlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIFtdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgY2x1c3RlckxheWVyID0gbmV3IEdvb2dsZU1hcmtlckNsdXN0ZXJlcihtYXJrZXJDbHVzdGVyZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBvOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogb3B0aW9ucy5pZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIG8uY2x1c3RlcmluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyTGF5ZXIuU2V0T3B0aW9ucyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2x1c3RlckxheWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbmZvcm1hdGlvbiB3aW5kb3cgZm9yIGEgbWFwIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zXSAtIEluZm93aW5kb3cgb3B0aW9ucy4gU2VlIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgSW5mb1dpbmRvd30gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUluZm9XaW5kb3cob3B0aW9ucz86IElJbmZvV2luZG93T3B0aW9ucyk6IFByb21pc2U8R29vZ2xlSW5mb1dpbmRvdz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVJbmZvV2luZG93T3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgaW5mb1dpbmRvdzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KG8pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvb2dsZUluZm9XaW5kb3coaW5mb1dpbmRvdywgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJTGF5ZXJPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5MYXllciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVMYXllcihtYXAsIHRoaXMsIG9wdGlvbnMuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXHJcbiAgICAgKiBAcGFyYW0gbWFwT3B0aW9ucyAtIE1hcCBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBtYXAgaGFzIGJlZW4gY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFwKGVsOiBIVE1MRWxlbWVudCwgbWFwT3B0aW9uczogSU1hcE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLkxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gYXBwbHkgbWl4aW5zXHJcbiAgICAgICAgICAgIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKTtcclxuICAgICAgICAgICAgTWl4aW5DYW52YXNPdmVybGF5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBleGVjdXRlIG1hcCBzdGFydHVwXHJcbiAgICAgICAgICAgIGlmICghbWFwT3B0aW9ucy5tYXBUeXBlSWQgPT0gbnVsbCkgeyBtYXBPcHRpb25zLm1hcFR5cGVJZCA9IE1hcFR5cGVJZC5oeWJyaWQ7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcG9zZU1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVPcHRpb25zKG1hcE9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWwsIG8pO1xyXG4gICAgICAgICAgICBpZiAobWFwT3B0aW9ucy5ib3VuZHMpIHtcclxuICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlQm91bmRzKG1hcE9wdGlvbnMuYm91bmRzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBtYXA7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFJlc29sdmVyKG1hcCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBHb29nbGUgbWFwIG1hcmtlciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zPTxJTWFya2VyT3B0aW9ucz57fV0gLSBPcHRpb25zIGZvciB0aGUgbWFya2VyLiBTZWUge0BsaW5rIElNYXJrZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBNYXJrZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLlB1c2hQaW4gb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXIob3B0aW9uczogSU1hcmtlck9wdGlvbnMgPSA8SU1hcmtlck9wdGlvbnM+e30pOiBQcm9taXNlPE1hcmtlcj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoeDogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucywgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApOiBHb29nbGVNYXJrZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHgpO1xyXG4gICAgICAgICAgICBjb25zdCBtID0gbmV3IEdvb2dsZU1hcmtlcihtYXJrZXIpO1xyXG4gICAgICAgICAgICBtLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XHJcbiAgICAgICAgICAgIG0uSXNMYXN0ID0gb3B0aW9ucy5pc0xhc3Q7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XHJcbiAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgcmV0dXJuIG07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmljb24gPSBzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8sIG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmljb24gPSB4Lmljb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8sIG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZChvLCBtYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcG9seWdvbiB3aXRoaW4gdGhlIEdvb2dsZSBNYXAgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlnb24uIFNlZSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5Z29ufSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvKTtcclxuICAgICAgICAgICAgcG9seWdvbi5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHA6IEdvb2dsZVBvbHlnb24gPSBuZXcgR29vZ2xlUG9seWdvbihwb2x5Z29uKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IHAuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xhYmVsICE9IG51bGwpIHsgcC5TaG93TGFiZWwgPSBvcHRpb25zLnNob3dMYWJlbDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHAuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWF4Wm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNYXhab29tID0gb3B0aW9ucy5sYWJlbE1heFpvb207IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNaW5ab29tICE9IG51bGwpIHsgcC5MYWJlbE1pblpvb20gPSBvcHRpb25zLmxhYmVsTWluWm9vbTsgfVxyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwb2x5bGluZSB3aXRoaW4gdGhlIEdvb2dsZSBNYXAgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlsaW5lLiBTZWUge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlsaW5lfSBvYmplY3QgKG9yIGFuIGFycmF5IHRoZXJlZm9yZSBmb3IgY29tcGxleCBwYXRocylcclxuICAgICAqIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIGxldCBwb2x5bGluZTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGggJiYgb3B0aW9ucy5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgby5wYXRoID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKVswXTtcclxuICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG8pO1xyXG4gICAgICAgICAgICAgICAgcG9seWxpbmUuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seWxpbmUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IHBsLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoczogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcclxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5wYXRoID0gcDtcclxuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZS5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seWxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwbC5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHBsLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChwbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBMYXllciB0byBkZWxldGUuIFNlZSB7QGxpbmsgTGF5ZXJ9LiBUaGlzIG1ldGhvZCBleHBlY3RzIHRoZSBHb29nbGUgc3BlY2lmaWMgTGF5ZXIgbW9kZWwgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVMYXllcihsYXllcjogTGF5ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyByZXR1cm4gcmVzb2x2ZWQgcHJvbWlzZSBhcyB0aGVyZSBpcyBubyBjb25lcHQgb2YgYSBjdXN0b20gbGF5ZXIgaW4gR29vZ2xlLlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERpc3Bvc2VNYXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCA9PSBudWxsICYmIHRoaXMuX21hcEluc3RhbmNlID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcEluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+KChyZXNvbHZlOiAoKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgY2VudGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgY2VudGVyLiBTZWUge0BsaW5rIElMYXRMb25nfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q2VudGVyKCk6IFByb21pc2U8SUxhdExvbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gPElMYXRMb25nPntcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjZW50ZXIubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNlbnRlci5sbmcoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgYm91bmRpbmcgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdlbyBsb2NhdGlvbiBvZiB0aGUgYm91bmRpbmcgYm94LiBTZWUge0BsaW5rIElCb3h9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRCb3VuZHMoKTogUHJvbWlzZTxJQm94PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib3ggPSBtYXAuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8SUJveD57XHJcbiAgICAgICAgICAgICAgICBtYXhMYXRpdHVkZTogYm94LmdldE5vcnRoRWFzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlOiBNYXRoLm1heChib3guZ2V0Tm9ydGhFYXN0KCkubG5nKCksIGJveC5nZXRTb3V0aFdlc3QoKS5sbmcoKSksXHJcbiAgICAgICAgICAgICAgICBtaW5MYXRpdHVkZTogYm94LmdldFNvdXRoV2VzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbWluTG9uZ2l0dWRlOiBNYXRoLm1pbihib3guZ2V0Tm9ydGhFYXN0KCkubG5nKCksIGJveC5nZXRTb3V0aFdlc3QoKS5sbmcoKSksXHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0aXR1ZGU6IGJveC5nZXRDZW50ZXIoKS5sYXQoKSwgbG9uZ2l0dWRlOiBib3guZ2V0Q2VudGVyKCkubG5nKCkgfSxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRab29tKCk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLmdldFpvb20oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy4gVGhpcyBwcm9taXNlIHJlc29sdmVzIHRvIG51bGxcclxuICAgICAqIGlmIHRoZSBnb2UgY29vcmRpbmF0ZXMgYXJlIG5vdCBpbiB0aGUgdmlldyBwb3J0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgbGV0IGNyb3NzZXNEYXRlTGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBwID0gbS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGgucG93KDIsIG0uZ2V0Wm9vbSgpKTtcclxuICAgICAgICAgICAgY29uc3QgYjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzID0gbS5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgaWYgKGIuZ2V0Q2VudGVyKCkubG5nKCkgPCBiLmdldFNvdXRoV2VzdCgpLmxuZygpICB8fFxyXG4gICAgICAgICAgICAgICAgYi5nZXRDZW50ZXIoKS5sbmcoKSA+IGIuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpIHsgY3Jvc3Nlc0RhdGVMaW5lID0gdHJ1ZTsgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFk6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXROb3J0aEVhc3QoKSkueTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WDogbnVtYmVyID0gcC5mcm9tTGF0TG5nVG9Qb2ludChiLmdldFNvdXRoV2VzdCgpKS54O1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludDogR29vZ2xlTWFwVHlwZXMuUG9pbnQgPSBwLmZyb21MYXRMbmdUb1BvaW50KGwpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigocG9pbnQueCAtIG9mZnNldFggKyAoKGNyb3NzZXNEYXRlTGluZSAmJiBwb2ludC54IDwgb2Zmc2V0WCkgPyAyNTYgOiAwKSkgKiBzKSxcclxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoKHBvaW50LnkgLSBvZmZzZXRZKSAqIHMpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uc1RvUG9pbnRzKGxvY3M6IEFycmF5PElMYXRMb25nPik6IFByb21pc2U8QXJyYXk8SVBvaW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgcCA9IG0uZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnBvdygyLCBtLmdldFpvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIGlmIChiLmdldENlbnRlcigpLmxuZygpIDwgYi5nZXRTb3V0aFdlc3QoKS5sbmcoKSAgfHxcclxuICAgICAgICAgICAgICAgIGIuZ2V0Q2VudGVyKCkubG5nKCkgPiBiLmdldE5vcnRoRWFzdCgpLmxuZygpKSB7IGNyb3NzZXNEYXRlTGluZSA9IHRydWU7IH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFg6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXRTb3V0aFdlc3QoKSkueDtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WTogbnVtYmVyID0gcC5mcm9tTGF0TG5nVG9Qb2ludChiLmdldE5vcnRoRWFzdCgpKS55O1xyXG4gICAgICAgICAgICBjb25zdCBsID0gbG9jcy5tYXAobGwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbDE6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50OiBHb29nbGVNYXBUeXBlcy5Qb2ludCA9IHAuZnJvbUxhdExuZ1RvUG9pbnQobDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKChwb2ludC54IC0gb2Zmc2V0WCArICgoY3Jvc3Nlc0RhdGVMaW5lICYmIHBvaW50LnggPCBvZmZzZXRYKSA/IDI1NiA6IDApKSAqIHMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoKHBvaW50LnkgLSBvZmZzZXRZKSAqIHMpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDZW50ZXJzIHRoZSBtYXAgb24gYSBnZW8gbG9jYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlb0Nvb3JkaW5hdGVzIGFyb3VuZCB3aGljaCB0byBjZW50ZXIgdGhlIG1hcC4gU2VlIHtAbGluayBJTGF0TG9uZ31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgY2VudGVyIG9wZXJhdGlvbnMgaGFzIGJlZW4gY29tcGxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRDZW50ZXIobGF0TG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRMbmcpO1xyXG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGNlbnRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnZW5lcmljIG1hcCBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBtLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aWV3IG9wdGlvbnMgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYm91bmRzKSB7XHJcbiAgICAgICAgICAgICAgICBtLmZpdEJvdW5kcyhHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVCb3VuZHMob3B0aW9ucy5ib3VuZHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgbS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB6b29tIC0gWm9vbSBsZXZlbCB0byBzZXQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgem9vbSBvcGVyYXRpb24gaXMgY29tcGxldGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLnNldFpvb20oem9vbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBldmVudCBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcmV0dXJucyAtIEFuIG9ic2VydmFibGUgb2YgdHlwZSBFIHRoYXQgZmlyZXMgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPiB7XHJcbiAgICAgICAgY29uc3QgZ29vZ2xlRXZlbnROYW1lOiBzdHJpbmcgPSBHb29nbGVNYXBFdmVudHNMb29rdXBbZXZlbnROYW1lXTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGdvb2dsZUV2ZW50TmFtZSwgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gRXZlbnQgdG8gdHJpZ2dlci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFRyaWdnZXJNYXBFdmVudChldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobSkgPT4gZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtLCBldmVudE5hbWUsIG51bGwpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19