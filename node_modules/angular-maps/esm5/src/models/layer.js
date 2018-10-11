/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
Layer = /** @class */ (function () {
    function Layer() {
    }
    return Layer;
}());
/**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Layer };
function Layer_tsickle_Closure_declarations() {
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - An object representing the native implementation of the layer in the underlying provider (such as
     * Microsoft.Maps.Layer).
     *
     */
    Layer.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    Layer.prototype.AddListener = function (eventType, fn) { };
    /**
     * Adds an entity to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * these concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    Layer.prototype.AddEntity = function (entity) { };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity
     * @return {?}
     */
    Layer.prototype.AddEntities = function (entity) { };
    /**
     * Deletes the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?}
     */
    Layer.prototype.Delete = function () { };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - The layer options.
     *
     */
    Layer.prototype.GetOptions = function () { };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - True is the layer is visible, false otherwise.
     *
     */
    Layer.prototype.GetVisible = function () { };
    /**
     * Removes an entity from the cluster layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    Layer.prototype.RemoveEntity = function (entity) { };
    /**
     * Sets the entities for the cluster layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    Layer.prototype.SetEntities = function (entities) { };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    Layer.prototype.SetOptions = function (options) { };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @abstract
     * @abstract
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    Layer.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7OztBQUFBOzs7Z0JBYkE7SUFnSkMsQ0FBQTs7Ozs7Ozs7O0FBbklELGlCQW1JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4vaW5mby13aW5kb3cnO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGNvbnRyYWN0IGZvciBhIG1hcCBsYXllciBpbXBsZW1lbnRhdGlvbi4gRGVyaXZpbmcgcHJvdmlkZXJzIHNob3VsZCBpbXBsZW1lbnRzIHRoaXMgYWJzdHJhY3RcclxuICogdG8gcHJvdmlkZSBjb25jcmV0ZSBsYXllciBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbWFwLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExheWVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxheWVyIGluIHRoZSB1bmRlcmx5aW5nIHByb3ZpZGVyIChzdWNoIGFzXHJcbiAgICAgKiBNaWNyb3NvZnQuTWFwcy5MYXllcikuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMsIExheWVyIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSBzdHJpbmcuIFR5cGUgb2YgZXZlbnQgdG8gYWRkIChjbGljaywgbW91c2VvdmVyLCBldGMpLiBZb3UgY2FuIHVzZSBhbnkgZXZlbnQgdGhhdCB0aGUgdW5kZXJseWluZyBuYXRpdmVcclxuICAgICAqIGxheWVyIHN1cHBvcnRzLlxyXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uLiBIYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXHJcbiAgICAgKiB0aGVzZSBjb25jZXB0cywgaW5zdGVhZCwgdGhlIGFwcHJvcHJpYXRlIGFic3RyYWN0IG1vZGVsIGNsYXNzZXMgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciBlYWNoIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lLiBFbnRpdHkgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkRW50aXR5KGVudGl0eTogTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXHJcbiAgICAgKiB0aGlzZSBjb25jZXB0cywgaW5zdGVhZCwgdGhlIGFwcHJvcHJpYXRlIGFic3RyYWN0IG1vZGVsIGNsYXNzZXMgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciBlYWNoIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRFbnRpdGllcyhlbnRpdHk6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBEZWxldGUoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgbGF5ZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0T3B0aW9ucygpOiBJTGF5ZXJPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldFZpc2libGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLiBFbnRpdGllcyBpbiB0aGlzIGNvbnRleHQgc2hvdWxkIGJlIG1vZGVsIGFic3RyYWN0aW9ucyBvZiBjb25jZXJlZCBtYXAgZnVuY3Rpb25hbGl0eSAoc3VjaFxyXG4gICAgICogYXMgbWFya2VyLCBpbmZvd2luZG93LCBwb2x5bGluZSwgcG9seWdvbiwgZXRjLi4pIEltcGxlbWVudGF0aW9ucyBvZiB0aGlzIG1ldGhvZCBzaG91bGQgbm90IGV4cGVjdCBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2ZcclxuICAgICAqIHRoaXNlIGNvbmNlcHRzLCBpbnN0ZWFkLCB0aGUgYXBwcm9wcmlhdGUgYWJzdHJhY3QgbW9kZWwgY2xhc3NlcyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIGVhY2ggcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUgRW50aXR5IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUpOiB2b2lkO1xyXG5cclxuICAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXHJcbiAgICAgKiB0aGlzZSBjb25jZXB0cywgaW5zdGVhZCwgdGhlIGFwcHJvcHJpYXRlIGFic3RyYWN0IG1vZGVsIGNsYXNzZXMgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciBlYWNoIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+IGNvbnRhaW5pbmcgdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci5cclxuICAgICAqIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIGxheWVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xyXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGVzIHRoZSBjbHVzdGVyIGxheWVyIHZpc2liaWxpdHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgQm9vbGVhbiB0cnVlIHRvIG1ha2UgdGhlIGxheWVyIHZpc2libGUsIGZhbHNlIHRvIGhpZGUgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG59XHJcbiJdfQ==