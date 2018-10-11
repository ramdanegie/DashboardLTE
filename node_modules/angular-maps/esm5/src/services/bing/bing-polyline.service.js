/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Bing Maps V8.
 *
 * @export
 */
var BingPolylineService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingPolylineService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link LayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingPolylineService
     */
    function BingPolylineService(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polylines = new Map();
    }
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * corresponding layer.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    BingPolylineService.prototype.AddPolyline = /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * corresponding layer.
     *
     * \@memberof BingPolylineService
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
        var /** @type {?} */ polylinePromise;
        if (polyline.InCustomLayer) {
            polylinePromise = this._layerService.CreatePolyline(polyline.LayerId, o);
        }
        else {
            polylinePromise = this._mapService.CreatePolyline(o);
        }
        this._polylines.set(polyline, polylinePromise);
    };
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof BingPolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    BingPolylineService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a line.
     *
     * \@memberof BingPolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, polyline) {
        var _this = this;
        var /** @type {?} */ b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
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
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    BingPolylineService.prototype.DeletePolyline = /**
     * Deletes a polyline.
     *
     * \@memberof BingPolylineService
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
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof BingPolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    BingPolylineService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof BingPolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    function (e) {
        if (!e) {
            return null;
        }
        if (!e.location) {
            return null;
        }
        return { latitude: e.location.latitude, longitude: e.location.longitude };
    };
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     */
    BingPolylineService.prototype.GetNativePolyline = /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolylineService
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
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    BingPolylineService.prototype.SetOptions = /**
     * Set the polyline options.
     *
     * \@memberof BingPolylineService
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
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    BingPolylineService.prototype.UpdatePolyline = /**
     * Updates the Polyline path
     *
     * \@memberof BingPolylineService
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
    BingPolylineService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingPolylineService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: NgZone }
    ]; };
    return BingPolylineService;
}());
export { BingPolylineService };
function BingPolylineService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolylineService.prototype._polylines;
    /** @type {?} */
    BingPolylineService.prototype._mapService;
    /** @type {?} */
    BingPolylineService.prototype._layerService;
    /** @type {?} */
    BingPolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU1yRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0lBZ0I1QyxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7T0FRRztJQUNILDZCQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7MEJBakJqQixJQUFJLEdBQUcsRUFBMkQ7S0FrQmpFOzs7Ozs7Ozs7O0lBY00seUNBQVc7Ozs7Ozs7OztjQUFDLFFBQThCO1FBQzdDLHFCQUFNLENBQUMsR0FBcUI7WUFDeEIsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO1lBQ2pDLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYTtZQUNyQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVk7WUFDbkMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1lBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztZQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07U0FDMUIsQ0FBQztRQUNGLHFCQUFJLGVBQWtELENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBWTVDLG1EQUFxQjs7Ozs7Ozs7OztjQUFJLFNBQWlCLEVBQUUsUUFBOEI7O1FBQzdFLHFCQUFNLENBQUMsR0FBZSxJQUFJLE9BQU8sRUFBSyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDM0I7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzNCO1FBSUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFxQjtZQUMzQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2dCQUNoQyxxQkFBTSxDQUFDLEdBQW9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxFQUE3RSxDQUE2RSxDQUFDLENBQUM7YUFDcEcsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0EsNENBQWM7Ozs7Ozs7O2NBQUMsUUFBOEI7O1FBQ2hELHFCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVc7WUFDdEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsQixxQkFBTSxDQUFDLEdBQW9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQWFBLHFEQUF1Qjs7Ozs7Ozs7O2NBQUMsQ0FBaUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDakMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7Ozs7Ozs7OztJQVl2RSwrQ0FBaUI7Ozs7Ozs7OztjQUFDLFFBQThCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYWxDLHdDQUFVOzs7Ozs7Ozs7O2NBQUMsUUFBOEIsRUFBRSxPQUF5QjtRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUN2QyxxQkFBTSxDQUFDLEdBQW9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1NBQy9DLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdBLDRDQUFjOzs7Ozs7OztjQUFDLFFBQThCOztRQUNoRCxxQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUM5QixxQkFBTSxDQUFDLEdBQW9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxxQkFBTSxDQUFDLEdBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQXlCLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxtQkFDN0UsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMzQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2FBQ3JELENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FBQzthQUN6RDtTQUNKLENBQUMsRUFYaUIsQ0FXakIsQ0FBQyxDQUFDOzs7Z0JBeExYLFVBQVU7Ozs7Z0JBUkYsVUFBVTtnQkFDVixZQUFZO2dCQVJBLE1BQU07OzhCQUEzQjs7U0FnQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNYXBQb2x5bGluZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWxpbmUuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5bGluZSBTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBCaW5nIE1hcHMgVjguXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdQb2x5bGluZVNlcnZpY2UgaW1wbGVtZW50cyBQb2x5bGluZVNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9wb2x5bGluZXM6IE1hcDxNYXBQb2x5bGluZURpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiA9XHJcbiAgICBuZXcgTWFwPE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWxpbmVTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZW1iZXJzIGFuZCBNYXJrZXJTZXJ2aWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5bGluZSBjb250ZXh0LCB0aGUgcG9seWxpbmUgd2lsbCBlaXRoZXIgYnkgYWRkZWQgdG8gdGhlIG1hcCBvciBhXHJcbiAgICAgKiBjb3JyZXNwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBJUG9seWxpbmVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogcG9seWxpbmUuSWQsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogcG9seWxpbmUuQ2xpY2thYmxlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHBvbHlsaW5lLkRyYWdnYWJsZSxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHBvbHlsaW5lLkVkaXRhYmxlLFxyXG4gICAgICAgICAgICBnZW9kZXNpYzogcG9seWxpbmUuR2VvZGVzaWMsXHJcbiAgICAgICAgICAgIHBhdGg6IHBvbHlsaW5lLlBhdGgsXHJcbiAgICAgICAgICAgIHNob3dUb29sdGlwOiBwb2x5bGluZS5TaG93VG9vbHRpcCxcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHBvbHlsaW5lLlN0cm9rZUNvbG9yLFxyXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBwb2x5bGluZS5TdHJva2VPcGFjaXR5LFxyXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IHBvbHlsaW5lLlN0cm9rZVdlaWdodCxcclxuICAgICAgICAgICAgdGl0bGU6IHBvbHlsaW5lLlRpdGxlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBwb2x5bGluZS5WaXNpYmxlLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHBvbHlsaW5lLnpJbmRleCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBwb2x5bGluZVByb21pc2U6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PjtcclxuICAgICAgICBpZiAocG9seWxpbmUuSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICBwb2x5bGluZVByb21pc2UgPSB0aGlzLl9sYXllclNlcnZpY2UuQ3JlYXRlUG9seWxpbmUocG9seWxpbmUuTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5bGluZShvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcG9seWxpbmVzLnNldChwb2x5bGluZSwgcG9seWxpbmVQcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbGluZS5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYjogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ21vdXNlbW92ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdyaWdodGNsaWNrJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy8vIG1vdXNlbW92ZSBhbmQgcmlnaHRjbGljayBhcmUgbm90IHN1cHBvcnRlZCBieSBiaW5nIHBvbHlnb25zLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpLnRoZW4ocCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KHApID8gcCA6IFtwXTtcclxuICAgICAgICAgICAgICAgIHguZm9yRWFjaChsaW5lID0+IGxpbmUuQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogRGVsZXRlcyBhIHBvbHlsaW5lLlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAgKlxyXG4gICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5bGluZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XHJcbiAgICAgICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiAgbGluZS5EZWxldGUoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZGVsZXRlKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKCFlKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgaWYgKCFlLmxvY2F0aW9uKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGUubG9jYXRpb24ubGF0aXR1ZGUsIGxvbmdpdHVkZTogZS5sb2NhdGlvbi5sb25naXR1ZGUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIG1hcmtlciBtb2RlbCBmb3IgdGhlIG1hcmtlciBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlsaW5lIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5bGluZX1cclxuICAgICAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLiBGb3IgY29tcGxleCBwYXRocywgcmV0dXJucyBhbiBhcnJheSBvZiBwb2x5bGluZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5bGluZSBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBPcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlXHJcbiAgICAgKiBvcHRpb25zIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xyXG4gICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLlNldE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgUG9seWxpbmUgcGF0aFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKGwgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KGwpID8gbCA6IFtsXTtcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9XHJcbiAgICAgICAgICAgICAgICBwb2x5bGluZS5QYXRoLmxlbmd0aCA+IDAgJiYgQXJyYXkuaXNBcnJheShwb2x5bGluZS5QYXRoWzBdKSA/IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBvbHlsaW5lLlBhdGggOlxyXG4gICAgICAgICAgICAgICAgPEFycmF5PEFycmF5PElMYXRMb25nPj4+W3BvbHlsaW5lLlBhdGhdO1xyXG4gICAgICAgICAgICAgeC5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIGlmIChwLmxlbmd0aCA+IGluZGV4KSB7IGxpbmUuU2V0UGF0aChwW2luZGV4XSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGwpICYmIGwubGVuZ3RoID4gcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGwuc3BsaWNlKHAubGVuZ3RoIC0gMSkuZm9yRWFjaChsaW5lID0+IGxpbmUuRGVsZXRlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==