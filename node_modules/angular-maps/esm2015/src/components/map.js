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
export class MapComponent {
    /**
     * Creates an instance of MapComponent.
     *
     * \@memberof MapComponent
     * @param {?} _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
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
    /**
     * Get or sets the maximum and minimum bounding box for map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Box() { return this._box; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Box(val) { this._box = val; }
    /**
     * Gets or sets the latitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Latitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Latitude(value) {
        this._latitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets the longitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Longitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Longitude(value) {
        this._longitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets general map Options
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Options() { return this._options; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Options(val) { this._options = val; }
    /**
     * Gets or sets the zoom level of the map. The default value is `8`.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Zoom() { return this._zoom; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Zoom(value) {
        this._zoom = this.ConvertToDecimal(value, 8);
        if (typeof this._zoom === 'number') {
            this._mapService.SetZoom(this._zoom);
        }
    }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnInit() {
        this.InitMapInstance(this._container.nativeElement);
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnDestroy() {
        this._mapService.DisposeMap();
    }
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    TriggerResize() {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => { return this._mapService.TriggerMapEvent('resize').then(() => resolve()); });
        });
    }
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    ConvertToDecimal(value, defaultValue = null) {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    }
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapClickEvents() {
        this._mapService.SubscribeToMapEvent('click').subscribe(e => {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            this._clickTimeout = setTimeout(() => {
                this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(e => {
            if (this._clickTimeout) {
                clearTimeout(/** @type {?} */ (this._clickTimeout));
            }
            this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(e => {
            this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(e => {
            this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(e => {
            this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(e => {
            this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapBoundsChange() {
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(() => {
            this._mapService.GetBounds().then((bounds) => {
                this.BoundsChange.emit(bounds);
            });
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapCenterChange() {
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(() => {
            this._mapService.GetCenter().then((center) => {
                if (this._latitude !== center.latitude || this._longitude !== center.longitude) {
                    this._latitude = center.latitude;
                    this._longitude = center.longitude;
                    this.CenterChange.emit(/** @type {?} */ ({ latitude: this._latitude, longitude: this._longitude }));
                }
            });
        });
    }
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapZoomChange() {
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(() => {
            this._mapService.GetZoom().then((z) => {
                if (this._zoom !== z) {
                    this._zoom = z;
                    this.ZoomChange.emit(z);
                }
            });
        });
    }
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    InitMapInstance(el) {
        this._zone.runOutsideAngular(() => {
            if (this._options.center == null) {
                this._options.center = { latitude: this._latitude, longitude: this._longitude };
            }
            if (this._options.zoom == null) {
                this._options.zoom = this._zoom;
            }
            if (this._options.mapTypeId == null) {
                this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (this._box != null) {
                this._options.bounds = this._box;
            }
            this._mapPromise = this._mapService.CreateMap(el, this._options);
            this.HandleMapCenterChange();
            this.HandleMapBoundsChange();
            this.HandleMapZoomChange();
            this.HandleMapClickEvents();
        });
    }
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    UpdateCenter() {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    }
}
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
                template: `
        <div #container class='map-container-inner'></div>
        <div class='map-content'>
            <ng-content></ng-content>
        </div>
    `,
                styles: [`
        .map-container-inner { width: inherit; height: inherit; }
        .map-container-inner div { background-repeat: no-repeat; }
        .map-content { display:none; }
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcURsRCxNQUFNOzs7Ozs7Ozs7SUF3TEYsWUFBb0IsV0FBdUIsRUFBVSxLQUFhO1FBQTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTswQkFuTDdDLENBQUM7eUJBQ0YsQ0FBQztxQkFDTCxDQUFDO3dCQUVlLEVBQUU7b0JBQ2IsSUFBSTsrQkFFNkMsSUFBSTs7Ozs7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TSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7OztBQVdoRixNQUFNLDhCQUE4QixDQUFvQixFQUFFLENBQWEsSUFBa0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7Ozs7Ozs7QUFVMUgsTUFBTSw0QkFBNEIsQ0FBb0IsSUFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7QUFhMUYsTUFBTSwrQkFBK0IsQ0FBb0IsRUFBRSxDQUFhLEVBQUUsQ0FBZSxFQUFFLENBQWlCO0lBQ3hHLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN6Qzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGdDQUFnQyxDQUFvQixFQUFFLENBQWEsRUFBRSxDQUFlO0lBQ3RGLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDOzs7Ozs7Ozs7OztBQVlELE1BQU0saUNBQWlDLENBQW9CLEVBQUUsQ0FBYSxFQUFFLENBQWU7SUFDdkYsTUFBTSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgU2ltcGxlQ2hhbmdlLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi4vc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnknO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vbW9kZWxzL21hcC10eXBlLWlkJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGEgbWFwIGJhc2VkIG9uIGEgZ2l2ZW4gcHJvdmlkZXIuXHJcbiAqICoqSW1wb3J0YW50IG5vdGUqKjogVG8gYmUgYWJsZSBzZWUgYSBtYXAgaW4gdGhlIGJyb3dzZXIsIHlvdSBoYXZlIHRvIGRlZmluZSBhIGhlaWdodCBmb3IgdGhlIENTU1xyXG4gKiBjbGFzcyBgbWFwLWNvbnRhaW5lcmAuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxyXG4gKiBgXSxcclxuICogIHRlbXBsYXRlOiBgXHJcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+PC94LW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcCcsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IE1hcFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeV0sIHVzZUZhY3Rvcnk6IE1hcFNlcnZpY2VDcmVhdG9yIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBNYXJrZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsIExheWVyU2VydmljZSwgQ2x1c3RlclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBNYXJrZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogSW5mb0JveFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE1hcmtlclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBJbmZvQm94U2VydmljZUZhY3RvcnlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTGF5ZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2VdLCB1c2VGYWN0b3J5OiBMYXllclNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBDbHVzdGVyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlXSwgdXNlRmFjdG9yeTogQ2x1c3RlclNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5Z29uU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5Z29uU2VydmljZUZhY3RvcnkgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFBvbHlsaW5lU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5bGluZVNlcnZpY2VGYWN0b3J5IH1cclxuICAgIF0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz0nbWFwLWNvbnRhaW5lci1pbm5lcic+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nbWFwLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5tYXAtY29udGFpbmVyLWlubmVyIHsgd2lkdGg6IGluaGVyaXQ7IGhlaWdodDogaW5oZXJpdDsgfVxyXG4gICAgICAgIC5tYXAtY29udGFpbmVyLWlubmVyIGRpdiB7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cclxuICAgICAgICAubWFwLWNvbnRlbnQgeyBkaXNwbGF5Om5vbmU7IH1cclxuICAgIGBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlID0gMDtcclxuICAgIHByaXZhdGUgX2xhdGl0dWRlID0gMDtcclxuICAgIHByaXZhdGUgX3pvb20gPSAwO1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tUaW1lb3V0OiBudW1iZXIgfCBOb2RlSlMuVGltZXI7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTWFwT3B0aW9ucyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfYm94OiBJQm94ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21hcFByb21pc2U6IFByb21pc2U8dm9pZD47XHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcC1jb250YWluZXInKSBwdWJsaWMgX2NvbnRhaW5lckNsYXNzOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHByaXZhdGUgX2NvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFwTWFya2VyRGlyZWN0aXZlKSBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxNYXBNYXJrZXJEaXJlY3RpdmU+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgb3Igc2V0cyB0aGUgbWF4aW11bSBhbmQgbWluaW11bSBib3VuZGluZyBib3ggZm9yIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IEJveCgpOiBJQm94IHsgcmV0dXJuIHRoaXMuX2JveDsgfVxyXG4gICAgcHVibGljIHNldCBCb3godmFsOiBJQm94KSB7IHRoaXMuX2JveCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsYXRpdHVkZSB0aGF0IHNldHMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgTGF0aXR1ZGUoKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvbmdpdHVkZTsgfVxyXG4gICAgcHVibGljIHNldCBMYXRpdHVkZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxvbmdpdHVkZSB0aGF0IHNldHMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgTG9uZ2l0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cclxuICAgIHB1YmxpYyBzZXQgTG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgZ2VuZXJhbCBtYXAgT3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgT3B0aW9ucygpOiBJTWFwT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XHJcbiAgICBwdWJsaWMgc2V0IE9wdGlvbnModmFsOiBJTWFwT3B0aW9ucykgeyB0aGlzLl9vcHRpb25zID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgYDhgLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgWm9vbSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fem9vbTsgfVxyXG4gICAgcHVibGljIHNldCBab29tKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl96b29tID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlLCA4KTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3pvb20gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Wm9vbSh0aGlzLl96b29tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJvdW5kaW5nIGJveCBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBCb3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQm94PiA9IG5ldyBFdmVudEVtaXR0ZXI8SUJveD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIENlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPElMYXRMb25nPiA9IG5ldyBFdmVudEVtaXR0ZXI8SUxhdExvbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrIG9uIGFcclxuICAgICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xyXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcE1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBzZXJ2aWNlIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1hcHMgaGFzIGJlZW5cclxuICAgICAqIEluaXRpYWxpemVkIChidXQgbm90IG5lY2Vzc2FyaWx5IGNyZWF0ZWQpLiBJdCBjb250YWlucyBhIFByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgcmV0dXJuc1xyXG4gICAgICogdGhlIG1haW4gbWFwIG9iamVjdCBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwUHJvbWlzZTogRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1paXRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgem9vbSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIFpvb21DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOdW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxOdW1iZXI+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIHNlcnZpY2UgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWFwcyBoYXMgYmVlblxyXG4gICAgICogSW5pdGlhbGl6ZWRcclxuICAgICAqIEBtZW1iZXJPZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBTZXJ2aWNlOiBFdmVudEVtaXR0ZXI8TWFwU2VydmljZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+KCk7XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwQ29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlZCBpbXBsZW1lbnRhdGlvbiBvZiBhIG1hcCBzZXJ2aWNlIGZvciB0aGUgdW5kZXJseWluZyBtYXBzIGltcGxlbWVudGF0aW9ucy5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIENvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkluaXRNYXBJbnN0YW5jZSh0aGlzLl9jb250YWluZXIubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5NYXBQcm9taXNlLmVtaXQodGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlKTtcclxuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuZW1pdCh0aGlzLl9tYXBTZXJ2aWNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwUHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc1snQm94J10pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib3ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Vmlld09wdGlvbnMoPElNYXBPcHRpb25zPntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRzOiB0aGlzLl9ib3hcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc1snT3B0aW9ucyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldE1hcE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5EaXNwb3NlTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VycyBhIHJlc2l6ZSBldmVudCBvbiB0aGUgbWFwIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUcmlnZ2VyUmVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIE5vdGU6IFdoZW4gd2Ugd291bGQgdHJpZ2dlciB0aGUgcmVzaXplIGV2ZW50IGFuZCBzaG93IHRoZSBtYXAgaW4gdGhlIHNhbWUgdHVybiAod2hpY2ggaXMgYVxyXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxyXG4gICAgICAgIC8vIHdvcmsgKHRvIHNob3cgdGhlIG1hcCksIHNvIHdlIHRyaWdnZXIgdGhlIGV2ZW50IGluIGEgdGltZW91dC5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuVHJpZ2dlck1hcEV2ZW50KCdyZXNpemUnKS50aGVuKCgpID0+IHJlc29sdmUoKSk7IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kcy5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBudW1iZXItaXNoIHZhbHVlIHRvIGEgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxyXG4gICAgICogQHBhcmFtIFtkZWZhdWx0VmFsdWU9bnVsbF0gLSBEZWZhdWx0IHZhbHVlIHRvIHVzZSBpZiB0aGUgY29udmVyc2lvbiBjYW5ub3QgYmUgcGVyZm9ybWVkLlxyXG4gICAgICogQHJldHVybnMgLSBDb252ZXJ0ZWQgbnVtYmVyIG9mIHRoZSBkZWZhdWx0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBDb252ZXJ0VG9EZWNpbWFsKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGRlZmF1bHRWYWx1ZTogbnVtYmVyID0gbnVsbCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gPG51bWJlcj52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgY2xpY2sgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBDbGlja0V2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignY2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNpbmNlIGJpbmcgd2lsbCB0cmVhdCBhIGRvdWJsZWNsaWNrIGZpcnN0IGFzIHR3byBjbGlja3MuLi4nXHJcbiAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFwQ2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignZGJsY2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCg8Tm9kZUpTLlRpbWVyPnRoaXMuX2NsaWNrVGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5NYXBEYmxDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdyaWdodGNsaWNrJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcFJpZ2h0Q2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2VvdmVyJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlT3Zlci5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW91dCcpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU91dC5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VNb3ZlLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyBtYXAgY2VudGVyIGNoYW5nZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhhbmRsZU1hcEJvdW5kc0NoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2JvdW5kc2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldEJvdW5kcygpLnRoZW4oKGJvdW5kczogSUJveCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Cb3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCBjZW50ZXIgY2hhbmdlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignY2VudGVyY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Q2VudGVyKCkudGhlbigoY2VudGVyOiBJTGF0TG9uZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhdGl0dWRlICE9PSBjZW50ZXIubGF0aXR1ZGUgfHwgdGhpcy5fbG9uZ2l0dWRlICE9PSBjZW50ZXIubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSBjZW50ZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gY2VudGVyLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNlbnRlckNoYW5nZS5lbWl0KDxJTGF0TG9uZz57IGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIHpvb20gY2hhbmdlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwWm9vbUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3pvb21jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRab29tKCkudGhlbigoejogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fem9vbSAhPT0geikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb20gPSB6O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNoYW5nZS5lbWl0KHopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsIC0gSHRtbCBlbGVtZW50cyB3aGljaCB3aWxsIGhvc3QgdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEluaXRNYXBJbnN0YW5jZShlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2VudGVyID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5jZW50ZXIgPSB7IGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUgfTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy56b29tID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy56b29tID0gdGhpcy5fem9vbTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5tYXBUeXBlSWQgPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLm1hcFR5cGVJZCA9IE1hcFR5cGVJZC5oeWJyaWQ7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2JveCAhPSBudWxsKSB7IHRoaXMuX29wdGlvbnMuYm91bmRzID0gdGhpcy5fYm94OyB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcChlbCwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQm91bmRzQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwWm9vbUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcENsaWNrRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtYXAgY2VudGVyIGJhc2VkIG9uIHRoZSBnZW8gcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBVcGRhdGVDZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMuX2xvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldENlbnRlcih7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgY2x1c3RlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgQ2x1c3RlciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBDbHVzdGVyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZUNsdXN0ZXJTZXJ2aWNlKG0pOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGluZm9ib3ggc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFya2VyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIEluZm9Cb3ggU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEluZm9Cb3hTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSxcclxuICAgIG1hOiBNYXJrZXJTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVJbmZvQm94U2VydmljZShtLCBtYSk7IH1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbGF5ZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIExheWVyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBMYXllclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlTGF5ZXJTZXJ2aWNlKG0pOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcCBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTWFwU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1hcFNlcnZpY2VDcmVhdG9yKGY6IE1hcFNlcnZpY2VGYWN0b3J5KTogTWFwU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZSgpOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcmtlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gYyAtIEEge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTWFya2VyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNYXJrZXJTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlLCBjOiBDbHVzdGVyU2VydmljZSk6IE1hcmtlclNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIGYuQ3JlYXRlTWFya2VyU2VydmljZShtLCBsLCBjKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBwb2x5Z29uIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gbCAtIEEge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIFBvbHlnb24gU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbHlnb25TZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIGYuQ3JlYXRlUG9seWdvblNlcnZpY2UobSwgbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcG9seWxpbmUgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgUG9seWxpbmUgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbHlsaW5lU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSk6IFBvbHlsaW5lU2VydmljZSB7XHJcbiAgICByZXR1cm4gZi5DcmVhdGVQb2x5bGluZVNlcnZpY2UobSwgbCk7XHJcbn1cclxuIl19