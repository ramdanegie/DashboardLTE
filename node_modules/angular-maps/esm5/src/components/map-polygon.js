/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolygonService } from '../services/polygon.service';
import { InfoBoxComponent } from './infobox';
var /** @type {?} */ polygonId = 0;
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
var MapPolygonDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolygonDirective.
     * @param _polygonManager
     *
     * @memberof MapPolygonDirective
     */
    function MapPolygonDirective(_polygonService, _containerRef) {
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
    Object.defineProperty(MapPolygonDirective.prototype, "AddedToService", {
        get: /**
         * Gets whether the polygon has been registered with the service.
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._addedToService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "Id", {
        get: /**
         * Get the id of the polygon.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "IdAsString", {
        get: /**
         * Gets the id of the polygon as a string.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._id.toString(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "InCustomLayer", {
        get: /**
         * Gets whether the polygon is in a custom layer. See {\@link MapLayer}.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._inCustomLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "LayerId", {
        get: /**
         * gets the id of the Layer the polygon belongs to.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._layerId; },
        enumerable: true,
        configurable: true
    });
    ///
    /// Public methods
    ///
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.ngAfterContentInit = /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        if (this._containerRef.element.nativeElement.parentElement) {
            var /** @type {?} */ parentName = this._containerRef.element.nativeElement.parentElement.tagName;
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
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * @param changes - Changes that have occured.
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapPolygonDirective.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToService) {
            return;
        }
        var /** @type {?} */ o = this.GeneratePolygonChangeSet(changes);
        if (o != null) {
            this._polygonService.SetOptions(this, o);
        }
        if (changes['Paths'] && !changes['Paths'].isFirstChange()) {
            this._polygonService.UpdatePolygon(this);
        }
    };
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.ngOnDestroy = /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        this._polygonService.DeletePolygon(this);
        this._events.forEach(function (s) { return s.unsubscribe(); });
    };
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.AddEventListeners = /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ _getEventArg = function (e) {
            return {
                Polygon: _this,
                Click: e
            };
        };
        this._events.push(this._polygonService.CreateEventObservable('click', this).subscribe(function (ev) {
            var /** @type {?} */ t = _this;
            if (_this._infoBox != null) {
                _this._infoBox.Open(_this._polygonService.GetCoordinatesFromClick(ev));
            }
            _this.Click.emit(_getEventArg(ev));
        }));
        var /** @type {?} */ handlers = [
            { name: 'dblclick', handler: function (ev) { return _this.DblClick.emit(_getEventArg(ev)); } },
            { name: 'drag', handler: function (ev) { return _this.Drag.emit(_getEventArg(ev)); } },
            { name: 'dragend', handler: function (ev) { return _this.DragEnd.emit(_getEventArg(ev)); } },
            { name: 'dragstart', handler: function (ev) { return _this.DragStart.emit(_getEventArg(ev)); } },
            { name: 'mousedown', handler: function (ev) { return _this.MouseDown.emit(_getEventArg(ev)); } },
            { name: 'mousemove', handler: function (ev) { return _this.MouseMove.emit(_getEventArg(ev)); } },
            { name: 'mouseout', handler: function (ev) { return _this.MouseOut.emit(_getEventArg(ev)); } },
            { name: 'mouseover', handler: function (ev) { return _this.MouseOver.emit(_getEventArg(ev)); } },
            { name: 'mouseup', handler: function (ev) { return _this.MouseUp.emit(_getEventArg(ev)); } },
            { name: 'rightclick', handler: function (ev) { return _this.RightClick.emit(_getEventArg(ev)); } },
            { name: 'pathchanged', handler: function (ev) { return _this.PathChanged.emit(ev); } }
        ];
        handlers.forEach(function (obj) {
            var /** @type {?} */ os = _this._polygonService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._events.push(os);
        });
    };
    /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    MapPolygonDirective.prototype.GeneratePolygonChangeSet = /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    function (changes) {
        var /** @type {?} */ options = { id: this._id };
        var /** @type {?} */ hasOptions = false;
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
    };
    MapPolygonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polygon'
                },] },
    ];
    /** @nocollapse */
    MapPolygonDirective.ctorParameters = function () { return [
        { type: PolygonService },
        { type: ViewContainerRef }
    ]; };
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
    return MapPolygonDirective;
}());
export { MapPolygonDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFDaEUsWUFBWSxFQUFFLFlBQVksRUFDN0IsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUU3QyxxQkFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0VGQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCw2QkFBb0IsZUFBK0IsRUFBVSxhQUErQjtRQUF4RSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7OEJBblNuRSxLQUFLOytCQUdKLEtBQUs7dUJBQ0csRUFBRTs7Ozs7O3lCQWFSLElBQUk7Ozs7Ozt5QkFPSixLQUFLOzs7Ozs7O3dCQVFOLEtBQUs7Ozs7Ozs7Ozs7d0JBeUJMLEtBQUs7Ozs7Ozt3QkFtQmEsSUFBSSxHQUFHLEVBQWU7Ozs7Ozs7Ozs7Ozs7O3FCQWVELEVBQUU7Ozs7OzsyQkFjN0IsSUFBSTs7Ozs7O3FCQXFESSxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt3QkFPOUIsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7b0JBT3JDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3VCQU85QixJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPL0IsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7eUJBT2pDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3lCQU9qQyxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt3QkFPbEMsSUFBSSxZQUFZ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OzsyQkF1RC9ELFlBQVksU0FBQyxnQkFBZ0I7NEJBUTdCLEtBQUs7NEJBT0wsS0FBSzsyQkFRTCxLQUFLOzRCQU9MLEtBQUs7OEJBT0wsS0FBSzsyQkFXTCxLQUFLOytCQU1MLEtBQUs7K0JBTUwsS0FBSzsyQkFPTCxLQUFLO3dCQWVMLEtBQUs7NEJBT0wsS0FBSzs4QkFPTCxLQUFLOzhCQU9MLEtBQUs7Z0NBT0wsS0FBSzsrQkFPTCxLQUFLO3dCQU9MLEtBQUs7MEJBT0wsS0FBSzt5QkFPTCxLQUFLO3dCQVdMLE1BQU07MkJBT04sTUFBTTt1QkFPTixNQUFNOzBCQU9OLE1BQU07NEJBT04sTUFBTTs0QkFPTixNQUFNOzRCQU9OLE1BQU07MkJBT04sTUFBTTs0QkFPTixNQUFNOzBCQU9OLE1BQU07NkJBUU4sTUFBTTs4QkFPTixNQUFNOzs4QkEzUlg7O1NBMENhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSVBvbHlnb25FdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tZXZlbnQnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuL2luZm9ib3gnO1xyXG5cclxubGV0IHBvbHlnb25JZCA9IDA7XHJcblxyXG4vKipcclxuICpcclxuICogTWFwUG9seWdvbkRpcmVjdGl2ZSByZW5kZXJzIGEgcG9seWdvbiBpbnNpZGUgYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1wb2x5Z29uIFtQYXRoc109XCJwYXRoXCI+PC94LW1hcC1wb2x5Z29uPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5Z29uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwUG9seWdvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaW5DdXN0b21MYXllciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2xheWVySWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2FkZGVkVG9TZXJ2aWNlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9ldmVudHM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQW55IEluZm9Cb3ggdGhhdCBpcyBhIGRpcmVjdCBjaGlsZHJlbiBvZiB0aGUgcG9seWdvblxyXG4gICAgLy8vXHJcbiAgICBAQ29udGVudENoaWxkKEluZm9Cb3hDb21wb25lbnQpIHByb3RlY3RlZCBfaW5mb0JveDogSW5mb0JveENvbXBvbmVudDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGlzIFBvbHlnb24gaGFuZGxlcyBtb3VzZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIENsaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBzaGFwZSBvdmVyIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIERyYWdnYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2xcclxuICAgICAqIHBvaW50cyBzaG93biBhdCB0aGUgdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRWRpdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWxsIGNvbG9yIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBGaWxsQ29sb3I6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBGaWxsT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiB0cnVlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGxcclxuICAgICAqIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlXHJcbiAgICAgKiByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYVxyXG4gICAgICogZ2VvZGVzaWMgcG9seWdvbiBtYXkgYXBwZWFyIHRvIGNoYW5nZSB3aGVuIGRyYWdnZWQsIGFzIHRoZSBkaW1lbnNpb25zXHJcbiAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBHZW9kZXNpYyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlnb24gbGFibGUgaXMgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNYXhab29tOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJsZSBpcyB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1pblpvb206IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFyYml0YXJ5IG1ldGFkYXRhIHRvIGFzc2lnbiB0byB0aGUgUG9seWdvbi4gVGhpcyBpcyB1c2VmdWwgZm9yIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBNZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3JkZXJlZCBzZXF1ZW5jZSBvZiBjb29yZGluYXRlcyB0aGF0IGRlc2lnbmF0ZXMgYSBjbG9zZWQgbG9vcC5cclxuICAgICAqIFVubGlrZSBwb2x5bGluZXMsIGEgcG9seWdvbiBtYXkgY29uc2lzdCBvZiBvbmUgb3IgbW9yZSBwYXRocy5cclxuICAgICAqIEFzIGEgcmVzdWx0LCB0aGUgcGF0aHMgcHJvcGVydHkgbWF5IHNwZWNpZnkgb25lIG9yIG1vcmUgYXJyYXlzIG9mXHJcbiAgICAgKiBMYXRMbmcgY29vcmRpbmF0ZXMuIFBhdGhzIGFyZSBjbG9zZWQgYXV0b21hdGljYWxseTsgZG8gbm90IHJlcGVhdCB0aGVcclxuICAgICAqIGZpcnN0IHZlcnRleCBvZiB0aGUgcGF0aCBhcyB0aGUgbGFzdCB2ZXJ0ZXguIFNpbXBsZSBwb2x5Z29ucyBtYXkgYmVcclxuICAgICAqIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZSBjb21wbGV4IHBvbHlnb25zIG1heVxyXG4gICAgICogc3BlY2lmeSBhbiBhcnJheSBvZiBhcnJheXMgKGZvciBpbm5lciBsb29wcyApLiBBbnkgc2ltcGxlIGFycmF5cyBhcmUgY29udmVydGVkIGludG8gQXJyYXlzLlxyXG4gICAgICogSW5zZXJ0aW5nIG9yIHJlbW92aW5nIExhdExuZ3MgZnJvbSB0aGUgQXJyYXkgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZVxyXG4gICAgICogdGhlIHBvbHlnb24gb24gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgUGF0aHM6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGUgYXMgdGhlIGxhYmVsIG9uIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93TGFiZWw6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHRpdGxlIG9mIHRoZSBwb2x5Z29uIGFzIHRoZSB0b29sdGlwIG9uIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93VG9vbHRpcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3Ryb2tlIGNvbG9yLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTdHJva2VDb2xvcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFN0cm9rZVdlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpdGxlIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBUaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGlzIHBvbHlnb24gaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgekluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRGVsZWdhdGUgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRHJhZzogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZU91dDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3Zlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb25cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VVcDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgUG9seWdvbiBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gZWRpdGluZyBoYXMgY29tcGxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQYXRoQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaGFzIGJlZW4gcmVnaXN0ZXJlZCB3aXRoIHRoZSBzZXJ2aWNlLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IEFkZGVkVG9TZXJ2aWNlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWRkZWRUb1NlcnZpY2U7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgaWQgb2YgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIHBvbHlnb24gYXMgYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkQXNTdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBpbiBhIGN1c3RvbSBsYXllci4gU2VlIHtAbGluayBNYXBMYXllcn0uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IEluQ3VzdG9tTGF5ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkN1c3RvbUxheWVyOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBpZCBvZiB0aGUgTGF5ZXIgdGhlIHBvbHlnb24gYmVsb25ncyB0by5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTGF5ZXJJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGF5ZXJJZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwUG9seWdvbkRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfcG9seWdvbk1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5Z29uU2VydmljZTogUG9seWdvblNlcnZpY2UsIHByaXZhdGUgX2NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMuX2lkID0gcG9seWdvbklkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBjb250ZW50IGludGlhbGl6YXRpb24gb2YgdGhlIGRpcmVjdGl2ZSBpcyBjb21wbGV0ZS4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50TmFtZTogc3RyaW5nID0gdGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd4LW1hcC1sYXllcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luQ3VzdG9tTGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJJZCA9IE51bWJlcih0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuYXR0cmlidXRlc1snbGF5ZXJJZCddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9TZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25TZXJ2aWNlLkFkZFBvbHlnb24odGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZGVkVG9TZXJ2aWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBjaGFuZ2VzIHRvIHRoZSBkYXRhYm91ZCBwcm9wZXJ0aWVzIG9jY3VyLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvU2VydmljZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgY29uc3QgbzogSVBvbHlnb25PcHRpb25zID0gdGhpcy5HZW5lcmF0ZVBvbHlnb25DaGFuZ2VTZXQoY2hhbmdlcyk7XHJcbiAgICAgICAgaWYgKG8gIT0gbnVsbCkgeyB0aGlzLl9wb2x5Z29uU2VydmljZS5TZXRPcHRpb25zKHRoaXMsIG8pOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1BhdGhzJ10gJiYgIWNoYW5nZXNbJ1BhdGhzJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25TZXJ2aWNlLlVwZGF0ZVBvbHlnb24odGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBwb3lnb24gaXMgYmVpbmcgZGVzdHJveWVkLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS4gUmVsZWFzZSByZXNvdXJjZXMuXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb25TZXJ2aWNlLkRlbGV0ZVBvbHlnb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy8vIHJlbW92ZSBldmVudCBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgLy8vXHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpcmVzIHVwIHRoZSBldmVudCByZWNlaXZlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBjb25zdCBfZ2V0RXZlbnRBcmc6IChlOiBNb3VzZUV2ZW50KSA9PiBJUG9seWdvbkV2ZW50ID0gZSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBQb2x5Z29uOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHRoaXMuX3BvbHlnb25TZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHQ6IE1hcFBvbHlnb25EaXJlY3RpdmUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5mb0JveCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmZvQm94Lk9wZW4odGhpcy5fcG9seWdvblNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZXYpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EYmxDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZy5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdlbmQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZ0VuZC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnU3RhcnQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VEb3duLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlTW92ZS5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3V0LmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3Zlci5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VVcC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUmlnaHRDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3BhdGhjaGFuZ2VkJywgaGFuZGxlcjogKGV2OiBJUG9seWdvbkV2ZW50KSA9PiB0aGlzLlBhdGhDaGFuZ2VkLmVtaXQoZXYpIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcyA9IHRoaXMuX3BvbHlnb25TZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2gob3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBJUG9seWdvbiBvcHRpb24gY2hhbmdlc2V0IGZyb20gZGlyZWN0aXZlIHNldHRpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0ge0BsaW5rIFNpbXBsZUNoYW5nZXN9IGlkZW50aWZ5aW5nIHRoZSBjaGFuZ2VzIHRoYXQgb2NjdXJlZC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElQb2x5Z29uT3B0aW9uc30gY29udGFpbmluZyB0aGUgcG9seWdvbiBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2VuZXJhdGVQb2x5Z29uQ2hhbmdlU2V0KGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBJUG9seWdvbk9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyA9IHsgaWQ6IHRoaXMuX2lkIH07XHJcbiAgICAgICAgbGV0IGhhc09wdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoY2hhbmdlc1snQ2xpY2thYmxlJ10pIHsgb3B0aW9ucy5jbGlja2FibGUgPSB0aGlzLkNsaWNrYWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snRHJhZ2dhYmxlJ10pIHsgb3B0aW9ucy5kcmFnZ2FibGUgPSB0aGlzLkRyYWdnYWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snRWRpdGFibGUnXSkgeyBvcHRpb25zLmVkaXRhYmxlID0gdGhpcy5FZGl0YWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snRmlsbENvbG9yJ10gfHwgY2hhbmdlc1snRmlsbE9wYWNpdHknXSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmZpbGxDb2xvciA9IHRoaXMuRmlsbENvbG9yO1xyXG4gICAgICAgICAgICBvcHRpb25zLmZpbGxPcGFjaXR5ID0gdGhpcy5GaWxsT3BhY2l0eTtcclxuICAgICAgICAgICAgaGFzT3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydHZW9kZXNpYyddKSB7IG9wdGlvbnMuZ2VvZGVzaWMgPSB0aGlzLkdlb2Rlc2ljOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbE1heFpvb20nXSkgeyBvcHRpb25zLmxhYmVsTWF4Wm9vbSA9IHRoaXMuTGFiZWxNYXhab29tOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbE1pblpvb20nXSkgeyBvcHRpb25zLmxhYmVsTWluWm9vbSA9IHRoaXMuTGFiZWxNaW5ab29tOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93VG9vbHRpcCddKSB7IG9wdGlvbnMuc2hvd1Rvb2x0aXAgPSB0aGlzLlNob3dUb29sdGlwOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93TGFiZWwnXSkgeyBvcHRpb25zLnNob3dMYWJlbCA9IHRoaXMuU2hvd0xhYmVsOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VDb2xvciddIHx8IGNoYW5nZXNbJ1N0cm9rZU9wYWNpdHknXSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0cm9rZUNvbG9yID0gdGhpcy5TdHJva2VDb2xvcjtcclxuICAgICAgICAgICAgb3B0aW9ucy5zdHJva2VPcGFjaXR5ID0gdGhpcy5TdHJva2VPcGFjaXR5O1xyXG4gICAgICAgICAgICBoYXNPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1N0cm9rZVdlaWdodCddKSB7IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0ID0gdGhpcy5TdHJva2VXZWlnaHQ7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1RpdGxlJ10pIHsgb3B0aW9ucy50aXRsZSA9IHRoaXMuVGl0bGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSkgeyBvcHRpb25zLnZpc2libGUgPSB0aGlzLlZpc2libGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7IG9wdGlvbnMuekluZGV4ID0gdGhpcy56SW5kZXg7IGhhc09wdGlvbnMgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIGhhc09wdGlvbnMgPyBvcHRpb25zIDogbnVsbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19