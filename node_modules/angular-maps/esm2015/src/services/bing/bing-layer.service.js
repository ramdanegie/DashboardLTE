/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class BingLayerService extends BingLayerBase {
    /**
     * Creates an instance of BingLayerService.
     * \@memberof BingLayerService
     * @param {?} _mapService - Instance of the Bing Maps Service. Will generally be injected.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
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
    AddLayer(layer) {
        const /** @type {?} */ layerPromise = this._mapService.CreateLayer({ id: layer.Id });
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(l => l.SetVisible(layer.Visible));
    }
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
    CreatePolygon(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ locs = BingConversions.TranslatePaths(options.paths);
            const /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
            const /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, o);
            const /** @type {?} */ polygon = new BingPolygon(poly, /** @type {?} */ (this._mapService), l.NativePrimitve);
            if (options.metadata) {
                options.metadata.forEach((v, k) => polygon.Metadata.set(k, v));
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
    }
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
    CreatePolygons(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ polygons = new Promise((resolve, reject) => {
                const /** @type {?} */ polys = options.map(o => {
                    const /** @type {?} */ locs = BingConversions.TranslatePaths(o.paths);
                    const /** @type {?} */ op = BingConversions.TranslatePolygonOptions(o);
                    const /** @type {?} */ poly = new Microsoft.Maps.Polygon(locs, op);
                    const /** @type {?} */ polygon = new BingPolygon(poly, /** @type {?} */ (this._mapService), l.NativePrimitve);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach((v, k) => polygon.Metadata.set(k, v));
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
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        let /** @type {?} */ polyline;
        let /** @type {?} */ line;
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ locs = BingConversions.TranslatePaths(options.path);
            const /** @type {?} */ o = BingConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                line = new BingPolyline(polyline, this._mapService.MapInstance, l.NativePrimitve);
                l.AddEntity(line);
                if (options.metadata) {
                    options.metadata.forEach((v, k) => line.Metadata.set(k, v));
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
                const /** @type {?} */ lines = new Array();
                locs.forEach(x => {
                    polyline = new Microsoft.Maps.Polyline(x, o);
                    line = new BingPolyline(polyline, this._mapService.MapInstance, l.NativePrimitve);
                    l.AddEntity(line);
                    if (options.metadata) {
                        options.metadata.forEach((v, k) => line.Metadata.set(k, v));
                    }
                    if (options.title && options.title !== '') {
                        line.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        line.ShowTooltip = options.showTooltip;
                    }
                    lines.push(line);
                });
                return lines;
            }
        });
    }
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
    CreatePolylines(layer, options) {
        const /** @type {?} */ p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            const /** @type {?} */ polylines = new Promise((resolve, reject) => {
                const /** @type {?} */ polys = options.map(o => {
                    const /** @type {?} */ locs = BingConversions.TranslatePaths(o.path);
                    const /** @type {?} */ op = BingConversions.TranslatePolylineOptions(o);
                    if (locs && locs.length > 0 && !Array.isArray(locs[0])) {
                        const /** @type {?} */ poly = new Microsoft.Maps.Polyline(locs[0], op);
                        const /** @type {?} */ polyline = new BingPolyline(poly, this._mapService.MapInstance, l.NativePrimitve);
                        if (o.title && o.title !== '') {
                            polyline.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach((v, k) => polyline.Metadata.set(k, v));
                        }
                        return polyline;
                    }
                    else {
                        const /** @type {?} */ lines = new Array();
                        locs.forEach(x => {
                            const /** @type {?} */ poly = new Microsoft.Maps.Polyline(x, op);
                            const /** @type {?} */ polyline = new BingPolyline(poly, this._mapService.MapInstance, l.NativePrimitve);
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
BingLayerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingLayerService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFRckQsTUFBTSx1QkFBd0IsU0FBUSxhQUFhOzs7Ozs7OztJQWEvQyxZQUFZLFdBQXVCLEVBQUUsS0FBYTtRQUM5QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7Ozs7Ozs7SUFZTSxRQUFRLENBQUMsS0FBd0I7UUFDcEMsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQWNqRCxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQXdCO1FBQ3hELHVCQUFNLENBQUMsR0FBbUIs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Q0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUFFOzRCQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7NkJBQUU7NEJBQzNELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3hCLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO3FCQUNoQjtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEIsQ0FBQyxDQUFDOzs7O1lBckxWLFVBQVU7Ozs7WUFaRixVQUFVO1lBYkUsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQmluZ01hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbWFya2VyJztcclxuaW1wb3J0IHsgQmluZ1BvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBCaW5nUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0xheWVyQmFzZSB9IGZyb20gJy4vYmluZy1sYXllci1iYXNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBjb250cmFjdCBmb3IgYSAgQmluZyBNYXBzIFY4IHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgQmluZ0xheWVyQmFzZSBpbXBsZW1lbnRzIExheWVyU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTGF5ZXJTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gSW5zdGFuY2Ugb2YgdGhlIEJpbmcgTWFwcyBTZXJ2aWNlLiBXaWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICBzdXBlcihfbWFwU2VydmljZSwgX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxyXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllckRpcmVjdGl2ZSB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVMYXllcih7IGlkOiBsYXllci5JZCB9KTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBsYXllclByb21pc2UpO1xyXG4gICAgICAgIGxheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRWaXNpYmxlKGxheWVyLlZpc2libGUpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGhzKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG8pO1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uOiBQb2x5Z29uID0gbmV3IEJpbmdQb2x5Z29uKHBvbHksIDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBTZXJ2aWNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWdvbi5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7cG9seWdvbi5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xhYmVsICE9IG51bGwpIHsgcG9seWdvbi5TaG93TGFiZWwgPSBvcHRpb25zLnNob3dMYWJlbDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBvbHlnb24uU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWF4Wm9vbSAhPSBudWxsKSB7IHBvbHlnb24uTGFiZWxNYXhab29tID0gb3B0aW9ucy5sYWJlbE1heFpvb207IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNaW5ab29tICE9IG51bGwpIHsgcG9seWdvbi5MYWJlbE1pblpvb20gPSBvcHRpb25zLmxhYmVsTWluWm9vbTsgfVxyXG4gICAgICAgICAgICBsLkFkZEVudGl0eShwb2x5Z29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29ucy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWdvbnM6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWdvbj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlzOiBBcnJheTxCaW5nUG9seWdvbj4gPSBvcHRpb25zLm1hcChvID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG8ucGF0aHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbihsb2NzLCBvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWdvbjogQmluZ1BvbHlnb24gPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7IHBvbHlnb24uVGl0bGUgPSBvLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5Z29uLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhbiBhcnJheVxyXG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcclxuICAgICAgICBsZXQgcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lO1xyXG4gICAgICAgIGxldCBsaW5lOiBQb2x5bGluZTtcclxuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxyXG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGggJiYgb3B0aW9ucy5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUobG9jc1swXSwgbyk7XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gbmV3IEJpbmdQb2x5bGluZShwb2x5bGluZSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IGxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHtsaW5lLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBsaW5lLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xyXG4gICAgICAgICAgICAgICAgbG9jcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKHgsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykge2xpbmUuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBsaW5lLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlsaW5lcy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWxpbmVzIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWxpbmVzOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9seXM6IEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4gPSBvcHRpb25zLm1hcChvID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG8ucGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3A6IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NzICYmIGxvY3MubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShsb2NzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5OiBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShsb2NzWzBdLCBvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lOiBCaW5nUG9seWxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHksIHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby50aXRsZSAmJiBvLnRpdGxlICE9PSAnJykgeyBwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5bGluZS5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2x5bGluZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY3MuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHkgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUoeCwgb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWxpbmU6IEJpbmdQb2x5bGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7cG9seWxpbmUuVGl0bGUgPSBvLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocG9seXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19