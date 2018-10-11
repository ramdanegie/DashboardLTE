/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { GoogleLayer } from '../../models/google/google-layer';
import { GooglePolygon } from '../../models/google/google-polygon';
import { GooglePolyline } from '../../models/google/google-polyline';
import { GoogleLayerBase } from './google-layer-base';
import { MapService } from '../map.service';
import { GoogleConversions } from './google-conversions';
/**
 * Implements the {\@link LayerService} contract for a Google Maps specific implementation.
 *
 * @export
 */
export class GoogleLayerService extends GoogleLayerBase {
    /**
     * Creates an instance of GoogleLayerService.
     * \@memberof GoogleLayerService
     * @param {?} _mapService - Instance of the Google Maps Service. Will generally be injected.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
        this._layers = new Map();
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    AddLayer(layer) {
        const /** @type {?} */ p = new Promise((resolve, reject) => {
            this._mapService.MapPromise.then(m => {
                const /** @type {?} */ l = new GoogleLayer(m, this._mapService, layer.Id);
                l.SetVisible(layer.Visible);
                resolve(l);
            });
        });
        this._layers.set(layer.Id, p);
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        const /** @type {?} */ p = this._mapService.CreatePolygon(options);
        const /** @type {?} */ l = this._layers.get(layer);
        Promise.all([p, l]).then(x => x[1].AddEntity(x[0]));
        return p;
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    CreatePolygons(layer, options) {
        //
        // Note: we attempted using data.Polygons in an attempt to improve performance, but either data.Polygon
        // or data.MultiPolygon actually operate significantly slower than generating the polygons this way.
        // the slowness in google as opposed to bing probably comes from the point reduction algorithm uses.
        // Signigicant performance improvements might be possible in google when using a pixel based reduction algorithm
        // prior to setting the polygon path. This will lower to processing overhead of the google algorithm (with is Douglas-Peucker
        // and rather compute intensive)
        //
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ polygons = new Promise((resolve, reject) => {
                const /** @type {?} */ polys = options.map(o => {
                    const /** @type {?} */ op = GoogleConversions.TranslatePolygonOptions(o);
                    const /** @type {?} */ poly = new google.maps.Polygon(op);
                    const /** @type {?} */ polygon = new GooglePolygon(poly);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach((val, key) => polygon.Metadata.set(key, val));
                    }
                    return polygon;
                });
                resolve(polys);
            });
            return polygons;
        });
    }
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polyline.
     * @param {?} options - Polyline options defining the polyline.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        const /** @type {?} */ p = this._mapService.CreatePolyline(options);
        const /** @type {?} */ l = this._layers.get(layer);
        Promise.all([p, l]).then(x => {
            const /** @type {?} */ p1 = Array.isArray(x[0]) ? /** @type {?} */ (x[0]) : [/** @type {?} */ (x[0])];
            for (const /** @type {?} */ p2 of p1) {
                x[1].AddEntity(p2);
            }
        });
        return p;
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ polylines = new Promise((resolve, reject) => {
                const /** @type {?} */ polys = options.map(o => {
                    const /** @type {?} */ op = GoogleConversions.TranslatePolylineOptions(o);
                    if (o.path && o.path.length > 0 && !Array.isArray(o.path[0])) {
                        op.path = GoogleConversions.TranslatePaths(o.path)[0];
                        const /** @type {?} */ poly = new google.maps.Polyline(op);
                        const /** @type {?} */ polyline = new GooglePolyline(poly);
                        if (o.title && o.title !== '') {
                            polyline.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach((v, k) => polyline.Metadata.set(k, v));
                        }
                        return polyline;
                    }
                    else {
                        const /** @type {?} */ paths = GoogleConversions.TranslatePaths(o.path);
                        const /** @type {?} */ lines = new Array();
                        paths.forEach(x => {
                            op.path = x;
                            const /** @type {?} */ poly = new google.maps.Polyline(op);
                            const /** @type {?} */ polyline = new GooglePolyline(poly);
                            if (o.metadata) {
                                o.metadata.forEach((v, k) => polyline.Metadata.set(k, v));
                            }
                            if (o.title && o.title !== '') {
                                polyline.Title = o.title;
                            }
                            lines.push(polyline);
                        });
                        return lines;
                    }
                });
                resolve(polys);
            });
            return polylines;
        });
    }
}
GoogleLayerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleLayerService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
function GoogleLayerService_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleLayerService.prototype._layers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFXekQsTUFBTSx5QkFBMEIsU0FBUSxlQUFlOzs7Ozs7OztJQWtCbkQsWUFBWSxXQUF1QixFQUFFLEtBQWE7UUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzt1QkFkbUIsSUFBSSxHQUFHLEVBQTBCO0tBZWpGOzs7Ozs7Ozs7Ozs7SUFZTSxRQUFRLENBQUMsS0FBd0I7UUFDcEMsdUJBQU0sQ0FBQyxHQUFtQixJQUFJLE9BQU8sQ0FBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLHVCQUFNLENBQUMsR0FBZ0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUss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QUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQzFDLHVCQUFNLFFBQVEsR0FBbUIsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQUU7NEJBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUFBLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzs2QkFBRTs0QkFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDeEIsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwQixDQUFDLENBQUM7Ozs7WUFqS1YsVUFBVTs7OztZQVhGLFVBQVU7WUFkRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgR29vZ2xlTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1sYXllcic7XHJcbmltcG9ydCB7IEdvb2dsZVBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1wb2x5Z29uJztcclxuaW1wb3J0IHsgR29vZ2xlUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1wb2x5bGluZSc7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlTGF5ZXJCYXNlIH0gZnJvbSAnLi9nb29nbGUtbGF5ZXItYmFzZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIExheWVyU2VydmljZX0gY29udHJhY3QgZm9yIGEgR29vZ2xlIE1hcHMgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZUxheWVyU2VydmljZSBleHRlbmRzIEdvb2dsZUxheWVyQmFzZSBpbXBsZW1lbnRzIExheWVyU2VydmljZSAge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIERlY2xhcmF0aW9ucy5cclxuICAgIC8vL1xyXG4gICAgcHJvdGVjdGVkIF9sYXllcnM6IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PiA9IG5ldyBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZUxheWVyU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIEluc3RhbmNlIG9mIHRoZSBHb29nbGUgTWFwcyBTZXJ2aWNlLiBXaWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfbWFwU2VydmljZTogTWFwU2VydmljZSwgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHN1cGVyKF9tYXBTZXJ2aWNlLCBfem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXHJcbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gbmV3IFByb21pc2U8TGF5ZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4obSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsOiBHb29nbGVMYXllciA9IG5ldyBHb29nbGVMYXllcihtLCB0aGlzLl9tYXBTZXJ2aWNlLCBsYXllci5JZCk7XHJcbiAgICAgICAgICAgICAgICBsLlNldFZpc2libGUobGF5ZXIuVmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPFBvbHlnb24+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5Z29uKG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IGw6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5fbGF5ZXJzLmdldChsYXllcik7XHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3AsIGxdKS50aGVuKHggPT4geFsxXS5BZGRFbnRpdHkoeFswXSkpO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbnMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5Z29uIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gTm90ZTogd2UgYXR0ZW1wdGVkIHVzaW5nIGRhdGEuUG9seWdvbnMgaW4gYW4gYXR0ZW1wdCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLCBidXQgZWl0aGVyIGRhdGEuUG9seWdvblxyXG4gICAgICAgIC8vIG9yIGRhdGEuTXVsdGlQb2x5Z29uIGFjdHVhbGx5IG9wZXJhdGUgc2lnbmlmaWNhbnRseSBzbG93ZXIgdGhhbiBnZW5lcmF0aW5nIHRoZSBwb2x5Z29ucyB0aGlzIHdheS5cclxuICAgICAgICAvLyB0aGUgc2xvd25lc3MgaW4gZ29vZ2xlIGFzIG9wcG9zZWQgdG8gYmluZyBwcm9iYWJseSBjb21lcyBmcm9tIHRoZSBwb2ludCByZWR1Y3Rpb24gYWxnb3JpdGhtIHVzZXMuXHJcbiAgICAgICAgLy8gU2lnbmlnaWNhbnQgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnRzIG1pZ2h0IGJlIHBvc3NpYmxlIGluIGdvb2dsZSB3aGVuIHVzaW5nIGEgcGl4ZWwgYmFzZWQgcmVkdWN0aW9uIGFsZ29yaXRobVxyXG4gICAgICAgIC8vIHByaW9yIHRvIHNldHRpbmcgdGhlIHBvbHlnb24gcGF0aC4gVGhpcyB3aWxsIGxvd2VyIHRvIHByb2Nlc3Npbmcgb3ZlcmhlYWQgb2YgdGhlIGdvb2dsZSBhbGdvcml0aG0gKHdpdGggaXMgRG91Z2xhcy1QZXVja2VyXHJcbiAgICAgICAgLy8gYW5kIHJhdGhlciBjb21wdXRlIGludGVuc2l2ZSlcclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWdvbnM6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWdvbj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlzOiBBcnJheTxHb29nbGVQb2x5Z29uPiA9IG9wdGlvbnMubWFwKG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWdvbjogR29vZ2xlUG9seWdvbiA9IG5ldyBHb29nbGVQb2x5Z29uKHBvbHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7IHBvbHlnb24uVGl0bGUgPSBvLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IHBvbHlnb24uTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZS5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuIGFycmF5XHJcbiAgICAgKiBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5bGluZShvcHRpb25zKTtcclxuICAgICAgICBjb25zdCBsOiBQcm9taXNlPExheWVyPiA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIpO1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtwLCBsXSkudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcDE6IEFycmF5PFBvbHlsaW5lPiA9ICBBcnJheS5pc0FycmF5KHhbMF0pID8gPEFycmF5PFBvbHlsaW5lPj54WzBdIDogWzxQb2x5bGluZT54WzBdXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwMiBvZiBwMSkge3hbMV0uQWRkRW50aXR5KHAyKTsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlsaW5lcy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWxpbmVzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVzKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5bGluZXM6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPSBuZXcgUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2x5czogQXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IG9wdGlvbnMubWFwKG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ucGF0aCAmJiBvLnBhdGgubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShvLnBhdGhbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wLnBhdGggPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvLnBhdGgpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5OiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lOiBHb29nbGVQb2x5bGluZSA9IG5ldyBHb29nbGVQb2x5bGluZShwb2x5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWxpbmUuVGl0bGUgPSBvLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm1ldGFkYXRhKSB7IG8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9seWxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRoczogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvLnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3AucGF0aCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5ID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lOiBHb29nbGVQb2x5bGluZSA9IG5ldyBHb29nbGVQb2x5bGluZShwb2x5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm1ldGFkYXRhKSB7IG8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHtwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocG9seWxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9seWxpbmVzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=