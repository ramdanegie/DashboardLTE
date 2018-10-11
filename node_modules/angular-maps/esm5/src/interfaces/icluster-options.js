/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This interfaces defined options governing clustering layers.
 *
 * @export
 * @record
 */
export function IClusterOptions() { }
function IClusterOptions_tsickle_Closure_declarations() {
    /**
     * A callback function that is fired after the clustering for a map view has completed.
     * This is useful if you want to generate a list of locations based on what is in the current view.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.callback;
    /**
     * Icon information for custom marker icons in the clusters
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.clusterIconInfo;
    /**
     * The url of the cluster image
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.imagePath;
    /**
     * The file extension of the cluster image
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.imageExtension;
    /**
     * A callback function that allows you to process a clustered pushpin before it is added to a layer.
     * This is useful if you want to add events or set style options on the clustered pushpin.
     * @type {?|undefined}
     */
    IClusterOptions.prototype.clusteredPinCallback;
    /**
     * Indicates if the layer should cluster the locations or not. Default: true
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.clusteringEnabled;
    /**
     * The width and height of the gird cells used for clustering in pixels. Default: 45
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.gridSize;
    /**
     * Offsets the placement of clustered pushpins by a set number of pixels.
     * This option is only available when the placement type is set to GridCenter.
     * This is useful if you have multiple cluster layers on the map and you want to
     * offset the clustered pushpins between the layers so that they are visible,
     * otherwise the clusters from the different layers would overlap completely.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.layerOffset;
    /**
     * Maximum zoom level for the cluster
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.maxZoom;
    /**
     * The minimum number of pins required to form a cluster
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.minimumClusterSize;
    /**
     * Determines the cluster placement mode
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.placementMode;
    /**
     * Options governing the spider cluster behavior if active.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.spiderClusterOptions;
    /**
     * Cluster image styles
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.styles;
    /**
     * A boolean indicating if the layer is visible or not.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.visible;
    /**
     * The z-index of the layer.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.zIndex;
    /**
     * Whether to zoom in on click.
     *
     * \@memberof IClusterOptions
     * @type {?|undefined}
     */
    IClusterOptions.prototype.zoomOnClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNsdXN0ZXItb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbHVzdGVySWNvbkluZm8gfSBmcm9tICcuL2ljbHVzdGVyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4vaXBvaW50JztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4vaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSVNwaWRlckNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi9pc3BpZGVyLWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGludGVyZmFjZXMgZGVmaW5lZCBvcHRpb25zIGdvdmVybmluZyBjbHVzdGVyaW5nIGxheWVycy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQ2x1c3Rlck9wdGlvbnMgZXh0ZW5kcyBJTGF5ZXJPcHRpb25zIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGZpcmVkIGFmdGVyIHRoZSBjbHVzdGVyaW5nIGZvciBhIG1hcCB2aWV3IGhhcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gZ2VuZXJhdGUgYSBsaXN0IG9mIGxvY2F0aW9ucyBiYXNlZCBvbiB3aGF0IGlzIGluIHRoZSBjdXJyZW50IHZpZXcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJY29uIGluZm9ybWF0aW9uIGZvciBjdXN0b20gbWFya2VyIGljb25zIGluIHRoZSBjbHVzdGVyc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsdXN0ZXJJY29uSW5mbz86IElNYXJrZXJJY29uSW5mbztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHVybCBvZiB0aGUgY2x1c3RlciBpbWFnZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGltYWdlUGF0aD86IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGZpbGUgZXh0ZW5zaW9uIG9mIHRoZSBjbHVzdGVyIGltYWdlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW1hZ2VFeHRlbnNpb24/OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBhbGxvd3MgeW91IHRvIHByb2Nlc3MgYSBjbHVzdGVyZWQgcHVzaHBpbiBiZWZvcmUgaXQgaXMgYWRkZWQgdG8gYSBsYXllci5cclxuICAgICAgICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBhZGQgZXZlbnRzIG9yIHNldCBzdHlsZSBvcHRpb25zIG9uIHRoZSBjbHVzdGVyZWQgcHVzaHBpbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbHVzdGVyZWRQaW5DYWxsYmFjaz86IChtYXJrZXI6IGFueSkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBsYXllciBzaG91bGQgY2x1c3RlciB0aGUgbG9jYXRpb25zIG9yIG5vdC4gRGVmYXVsdDogdHJ1ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGdpcmQgY2VsbHMgdXNlZCBmb3IgY2x1c3RlcmluZyBpbiBwaXhlbHMuIERlZmF1bHQ6IDQ1XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ3JpZFNpemU/OiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9mZnNldHMgdGhlIHBsYWNlbWVudCBvZiBjbHVzdGVyZWQgcHVzaHBpbnMgYnkgYSBzZXQgbnVtYmVyIG9mIHBpeGVscy5cclxuICAgICAgICAgKiBUaGlzIG9wdGlvbiBpcyBvbmx5IGF2YWlsYWJsZSB3aGVuIHRoZSBwbGFjZW1lbnQgdHlwZSBpcyBzZXQgdG8gR3JpZENlbnRlci5cclxuICAgICAgICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3UgaGF2ZSBtdWx0aXBsZSBjbHVzdGVyIGxheWVycyBvbiB0aGUgbWFwIGFuZCB5b3Ugd2FudCB0b1xyXG4gICAgICAgICAqIG9mZnNldCB0aGUgY2x1c3RlcmVkIHB1c2hwaW5zIGJldHdlZW4gdGhlIGxheWVycyBzbyB0aGF0IHRoZXkgYXJlIHZpc2libGUsXHJcbiAgICAgICAgICogb3RoZXJ3aXNlIHRoZSBjbHVzdGVycyBmcm9tIHRoZSBkaWZmZXJlbnQgbGF5ZXJzIHdvdWxkIG92ZXJsYXAgY29tcGxldGVseS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBsYXllck9mZnNldD86IElQb2ludDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWF4aW11bSB6b29tIGxldmVsIGZvciB0aGUgY2x1c3RlclxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heFpvb20/OiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBwaW5zIHJlcXVpcmVkIHRvIGZvcm0gYSBjbHVzdGVyXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbWluaW11bUNsdXN0ZXJTaXplPzogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXRlcm1pbmVzIHRoZSBjbHVzdGVyIHBsYWNlbWVudCBtb2RlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGxhY2VtZW50TW9kZT86IENsdXN0ZXJQbGFjZW1lbnRNb2RlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcHRpb25zIGdvdmVybmluZyB0aGUgc3BpZGVyIGNsdXN0ZXIgYmVoYXZpb3IgaWYgYWN0aXZlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNwaWRlckNsdXN0ZXJPcHRpb25zPzogSVNwaWRlckNsdXN0ZXJPcHRpb25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDbHVzdGVyIGltYWdlIHN0eWxlc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0eWxlcz86IEFycmF5PElDbHVzdGVySWNvbkluZm8+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgbGF5ZXIgaXMgdmlzaWJsZSBvciBub3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmlzaWJsZT86IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSB6LWluZGV4IG9mIHRoZSBsYXllci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICB6SW5kZXg/OiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdoZXRoZXIgdG8gem9vbSBpbiBvbiBjbGljay5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICB6b29tT25DbGljaz86IGJvb2xlYW47XHJcblxyXG59XHJcbiJdfQ==