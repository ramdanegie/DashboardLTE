/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { GoogleConversions } from '../../services/google/google-conversions';
import { GoogleMapLabel } from './google-label';
import { Polyline } from '../polyline';
/**
 * Concrete implementation for a polyline model for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementation for a polyline model for Google Maps.
 *
 * @export
 */
GooglePolyline = /** @class */ (function (_super) {
    tslib_1.__extends(GooglePolyline, _super);
    ///
    /// constructor
    ///
    /**
    * Creates an instance of GooglePolygon.
    * @param _polyline - The {@link GoogleMApTypes.Polyline} underlying the model.
    *
    * @memberof GooglePolyline
    */
    function GooglePolyline(_polyline) {
        var _this = _super.call(this) || this;
        _this._polyline = _polyline;
        _this._title = '';
        _this._showTooltip = false;
        _this._tooltip = null;
        _this._tooltipVisible = false;
        _this._hasToolTipReceiver = false;
        _this._mouseOverListener = null;
        _this._mouseOutListener = null;
        _this._mouseMoveListener = null;
        _this._metadata = new Map();
        return _this;
    }
    Object.defineProperty(GooglePolyline.prototype, "Metadata", {
        get: /**
         * Gets the polyline metadata.
         *
         * \@readonly
         * \@memberof GooglePolyline
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolyline.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the marker, in this case {\@link GoogleMApTypes.Polyline}
         *
         * \@readonly
         * \@memberof GooglePolygon
         * @return {?}
         */
        function () { return this._polyline; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolyline.prototype, "ShowTooltip", {
        get: /**
         * Gets or sets whether to show the tooltip
         *
         * @abstract
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._showTooltip; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showTooltip = val;
            this.ManageTooltip();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolyline.prototype, "Title", {
        get: /**
         * Gets or sets the title off the polygon
         *
         * @abstract
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._title; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._title = val;
            this.ManageTooltip();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a delegate for an event.
     *
     * \@memberof Polyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    GooglePolyline.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof Polyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    function (eventType, fn) {
        var /** @type {?} */ supportedEvents = [
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
    };
    /**
     * Deleted the polyline.
     *
     *
     * \@memberof Polyline
     * @return {?}
     */
    GooglePolyline.prototype.Delete = /**
     * Deleted the polyline.
     *
     *
     * \@memberof Polyline
     * @return {?}
     */
    function () {
        this._polyline.setMap(null);
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    };
    /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    GooglePolyline.prototype.GetDraggable = /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    function () {
        return this._polyline.getDraggable();
    };
    /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof Polyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GooglePolyline.prototype.GetEditable = /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof Polyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._polyline.getEditable();
    };
    /**
     * Gets the polyline path.
     *
     * \@memberof Polyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    GooglePolyline.prototype.GetPath = /**
     * Gets the polyline path.
     *
     * \@memberof Polyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    function () {
        var /** @type {?} */ p = this._polyline.getPath();
        var /** @type {?} */ path = new Array();
        p.forEach(function (x) { return path.push({ latitude: x.lat(), longitude: x.lng() }); });
        return path;
    };
    /**
     * Gets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    GooglePolyline.prototype.GetVisible = /**
     * Gets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    function () {
        return this._polyline.getVisible();
    };
    /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof Polyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    GooglePolyline.prototype.SetDraggable = /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof Polyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        this._polyline.setDraggable(draggable);
    };
    /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof Polyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    GooglePolyline.prototype.SetEditable = /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof Polyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        this._polyline.setEditable(editable);
    };
    /**
     * Sets the polyline options
     *
     * \@memberof Polyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    GooglePolyline.prototype.SetOptions = /**
     * Sets the polyline options
     *
     * \@memberof Polyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = GoogleConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(/** @type {?} */ (options.path));
        }
    };
    /**
     * Sets the polyline path.
     *
     * \@memberof Polyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    GooglePolyline.prototype.SetPath = /**
     * Sets the polyline path.
     *
     * \@memberof Polyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ p = new Array();
        path.forEach(function (x) { return p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
        this._polyline.setPath(p);
    };
    /**
     * Sets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    GooglePolyline.prototype.SetVisible = /**
     * Sets whether the polyline is visible.
     *
     * \@memberof Polyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polyline.setVisible(visible);
    };
    /**
     * Configures the tooltip for the polyline
     * \@memberof GooglePolyline
     * @return {?}
     */
    GooglePolyline.prototype.ManageTooltip = /**
     * Configures the tooltip for the polyline
     * \@memberof GooglePolyline
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showTooltip && this._title != null && this._title !== '') {
            var /** @type {?} */ o = {
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
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', function (e) {
                    _this._tooltip.Set('position', e.latLng);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('position', e.latLng);
                    }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', true);
                        _this._tooltipVisible = false;
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
    };
    return GooglePolyline;
}(Polyline));
/**
 * Concrete implementation for a polyline model for Google Maps.
 *
 * @export
 */
export { GooglePolyline };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlsaW5lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVN2Qzs7Ozs7QUFBQTtJQUFvQywwQ0FBUTtJQTZEeEMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUY7Ozs7O01BS0U7SUFDSCx3QkFBb0IsU0FBa0M7UUFBdEQsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLGVBQVMsR0FBVCxTQUFTLENBQXlCO3VCQWxFN0IsRUFBRTs2QkFDSyxLQUFLO3lCQUNGLElBQUk7Z0NBQ0osS0FBSztvQ0FDRCxLQUFLO21DQUNtQixJQUFJO2tDQUNMLElBQUk7bUNBQ0gsSUFBSTswQkFDN0IsSUFBSSxHQUFHLEVBQWU7O0tBNEQzRDswQkFoRFUsb0NBQVE7Ozs7Ozs7O3NCQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7OzswQkFRckQsMENBQWM7Ozs7Ozs7O3NCQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7OzswQkFTbEUsdUNBQVc7Ozs7Ozs7OztzQkFBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Ozs7a0JBQ3RDLEdBQVk7WUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7OzswQkFVZCxpQ0FBSzs7Ozs7Ozs7O3NCQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7OztrQkFDL0IsR0FBVztZQUN4QixJQUFJLENBQUMs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QUksQ0FBQyxNQUFNLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUFFO2dCQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzNGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O3lCQXBTVDtFQWNvQyxRQUFRLEVBeVIzQyxDQUFBOzs7Ozs7QUF6UkQsMEJBeVJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcExhYmVsIH0gZnJvbSAnLi9nb29nbGUtbGFiZWwnO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL3BvbHlsaW5lJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIGZvciBhIHBvbHlsaW5lIG1vZGVsIGZvciBHb29nbGUgTWFwcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBvbHlsaW5lIGV4dGVuZHMgUG9seWxpbmUgaW1wbGVtZW50cyBQb2x5bGluZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBHb29nbGVNYXBMYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tb3VzZU92ZXJMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VNb3ZlTGlzdGVuZXI6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWxpbmUgbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBtYXJrZXIsIGluIHRoaXMgY2FzZSB7QGxpbmsgR29vZ2xlTUFwVHlwZXMuUG9seWxpbmV9XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lIHsgcmV0dXJuIHRoaXMuX3BvbHlsaW5lOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93VG9vbHRpcDsgfVxyXG4gICAgcHVibGljIHNldCBTaG93VG9vbHRpcCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93VG9vbHRpcCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5Z29uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgVGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9XHJcbiAgICBwdWJsaWMgc2V0IFRpdGxlKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gY29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlUG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBfcG9seWxpbmUgLSBUaGUge0BsaW5rIEdvb2dsZU1BcFR5cGVzLlBvbHlsaW5lfSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmU6IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWxlZ2F0ZSBmb3IgYW4gZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRFdmVudHMgPSBbXHJcbiAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICdkYmxjbGljaycsXHJcbiAgICAgICAgICAgICdkcmFnJywgJ2RyYWdlbmQnLFxyXG4gICAgICAgICAgICAnZHJhZ3N0YXJ0JyxcclxuICAgICAgICAgICAgJ21vdXNlZG93bicsXHJcbiAgICAgICAgICAgICdtb3VzZW1vdmUnLFxyXG4gICAgICAgICAgICAnbW91c2VvdXQnLFxyXG4gICAgICAgICAgICAnbW91c2VvdmVyJyxcclxuICAgICAgICAgICAgJ21vdXNldXAnLFxyXG4gICAgICAgICAgICAncmlnaHRjbGljaydcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChzdXBwb3J0ZWRFdmVudHMuaW5kZXhPZihldmVudFR5cGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZS5hZGRMaXN0ZW5lcihldmVudFR5cGUsIGZuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7IHRoaXMuX3Rvb2x0aXAuRGVsZXRlKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWxpbmUgaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmUuZ2V0RHJhZ2dhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIHBhdGggY2FuIGJlIGVkaXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RWRpdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lLmdldEVkaXRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IHRoaXMuX3BvbHlsaW5lLmdldFBhdGgoKTtcclxuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XHJcbiAgICAgICAgcC5mb3JFYWNoKHggPT4gcGF0aC5wdXNoKHsgbGF0aXR1ZGU6IHgubGF0KCksIGxvbmdpdHVkZTogeC5sbmcoKSB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZS5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlsaW5lIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdldGhlciB0aGUgcG9seWxpbmUgcGF0aCBpcyBlZGl0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWxpbmUgcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRFZGl0YWJsZShlZGl0YWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5bGluZSBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcclxuICAgICAqIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0T3B0aW9ucyhvKTtcclxuICAgICAgICBpZiAob3B0aW9ucy5wYXRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0UGF0aCg8QXJyYXk8SUxhdExvbmc+Pm9wdGlvbnMucGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWxpbmVzIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xyXG4gICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IHAucHVzaChuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lLnNldFBhdGgocCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWxpbmUgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0VmlzaWJsZSh2aXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIHRoZSB0b29sdGlwIGZvciB0aGUgcG9seWxpbmVcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgby5tYXAgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmdldE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgby56SW5kZXggPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbmV3IEdvb2dsZU1hcExhYmVsKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBlLmxhdExuZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuYWRkTGlzdGVuZXIoJ21vdXNlbW92ZScsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7IHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU91dExpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==