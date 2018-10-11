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
var /**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
GoogleMarker = /** @class */ (function () {
    ///
    /// Constructors
    ///
    /**
     * Creates an instance of GoogleMarker.
     * @param _marker
     *
     * @memberof GoogleMarker
     */
    function GoogleMarker(_marker) {
        this._marker = _marker;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    Object.defineProperty(GoogleMarker.prototype, "IsFirst", {
        get: /**
         * Indicates that the marker is the first marker in a set.
         *
         * \@memberof Marker
         * @return {?}
         */
        function () { return this._isFirst; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._isFirst = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMarker.prototype, "IsLast", {
        get: /**
         * Indicates that the marker is the last marker in the set.
         *
         * \@memberof Marker
         * @return {?}
         */
        function () { return this._isLast; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._isLast = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMarker.prototype, "Metadata", {
        get: /**
         * Gets the marker metadata.
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMarker.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
         *
         * \@readonly
         * @abstract
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._marker; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMarker.prototype, "Location", {
        get: /**
         * Gets the Location of the marker
         *
         * \@readonly
         * @abstract
         * \@memberof BingMarker
         * @return {?}
         */
        function () {
            var /** @type {?} */ l = this._marker.getPosition();
            return {
                latitude: l.lat(),
                longitude: l.lng()
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    GoogleMarker.prototype.AddListener = /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        this._marker.addListener(eventType, fn);
    };
    /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GoogleMarker.prototype.DeleteMarker = /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    function () {
        this._marker.setMap(null);
    };
    /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GoogleMarker.prototype.GetLabel = /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    function () {
        return this._marker.getLabel().text;
    };
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GoogleMarker.prototype.GetVisible = /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    function () {
        return this._marker.getVisible();
    };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetAnchor = /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    function (anchor) {
        // not implemented
        // TODO: we need to switch the model to complex icons for google to
        // support anchors, sizes and origins.
        // https://developers.google.com/maps/documentation/javascript/markers
    };
    /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetDraggable = /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        this._marker.setDraggable(draggable);
    };
    /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetIcon = /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    function (icon) {
        this._marker.setIcon(icon);
    };
    /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetLabel = /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    function (label) {
        this._marker.setLabel(label);
    };
    /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetPosition = /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    function (latLng) {
        var /** @type {?} */ p = GoogleConversions.TranslateLocationObject(latLng);
        this._marker.setPosition(p);
    };
    /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetTitle = /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    function (title) {
        this._marker.setTitle(title);
    };
    /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetOptions = /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(options);
        this._marker.setOptions(o);
    };
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetVisible = /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._marker.setVisible(visible);
    };
    return GoogleMarker;
}());
/**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
export { GoogleMarker };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFXN0U7Ozs7O0FBQUE7SUE2REksR0FBRztJQUNILGdCQUFnQjtJQUNoQixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCxzQkFBb0IsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7eUJBbEVaLElBQUksR0FBRyxFQUFlO3dCQUN6QyxLQUFLO3VCQUNOLElBQUk7S0FnRWlDOzBCQXJENUMsaUNBQU87Ozs7Ozs7c0JBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O2tCQUNsQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7MEJBTzVDLGdDQUFNOzs7Ozs7O3NCQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7OztrQkFDakMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7OzBCQVExQyxrQ0FBUTs7Ozs7Ozs7c0JBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVNyRCx3Q0FBYzs7Ozs7Ozs7O3NCQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7OzswQkFTOUQsa0NBQVE7Ozs7Ozs7Ozs7WUFDZixxQkFBTSxDQUFDLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDO2dCQUNILFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUNqQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTthQUNyQixDQUFDOzs7Ozs7Ozs7Ozs7OztJQTJCQyxrQ0FBVzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JDLG1DQUFZOzs7Ozs7OztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztJQVF2QiwrQkFBUTs7Ozs7OztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0lBVWpDLGlDQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTlCLGdDQUFTOzs7Ozs7OztjQUFDLE1BQVc7Ozs7Ozs7Ozs7Ozs7O0lBY3JCLG1DQUFZOzs7Ozs7OztjQUFDLFNBQWtCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVWxDLDhCQUFPOzs7Ozs7OztjQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVeEIsK0JBQVE7Ozs7Ozs7O2NBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVUxQixrQ0FBVzs7Ozs7Ozs7Y0FBQyxNQUFnQjtRQUMvQixxQkFBTSxDQUFDLEdBQTBCLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXpCLCtCQUFROzs7Ozs7OztjQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBVzFCLGlDQUFVOzs7Ozs7Ozs7Y0FBQyxPQUF1QjtRQUNyQyxxQkFBTSxDQUFDLEdBQWlDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXhCLGlDQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzt1QkE3TnpDO0lBZ09DLENBQUE7Ozs7OztBQXJORCx3QkFxTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbWFya2VyJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgTWFya2VyfSBjb250cmFjdCBmb3IgdGhlIEdvb2dsZSBNYXBzIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXJrZXIgaW1wbGVtZW50cyBNYXJrZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcbiAgICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc0xhc3QgPSB0cnVlO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBwcm9wZXJ0aWVzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGZpcnN0IG1hcmtlciBpbiBhIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNGaXJzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzRmlyc3Q7IH1cclxuICAgIHB1YmxpYyBzZXQgSXNGaXJzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gdGhlIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNMYXN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNMYXN0OyB9XHJcbiAgICBwdWJsaWMgc2V0IElzTGFzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNMYXN0ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdGhpcy5fbWV0YWRhdGE7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIG1hcmtlciwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5QdXNocGlufVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IEdvb2dsZU1hcFR5cGVzLk1hcmtlciB7IHJldHVybiB0aGlzLl9tYXJrZXI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIExvY2F0aW9uIG9mIHRoZSBtYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMb2NhdGlvbigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gdGhpcy5fbWFya2VyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGwubGF0KCksXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbC5sbmcoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFya2VyLlxyXG4gICAgICogQHBhcmFtIF9tYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcmtlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXIuYWRkTGlzdGVuZXIoZXZlbnRUeXBlLCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZU1hcmtlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFya2VyIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyLmdldExhYmVsKCkudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgbWFya2VyIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlci5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhbmNob3IgZm9yIHRoZSBtYXJrZXIuIFVzZSB0aGlzIHRvIGFkanVzdCB0aGUgcm9vdCBsb2NhdGlvbiBmb3IgdGhlIG1hcmtlciB0byBhY2NvbW9kYXRlIHZhcmlvdXMgbWFya2VyIGltYWdlIHNpemVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhbmNob3IgLSBQb2ludCBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBhbmNob3IuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0QW5jaG9yKGFuY2hvcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy8gbm90IGltcGxlbWVudGVkXHJcbiAgICAgICAgLy8gVE9ETzogd2UgbmVlZCB0byBzd2l0Y2ggdGhlIG1vZGVsIHRvIGNvbXBsZXggaWNvbnMgZm9yIGdvb2dsZSB0b1xyXG4gICAgICAgIC8vIHN1cHBvcnQgYW5jaG9ycywgc2l6ZXMgYW5kIG9yaWdpbnMuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvbWFya2Vyc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZHJhZ2dhYmlsaXR5IG9mIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1hcmsgdGhlIG1hcmtlciBhcyBkcmFnZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldERyYWdnYWJsZShkcmFnZ2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaWNvbiBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaWNvbiAtIFN0cmluZyBjb250YWluaW5nIHRoZSBpY29uIGluIHZhcmlvdXMgZm9ybXMgKHVybCwgZGF0YSB1cmwsIGV0Yy4pXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0SWNvbihpY29uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0SWNvbihpY29uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciBsYWJlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgbGFiZWwgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0TGFiZWwobGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW8gY29vcmRpbmF0ZXMgdG8gc2V0IHRoZSBtYXJrZXIgcG9zaXRpb24gdG8uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UG9zaXRpb24obGF0TG5nOiBJTGF0TG9uZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxhdExuZyk7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldFBvc2l0aW9uKHApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHRpdGxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0aXRsZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSB0aXRsZSB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VGl0bGUodGl0bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRUaXRsZSh0aXRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTWFya2VyT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcmtlciBvcHRpb25zIHRvIHNldC4gVGhlIHN1cHBsaWVkIG9wdGlvbnMgYXJlXHJcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgdW5kZXJseWluZyBtYXJrZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIG1hcmtlciB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldFZpc2libGUodmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==