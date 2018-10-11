/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polygon } from '../polygon';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
var /**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
BingPolygon = /** @class */ (function (_super) {
    tslib_1.__extends(BingPolygon, _super);
    ///
    /// constructor
    ///
    /**
     * Creates an instance of BingPolygon.
     * @param _polygon - The {@link Microsoft.Maps.Polygon} underlying the model.
     * @param _mapService Instance of the Map Service.
     * @param _layer - The context layer.
     * @memberof BingPolygon
     */
    function BingPolygon(_polygon, _mapService, _layer) {
        var _this = _super.call(this) || this;
        _this._polygon = _polygon;
        _this._mapService = _mapService;
        _this._layer = _layer;
        _this._map = null;
        _this._isEditable = false;
        _this._title = '';
        _this._maxZoom = -1;
        _this._minZoom = -1;
        _this._showLabel = false;
        _this._showTooltip = false;
        _this._label = null;
        _this._tooltip = null;
        _this._hasToolTipReceiver = false;
        _this._tooltipVisible = false;
        _this._metadata = new Map();
        _this._map = _this._mapService.MapInstance;
        _this._originalPath = _this.GetPaths();
        return _this;
    }
    Object.defineProperty(BingPolygon.prototype, "LabelMaxZoom", {
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
    Object.defineProperty(BingPolygon.prototype, "LabelMinZoom", {
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
    Object.defineProperty(BingPolygon.prototype, "Metadata", {
        get: /**
         * Gets the polygon metadata.
         *
         * \@readonly
         * \@memberof BingPolygon
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the polygon, in this case {\@link Microsoft.Maps.Polygon}
         *
         * \@readonly
         * \@memberof BingPolygon
         * @return {?}
         */
        function () { return this._polygon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "ShowLabel", {
        get: /**
         * Gets or sets whether to show the label
         *
         * @abstract
         * \@memberof BingPolygon
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
    Object.defineProperty(BingPolygon.prototype, "ShowTooltip", {
        get: /**
         * Gets or sets whether to show the tooltip
         *
         * @abstract
         * \@memberof BingPolygon
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
    Object.defineProperty(BingPolygon.prototype, "Title", {
        get: /**
         * Gets or sets the title off the polygon
         *
         * @abstract
         * \@memberof BingPolygon
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
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    BingPolygon.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        var /** @type {?} */ supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polygon, eventType, function (e) {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            var /** @type {?} */ handlerId_1;
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                handlerId_1 = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) { return fn(m); });
            });
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                if (handlerId_1) {
                    Microsoft.Maps.Events.removeHandler(handlerId_1);
                }
            });
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    };
    /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    BingPolygon.prototype.Delete = /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    function () {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
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
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    BingPolygon.prototype.GetDraggable = /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    function () {
        return false;
    };
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    BingPolygon.prototype.GetEditable = /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._isEditable;
    };
    /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    BingPolygon.prototype.GetPath = /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    function () {
        var /** @type {?} */ p = this._polygon.getLocations();
        var /** @type {?} */ path = new Array();
        p.forEach(function (l) { return path.push({ latitude: l.latitude, longitude: l.longitude }); });
        return path;
    };
    /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    BingPolygon.prototype.GetPaths = /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    function () {
        var /** @type {?} */ p = this._polygon.getRings();
        var /** @type {?} */ paths = new Array();
        p.forEach(function (x) {
            var /** @type {?} */ path = new Array();
            x.forEach(function (y) { return path.push({ latitude: y.latitude, longitude: y.longitude }); });
            paths.push(path);
        });
        return paths;
    };
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    BingPolygon.prototype.GetVisible = /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    function () {
        return this._polygon.getVisible();
    };
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetDraggable = /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        //      ?forum=bingmaps
        throw (new Error('The bing maps implementation currently does not support draggable polygons.'));
    };
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetEditable = /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        var _this = this;
        var /** @type {?} */ isChanged = this._isEditable !== editable;
        this._isEditable = editable;
        if (!isChanged) {
            return;
        }
        if (this._isEditable) {
            this._originalPath = this.GetPaths();
            this._mapService.GetDrawingTools().then(function (t) {
                t.edit(_this._polygon);
            });
        }
        else {
            this._mapService.GetDrawingTools().then(function (t) {
                t.finish(function (editedPolygon) {
                    if (editedPolygon !== _this._polygon || !_this._editingCompleteEmitter) {
                        return;
                    }
                    var /** @type {?} */ newPath = _this.GetPaths();
                    var /** @type {?} */ originalPath = _this._originalPath;
                    _this.SetPaths(newPath);
                    // this is necessary for the new path to persist it appears.
                    // this is necessary for the new path to persist it appears.
                    _this._editingCompleteEmitter({
                        Click: null,
                        Polygon: _this,
                        OriginalPath: originalPath,
                        NewPath: newPath
                    });
                });
            });
        }
    };
    /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetOptions = /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
        if (typeof options.editable !== 'undefined') {
            this.SetEditable(options.editable);
        }
    };
    /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetPath = /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ p = new Array();
        path.forEach(function (x) { return p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
        this._originalPath = [path];
        this._polygon.setLocations(p);
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    };
    /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    BingPolygon.prototype.SetPaths = /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
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
            this._polygon.setRings(new Array());
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
                path.forEach(function (x) { return _p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
                p_1.push(_p);
            });
            this._originalPath = /** @type {?} */ (paths);
            this._polygon.setRings(p_1);
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
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetVisible = /**
     * Sets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polygon.setOptions(/** @type {?} */ ({ visible: visible }));
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    };
    /**
     * Configures the label for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    BingPolygon.prototype.ManageLabel = /**
     * Configures the label for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    function () {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            var /** @type {?} */ o = {
                text: this._title,
                position: BingConversions.TranslateLocation(this.Centroid)
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
                this._label = new BingMapLabel(o);
                this._label.SetMap(this._map);
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
     * \@memberof Polygon
     * @return {?}
     */
    BingPolygon.prototype.ManageTooltip = /**
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
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                    _this._tooltip.Set('position', e.location);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                    _this._mouseMoveListener = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) {
                        if (_this._tooltipVisible && m.location && m.primitive === _this._polygon) {
                            _this._tooltip.Set('position', m.location);
                        }
                    });
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', true);
                        _this._tooltipVisible = false;
                    }
                    if (_this._mouseMoveListener) {
                        Microsoft.Maps.Events.removeHandler(_this._mouseMoveListener);
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
    return BingPolygon;
}(Polygon));
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
export { BingPolygon };
function BingPolygon_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolygon.prototype._map;
    /** @type {?} */
    BingPolygon.prototype._isEditable;
    /** @type {?} */
    BingPolygon.prototype._title;
    /** @type {?} */
    BingPolygon.prototype._maxZoom;
    /** @type {?} */
    BingPolygon.prototype._minZoom;
    /** @type {?} */
    BingPolygon.prototype._showLabel;
    /** @type {?} */
    BingPolygon.prototype._showTooltip;
    /** @type {?} */
    BingPolygon.prototype._label;
    /** @type {?} */
    BingPolygon.prototype._tooltip;
    /** @type {?} */
    BingPolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolygon.prototype._tooltipVisible;
    /** @type {?} */
    BingPolygon.prototype._mouseOverListener;
    /** @type {?} */
    BingPolygon.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolygon.prototype._mouseOutListener;
    /** @type {?} */
    BingPolygon.prototype._metadata;
    /** @type {?} */
    BingPolygon.prototype._originalPath;
    /** @type {?} */
    BingPolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    BingPolygon.prototype._polygon;
    /** @type {?} */
    BingPolygon.prototype._mapService;
    /** @type {?} */
    BingPolygon.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7OztBQU81Qzs7Ozs7QUFBQTtJQUFpQyx1Q0FBTztJQTJHcEMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gscUJBQ1ksVUFDRSxXQUEyQixFQUMzQixNQUE0QjtRQUgxQyxZQUtJLGlCQUFPLFNBR1Y7UUFQVyxjQUFRLEdBQVIsUUFBUTtRQUNOLGlCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixZQUFNLEdBQU4sTUFBTSxDQUFzQjtxQkFwSFAsSUFBSTs0QkFDUixLQUFLO3VCQUNYLEVBQUU7eUJBQ0EsQ0FBQyxDQUFDO3lCQUNGLENBQUMsQ0FBQzsyQkFDQyxLQUFLOzZCQUNILEtBQUs7dUJBQ04sSUFBSTt5QkFDRixJQUFJO29DQUNFLEtBQUs7Z0NBQ1QsS0FBSzswQkFJRixJQUFJLEdBQUcsRUFBZTtRQXlHeEQsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7S0FDeEM7MEJBN0ZVLHFDQUFZOzs7Ozs7OztzQkFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7a0JBQ2pDLEdBQVc7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OzswQkFTWixxQ0FB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LGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFBRTtnQkFDNUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzlGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUFFO2dCQUM5RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2FBQ3BDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN4QjtTQUNKOztzQkFqZlQ7RUFhaUMsT0FBTyxFQXVldkMsQ0FBQTs7Ozs7O0FBdmVELHVCQXVlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdNYXBMYWJlbCB9IGZyb20gJy4vYmluZy1sYWJlbCc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEgcG9seWdvbiBtb2RlbCBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlnb24gZXh0ZW5kcyBQb2x5Z29uIGltcGxlbWVudHMgUG9seWdvbiB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2lzRWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX21heFpvb206IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbWluWm9vbTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9zaG93TGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9sYWJlbDogQmluZ01hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IEJpbmdNYXBMYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9oYXNUb29sVGlwUmVjZWl2ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tb3VzZU92ZXJMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21vdXNlTW92ZUxpc3RlbmVyOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICAgIHByaXZhdGUgX29yaWdpbmFsUGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PjtcclxuICAgIHByaXZhdGUgX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXI6IChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4Wm9vbTsgfVxyXG4gICAgcHVibGljIHNldCBMYWJlbE1heFpvb20odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tYXhab29tID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMYWJlbE1pblpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pblpvb207IH1cclxuICAgIHB1YmxpYyBzZXQgTGFiZWxNaW5ab29tKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbWluWm9vbSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbiwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29ufVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiB7IHJldHVybiB0aGlzLl9wb2x5Z29uOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBTaG93TGFiZWwoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93TGFiZWw7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rvb2x0aXAgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH1cclxuICAgIHB1YmxpYyBzZXQgVGl0bGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gY29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBfcG9seWdvbiAtIFRoZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbn0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgSW5zdGFuY2Ugb2YgdGhlIE1hcCBTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9sYXllciAtIFRoZSBjb250ZXh0IGxheWVyLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3BvbHlnb246IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24sXHJcbiAgICAgICAgcHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcixcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnXTtcclxuICAgICAgICBpZiAoc3VwcG9ydGVkRXZlbnRzLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWdvbiwgZXZlbnRUeXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm4oZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnbW91c2Vtb3ZlJykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlcklkOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wb2x5Z29uLCAnbW91c2VvdmVyJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVySWQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCBtID0+IGZuKG0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlnb24sICdtb3VzZW91dCcsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXJJZCkgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcihoYW5kbGVySWQpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gaWYgKGV2ZW50VHlwZSA9PT0gJ3BhdGhjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyID0gPChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZD5mbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllcikgeyB0aGlzLl9sYXllci5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmVudGl0aWVzLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLkRlbGV0ZSgpOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHsgdGhpcy5fdG9vbHRpcC5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gQmluZyBwb2x5Z29ucyBhcmUgbm90IGRyYWdnYWJsZSBieSBkZWZhdWx0LlxyXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cclxuICAgICAgICAvLy8gICAgIDdhYWFlNzQ4LTRkNWYtNGJlNS1hN2JiLTkwNDk4ZTA4YjQxYy9ob3ctY2FuLWktbWFrZS1wb2x5Z29ucG9seWxpbmUtZHJhZ2dhYmxlLWluLWJpbmctbWFwcy04P1xyXG4gICAgICAgIC8vLyAgICAgZm9ydW09YmluZ21hcHNcclxuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEVkaXRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VkaXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSB0aGlzLl9wb2x5Z29uLmdldExvY2F0aW9ucygpO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICBwLmZvckVhY2gobCA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogbC5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBsLmxvbmdpdHVkZSB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGhzKCk6IEFycmF5PEFycmF5PElMYXRMb25nPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSB0aGlzLl9wb2x5Z29uLmdldFJpbmdzKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBuZXcgQXJyYXk8QXJyYXk8SUxhdExvbmc+PigpO1xyXG4gICAgICAgIHAuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgICAgICB4LmZvckVhY2goeSA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeS5sYXRpdHVkZSwgbG9uZ2l0dWRlOiB5LmxvbmdpdHVkZSB9KSk7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb24uZ2V0VmlzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlnb24gZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gQmluZyBwb2x5Z29ucyBhcmUgbm90IGRyYWdnYWJsZSBieSBkZWZhdWx0LlxyXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cclxuICAgICAgICAvLy8gICAgIDdhYWFlNzQ4LTRkNWYtNGJlNS1hN2JiLTkwNDk4ZTA4YjQxYy9ob3ctY2FuLWktbWFrZS1wb2x5Z29ucG9seWxpbmUtZHJhZ2dhYmxlLWluLWJpbmctbWFwcy04XHJcbiAgICAgICAgLy8gICAgICA/Zm9ydW09YmluZ21hcHNcclxuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1RoZSBiaW5nIG1hcHMgaW1wbGVtZW50YXRpb24gY3VycmVudGx5IGRvZXMgbm90IHN1cHBvcnQgZHJhZ2dhYmxlIHBvbHlnb25zLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlnb24gcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0aGlzLl9pc0VkaXRhYmxlICE9PSBlZGl0YWJsZTtcclxuICAgICAgICB0aGlzLl9pc0VkaXRhYmxlID0gZWRpdGFibGU7XHJcbiAgICAgICAgaWYgKCFpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldERyYXdpbmdUb29scygpLnRoZW4odCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0LmVkaXQodGhpcy5fcG9seWdvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXREcmF3aW5nVG9vbHMoKS50aGVuKHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdC5maW5pc2goKGVkaXRlZFBvbHlnb246IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGVkUG9seWdvbiAhPT0gdGhpcy5fcG9seWdvbiB8fCAhdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5fb3JpZ2luYWxQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2V0UGF0aHMobmV3UGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciB0aGUgbmV3IHBhdGggdG8gcGVyc2lzdCBpdCBhcHBlYXJzLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljazogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9seWdvbjogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luYWxQYXRoOiBvcmlnaW5hbFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ld1BhdGg6IG5ld1BhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCAmJiB0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhb3B0aW9ucy52aXNpYmxlKTsgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWRpdGFibGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RWRpdGFibGUob3B0aW9ucy5lZGl0YWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gcC5wdXNoKG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbih4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSBbcGF0aF07XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRMb2NhdGlvbnMocCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWdvbiBwYXRoIG9yIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoc1xyXG4gICAgICogQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoKHMpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF0aHMpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRSaW5ncyhuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IG5ldyBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+KCk7XHJcbiAgICAgICAgICAgICg8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocykuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9wOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBfcC5wdXNoKG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbih4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICAgICAgICAgIHAucHVzaChfcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocztcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRSaW5ncyhwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cGF0aHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlnb24gdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKDxNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnM+eyB2aXNpYmxlOiB2aXNpYmxlIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhdmlzaWJsZSk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyB0aGUgbGFiZWwgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZUxhYmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkdldFBhdGggPT0gbnVsbCB8fCB0aGlzLkdldFBhdGgoKS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl90aXRsZSAhPSBudWxsICYmIHRoaXMuX3RpdGxlICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHRoaXMuQ2VudHJvaWQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChvLnBvc2l0aW9uID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9taW5ab29tICE9PSAtMSkgeyBvLm1pblpvb20gPSB0aGlzLl9taW5ab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhab29tICE9PSAtMSkgeyBvLm1heFpvb20gPSB0aGlzLl9tYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRNYXAodGhpcy5fbWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF0aGlzLkdldFZpc2libGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcCh0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbiwgJ21vdXNlb3ZlcicsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIChtOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUgJiYgbS5sb2NhdGlvbiAmJiBtLnByaW1pdGl2ZSA9PT0gdGhpcy5fcG9seWdvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBtLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29uLCAnbW91c2VvdXQnLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==