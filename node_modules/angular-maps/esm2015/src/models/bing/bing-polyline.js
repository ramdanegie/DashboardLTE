/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polyline } from '../polyline';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
export class BingPolyline extends Polyline {
    /**
     * Creates an instance of BingPolygon.
     * \@memberof BingPolyline
     * @param {?} _polyline - The {\@link Microsoft.Maps.Polyline} underlying the model.
     * @param {?} _map - The context map.
     * @param {?} _layer - The context layer.
     */
    constructor(_polyline, _map, _layer) {
        super();
        this._polyline = _polyline;
        this._map = _map;
        this._layer = _layer;
        this._isEditable = true;
        this._title = '';
        this._showTooltip = false;
        this._tooltip = null;
        this._hasToolTipReceiver = false;
        this._tooltipVisible = false;
        this._metadata = new Map();
    }
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * \@memberof BingPolyline
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the Navitve Polyline underlying the model
     *
     * \@readonly
     * \@memberof BingPolyline
     * @return {?}
     */
    get NativePrimitve() { return this._polyline; }
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof BingPolyline
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
     * Gets or sets the title off the polyline
     *
     * @abstract
     * \@memberof BingPolyline
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
     * \@memberof BingPolyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        const /** @type {?} */ supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polyline, eventType, (e) => {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            let /** @type {?} */ handlerId;
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', e => {
                handlerId = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', m => fn(m));
            });
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', e => {
                if (handlerId) {
                    Microsoft.Maps.Events.removeHandler(handlerId);
                }
            });
        }
    }
    /**
     * Deleted the polyline.
     *
     * \@memberof BingPolyline
     * @return {?}
     */
    Delete() {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    }
    /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return false;
    }
    /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._isEditable;
    }
    /**
     * Gets the polyline path.
     *
     * \@memberof BingPolyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    GetPath() {
        const /** @type {?} */ p = this._polyline.getLocations();
        const /** @type {?} */ path = new Array();
        p.forEach(l => path.push({ latitude: l.latitude, longitude: l.longitude }));
        return path;
    }
    /**
     * Gets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polyline.getVisible();
    }
    /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof BingPolyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        throw (new Error('The bing maps implementation currently does not support draggable polylines.'));
    }
    /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof BingPolyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        this._isEditable = editable;
    }
    /**
     * Sets the polyline options
     *
     * \@memberof BingPolyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(/** @type {?} */ (options.path));
        }
    }
    /**
     * Sets the polyline path.
     *
     * \@memberof BingPolyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    SetPath(path) {
        const /** @type {?} */ p = new Array();
        path.forEach(x => p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
        this._polyline.setLocations(p);
    }
    /**
     * Sets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polyline.setOptions(/** @type {?} */ ({ visible: visible }));
    }
    /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                align: 'left',
                offset: new Microsoft.Maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                this._tooltip = new BingMapLabel(o);
                this._tooltip.SetMap(this._map);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', (e) => {
                    this._tooltip.Set('position', e.location);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', (e) => {
                    if (this._tooltipVisible && e.location && e.primitive === this._polyline) {
                        this._tooltip.Set('position', e.location);
                    }
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', (e) => {
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
                    Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
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
function BingPolyline_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolyline.prototype._isEditable;
    /** @type {?} */
    BingPolyline.prototype._title;
    /** @type {?} */
    BingPolyline.prototype._showTooltip;
    /** @type {?} */
    BingPolyline.prototype._tooltip;
    /** @type {?} */
    BingPolyline.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolyline.prototype._tooltipVisible;
    /** @type {?} */
    BingPolyline.prototype._mouseOverListener;
    /** @type {?} */
    BingPolyline.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolyline.prototype._mouseOutListener;
    /** @type {?} */
    BingPolyline.prototype._metadata;
    /** @type {?} */
    BingPolyline.prototype._polyline;
    /** @type {?} */
    BingPolyline.prototype._map;
    /** @type {?} */
    BingPolyline.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFPNUMsTUFBTSxtQkFBb0IsU0FBUSxRQUFROzs7Ozs7OztJQXlFdEMsWUFBb0IsU0FBa0MsRUFBWSxJQUF3QixFQUFZLE1BQTRCO1FBQzlILEtBQUssRUFBRSxDQUFDO1FBRFEsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQXNCOzJCQXBFbkcsSUFBSTtzQkFLVixFQUFFOzRCQUNLLEtBQUs7d0JBQ0osSUFBSTttQ0FDRSxLQUFLOytCQUNULEtBQUs7eUJBSUYsSUFBSSxHQUFHLEVBQWU7S0F5RDNEOzs7Ozs7OztRQWpEVSxRQUFRLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7OztRQVFyRCxjQUFjLEtBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7UUFTbEUsV0FBVyxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7OztRQUNsRCxXQUFXLENBQUMsR0FBWTtRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7Ozs7Ozs7UUFVZCxLQUFLLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7O1FBQ3JDLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFN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LElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFFO2lCQUFFO2dCQUM3RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDOUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzlGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O0NBRVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBCaW5nTWFwTGFiZWwgfSBmcm9tICcuL2JpbmctbGFiZWwnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIGZvciBhIHBvbHlsaW5lIG1vZGVsIGZvciBCaW5nIE1hcHMgVjguXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWxpbmUgZXh0ZW5kcyBQb2x5bGluZSBpbXBsZW1lbnRzIFBvbHlsaW5lIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaXNFZGl0YWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBCaW5nTWFwTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdmVyTGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tb3VzZU1vdmVMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21vdXNlT3V0TGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBOYXZpdHZlIFBvbHlsaW5lIHVuZGVybHlpbmcgdGhlIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUgeyByZXR1cm4gdGhpcy5fcG9seWxpbmU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rvb2x0aXAgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxyXG4gICAgcHVibGljIHNldCBUaXRsZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIGNvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gX3BvbHlsaW5lIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZX0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcCAtIFRoZSBjb250ZXh0IG1hcC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lLCBwcm90ZWN0ZWQgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwLCBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnIF07XHJcbiAgICAgICAgaWYgKHN1cHBvcnRlZEV2ZW50cy5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbihlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVySWQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdmVyJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVySWQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCBtID0+IGZuKG0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdXQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVySWQpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIoaGFuZGxlcklkKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7IHRoaXMuX2xheWVyLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTsgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZW50aXRpZXMucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLThcclxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRFZGl0YWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gdGhpcy5fcG9seWxpbmUuZ2V0TG9jYXRpb25zKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgIHAuZm9yRWFjaChsID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiBsLmxhdGl0dWRlLCBsb25naXR1ZGU6IGwubG9uZ2l0dWRlIH0pKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZS5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlsaW5lIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLThcclxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgdGhyb3cobmV3IEVycm9yKCdUaGUgYmluZyBtYXBzIGltcGxlbWVudGF0aW9uIGN1cnJlbnRseSBkb2VzIG5vdCBzdXBwb3J0IGRyYWdnYWJsZSBwb2x5bGluZXMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlsaW5lIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlsaW5lIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGUgPSBlZGl0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+b3B0aW9ucy5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZXMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcclxuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lLnNldExvY2F0aW9ucyhwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5bGluZSB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0T3B0aW9ucyg8TWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucz57IHZpc2libGU6IHZpc2libGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcCh0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdmVyJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUgJiYgZS5sb2NhdGlvbiAmJiBlLnByaW1pdGl2ZSA9PT0gdGhpcy5fcG9seWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU91dExpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZSwgJ21vdXNlb3V0JywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKSA7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==