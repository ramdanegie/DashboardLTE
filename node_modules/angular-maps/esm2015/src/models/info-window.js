/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
export class InfoWindow {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxNQUFNO0NBOEVMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5mb1dpbmRvdyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIGluZm8gYm94IGlzIGN1cnJlbnRseSBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IElzT3BlbigpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwcmltaXRpdmUgb2YgdGhlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IENsb3NlKCk6IHZvaWQgO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBSZXR1cm5zIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQb3NpdGlvbigpOiBJTGF0TG9uZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgT3BlbigpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gSW5mbyB3aW5kb3cgb3B0aW9ucyB0byBzZXQuIFRoZSBvcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggYW55IGV4aXN0aW5nIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IHBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIC0gR2VvIGNvb3JkaW5hdGVzIHRvIG1vdmUgdGhlIGFuY2hvciBvZiB0aGUgaW5mbyB3aW5kb3cgdG8uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBvc2l0aW9uKHBvc2l0aW9uOiBJTGF0TG9uZyk6IHZvaWQ7XHJcbn1cclxuIl19