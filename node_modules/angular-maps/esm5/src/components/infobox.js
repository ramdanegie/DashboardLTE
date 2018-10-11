/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { InfoBoxService } from '../services/infobox.service';
import { MapMarkerDirective } from './map-marker';
import { InfoBoxActionDirective } from './infobox-action';
/**
 * internal counter to use as ids for multiple infoboxes.
 */
var /** @type {?} */ infoBoxId = 0;
/**
 * InfoBox renders a info window inside a {\@link MapMarkerDirective} or standalone.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective, InfoBoxComponent, InfoBoxActionDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .map-container { height: 300px; }
 * `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
 *        <x-info-box [DisableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *         </x-info-box>
 *       </x-map-marker>
 *     </x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var InfoBoxComponent = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of InfoBoxComponent.
     * @param _infoBoxService - Concrete {@link InfoBoxService} implementation for underlying Map architecture.
     *
     * @memberof InfoBoxComponent
     */
    function InfoBoxComponent(_infoBoxService) {
        this._infoBoxService = _infoBoxService;
        this._infoBoxAddedToManager = false;
        this._id = (infoBoxId++).toString();
        /**
         * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
         *
         * \@memberof InfoBoxComponent
         */
        this.Modal = true;
        /**
         * Determines visibility of infobox
         *
         * \@memberof InfoBoxComponent
         */
        this.Visible = false;
        /**
         * Determines if other info boxes should be closed before opening this one
         *
         * \@memberof InfoBoxComponent
         */
        this.CloseInfoBoxesOnOpen = true;
        /**
         * Emits an event when the info window is closed.
         *
         * \@memberof InfoBoxComponent
         */
        this.InfoBoxClose = new EventEmitter();
    }
    Object.defineProperty(InfoBoxComponent.prototype, "HtmlContent", {
        get: /**
         * Gets the HTML content of the info box.
         *
         * \@readonly
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        function () {
            if (this._content.nativeElement && this._content.nativeElement.innerText && this._content.nativeElement.innerText.trim() !== '') {
                return this._content.nativeElement.outerHTML;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoBoxComponent.prototype, "Id", {
        get: /**
         * Gets the Id of the info box as a string.
         *
         * \@readonly
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Closes the Infobox.
     *
     * \@memberof InfoBoxComponent
     * @return {?}
     */
    InfoBoxComponent.prototype.Close = /**
     * Closes the Infobox.
     *
     * \@memberof InfoBoxComponent
     * @return {?}
     */
    function () {
        var _this = this;
        return this._infoBoxService.Close(this).then(function () {
            _this.InfoBoxClose.emit(_this._id);
        });
    };
    /**
     * Called on after component view as been initialized. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    InfoBoxComponent.prototype.ngAfterViewInit = /**
     * Called on after component view as been initialized. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    function () {
        this._infoBoxService.AddInfoWindow(this);
        this._infoBoxAddedToManager = true;
        this.HandleEvents();
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    InfoBoxComponent.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._infoBoxAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.Latitude === 'number' &&
            typeof this.Longitude === 'number') {
            this._infoBoxService.SetPosition(this, {
                latitude: changes['latitude'].currentValue,
                longitude: changes['longitude'].currentValue
            });
        }
        this.SetInfoWindowOptions(changes);
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    InfoBoxComponent.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    function () { this._infoBoxService.DeleteInfoWindow(this); };
    /**
     * Opens a closed info window.
     *
     * \@memberof InfoBoxComponent
     * @param {?=} loc
     * @return {?} - Promise that is fullfilled when the infobox has been opened.
     *
     */
    InfoBoxComponent.prototype.Open = /**
     * Opens a closed info window.
     *
     * \@memberof InfoBoxComponent
     * @param {?=} loc
     * @return {?} - Promise that is fullfilled when the infobox has been opened.
     *
     */
    function (loc) {
        return this._infoBoxService.Open(this, loc);
    };
    /**
     * Returns a string representation of the info box.
     *
     * \@memberof InfoBoxComponent
     * @return {?} - string representation of the info box.
     *
     */
    InfoBoxComponent.prototype.ToString = /**
     * Returns a string representation of the info box.
     *
     * \@memberof InfoBoxComponent
     * @return {?} - string representation of the info box.
     *
     */
    function () { return 'InfoBoxComponent-' + this._id; };
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    InfoBoxComponent.prototype.HandleEvents = /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._infoBoxService.CreateEventObservable('infowindowclose', this).subscribe(function (e) {
            _this.InfoBoxClose.emit(_this._id);
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof InfoBoxComponent
     * @param {?} changes
     *
     * @return {?}
     */
    InfoBoxComponent.prototype.SetInfoWindowOptions = /**
     * Sets the info window options
     *
     * \@memberof InfoBoxComponent
     * @param {?} changes
     *
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ options = {};
        if (changes['title']) {
            options.title = this.Title;
        }
        if (changes['description']) {
            options.description = this.Description;
        }
        if (changes['disableAutoPan']) {
            options.disableAutoPan = this.DisableAutoPan;
        }
        if (changes['visible']) {
            options.visible = this.Visible;
        }
        if (changes['xOffset'] || changes['yOffset']) {
            if (options.pixelOffset == null) {
                options.pixelOffset = { x: 0, y: 0 };
            }
            options.pixelOffset.x = this.xOffset;
            options.pixelOffset.y = this.yOffset;
        }
        this._infoBoxService.SetOptions(this, options);
    };
    InfoBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'x-info-box',
                    template: "\n        <div #infoBoxContent class='info-box-content'>\n            <ng-content></ng-content>\n        </div>",
                    styles: ["\n        x-map .MicrosoftMap .Infobox .infobox-title { padding: 10px 10px 5px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-info { padding: 3px 10px 10px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-actions { height: auto }\n    "],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    InfoBoxComponent.ctorParameters = function () { return [
        { type: InfoBoxService }
    ]; };
    InfoBoxComponent.propDecorators = {
        _content: [{ type: ViewChild, args: ['infoBoxContent',] }],
        InfoWindowActions: [{ type: ContentChildren, args: [InfoBoxActionDirective,] }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Title: [{ type: Input }],
        Description: [{ type: Input }],
        DisableAutoPan: [{ type: Input }],
        MaxWidth: [{ type: Input }],
        Modal: [{ type: Input }],
        HostMarker: [{ type: Input }],
        Visible: [{ type: Input }],
        xOffset: [{ type: Input }],
        yOffset: [{ type: Input }],
        CloseInfoBoxesOnOpen: [{ type: Input }],
        InfoBoxClose: [{ type: Output }]
    };
    return InfoBoxComponent;
}());
export { InfoBoxComponent };
function InfoBoxComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxAddedToManager;
    /** @type {?} */
    InfoBoxComponent.prototype._id;
    /**
     * HTML conent of the infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype._content;
    /**
     * Zero or more actions to show on the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoWindowActions;
    /**
     * The latitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Latitude;
    /**
     * The longitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Longitude;
    /**
     * The title to display in the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Title;
    /**
     * The description to display in the info window.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Description;
    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.DisableAutoPan;
    /**
     *  Maximum width of the infowindow, regardless of content's width. This value is only considered
     *  if it is set before a call to open. To change the maximum width when changing content, call
     *  close, update maxWidth, and then open.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.MaxWidth;
    /**
     * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Modal;
    /**
     * Holds the marker that is the host of the info window (if available)
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.HostMarker;
    /**
     * Determines visibility of infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Visible;
    /**
     * Horizontal offset of the infobox from the host marker lat/long or the sepecified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.xOffset;
    /**
     * Vertical offset for the infobox from the host marker lat/long or the specified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.yOffset;
    /**
     * Determines if other info boxes should be closed before opening this one
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.CloseInfoBoxesOnOpen;
    /**
     * Emits an event when the info window is closed.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoBoxClose;
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2luZm9ib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBSzFELHFCQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNExkLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7OztPQUtHO0lBQ0gsMEJBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtzQ0F2SmxCLEtBQUs7bUJBQ2hCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7Ozs7OztxQkFtRXRCLElBQUk7Ozs7Ozt1QkFjRixLQUFLOzs7Ozs7b0NBcUJRLElBQUk7Ozs7Ozs0QkFXVyxJQUFJLFlBQVksRUFBVTtLQXFDeEI7MEJBekI3Qyx5Q0FBVzs7Ozs7Ozs7O1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUgsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFR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clxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE91dHB1dCxcclxuICAgIFF1ZXJ5TGlzdCxcclxuICAgIFNpbXBsZUNoYW5nZSxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XHJcbmltcG9ydCB7IEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2luZm9ib3gtYWN0aW9uJztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG11bHRpcGxlIGluZm9ib3hlcy5cclxuICovXHJcbmxldCBpbmZvQm94SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEluZm9Cb3ggcmVuZGVycyBhIGluZm8gd2luZG93IGluc2lkZSBhIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9yIHN0YW5kYWxvbmUuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlLCBJbmZvQm94Q29tcG9uZW50LCBJbmZvQm94QWN0aW9uRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxyXG4gKiBgXSxcclxuICogIHRlbXBsYXRlOiBgXHJcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbTGFiZWxdPVwiJ00nXCI+XHJcbiAqICAgICAgICA8eC1pbmZvLWJveCBbRGlzYWJsZUF1dG9QYW5dPVwidHJ1ZVwiPlxyXG4gKiAgICAgICAgICBIaSwgdGhpcyBpcyB0aGUgY29udGVudCBvZiB0aGUgPHN0cm9uZz5pbmZvIHdpbmRvdzwvc3Ryb25nPlxyXG4gKiAgICAgICAgIDwveC1pbmZvLWJveD5cclxuICogICAgICAgPC94LW1hcC1tYXJrZXI+XHJcbiAqICAgICA8L3gtbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3gtaW5mby1ib3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNpbmZvQm94Q29udGVudCBjbGFzcz0naW5mby1ib3gtY29udGVudCc+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIHgtbWFwIC5NaWNyb3NvZnRNYXAgLkluZm9ib3ggLmluZm9ib3gtdGl0bGUgeyBwYWRkaW5nOiAxMHB4IDEwcHggNXB4IDEwcHggfVxyXG4gICAgICAgIHgtbWFwIC5NaWNyb3NvZnRNYXAgLkluZm9ib3ggLmluZm9ib3gtaW5mbyB7IHBhZGRpbmc6IDNweCAxMHB4IDEwcHggMTBweCB9XHJcbiAgICAgICAgeC1tYXAgLk1pY3Jvc29mdE1hcCAuSW5mb2JveCAuaW5mb2JveC1hY3Rpb25zIHsgaGVpZ2h0OiBhdXRvIH1cclxuICAgIGBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5mb0JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaW5mb0JveEFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nID0gKGluZm9Cb3hJZCsrKS50b1N0cmluZygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSFRNTCBjb25lbnQgb2YgdGhlIGluZm9ib3hcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAVmlld0NoaWxkKCdpbmZvQm94Q29udGVudCcpIHByaXZhdGUgX2NvbnRlbnQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBaZXJvIG9yIG1vcmUgYWN0aW9ucyB0byBzaG93IG9uIHRoZSBpbmZvIHdpbmRvd1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSkgcHVibGljIEluZm9XaW5kb3dBY3Rpb25zOiBRdWVyeUxpc3Q8SW5mb0JveEFjdGlvbkRpcmVjdGl2ZT47XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdyAob25seSB1c2VmdWxsIGlmIHlvdSB1c2UgaXQgb3VzaWRlIG9mIGEge0BsaW5rIE1hcE1hcmtlcn0pLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cgKG9ubHkgdXNlZnVsbCBpZiB5b3UgdXNlIGl0IG91c2lkZSBvZiBhIHtAbGluayBNYXBNYXJrZXJ9KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGl0bGUgdG8gZGlzcGxheSBpbiB0aGUgaW5mbyB3aW5kb3dcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiB0byBkaXNwbGF5IGluIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGUgYXV0by1wYW4gb24gb3Blbi4gQnkgZGVmYXVsdCwgdGhlIGluZm8gd2luZG93IHdpbGwgcGFuIHRoZSBtYXAgc28gdGhhdCBpdCBpcyBmdWxseVxyXG4gICAgICogdmlzaWJsZSB3aGVuIGl0IG9wZW5zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBEaXNhYmxlQXV0b1BhbjogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXhpbXVtIHdpZHRoIG9mIHRoZSBpbmZvd2luZG93LCByZWdhcmRsZXNzIG9mIGNvbnRlbnQncyB3aWR0aC4gVGhpcyB2YWx1ZSBpcyBvbmx5IGNvbnNpZGVyZWRcclxuICAgICAqICBpZiBpdCBpcyBzZXQgYmVmb3JlIGEgY2FsbCB0byBvcGVuLiBUbyBjaGFuZ2UgdGhlIG1heGltdW0gd2lkdGggd2hlbiBjaGFuZ2luZyBjb250ZW50LCBjYWxsXHJcbiAgICAgKiAgY2xvc2UsIHVwZGF0ZSBtYXhXaWR0aCwgYW5kIHRoZW4gb3Blbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTWF4V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZSB3aGV0aGVyIG9ubHkgb25lIGluZm9ib3ggY2FuIGJlIG9wZW4gYXQgYSB0aW1lLiBOb3RlIHRoYXQgQU5ZIGluZm8gYm94IHNldHRpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBNb2RhbCA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbWFya2VyIHRoYXQgaXMgdGhlIGhvc3Qgb2YgdGhlIGluZm8gd2luZG93IChpZiBhdmFpbGFibGUpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEhvc3RNYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgdmlzaWJpbGl0eSBvZiBpbmZvYm94XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvcml6b250YWwgb2Zmc2V0IG9mIHRoZSBpbmZvYm94IGZyb20gdGhlIGhvc3QgbWFya2VyIGxhdC9sb25nIG9yIHRoZSBzZXBlY2lmaWVkIGNvb3JkaW5hdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB4T2Zmc2V0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJ0aWNhbCBvZmZzZXQgZm9yIHRoZSBpbmZvYm94IGZyb20gdGhlIGhvc3QgbWFya2VyIGxhdC9sb25nIG9yIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHlPZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgb3RoZXIgaW5mbyBib3hlcyBzaG91bGQgYmUgY2xvc2VkIGJlZm9yZSBvcGVuaW5nIHRoaXMgb25lXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIENsb3NlSW5mb0JveGVzT25PcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZSBkZWZpbnRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGluZm8gd2luZG93IGlzIGNsb3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIEluZm9Cb3hDbG9zZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnMuXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEhUTUwgY29udGVudCBvZiB0aGUgaW5mbyBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IEh0bWxDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRlbnQubmF0aXZlRWxlbWVudCAmJiB0aGlzLl9jb250ZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0ICYmIHRoaXMuX2NvbnRlbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50Lm91dGVySFRNTDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgSWQgb2YgdGhlIGluZm8gYm94IGFzIGEgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZm9Cb3hDb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0gX2luZm9Cb3hTZXJ2aWNlIC0gQ29uY3JldGUge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdW5kZXJseWluZyBNYXAgYXJjaGl0ZWN0dXJlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luZm9Cb3hTZXJ2aWNlOiBJbmZvQm94U2VydmljZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIHRoZSBJbmZvYm94LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5mb0JveFNlcnZpY2UuQ2xvc2UodGhpcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5mb0JveENsb3NlLmVtaXQodGhpcy5faWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGFmdGVyIGNvbXBvbmVudCB2aWV3IGFzIGJlZW4gaW5pdGlhbGl6ZWQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9pbmZvQm94U2VydmljZS5BZGRJbmZvV2luZG93KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3hBZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5IYW5kbGVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbmZvQm94QWRkZWRUb01hbmFnZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSAmJiB0eXBlb2YgdGhpcy5MYXRpdHVkZSA9PT0gJ251bWJlcicgJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuTG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLl9pbmZvQm94U2VydmljZS5TZXRQb3NpdGlvbih0aGlzLCB7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogY2hhbmdlc1snbGF0aXR1ZGUnXS5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHsgdGhpcy5faW5mb0JveFNlcnZpY2UuRGVsZXRlSW5mb1dpbmRvdyh0aGlzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgYSBjbG9zZWQgaW5mbyB3aW5kb3cuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtsb2NdICAtIHtAbGluayBJTGF0TG9uZyB9IHJlcHJlc2VudGluZyBwb3NpdGlvbiBvbiB3aGljaCB0byBvcGVuIHRoZSB3aW5kb3cuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gb3BlbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPcGVuKGxvYz86IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLk9wZW4odGhpcywgbG9jKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZm8gYm94LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmZvIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdJbmZvQm94Q29tcG9uZW50LScgKyB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyB0aGUgbWFwIGNsaWNrIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnaW5mb3dpbmRvd2Nsb3NlJywgdGhpcykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkluZm9Cb3hDbG9zZS5lbWl0KHRoaXMuX2lkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgU2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd0aXRsZSddKSB7IG9wdGlvbnMudGl0bGUgPSB0aGlzLlRpdGxlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2Rlc2NyaXB0aW9uJ10pIHsgb3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMuRGVzY3JpcHRpb247IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snZGlzYWJsZUF1dG9QYW4nXSkgeyBvcHRpb25zLmRpc2FibGVBdXRvUGFuID0gdGhpcy5EaXNhYmxlQXV0b1BhbjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHsgb3B0aW9ucy52aXNpYmxlID0gdGhpcy5WaXNpYmxlOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3hPZmZzZXQnXSB8fCBjaGFuZ2VzWyd5T2Zmc2V0J10pIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGl4ZWxPZmZzZXQgPT0gbnVsbCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07IH1cclxuICAgICAgICAgICAgb3B0aW9ucy5waXhlbE9mZnNldC54ID0gdGhpcy54T2Zmc2V0O1xyXG4gICAgICAgICAgICBvcHRpb25zLnBpeGVsT2Zmc2V0LnkgPSB0aGlzLnlPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLlNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuIl19