/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ISpiderClusterOptions() { }
function ISpiderClusterOptions_tsickle_Closure_declarations() {
    /**
     * Minimium number of pushpins in cluster before switching from circle to spiral spider layout.
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.circleSpiralSwitchover;
    /**
     * When true (default), any view or map change will collapse an expanded cluster. When false, clusters collapse only
     * on click on the cluster or opening another cluster.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.collapseClusterOnMapChange;
    /**
     * When 1 or less (default) exploded spider clusters are collapsed on the first click outside the cluster.
     * Otherwise, the number of clicks necessary is controlled by this property. This is useful when dealing
     * with info boxes or other interactive map behavior where you might want to hid the info box on the first
     * click and the cluster on the second.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.collapseClusterOnNthClick;
    /**
     * When true, invokes the click hander (if it exists) on the underlying markers on hover when
     * exploded into a spider. This is useful for info boxes, as infoboxes might cover up some
     * markers clicking outside the marker will collapse the spider.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.invokeClickOnHover;
    /**
     * A callback function that is fired when an individual pin is clicked.
     * If the pin is part of a cluster, the cluster will also be returned in the callback.
     *
     * \@param marker Marker. The marker that was selected.
     * \@param clusterMarker Marker. The cluster marker that was exploded into a spider.
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.markerSelected;
    /**
     * A callback that is fired when a pin is unselected or a spider cluster is collapsed.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.markerUnSelected;
    /**
     * The minium pixel distance between pushpins and the cluster, when rendering spider layout as a circle.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.minCircleLength;
    /**
     * The minium angle between pushpins in the spiral.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.minSpiralAngleSeperation;
    /**
     * A factor that is used to grow the pixel distance of each pushpin from the center in the spiral.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.spiralDistanceFactor;
    /**
     * Style of the stick connecting the pins to cluster.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.stickStyle;
    /**
     * Style of the sticks when a pin is hovered.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.stickHoverStyle;
    /**
     * A boolean indicating if the cluster layer is visible or not.
     *
     * \@memberof ISpiderClusterOptions
     * @type {?|undefined}
     */
    ISpiderClusterOptions.prototype.visible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvaW50ZXJmYWNlcy9pc3BpZGVyLWNsdXN0ZXItb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxpbmVPcHRpb25zIH0gZnJvbSAnLi9pbGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcGlkZXJDbHVzdGVyT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXVtIG51bWJlciBvZiBwdXNocGlucyBpbiBjbHVzdGVyIGJlZm9yZSBzd2l0Y2hpbmcgZnJvbSBjaXJjbGUgdG8gc3BpcmFsIHNwaWRlciBsYXlvdXQuXHJcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGNpcmNsZVNwaXJhbFN3aXRjaG92ZXI/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRydWUgKGRlZmF1bHQpLCBhbnkgdmlldyBvciBtYXAgY2hhbmdlIHdpbGwgY29sbGFwc2UgYW4gZXhwYW5kZWQgY2x1c3Rlci4gV2hlbiBmYWxzZSwgY2x1c3RlcnMgY29sbGFwc2Ugb25seVxyXG4gICAgICogb24gY2xpY2sgb24gdGhlIGNsdXN0ZXIgb3Igb3BlbmluZyBhbm90aGVyIGNsdXN0ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIDEgb3IgbGVzcyAoZGVmYXVsdCkgZXhwbG9kZWQgc3BpZGVyIGNsdXN0ZXJzIGFyZSBjb2xsYXBzZWQgb24gdGhlIGZpcnN0IGNsaWNrIG91dHNpZGUgdGhlIGNsdXN0ZXIuXHJcbiAgICAgKiBPdGhlcndpc2UsIHRoZSBudW1iZXIgb2YgY2xpY2tzIG5lY2Vzc2FyeSBpcyBjb250cm9sbGVkIGJ5IHRoaXMgcHJvcGVydHkuIFRoaXMgaXMgdXNlZnVsIHdoZW4gZGVhbGluZ1xyXG4gICAgICogd2l0aCBpbmZvIGJveGVzIG9yIG90aGVyIGludGVyYWN0aXZlIG1hcCBiZWhhdmlvciB3aGVyZSB5b3UgbWlnaHQgd2FudCB0byBoaWQgdGhlIGluZm8gYm94IG9uIHRoZSBmaXJzdFxyXG4gICAgICogY2xpY2sgYW5kIHRoZSBjbHVzdGVyIG9uIHRoZSBzZWNvbmQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb2xsYXBzZUNsdXN0ZXJPbk50aENsaWNrPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiB0cnVlLCBpbnZva2VzIHRoZSBjbGljayBoYW5kZXIgKGlmIGl0IGV4aXN0cykgb24gdGhlIHVuZGVybHlpbmcgbWFya2VycyBvbiBob3ZlciB3aGVuXHJcbiAgICAgKiBleHBsb2RlZCBpbnRvIGEgc3BpZGVyLiBUaGlzIGlzIHVzZWZ1bCBmb3IgaW5mbyBib3hlcywgYXMgaW5mb2JveGVzIG1pZ2h0IGNvdmVyIHVwIHNvbWVcclxuICAgICAqIG1hcmtlcnMgY2xpY2tpbmcgb3V0c2lkZSB0aGUgbWFya2VyIHdpbGwgY29sbGFwc2UgdGhlIHNwaWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGludm9rZUNsaWNrT25Ib3Zlcj86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgZmlyZWQgd2hlbiBhbiBpbmRpdmlkdWFsIHBpbiBpcyBjbGlja2VkLlxyXG4gICAgICogSWYgdGhlIHBpbiBpcyBwYXJ0IG9mIGEgY2x1c3RlciwgdGhlIGNsdXN0ZXIgd2lsbCBhbHNvIGJlIHJldHVybmVkIGluIHRoZSBjYWxsYmFjay5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIE1hcmtlci4gVGhlIG1hcmtlciB0aGF0IHdhcyBzZWxlY3RlZC5cclxuICAgICAqIEBwYXJhbSBjbHVzdGVyTWFya2VyIE1hcmtlci4gVGhlIGNsdXN0ZXIgbWFya2VyIHRoYXQgd2FzIGV4cGxvZGVkIGludG8gYSBzcGlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXHJcbiAgICAgKi9cclxuICAgIG1hcmtlclNlbGVjdGVkPzogKG1hcmtlcjogTWFya2VyLCBjbHVzdGVyTWFya2VyOiBNYXJrZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGNhbGxiYWNrIHRoYXQgaXMgZmlyZWQgd2hlbiBhIHBpbiBpcyB1bnNlbGVjdGVkIG9yIGEgc3BpZGVyIGNsdXN0ZXIgaXMgY29sbGFwc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgbWFya2VyVW5TZWxlY3RlZD86ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWluaXVtIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gcHVzaHBpbnMgYW5kIHRoZSBjbHVzdGVyLCB3aGVuIHJlbmRlcmluZyBzcGlkZXIgbGF5b3V0IGFzIGEgY2lyY2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgbWluQ2lyY2xlTGVuZ3RoPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1pbml1bSBhbmdsZSBiZXR3ZWVuIHB1c2hwaW5zIGluIHRoZSBzcGlyYWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBtaW5TcGlyYWxBbmdsZVNlcGVyYXRpb24/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGZhY3RvciB0aGF0IGlzIHVzZWQgdG8gZ3JvdyB0aGUgcGl4ZWwgZGlzdGFuY2Ugb2YgZWFjaCBwdXNocGluIGZyb20gdGhlIGNlbnRlciBpbiB0aGUgc3BpcmFsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgc3BpcmFsRGlzdGFuY2VGYWN0b3I/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHlsZSBvZiB0aGUgc3RpY2sgY29ubmVjdGluZyB0aGUgcGlucyB0byBjbHVzdGVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgc3RpY2tTdHlsZT86IElMaW5lT3B0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0eWxlIG9mIHRoZSBzdGlja3Mgd2hlbiBhIHBpbiBpcyBob3ZlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgc3RpY2tIb3ZlclN0eWxlPzogSUxpbmVPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIGNsdXN0ZXIgbGF5ZXIgaXMgdmlzaWJsZSBvciBub3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICB2aXNpYmxlPzogYm9vbGVhbjtcclxufVxyXG4iXX0=