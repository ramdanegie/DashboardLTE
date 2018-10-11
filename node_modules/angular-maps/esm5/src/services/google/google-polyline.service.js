/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Google Maps.
 *
 * @export
 */
var GooglePolylineService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GooglePolylineService.
     * @param _mapService - {@link MapService} instance. The concrete {@link GoogleMapService} implementation is expected.
     * @param _layerService - {@link LayerService} instance.
     * The concrete {@link GoogleLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof GooglePolylineService
     */
    function GooglePolylineService(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polylines = new Map();
    }
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    GooglePolylineService.prototype.AddPolyline = /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    function (polyline) {
        var /** @type {?} */ o = {
            id: polyline.Id,
            clickable: polyline.Clickable,
            draggable: polyline.Draggable,
            editable: polyline.Editable,
            geodesic: polyline.Geodesic,
            path: polyline.Path,
            showTooltip: polyline.ShowTooltip,
            strokeColor: polyline.StrokeColor,
            strokeOpacity: polyline.StrokeOpacity,
            strokeWeight: polyline.StrokeWeight,
            title: polyline.Title,
            visible: polyline.Visible,
            zIndex: polyline.zIndex,
        };
        var /** @type {?} */ polylinePromise = this._mapService.CreatePolyline(o);
        this._polylines.set(polyline, polylinePromise);
    };
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof GooglePolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    GooglePolylineService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a line.
     *
     * \@memberof GooglePolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, polyline) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._polylines.get(polyline).then(function (p) {
                var /** @type {?} */ x = Array.isArray(p) ? p : [p];
                x.forEach(function (line) { return line.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); }); });
            });
        });
    };
    /**
     * Deletes a polyline.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    GooglePolylineService.prototype.DeletePolyline = /**
     * Deletes a polyline.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    function (polyline) {
        var _this = this;
        var /** @type {?} */ m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                var /** @type {?} */ x = Array.isArray(l) ? l : [l];
                x.forEach(function (line) { return line.Delete(); });
                _this._polylines.delete(polyline);
            });
        });
    };
    /**
     * Obtains geo coordinates for the line on the click location
     *
     * @abstract
     * \@memberof GooglePolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
     *
     */
    GooglePolylineService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the line on the click location
     *
     * @abstract
     * \@memberof GooglePolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
     *
     */
    function (e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    };
    /**
     * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     */
    GooglePolylineService.prototype.GetNativePolyline = /**
     * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     */
    function (polyline) {
        return this._polylines.get(polyline);
    };
    /**
     * Set the polyline options.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    GooglePolylineService.prototype.SetOptions = /**
     * Set the polyline options.
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    function (polyline, options) {
        return this._polylines.get(polyline).then(function (l) {
            var /** @type {?} */ x = Array.isArray(l) ? l : [l];
            x.forEach(function (line) { return line.SetOptions(options); });
        });
    };
    /**
     * Updates the Polyline path
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    GooglePolylineService.prototype.UpdatePolyline = /**
     * Updates the Polyline path
     *
     * \@memberof GooglePolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    function (polyline) {
        var _this = this;
        var /** @type {?} */ m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () {
            var /** @type {?} */ x = Array.isArray(l) ? l : [l];
            var /** @type {?} */ p = polyline.Path.length > 0 && Array.isArray(polyline.Path[0]) ? /** @type {?} */ (polyline.Path) : /** @type {?} */ ([polyline.Path]);
            x.forEach(function (line, index) {
                if (p.length > index) {
                    line.SetPath(p[index]);
                }
            });
            if (Array.isArray(l) && l.length > p.length) {
                l.splice(p.length - 1).forEach(function (line) { return line.Delete(); });
            }
        }); });
    };
    GooglePolylineService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GooglePolylineService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: NgZone }
    ]; };
    return GooglePolylineService;
}());
export { GooglePolylineService };
function GooglePolylineService_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolylineService.prototype._polylines;
    /** @type {?} */
    GooglePolylineService.prototype._mapService;
    /** @type {?} */
    GooglePolylineService.prototype._layerService;
    /** @type {?} */
    GooglePolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlsaW5lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7SUFnQjVDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7OztPQVFHO0lBQ0gsK0JBQW9CLFdBQXVCLEVBQy9CLGVBQ0E7UUFGUSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixrQkFBYSxHQUFiLGFBQWE7UUFDYixVQUFLLEdBQUwsS0FBSzswQkFqQmIsSUFBSSxHQUFHLEVBQTJEO0tBaUJ4Qzs7Ozs7Ozs7OztJQWN2QiwyQ0FBVzs7Ozs7Ozs7O2NBQUMsUUFBOEI7UUFDN0MscUJBQU0sQ0FBQyxHQUFxQjtZQUN4QixFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDZixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO1lBQ3JDLFlBQVksRUFBRSxRQUFRLENBQUMsWUFB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QUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBeUIsUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLG1CQUM3RSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQUU7YUFDcEQsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0osQ0FBQyxFQVhpQixDQVdqQixDQUFDLENBQUM7OztnQkEvS1gsVUFBVTs7OztnQkFSRixVQUFVO2dCQUNWLFlBQVk7Z0JBUEEsTUFBTTs7Z0NBRDNCOztTQWdCYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IE1hcFBvbHlsaW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9wb2x5bGluZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvbHlsaW5lIFNlcnZpY2UgYWJzdHJhY3QgY2xhc3MgZm9yIEdvb2dsZSBNYXBzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQb2x5bGluZVNlcnZpY2UgaW1wbGVtZW50cyBQb2x5bGluZVNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9wb2x5bGluZXM6IE1hcDxNYXBQb2x5bGluZURpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiA9XHJcbiAgICAgICAgbmV3IE1hcDxNYXBQb2x5bGluZURpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1lbWJlcnMgYW5kIE1hcmtlclNlcnZpY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIGEgbWFwLiBEZXBlbmRpbmcgb24gdGhlIHBvbHlsaW5lIGNvbnRleHQsIHRoZSBwb2x5bGluZSB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcclxuICAgICAqIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZFBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IElQb2x5bGluZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBwb2x5bGluZS5JZCxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiBwb2x5bGluZS5DbGlja2FibGUsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWxpbmUuRHJhZ2dhYmxlLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogcG9seWxpbmUuRWRpdGFibGUsXHJcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBwb2x5bGluZS5HZW9kZXNpYyxcclxuICAgICAgICAgICAgcGF0aDogcG9seWxpbmUuUGF0aCxcclxuICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IHBvbHlsaW5lLlNob3dUb29sdGlwLFxyXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogcG9seWxpbmUuU3Ryb2tlQ29sb3IsXHJcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBvbHlsaW5lLlN0cm9rZU9wYWNpdHksXHJcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogcG9seWxpbmUuU3Ryb2tlV2VpZ2h0LFxyXG4gICAgICAgICAgICB0aXRsZTogcG9seWxpbmUuVGl0bGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHBvbHlsaW5lLlZpc2libGUsXHJcbiAgICAgICAgICAgIHpJbmRleDogcG9seWxpbmUuekluZGV4LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcG9seWxpbmVQcm9taXNlOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4gPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZVBvbHlsaW5lKG8pO1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQocG9seWxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIGxpbmUuXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSkudGhlbihwID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkocCkgPyBwIDogW3BdO1xyXG4gICAgICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gbGluZS5BZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBEZWxldGVzIGEgcG9seWxpbmUuXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBoYXMgYmVlbiBkZWxldGVkLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbihsID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xyXG4gICAgICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gIGxpbmUuRGVsZXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzLmRlbGV0ZShwb2x5bGluZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbGluZSBvbiB0aGUgY2xpY2sgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKCFlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWUubGF0TG5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWUubGF0TG5nLmxhdCB8fCAhZS5sYXRMbmcubG5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sYXRMbmcubGF0KCksIGxvbmdpdHVkZTogZS5sYXRMbmcubG5nKCkgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIHBvbHlsaW5lIG1vZGVsIGZvciB0aGUgbGluZSBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlsaW5lIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5bGluZX1cclxuICAgICAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLiBGb3IgY29tcGxleCBwYXRocywgcmV0dXJucyBhbiBhcnJheSBvZiBwb2x5bGluZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TmF0aXZlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlsaW5lIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlsaW5lT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIE9wdGlvbnMgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGVcclxuICAgICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIG9wdGlvbnMgaGF2ZSBiZWVuIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KGwpID8gbCA6IFtsXTtcclxuICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gbGluZS5TZXRPcHRpb25zKG9wdGlvbnMpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIFBvbHlsaW5lIHBhdGhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKGwgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KGwpID8gbCA6IFtsXTtcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9XHJcbiAgICAgICAgICAgICAgICBwb2x5bGluZS5QYXRoLmxlbmd0aCA+IDAgJiYgQXJyYXkuaXNBcnJheShwb2x5bGluZS5QYXRoWzBdKSA/IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBvbHlsaW5lLlBhdGggOlxyXG4gICAgICAgICAgICAgICAgPEFycmF5PEFycmF5PElMYXRMb25nPj4+W3BvbHlsaW5lLlBhdGhdO1xyXG4gICAgICAgICAgICB4LmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sZW5ndGggPiBpbmRleCkgeyBsaW5lLlNldFBhdGgocFtpbmRleF0pOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsKSAmJiBsLmxlbmd0aCA+IHAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBsLnNwbGljZShwLmxlbmd0aCAtIDEpLmZvckVhY2gobGluZSA9PiBsaW5lLkRlbGV0ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=