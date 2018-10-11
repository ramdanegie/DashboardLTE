/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a polygon service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
export class PolygonService {
}
PolygonService.decorators = [
    { type: Injectable },
];
function PolygonService_tsickle_Closure_declarations() {
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    PolygonService.prototype.AddPolygon = function (polygon) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    PolygonService.prototype.CreateEventObservable = function (eventName, polygon) { };
    /**
     * Deletes a polygon.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    PolygonService.prototype.DeletePolygon = function (polygon) { };
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
    PolygonService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    PolygonService.prototype.GetNativePolygon = function (polygon) { };
    /**
     * Set the polygon options.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    PolygonService.prototype.SetOptions = function (polygon, options) { };
    /**
     * Updates the Polygon path
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    PolygonService.prototype.UpdatePolygon = function (polygon) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBZW5ELE1BQU07OztZQURMLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBNYXBQb2x5Z29uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9tYXAtcG9seWdvbic7XHJcblxyXG4vKipcclxuICogVGhlIGFic3RyYWN0IGNsYXNzIHJlcHJlc2VudHMgdGhlIGNvbnRyYWN0IGRlZmludGlvbnMgZm9yIGEgcG9seWdvbiBzZXJ2aWNlIHRvIGJlIGltcGxlbWVudGVkIGJ5IGFuIGFjdXRhbHkgdW5kZXJseWluZ1xyXG4gKiBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWdvblNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgcG9seWdvbiB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5Z29uIGNvbnRleHQsIHRoZSBwb2x5Z29uIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxyXG4gICAqIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFBvbHlnb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IEFkZFBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbWFya2VyLlxyXG4gICAgKlxyXG4gICAgKiBAYWJzdHJhY3RcclxuICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxyXG4gICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICpcclxuICAgICogQG1lbWJlcm9mIFBvbHlnb25TZXJ2aWNlXHJcbiAgICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuICAvKipcclxuICAgICogRGVsZXRlcyBhIHBvbHlnb24uXHJcbiAgICAqXHJcbiAgICAqIEBhYnN0cmFjdFxyXG4gICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICpcclxuICAgICogQG1lbWJlcm9mIFBvbHlnb25TZXJ2aWNlXHJcbiAgICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBEZWxldGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBvbiB0aGUgY2xpY2sgbG9jYXRpb25cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcclxuICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3QgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nO1xyXG5cclxuICAvKipcclxuICAgKiBPYnRhaW5zIHRoZSBwb2x5Z29uIG1vZGVsIGZvciB0aGUgcG9seWdvbiBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlnb24gbW9kZWwuXHJcbiAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5Z29ufSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBQb2x5Z29uU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBHZXROYXRpdmVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPFBvbHlnb24+O1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvbHlnb24gb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxyXG4gICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXHJcbiAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIG9wdGlvbnMgaGF2ZSBiZWVuIHNldC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBQb2x5Z29uU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIFBvbHlnb24gcGF0aFxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBQb2x5Z29uU2VydmljZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxufVxyXG4iXX0=