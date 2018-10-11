/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
/**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
var /**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
BingInfoWindow = /** @class */ (function () {
    /**
     * Creates an instance of BingInfoWindow.
     * @param _infoBox - A {@link Microsoft.Maps.Infobox} instance underlying the model
     * @memberof BingInfoWindow
     */
    function BingInfoWindow(_infoBox) {
        this._infoBox = _infoBox;
        this._isOpen = false;
    }
    Object.defineProperty(BingInfoWindow.prototype, "IsOpen", {
        get: /**
         * Gets whether the info box is currently open.
         *
         * \@readonly
         * \@memberof BingInfoWindow
         * @return {?}
         */
        function () {
            if (this._infoBox && this._infoBox.getOptions().visible === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingInfoWindow.prototype, "NativePrimitve", {
        get: /**
         * Gets native primitve underlying the model.
         *
         * \@memberof BingInfoWindow
         * \@property
         * \@readonly
         * @return {?}
         */
        function () {
            return this._infoBox;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.AddListener = /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        Microsoft.Maps.Events.addHandler(this._infoBox, eventType, function (e) {
            if (e.eventName === 'infoboxChanged') {
                if (_this._infoBox.getOptions().visible === true) {
                    _this._isOpen = true;
                }
                else {
                    if (_this._infoBox.getOptions().visible === false && _this._isOpen === true) {
                        _this._isOpen = false;
                        fn(e);
                    }
                }
            }
            else {
                fn(e);
            }
        });
    };
    /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    BingInfoWindow.prototype.Close = /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        var /** @type {?} */ o = {};
        o.visible = false;
        this._infoBox.setOptions(o);
    };
    /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    BingInfoWindow.prototype.GetPosition = /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    function () {
        var /** @type {?} */ p = {
            latitude: this._infoBox.getLocation().latitude,
            longitude: this._infoBox.getLocation().longitude
        };
        return p;
    };
    /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    BingInfoWindow.prototype.Open = /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        var /** @type {?} */ o = {};
        o.visible = true;
        this._infoBox.setOptions(o);
    };
    /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.SetOptions = /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = BingConversions.TranslateInfoBoxOptions(options);
        this._infoBox.setOptions(o);
    };
    /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.SetPosition = /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    function (position) {
        var /** @type {?} */ l = BingConversions.TranslateLocation(position);
        this._infoBox.setLocation(l);
    };
    return BingInfoWindow;
}());
/**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
export { BingInfoWindow };
function BingInfoWindow_tsickle_Closure_declarations() {
    /** @type {?} */
    BingInfoWindow.prototype._isOpen;
    /** @type {?} */
    BingInfoWindow.prototype._infoBox;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQU92RTs7Ozs7QUFBQTtJQTBCSTs7OztPQUlHO0lBQ0gsd0JBQW9CLFFBQWdDO1FBQWhDLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3hCOzBCQXZCVSxrQ0FBTTs7Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUNsRixNQUFNLENBQUMsS0FBSyxDQUFDOzs7OzswQkFVTiwwQ0FBYzs7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBcUJsQixvQ0FBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTs7UUFDOUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQUMsQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTtnQkFDekUsSUFBSSxDQUFDLENBQUM7b0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7U0FDSixDQUFDLENBQUM7Ozs7Ozs7OztJQVNBLDhCQUFLOzs7Ozs7OztRQUNSLHFCQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVekIsb0NBQVc7Ozs7Ozs7O1FBQ2QscUJBQU0sQ0FBQyxHQUFhO1lBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVE7WUFDOUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUztTQUNuRCxDQUFDO1FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU04sNkJBQUk7Ozs7Ozs7O1FBQ1AscUJBQU0sQ0FBQyxHQUFtQyxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLG1DQUFVOzs7Ozs7Ozs7Y0FBQyxPQUEyQjtRQUN6QyxxQkFBTSxDQUFDLEdBQW1DLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekIsb0NBQVc7Ozs7Ozs7OztjQUFDLFFBQWtCO1FBQ2pDLHFCQUFNLENBQUMsR0FBNEIsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzt5QkF0SXJDO0lBd0lDLENBQUE7Ozs7OztBQTdIRCwwQkE2SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgSW5mb1dpbmRvd30gY29udHJhY3QgZm9yIHRoZSBCaW5nIE1hcHMgVjggbWFwIGFyY2hpdGVjdHVyZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmdJbmZvV2luZG93IGltcGxlbWVudHMgSW5mb1dpbmRvdyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzT3BlbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5faW5mb0JveCAmJiB0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBuYXRpdmUgcHJpbWl0dmUgdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IE1pY3Jvc29mdC5NYXBzLkluZm9ib3gge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvQm94O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nSW5mb1dpbmRvdy5cclxuICAgICAqIEBwYXJhbSBfaW5mb0JveCAtIEEge0BsaW5rIE1pY3Jvc29mdC5NYXBzLkluZm9ib3h9IGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIG1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb0JveDogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCkge1xyXG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgSW5mb1dpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5faW5mb0JveCwgZXZlbnRUeXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5ldmVudE5hbWUgPT09ICdpbmZvYm94Q2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSB0cnVlKSB7IHRoaXMuX2lzT3BlbiA9IHRydWU7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSBmYWxzZSAmJiB0aGlzLl9pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zID0ge307XHJcbiAgICAgICAgby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gUmV0dXJucyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UG9zaXRpb24oKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IHA6IElMYXRMb25nID0ge1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5faW5mb0JveC5nZXRMb2NhdGlvbigpLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuX2luZm9Cb3guZ2V0TG9jYXRpb24oKS5sb25naXR1ZGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgT3BlbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgPSB7fTtcclxuICAgICAgICBvLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3guc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBJbmZvIHdpbmRvdyBvcHRpb25zIHRvIHNldC4gVGhlIG9wdGlvbnMgd2lsbCBiZSBtZXJnZWQgd2l0aCBhbnkgZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUluZm9Cb3hPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3guc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IHBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiAtIEdlbyBjb29yZGluYXRlcyB0byBtb3ZlIHRoZSBhbmNob3Igb2YgdGhlIGluZm8gd2luZG93IHRvLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UG9zaXRpb24ocG9zaXRpb246IElMYXRMb25nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3guc2V0TG9jYXRpb24obCk7XHJcbiAgICB9XHJcbn1cclxuIl19