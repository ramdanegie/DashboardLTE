/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Marker } from '../../models/marker';
import { GoogleConversions } from './google-conversions';
import { GoogleMarker } from '../../models/google/google-marker';
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Google Maps archtiecture. It serves
 * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
export class GoogleLayerBase {
    /**
     * Creates an instance of GoogleLayerBase.
     * \@memberof GoogleLayerBase
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Google Maps.
     * An instance of {\@link GoogleMapService}.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
    }
    /**
     * Deletes the layer
     *
     * \@memberof GoogleLayerBase
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
     * \@memberof GoogleLayerBase
     * @param {?} layer - MapLayerDirective component object or layer id for which to retrieve the layer model.
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
     * Creates a marker in the layer.
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    CreateMarker(layer, options) {
        const /** @type {?} */ mp = this._mapService.MapPromise;
        const /** @type {?} */ lp = this._layers.get(layer);
        return Promise.all([mp, lp]).then(([map, l]) => {
            const /** @type {?} */ payload = (x) => {
                const /** @type {?} */ marker = new google.maps.Marker(x);
                if (options.metadata) {
                    options.metadata.forEach((val, key) => marker.Metadata.set(key, val));
                }
                marker.setMap(map);
                const /** @type {?} */ m = new GoogleMarker(marker);
                m.IsFirst = options.isFirst;
                m.IsLast = options.isLast;
                if (options.metadata) {
                    options.metadata.forEach((val, key) => m.Metadata.set(key, val));
                }
                l.AddEntity(m);
                return m;
            };
            const /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o);
                }
                else {
                    return s.then(x => {
                        o.icon = x.icon;
                        return payload(o);
                    });
                }
            }
            else {
                return payload(o);
            }
        });
    }
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    CreateMarkers(options, markerIcon) {
        const /** @type {?} */ payload = (icon) => {
            const /** @type {?} */ markers = options.map(mo => {
                const /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(mo);
                if (icon && icon !== '') {
                    o.icon = icon;
                }
                const /** @type {?} */ pushpin = new google.maps.Marker(o);
                const /** @type {?} */ marker = new GoogleMarker(pushpin);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach((val, key) => marker.Metadata.set(key, val));
                }
                return marker;
            });
            return markers;
        };
        const /** @type {?} */ p = new Promise((resolve, reject) => {
            if (markerIcon && markerIcon.markerType) {
                const /** @type {?} */ s = Marker.CreateMarker(markerIcon);
                if (typeof (s) === 'string') {
                    resolve(payload(s));
                }
                else {
                    return s.then(x => {
                        resolve(payload(x.icon));
                    });
                }
            }
            else {
                resolve(payload(null));
            }
        });
        return p;
    }
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof GoogleLayerBase
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
function GoogleLayerBase_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleLayerBase.prototype._layers;
    /** @type {?} */
    GoogleLayerBase.prototype._mapService;
    /** @type {?} */
    GoogleLayerBase.prototype._zone;
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerBase
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    GoogleLayerBase.prototype.AddLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7O0FBYWpFLE1BQU07Ozs7Ozs7OztJQW1CRixZQUFzQixXQUF1QixFQUFZLEtBQWE7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO0tBQUs7Ozs7Ozs7OztJQTBCcEUsV0FBVyxDQUFDLEtBQXdCO1FBQ3ZDLHVCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFTLEVBQUUsRUFBRTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUN2QixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdBLGNBQWMsQ0FBQyxLQUErQjtRQUNqRCxxQkFBSSxDQUFDLEdBQW1CLElBQUks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dCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLW1hcmtlcic7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGFic3RyYWN0IHBhcnRpYWxseSBpbXBsZW1lbnRzIHRoZSBjb250cmFjdCBmb3IgdGhlIHtAbGluayBMYXllclNlcnZpY2V9XHJcbiAqIGFuZCB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGZvciB0aGUgR29vZ2xlIE1hcHMgYXJjaHRpZWN0dXJlLiBJdCBzZXJ2ZXNcclxuICogYXMgdGhlIGJhc2UgY2xhc3MgZm9yIGJhc2ljIGxheWVyICh7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfSkgYW5kIGNsdXN0ZXIgbGF5ZXIgKHtAbGluayBHb29nbGVDbHVzdGVyTGF5ZXJ9KS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHb29nbGVMYXllckJhc2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2xheWVyczogTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTGF5ZXJCYXNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JldGUge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciBHb29nbGUgTWFwcy5cclxuICAgICAqIEFuIGluc3RhbmNlIG9mIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByb3RlY3RlZCBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXHJcbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKTtcclxuICAgICAgICBpZiAobCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGwudGhlbigobDE6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsMS5EZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIuSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIExheWVyIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBvciBsYXllciBpZCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIHRoZSBMYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmV8bnVtYmVyKTogUHJvbWlzZTxMYXllcj4ge1xyXG4gICAgICAgIGxldCBwOiBQcm9taXNlPExheWVyPiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZihsYXllcikgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KCg8TWFwTGF5ZXJEaXJlY3RpdmU+bGF5ZXIpLklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFya2VyIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgSWQgb2YgdGhlIGxheWVyIGluIHdoaWNoIHRvIGNyZWF0ZSB0aGUgbWFya2VyLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgcHJvcGVydGllcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTWFya2VyfSBtb2RlbCBmb3IgdGhlIGNyZWF0ZWQgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPiB7XHJcbiAgICAgICAgY29uc3QgbXA6IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPiA9IHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZTtcclxuICAgICAgICBjb25zdCBscDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFttcCwgbHBdKS50aGVuKChbbWFwLCBsXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gKHg6IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMpOiBHb29nbGVNYXJrZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih4KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBuZXcgR29vZ2xlTWFya2VyKG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBtLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICBtLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IG0uTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgICAgIGwuQWRkRW50aXR5KG0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmljb24gPSBzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0geC5pY29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZChvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgbWFya2Vycy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgbWFya2VycyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBNYXJrZXIgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2Vycy5cclxuICAgICAqIEBwYXJhbSBtYXJrZXJJY29uIC0gT3B0aW9uYWwgaW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgY3VzdG9tIG1hcmtlcnMuIFRoaXMgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBtYXJrZXJzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgTWFya2VyIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXJzKG9wdGlvbnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiwgbWFya2VySWNvbj86IElNYXJrZXJJY29uSW5mbyk6IFByb21pc2U8QXJyYXk8TWFya2VyPj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoaWNvbjogc3RyaW5nKTogQXJyYXk8R29vZ2xlTWFya2VyPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcnM6IEFycmF5PEdvb2dsZU1hcmtlcj4gPSBvcHRpb25zLm1hcChtbyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhtbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJykgeyBvLmljb24gPSBpY29uOyB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdXNocGluID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihvKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogR29vZ2xlTWFya2VyID0gbmV3IEdvb2dsZU1hcmtlcihwdXNocGluKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5Jc0ZpcnN0ID0gbW8uaXNGaXJzdDtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5Jc0xhc3QgPSBtby5pc0xhc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAobW8ubWV0YWRhdGEpIHsgbW8ubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VycztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8QXJyYXk8TWFya2VyPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxNYXJrZXI+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXJJY29uICYmIG1hcmtlckljb24ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIobWFya2VySWNvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyByZXNvbHZlKHBheWxvYWQocykpOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBheWxvYWQoeC5pY29uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlIChwYXlsb2FkKG51bGwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxheWVyIGJhc2VkIG9uIGl0cyBpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0gaWQgLSBMYXllciBJZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTGF5ZXJ9IG1vZGVsIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0TGF5ZXJCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+O1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5mb3JFYWNoKChsOiBQcm9taXNlPExheWVyPiwgazogbnVtYmVyKSA9PiB7IGlmIChrID09PSBpZCkgeyBwID0gbDsgfSB9KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19