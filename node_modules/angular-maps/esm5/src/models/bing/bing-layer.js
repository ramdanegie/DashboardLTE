/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
BingLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof BingLayer
     */
    function BingLayer(_layer, _maps) {
        this._layer = _layer;
        this._maps = _maps;
        this._pendingEntities = new Array();
    }
    Object.defineProperty(BingLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof BingLayer
         * @return {?} Microsoft.Maps.Layer.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    BingLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
            fn(e);
        });
    };
    /**
     * Adds an entity to the layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.AddEntity = /**
     * Adds an entity to the layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity && entity.NativePrimitve) {
            if (this.GetVisible()) {
                this._layer.add(entity.NativePrimitve);
            }
            else {
                this._pendingEntities.push(entity);
            }
        }
    };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.AddEntities = /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        //
        // use eachSeries as opposed to _layer.add([]) to provide a non-blocking experience for larger data sets.
        //
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            eachSeries(tslib_1.__spread(entities), function (e, next) {
                if (_this.GetVisible()) {
                    _this._layer.add(e.NativePrimitve);
                }
                else {
                    _this._pendingEntities.push(e);
                }
                nextTick(function () { return next(); });
            });
        }
    };
    /**
     * Deletes the layer.
     *
     * \@memberof BingLayer
     * @return {?}
     */
    BingLayer.prototype.Delete = /**
     * Deletes the layer.
     *
     * \@memberof BingLayer
     * @return {?}
     */
    function () {
        this._maps.DeleteLayer(this);
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    BingLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        var /** @type {?} */ o = {
            id: Number(this._layer.getId())
        };
        return o;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    BingLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._layer.getVisible();
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            this._layer.remove(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    BingLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        //
        // we are using removal and add as opposed to set as for large number of objects it yields a non-blocking, smoother performance...
        //
        this._layer.setPrimitives([]);
        this.AddEntities(entities);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        this._layer.metadata.id = options.id.toString();
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        this._layer.setVisible(visible);
        if (visible && this._pendingEntities.length > 0) {
            this.AddEntities(this._pendingEntities.splice(0));
        }
    };
    return BingLayer;
}());
/**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
export { BingLayer };
function BingLayer_tsickle_Closure_declarations() {
    /** @type {?} */
    BingLayer.prototype._pendingEntities;
    /** @type {?} */
    BingLayer.prototype._layer;
    /** @type {?} */
    BingLayer.prototype._maps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7OztBQWU3Qzs7Ozs7QUFBQTtJQW1CSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsbUJBQW9CLE1BQTRCLEVBQVUsS0FBaUI7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO2dDQTdCTCxJQUFJLEtBQUssRUFBc0M7S0E2QnJDOzBCQWhCckUscUNBQWM7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JoQiwrQkFBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNULENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLDZCQUFTOzs7Ozs7OztjQUFDLE1BQTBDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7Ozs7Ozs7Ozs7O0lBV0UsK0JBQVc7Ozs7Ozs7OztjQUFDLFFBQW1EOzs7OztRQUlsRSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLFVBQVUsa0JBQUssUUFBUSxHQUFHLFVBQUMsQ0FBQyxFQUFFLElBQUk7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQ0QsUUFBUSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLENBQUMsQ0FBQzthQUMxQixDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7SUFRRSwwQkFBTTs7Ozs7OztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVMUIsOEJBQVU7Ozs7Ozs7O1FBQ2IscUJBQU0sQ0FBQyxHQUFrQjtZQUNyQixFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OztJQVVOLDhCQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTdCLGdDQUFZOzs7Ozs7OztjQUFDLE1BQTBDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3Qzs7Ozs7Ozs7Ozs7SUFXRSwrQkFBVzs7Ozs7Ozs7O2NBQUMsUUFBd0U7Ozs7UUFJdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZeEIsOEJBQVU7Ozs7Ozs7OztjQUFDLE9BQXNCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTdDLDhCQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7O29CQXRNVDtJQXlNQyxDQUFBOzs7Ozs7QUExTEQscUJBMExDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWFjaFNlcmllcywgbmV4dFRpY2sgfSBmcm9tICdhc3luYyc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9wb2x5bGluZSc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgbWFwIGxheWVyIGZvciB0aGUgQmluZyBNYXAgUHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nTGF5ZXIgaW1wbGVtZW50cyBMYXllciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGVuZGluZ0VudGl0aWVzOiBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPiA9IG5ldyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbmF0aXZlIHByaW1pdGl2ZSB1bmRlcm5lYXRoIHRoZSBhYnN0cmFjdGlvbiBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBNaWNyb3NvZnQuTWFwcy5MYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmluZ0NsdXN0ZXJMYXllciBjbGFzcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyIE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllci4gTmF0aXZlIEJpbmcgQ2x1c3RlciBMYXllciBzdXBwb3J0aW5nIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllciwgcHJpdmF0ZSBfbWFwczogTWFwU2VydmljZSkgeyB9XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXHJcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fbGF5ZXIsIGV2ZW50VHlwZSwgKGUpID0+IHtcclxuICAgICAgICAgICAgZm4oZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lLiBFbnRpdHkgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0eSAmJiBlbnRpdHkuTmF0aXZlUHJpbWl0dmUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuR2V0VmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdFbnRpdGllcy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4pOiB2b2lkIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHVzZSBlYWNoU2VyaWVzIGFzIG9wcG9zZWQgdG8gX2xheWVyLmFkZChbXSkgdG8gcHJvdmlkZSBhIG5vbi1ibG9ja2luZyBleHBlcmllbmNlIGZvciBsYXJnZXIgZGF0YSBzZXRzLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xyXG4gICAgICAgICAgICBlYWNoU2VyaWVzKFsuLi5lbnRpdGllc10sIChlLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HZXRWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGQoZS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nRW50aXRpZXMucHVzaChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBzLkRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBJQ2x1c3Rlck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE9wdGlvbnMoKTogSUxheWVyT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogSUxheWVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IE51bWJlcih0aGlzLl9sYXllci5nZXRJZCgpKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyLmdldFZpc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVtb3ZlKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZW50aXRpZXMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+fEFycmF5PEluZm9XaW5kb3c+fEFycmF5PFBvbHlnb24+fEFycmF5PFBvbHlsaW5lPiBjb250YWluaW5nIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuXHJcbiAgICAgKiBUaGlzIHJlcGxhY2VzIGFueSBleGlzdGluZyBlbnRpdGllcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4pOiB2b2lkIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHdlIGFyZSB1c2luZyByZW1vdmFsIGFuZCBhZGQgYXMgb3Bwb3NlZCB0byBzZXQgYXMgZm9yIGxhcmdlIG51bWJlciBvZiBvYmplY3RzIGl0IHlpZWxkcyBhIG5vbi1ibG9ja2luZywgc21vb3RoZXIgcGVyZm9ybWFuY2UuLi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuX2xheWVyLnNldFByaW1pdGl2ZXMoW10pO1xyXG4gICAgICAgIHRoaXMuQWRkRW50aXRpZXMoZW50aXRpZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUxheWVyT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX2xheWVyLm1ldGFkYXRhLmlkID0gb3B0aW9ucy5pZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXllci5zZXRWaXNpYmxlKHZpc2libGUpO1xyXG4gICAgICAgIGlmICh2aXNpYmxlICYmIHRoaXMuX3BlbmRpbmdFbnRpdGllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkRW50aXRpZXModGhpcy5fcGVuZGluZ0VudGl0aWVzLnNwbGljZSgwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=