/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
import { GoogleMapLabel } from './google-label';
import { Polyline } from '../polyline';
/**
 * Concrete implementation for a polyline model for Google Maps.
 *
 * @export
 */
export class GooglePolyline extends Polyline {
    /**
     * Creates an instance of GooglePolygon.
     * \@memberof GooglePolyline
     * @param {?} _polyline - The {\@link GoogleMApTypes.Polyline} underlying the model.
     *
     */
    constructor(_polyline) {
        super();
        this._polyline = _polyline;
        this._title = '';
        this._showTooltip = false;
        this._tooltip = null;
        this._tooltipVisible = false;
        this._hasToolTipReceiver = false;
        this._mouseOverListener = null;
        this._mouseOutListener = null;
        this._mouseMoveListener = null;
        this._metadata = new Map();
    }
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * \@memberof GooglePolyline
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the marker, in this case {\@link GoogleMApTypes.Polyline}
     *
     * \@readonly
     * \@memberof GooglePolygon
     * @return {?}
     */
    get NativePrimitve() { return this._polyline; }
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get ShowTooltip() { return this._showTooltip; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowTooltip(val) {
        this._showTooltip = val;
        this.ManageTooltip();
    }
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get Title() { return this._title; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Title(val) {
        this._title = val;
        this.ManageTooltip();
    }
    /**
     * Adds a delegate for an event.
     *
     * \@memberof Polyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        const /** @type {?} */ supportedEvents = [
            'click',
            'dblclick',
            'drag', 'dragend',
            'dragstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'rightclick'
        ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            this._polyline.addListener(eventType, fn);
        }
    }
    /**
     * Deleted the polyline.
     *
     *
     * \@memberof Polyline
     * @return {?}
     */
    Delete() {
        this._polyline.setMap(null);
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    }
    /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return this._polyline.getDraggable();
    }
    /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof Polyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._polyline.getEditable();
    }
    /**
     * Gets the polyline path.
     *
     * \@memberof Polyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    GetPath() {
        const /** @type {?} */ p = this._polyline.getPath();
        const /** @type {?} */ path = new Array();
        p.forEach(x => path.push({ latitude: x.lat(), longitude: x.lng() }));
        return path;
    }
    /**
     * Gets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polyline.getVisible();
    }
    /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof Polyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        this._polyline.setDraggable(draggable);
    }
    /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof Polyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        this._polyline.setEditable(editable);
    }
    /**
     * Sets the polyline options
     *
     * \@memberof Polyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = GoogleConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(/** @type {?} */ (options.path));
        }
    }
    /**
     * Sets the polyline path.
     *
     * \@memberof Polyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    SetPath(path) {
        const /** @type {?} */ p = new Array();
        path.forEach(x => p.push(new google.maps.LatLng(x.latitude, x.longitude)));
        this._polyline.setPath(p);
    }
    /**
     * Sets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polyline.setVisible(visible);
    }
    /**
     * Configures the tooltip for the polyline
     * \@memberof GooglePolyline
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                align: 'left',
                offset: new google.maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = 100000;
                this._tooltip = new GoogleMapLabel(o);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', (e) => {
                    this._tooltip.Set('position', e.latLng);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('position', e.latLng);
                    }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    google.maps.event.removeListener(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    google.maps.event.removeListener(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    google.maps.event.removeListener(this._mouseMoveListener);
                }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    }
}
function GooglePolyline_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolyline.prototype._title;
    /** @type {?} */
    GooglePolyline.prototype._showTooltip;
    /** @type {?} */
    GooglePolyline.prototype._tooltip;
    /** @type {?} */
    GooglePolyline.prototype._tooltipVisible;
    /** @type {?} */
    GooglePolyline.prototype._hasToolTipReceiver;
    /** @type {?} */
    GooglePolyline.prototype._mouseOverListener;
    /** @type {?} */
    GooglePolyline.prototype._mouseOutListener;
    /** @type {?} */
    GooglePolyline.prototype._mouseMoveListener;
    /** @type {?} */
    GooglePolyline.prototype._metadata;
    /** @type {?} */
    GooglePolyline.prototype._polyline;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlsaW5lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7O0FBU3ZDLE1BQU0scUJBQXNCLFNBQVEsUUFBUTs7Ozs7OztJQXVFeEMsWUFBb0IsU0FBa0M7UUFDbEQsS0FBSyxFQUFFLENBQUM7UUFEUSxjQUFTLEdBQVQsU0FBUyxDQUF5QjtzQkFsRTdCLEVBQUU7NEJBQ0ssS0FBSzt3QkFDRixJQUFJOytCQUNKLEtBQUs7bUNBQ0QsS0FBSztrQ0FDbUIsSUFBSTtpQ0FDTCxJQUFJO2tDQUNILElBQUk7eUJBQzdCLElBQUksR0FBRyxFQUFlO0tBNEQzRDs7Ozs7Ozs7UUFoRFUsUUFBUSxLQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Ozs7UUFRckQsY0FBYyxLQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Ozs7O1FBU2xFLFdBQVcsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Ozs7UUFDbEQsV0FBVyxDQUFDLEdBQVk7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7Ozs7Ozs7O1FBVWQsS0FBSyxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7OztRQUNyQyxLQUFLLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFF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Q0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUFFO2dCQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzNGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O0NBR1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwTGFiZWwgfSBmcm9tICcuL2dvb2dsZS1sYWJlbCc7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEgcG9seWxpbmUgbW9kZWwgZm9yIEdvb2dsZSBNYXBzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlUG9seWxpbmUgZXh0ZW5kcyBQb2x5bGluZSBpbXBsZW1lbnRzIFBvbHlsaW5lIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfc2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IEdvb2dsZU1hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9oYXNUb29sVGlwUmVjZWl2ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21vdXNlT3Zlckxpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tb3VzZU91dExpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tb3VzZU1vdmVMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdGhpcy5fbWV0YWRhdGE7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIG1hcmtlciwgaW4gdGhpcyBjYXNlIHtAbGluayBHb29nbGVNQXBUeXBlcy5Qb2x5bGluZX1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmUgeyByZXR1cm4gdGhpcy5fcG9seWxpbmU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBTaG93VG9vbHRpcCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dUb29sdGlwOyB9XHJcbiAgICBwdWJsaWMgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dUb29sdGlwID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aXRsZSBvZmYgdGhlIHBvbHlnb25cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH1cclxuICAgIHB1YmxpYyBzZXQgVGl0bGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBjb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVQb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIF9wb2x5bGluZSAtIFRoZSB7QGxpbmsgR29vZ2xlTUFwVHlwZXMuUG9seWxpbmV9IHVuZGVybHlpbmcgdGhlIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5bGluZTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFtcclxuICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgJ2RibGNsaWNrJyxcclxuICAgICAgICAgICAgJ2RyYWcnLCAnZHJhZ2VuZCcsXHJcbiAgICAgICAgICAgICdkcmFnc3RhcnQnLFxyXG4gICAgICAgICAgICAnbW91c2Vkb3duJyxcclxuICAgICAgICAgICAgJ21vdXNlbW92ZScsXHJcbiAgICAgICAgICAgICdtb3VzZW91dCcsXHJcbiAgICAgICAgICAgICdtb3VzZW92ZXInLFxyXG4gICAgICAgICAgICAnbW91c2V1cCcsXHJcbiAgICAgICAgICAgICdyaWdodGNsaWNrJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHN1cHBvcnRlZEV2ZW50cy5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lLmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlsaW5lLlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHsgdGhpcy5fdG9vbHRpcC5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5bGluZSBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZS5nZXREcmFnZ2FibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgcGF0aCBjYW4gYmUgZWRpdGVkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcGF0aCBjYW4gYmUgZWRpdGVkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRFZGl0YWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmUuZ2V0RWRpdGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gdGhpcy5fcG9seWxpbmUuZ2V0UGF0aCgpO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICBwLmZvckVhY2goeCA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeC5sYXQoKSwgbG9uZ2l0dWRlOiB4LmxuZygpIH0pKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lLmdldFZpc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgZHJhZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWxpbmUgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGlzIGVkaXRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlZGl0YWJsZSAtIFRydWUgdG8gbWFrZSBwb2x5bGluZSBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lLnNldEVkaXRhYmxlKGVkaXRhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+b3B0aW9ucy5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZXMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBhdGgocGF0aDogQXJyYXk8SUxhdExvbmc+KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XHJcbiAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gcC5wdXNoKG5ldyBnb29nbGUubWFwcy5MYXRMbmcoeC5sYXRpdHVkZSwgeC5sb25naXR1ZGUpKSk7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0UGF0aChwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5bGluZSB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRWaXNpYmxlKHZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5bGluZVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvd1Rvb2x0aXAgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDI1KSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvLm1hcCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuZ2V0TWFwKCk7XHJcbiAgICAgICAgICAgICAgICBvLnpJbmRleCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBuZXcgR29vZ2xlTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPdmVyTGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHsgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sYXRMbmcpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCghdGhpcy5fc2hvd1Rvb2x0aXAgfHwgdGhpcy5fdGl0bGUgPT09ICcnIHx8IHRoaXMuX3RpdGxlID09IG51bGwpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU91dExpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19