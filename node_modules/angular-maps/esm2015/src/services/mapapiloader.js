/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract implementation. USed for defintion only and as a base to implement your
 * own provider.
 *
 * @export
 * @abstract
 * @abstract
 */
export class MapAPILoader {
}
MapAPILoader.decorators = [
    { type: Injectable },
];
function MapAPILoader_tsickle_Closure_declarations() {
    /**
     * Loads the necessary resources for a given map architecture.
     *
     * @abstract
     * \@memberof MapAPILoader
     * @abstract
     * @return {?} - Promise fullfilled when the resources have been loaded.
     *
     */
    MapAPILoader.prototype.Load = function () { };
}
/**
 * Document Reference service to assist with abstracting the availability of document. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
export class DocumentRef {
    /**
     * Gets whether a document implementation is available. Generally will be true in the browser and false otherwise, unless there
     * there is a browser-less implementation in the current non-browser environment.
     *
     * \@readonly
     * \@memberof DocumentRef
     * @return {?}
     */
    get IsAvailable() {
        return !(typeof (document) === 'undefined');
    }
    /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    GetNativeDocument() {
        if (typeof (document) === 'undefined') {
            return null;
        }
        return document;
    }
}
DocumentRef.decorators = [
    { type: Injectable },
];
/**
 * Window Reference service to assist with abstracting the availability of window. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
export class WindowRef {
    /**
     * Gets whether a window implementation is available. Generally will be true in the browser and false otherwise, unless there
     * there is a browser-less implementation in the current non-browser environment.
     *
     * \@readonly
     * \@memberof WindowRef
     * @return {?}
     */
    get IsAvailable() {
        return !(typeof (window) === 'undefined');
    }
    /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    GetNativeWindow() {
        if (typeof (window) === 'undefined') {
            return null;
        }
        return window;
    }
}
WindowRef.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYXBpbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL21hcGFwaWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBVTNDLE1BQU07OztZQURMLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JYLE1BQU07Ozs7Ozs7OztRQVNTLFdBQVc7UUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7Ozs7Ozs7OztJQVV6QyxpQkFBaUI7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7OztZQXpCdkIsVUFBVTs7Ozs7Ozs7QUFvQ1gsTUFBTTs7Ozs7Ozs7O1FBU1MsV0FBVztRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXZDLGVBQWU7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7OztZQXpCckIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBpbXBsZW1lbnRhdGlvbi4gVVNlZCBmb3IgZGVmaW50aW9uIG9ubHkgYW5kIGFzIGEgYmFzZSB0byBpbXBsZW1lbnQgeW91clxyXG4gKiBvd24gcHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBBUElMb2FkZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIG5lY2Vzc2FyeSByZXNvdXJjZXMgZm9yIGEgZ2l2ZW4gbWFwIGFyY2hpdGVjdHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIHdoZW4gdGhlIHJlc291cmNlcyBoYXZlIGJlZW4gbG9hZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgTG9hZCgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIERvY3VtZW50IFJlZmVyZW5jZSBzZXJ2aWNlIHRvIGFzc2lzdCB3aXRoIGFic3RyYWN0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2YgZG9jdW1lbnQuIE5lZWRlZCBmb3IgQU9UIGFuZFxyXG4gKiBTZXJ2ZXIgU2lkZSByZW5kZXJpbmdcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRSZWYge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIGEgZG9jdW1lbnQgaW1wbGVtZW50YXRpb24gaXMgYXZhaWxhYmxlLiBHZW5lcmFsbHkgd2lsbCBiZSB0cnVlIGluIHRoZSBicm93c2VyIGFuZCBmYWxzZSBvdGhlcndpc2UsIHVubGVzcyB0aGVyZVxyXG4gICAgICogdGhlcmUgaXMgYSBicm93c2VyLWxlc3MgaW1wbGVtZW50YXRpb24gaW4gdGhlIGN1cnJlbnQgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgRG9jdW1lbnRSZWZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJc0F2YWlsYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISh0eXBlb2YgKGRvY3VtZW50KSA9PT0gJ3VuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZG9jdW1lbnQgb2JqZWN0IG9mIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGRvY3VtZW50IG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgRG9jdW1lbnRSZWZcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZURvY3VtZW50KCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoZG9jdW1lbnQpID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogV2luZG93IFJlZmVyZW5jZSBzZXJ2aWNlIHRvIGFzc2lzdCB3aXRoIGFic3RyYWN0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2Ygd2luZG93LiBOZWVkZWQgZm9yIEFPVCBhbmRcclxuICogU2VydmVyIFNpZGUgcmVuZGVyaW5nXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFdpbmRvd1JlZiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgYSB3aW5kb3cgaW1wbGVtZW50YXRpb24gaXMgYXZhaWxhYmxlLiBHZW5lcmFsbHkgd2lsbCBiZSB0cnVlIGluIHRoZSBicm93c2VyIGFuZCBmYWxzZSBvdGhlcndpc2UsIHVubGVzcyB0aGVyZVxyXG4gICAgICogdGhlcmUgaXMgYSBicm93c2VyLWxlc3MgaW1wbGVtZW50YXRpb24gaW4gdGhlIGN1cnJlbnQgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgV2luZG93UmVmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEodHlwZW9mICh3aW5kb3cpID09PSAndW5kZWZpbmVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB3aW5kb3cgb2JqZWN0IG9mIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHdpbmRvdyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpbmRvd1JlZlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TmF0aXZlV2luZG93KCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod2luZG93KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==