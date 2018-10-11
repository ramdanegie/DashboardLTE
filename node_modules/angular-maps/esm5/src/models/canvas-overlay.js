/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ id = 0;
/**
 * Abstract base implementing a canvas overlay to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract base implementing a canvas overlay to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
CanvasOverlay = /** @class */ (function () {
    /**
     * Creates a new instance of the CanvasOverlay class.
     */
    function CanvasOverlay(drawCallback) {
        var _this = this;
        this._canvasReady = new Promise(function (resolve, reject) { _this._readyResolver = resolve; });
        this._drawCallback = drawCallback;
        id++;
    }
    Object.defineProperty(CanvasOverlay.prototype, "CanvasReady", {
        get: /**
         * Returns a promise that gets resolved when the canvas overlay is ready for interaction.
         * @return {?}
         */
        function () { return this._canvasReady; },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes the canvas overlay.
     * @return {?}
     */
    CanvasOverlay.prototype.Delete = /**
     * Deletes the canvas overlay.
     * @return {?}
     */
    function () {
        this.SetMap(null);
    };
    /**
     * CanvasOverlay added to map, load canvas.
     * @return {?}
     */
    CanvasOverlay.prototype.OnAdd = /**
     * CanvasOverlay added to map, load canvas.
     * @return {?}
     */
    function () {
        this._canvas = document.createElement('canvas');
        this._canvas.style.position = 'absolute';
        this._canvas.style.left = '0px';
        this._canvas.style.top = '0px';
        this._canvas.id = "xMapOverlay" + id;
        // Add the canvas to the overlay.
        this.SetCanvasElement(this._canvas);
    };
    /**
     * When the CanvasLayer is removed from the map, release resources.
     * \@memberof CanvasOverlay
     * \@method
     * @return {?}
     */
    CanvasOverlay.prototype.OnRemove = /**
     * When the CanvasLayer is removed from the map, release resources.
     * \@memberof CanvasOverlay
     * \@method
     * @return {?}
     */
    function () {
        this.SetCanvasElement(null);
        this.RemoveEventHandlers();
        this._canvas = null;
    };
    /**
     * Redraws the canvas for the current map view.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} clear - True to clear the canvas before drawing.
     * @return {?}
     */
    CanvasOverlay.prototype.Redraw = /**
     * Redraws the canvas for the current map view.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} clear - True to clear the canvas before drawing.
     * @return {?}
     */
    function (clear) {
        if (this._canvas == null) {
            return;
        }
        // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
        if (clear) {
            this.Resize();
        }
        // Call the drawing callback function if specified.
        if (this._drawCallback) {
            this._drawCallback(this._canvas);
        }
    };
    /**
     * Simple function for updating the CSS position and dimensions of the canvas.
     * @param x The horizontal offset position of the canvas.
     * @param y The vertical offset position of the canvas.
     * @param w The width of the canvas.
     * @param h The height of the canvas.
     * @memberof CanvasOverlay
     * @method
     * @protected
     */
    /**
     * Simple function for updating the CSS position and dimensions of the canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @param {?} x The horizontal offset position of the canvas.
     * @param {?} y The vertical offset position of the canvas.
     * @param {?} w The width of the canvas.
     * @param {?} h The height of the canvas.
     * @return {?}
     */
    CanvasOverlay.prototype.UpdatePosition = /**
     * Simple function for updating the CSS position and dimensions of the canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @param {?} x The horizontal offset position of the canvas.
     * @param {?} y The vertical offset position of the canvas.
     * @param {?} w The width of the canvas.
     * @param {?} h The height of the canvas.
     * @return {?}
     */
    function (x, y, w, h) {
        // Update CSS position.
        this._canvas.style.left = x + 'px';
        this._canvas.style.top = y + 'px';
        // Update CSS dimensions.
        this._canvas.style.width = w + 'px';
        this._canvas.style.height = h + 'px';
    };
    return CanvasOverlay;
}());
/**
 * Abstract base implementing a canvas overlay to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export { CanvasOverlay };
function CanvasOverlay_tsickle_Closure_declarations() {
    /** @type {?} */
    CanvasOverlay.prototype._readyResolver;
    /** @type {?} */
    CanvasOverlay.prototype._canvas;
    /** @type {?} */
    CanvasOverlay.prototype._zoomStart;
    /** @type {?} */
    CanvasOverlay.prototype._centerStart;
    /** @type {?} */
    CanvasOverlay.prototype._canvasReady;
    /**
     * A callback function that is triggered when the canvas is ready to be rendered for the current map view.
     * @type {?}
     */
    CanvasOverlay.prototype._drawCallback;
    /**
     * Obtains geo coordinates for the click location
     * @abstract
     * @param {?} e
     * @return {?}
     */
    CanvasOverlay.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Gets the map associted with the label.
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.GetMap = function () { };
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.GetToolTipOverlay = function () { };
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * @abstract
     * \@method
     * \@memberof CanvasOverlay
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.OnLoad = function () { };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @param {?} map - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     * @return {?}
     */
    CanvasOverlay.prototype.SetMap = function (map) { };
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @param {?} el
     * @return {?}
     */
    CanvasOverlay.prototype.SetCanvasElement = function (el) { };
    /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.RemoveEventHandlers = function () { };
    /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.Resize = function () { };
    /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.UpdateCanvas = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2NhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxxQkFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDOzs7Ozs7OztBQVFuQjs7Ozs7OztBQUFBO0lBc0JJOztPQUVHO0lBQ0gsdUJBQVksWUFBaUQ7UUFBN0QsaUJBR0M7NEJBbkJ1QyxJQUFJLE9BQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQU8sS0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBaUJqSCxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxFQUFFLEVBQUUsQ0FBQztLQUNSOzBCQWRVLHNDQUFXOzs7OztzQkFBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7O0lBdUIvRCw4QkFBTTs7Ozs7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUF3QmYsNkJBQUs7Ozs7O1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGdCQUFjLEVBQUksQ0FBQzs7UUFHckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7SUFnQmpDLGdDQUFROzs7Ozs7O1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7SUFTakIsOEJBQU07Ozs7Ozs7Y0FBQyxLQUFjO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFOztRQUdyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQUU7O1FBRzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDOztJQWtETDs7Ozs7Ozs7O09BU0c7Ozs7Ozs7Ozs7OztJQUNPLHNDQUFjOzs7Ozs7Ozs7OztJQUF4QixVQUF5QixDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTOztRQUUvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzs7UUFHbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDeEM7d0JBMUxMO0lBNExDLENBQUE7Ozs7Ozs7O0FBakxELHlCQWlMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi9tYXAtbGFiZWwnO1xyXG5cclxubGV0IGlkOiBudW1iZXIgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGJhc2UgaW1wbGVtZW50aW5nIGEgY2FudmFzIG92ZXJsYXkgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FudmFzT3ZlcmxheSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gZmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfcmVhZHlSZXNvbHZlcjogKHZhbDogYm9vbGVhbikgPT4gdm9pZDtcclxuICAgIHByb3RlY3RlZCBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBfem9vbVN0YXJ0OiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX2NlbnRlclN0YXJ0OiBJTGF0TG9uZztcclxuICAgIHB1YmxpYyBfY2FudmFzUmVhZHk6IFByb21pc2U8Ym9vbGVhbj4gPSBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IHRoaXMuX3JlYWR5UmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCB3aGVuIHRoZSBjYW52YXMgb3ZlcmxheSBpcyByZWFkeSBmb3IgaW50ZXJhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ2FudmFzUmVhZHkoKTogUHJvbWlzZTxib29sZWFuPiB7IHJldHVybiB0aGlzLl9jYW52YXNSZWFkeTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbnZhcyBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBDYW52YXNPdmVybGF5IGNsYXNzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fZHJhd0NhbGxiYWNrID0gZHJhd0NhbGxiYWNrO1xyXG4gICAgICAgIGlkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgY2FudmFzIG92ZXJsYXkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TZXRNYXAobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBhbnkpOiBJTGF0TG9uZztcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0TWFwKCk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBNYXBMYWJlbCBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgcGxhdGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBhIHRvb2x0aXAuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBvbmx5IGdlbmVyYXRlcyB0aGUgbWFwIGxhYmVsLiBDb250ZW50IGFuZCBwbGFjZW1lbnQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5XHJcbiAgICAgKiBvZiB0aGUgY2FsbGVyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0VG9vbFRpcE92ZXJsYXkoKTogTWFwTGFiZWw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW52YXNPdmVybGF5IGFkZGVkIHRvIG1hcCwgbG9hZCBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPbkFkZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5pZCA9IGB4TWFwT3ZlcmxheSR7aWR9YDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gdGhlIG92ZXJsYXkuXHJcbiAgICAgICAgdGhpcy5TZXRDYW52YXNFbGVtZW50KHRoaXMuX2NhbnZhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW52YXNPdmVybGF5IGxvYWRlZCwgYXR0YWNoIG1hcCBldmVudHMgZm9yIHVwZGF0aW5nIGNhbnZhcy5cclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IE9uTG9hZCgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiB0aGUgQ2FudmFzTGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXAsIHJlbGVhc2UgcmVzb3VyY2VzLlxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9uUmVtb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuU2V0Q2FudmFzRWxlbWVudChudWxsKTtcclxuICAgICAgICB0aGlzLlJlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLl9jYW52YXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVkcmF3cyB0aGUgY2FudmFzIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEBwYXJhbSBjbGVhciAtIFRydWUgdG8gY2xlYXIgdGhlIGNhbnZhcyBiZWZvcmUgZHJhd2luZy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBSZWRyYXcoY2xlYXI6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FudmFzID09IG51bGwpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIENsZWFyIGNhbnZhcyBieSB1cGRhdGluZyBkaW1lbnNpb25zLiBUaGlzIGFsc28gZW5zdXJlcyBjYW52YXMgc3RheXMgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgbWFwLlxyXG4gICAgICAgIGlmIChjbGVhcikgeyB0aGlzLlJlc2l6ZSgpOyB9XHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIGRyYXdpbmcgY2FsbGJhY2sgZnVuY3Rpb24gaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgIGlmICh0aGlzLl9kcmF3Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fZHJhd0NhbGxiYWNrKHRoaXMuX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFwIGZvciB0aGUgbGFiZWwuIFNldHRpbmdzIHRoaXMgdG8gbnVsbCByZW1vdmUgdGhlIGxhYmVsIGZyb20gaHRlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0gQSBuYXRpdmUgbWFwIG9iamVjdCBmb3IgdGhlIHVuZGVybHlpbmcgaW1wbGVtZW50YXRpb24uIEltcGxlbWVudGluZyBkZXJpdmF0aXZlcyBzaG91bGQgcmV0dXJuIHRoZVxyXG4gICAgICogYWN0dWFsIG5hdGl2ZSBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0TWFwKG1hcDogYW55KTogdm9pZDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2FudmFzIHRvIHRoZSBtYXAuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgU2V0Q2FudmFzRWxlbWVudChlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSBtYXAgZXZlbnQgaGFuZGxlcnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBSZW1vdmVFdmVudEhhbmRsZXJzKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMgc2l6ZSBiYXNlZCBvbiB0aGUgbWFwIHNpemUuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBSZXNpemUoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIENhbnZhcy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBVcGRhdGVDYW52YXMoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNpbXBsZSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIENTUyBwb3NpdGlvbiBhbmQgZGltZW5zaW9ucyBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHggVGhlIGhvcml6b250YWwgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgdmVydGljYWwgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gdyBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBoIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBVcGRhdGVQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBVcGRhdGUgQ1NTIHBvc2l0aW9uLlxyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=