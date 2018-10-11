/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { Polyline } from '../models/polyline';
/**
 * internal counter to use as ids for polylines.
 */
let /** @type {?} */ layerId = 1000000;
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
export class MapPolylineLayerDirective {
    /**
     * Creates an instance of MapPolylineLayerDirective.
     * \@memberof MapPolylineLayerDirective
     * @param {?} _layerService - Concreate implementation of a {\@link LayerService}.
     * @param {?} _mapService - Concreate implementation of a {\@link MapService}.
     * @param {?} _zone - Concreate implementation of a {\@link NgZone} service.
     */
    constructor(_layerService, _mapService, _zone) {
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
    /**
     * An array of polyline options representing the polylines in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    get PolylineOptions() { return this._polylines; }
    /**
     * @param {?} val
     * @return {?}
     */
    set PolylineOptions(val) {
        if (this._streaming) {
            this._polylinesLast.push(...val.slice(0));
            this._polylines.push(...val);
        }
        else {
            this._polylines = val.slice(0);
        }
    }
    /**
     * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
     * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    get TreatNewPolylineOptionsAsStream() { return this._streaming; }
    /**
     * @param {?} val
     * @return {?}
     */
    set TreatNewPolylineOptionsAsStream(val) { this._streaming = val; }
    /**
     * Gets the id of the polyline layer.
     *
     * \@readonly
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(() => {
            const /** @type {?} */ fakeLayerDirective = {
                Id: this._id,
                Visible: this.Visible,
                LayerOffset: this.LayerOffset,
                ZIndex: this.ZIndex
            };
            this._layerService.AddLayer(fakeLayerDirective);
            this._layerPromise = this._layerService.GetNativeLayer(fakeLayerDirective);
            Promise.all([
                this._layerPromise,
                this._mapService.CreateCanvasOverlay(el => this.DrawLabels(el))
            ]).then(values => {
                values[0].SetVisible(this.Visible);
                this._canvas = values[1];
                this._canvas._canvasReady.then(b => {
                    this._tooltip = this._canvas.GetToolTipOverlay();
                    this.ManageTooltip(this.ShowTooltips);
                });
                if (this.PolylineOptions) {
                    this._zone.runOutsideAngular(() => this.UpdatePolylines());
                }
            });
            this._service = this._layerService;
        });
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._tooltipSubscriptions.forEach(s => s.unsubscribe());
        this._layerPromise.then(l => {
            l.Delete();
        });
        if (this._canvas) {
            this._canvas.Delete();
        }
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['PolylineOptions']) {
            this._zone.runOutsideAngular(() => {
                this.UpdatePolylines();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._layerPromise.then(l => l.SetVisible(this.Visible));
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
    }
    /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    toString() { return 'MapPolylineLayer-' + this._id.toString(); }
    /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    AddEventListeners(p) {
        const /** @type {?} */ handlers = [
            { name: 'click', handler: (ev) => this.PolylineClick.emit({ Polyline: p, Click: ev }) },
            { name: 'dblclick', handler: (ev) => this.PolylineDblClick.emit({ Polyline: p, Click: ev }) },
            { name: 'mousemove', handler: (ev) => this.PolylineMouseMove.emit({ Polyline: p, Click: ev }) },
            { name: 'mouseout', handler: (ev) => this.PolylineMouseOut.emit({ Polyline: p, Click: ev }) },
            { name: 'mouseover', handler: (ev) => this.PolylineMouseOver.emit({ Polyline: p, Click: ev }) }
        ];
        handlers.forEach((obj) => p.AddListener(obj.name, obj.handler));
    }
    /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    DrawLabels(el) {
        if (this.ShowLabels) {
            this._mapService.GetZoom().then(z => {
                if (this.LabelMinZoom <= z && this.LabelMaxZoom >= z) {
                    const /** @type {?} */ ctx = el.getContext('2d');
                    const /** @type {?} */ labels = this._labels.map(x => x.title);
                    this._mapService.LocationsToPoints(this._labels.map(x => x.loc)).then(locs => {
                        const /** @type {?} */ size = this._mapService.MapSize;
                        for (let /** @type {?} */ i = 0, /** @type {?} */ len = locs.length; i < len; i++) {
                            // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                            if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                this.DrawText(ctx, locs[i], labels[i]);
                            }
                        }
                    });
                }
            });
        }
    }
    /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    DrawText(ctx, loc, text) {
        let /** @type {?} */ lo = this.LabelOptions;
        if (lo == null && this._tooltip) {
            lo = this._tooltip.DefaultLabelStyle;
        }
        if (lo == null) {
            lo = this._defaultOptions;
        }
        ctx.strokeStyle = lo.strokeColor;
        ctx.font = `${lo.fontSize}px ${lo.fontFamily}`;
        ctx.textAlign = 'center';
        const /** @type {?} */ strokeWeight = lo.strokeWeight;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, loc.x, loc.y);
        }
        ctx.fillStyle = lo.fontColor;
        ctx.fillText(text, loc.x, loc.y);
    }
    /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    ManageTooltip(show) {
        if (show && this._canvas) {
            // add tooltip subscriptions
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
            this._tooltipSubscriptions.push(this.PolylineMouseMove.asObservable().subscribe(e => {
                if (this._tooltipVisible) {
                    const /** @type {?} */ loc = this._canvas.GetCoordinatesFromClick(e.Click);
                    this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOver.asObservable().subscribe(e => {
                if (e.Polyline.Title && e.Polyline.Title.length > 0) {
                    const /** @type {?} */ loc = this._canvas.GetCoordinatesFromClick(e.Click);
                    this._tooltip.Set('text', e.Polyline.Title);
                    this._tooltip.Set('position', loc);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOut.asObservable().subscribe(e => {
                if (this._tooltipVisible) {
                    this._tooltip.Set('hidden', true);
                    this._tooltipVisible = false;
                }
            }));
        }
        else {
            // remove tooltip subscriptions
            this._tooltipSubscriptions.forEach(s => s.unsubscribe());
            this._tooltipSubscriptions.splice(0);
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
        }
    }
    /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    UpdatePolylines() {
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(l => {
            const /** @type {?} */ polylines = this._streaming ? this._polylinesLast.splice(0) : this._polylines;
            if (!this._streaming) {
                this._labels.splice(0);
            }
            // generate the promise for the polylines
            const /** @type {?} */ lp = this._service.CreatePolylines(l.GetOptions().id, polylines);
            // set polylines once promises are fullfilled.
            lp.then(p => {
                const /** @type {?} */ y = new Array();
                p.forEach(poly => {
                    if (Array.isArray(poly)) {
                        let /** @type {?} */ title = '';
                        const /** @type {?} */ centroids = new Array();
                        poly.forEach(x => {
                            y.push(x);
                            this.AddEventListeners(x);
                            centroids.push(x.Centroid);
                            if (x.Title != null && x.Title.length > 0 && title.length === 0) {
                                title = x.Title;
                            }
                        });
                        this._labels.push({ loc: Polyline.GetPolylineCentroid(centroids), title: title });
                    }
                    else {
                        y.push(poly);
                        if (poly.Title != null && poly.Title.length > 0) {
                            this._labels.push({ loc: poly.Centroid, title: poly.Title });
                        }
                        this.AddEventListeners(poly);
                    }
                });
                this._streaming ? l.AddEntities(y) : l.SetEntities(y);
                if (this._canvas) {
                    this._canvas.Redraw(!this._streaming);
                }
            });
        });
    }
}
MapPolylineLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-polyline-layer'
            },] },
];
/** @nocollapse */
MapPolylineLayerDirective.ctorParameters = () => [
    { type: LayerService },
    { type: MapService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFnQixLQUFLLEVBQUUsTUFBTSxFQUN0QyxZQUFZLEVBQW9ELE1BQU0sRUFFekUsTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFPOUMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QnRCLE1BQU07Ozs7Ozs7O0lBeUtGLFlBQ1ksZUFDQSxhQUNBO1FBRkEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsVUFBSyxHQUFMLEtBQUs7dUJBbkt3QyxJQUFJLEtBQUssRUFBa0M7cUNBRS9DLElBQUksS0FBSyxFQUFnQjsrQkFDM0MsS0FBSzsrQkFDQztZQUNyQyxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLFNBQVM7U0FDdkI7MEJBQzZCLEtBQUs7MEJBQ1csSUFBSSxLQUFLLEVBQW9COzhCQUN6QixJQUFJLEtBQUssRUFBb0I7Ozs7OzRCQU14QyxNQUFNLENBQUMsZ0JBQWdCOzs7Ozs0QkFNdkIsQ0FBQyxDQUFDOzs7Ozs7MkJBY0gsSUFBSTs7Ozs7OzBCQXdCSixLQUFLOzs7Ozs7NEJBT0gsSUFBSTs7Ozs7O3NCQXdCWCxDQUFDOzs7Ozs7NkJBVzZCLElBQUksWUFBWSxFQUFrQjs7Ozs7O2dDQU90QyxJQUFJLFlBQVksRUFBa0I7Ozs7OztpQ0FPakMsSUFBSSxZQUFZLEVBQWtCOzs7Ozs7Z0NBT25DLElBQUksWUFBWSxFQUFrQjs7Ozs7O2lDQU9qQyxJQUFJLFlBQVksRUFBa0I7UUErQjFGLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7S0FDeEI7Ozs7Ozs7SUF2SEQsSUFDZSxlQUFlLEtBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Ozs7O1FBQ3RFLGVBQWUsQ0FBQyxHQUE0QjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7Ozs7Ozs7OztJQXVCVCxJQUNlLCtCQUErQixLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Ozs7O1FBQ3RFLCtCQUErQixDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7UUFtRTFFLEVBQUUsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQTZCbkMsa0JBQWtCO1FBQ3JCLHVCQUFNLFlBQVksR0FBa0I7WUFDaEMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzlCLHVCQUFNLGtCQUFrQixHQUFRO2dCQUM1QixFQUFFLEVBQUcsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDSixJQUFJLENBQUMsYUFBYTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN6QyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7aUJBQzlEO2FBQ0osQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ3RDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRQSxXQUFXO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUFFOzs7Ozs7Ozs7SUFTekMsV0FBVyxDQUFDLE9BQXdDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCLENBQUMsQ0FBQztTQUNOO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3JELENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FDbEUsQ0FBQyxDQUFDLENBQUM7WUFDQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMkVBQTJFLENBQUMsQ0FBQyxDQUFDO1NBQ2xHO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzdELENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUNqRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7U0FDSjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM1RDs7Ozs7OztJQVFFLFFBQVEsS0FBYSxNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7O0lBYXJFLGlCQUFpQixDQUFDLENBQVc7UUFDakMsdUJBQU0sUUFBUSxHQUFHO1lBQ2IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFO1lBQ2pHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFO1lBQ3ZHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFO1lBQ3pHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFO1lBQ3ZHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFO1NBQzVHLENBQUM7UUFDRixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OztJQVM1RCxVQUFVLENBQUMsRUFBcUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsdUJBQU0sR0FBRyxHQUE2QixFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxRCx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3pFLHVCQUFNLElBQUksR0FBVSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQzt3QkFDN0MsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsbUJBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzs0QkFFOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0NBQzFGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDMUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO2lCQUNOO2FBQ0osQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7OztJQVNHLFFBQVEsQ0FBQyxHQUE2QixFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQ3JFLHFCQUFJLEVBQUUsR0FBa0IsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7U0FBRTtRQUMxRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQUU7UUFFOUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUN6Qix1QkFBTSxZQUFZLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFTN0IsYUFBYSxDQUFDLElBQWE7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUV2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNoRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsdUJBQU0sR0FBRyxHQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCx1QkFBTSxHQUFHLEdBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7cUJBQy9CO2lCQUNKO2FBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2lCQUNoQzthQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ1A7UUFDRCxJQUFJLENBQUMsQ0FBQzs7WUFFRixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7U0FDaEM7Ozs7Ozs7Ozs7SUFVRyxlQUFlO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUM7U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hCLHVCQUFNLFNBQVMsR0FBNEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDN0csRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUFFOztZQUdqRCx1QkFBTSxFQUFFLEdBQTZDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7O1lBR2pILEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsdUJBQU0sQ0FBQyxHQUFvQixJQUFJLEtBQUssRUFBWSxDQUFDO2dCQUNqRCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNiLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixxQkFBSSxLQUFLLEdBQVcsRUFBRSxDQUFDO3dCQUN2Qix1QkFBTSxTQUFTLEdBQW9CLElBQUksS0FBSyxFQUFZLENBQUM7d0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDVixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOzZCQUFFO3lCQUN4RixDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO3FCQUNuRjtvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7eUJBQUU7d0JBQ2hILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEM7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUFFO2FBQy9ELENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7OztZQTlhVixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjthQUNuQzs7OztZQXZDUSxZQUFZO1lBQ1osVUFBVTtZQVppRCxNQUFNOzs7MkJBK0VyRSxLQUFLOzJCQU1MLEtBQUs7MkJBT0wsS0FBSzswQkFPTCxLQUFLOzhCQU9MLEtBQUs7eUJBaUJMLEtBQUs7MkJBT0wsS0FBSzs4Q0FRTCxLQUFLO3NCQVNMLEtBQUs7cUJBT0wsS0FBSzs0QkFXTCxNQUFNOytCQU9OLE1BQU07Z0NBT04sTUFBTTsrQkFPTixNQUFNO2dDQU9OLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLCBTaW1wbGVDaGFuZ2UsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLFxyXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSxcclxuICAgIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSVNpemUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzaXplJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1ldmVudCc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tb2RlbHMvbWFwLWxhYmVsJztcclxuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uL21vZGVscy9jYW52YXMtb3ZlcmxheSc7XHJcblxyXG4vKipcclxuICogaW50ZXJuYWwgY291bnRlciB0byB1c2UgYXMgaWRzIGZvciBwb2x5bGluZXMuXHJcbiAqL1xyXG5sZXQgbGF5ZXJJZCA9IDEwMDAwMDA7XHJcblxyXG4vKipcclxuICogTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZSBwZXJmb3JtYW50bHkgcmVuZGVycyBhIGxhcmdlIHNldCBvZiBwb2x5bGluZSBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cclxuICogICAgICA8eC1tYXAtcG9seWxpbmUtbGF5ZXIgW1BvbHlnb25PcHRpb25zXT1cIl9wb2x5bGluZVwiPjwveC1tYXAtcG9seWxpbmUtbGF5ZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLXBvbHlsaW5lLWxheWVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2xheWVyUHJvbWlzZTogUHJvbWlzZTxMYXllcj47XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBMYXllclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9jYW52YXM6IENhbnZhc092ZXJsYXk7XHJcbiAgICBwcml2YXRlIF9sYWJlbHM6IEFycmF5PHtsb2M6IElMYXRMb25nLCB0aXRsZTogc3RyaW5nfT4gPSBuZXcgQXJyYXk8e2xvYzogSUxhdExvbmcsIHRpdGxlOiBzdHJpbmd9PigpO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogTWFwTGFiZWw7XHJcbiAgICBwcml2YXRlIF90b29sdGlwU3Vic2NyaXB0aW9uczogQXJyYXk8U3Vic2NyaXB0aW9uPiA9IG5ldyBBcnJheTxTdWJzY3JpcHRpb24+KCk7XHJcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IElMYWJlbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZm9udFNpemU6IDExLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcclxuICAgICAgICBzdHJva2VXZWlnaHQ6IDIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBmb250Q29sb3I6ICcjZmZmZmZmJ1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3N0cmVhbWluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcG9seWxpbmVzOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWxpbmVPcHRpb25zPigpO1xyXG4gICAgcHJpdmF0ZSBfcG9seWxpbmVzTGFzdDogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4gPSBuZXcgQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5bGluZSBsYWJlbHMgYXJlIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWF4Wm9vbTogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWxpbmUgbGFiZWxzIGFyZSB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1pblpvb206IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VwY2lmaWVzIHN0eWxlaW5nIG9wdGlvbnMgZm9yIG9uLW1hcCBwb2x5bGluZSBsYWJlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsT3B0aW9uczogSUxhYmVsT3B0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyBBbiBvZmZzZXQgYXBwbGllZCB0byB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXllck9mZnNldDogSVBvaW50ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IG9mIHBvbHlsaW5lIG9wdGlvbnMgcmVwcmVzZW50aW5nIHRoZSBwb2x5bGluZXMgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBQb2x5bGluZU9wdGlvbnMoKTogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4geyByZXR1cm4gdGhpcy5fcG9seWxpbmVzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBQb2x5bGluZU9wdGlvbnModmFsOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RyZWFtaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXNMYXN0LnB1c2goLi4udmFsLnNsaWNlKDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lcy5wdXNoKC4uLnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMgPSB2YWwuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHBvbHlsaW5lcyB0aXRsZXMgYXMgdGhlIGxhYmVscyBvbiB0aGUgcG9seWxpbmVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93TGFiZWxzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHRpdGxlcyBvZiB0aGUgcG9seWxpbmVzIGFzIHRoZSB0b29sdGlwcyBvbiB0aGUgcG9seWxpbmVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93VG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRvIHRyZWF0IGNoYW5nZXMgaW4gdGhlIFBvbHlsaW5lT3B0aW9ucyBhcyBzdHJlYW1zIG9mIG5ldyBtYXJrZXJzLiBJbiB0aGlzIG1vZGUsIGNoYW5naW5nIHRoZVxyXG4gICAgICogQXJyYXkgc3VwcGxpZWQgaW4gUG9seWxpbmVPcHRpb25zIHdpbGwgYmUgaW5jcmVtZW50YWxseSBkcmF3biBvbiB0aGUgbWFwIGFzIG9wcG9zZWQgdG8gcmVwbGFjZSB0aGUgcG9seWxpbmVzIG9uIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFRyZWF0TmV3UG9seWxpbmVPcHRpb25zQXNTdHJlYW0oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdHJlYW1pbmc7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFRyZWF0TmV3UG9seWxpbmVPcHRpb25zQXNTdHJlYW0odmFsOiBib29sZWFuKSB7IHRoaXMuX3N0cmVhbWluZyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWFya2VyIGxheWVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRGVsZWdhdGVzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3MgYSBwb2x5bGluZSBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBQb2x5bGluZUNsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5bGluZURibENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiBhIHBvbHlsaW5lIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWxpbmVNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBtb3VzZW91dCBvbiBhIHBvbHlsaW5lIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWxpbmVNb3VzZU91dDogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3ZlciBvbiBhIHBvbHlsaW5lIGluIGEgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlsaW5lTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgcG9seWxpbmUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIExheWVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTmdab25lfSBzZXJ2aWNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGxheWVySWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgQ29tcG9uZW50IGNvbnRlbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBsYXllck9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgSWQgOiB0aGlzLl9pZCxcclxuICAgICAgICAgICAgICAgIFZpc2libGU6IHRoaXMuVmlzaWJsZSxcclxuICAgICAgICAgICAgICAgIExheWVyT2Zmc2V0OiB0aGlzLkxheWVyT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgWkluZGV4OiB0aGlzLlpJbmRleFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcblxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlQ2FudmFzT3ZlcmxheShlbCA9PiB0aGlzLkRyYXdMYWJlbHMoZWwpKVxyXG4gICAgICAgICAgICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1swXS5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5fY2FudmFzUmVhZHkudGhlbihiID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuX2NhbnZhcy5HZXRUb29sVGlwT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAodGhpcy5TaG93VG9vbHRpcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlBvbHlsaW5lT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuVXBkYXRlUG9seWxpbmVzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1BvbHlsaW5lT3B0aW9ucyddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVQb2x5bGluZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10gJiYgIWNoYW5nZXNbJ1Zpc2libGUnXS5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjaGFuZ2VzWydaSW5kZXgnXSAmJiAhY2hhbmdlc1snWkluZGV4J10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYXllck9mZnNldCddICYmICFjaGFuZ2VzWydMYXllck9mZnNldCddLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBaSW5kZXggb3IgTGF5ZXJPZmZzZXQgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1Nob3dMYWJlbHMnXSAmJiAhY2hhbmdlc1snU2hvd0xhYmVscyddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNaW5ab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWluWm9vbSddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNYXhab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuUmVkcmF3KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93VG9vbHRpcHMnXSAmJiB0aGlzLl90b29sdGlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcChjaGFuZ2VzWydTaG93VG9vbHRpcHMnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIExheWVyIElkLlxyXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGxheWVyIGlkLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwUG9seWxpbmVMYXllci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHZhcmlvdXMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgcG9seWxpbmVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwIC0gdGhlIHBvbHlsaW5lIGZvciB3aGljaCB0byBhZGQgdGhlIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWRkRXZlbnRMaXN0ZW5lcnMocDogUG9seWxpbmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVDbGljay5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVEYmxDbGljay5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lTW91c2VNb3ZlLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZU1vdXNlT3V0LmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVNb3VzZU92ZXIuZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4gcC5BZGRMaXN0ZW5lcihvYmoubmFtZSwgb2JqLmhhbmRsZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBwb2x5bGluZSBsYWJlbHMuIENhbGxlZCBieSB0aGUgQ2FudmFzIG92ZXJsYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsIC0gVGhlIGNhbnZhcyBvbiB3aGljaCB0byBkcmF3IHRoZSBsYWJlbHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIERyYXdMYWJlbHMoZWw6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2hvd0xhYmVscykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldFpvb20oKS50aGVuKHogPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTGFiZWxNaW5ab29tIDw9IHogJiYgdGhpcy5MYWJlbE1heFpvb20gPj0geikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gZWwuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbHMgPSB0aGlzLl9sYWJlbHMubWFwKHggPT4geC50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5Mb2NhdGlvbnNUb1BvaW50cyh0aGlzLl9sYWJlbHMubWFwKHggPT4geC5sb2MpKS50aGVuKGxvY3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplOiBJU2l6ZSA9IHRoaXMuX21hcFNlcnZpY2UuTWFwU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxvY3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGRyYXcgdGhlIHBvaW50IGlmIGl0IGlzIG5vdCBpbiB2aWV3LiBUaGlzIGdyZWF0bHkgaW1wcm92ZXMgcGVyZm9ybWFuY2Ugd2hlbiB6b29tZWQgaW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jc1tpXS54ID49IDAgJiYgbG9jc1tpXS55ID49IDAgJiYgbG9jc1tpXS54IDw9IHNpemUud2lkdGggJiYgbG9jc1tpXS55IDw9IHNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EcmF3VGV4dChjdHgsIGxvY3NbaV0sIGxhYmVsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIHRleHQgYXQgdGhlIGFwcHJvcHJpYXRlIHBsYWNlIG9uIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY3R4IC0gQ2FudmFzIGRyYXdpbmcgY29udGV4dC5cclxuICAgICAqIEBwYXJhbSBsb2MgLSBQaXhlbCBsb2NhdGlvbiBvbiB0aGUgY2FudmFzIHdoZXJlIHRvIGNlbnRlciB0aGUgdGV4dC5cclxuICAgICAqIEBwYXJhbSB0ZXh0IC0gVGV4dCB0byBkcmF3LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIERyYXdUZXh0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBsb2M6IElQb2ludCwgdGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGxvOiBJTGFiZWxPcHRpb25zID0gdGhpcy5MYWJlbE9wdGlvbnM7XHJcbiAgICAgICAgaWYgKGxvID09IG51bGwgJiYgdGhpcy5fdG9vbHRpcCkgeyBsbyA9IHRoaXMuX3Rvb2x0aXAuRGVmYXVsdExhYmVsU3R5bGU7IH1cclxuICAgICAgICBpZiAobG8gPT0gbnVsbCkgeyBsbyA9IHRoaXMuX2RlZmF1bHRPcHRpb25zOyB9XHJcblxyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxvLnN0cm9rZUNvbG9yO1xyXG4gICAgICAgIGN0eC5mb250ID0gYCR7bG8uZm9udFNpemV9cHggJHtsby5mb250RmFtaWx5fWA7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIGNvbnN0IHN0cm9rZVdlaWdodDogbnVtYmVyID0gbG8uc3Ryb2tlV2VpZ2h0O1xyXG4gICAgICAgIGlmICh0ZXh0ICYmIHN0cm9rZVdlaWdodCAmJiBzdHJva2VXZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3Ryb2tlV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGxvLmZvbnRDb2xvcjtcclxuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hbmFnZXMgdGhlIHRvb2x0aXAgYW5kIHRoZSBhdHRhY2htZW50IG9mIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2hvdyAtIFRydWUgdG8gZW5hYmxlIHRoZSB0b29sdGlwLCBmYWxzZSB0byBkaXNhYmxlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoc2hvdzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaG93ICYmIHRoaXMuX2NhbnZhcykge1xyXG4gICAgICAgICAgICAvLyBhZGQgdG9vbHRpcCBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlsaW5lTW91c2VNb3ZlLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLl9jYW52YXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZS5DbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgbG9jKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWxpbmVNb3VzZU92ZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuUG9seWxpbmUuVGl0bGUgJiYgZS5Qb2x5bGluZS5UaXRsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuX2NhbnZhcy5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlLkNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgndGV4dCcsIGUuUG9seWxpbmUuVGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5bGluZU1vdXNlT3V0LmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdG9vbHRpcCBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG9yIHVwZGF0ZXMgdGhlIHBvbHlsaW5lc3MgYmFzZWQgb24gdGhlIHBvbHlsaW5lIG9wdGlvbnMuIFRoaXMgd2lsbCBwbGFjZSB0aGUgcG9seWxpbmVzIG9uIHRoZSBtYXBcclxuICAgICAqIGFuZCByZWdpc3RlciB0aGUgYXNzb2NpYXRlZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBVcGRhdGVQb2x5bGluZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyUHJvbWlzZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4gPSB0aGlzLl9zdHJlYW1pbmcgPyB0aGlzLl9wb2x5bGluZXNMYXN0LnNwbGljZSgwKSA6IHRoaXMuX3BvbHlsaW5lcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zdHJlYW1pbmcpIHsgdGhpcy5fbGFiZWxzLnNwbGljZSgwKTsgfVxyXG5cclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIHByb21pc2UgZm9yIHRoZSBwb2x5bGluZXNcclxuICAgICAgICAgICAgY29uc3QgbHA6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPSB0aGlzLl9zZXJ2aWNlLkNyZWF0ZVBvbHlsaW5lcyhsLkdldE9wdGlvbnMoKS5pZCwgcG9seWxpbmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBwb2x5bGluZXMgb25jZSBwcm9taXNlcyBhcmUgZnVsbGZpbGxlZC5cclxuICAgICAgICAgICAgbHAudGhlbihwID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHk6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcclxuICAgICAgICAgICAgICAgIHAuZm9yRWFjaChwb2x5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwb2x5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50cm9pZHM6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9seS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRyb2lkcy5wdXNoKHguQ2VudHJvaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHguVGl0bGUgIT0gbnVsbCAmJiB4LlRpdGxlLmxlbmd0aCA+IDAgJiYgdGl0bGUubGVuZ3RoID09PSAwKSB7IHRpdGxlID0geC5UaXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFiZWxzLnB1c2goe2xvYzogUG9seWxpbmUuR2V0UG9seWxpbmVDZW50cm9pZChjZW50cm9pZHMpLCB0aXRsZTogdGl0bGV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkucHVzaChwb2x5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvbHkuVGl0bGUgIT0gbnVsbCAmJiBwb2x5LlRpdGxlLmxlbmd0aCA+IDApIHsgdGhpcy5fbGFiZWxzLnB1c2goe2xvYzogcG9seS5DZW50cm9pZCwgdGl0bGU6IHBvbHkuVGl0bGV9KTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKHBvbHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RyZWFtaW5nID8gbC5BZGRFbnRpdGllcyh5KSA6IGwuU2V0RW50aXRpZXMoeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5SZWRyYXcoIXRoaXMuX3N0cmVhbWluZyk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==