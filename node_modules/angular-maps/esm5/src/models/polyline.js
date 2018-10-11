/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
Polyline = /** @class */ (function () {
    function Polyline() {
    }
    Object.defineProperty(Polyline.prototype, "Center", {
        get: /**
         * Gets the polyline's center.
         * \@readonly
         * \@memberof Polyline
         * @return {?}
         */
        function () {
            if (this._center == null) {
                this._center = this.GetBoundingCenter();
            }
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polyline.prototype, "Centroid", {
        get: /**
         * Gets the polyline's centroid.
         * \@readonly
         * \@memberof Polyline
         * @return {?}
         */
        function () {
            if (this._centroid == null) {
                this._centroid = this.GetPolylineCentroid();
            }
            return this._centroid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the centroid of the polyline based on the a path.
     *
     * \@memberof Polyline
     * \@method
     * @param {?} path - the path for which to generate the centroid
     * @return {?} - The centroid coordinates of the polyline.
     */
    Polyline.GetPolylineCentroid = /**
     * Get the centroid of the polyline based on the a path.
     *
     * \@memberof Polyline
     * \@method
     * @param {?} path - the path for which to generate the centroid
     * @return {?} - The centroid coordinates of the polyline.
     */
    function (path) {
        var /** @type {?} */ c = { latitude: 0, longitude: 0 };
        var /** @type {?} */ off = path[0];
        if (off != null) {
            var /** @type {?} */ twicearea = 0;
            var /** @type {?} */ x = 0;
            var /** @type {?} */ y = 0;
            var /** @type {?} */ p1 = void 0, /** @type {?} */ p2 = void 0;
            var /** @type {?} */ f = void 0;
            for (var /** @type {?} */ i = 0, /** @type {?} */ j = path.length - 1; i < path.length; j = i++) {
                p1 = path[i];
                p2 = path[j];
                f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                    (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                twicearea += f;
                x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
            }
            if (twicearea !== 0) {
                f = twicearea * 3;
                c.latitude = x / f + off.latitude;
                c.longitude = y / f + off.longitude;
            }
            else {
                c.latitude = off.latitude;
                c.longitude = off.longitude;
            }
        }
        else {
            c = null;
        }
        return c;
    };
    ///
    /// Protected methods
    ///
    /**
     * Gets the center of the polyline' bounding box.
     *
     * @returns - {@link ILatLong} object containing the center of the bounding box.
     * @memberof Polyline
     * @method
     * @protected
     */
    /**
     * Gets the center of the polyline' bounding box.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
     */
    Polyline.prototype.GetBoundingCenter = /**
     * Gets the center of the polyline' bounding box.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
     */
    function () {
        var /** @type {?} */ c = { latitude: 0, longitude: 0 };
        var /** @type {?} */ x1 = 90, /** @type {?} */ x2 = -90, /** @type {?} */ y1 = 180, /** @type {?} */ y2 = -180;
        var /** @type {?} */ path = this.GetPath();
        if (path) {
            path.forEach(function (p) {
                if (p.latitude < x1) {
                    x1 = p.latitude;
                }
                if (p.latitude > x2) {
                    x2 = p.latitude;
                }
                if (p.longitude < y1) {
                    y1 = p.longitude;
                }
                if (p.longitude > y2) {
                    y2 = p.longitude;
                }
            });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    };
    /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * @returns - The centroid coordinates of the polyline.
     * @memberof Polyline
     * @method
     * @protected
     */
    /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polyline.
     */
    Polyline.prototype.GetPolylineCentroid = /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polyline.
     */
    function () {
        var /** @type {?} */ path = this.GetPath();
        var /** @type {?} */ c = Polyline.GetPolylineCentroid(path);
        return c;
    };
    return Polyline;
}());
/**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Polyline };
function Polyline_tsickle_Closure_declarations() {
    /** @type {?} */
    Polyline.prototype._centroid;
    /** @type {?} */
    Polyline.prototype._center;
    /**
     * Gets the native primitve implementing the polyline.
     *
     * \@readonly
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.NativePrimitve = function () { };
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polylin
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Metadata = function () { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polyline
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     *
     * @return {?}
     */
    Polyline.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polyline.
     *
     * @abstract
     *
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Delete = function () { };
    /**
     * Gets whether the polyline is draggable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    Polyline.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polyline path can be edited.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polyline.prototype.GetEditable = function () { };
    /**
     * Gets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polyline path.
     *
     */
    Polyline.prototype.GetPath = function () { };
    /**
     * Gets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    Polyline.prototype.GetVisible = function () { };
    /**
     * Sets whether the polyline is dragable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polyline path is editable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polyline options
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polyline.prototype.SetOptions = function (options) { };
    /**
     * Sets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    Polyline.prototype.SetPath = function (path) { };
    /**
     * Sets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFBQTs7OzBCQWdCZSw0QkFBTTs7Ozs7Ozs7WUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDM0M7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7MEJBUWIsOEJBQVE7Ozs7Ozs7O1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQy9DO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFvRFosNEJBQW1COzs7Ozs7OztjQUFDLElBQXFCO1FBQ25ELHFCQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQzlDLHFCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxxQkFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO1lBQzFCLHFCQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7WUFDbEIscUJBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztZQUNsQixxQkFBSSxFQUFFLFNBQVUsbUJBQUUsRUFBRSxTQUFVLENBQUM7WUFDL0IscUJBQUksQ0FBQyxTQUFRLENBQUM7WUFFZCxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVELEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDN0QsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRSxTQUFTLElBQUksQ0FBQyxDQUFDO2dCQUNmLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixDQUFDLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUMvQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDOztJQWtIYixHQUFHO0lBQ0gscUJBQXFCO0lBQ3JCLEdBQUc7SUFFSDs7Ozs7OztPQU9HOzs7Ozs7Ozs7SUFDTyxvQ0FBaUI7Ozs7Ozs7O0lBQTNCO1FBQ0kscUJBQUksQ0FBQyxHQUFhLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDOUMscUJBQUksRUFBRSxHQUFXLEVBQUUsbUJBQUUsRUFBRSxHQUFXLENBQUMsRUFBRSxtQkFBRSxFQUFFLEdBQVcsR0FBRyxtQkFBRSxFQUFFLEdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0UscUJBQU0sSUFBSSxHQUFvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztpQkFBRTtnQkFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO2lCQUFFO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQUU7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFBRTthQUM5QyxDQUFDLENBQUM7WUFDSCxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7SUFDTyxzQ0FBbUI7Ozs7Ozs7O0lBQTdCO1FBQ0kscUJBQU0sSUFBSSxHQUFvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MscUJBQU0sQ0FBQyxHQUFjLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7bUJBM1JMO0lBNlJDLENBQUE7Ozs7Ozs7O0FBcFJELG9CQW9SQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjbGFzcyBkZWZpbmluZyB0aGUgY29udHJhY3QgZm9yIGEgcG9seWxpbmUgaW4gdGhlIGFyY2hpdGVjdHVyZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb2x5bGluZSB7XHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJvdGVjdGVkIF9jZW50cm9pZDogSUxhdExvbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2NlbnRlcjogSUxhdExvbmc7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWxpbmUncyBjZW50ZXIuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENlbnRlcigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlciA9IHRoaXMuR2V0Qm91bmRpbmdDZW50ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lJ3MgY2VudHJvaWQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENlbnRyb2lkKCk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudHJvaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IHRoaXMuR2V0UG9seWxpbmVDZW50cm9pZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudHJvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgVGl0bGUoKTogc3RyaW5nO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBUaXRsZSh2YWw6IHN0cmluZyk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWxpbmUgYmFzZWQgb24gdGhlIGEgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCAtIHRoZSBwYXRoIGZvciB3aGljaCB0byBnZW5lcmF0ZSB0aGUgY2VudHJvaWRcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGNlbnRyb2lkIGNvb3JkaW5hdGVzIG9mIHRoZSBwb2x5bGluZS5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFBvbHlsaW5lQ2VudHJvaWQocGF0aDogQXJyYXk8SUxhdExvbmc+KTogSUxhdExvbmcge1xyXG4gICAgICAgIGxldCBjOiBJTGF0TG9uZyA9IHtsYXRpdHVkZTogMCwgbG9uZ2l0dWRlOiAwfTtcclxuICAgICAgICBjb25zdCBvZmYgPSBwYXRoWzBdO1xyXG4gICAgICAgIGlmIChvZmYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgdHdpY2VhcmVhOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwMTogSUxhdExvbmcsIHAyOiBJTGF0TG9uZztcclxuICAgICAgICAgICAgbGV0IGY6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gcGF0aC5sZW5ndGggLSAxOyBpIDwgcGF0aC5sZW5ndGg7IGogPSBpKyspIHtcclxuICAgICAgICAgICAgICAgIHAxID0gcGF0aFtpXTtcclxuICAgICAgICAgICAgICAgIHAyID0gcGF0aFtqXTtcclxuICAgICAgICAgICAgICAgIGYgPSAocDEubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAyLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpIC1cclxuICAgICAgICAgICAgICAgICAgICAocDIubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAxLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgdHdpY2VhcmVhICs9IGY7XHJcbiAgICAgICAgICAgICAgICB4ICs9IChwMS5sYXRpdHVkZSArIHAyLmxhdGl0dWRlIC0gMiAqIG9mZi5sYXRpdHVkZSkgKiBmO1xyXG4gICAgICAgICAgICAgICAgeSArPSAocDEubG9uZ2l0dWRlICsgcDIubG9uZ2l0dWRlIC0gMiAqIG9mZi5sb25naXR1ZGUpICogZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHdpY2VhcmVhICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmID0gdHdpY2VhcmVhICogMztcclxuICAgICAgICAgICAgICAgIGMubGF0aXR1ZGUgPSB4IC8gZiArIG9mZi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geSAvIGYgKyBvZmYubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IG9mZi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0gb2ZmLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZSgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXREcmFnZ2FibGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgcGF0aCBjYW4gYmUgZWRpdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldEVkaXRhYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBJTGF0TG9uZyBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0VmlzaWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBkcmFnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlsaW5lIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGlzIGVkaXRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlsaW5lIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXHJcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWxpbmVzIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5bGluZSB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNlbnRlciBvZiB0aGUgcG9seWxpbmUnIGJvdW5kaW5nIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNlbnRlciBvZiB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRCb3VuZGluZ0NlbnRlcigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xyXG4gICAgICAgIGxldCB4MTogbnVtYmVyID0gOTAsIHgyOiBudW1iZXIgPSAtOTAsIHkxOiBudW1iZXIgPSAxODAsIHkyOiBudW1iZXIgPSAtMTgwO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IHRoaXMuR2V0UGF0aCgpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlIDwgeDEpIHsgeDEgPSBwLmxhdGl0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sYXRpdHVkZSA+IHgyKSB7IHgyID0gcC5sYXRpdHVkZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlIDwgeTEpIHsgeTEgPSBwLmxvbmdpdHVkZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlID4geTIpIHsgeTIgPSBwLmxvbmdpdHVkZTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHgxICsgKHgyIC0geDEpIC8gMjtcclxuICAgICAgICAgICAgYy5sb25naXR1ZGUgPSB5MSArICh5MiAtIHkxKSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGNlbnRyb2lkIG9mIHRoZSBwb2x5bGluZSBiYXNlZCBvbiB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBjZW50cm9pZCBjb29yZGluYXRlcyBvZiB0aGUgcG9seWxpbmUuXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIEdldFBvbHlsaW5lQ2VudHJvaWQoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IHRoaXMuR2V0UGF0aCgpO1xyXG4gICAgICAgIGNvbnN0IGM6IElMYXRMb25nICA9IFBvbHlsaW5lLkdldFBvbHlsaW5lQ2VudHJvaWQocGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==