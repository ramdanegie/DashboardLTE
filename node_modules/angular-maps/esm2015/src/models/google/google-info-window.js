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
export class GoogleInfoWindow {
    /**
     * Creates an instance of GoogleInfoWindow.
     * \@memberof GoogleInfoWindow
     * @param {?} _infoWindow - A {\@link GoogleMapTypes.InfoWindow} instance underlying the model.
     * @param {?} _mapService - An instance of the {\@link GoogleMapService}.
     */
    constructor(_infoWindow, _mapService) {
        this._infoWindow = _infoWindow;
        this._mapService = _mapService;
    }
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * \@memberof InfoWGoogleInfoWindowindow
     * @return {?}
     */
    get IsOpen() {
        if (this._isOpen === true) {
            return true;
        }
        return false;
    }
    /**
     * Gets the underlying native object.
     *
     * \@property
     * \@readonly
     * @return {?}
     */
    get NativePrimitve() {
        return this._infoWindow;
    }
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
    AddListener(eventType, fn) {
        this._infoWindow.addListener(eventType, (e) => {
            if (eventType === 'closeclick') {
                this._isOpen = false;
            }
            fn(e);
        });
    }
    /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    Close() {
        this._isOpen = false;
        this._infoWindow.close();
    }
    /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    GetPosition() {
        return GoogleConversions.TranslateLatLngObject(this._infoWindow.getPosition());
    }
    /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    Open(anchor) {
        this._mapService.MapPromise.then(m => {
            this._isOpen = true;
            this._infoWindow.open(m, anchor);
        });
    }
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = GoogleConversions.TranslateInfoWindowOptions(options);
        this._infoWindow.setOptions(o);
    }
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    SetPosition(position) {
        const /** @type {?} */ l = GoogleConversions.TranslateLocation(position);
        this._infoWindow.setPosition(l);
    }
}
function GoogleInfoWindow_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleInfoWindow.prototype._isOpen;
    /** @type {?} */
    GoogleInfoWindow.prototype._infoWindow;
    /** @type {?} */
    GoogleInfoWindow.prototype._mapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0FBWTdFLE1BQU07Ozs7Ozs7SUFtQ0YsWUFBb0IsV0FBc0MsRUFBVSxXQUE2QjtRQUE3RSxnQkFBVyxHQUFYLFdBQVcsQ0FBMkI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7S0FBSzs7Ozs7Ozs7UUF6QjNGLE1BQU07UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O1FBU04sY0FBYztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7O0lBNEJyQixXQUFXLENBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQUU7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVUEsS0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFXdEIsV0FBVztRQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXNUUsSUFBSSxDQUFDLE1BQVk7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0EsVUFBVSxDQUFDLE9BQTJCO1FBQ3pDLHVCQUFNLENBQUMsR0FBcUMsaUJBQWlCLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBVzVCLFdBQVcsQ0FBQyxRQUFrQjtRQUNqQyx1QkFBTSxDQUFDLEdBQWlDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztDQUV2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEge0BsaW5rIEluZm9XaW5kb3d9fSBtb2RlbCBmb3IgR29vZ2xlIE1hcHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVJbmZvV2luZG93IGltcGxlbWVudHMgSW5mb1dpbmRvdyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvV0dvb2dsZUluZm9XaW5kb3dpbmRvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzT3BlbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5faXNPcGVuID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBuYXRpdmUgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvdyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gY29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVJbmZvV2luZG93LlxyXG4gICAgICogQHBhcmFtIF9pbmZvV2luZG93IC0gQSB7QGxpbmsgR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd30gaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBBbiBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb1dpbmRvdzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvdywgcHJpdmF0ZSBfbWFwU2VydmljZTogR29vZ2xlTWFwU2VydmljZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBJbmZvV2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuYWRkTGlzdGVuZXIoZXZlbnRUeXBlLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdjbG9zZWNsaWNrJykgeyB0aGlzLl9pc09wZW4gPSBmYWxzZTsgfVxyXG4gICAgICAgICAgICBmbihlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pbmZvV2luZG93LmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3dcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQb3NpdGlvbigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgcmV0dXJuIEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxhdExuZ09iamVjdCh0aGlzLl9pbmZvV2luZG93LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFthbmNob3JdIC0gT3B0aW9uYWwgQW5jaG9yLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPcGVuKGFuY2hvcj86IGFueSkge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZS50aGVuKG0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbmZvV2luZG93Lm9wZW4obSwgYW5jaG9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHRvIHNldC4gVGhpcyBvYmplY3Qgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGUgZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93T3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUluZm9XaW5kb3dPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIC0gR2VvIGNvb3JkaW5hdGVzIGF0IHdoaWNoIHRvIGFuY2hvciB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBvc2l0aW9uKHBvc2l0aW9uOiBJTGF0TG9uZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5zZXRQb3NpdGlvbihsKTtcclxuICAgIH1cclxufVxyXG4iXX0=