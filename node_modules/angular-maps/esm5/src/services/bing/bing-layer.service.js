/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { BingPolygon } from '../../models/bing/bing-polygon';
import { BingPolyline } from '../../models/bing/bing-polyline';
import { MapService } from '../map.service';
import { BingLayerBase } from './bing-layer-base';
import { BingConversions } from './bing-conversions';
/**
 * Implements the {\@link LayerService} contract for a  Bing Maps V8 specific implementation.
 *
 * @export
 */
var BingLayerService = /** @class */ (function (_super) {
    tslib_1.__extends(BingLayerService, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingLayerService.
     * @param _mapService - Instance of the Bing Maps Service. Will generally be injected.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof BingLayerService
     */
    function BingLayerService(_mapService, _zone) {
        return _super.call(this, _mapService, _zone) || this;
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    BingLayerService.prototype.AddLayer = /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    function (layer) {
        var /** @type {?} */ layerPromise = this._mapService.CreateLayer({ id: layer.Id });
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(function (l) { return l.SetVisible(layer.Visible); });
    };
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    BingLayerService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    function (layer, options) {
        var _this = this;
        var /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            var /** @type {?} */ locs = BingConversions.TranslatePaths(options.paths);
            var /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
            var /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, o);
            var /** @type {?} */ polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
            }
            if (options.title && options.title !== '') {
                polygon.Title = options.title;
            }
            if (options.showLabel != null) {
                polygon.ShowLabel = options.showLabel;
            }
            if (options.showTooltip != null) {
                polygon.ShowTooltip = options.showTooltip;
            }
            if (options.labelMaxZoom != null) {
                polygon.LabelMaxZoom = options.labelMaxZoom;
            }
            if (options.labelMinZoom != null) {
                polygon.LabelMinZoom = options.labelMinZoom;
            }
            l.AddEntity(polygon);
            return polygon;
        });
    };
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    BingLayerService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    function (layer, options) {
        var _this = this;
        var /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            var /** @type {?} */ polygons = new Promise(function (resolve, reject) {
                var /** @type {?} */ polys = options.map(function (o) {
                    var /** @type {?} */ locs = BingConversions.TranslatePaths(o.paths);
                    var /** @type {?} */ op = BingConversions.TranslatePolygonOptions(o);
                    var /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, op);
                    var /** @type {?} */ polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
                    }
                    return polygon;
                });
                resolve(polys);
            });
            return polygons;
        });
    };
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    BingLayerService.prototype.CreatePolyline = /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    function (layer, options) {
        var _this = this;
        var /** @type {?} */ p = this.GetLayerById(layer);
        var /** @type {?} */ polyline;
        var /** @type {?} */ line;
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            var /** @type {?} */ locs = BingConversions.TranslatePaths(options.path);
            var /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                l.AddEntity(line);
                if (options.metadata) {
                    options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
                }
                if (options.title && options.title !== '') {
                    line.Title = options.title;
                }
                if (options.showTooltip != null) {
                    line.ShowTooltip = options.showTooltip;
                }
                return line;
            }
            else {
                var /** @type {?} */ lines_1 = new Array();
                locs.forEach(function (x) {
                    polyline = new Microsoft.Maps.Polyline(x, o);
                    line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                    l.AddEntity(line);
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
                    }
                    if (options.title && options.title !== '') {
                        line.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        line.ShowTooltip = options.showTooltip;
                    }
                    lines_1.push(line);
                });
                return lines_1;
            }
        });
    };
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    BingLayerService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        var _this = this;
        var /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            var /** @type {?} */ polylines = new Promise(function (resolve, reject) {
                var /** @type {?} */ polys = options.map(function (o) {
                    var /** @type {?} */ locs = BingConversions.TranslatePaths(o.path);
                    var /** @type {?} */ op = BingConversions.TranslatePolylineOptions(o);
                    if (locs && locs.length > 0 && !Array.isArray(locs[0])) {
                        var /** @type {?} */ poly = new Microsoft.Maps.Polyline(locs[0], op);
                        var /** @type {?} */ polyline_1 = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                        if (o.title && o.title !== '') {
                            polyline_1.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach(function (v, k) { return polyline_1.Metadata.set(k, v); });
                        }
                        return polyline_1;
                    }
                    else {
                        var /** @type {?} */ lines_2 = new Array();
                        locs.forEach(function (x) {
                            var /** @type {?} */ poly = new Microsoft.Maps.Polyline(x, op);
                            var /** @type {?} */ polyline = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                            if (o.metadata) {
                                o.metadata.forEach(function (v, k) { return polyline.Metadata.set(k, v); });
                            }
                            if (o.title && o.title !== '') {
                                polyline.Title = o.title;
                            }
                            lines_2.push(polyline);
                        });
                        return lines_2;
                    }
                });
                resolve(polys);
            });
            return polylines;
        });
    };
    BingLayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingLayerService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingLayerService;
}(BingLayerBase));
export { BingLayerService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUcvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztJQVFmLDRDQUFhO0lBRS9DLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7T0FNRztJQUNILDBCQUFZLFdBQXVCLEVBQUUsS0FBYTtlQUM5QyxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDO0tBQzVCOzs7Ozs7Ozs7Ozs7SUFZTSxtQ0FBUTs7Ozs7Ozs7Ozs7Y0FBQyxLQUF3QjtRQUNwQyxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBY2pELHdDQUFhOzs7Ozs7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QyxDQUFDO2dDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDOzZCQUFFOzRCQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7NkJBQUU7NEJBQzNELE9BQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3hCLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsT0FBSyxDQUFDO3FCQUNoQjtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEIsQ0FBQyxDQUFDOzs7Z0JBckxWLFVBQVU7Ozs7Z0JBWkYsVUFBVTtnQkFiRSxNQUFNOzsyQkFBM0I7RUEwQnNDLGFBQWE7U0FBdEMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nTGF5ZXJCYXNlIH0gZnJvbSAnLi9iaW5nLWxheWVyLWJhc2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBMYXllclNlcnZpY2V9IGNvbnRyYWN0IGZvciBhICBCaW5nIE1hcHMgVjggc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdMYXllclNlcnZpY2UgZXh0ZW5kcyBCaW5nTGF5ZXJCYXNlIGltcGxlbWVudHMgTGF5ZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdMYXllclNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBJbnN0YW5jZSBvZiB0aGUgQmluZyBNYXBzIFNlcnZpY2UuIFdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfbWFwU2VydmljZTogTWFwU2VydmljZSwgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHN1cGVyKF9tYXBTZXJ2aWNlLCBfem9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXHJcbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsYXllclByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUxheWVyKHsgaWQ6IGxheWVyLklkIH0pO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIuSWQsIGxheWVyUHJvbWlzZSk7XHJcbiAgICAgICAgbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldFZpc2libGUobGF5ZXIuVmlzaWJsZSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aHMpO1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5OiBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24obG9jcywgbyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IFBvbHlnb24gPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5Z29uLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHtwb2x5Z29uLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGFiZWwgIT0gbnVsbCkgeyBwb2x5Z29uLlNob3dMYWJlbCA9IG9wdGlvbnMuc2hvd0xhYmVsOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcG9seWdvbi5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNYXhab29tICE9IG51bGwpIHsgcG9seWdvbi5MYWJlbE1heFpvb20gPSBvcHRpb25zLmxhYmVsTWF4Wm9vbTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1pblpvb20gIT0gbnVsbCkgeyBwb2x5Z29uLkxhYmVsTWluWm9vbSA9IG9wdGlvbnMubGFiZWxNaW5ab29tOyB9XHJcbiAgICAgICAgICAgIGwuQWRkRW50aXR5KHBvbHlnb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5Z29ucy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWdvbnMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWdvbiBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uczogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9seXM6IEFycmF5PEJpbmdQb2x5Z29uPiA9IG9wdGlvbnMubWFwKG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMoby5wYXRocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3A6IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG9wKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5Z29uOiBCaW5nUG9seWdvbiA9IG5ldyBCaW5nUG9seWdvbihwb2x5LCA8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwU2VydmljZSwgbC5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWdvbi5UaXRsZSA9IG8udGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlnb24uTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2x5Z29uO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBvbHlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29ucztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgbGluZS5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuIGFycmF5XHJcbiAgICAgKiBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGxldCBwb2x5bGluZTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmU7XHJcbiAgICAgICAgbGV0IGxpbmU6IFBvbHlsaW5lO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGgpO1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aCAmJiBvcHRpb25zLnBhdGgubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShsb2NzWzBdLCBvKTtcclxuICAgICAgICAgICAgICAgIGxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgIGwuQWRkRW50aXR5KGxpbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbGluZS5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykge2xpbmUuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IGxpbmUuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XHJcbiAgICAgICAgICAgICAgICBsb2NzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUoeCwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGwuQWRkRW50aXR5KGxpbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IGxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7bGluZS5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IGxpbmUuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlsaW5lIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVzKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5bGluZXM6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPSBuZXcgUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2x5czogQXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IG9wdGlvbnMubWFwKG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMoby5wYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY3MgJiYgbG9jcy5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KGxvY3NbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKGxvY3NbMF0sIG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWxpbmU6IEJpbmdQb2x5bGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7IHBvbHlsaW5lLlRpdGxlID0gby50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZSh4LCBvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5bGluZTogQmluZ1BvbHlsaW5lID0gbmV3IEJpbmdQb2x5bGluZShwb2x5LCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm1ldGFkYXRhKSB7IG8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHtwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocG9seWxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9seWxpbmVzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=