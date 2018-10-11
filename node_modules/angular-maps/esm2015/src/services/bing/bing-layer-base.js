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
export class BingLayerBase {
    /**
     * Creates an instance of BingLayerBase.
     * \@memberof BingLayerBase
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Bing Maps V8. An instance of {\@link BingMapService}.
     *
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
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
    CreateMarker(layer, options) {
        const /** @type {?} */ payload = (icon, l) => {
            const /** @type {?} */ loc = BingConversions.TranslateLocation(options.position);
            const /** @type {?} */ o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            const /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
            const /** @type {?} */ marker = new BingMarker(pushpin, null, l.NativePrimitve);
            marker.IsFirst = options.isFirst;
            marker.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach((v, k) => marker.Metadata.set(k, v));
            }
            l.AddEntity(marker);
            return marker;
        };
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            if (options.iconInfo && options.iconInfo.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, l));
                }
                else {
                    return s.then(x => {
                        return (payload(x.icon, l));
                    });
                }
            }
            else {
                return (payload(null, l));
            }
        });
    }
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
    CreateMarkers(options, markerIcon) {
        const /** @type {?} */ payload = (icon, op) => {
            const /** @type {?} */ markers = op.map(mo => {
                let /** @type {?} */ s;
                const /** @type {?} */ o = BingConversions.TranslateMarkerOptions(mo);
                if (icon && icon !== '') {
                    s = icon;
                }
                else if (o.icon) {
                    s = o.icon;
                }
                if (o.icon) {
                    delete o.icon;
                }
                const /** @type {?} */ loc = BingConversions.TranslateLocation(mo.position);
                const /** @type {?} */ pushpin = new Microsoft.Maps.Pushpin(loc, o);
                const /** @type {?} */ img = Marker.GetImageForMarker(s);
                if (img != null) {
                    (/** @type {?} */ (pushpin)).image = img;
                }
                const /** @type {?} */ marker = new BingMarker(pushpin, null, null);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach((v, k) => marker.Metadata.set(k, v));
                }
                return marker;
            });
            return markers;
        };
        const /** @type {?} */ p = new Promise((resolve, reject) => {
            if (markerIcon && markerIcon.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(markerIcon);
                if (typeof (s) === 'string') {
                    resolve(payload(s, options));
                }
                else {
                    return s.then(x => {
                        resolve(payload(x.icon, options));
                    });
                }
            }
            else {
                resolve(payload(null, options));
            }
        });
        return p;
    }
    /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        const /** @type {?} */ l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.Delete();
                this._layers.delete(layer.Id);
            });
        });
    }
    /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    GetNativeLayer(layer) {
        let /** @type {?} */ p = null;
        if (typeof (layer) === 'number') {
            p = this._layers.get(layer);
        }
        else {
            p = this._layers.get((/** @type {?} */ (layer)).Id);
        }
        return p;
    }
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    GetLayerById(id) {
        let /** @type {?} */ p;
        this._layers.forEach((l, k) => { if (k === id) {
            p = l;
        } });
        return p;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQVVyRCxNQUFNOzs7Ozs7OztJQWtCRixZQUFzQixXQUF1QixFQUFZLEtBQWE7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO3VCQVpyQixJQUFJLEdBQUcsRUFBMEI7S0FZUDs7Ozs7Ozs7OztJQTJCcEUsWUFBWSxDQUFDLEtBQWEsRUFBRSxPQUF1QjtRQUN0RCx1QkFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsQ0FBUSxFQUFjLEVBQUU7WUFDbkQsdUJBQU0sR0FBRyxHQUE0QixlQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pGLHVCQUFNLENBQUMsR0FBbUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUFFO1lBQzNDLHVCQUFNLE9BQU8sR0FBMkIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0UsdUJBQU0sTUFBTSxHQUFlLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FB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LENBQUM7WUFDN0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW9CLEtBQUssRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFnQkgsWUFBWSxDQUFDLEVBQVU7UUFDN0IscUJBQUksQ0FBaUIsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWlCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRSxFQUFFLENBQUMsQ0FBQztRQUNyRixNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgYWJzdHJhY3QgcGFydGlhbGx5IGltcGxlbWVudHMgdGhlIGNvbnRyYWN0IGZvciB0aGUge0BsaW5rIExheWVyU2VydmljZX1cclxuICogYW5kIHtAbGluayBDbHVzdGVyU2VydmljZX0gZm9yIHRoZSBCaW5nIE1hcHMgVjggYXJjaHRpZWN0dXJlLiBJdCBzZXJ2ZXNcclxuICogYXMgdGhlIGJhc2UgY2xhc3MgZm9yIGJhc2ljIGxheWVyICh7QGxpbmsgQmluZ0xheWVyU2VydmljZX0pIGFuZCBjbHVzdGVyIGxheWVyICh7QGxpbmsgQmluZ0NsdXN0ZXJMYXllcn0pLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJpbmdMYXllckJhc2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgcHJvdGVjdGVkIF9sYXllcnM6IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PiA9IG5ldyBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdMYXllckJhc2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIEJpbmcgTWFwcyBWOC4gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByb3RlY3RlZCBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXHJcbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcmtlciBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIElkIG9mIHRoZSBsYXllciBpbiB3aGljaCB0byBjcmVhdGUgdGhlIG1hcmtlci5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElNYXJrZXJPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgbWFya2VyIHByb3BlcnRpZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gbW9kZWwgZm9yIHRoZSBjcmVhdGVkIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKGljb246IHN0cmluZywgbDogTGF5ZXIpOiBCaW5nTWFya2VyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uICYmIGljb24gIT09ICcnKSB7IG8uaWNvbiA9IGljb247IH1cclxuICAgICAgICAgICAgY29uc3QgcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYywgbyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG51bGwsIGwuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG9wdGlvbnMuaXNGaXJzdDtcclxuICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IG1hcmtlci5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgIGwuQWRkRW50aXR5KG1hcmtlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcclxuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxyXG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmljb25JbmZvICYmIG9wdGlvbnMuaWNvbkluZm8ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIob3B0aW9ucy5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyByZXR1cm4ocGF5bG9hZChzLCBsKSk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihwYXlsb2FkKHguaWNvbiwgbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYXlsb2FkKG51bGwsIGwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIG1hcmtlcnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIG1hcmtlcnMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTWFya2VyIG9wdGlvbnMgZGVmaW5pbmcgdGhlIG1hcmtlcnMuXHJcbiAgICAgKiBAcGFyYW0gbWFya2VySWNvbiAtIE9wdGlvbmFsIGluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGN1c3RvbSBtYXJrZXJzLiBUaGlzIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgbWFya2Vycy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIE1hcmtlciBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcnMob3B0aW9uczogQXJyYXk8SU1hcmtlck9wdGlvbnM+LCBtYXJrZXJJY29uPzogSU1hcmtlckljb25JbmZvKTogUHJvbWlzZTxBcnJheTxNYXJrZXI+PiB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIG9wOiBBcnJheTxJTWFya2VyT3B0aW9ucz4pOiBBcnJheTxCaW5nTWFya2VyPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcnM6IEFycmF5PEJpbmdNYXJrZXI+ID0gb3AubWFwKG1vID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhtbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJyApIHsgcyA9IGljb247IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG8uaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgPSBvLmljb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoby5pY29uKSB7IGRlbGV0ZSBvLmljb247IH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obW8ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYywgbyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBNYXJrZXIuR2V0SW1hZ2VGb3JNYXJrZXIocyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nICE9IG51bGwpIHsgKDxhbnk+cHVzaHBpbikuaW1hZ2UgPSBpbWc7IH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXI6IEJpbmdNYXJrZXIgPSBuZXcgQmluZ01hcmtlcihwdXNocGluLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5Jc0ZpcnN0ID0gbW8uaXNGaXJzdDtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5Jc0xhc3QgPSBtby5pc0xhc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAobW8ubWV0YWRhdGEpIHsgbW8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbWFya2VyLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VycztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8QXJyYXk8TWFya2VyPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxNYXJrZXI+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXJJY29uICYmIG1hcmtlckljb24ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIobWFya2VySWNvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyByZXNvbHZlKHBheWxvYWQocywgb3B0aW9ucykpOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBheWxvYWQoeC5pY29uLCBvcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBheWxvYWQobnVsbCwgb3B0aW9ucykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XHJcbiAgICAgICAgaWYgKGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsLnRoZW4oKGwxOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbDEuRGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyLklkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBMYXllciBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3Qgb3IgTGF5ZXIgSWQgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllciBtb2RlbC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiByZXNvbHZlZCBjb250YWlucyB0aGUgTGF5ZXIgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZXxudW1iZXIpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+ID0gbnVsbDtcclxuICAgICAgICBpZiAodHlwZW9mKGxheWVyKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcCA9IHRoaXMuX2xheWVycy5nZXQoKDxNYXBMYXllckRpcmVjdGl2ZT5sYXllcikuSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsYXllciBiYXNlZCBvbiBpdHMgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIGlkIC0gTGF5ZXIgSWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIExheWVyfSBtb2RlbCBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRMYXllckJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8TGF5ZXI+IHtcclxuICAgICAgICBsZXQgcDogUHJvbWlzZTxMYXllcj47XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmZvckVhY2goKGw6IFByb21pc2U8TGF5ZXI+LCBrOiBudW1iZXIpID0+IHsgaWYgKGsgPT09IGlkKSB7IHAgPSBsOyB9IH0pO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=