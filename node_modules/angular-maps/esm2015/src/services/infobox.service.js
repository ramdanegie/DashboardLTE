/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * This class defines the contract for an InfoBoxService. Each Map Architecture provider is expected the furnish a concrete implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export class InfoBoxService {
}
InfoBoxService.decorators = [
    { type: Injectable },
];
function InfoBoxService_tsickle_Closure_declarations() {
    /**
     * Adds an info window to the map or layer.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    InfoBoxService.prototype.AddInfoWindow = function (info) { };
    /**
     * Closes an infobox that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    InfoBoxService.prototype.Close = function (info) { };
    /**
     * Subscribe to events on the infowindow.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @template T
     * @param {?} event
     * @param {?} infoBoxComponent
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    InfoBoxService.prototype.CreateEventObservable = function (event, infoBoxComponent) { };
    /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    InfoBoxService.prototype.DeleteInfoWindow = function (info) { };
    /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    InfoBoxService.prototype.Open = function (info, loc) { };
    /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    InfoBoxService.prototype.SetOptions = function (info, options) { };
    /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} latlng - The position to set
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    InfoBoxService.prototype.SetPosition = function (info, latlng) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2luZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFjM0MsTUFBTTs7O1lBREwsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9pbmZvYm94JztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgY29udHJhY3QgZm9yIGFuIEluZm9Cb3hTZXJ2aWNlLiBFYWNoIE1hcCBBcmNoaXRlY3R1cmUgcHJvdmlkZXIgaXMgZXhwZWN0ZWQgdGhlIGZ1cm5pc2ggYSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluZm9Cb3hTZXJ2aWNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gaW5mbyB3aW5kb3cgdG8gdGhlIG1hcCBvciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBBZGRJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGFuIGluZm9ib3ggdGhhdCBpcyBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBoYXMgYmVlbiBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENsb3NlKGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIGV2ZW50cyBvbiB0aGUgaW5mb3dpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEBwYXJhbSBpbmZvQ29tcG9uZW50IC0gVGhlIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50OiBzdHJpbmcsIGluZm9Cb3hDb21wb25lbnQ6IEluZm9Cb3hDb21wb25lbnQpOiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYW4gaW5mb2JveC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgRGVsZXRlSW5mb1dpbmRvdyhpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGFuIGluZm9ib3ggdGhhdCBpcyBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIG9wZW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgT3BlbihpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBsb2M/OiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbmZvYm94IG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElJbmZvV2luZG93T3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgdG8gc2V0LiBPcHRpb25zIHByb3ZpZGVkIGFyZVxyXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIGV4aXN0aW5nIG9wdGlvbnMgb2YgdGhlIHVuZGVybHlpbmcgaW5mb2JveC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IG9wdGlvbnMgaGF2ZSBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFNldE9wdGlvbnMoaW5mbzogSW5mb0JveENvbXBvbmVudCwgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm9ib3ggYmFzZWQgb24gdGhlIHByb3BlcnRpZXMgc2V0IG9uIHRoZSBJbmZvQm94IGNvbXBvbmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxyXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIFRoZSBwb3NpdGlvbiB0byBzZXRcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IHBvc2l0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFNldFBvc2l0aW9uKGluZm86IEluZm9Cb3hDb21wb25lbnQsIGxhdGxuZz86IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbn1cclxuIl19