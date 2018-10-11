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
export class Layer {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWFBLE1BQU07Q0FtSUwiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4vbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4vcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi9wb2x5bGluZSc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuL2luZm8td2luZG93JztcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYSBtYXAgbGF5ZXIgaW1wbGVtZW50YXRpb24uIERlcml2aW5nIHByb3ZpZGVycyBzaG91bGQgaW1wbGVtZW50cyB0aGlzIGFic3RyYWN0XHJcbiAqIHRvIHByb3ZpZGUgY29uY3JldGUgbGF5ZXIgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIG1hcC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllciB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsYXllciBpbiB0aGUgdW5kZXJseWluZyBwcm92aWRlciAoc3VjaCBhc1xyXG4gICAgICogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXHJcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXHJcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxyXG4gICAgICogdGhlc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZS4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEFkZEVudGl0eShlbnRpdHk6IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG51bWJlciBvZiBlbnRpdGllcyB0byB0aGUgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXHJcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxyXG4gICAgICogdGhpc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkRW50aXRpZXMoZW50aXR5OiBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGxheWVyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExheWVyXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldE9wdGlvbnMoKTogSUxheWVyT3B0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgY2x1c3RlciBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXHJcbiAgICAgKiB0aGlzZSBjb25jZXB0cywgaW5zdGVhZCwgdGhlIGFwcHJvcHJpYXRlIGFic3RyYWN0IG1vZGVsIGNsYXNzZXMgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciBlYWNoIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lIEVudGl0eSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBSZW1vdmVFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZDtcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXHJcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxyXG4gICAgICogdGhpc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+fEFycmF5PEluZm9XaW5kb3c+fEFycmF5PFBvbHlnb24+fEFycmF5PFBvbHlsaW5lPiBjb250YWluaW5nIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuXHJcbiAgICAgKiBUaGlzIHJlcGxhY2VzIGFueSBleGlzdGluZyBlbnRpdGllcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxufVxyXG4iXX0=