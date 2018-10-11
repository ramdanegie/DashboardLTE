/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolylineService } from '../services/polyline.service';
import { InfoBoxComponent } from './infobox';
let /** @type {?} */ polylineId = 0;
/**
 *
 * MapPolylineDirective renders a polyline inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapPolylineDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map,
 *  styles: [`
 *   .map-container { height: 300px; }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polyline [Paths]="path"></x-map-polyline>
 *   </x-map>
 * `
 * })
 * ```
 *
 *
 * @export
 */
export class MapPolylineDirective {
    /**
     * Creates an instance of MapPolylineDirective.
     * \@memberof MapPolylineDirective
     * @param {?} _polylineService
     * @param {?} _containerRef
     */
    constructor(_polylineService, _containerRef) {
        this._polylineService = _polylineService;
        this._containerRef = _containerRef;
        this._inCustomLayer = false;
        this._addedToService = false;
        this._events = [];
        /**
         * Gets or sets whether this Polyline handles mouse events.
         *
         * \@memberof MapPolylineDirective
         */
        this.Clickable = true;
        /**
         * If set to true, the user can drag this shape over the map.
         *
         * \@memberof MapPolylineDirective
         */
        this.Draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment.
         *
         * \@memberof MapPolylineDirective
         */
        this.Editable = false;
        /**
         * When true, edges of the polyline are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polyline are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polyline may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         *
         * \@memberof MapPolylineDirective
         */
        this.Geodesic = false;
        /**
         * Arbitary metadata to assign to the Polyline. This is useful for events
         *
         * \@memberof MapPolylineDirective
         */
        this.Metadata = new Map();
        /**
         * The ordered sequence of coordinates that designates a polyline.
         * Simple polylines may be defined using a single array of LatLngs. More
         * complex polylines may specify an array of arrays.
         *
         * \@memberof MapPolylineDirective
         */
        this.Path = [];
        /**
         * Whether to show the title of the polyline as the tooltip on the polygon.
         *
         * \@memberof MapPolylineDirective
         */
        this.ShowTooltip = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.Click = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         *
         * \@memberof MapPolylineDirective
         */
        this.RightClick = new EventEmitter();
        this._id = polylineId++;
    }
    /**
     * Gets whether the polyline has been registered with the service.
     * \@readonly
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    get AddedToService() { return this._addedToService; }
    /**
     * Get the id of the polyline.
     *
     * \@readonly
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets the id of the polyline as a string.
     *
     * \@readonly
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    get IdAsString() { return this._id.toString(); }
    /**
     * Gets whether the polyline is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the polyline belongs to.
     *
     * \@readonly
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
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
            this._polylineService.AddPolyline(this);
            this._addedToService = true;
            this.AddEventListeners();
        }
        return;
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToService) {
            return;
        }
        const /** @type {?} */ o = this.GeneratePolylineChangeSet(changes);
        if (o != null) {
            this._polylineService.SetOptions(this, o);
        }
        if (changes['Path'] && !changes['Path'].isFirstChange()) {
            this._polylineService.UpdatePolyline(this);
        }
    }
    /**
     * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._polylineService.DeletePolyline(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    AddEventListeners() {
        const /** @type {?} */ _getEventArg = e => {
            return {
                Polyline: this,
                Click: e
            };
        };
        this._polylineService.CreateEventObservable('click', this).subscribe((ev) => {
            if (this._infoBox != null) {
                this._infoBox.Open(this._polylineService.GetCoordinatesFromClick(ev));
            }
            this.Click.emit(_getEventArg(ev));
        });
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
        ];
        handlers.forEach((obj) => {
            const /** @type {?} */ os = this._polylineService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
    /**
     * Generates IPolyline option changeset from directive settings.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolylineOptions} containing the polyline options.
     *
     */
    GeneratePolylineChangeSet(changes) {
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
        if (changes['Geodesic']) {
            options.geodesic = this.Geodesic;
            hasOptions = true;
        }
        if (changes['ShowTooltip']) {
            options.showTooltip = this.ShowTooltip;
            hasOptions = true;
        }
        if (changes['StrokeColor']) {
            options.strokeColor = this.StrokeColor;
            hasOptions = true;
        }
        if (changes['StrokeOpacity']) {
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
MapPolylineDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-polyline'
            },] },
];
/** @nocollapse */
MapPolylineDirective.ctorParameters = () => [
    { type: PolylineService },
    { type: ViewContainerRef }
];
MapPolylineDirective.propDecorators = {
    _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
    Clickable: [{ type: Input }],
    Draggable: [{ type: Input }],
    Editable: [{ type: Input }],
    Geodesic: [{ type: Input }],
    Metadata: [{ type: Input }],
    Path: [{ type: Input }],
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
    RightClick: [{ type: Output }]
};
function MapPolylineDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolylineDirective.prototype._inCustomLayer;
    /** @type {?} */
    MapPolylineDirective.prototype._id;
    /** @type {?} */
    MapPolylineDirective.prototype._layerId;
    /** @type {?} */
    MapPolylineDirective.prototype._addedToService;
    /** @type {?} */
    MapPolylineDirective.prototype._events;
    /** @type {?} */
    MapPolylineDirective.prototype._infoBox;
    /**
     * Gets or sets whether this Polyline handles mouse events.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Clickable;
    /**
     * If set to true, the user can drag this shape over the map.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Editable;
    /**
     * When true, edges of the polyline are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polyline are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polyline may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Geodesic;
    /**
     * Arbitary metadata to assign to the Polyline. This is useful for events
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Metadata;
    /**
     * The ordered sequence of coordinates that designates a polyline.
     * Simple polylines may be defined using a single array of LatLngs. More
     * complex polylines may specify an array of arrays.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Path;
    /**
     * Whether to show the title of the polyline as the tooltip on the polygon.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.ShowTooltip;
    /**
     * The stroke color.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeOpacity;
    /**
     * The stroke width in pixels.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeWeight;
    /**
     * The title of the polygon.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Title;
    /**
     * Whether this polyline is visible on the map. Defaults to true.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Visible;
    /**
     * The zIndex compared to other polys.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Click;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DragEnd;
    /**
     * This event is fired when the user starts dragging the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseMove;
    /**
     * This event is fired on Polyline mouseout.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseOut;
    /**
     * This event is fired on Polyline mouseover.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polyline
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseUp;
    /**
     * This even is fired when the Polyline is right-clicked on.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.RightClick;
    /** @type {?} */
    MapPolylineDirective.prototype._polylineService;
    /** @type {?} */
    MapPolylineDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXdCLGdCQUFnQixFQUNoRSxZQUFZLEVBQUUsWUFBWSxFQUM3QixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdDLHFCQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJuQixNQUFNOzs7Ozs7O0lBeVBGLFlBQW9CLGdCQUFpQyxFQUFVLGFBQStCO1FBQTFFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7OEJBcFByRSxLQUFLOytCQUdKLEtBQUs7dUJBQ0csRUFBRTs7Ozs7O3lCQWFSLElBQUk7Ozs7Ozt5QkFPSixLQUFLOzs7Ozs7O3dCQVFOLEtBQUs7Ozs7Ozs7Ozs7d0JBV0wsS0FBSzs7Ozs7O3dCQU9hLElBQUksR0FBRyxFQUFlOzs7Ozs7OztvQkFTRixFQUFFOzs7Ozs7MkJBTzVCLElBQUk7Ozs7OztxQkFxREssSUFBSSxZQUFZLEVBQWtCOzs7Ozs7d0JBTy9CLElBQUksWUFBWSxFQUFrQjs7Ozs7O29CQU90QyxJQUFJLFlBQVksRUFBa0I7Ozs7Ozt1QkFPL0IsSUFBSSxZQUFZLEVBQWtCOzs7Ozs7eUJBT2hDLElBQUksWUFBWSxFQUFrQjs7Ozs7O3lCQU9sQyxJQUFJLFlBQVksRUFBa0I7Ozs7Ozt5QkFPbEMsSUFBSSxZQUFZLEVBQWtCOzs7Ozs7d0JBT25DLElBQUksWUFBWSxFQUFrQjs7Ozs7O3lCQU9qQyxJQUFJLFlBQVks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T0wsS0FBSzttQkFTTCxLQUFLOzBCQU9MLEtBQUs7MEJBT0wsS0FBSzs0QkFPTCxLQUFLOzJCQU9MLEtBQUs7b0JBT0wsS0FBSztzQkFPTCxLQUFLO3FCQU9MLEtBQUs7b0JBV0wsTUFBTTt1QkFPTixNQUFNO21CQU9OLE1BQU07c0JBT04sTUFBTTt3QkFPTixNQUFNO3dCQU9OLE1BQU07d0JBT04sTUFBTTt1QkFPTixNQUFNO3dCQU9OLE1BQU07c0JBT04sTUFBTTt5QkFPTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLWV2ZW50JztcclxuaW1wb3J0IHsgSW5mb0JveENvbXBvbmVudCB9IGZyb20gJy4vaW5mb2JveCc7XHJcblxyXG5sZXQgcG9seWxpbmVJZCA9IDA7XHJcblxyXG4vKipcclxuICpcclxuICogTWFwUG9seWxpbmVEaXJlY3RpdmUgcmVuZGVycyBhIHBvbHlsaW5lIGluc2lkZSBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1wb2x5bGluZSBbUGF0aHNdPVwicGF0aFwiPjwveC1tYXAtcG9seWxpbmU+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLXBvbHlsaW5lJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwUG9seWxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2luQ3VzdG9tTGF5ZXIgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXllcklkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9hZGRlZFRvU2VydmljZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZXZlbnRzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEFueSBJbmZvQm94IHRoYXQgaXMgYSBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIHBvbHlsaW5lXHJcbiAgICAvLy9cclxuICAgIEBDb250ZW50Q2hpbGQoSW5mb0JveENvbXBvbmVudCkgcHJvdGVjdGVkIF9pbmZvQm94OiBJbmZvQm94Q29tcG9uZW50O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoaXMgUG9seWxpbmUgaGFuZGxlcyBtb3VzZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBDbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRHJhZ2dhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbFxyXG4gICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRWRpdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlsaW5lIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbFxyXG4gICAgICogZm9sbG93IHRoZSBjdXJ2YXR1cmUgb2YgdGhlIEVhcnRoLiBXaGVuIGZhbHNlLCBlZGdlcyBvZiB0aGUgcG9seWxpbmUgYXJlXHJcbiAgICAgKiByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYVxyXG4gICAgICogZ2VvZGVzaWMgcG9seWxpbmUgbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xyXG4gICAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEdlb2Rlc2ljID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcmJpdGFyeSBtZXRhZGF0YSB0byBhc3NpZ24gdG8gdGhlIFBvbHlsaW5lLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBNZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3JkZXJlZCBzZXF1ZW5jZSBvZiBjb29yZGluYXRlcyB0aGF0IGRlc2lnbmF0ZXMgYSBwb2x5bGluZS5cclxuICAgICAqIFNpbXBsZSBwb2x5bGluZXMgbWF5IGJlIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZVxyXG4gICAgICogY29tcGxleCBwb2x5bGluZXMgbWF5IHNwZWNpZnkgYW4gYXJyYXkgb2YgYXJyYXlzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgUGF0aDogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZSBvZiB0aGUgcG9seWxpbmUgYXMgdGhlIHRvb2x0aXAgb24gdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93VG9vbHRpcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3Ryb2tlIGNvbG9yLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlQ29sb3I6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTdHJva2VPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFN0cm9rZVdlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpdGxlIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBwb2x5bGluZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHpJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIERlbGVnYXRlIGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIERibENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZURvd246IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW92ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VVcDogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgUG9seWxpbmUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2VydmljZS5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQWRkZWRUb1NlcnZpY2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hZGRlZFRvU2VydmljZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBpZCBvZiB0aGUgcG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBwb2x5bGluZSBhcyBhIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkQXNTdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgaW4gYSBjdXN0b20gbGF5ZXIuIFNlZSB7QGxpbmsgTWFwTGF5ZXJ9LlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSW5DdXN0b21MYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ3VzdG9tTGF5ZXI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGlkIG9mIHRoZSBMYXllciB0aGUgcG9seWxpbmUgYmVsb25ncyB0by5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExheWVySWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xheWVySWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9wb2x5bGluZU1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmVTZXJ2aWNlOiBQb2x5bGluZVNlcnZpY2UsIHByaXZhdGUgX2NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMuX2lkID0gcG9seWxpbmVJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgY29udGVudCBpbnRpYWxpemF0aW9uIG9mIHRoZSBkaXJlY3RpdmUgaXMgY29tcGxldGUuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lOiBzdHJpbmcgPSB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQudGFnTmFtZTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3gtbWFwLWxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5DdXN0b21MYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVTZXJ2aWNlLkFkZFBvbHlsaW5lKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9hZGRlZFRvU2VydmljZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9TZXJ2aWNlKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBjb25zdCBvOiBJUG9seWxpbmVPcHRpb25zID0gdGhpcy5HZW5lcmF0ZVBvbHlsaW5lQ2hhbmdlU2V0KGNoYW5nZXMpO1xyXG4gICAgICAgIGlmIChvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVTZXJ2aWNlLlNldE9wdGlvbnModGhpcywgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydQYXRoJ10gJiYgIWNoYW5nZXNbJ1BhdGgnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVTZXJ2aWNlLlVwZGF0ZVBvbHlsaW5lKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBwb2x5bGluZSBpcyBiZWluZyBkZXN0cm95ZWQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLiBSZWxlYXNlIHJlc291cmNlcy5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lU2VydmljZS5EZWxldGVQb2x5bGluZSh0aGlzKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgIC8vLyByZW1vdmUgZXZlbnQgc3Vic2NyaXB0aW9uc1xyXG4gICAgICAgICAgICAvLy9cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lyZXMgdXAgdGhlIGV2ZW50IHJlY2VpdmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBjb25zdCBfZ2V0RXZlbnRBcmc6IChlOiBNb3VzZUV2ZW50KSA9PiBJUG9seWxpbmVFdmVudCA9IGUgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgUG9seWxpbmU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBDbGljazogZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmVTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luZm9Cb3guT3Blbih0aGlzLl9wb2x5bGluZVNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZXYpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRibENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdTdGFydC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZURvd24uZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VNb3ZlLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdXQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdmVyLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZVVwLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5SaWdodENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcyA9IHRoaXMuX3BvbHlsaW5lU2VydmljZS5DcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKG9zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgSVBvbHlsaW5lIG9wdGlvbiBjaGFuZ2VzZXQgZnJvbSBkaXJlY3RpdmUgc2V0dGluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSB7QGxpbmsgU2ltcGxlQ2hhbmdlc30gaWRlbnRpZnlpbmcgdGhlIGNoYW5nZXMgdGhhdCBvY2N1cmVkLlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSVBvbHlsaW5lT3B0aW9uc30gY29udGFpbmluZyB0aGUgcG9seWxpbmUgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZW5lcmF0ZVBvbHlsaW5lQ2hhbmdlU2V0KGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBJUG9seWxpbmVPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zID0geyBpZDogdGhpcy5faWQgfTtcclxuICAgICAgICBsZXQgaGFzT3B0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbGlja2FibGUnXSkgeyBvcHRpb25zLmNsaWNrYWJsZSA9IHRoaXMuQ2xpY2thYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydEcmFnZ2FibGUnXSkgeyBvcHRpb25zLmRyYWdnYWJsZSA9IHRoaXMuRHJhZ2dhYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydFZGl0YWJsZSddKSB7IG9wdGlvbnMuZWRpdGFibGUgPSB0aGlzLkVkaXRhYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydHZW9kZXNpYyddKSB7IG9wdGlvbnMuZ2VvZGVzaWMgPSB0aGlzLkdlb2Rlc2ljOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93VG9vbHRpcCddKSB7IG9wdGlvbnMuc2hvd1Rvb2x0aXAgPSB0aGlzLlNob3dUb29sdGlwOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VDb2xvciddKSB7IG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSB0aGlzLlN0cm9rZUNvbG9yOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VPcGFjaXR5J10pIHsgb3B0aW9ucy5zdHJva2VPcGFjaXR5ID0gdGhpcy5TdHJva2VPcGFjaXR5OyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VXZWlnaHQnXSkgeyBvcHRpb25zLnN0cm9rZVdlaWdodCA9IHRoaXMuU3Ryb2tlV2VpZ2h0OyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydUaXRsZSddKSB7IG9wdGlvbnMudGl0bGUgPSB0aGlzLlRpdGxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHsgb3B0aW9ucy52aXNpYmxlID0gdGhpcy5WaXNpYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd6SW5kZXgnXSkgeyBvcHRpb25zLnpJbmRleCA9IHRoaXMuekluZGV4OyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxyXG4gICAgICAgIHJldHVybiBoYXNPcHRpb25zID8gb3B0aW9ucyA6IG51bGw7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==