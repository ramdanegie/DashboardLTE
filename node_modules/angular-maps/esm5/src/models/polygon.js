/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
Polygon = /** @class */ (function () {
    function Polygon() {
    }
    Object.defineProperty(Polygon.prototype, "Center", {
        get: /**
         * Gets the polygon's center.
         * \@readonly
         * \@memberof Polygon
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
    Object.defineProperty(Polygon.prototype, "Centroid", {
        get: /**
         * Gets the polygon's centroid.
         * \@readonly
         * \@memberof Polygon
         * @return {?}
         */
        function () {
            if (this._centroid == null) {
                this._centroid = this.GetPolygonCentroid();
            }
            return this._centroid;
        },
        enumerable: true,
        configurable: true
    });
    ///
    /// Protected methods
    ///
    /**
     * Gets the center of the polygons' bounding box.
     *
     * @returns - ILatLong object containing the center of the bounding box.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    Polygon.prototype.GetBoundingCenter = /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    function () {
        var /** @type {?} */ c = { latitude: 0, longitude: 0 };
        var /** @type {?} */ x1 = 90, /** @type {?} */ x2 = -90, /** @type {?} */ y1 = 180, /** @type {?} */ y2 = -180;
        var /** @type {?} */ path = this.GetPaths();
        if (path) {
            path.forEach(function (inner) { return inner.forEach(function (p) {
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
            }); });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    };
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * @returns - The centroid coordinates of the polygon.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    Polygon.prototype.GetPolygonCentroid = /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    function () {
        var /** @type {?} */ c = { latitude: 0, longitude: 0 };
        var /** @type {?} */ path = this.GetPaths();
        var /** @type {?} */ off = path[0][0];
        if (off != null) {
            var /** @type {?} */ twicearea = 0;
            var /** @type {?} */ x = 0;
            var /** @type {?} */ y = 0;
            var /** @type {?} */ p1 = void 0, /** @type {?} */ p2 = void 0;
            var /** @type {?} */ f = void 0;
            for (var /** @type {?} */ k = 0; k < path.length; k++) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ j = path[k].length - 1; i < path[k].length; j = i++) {
                    p1 = path[k][i];
                    p2 = path[k][j];
                    f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                        (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                    twicearea += f;
                    x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                    y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
                }
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
    return Polygon;
}());
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Polygon };
function Polygon_tsickle_Closure_declarations() {
    /** @type {?} */
    Polygon.prototype._centroid;
    /** @type {?} */
    Polygon.prototype._center;
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function (val) { };
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function (val) { };
    /**
     * Gets the polygon metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Metadata = function () { };
    /**
     * Gets the native primitve implementing the polygon.
     *
     * \@readonly
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.NativePrimitve = function () { };
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function (val) { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    Polygon.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polygon.
     *
     * @abstract
     *
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Delete = function () { };
    /**
     * Gets whether the polygon is draggable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    Polygon.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polygon path can be edited.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polygon.prototype.GetEditable = function () { };
    /**
     * Gets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polygon path.
     *
     */
    Polygon.prototype.GetPath = function () { };
    /**
     * Gets the polygon paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of Array of ILatLong objects describing multiple polygon paths.
     *
     */
    Polygon.prototype.GetPaths = function () { };
    /**
     * Gets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    Polygon.prototype.GetVisible = function () { };
    /**
     * Sets whether the polygon is dragable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polygon path is editable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polygon options
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polygon.prototype.SetOptions = function (options) { };
    /**
     * Sets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    Polygon.prototype.SetPath = function (path) { };
    /**
     * Set the polygon path or paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    Polygon.prototype.SetPaths = function (paths) { };
    /**
     * Sets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBOzs7Ozs7O0FBQUE7OzswQkFnQmUsMkJBQU07Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7OzBCQVFiLDZCQUFROzs7Ozs7OztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM5QztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OztJQTZNMUIsR0FBRztJQUNILHFCQUFxQjtJQUNyQixHQUFHO0lBRUg7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ08sbUNBQWlCOzs7Ozs7OztJQUEzQjtRQUNJLHFCQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQzlDLHFCQUFJLEVBQUUsR0FBVyxFQUFFLG1CQUFFLEVBQUUsR0FBVyxDQUFDLEVBQUUsbUJBQUUsRUFBRSxHQUFXLEdBQUcsbUJBQUUsRUFBRSxHQUFXLENBQUMsR0FBRyxDQUFDO1FBQzNFLHFCQUFNLElBQUksR0FBMkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJ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QUM7b0JBQ2YsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7WUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUN2QztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO2FBQy9CO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjtrQkFqVUw7SUFrVUMsQ0FBQTs7Ozs7Ozs7QUF6VEQsbUJBeVRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjbGFzcyBkZWZpbmluZyB0aGUgY29udHJhY3QgZm9yIGEgcG9seWdvbiBpbiB0aGUgYXJjaGl0ZWN0dXJlIHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvbHlnb24ge1xyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfY2VudHJvaWQ6IElMYXRMb25nO1xyXG4gICAgcHJvdGVjdGVkIF9jZW50ZXI6IElMYXRMb25nO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24ncyBjZW50ZXIuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ2VudGVyKCk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gdGhpcy5HZXRCb3VuZGluZ0NlbnRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbidzIGNlbnRyb2lkLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENlbnRyb2lkKCk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudHJvaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IHRoaXMuR2V0UG9seWdvbkNlbnRyb2lkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cm9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IExhYmVsTWF4Wm9vbSh2YWw6IG51bWJlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBMYWJlbE1pblpvb20oKTogbnVtYmVyO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBMYWJlbE1pblpvb20odmFsOiBudW1iZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gc2hvdyB0aGUgbGFiZWxcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBTaG93TGFiZWwoKTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5Z29uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgVGl0bGUoKTogc3RyaW5nO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBUaXRsZSh2YWw6IHN0cmluZyk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlZCB0aGUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldERyYWdnYWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIHBhdGggY2FuIGJlIGVkaXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcGF0aCBjYW4gYmUgZWRpdGVkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldEVkaXRhYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIElMYXRMb25nIG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIEFycmF5IG9mIElMYXRMb25nIG9iamVjdHMgZGVzY3JpYmluZyBtdWx0aXBsZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQYXRocygpOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYWtlIHRoZSBwb2x5Z29uIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBpcyBlZGl0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBlZGl0YWJsZSAtIFRydWUgdG8gbWFrZSBwb2x5Z29uIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHBhdGggLSBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBhdGgocGF0aDogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8SUxhdExvbmc+KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWdvbiBwYXRoIG9yIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHBhdGhzIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ31cclxuICAgICAqIChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBhdGhzKHBhdGhzOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHwgQXJyYXk8SUxhdExvbmc+KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWdvbiB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2VudGVyIG9mIHRoZSBwb2x5Z29ucycgYm91bmRpbmcgYm94LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gSUxhdExvbmcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNlbnRlciBvZiB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIEdldEJvdW5kaW5nQ2VudGVyKCk6IElMYXRMb25nIHtcclxuICAgICAgICBsZXQgYzogSUxhdExvbmcgPSB7bGF0aXR1ZGU6IDAsIGxvbmdpdHVkZTogMH07XHJcbiAgICAgICAgbGV0IHgxOiBudW1iZXIgPSA5MCwgeDI6IG51bWJlciA9IC05MCwgeTE6IG51bWJlciA9IDE4MCwgeTI6IG51bWJlciA9IC0xODA7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICBwYXRoLmZvckVhY2goaW5uZXIgPT4gaW5uZXIuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlIDwgeDEpIHsgeDEgPSBwLmxhdGl0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sYXRpdHVkZSA+IHgyKSB7IHgyID0gcC5sYXRpdHVkZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlIDwgeTEpIHsgeTEgPSBwLmxvbmdpdHVkZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlID4geTIpIHsgeTIgPSBwLmxvbmdpdHVkZTsgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGMubGF0aXR1ZGUgPSB4MSArICh4MiAtIHgxKSAvIDI7XHJcbiAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geTEgKyAoeTIgLSB5MSkgLyAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWdvbiBiYXNlZCBvbiB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGNlbnRyb2lkIGNvb3JkaW5hdGVzIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIEdldFBvbHlnb25DZW50cm9pZCgpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgY29uc3Qgb2ZmID0gcGF0aFswXVswXTtcclxuICAgICAgICBpZiAob2ZmICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHR3aWNlYXJlYTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcDE6IElMYXRMb25nLCBwMjogSUxhdExvbmc7XHJcbiAgICAgICAgICAgIGxldCBmOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcGF0aC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSBwYXRoW2tdLmxlbmd0aCAtIDE7IGkgPCBwYXRoW2tdLmxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHAxID0gcGF0aFtrXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBwMiA9IHBhdGhba11bal07XHJcbiAgICAgICAgICAgICAgICAgICAgZiA9IChwMS5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDIubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAocDIubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAxLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR3aWNlYXJlYSArPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgIHggKz0gKHAxLmxhdGl0dWRlICsgcDIubGF0aXR1ZGUgLSAyICogb2ZmLmxhdGl0dWRlKSAqIGY7XHJcbiAgICAgICAgICAgICAgICAgICAgeSArPSAocDEubG9uZ2l0dWRlICsgcDIubG9uZ2l0dWRlIC0gMiAqIG9mZi5sb25naXR1ZGUpICogZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHdpY2VhcmVhICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmID0gdHdpY2VhcmVhICogMztcclxuICAgICAgICAgICAgICAgIGMubGF0aXR1ZGUgPSB4IC8gZiArIG9mZi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geSAvIGYgKyBvZmYubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IG9mZi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0gb2ZmLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==