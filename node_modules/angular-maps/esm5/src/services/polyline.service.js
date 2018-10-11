/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a polyline service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
var PolylineService = /** @class */ (function () {
    function PolylineService() {
    }
    PolylineService.decorators = [
        { type: Injectable },
    ];
    return PolylineService;
}());
export { PolylineService };
function PolylineService_tsickle_Closure_declarations() {
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * correcsponding layer.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    PolylineService.prototype.AddPolyline = function (polyline) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    PolylineService.prototype.CreateEventObservable = function (eventName, polyline) { };
    /**
     * Deletes a polyline.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    PolylineService.prototype.DeletePolyline = function (polyline) { };
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
    PolylineService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the polyline model for the polyline allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline} implementation (or an
     * array of polylines) for complex paths of the underlying platform.
     *
     */
    PolylineService.prototype.GetNativePolyline = function (polyline) { };
    /**
     * Set the polyline options.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    PolylineService.prototype.SetOptions = function (polyline, options) { };
    /**
     * Updates the Polyline path
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    PolylineService.prototype.UpdatePolyline = function (polyline) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7O2dCQWNsRCxVQUFVOzswQkFkWDs7U0Flc0IsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNYXBQb2x5bGluZURpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgYWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50cyB0aGUgY29udHJhY3QgZGVmaW50aW9ucyBmb3IgYSBwb2x5bGluZSBzZXJ2aWNlIHRvIGJlIGltcGxlbWVudGVkIGJ5IGFuIGFjdXRhbHkgdW5kZXJseWluZ1xyXG4gKiBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWxpbmVTZXJ2aWNlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHBvbHlsaW5lIHRvIGEgbWFwLiBEZXBlbmRpbmcgb24gdGhlIHBvbHlsaW5lIGNvbnRleHQsIHRoZSBwb2x5bGluZSB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcclxuICAgKiBjb3JyZWNzcG9uZGluZyBsYXllci5cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBBZGRQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIG1hcmtlci5cclxuICAgICpcclxuICAgICogQGFic3RyYWN0XHJcbiAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICpcclxuICAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxyXG4gICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuICAvKipcclxuICAgICogRGVsZXRlcyBhIHBvbHlsaW5lLlxyXG4gICAgKlxyXG4gICAgKiBAYWJzdHJhY3RcclxuICAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAqXHJcbiAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVNlcnZpY2VcclxuICAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IERlbGV0ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSUxhdExvbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9idGFpbnMgdGhlIHBvbHlsaW5lIG1vZGVsIGZvciB0aGUgcG9seWxpbmUgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlsaW5lIG1vZGVsLlxyXG4gICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgUG9seWxpbmV9IGltcGxlbWVudGF0aW9uIChvciBhblxyXG4gICAqIGFycmF5IG9mIHBvbHlsaW5lcykgZm9yIGNvbXBsZXggcGF0aHMgb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgUG9seWxpbmVTZXJ2aWNlXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IEdldE5hdGl2ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBwb2x5bGluZSBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBPcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlXHJcbiAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cclxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIG9wdGlvbnMgaGF2ZSBiZWVuIHNldC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZVNlcnZpY2VcclxuICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBQb2x5bGluZSBwYXRoXHJcbiAgICpcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxufVxyXG4iXX0=