/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
/**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
GoogleInfoWindow = /** @class */ (function () {
    ///
    /// constructor
    ///
    /**
     * Creates an instance of GoogleInfoWindow.
     * @param _infoWindow - A {@link GoogleMapTypes.InfoWindow} instance underlying the model.
     * @param _mapService - An instance of the {@link GoogleMapService}.
     * @memberof GoogleInfoWindow
     */
    function GoogleInfoWindow(_infoWindow, _mapService) {
        this._infoWindow = _infoWindow;
        this._mapService = _mapService;
    }
    Object.defineProperty(GoogleInfoWindow.prototype, "IsOpen", {
        get: /**
         * Gets whether the info box is currently open.
         *
         * \@readonly
         * \@memberof InfoWGoogleInfoWindowindow
         * @return {?}
         */
        function () {
            if (this._isOpen === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleInfoWindow.prototype, "NativePrimitve", {
        get: /**
         * Gets the underlying native object.
         *
         * \@property
         * \@readonly
         * @return {?}
         */
        function () {
            return this._infoWindow;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.AddListener = /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        this._infoWindow.addListener(eventType, function (e) {
            if (eventType === 'closeclick') {
                _this._isOpen = false;
            }
            fn(e);
        });
    };
    /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    GoogleInfoWindow.prototype.Close = /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        this._isOpen = false;
        this._infoWindow.close();
    };
    /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    GoogleInfoWindow.prototype.GetPosition = /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    function () {
        return GoogleConversions.TranslateLatLngObject(this._infoWindow.getPosition());
    };
    /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    GoogleInfoWindow.prototype.Open = /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    function (anchor) {
        var _this = this;
        this._mapService.MapPromise.then(function (m) {
            _this._isOpen = true;
            _this._infoWindow.open(m, anchor);
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.SetOptions = /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = GoogleConversions.TranslateInfoWindowOptions(options);
        this._infoWindow.setOptions(o);
    };
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.SetPosition = /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    function (position) {
        var /** @type {?} */ l = GoogleConversions.TranslateLocation(position);
        this._infoWindow.setPosition(l);
    };
    return GoogleInfoWindow;
}());
/**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
export { GoogleInfoWindow };
function GoogleInfoWindow_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleInfoWindow.prototype._isOpen;
    /** @type {?} */
    GoogleInfoWindow.prototype._infoWindow;
    /** @type {?} */
    GoogleInfoWindow.prototype._mapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0FBWTdFOzs7OztBQUFBO0lBeUJJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7OztPQUtHO0lBQ0gsMEJBQW9CLFdBQXNDLEVBQVUsV0FBNkI7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQTJCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0tBQUs7MEJBekIzRixvQ0FBTTs7Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7OzswQkFTTiw0Q0FBYzs7Ozs7Ozs7O1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUE0QnJCLHNDQUFXOzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZOztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFNO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQUU7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVUEsZ0NBQUs7Ozs7Ozs7OztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFXdEIsc0NBQVc7Ozs7Ozs7OztRQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXNUUsK0JBQUk7Ozs7Ozs7O2NBQUMsTUFBWTs7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUM5QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVdBLHFDQUFVOzs7Ozs7Ozs7Y0FBQyxPQUEyQjtRQUN6QyxxQkFBTSxDQUFDLEdBQXFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVc1QixzQ0FBVzs7Ozs7Ozs7O2NBQUMsUUFBa0I7UUFDakMscUJBQU0sQ0FBQyxHQUFpQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MkJBckl4QztJQXVJQyxDQUFBOzs7Ozs7QUF6SEQsNEJBeUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgYSB7QGxpbmsgSW5mb1dpbmRvd319IG1vZGVsIGZvciBHb29nbGUgTWFwcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUluZm9XaW5kb3cgaW1wbGVtZW50cyBJbmZvV2luZG93IHtcclxuXHJcbiAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIGluZm8gYm94IGlzIGN1cnJlbnRseSBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEluZm9XR29vZ2xlSW5mb1dpbmRvd2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc09wZW4gPT09IHRydWUpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBjb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZUluZm9XaW5kb3cuXHJcbiAgICAgKiBAcGFyYW0gX2luZm9XaW5kb3cgLSBBIHtAbGluayBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93fSBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIEFuIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmZvV2luZG93OiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93LCBwcml2YXRlIF9tYXBTZXJ2aWNlOiBHb29nbGVNYXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIEluZm9XaW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5hZGRMaXN0ZW5lcihldmVudFR5cGUsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2Nsb3NlY2xpY2snKSB7IHRoaXMuX2lzT3BlbiA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIENsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvd1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBvc2l0aW9uKCk6IElMYXRMb25nIHtcclxuICAgICAgICByZXR1cm4gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTGF0TG5nT2JqZWN0KHRoaXMuX2luZm9XaW5kb3cuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW2FuY2hvcl0gLSBPcHRpb25hbCBBbmNob3IuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9wZW4oYW5jaG9yPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4obSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2luZm9XaW5kb3cub3BlbihtLCBhbmNob3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gc2V0LiBUaGlzIG9iamVjdCB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSBleGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBHZW8gY29vcmRpbmF0ZXMgYXQgd2hpY2ggdG8gYW5jaG9yIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UG9zaXRpb24ocG9zaXRpb246IElMYXRMb25nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLl9pbmZvV2luZG93LnNldFBvc2l0aW9uKGwpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==