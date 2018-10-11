/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ContentChildren, Input, ViewContainerRef } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapMarkerDirective } from './map-marker';
/**
 * internal counter to use as ids for multiple layers.
 */
var /** @type {?} */ layerId = 0;
/**
 * MapLayerDirective creates a layer on a {\@link MapComponent}.
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
 *     <x-map-layer [Visible]='visible'>
 *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
 *     </x-map-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapLayerDirective.
     * @param _layerService - Concreted implementation of a layer service for the underlying maps implementations.
     * Generally provided via injections.
     * @param _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
     *
     * @memberof MapLayerDirective
     */
    function MapLayerDirective(_layerService, _containerRef) {
        this._layerService = _layerService;
        this._containerRef = _containerRef;
        this._visible = true;
        this._addedToManager = false;
        this._id = layerId++;
    }
    Object.defineProperty(MapLayerDirective.prototype, "Visible", {
        ///
        /// Property declarations
        ///
        /**
         * Gets or sets the layer visibility.
         *
         * @memberof MapLayerDirective
         */
        get: /**
         * Gets or sets the layer visibility.
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
        function () { return this._visible; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._visible = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLayerDirective.prototype, "Id", {
        get: /**
         * Gets the layer id.
         *
         * \@readonly
         * \@memberof MapLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnInit = /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    function () {
        this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
        this._layerService.AddLayer(this);
        this._addedToManager = true;
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['Visible']) {
            this._layerService.GetNativeLayer(this).then(function (l) {
                l.SetVisible(!l.GetVisible());
            });
        }
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    function () {
        this._layerService.DeleteLayer(this);
    };
    MapLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-layer'
                },] },
    ];
    /** @nocollapse */
    MapLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: ViewContainerRef }
    ]; };
    MapLayerDirective.propDecorators = {
        _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
        Visible: [{ type: Input }]
    };
    return MapLayerDirective;
}());
export { MapLayerDirective };
function MapLayerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapLayerDirective.prototype._visible;
    /** @type {?} */
    MapLayerDirective.prototype._addedToManager;
    /** @type {?} */
    MapLayerDirective.prototype._id;
    /** @type {?} */
    MapLayerDirective.prototype._markers;
    /** @type {?} */
    MapLayerDirective.prototype._layerService;
    /** @type {?} */
    MapLayerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUNkLGVBQWUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUtsRCxxQkFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWdFWixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsMkJBQXNCLGFBQTJCLEVBQVksYUFBK0I7UUFBdEUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBWSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7d0JBdkN2RSxJQUFJOytCQUNHLEtBQUs7UUF1QzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7S0FDeEI7SUExQkQsc0JBQ2Usc0NBQU87UUFWdEIsR0FBRztRQUNILHlCQUF5QjtRQUN6QixHQUFHO1FBRUg7Ozs7V0FJRzs7Ozs7OztRQUNILGNBQ29DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Ozs7O2tCQUNwQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7OztPQURBOzBCQVNoRCxpQ0FBRTs7Ozs7Ozs7c0JBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Ozs7SUEyQm5DLG9DQUFROzs7Ozs7O1FBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7O0lBVXpCLHVDQUFXOzs7Ozs7OztjQUFDLE9BQTZDO1FBQzVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUNqQyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7O0lBU0UsdUNBQVc7Ozs7Ozs7O1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7OztnQkF6RjVDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtpQkFDMUI7Ozs7Z0JBckNRLFlBQVk7Z0JBRE8sZ0JBQWdCOzs7MkJBZ0R2QyxlQUFlLFNBQUMsa0JBQWtCOzBCQVdsQyxLQUFLOzs0QkE1RFY7O1NBd0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBTaW1wbGVDaGFuZ2UsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuL21hcC1tYXJrZXInO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgbXVsdGlwbGUgbGF5ZXJzLlxyXG4gKi9cclxubGV0IGxheWVySWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIE1hcExheWVyRGlyZWN0aXZlIGNyZWF0ZXMgYSBsYXllciBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbWm9vbV09J3pvb20nPlxyXG4gKiAgICAgPHgtbWFwLWxheWVyIFtWaXNpYmxlXT0ndmlzaWJsZSc+XHJcbiAqICAgICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtMYWJlbF09JydNJyc+PC94LW1hcC1tYXJrZXI+XHJcbiAqICAgICA8L3gtbWFwLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1sYXllcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcExheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfdmlzaWJsZSA9IHRydWU7XHJcbiAgICBwcm90ZWN0ZWQgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgX2lkOiBudW1iZXI7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihNYXBNYXJrZXJEaXJlY3RpdmUpIHByb3RlY3RlZCBfbWFya2VyczogQXJyYXk8TWFwTWFya2VyRGlyZWN0aXZlPjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Zpc2libGU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFZpc2libGUodmFsOiBib29sZWFuKSB7IHRoaXMuX3Zpc2libGUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxheWVyIGlkLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBMYXllckRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JldGVkIGltcGxlbWVudGF0aW9uIG9mIGEgbGF5ZXIgc2VydmljZSBmb3IgdGhlIHVuZGVybHlpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbnMuXHJcbiAgICAgKiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gX2NvbnRhaW5lclJlZiAtIFJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGhvc3RpbmcgdGhlIG1hcCBjYW52YXMuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLCBwcm90ZWN0ZWQgX2NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXNbJ2xheWVySWQnXSA9IHRoaXMuX2lkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkFkZExheWVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIodGhpcykudGhlbihsID0+IHtcclxuICAgICAgICAgICAgICAgIGwuU2V0VmlzaWJsZSghbC5HZXRWaXNpYmxlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==