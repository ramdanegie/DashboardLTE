/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class ClusterLayerDirective extends MapLayerDirective {
    /**
     * Creates an instance of ClusterLayerDirective.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} _layerService - Concreted implementation of a cluster layer service for the underlying maps
     * implementations. Generally provided via injections.
     * @param {?} _containerRef - A reference to the view container of the layer. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        super(_layerService, _containerRef);
        this._clusteringEnabled = true;
        this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
        this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._zoomOnClick = true;
    }
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterClickAction() { return this._clusterClickAction; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterClickAction(val) { this._clusterClickAction = val; }
    /**
     * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
     * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusteringEnabled() { return this._clusteringEnabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusteringEnabled(val) { this._clusteringEnabled = val; }
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterPlacementMode() { return this._clusterPlacementMode; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterPlacementMode(val) { this._clusterPlacementMode = val; }
    /**
     * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
     * you cannot set a custom marker callback.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get CustomMarkerCallback() { return this._iconCreationCallback; }
    /**
     * @param {?} val
     * @return {?}
     */
    set CustomMarkerCallback(val) {
        if (this._useDynamicSizeMarker) {
            throw (new Error(`You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.
                    Set UseDynamicSizeMakers to false.`));
        }
        this._iconCreationCallback = val;
    }
    /**
     * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
     * See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerBaseSize() { return this._dynamicMarkerBaseSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerBaseSize(val) { this._dynamicMarkerBaseSize = val; }
    /**
     * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerRanges() { return this._dynamicMarkerRanges; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerRanges(val) { this._dynamicMarkerRanges = val; }
    /**
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get GridSize() { return this._gridSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set GridSize(val) { this._gridSize = val; }
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get IconInfo() { return this._iconInfo; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IconInfo(val) { this._iconInfo = val; }
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get LayerOffset() { return this._layerOffset; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LayerOffset(val) { this._layerOffset = val; }
    /**
     * Gets or sets the minimum pins required to form a cluster
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get MinimumClusterSize() { return this._minimumClusterSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set MinimumClusterSize(val) { this._minimumClusterSize = val; }
    /**
     * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get SpiderClusterOptions() { return this._spiderClusterOptions; }
    /**
     * @param {?} val
     * @return {?}
     */
    set SpiderClusterOptions(val) { this._spiderClusterOptions = val; }
    /**
     * Gets or sets the cluster styles
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get Styles() { return this._styles; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Styles(val) { this._styles = val; }
    /**
     * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
     * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get UseDynamicSizeMarkers() { return this._useDynamicSizeMarker; }
    /**
     * @param {?} val
     * @return {?}
     */
    set UseDynamicSizeMarkers(val) {
        this._useDynamicSizeMarker = val;
        if (val) {
            this._iconCreationCallback = (m, info) => {
                return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, this._dynamicMarkerBaseSize, this._dynamicMarkerRanges);
            };
        }
    }
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZIndex() { return this._zIndex; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZIndex(val) { this._zIndex = val; }
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZoomOnClick() { return this._zoomOnClick; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZoomOnClick(val) { this._zoomOnClick = val; }
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
    static CreateDynamicSizeMarker(size, info, baseMarkerSize, ranges) {
        const /** @type {?} */ mr = baseMarkerSize;
        const /** @type {?} */ outline = mr * 0.35;
        const /** @type {?} */ total = size;
        const /** @type {?} */ r = Math.log(total) / Math.log(10) * 5 + mr;
        const /** @type {?} */ d = r * 2;
        let /** @type {?} */ fillColor;
        ranges.forEach((v, k) => {
            if (total <= k && !fillColor) {
                fillColor = v;
            }
        });
        if (!fillColor) {
            fillColor = 'rgba(20, 180, 20, 0.5)';
        }
        // Create an SVG string of two circles, one on top of the other, with the specified radius and color.
        const /** @type {?} */ svg = [`<svg xmlns='http://www.w3.org/2000/svg' width='${d}' height='${d}'>`,
            `<circle cx='${r}' cy='${r}' r='${r}' fill='${fillColor}'/>`,
            `<circle cx='${r}' cy='${r}' r='${r - outline}' fill='${fillColor}'/>`,
            `</svg>`];
        info.size = { width: d, height: d };
        info.markerOffsetRatio = { x: 0.5, y: 0.5 };
        info.textOffset = { x: 0, y: r - 8 };
        return svg.join('');
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['ClusterClickAction']) {
            throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
        }
        const /** @type {?} */ options = { id: this._id };
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
        this._layerService.GetNativeLayer(this).then((l) => {
            l.SetOptions(options);
        });
    }
}
ClusterLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-cluster-layer'
            },] },
];
/** @nocollapse */
ClusterLayerDirective.ctorParameters = () => [
    { type: ClusterService },
    { type: ViewContainerRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQ0csS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBSXBFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNoRCxNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7Ozs7OztJQWtQeEQsWUFBWSxhQUE2QixFQUFFLGFBQStCO1FBQ3RFLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7a0NBOU9YLElBQUk7cUNBQ3FCLG9CQUFvQixDQUFDLFNBQVM7bUNBQ2xDLGtCQUFrQixDQUFDLGVBQWU7cUNBUXBELEtBQUs7c0NBQ0osRUFBRTtvQ0FDaUIsSUFBSSxHQUFHLENBQWlCO1lBQ3hFLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDO1lBQzlCLENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDO1lBQ2hDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFHLHdCQUF3QixDQUFDO1NBQ3ZELENBQUM7NEJBQ3FCLElBQUk7S0E4TjFCOzs7Ozs7O0lBbE5ELElBQ2Usa0JBQWtCLEtBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRTs7Ozs7UUFDOUUsa0JBQWtCLENBQUMsR0FBdUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFD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QVNMLEtBQUs7cUJBVUwsS0FBSztvQ0FVTCxLQUFLO3FCQWlCTCxLQUFLOzBCQVVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2x1c3Rlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLFxyXG4gICAgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcclxuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm99IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuL21hcC1tYXJrZXInO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLWxheWVyJztcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDcmVhdGVzIGEgY2x1c3RlciBsYXllciBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbWm9vbV09J3pvb20nPlxyXG4gKiAgICAgPHgtY2x1c3Rlci1sYXllciBbVmlzaWJsZV09J3Zpc2libGUnPlxyXG4gKiAgICAgICAgIDx4LW1hcC1tYXJrZXIgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbTGFiZWxdPScnTScnPjwveC1tYXAtbWFya2VyPlxyXG4gKiAgICAgPC94LWNsdXN0ZXItbGF5ZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtY2x1c3Rlci1sYXllcidcclxufSlcclxuZXhwb3J0IGNsYXNzIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBleHRlbmRzIE1hcExheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2NsdXN0ZXJpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2NsdXN0ZXJQbGFjZW1lbnRNb2RlOiBDbHVzdGVyUGxhY2VtZW50TW9kZSA9IENsdXN0ZXJQbGFjZW1lbnRNb2RlLk1lYW5WYWx1ZTtcclxuICAgIHByaXZhdGUgX2NsdXN0ZXJDbGlja0FjdGlvbjogQ2x1c3RlckNsaWNrQWN0aW9uID0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlcjtcclxuICAgIHByaXZhdGUgX3NwaWRlckNsdXN0ZXJPcHRpb25zOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnM7XHJcbiAgICBwcml2YXRlIF96SW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2dyaWRTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXllck9mZnNldDogSVBvaW50O1xyXG4gICAgcHJpdmF0ZSBfaWNvbkluZm86IElNYXJrZXJJY29uSW5mbztcclxuICAgIHByaXZhdGUgX21pbmltdW1DbHVzdGVyU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc3R5bGVzOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPjtcclxuICAgIHByaXZhdGUgX3VzZUR5bmFtaWNTaXplTWFya2VyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyQmFzZVNpemUgPSAxODtcclxuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJSYW5nZXM6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXHJcbiAgICAgICAgWzEwLCAncmdiYSgyMCwgMTgwLCAyMCwgMC41KSddLFxyXG4gICAgICAgIFsxMDAsICdyZ2JhKDI1NSwgMjEwLCA0MCwgMC41KSddLFxyXG4gICAgICAgIFtOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAsICdyZ2JhKDI1NSwgNDAsIDQwLCAwLjUpJ11cclxuICAgIF0pO1xyXG4gICAgcHJpdmF0ZSBfem9vbU9uQ2xpY2sgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfaWNvbkNyZWF0aW9uQ2FsbGJhY2s6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbnRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGhlIENsdXN0ZXIgQ2xpY2sgQWN0aW9uIHtAbGluayBDbHVzdGVyQ2xpY2tBY3Rpb259LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IENsdXN0ZXJDbGlja0FjdGlvbigpOiBDbHVzdGVyQ2xpY2tBY3Rpb24gIHsgcmV0dXJuIHRoaXMuX2NsdXN0ZXJDbGlja0FjdGlvbjsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ2x1c3RlckNsaWNrQWN0aW9uKHZhbDogQ2x1c3RlckNsaWNrQWN0aW9uKSB7IHRoaXMuX2NsdXN0ZXJDbGlja0FjdGlvbiA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIGNsdXN0ZXJpbmcgbGF5ZXIgZW5hYmxlcyBjbHVzdGVyaW5nLiBXaGVuIHNldCB0byBmYWxzZSwgdGhlIGxheWVyXHJcbiAgICAgKiBiZWhhdmVzIGxpa2UgYSBnZW5lcmljIGxheWVyLiBUaGlzIGlzIGhhbmR5IGlmIHlvdSB3YW50IHRvIHByZXZlbnQgY2x1c3RlcmluZyBhdCBjZXJ0YWluIHpvb20gbGV2ZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IENsdXN0ZXJpbmdFbmFibGVkKCk6IGJvb2xlYW4gIHsgcmV0dXJuIHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBDbHVzdGVyaW5nRW5hYmxlZCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fY2x1c3RlcmluZ0VuYWJsZWQgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2x1c3RlciBwbGFjZW1lbnQgbW9kZS4ge0BsaW5rIENsdXN0ZXJQbGFjZW1lbnRNb2RlfVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IENsdXN0ZXJQbGFjZW1lbnRNb2RlKCk6IENsdXN0ZXJQbGFjZW1lbnRNb2RlICB7IHJldHVybiB0aGlzLl9jbHVzdGVyUGxhY2VtZW50TW9kZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ2x1c3RlclBsYWNlbWVudE1vZGUodmFsOiBDbHVzdGVyUGxhY2VtZW50TW9kZSkgeyB0aGlzLl9jbHVzdGVyUGxhY2VtZW50TW9kZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjYWxsYmFjayBpbnZva2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gTm90ZSB0aGF0IHdoZW4ge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30gaXMgZW5hYmxlZCxcclxuICAgICAqIHlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjay5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDdXN0b21NYXJrZXJDYWxsYmFjaygpOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcgIHsgcmV0dXJuIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXN0b21NYXJrZXJDYWxsYmFjayh2YWw6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihgWW91IGNhbm5vdCBzZXQgYSBjdXN0b20gbWFya2VyIGNhbGxiYWNrIHdoZW4gVXNlRHluYW1pY1NpemVNYXJrZXJzIGlzIHNldCB0byB0cnVlLlxyXG4gICAgICAgICAgICAgICAgICAgIFNldCBVc2VEeW5hbWljU2l6ZU1ha2VycyB0byBmYWxzZS5gKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGJhc2Ugc2l6ZSBvZiBkeW5hbWljIG1hcmtlcnMgaW4gcGl4ZWxzLiBUaGUgYWN0dWFseSBzaXplIG9mIHRoZSBkeW5hbWljIG1hcmtlciBpcyBiYXNlZCBvbiB0aGlzLlxyXG4gICAgICogU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSgpOiBudW1iZXIgIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlckJhc2VTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSByYW5nZXMgdG8gdXNlIHRvIGNhbGN1bGF0ZSBicmVha3BvaW50cyBhbmQgY29sb3JzIGZvciBkeW5hbWljIG1hcmtlcnMuXHJcbiAgICAgKiBUaGUgbWFwIGNvbnRhaW5zIGtleS92YWx1ZSBwYWlycywgd2l0aCB0aGUga2V5cyBiZWluZ1xyXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS4gU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IER5bmFtaWNNYXJrZXJSYW5nZXMoKTogTWFwPG51bWJlciwgc3RyaW5nPiAgeyByZXR1cm4gdGhpcy5fZHluYW1pY01hcmtlclJhbmdlczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlclJhbmdlcyh2YWw6IE1hcDxudW1iZXIsIHN0cmluZz4pIHsgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBncmlkIHNpemUgdG8gYmUgdXNlZCBmb3IgY2x1c3RlcmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBHcmlkU2l6ZSgpOiBudW1iZXIgIHsgcmV0dXJuIHRoaXMuX2dyaWRTaXplOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBHcmlkU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9ncmlkU2l6ZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gU3VwcG9ydHMgZm9udC1iYXNlZCwgU1ZHLCBncmFwaGljcyBhbmQgbW9yZS5cclxuICAgICAqIFNlZSB7QGxpbmsgSU1hcmtlckljb25JbmZvfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBJY29uSW5mbygpOiBJTWFya2VySWNvbkluZm8gIHsgcmV0dXJuIHRoaXMuX2ljb25JbmZvOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBJY29uSW5mbyh2YWw6IElNYXJrZXJJY29uSW5mbykgeyB0aGlzLl9pY29uSW5mbyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgTGF5ZXJPZmZzZXQoKTogSVBvaW50ICB7IHJldHVybiB0aGlzLl9sYXllck9mZnNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTGF5ZXJPZmZzZXQodmFsOiBJUG9pbnQpIHsgdGhpcy5fbGF5ZXJPZmZzZXQgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSBwaW5zIHJlcXVpcmVkIHRvIGZvcm0gYSBjbHVzdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBNaW5pbXVtQ2x1c3RlclNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9taW5pbXVtQ2x1c3RlclNpemU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IE1pbmltdW1DbHVzdGVyU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9taW5pbXVtQ2x1c3RlclNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgb3B0aW9ucyBmb3Igc3BpZGVyIGNsdXN0ZXJpbmcgYmVoYXZpb3IuIFNlZSB7QGxpbmsgSVNwaWRlckNsdXN0ZXJPcHRpb25zfVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFNwaWRlckNsdXN0ZXJPcHRpb25zKCk6IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB7IHJldHVybiB0aGlzLl9zcGlkZXJDbHVzdGVyT3B0aW9uczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgU3BpZGVyQ2x1c3Rlck9wdGlvbnModmFsOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMpIHsgdGhpcy5fc3BpZGVyQ2x1c3Rlck9wdGlvbnMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2x1c3RlciBzdHlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFN0eWxlcygpOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPiB7IHJldHVybiB0aGlzLl9zdHlsZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFN0eWxlcyh2YWw6IEFycmF5PElDbHVzdGVySWNvbkluZm8+KSB7IHRoaXMuX3N0eWxlcyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gdXNlIGR5bmFtaWMgbWFya2Vycy4gRHluYW1pYyBtYXJrZXJzIGNoYW5nZSBpbiBzaXplIGFuZCBjb2xvciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZlxyXG4gICAgICogcGlucyBpbiB0aGUgY2x1c3Rlci4gSWYgc2V0IHRvIHRydWUsIHRoaXMgd2lsbCB0YWtlIHByZWNlbmRlbmNlIG92ZXIgYW55IGN1c3RvbSBtYXJrZXIgY3JlYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVXNlRHluYW1pY1NpemVNYXJrZXJzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXI7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFVzZUR5bmFtaWNTaXplTWFya2Vycyh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXIgPSB2YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gKG06IEFycmF5PE1hcmtlcj4sIGluZm86IElNYXJrZXJJY29uSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuQ3JlYXRlRHluYW1pY1NpemVNYXJrZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0ubGVuZ3RoLCBpbmZvLCB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUsIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgWkluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl96SW5kZXg7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFpJbmRleCh2YWw6IG51bWJlcikgeyB0aGlzLl96SW5kZXggPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSBjbHVzdGVyIHNob3VsZCB6b29tIGluIG9uIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBab29tT25DbGljaygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3pvb21PbkNsaWNrOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBab29tT25DbGljayh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fem9vbU9uQ2xpY2sgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGR5bmFtaWMgc2l6ZSBtYXJrZXIgdG8gYmUgdXNlZCBmb3IgY2x1c3RlciBtYXJrZXJzIGlmIFVzZUR5bmFtaWNTaXplTWFya2VycyBpcyBzZXQgdG8gdHJ1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIFRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cclxuICAgICAqIEBwYXJhbSBpbmZvICAtIFRoZSBpY29uIGluZm8gdG8gYmUgdXNlZC4gVGhpcyB3aWxsIGJlIGh5ZHJhdGVkIHdpdGhcclxuICAgICAqIHRoZSBhY3R1YWx5IGRpbWVuc2lvbnMgb2YgdGhlIGNyZWF0ZWQgbWFya2VycyBhbmQgaXMgdXNlZCBieSB0aGUgdW5kZXJseWluZyBtb2RlbC9zZXJ2aWNlc1xyXG4gICAgICogdG8gY29ycmVjdGx5IG9mZnNldCB0aGUgbWFya2VyIGZvciBjb3JyZWN0IHBvc2l0aW9uaW5nLlxyXG4gICAgICogQHBhcmFtIGJhc2VNYXJrZXJTaXplIC0gVGhlIGJhc2Ugc2l6ZSBmb3IgZHlubWljIG1hcmtlcnMuXHJcbiAgICAgKiBAcGFyYW0gcmFuZ2VzIC0gVGhlIHJhbmdlcyB0byB1c2UgdG8gY2FsY3VsYXRlIGJyZWFrcG9pbnRzIGFuZCBjb2xvcnMgZm9yIGR5bmFtaWMgbWFya2Vycy5cclxuICAgICAqIFRoZSBtYXAgY29udGFpbnMga2V5L3ZhbHVlIHBhaXJzLCB3aXRoIHRoZSBrZXlzIGJlaW5nXHJcbiAgICAgKiB0aGUgYnJlYWtwb2ludCBzaXplcyBhbmQgdGhlIHZhbHVlcyB0aGUgY29sb3JzIHRvIGJlIHVzZWQgZm9yIHRoZSBkeW5hbWljIG1hcmtlciBpbiB0aGF0IHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgLSBBbiBzdHJpbmcgY29udGFpbmluZyB0aGUgU1ZHIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVEeW5hbWljU2l6ZU1hcmtlcihzaXplOiBudW1iZXIsIGluZm86IElNYXJrZXJJY29uSW5mbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZU1hcmtlclNpemU6IG51bWJlciwgcmFuZ2VzOiBNYXA8bnVtYmVyLCBzdHJpbmc+KTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBtcjogbnVtYmVyID0gYmFzZU1hcmtlclNpemU7XHJcbiAgICAgICAgY29uc3Qgb3V0bGluZTogbnVtYmVyID0gbXIgKiAwLjM1O1xyXG4gICAgICAgIGNvbnN0IHRvdGFsOiBudW1iZXIgPSBzaXplO1xyXG4gICAgICAgIGNvbnN0IHI6IG51bWJlciA9IE1hdGgubG9nKHRvdGFsKSAvIE1hdGgubG9nKDEwKSAqIDUgKyBtcjtcclxuICAgICAgICBjb25zdCBkOiBudW1iZXIgPSByICogMjtcclxuICAgICAgICBsZXQgZmlsbENvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgcmFuZ2VzLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKHRvdGFsIDw9IGsgJiYgIWZpbGxDb2xvcikgeyBmaWxsQ29sb3IgPSB2OyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFmaWxsQ29sb3IpIHsgZmlsbENvbG9yID0gJ3JnYmEoMjAsIDE4MCwgMjAsIDAuNSknOyB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhbiBTVkcgc3RyaW5nIG9mIHR3byBjaXJjbGVzLCBvbmUgb24gdG9wIG9mIHRoZSBvdGhlciwgd2l0aCB0aGUgc3BlY2lmaWVkIHJhZGl1cyBhbmQgY29sb3IuXHJcbiAgICAgICAgY29uc3Qgc3ZnOiBBcnJheTxhbnk+ID0gW2A8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JyR7ZH0nIGhlaWdodD0nJHtkfSc+YCxcclxuICAgICAgICAgICAgYDxjaXJjbGUgY3g9JyR7cn0nIGN5PScke3J9JyByPScke3J9JyBmaWxsPScke2ZpbGxDb2xvcn0nLz5gLFxyXG4gICAgICAgICAgICBgPGNpcmNsZSBjeD0nJHtyfScgY3k9JyR7cn0nIHI9JyR7ciAtIG91dGxpbmV9JyBmaWxsPScke2ZpbGxDb2xvcn0nLz5gLFxyXG4gICAgICAgICAgICBgPC9zdmc+YF07XHJcbiAgICAgICAgaW5mby5zaXplID0geyB3aWR0aDogZCwgaGVpZ2h0OiBkIH07XHJcbiAgICAgICAgaW5mby5tYXJrZXJPZmZzZXRSYXRpbyA9IHsgeDogMC41LCB5OiAwLjUgfTtcclxuICAgICAgICBpbmZvLnRleHRPZmZzZXQgPSB7IHg6IDAsIHk6IHIgLSA4IH07XHJcbiAgICAgICAgcmV0dXJuIHN2Zy5qb2luKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIENvbmNyZXRlZCBpbXBsZW1lbnRhdGlvbiBvZiBhIGNsdXN0ZXIgbGF5ZXIgc2VydmljZSBmb3IgdGhlIHVuZGVybHlpbmcgbWFwc1xyXG4gICAgICogaW1wbGVtZW50YXRpb25zLiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gX2NvbnRhaW5lclJlZiAtIEEgcmVmZXJlbmNlIHRvIHRoZSB2aWV3IGNvbnRhaW5lciBvZiB0aGUgbGF5ZXIuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX2xheWVyU2VydmljZTogQ2x1c3RlclNlcnZpY2UsIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgICAgICBzdXBlcihfbGF5ZXJTZXJ2aWNlLCBfY29udGFpbmVyUmVmKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgdG8gY2hhbmdlcyBpbiBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCBhbmQgYWN0dWF0ZXMgcHJvcGVydHkgY2hhbmdlcyBpbiB0aGUgdW5kZXJsaW5nIGxheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJDbGlja0FjdGlvbiddKSB7XHJcbiAgICAgICAgICAgIHRocm93IChcclxuICAgICAgICAgICAgICAgIG5ldyBFcnJvcignWW91IGNhbm5vdCBjaGFuZ2UgdGhlIENsdXN0ZXJDbGlja0FjdGlvbiBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGxheWVyc2VydmljZS4nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0geyBpZDogdGhpcy5faWQgfTtcclxuICAgICAgICBpZiAoY2hhbmdlc1snQ2x1c3RlcmluZ0VuYWJsZWQnXSkgeyBvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkID0gdGhpcy5fY2x1c3RlcmluZ0VuYWJsZWQ7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snR3JpZFNpemUnXSkgeyBvcHRpb25zLmdyaWRTaXplID0gdGhpcy5fZ3JpZFNpemU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snTGF5ZXJPZmZzZXQnXSkgeyBvcHRpb25zLmxheWVyT2Zmc2V0ID0gdGhpcy5fbGF5ZXJPZmZzZXQ7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snU3BpZGVyQ2x1c3Rlck9wdGlvbnMnXSkgeyBvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zID0gdGhpcy5fc3BpZGVyQ2x1c3Rlck9wdGlvbnM7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snWkluZGV4J10pIHsgb3B0aW9ucy56SW5kZXggPSB0aGlzLl96SW5kZXg7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7IG9wdGlvbnMudmlzaWJsZSA9IHRoaXMuX3Zpc2libGU7IH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKHRoaXMpLnRoZW4oKGw6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGwuU2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19