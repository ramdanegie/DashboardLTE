/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
/**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
var /**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
BingMarker = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMarker.
     * @param _pushpin - The {@link Microsoft.Maps.Pushpin} underlying the model.
     * @param _map - The context map.
     * @param _layer - The context layer.
     *
     * @memberof BingMarker
     */
    function BingMarker(_pushpin, _map, _layer) {
        this._pushpin = _pushpin;
        this._map = _map;
        this._layer = _layer;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    Object.defineProperty(BingMarker.prototype, "IsFirst", {
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
    Object.defineProperty(BingMarker.prototype, "IsLast", {
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
    Object.defineProperty(BingMarker.prototype, "Location", {
        get: /**
         * Gets the Location of the marker
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () {
            var /** @type {?} */ l = this._pushpin.getLocation();
            return {
                latitude: l.latitude,
                longitude: l.longitude
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMarker.prototype, "Metadata", {
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
    Object.defineProperty(BingMarker.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._pushpin; },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    BingMarker.prototype.AddListener = /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._pushpin, eventType, function (e) {
            fn(e);
        });
    };
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    BingMarker.prototype.DeleteMarker = /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    function () {
        if (!this._map && !this._layer) {
            return;
        }
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
    };
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    BingMarker.prototype.GetLabel = /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    function () {
        return this._pushpin.getText();
    };
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    BingMarker.prototype.GetVisible = /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    function () {
        return this._pushpin.getVisible();
    };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    BingMarker.prototype.SetAnchor = /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    function (anchor) {
        var /** @type {?} */ o = {};
        o.anchor = new Microsoft.Maps.Point(anchor.x, anchor.y);
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    BingMarker.prototype.SetDraggable = /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        var /** @type {?} */ o = {};
        o.draggable = draggable;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    BingMarker.prototype.SetIcon = /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    function (icon) {
        var /** @type {?} */ o = {};
        o.icon = icon;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    BingMarker.prototype.SetLabel = /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    function (label) {
        var /** @type {?} */ o = {};
        o.text = label;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    BingMarker.prototype.SetPosition = /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    function (latLng) {
        var /** @type {?} */ p = BingConversions.TranslateLocation(latLng);
        this._pushpin.setLocation(p);
    };
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    BingMarker.prototype.SetTitle = /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    function (title) {
        var /** @type {?} */ o = {};
        o.title = title;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    BingMarker.prototype.SetOptions = /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
        this._pushpin.setOptions(o);
    };
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    BingMarker.prototype.SetVisible = /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        var /** @type {?} */ o = {};
        o.visible = visible;
        this._pushpin.setOptions(o);
    };
    return BingMarker;
}());
/**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
export { BingMarker };
function BingMarker_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMarker.prototype._metadata;
    /** @type {?} */
    BingMarker.prototype._isFirst;
    /** @type {?} */
    BingMarker.prototype._isLast;
    /** @type {?} */
    BingMarker.prototype._pushpin;
    /** @type {?} */
    BingMarker.prototype._map;
    /** @type {?} */
    BingMarker.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2JpbmcvYmluZy1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBT3ZFOzs7OztBQUFBO0lBMkRJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7O09BT0c7SUFDSCxvQkFBb0IsUUFBZ0MsRUFBWSxJQUF3QixFQUFZLE1BQTRCO1FBQTVHLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBb0I7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFzQjt5QkFsRTFGLElBQUksR0FBRyxFQUFlO3dCQUN6QyxLQUFLO3VCQUNOLElBQUk7S0FnRStHOzBCQXJEMUgsK0JBQU87Ozs7Ozs7c0JBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O2tCQUNsQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7MEJBTzVDLDhCQUFNOzs7Ozs7O3NCQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7OztrQkFDakMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7OzBCQVExQyxnQ0FBUTs7Ozs7Ozs7O1lBQ2YscUJBQU0sQ0FBQyxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9ELE1BQU0sQ0FBQztnQkFDSCxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUzthQUN6QixDQUFDOzs7OzswQkFTSyxnQ0FBUTs7Ozs7Ozs7c0JBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVFyRCxzQ0FBYzs7Ozs7Ozs7c0JBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBNkJqRCxnQ0FBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBQyxDQUFDO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNULENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLGlDQUFZOzs7Ozs7Ozs7UUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQUU7UUFDN0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2xEOzs7Ozs7Ozs7O0lBVUUsNkJBQVE7Ozs7Ozs7OztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7Ozs7SUFVNUIsK0JBQVU7Ozs7Ozs7O1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBVy9CLDhCQUFTOzs7Ozs7Ozs7Y0FBQyxNQUFjO1FBQzNCLHFCQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekIsaUNBQVk7Ozs7Ozs7OztjQUFDLFNBQWtCO1FBQ2xDLHFCQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd6Qiw0QkFBTzs7Ozs7Ozs7O2NBQUMsSUFBWTtRQUN2QixxQkFBTSxDQUFDLEdBQW1DLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd6Qiw2QkFBUTs7Ozs7Ozs7O2NBQUMsS0FBYTtRQUN6QixxQkFBTSxDQUFDLEdBQW1DLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd6QixnQ0FBVzs7Ozs7Ozs7O2NBQUMsTUFBZ0I7UUFDL0IscUJBQU0sQ0FBQyxHQUE0QixlQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBVzFCLDZCQUFROzs7Ozs7Ozs7Y0FBQyxLQUFhO1FBQ3pCLHFCQUFNLENBQUMsR0FBeUMsRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd6QiwrQkFBVTs7Ozs7Ozs7O2NBQUMsT0FBdUI7UUFDckMscUJBQU0sQ0FBQyxHQUFvQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVekIsK0JBQVU7Ozs7Ozs7O2NBQUMsT0FBZ0I7UUFDOUIscUJBQU0sQ0FBQyxHQUF5QyxFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O3FCQXZQcEM7SUEwUEMsQ0FBQTs7Ozs7O0FBOU9ELHNCQThPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIE1hcmtlcn0gY29udHJhY3QgZm9yIHRoZSBCaW5nIE1hcHMgVjggbWFwIGFyY2hpdGVjdHVyZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmdNYXJrZXIgaW1wbGVtZW50cyBNYXJrZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICAgIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lzTGFzdCA9IHRydWU7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgZmlyc3QgbWFya2VyIGluIGEgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJc0ZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNGaXJzdDsgfVxyXG4gICAgcHVibGljIHNldCBJc0ZpcnN0KHZhbDogYm9vbGVhbikgeyB0aGlzLl9pc0ZpcnN0ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgbWFya2VyIGlzIHRoZSBsYXN0IG1hcmtlciBpbiB0aGUgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJc0xhc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0xhc3Q7IH1cclxuICAgIHB1YmxpYyBzZXQgSXNMYXN0KHZhbDogYm9vbGVhbikgeyB0aGlzLl9pc0xhc3QgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIExvY2F0aW9uIG9mIHRoZSBtYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTG9jYXRpb24oKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IGw6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gdGhpcy5fcHVzaHBpbi5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IGwubG9uZ2l0dWRlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcmtlciBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgbWFya2VyLCBpbiB0aGlzIGNhc2Uge0BsaW5rIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW59XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueSB7IHJldHVybiB0aGlzLl9wdXNocGluOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFya2VyLlxyXG4gICAgICogQHBhcmFtIF9wdXNocGluIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5QdXNocGlufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqIEBwYXJhbSBfbWFwIC0gVGhlIGNvbnRleHQgbWFwLlxyXG4gICAgICogQHBhcmFtIF9sYXllciAtIFRoZSBjb250ZXh0IGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3B1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIHByb3RlY3RlZCBfbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXAsIHByb3RlY3RlZCBfbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkxheWVyKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wdXNocGluLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgJiYgIXRoaXMuX2xheWVyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9sYXllcikgeyB0aGlzLl9sYXllci5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmVudGl0aWVzLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbGFiZWxcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaHBpbi5nZXRUZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaHBpbi5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhbmNob3IgZm9yIHRoZSBtYXJrZXIuIFVzZSB0aGlzIHRvIGFkanVzdCB0aGUgcm9vdCBsb2NhdGlvbiBmb3IgdGhlIG1hcmtlciB0byBhY2NvbW9kYXRlIHZhcmlvdXMgbWFya2VyIGltYWdlIHNpemVzLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGFuY2hvciAtIFBvaW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIGFuY2hvci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0QW5jaG9yKGFuY2hvcjogSVBvaW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XHJcbiAgICAgICAgby5hbmNob3IgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoYW5jaG9yLngsIGFuY2hvci55KTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkcmFnZ2FiaWxpdHkgb2YgYSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYXJrIHRoZSBtYXJrZXIgYXMgZHJhZ2dhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICBvLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpY29uIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGljb24gLSBTdHJpbmcgY29udGFpbmluZyB0aGUgaWNvbiBpbiB2YXJpb3VzIGZvcm1zICh1cmwsIGRhdGEgdXJsLCBldGMuKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRJY29uKGljb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIG8uaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIGxhYmVsLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxhYmVsIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGxhYmVsIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TGFiZWwobGFiZWw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIG8udGV4dCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciBwb3NpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW8gY29vcmRpbmF0ZXMgdG8gc2V0IHRoZSBtYXJrZXIgcG9zaXRpb24gdG8uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBvc2l0aW9uKGxhdExuZzogSUxhdExvbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsYXRMbmcpO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0TG9jYXRpb24ocCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgdGl0bGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gdGl0bGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgdGl0bGUgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgb3B0aW9ucyB0byBzZXQuIFRoZSBzdXBwbGllZCBvcHRpb25zIGFyZVxyXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIHVuZGVybHlpbmcgbWFya2VyIG9wdGlvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gIEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgbWFya2VyIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgbWFya2VyIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBvLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19