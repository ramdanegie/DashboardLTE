/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
/**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
export class GoogleMarker {
    /**
     * Creates an instance of GoogleMarker.
     * \@memberof GoogleMarker
     * @param {?} _marker
     *
     */
    constructor(_marker) {
        this._marker = _marker;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    /**
     * Indicates that the marker is the first marker in a set.
     *
     * \@memberof Marker
     * @return {?}
     */
    get IsFirst() { return this._isFirst; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IsFirst(val) { this._isFirst = val; }
    /**
     * Indicates that the marker is the last marker in the set.
     *
     * \@memberof Marker
     * @return {?}
     */
    get IsLast() { return this._isLast; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IsLast(val) { this._isLast = val; }
    /**
     * Gets the marker metadata.
     *
     * \@readonly
     * \@memberof BingMarker
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
     *
     * \@readonly
     * @abstract
     * \@memberof BingMarker
     * @return {?}
     */
    get NativePrimitve() { return this._marker; }
    /**
     * Gets the Location of the marker
     *
     * \@readonly
     * @abstract
     * \@memberof BingMarker
     * @return {?}
     */
    get Location() {
        const /** @type {?} */ l = this._marker.getPosition();
        return {
            latitude: l.lat(),
            longitude: l.lng()
        };
    }
    /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        this._marker.addListener(eventType, fn);
    }
    /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    DeleteMarker() {
        this._marker.setMap(null);
    }
    /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GetLabel() {
        return this._marker.getLabel().text;
    }
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._marker.getVisible();
    }
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    SetAnchor(anchor) {
        // not implemented
        // TODO: we need to switch the model to complex icons for google to
        // support anchors, sizes and origins.
        // https://developers.google.com/maps/documentation/javascript/markers
    }
    /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        this._marker.setDraggable(draggable);
    }
    /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    SetIcon(icon) {
        this._marker.setIcon(icon);
    }
    /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    SetLabel(label) {
        this._marker.setLabel(label);
    }
    /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    SetPosition(latLng) {
        const /** @type {?} */ p = GoogleConversions.TranslateLocationObject(latLng);
        this._marker.setPosition(p);
    }
    /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    SetTitle(title) {
        this._marker.setTitle(title);
    }
    /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(options);
        this._marker.setOptions(o);
    }
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._marker.setVisible(visible);
    }
}
function GoogleMarker_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMarker.prototype._metadata;
    /** @type {?} */
    GoogleMarker.prototype._isFirst;
    /** @type {?} */
    GoogleMarker.prototype._isLast;
    /** @type {?} */
    GoogleMarker.prototype._marker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFXN0UsTUFBTTs7Ozs7OztJQXVFRixZQUFvQixPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1Qjt5QkFsRVosSUFBSSxHQUFHLEVBQWU7d0JBQ3pDLEtBQUs7dUJBQ04sSUFBSTtLQWdFaUM7Ozs7Ozs7UUFyRDVDLE9BQU8sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDMUMsT0FBTyxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztRQU81QyxNQUFNLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7O1FBQ3hDLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUTFDLFFBQVEsS0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7OztRQVNyRCxjQUFjLEtBQTRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7UUFTOUQsUUFBUTtRQUNmLHVCQUFNLENBQUMsR0FBMEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1RCxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNqQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtTQUNyQixDQUFDOzs7Ozs7Ozs7OztJQTJCQyxXQUFXLENBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JDLFlBQVk7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRdkIsUUFBUTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0lBVWpDLFVBQVU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQVU5QixTQUFTLENBQUMsTUFBVzs7Ozs7Ozs7Ozs7Ozs7SUFjckIsWUFBWSxDQUFDLFNBQWtCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVWxDLE9BQU8sQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXhCLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVTFCLFdBQVcsQ0FBQyxNQUFnQjtRQUMvQix1QkFBTSxDQUFDLEdBQTBCLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXpCLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVcxQixVQUFVLENBQUMsT0FBdUI7UUFDckMsdUJBQU0sQ0FBQyxHQUFpQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVV4QixVQUFVLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7O0NBR3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIE1hcmtlcn0gY29udHJhY3QgZm9yIHRoZSBHb29nbGUgTWFwcyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFya2VyIGltcGxlbWVudHMgTWFya2VyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gICAgcHJpdmF0ZSBfaXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNMYXN0ID0gdHJ1ZTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgcHJvcGVydGllc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgbWFya2VyIGlzIHRoZSBmaXJzdCBtYXJrZXIgaW4gYSBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzRmlyc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0ZpcnN0OyB9XHJcbiAgICBwdWJsaWMgc2V0IElzRmlyc3QodmFsOiBib29sZWFuKSB7IHRoaXMuX2lzRmlyc3QgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGxhc3QgbWFya2VyIGluIHRoZSBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzTGFzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzTGFzdDsgfVxyXG4gICAgcHVibGljIHNldCBJc0xhc3QodmFsOiBib29sZWFuKSB7IHRoaXMuX2lzTGFzdCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFya2VyIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBtYXJrZXIsIGluIHRoaXMgY2FzZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbn1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXIgeyByZXR1cm4gdGhpcy5fbWFya2VyOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBMb2NhdGlvbiBvZiB0aGUgbWFya2VyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTG9jYXRpb24oKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IHRoaXMuX21hcmtlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsLmxhdCgpLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IGwubG5nKClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZU1hcmtlci5cclxuICAgICAqIEBwYXJhbSBfbWFya2VyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlcikgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldE1hcChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcmtlciBsYWJlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlci5nZXRMYWJlbCgpLnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXIuZ2V0VmlzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYW5jaG9yIGZvciB0aGUgbWFya2VyLiBVc2UgdGhpcyB0byBhZGp1c3QgdGhlIHJvb3QgbG9jYXRpb24gZm9yIHRoZSBtYXJrZXIgdG8gYWNjb21vZGF0ZSB2YXJpb3VzIG1hcmtlciBpbWFnZSBzaXplcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYW5jaG9yIC0gUG9pbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgYW5jaG9yLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEFuY2hvcihhbmNob3I6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZFxyXG4gICAgICAgIC8vIFRPRE86IHdlIG5lZWQgdG8gc3dpdGNoIHRoZSBtb2RlbCB0byBjb21wbGV4IGljb25zIGZvciBnb29nbGUgdG9cclxuICAgICAgICAvLyBzdXBwb3J0IGFuY2hvcnMsIHNpemVzIGFuZCBvcmlnaW5zLlxyXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L21hcmtlcnNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRyYWdnYWJpbGl0eSBvZiBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYXJrIHRoZSBtYXJrZXIgYXMgZHJhZ2dhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcmtlci5zZXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGljb24gZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGljb24gLSBTdHJpbmcgY29udGFpbmluZyB0aGUgaWNvbiBpbiB2YXJpb3VzIGZvcm1zICh1cmwsIGRhdGEgdXJsLCBldGMuKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEljb24oaWNvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldEljb24oaWNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhYmVsIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGxhYmVsIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRMYWJlbChsYWJlbDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldExhYmVsKGxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciBwb3NpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvIGNvb3JkaW5hdGVzIHRvIHNldCB0aGUgbWFya2VyIHBvc2l0aW9uIHRvLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBvc2l0aW9uKGxhdExuZzogSUxhdExvbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRMbmcpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRQb3NpdGlvbihwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciB0aXRsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGl0bGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgdGl0bGUgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFRpdGxlKHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0VGl0bGUodGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgb3B0aW9ucyB0byBzZXQuIFRoZSBzdXBwbGllZCBvcHRpb25zIGFyZVxyXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIHVuZGVybHlpbmcgbWFya2VyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBtYXJrZXIgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRWaXNpYmxlKHZpc2libGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=