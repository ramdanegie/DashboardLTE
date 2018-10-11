/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { Polyline } from '../models/polyline';
/**
 * internal counter to use as ids for polylines.
 */
var /** @type {?} */ layerId = 1000000;
/**
 * MapPolylineLayerDirective performantly renders a large set of polyline on a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polyline-layer [PolygonOptions]="_polyline"></x-map-polyline-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolylineLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolylineLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolylineLayerDirective
     */
    function MapPolylineLayerDirective(_layerService, _mapService, _zone) {
        this._layerService = _layerService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._labels = new Array();
        this._tooltipSubscriptions = new Array();
        this._tooltipVisible = false;
        this._defaultOptions = {
            fontSize: 11,
            fontFamily: 'sans-serif',
            strokeWeight: 2,
            strokeColor: '#000000',
            fontColor: '#ffffff'
        };
        this._streaming = false;
        this._polylines = new Array();
        this._polylinesLast = new Array();
        /**
         * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polylines titles as the labels on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polylines as the tooltips on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polyline in a layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolylineLayerDirective.prototype, "PolylineOptions", {
        /**
         * An array of polyline options representing the polylines in the layer.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * An array of polyline options representing the polylines in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._polylines; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polylinesLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polylines).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polylines = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "TreatNewPolylineOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._streaming; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._streaming = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the polyline layer.
         *
         * \@readonly
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(function () {
            var /** @type {?} */ fakeLayerDirective = {
                Id: _this._id,
                Visible: _this.Visible,
                LayerOffset: _this.LayerOffset,
                ZIndex: _this.ZIndex
            };
            _this._layerService.AddLayer(fakeLayerDirective);
            _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
            Promise.all([
                _this._layerPromise,
                _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
            ]).then(function (values) {
                values[0].SetVisible(_this.Visible);
                _this._canvas = values[1];
                _this._canvas._canvasReady.then(function (b) {
                    _this._tooltip = _this._canvas.GetToolTipOverlay();
                    _this.ManageTooltip(_this.ShowTooltips);
                });
                if (_this.PolylineOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolylines(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._layerPromise.then(function (l) {
            l.Delete();
        });
        if (this._canvas) {
            this._canvas.Delete();
        }
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolylineOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolylines();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
            (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
            (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
            if (this._canvas) {
                this._canvas.Redraw(true);
            }
        }
        if (changes['ShowTooltips'] && this._tooltip) {
            this.ManageTooltip(changes['ShowTooltips'].currentValue);
        }
    };
    /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    MapPolylineLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    function () { return 'MapPolylineLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        var /** @type {?} */ handlers = [
            { name: 'click', handler: function (ev) { return _this.PolylineClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolylineDblClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolylineMouseMove.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolylineMouseOut.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolylineMouseOver.emit({ Polyline: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawLabels = /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    function (el) {
        var _this = this;
        if (this.ShowLabels) {
            this._mapService.GetZoom().then(function (z) {
                if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                    var /** @type {?} */ ctx_1 = el.getContext('2d');
                    var /** @type {?} */ labels_1 = _this._labels.map(function (x) { return x.title; });
                    _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                        var /** @type {?} */ size = _this._mapService.MapSize;
                        for (var /** @type {?} */ i = 0, /** @type {?} */ len = locs.length; i < len; i++) {
                            // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                            if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                _this.DrawText(ctx_1, locs[i], labels_1[i]);
                            }
                        }
                    });
                }
            });
        }
    };
    /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawText = /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    function (ctx, loc, text) {
        var /** @type {?} */ lo = this.LabelOptions;
        if (lo == null && this._tooltip) {
            lo = this._tooltip.DefaultLabelStyle;
        }
        if (lo == null) {
            lo = this._defaultOptions;
        }
        ctx.strokeStyle = lo.strokeColor;
        ctx.font = lo.fontSize + "px " + lo.fontFamily;
        ctx.textAlign = 'center';
        var /** @type {?} */ strokeWeight = lo.strokeWeight;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, loc.x, loc.y);
        }
        ctx.fillStyle = lo.fontColor;
        ctx.fillText(text, loc.x, loc.y);
    };
    /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ManageTooltip = /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    function (show) {
        var _this = this;
        if (show && this._canvas) {
            // add tooltip subscriptions
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
            this._tooltipSubscriptions.push(this.PolylineMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    var /** @type {?} */ loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOver.asObservable().subscribe(function (e) {
                if (e.Polyline.Title && e.Polyline.Title.length > 0) {
                    var /** @type {?} */ loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polyline.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOut.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    _this._tooltip.Set('hidden', true);
                    _this._tooltipVisible = false;
                }
            }));
        }
        else {
            // remove tooltip subscriptions
            this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            this._tooltipSubscriptions.splice(0);
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
        }
    };
    /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.UpdatePolylines = /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            var /** @type {?} */ polylines = _this._streaming ? _this._polylinesLast.splice(0) : _this._polylines;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            // generate the promise for the polylines
            var /** @type {?} */ lp = _this._service.CreatePolylines(l.GetOptions().id, polylines);
            // set polylines once promises are fullfilled.
            lp.then(function (p) {
                var /** @type {?} */ y = new Array();
                p.forEach(function (poly) {
                    if (Array.isArray(poly)) {
                        var /** @type {?} */ title_1 = '';
                        var /** @type {?} */ centroids_1 = new Array();
                        poly.forEach(function (x) {
                            y.push(x);
                            _this.AddEventListeners(x);
                            centroids_1.push(x.Centroid);
                            if (x.Title != null && x.Title.length > 0 && title_1.length === 0) {
                                title_1 = x.Title;
                            }
                        });
                        _this._labels.push({ loc: Polyline.GetPolylineCentroid(centroids_1), title: title_1 });
                    }
                    else {
                        y.push(poly);
                        if (poly.Title != null && poly.Title.length > 0) {
                            _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                        }
                        _this.AddEventListeners(poly);
                    }
                });
                _this._streaming ? l.AddEntities(y) : l.SetEntities(y);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolylineLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polyline-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolylineLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolylineLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolylineOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolylineOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolylineClick: [{ type: Output }],
        PolylineDblClick: [{ type: Output }],
        PolylineMouseMove: [{ type: Output }],
        PolylineMouseOut: [{ type: Output }],
        PolylineMouseOver: [{ type: Output }]
    };
    return MapPolylineLayerDirective;
}());
export { MapPolylineLayerDirective };
function MapPolylineLayerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolylineLayerDirective.prototype._id;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._service;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylines;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylinesLast;
    /**
     * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polyline labels.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polylines titles as the labels on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polylines as the tooltips on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseMove;
    /**
     * This event is fired on mouseout on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOut;
    /**
     * This event is fired on mouseover on a polyline in a layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOver;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBZ0IsS0FBSyxFQUFFLE1BQU0sRUFDdEMsWUFBWSxFQUFvRCxNQUFNLEVBRXpFLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBTzlDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRMbEIsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsbUNBQ1ksZUFDQSxhQUNBO1FBRkEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsVUFBSyxHQUFMLEtBQUs7dUJBbkt3QyxJQUFJLEtBQUssRUFBa0M7cUNBRS9DLElBQUksS0FBSyxFQUFnQjsrQkFDM0MsS0FBSzsrQkFDQztZQUNyQyxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLFNBQVM7U0FDdkI7MEJBQzZCLEtBQUs7MEJBQ1csSUFBSSxLQUFLLEVBQW9COzhCQUN6QixJQUFJLEtBQUssRUFBb0I7Ozs7OzRCQU14QyxNQUFNLENBQUMsZ0JBQWdCOzs7Ozs0QkFNdkIsQ0FBQyxDQUFDOzs7Ozs7MkJBY0gsSUFBSTs7Ozs7OzBCQXdCSixLQUFLOzs7Ozs7NEJBT0gsSUFBSTs7Ozs7O3NCQXdC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TUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUFFO2FBQy9ELENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7O2dCQTlhVixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtpQkFDbkM7Ozs7Z0JBdkNRLFlBQVk7Z0JBQ1osVUFBVTtnQkFaaUQsTUFBTTs7OytCQStFckUsS0FBSzsrQkFNTCxLQUFLOytCQU9MLEtBQUs7OEJBT0wsS0FBSztrQ0FPTCxLQUFLOzZCQWlCTCxLQUFLOytCQU9MLEtBQUs7a0RBUUwsS0FBSzswQkFTTCxLQUFLO3lCQU9MLEtBQUs7Z0NBV0wsTUFBTTttQ0FPTixNQUFNO29DQU9OLE1BQU07bUNBT04sTUFBTTtvQ0FPTixNQUFNOztvQ0FuTVg7O1NBcURhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lLFxyXG4gICAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLWV2ZW50JztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYWJlbE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYWJlbC1vcHRpb25zJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL21vZGVscy9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIHBvbHlsaW5lcy5cclxuICovXHJcbmxldCBsYXllcklkID0gMTAwMDAwMDtcclxuXHJcbi8qKlxyXG4gKiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlIHBlcmZvcm1hbnRseSByZW5kZXJzIGEgbGFyZ2Ugc2V0IG9mIHBvbHlsaW5lIG9uIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1wb2x5bGluZS1sYXllciBbUG9seWdvbk9wdGlvbnNdPVwiX3BvbHlsaW5lXCI+PC94LW1hcC1wb2x5bGluZS1sYXllcj5cclxuICogICA8L3gtbWFwPlxyXG4gKiBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAneC1tYXAtcG9seWxpbmUtbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJQcm9taXNlOiBQcm9taXNlPExheWVyPjtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IExheWVyU2VydmljZTtcclxuICAgIHByaXZhdGUgX2NhbnZhczogQ2FudmFzT3ZlcmxheTtcclxuICAgIHByaXZhdGUgX2xhYmVsczogQXJyYXk8e2xvYzogSUxhdExvbmcsIHRpdGxlOiBzdHJpbmd9PiA9IG5ldyBBcnJheTx7bG9jOiBJTGF0TG9uZywgdGl0bGU6IHN0cmluZ30+KCk7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBNYXBMYWJlbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBTdWJzY3JpcHRpb25zOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gbmV3IEFycmF5PFN1YnNjcmlwdGlvbj4oKTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0T3B0aW9uczogSUxhYmVsT3B0aW9ucyA9IHtcclxuICAgICAgICBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxyXG4gICAgICAgIHN0cm9rZVdlaWdodDogMixcclxuICAgICAgICBzdHJva2VDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc3RyZWFtaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9wb2x5bGluZXM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+ID0gbmV3IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KCk7XHJcbiAgICBwcml2YXRlIF9wb2x5bGluZXNMYXN0OiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWxpbmVPcHRpb25zPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlsaW5lIGxhYmVscyBhcmUgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNYXhab29tOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5bGluZSBsYWJlbHMgYXJlIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWluWm9vbTogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXBjaWZpZXMgc3R5bGVpbmcgb3B0aW9ucyBmb3Igb24tbWFwIHBvbHlsaW5lIGxhYmVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxPcHRpb25zOiBJTGFiZWxPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExheWVyT2Zmc2V0OiBJUG9pbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW4gYXJyYXkgb2YgcG9seWxpbmUgb3B0aW9ucyByZXByZXNlbnRpbmcgdGhlIHBvbHlsaW5lcyBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFBvbHlsaW5lT3B0aW9ucygpOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiB7IHJldHVybiB0aGlzLl9wb2x5bGluZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFBvbHlsaW5lT3B0aW9ucyh2YWw6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJlYW1pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lc0xhc3QucHVzaCguLi52YWwuc2xpY2UoMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzLnB1c2goLi4udmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lcyA9IHZhbC5zbGljZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgcG9seWxpbmVzIHRpdGxlcyBhcyB0aGUgbGFiZWxzIG9uIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFNob3dMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGVzIG9mIHRoZSBwb2x5bGluZXMgYXMgdGhlIHRvb2x0aXBzIG9uIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFNob3dUb29sdGlwczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdG8gdHJlYXQgY2hhbmdlcyBpbiB0aGUgUG9seWxpbmVPcHRpb25zIGFzIHN0cmVhbXMgb2YgbmV3IG1hcmtlcnMuIEluIHRoaXMgbW9kZSwgY2hhbmdpbmcgdGhlXHJcbiAgICAgKiBBcnJheSBzdXBwbGllZCBpbiBQb2x5bGluZU9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBwb2x5bGluZXMgb24gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVHJlYXROZXdQb2x5bGluZU9wdGlvbnNBc1N0cmVhbSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0cmVhbWluZzsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdQb2x5bGluZU9wdGlvbnNBc1N0cmVhbSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fc3RyZWFtaW5nID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXJrZXIgbGF5ZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZXNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIHBvbHlsaW5lIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIFBvbHlsaW5lQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gYSBwb2x5bGluZSBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlsaW5lRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5bGluZU1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3V0IG9uIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5bGluZU1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gbW91c2VvdmVyIG9uIGEgcG9seWxpbmUgaW4gYSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWxpbmVNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBwb2x5bGluZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBOZ1pvbmV9IHNlcnZpY2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBDb21wb25lbnQgY29udGVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGxheWVyT3B0aW9uczogSUxheWVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmFrZUxheWVyRGlyZWN0aXZlOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBJZCA6IHRoaXMuX2lkLFxyXG4gICAgICAgICAgICAgICAgVmlzaWJsZTogdGhpcy5WaXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgTGF5ZXJPZmZzZXQ6IHRoaXMuTGF5ZXJPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBaSW5kZXg6IHRoaXMuWkluZGV4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5BZGRMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UgPSB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDYW52YXNPdmVybGF5KGVsID0+IHRoaXMuRHJhd0xhYmVscyhlbCkpXHJcbiAgICAgICAgICAgICAgICBdKS50aGVuKHZhbHVlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzWzBdLlNldFZpc2libGUodGhpcy5WaXNpYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMgPSB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzLl9jYW52YXNSZWFkeS50aGVuKGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5fY2FudmFzLkdldFRvb2xUaXBPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCh0aGlzLlNob3dUb29sdGlwcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUG9seWxpbmVPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5VcGRhdGVQb2x5bGluZXMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSB0aGlzLl9sYXllclNlcnZpY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBsLkRlbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgdG8gY2hhbmdlcyBpbiBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCBhbmQgYWN0dWF0ZXMgcHJvcGVydHkgY2hhbmdlcyBpbiB0aGUgdW5kZXJsaW5nIGxheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1snUG9seWxpbmVPcHRpb25zJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZVBvbHlsaW5lcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSAmJiAhY2hhbmdlc1snVmlzaWJsZSddLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1pJbmRleCddICYmICFjaGFuZ2VzWydaSW5kZXgnXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10gJiYgIWNoYW5nZXNbJ0xheWVyT2Zmc2V0J10uZmlyc3RDaGFuZ2UpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIFpJbmRleCBvciBMYXllck9mZnNldCBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gY3JlYXRlZC4nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY2hhbmdlc1snU2hvd0xhYmVscyddICYmICFjaGFuZ2VzWydTaG93TGFiZWxzJ10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYWJlbE1pblpvb20nXSAmJiAhY2hhbmdlc1snTGFiZWxNaW5ab29tJ10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYWJlbE1heFpvb20nXSAmJiAhY2hhbmdlc1snTGFiZWxNYXhab29tJ10uZmlyc3RDaGFuZ2UpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5SZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dUb29sdGlwcyddICYmIHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKGNoYW5nZXNbJ1Nob3dUb29sdGlwcyddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTGF5ZXIgSWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbGF5ZXIgaWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdNYXBQb2x5bGluZUxheWVyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHAgLSB0aGUgcG9seWxpbmUgZm9yIHdoaWNoIHRvIGFkZCB0aGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycyhwOiBQb2x5bGluZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZUNsaWNrLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZURibENsaWNrLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVNb3VzZU1vdmUuZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lTW91c2VPdXQuZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZU1vdXNlT3Zlci5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiBwLkFkZExpc3RlbmVyKG9iai5uYW1lLCBvYmouaGFuZGxlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIHBvbHlsaW5lIGxhYmVscy4gQ2FsbGVkIGJ5IHRoZSBDYW52YXMgb3ZlcmxheS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBUaGUgY2FudmFzIG9uIHdoaWNoIHRvIGRyYXcgdGhlIGxhYmVscy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRHJhd0xhYmVscyhlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5TaG93TGFiZWxzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Wm9vbSgpLnRoZW4oeiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYWJlbE1pblpvb20gPD0geiAmJiB0aGlzLkxhYmVsTWF4Wm9vbSA+PSB6KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBlbC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuX2xhYmVscy5tYXAoeCA9PiB4LnRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uc1RvUG9pbnRzKHRoaXMuX2xhYmVscy5tYXAoeCA9PiB4LmxvYykpLnRoZW4obG9jcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemU6IElTaXplID0gdGhpcy5fbWFwU2VydmljZS5NYXBTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbG9jcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZHJhdyB0aGUgcG9pbnQgaWYgaXQgaXMgbm90IGluIHZpZXcuIFRoaXMgZ3JlYXRseSBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aGVuIHpvb21lZCBpbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NzW2ldLnggPj0gMCAmJiBsb2NzW2ldLnkgPj0gMCAmJiBsb2NzW2ldLnggPD0gc2l6ZS53aWR0aCAmJiBsb2NzW2ldLnkgPD0gc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRyYXdUZXh0KGN0eCwgbG9jc1tpXSwgbGFiZWxzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgdGV4dCBhdCB0aGUgYXBwcm9wcmlhdGUgcGxhY2Ugb24gdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjdHggLSBDYW52YXMgZHJhd2luZyBjb250ZXh0LlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFBpeGVsIGxvY2F0aW9uIG9uIHRoZSBjYW52YXMgd2hlcmUgdG8gY2VudGVyIHRoZSB0ZXh0LlxyXG4gICAgICogQHBhcmFtIHRleHQgLSBUZXh0IHRvIGRyYXcuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRHJhd1RleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGxvYzogSVBvaW50LCB0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbG86IElMYWJlbE9wdGlvbnMgPSB0aGlzLkxhYmVsT3B0aW9ucztcclxuICAgICAgICBpZiAobG8gPT0gbnVsbCAmJiB0aGlzLl90b29sdGlwKSB7IGxvID0gdGhpcy5fdG9vbHRpcC5EZWZhdWx0TGFiZWxTdHlsZTsgfVxyXG4gICAgICAgIGlmIChsbyA9PSBudWxsKSB7IGxvID0gdGhpcy5fZGVmYXVsdE9wdGlvbnM7IH1cclxuXHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbG8uc3Ryb2tlQ29sb3I7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBgJHtsby5mb250U2l6ZX1weCAke2xvLmZvbnRGYW1pbHl9YDtcclxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgY29uc3Qgc3Ryb2tlV2VpZ2h0OiBudW1iZXIgPSBsby5zdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRleHQgJiYgc3Ryb2tlV2VpZ2h0ICYmIHN0cm9rZVdlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gbG8uZm9udENvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFuYWdlcyB0aGUgdG9vbHRpcCBhbmQgdGhlIGF0dGFjaG1lbnQgb2YgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzaG93IC0gVHJ1ZSB0byBlbmFibGUgdGhlIHRvb2x0aXAsIGZhbHNlIHRvIGRpc2FibGUuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcChzaG93OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNob3cgJiYgdGhpcy5fY2FudmFzKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0b29sdGlwIHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWxpbmVNb3VzZU1vdmUuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuX2NhbnZhcy5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlLkNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBsb2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5bGluZU1vdXNlT3Zlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5Qb2x5bGluZS5UaXRsZSAmJiBlLlBvbHlsaW5lLlRpdGxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2M6IElMYXRMb25nID0gdGhpcy5fY2FudmFzLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUuQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCd0ZXh0JywgZS5Qb2x5bGluZS5UaXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgbG9jKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlsaW5lTW91c2VPdXQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0b29sdGlwIHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgb3IgdXBkYXRlcyB0aGUgcG9seWxpbmVzcyBiYXNlZCBvbiB0aGUgcG9seWxpbmUgb3B0aW9ucy4gVGhpcyB3aWxsIHBsYWNlIHRoZSBwb2x5bGluZXMgb24gdGhlIG1hcFxyXG4gICAgICogYW5kIHJlZ2lzdGVyIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFVwZGF0ZVBvbHlsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbGF5ZXJQcm9taXNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWxpbmVzOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiA9IHRoaXMuX3N0cmVhbWluZyA/IHRoaXMuX3BvbHlsaW5lc0xhc3Quc3BsaWNlKDApIDogdGhpcy5fcG9seWxpbmVzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbWluZykgeyB0aGlzLl9sYWJlbHMuc3BsaWNlKDApOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgcHJvbWlzZSBmb3IgdGhlIHBvbHlsaW5lc1xyXG4gICAgICAgICAgICBjb25zdCBscDogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiA9IHRoaXMuX3NlcnZpY2UuQ3JlYXRlUG9seWxpbmVzKGwuR2V0T3B0aW9ucygpLmlkLCBwb2x5bGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHBvbHlsaW5lcyBvbmNlIHByb21pc2VzIGFyZSBmdWxsZmlsbGVkLlxyXG4gICAgICAgICAgICBscC50aGVuKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeTogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xyXG4gICAgICAgICAgICAgICAgcC5mb3JFYWNoKHBvbHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvbHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRyb2lkczogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5LmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5LnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJvaWRzLnB1c2goeC5DZW50cm9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC5UaXRsZSAhPSBudWxsICYmIHguVGl0bGUubGVuZ3RoID4gMCAmJiB0aXRsZS5sZW5ndGggPT09IDApIHsgdGl0bGUgPSB4LlRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbHMucHVzaCh7bG9jOiBQb2x5bGluZS5HZXRQb2x5bGluZUNlbnRyb2lkKGNlbnRyb2lkcyksIHRpdGxlOiB0aXRsZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKHBvbHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9seS5UaXRsZSAhPSBudWxsICYmIHBvbHkuVGl0bGUubGVuZ3RoID4gMCkgeyB0aGlzLl9sYWJlbHMucHVzaCh7bG9jOiBwb2x5LkNlbnRyb2lkLCB0aXRsZTogcG9seS5UaXRsZX0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMocG9seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJlYW1pbmcgPyBsLkFkZEVudGl0aWVzKHkpIDogbC5TZXRFbnRpdGllcyh5KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLlJlZHJhdyghdGhpcy5fc3RyZWFtaW5nKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19