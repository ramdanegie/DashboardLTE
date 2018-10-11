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
export class GoogleMapService {
    /**
     * Creates an instance of GoogleMapService.
     * \@memberof GoogleMapService
     * @param {?} _loader MapAPILoader instance implemented for Google Maps. This instance will generally be injected.
     * @param {?} _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    /**
     * Gets the Google Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof GoogleMapService
     * @return {?}
     */
    get MapInstance() { return this._mapInstance; }
    /**
     * Gets a Promise for a Google Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof GoogleMapService
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
            const /** @type {?} */ el = this.MapInstance.getDiv();
            const /** @type {?} */ s = { width: el.offsetWidth, height: el.offsetHeight };
            return s;
        }
        return null;
    }
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    CreateCanvasOverlay(drawCallback) {
        return this._map.then((map) => {
            const /** @type {?} */ overlay = new GoogleCanvasOverlay(drawCallback);
            overlay.SetMap(map);
            return overlay;
        });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    CreateClusterLayer(options) {
        return this._map.then((map) => {
            let /** @type {?} */ updateOptions = false;
            const /** @type {?} */ markerClusterer = new MarkerClusterer(map, [], options);
            const /** @type {?} */ clusterLayer = new GoogleMarkerClusterer(markerClusterer);
            const /** @type {?} */ o = {
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
    }
    /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    CreateInfoWindow(options) {
        return this._map.then((map) => {
            const /** @type {?} */ o = GoogleConversions.TranslateInfoWindowOptions(options);
            const /** @type {?} */ infoWindow = new google.maps.InfoWindow(o);
            return new GoogleInfoWindow(infoWindow, this);
        });
    }
    /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    CreateLayer(options) {
        return this._map.then((map) => {
            return new GoogleLayer(map, this, options.id);
        });
    }
    /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
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
            // execute map startup
            if (!mapOptions.mapTypeId == null) {
                mapOptions.mapTypeId = MapTypeId.hybrid;
            }
            if (this._mapInstance != null) {
                this.DisposeMap();
            }
            const /** @type {?} */ o = GoogleConversions.TranslateOptions(mapOptions);
            const /** @type {?} */ map = new google.maps.Map(el, o);
            if (mapOptions.bounds) {
                map.fitBounds(GoogleConversions.TranslateBounds(mapOptions.bounds));
            }
            this._mapInstance = map;
            this._mapResolver(map);
            return;
        });
    }
    /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    CreateMarker(options = /** @type {?} */ ({})) {
        const /** @type {?} */ payload = (x, map) => {
            const /** @type {?} */ marker = new google.maps.Marker(x);
            const /** @type {?} */ m = new GoogleMarker(marker);
            m.IsFirst = options.isFirst;
            m.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach((val, key) => m.Metadata.set(key, val));
            }
            marker.setMap(map);
            return m;
        };
        return this._map.then((map) => {
            const /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o, map);
                }
                else {
                    return s.then(x => {
                        o.icon = x.icon;
                        return payload(o, map);
                    });
                }
            }
            else {
                return payload(o, map);
            }
        });
    }
    /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    CreatePolygon(options) {
        return this._map.then((map) => {
            const /** @type {?} */ o = GoogleConversions.TranslatePolygonOptions(options);
            const /** @type {?} */ polygon = new google.maps.Polygon(o);
            polygon.setMap(map);
            const /** @type {?} */ p = new GooglePolygon(polygon);
            if (options.metadata) {
                options.metadata.forEach((val, key) => p.Metadata.set(key, val));
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
    }
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
    CreatePolyline(options) {
        let /** @type {?} */ polyline;
        return this._map.then((map) => {
            const /** @type {?} */ o = GoogleConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                o.path = GoogleConversions.TranslatePaths(options.path)[0];
                polyline = new google.maps.Polyline(o);
                polyline.setMap(map);
                const /** @type {?} */ pl = new GooglePolyline(polyline);
                if (options.metadata) {
                    options.metadata.forEach((val, key) => pl.Metadata.set(key, val));
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
                const /** @type {?} */ paths = GoogleConversions.TranslatePaths(options.path);
                const /** @type {?} */ lines = new Array();
                paths.forEach(p => {
                    o.path = p;
                    polyline = new google.maps.Polyline(o);
                    polyline.setMap(map);
                    const /** @type {?} */ pl = new GooglePolyline(polyline);
                    if (options.metadata) {
                        options.metadata.forEach((val, key) => pl.Metadata.set(key, val));
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
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        // return resolved promise as there is no conept of a custom layer in Google.
        return Promise.resolve();
    }
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    DisposeMap() {
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance = null;
            this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        }
    }
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GetCenter() {
        return this._map.then((map) => {
            const /** @type {?} */ center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.lat(),
                longitude: center.lng()
            });
        });
    }
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    GetBounds() {
        return this._map.then((map) => {
            const /** @type {?} */ box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorthEast().lat(),
                maxLongitude: Math.max(box.getNorthEast().lng(), box.getSouthWest().lng()),
                minLatitude: box.getSouthWest().lat(),
                minLongitude: Math.min(box.getNorthEast().lng(), box.getSouthWest().lng()),
                center: { latitude: box.getCenter().lat(), longitude: box.getCenter().lng() },
                padding: 0
            });
        });
    }
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GetZoom() {
        return this._map.then((map) => map.getZoom());
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    LocationToPoint(loc) {
        return this._map.then((m) => {
            let /** @type {?} */ crossesDateLine = false;
            const /** @type {?} */ l = GoogleConversions.TranslateLocationObject(loc);
            const /** @type {?} */ p = m.getProjection();
            const /** @type {?} */ s = Math.pow(2, m.getZoom());
            const /** @type {?} */ b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            const /** @type {?} */ offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            const /** @type {?} */ offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            const /** @type {?} */ point = p.fromLatLngToPoint(l);
            return {
                x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                y: Math.floor((point.y - offsetY) * s)
            };
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
            let /** @type {?} */ crossesDateLine = false;
            const /** @type {?} */ p = m.getProjection();
            const /** @type {?} */ s = Math.pow(2, m.getZoom());
            const /** @type {?} */ b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            const /** @type {?} */ offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            const /** @type {?} */ offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            const /** @type {?} */ l = locs.map(ll => {
                const /** @type {?} */ l1 = GoogleConversions.TranslateLocationObject(ll);
                const /** @type {?} */ point = p.fromLatLngToPoint(l1);
                return {
                    x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                    y: Math.floor((point.y - offsetY) * s)
                };
            });
            return l;
        });
    }
    /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    SetCenter(latLng) {
        return this._map.then((map) => {
            const /** @type {?} */ center = GoogleConversions.TranslateLocationObject(latLng);
            map.setCenter(center);
        });
    }
    /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetMapOptions(options) {
        this._map.then((m) => {
            const /** @type {?} */ o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetViewOptions(options) {
        this._map.then((m) => {
            if (options.bounds) {
                m.fitBounds(GoogleConversions.TranslateBounds(options.bounds));
            }
            const /** @type {?} */ o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    SetZoom(zoom) {
        return this._map.then((map) => map.setZoom(zoom));
    }
    /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    SubscribeToMapEvent(eventName) {
        const /** @type {?} */ googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._map.then((m) => {
                m.addListener(googleEventName, (e) => {
                    this._zone.run(() => observer.next(e));
                });
            });
        });
    }
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    TriggerMapEvent(eventName) {
        return this._map.then((m) => google.maps.event.trigger(m, eventName, null));
    }
}
GoogleMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapService.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFJaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFZakYsTUFBTTs7Ozs7Ozs7SUEyREYsWUFB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IjpbImltcG9ydCB7IEdvb2dsZU1hcmtlckNsdXN0ZXJlciB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXInO1xyXG5pbXBvcnQgeyBHb29nbGVJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwQVBJTG9hZGVyLCBHb29nbGVNYXBBUElMb2FkZXJDb25maWcgfSBmcm9tICcuL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFwLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcC10eXBlLWlkJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldyB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWxhYmVsJztcclxuaW1wb3J0IHsgTWl4aW5DYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBHb29nbGVDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgR29vZ2xlUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLW1hcmtlcic7XHJcbmltcG9ydCB7IEdvb2dsZUxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbGF5ZXInO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pYm94JztcclxuaW1wb3J0IHsgR29vZ2xlTWFwRXZlbnRzTG9va3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtZXZlbnRzLWxvb2t1cCc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGdvb2dsZTogYW55O1xyXG5kZWNsYXJlIGNvbnN0IE1hcmtlckNsdXN0ZXJlcjogYW55O1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXBTZXJ2aWNlIGFic3RyYWN0IGltcGxlbWVudGluZyBhIEdvb2dsZSBNYXBzIHByb3ZpZGVyXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcFNlcnZpY2UgaW1wbGVtZW50cyBNYXBTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBEZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIHByaXZhdGUgX21hcDogUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+O1xyXG4gICAgcHJpdmF0ZSBfbWFwSW5zdGFuY2U6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcDtcclxuICAgIHByaXZhdGUgX21hcFJlc29sdmVyOiAodmFsdWU/OiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBEZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcEluc3RhbmNlKCk6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCB7IHJldHVybiB0aGlzLl9tYXBJbnN0YW5jZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIFByb21pc2UgZm9yIGEgR29vZ2xlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uLiBVc2UgdGhpcyBpbnN0ZWFkIG9mIHtAbGluayBNYXBJbnN0YW5jZX0gaWYgeW91XHJcbiAgICAgKiBhcmUgbm90IHN1cmUgaWYgYW5kIHdoZW4gdGhlIGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBQcm9taXNlKCk6IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPiB7IHJldHVybiB0aGlzLl9tYXA7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcHMgcGh5c2ljYWwgc2l6ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWFwU2l6ZSgpOiBJU2l6ZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuTWFwSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgY29uc3QgZWw6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5NYXBJbnN0YW5jZS5nZXREaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgczogSVNpemUgPSB7IHdpZHRoOiBlbC5vZmZzZXRXaWR0aCwgaGVpZ2h0OiBlbC5vZmZzZXRIZWlnaHQgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFwU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbG9hZGVyIE1hcEFQSUxvYWRlciBpbnN0YW5jZSBpbXBsZW1lbnRlZCBmb3IgR29vZ2xlIE1hcHMuIFRoaXMgaW5zdGFuY2Ugd2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgTmdab25lIG9iamVjdCB0byBlbmFibGUgem9uZSBhd2FyZSBwcm9taXNlcy4gVGhpcyB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IE1hcEFQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPihcclxuICAgICAgICAgICAgKHJlc29sdmU6IChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9ICg8R29vZ2xlTWFwQVBJTG9hZGVyPnRoaXMuX2xvYWRlcikuQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2FudmFzIG92ZXJsYXkgbGF5ZXIgdG8gcGVyZm9ybSBjdXN0b20gZHJhd2luZyBvdmVyIHRoZSBtYXAgd2l0aCBvdXRcclxuICAgICAqIHNvbWUgb2YgdGhlIG92ZXJoZWFkIGFzc29jaWF0ZWQgd2l0aCBnb2luZyB0aHJvdWdoIHRoZSBNYXAgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcclxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBDYW52YXNPdmVybGF5fSBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5OiBHb29nbGVDYW52YXNPdmVybGF5ID0gbmV3IEdvb2dsZUNhbnZhc092ZXJsYXkoZHJhd0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5TZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIENyZWF0ZXMgYSBHb29nbGUgbWFwIGNsdXN0ZXIgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElDbHVzdGVyT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlT3B0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXJDbHVzdGVyZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlciA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCBbXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsdXN0ZXJMYXllciA9IG5ldyBHb29nbGVNYXJrZXJDbHVzdGVyZXIobWFya2VyQ2x1c3RlcmVyKTtcclxuICAgICAgICAgICAgY29uc3QgbzogSUNsdXN0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG9wdGlvbnMuaWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIG8udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBvLmNsdXN0ZXJpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXBkYXRlT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY2x1c3RlckxheWVyLlNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5mb3JtYXRpb24gd2luZG93IGZvciBhIG1hcCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9uc10gLSBJbmZvd2luZG93IG9wdGlvbnMuIFNlZSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIEluZm9XaW5kb3d9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkluZm9ib3ggb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVJbmZvV2luZG93KG9wdGlvbnM/OiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPEdvb2dsZUluZm9XaW5kb3c+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm9XaW5kb3c6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhvKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVJbmZvV2luZG93KGluZm9XaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUxheWVyT3B0aW9uc31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVMYXllcihvcHRpb25zOiBJTGF5ZXJPcHRpb25zKTogUHJvbWlzZTxMYXllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgIHJldHVybiBuZXcgR29vZ2xlTGF5ZXIobWFwLCB0aGlzLCBvcHRpb25zLmlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBIVE1MIGVsZW1lbnQgdG8gaG9zdCB0aGUgbWFwLlxyXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFwIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcChlbDogSFRNTEVsZW1lbnQsIG1hcE9wdGlvbnM6IElNYXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5Mb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFwcGx5IG1peGluc1xyXG4gICAgICAgICAgICBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3KCk7XHJcbiAgICAgICAgICAgIE1peGluQ2FudmFzT3ZlcmxheSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhlY3V0ZSBtYXAgc3RhcnR1cFxyXG4gICAgICAgICAgICBpZiAoIW1hcE9wdGlvbnMubWFwVHlwZUlkID09IG51bGwpIHsgbWFwT3B0aW9ucy5tYXBUeXBlSWQgPSBNYXBUeXBlSWQuaHlicmlkOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3Bvc2VNYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlT3B0aW9ucyhtYXBPcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCBvKTtcclxuICAgICAgICAgICAgaWYgKG1hcE9wdGlvbnMuYm91bmRzKSB7XHJcbiAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUJvdW5kcyhtYXBPcHRpb25zLmJvdW5kcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIG1hcCBtYXJrZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9ucz08SU1hcmtlck9wdGlvbnM+e31dIC0gT3B0aW9ucyBmb3IgdGhlIG1hcmtlci4gU2VlIHtAbGluayBJTWFya2VyT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTWFya2VyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5QdXNoUGluIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zID0gPElNYXJrZXJPcHRpb25zPnt9KTogUHJvbWlzZTxNYXJrZXI+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKHg6IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMsIG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKTogR29vZ2xlTWFya2VyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih4KTtcclxuICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBHb29nbGVNYXJrZXIobWFya2VyKTtcclxuICAgICAgICAgICAgbS5Jc0ZpcnN0ID0gb3B0aW9ucy5pc0ZpcnN0O1xyXG4gICAgICAgICAgICBtLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gbS5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxyXG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaWNvbkluZm8gJiYgb3B0aW9ucy5pY29uSW5mby5tYXJrZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gTWFya2VyLkNyZWF0ZU1hcmtlcihvcHRpb25zLmljb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocykgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5pY29uID0gcztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZChvLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0geC5pY29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZChvLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQobywgbWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBHb29nbGUgTWFwIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5Z29uLiBTZWUge0BsaW5rIElQb2x5Z29uT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWdvbn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24ob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlnb24obyk7XHJcbiAgICAgICAgICAgIHBvbHlnb24uc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwOiBHb29nbGVQb2x5Z29uID0gbmV3IEdvb2dsZVBvbHlnb24ocG9seWdvbik7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHAuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dMYWJlbCAhPSBudWxsKSB7IHAuU2hvd0xhYmVsID0gb3B0aW9ucy5zaG93TGFiZWw7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1heFpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWF4Wm9vbSA9IG9wdGlvbnMubGFiZWxNYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWluWm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNaW5ab29tID0gb3B0aW9ucy5sYWJlbE1pblpvb207IH1cclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcG9seWxpbmUgd2l0aGluIHRoZSBHb29nbGUgTWFwIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5bGluZS4gU2VlIHtAbGluayBJUG9seWxpbmVPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5bGluZX0gb2JqZWN0IChvciBhbiBhcnJheSB0aGVyZWZvcmUgZm9yIGNvbXBsZXggcGF0aHMpXHJcbiAgICAgKiB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICBsZXQgcG9seWxpbmU6IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aFswXSkpIHtcclxuICAgICAgICAgICAgICAgIG8ucGF0aCA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aClbMF07XHJcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvKTtcclxuICAgICAgICAgICAgICAgIHBvbHlsaW5lLnNldE1hcChtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBsID0gbmV3IEdvb2dsZVBvbHlsaW5lKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwbC5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcGwuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBsLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XHJcbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ucGF0aCA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsID0gbmV3IEdvb2dsZVBvbHlsaW5lKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gcGwuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBsLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocGwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBsYXllciBmcm9tIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTGF5ZXIgdG8gZGVsZXRlLiBTZWUge0BsaW5rIExheWVyfS4gVGhpcyBtZXRob2QgZXhwZWN0cyB0aGUgR29vZ2xlIHNwZWNpZmljIExheWVyIG1vZGVsIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlTGF5ZXIobGF5ZXI6IExheWVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlc29sdmVkIHByb21pc2UgYXMgdGhlcmUgaXMgbm8gY29uZXB0IG9mIGEgY3VzdG9tIGxheWVyIGluIEdvb2dsZS5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwYW9zZSB0aGUgbWFwIGFuZCBhc3NvY2lhdGVkIHJlc291cmVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEaXNwb3NlTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCAmJiB0aGlzLl9tYXBJbnN0YW5jZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGNlbnRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGNlbnRlci4gU2VlIHtAbGluayBJTGF0TG9uZ30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENlbnRlcigpOiBQcm9taXNlPElMYXRMb25nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxJTGF0TG9uZz57XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogY2VudGVyLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjZW50ZXIubG5nKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGJvdW5kaW5nIGJveFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnZW8gbG9jYXRpb24gb2YgdGhlIGJvdW5kaW5nIGJveC4gU2VlIHtAbGluayBJQm94fS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Qm91bmRzKCk6IFByb21pc2U8SUJveD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm94ID0gbWFwLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gPElCb3g+e1xyXG4gICAgICAgICAgICAgICAgbWF4TGF0aXR1ZGU6IGJveC5nZXROb3J0aEVhc3QoKS5sYXQoKSxcclxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogTWF0aC5tYXgoYm94LmdldE5vcnRoRWFzdCgpLmxuZygpLCBib3guZ2V0U291dGhXZXN0KCkubG5nKCkpLFxyXG4gICAgICAgICAgICAgICAgbWluTGF0aXR1ZGU6IGJveC5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZTogTWF0aC5taW4oYm94LmdldE5vcnRoRWFzdCgpLmxuZygpLCBib3guZ2V0U291dGhXZXN0KCkubG5nKCkpLFxyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdGl0dWRlOiBib3guZ2V0Q2VudGVyKCkubGF0KCksIGxvbmdpdHVkZTogYm94LmdldENlbnRlcigpLmxuZygpIH0sXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgem9vbSBsZXZlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IG1hcC5nZXRab29tKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjb252ZXJzaW9uIG9mIGdlbyBjb29yZGluYXRlcyB0byBwaXhlbHMgb24gdGhlIG1hcCBjb250cm9sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhbiB7QGxpbmsgSVBvaW50fSBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSBwaXhlbHMuIFRoaXMgcHJvbWlzZSByZXNvbHZlcyB0byBudWxsXHJcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BvaW50KGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobG9jKTtcclxuICAgICAgICAgICAgY29uc3QgcCA9IG0uZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnBvdygyLCBtLmdldFpvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIGlmIChiLmdldENlbnRlcigpLmxuZygpIDwgYi5nZXRTb3V0aFdlc3QoKS5sbmcoKSAgfHxcclxuICAgICAgICAgICAgICAgIGIuZ2V0Q2VudGVyKCkubG5nKCkgPiBiLmdldE5vcnRoRWFzdCgpLmxuZygpKSB7IGNyb3NzZXNEYXRlTGluZSA9IHRydWU7IH1cclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0Tm9ydGhFYXN0KCkpLnk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFg6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXRTb3V0aFdlc3QoKSkueDtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gcC5mcm9tTGF0TG5nVG9Qb2ludChsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoKHBvaW50LnggLSBvZmZzZXRYICsgKChjcm9zc2VzRGF0ZUxpbmUgJiYgcG9pbnQueCA8IG9mZnNldFgpID8gMjU2IDogMCkpICogcyksXHJcbiAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKChwb2ludC55IC0gb2Zmc2V0WSkgKiBzKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjb252ZXJzaW9uIG9mIGdlbyBjb29yZGluYXRlcyB0byBwaXhlbHMgb24gdGhlIG1hcCBjb250cm9sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhbiB7QGxpbmsgSVBvaW50fSBpbnRlcmZhY2UgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBwaXhlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvbnNUb1BvaW50cyhsb2NzOiBBcnJheTxJTGF0TG9uZz4pOiBQcm9taXNlPEFycmF5PElQb2ludD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3Jvc3Nlc0RhdGVMaW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBtLmdldFByb2plY3Rpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgczogbnVtYmVyID0gTWF0aC5wb3coMiwgbS5nZXRab29tKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBiOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHMgPSBtLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICBpZiAoYi5nZXRDZW50ZXIoKS5sbmcoKSA8IGIuZ2V0U291dGhXZXN0KCkubG5nKCkgIHx8XHJcbiAgICAgICAgICAgICAgICBiLmdldENlbnRlcigpLmxuZygpID4gYi5nZXROb3J0aEVhc3QoKS5sbmcoKSkgeyBjcm9zc2VzRGF0ZUxpbmUgPSB0cnVlOyB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0U291dGhXZXN0KCkpLng7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFk6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXROb3J0aEVhc3QoKSkueTtcclxuICAgICAgICAgICAgY29uc3QgbCA9IGxvY3MubWFwKGxsID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGwxOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludDogR29vZ2xlTWFwVHlwZXMuUG9pbnQgPSBwLmZyb21MYXRMbmdUb1BvaW50KGwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigocG9pbnQueCAtIG9mZnNldFggKyAoKGNyb3NzZXNEYXRlTGluZSAmJiBwb2ludC54IDwgb2Zmc2V0WCkgPyAyNTYgOiAwKSkgKiBzKSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKChwb2ludC55IC0gb2Zmc2V0WSkgKiBzKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2VudGVycyB0aGUgbWFwIG9uIGEgZ2VvIGxvY2F0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW9Db29yZGluYXRlcyBhcm91bmQgd2hpY2ggdG8gY2VudGVyIHRoZSBtYXAuIFNlZSB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGNlbnRlciBvcGVyYXRpb25zIGhhcyBiZWVuIGNvbXBsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0Q2VudGVyKGxhdExuZzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0TG5nKTtcclxuICAgICAgICAgICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2VuZXJpYyBtYXAgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgbS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlldyBvcHRpb25zIG9mIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0Vmlld09wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJvdW5kcykge1xyXG4gICAgICAgICAgICAgICAgbS5maXRCb3VuZHMoR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlQm91bmRzKG9wdGlvbnMuYm91bmRzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG0uc2V0T3B0aW9ucyhvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gem9vbSAtIFpvb20gbGV2ZWwgdG8gc2V0LlxyXG4gICAgICogQHJldHVybnMgLSBBIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIHpvb20gb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRab29tKHpvb206IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IG1hcC5zZXRab29tKHpvb20pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoZS5nLiAnY2xpY2snKVxyXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHR5cGUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3Vic2NyaWJlVG9NYXBFdmVudDxFPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8RT4ge1xyXG4gICAgICAgIGNvbnN0IGdvb2dsZUV2ZW50TmFtZTogc3RyaW5nID0gR29vZ2xlTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RT4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbS5hZGRMaXN0ZW5lcihnb29nbGVFdmVudE5hbWUsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUcmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG0pID0+IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobSwgZXZlbnROYW1lLCBudWxsKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==