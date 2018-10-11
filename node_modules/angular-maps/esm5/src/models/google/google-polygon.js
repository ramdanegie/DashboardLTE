/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { GoogleConversions } from '../../services/google/google-conversions';
import { Polygon } from '../polygon';
import { GoogleMapLabel } from './google-label';
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
GooglePolygon = /** @class */ (function (_super) {
    tslib_1.__extends(GooglePolygon, _super);
    ///
    /// constructor
    ///
    /**
     * Creates an instance of GooglePolygon.
     * @param _polygon - The {@link GoogleMapTypes.Polygon} underlying the model.
     *
     * @memberof GooglePolygon
     */
    function GooglePolygon(_polygon) {
        var _this = _super.call(this) || this;
        _this._polygon = _polygon;
        _this._title = '';
        _this._showLabel = false;
        _this._showTooltip = false;
        _this._maxZoom = -1;
        _this._minZoom = -1;
        _this._label = null;
        _this._tooltip = null;
        _this._tooltipVisible = false;
        _this._hasToolTipReceiver = false;
        _this._mouseOverListener = null;
        _this._mouseOutListener = null;
        _this._mouseMoveListener = null;
        _this._metadata = new Map();
        _this._editingCompleteEmitter = null;
        _this._originalPath = _this.GetPaths();
        return _this;
    }
    Object.defineProperty(GooglePolygon.prototype, "LabelMaxZoom", {
        get: /**
         * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
         *
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._maxZoom; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._maxZoom = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "LabelMinZoom", {
        get: /**
         * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
         *
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._minZoom; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._minZoom = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "Metadata", {
        get: /**
         * Gets the polygon metadata.
         *
         * \@readonly
         * \@memberof GoolePolygon
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the polygon, in this case {\@link GoogleMapTypes.Polygon}
         *
         * \@readonly
         * \@memberof GooglePolygon
         * @return {?}
         */
        function () { return this._polygon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "ShowLabel", {
        get: /**
         * Gets or sets whether to show the label
         *
         * @abstract
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._showLabel; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showLabel = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "ShowTooltip", {
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
    Object.defineProperty(GooglePolygon.prototype, "Title", {
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
            this.ManageLabel();
            this.ManageTooltip();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a delegate for an event.
     *
     * \@memberof GooglePolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    GooglePolygon.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof GooglePolygon
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
            this._polygon.addListener(eventType, fn);
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    };
    /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.Delete = /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    function () {
        this._polygon.setMap(null);
        if (this._label) {
            this._label.Delete();
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    };
    /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GooglePolygon.prototype.GetDraggable = /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    function () {
        return this._polygon.getDraggable();
    };
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GooglePolygon.prototype.GetEditable = /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._polygon.getEditable();
    };
    /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GooglePolygon.prototype.GetPath = /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    function () {
        var /** @type {?} */ p = this._polygon.getPath();
        var /** @type {?} */ path = new Array();
        p.forEach(function (x) { return path.push({ latitude: x.lat(), longitude: x.lng() }); });
        return path;
    };
    /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GooglePolygon.prototype.GetPaths = /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    function () {
        var /** @type {?} */ p = this._polygon.getPaths();
        var /** @type {?} */ paths = new Array();
        p.forEach(function (x) {
            var /** @type {?} */ path = new Array();
            x.forEach(function (y) { return path.push({ latitude: y.lat(), longitude: y.lng() }); });
            paths.push(path);
        });
        return paths;
    };
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GooglePolygon.prototype.GetVisible = /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    function () {
        return this._polygon.getVisible();
    };
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetDraggable = /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        this._polygon.setDraggable(draggable);
    };
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetEditable = /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        var /** @type {?} */ previous = this._polygon.getEditable();
        this._polygon.setEditable(editable);
        if (previous && !editable && this._editingCompleteEmitter) {
            this._editingCompleteEmitter({
                Click: null,
                Polygon: this,
                OriginalPath: this._originalPath,
                NewPath: this.GetPaths()
            });
            this._originalPath = this.GetPaths();
        }
    };
    /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetOptions = /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = GoogleConversions.TranslatePolygonOptions(options);
        if (typeof o.editable !== 'undefined') {
            this.SetEditable(o.editable);
            delete o.editable;
        }
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
    };
    /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetPath = /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ p = new Array();
        path.forEach(function (x) { return p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
        this._polygon.setPath(p);
        this._originalPath = [path];
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    };
    /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetPaths = /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    function (paths) {
        if (paths == null) {
            return;
        }
        if (!Array.isArray(paths)) {
            return;
        }
        if (paths.length === 0) {
            this._polygon.setPaths(new Array());
            if (this._label) {
                this._label.Delete();
                this._label = null;
            }
            return;
        }
        if (Array.isArray(paths[0])) {
            // parameter is an array or arrays
            var /** @type {?} */ p_1 = new Array();
            (/** @type {?} */ (paths)).forEach(function (path) {
                var /** @type {?} */ _p = new Array();
                path.forEach(function (x) { return _p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
                p_1.push(_p);
            });
            this._polygon.setPaths(p_1);
            this._originalPath = /** @type {?} */ (paths);
            if (this._label) {
                this._centroid = null;
                this.ManageLabel();
            }
        }
        else {
            // parameter is a simple array....
            this.SetPath(/** @type {?} */ (paths));
        }
    };
    /**
     * Sets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetVisible = /**
     * Sets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polygon.setVisible(visible);
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    };
    /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.ManageLabel = /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    function () {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            var /** @type {?} */ o = {
                text: this._title,
                position: GoogleConversions.TranslateLocationObject(this.Centroid)
            };
            if (o["position"] == null) {
                return;
            }
            if (this._minZoom !== -1) {
                o["minZoom"] = this._minZoom;
            }
            if (this._maxZoom !== -1) {
                o["maxZoom"] = this._maxZoom;
            }
            if (this._label == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                this._label = new GoogleMapLabel(o);
            }
            else {
                this._label.SetValues(o);
            }
            this._label.Set('hidden', !this.GetVisible());
        }
        else {
            if (this._label) {
                this._label.SetMap(null);
                this._label = null;
            }
        }
    };
    /**
     * Configures the tooltip for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.ManageTooltip = /**
     * Configures the tooltip for the polygon
     * \@memberof GooglePolygon
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
    return GooglePolygon;
}(Polygon));
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export { GooglePolygon };
function GooglePolygon_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolygon.prototype._title;
    /** @type {?} */
    GooglePolygon.prototype._showLabel;
    /** @type {?} */
    GooglePolygon.prototype._showTooltip;
    /** @type {?} */
    GooglePolygon.prototype._maxZoom;
    /** @type {?} */
    GooglePolygon.prototype._minZoom;
    /** @type {?} */
    GooglePolygon.prototype._label;
    /** @type {?} */
    GooglePolygon.prototype._tooltip;
    /** @type {?} */
    GooglePolygon.prototype._tooltipVisible;
    /** @type {?} */
    GooglePolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    GooglePolygon.prototype._originalPath;
    /** @type {?} */
    GooglePolygon.prototype._mouseOverListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseOutListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseMoveListener;
    /** @type {?} */
    GooglePolygon.prototype._metadata;
    /** @type {?} */
    GooglePolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    GooglePolygon.prototype._polygon;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFVaEQ7Ozs7O0FBQUE7SUFBbUMseUNBQU87SUFzR3RDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7OztPQUtHO0lBQ0gsdUJBQW9CLFFBQWdDO1FBQXBELFlBQ0ksaUJBQU8sU0FFVjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUF3Qjt1QkE5RzNCLEVBQUU7MkJBQ0csS0FBSzs2QkFDSCxLQUFLO3lCQUNWLENBQUMsQ0FBQzt5QkFDRixDQUFDLENBQUM7dUJBQ0ksSUFBSTt5QkFDRixJQUFJO2dDQUNKLEtBQUs7b0NBQ0QsS0FBSzttQ0FFbUIsSUFBSTtrQ0FDTCxJQUFJO21DQUNILElBQUk7MEJBQzdCLElBQUksR0FBRyxFQUFlO3dDQUNNLElBQUk7UUFrR2xFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztLQUN4QzswQkF2RlUsdUNBQVk7Ozs7Ozs7O3NCQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztrQkFDakMsR0FBVztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OzBCQVNaLHVDQUFZOzs7Ozs7OztzQkFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7a0JBQ2pDLEdBQVc7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FB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OlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25FdmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tZXZlbnQnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XHJcbmltcG9ydCB7IEdvb2dsZU1hcExhYmVsIH0gZnJvbSAnLi9nb29nbGUtbGFiZWwnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgYSBwb2x5Z29uIG1vZGVsIGZvciBHb29nbGUgTWFwcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBvbHlnb24gZXh0ZW5kcyBQb2x5Z29uIGltcGxlbWVudHMgUG9seWdvbiB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfc2hvd0xhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zaG93VG9vbHRpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWF4Wm9vbTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9taW5ab29tOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX2xhYmVsOiBHb29nbGVNYXBMYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBHb29nbGVNYXBMYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9vcmlnaW5hbFBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj47XHJcbiAgICBwcml2YXRlIF9tb3VzZU92ZXJMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VNb3ZlTGlzdGVuZXI6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICAgIHByaXZhdGUgX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXI6IChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZCA9IG51bGw7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMYWJlbE1heFpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heFpvb207IH1cclxuICAgIHB1YmxpYyBzZXQgTGFiZWxNYXhab29tKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbWF4Wm9vbSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTGFiZWxNaW5ab29tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW5ab29tOyB9XHJcbiAgICBwdWJsaWMgc2V0IExhYmVsTWluWm9vbSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX21pblpvb20gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBtZXRhZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29sZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5Z29uLCBpbiB0aGlzIGNhc2Uge0BsaW5rIEdvb2dsZU1hcFR5cGVzLlBvbHlnb259XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24geyByZXR1cm4gdGhpcy5fcG9seWdvbjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gc2hvdyB0aGUgbGFiZWxcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBTaG93TGFiZWwoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93TGFiZWw7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93VG9vbHRpcDsgfVxyXG4gICAgcHVibGljIHNldCBTaG93VG9vbHRpcCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93VG9vbHRpcCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5Z29uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgVGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9XHJcbiAgICBwdWJsaWMgc2V0IFRpdGxlKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIGNvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlUG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBfcG9seWdvbiAtIFRoZSB7QGxpbmsgR29vZ2xlTWFwVHlwZXMuUG9seWdvbn0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWdvbjogR29vZ2xlTWFwVHlwZXMuUG9seWdvbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFtcclxuICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgJ2RibGNsaWNrJyxcclxuICAgICAgICAgICAgJ2RyYWcnLCAnZHJhZ2VuZCcsXHJcbiAgICAgICAgICAgICdkcmFnc3RhcnQnLFxyXG4gICAgICAgICAgICAnbW91c2Vkb3duJyxcclxuICAgICAgICAgICAgJ21vdXNlbW92ZScsXHJcbiAgICAgICAgICAgICdtb3VzZW91dCcsXHJcbiAgICAgICAgICAgICdtb3VzZW92ZXInLFxyXG4gICAgICAgICAgICAnbW91c2V1cCcsXHJcbiAgICAgICAgICAgICdyaWdodGNsaWNrJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHN1cHBvcnRlZEV2ZW50cy5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb24uYWRkTGlzdGVuZXIoZXZlbnRUeXBlLCBmbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdwYXRoY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlciA9IDwoZXZlbnQ6IElQb2x5Z29uRXZlbnQpID0+IHZvaWQ+Zm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlZCB0aGUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5EZWxldGUoKTsgfVxyXG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7IHRoaXMuX3Rvb2x0aXAuRGVsZXRlKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbi5nZXREcmFnZ2FibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RWRpdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb24uZ2V0RWRpdGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0cyBkZXNjcmliaW5nIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gdGhpcy5fcG9seWdvbi5nZXRQYXRoKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgIHAuZm9yRWFjaCh4ID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiB4LmxhdCgpLCBsb25naXR1ZGU6IHgubG5nKCkgfSkpO1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0cyBkZXNjcmliaW5nIG11bHRpcGxlIHBvbHlnb24gcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGhzKCk6IEFycmF5PEFycmF5PElMYXRMb25nPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gdGhpcy5fcG9seWdvbi5nZXRQYXRocygpO1xyXG4gICAgICAgIGNvbnN0IHBhdGhzOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gbmV3IEFycmF5PEFycmF5PElMYXRMb25nPj4oKTtcclxuICAgICAgICBwLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICAgICAgeC5mb3JFYWNoKHkgPT4gcGF0aC5wdXNoKHsgbGF0aXR1ZGU6IHkubGF0KCksIGxvbmdpdHVkZTogeS5sbmcoKSB9KSk7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbi5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWdvbiBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlnb24gcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5fcG9seWdvbi5nZXRFZGl0YWJsZSgpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0RWRpdGFibGUoZWRpdGFibGUpO1xyXG4gICAgICAgIGlmIChwcmV2aW91cyAmJiAhZWRpdGFibGUgJiYgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyKHtcclxuICAgICAgICAgICAgICAgIENsaWNrOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgUG9seWdvbjogdGhpcyxcclxuICAgICAgICAgICAgICAgIE9yaWdpbmFsUGF0aDogdGhpcy5fb3JpZ2luYWxQYXRoLFxyXG4gICAgICAgICAgICAgICAgTmV3UGF0aDogdGhpcy5HZXRQYXRocygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcclxuICAgICAqIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvLmVkaXRhYmxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLlNldEVkaXRhYmxlKG8uZWRpdGFibGUpO1xyXG4gICAgICAgICAgICBkZWxldGUgby5lZGl0YWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0T3B0aW9ucyhvKTtcclxuICAgICAgICBpZiAob3B0aW9ucy52aXNpYmxlICE9IG51bGwgJiYgdGhpcy5fc2hvd0xhYmVsICYmIHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIW9wdGlvbnMudmlzaWJsZSk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcclxuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IGdvb2dsZS5tYXBzLkxhdExuZyh4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFBhdGgocCk7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gW3BhdGhdO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gcGF0aCBvciBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aHMgQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfVxyXG4gICAgICogKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aChzKS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF0aHMpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRQYXRocyhuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5EZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGhzWzBdKSkge1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb3IgYXJyYXlzXHJcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gbmV3IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+KCk7XHJcbiAgICAgICAgICAgICg8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocykuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9wOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcclxuICAgICAgICAgICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IF9wLnB1c2gobmV3IGdvb2dsZS5tYXBzLkxhdExuZyh4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICAgICAgICAgIHAucHVzaChfcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFBhdGhzKHApO1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYSBzaW1wbGUgYXJyYXkuLi4uXHJcbiAgICAgICAgICAgIHRoaXMuU2V0UGF0aCg8QXJyYXk8SUxhdExvbmc+PnBhdGhzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5Z29uIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRWaXNpYmxlKHZpc2libGUpO1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhdmlzaWJsZSk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyB0aGUgbGFiZWwgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZUxhYmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkdldFBhdGggPT0gbnVsbCB8fCB0aGlzLkdldFBhdGgoKS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl90aXRsZSAhPSBudWxsICYmIHRoaXMuX3RpdGxlICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QodGhpcy5DZW50cm9pZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKG8ucG9zaXRpb24gPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21pblpvb20gIT09IC0xKSB7IG8ubWluWm9vbSA9IHRoaXMuX21pblpvb207IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21heFpvb20gIT09IC0xKSB7IG8ubWF4Wm9vbSA9IHRoaXMuX21heFpvb207IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG8ubWFwID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5nZXRNYXAoKTtcclxuICAgICAgICAgICAgICAgIG8uekluZGV4ID0gdGhpcy5OYXRpdmVQcmltaXR2ZS56SW5kZXggPyB0aGlzLk5hdGl2ZVByaW1pdHZlLnpJbmRleCArIDEgOiAxMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBHb29nbGVNYXBMYWJlbChvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF0aGlzLkdldFZpc2libGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgby5tYXAgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmdldE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgby56SW5kZXggPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbmV3IEdvb2dsZU1hcExhYmVsKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBlLmxhdExuZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuYWRkTGlzdGVuZXIoJ21vdXNlbW92ZScsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7IHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU91dExpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==