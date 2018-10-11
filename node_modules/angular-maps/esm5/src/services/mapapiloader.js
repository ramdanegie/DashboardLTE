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
var MapAPILoader = /** @class */ (function () {
    function MapAPILoader() {
    }
    MapAPILoader.decorators = [
        { type: Injectable },
    ];
    return MapAPILoader;
}());
export { MapAPILoader };
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
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    Object.defineProperty(DocumentRef.prototype, "IsAvailable", {
        get: /**
         * Gets whether a document implementation is available. Generally will be true in the browser and false otherwise, unless there
         * there is a browser-less implementation in the current non-browser environment.
         *
         * \@readonly
         * \@memberof DocumentRef
         * @return {?}
         */
        function () {
            return !(typeof (document) === 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    DocumentRef.prototype.GetNativeDocument = /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    function () {
        if (typeof (document) === 'undefined') {
            return null;
        }
        return document;
    };
    DocumentRef.decorators = [
        { type: Injectable },
    ];
    return DocumentRef;
}());
export { DocumentRef };
/**
 * Window Reference service to assist with abstracting the availability of window. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "IsAvailable", {
        get: /**
         * Gets whether a window implementation is available. Generally will be true in the browser and false otherwise, unless there
         * there is a browser-less implementation in the current non-browser environment.
         *
         * \@readonly
         * \@memberof WindowRef
         * @return {?}
         */
        function () {
            return !(typeof (window) === 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    WindowRef.prototype.GetNativeWindow = /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    function () {
        if (typeof (window) === 'undefined') {
            return null;
        }
        return window;
    };
    WindowRef.decorators = [
        { type: Injectable },
    ];
    return WindowRef;
}());
export { WindowRef };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYXBpbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL21hcGFwaWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztnQkFTMUMsVUFBVTs7dUJBVFg7O1NBVXNCLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBOEJuQixvQ0FBVzs7Ozs7Ozs7OztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBVXpDLHVDQUFpQjs7Ozs7Ozs7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQXpCdkIsVUFBVTs7c0JBOUJYOztTQStCYSxXQUFXOzs7Ozs7Ozs7OzBCQTRDVCxrQ0FBVzs7Ozs7Ozs7OztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBVXZDLG1DQUFlOzs7Ozs7OztRQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Z0JBekJyQixVQUFVOztvQkFqRVg7O1NBa0VhLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgaW1wbGVtZW50YXRpb24uIFVTZWQgZm9yIGRlZmludGlvbiBvbmx5IGFuZCBhcyBhIGJhc2UgdG8gaW1wbGVtZW50IHlvdXJcclxuICogb3duIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwQVBJTG9hZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBuZWNlc3NhcnkgcmVzb3VyY2VzIGZvciBhIGdpdmVuIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSByZXNvdXJjZXMgaGF2ZSBiZWVuIGxvYWRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IExvYWQoKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEb2N1bWVudCBSZWZlcmVuY2Ugc2VydmljZSB0byBhc3Npc3Qgd2l0aCBhYnN0cmFjdGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mIGRvY3VtZW50LiBOZWVkZWQgZm9yIEFPVCBhbmRcclxuICogU2VydmVyIFNpZGUgcmVuZGVyaW5nXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERvY3VtZW50UmVmIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciBhIGRvY3VtZW50IGltcGxlbWVudGF0aW9uIGlzIGF2YWlsYWJsZS4gR2VuZXJhbGx5IHdpbGwgYmUgdHJ1ZSBpbiB0aGUgYnJvd3NlciBhbmQgZmFsc2Ugb3RoZXJ3aXNlLCB1bmxlc3MgdGhlcmVcclxuICAgICAqIHRoZXJlIGlzIGEgYnJvd3Nlci1sZXNzIGltcGxlbWVudGF0aW9uIGluIHRoZSBjdXJyZW50IG5vbi1icm93c2VyIGVudmlyb25tZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIERvY3VtZW50UmVmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEodHlwZW9mIChkb2N1bWVudCkgPT09ICd1bmRlZmluZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRvY3VtZW50IG9iamVjdCBvZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBkb2N1bWVudCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERvY3VtZW50UmVmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVEb2N1bWVudCgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGRvY3VtZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFdpbmRvdyBSZWZlcmVuY2Ugc2VydmljZSB0byBhc3Npc3Qgd2l0aCBhYnN0cmFjdGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mIHdpbmRvdy4gTmVlZGVkIGZvciBBT1QgYW5kXHJcbiAqIFNlcnZlciBTaWRlIHJlbmRlcmluZ1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dSZWYge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIGEgd2luZG93IGltcGxlbWVudGF0aW9uIGlzIGF2YWlsYWJsZS4gR2VuZXJhbGx5IHdpbGwgYmUgdHJ1ZSBpbiB0aGUgYnJvd3NlciBhbmQgZmFsc2Ugb3RoZXJ3aXNlLCB1bmxlc3MgdGhlcmVcclxuICAgICAqIHRoZXJlIGlzIGEgYnJvd3Nlci1sZXNzIGltcGxlbWVudGF0aW9uIGluIHRoZSBjdXJyZW50IG5vbi1icm93c2VyIGVudmlyb25tZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFdpbmRvd1JlZlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKHR5cGVvZiAod2luZG93KSA9PT0gJ3VuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2luZG93IG9iamVjdCBvZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB3aW5kb3cgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaW5kb3dSZWZcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZVdpbmRvdygpOiBhbnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=