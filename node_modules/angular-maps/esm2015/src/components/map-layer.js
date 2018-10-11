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
let /** @type {?} */ layerId = 0;
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
export class MapLayerDirective {
    /**
     * Creates an instance of MapLayerDirective.
     * \@memberof MapLayerDirective
     * @param {?} _layerService - Concreted implementation of a layer service for the underlying maps implementations.
     * Generally provided via injections.
     * @param {?} _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        this._layerService = _layerService;
        this._containerRef = _containerRef;
        this._visible = true;
        this._addedToManager = false;
        this._id = layerId++;
    }
    /**
     * Gets or sets the layer visibility.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Visible() { return this._visible; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Visible(val) { this._visible = val; }
    /**
     * Gets the layer id.
     *
     * \@readonly
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnInit() {
        this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
        this._layerService.AddLayer(this);
        this._addedToManager = true;
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['Visible']) {
            this._layerService.GetNativeLayer(this).then(l => {
                l.SetVisible(!l.GetVisible());
            });
        }
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._layerService.DeleteLayer(this);
    }
}
MapLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-layer'
            },] },
];
/** @nocollapse */
MapLayerDirective.ctorParameters = () => [
    { type: LayerService },
    { type: ViewContainerRef }
];
MapLayerDirective.propDecorators = {
    _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
    Visible: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUNkLGVBQWUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUtsRCxxQkFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NoQixNQUFNOzs7Ozs7Ozs7SUE0Q0YsWUFBc0IsYUFBMkIsRUFBWSxhQUErQjtRQUF0RSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFZLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjt3QkF2Q3ZFLElBQUk7K0JBQ0csS0FBSztRQXVDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztLQUN4Qjs7Ozs7OztJQTFCRCxJQUNlLE9BQU8sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzs7OztRQUM1QyxPQUFPLENBQUMsR0FBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDOzs7Ozs7OztRQVFoRCxFQUFFLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7SUEyQm5DLFFBQVE7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7SUFVekIsV0FBVyxDQUFDLE9BQTZDO1FBQzVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDN0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7SUFTRSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7WUF6RjVDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTthQUMxQjs7OztZQXJDUSxZQUFZO1lBRE8sZ0JBQWdCOzs7dUJBZ0R2QyxlQUFlLFNBQUMsa0JBQWtCO3NCQVdsQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIFNpbXBsZUNoYW5nZSxcclxuICAgIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XHJcblxyXG4vKipcclxuICogaW50ZXJuYWwgY291bnRlciB0byB1c2UgYXMgaWRzIGZvciBtdWx0aXBsZSBsYXllcnMuXHJcbiAqL1xyXG5sZXQgbGF5ZXJJZCA9IDA7XHJcblxyXG4vKipcclxuICogTWFwTGF5ZXJEaXJlY3RpdmUgY3JlYXRlcyBhIGxheWVyIG9uIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIge1xyXG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtab29tXT0nem9vbSc+XHJcbiAqICAgICA8eC1tYXAtbGF5ZXIgW1Zpc2libGVdPSd2aXNpYmxlJz5cclxuICogICAgICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW0xhYmVsXT0nJ00nJz48L3gtbWFwLW1hcmtlcj5cclxuICogICAgIDwveC1tYXAtbGF5ZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLWxheWVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJvdGVjdGVkIF92aXNpYmxlID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCBfYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBfaWQ6IG51bWJlcjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKE1hcE1hcmtlckRpcmVjdGl2ZSkgcHJvdGVjdGVkIF9tYXJrZXJzOiBBcnJheTxNYXBNYXJrZXJEaXJlY3RpdmU+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxheWVyIHZpc2liaWxpdHkuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBWaXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlzaWJsZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVmlzaWJsZSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fdmlzaWJsZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGF5ZXIgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcExheWVyRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBsYXllciBzZXJ2aWNlIGZvciB0aGUgdW5kZXJseWluZyBtYXBzIGltcGxlbWVudGF0aW9ucy5cclxuICAgICAqIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9ucy5cclxuICAgICAqIEBwYXJhbSBfY29udGFpbmVyUmVmIC0gUmVmZXJlbmNlIHRvIHRoZSBjb250YWluZXIgaG9zdGluZyB0aGUgbWFwIGNhbnZhcy4gR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsIHByb3RlY3RlZCBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBsYXllcklkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIENvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlc1snbGF5ZXJJZCddID0gdGhpcy5faWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcih0aGlzKS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5TZXRWaXNpYmxlKCFsLkdldFZpc2libGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuRGVsZXRlTGF5ZXIodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuIl19