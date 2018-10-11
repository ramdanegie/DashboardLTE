/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, ViewChild, ContentChildren, Input, Output, ElementRef, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { MapServiceFactory } from '../services/mapservicefactory';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { InfoBoxService } from '../services/infobox.service';
import { LayerService } from '../services/layer.service';
import { PolygonService } from '../services/polygon.service';
import { PolylineService } from '../services/polyline.service';
import { ClusterService } from '../services/cluster.service';
import { MapTypeId } from '../models/map-type-id';
import { MapMarkerDirective } from './map-marker';
/**
 * Renders a map based on a given provider.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map',
 *  styles: [`
 *    .map-container { height: 300px; }
 * `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom"></x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var MapComponent = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapComponent.
     *
     * @param _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @memberof MapComponent
     */
    function MapComponent(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._longitude = 0;
        this._latitude = 0;
        this._zoom = 0;
        this._options = {};
        this._box = null;
        this._containerClass = true;
        /**
         * This event emitter is fired when the map bounding box changes.
         *
         * \@memberof MapComponent
         */
        this.BoundsChange = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         *
         * \@memberof MapComponent
         */
        this.CenterChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapDblClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOver = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOut = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseMove = new EventEmitter();
        /**
         * The event emitter is fired when the map service is available and the maps has been
         * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
         * the main map object of the underlying platform.
         *
         * \@memberof MapComponent
         */
        this.MapPromise = new EventEmitter();
        /**
         * This event emiiter is fired when the map zoom changes
         *
         * \@memberof MapComponent
         */
        this.ZoomChange = new EventEmitter();
        /**
         * This event emitter is fired when the map service is available and the maps has been
         * Initialized
         * \@memberOf MapComponent
         */
        this.MapService = new EventEmitter();
    }
    Object.defineProperty(MapComponent.prototype, "Box", {
        ///
        /// Property declarations
        ///
        /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._box; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._box = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Latitude", {
        /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._latitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Longitude", {
        /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._longitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Options", {
        /**
         * Gets or sets general map Options
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets general map Options
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._options = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Zoom", {
        /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._zoom; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._zoom = this.ConvertToDecimal(value, 8);
            if (typeof this._zoom === 'number') {
                this._mapService.SetZoom(this._zoom);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnInit = /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this.InitMapInstance(this._container.nativeElement);
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapComponent.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (this._mapPromise) {
            if (changes['Box']) {
                if (this._box != null) {
                    this._mapService.SetViewOptions(/** @type {?} */ ({
                        bounds: this._box
                    }));
                }
            }
            if (changes['Options']) {
                this._mapService.SetMapOptions(this._options);
            }
        }
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this._mapService.DisposeMap();
    };
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    MapComponent.prototype.TriggerResize = /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapService.TriggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    MapComponent.prototype.ConvertToDecimal = /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    };
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapClickEvents = /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('click').subscribe(function (e) {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            ///
            _this._clickTimeout = setTimeout(function () {
                _this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(function (e) {
            if (_this._clickTimeout) {
                clearTimeout(/** @type {?} */ (_this._clickTimeout));
            }
            _this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(function (e) {
            _this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(function (e) {
            _this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(function (e) {
            _this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(function (e) {
            _this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapBoundsChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(function () {
            _this._mapService.GetBounds().then(function (bounds) {
                _this.BoundsChange.emit(bounds);
            });
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapCenterChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(function () {
            _this._mapService.GetCenter().then(function (center) {
                if (_this._latitude !== center.latitude || _this._longitude !== center.longitude) {
                    _this._latitude = center.latitude;
                    _this._longitude = center.longitude;
                    _this.CenterChange.emit(/** @type {?} */ ({ latitude: _this._latitude, longitude: _this._longitude }));
                }
            });
        });
    };
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapZoomChange = /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(function () {
            _this._mapService.GetZoom().then(function (z) {
                if (_this._zoom !== z) {
                    _this._zoom = z;
                    _this.ZoomChange.emit(z);
                }
            });
        });
    };
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    MapComponent.prototype.InitMapInstance = /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    function (el) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            if (_this._options.center == null) {
                _this._options.center = { latitude: _this._latitude, longitude: _this._longitude };
            }
            if (_this._options.zoom == null) {
                _this._options.zoom = _this._zoom;
            }
            if (_this._options.mapTypeId == null) {
                _this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (_this._box != null) {
                _this._options.bounds = _this._box;
            }
            _this._mapPromise = _this._mapService.CreateMap(el, _this._options);
            _this.HandleMapCenterChange();
            _this.HandleMapBoundsChange();
            _this.HandleMapZoomChange();
            _this.HandleMapClickEvents();
        });
    };
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.UpdateCenter = /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    };
    MapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'x-map',
                    providers: [
                        { provide: MapService, deps: [MapServiceFactory], useFactory: MapServiceCreator },
                        { provide: MarkerService, deps: [MapServiceFactory, MapService, LayerService, ClusterService], useFactory: MarkerServiceFactory },
                        {
                            provide: InfoBoxService, deps: [MapServiceFactory, MapService,
                                MarkerService], useFactory: InfoBoxServiceFactory
                        },
                        { provide: LayerService, deps: [MapServiceFactory, MapService], useFactory: LayerServiceFactory },
                        { provide: ClusterService, deps: [MapServiceFactory, MapService], useFactory: ClusterServiceFactory },
                        { provide: PolygonService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolygonServiceFactory },
                        { provide: PolylineService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolylineServiceFactory }
                    ],
                    template: "\n        <div #container class='map-container-inner'></div>\n        <div class='map-content'>\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        .map-container-inner { width: inherit; height: inherit; }\n        .map-container-inner div { background-repeat: no-repeat; }\n        .map-content { display:none; }\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    MapComponent.propDecorators = {
        _containerClass: [{ type: HostBinding, args: ['class.map-container',] }],
        _container: [{ type: ViewChild, args: ['container',] }],
        _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
        Box: [{ type: Input }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Options: [{ type: Input }],
        Zoom: [{ type: Input }],
        BoundsChange: [{ type: Output }],
        CenterChange: [{ type: Output }],
        MapClick: [{ type: Output }],
        MapDblClick: [{ type: Output }],
        MapRightClick: [{ type: Output }],
        MapMouseOver: [{ type: Output }],
        MapMouseOut: [{ type: Output }],
        MapMouseMove: [{ type: Output }],
        MapPromise: [{ type: Output }],
        ZoomChange: [{ type: Output }],
        MapService: [{ type: Output }]
    };
    return MapComponent;
}());
export { MapComponent };
function MapComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MapComponent.prototype._longitude;
    /** @type {?} */
    MapComponent.prototype._latitude;
    /** @type {?} */
    MapComponent.prototype._zoom;
    /** @type {?} */
    MapComponent.prototype._clickTimeout;
    /** @type {?} */
    MapComponent.prototype._options;
    /** @type {?} */
    MapComponent.prototype._box;
    /** @type {?} */
    MapComponent.prototype._mapPromise;
    /** @type {?} */
    MapComponent.prototype._containerClass;
    /** @type {?} */
    MapComponent.prototype._container;
    /** @type {?} */
    MapComponent.prototype._markers;
    /**
     * This event emitter is fired when the map bounding box changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.BoundsChange;
    /**
     * This event emitter is fired when the map center changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.CenterChange;
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapDblClick;
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapRightClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOver;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOut;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseMove;
    /**
     * The event emitter is fired when the map service is available and the maps has been
     * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
     * the main map object of the underlying platform.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapPromise;
    /**
     * This event emiiter is fired when the map zoom changes
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.ZoomChange;
    /**
     * This event emitter is fired when the map service is available and the maps has been
     * Initialized
     * \@memberOf MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapService;
    /** @type {?} */
    MapComponent.prototype._mapService;
    /** @type {?} */
    MapComponent.prototype._zone;
}
/**
 * Factory function to generate a cluster service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Cluster Service based on the underlying map architecture
 */
export function ClusterServiceFactory(f, m) { return f.CreateClusterService(m); }
/**
 * Factory function to generate a infobox service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} ma
 * @return {?} - A concrete instance of a InfoBox Service based on the underlying map architecture.
 */
export function InfoBoxServiceFactory(f, m, ma) { return f.CreateInfoBoxService(m, ma); }
/**
 * Factory function to generate a layer service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Layer Service based on the underlying map architecture.
 */
export function LayerServiceFactory(f, m) { return f.CreateLayerService(m); }
/**
 * Factory function to generate a map service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @return {?} - A concrete instance of a MapService based on the underlying map architecture.
 */
export function MapServiceCreator(f) { return f.Create(); }
/**
 * Factory function to generate a marker service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @param {?} c - A {\@link ClusterService} instance.
 * @return {?} - A concrete instance of a Marker Service based on the underlying map architecture.
 */
export function MarkerServiceFactory(f, m, l, c) {
    return f.CreateMarkerService(m, l, c);
}
/**
 * Factory function to generate a polygon service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polygon Service based on the underlying map architecture.
 */
export function PolygonServiceFactory(f, m, l) {
    return f.CreatePolygonService(m, l);
}
/**
 * Factory function to generate a polyline service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polyline Service based on the underlying map architecture.
 */
export function PolylineServiceFactory(f, m, l) {
    return f.CreatePolylineService(m, l);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtPOUMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsc0JBQW9CLFdBQXVCLEVBQVUsS0FBYTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7MEJBbkw3QyxDQUFDO3lCQUNGLENBQUM7cUJBQ0wsQ0FBQzt3QkFFZSxFQUFF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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZZekIsTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLElBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7QUFZaEksTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLEVBQ3JFLEVBQWlCLElBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7Ozs7Ozs7QUFXaEYsTUFBTSw4QkFBOEIsQ0FBb0IsRUFBRSxDQUFhLElBQWtCLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7O0FBVTFILE1BQU0sNEJBQTRCLENBQW9CLElBQWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7O0FBYTFGLE1BQU0sK0JBQStCLENBQW9CLEVBQUUsQ0FBYSxFQUFFLENBQWUsRUFBRSxDQUFpQjtJQUN4RyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDekM7Ozs7Ozs7Ozs7O0FBWUQsTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLEVBQUUsQ0FBZTtJQUN0RixNQUFNLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2Qzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGlDQUFpQyxDQUFvQixFQUFFLENBQWEsRUFBRSxDQUFlO0lBQ3ZGLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIFNpbXBsZUNoYW5nZSxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEhvc3RCaW5kaW5nLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIE5nWm9uZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcHNlcnZpY2VmYWN0b3J5JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmZvYm94LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb2x5bGluZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pYm94JztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIG1hcCBiYXNlZCBvbiBhIGdpdmVuIHByb3ZpZGVyLlxyXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZSBDU1NcclxuICogY2xhc3MgYG1hcC1jb250YWluZXJgLlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICAubWFwLWNvbnRhaW5lciB7IGhlaWdodDogMzAwcHg7IH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPjwveC1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAneC1tYXAnLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBNYXBTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnldLCB1c2VGYWN0b3J5OiBNYXBTZXJ2aWNlQ3JlYXRvciB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTWFya2VyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2UsIENsdXN0ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTWFya2VyU2VydmljZUZhY3RvcnkgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IEluZm9Cb3hTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBNYXJrZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogSW5mb0JveFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IExheWVyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTGF5ZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogQ2x1c3RlclNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZV0sIHVzZUZhY3Rvcnk6IENsdXN0ZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogUG9seWdvblNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogUG9seWdvblNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5bGluZVNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogUG9seWxpbmVTZXJ2aWNlRmFjdG9yeSB9XHJcbiAgICBdLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb250YWluZXIgY2xhc3M9J21hcC1jb250YWluZXItaW5uZXInPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J21hcC1jb250ZW50Jz5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciB7IHdpZHRoOiBpbmhlcml0OyBoZWlnaHQ6IGluaGVyaXQ7IH1cclxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciBkaXYgeyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyB9XHJcbiAgICAgICAgLm1hcC1jb250ZW50IHsgZGlzcGxheTpub25lOyB9XHJcbiAgICBgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2xvbmdpdHVkZSA9IDA7XHJcbiAgICBwcml2YXRlIF9sYXRpdHVkZSA9IDA7XHJcbiAgICBwcml2YXRlIF96b29tID0gMDtcclxuICAgIHByaXZhdGUgX2NsaWNrVGltZW91dDogbnVtYmVyIHwgTm9kZUpTLlRpbWVyO1xyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSU1hcE9wdGlvbnMgPSB7fTtcclxuICAgIHByaXZhdGUgX2JveDogSUJveCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tYXBQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXAtY29udGFpbmVyJykgcHVibGljIF9jb250YWluZXJDbGFzczogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBwcml2YXRlIF9jb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBAQ29udGVudENoaWxkcmVuKE1hcE1hcmtlckRpcmVjdGl2ZSkgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8TWFwTWFya2VyRGlyZWN0aXZlPjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG9yIHNldHMgdGhlIG1heGltdW0gYW5kIG1pbmltdW0gYm91bmRpbmcgYm94IGZvciBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBCb3goKTogSUJveCB7IHJldHVybiB0aGlzLl9ib3g7IH1cclxuICAgIHB1YmxpYyBzZXQgQm94KHZhbDogSUJveCkgeyB0aGlzLl9ib3ggPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbGF0aXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IExhdGl0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cclxuICAgIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2xhdGl0dWRlID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsb25naXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IExvbmdpdHVkZSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlOyB9XHJcbiAgICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIGdlbmVyYWwgbWFwIE9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IE9wdGlvbnMoKTogSU1hcE9wdGlvbnMgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxyXG4gICAgcHVibGljIHNldCBPcHRpb25zKHZhbDogSU1hcE9wdGlvbnMpIHsgdGhpcy5fb3B0aW9ucyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGA4YC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IFpvb20oKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3pvb207IH1cclxuICAgIHB1YmxpYyBzZXQgWm9vbSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fem9vbSA9IHRoaXMuQ29udmVydFRvRGVjaW1hbCh2YWx1ZSwgOCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl96b29tID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldFpvb20odGhpcy5fem9vbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBib3VuZGluZyBib3ggY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgQm91bmRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SUJveD4gPSBuZXcgRXZlbnRFbWl0dGVyPElCb3g+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGNlbnRlciBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBDZW50ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJTGF0TG9uZz4gPSBuZXcgRXZlbnRFbWl0dGVyPElMYXRMb25nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXHJcbiAgICAgKiBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xyXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcERibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgcmlnaHQtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgc2VydmljZSBpcyBhdmFpbGFibGUgYW5kIHRoZSBtYXBzIGhhcyBiZWVuXHJcbiAgICAgKiBJbml0aWFsaXplZCAoYnV0IG5vdCBuZWNlc3NhcmlseSBjcmVhdGVkKS4gSXQgY29udGFpbnMgYSBQcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIHJldHVybnNcclxuICAgICAqIHRoZSBtYWluIG1hcCBvYmplY3Qgb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcFByb21pc2U6IEV2ZW50RW1pdHRlcjxQcm9taXNlPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaWl0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIHpvb20gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBab29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnVtYmVyPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBzZXJ2aWNlIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1hcHMgaGFzIGJlZW5cclxuICAgICAqIEluaXRpYWxpemVkXHJcbiAgICAgKiBAbWVtYmVyT2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwU2VydmljZTogRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBTZXJ2aWNlPigpO1xyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcENvbXBvbmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBtYXAgc2VydmljZSBmb3IgdGhlIHVuZGVybHlpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbnMuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb25zLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5Jbml0TWFwSW5zdGFuY2UodGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuTWFwUHJvbWlzZS5lbWl0KHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZSk7XHJcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmVtaXQodGhpcy5fbWFwU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBjaGFuZ2VzIHRvIHRoZSBkYXRhYm91ZCBwcm9wZXJ0aWVzIG9jY3VyLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcFByb21pc2UpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNbJ0JveCddKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYm94ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldFZpZXdPcHRpb25zKDxJTWFwT3B0aW9ucz57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kczogdGhpcy5fYm94XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNbJ09wdGlvbnMnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRNYXBPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuRGlzcG9zZU1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcnMgYSByZXNpemUgZXZlbnQgb24gdGhlIG1hcCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGdldHMgcmVzb2x2ZWQgYWZ0ZXIgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVHJpZ2dlclJlc2l6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBOb3RlOiBXaGVuIHdlIHdvdWxkIHRyaWdnZXIgdGhlIHJlc2l6ZSBldmVudCBhbmQgc2hvdyB0aGUgbWFwIGluIHRoZSBzYW1lIHR1cm4gKHdoaWNoIGlzIGFcclxuICAgICAgICAvLyBjb21tb24gY2FzZSBmb3IgdHJpZ2dlcmluZyBhIHJlc2l6ZSBldmVudCksIHRoZW4gdGhlIHJlc2l6ZSBldmVudCB3b3VsZCBub3RcclxuICAgICAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLlRyaWdnZXJNYXBFdmVudCgncmVzaXplJykudGhlbigoKSA9PiByZXNvbHZlKCkpOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHMuXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgbnVtYmVyLWlzaCB2YWx1ZSB0byBhIG51bWJlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY29udmVydC5cclxuICAgICAqIEBwYXJhbSBbZGVmYXVsdFZhbHVlPW51bGxdIC0gRGVmYXVsdCB2YWx1ZSB0byB1c2UgaWYgdGhlIGNvbnZlcnNpb24gY2Fubm90IGJlIHBlcmZvcm1lZC5cclxuICAgICAqIEByZXR1cm5zIC0gQ29udmVydGVkIG51bWJlciBvZiB0aGUgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQ29udmVydFRvRGVjaW1hbCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBkZWZhdWx0VmFsdWU6IG51bWJlciA9IG51bGwpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxudW1iZXI+dmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyB0aGUgbWFwIGNsaWNrIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwQ2xpY2tFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ2NsaWNrJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBzaW5jZSBiaW5nIHdpbGwgdHJlYXQgYSBkb3VibGVjbGljayBmaXJzdCBhcyB0d28gY2xpY2tzLi4uJ1xyXG4gICAgICAgICAgICAvLy9cclxuICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcENsaWNrLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ2RibGNsaWNrJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoPE5vZGVKUy5UaW1lcj50aGlzLl9jbGlja1RpbWVvdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTWFwRGJsQ2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PigncmlnaHRjbGljaycpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5NYXBSaWdodENsaWNrLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlb3ZlcicpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU92ZXIuZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2VvdXQnKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VPdXQuZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2Vtb3ZlJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlTW92ZS5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIGNlbnRlciBjaGFuZ2UgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBCb3VuZHNDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdib3VuZHNjaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRCb3VuZHMoKS50aGVuKChib3VuZHM6IElCb3gpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQm91bmRzQ2hhbmdlLmVtaXQoYm91bmRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyBtYXAgY2VudGVyIGNoYW5nZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhhbmRsZU1hcENlbnRlckNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2NlbnRlcmNoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldENlbnRlcigpLnRoZW4oKGNlbnRlcjogSUxhdExvbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXRpdHVkZSAhPT0gY2VudGVyLmxhdGl0dWRlIHx8IHRoaXMuX2xvbmdpdHVkZSAhPT0gY2VudGVyLmxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhdGl0dWRlID0gY2VudGVyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdpdHVkZSA9IGNlbnRlci5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DZW50ZXJDaGFuZ2UuZW1pdCg8SUxhdExvbmc+eyBsYXRpdHVkZTogdGhpcy5fbGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCB6b29tIGNoYW5nZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhhbmRsZU1hcFpvb21DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCd6b29tY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Wm9vbSgpLnRoZW4oKHo6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3pvb20gIT09IHopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b29tID0gejtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlpvb21DaGFuZ2UuZW1pdCh6KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIEh0bWwgZWxlbWVudHMgd2hpY2ggd2lsbCBob3N0IHRoZSBtYXAgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBJbml0TWFwSW5zdGFuY2UoZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNlbnRlciA9PSBudWxsKSB7IHRoaXMuX29wdGlvbnMuY2VudGVyID0geyBsYXRpdHVkZTogdGhpcy5fbGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlIH07IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuem9vbSA9PSBudWxsKSB7IHRoaXMuX29wdGlvbnMuem9vbSA9IHRoaXMuX3pvb207IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWFwVHlwZUlkID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5tYXBUeXBlSWQgPSBNYXBUeXBlSWQuaHlicmlkOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ib3ggIT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLmJvdW5kcyA9IHRoaXMuX2JveDsgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXBQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVNYXAoZWwsIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcENlbnRlckNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcEJvdW5kc0NoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcFpvb21DaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBDbGlja0V2ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWFwIGNlbnRlciBiYXNlZCBvbiB0aGUgZ2VvIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgVXBkYXRlQ2VudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLl9sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRDZW50ZXIoe1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5fbGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGNsdXN0ZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIENsdXN0ZXIgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gQ2x1c3RlclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlKTogQ2x1c3RlclNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVDbHVzdGVyU2VydmljZShtKTsgfVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBpbmZvYm94IHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcmtlclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBJbmZvQm94IFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmZvQm94U2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsXHJcbiAgICBtYTogTWFya2VyU2VydmljZSk6IEluZm9Cb3hTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlSW5mb0JveFNlcnZpY2UobSwgbWEpOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGxheWVyIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBMYXllciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTGF5ZXJTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSk6IExheWVyU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZUxheWVyU2VydmljZShtKTsgfVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBtYXAgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIE1hcFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNYXBTZXJ2aWNlQ3JlYXRvcihmOiBNYXBTZXJ2aWNlRmFjdG9yeSk6IE1hcFNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGUoKTsgfVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBtYXJrZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGMgLSBBIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIE1hcmtlciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTWFya2VyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSwgYzogQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBmLkNyZWF0ZU1hcmtlclNlcnZpY2UobSwgbCwgYyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcG9seWdvbiBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBQb2x5Z29uIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBQb2x5Z29uU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlIHtcclxuICAgIHJldHVybiBmLkNyZWF0ZVBvbHlnb25TZXJ2aWNlKG0sIGwpO1xyXG59XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIHBvbHlsaW5lIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gbCAtIEEge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIFBvbHlsaW5lIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBQb2x5bGluZVNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLCBsOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIGYuQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG0sIGwpO1xyXG59XHJcbiJdfQ==