/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a marker service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
var MarkerService = /** @class */ (function () {
    function MarkerService() {
    }
    MarkerService.decorators = [
        { type: Injectable },
    ];
    return MarkerService;
}());
export { MarkerService };
function MarkerService_tsickle_Closure_declarations() {
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     *
     * @return {?}
     */
    MarkerService.prototype.AddMarker = function (marker) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarker} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    MarkerService.prototype.CreateEventObservable = function (eventName, marker) { };
    /**
     * Deletes a marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     *
     */
    MarkerService.prototype.DeleteMarker = function (marker) { };
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    MarkerService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     *
     */
    MarkerService.prototype.GetNativeMarker = function (marker) { };
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     */
    MarkerService.prototype.GetPixelsFromClick = function (e) { };
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} target - Either a {\@link MapMarkerDirective} or a {\@link ILatLong}
     * for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarkerDirective or ILatLong relative to the map canvas.
     *
     */
    MarkerService.prototype.LocationToPoint = function (target) { };
    /**
     * Updates the anchor position for the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} maker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     *
     */
    MarkerService.prototype.UpdateAnchor = function (maker) { };
    /**
     * Updates whether the marker is draggable.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     *
     */
    MarkerService.prototype.UpdateDraggable = function (marker) { };
    /**
     * Updates the Icon on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     *
     */
    MarkerService.prototype.UpdateIcon = function (marker) { };
    /**
     * Updates the label on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     *
     */
    MarkerService.prototype.UpdateLabel = function (marker) { };
    /**
     * Updates the geo coordinates for the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     *
     */
    MarkerService.prototype.UpdateMarkerPosition = function (marker) { };
    /**
     * Updates the title on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     *
     */
    MarkerService.prototype.UpdateTitle = function (marker) { };
    /**
     * Updates the visibility on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the visibility has been updated.
     *
     */
    MarkerService.prototype.UpdateVisible = function (marker) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Z0JBY2xELFVBQVU7O3dCQWRYOztTQWVzQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9tYXAtbWFya2VyJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgYWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50cyB0aGUgY29udHJhY3QgZGVmaW50aW9ucyBmb3IgYSBtYXJrZXIgc2VydmljZSB0byBiZSBpbXBsZW1lbnRlZCBieSBhbiBhY3V0YWx5IHVuZGVybHlpbmdcclxuICogbWFwIGFyY2hpdGVjdHVyZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcmtlclNlcnZpY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG1hcmtlci4gRGVwZW5kaW5nIG9uIHRoZSBtYXJrZXIgY29udGV4dCwgdGhlIG1hcmtlciB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGEgY29ycmVjc3BvbmRpbmcgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlcn0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgbWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBtYXJrZXIgaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudHwgYW55KTogSUxhdExvbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgbW9kZWwgZm9yIHRoZSBtYXJrZXIgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIG9idGFpbiB0aGUgbWFya2VyIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBNYXJrZXJ9IGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXROYXRpdmVNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPE1hcmtlcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgcGl4ZWwgbG9jYXRpb24gZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBwaXhlbHMgb2YgdGhlIG1hcmtlciBvbiB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGl4ZWxzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnR8IGFueSk6IElQb2ludDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IC0gRWl0aGVyIGEge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb3IgYSB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiBmb3IgdGhlIGJhc2lzIG9mIHRyYW5zbGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYSB7QGxpbmsgSVBvaW50fVxyXG4gICAgICogd2l0aCB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMgb2YgdGhlIE1hcE1hcmtlckRpcmVjdGl2ZSBvciBJTGF0TG9uZyByZWxhdGl2ZSB0byB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgTG9jYXRpb25Ub1BvaW50KHRhcmdldDogTWFwTWFya2VyRGlyZWN0aXZlIHwgSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhbmNob3IgcG9zaXRpb24gZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgYW5jaG9yLlxyXG4gICAgICogQW5jaG9yIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGFuY2hvciBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVBbmNob3IobWFrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSBkcmFnYWJpbGl0eS5cclxuICAgICAqIERyYWdhYmlsaXR5IGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIG1hcmtlciBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVEcmFnZ2FibGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgSWNvbiBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGljb24uXHJcbiAgICAgKiBJY29uIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGljb24gaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlSWNvbihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBsYWJlbCBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGxhYmVsLlxyXG4gICAgICogTGFiZWwgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGFiZWwgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlTGFiZWwobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGNvb3JkaW5hdGVzLlxyXG4gICAgICogQ29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVNYXJrZXJQb3NpdGlvbihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aXRsZSBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHRpdGxlLlxyXG4gICAgICogVGl0bGUgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgdGl0bGUgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlVGl0bGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmlzaWJpbGl0eSBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHZpc2liaWxpdHkuXHJcbiAgICAgKiBWaXNpYmlsaXR5IGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHZpc2liaWxpdHkgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlVmlzaWJsZShtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG59XHJcbiJdfQ==