/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract class to implement map api. A concrete implementation should be created for each
 * Map provider supported (e.g. Bing, Goolge, ESRI)
 *
 * @export
 * @abstract
 * @abstract
 */
export class MapService {
    /**
     * Gets a random geo locations filling the bounding box.
     *
     * \@memberof MapService
     * @param {?} count - number of locations to return
     * @param {?} bounds  - bounding box.
     * @return {?} - Array of geo locations.
     */
    static GetRandonLocations(count, bounds) {
        const /** @type {?} */ a = [];
        const /** @type {?} */ _getRandomLocation = (b) => {
            const /** @type {?} */ lat = Math.random() * (b.maxLatitude - b.minLatitude) + b.minLatitude;
            let /** @type {?} */ lng = 0;
            if (crossesDateLine) {
                lng = Math.random() * (b.minLongitude + 360 - b.maxLongitude) + b.maxLongitude;
                if (lng > 180) {
                    lng = lng - 360;
                }
            }
            else {
                lng = Math.random() * (b.maxLongitude - b.minLongitude) + b.minLongitude;
            }
            const /** @type {?} */ p = { latitude: lat, longitude: lng };
            return p;
        };
        let /** @type {?} */ crossesDateLine = false;
        if (bounds == null) {
            bounds = /** @type {?} */ ({
                maxLatitude: 360,
                minLatitude: 0,
                maxLongitude: 170,
                minLongitude: 0
            });
        }
        if (bounds.center.longitude < bounds.minLongitude || bounds.center.longitude > bounds.maxLongitude) {
            crossesDateLine = true;
        }
        if (!count || count <= 0) {
            return [_getRandomLocation(bounds)];
        }
        for (let /** @type {?} */ r = 0; r < count; r++) {
            a.push(_getRandomLocation(bounds));
        }
        return a;
    }
}
MapService.decorators = [
    { type: Injectable },
];
function MapService_tsickle_Closure_declarations() {
    /**
     * Gets the Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapInstance = function () { };
    /**
     * Gets a Promise for a Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapPromise = function () { };
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapSize = function () { };
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof MapService
     * @abstract
     * @abstract
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    MapService.prototype.CreateCanvasOverlay = function (drawCallback) { };
    /**
     * Creates a map cluster layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateClusterLayer = function (options) { };
    /**
     * Creates an information window for a map position
     *
     * \@memberof MapService
     * @abstract
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying natvie infobox object.
     *
     */
    MapService.prototype.CreateInfoWindow = function (options) { };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateLayer = function (options) { };
    /**
     * Creates a map instance
     *
     * \@memberof MapService
     * @abstract
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    MapService.prototype.CreateMap = function (el, mapOptions) { };
    /**
     * Creates a map marker within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying native pushpin object.
     *
     */
    MapService.prototype.CreateMarker = function (options) { };
    /**
     * Creates a polygon within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    MapService.prototype.CreatePolygon = function (options) { };
    /**
     * Creates a polyline within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polyline.
     *
     */
    MapService.prototype.CreatePolyline = function (options) { };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} layer - Layer to delete. See {\@link Layer}.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    MapService.prototype.DeleteLayer = function (layer) { };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.DisposeMap = function () { };
    /**
     * Gets the geo coordinates of the map bounds
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the bounding box of the screen. See {\@link IBox}.
     *
     */
    MapService.prototype.GetBounds = function () { };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    MapService.prototype.GetCenter = function () { };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    MapService.prototype.GetZoom = function () { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    MapService.prototype.LocationToPoint = function (loc) { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    MapService.prototype.LocationsToPoints = function (locs) { };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    MapService.prototype.SetCenter = function (latLng) { };
    /**
     * Sets the generic map options.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetMapOptions = function (options) { };
    /**
     * Sets the view options of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetViewOptions = function (options) { };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    MapService.prototype.SetZoom = function (zoom) { };
    /**
     * Creates an event subscription
     *
     * \@memberof MapService
     * @abstract
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    MapService.prototype.SubscribeToMapEvent = function (eventName) { };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    MapService.prototype.TriggerMapEvent = function (eventName) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQTJCbkQsTUFBTTs7Ozs7Ozs7O0lBNENLLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsTUFBWTtRQUN4RCx1QkFBTSxDQUFDLEdBQW9CLEVBQUUsQ0FBQztRQUM5Qix1QkFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQU8sRUFBRSxFQUFFO1lBQ25DLHVCQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3BGLHFCQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFBRTthQUN0QztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2FBQzVFO1lBQ0QsdUJBQU0sQ0FBQyxHQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaLENBQUM7UUFDRixxQkFBSSxlQUFlLEdBQVksS0FBSyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxxQkFBUztnQkFDN0IsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxDQUFDO2dCQUNkLFlBQVksRUFBRSxHQUFHO2dCQUNqQixZQUFZLEVBQUUsQ0FBQzthQUNsQixDQUFBLENBQUM7U0FDTDtRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDaEksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDdkUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7OztZQTFFaEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElNYXBPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFwLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSVNpemUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzaXplJztcclxuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJveCc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9tb2RlbHMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjbGFzcyB0byBpbXBsZW1lbnQgbWFwIGFwaS4gQSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBzaG91bGQgYmUgY3JlYXRlZCBmb3IgZWFjaFxyXG4gKiBNYXAgcHJvdmlkZXIgc3VwcG9ydGVkIChlLmcuIEJpbmcsIEdvb2xnZSwgRVNSSSlcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcFNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBwcm9wZXJ0aWVzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXQgTWFwSW5zdGFuY2UoKTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIFByb21pc2UgZm9yIGEgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb24uIFVzZSB0aGlzIGluc3RlYWQgb2Yge0BsaW5rIE1hcEluc3RhbmNlfSBpZiB5b3VcclxuICAgICAqIGFyZSBub3Qgc3VyZSBpZiBhbmQgd2hlbiB0aGUgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXQgTWFwUHJvbWlzZSgpOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXBzIHBoeXNpY2FsIHNpemUuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldCBNYXBTaXplKCk6IElTaXplO1xyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwU2VydmljZSBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHJhbmRvbSBnZW8gbG9jYXRpb25zIGZpbGxpbmcgdGhlIGJvdW5kaW5nIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY291bnQgLSBudW1iZXIgb2YgbG9jYXRpb25zIHRvIHJldHVyblxyXG4gICAgICogQHBhcmFtIGJvdW5kcyAgLSBib3VuZGluZyBib3guXHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIGdlbyBsb2NhdGlvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbkxvY2F0aW9ucyhjb3VudDogbnVtYmVyLCBib3VuZHM6IElCb3gpOiBBcnJheTxJTGF0TG9uZz4ge1xyXG4gICAgICAgIGNvbnN0IGE6IEFycmF5PElMYXRMb25nPiA9IFtdO1xyXG4gICAgICAgIGNvbnN0IF9nZXRSYW5kb21Mb2NhdGlvbiA9IChiOiBJQm94KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIChiLm1heExhdGl0dWRlIC0gYi5taW5MYXRpdHVkZSkgKyBiLm1pbkxhdGl0dWRlO1xyXG4gICAgICAgICAgICBsZXQgbG5nOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoY3Jvc3Nlc0RhdGVMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBsbmcgPSBNYXRoLnJhbmRvbSgpICogKGIubWluTG9uZ2l0dWRlICsgMzYwIC0gYi5tYXhMb25naXR1ZGUpICsgYi5tYXhMb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAobG5nID4gMTgwKSB7IGxuZyA9IGxuZyAtIDM2MDsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG5nID0gTWF0aC5yYW5kb20oKSAqIChiLm1heExvbmdpdHVkZSAtIGIubWluTG9uZ2l0dWRlKSArIGIubWluTG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IElMYXRMb25nID0geyBsYXRpdHVkZTogbGF0LCBsb25naXR1ZGU6IGxuZyB9O1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGJvdW5kcyA9PSBudWxsKSB7IGJvdW5kcyA9IDxJQm94PntcclxuICAgICAgICAgICAgICAgIG1heExhdGl0dWRlOiAzNjAsXHJcbiAgICAgICAgICAgICAgICBtaW5MYXRpdHVkZTogMCxcclxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogMTcwLFxyXG4gICAgICAgICAgICAgICAgbWluTG9uZ2l0dWRlOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib3VuZHMuY2VudGVyLmxvbmdpdHVkZSA8IGJvdW5kcy5taW5Mb25naXR1ZGUgIHx8IGJvdW5kcy5jZW50ZXIubG9uZ2l0dWRlID4gYm91bmRzLm1heExvbmdpdHVkZSkgeyBjcm9zc2VzRGF0ZUxpbmUgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKCFjb3VudCB8fCBjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbX2dldFJhbmRvbUxvY2F0aW9uKGJvdW5kcyldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IGNvdW50OyByKyspIHsgYS5wdXNoKF9nZXRSYW5kb21Mb2NhdGlvbihib3VuZHMpKTsgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhcyBvdmVybGF5IGxheWVyIHRvIHBlcmZvcm0gY3VzdG9tIGRyYXdpbmcgb3ZlciB0aGUgbWFwIHdpdGggb3V0XHJcbiAgICAgKiBzb21lIG9mIHRoZSBvdmVyaGVhZCBhc3NvY2lhdGVkIHdpdGggZ29pbmcgdGhyb3VnaCB0aGUgTWFwIG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gZHJhd0NhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FudmFzIGlzIHJlYWR5IHRvIGJlXHJcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgQ2FudmFzT3ZlcmxheX0gb2JqZWN0LlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUNsdXN0ZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIGxheWVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbmZvcm1hdGlvbiB3aW5kb3cgZm9yIGEgbWFwIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zXSAtIEluZm93aW5kb3cgb3B0aW9ucy4gU2VlIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgSW5mb1dpbmRvd30gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0dmllIGluZm9ib3ggb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZUluZm9XaW5kb3cob3B0aW9ucz86IElJbmZvV2luZG93T3B0aW9ucyk6IFByb21pc2U8SW5mb1dpbmRvdz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJTGF5ZXJPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgbGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZUxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBIVE1MIGVsZW1lbnQgdG8gaG9zdCB0aGUgbWFwLlxyXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFwIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlTWFwKGVsOiBIVE1MRWxlbWVudCwgbWFwT3B0aW9uczogSU1hcE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBtYXJrZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9ucz08SU1hcmtlck9wdGlvbnM+e31dIC0gT3B0aW9ucyBmb3IgdGhlIG1hcmtlci4gU2VlIHtAbGluayBJTWFya2VyT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTWFya2VyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcHVzaHBpbiBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWdvbi4gU2VlIHtAbGluayBJUG9seWdvbk9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlnb259IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZVBvbHlnb24ob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwb2x5bGluZSB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5bGluZS4gU2VlIHtAbGluayBJUG9seWxpbmVPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5bGluZX0gb2JqZWN0IChvciBhbiBhcnJheSB0aGVyZW9mIGZvciBjb21wbGV4IHBhdGhzKSxcclxuICAgICAqIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWxpbmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWxpbmUob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBsYXllciBmcm9tIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gTGF5ZXIgdG8gZGVsZXRlLiBTZWUge0BsaW5rIExheWVyfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIHdoZW4gdGhlIGxheWVyIGhhcyBiZWVuIHJlbW92ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgRGVsZXRlTGF5ZXIobGF5ZXI6IExheWVyKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgRGlzcG9zZU1hcCgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgYm91bmRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgc2NyZWVuLiBTZWUge0BsaW5rIElCb3h9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IEdldEJvdW5kcygpOiBQcm9taXNlPElCb3g+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgY2VudGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgY2VudGVyLiBTZWUge0BsaW5rIElMYXRMb25nfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBHZXRDZW50ZXIoKTogUHJvbWlzZTxJTGF0TG9uZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgem9vbSBsZXZlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBHZXRab29tKCk6IFByb21pc2U8bnVtYmVyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLiBUaGlzIHByb21pc2UgcmVzb2x2ZXMgdG8gbnVsbFxyXG4gICAgICogaWYgdGhlIGdvZSBjb29yZGluYXRlcyBhcmUgbm90IGluIHRoZSB2aWV3IHBvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgTG9jYXRpb25Ub1BvaW50KGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBMb2NhdGlvbnNUb1BvaW50cyhsb2NzOiBBcnJheTxJTGF0TG9uZz4pOiBQcm9taXNlPEFycmF5PElQb2ludD4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2VudGVycyB0aGUgbWFwIG9uIGEgZ2VvIGxvY2F0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW9Db29yZGluYXRlcyBhcm91bmQgd2hpY2ggdG8gY2VudGVyIHRoZSBtYXAuIFNlZSB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGNlbnRlciBvcGVyYXRpb25zIGhhcyBiZWVuIGNvbXBsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBTZXRDZW50ZXIobGF0TG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnZW5lcmljIG1hcCBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgU2V0TWFwT3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aWV3IG9wdGlvbnMgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFNldFZpZXdPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gem9vbSAtIFpvb20gbGV2ZWwgdG8gc2V0LlxyXG4gICAgICogQHJldHVybnMgLSBBIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIHpvb20gb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoZS5nLiAnY2xpY2snKVxyXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHRweWUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBTdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFRyaWdnZXJNYXBFdmVudChldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XHJcbn1cclxuIl19