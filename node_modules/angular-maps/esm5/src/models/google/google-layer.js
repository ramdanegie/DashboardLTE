/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
GoogleLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof GoogleLayer
     */
    function GoogleLayer(_layer, _maps, _id) {
        this._layer = _layer;
        this._maps = _maps;
        this._id = _id;
        this._entities = new Array();
        this._visible = true;
    }
    Object.defineProperty(GoogleLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer. Google does not have the concept of a custom layer,
         * so we are returning the Map as the native object because it hosts all the markers.
         *
         * \@memberof GoogleLayer
         * @return {?} GoogleMapTypes.GoogleMap.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        throw (new Error('Events are not supported on Google Layers. You can still add events to individual markers.'));
    };
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleLAyer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleLAyer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            this._entities.push(entity);
            entity.NativePrimitve.setVisible(this._visible);
            entity.NativePrimitve.setMap(this.NativePrimitve);
        }
    };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddEntities = /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            (_a = this._entities).push.apply(_a, tslib_1.__spread(entities));
            eachSeries(tslib_1.__spread(entities), function (e, next) {
                e.NativePrimitve.setVisible(_this._visible);
                e.NativePrimitve.setMap(_this.NativePrimitve);
                nextTick(function () { return next(); });
            });
        }
        var _a;
    };
    /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    GoogleLayer.prototype.Delete = /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    function () {
        eachSeries(this._entities.splice(0), function (e, next) {
            e.NativePrimitve.setMap(null);
            nextTick(function () { return next(); });
        });
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    GoogleLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    function () {
        var /** @type {?} */ options = {
            id: this._id
        };
        return options;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GoogleLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._visible;
    };
    /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.RemoveEntity = /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            var /** @type {?} */ j = this._entities.indexOf(entity);
            if (j > -1) {
                this._entities.splice(j, 1);
            }
            entity.NativePrimitve.setMap(null);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        this.Delete();
        this.AddEntities(entities);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        this._id = options.id;
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        eachSeries(tslib_1.__spread(this._entities), function (e, next) {
            e.NativePrimitve.setVisible(visible);
            nextTick(function () { return next(); });
        });
        this._visible = visible;
    };
    return GoogleLayer;
}());
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
export { GoogleLayer };
function GoogleLayer_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleLayer.prototype._entities;
    /** @type {?} */
    GoogleLayer.prototype._visible;
    /** @type {?} */
    GoogleLayer.prototype._layer;
    /** @type {?} */
    GoogleLayer.prototype._maps;
    /** @type {?} */
    GoogleLayer.prototype._id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7OztBQWlCN0M7Ozs7O0FBQUE7SUF3QkksR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7Ozs7T0FPRztJQUNILHFCQUFvQixNQUFnQyxFQUFVLEtBQWlCLEVBQVUsR0FBVztRQUFoRixXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFRO3lCQS9CckMsSUFBSSxLQUFLLEVBQXNDO3dCQUNsRixJQUFJO0tBOEJ5RTswQkFoQjlGLHVDQUFjOzs7Ozs7Ozs7O1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUErQmhCLGlDQUFXOzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQVk3RywrQkFBUzs7Ozs7Ozs7OztjQUFDLE1BQWdEO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDckQ7Ozs7Ozs7Ozs7O0lBV0UsaUNBQVc7Ozs7Ozs7OztjQUFDLFFBQW1EOztRQUNsRSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUEsS0FBQSxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsSUFBSSw0QkFBSSxRQUFRLEdBQUU7WUFDakMsVUFBVSxrQkFBSyxRQUFRLEdBQUcsVUFBQyxDQUFDLEVBQUUsSUFBSTtnQkFDOUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7OztJQVFFLDRCQUFNOzs7Ozs7O1FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsQ0FBQyxFQUFFLElBQUk7WUFDekMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLGdDQUFVOzs7Ozs7OztRQUNiLHFCQUFNLE9BQU8sR0FBa0I7WUFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7OztJQVVaLGdDQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7O0lBVWxCLGtDQUFZOzs7Ozs7OztjQUFDLE1BQWdEO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHFCQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQzVDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDOzs7Ozs7Ozs7OztJQVdFLGlDQUFXOzs7Ozs7Ozs7Y0FBQyxRQUE4RTtRQUM3RixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd4QixnQ0FBVTs7Ozs7Ozs7O2NBQUMsT0FBc0I7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVW5CLGdDQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLFVBQVUsa0JBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFDLENBQUMsRUFBRSxJQUFJO1lBQ3BDLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O3NCQXRNaEM7SUF5TUMsQ0FBQTs7Ozs7O0FBeExELHVCQXdMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVhY2hTZXJpZXMsIG5leHRUaWNrIH0gZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXJrZXIgfSBmcm9tICcuL2dvb2dsZS1tYXJrZXInO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBsYXllciBmb3IgdGhlIEdvb2dsZSBNYXAgUHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVMYXllciBpbXBsZW1lbnRzIExheWVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+ID0gbmV3IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KCk7XHJcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuIEdvb2dsZSBkb2VzIG5vdCBoYXZlIHRoZSBjb25jZXB0IG9mIGEgY3VzdG9tIGxheWVyLFxyXG4gICAgICogc28gd2UgYXJlIHJldHVybmluZyB0aGUgTWFwIGFzIHRoZSBuYXRpdmUgb2JqZWN0IGJlY2F1c2UgaXQgaG9zdHMgYWxsIHRoZSBtYXJrZXJzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBHb29nbGVNYXJrZXJDbHVzdGVyZXIgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllciBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIuIE5hdGl2ZSBHb29nbGUgTWFwcyBNYXJrZXIgQ2x1c3RlcmVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gX21hcHMgTWFwU2VydmljZS4gTWFwU2VydmljZSBpbXBsZW1lbnRhdGlvbiB0byBsZXZlcmFnZSBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYXllcjogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwLCBwcml2YXRlIF9tYXBzOiBNYXBTZXJ2aWNlLCBwcml2YXRlIF9pZDogbnVtYmVyKSB7IH1cclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMsIExheWVyIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSBzdHJpbmcuIFR5cGUgb2YgZXZlbnQgdG8gYWRkIChjbGljaywgbW91c2VvdmVyLCBldGMpLiBZb3UgY2FuIHVzZSBhbnkgZXZlbnQgdGhhdCB0aGUgdW5kZXJseWluZyBuYXRpdmVcclxuICAgICAqIGxheWVyIHN1cHBvcnRzLlxyXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uLiBIYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ0V2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBvbiBHb29nbGUgTGF5ZXJzLiBZb3UgY2FuIHN0aWxsIGFkZCBldmVudHMgdG8gaW5kaXZpZHVhbCBtYXJrZXJzLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbiBhcyBpdCB3aWxsXHJcbiAgICAgKiB0cmlnZ2VyIGEgcmVjYWx1YXRpb24gb2YgdGhlIGNsdXN0ZXJzIChhbmQgYXNzb2NpYXRlZCBtYXJrZXJzIGlmIGFwcHJvcHJpdGUpIGZvclxyXG4gICAgICogZWFjaCBpbnZvY2F0aW9uLiBJZiB5b3UgdXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBtYW55IG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXIsIHVzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZS4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxBeWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRFbnRpdHkoZW50aXR5OiBNYXJrZXIgfCBJbmZvV2luZG93IHwgUG9seWdvbiB8IFBvbHlsaW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllcy5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICAgIGVudGl0eS5OYXRpdmVQcmltaXR2ZS5zZXRWaXNpYmxlKHRoaXMuX3Zpc2libGUpO1xyXG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBudW1iZXIgb2YgZW50aXRpZXMgdG8gdGhlIGxheWVyLiBFbnRpdGllcyBpbiB0aGlzIGNvbnRleHQgc2hvdWxkIGJlIG1vZGVsIGFic3RyYWN0aW9ucyBvZiBjb25jZXJlZCBtYXAgZnVuY3Rpb25hbGl0eSAoc3VjaFxyXG4gICAgICogYXMgbWFya2VyLCBpbmZvd2luZG93LCBwb2x5bGluZSwgcG9seWdvbiwgZXRjLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMQXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllcy5wdXNoKC4uLmVudGl0aWVzKTtcclxuICAgICAgICAgICAgZWFjaFNlcmllcyhbLi4uZW50aXRpZXNdLCAoZSwgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5OYXRpdmVQcmltaXR2ZS5zZXRWaXNpYmxlKHRoaXMuX3Zpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgZS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAodGhpcy5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiBuZXh0KCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllciBhbmJkIHRoZSBtYXJrZXJzIGluIGl0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGVhY2hTZXJpZXModGhpcy5fZW50aXRpZXMuc3BsaWNlKDApLCAoZSwgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4gbmV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgSUxheWVyT3B0aW9ucy4gVGhlIGxheWVyIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElMYXllck9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lIEVudGl0eSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyIHwgSW5mb1dpbmRvdyB8IFBvbHlnb24gfCBQb2x5bGluZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUpIHtcclxuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fZW50aXRpZXMuaW5kZXhPZihlbnRpdHkpO1xyXG4gICAgICAgICAgICBpZiAoaiA+IC0xKSB7IHRoaXMuX2VudGl0aWVzLnNwbGljZShqLCAxKTsgfVxyXG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4gY29udGFpbmluZ1xyXG4gICAgICogdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci4gVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPiB8IEFycmF5PEluZm9XaW5kb3c+IHwgQXJyYXk8UG9seWdvbj4gfCBBcnJheTxQb2x5bGluZT4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkRlbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuQWRkRW50aXRpZXMoZW50aXRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUxheWVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTGF5ZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBvcHRpb25zLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBlYWNoU2VyaWVzKFsuLi50aGlzLl9lbnRpdGllc10sIChlLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh2aXNpYmxlKTtcclxuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4gbmV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19