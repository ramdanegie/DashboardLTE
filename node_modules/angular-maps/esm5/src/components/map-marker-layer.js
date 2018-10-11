/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import { LayerService } from '../services/layer.service';
import { ClusterService } from '../services/cluster.service';
import { MapService } from '../services/map.service';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterLayerDirective } from './cluster-layer';
/**
 * internal counter to use as ids for marker.
 */
var /** @type {?} */ layerId = 1000000;
/**
 * MapMarkerLayerDirective performantly renders a large set of map marker inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker-layer [MarkerOptions]="_markers"></x-map-marker-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapMarkerLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapMarkerLayerDirective.
     * @param _markerService - Concreate implementation of a {@link MarkerService}.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _clusterService - Concreate implementation of a {@link ClusterService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     *
     * @memberof MapMarkerLayerDirective
     */
    function MapMarkerLayerDirective(_markerService, _layerService, _clusterService, _mapService, _zone) {
        this._markerService = _markerService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._streaming = false;
        this._markers = new Array();
        this._markersLast = new Array();
        /**
         * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterClickAction = ClusterClickAction.ZoomIntoCluster;
        /**
         * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterPlacementMode = ClusterPlacementMode.MeanValue;
        /**
         * Determines whether the layer clusters. This property can only be set on creation of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.EnableClustering = false;
        /**
         * Gets or sets the grid size to be used for clustering.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.GridSize = 150;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ZIndex = 0;
        /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * \@readonly
         * \@memberof MapMarkerLayerDirective
         */
        this.ZoomOnClick = true;
        /**
         * This event emitter gets emitted when the dynamic icon for a marker is being created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks a marker in the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.MarkerClick = new EventEmitter();
        /**
         * This event is fired when the user stops dragging a marker.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DragEnd = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapMarkerLayerDirective.prototype, "CustomMarkerCallback", {
        /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._iconCreationCallback; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._useDynamicSizeMarker) {
                throw (new Error("You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.\n                    Set UseDynamicSizeMakers to false."));
            }
            this._iconCreationCallback = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerBaseSize", {
        /**
         * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
         * See {@link UseDynamicSizeMarkers}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
         * See {\@link UseDynamicSizeMarkers}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._dynamicMarkerBaseSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._dynamicMarkerBaseSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerRanges", {
        /**
         * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {@link UseDynamicSizeMarkers}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._dynamicMarkerRanges; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._dynamicMarkerRanges = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "MarkerOptions", {
        /**
         *  IMarkerOptions array holding the marker info.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         *  IMarkerOptions array holding the marker info.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._markers; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._markersLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._markers).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._markers = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "Styles", {
        /**
         * Gets or sets the cluster styles
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets the cluster styles
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._styles; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._styles = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "TreatNewMarkerOptionsAsStream", {
        /**
         * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
         * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
         * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._streaming; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._streaming = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "UseDynamicSizeMarkers", {
        /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._useDynamicSizeMarker; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            this._useDynamicSizeMarker = val;
            if (val) {
                this._iconCreationCallback = function (m, info) {
                    return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, _this._dynamicMarkerBaseSize, _this._dynamicMarkerRanges);
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the marker layer.
         *
         * \@readonly
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    MapMarkerLayerDirective.prototype.LocationToPixel = /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    function (loc) {
        return this._markerService.LocationToPoint(loc);
    };
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(function () {
            var /** @type {?} */ fakeLayerDirective = {
                Id: _this._id,
                Visible: _this.Visible
            };
            if (!_this.EnableClustering) {
                _this._layerService.AddLayer(fakeLayerDirective);
                _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
                _this._service = _this._layerService;
            }
            else {
                fakeLayerDirective.LayerOffset = _this.LayerOffset;
                fakeLayerDirective.ZIndex = _this.ZIndex;
                fakeLayerDirective.ClusteringEnabled = _this.EnableClustering;
                fakeLayerDirective.ClusterPlacementMode = _this.ClusterPlacementMode;
                fakeLayerDirective.GridSize = _this.GridSize;
                fakeLayerDirective.ClusterClickAction = _this.ClusterClickAction;
                fakeLayerDirective.IconInfo = _this.ClusterIconInfo;
                fakeLayerDirective.CustomMarkerCallback = _this.CustomMarkerCallback;
                fakeLayerDirective.UseDynamicSizeMarkers = _this.UseDynamicSizeMarkers;
                _this._clusterService.AddLayer(fakeLayerDirective);
                _this._layerPromise = _this._clusterService.GetNativeLayer(fakeLayerDirective);
                _this._service = _this._clusterService;
            }
            _this._layerPromise.then(function (l) {
                l.SetVisible(_this.Visible);
                if (_this.MarkerOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdateMarkers(); });
                }
            });
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    function () {
        this._layerPromise.then(function (l) {
            l.Delete();
        });
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ shouldSetOptions = false;
        var /** @type {?} */ o = {
            id: this._id
        };
        if (changes['MarkerOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdateMarkers();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._zone.runOutsideAngular(function () {
                _this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
            });
        }
        if (changes['EnableClustering'] && !changes['EnableClustering'].firstChange) {
            if ('StopClustering' in this._service) {
                o.clusteringEnabled = this.EnableClustering;
                shouldSetOptions = true;
            }
            else {
                throw (new Error('You cannot change EnableClustering after the layer has been created.'));
            }
        }
        if (changes['ClusterPlacementMode'] && !changes['ClusterPlacementMode'].firstChange && 'StopClustering' in this._service) {
            o.placementMode = this.ClusterPlacementMode;
            shouldSetOptions = true;
        }
        if (changes['GridSize'] && !changes['GridSize'].firstChange && 'StopClustering' in this._service) {
            o.gridSize = this.GridSize;
            shouldSetOptions = true;
        }
        if (changes['ClusterClickAction'] && !changes['ClusterClickAction'].firstChange && 'StopClustering' in this._service) {
            o.zoomOnClick = this.ClusterClickAction === ClusterClickAction.ZoomIntoCluster;
            shouldSetOptions = true;
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange) ||
            (changes['IconInfo'] && !changes['IconInfo'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if (shouldSetOptions) {
            this._zone.runOutsideAngular(function () {
                var /** @type {?} */ fakeLayerDirective = { Id: _this._id };
                _this._layerPromise.then(function (l) { return l.SetOptions(o); });
            });
        }
    };
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    MapMarkerLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    function () { return 'MapMarkerLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    function (m) {
        var _this = this;
        m.AddListener('click', function (e) { return _this.MarkerClick.emit({
            Marker: m,
            Click: e,
            Location: _this._markerService.GetCoordinatesFromClick(e),
            Pixels: _this._markerService.GetPixelsFromClick(e)
        }); });
        m.AddListener('dragend', function (e) { return _this.DragEnd.emit({
            Marker: m,
            Click: e,
            Location: _this._markerService.GetCoordinatesFromClick(e),
            Pixels: _this._markerService.GetPixelsFromClick(e)
        }); });
    };
    /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
     * \@method
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.UpdateMarkers = /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            var /** @type {?} */ markers = _this._streaming ? _this._markersLast.splice(0) : _this._markers;
            // generate the promise for the markers
            var /** @type {?} */ mp = _this._service.CreateMarkers(markers, _this.IconInfo);
            // set markers once promises are fullfilled.
            mp.then(function (m) {
                m.forEach(function (marker) {
                    _this.AddEventListeners(marker);
                });
                _this._streaming ? l.AddEntities(m) : l.SetEntities(m);
            });
        });
    };
    MapMarkerLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-marker-layer'
                },] },
    ];
    /** @nocollapse */
    MapMarkerLayerDirective.ctorParameters = function () { return [
        { type: MarkerService },
        { type: LayerService },
        { type: ClusterService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapMarkerLayerDirective.propDecorators = {
        ClusterClickAction: [{ type: Input }],
        ClusterIconInfo: [{ type: Input }],
        ClusterPlacementMode: [{ type: Input }],
        CustomMarkerCallback: [{ type: Input }],
        DynamicMarkerBaseSize: [{ type: Input }],
        DynamicMarkerRanges: [{ type: Input }],
        EnableClustering: [{ type: Input }],
        GridSize: [{ type: Input }],
        IconInfo: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        MarkerOptions: [{ type: Input }],
        Styles: [{ type: Input }],
        TreatNewMarkerOptionsAsStream: [{ type: Input }],
        UseDynamicSizeMarkers: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        ZoomOnClick: [{ type: Input }],
        DynamicMarkerCreated: [{ type: Output }],
        MarkerClick: [{ type: Output }],
        DragEnd: [{ type: Output }]
    };
    return MapMarkerLayerDirective;
}());
export { MapMarkerLayerDirective };
function MapMarkerLayerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapMarkerLayerDirective.prototype._id;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._service;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._styles;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._iconCreationCallback;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._streaming;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markers;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markersLast;
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterClickAction;
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterIconInfo;
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterPlacementMode;
    /**
     * Determines whether the layer clusters. This property can only be set on creation of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.EnableClustering;
    /**
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.GridSize;
    /**
     * Gets or sets the IconInfo to be used to create a custom marker images. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.IconInfo;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.LayerOffset;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZIndex;
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZoomOnClick;
    /**
     * This event emitter gets emitted when the dynamic icon for a marker is being created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DynamicMarkerCreated;
    /**
     * This event emitter gets emitted when the user clicks a marker in the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.MarkerClick;
    /**
     * This event is fired when the user stops dragging a marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DragEnd;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._clusterService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._mapService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFnQixLQUFLLEVBQUUsTUFBTSxFQUN0QyxZQUFZLEVBQW9ELE1BQU0sRUFDekUsTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBS3hELHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlRbEIsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7Ozs7OztPQVNHO0lBQ0gsaUNBQ1ksZ0JBQ0EsZUFDQSxpQkFDQSxhQUNBO1FBSkEsbUJBQWMsR0FBZCxjQUFjO1FBQ2Qsa0JBQWEsR0FBYixhQUFhO1FBQ2Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsVUFBSyxHQUFMLEtBQUs7cUNBN09lLEtBQUs7c0NBQ0osRUFBRTtvQ0FDaUIsSUFBSSxHQUFHLENBQWlCO1lBQ3hFLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDO1lBQzlCLENBQUMsR0FBRyxFQUFFLHlCQUF5QixD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RUFBRSxvQkFBb0I7aUJBQ2pDOzs7O2dCQTFDUSxhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxVQUFVO2dCQWJpRCxNQUFNOzs7cUNBZ0ZyRSxLQUFLO2tDQVFMLEtBQUs7dUNBT0wsS0FBSzt1Q0FRTCxLQUFLO3dDQWtCTCxLQUFLO3NDQVdMLEtBQUs7bUNBU0wsS0FBSzsyQkFPTCxLQUFLOzJCQVFMLEtBQUs7OEJBT0wsS0FBSztnQ0FPTCxLQUFLO3lCQWlCTCxLQUFLO2dEQVVMLEtBQUs7d0NBVUwsS0FBSzswQkFpQkwsS0FBSzt5QkFPTCxLQUFLOzhCQVFMLEtBQUs7dUNBWUwsTUFBTTs4QkFPTixNQUFNOzBCQU9OLE1BQU07O2tDQTNRWDs7U0F1RGEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgU2ltcGxlQ2hhbmdlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyxcclxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJTWFya2VyRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItZXZlbnQnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcclxuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4vY2x1c3Rlci1sYXllcic7XHJcblxyXG4vKipcclxuICogaW50ZXJuYWwgY291bnRlciB0byB1c2UgYXMgaWRzIGZvciBtYXJrZXIuXHJcbiAqL1xyXG5sZXQgbGF5ZXJJZCA9IDEwMDAwMDA7XHJcblxyXG4vKipcclxuICogTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUgcGVyZm9ybWFudGx5IHJlbmRlcnMgYSBsYXJnZSBzZXQgb2YgbWFwIG1hcmtlciBpbnNpZGUgYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cclxuICogICAgICA8eC1tYXAtbWFya2VyLWxheWVyIFtNYXJrZXJPcHRpb25zXT1cIl9tYXJrZXJzXCI+PC94LW1hcC1tYXJrZXItbGF5ZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLW1hcmtlci1sYXllcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJQcm9taXNlOiBQcm9taXNlPExheWVyPjtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IExheWVyU2VydmljZTtcclxuICAgIHByaXZhdGUgX3N0eWxlczogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz47XHJcbiAgICBwcml2YXRlIF91c2VEeW5hbWljU2l6ZU1hcmtlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHluYW1pY01hcmtlckJhc2VTaXplID0gMTg7XHJcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyUmFuZ2VzOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgICAgIFsxMCwgJ3JnYmEoMjAsIDE4MCwgMjAsIDAuNSknXSxcclxuICAgICAgICBbMTAwLCAncmdiYSgyNTUsIDIxMCwgNDAsIDAuNSknXSxcclxuICAgICAgICBbTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLCAncmdiYSgyNTUsIDQwLCA0MCwgMC41KSddXHJcbiAgICBdKTtcclxuICAgIHByaXZhdGUgX2ljb25DcmVhdGlvbkNhbGxiYWNrOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zdHJlYW1pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21hcmtlcnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiA9IG5ldyBBcnJheTxJTWFya2VyT3B0aW9ucz4oKTtcclxuICAgIHByaXZhdGUgX21hcmtlcnNMYXN0OiBBcnJheTxJTWFya2VyT3B0aW9ucz4gPSBuZXcgQXJyYXk8SU1hcmtlck9wdGlvbnM+KCk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aGUgQ2x1c3RlciBDbGljayBBY3Rpb24ge0BsaW5rIENsdXN0ZXJDbGlja0FjdGlvbn0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBDbHVzdGVyQ2xpY2tBY3Rpb246IENsdXN0ZXJDbGlja0FjdGlvbiA9ICBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gU3VwcG9ydHMgZm9udC1iYXNlZCwgU1ZHLCBncmFwaGljcyBhbmQgbW9yZS5cclxuICAgICAqIFNlZSB7QGxpbmsgSU1hcmtlckljb25JbmZvfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIENsdXN0ZXJJY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHBsYWNlbWVudCBtb2RlLiB7QGxpbmsgQ2x1c3RlclBsYWNlbWVudE1vZGV9XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpICBwdWJsaWMgQ2x1c3RlclBsYWNlbWVudE1vZGU6IENsdXN0ZXJQbGFjZW1lbnRNb2RlID0gQ2x1c3RlclBsYWNlbWVudE1vZGUuTWVhblZhbHVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjYWxsYmFjayBpbnZva2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gTm90ZSB0aGF0IHdoZW4ge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30gaXMgZW5hYmxlZCxcclxuICAgICAqIHlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjay5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IEN1c3RvbU1hcmtlckNhbGxiYWNrKCk6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZyAgeyByZXR1cm4gdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2s7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1c3RvbU1hcmtlckNhbGxiYWNrKHZhbDogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3coXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKGBZb3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2sgd2hlbiBVc2VEeW5hbWljU2l6ZU1hcmtlcnMgaXMgc2V0IHRvIHRydWUuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0IFVzZUR5bmFtaWNTaXplTWFrZXJzIHRvIGZhbHNlLmApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgYmFzZSBzaXplIG9mIGR5bmFtaWMgbWFya2VycyBpbiBwaXhlbHMuIFRoZSBhY3R1YWx5IHNpemUgb2YgdGhlIGR5bmFtaWMgbWFya2VyIGlzIGJhc2VkIG9uIHRoaXMuXHJcbiAgICAgKiBTZWUge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlckJhc2VTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBEeW5hbWljTWFya2VyQmFzZVNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHJhbmdlcyB0byB1c2UgdG8gY2FsY3VsYXRlIGJyZWFrcG9pbnRzIGFuZCBjb2xvcnMgZm9yIGR5bmFtaWMgbWFya2Vycy5cclxuICAgICAqIFRoZSBtYXAgY29udGFpbnMga2V5L3ZhbHVlIHBhaXJzLCB3aXRoIHRoZSBrZXlzIGJlaW5nXHJcbiAgICAgKiB0aGUgYnJlYWtwb2ludCBzaXplcyBhbmQgdGhlIHZhbHVlcyB0aGUgY29sb3JzIHRvIGJlIHVzZWQgZm9yIHRoZSBkeW5hbWljIG1hcmtlciBpbiB0aGF0IHJhbmdlLiBTZWUge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlclJhbmdlcygpOiBNYXA8bnVtYmVyLCBzdHJpbmc+ICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBEeW5hbWljTWFya2VyUmFuZ2VzKHZhbDogTWFwPG51bWJlciwgc3RyaW5nPikgeyB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxheWVyIGNsdXN0ZXJzLiBUaGlzIHByb3BlcnR5IGNhbiBvbmx5IGJlIHNldCBvbiBjcmVhdGlvbiBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBFbmFibGVDbHVzdGVyaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGdyaWQgc2l6ZSB0byBiZSB1c2VkIGZvciBjbHVzdGVyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgR3JpZFNpemU6IG51bWJlciA9IDE1MDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgSWNvbkluZm8gdG8gYmUgdXNlZCB0byBjcmVhdGUgYSBjdXN0b20gbWFya2VyIGltYWdlcy4gU3VwcG9ydHMgZm9udC1iYXNlZCwgU1ZHLCBncmFwaGljcyBhbmQgbW9yZS5cclxuICAgICAqIFNlZSB7QGxpbmsgSU1hcmtlckljb25JbmZvfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEljb25JbmZvOiBJTWFya2VySWNvbkluZm87XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgQW4gb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHBvc2l0aW9uaW5nIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExheWVyT2Zmc2V0OiBJUG9pbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIElNYXJrZXJPcHRpb25zIGFycmF5IGhvbGRpbmcgdGhlIG1hcmtlciBpbmZvLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgTWFya2VyT3B0aW9ucygpOiBBcnJheTxJTWFya2VyT3B0aW9ucz4geyByZXR1cm4gdGhpcy5fbWFya2VyczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTWFya2VyT3B0aW9ucyh2YWw6IEFycmF5PElNYXJrZXJPcHRpb25zPikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RyZWFtaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzTGFzdC5wdXNoKC4uLnZhbC5zbGljZSgwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goLi4udmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMgPSB2YWwuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgc3R5bGVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBTdHlsZXMoKTogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4geyByZXR1cm4gdGhpcy5fc3R5bGVzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBTdHlsZXModmFsOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPikgeyB0aGlzLl9zdHlsZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0byB0cmVhdCBjaGFuZ2VzIGluIHRoZSBNYXJrZXJPcHRpb25zIGFzIHN0cmVhbXMgb2YgbmV3IG1hcmtlcnMuIEluIHRoc2kgbW9kZSwgY2hhbmdpbmcgdGhlXHJcbiAgICAgKiBBcnJheSBzdXBwbGllZCBpbiBNYXJrZXJPcHRpb25zIHdpbGwgYmUgaW5jcmVtZW50YWxseSBkcmF3biBvbiB0aGUgbWFwIGFzIG9wcG9zZWQgdG8gcmVwbGFjZSB0aGUgbWFya2VycyBvbiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVHJlYXROZXdNYXJrZXJPcHRpb25zQXNTdHJlYW0oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdHJlYW1pbmc7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFRyZWF0TmV3TWFya2VyT3B0aW9uc0FzU3RyZWFtKHZhbDogYm9vbGVhbikgeyB0aGlzLl9zdHJlYW1pbmcgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHVzZSBkeW5hbWljIG1hcmtlcnMuIER5bmFtaWMgbWFya2VycyBjaGFuZ2UgaW4gc2l6ZSBhbmQgY29sb3IgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2ZcclxuICAgICAqIHBpbnMgaW4gdGhlIGNsdXN0ZXIuIElmIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgdGFrZSBwcmVjZW5kZW5jZSBvdmVyIGFueSBjdXN0b20gbWFya2VyIGNyZWF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVXNlRHluYW1pY1NpemVNYXJrZXJzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXI7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFVzZUR5bmFtaWNTaXplTWFya2Vycyh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXIgPSB2YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gKG06IEFycmF5PE1hcmtlcj4sIGluZm86IElNYXJrZXJJY29uSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuQ3JlYXRlRHluYW1pY1NpemVNYXJrZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0ubGVuZ3RoLCBpbmZvLCB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUsIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1hcmtlciBsYXllclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgY2x1c3RlciBzaG91bGQgem9vbSBpbiBvbiBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBab29tT25DbGljazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIERlbGVnYXRlc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIGR5bmFtaWMgaWNvbiBmb3IgYSBtYXJrZXIgaXMgYmVpbmcgY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBEeW5hbWljTWFya2VyQ3JlYXRlZDogRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3MgYSBtYXJrZXIgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIE1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIERyYWdFbmQ6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgbWFya2VyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfbWFya2VyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBNYXJrZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIExheWVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX2NsdXN0ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBOZ1pvbmV9IHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX21hcmtlclNlcnZpY2U6IE1hcmtlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY2x1c3RlclNlcnZpY2U6IENsdXN0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBsYXllcklkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlcyBhIGdlbyBsb2NhdGlvbiB0byBhIHBpeGVsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBtYXAgdmlld3BvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtsb2NdIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyBhbiB7QGxpbmsgSVBvaW50fSByZXByZXNlbnRpbmcgdGhlIHBpeGVsIGNvb3JkaW5hdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BpeGVsKGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkxvY2F0aW9uVG9Qb2ludChsb2MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGxheWVyT3B0aW9uczogSUxheWVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmFrZUxheWVyRGlyZWN0aXZlOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBJZCA6IHRoaXMuX2lkLFxyXG4gICAgICAgICAgICAgICAgVmlzaWJsZTogdGhpcy5WaXNpYmxlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5FbmFibGVDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IHRoaXMuX2xheWVyU2VydmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5MYXllck9mZnNldCA9IHRoaXMuTGF5ZXJPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuWkluZGV4ID0gdGhpcy5aSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ2x1c3RlcmluZ0VuYWJsZWQgPSB0aGlzLkVuYWJsZUNsdXN0ZXJpbmc7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ2x1c3RlclBsYWNlbWVudE1vZGUgPSB0aGlzLkNsdXN0ZXJQbGFjZW1lbnRNb2RlO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkdyaWRTaXplID0gdGhpcy5HcmlkU2l6ZTtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5DbHVzdGVyQ2xpY2tBY3Rpb24gPSB0aGlzLkNsdXN0ZXJDbGlja0FjdGlvbjtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5JY29uSW5mbyA9IHRoaXMuQ2x1c3Rlckljb25JbmZvO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkN1c3RvbU1hcmtlckNhbGxiYWNrID0gdGhpcy5DdXN0b21NYXJrZXJDYWxsYmFjaztcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5Vc2VEeW5hbWljU2l6ZU1hcmtlcnMgPSB0aGlzLlVzZUR5bmFtaWNTaXplTWFya2VycztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkFkZExheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UgPSB0aGlzLl9jbHVzdGVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IHRoaXMuX2NsdXN0ZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5NYXJrZXJPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLlVwZGF0ZU1hcmtlcnMoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBsLkRlbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgICAgICBsZXQgc2hvdWxkU2V0T3B0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG86IElDbHVzdGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoY2hhbmdlc1snTWFya2VyT3B0aW9ucyddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVNYXJrZXJzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddICYmICFjaGFuZ2VzWydWaXNpYmxlJ10uZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydFbmFibGVDbHVzdGVyaW5nJ10gJiYgIWNoYW5nZXNbJ0VuYWJsZUNsdXN0ZXJpbmcnXS5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICBpZiAoJ1N0b3BDbHVzdGVyaW5nJyBpbiB0aGlzLl9zZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICBvLmNsdXN0ZXJpbmdFbmFibGVkID0gdGhpcy5FbmFibGVDbHVzdGVyaW5nO1xyXG4gICAgICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBFbmFibGVDbHVzdGVyaW5nIGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBjcmVhdGVkLicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snQ2x1c3RlclBsYWNlbWVudE1vZGUnXSAmJiAhY2hhbmdlc1snQ2x1c3RlclBsYWNlbWVudE1vZGUnXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcclxuICAgICAgICAgICAgby5wbGFjZW1lbnRNb2RlID0gdGhpcy5DbHVzdGVyUGxhY2VtZW50TW9kZTtcclxuICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydHcmlkU2l6ZSddICYmICFjaGFuZ2VzWydHcmlkU2l6ZSddLmZpcnN0Q2hhbmdlICYmICdTdG9wQ2x1c3RlcmluZycgaW4gdGhpcy5fc2VydmljZSkge1xyXG4gICAgICAgICAgICBvLmdyaWRTaXplID0gdGhpcy5HcmlkU2l6ZTtcclxuICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbHVzdGVyQ2xpY2tBY3Rpb24nXSAmJiAhY2hhbmdlc1snQ2x1c3RlckNsaWNrQWN0aW9uJ10uZmlyc3RDaGFuZ2UgJiYgJ1N0b3BDbHVzdGVyaW5nJyBpbiB0aGlzLl9zZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIG8uem9vbU9uQ2xpY2sgPSB0aGlzLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlcjtcclxuICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY2hhbmdlc1snWkluZGV4J10gJiYgIWNoYW5nZXNbJ1pJbmRleCddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGF5ZXJPZmZzZXQnXSAmJiAhY2hhbmdlc1snTGF5ZXJPZmZzZXQnXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0ljb25JbmZvJ10gJiYgIWNoYW5nZXNbJ0ljb25JbmZvJ10uZmlyc3RDaGFuZ2UpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIFpJbmRleCBvciBMYXllck9mZnNldCBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gY3JlYXRlZC4nKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvdWxkU2V0T3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge0lkIDogdGhpcy5faWR9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldE9wdGlvbnMobykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBNYXJrZXIgSWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWFya2VyIGlkLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ01hcE1hcmtlckxheWVyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG0gLSB0aGUgbWFya2VyIGZvciB3aGljaCB0byBhZGQgdGhlIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKG06IE1hcmtlcik6IHZvaWQge1xyXG4gICAgICAgIG0uQWRkTGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuTWFya2VyQ2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXI6IG0sXHJcbiAgICAgICAgICAgICAgICBDbGljazogZSxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUpLFxyXG4gICAgICAgICAgICAgICAgUGl4ZWxzOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldFBpeGVsc0Zyb21DbGljayhlKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgbS5BZGRMaXN0ZW5lcignZHJhZ2VuZCcsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdFbmQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXI6IG0sXHJcbiAgICAgICAgICAgICAgICBDbGljazogZSxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUpLFxyXG4gICAgICAgICAgICAgICAgUGl4ZWxzOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldFBpeGVsc0Zyb21DbGljayhlKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG9yIHVwZGF0ZXMgdGhlIG1hcmtlcnMgYmFzZWQgb24gdGhlIG1hcmtlciBvcHRpb25zLiBUaGlzIHdpbGwgcGxhY2UgdGhlIG1hcmtlcnMgb24gdGhlIG1hcFxyXG4gICAgICogYW5kIHJlZ2lzdGVyIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBVcGRhdGVNYXJrZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllclByb21pc2UgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWFya2VyczogQXJyYXk8SU1hcmtlck9wdGlvbnM+ID0gdGhpcy5fc3RyZWFtaW5nID8gdGhpcy5fbWFya2Vyc0xhc3Quc3BsaWNlKDApIDogdGhpcy5fbWFya2VycztcclxuXHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgbWFya2Vyc1xyXG4gICAgICAgICAgICBjb25zdCBtcDogUHJvbWlzZTxBcnJheTxNYXJrZXI+PiA9IHRoaXMuX3NlcnZpY2UuQ3JlYXRlTWFya2VycyhtYXJrZXJzLCB0aGlzLkljb25JbmZvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBtYXJrZXJzIG9uY2UgcHJvbWlzZXMgYXJlIGZ1bGxmaWxsZWQuXHJcbiAgICAgICAgICAgIG1wLnRoZW4obSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtLmZvckVhY2gobWFya2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJlYW1pbmcgPyBsLkFkZEVudGl0aWVzKG0pIDogbC5TZXRFbnRpdGllcyhtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==