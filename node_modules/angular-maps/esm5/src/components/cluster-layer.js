/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterService } from '../services/cluster.service';
import { MapLayerDirective } from './map-layer';
/**
 *
 * Creates a cluster layer on a {\@link MapComponent}.
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
 *   <x-map [Latitude]='lat' [Longitude]='lng' [Zoom]='zoom'>
 *     <x-cluster-layer [Visible]='visible'>
 *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
 *     </x-cluster-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var ClusterLayerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterLayerDirective, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of ClusterLayerDirective.
     *
     * @param _layerService - Concreted implementation of a cluster layer service for the underlying maps
     * implementations. Generally provided via injections.
     * @param _containerRef - A reference to the view container of the layer. Generally provided via injection.
     *
     * @memberof ClusterLayerDirective
     */
    function ClusterLayerDirective(_layerService, _containerRef) {
        var _this = _super.call(this, _layerService, _containerRef) || this;
        _this._clusteringEnabled = true;
        _this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
        _this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
        _this._useDynamicSizeMarker = false;
        _this._dynamicMarkerBaseSize = 18;
        _this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        _this._zoomOnClick = true;
        return _this;
    }
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusterClickAction", {
        ///
        /// Property defintions
        ///
        /**
         * Gets or sets the the Cluster Click Action {@link ClusterClickAction}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusterClickAction; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusterClickAction = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusteringEnabled", {
        /**
         * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
         * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
         * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusteringEnabled; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusteringEnabled = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusterPlacementMode", {
        /**
         * Gets or sets the cluster placement mode. {@link ClusterPlacementMode}
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusterPlacementMode; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusterPlacementMode = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "CustomMarkerCallback", {
        /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerBaseSize", {
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
    Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerRanges", {
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
    Object.defineProperty(ClusterLayerDirective.prototype, "GridSize", {
        /**
         * Gets or sets the grid size to be used for clustering.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the grid size to be used for clustering.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._gridSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._gridSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "IconInfo", {
        /**
         * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
         * See {@link IMarkerIconInfo}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
         * See {\@link IMarkerIconInfo}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._iconInfo; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._iconInfo = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "LayerOffset", {
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._layerOffset; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._layerOffset = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "MinimumClusterSize", {
        /**
         * Gets or sets the minimum pins required to form a cluster
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the minimum pins required to form a cluster
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._minimumClusterSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._minimumClusterSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "SpiderClusterOptions", {
        /**
         * Gets or sets the options for spider clustering behavior. See {@link ISpiderClusterOptions}
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._spiderClusterOptions; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._spiderClusterOptions = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "Styles", {
        /**
         * Gets or sets the cluster styles
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the cluster styles
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "UseDynamicSizeMarkers", {
        /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "ZIndex", {
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._zIndex; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._zIndex = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ZoomOnClick", {
        /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._zoomOnClick; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._zoomOnClick = val; },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} size - The number of markers in the cluster.
     * @param {?} info  - The icon info to be used. This will be hydrated with
     * the actualy dimensions of the created markers and is used by the underlying model/services
     * to correctly offset the marker for correct positioning.
     * @param {?} baseMarkerSize - The base size for dynmic markers.
     * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
     * @return {?} - An string containing the SVG for the marker.
     *
     */
    ClusterLayerDirective.CreateDynamicSizeMarker = /**
     * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} size - The number of markers in the cluster.
     * @param {?} info  - The icon info to be used. This will be hydrated with
     * the actualy dimensions of the created markers and is used by the underlying model/services
     * to correctly offset the marker for correct positioning.
     * @param {?} baseMarkerSize - The base size for dynmic markers.
     * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
     * @return {?} - An string containing the SVG for the marker.
     *
     */
    function (size, info, baseMarkerSize, ranges) {
        var /** @type {?} */ mr = baseMarkerSize;
        var /** @type {?} */ outline = mr * 0.35;
        var /** @type {?} */ total = size;
        var /** @type {?} */ r = Math.log(total) / Math.log(10) * 5 + mr;
        var /** @type {?} */ d = r * 2;
        var /** @type {?} */ fillColor;
        ranges.forEach(function (v, k) {
            if (total <= k && !fillColor) {
                fillColor = v;
            }
        });
        if (!fillColor) {
            fillColor = 'rgba(20, 180, 20, 0.5)';
        }
        // Create an SVG string of two circles, one on top of the other, with the specified radius and color.
        var /** @type {?} */ svg = ["<svg xmlns='http://www.w3.org/2000/svg' width='" + d + "' height='" + d + "'>",
            "<circle cx='" + r + "' cy='" + r + "' r='" + r + "' fill='" + fillColor + "'/>",
            "<circle cx='" + r + "' cy='" + r + "' r='" + (r - outline) + "' fill='" + fillColor + "'/>",
            "</svg>"];
        info.size = { width: d, height: d };
        info.markerOffsetRatio = { x: 0.5, y: 0.5 };
        info.textOffset = { x: 0, y: r - 8 };
        return svg.join('');
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ClusterLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['ClusterClickAction']) {
            throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
        }
        var /** @type {?} */ options = { id: this._id };
        if (changes['ClusteringEnabled']) {
            options.clusteringEnabled = this._clusteringEnabled;
        }
        if (changes['GridSize']) {
            options.gridSize = this._gridSize;
        }
        if (changes['LayerOffset']) {
            options.layerOffset = this._layerOffset;
        }
        if (changes['SpiderClusterOptions']) {
            options.spiderClusterOptions = this._spiderClusterOptions;
        }
        if (changes['ZIndex']) {
            options.zIndex = this._zIndex;
        }
        if (changes['Visible']) {
            options.visible = this._visible;
        }
        this._layerService.GetNativeLayer(this).then(function (l) {
            l.SetOptions(options);
        });
    };
    ClusterLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-cluster-layer'
                },] },
    ];
    /** @nocollapse */
    ClusterLayerDirective.ctorParameters = function () { return [
        { type: ClusterService },
        { type: ViewContainerRef }
    ]; };
    ClusterLayerDirective.propDecorators = {
        ClusterClickAction: [{ type: Input }],
        ClusteringEnabled: [{ type: Input }],
        ClusterPlacementMode: [{ type: Input }],
        CustomMarkerCallback: [{ type: Input }],
        DynamicMarkerBaseSize: [{ type: Input }],
        DynamicMarkerRanges: [{ type: Input }],
        GridSize: [{ type: Input }],
        IconInfo: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        MinimumClusterSize: [{ type: Input }],
        SpiderClusterOptions: [{ type: Input }],
        Styles: [{ type: Input }],
        UseDynamicSizeMarkers: [{ type: Input }],
        ZIndex: [{ type: Input }],
        ZoomOnClick: [{ type: Input }]
    };
    return ClusterLayerDirective;
}(MapLayerDirective));
export { ClusterLayerDirective };
function ClusterLayerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ClusterLayerDirective.prototype._clusteringEnabled;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterPlacementMode;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterClickAction;
    /** @type {?} */
    ClusterLayerDirective.prototype._spiderClusterOptions;
    /** @type {?} */
    ClusterLayerDirective.prototype._zIndex;
    /** @type {?} */
    ClusterLayerDirective.prototype._gridSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._layerOffset;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconInfo;
    /** @type {?} */
    ClusterLayerDirective.prototype._minimumClusterSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._styles;
    /** @type {?} */
    ClusterLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    ClusterLayerDirective.prototype._zoomOnClick;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconCreationCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUNHLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQ0wsaURBQWlCO0lBcU94RCxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7T0FRRztJQUNILCtCQUFZLGFBQTZCLEVBQUUsYUFBK0I7UUFBMUUsWUFDSSxrQkFBTSxhQUFhLEVBQUUsYUFBYSxDQUFDLFNBQ3RDO21DQS9PNEIsSUFBSTtzQ0FDcUIsb0JBQW9CLENBQUMsU0FBUztvQ0FDbEMsa0JBQWtCLENBQUMsZUFBZTtzQ0FRcEQsS0FBSzt1Q0FDSixFQUFFO3FDQUNpQixJQUFJLEdBQUcsQ0FBaUI7WUFDeEUsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUM7WUFDOUIsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUM7WUFDaEMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUcsd0JBQXdCLENBQUM7U0FDdkQsQ0FBQzs2QkFDcUIsSUFBSTs7S0E4TjFCO0lBbE5ELHNCQUNlLHFEQUFrQjtRQVZqQyxHQUFHO1FBQ0gsdUJBQXVCO1FBQ3ZCLEdBQUc7UUFFSDs7OztXQUlHOzs7Ozs7O1FBQ0gsY0FDMkQsTUFBTSxDQUFDLElBQUksQ0FBQyxt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QVEsQ0FBQztTQUFFO1FBRTVELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVE7WUFDbEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7OztnQkF0UlYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCOzs7O2dCQW5DUSxjQUFjO2dCQVJLLGdCQUFnQjs7O3FDQThFdkMsS0FBSztvQ0FVTCxLQUFLO3VDQVNMLEtBQUs7dUNBVUwsS0FBSzt3Q0FrQkwsS0FBSztzQ0FXTCxLQUFLOzJCQVNMLEtBQUs7MkJBVUwsS0FBSzs4QkFTTCxLQUFLO3FDQVVMLEtBQUs7dUNBU0wsS0FBSzt5QkFVTCxLQUFLO3dDQVVMLEtBQUs7eUJBaUJMLEtBQUs7OEJBVUwsS0FBSzs7Z0NBeE9WO0VBOEMyQyxpQkFBaUI7U0FBL0MscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSxcclxuICAgIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzcGlkZXItY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuaW1wb3J0IHsgTWFwTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL21hcC1sYXllcic7XHJcblxyXG4vKipcclxuICpcclxuICogQ3JlYXRlcyBhIGNsdXN0ZXIgbGF5ZXIgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW1pvb21dPSd6b29tJz5cclxuICogICAgIDx4LWNsdXN0ZXItbGF5ZXIgW1Zpc2libGVdPSd2aXNpYmxlJz5cclxuICogICAgICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW0xhYmVsXT0nJ00nJz48L3gtbWFwLW1hcmtlcj5cclxuICogICAgIDwveC1jbHVzdGVyLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LWNsdXN0ZXItbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgZXh0ZW5kcyBNYXBMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9jbHVzdGVyaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgICBwcml2YXRlIF9jbHVzdGVyUGxhY2VtZW50TW9kZTogQ2x1c3RlclBsYWNlbWVudE1vZGUgPSBDbHVzdGVyUGxhY2VtZW50TW9kZS5NZWFuVmFsdWU7XHJcbiAgICBwcml2YXRlIF9jbHVzdGVyQ2xpY2tBY3Rpb246IENsdXN0ZXJDbGlja0FjdGlvbiA9IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXI7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJDbHVzdGVyT3B0aW9uczogSVNwaWRlckNsdXN0ZXJPcHRpb25zO1xyXG4gICAgcHJpdmF0ZSBfekluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9ncmlkU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJPZmZzZXQ6IElQb2ludDtcclxuICAgIHByaXZhdGUgX2ljb25JbmZvOiBJTWFya2VySWNvbkluZm87XHJcbiAgICBwcml2YXRlIF9taW5pbXVtQ2x1c3RlclNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3N0eWxlczogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz47XHJcbiAgICBwcml2YXRlIF91c2VEeW5hbWljU2l6ZU1hcmtlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHluYW1pY01hcmtlckJhc2VTaXplID0gMTg7XHJcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyUmFuZ2VzOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgICAgIFsxMCwgJ3JnYmEoMjAsIDE4MCwgMjAsIDAuNSknXSxcclxuICAgICAgICBbMTAwLCAncmdiYSgyNTUsIDIxMCwgNDAsIDAuNSknXSxcclxuICAgICAgICBbTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLCAncmdiYSgyNTUsIDQwLCA0MCwgMC41KSddXHJcbiAgICBdKTtcclxuICAgIHByaXZhdGUgX3pvb21PbkNsaWNrID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2ljb25DcmVhdGlvbkNhbGxiYWNrOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmc7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW50aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRoZSBDbHVzdGVyIENsaWNrIEFjdGlvbiB7QGxpbmsgQ2x1c3RlckNsaWNrQWN0aW9ufS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyQ2xpY2tBY3Rpb24oKTogQ2x1c3RlckNsaWNrQWN0aW9uICB7IHJldHVybiB0aGlzLl9jbHVzdGVyQ2xpY2tBY3Rpb247IH1cclxuICAgICAgICBwdWJsaWMgc2V0IENsdXN0ZXJDbGlja0FjdGlvbih2YWw6IENsdXN0ZXJDbGlja0FjdGlvbikgeyB0aGlzLl9jbHVzdGVyQ2xpY2tBY3Rpb24gPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSBjbHVzdGVyaW5nIGxheWVyIGVuYWJsZXMgY2x1c3RlcmluZy4gV2hlbiBzZXQgdG8gZmFsc2UsIHRoZSBsYXllclxyXG4gICAgICogYmVoYXZlcyBsaWtlIGEgZ2VuZXJpYyBsYXllci4gVGhpcyBpcyBoYW5keSBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IGNsdXN0ZXJpbmcgYXQgY2VydGFpbiB6b29tIGxldmVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyaW5nRW5hYmxlZCgpOiBib29sZWFuICB7IHJldHVybiB0aGlzLl9jbHVzdGVyaW5nRW5hYmxlZDsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ2x1c3RlcmluZ0VuYWJsZWQodmFsOiBib29sZWFuKSB7IHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgcGxhY2VtZW50IG1vZGUuIHtAbGluayBDbHVzdGVyUGxhY2VtZW50TW9kZX1cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyUGxhY2VtZW50TW9kZSgpOiBDbHVzdGVyUGxhY2VtZW50TW9kZSAgeyByZXR1cm4gdGhpcy5fY2x1c3RlclBsYWNlbWVudE1vZGU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IENsdXN0ZXJQbGFjZW1lbnRNb2RlKHZhbDogQ2x1c3RlclBsYWNlbWVudE1vZGUpIHsgdGhpcy5fY2x1c3RlclBsYWNlbWVudE1vZGUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2FsbGJhY2sgaW52b2tlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIE5vdGUgdGhhdCB3aGVuIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9IGlzIGVuYWJsZWQsXHJcbiAgICAgKiB5b3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2suXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2soKTogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nICB7IHJldHVybiB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjazsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2sodmFsOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYFlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjayB3aGVuIFVzZUR5bmFtaWNTaXplTWFya2VycyBpcyBzZXQgdG8gdHJ1ZS5cclxuICAgICAgICAgICAgICAgICAgICBTZXQgVXNlRHluYW1pY1NpemVNYWtlcnMgdG8gZmFsc2UuYClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBiYXNlIHNpemUgb2YgZHluYW1pYyBtYXJrZXJzIGluIHBpeGVscy4gVGhlIGFjdHVhbHkgc2l6ZSBvZiB0aGUgZHluYW1pYyBtYXJrZXIgaXMgYmFzZWQgb24gdGhpcy5cclxuICAgICAqIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyQmFzZVNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxyXG4gICAgICogVGhlIG1hcCBjb250YWlucyBrZXkvdmFsdWUgcGFpcnMsIHdpdGggdGhlIGtleXMgYmVpbmdcclxuICAgICAqIHRoZSBicmVha3BvaW50IHNpemVzIGFuZCB0aGUgdmFsdWVzIHRoZSBjb2xvcnMgdG8gYmUgdXNlZCBmb3IgdGhlIGR5bmFtaWMgbWFya2VyIGluIHRoYXQgcmFuZ2UuIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyUmFuZ2VzKCk6IE1hcDxudW1iZXIsIHN0cmluZz4gIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJSYW5nZXModmFsOiBNYXA8bnVtYmVyLCBzdHJpbmc+KSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZ3JpZCBzaXplIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgR3JpZFNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9ncmlkU2l6ZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgR3JpZFNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fZ3JpZFNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgSWNvbkluZm8gdG8gYmUgdXNlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIFN1cHBvcnRzIGZvbnQtYmFzZWQsIFNWRywgZ3JhcGhpY3MgYW5kIG1vcmUuXHJcbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSWNvbkluZm8oKTogSU1hcmtlckljb25JbmZvICB7IHJldHVybiB0aGlzLl9pY29uSW5mbzsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSWNvbkluZm8odmFsOiBJTWFya2VySWNvbkluZm8pIHsgdGhpcy5faWNvbkluZm8gPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyBBbiBvZmZzZXQgYXBwbGllZCB0byB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IExheWVyT2Zmc2V0KCk6IElQb2ludCAgeyByZXR1cm4gdGhpcy5fbGF5ZXJPZmZzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IExheWVyT2Zmc2V0KHZhbDogSVBvaW50KSB7IHRoaXMuX2xheWVyT2Zmc2V0ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gcGlucyByZXF1aXJlZCB0byBmb3JtIGEgY2x1c3RlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgTWluaW11bUNsdXN0ZXJTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fbWluaW11bUNsdXN0ZXJTaXplOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBNaW5pbXVtQ2x1c3RlclNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fbWluaW11bUNsdXN0ZXJTaXplID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG9wdGlvbnMgZm9yIHNwaWRlciBjbHVzdGVyaW5nIGJlaGF2aW9yLiBTZWUge0BsaW5rIElTcGlkZXJDbHVzdGVyT3B0aW9uc31cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBTcGlkZXJDbHVzdGVyT3B0aW9ucygpOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgeyByZXR1cm4gdGhpcy5fc3BpZGVyQ2x1c3Rlck9wdGlvbnM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFNwaWRlckNsdXN0ZXJPcHRpb25zKHZhbDogSVNwaWRlckNsdXN0ZXJPcHRpb25zKSB7IHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgc3R5bGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBTdHlsZXMoKTogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4geyByZXR1cm4gdGhpcy5fc3R5bGVzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBTdHlsZXModmFsOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPikgeyB0aGlzLl9zdHlsZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHVzZSBkeW5hbWljIG1hcmtlcnMuIER5bmFtaWMgbWFya2VycyBjaGFuZ2UgaW4gc2l6ZSBhbmQgY29sb3IgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2ZcclxuICAgICAqIHBpbnMgaW4gdGhlIGNsdXN0ZXIuIElmIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgdGFrZSBwcmVjZW5kZW5jZSBvdmVyIGFueSBjdXN0b20gbWFya2VyIGNyZWF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFVzZUR5bmFtaWNTaXplTWFya2VycygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnModmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyID0gdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IChtOiBBcnJheTxNYXJrZXI+LCBpbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2x1c3RlckxheWVyRGlyZWN0aXZlLkNyZWF0ZUR5bmFtaWNTaXplTWFya2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtLmxlbmd0aCwgaW5mbywgdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplLCB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFpJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fekluZGV4OyB9XHJcbiAgICAgICAgcHVibGljIHNldCBaSW5kZXgodmFsOiBudW1iZXIpIHsgdGhpcy5fekluZGV4ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgY2x1c3RlciBzaG91bGQgem9vbSBpbiBvbiBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgWm9vbU9uQ2xpY2soKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl96b29tT25DbGljazsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgWm9vbU9uQ2xpY2sodmFsOiBib29sZWFuKSB7IHRoaXMuX3pvb21PbkNsaWNrID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBkeW5hbWljIHNpemUgbWFya2VyIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXIgbWFya2VycyBpZiBVc2VEeW5hbWljU2l6ZU1hcmtlcnMgaXMgc2V0IHRvIHRydWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNpemUgLSBUaGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXHJcbiAgICAgKiBAcGFyYW0gaW5mbyAgLSBUaGUgaWNvbiBpbmZvIHRvIGJlIHVzZWQuIFRoaXMgd2lsbCBiZSBoeWRyYXRlZCB3aXRoXHJcbiAgICAgKiB0aGUgYWN0dWFseSBkaW1lbnNpb25zIG9mIHRoZSBjcmVhdGVkIG1hcmtlcnMgYW5kIGlzIHVzZWQgYnkgdGhlIHVuZGVybHlpbmcgbW9kZWwvc2VydmljZXNcclxuICAgICAqIHRvIGNvcnJlY3RseSBvZmZzZXQgdGhlIG1hcmtlciBmb3IgY29ycmVjdCBwb3NpdGlvbmluZy5cclxuICAgICAqIEBwYXJhbSBiYXNlTWFya2VyU2l6ZSAtIFRoZSBiYXNlIHNpemUgZm9yIGR5bm1pYyBtYXJrZXJzLlxyXG4gICAgICogQHBhcmFtIHJhbmdlcyAtIFRoZSByYW5nZXMgdG8gdXNlIHRvIGNhbGN1bGF0ZSBicmVha3BvaW50cyBhbmQgY29sb3JzIGZvciBkeW5hbWljIG1hcmtlcnMuXHJcbiAgICAgKiBUaGUgbWFwIGNvbnRhaW5zIGtleS92YWx1ZSBwYWlycywgd2l0aCB0aGUga2V5cyBiZWluZ1xyXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIC0gQW4gc3RyaW5nIGNvbnRhaW5pbmcgdGhlIFNWRyBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlRHluYW1pY1NpemVNYXJrZXIoc2l6ZTogbnVtYmVyLCBpbmZvOiBJTWFya2VySWNvbkluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VNYXJrZXJTaXplOiBudW1iZXIsIHJhbmdlczogTWFwPG51bWJlciwgc3RyaW5nPik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbXI6IG51bWJlciA9IGJhc2VNYXJrZXJTaXplO1xyXG4gICAgICAgIGNvbnN0IG91dGxpbmU6IG51bWJlciA9IG1yICogMC4zNTtcclxuICAgICAgICBjb25zdCB0b3RhbDogbnVtYmVyID0gc2l6ZTtcclxuICAgICAgICBjb25zdCByOiBudW1iZXIgPSBNYXRoLmxvZyh0b3RhbCkgLyBNYXRoLmxvZygxMCkgKiA1ICsgbXI7XHJcbiAgICAgICAgY29uc3QgZDogbnVtYmVyID0gciAqIDI7XHJcbiAgICAgICAgbGV0IGZpbGxDb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIHJhbmdlcy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b3RhbCA8PSBrICYmICFmaWxsQ29sb3IpIHsgZmlsbENvbG9yID0gdjsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZmlsbENvbG9yKSB7IGZpbGxDb2xvciA9ICdyZ2JhKDIwLCAxODAsIDIwLCAwLjUpJzsgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW4gU1ZHIHN0cmluZyBvZiB0d28gY2lyY2xlcywgb25lIG9uIHRvcCBvZiB0aGUgb3RoZXIsIHdpdGggdGhlIHNwZWNpZmllZCByYWRpdXMgYW5kIGNvbG9yLlxyXG4gICAgICAgIGNvbnN0IHN2ZzogQXJyYXk8YW55PiA9IFtgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScke2R9JyBoZWlnaHQ9JyR7ZH0nPmAsXHJcbiAgICAgICAgICAgIGA8Y2lyY2xlIGN4PScke3J9JyBjeT0nJHtyfScgcj0nJHtyfScgZmlsbD0nJHtmaWxsQ29sb3J9Jy8+YCxcclxuICAgICAgICAgICAgYDxjaXJjbGUgY3g9JyR7cn0nIGN5PScke3J9JyByPScke3IgLSBvdXRsaW5lfScgZmlsbD0nJHtmaWxsQ29sb3J9Jy8+YCxcclxuICAgICAgICAgICAgYDwvc3ZnPmBdO1xyXG4gICAgICAgIGluZm8uc2l6ZSA9IHsgd2lkdGg6IGQsIGhlaWdodDogZCB9O1xyXG4gICAgICAgIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8gPSB7IHg6IDAuNSwgeTogMC41IH07XHJcbiAgICAgICAgaW5mby50ZXh0T2Zmc2V0ID0geyB4OiAwLCB5OiByIC0gOCB9O1xyXG4gICAgICAgIHJldHVybiBzdmcuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyIGxheWVyIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHNcclxuICAgICAqIGltcGxlbWVudGF0aW9ucy4gR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIF9jb250YWluZXJSZWYgLSBBIHJlZmVyZW5jZSB0byB0aGUgdmlldyBjb250YWluZXIgb2YgdGhlIGxheWVyLiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKF9sYXllclNlcnZpY2U6IENsdXN0ZXJTZXJ2aWNlLCBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgc3VwZXIoX2xheWVyU2VydmljZSwgX2NvbnRhaW5lclJlZik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbHVzdGVyQ2xpY2tBY3Rpb24nXSkge1xyXG4gICAgICAgICAgICB0aHJvdyAoXHJcbiAgICAgICAgICAgICAgICBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIHRoZSBDbHVzdGVyQ2xpY2tBY3Rpb24gYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBsYXllcnNlcnZpY2UuJylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHsgaWQ6IHRoaXMuX2lkIH07XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJpbmdFbmFibGVkJ10pIHsgb3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA9IHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0dyaWRTaXplJ10pIHsgb3B0aW9ucy5ncmlkU2l6ZSA9IHRoaXMuX2dyaWRTaXplOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10pIHsgb3B0aW9ucy5sYXllck9mZnNldCA9IHRoaXMuX2xheWVyT2Zmc2V0OyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1NwaWRlckNsdXN0ZXJPcHRpb25zJ10pIHsgb3B0aW9ucy5zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1pJbmRleCddKSB7IG9wdGlvbnMuekluZGV4ID0gdGhpcy5fekluZGV4OyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSkgeyBvcHRpb25zLnZpc2libGUgPSB0aGlzLl92aXNpYmxlOyB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcih0aGlzKS50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBsLlNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==