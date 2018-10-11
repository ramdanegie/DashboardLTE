/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Marker } from '../../models/marker';
import { BingMarker } from '../../models/bing/bing-marker';
import { BingConversions } from './bing-conversions';
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
BingLayerBase = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingLayerBase.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     *
     * @memberof BingLayerBase
     */
    function BingLayerBase(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Creates a marker in the layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    BingLayerBase.prototype.CreateMarker = /**
     * Creates a marker in the layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    function (layer, options) {
        var /** @type {?} */ payload = function (icon, l) {
            var /** @type {?} */ loc = BingConversions.TranslateLocation(options.position);
            var /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            var /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
            var /** @type {?} */ marker = new BingMarker(pushpin, null, l.NativePrimitve);
            marker.IsFirst = options.isFirst;
            marker.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
            }
            l.AddEntity(marker);
            return marker;
        };
        var /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            if (options.iconInfo && options.iconInfo.markerType) {
                var /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, l));
                }
                else {
                    return s.then(function (x) {
                        return (payload(x.icon, l));
                    });
                }
            }
            else {
                return (payload(null, l));
            }
        });
    };
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof BingLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    BingLayerBase.prototype.CreateMarkers = /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof BingLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    function (options, markerIcon) {
        var /** @type {?} */ payload = function (icon, op) {
            var /** @type {?} */ markers = op.map(function (mo) {
                var /** @type {?} */ s;
                var /** @type {?} */ o = BingConversions.TranslateMarkerOptions(mo);
                if (icon && icon !== '') {
                    s = icon;
                }
                else if (o.icon) {
                    s = o.icon;
                }
                if (o.icon) {
                    delete o.icon;
                }
                var /** @type {?} */ loc = BingConversions.TranslateLocation(mo.position);
                var /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
                var /** @type {?} */ img = Marker.GetImageForMarker(s);
                if (img != null) {
                    (/** @type {?} */ (pushpin)).image = img;
                }
                var /** @type {?} */ marker = new BingMarker(pushpin, null, null);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
                }
                return marker;
            });
            return markers;
        };
        var /** @type {?} */ p = new Promise(function (resolve, reject) {
            if (markerIcon && markerIcon.markerType) {
                var /** @type {?} */ s = Marker.CreateMarker(markerIcon);
                if (typeof (s) === 'string') {
                    resolve(payload(s, options));
                }
                else {
                    return s.then(function (x) {
                        resolve(payload(x.icon, options));
                    });
                }
            }
            else {
                resolve(payload(null, options));
            }
        });
        return p;
    };
    /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    BingLayerBase.prototype.DeleteLayer = /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        var _this = this;
        var /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.Delete();
                _this._layers.delete(layer.Id);
            });
        });
    };
    /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    BingLayerBase.prototype.GetNativeLayer = /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    function (layer) {
        var /** @type {?} */ p = null;
        if (typeof (layer) === 'number') {
            p = this._layers.get(layer);
        }
        else {
            p = this._layers.get((/** @type {?} */ (layer)).Id);
        }
        return p;
    };
    ///
    /// Protected methods
    ///
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * @param id - Layer Id.
     * @returns - A promise that when fullfilled contains the {@link Layer} model for the layer.
     *
     * @memberof BingLayerBase
     */
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    BingLayerBase.prototype.GetLayerById = /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    function (id) {
        var /** @type {?} */ p;
        this._layers.forEach(function (l, k) { if (k === id) {
            p = l;
        } });
        return p;
    };
    return BingLayerBase;
}());
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
export { BingLayerBase };
function BingLayerBase_tsickle_Closure_declarations() {
    /** @type {?} */
    BingLayerBase.prototype._layers;
    /** @type {?} */
    BingLayerBase.prototype._mapService;
    /** @type {?} */
    BingLayerBase.prototype._zone;
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingLayerBase
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    BingLayerBase.prototype.AddLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQVVyRDs7Ozs7Ozs7O0FBQUE7SUFRSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7T0FLRztJQUNILHVCQUFzQixXQUF1QixFQUFZLEtBQWE7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO3VCQVpyQixJQUFJLEdBQUcsRUFBMEI7S0FZUDs7Ozs7Ozs7OztJQTJCcEUsb0NBQVk7Ozs7Ozs7OztjQUFDLEtBQWEsRUFBRSxPQUF1QjtRQUN0RCxxQkFBTSxPQUFPLEdBQUcsVUFBQyxJQUFZLEVBQUUsQ0FBUTtZQUNuQyxxQkFBTSxHQUFHLEdBQTRCLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekYscUJBQU0sQ0FBQyxHQUFtQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUYsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQUU7WUFDM0MscUJBQU0sT0FBTyxHQUEyQixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRSxxQkFBTSxNQUFNLEdBQWUsSUFBSSxVQUFV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S0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFvQixLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7O0lBR2IsR0FBRztJQUNILHFCQUFxQjtJQUNyQixHQUFHO0lBRUg7Ozs7Ozs7O09BUUc7Ozs7Ozs7Ozs7SUFDTyxvQ0FBWTs7Ozs7Ozs7O0lBQXRCLFVBQXVCLEVBQVU7UUFDN0IscUJBQUksQ0FBaUIsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQWlCLEVBQUUsQ0FBUyxJQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjt3QkE1TUw7SUE4TUMsQ0FBQTs7Ozs7Ozs7OztBQXpMRCx5QkF5TEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgQmluZ01hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbWFya2VyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGFic3RyYWN0IHBhcnRpYWxseSBpbXBsZW1lbnRzIHRoZSBjb250cmFjdCBmb3IgdGhlIHtAbGluayBMYXllclNlcnZpY2V9XHJcbiAqIGFuZCB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGZvciB0aGUgQmluZyBNYXBzIFY4IGFyY2h0aWVjdHVyZS4gSXQgc2VydmVzXHJcbiAqIGFzIHRoZSBiYXNlIGNsYXNzIGZvciBiYXNpYyBsYXllciAoe0BsaW5rIEJpbmdMYXllclNlcnZpY2V9KSBhbmQgY2x1c3RlciBsYXllciAoe0BsaW5rIEJpbmdDbHVzdGVyTGF5ZXJ9KS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCaW5nTGF5ZXJCYXNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIHByb3RlY3RlZCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4gPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTGF5ZXJCYXNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JldGUge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciBCaW5nIE1hcHMgVjguIEFuIGluc3RhbmNlIG9mIHtAbGluayBCaW5nTWFwU2VydmljZX0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxyXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllckRpcmVjdGl2ZSB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXJrZXIgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBJZCBvZiB0aGUgbGF5ZXIgaW4gd2hpY2ggdG8gY3JlYXRlIHRoZSBtYXJrZXIuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTWFya2VyT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcmtlciBwcm9wZXJ0aWVzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBNYXJrZXJ9IG1vZGVsIGZvciB0aGUgY3JlYXRlZCBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPiB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIGw6IExheWVyKTogQmluZ01hcmtlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJykgeyBvLmljb24gPSBpY29uOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IHB1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MsIG8pO1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXI6IEJpbmdNYXJrZXIgPSBuZXcgQmluZ01hcmtlcihwdXNocGluLCBudWxsLCBsLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgbWFya2VyLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XHJcbiAgICAgICAgICAgIG1hcmtlci5Jc0xhc3QgPSBvcHRpb25zLmlzTGFzdDtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICBsLkFkZEVudGl0eShtYXJrZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuKHBheWxvYWQocywgbCkpOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ocGF5bG9hZCh4Lmljb24sIGwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGF5bG9hZChudWxsLCBsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBtYXJrZXJzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBtYXJrZXJzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE1hcmtlciBvcHRpb25zIGRlZmluaW5nIHRoZSBtYXJrZXJzLlxyXG4gICAgICogQHBhcmFtIG1hcmtlckljb24gLSBPcHRpb25hbCBpbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBjdXN0b20gbWFya2Vycy4gVGhpcyB3aWxsIGJlIGFwcGxpZWQgdG8gYWxsIG1hcmtlcnMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBNYXJrZXIgbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXJzKG9wdGlvbnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiwgbWFya2VySWNvbj86IElNYXJrZXJJY29uSW5mbyk6IFByb21pc2U8QXJyYXk8TWFya2VyPj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoaWNvbjogc3RyaW5nLCBvcDogQXJyYXk8SU1hcmtlck9wdGlvbnM+KTogQXJyYXk8QmluZ01hcmtlcj4gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXJzOiBBcnJheTxCaW5nTWFya2VyPiA9IG9wLm1hcChtbyA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgczogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMobW8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycgKSB7IHMgPSBpY29uOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvLmljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gby5pY29uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG8uaWNvbikgeyBkZWxldGUgby5pY29uOyB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG1vLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MsIG8pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gTWFya2VyLkdldEltYWdlRm9yTWFya2VyKHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGltZyAhPSBudWxsKSB7ICg8YW55PnB1c2hwaW4pLmltYWdlID0gaW1nOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VyOiBCaW5nTWFya2VyID0gbmV3IEJpbmdNYXJrZXIocHVzaHBpbiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG1vLmlzRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuSXNMYXN0ID0gbW8uaXNMYXN0O1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vLm1ldGFkYXRhKSB7IG1vLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IG1hcmtlci5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcmtlcnM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPEFycmF5PE1hcmtlcj4+ID0gbmV3IFByb21pc2U8QXJyYXk8TWFya2VyPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFya2VySWNvbiAmJiBtYXJrZXJJY29uLm1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG1hcmtlckljb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHsgcmVzb2x2ZShwYXlsb2FkKHMsIG9wdGlvbnMpKTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXlsb2FkKHguaWNvbiwgb3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXlsb2FkKG51bGwsIG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpO1xyXG4gICAgICAgIGlmIChsID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGwxLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllci5JZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTGF5ZXIgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IG9yIExheWVyIElkIGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIgbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIExheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmV8bnVtYmVyKTogUHJvbWlzZTxMYXllcj4ge1xyXG4gICAgICAgIGxldCBwOiBQcm9taXNlPExheWVyPiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZihsYXllcikgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KCg8TWFwTGF5ZXJEaXJlY3RpdmU+bGF5ZXIpLklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGF5ZXIgYmFzZWQgb24gaXRzIGlkLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSBpZCAtIExheWVyIElkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBMYXllcn0gbW9kZWwgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0TGF5ZXJCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+O1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5mb3JFYWNoKChsOiBQcm9taXNlPExheWVyPiwgazogbnVtYmVyKSA9PiB7IGlmIChrID09PSBpZCkgeyBwID0gbDsgfSB9KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19