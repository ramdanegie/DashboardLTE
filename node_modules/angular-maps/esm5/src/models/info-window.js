/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
InfoWindow = /** @class */ (function () {
    function InfoWindow() {
    }
    return InfoWindow;
}());
/**
 * @abstract
 */
export { InfoWindow };
function InfoWindow_tsickle_Closure_declarations() {
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.IsOpen = function () { };
    /**
     * Get the underlying native primitive of the implementation.
     *
     * \@readonly
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener to the info window.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    InfoWindow.prototype.AddListener = function (eventType, fn) { };
    /**
     * Closes the info window.
     *
     * @abstract
     *
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.Close = function () { };
    /**
     * Gets the position of the info window.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?} - Returns the geo coordinates of the info window.
     *
     */
    InfoWindow.prototype.GetPosition = function () { };
    /**
     * Opens the info window.
     *
     * @abstract
     *
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.Open = function () { };
    /**
     * Sets the info window options.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    InfoWindow.prototype.SetOptions = function (options) { };
    /**
     * Sets the info window position.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    InfoWindow.prototype.SetPosition = function (position) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7O0FBQUE7OztxQkFIQTtJQWlGQyxDQUFBOzs7O0FBOUVELHNCQThFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluZm9XaW5kb3cge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBJc09wZW4oKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdW5kZXJseWluZyBuYXRpdmUgcHJpbWl0aXZlIG9mIHRoZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDbG9zZSgpOiB2b2lkIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gUmV0dXJucyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UG9zaXRpb24oKTogSUxhdExvbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IE9wZW4oKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluZm8gd2luZG93IG9wdGlvbnMgdG8gc2V0LiBUaGUgb3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIGFueSBleGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiAtIEdlbyBjb29yZGluYXRlcyB0byBtb3ZlIHRoZSBhbmNob3Igb2YgdGhlIGluZm8gd2luZG93IHRvLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQb3NpdGlvbihwb3NpdGlvbjogSUxhdExvbmcpOiB2b2lkO1xyXG59XHJcbiJdfQ==