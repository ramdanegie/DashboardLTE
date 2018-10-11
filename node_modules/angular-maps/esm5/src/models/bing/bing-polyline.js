/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polyline } from '../polyline';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
var /**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
BingPolyline = /** @class */ (function (_super) {
    tslib_1.__extends(BingPolyline, _super);
    ///
    /// constructor
    ///
    /**
     * Creates an instance of BingPolygon.
     * @param _polyline - The {@link Microsoft.Maps.Polyline} underlying the model.
     * @param _map - The context map.
     * @param _layer - The context layer.
     * @memberof BingPolyline
     */
    function BingPolyline(_polyline, _map, _layer) {
        var _this = _super.call(this) || this;
        _this._polyline = _polyline;
        _this._map = _map;
        _this._layer = _layer;
        _this._isEditable = true;
        _this._title = '';
        _this._showTooltip = false;
        _this._tooltip = null;
        _this._hasToolTipReceiver = false;
        _this._tooltipVisible = false;
        _this._metadata = new Map();
        return _this;
    }
    Object.defineProperty(BingPolyline.prototype, "Metadata", {
        get: /**
         * Gets the polyline metadata.
         *
         * \@readonly
         * \@memberof BingPolyline
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolyline.prototype, "NativePrimitve", {
        get: /**
         * Gets the Navitve Polyline underlying the model
         *
         * \@readonly
         * \@memberof BingPolyline
         * @return {?}
         */
        function () { return this._polyline; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolyline.prototype, "ShowTooltip", {
        get: /**
         * Gets or sets whether to show the tooltip
         *
         * @abstract
         * \@memberof BingPolyline
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
    Object.defineProperty(BingPolyline.prototype, "Title", {
        get: /**
         * Gets or sets the title off the polyline
         *
         * @abstract
         * \@memberof BingPolyline
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
     * \@memberof BingPolyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    BingPolyline.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        var /** @type {?} */ supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polyline, eventType, function (e) {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            var /** @type {?} */ handlerId_1;
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', function (e) {
                handlerId_1 = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) { return fn(m); });
            });
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', function (e) {
                if (handlerId_1) {
                    Microsoft.Maps.Events.removeHandler(handlerId_1);
                }
            });
        }
    };
    /**
     * Deleted the polyline.
     *
     * \@memberof BingPolyline
     * @return {?}
     */
    BingPolyline.prototype.Delete = /**
     * Deleted the polyline.
     *
     * \@memberof BingPolyline
     * @return {?}
     */
    function () {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    };
    /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    BingPolyline.prototype.GetDraggable = /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    function () {
        return false;
    };
    /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    BingPolyline.prototype.GetEditable = /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._isEditable;
    };
    /**
     * Gets the polyline path.
     *
     * \@memberof BingPolyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    BingPolyline.prototype.GetPath = /**
     * Gets the polyline path.
     *
     * \@memberof BingPolyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    function () {
        var /** @type {?} */ p = this._polyline.getLocations();
        var /** @type {?} */ path = new Array();
        p.forEach(function (l) { return path.push({ latitude: l.latitude, longitude: l.longitude }); });
        return path;
    };
    /**
     * Gets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    BingPolyline.prototype.GetVisible = /**
     * Gets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    function () {
        return this._polyline.getVisible();
    };
    /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof BingPolyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    BingPolyline.prototype.SetDraggable = /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof BingPolyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        throw (new Error('The bing maps implementation currently does not support draggable polylines.'));
    };
    /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof BingPolyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    BingPolyline.prototype.SetEditable = /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof BingPolyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        this._isEditable = editable;
    };
    /**
     * Sets the polyline options
     *
     * \@memberof BingPolyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    BingPolyline.prototype.SetOptions = /**
     * Sets the polyline options
     *
     * \@memberof BingPolyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(/** @type {?} */ (options.path));
        }
    };
    /**
     * Sets the polyline path.
     *
     * \@memberof BingPolyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    BingPolyline.prototype.SetPath = /**
     * Sets the polyline path.
     *
     * \@memberof BingPolyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ p = new Array();
        path.forEach(function (x) { return p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
        this._polyline.setLocations(p);
    };
    /**
     * Sets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    BingPolyline.prototype.SetVisible = /**
     * Sets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polyline.setOptions(/** @type {?} */ ({ visible: visible }));
    };
    /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    BingPolyline.prototype.ManageTooltip = /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showTooltip && this._title != null && this._title !== '') {
            var /** @type {?} */ o = {
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
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', function (e) {
                    _this._tooltip.Set('position', e.location);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', function (e) {
                    if (_this._tooltipVisible && e.location && e.primitive === _this._polyline) {
                        _this._tooltip.Set('position', e.location);
                    }
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', function (e) {
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
    };
    return BingPolyline;
}(Polyline));
/**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
export { BingPolyline };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBTzVDOzs7OztBQUFBO0lBQWtDLHdDQUFRO0lBOER0QyxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxzQkFBb0IsU0FBa0MsRUFBWSxJQUF3QixFQUFZLE1BQTRCO1FBQWxJLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixlQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUFZLFVBQUksR0FBSixJQUFJLENBQW9CO1FBQVksWUFBTSxHQUFOLE1BQU0sQ0FBc0I7NEJBcEVuRyxJQUFJO3VCQUtWLEVBQUU7NkJBQ0ssS0FBSzt5QkFDSixJQUFJO29DQUNFLEtBQUs7Z0NBQ1QsS0FBSzswQkFJRixJQUFJLEdBQUcsRUFBZTs7S0F5RDNEOzBCQWpEVSxrQ0FBUTs7Ozs7Ozs7c0JBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVFyRCx3Q0FBYzs7Ozs7Ozs7c0JBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVNsRSxxQ0FBVzs7Ozs7Ozs7O3NCQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7OztrQkFDdEMsR0FBWTtZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7OzBCQVVkLCtCQUFLOzs7Ozs7Ozs7c0JBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxN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QUFFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUU7aUJBQUU7Z0JBQzdGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUFFO2dCQUM5RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDOUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzthQUNwQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEI7U0FDSjs7dUJBeFRUO0VBV2tDLFFBQVEsRUErU3pDLENBQUE7Ozs7OztBQS9TRCx3QkErU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBCaW5nTWFwTGFiZWwgfSBmcm9tICcuL2JpbmctbGFiZWwnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIGZvciBhIHBvbHlsaW5lIG1vZGVsIGZvciBCaW5nIE1hcHMgVjguXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWxpbmUgZXh0ZW5kcyBQb2x5bGluZSBpbXBsZW1lbnRzIFBvbHlsaW5lIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaXNFZGl0YWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBCaW5nTWFwTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdmVyTGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tb3VzZU1vdmVMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21vdXNlT3V0TGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBOYXZpdHZlIFBvbHlsaW5lIHVuZGVybHlpbmcgdGhlIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUgeyByZXR1cm4gdGhpcy5fcG9seWxpbmU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rvb2x0aXAgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxyXG4gICAgcHVibGljIHNldCBUaXRsZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIGNvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gX3BvbHlsaW5lIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZX0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcCAtIFRoZSBjb250ZXh0IG1hcC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lLCBwcm90ZWN0ZWQgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwLCBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnIF07XHJcbiAgICAgICAgaWYgKHN1cHBvcnRlZEV2ZW50cy5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbihlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVySWQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdmVyJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVySWQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCBtID0+IGZuKG0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdXQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVySWQpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIoaGFuZGxlcklkKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7IHRoaXMuX2xheWVyLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTsgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZW50aXRpZXMucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLThcclxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRFZGl0YWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gdGhpcy5fcG9seWxpbmUuZ2V0TG9jYXRpb25zKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgIHAuZm9yRWFjaChsID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiBsLmxhdGl0dWRlLCBsb25naXR1ZGU6IGwubG9uZ2l0dWRlIH0pKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZS5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlsaW5lIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLThcclxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgdGhyb3cobmV3IEVycm9yKCdUaGUgYmluZyBtYXBzIGltcGxlbWVudGF0aW9uIGN1cnJlbnRseSBkb2VzIG5vdCBzdXBwb3J0IGRyYWdnYWJsZSBwb2x5bGluZXMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlsaW5lIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlsaW5lIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGUgPSBlZGl0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+b3B0aW9ucy5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZXMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcclxuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lLnNldExvY2F0aW9ucyhwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5bGluZSB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0T3B0aW9ucyg8TWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucz57IHZpc2libGU6IHZpc2libGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcCh0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lLCAnbW91c2VvdmVyJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUgJiYgZS5sb2NhdGlvbiAmJiBlLnByaW1pdGl2ZSA9PT0gdGhpcy5fcG9seWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU91dExpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZSwgJ21vdXNlb3V0JywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKSA7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==