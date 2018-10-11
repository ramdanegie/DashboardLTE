/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
/**
 * InfoBoxAction renders an action in an info window {\@link InfoBox}
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
 *  `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
 *        <x-info-box>
 *          <x-info-box-action [Label]="actionlabel" (ActionClicked)="actionClicked(this)"></x-info-box-action>
 *        </x-info-box>
 *      </x-map-marker>
 *    </x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var InfoBoxActionDirective = /** @class */ (function () {
    function InfoBoxActionDirective() {
        /**
         * Emits an event when the action has been clicked
         *
         * \@memberof InfoBoxActionDirective
         */
        this.ActionClicked = new EventEmitter();
    }
    InfoBoxActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-info-box-action'
                },] },
    ];
    InfoBoxActionDirective.propDecorators = {
        Label: [{ type: Input }],
        ActionClicked: [{ type: Output }]
    };
    return InfoBoxActionDirective;
}());
export { InfoBoxActionDirective };
function InfoBoxActionDirective_tsickle_Closure_declarations() {
    /**
     * The label to display on the action
     *
     * \@memberof InfoBoxActionDirective
     * @type {?}
     */
    InfoBoxActionDirective.prototype.Label;
    /**
     * Emits an event when the action has been clicked
     *
     * \@memberof InfoBoxActionDirective
     * @type {?}
     */
    InfoBoxActionDirective.prototype.ActionClicked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC1hY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9pbmZvYm94LWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBZ0QvQixJQUFJLFlBQVksRUFBUTs7O2dCQW5CL0QsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7aUJBQ2hDOzs7d0JBUUksS0FBSztnQ0FRTCxNQUFNOztpQ0EvQ1g7O1NBZ0NhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogSW5mb0JveEFjdGlvbiByZW5kZXJzIGFuIGFjdGlvbiBpbiBhbiBpbmZvIHdpbmRvdyB7QGxpbmsgSW5mb0JveH1cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmUsIEluZm9Cb3hDb21wb25lbnQsIEluZm9Cb3hBY3Rpb25EaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XHJcbiAqICBgXSxcclxuICogIHRlbXBsYXRlOiBgXHJcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbTGFiZWxdPVwiJ00nXCI+XHJcbiAqICAgICAgICA8eC1pbmZvLWJveD5cclxuICogICAgICAgICAgPHgtaW5mby1ib3gtYWN0aW9uIFtMYWJlbF09XCJhY3Rpb25sYWJlbFwiIChBY3Rpb25DbGlja2VkKT1cImFjdGlvbkNsaWNrZWQodGhpcylcIj48L3gtaW5mby1ib3gtYWN0aW9uPlxyXG4gKiAgICAgICAgPC94LWluZm8tYm94PlxyXG4gKiAgICAgIDwveC1tYXAtbWFya2VyPlxyXG4gKiAgICA8L3gtbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtaW5mby1ib3gtYWN0aW9uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFiZWwgdG8gZGlzcGxheSBvbiB0aGUgYWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hBY3Rpb25EaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIExhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBhY3Rpb24gaGFzIGJlZW4gY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94QWN0aW9uRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgQWN0aW9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxufVxyXG4iXX0=