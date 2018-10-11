/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, ContentChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';
import { MarkerService } from '../services/marker.service';
import { InfoBoxComponent } from './infobox';
/**
 * internal counter to use as ids for marker.
 */
let /** @type {?} */ markerId = 0;
/**
 * MapMarkerDirective renders a map marker inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective} from '...';
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
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'"></x-map-marker>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class MapMarkerDirective {
    /**
     * Creates an instance of MapMarkerDirective.
     * \@memberof MapMarkerDirective
     * @param {?} _markerService - Concreate implementation of a {\@link MarkerService}.
     * @param {?} _containerRef - View container hosting the marker.
     * Used to determine parent layer through markup.
     *
     */
    constructor(_markerService, _containerRef) {
        this._markerService = _markerService;
        this._containerRef = _containerRef;
        this._clickTimeout = null;
        this._events = [];
        this._inClusterLayer = false;
        this._inCustomLayer = false;
        this._markerAddedToManger = false;
        /**
         * This event is fired when the DOM dblclick event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * If true, the marker can be dragged. Default value is false.
         *
         * \@memberof MapMarkerDirective
         */
        this.Draggable = false;
        /**
         * This event is fired when the user starts dragging the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event emitter gets emitted when a marker icon is being created.
         *
         * \@memberof MapMarkerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
        /**
         * True to indiciate whether this is the first marker in a set.
         * Use this for bulk operations (particularily clustering) to ensure performance.
         *
         * \@memberof MapMarkerDirective
         */
        this.IsFirstInSet = false;
        /**
         * True to indiciate whether this is the last marker in a set.
         * Use this for bulk operations (particularily clustering) to ensure performance.
         *
         * \@memberof MapMarkerDirective
         */
        this.IsLastInSet = true;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MarkerClick = new EventEmitter();
        /**
         * Arbitary metadata to assign to the Marker. This is useful for events
         *
         * \@memberof MapMarkerDirective
         */
        this.Metadata = new Map();
        /**
         * This event is fired when the DOM mousedown event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on marker mouseout.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on marker mouseover.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the marker
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This even is fired when the marker is right-clicked on.
         *
         * \@memberof MapMarkerDirective
         */
        this.RightClick = new EventEmitter();
        this._id = (markerId++).toString();
    }
    /**
     * Getswhether the marker has already been added to the marker service and is ready for use.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get AddedToManager() { return this._markerAddedToManger; }
    /**
     * Gets the id of the marker as a string.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets whether the marker is in a cluster layer. See {\@link ClusterLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InClusterLayer() { return this._inClusterLayer; }
    /**
     * Gets whether the marker is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the marker belongs to.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Translates a marker geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerDirective
     * @param {?=} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    LocationToPixel(loc) {
        return this._markerService.LocationToPoint(loc ? loc : this);
    }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._infoBox != null) {
            this._infoBox.HostMarker = this;
        }
        if (this._containerRef.element.nativeElement.parentElement) {
            const /** @type {?} */ parentName = this._containerRef.element.nativeElement.parentElement.tagName;
            if (parentName.toLowerCase() === 'x-cluster-layer') {
                this._inClusterLayer = true;
            }
            else if (parentName.toLowerCase() === 'x-map-layer') {
                this._inCustomLayer = true;
            }
            this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
        }
        if (!this._markerAddedToManger) {
            this._markerService.AddMarker(this);
            this._markerAddedToManger = true;
            this.AddEventListeners();
        }
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (typeof this.Latitude !== 'number' || typeof this.Longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            return;
        }
        if (changes['Latitude'] || changes['Longitude']) {
            this._markerService.UpdateMarkerPosition(this);
        }
        if (changes['Title']) {
            this._markerService.UpdateTitle(this);
        }
        if (changes['Label']) {
            this._markerService.UpdateLabel(this);
        }
        if (changes['Draggable']) {
            this._markerService.UpdateDraggable(this);
        }
        if (changes['IconUrl'] || changes['IconInfo']) {
            this._markerService.UpdateIcon(this);
        }
        if (changes['Anchor']) {
            this._markerService.UpdateAnchor(this);
        }
        if (changes['Visible']) {
            this._markerService.UpdateVisible(this);
        }
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._markerService.DeleteMarker(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerDirective
     * @return {?} - string representation of the marker id.
     */
    toString() { return 'MapMarker-' + this._id.toString(); }
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    AddEventListeners() {
        const /** @type {?} */ _getEventArg = e => {
            return {
                Marker: this,
                Click: e,
                Location: this._markerService.GetCoordinatesFromClick(e),
                Pixels: this._markerService.GetPixelsFromClick(e)
            };
        };
        this._events.push(this._markerService.CreateEventObservable('click', this).subscribe((e) => {
            this._clickTimeout = timer(300).subscribe(n => {
                if (this._infoBox != null) {
                    this._infoBox.Open(this._markerService.GetCoordinatesFromClick(e));
                }
                this.MarkerClick.emit(_getEventArg(e));
            });
        }));
        this._events.push(this._markerService.CreateEventObservable('dblclick', this).subscribe((e) => {
            if (this._clickTimeout) {
                this._clickTimeout.unsubscribe();
                this._clickTimeout = null;
            }
            this.DblClick.emit(_getEventArg(e));
        }));
        const /** @type {?} */ handlers = [
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
            const /** @type {?} */ os = this._markerService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
}
MapMarkerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-marker'
            },] },
];
/** @nocollapse */
MapMarkerDirective.ctorParameters = () => [
    { type: MarkerService },
    { type: ViewContainerRef }
];
MapMarkerDirective.propDecorators = {
    _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
    Anchor: [{ type: Input }],
    DblClick: [{ type: Output }],
    Drag: [{ type: Output }],
    DragEnd: [{ type: Output }],
    Draggable: [{ type: Input }],
    DragStart: [{ type: Output }],
    DynamicMarkerCreated: [{ type: Output }],
    Height: [{ type: Input }],
    IconInfo: [{ type: Input }],
    IconUrl: [{ type: Input }],
    IsFirstInSet: [{ type: Input }],
    IsLastInSet: [{ type: Input }],
    Label: [{ type: Input }],
    Latitude: [{ type: Input }],
    Longitude: [{ type: Input }],
    MarkerClick: [{ type: Output }],
    Metadata: [{ type: Input }],
    MouseDown: [{ type: Output }],
    MouseMove: [{ type: Output }],
    MouseOut: [{ type: Output }],
    MouseOver: [{ type: Output }],
    MouseUp: [{ type: Output }],
    RightClick: [{ type: Output }],
    Title: [{ type: Input }],
    Visible: [{ type: Input }],
    Width: [{ type: Input }]
};
function MapMarkerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MapMarkerDirective.prototype._clickTimeout;
    /** @type {?} */
    MapMarkerDirective.prototype._events;
    /** @type {?} */
    MapMarkerDirective.prototype._id;
    /** @type {?} */
    MapMarkerDirective.prototype._inClusterLayer;
    /** @type {?} */
    MapMarkerDirective.prototype._inCustomLayer;
    /**
     * Any InfoBox that is a direct children of the marker
     *
     * @protected
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype._infoBox;
    /** @type {?} */
    MapMarkerDirective.prototype._layerId;
    /** @type {?} */
    MapMarkerDirective.prototype._markerAddedToManger;
    /**
     *  Icon anchor relative to marker root
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Anchor;
    /**
     * This event is fired when the DOM dblclick event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragEnd;
    /**
     * If true, the marker can be dragged. Default value is false.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Draggable;
    /**
     * This event is fired when the user starts dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragStart;
    /**
     * This event emitter gets emitted when a marker icon is being created.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DynamicMarkerCreated;
    /**
     * Icon height
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Height;
    /**
     * Information for dynamic, custom created icons.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconInfo;
    /**
     * Icon (the URL of the image) for the foreground.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconUrl;
    /**
     * True to indiciate whether this is the first marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsFirstInSet;
    /**
     * True to indiciate whether this is the last marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsLastInSet;
    /**
     * The label (a single uppercase character) for the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Label;
    /**
     * The latitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Latitude;
    /**
     * The longitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Longitude;
    /**
     * This event emitter gets emitted when the user clicks on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MarkerClick;
    /**
     * Arbitary metadata to assign to the Marker. This is useful for events
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Metadata;
    /**
     * This event is fired when the DOM mousedown event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseMove;
    /**
     * This event is fired on marker mouseout.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOut;
    /**
     * This event is fired on marker mouseover.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseUp;
    /**
     * This even is fired when the marker is right-clicked on.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.RightClick;
    /**
     *  The title of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Title;
    /**
     * Sets the visibility of the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Visible;
    /**
     * Icon Width
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Width;
    /** @type {?} */
    MapMarkerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBRSxZQUFZLEVBQW9CLGdCQUFnQixFQUNqRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUszQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBSzdDLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJqQixNQUFNOzs7Ozs7Ozs7SUE4UUYsWUFBb0IsY0FBNkIsRUFBVSxhQUErQjtRQUF0RSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjs2QkF6UXBELElBQUk7dUJBQ1IsRUFBRTsrQkFFVixLQUFLOzhCQUNOLEtBQUs7b0NBV0MsS0FBSzs7Ozs7O3dCQWNhLElBQUksWUFBWSxFQUFnQjs7Ozs7O29CQU9wQyxJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt1QkFPN0IsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7eUJBT3BELEtBQUs7Ozs7Ozt5QkFPaUIsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7b0NBT1gsSUFBSSxZQUFZLEVBQW1COzs7Ozs7OzRCQTZCM0UsS0FBSzs7Ozs7OzsyQkFRTixJQUFJOzs7Ozs7MkJBNEJ5QixJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt3QkFPOUMsSUFBSSxHQUFHLEVBQWU7Ozs7Ozt5QkFPakIsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7eUJBT2hDLElBQUksWUFBWSxFQUFnQjs7Ozs7O3dCQU9qQyxJ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QyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSix1QkFBTSxRQUFRLEdBQUc7WUFDYixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUMvRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNyRixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2RixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNyRixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtTQUM5RixDQUFDO1FBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3JCLHVCQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7Ozs7WUF0YVYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2FBQzNCOzs7O1lBbkNRLGFBQWE7WUFQNEIsZ0JBQWdCOzs7dUJBNEQ3RCxZQUFZLFNBQUMsZ0JBQWdCO3FCQVU3QixLQUFLO3VCQU9MLE1BQU07bUJBT04sTUFBTTtzQkFPTixNQUFNO3dCQU9OLEtBQUs7d0JBT0wsTUFBTTttQ0FPTixNQUFNO3FCQU9OLEtBQUs7dUJBT0wsS0FBSztzQkFPTCxLQUFLOzJCQVFMLEtBQUs7MEJBUUwsS0FBSztvQkFPTCxLQUFLO3VCQU9MLEtBQUs7d0JBT0wsS0FBSzswQkFPTCxNQUFNO3VCQU9OLEtBQUs7d0JBT0wsTUFBTTt3QkFPTixNQUFNO3VCQU9OLE1BQU07d0JBT04sTUFBTTtzQkFPTixNQUFNO3lCQU9OLE1BQU07b0JBT04sS0FBSztzQkFPTCxLQUFLO29CQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLCBTaW1wbGVDaGFuZ2UsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLFxyXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElNYXJrZXJFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1ldmVudCc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi9pbmZvYm94JztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG1hcmtlci5cclxuICovXHJcbmxldCBtYXJrZXJJZCA9IDA7XHJcblxyXG4vKipcclxuICogTWFwTWFya2VyRGlyZWN0aXZlIHJlbmRlcnMgYSBtYXAgbWFya2VyIGluc2lkZSBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1tYXJrZXIgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW0xhYmVsXT1cIidNJ1wiPjwveC1tYXAtbWFya2VyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1tYXJrZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBNYXJrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2NsaWNrVGltZW91dDogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2V2ZW50czogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbkNsdXN0ZXJMYXllciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaW5DdXN0b21MYXllciA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW55IEluZm9Cb3ggdGhhdCBpcyBhIGRpcmVjdCBjaGlsZHJlbiBvZiB0aGUgbWFya2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAQ29udGVudENoaWxkKEluZm9Cb3hDb21wb25lbnQpIHByb3RlY3RlZCBfaW5mb0JveDogSW5mb0JveENvbXBvbmVudDtcclxuXHJcbiAgICBwcml2YXRlIF9sYXllcklkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgSWNvbiBhbmNob3IgcmVsYXRpdmUgdG8gbWFya2VyIHJvb3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBBbmNob3I6IElQb2ludDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRHJhZ0VuZDogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRydWUsIHRoZSBtYXJrZXIgY2FuIGJlIGRyYWdnZWQuIERlZmF1bHQgdmFsdWUgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRHJhZ2dhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIGEgbWFya2VyIGljb24gaXMgYmVpbmcgY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgRHluYW1pY01hcmtlckNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxJTWFya2VySWNvbkluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VySWNvbkluZm8+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJY29uIGhlaWdodFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb24gZm9yIGR5bmFtaWMsIGN1c3RvbSBjcmVhdGVkIGljb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEljb25JbmZvOiBJTWFya2VySWNvbkluZm87XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJY29uICh0aGUgVVJMIG9mIHRoZSBpbWFnZSkgZm9yIHRoZSBmb3JlZ3JvdW5kLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEljb25Vcmw6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRydWUgdG8gaW5kaWNpYXRlIHdoZXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgbWFya2VyIGluIGEgc2V0LlxyXG4gICAgICogVXNlIHRoaXMgZm9yIGJ1bGsgb3BlcmF0aW9ucyAocGFydGljdWxhcmlseSBjbHVzdGVyaW5nKSB0byBlbnN1cmUgcGVyZm9ybWFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSXNGaXJzdEluU2V0ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcnVlIHRvIGluZGljaWF0ZSB3aGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgbWFya2VyIGluIGEgc2V0LlxyXG4gICAgICogVXNlIHRoaXMgZm9yIGJ1bGsgb3BlcmF0aW9ucyAocGFydGljdWxhcmlseSBjbHVzdGVyaW5nKSB0byBlbnN1cmUgcGVyZm9ybWFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSXNMYXN0SW5TZXQgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxhYmVsIChhIHNpbmdsZSB1cHBlcmNhc2UgY2hhcmFjdGVyKSBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb25naXR1ZGUgcG9zaXRpb24gb2YgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMb25naXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgTWFya2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcmJpdGFyeSBtZXRhZGF0YSB0byBhc3NpZ24gdG8gdGhlIE1hcmtlci4gVGhpcyBpcyB1c2VmdWwgZm9yIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIE1ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlRG93bjogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gbWFya2VyIG1vdXNlb3V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBtYXJrZXIgbW91c2VvdmVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIE1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgbWFya2VyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VVcDogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbiBpcyBmaXJlZCB3aGVuIHRoZSBtYXJrZXIgaXMgcmlnaHQtY2xpY2tlZCBvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoZSB0aXRsZSBvZiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWNvbiBXaWR0aFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFdpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRGVsZWdhdGVzXHJcbiAgICAvLy9cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHN3aGV0aGVyIHRoZSBtYXJrZXIgaGFzIGFscmVhZHkgYmVlbiBhZGRlZCB0byB0aGUgbWFya2VyIHNlcnZpY2UgYW5kIGlzIHJlYWR5IGZvciB1c2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQWRkZWRUb01hbmFnZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgbWFya2VyIGFzIGEgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgaW4gYSBjbHVzdGVyIGxheWVyLiBTZWUge0BsaW5rIENsdXN0ZXJMYXllcn0uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSW5DbHVzdGVyTGF5ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkNsdXN0ZXJMYXllcjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgaW4gYSBjdXN0b20gbGF5ZXIuIFNlZSB7QGxpbmsgTWFwTGF5ZXJ9LlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IEluQ3VzdG9tTGF5ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkN1c3RvbUxheWVyOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBpZCBvZiB0aGUgTGF5ZXIgdGhlIG1hcmtlciBiZWxvbmdzIHRvLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExheWVySWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xheWVySWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcE1hcmtlckRpcmVjdGl2ZS5cclxuICAgICAqIEBwYXJhbSBfbWFya2VyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBNYXJrZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfY29udGFpbmVyUmVmIC0gVmlldyBjb250YWluZXIgaG9zdGluZyB0aGUgbWFya2VyLlxyXG4gICAgICogVXNlZCB0byBkZXRlcm1pbmUgcGFyZW50IGxheWVyIHRocm91Z2ggbWFya3VwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFya2VyU2VydmljZTogTWFya2VyU2VydmljZSwgcHJpdmF0ZSBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVzIGEgbWFya2VyIGdlbyBsb2NhdGlvbiB0byBhIHBpeGVsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBtYXAgdmlld3BvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtsb2NdIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMuIElmIG51bGwsIHRoZSBtYXJrZXIncyBjb29yZGluYXRlcyBhcmUgdXNlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIGFuIHtAbGluayBJUG9pbnR9IHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BpeGVsKGxvYz86IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyU2VydmljZS5Mb2NhdGlvblRvUG9pbnQobG9jID8gbG9jIDogdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgQ29tcG9uZW50IGNvbnRlbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICE9IG51bGwpIHsgdGhpcy5faW5mb0JveC5Ib3N0TWFya2VyID0gdGhpczsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50TmFtZTogc3RyaW5nID0gdGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd4LWNsdXN0ZXItbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbkNsdXN0ZXJMYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSAneC1tYXAtbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbkN1c3RvbUxheWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5BZGRNYXJrZXIodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLkxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5Mb25naXR1ZGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydMYXRpdHVkZSddIHx8IGNoYW5nZXNbJ0xvbmdpdHVkZSddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlTWFya2VyUG9zaXRpb24odGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydUaXRsZSddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlVGl0bGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbCddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlTGFiZWwodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydEcmFnZ2FibGUnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0ljb25VcmwnXSB8fCBjaGFuZ2VzWydJY29uSW5mbyddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlSWNvbih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0FuY2hvciddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlQW5jaG9yKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlVmlzaWJsZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuRGVsZXRlTWFya2VyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTWFya2VyIElkLlxyXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hcmtlciBpZC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwTWFya2VyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IF9nZXRFdmVudEFyZzogKGU6IE1vdXNlRXZlbnQpID0+IElNYXJrZXJFdmVudCA9IGUgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgTWFya2VyOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGUsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSxcclxuICAgICAgICAgICAgICAgIFBpeGVsczogdGhpcy5fbWFya2VyU2VydmljZS5HZXRQaXhlbHNGcm9tQ2xpY2soZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh0aGlzLl9tYXJrZXJTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgIC8vLyB0aGlzIGlzIG5lY2Vzc2FyeSBzaW5jZSBtYXAgd2lsbCB0cmVhdCBhIGRvdWJsZWNsaWNrIGZpcnN0IGFzIHR3byBjbGlja3MuLi4nXHJcbiAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSB0aW1lcigzMDApLnN1YnNjcmliZShuID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmZvQm94Lk9wZW4odGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtlckNsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh0aGlzLl9tYXJrZXJTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnZGJsY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWNrVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRGJsQ2xpY2suZW1pdChfZ2V0RXZlbnRBcmcoZSkpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZy5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdlbmQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZ0VuZC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnU3RhcnQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VEb3duLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlTW92ZS5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3V0LmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3Zlci5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VVcC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUmlnaHRDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3MgPSB0aGlzLl9tYXJrZXJTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2gob3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=