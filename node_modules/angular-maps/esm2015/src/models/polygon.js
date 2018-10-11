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
export class Polygon {
    /**
     * Gets the polygon's center.
     * \@readonly
     * \@memberof Polygon
     * @return {?}
     */
    get Center() {
        if (this._center == null) {
            this._center = this.GetBoundingCenter();
        }
        return this._center;
    }
    /**
     * Gets the polygon's centroid.
     * \@readonly
     * \@memberof Polygon
     * @return {?}
     */
    get Centroid() {
        if (this._centroid == null) {
            this._centroid = this.GetPolygonCentroid();
        }
        return this._centroid;
    }
    /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    GetBoundingCenter() {
        let /** @type {?} */ c = { latitude: 0, longitude: 0 };
        let /** @type {?} */ x1 = 90, /** @type {?} */ x2 = -90, /** @type {?} */ y1 = 180, /** @type {?} */ y2 = -180;
        const /** @type {?} */ path = this.GetPaths();
        if (path) {
            path.forEach(inner => inner.forEach(p => {
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
            }));
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    }
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    GetPolygonCentroid() {
        let /** @type {?} */ c = { latitude: 0, longitude: 0 };
        const /** @type {?} */ path = this.GetPaths();
        const /** @type {?} */ off = path[0][0];
        if (off != null) {
            let /** @type {?} */ twicearea = 0;
            let /** @type {?} */ x = 0;
            let /** @type {?} */ y = 0;
            let /** @type {?} */ p1, /** @type {?} */ p2;
            let /** @type {?} */ f;
            for (let /** @type {?} */ k = 0; k < path.length; k++) {
                for (let /** @type {?} */ i = 0, /** @type {?} */ j = path[k].length - 1; i < path[k].length; j = i++) {
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
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBLE1BQU07Ozs7Ozs7UUFnQlMsTUFBTTtRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7O1FBUWIsUUFBUTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzlDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7SUF5TmhCLGlCQUFpQjtRQUN2QixxQkFBSSxDQUFDLEdBQWEsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUM5QyxxQkFBSSxFQUFFLEdBQVcsRUFBRSxtQkFBRSxFQUFFLEdBQVcsQ0FBQyxFQUFFLG1CQUFFLEVBQUUsR0FBVyxHQUFHLG1CQUFFLEVBQUUsR0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMzRSx1QkFBTSxJQUFJLEdBQTJCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcs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QUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDOUQ7YUFDSjtZQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUMxQixDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDL0I7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNaO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNaO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNsYXNzIGRlZmluaW5nIHRoZSBjb250cmFjdCBmb3IgYSBwb2x5Z29uIGluIHRoZSBhcmNoaXRlY3R1cmUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWdvbiB7XHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJvdGVjdGVkIF9jZW50cm9pZDogSUxhdExvbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2NlbnRlcjogSUxhdExvbmc7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbidzIGNlbnRlci5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBDZW50ZXIoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9jZW50ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50ZXIgPSB0aGlzLkdldEJvdW5kaW5nQ2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uJ3MgY2VudHJvaWQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ2VudHJvaWQoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9jZW50cm9pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gdGhpcy5HZXRQb2x5Z29uQ2VudHJvaWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRyb2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTGFiZWxNYXhab29tKCk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgTGFiZWxNYXhab29tKHZhbDogbnVtYmVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IExhYmVsTWluWm9vbSgpOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IExhYmVsTWluWm9vbSh2YWw6IG51bWJlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBTaG93TGFiZWwodmFsOiBib29sZWFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBTaG93VG9vbHRpcCgpOiBib29sZWFuO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBTaG93VG9vbHRpcCh2YWw6IGJvb2xlYW4pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aXRsZSBvZmYgdGhlIHBvbHlnb25cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBUaXRsZSgpOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFRpdGxlKHZhbDogc3RyaW5nKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBEZWxldGUoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBjYW4gYmUgZWRpdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0RWRpdGFibGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgSUxhdExvbmcgb2JqZWN0cyBkZXNjcmliaW5nIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgQXJyYXkgb2YgSUxhdExvbmcgb2JqZWN0cyBkZXNjcmliaW5nIG11bHRpcGxlIHBvbHlnb24gcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldFBhdGhzKCk6IEFycmF5PEFycmF5PElMYXRMb25nPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldFZpc2libGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlnb24gZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdldGhlciB0aGUgcG9seWdvbiBwYXRoIGlzIGVkaXRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlnb24gcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXHJcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gcGF0aHMgQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfVxyXG4gICAgICogKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aChzKS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5Z29uIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHBvbHlnb25zJyBib3VuZGluZyBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBJTGF0TG9uZyBvYmplY3QgY29udGFpbmluZyB0aGUgY2VudGVyIG9mIHRoZSBib3VuZGluZyBib3guXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0Qm91bmRpbmdDZW50ZXIoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGxldCBjOiBJTGF0TG9uZyA9IHtsYXRpdHVkZTogMCwgbG9uZ2l0dWRlOiAwfTtcclxuICAgICAgICBsZXQgeDE6IG51bWJlciA9IDkwLCB4MjogbnVtYmVyID0gLTkwLCB5MTogbnVtYmVyID0gMTgwLCB5MjogbnVtYmVyID0gLTE4MDtcclxuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChpbm5lciA9PiBpbm5lci5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAubGF0aXR1ZGUgPCB4MSkgeyB4MSA9IHAubGF0aXR1ZGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlID4geDIpIHsgeDIgPSBwLmxhdGl0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sb25naXR1ZGUgPCB5MSkgeyB5MSA9IHAubG9uZ2l0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sb25naXR1ZGUgPiB5MikgeyB5MiA9IHAubG9uZ2l0dWRlOyB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHgxICsgKHgyIC0geDEpIC8gMjtcclxuICAgICAgICAgICAgYy5sb25naXR1ZGUgPSB5MSArICh5MiAtIHkxKSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGNlbnRyb2lkIG9mIHRoZSBwb2x5Z29uIGJhc2VkIG9uIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgY2VudHJvaWQgY29vcmRpbmF0ZXMgb2YgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0UG9seWdvbkNlbnRyb2lkKCk6IElMYXRMb25nIHtcclxuICAgICAgICBsZXQgYzogSUxhdExvbmcgPSB7bGF0aXR1ZGU6IDAsIGxvbmdpdHVkZTogMH07XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgICAgICBjb25zdCBvZmYgPSBwYXRoWzBdWzBdO1xyXG4gICAgICAgIGlmIChvZmYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgdHdpY2VhcmVhOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwMTogSUxhdExvbmcsIHAyOiBJTGF0TG9uZztcclxuICAgICAgICAgICAgbGV0IGY6IG51bWJlcjtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwYXRoLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IHBhdGhba10ubGVuZ3RoIC0gMTsgaSA8IHBhdGhba10ubGVuZ3RoOyBqID0gaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcDEgPSBwYXRoW2tdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHAyID0gcGF0aFtrXVtqXTtcclxuICAgICAgICAgICAgICAgICAgICBmID0gKHAxLmxhdGl0dWRlIC0gb2ZmLmxhdGl0dWRlKSAqIChwMi5sb25naXR1ZGUgLSBvZmYubG9uZ2l0dWRlKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChwMi5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDEubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHdpY2VhcmVhICs9IGY7XHJcbiAgICAgICAgICAgICAgICAgICAgeCArPSAocDEubGF0aXR1ZGUgKyBwMi5sYXRpdHVkZSAtIDIgKiBvZmYubGF0aXR1ZGUpICogZjtcclxuICAgICAgICAgICAgICAgICAgICB5ICs9IChwMS5sb25naXR1ZGUgKyBwMi5sb25naXR1ZGUgLSAyICogb2ZmLmxvbmdpdHVkZSkgKiBmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0d2ljZWFyZWEgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGYgPSB0d2ljZWFyZWEgKiAzO1xyXG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHggLyBmICsgb2ZmLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSB5IC8gZiArIG9mZi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjLmxhdGl0dWRlID0gb2ZmLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSBvZmYubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbn1cclxuIl19