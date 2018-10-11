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
export class BingInfoWindow {
    /**
     * Creates an instance of BingInfoWindow.
     * \@memberof BingInfoWindow
     * @param {?} _infoBox - A {\@link Microsoft.Maps.Infobox} instance underlying the model
     */
    constructor(_infoBox) {
        this._infoBox = _infoBox;
        this._isOpen = false;
    }
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * \@memberof BingInfoWindow
     * @return {?}
     */
    get IsOpen() {
        if (this._infoBox && this._infoBox.getOptions().visible === true) {
            return true;
        }
        return false;
    }
    /**
     * Gets native primitve underlying the model.
     *
     * \@memberof BingInfoWindow
     * \@property
     * \@readonly
     * @return {?}
     */
    get NativePrimitve() {
        return this._infoBox;
    }
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
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._infoBox, eventType, (e) => {
            if (e.eventName === 'infoboxChanged') {
                if (this._infoBox.getOptions().visible === true) {
                    this._isOpen = true;
                }
                else {
                    if (this._infoBox.getOptions().visible === false && this._isOpen === true) {
                        this._isOpen = false;
                        fn(e);
                    }
                }
            }
            else {
                fn(e);
            }
        });
    }
    /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    Close() {
        const /** @type {?} */ o = {};
        o.visible = false;
        this._infoBox.setOptions(o);
    }
    /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    GetPosition() {
        const /** @type {?} */ p = {
            latitude: this._infoBox.getLocation().latitude,
            longitude: this._infoBox.getLocation().longitude
        };
        return p;
    }
    /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    Open() {
        const /** @type {?} */ o = {};
        o.visible = true;
        this._infoBox.setOptions(o);
    }
    /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = BingConversions.TranslateInfoBoxOptions(options);
        this._infoBox.setOptions(o);
    }
    /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    SetPosition(position) {
        const /** @type {?} */ l = BingConversions.TranslateLocation(position);
        this._infoBox.setLocation(l);
    }
}
function BingInfoWindow_tsickle_Closure_declarations() {
    /** @type {?} */
    BingInfoWindow.prototype._isOpen;
    /** @type {?} */
    BingInfoWindow.prototype._infoBox;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQU92RSxNQUFNOzs7Ozs7SUErQkYsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDeEI7Ozs7Ozs7O1FBdkJVLE1BQU07UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDbEYsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7OztRQVVOLGNBQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7OztJQXFCbEIsV0FBVyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTtnQkFDekUsSUFBSSxDQUFDLENBQUM7b0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7U0FDSixDQUFDLENBQUM7Ozs7Ozs7OztJQVNBLEtBQUs7UUFDUix1QkFBTSxDQUFDLEdBQW1DLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXpCLFdBQVc7UUFDZCx1QkFBTSxDQUFDLEdBQWE7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUTtZQUM5QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTO1NBQ25ELENBQUM7UUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFTTixJQUFJO1FBQ1AsdUJBQU0sQ0FBQyxHQUFtQyxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLFVBQVUsQ0FBQyxPQUEyQjtRQUN6Qyx1QkFBTSxDQUFDLEdBQW1DLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekIsV0FBVyxDQUFDLFFBQWtCO1FBQ2pDLHVCQUFNLENBQUMsR0FBNEIsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztDQUVwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIHtAbGluayBJbmZvV2luZG93fSBjb250cmFjdCBmb3IgdGhlIEJpbmcgTWFwcyBWOCBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ0luZm9XaW5kb3cgaW1wbGVtZW50cyBJbmZvV2luZG93IHtcclxuXHJcbiAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIGluZm8gYm94IGlzIGN1cnJlbnRseSBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICYmIHRoaXMuX2luZm9Cb3guZ2V0T3B0aW9ucygpLnZpc2libGUgPT09IHRydWUpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG5hdGl2ZSBwcmltaXR2ZSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9Cb3g7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdJbmZvV2luZG93LlxyXG4gICAgICogQHBhcmFtIF9pbmZvQm94IC0gQSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveH0gaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgbW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmZvQm94OiBNaWNyb3NvZnQuTWFwcy5JbmZvYm94KSB7XHJcbiAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBJbmZvV2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9pbmZvQm94LCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmV2ZW50TmFtZSA9PT0gJ2luZm9ib3hDaGFuZ2VkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3guZ2V0T3B0aW9ucygpLnZpc2libGUgPT09IHRydWUpIHsgdGhpcy5faXNPcGVuID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3guZ2V0T3B0aW9ucygpLnZpc2libGUgPT09IGZhbHNlICYmIHRoaXMuX2lzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4oZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm4oZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgPSB7fTtcclxuICAgICAgICBvLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pbmZvQm94LnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBSZXR1cm5zIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQb3NpdGlvbigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgcDogSUxhdExvbmcgPSB7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLl9pbmZvQm94LmdldExvY2F0aW9uKCkubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5faW5mb0JveC5nZXRMb2NhdGlvbigpLmxvbmdpdHVkZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklJbmZvYm94T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIG8udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluZm8gd2luZG93IG9wdGlvbnMgdG8gc2V0LiBUaGUgb3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIGFueSBleGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgcG9zaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIC0gR2VvIGNvb3JkaW5hdGVzIHRvIG1vdmUgdGhlIGFuY2hvciBvZiB0aGUgaW5mbyB3aW5kb3cgdG8uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihwb3NpdGlvbjogSUxhdExvbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRMb2NhdGlvbihsKTtcclxuICAgIH1cclxufVxyXG4iXX0=