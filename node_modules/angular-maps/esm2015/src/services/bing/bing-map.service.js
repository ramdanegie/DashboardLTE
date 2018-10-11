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
export class BingMapService {
    /**
     * Creates an instance of BingMapService.
     * \@memberof BingMapService
     * @param {?} _loader MapAPILoader instance implemented for Bing Maps. This instance will generally be injected.
     * @param {?} _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._modules = new Map();
        this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    /**
     * Gets an array of loaded Bong modules.
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get LoadedModules() { return this._modules; }
    /**
     * Gets the Bing Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get MapInstance() { return this._mapInstance; }
    /**
     * Gets a Promise for a Bing Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get MapPromise() { return this._map; }
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof BingMapService
     * @return {?}
     */
    get MapSize() {
        if (this.MapInstance) {
            const /** @type {?} */ s = { width: this.MapInstance.getWidth(), height: this.MapInstance.getHeight() };
            return s;
        }
        return null;
    }
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    CreateCanvasOverlay(drawCallback) {
        return this._map.then((map) => {
            const /** @type {?} */ overlay = new BingCanvasOverlay(drawCallback);
            map.layers.insert(overlay);
            return overlay;
        });
    }
    /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    CreateClusterLayer(options) {
        return this._map.then((map) => {
            const /** @type {?} */ p = new Promise(resolve => {
                this.LoadModule('Microsoft.Maps.Clustering', () => {
                    const /** @type {?} */ o = BingConversions.TranslateClusterOptions(options);
                    const /** @type {?} */ layer = new Microsoft.Maps.ClusterLayer(new Array(), o);
                    let /** @type {?} */ bl;
                    map.layers.insert(layer);
                    bl = new BingClusterLayer(layer, this);
                    bl.SetOptions(options);
                    resolve(bl);
                });
            });
            return p;
        });
    }
    /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    CreateInfoWindow(options) {
        return this._map.then((map) => {
            let /** @type {?} */ loc;
            if (options.position == null) {
                loc = map.getCenter();
            }
            else {
                loc = new Microsoft.Maps.Location(options.position.latitude, options.position.longitude);
            }
            const /** @type {?} */ infoBox = new Microsoft.Maps.Infobox(loc, BingConversions.TranslateInfoBoxOptions(options));
            infoBox.setMap(map);
            return new BingInfoWindow(infoBox);
        });
    }
    /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    CreateLayer(options) {
        return this._map.then((map) => {
            const /** @type {?} */ layer = new Microsoft.Maps.Layer(options.id.toString());
            map.layers.insert(layer);
            return new BingLayer(layer, this);
        });
    }
    /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    CreateMap(el, mapOptions) {
        return this._loader.Load().then(() => {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // map startup...
            if (this._mapInstance != null) {
                this.DisposeMap();
            }
            const /** @type {?} */ o = BingConversions.TranslateLoadOptions(mapOptions);
            if (!o.credentials) {
                o.credentials = this._config.apiKey;
            }
            const /** @type {?} */ map = new Microsoft.Maps.Map(el, o);
            this._mapInstance = map;
            this._mapResolver(map);
        });
    }
    /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    CreateMarker(options = /** @type {?} */ ({})) {
        const /** @type {?} */ payload = (icon, map) => {
            const /** @type {?} */ loc = BingConversions.TranslateLocation(options.position);
            const /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            const /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
            const /** @type {?} */ marker = new BingMarker(pushpin, map, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => marker.Metadata.set(k, v));
            }
            map.entities.push(pushpin);
            return marker;
        };
        return this._map.then((map) => {
            if (options.iconInfo && options.iconInfo.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, map));
                }
                else {
                    return s.then(x => {
                        return (payload(x.icon, map));
                    });
                }
            }
            else {
                return (payload(null, map));
            }
        });
    }
    /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    CreatePolygon(options) {
        return this._map.then((map) => {
            const /** @type {?} */ locs = BingConversions.TranslatePaths(options.paths);
            const /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
            const /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, o);
            map.entities.push(poly);
            const /** @type {?} */ p = new BingPolygon(poly, this, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => p.Metadata.set(k, v));
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
    }
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
    CreatePolyline(options) {
        let /** @type {?} */ polyline;
        return this._map.then((map) => {
            const /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
            const /** @type {?} */ locs = BingConversions.TranslatePaths(options.path);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                map.entities.push(polyline);
                const /** @type {?} */ pl = new BingPolyline(polyline, map, null);
                if (options.metadata) {
                    options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
                }
                if (options.title && options.title !== '') {
                    pl.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl.ShowTooltip = options.showTooltip;
                }
                return pl;
            }
            else {
                const /** @type {?} */ lines = new Array();
                locs.forEach(p => {
                    polyline = new Microsoft.Maps.Polyline(p, o);
                    map.entities.push(polyline);
                    const /** @type {?} */ pl = new BingPolyline(polyline, map, null);
                    if (options.metadata) {
                        options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines.push(pl);
                });
                return lines;
            }
        });
    }
    /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        return this._map.then((map) => {
            map.layers.remove(layer.NativePrimitve);
        });
    }
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    DisposeMap() {
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance.dispose();
            this._mapInstance = null;
            this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        }
    }
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GetCenter() {
        return this._map.then((map) => {
            const /** @type {?} */ center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.latitude,
                longitude: center.longitude
            });
        });
    }
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    GetBounds() {
        return this._map.then((map) => {
            const /** @type {?} */ box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorth(),
                maxLongitude: box.crossesInternationalDateLine() ? box.getWest() : box.getEast(),
                minLatitude: box.getSouth(),
                minLongitude: box.crossesInternationalDateLine() ? box.getEast() : box.getWest(),
                center: { latitude: box.center.latitude, longitude: box.center.longitude },
                padding: 0
            });
        });
    }
    /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    GetDrawingTools(useSharedInstance = true) {
        return new Promise((resolve, reject) => {
            this.LoadModuleInstance('Microsoft.Maps.DrawingTools', useSharedInstance).then((o) => {
                resolve(o);
            });
        });
    }
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GetZoom() {
        return this._map.then((map) => map.getZoom());
    }
    /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    LoadModule(moduleName, callback) {
        if (this._modules.has(moduleName)) {
            callback();
        }
        else {
            Microsoft.Maps.loadModule(moduleName, () => {
                this._modules.set(moduleName, null);
                callback();
            });
        }
    }
    /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    LoadModuleInstance(moduleName, useSharedInstance = true) {
        const /** @type {?} */ s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
        if (this._modules.has(moduleName)) {
            let /** @type {?} */ o = null;
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
            return new Promise((resolve, reject) => {
                try {
                    Microsoft.Maps.loadModule(moduleName, () => {
                        const /** @type {?} */ o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                        if (useSharedInstance) {
                            this._modules.set(moduleName, o);
                        }
                        else {
                            this._modules.set(moduleName, null);
                        }
                        resolve(o);
                    });
                }
                catch (/** @type {?} */ e) {
                    reject('Could not load module or create instance.');
                }
            });
        }
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    LocationToPoint(loc) {
        return this._map.then((m) => {
            const /** @type {?} */ l = BingConversions.TranslateLocation(loc);
            const /** @type {?} */ p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            if (p != null) {
                return { x: p.x, y: p.y };
            }
            return null;
        });
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    LocationsToPoints(locs) {
        return this._map.then((m) => {
            const /** @type {?} */ l = locs.map(loc => BingConversions.TranslateLocation(loc));
            const /** @type {?} */ p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            return p ? p : new Array();
        });
    }
    /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    SetCenter(latLng) {
        return this._map.then((map) => map.setView({
            center: BingConversions.TranslateLocation(latLng)
        }));
    }
    /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetMapOptions(options) {
        this._map.then((m) => {
            const /** @type {?} */ o = BingConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetViewOptions(options) {
        this._map.then((m) => {
            const /** @type {?} */ o = BingConversions.TranslateViewOptions(options);
            m.setView(o);
        });
    }
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    SetZoom(zoom) {
        return this._map.then((map) => map.setView({
            zoom: zoom
        }));
    }
    /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    SubscribeToMapEvent(eventName) {
        const /** @type {?} */ eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._map.then((m) => {
                Microsoft.Maps.Events.addHandler(m, eventNameTranslated, (e) => {
                    this._zone.run(() => observer.next(e));
                });
            });
        });
    }
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    TriggerMapEvent(eventName) {
        return this._map.then((m) => Microsoft.Maps.Events.invoke(m, eventName, null));
    }
}
BingMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapService.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBWSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQWUxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBUTNFLE1BQU07Ozs7Ozs7O0lBaUVGLFlBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFB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ci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XHJcbmltcG9ydCB7IEJpbmdNYXBBUElMb2FkZXIsIEJpbmdNYXBBUElMb2FkZXJDb25maWcgfSBmcm9tICcuL2JpbmctbWFwLmFwaS1sb2FkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4vYmluZy1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IEJpbmdMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbGF5ZXInO1xyXG5pbXBvcnQgeyBCaW5nQ2x1c3RlckxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jbHVzdGVyLWxheWVyJztcclxuaW1wb3J0IHsgQmluZ0luZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93JztcclxuaW1wb3J0IHsgQmluZ1BvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBCaW5nUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldyB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbGFiZWwnO1xyXG5pbXBvcnQgeyBNaXhpbkNhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgQmluZ0NhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSVNpemUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lzaXplJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pYm94JztcclxuXHJcbmltcG9ydCB7IEJpbmdNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWV2ZW50cy1sb29rdXAnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXBTZXJ2aWNlIGFic3RyYWN0IGltcGxlbWVudGluZyBhIEJpbiBNYXAgVjggcHJvdmlkZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ01hcFNlcnZpY2UgaW1wbGVtZW50cyBNYXBTZXJ2aWNlIHtcclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIERlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD47XHJcbiAgICBwcml2YXRlIF9tYXBJbnN0YW5jZTogTWljcm9zb2Z0Lk1hcHMuTWFwO1xyXG4gICAgcHJpdmF0ZSBfbWFwUmVzb2x2ZXI6ICh2YWx1ZT86IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQmluZ01hcEFQSUxvYWRlckNvbmZpZztcclxuICAgIHByaXZhdGUgX21vZHVsZXM6IE1hcDxzdHJpbmcsIE9iamVjdD4gPSBuZXcgTWFwPHN0cmluZywgT2JqZWN0PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IERlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gYXJyYXkgb2YgbG9hZGVkIEJvbmcgbW9kdWxlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExvYWRlZE1vZHVsZXMoKTogTWFwPHN0cmluZywgT2JqZWN0PiB7IHJldHVybiB0aGlzLl9tb2R1bGVzOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBCaW5nIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBJbnN0YW5jZSgpOiBNaWNyb3NvZnQuTWFwcy5NYXAgeyByZXR1cm4gdGhpcy5fbWFwSW5zdGFuY2U7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBQcm9taXNlIGZvciBhIEJpbmcgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb24uIFVzZSB0aGlzIGluc3RlYWQgb2Yge0BsaW5rIE1hcEluc3RhbmNlfSBpZiB5b3VcclxuICAgICAqIGFyZSBub3Qgc3VyZSBpZiBhbmQgd2hlbiB0aGUgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBQcm9taXNlKCk6IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPiB7IHJldHVybiB0aGlzLl9tYXA7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcHMgcGh5c2ljYWwgc2l6ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWFwU2l6ZSgpOiBJU2l6ZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuTWFwSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgY29uc3QgczogSVNpemUgPSB7IHdpZHRoOiB0aGlzLk1hcEluc3RhbmNlLmdldFdpZHRoKCksIGhlaWdodDogdGhpcy5NYXBJbnN0YW5jZS5nZXRIZWlnaHQoKSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbG9hZGVyIE1hcEFQSUxvYWRlciBpbnN0YW5jZSBpbXBsZW1lbnRlZCBmb3IgQmluZyBNYXBzLiBUaGlzIGluc3RhbmNlIHdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIE5nWm9uZSBvYmplY3QgdG8gZW5hYmxlIHpvbmUgYXdhcmUgcHJvbWlzZXMuIFRoaXMgd2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvYWRlcjogTWFwQVBJTG9hZGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+KChyZXNvbHZlOiAoKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gKDxCaW5nTWFwQVBJTG9hZGVyPnRoaXMuX2xvYWRlcikuQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2FudmFzIG92ZXJsYXkgbGF5ZXIgdG8gcGVyZm9ybSBjdXN0b20gZHJhd2luZyBvdmVyIHRoZSBtYXAgd2l0aCBvdXRcclxuICAgICAqIHNvbWUgb2YgdGhlIG92ZXJoZWFkIGFzc29jaWF0ZWQgd2l0aCBnb2luZyB0aHJvdWdoIHRoZSBNYXAgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcclxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBDYW52YXNPdmVybGF5fSBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNhbnZhc092ZXJsYXkoZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZCk6IFByb21pc2U8Q2FudmFzT3ZlcmxheT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheTogQmluZ0NhbnZhc092ZXJsYXkgPSBuZXcgQmluZ0NhbnZhc092ZXJsYXkoZHJhd0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgbWFwLmxheWVycy5pbnNlcnQob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdmVybGF5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEJpbmcgbWFwIGNsdXN0ZXIgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElDbHVzdGVyT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9uczogSUNsdXN0ZXJPcHRpb25zKTogUHJvbWlzZTxMYXllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSBuZXcgUHJvbWlzZTxMYXllcj4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRNb2R1bGUoJ01pY3Jvc29mdC5NYXBzLkNsdXN0ZXJpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQ2x1c3Rlck9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIobmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+KCksIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBibDogQmluZ0NsdXN0ZXJMYXllcjtcclxuICAgICAgICAgICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmwgPSBuZXcgQmluZ0NsdXN0ZXJMYXllcihsYXllciwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmwuU2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluZm9ybWF0aW9uIHdpbmRvdyBmb3IgYSBtYXAgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW29wdGlvbnNdIC0gSW5mb3dpbmRvdyBvcHRpb25zLiBTZWUge0BsaW5rIElJbmZvV2luZG93T3B0aW9uc31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBJbmZvV2luZG93fSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5JbmZvYm94IG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUluZm9XaW5kb3cob3B0aW9ucz86IElJbmZvV2luZG93T3B0aW9ucyk6IFByb21pc2U8SW5mb1dpbmRvdz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgbGV0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb247XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBvc2l0aW9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxvYyA9IG1hcC5nZXRDZW50ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvYyA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uLmxhdGl0dWRlLCBvcHRpb25zLnBvc2l0aW9uLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5mb0JveDogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5JbmZvYm94KGxvYywgQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUluZm9Cb3hPcHRpb25zKG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgaW5mb0JveC5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaW5nSW5mb1dpbmRvdyhpbmZvQm94KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElMYXllck9wdGlvbnN9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkxheWVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIob3B0aW9ucy5pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgbWFwLmxheWVycy5pbnNlcnQobGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmdMYXllcihsYXllciwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsIC0gSFRNTCBlbGVtZW50IHRvIGhvc3QgdGhlIG1hcC5cclxuICAgICAqIEBwYXJhbSBtYXBPcHRpb25zIC0gTWFwIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcCBoYXMgYmVlbiBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFwKGVsOiBIVE1MRWxlbWVudCwgbWFwT3B0aW9uczogSU1hcE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLkxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gYXBwbHkgbWl4aW5zXHJcbiAgICAgICAgICAgIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKTtcclxuICAgICAgICAgICAgTWl4aW5DYW52YXNPdmVybGF5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBtYXAgc3RhcnR1cC4uLlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwb3NlTWFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSU1hcExvYWRPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvYWRPcHRpb25zKG1hcE9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoIW8uY3JlZGVudGlhbHMpIHtcclxuICAgICAgICAgICAgICAgIG8uY3JlZGVudGlhbHMgPSB0aGlzLl9jb25maWcuYXBpS2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5NYXAoZWwsIG8pO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJbnN0YW5jZSA9IG1hcDtcclxuICAgICAgICAgICAgdGhpcy5fbWFwUmVzb2x2ZXIobWFwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBCaW5nIG1hcCBtYXJrZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9ucz08SU1hcmtlck9wdGlvbnM+e31dIC0gT3B0aW9ucyBmb3IgdGhlIG1hcmtlci4gU2VlIHtAbGluayBJTWFya2VyT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTWFya2VyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5QdXNoUGluIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihvcHRpb25zOiBJTWFya2VyT3B0aW9ucyA9IDxJTWFya2VyT3B0aW9ucz57fSk6IFByb21pc2U8TWFya2VyPiB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKTogQmluZ01hcmtlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJykgeyBvLmljb24gPSBpY29uOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IHB1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MsIG8pO1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXI6IEJpbmdNYXJrZXIgPSBuZXcgQmluZ01hcmtlcihwdXNocGluLCBtYXAsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IG1hcmtlci5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHB1c2hwaW4pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAocykgPT09ICdzdHJpbmcnKSB7IHJldHVybiAocGF5bG9hZChzLCBtYXApKTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChwYXlsb2FkKHguaWNvbiwgbWFwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBheWxvYWQobnVsbCwgbWFwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwb2x5Z29uIHdpdGhpbiB0aGUgQmluZyBNYXBzIFY4IG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5Z29uLiBTZWUge0BsaW5rIElQb2x5Z29uT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWdvbn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24ob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aHMpO1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbihsb2NzLCBvKTtcclxuICAgICAgICAgICAgbWFwLmVudGl0aWVzLnB1c2gocG9seSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwID0gbmV3IEJpbmdQb2x5Z29uKHBvbHksIHRoaXMsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHAuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGFiZWwgIT0gbnVsbCkgeyBwLlNob3dMYWJlbCA9IG9wdGlvbnMuc2hvd0xhYmVsOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNYXhab29tICE9IG51bGwpIHsgcC5MYWJlbE1heFpvb20gPSBvcHRpb25zLmxhYmVsTWF4Wm9vbTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1pblpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWluWm9vbSA9IG9wdGlvbnMubGFiZWxNaW5ab29tOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVkaXRhYmxlKSB7IHAuU2V0RWRpdGFibGUob3B0aW9ucy5lZGl0YWJsZSk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcG9seWxpbmUgd2l0aGluIHRoZSBCaW5nIE1hcHMgVjggbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlsaW5lLiBTZWUge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlsaW5lfSBvYmplY3QgKG9yIGFuIGFycmF5IHRoZXJlb2YgZm9yIGNvbXBsZXggcGF0aHMpLFxyXG4gICAgICogd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZSB8IEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIGxldCBwb2x5bGluZTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGgpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aFswXSkpIHtcclxuICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKGxvY3NbMF0sIG8pO1xyXG4gICAgICAgICAgICAgICAgbWFwLmVudGl0aWVzLnB1c2gocG9seWxpbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBsID0gbmV3IEJpbmdQb2x5bGluZShwb2x5bGluZSwgbWFwLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcGwuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcGwuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBsLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcclxuICAgICAgICAgICAgICAgIGxvY3MuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShwLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5bGluZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsID0gbmV3IEJpbmdQb2x5bGluZShwb2x5bGluZSwgbWFwLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBsLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBsLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocGwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBsYXllciBmcm9tIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTGF5ZXIgdG8gZGVsZXRlLiBTZWUge0BsaW5rIExheWVyfS4gVGhpcyBtZXRob2QgZXhwZWN0cyB0aGUgQmluZyBzcGVjaWZpYyBMYXllciBtb2RlbCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIHdoZW4gdGhlIGxheWVyIGhhcyBiZWVuIHJlbW92ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVMYXllcihsYXllcjogTGF5ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcC5sYXllcnMucmVtb3ZlKGxheWVyLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEaXNwb3NlTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCAmJiB0aGlzLl9tYXBJbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcEluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHsgdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBjZW50ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgZ29lIGxvY2F0aW9uIG9mIHRoZSBjZW50ZXIuIFNlZSB7QGxpbmsgSUxhdExvbmd9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q2VudGVyKCk6IFByb21pc2U8SUxhdExvbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxJTGF0TG9uZz57XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogY2VudGVyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjZW50ZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBib3VuZGluZyBib3hcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgZ29lIGxvY2F0aW9uIG9mIHRoZSBib3VuZGluZyBib3guIFNlZSB7QGxpbmsgSUJveH0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRCb3VuZHMoKTogUHJvbWlzZTxJQm94PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib3ggPSBtYXAuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8SUJveD57XHJcbiAgICAgICAgICAgICAgICBtYXhMYXRpdHVkZTogYm94LmdldE5vcnRoKCksXHJcbiAgICAgICAgICAgICAgICBtYXhMb25naXR1ZGU6IGJveC5jcm9zc2VzSW50ZXJuYXRpb25hbERhdGVMaW5lKCkgPyBib3guZ2V0V2VzdCgpIDogYm94LmdldEVhc3QoKSxcclxuICAgICAgICAgICAgICAgIG1pbkxhdGl0dWRlOiBib3guZ2V0U291dGgoKSxcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZTogYm94LmNyb3NzZXNJbnRlcm5hdGlvbmFsRGF0ZUxpbmUoKSA/IGJveC5nZXRFYXN0KCkgOiBib3guZ2V0V2VzdCgpLFxyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdGl0dWRlOiBib3guY2VudGVyLmxhdGl0dWRlLCBsb25naXR1ZGU6IGJveC5jZW50ZXIubG9uZ2l0dWRlIH0sXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgc2hhcmVkIG9yIHByaXZhdGUgaW5zdGFuY2Ugb2YgdGhlIG1hcCBkcmF3aW5nIHRvb2xzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbdXNlU2hhcmVkSW5zdGFuY2U9dHJ1ZV0gLSBTZXQgdG8gZmFsc2UgdG8gY3JlYXRlIGEgcHJpdmF0ZSBpbnN0YW5jZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnN0IGFuIGluc3RhbmNlIG9mIHRoZSBkcmF3aW5nIHRvb2xzLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXREcmF3aW5nVG9vbHMgKHVzZVNoYXJlZEluc3RhbmNlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLkRyYXdpbmdUb29scz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRNb2R1bGVJbnN0YW5jZSgnTWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzJywgdXNlU2hhcmVkSW5zdGFuY2UpLnRoZW4oKG86IE1pY3Jvc29mdC5NYXBzLkRyYXdpbmdUb29scykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgem9vbSBsZXZlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFpvb20oKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiBtYXAuZ2V0Wm9vbSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgbW9kdWxlIGludG8gdGhlIE1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbW9kdWxlTmFtZSAtIFRoZSBtb2R1bGUgdG8gbG9hZC5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIENhbGxiYWNrIHRvIGNhbGwgb25jZSBsb2FkaW5nIGlzIGNvbXBsZXRlLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2FkTW9kdWxlKG1vZHVsZU5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW9kdWxlcy5oYXMobW9kdWxlTmFtZSkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLmxvYWRNb2R1bGUobW9kdWxlTmFtZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIG1vZHVsZSBpbnRvIHRoZSBNYXAgYW5kIGRlbGl2ZXJzIGFuZCBpbnN0YW5jZSBvZiB0aGUgbW9kdWxlIHBheWxvYWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1vZHVsZU5hbWUgLSBUaGUgbW9kdWxlIHRvIGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gdXNlU2hhcmVkSW5zdGFuY2UtIFVzZSBhIHNoYXJlZCBpbnN0YW5jZSBpZiB0cnVlLCBjcmVhdGUgYSBuZXcgaW5zdGFuY2UgaWYgZmFsc2UuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWRNb2R1bGVJbnN0YW5jZShtb2R1bGVOYW1lOiBzdHJpbmcsIHVzZVNoYXJlZEluc3RhbmNlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3Qgczogc3RyaW5nID0gbW9kdWxlTmFtZS5zdWJzdHIobW9kdWxlTmFtZS5sYXN0SW5kZXhPZignLicpICsgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZHVsZXMuaGFzKG1vZHVsZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIGxldCBvOiBhbnkgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIXVzZVNoYXJlZEluc3RhbmNlKSAge1xyXG4gICAgICAgICAgICAgICAgbyA9IG5ldyAoPGFueT5NaWNyb3NvZnQuTWFwcylbc10odGhpcy5fbWFwSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX21vZHVsZXMuZ2V0KG1vZHVsZU5hbWUpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLl9tb2R1bGVzLmdldChtb2R1bGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG8gPSBuZXcgKDxhbnk+TWljcm9zb2Z0Lk1hcHMpW3NdKHRoaXMuX21hcEluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8T2JqZWN0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMubG9hZE1vZHVsZShtb2R1bGVOYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbyA9IG5ldyAoPGFueT5NaWNyb3NvZnQuTWFwcylbc10odGhpcy5fbWFwSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VTaGFyZWRJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG8pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdDb3VsZCBub3QgbG9hZCBtb2R1bGUgb3IgY3JlYXRlIGluc3RhbmNlLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy4gVGhpcyBwcm9taXNlIHJlc29sdmVzIHRvIG51bGxcclxuICAgICAqIGlmIHRoZSBnb2UgY29vcmRpbmF0ZXMgYXJlIG5vdCBpbiB0aGUgdmlldyBwb3J0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BvaW50KGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGw6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID0gPE1pY3Jvc29mdC5NYXBzLlBvaW50Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKGwsIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG4gICAgICAgICAgICBpZiAocCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBwLngsIHk6IHAueSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjb252ZXJzaW9uIG9mIGdlbyBjb29yZGluYXRlcyB0byBwaXhlbHMgb24gdGhlIG1hcCBjb250cm9sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhbiB7QGxpbmsgSVBvaW50fSBpbnRlcmZhY2UgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBwaXhlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvbnNUb1BvaW50cyhsb2NzOiBBcnJheTxJTGF0TG9uZz4pOiBQcm9taXNlPEFycmF5PElQb2ludD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsID0gbG9jcy5tYXAobG9jID0+IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsb2MpKTtcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+ID0gPEFycmF5PE1pY3Jvc29mdC5NYXBzLlBvaW50Pj5tLnRyeUxvY2F0aW9uVG9QaXhlbChsLFxyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwID8gcCA6IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDZW50ZXJzIHRoZSBtYXAgb24gYSBnZW8gbG9jYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlb0Nvb3JkaW5hdGVzIGFyb3VuZCB3aGljaCB0byBjZW50ZXIgdGhlIG1hcC4gU2VlIHtAbGluayBJTGF0TG9uZ31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgY2VudGVyIG9wZXJhdGlvbnMgaGFzIGJlZW4gY29tcGxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0Q2VudGVyKGxhdExuZzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiBtYXAuc2V0Vmlldyh7XHJcbiAgICAgICAgICAgIGNlbnRlcjogQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxhdExuZylcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnZW5lcmljIG1hcCBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBtLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aWV3IG9wdGlvbnMgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0Vmlld09wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklWaWV3T3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVWaWV3T3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgbS5zZXRWaWV3KG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB6b29tIC0gWm9vbSBsZXZlbCB0byBzZXQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgem9vbSBvcGVyYXRpb24gaXMgY29tcGxldGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRab29tKHpvb206IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5zZXRWaWV3KHtcclxuICAgICAgICAgICAgem9vbTogem9vbVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoZS5nLiAnY2xpY2snKVxyXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHRweWUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN1YnNjcmliZVRvTWFwRXZlbnQ8RT4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEU+IHtcclxuICAgICAgICBjb25zdCBldmVudE5hbWVUcmFuc2xhdGVkID0gQmluZ01hcEV2ZW50c0xvb2t1cFtldmVudE5hbWVdO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEU+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sIGV2ZW50TmFtZVRyYW5zbGF0ZWQsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVHJpZ2dlck1hcEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtKSA9PiBNaWNyb3NvZnQuTWFwcy5FdmVudHMuaW52b2tlKG0sIGV2ZW50TmFtZSwgbnVsbCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=