/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
MapLabel = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    function MapLabel(options) {
        this.Set('fontFamily', 'sans-serif');
        this.Set('fontSize', 12);
        this.Set('fontColor', '#ffffff');
        this.Set('strokeWeight', 4);
        this.Set('strokeColor', '#000000');
        this.Set('align', 'center');
        this.SetValues(options);
    }
    /**
     * Deletes the label from the map. This method does not atually delete the label itself, so
     * it can be readded to map later.
     * \@memberof MapLabel
     * \@method
     * @return {?}
     */
    MapLabel.prototype.Delete = /**
     * Deletes the label from the map. This method does not atually delete the label itself, so
     * it can be readded to map later.
     * \@memberof MapLabel
     * \@method
     * @return {?}
     */
    function () {
        this.SetMap(null);
    };
    /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    MapLabel.prototype.Changed = /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    function (prop) {
        var /** @type {?} */ shouldRunDrawCanvas = false;
        var /** @type {?} */ shouldRunDraw = false;
        if (!Array.isArray(prop)) {
            prop = [prop];
        }
        prop.forEach(function (p) {
            switch (p) {
                case 'fontFamily':
                case 'fontSize':
                case 'fontColor':
                case 'strokeWeight':
                case 'strokeColor':
                case 'align':
                case 'text':
                    shouldRunDrawCanvas = true;
                    break;
                case 'maxZoom':
                case 'minZoom':
                case 'offset':
                case 'hidden':
                case 'position':
                    shouldRunDraw = true;
                    break;
            }
        });
        if (shouldRunDrawCanvas) {
            this.DrawCanvas();
        }
        if (shouldRunDraw) {
            this.Draw();
        }
    };
    ///
    /// Protected methods
    ///
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @returns - blank string if visible, 'hidden' if invisible.
     * @protected
     */
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    MapLabel.prototype.GetVisible = /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    function () {
        var /** @type {?} */ minZoom = this.Get('minZoom');
        var /** @type {?} */ maxZoom = this.Get('maxZoom');
        var /** @type {?} */ hidden = this.Get('hidden');
        if (hidden) {
            return 'hidden';
        }
        if (minZoom === undefined && maxZoom === undefined) {
            return '';
        }
        if (!this.GetMap()) {
            return '';
        }
        var /** @type {?} */ mapZoom = this.GetMap().getZoom();
        if (mapZoom < minZoom || mapZoom > maxZoom) {
            return 'hidden';
        }
        return '';
    };
    /**
     * Draws the label to the canvas 2d context.
     * @memberof MapLabel
     * @method
     * @protected
     */
    /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    MapLabel.prototype.DrawCanvas = /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        if (!this._canvas) {
            return;
        }
        var /** @type {?} */ style = this._canvas.style;
        style.zIndex = this.Get('zIndex');
        var /** @type {?} */ ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.strokeStyle = this.Get('strokeColor');
        ctx.font = this.Get('fontSize') + 'px ' + this.Get('fontFamily');
        var /** @type {?} */ backgroundColor = this.Get('backgroundColor');
        var /** @type {?} */ strokeWeight = Number(this.Get('strokeWeight'));
        var /** @type {?} */ text = this.Get('text');
        var /** @type {?} */ textMeasure = ctx.measureText(text);
        var /** @type {?} */ textWidth = textMeasure.width;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, 4, 4);
        }
        if (backgroundColor && backgroundColor !== '') {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, textWidth + 8, (parseInt(ctx.font, 10) * 2) - 2);
        }
        ctx.fillStyle = this.Get('fontColor');
        ctx.fillText(text, 4, 4);
        style.marginLeft = this.GetMarginLeft(textWidth) + 'px';
        style.marginTop = '-0.4em';
        style.pointerEvents = 'none';
        // Bring actual text top in line with desired latitude.
        // Cheaper than calculating height of text.
    };
    /**
     * Gets the appropriate margin-left for the canvas.
     * @param textWidth  - The width of the text, in pixels.
     * @returns - The margin-left, in pixels.
     * @protected
     * @method
     * @memberof MapLabel
     */
    /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    MapLabel.prototype.GetMarginLeft = /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    function (textWidth) {
        switch (this.Get('align')) {
            case 'left': return 0;
            case 'right': return -textWidth;
        }
        return textWidth / -2;
    };
    /**
     * Called when the label is removed from the map.
     * @method
     * @protected
     * @memberof MapLabel
     */
    /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    MapLabel.prototype.OnRemove = /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    function () {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    };
    return MapLabel;
}());
/**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export { MapLabel };
function MapLabel_tsickle_Closure_declarations() {
    /** @type {?} */
    MapLabel.prototype._canvas;
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof MapLabel
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.DefaultLabelStyle = function () { };
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    MapLabel.prototype.Get = function (key) { };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof MapLabel
     * \@method
     * @abstract
     * @abstract
     * @return {?} - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     */
    MapLabel.prototype.GetMap = function () { };
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    MapLabel.prototype.Set = function (key, val) { };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof MapLabel
     * \@method
     * @abstract
     * @param {?} map - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     * @return {?}
     */
    MapLabel.prototype.SetMap = function (map) { };
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    MapLabel.prototype.SetValues = function (options) { };
    /**
     * Draws the label on the map.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.Draw = function () { };
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof MapLabel
     * \@method
     * @protected
     * @abstract
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.OnAdd = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXAtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUFBO0lBZ0JJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7T0FHRztJQUNILGtCQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7O0lBWU0seUJBQU07Ozs7Ozs7O1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVmLDBCQUFPOzs7Ozs7OztjQUFDLElBQTRCO1FBQ3ZDLHFCQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNoQyxxQkFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUFFO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ1YsTUFBTSxDQUFD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QyxHQUFHLElBQUksQ0FBQztRQUN4RCxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMzQixLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7O0tBR2hDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ08sZ0NBQWE7Ozs7Ozs7O0lBQXZCLFVBQXdCLFNBQWlCO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssTUFBTSxFQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxPQUFPLEVBQUksTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN6QjtJQWFEOzs7OztPQUtHOzs7Ozs7OztJQUNPLDJCQUFROzs7Ozs7O0lBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRDtLQUNKO21CQTVQTDtJQTZQQyxDQUFBOzs7Ozs7OztBQXJQRCxvQkFxUEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgYmFzZSBpbXBsZW1lbnRpbmcgYSBsYWJlbCB0byBiZSBwbGFjZWQgb24gdGhlIG1hcC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBMYWJlbCB7XHJcbi8vIGV4cG9ydCBjbGFzcyBNYXBMYWJlbCBleHRlbmRzIE1pY3Jvc29mdC5NYXBzLkN1c3RvbU92ZXJsYXkge1xyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGFiZWwgc3R5bGUgZm9yIHRoZSBwbGF0Zm9ybVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBEZWZhdWx0TGFiZWxTdHlsZSgpOiBJTGFiZWxPcHRpb25zO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICAgICAgdGhpcy5TZXQoJ2ZvbnRGYW1pbHknLCAnc2Fucy1zZXJpZicpO1xyXG4gICAgICAgIHRoaXMuU2V0KCdmb250U2l6ZScsIDEyKTtcclxuICAgICAgICB0aGlzLlNldCgnZm9udENvbG9yJywgJyNmZmZmZmYnKTtcclxuICAgICAgICB0aGlzLlNldCgnc3Ryb2tlV2VpZ2h0JywgNCk7XHJcbiAgICAgICAgdGhpcy5TZXQoJ3N0cm9rZUNvbG9yJywgJyMwMDAwMDAnKTtcclxuICAgICAgICB0aGlzLlNldCgnYWxpZ24nLCAnY2VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5TZXRWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbGFiZWwgZnJvbSB0aGUgbWFwLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhdHVhbGx5IGRlbGV0ZSB0aGUgbGFiZWwgaXRzZWxmLCBzb1xyXG4gICAgICogaXQgY2FuIGJlIHJlYWRkZWQgdG8gbWFwIGxhdGVyLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TZXRNYXAobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB1bmRlcmx5aW5nIHByb3BlcnRpZXMgY2hhbmdlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwcm9wIC0gVGhlIHByb3BlcnR5IG9yIHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIENoYW5nZWQocHJvcDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPik6IHZvaWQge1xyXG4gICAgICAgIGxldCBzaG91bGRSdW5EcmF3Q2FudmFzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNob3VsZFJ1bkRyYXcgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcCkpIHsgcHJvcCA9IFtwcm9wXTsgfVxyXG4gICAgICAgIHByb3AuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmb250RmFtaWx5JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZvbnRTaXplJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZvbnRDb2xvcic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJva2VXZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3Ryb2tlQ29sb3InOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYWxpZ24nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUnVuRHJhd0NhbnZhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtYXhab29tJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pblpvb20nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb2Zmc2V0JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2hpZGRlbic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwb3NpdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUnVuRHJhdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc2hvdWxkUnVuRHJhd0NhbnZhcykgeyB0aGlzLkRyYXdDYW52YXMoKTsgfVxyXG4gICAgICAgIGlmIChzaG91bGRSdW5EcmF3KSB7IHRoaXMuRHJhdygpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIHNldHRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgdmFsdWUgb2YgdGhlIHNldHRpbmcuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0KGtleTogc3RyaW5nKTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwIGFzc29jaXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgbmF0aXZlIG1hcCBvYmplY3QgZm9yIHRoZSB1bmRlcmx5aW5nIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnRpbmcgZGVyaXZhdGl2ZXMgc2hvdWxkIHJldHVybiB0aGVcclxuICAgICAqIGFjdHVhbCBuYXRpdmUgb2JqZWN0LlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldE1hcCgpOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGZvciBhIHNldHRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQHBhcmFtIHZhbCAtIFRoZSB2YWx1ZSB0byBzZXQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSBBIG5hdGl2ZSBtYXAgb2JqZWN0IGZvciB0aGUgdW5kZXJseWluZyBpbXBsZW1lbnRhdGlvbi4gSW1wbGVtZW50aW5nIGRlcml2YXRpdmVzIHNob3VsZCByZXR1cm4gdGhlXHJcbiAgICAgKiBhY3R1YWwgbmF0aXZlIG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0TWFwKG1hcDogYW55KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpZXMgc2V0dGluZ3MgdG8gdGhlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGtleSB2YWx1ZSBwYWlycy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWYWx1ZXMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQ7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBsYWJlbC4gVmlzaWJpbGl0eSBkZXBlbmRzIG9uIFpvb20gc2V0dGluZ3MuXHJcbiAgICAgKiBAcmV0dXJucyAtIGJsYW5rIHN0cmluZyBpZiB2aXNpYmxlLCAnaGlkZGVuJyBpZiBpbnZpc2libGUuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRWaXNpYmxlKCkge1xyXG4gICAgICAgIGNvbnN0IG1pblpvb206IG51bWJlciA9IHRoaXMuR2V0KCdtaW5ab29tJyk7XHJcbiAgICAgICAgY29uc3QgbWF4Wm9vbTogbnVtYmVyID0gdGhpcy5HZXQoJ21heFpvb20nKTtcclxuICAgICAgICBjb25zdCBoaWRkZW46IGJvb2xlYW4gPSB0aGlzLkdldCgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIGlmIChoaWRkZW4pIHtyZXR1cm4gJ2hpZGRlbic7IH1cclxuICAgICAgICBpZiAobWluWm9vbSA9PT0gdW5kZWZpbmVkICYmIG1heFpvb20gPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gJyc7IH1cclxuICAgICAgICBpZiAoIXRoaXMuR2V0TWFwKCkpIHsgcmV0dXJuICcnOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcFpvb206IG51bWJlciA9IHRoaXMuR2V0TWFwKCkuZ2V0Wm9vbSgpO1xyXG4gICAgICAgIGlmIChtYXBab29tIDwgbWluWm9vbSB8fCBtYXBab29tID4gbWF4Wm9vbSkgeyByZXR1cm4gJ2hpZGRlbic7IH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgb24gdGhlIG1hcC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgRHJhdygpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIHRvIHRoZSBjYW52YXMgMmQgY29udGV4dC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgRHJhd0NhbnZhcyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW52YXMpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gdGhpcy5fY2FudmFzLnN0eWxlO1xyXG4gICAgICAgIHN0eWxlLnpJbmRleCA9IHRoaXMuR2V0KCd6SW5kZXgnKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5HZXQoJ3N0cm9rZUNvbG9yJyk7XHJcbiAgICAgICAgY3R4LmZvbnQgPSB0aGlzLkdldCgnZm9udFNpemUnKSArICdweCAnICsgdGhpcy5HZXQoJ2ZvbnRGYW1pbHknKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSB0aGlzLkdldCgnYmFja2dyb3VuZENvbG9yJyk7XHJcbiAgICAgICAgY29uc3Qgc3Ryb2tlV2VpZ2h0OiBudW1iZXIgPSBOdW1iZXIodGhpcy5HZXQoJ3N0cm9rZVdlaWdodCcpKTtcclxuICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSB0aGlzLkdldCgndGV4dCcpO1xyXG4gICAgICAgIGNvbnN0IHRleHRNZWFzdXJlOiBUZXh0TWV0cmljcyA9IGN0eC5tZWFzdXJlVGV4dCh0ZXh0KTtcclxuICAgICAgICBjb25zdCB0ZXh0V2lkdGg6IG51bWJlciA9IHRleHRNZWFzdXJlLndpZHRoO1xyXG4gICAgICAgIGlmICh0ZXh0ICYmIHN0cm9rZVdlaWdodCAmJiBzdHJva2VXZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3Ryb2tlV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQodGV4dCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IgJiYgYmFja2dyb3VuZENvbG9yICE9PSAnJykge1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGV4dFdpZHRoICsgOCwgKHBhcnNlSW50KGN0eC5mb250LCAxMCkgKiAyKSAtIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5HZXQoJ2ZvbnRDb2xvcicpO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCA0LCA0KTtcclxuXHJcbiAgICAgICAgc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuR2V0TWFyZ2luTGVmdCh0ZXh0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICBzdHlsZS5tYXJnaW5Ub3AgPSAnLTAuNGVtJztcclxuICAgICAgICBzdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAvLyBCcmluZyBhY3R1YWwgdGV4dCB0b3AgaW4gbGluZSB3aXRoIGRlc2lyZWQgbGF0aXR1ZGUuXHJcbiAgICAgICAgICAgIC8vIENoZWFwZXIgdGhhbiBjYWxjdWxhdGluZyBoZWlnaHQgb2YgdGV4dC5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGFwcHJvcHJpYXRlIG1hcmdpbi1sZWZ0IGZvciB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHRleHRXaWR0aCAgLSBUaGUgd2lkdGggb2YgdGhlIHRleHQsIGluIHBpeGVscy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIG1hcmdpbi1sZWZ0LCBpbiBwaXhlbHMuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIEdldE1hcmdpbkxlZnQodGV4dFdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5HZXQoJ2FsaWduJykpIHtcclxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6ICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaWdodCc6ICAgcmV0dXJuIC10ZXh0V2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0V2lkdGggLyAtMjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGNhbGxlZCB3aGVuIHRoZSBsYWJlbCBpcyBhZGRlZCB0byB0aGUgbWFwLiBHZW5lcmF0ZXMgYW5kIGNvbmZpZ3VyZXNcclxuICAgICAqIHRoZSBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IE9uQWRkKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXAuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIE9uUmVtb3ZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMgJiYgdGhpcy5fY2FudmFzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fY2FudmFzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==