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
export class MapLabel {
    /**
     * Creates a new MapLabel
     * @param {?} options Optional properties to set.
     */
    constructor(options) {
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
    Delete() {
        this.SetMap(null);
    }
    /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    Changed(prop) {
        let /** @type {?} */ shouldRunDrawCanvas = false;
        let /** @type {?} */ shouldRunDraw = false;
        if (!Array.isArray(prop)) {
            prop = [prop];
        }
        prop.forEach(p => {
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
    }
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    GetVisible() {
        const /** @type {?} */ minZoom = this.Get('minZoom');
        const /** @type {?} */ maxZoom = this.Get('maxZoom');
        const /** @type {?} */ hidden = this.Get('hidden');
        if (hidden) {
            return 'hidden';
        }
        if (minZoom === undefined && maxZoom === undefined) {
            return '';
        }
        if (!this.GetMap()) {
            return '';
        }
        const /** @type {?} */ mapZoom = this.GetMap().getZoom();
        if (mapZoom < minZoom || mapZoom > maxZoom) {
            return 'hidden';
        }
        return '';
    }
    /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    DrawCanvas() {
        if (!this._canvas) {
            return;
        }
        const /** @type {?} */ style = this._canvas.style;
        style.zIndex = this.Get('zIndex');
        const /** @type {?} */ ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.strokeStyle = this.Get('strokeColor');
        ctx.font = this.Get('fontSize') + 'px ' + this.Get('fontFamily');
        const /** @type {?} */ backgroundColor = this.Get('backgroundColor');
        const /** @type {?} */ strokeWeight = Number(this.Get('strokeWeight'));
        const /** @type {?} */ text = this.Get('text');
        const /** @type {?} */ textMeasure = ctx.measureText(text);
        const /** @type {?} */ textWidth = textMeasure.width;
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
    }
    /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    GetMarginLeft(textWidth) {
        switch (this.Get('align')) {
            case 'left': return 0;
            case 'right': return -textWidth;
        }
        return textWidth / -2;
    }
    /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    OnRemove() {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXAtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxNQUFNOzs7OztJQXdCRixZQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7O0lBWU0sTUFBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVZixPQUFPLENBQUMsSUFBNEI7UUFDdkMscUJBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLHFCQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtB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Q0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssTUFBTSxFQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxPQUFPLEVBQUksTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7SUFtQlMsUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckQ7S0FDSjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGJhc2UgaW1wbGVtZW50aW5nIGEgbGFiZWwgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwTGFiZWwge1xyXG4vLyBleHBvcnQgY2xhc3MgTWFwTGFiZWwgZXh0ZW5kcyBNaWNyb3NvZnQuTWFwcy5DdXN0b21PdmVybGF5IHtcclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcm90ZWN0ZWQgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxhYmVsIHN0eWxlIGZvciB0aGUgcGxhdGZvcm1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE1hcExhYmVsXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBwcm9wZXJ0aWVzIHRvIHNldC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgICAgIHRoaXMuU2V0KCdmb250RmFtaWx5JywgJ3NhbnMtc2VyaWYnKTtcclxuICAgICAgICB0aGlzLlNldCgnZm9udFNpemUnLCAxMik7XHJcbiAgICAgICAgdGhpcy5TZXQoJ2ZvbnRDb2xvcicsICcjZmZmZmZmJyk7XHJcbiAgICAgICAgdGhpcy5TZXQoJ3N0cm9rZVdlaWdodCcsIDQpO1xyXG4gICAgICAgIHRoaXMuU2V0KCdzdHJva2VDb2xvcicsICcjMDAwMDAwJyk7XHJcbiAgICAgICAgdGhpcy5TZXQoJ2FsaWduJywgJ2NlbnRlcicpO1xyXG4gICAgICAgIHRoaXMuU2V0VmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIGxhYmVsIGZyb20gdGhlIG1hcC4gVGhpcyBtZXRob2QgZG9lcyBub3QgYXR1YWxseSBkZWxldGUgdGhlIGxhYmVsIGl0c2VsZiwgc29cclxuICAgICAqIGl0IGNhbiBiZSByZWFkZGVkIHRvIG1hcCBsYXRlci5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuU2V0TWFwKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgY2FsbGVkIHdoZW4gdW5kZXJseWluZyBwcm9wZXJ0aWVzIGNoYW5nZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcHJvcCAtIFRoZSBwcm9wZXJ0eSBvciBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDaGFuZ2VkKHByb3A6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2hvdWxkUnVuRHJhd0NhbnZhcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzaG91bGRSdW5EcmF3ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3ApKSB7IHByb3AgPSBbcHJvcF07IH1cclxuICAgICAgICBwcm9wLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udEZhbWlseSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmb250U2l6ZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmb250Q29sb3InOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3Ryb2tlV2VpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cm9rZUNvbG9yJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2FsaWduJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJ1bkRyYXdDYW52YXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4Wm9vbSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5ab29tJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29mZnNldCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdoaWRkZW4nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAncG9zaXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJ1bkRyYXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNob3VsZFJ1bkRyYXdDYW52YXMpIHsgdGhpcy5EcmF3Q2FudmFzKCk7IH1cclxuICAgICAgICBpZiAoc2hvdWxkUnVuRHJhdykgeyB0aGlzLkRyYXcoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHZhbHVlIG9mIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldChrZXk6IHN0cmluZyk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIG5hdGl2ZSBtYXAgb2JqZWN0IGZvciB0aGUgdW5kZXJseWluZyBpbXBsZW1lbnRhdGlvbi4gSW1wbGVtZW50aW5nIGRlcml2YXRpdmVzIHNob3VsZCByZXR1cm4gdGhlXHJcbiAgICAgKiBhY3R1YWwgbmF0aXZlIG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRNYXAoKTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldChrZXk6IHN0cmluZywgdmFsOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFwIGZvciB0aGUgbGFiZWwuIFNldHRpbmdzIHRoaXMgdG8gbnVsbCByZW1vdmUgdGhlIGxhYmVsIGZyb20gaHRlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0gQSBuYXRpdmUgbWFwIG9iamVjdCBmb3IgdGhlIHVuZGVybHlpbmcgaW1wbGVtZW50YXRpb24uIEltcGxlbWVudGluZyBkZXJpdmF0aXZlcyBzaG91bGQgcmV0dXJuIHRoZVxyXG4gICAgICogYWN0dWFsIG5hdGl2ZSBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldE1hcChtYXA6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIHNldHRpbmdzIHRvIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBzZXR0aW5ncyBrZXkgdmFsdWUgcGFpcnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VmFsdWVzKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbGFiZWwuIFZpc2liaWxpdHkgZGVwZW5kcyBvbiBab29tIHNldHRpbmdzLlxyXG4gICAgICogQHJldHVybnMgLSBibGFuayBzdHJpbmcgaWYgdmlzaWJsZSwgJ2hpZGRlbicgaWYgaW52aXNpYmxlLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0VmlzaWJsZSgpIHtcclxuICAgICAgICBjb25zdCBtaW5ab29tOiBudW1iZXIgPSB0aGlzLkdldCgnbWluWm9vbScpO1xyXG4gICAgICAgIGNvbnN0IG1heFpvb206IG51bWJlciA9IHRoaXMuR2V0KCdtYXhab29tJyk7XHJcbiAgICAgICAgY29uc3QgaGlkZGVuOiBib29sZWFuID0gdGhpcy5HZXQoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICBpZiAoaGlkZGVuKSB7cmV0dXJuICdoaWRkZW4nOyB9XHJcbiAgICAgICAgaWYgKG1pblpvb20gPT09IHVuZGVmaW5lZCAmJiBtYXhab29tID09PSB1bmRlZmluZWQpIHsgcmV0dXJuICcnOyB9XHJcbiAgICAgICAgaWYgKCF0aGlzLkdldE1hcCgpKSB7IHJldHVybiAnJzsgfVxyXG5cclxuICAgICAgICBjb25zdCBtYXBab29tOiBudW1iZXIgPSB0aGlzLkdldE1hcCgpLmdldFpvb20oKTtcclxuICAgICAgICBpZiAobWFwWm9vbSA8IG1pblpvb20gfHwgbWFwWm9vbSA+IG1heFpvb20pIHsgcmV0dXJuICdoaWRkZW4nOyB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIG9uIHRoZSBtYXAuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IERyYXcoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBsYWJlbCB0byB0aGUgY2FudmFzIDJkIGNvbnRleHQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIERyYXdDYW52YXMgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FudmFzKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBzdHlsZS56SW5kZXggPSB0aGlzLkdldCgnekluZGV4Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuR2V0KCdzdHJva2VDb2xvcicpO1xyXG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5HZXQoJ2ZvbnRTaXplJykgKyAncHggJyArIHRoaXMuR2V0KCdmb250RmFtaWx5Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gdGhpcy5HZXQoJ2JhY2tncm91bmRDb2xvcicpO1xyXG4gICAgICAgIGNvbnN0IHN0cm9rZVdlaWdodDogbnVtYmVyID0gTnVtYmVyKHRoaXMuR2V0KCdzdHJva2VXZWlnaHQnKSk7XHJcbiAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gdGhpcy5HZXQoJ3RleHQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0TWVhc3VyZTogVGV4dE1ldHJpY3MgPSBjdHgubWVhc3VyZVRleHQodGV4dCk7XHJcbiAgICAgICAgY29uc3QgdGV4dFdpZHRoOiBudW1iZXIgPSB0ZXh0TWVhc3VyZS53aWR0aDtcclxuICAgICAgICBpZiAodGV4dCAmJiBzdHJva2VXZWlnaHQgJiYgc3Ryb2tlV2VpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHRleHQsIDQsIDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmFja2dyb3VuZENvbG9yICYmIGJhY2tncm91bmRDb2xvciAhPT0gJycpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRleHRXaWR0aCArIDgsIChwYXJzZUludChjdHguZm9udCwgMTApICogMikgLSAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuR2V0KCdmb250Q29sb3InKTtcclxuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgNCwgNCk7XHJcblxyXG4gICAgICAgIHN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLkdldE1hcmdpbkxlZnQodGV4dFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgc3R5bGUubWFyZ2luVG9wID0gJy0wLjRlbSc7XHJcbiAgICAgICAgc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgICAgICAgICAgLy8gQnJpbmcgYWN0dWFsIHRleHQgdG9wIGluIGxpbmUgd2l0aCBkZXNpcmVkIGxhdGl0dWRlLlxyXG4gICAgICAgICAgICAvLyBDaGVhcGVyIHRoYW4gY2FsY3VsYXRpbmcgaGVpZ2h0IG9mIHRleHQuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBhcHByb3ByaWF0ZSBtYXJnaW4tbGVmdCBmb3IgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSB0ZXh0V2lkdGggIC0gVGhlIHdpZHRoIG9mIHRoZSB0ZXh0LCBpbiBwaXhlbHMuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBtYXJnaW4tbGVmdCwgaW4gcGl4ZWxzLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRNYXJnaW5MZWZ0KHRleHRXaWR0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuR2V0KCdhbGlnbicpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOiAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOiAgIHJldHVybiAtdGV4dFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dFdpZHRoIC8gLTI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgYWRkZWQgdG8gdGhlIG1hcC4gR2VuZXJhdGVzIGFuZCBjb25maWd1cmVzXHJcbiAgICAgKiB0aGUgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBPbkFkZCgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGxhYmVsIGlzIHJlbW92ZWQgZnJvbSB0aGUgbWFwLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBPblJlbW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FudmFzICYmIHRoaXMuX2NhbnZhcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2NhbnZhcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=