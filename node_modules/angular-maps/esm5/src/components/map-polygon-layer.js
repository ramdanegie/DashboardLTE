/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
/**
 * internal counter to use as ids for polygons.
 */
var /** @type {?} */ layerId = 1000000;
/**
 * MapPolygonLayerDirective performantly renders a large set of polygons on a {\@link MapComponent}.
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
 *      <x-map-polygon-layer [PolygonOptions]="_polygons"></x-map-polygon-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolygonLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolygonLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolygonLayerDirective
     */
    function MapPolygonLayerDirective(_layerService, _mapService, _zone) {
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
        this._polygons = new Array();
        this._polygonsLast = new Array();
        /**
         * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polygon titles as the labels on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polygosn as the tooltips on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polygon in a layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolygonLayerDirective.prototype, "PolygonOptions", {
        /**
         * An array of polygon options representing the polygons in the layer.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * An array of polygon options representing the polygons in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._polygons; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polygonsLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polygons).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polygons = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonLayerDirective.prototype, "TreatNewPolygonOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * \@memberof MapPolygonLayerDirective
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
    Object.defineProperty(MapPolygonLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the marker layer.
         *
         * \@readonly
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
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
                if (_this.PolygonOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolygons(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
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
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolygonOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolygons();
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
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    MapPolygonLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    function () { return 'MapPolygonLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        var /** @type {?} */ handlers = [
            { name: 'click', handler: function (ev) { return _this.PolygonClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolygonDblClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolygonMouseMove.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolygonMouseOut.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolygonMouseOver.emit({ Polygon: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.DrawLabels = /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
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
    MapPolygonLayerDirective.prototype.DrawText = /**
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
    MapPolygonLayerDirective.prototype.ManageTooltip = /**
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
            this._tooltipSubscriptions.push(this.PolygonMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    var /** @type {?} */ loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOver.asObservable().subscribe(function (e) {
                if (e.Polygon.Title && e.Polygon.Title.length > 0) {
                    var /** @type {?} */ loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polygon.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOut.asObservable().subscribe(function (e) {
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
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * \@method
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.UpdatePolygons = /**
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            var /** @type {?} */ polygons = _this._streaming ? _this._polygonsLast.splice(0) : _this._polygons;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            // generate the promise for the markers
            var /** @type {?} */ lp = _this._service.CreatePolygons(l.GetOptions().id, polygons);
            // set markers once promises are fullfilled.
            lp.then(function (p) {
                p.forEach(function (poly) {
                    if (poly.Title != null && poly.Title.length > 0) {
                        _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                    }
                    _this.AddEventListeners(poly);
                });
                _this._streaming ? l.AddEntities(p) : l.SetEntities(p);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolygonLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polygon-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolygonLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolygonLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolygonOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolygonOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolygonClick: [{ type: Output }],
        PolygonDblClick: [{ type: Output }],
        PolygonMouseMove: [{ type: Output }],
        PolygonMouseOut: [{ type: Output }],
        PolygonMouseOver: [{ type: Output }]
    };
    return MapPolygonLayerDirective;
}());
export { MapPolygonLayerDirective };
function MapPolygonLayerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolygonLayerDirective.prototype._id;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._service;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygons;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygonsLast;
    /**
     * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polygon labels.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polygon titles as the labels on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polygosn as the tooltips on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseMove;
    /**
     * This event is fired on mouseout on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOut;
    /**
     * This event is fired on mouseover on a polygon in a layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOver;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24tbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBb0QsTUFBTSxFQUV6RSxNQUFNLGVBQWUsQ0FBQztBQVN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBU3JELHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRMbEIsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsa0NBQ1ksZUFDQSxhQUNBO1FBRkEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsVUFBSyxHQUFMLEtBQUs7dUJBbkt3QyxJQUFJLEtBQUssRUFBa0M7cUNBRS9DLElBQUksS0FBSyxFQUFnQjsrQkFDM0MsS0FBSzsrQkFDQztZQUNyQyxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLFNBQVM7U0FDdkI7MEJBQzZCLEtBQUs7eUJBQ1MsSUFBSSxLQUFLLEVBQW1COzZCQUN4QixJQUFJLEtBQUssRUFBbUI7Ozs7OzRCQU1yQyxNQUFNLENBQUMsZ0JBQWdCOzs7Ozs0QkFNdkIsQ0FBQyxDQUFDOzs7Ozs7MkJBY0gsSUFBSTs7Ozs7OzBCQXdCSixLQUFLOzs7Ozs7NEJBT0gsSUFBSTs7Ozs7O3NCQXdCWCxDQUFDOzs7Ozs7NEJBVzJCLElBQUksWUFBWSxFQUFpQjs7Ozs7OytCQU9y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QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUFFO2FBQy9ELENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7O2dCQS9aVixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtpQkFDbEM7Ozs7Z0JBdkNRLFlBQVk7Z0JBQ1osVUFBVTtnQkFaaUQsTUFBTTs7OytCQStFckUsS0FBSzsrQkFNTCxLQUFLOytCQU9MLEtBQUs7OEJBT0wsS0FBSztpQ0FPTCxLQUFLOzZCQWlCTCxLQUFLOytCQU9MLEtBQUs7aURBUUwsS0FBSzswQkFTTCxLQUFLO3lCQU9MLEtBQUs7K0JBV0wsTUFBTTtrQ0FPTixNQUFNO21DQU9OLE1BQU07a0NBT04sTUFBTTttQ0FPTixNQUFNOzttQ0FuTVg7O1NBcURhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lLFxyXG4gICAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWdvbkV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1ldmVudCc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL21vZGVscy9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIHBvbHlnb25zLlxyXG4gKi9cclxubGV0IGxheWVySWQgPSAxMDAwMDAwO1xyXG5cclxuLyoqXHJcbiAqIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZSBwZXJmb3JtYW50bHkgcmVuZGVycyBhIGxhcmdlIHNldCBvZiBwb2x5Z29ucyBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cclxuICogICAgICA8eC1tYXAtcG9seWdvbi1sYXllciBbUG9seWdvbk9wdGlvbnNdPVwiX3BvbHlnb25zXCI+PC94LW1hcC1wb2x5Z29uLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5Z29uLWxheWVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJQcm9taXNlOiBQcm9taXNlPExheWVyPjtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IExheWVyU2VydmljZTtcclxuICAgIHByaXZhdGUgX2NhbnZhczogQ2FudmFzT3ZlcmxheTtcclxuICAgIHByaXZhdGUgX2xhYmVsczogQXJyYXk8e2xvYzogSUxhdExvbmcsIHRpdGxlOiBzdHJpbmd9PiA9IG5ldyBBcnJheTx7bG9jOiBJTGF0TG9uZywgdGl0bGU6IHN0cmluZ30+KCk7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBNYXBMYWJlbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBTdWJzY3JpcHRpb25zOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gbmV3IEFycmF5PFN1YnNjcmlwdGlvbj4oKTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0T3B0aW9uczogSUxhYmVsT3B0aW9ucyA9IHtcclxuICAgICAgICBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxyXG4gICAgICAgIHN0cm9rZVdlaWdodDogMixcclxuICAgICAgICBzdHJva2VDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc3RyZWFtaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9wb2x5Z29uczogQXJyYXk8SVBvbHlnb25PcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWdvbk9wdGlvbnM+KCk7XHJcbiAgICBwcml2YXRlIF9wb2x5Z29uc0xhc3Q6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4gPSBuZXcgQXJyYXk8SVBvbHlnb25PcHRpb25zPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlnb24gbGFiZWxzIGFyZSB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWF4Wm9vbTogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJlbHMgYXJlIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNaW5ab29tOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcGNpZmllcyBzdHlsZWluZyBvcHRpb25zIGZvciBvbi1tYXAgcG9seWdvbiBsYWJlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxPcHRpb25zOiBJTGFiZWxPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGF5ZXJPZmZzZXQ6IElQb2ludCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBvZiBwb2x5Z29uIG9wdGlvbnMgcmVwcmVzZW50aW5nIHRoZSBwb2x5Z29ucyBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgUG9seWdvbk9wdGlvbnMoKTogQXJyYXk8SVBvbHlnb25PcHRpb25zPiB7IHJldHVybiB0aGlzLl9wb2x5Z29uczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgUG9seWdvbk9wdGlvbnModmFsOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJlYW1pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zTGFzdC5wdXNoKC4uLnZhbC5zbGljZSgwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29ucy5wdXNoKC4uLnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29ucyA9IHZhbC5zbGljZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgcG9seWdvbiB0aXRsZXMgYXMgdGhlIGxhYmVscyBvbiB0aGUgcG9seWdvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd0xhYmVsczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZXMgb2YgdGhlIHBvbHlnb3NuIGFzIHRoZSB0b29sdGlwcyBvbiB0aGUgcG9seWdvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd1Rvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0byB0cmVhdCBjaGFuZ2VzIGluIHRoZSBQb2x5Z29uT3B0aW9ucyBhcyBzdHJlYW1zIG9mIG5ldyBtYXJrZXJzLiBJbiB0aGlzIG1vZGUsIGNoYW5naW5nIHRoZVxyXG4gICAgICogQXJyYXkgc3VwcGxpZWQgaW4gUG9seWdvbk9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBwb2x5Z29ucyBvbiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFRyZWF0TmV3UG9seWdvbk9wdGlvbnNBc1N0cmVhbSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0cmVhbWluZzsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdQb2x5Z29uT3B0aW9uc0FzU3RyZWFtKHZhbDogYm9vbGVhbikgeyB0aGlzLl9zdHJlYW1pbmcgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1hcmtlciBsYXllclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZXNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIHBvbHlnb24gaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBQb2x5Z29uQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIGEgcG9seWdvbiBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWdvbkRibENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gYSBwb2x5Z29uIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5Z29uTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3V0IG9uIGEgcG9seWdvbiBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWdvbk1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3ZlciBvbiBhIHBvbHlnb24gaW4gYSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5Z29uTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIG1hcmtlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIExheWVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTmdab25lfSBzZXJ2aWNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBDb21wb25lbnQgY29udGVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJPcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmYWtlTGF5ZXJEaXJlY3RpdmU6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIElkIDogdGhpcy5faWQsXHJcbiAgICAgICAgICAgICAgICBWaXNpYmxlOiB0aGlzLlZpc2libGUsXHJcbiAgICAgICAgICAgICAgICBMYXllck9mZnNldDogdGhpcy5MYXllck9mZnNldCxcclxuICAgICAgICAgICAgICAgIFpJbmRleDogdGhpcy5aSW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkFkZExheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG5cclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDYW52YXNPdmVybGF5KGVsID0+IHRoaXMuRHJhd0xhYmVscyhlbCkpXHJcbiAgICAgICAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlc1swXS5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMgPSB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuX2NhbnZhc1JlYWR5LnRoZW4oYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuX2NhbnZhcy5HZXRUb29sVGlwT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCh0aGlzLlNob3dUb29sdGlwcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBvbHlnb25PcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLlVwZGF0ZVBvbHlnb25zKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IHRoaXMuX2xheWVyU2VydmljZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1snUG9seWdvbk9wdGlvbnMnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9seWdvbnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10gJiYgIWNoYW5nZXNbJ1Zpc2libGUnXS5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjaGFuZ2VzWydaSW5kZXgnXSAmJiAhY2hhbmdlc1snWkluZGV4J10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYXllck9mZnNldCddICYmICFjaGFuZ2VzWydMYXllck9mZnNldCddLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBaSW5kZXggb3IgTGF5ZXJPZmZzZXQgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1Nob3dMYWJlbHMnXSAmJiAhY2hhbmdlc1snU2hvd0xhYmVscyddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNaW5ab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWluWm9vbSddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNYXhab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuUmVkcmF3KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93VG9vbHRpcHMnXSAmJiB0aGlzLl90b29sdGlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcChjaGFuZ2VzWydTaG93VG9vbHRpcHMnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIE1hcmtlciBJZC5cclxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXJrZXIgaWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ01hcFBvbHlnb25MYXllci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHZhcmlvdXMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwIC0gdGhlIHBvbHlnb24gZm9yIHdoaWNoIHRvIGFkZCB0aGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKHA6IFBvbHlnb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWdvbkNsaWNrLmVtaXQoe1BvbHlnb246IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25EYmxDbGljay5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWdvbk1vdXNlTW92ZS5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5Z29uTW91c2VPdXQuZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25Nb3VzZU92ZXIuZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiBwLkFkZExpc3RlbmVyKG9iai5uYW1lLCBvYmouaGFuZGxlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIHBvbHlnb24gbGFiZWxzLiBDYWxsZWQgYnkgdGhlIENhbnZhcyBvdmVybGF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIFRoZSBjYW52YXMgb24gd2hpY2ggdG8gZHJhdyB0aGUgbGFiZWxzLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIERyYXdMYWJlbHMoZWw6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2hvd0xhYmVscykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldFpvb20oKS50aGVuKHogPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTGFiZWxNaW5ab29tIDw9IHogJiYgdGhpcy5MYWJlbE1heFpvb20gPj0geikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gZWwuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbHMgPSB0aGlzLl9sYWJlbHMubWFwKHggPT4geC50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5Mb2NhdGlvbnNUb1BvaW50cyh0aGlzLl9sYWJlbHMubWFwKHggPT4geC5sb2MpKS50aGVuKGxvY3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplOiBJU2l6ZSA9IHRoaXMuX21hcFNlcnZpY2UuTWFwU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxvY3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGRyYXcgdGhlIHBvaW50IGlmIGl0IGlzIG5vdCBpbiB2aWV3LiBUaGlzIGdyZWF0bHkgaW1wcm92ZXMgcGVyZm9ybWFuY2Ugd2hlbiB6b29tZWQgaW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jc1tpXS54ID49IDAgJiYgbG9jc1tpXS55ID49IDAgJiYgbG9jc1tpXS54IDw9IHNpemUud2lkdGggJiYgbG9jc1tpXS55IDw9IHNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EcmF3VGV4dChjdHgsIGxvY3NbaV0sIGxhYmVsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIHRleHQgYXQgdGhlIGFwcHJvcHJpYXRlIHBsYWNlIG9uIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY3R4IC0gQ2FudmFzIGRyYXdpbmcgY29udGV4dC5cclxuICAgICAqIEBwYXJhbSBsb2MgLSBQaXhlbCBsb2NhdGlvbiBvbiB0aGUgY2FudmFzIHdoZXJlIHRvIGNlbnRlciB0aGUgdGV4dC5cclxuICAgICAqIEBwYXJhbSB0ZXh0IC0gVGV4dCB0byBkcmF3LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIERyYXdUZXh0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBsb2M6IElQb2ludCwgdGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGxvOiBJTGFiZWxPcHRpb25zID0gdGhpcy5MYWJlbE9wdGlvbnM7XHJcbiAgICAgICAgaWYgKGxvID09IG51bGwgJiYgdGhpcy5fdG9vbHRpcCkgeyBsbyA9IHRoaXMuX3Rvb2x0aXAuRGVmYXVsdExhYmVsU3R5bGU7IH1cclxuICAgICAgICBpZiAobG8gPT0gbnVsbCkgeyBsbyA9IHRoaXMuX2RlZmF1bHRPcHRpb25zOyB9XHJcblxyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxvLnN0cm9rZUNvbG9yO1xyXG4gICAgICAgIGN0eC5mb250ID0gYCR7bG8uZm9udFNpemV9cHggJHtsby5mb250RmFtaWx5fWA7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIGNvbnN0IHN0cm9rZVdlaWdodDogbnVtYmVyID0gbG8uc3Ryb2tlV2VpZ2h0O1xyXG4gICAgICAgIGlmICh0ZXh0ICYmIHN0cm9rZVdlaWdodCAmJiBzdHJva2VXZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3Ryb2tlV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGxvLmZvbnRDb2xvcjtcclxuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hbmFnZXMgdGhlIHRvb2x0aXAgYW5kIHRoZSBhdHRhY2htZW50IG9mIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2hvdyAtIFRydWUgdG8gZW5hYmxlIHRoZSB0b29sdGlwLCBmYWxzZSB0byBkaXNhYmxlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoc2hvdzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaG93ICYmIHRoaXMuX2NhbnZhcykge1xyXG4gICAgICAgICAgICAvLyBhZGQgdG9vbHRpcCBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlnb25Nb3VzZU1vdmUuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuX2NhbnZhcy5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlLkNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBsb2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5Z29uTW91c2VPdmVyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlBvbHlnb24uVGl0bGUgJiYgZS5Qb2x5Z29uLlRpdGxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2M6IElMYXRMb25nID0gdGhpcy5fY2FudmFzLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUuQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCd0ZXh0JywgZS5Qb2x5Z29uLlRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWdvbk1vdXNlT3V0LmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdG9vbHRpcCBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG9yIHVwZGF0ZXMgdGhlIHBvbHlnb25zIGJhc2VkIG9uIHRoZSBwb2x5Z29uIG9wdGlvbnMuIFRoaXMgd2lsbCBwbGFjZSB0aGUgcG9seWdvbnMgb24gdGhlIG1hcFxyXG4gICAgICogYW5kIHJlZ2lzdGVyIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgVXBkYXRlUG9seWdvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyUHJvbWlzZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+ID0gdGhpcy5fc3RyZWFtaW5nID8gdGhpcy5fcG9seWdvbnNMYXN0LnNwbGljZSgwKSA6IHRoaXMuX3BvbHlnb25zO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbWluZykgeyB0aGlzLl9sYWJlbHMuc3BsaWNlKDApOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgcHJvbWlzZSBmb3IgdGhlIG1hcmtlcnNcclxuICAgICAgICAgICAgY29uc3QgbHA6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+ID0gdGhpcy5fc2VydmljZS5DcmVhdGVQb2x5Z29ucyhsLkdldE9wdGlvbnMoKS5pZCwgcG9seWdvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IG1hcmtlcnMgb25jZSBwcm9taXNlcyBhcmUgZnVsbGZpbGxlZC5cclxuICAgICAgICAgICAgbHAudGhlbihwID0+IHtcclxuICAgICAgICAgICAgICAgIHAuZm9yRWFjaChwb2x5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9seS5UaXRsZSAhPSBudWxsICYmIHBvbHkuVGl0bGUubGVuZ3RoID4gMCkgeyB0aGlzLl9sYWJlbHMucHVzaCh7bG9jOiBwb2x5LkNlbnRyb2lkLCB0aXRsZTogcG9seS5UaXRsZX0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhwb2x5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RyZWFtaW5nID8gbC5BZGRFbnRpdGllcyhwKSA6IGwuU2V0RW50aXRpZXMocCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5SZWRyYXcoIXRoaXMuX3N0cmVhbWluZyk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==