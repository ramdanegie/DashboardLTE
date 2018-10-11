/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolygonService } from '../services/polygon.service';
import { InfoBoxComponent } from './infobox';
let /** @type {?} */ polygonId = 0;
/**
 *
 * MapPolygonDirective renders a polygon inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapPolygonDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map,
 *  styles: [`
 *   .map-container { height: 300px; }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polygon [Paths]="path"></x-map-polygon>
 *   </x-map>
 * `
 * })
 * ```
 *
 *
 * @export
 */
export class MapPolygonDirective {
    /**
     * Creates an instance of MapPolygonDirective.
     * \@memberof MapPolygonDirective
     * @param {?} _polygonService
     * @param {?} _containerRef
     */
    constructor(_polygonService, _containerRef) {
        this._polygonService = _polygonService;
        this._containerRef = _containerRef;
        this._inCustomLayer = false;
        this._addedToService = false;
        this._events = [];
        /**
         * Gets or sets whether this Polygon handles mouse events.
         *
         * \@memberof MapPolygonDirective
         */
        this.Clickable = true;
        /**
         * If set to true, the user can drag this shape over the map.
         *
         * \@memberof MapPolygonDirective
         */
        this.Draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment.
         *
         * \@memberof MapPolygonDirective
         */
        this.Editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         *
         * \@memberof MapPolygonDirective
         */
        this.Geodesic = false;
        /**
         * Arbitary metadata to assign to the Polygon. This is useful for events
         *
         * \@memberof MapPolygonDirective
         */
        this.Metadata = new Map();
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         * As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays (for inner loops ). Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         *
         * \@memberof MapPolygonDirective
         */
        this.Paths = [];
        /**
         * Whether to show the title of the polygon as the tooltip on the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.ShowTooltip = true;
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.Click = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         *
         * \@memberof MapPolygonDirective
         */
        this.RightClick = new EventEmitter();
        /**
         * This event is fired when editing has completed.
         *
         * \@memberof MapPolygonDirective
         */
        this.PathChanged = new EventEmitter();
        this._id = polygonId++;
    }
    /**
     * Gets whether the polygon has been registered with the service.
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get AddedToService() { return this._addedToService; }
    /**
     * Get the id of the polygon.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets the id of the polygon as a string.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get IdAsString() { return this._id.toString(); }
    /**
     * Gets whether the polygon is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the polygon belongs to.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._containerRef.element.nativeElement.parentElement) {
            const /** @type {?} */ parentName = this._containerRef.element.nativeElement.parentElement.tagName;
            if (parentName.toLowerCase() === 'x-map-layer') {
                this._inCustomLayer = true;
                this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
            }
        }
        if (!this._addedToService) {
            this._polygonService.AddPolygon(this);
            this._addedToService = true;
            this.AddEventListeners();
        }
        return;
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToService) {
            return;
        }
        const /** @type {?} */ o = this.GeneratePolygonChangeSet(changes);
        if (o != null) {
            this._polygonService.SetOptions(this, o);
        }
        if (changes['Paths'] && !changes['Paths'].isFirstChange()) {
            this._polygonService.UpdatePolygon(this);
        }
    }
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._polygonService.DeletePolygon(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    AddEventListeners() {
        const /** @type {?} */ _getEventArg = e => {
            return {
                Polygon: this,
                Click: e
            };
        };
        this._events.push(this._polygonService.CreateEventObservable('click', this).subscribe((ev) => {
            const /** @type {?} */ t = this;
            if (this._infoBox != null) {
                this._infoBox.Open(this._polygonService.GetCoordinatesFromClick(ev));
            }
            this.Click.emit(_getEventArg(ev));
        }));
        const /** @type {?} */ handlers = [
            { name: 'dblclick', handler: (ev) => this.DblClick.emit(_getEventArg(ev)) },
            { name: 'drag', handler: (ev) => this.Drag.emit(_getEventArg(ev)) },
            { name: 'dragend', handler: (ev) => this.DragEnd.emit(_getEventArg(ev)) },
            { name: 'dragstart', handler: (ev) => this.DragStart.emit(_getEventArg(ev)) },
            { name: 'mousedown', handler: (ev) => this.MouseDown.emit(_getEventArg(ev)) },
            { name: 'mousemove', handler: (ev) => this.MouseMove.emit(_getEventArg(ev)) },
            { name: 'mouseout', handler: (ev) => this.MouseOut.emit(_getEventArg(ev)) },
            { name: 'mouseover', handler: (ev) => this.MouseOver.emit(_getEventArg(ev)) },
            { name: 'mouseup', handler: (ev) => this.MouseUp.emit(_getEventArg(ev)) },
            { name: 'rightclick', handler: (ev) => this.RightClick.emit(_getEventArg(ev)) },
            { name: 'pathchanged', handler: (ev) => this.PathChanged.emit(ev) }
        ];
        handlers.forEach((obj) => {
            const /** @type {?} */ os = this._polygonService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
    /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    GeneratePolygonChangeSet(changes) {
        const /** @type {?} */ options = { id: this._id };
        let /** @type {?} */ hasOptions = false;
        if (changes['Clickable']) {
            options.clickable = this.Clickable;
            hasOptions = true;
        }
        if (changes['Draggable']) {
            options.draggable = this.Draggable;
            hasOptions = true;
        }
        if (changes['Editable']) {
            options.editable = this.Editable;
            hasOptions = true;
        }
        if (changes['FillColor'] || changes['FillOpacity']) {
            options.fillColor = this.FillColor;
            options.fillOpacity = this.FillOpacity;
            hasOptions = true;
        }
        if (changes['Geodesic']) {
            options.geodesic = this.Geodesic;
            hasOptions = true;
        }
        if (changes['LabelMaxZoom']) {
            options.labelMaxZoom = this.LabelMaxZoom;
            hasOptions = true;
        }
        if (changes['LabelMinZoom']) {
            options.labelMinZoom = this.LabelMinZoom;
            hasOptions = true;
        }
        if (changes['ShowTooltip']) {
            options.showTooltip = this.ShowTooltip;
            hasOptions = true;
        }
        if (changes['ShowLabel']) {
            options.showLabel = this.ShowLabel;
            hasOptions = true;
        }
        if (changes['StrokeColor'] || changes['StrokeOpacity']) {
            options.strokeColor = this.StrokeColor;
            options.strokeOpacity = this.StrokeOpacity;
            hasOptions = true;
        }
        if (changes['StrokeWeight']) {
            options.strokeWeight = this.StrokeWeight;
            hasOptions = true;
        }
        if (changes['Title']) {
            options.title = this.Title;
            hasOptions = true;
        }
        if (changes['Visible']) {
            options.visible = this.Visible;
            hasOptions = true;
        }
        if (changes['zIndex']) {
            options.zIndex = this.zIndex;
            hasOptions = true;
        }
        return hasOptions ? options : null;
    }
}
MapPolygonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-polygon'
            },] },
];
/** @nocollapse */
MapPolygonDirective.ctorParameters = () => [
    { type: PolygonService },
    { type: ViewContainerRef }
];
MapPolygonDirective.propDecorators = {
    _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
    Clickable: [{ type: Input }],
    Draggable: [{ type: Input }],
    Editable: [{ type: Input }],
    FillColor: [{ type: Input }],
    FillOpacity: [{ type: Input }],
    Geodesic: [{ type: Input }],
    LabelMaxZoom: [{ type: Input }],
    LabelMinZoom: [{ type: Input }],
    Metadata: [{ type: Input }],
    Paths: [{ type: Input }],
    ShowLabel: [{ type: Input }],
    ShowTooltip: [{ type: Input }],
    StrokeColor: [{ type: Input }],
    StrokeOpacity: [{ type: Input }],
    StrokeWeight: [{ type: Input }],
    Title: [{ type: Input }],
    Visible: [{ type: Input }],
    zIndex: [{ type: Input }],
    Click: [{ type: Output }],
    DblClick: [{ type: Output }],
    Drag: [{ type: Output }],
    DragEnd: [{ type: Output }],
    DragStart: [{ type: Output }],
    MouseDown: [{ type: Output }],
    MouseMove: [{ type: Output }],
    MouseOut: [{ type: Output }],
    MouseOver: [{ type: Output }],
    MouseUp: [{ type: Output }],
    RightClick: [{ type: Output }],
    PathChanged: [{ type: Output }]
};
function MapPolygonDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolygonDirective.prototype._inCustomLayer;
    /** @type {?} */
    MapPolygonDirective.prototype._id;
    /** @type {?} */
    MapPolygonDirective.prototype._layerId;
    /** @type {?} */
    MapPolygonDirective.prototype._addedToService;
    /** @type {?} */
    MapPolygonDirective.prototype._events;
    /** @type {?} */
    MapPolygonDirective.prototype._infoBox;
    /**
     * Gets or sets whether this Polygon handles mouse events.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Clickable;
    /**
     * If set to true, the user can drag this shape over the map.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Editable;
    /**
     * The fill color of the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.FillColor;
    /**
     * The fill opacity between 0.0 and 1.0
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.FillOpacity;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polygon are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Geodesic;
    /**
     * Set the maximum zoom at which the polygon lable is visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polygon lable is visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.LabelMinZoom;
    /**
     * Arbitary metadata to assign to the Polygon. This is useful for events
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Metadata;
    /**
     * The ordered sequence of coordinates that designates a closed loop.
     * Unlike polylines, a polygon may consist of one or more paths.
     * As a result, the paths property may specify one or more arrays of
     * LatLng coordinates. Paths are closed automatically; do not repeat the
     * first vertex of the path as the last vertex. Simple polygons may be
     * defined using a single array of LatLngs. More complex polygons may
     * specify an array of arrays (for inner loops ). Any simple arrays are converted into Arrays.
     * Inserting or removing LatLngs from the Array will automatically update
     * the polygon on the map.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Paths;
    /**
     * Whether to show the title as the label on the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.ShowLabel;
    /**
     * Whether to show the title of the polygon as the tooltip on the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.ShowTooltip;
    /**
     * The stroke color.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeOpacity;
    /**
     * The stroke width in pixels.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeWeight;
    /**
     * The title of the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Title;
    /**
     * Whether this polygon is visible on the map. Defaults to true.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Visible;
    /**
     * The zIndex compared to other polys.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Click;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DragEnd;
    /**
     * This event is fired when the user starts dragging the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseMove;
    /**
     * This event is fired on Polygon mouseout.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseOut;
    /**
     * This event is fired on Polygon mouseover.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polygon
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseUp;
    /**
     * This event is fired when the Polygon is right-clicked on.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.RightClick;
    /**
     * This event is fired when editing has completed.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.PathChanged;
    /** @type {?} */
    MapPolygonDirective.prototype._polygonService;
    /** @type {?} */
    MapPolygonDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFDaEUsWUFBWSxFQUFFLFlBQVksRUFDN0IsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUU3QyxxQkFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCbEIsTUFBTTs7Ozs7OztJQXdTRixZQUFvQixlQUErQixFQUFVLGFBQStCO1FBQXhFLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjs4QkFuU25FLEtBQUs7K0JBR0osS0FBSzt1QkFDRyxFQUFFOzs7Ozs7eUJBYVIsSUFBSTs7Ozs7O3lCQU9KLEtBQUs7Ozs7Ozs7d0JBUU4sS0FBSzs7Ozs7Ozs7Ozt3QkF5QkwsS0FBSzs7Ozs7O3dCQW1CYSxJQUFJLEdBQUcsRUFBZTs7Ozs7Ozs7Ozs7Ozs7cUJBZUQsRUFBRTs7Ozs7OzJCQWM3QixJQUFJOzs7Ozs7cUJBcURJLElBQUksWUFBWSxFQUFpQjs7Ozs7O3dCQU85QixJQUFJLFlBQVksRUFBaUI7Ozs7OztvQkFPckMsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7dUJBTzlCLElBQUksWUFBWSxFQUFpQjs7Ozs7O3lCQU8vQixJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPakMsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7eUJBT2pDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3dCQU9sQyxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPaEMsSUFBSSxZQUFZ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LEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3ZGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzNGLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtTQUNyRixDQUFDO1FBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxD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TUFBTTttQkFPTixNQUFNO3NCQU9OLE1BQU07d0JBT04sTUFBTTt3QkFPTixNQUFNO3dCQU9OLE1BQU07dUJBT04sTUFBTTt3QkFPTixNQUFNO3NCQU9OLE1BQU07eUJBUU4sTUFBTTswQkFPTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJUG9seWdvbkV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1ldmVudCc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9seWdvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveENvbXBvbmVudCB9IGZyb20gJy4vaW5mb2JveCc7XHJcblxyXG5sZXQgcG9seWdvbklkID0gMDtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBNYXBQb2x5Z29uRGlyZWN0aXZlIHJlbmRlcnMgYSBwb2x5Z29uIGluc2lkZSBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLXBvbHlnb24gW1BhdGhzXT1cInBhdGhcIj48L3gtbWFwLXBvbHlnb24+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLXBvbHlnb24nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBQb2x5Z29uRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pbkN1c3RvbUxheWVyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYWRkZWRUb1NlcnZpY2UgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2V2ZW50czogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBBbnkgSW5mb0JveCB0aGF0IGlzIGEgZGlyZWN0IGNoaWxkcmVuIG9mIHRoZSBwb2x5Z29uXHJcbiAgICAvLy9cclxuICAgIEBDb250ZW50Q2hpbGQoSW5mb0JveENvbXBvbmVudCkgcHJvdGVjdGVkIF9pbmZvQm94OiBJbmZvQm94Q29tcG9uZW50O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoaXMgUG9seWdvbiBoYW5kbGVzIG1vdXNlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgQ2xpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRHJhZ2dhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbFxyXG4gICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBFZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGwgY29sb3Igb2YgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEZpbGxDb2xvcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGwgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEZpbGxPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbFxyXG4gICAgICogZm9sbG93IHRoZSBjdXJ2YXR1cmUgb2YgdGhlIEVhcnRoLiBXaGVuIGZhbHNlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmVcclxuICAgICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXHJcbiAgICAgKiBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcclxuICAgICAqIGFyZSBtYWludGFpbmVkIHJlbGF0aXZlIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSBlYXJ0aC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEdlb2Rlc2ljID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJsZSBpcyB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1heFpvb206IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5Z29uIGxhYmxlIGlzIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWluWm9vbTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJiaXRhcnkgbWV0YWRhdGEgdG8gYXNzaWduIHRvIHRoZSBQb2x5Z29uLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIE1ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmRlcmVkIHNlcXVlbmNlIG9mIGNvb3JkaW5hdGVzIHRoYXQgZGVzaWduYXRlcyBhIGNsb3NlZCBsb29wLlxyXG4gICAgICogVW5saWtlIHBvbHlsaW5lcywgYSBwb2x5Z29uIG1heSBjb25zaXN0IG9mIG9uZSBvciBtb3JlIHBhdGhzLlxyXG4gICAgICogQXMgYSByZXN1bHQsIHRoZSBwYXRocyBwcm9wZXJ0eSBtYXkgc3BlY2lmeSBvbmUgb3IgbW9yZSBhcnJheXMgb2ZcclxuICAgICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxyXG4gICAgICogZmlyc3QgdmVydGV4IG9mIHRoZSBwYXRoIGFzIHRoZSBsYXN0IHZlcnRleC4gU2ltcGxlIHBvbHlnb25zIG1heSBiZVxyXG4gICAgICogZGVmaW5lZCB1c2luZyBhIHNpbmdsZSBhcnJheSBvZiBMYXRMbmdzLiBNb3JlIGNvbXBsZXggcG9seWdvbnMgbWF5XHJcbiAgICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cyAoZm9yIGlubmVyIGxvb3BzICkuIEFueSBzaW1wbGUgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgaW50byBBcnJheXMuXHJcbiAgICAgKiBJbnNlcnRpbmcgb3IgcmVtb3ZpbmcgTGF0TG5ncyBmcm9tIHRoZSBBcnJheSB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlXHJcbiAgICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBQYXRoczogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZSBhcyB0aGUgbGFiZWwgb24gdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFNob3dMYWJlbDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGUgb2YgdGhlIHBvbHlnb24gYXMgdGhlIHRvb2x0aXAgb24gdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFNob3dUb29sdGlwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdHJva2UgY29sb3IuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTdHJva2VPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlV2VpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgcG9seWdvbiBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB6SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEYmxDbGljazogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIERyYWdFbmQ6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIERyYWdTdGFydDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZURvd246IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdmVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZVVwOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5Z29uIGlzIHJpZ2h0LWNsaWNrZWQgb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBlZGl0aW5nIGhhcyBjb21wbGV0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBhdGhDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBoYXMgYmVlbiByZWdpc3RlcmVkIHdpdGggdGhlIHNlcnZpY2UuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQWRkZWRUb1NlcnZpY2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hZGRlZFRvU2VydmljZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBpZCBvZiB0aGUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgcG9seWdvbiBhcyBhIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWRBc1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGluIGEgY3VzdG9tIGxheWVyLiBTZWUge0BsaW5rIE1hcExheWVyfS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSW5DdXN0b21MYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ3VzdG9tTGF5ZXI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGlkIG9mIHRoZSBMYXllciB0aGUgcG9seWdvbiBiZWxvbmdzIHRvLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMYXllcklkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sYXllcklkOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBQb2x5Z29uRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9wb2x5Z29uTWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlnb25TZXJ2aWNlOiBQb2x5Z29uU2VydmljZSwgcHJpdmF0ZSBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBwb2x5Z29uSWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnRlbnQgaW50aWFsaXphdGlvbiBvZiB0aGUgZGlyZWN0aXZlIGlzIGNvbXBsZXRlLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lOiBzdHJpbmcgPSB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQudGFnTmFtZTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3gtbWFwLWxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5DdXN0b21MYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuQWRkUG9seWdvbih0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fYWRkZWRUb1NlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9TZXJ2aWNlKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBjb25zdCBvOiBJUG9seWdvbk9wdGlvbnMgPSB0aGlzLkdlbmVyYXRlUG9seWdvbkNoYW5nZVNldChjaGFuZ2VzKTtcclxuICAgICAgICBpZiAobyAhPSBudWxsKSB7IHRoaXMuX3BvbHlnb25TZXJ2aWNlLlNldE9wdGlvbnModGhpcywgbyk7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snUGF0aHMnXSAmJiAhY2hhbmdlc1snUGF0aHMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuVXBkYXRlUG9seWdvbih0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHBveWdvbiBpcyBiZWluZyBkZXN0cm95ZWQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLiBSZWxlYXNlIHJlc291cmNlcy5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuRGVsZXRlUG9seWdvbih0aGlzKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gcmVtb3ZlIGV2ZW50IHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAvLy9cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lyZXMgdXAgdGhlIGV2ZW50IHJlY2VpdmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IF9nZXRFdmVudEFyZzogKGU6IE1vdXNlRXZlbnQpID0+IElQb2x5Z29uRXZlbnQgPSBlID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFBvbHlnb246IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBDbGljazogZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2godGhpcy5fcG9seWdvblNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoZXY6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdDogTWFwUG9seWdvbkRpcmVjdGl2ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luZm9Cb3guT3Blbih0aGlzLl9wb2x5Z29uU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhldikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuQ2xpY2suZW1pdChfZ2V0RXZlbnRBcmcoZXYpKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRibENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdTdGFydC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZURvd24uZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VNb3ZlLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdXQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdmVyLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZVVwLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5SaWdodENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncGF0aGNoYW5nZWQnLCBoYW5kbGVyOiAoZXY6IElQb2x5Z29uRXZlbnQpID0+IHRoaXMuUGF0aENoYW5nZWQuZW1pdChldikgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9zID0gdGhpcy5fcG9seWdvblNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMucHVzaChvcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIElQb2x5Z29uIG9wdGlvbiBjaGFuZ2VzZXQgZnJvbSBkaXJlY3RpdmUgc2V0dGluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSB7QGxpbmsgU2ltcGxlQ2hhbmdlc30gaWRlbnRpZnlpbmcgdGhlIGNoYW5nZXMgdGhhdCBvY2N1cmVkLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBjb250YWluaW5nIHRoZSBwb2x5Z29uIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZW5lcmF0ZVBvbHlnb25DaGFuZ2VTZXQoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IElQb2x5Z29uT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSVBvbHlnb25PcHRpb25zID0geyBpZDogdGhpcy5faWQgfTtcclxuICAgICAgICBsZXQgaGFzT3B0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbGlja2FibGUnXSkgeyBvcHRpb25zLmNsaWNrYWJsZSA9IHRoaXMuQ2xpY2thYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydEcmFnZ2FibGUnXSkgeyBvcHRpb25zLmRyYWdnYWJsZSA9IHRoaXMuRHJhZ2dhYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydFZGl0YWJsZSddKSB7IG9wdGlvbnMuZWRpdGFibGUgPSB0aGlzLkVkaXRhYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydGaWxsQ29sb3InXSB8fCBjaGFuZ2VzWydGaWxsT3BhY2l0eSddKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsbENvbG9yID0gdGhpcy5GaWxsQ29sb3I7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsbE9wYWNpdHkgPSB0aGlzLkZpbGxPcGFjaXR5O1xyXG4gICAgICAgICAgICBoYXNPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0dlb2Rlc2ljJ10pIHsgb3B0aW9ucy5nZW9kZXNpYyA9IHRoaXMuR2VvZGVzaWM7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddKSB7IG9wdGlvbnMubGFiZWxNYXhab29tID0gdGhpcy5MYWJlbE1heFpvb207IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xhYmVsTWluWm9vbSddKSB7IG9wdGlvbnMubGFiZWxNaW5ab29tID0gdGhpcy5MYWJlbE1pblpvb207IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dUb29sdGlwJ10pIHsgb3B0aW9ucy5zaG93VG9vbHRpcCA9IHRoaXMuU2hvd1Rvb2x0aXA7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dMYWJlbCddKSB7IG9wdGlvbnMuc2hvd0xhYmVsID0gdGhpcy5TaG93TGFiZWw7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1N0cm9rZUNvbG9yJ10gfHwgY2hhbmdlc1snU3Ryb2tlT3BhY2l0eSddKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSB0aGlzLlN0cm9rZUNvbG9yO1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0cm9rZU9wYWNpdHkgPSB0aGlzLlN0cm9rZU9wYWNpdHk7XHJcbiAgICAgICAgICAgIGhhc09wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snU3Ryb2tlV2VpZ2h0J10pIHsgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSB0aGlzLlN0cm9rZVdlaWdodDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVGl0bGUnXSkgeyBvcHRpb25zLnRpdGxlID0gdGhpcy5UaXRsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7IG9wdGlvbnMudmlzaWJsZSA9IHRoaXMuVmlzaWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHsgb3B0aW9ucy56SW5kZXggPSB0aGlzLnpJbmRleDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gaGFzT3B0aW9ucyA/IG9wdGlvbnMgOiBudWxsO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=