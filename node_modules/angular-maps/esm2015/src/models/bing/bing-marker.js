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
export class BingMarker {
    /**
     * Creates an instance of BingMarker.
     * \@memberof BingMarker
     * @param {?} _pushpin - The {\@link Microsoft.Maps.Pushpin} underlying the model.
     * @param {?} _map - The context map.
     * @param {?} _layer - The context layer.
     *
     */
    constructor(_pushpin, _map, _layer) {
        this._pushpin = _pushpin;
        this._map = _map;
        this._layer = _layer;
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
     * Gets the Location of the marker
     *
     * \@readonly
     * \@memberof BingMarker
     * @return {?}
     */
    get Location() {
        const /** @type {?} */ l = this._pushpin.getLocation();
        return {
            latitude: l.latitude,
            longitude: l.longitude
        };
    }
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
     * \@memberof BingMarker
     * @return {?}
     */
    get NativePrimitve() { return this._pushpin; }
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
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._pushpin, eventType, (e) => {
            fn(e);
        });
    }
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    DeleteMarker() {
        if (!this._map && !this._layer) {
            return;
        }
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
    }
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    GetLabel() {
        return this._pushpin.getText();
    }
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._pushpin.getVisible();
    }
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    SetAnchor(anchor) {
        const /** @type {?} */ o = {};
        o.anchor = new Microsoft.Maps.Point(anchor.x, anchor.y);
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        const /** @type {?} */ o = {};
        o.draggable = draggable;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    SetIcon(icon) {
        const /** @type {?} */ o = {};
        o.icon = icon;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    SetLabel(label) {
        const /** @type {?} */ o = {};
        o.text = label;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    SetPosition(latLng) {
        const /** @type {?} */ p = BingConversions.TranslateLocation(latLng);
        this._pushpin.setLocation(p);
    }
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    SetTitle(title) {
        const /** @type {?} */ o = {};
        o.title = title;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
        this._pushpin.setOptions(o);
    }
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        const /** @type {?} */ o = {};
        o.visible = visible;
        this._pushpin.setOptions(o);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2JpbmcvYmluZy1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBT3ZFLE1BQU07Ozs7Ozs7OztJQXVFRixZQUFvQixRQUFnQyxFQUFZLElBQXdCLEVBQVksTUFBNEI7UUFBNUcsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQXNCO3lCQWxFMUYsSUFBSSxHQUFHLEVBQWU7d0JBQ3pDLEtBQUs7dUJBQ04sSUFBSTtLQWdFK0c7Ozs7Ozs7UUFyRDFILE9BQU8sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDMUMsT0FBTyxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztRQU81QyxNQUFNLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7O1FBQ3hDLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUTFDLFFBQVE7UUFDZix1QkFBTSxDQUFDLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztTQUN6QixDQUFDOzs7Ozs7Ozs7UUFTSyxRQUFRLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7OztRQVFyRCxjQUFjLEtBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7O0lBNkJqRCxXQUFXLENB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Q0FBQztRQUNuRCxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Q0FHbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIHtAbGluayBNYXJrZXJ9IGNvbnRyYWN0IGZvciB0aGUgQmluZyBNYXBzIFY4IG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFya2VyIGltcGxlbWVudHMgTWFya2VyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcbiAgICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc0xhc3QgPSB0cnVlO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGZpcnN0IG1hcmtlciBpbiBhIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNGaXJzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzRmlyc3Q7IH1cclxuICAgIHB1YmxpYyBzZXQgSXNGaXJzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gdGhlIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSXNMYXN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNMYXN0OyB9XHJcbiAgICBwdWJsaWMgc2V0IElzTGFzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNMYXN0ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBMb2NhdGlvbiBvZiB0aGUgbWFya2VyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExvY2F0aW9uKCk6IElMYXRMb25nIHtcclxuICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IHRoaXMuX3B1c2hwaW4uZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogbC5sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsLmxvbmdpdHVkZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdGhpcy5fbWV0YWRhdGE7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIG1hcmtlciwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5QdXNocGlufVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fcHVzaHBpbjsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ01hcmtlci5cclxuICAgICAqIEBwYXJhbSBfcHVzaHBpbiAtIFRoZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbn0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcCAtIFRoZSBjb250ZXh0IG1hcC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wdXNocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluLCBwcm90ZWN0ZWQgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwLCBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcikgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcHVzaHBpbiwgZXZlbnRUeXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBmbihlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlTWFya2VyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwICYmICF0aGlzLl9sYXllcikgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAodGhpcy5fbGF5ZXIpIHsgdGhpcy5fbGF5ZXIucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpOyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5lbnRpdGllcy5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFya2VyIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2hwaW4uZ2V0VGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIG1hcmtlciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2hwaW4uZ2V0VmlzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYW5jaG9yIGZvciB0aGUgbWFya2VyLiBVc2UgdGhpcyB0byBhZGp1c3QgdGhlIHJvb3QgbG9jYXRpb24gZm9yIHRoZSBtYXJrZXIgdG8gYWNjb21vZGF0ZSB2YXJpb3VzIG1hcmtlciBpbWFnZSBzaXplcy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBhbmNob3IgLSBQb2ludCBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBhbmNob3IuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEFuY2hvcihhbmNob3I6IElQb2ludCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIG8uYW5jaG9yID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KGFuY2hvci54LCBhbmNob3IueSk7XHJcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZHJhZ2dhYmlsaXR5IG9mIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFyayB0aGUgbWFya2VyIGFzIGRyYWdnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XHJcbiAgICAgICAgby5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XHJcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaWNvbiBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpY29uIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGljb24gaW4gdmFyaW91cyBmb3JtcyAodXJsLCBkYXRhIHVybCwgZXRjLilcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0SWNvbihpY29uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICBvLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciBsYWJlbC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYWJlbCAtIFN0cmluZyBjb250YWluaW5nIHRoZSBsYWJlbCB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICBvLnRleHQgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgcG9zaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvIGNvb3JkaW5hdGVzIHRvIHNldCB0aGUgbWFya2VyIHBvc2l0aW9uIHRvLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihsYXRMbmc6IElMYXRMb25nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obGF0TG5nKTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldExvY2F0aW9uKHApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHRpdGxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHRpdGxlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIHRpdGxlIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VGl0bGUodGl0bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIG8udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElNYXJrZXJPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgbWFya2VyIG9wdGlvbnMgdG8gc2V0LiBUaGUgc3VwcGxpZWQgb3B0aW9ucyBhcmVcclxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSB1bmRlcmx5aW5nIG1hcmtlciBvcHRpb25zLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9ICBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIG1hcmtlciB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgby52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==