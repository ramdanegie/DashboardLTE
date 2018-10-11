/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapMarkerDirective } from '../../components/map-marker';
import { MapService } from '../../services/map.service';
import { LayerService } from '../../services/layer.service';
import { ClusterService } from '../../services/cluster.service';
import { Marker } from '../../models/marker';
import { BingConversions } from './bing-conversions';
/**
 * Concrete implementation of the MarkerService abstract class for Bing Maps V8.
 *
 * @export
 */
export class BingMarkerService {
    /**
     * Creates an instance of BingMarkerService.
     * \@memberof BingMarkerService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link BingMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link BingLayerService} implementation is expected.
     * @param {?} _clusterService - {\@link ClusterService} instance.
     * The concrete {\@link BingClusterService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _clusterService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._zone = _zone;
        this._markers = new Map();
    }
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     *
     * @return {?}
     */
    AddMarker(marker) {
        const /** @type {?} */ o = {
            position: { latitude: marker.Latitude, longitude: marker.Longitude },
            title: marker.Title,
            label: marker.Label,
            draggable: marker.Draggable,
            icon: marker.IconUrl,
            iconInfo: marker.IconInfo,
            isFirst: marker.IsFirstInSet,
            isLast: marker.IsLastInSet
        };
        if (marker.Width) {
            o.width = marker.Width;
        }
        if (marker.Height) {
            o.height = marker.Height;
        }
        if (marker.Anchor) {
            o.anchor = marker.Anchor;
        }
        if (marker.Metadata) {
            o.metadata = marker.Metadata;
        }
        // create marker via promise.
        let /** @type {?} */ markerPromise = null;
        if (marker.InClusterLayer) {
            markerPromise = this._clusterService.CreateMarker(marker.LayerId, o);
        }
        else if (marker.InCustomLayer) {
            markerPromise = this._layerService.CreateMarker(marker.LayerId, o);
        }
        else {
            markerPromise = this._mapService.CreateMarker(o);
        }
        this._markers.set(marker, markerPromise);
        if (marker.IconInfo) {
            markerPromise.then((m) => {
                // update iconInfo to provide hook to do post icon creation activities and
                // also re-anchor the marker
                marker.DynamicMarkerCreated.emit(o.iconInfo);
                const /** @type {?} */ p = {
                    x: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.width * o.iconInfo.markerOffsetRatio.x) : 0,
                    y: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.height * o.iconInfo.markerOffsetRatio.y) : 0,
                };
                m.SetAnchor(p);
            });
        }
    }
    /**
     * Registers an event delegate for a marker.
     *
     * \@memberof BingMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarker} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, marker) {
        const /** @type {?} */ b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create((observer) => {
            this._markers.get(marker).then((m) => {
                m.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - {\@link MapMarker} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     *
     */
    DeleteMarker(marker) {
        const /** @type {?} */ m = this._markers.get(marker);
        let /** @type {?} */ p = Promise.resolve();
        if (m != null) {
            p = m.then((ma) => {
                if (marker.InClusterLayer) {
                    this._clusterService.GetNativeLayer(marker.LayerId).then(l => { l.RemoveEntity(ma); });
                }
                if (marker.InCustomLayer) {
                    this._layerService.GetNativeLayer(marker.LayerId).then(l => { l.RemoveEntity(ma); });
                }
                return this._zone.run(() => {
                    ma.DeleteMarker();
                    this._markers.delete(marker);
                });
            });
        }
        return p;
    }
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.primitive) {
            return null;
        }
        if (!(e.primitive instanceof Microsoft.Maps.Pushpin)) {
            return null;
        }
        const /** @type {?} */ p = e.primitive;
        const /** @type {?} */ loc = p.getLocation();
        return { latitude: loc.latitude, longitude: loc.longitude };
    }
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarker} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     *
     */
    GetNativeMarker(marker) {
        return this._markers.get(marker);
    }
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     */
    GetPixelsFromClick(e) {
        const /** @type {?} */ loc = this.GetCoordinatesFromClick(e);
        if (loc == null) {
            return null;
        }
        const /** @type {?} */ l = BingConversions.TranslateLocation(loc);
        const /** @type {?} */ p = /** @type {?} */ ((/** @type {?} */ (this._mapService)).MapInstance.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
        if (p == null) {
            return null;
        }
        return { x: p.x, y: p.y };
    }
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof BingMarkerService
     * @param {?} target - Either a {\@link MapMarker} or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
     *
     */
    LocationToPoint(target) {
        if (target == null) {
            return Promise.resolve(null);
        }
        if (target instanceof MapMarkerDirective) {
            return this._markers.get(target).then((m) => {
                const /** @type {?} */ l = m.Location;
                const /** @type {?} */ p = this._mapService.LocationToPoint(l);
                return p;
            });
        }
        return this._mapService.LocationToPoint(target);
    }
    /**
     * Updates the anchor position for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     *
     */
    UpdateAnchor(marker) {
        return this._markers.get(marker).then((m) => {
            m.SetAnchor(marker.Anchor);
        });
    }
    /**
     * Updates whether the marker is draggable.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     *
     */
    UpdateDraggable(marker) {
        return this._markers.get(marker).then((m) => m.SetDraggable(marker.Draggable));
    }
    /**
     * Updates the Icon on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     *
     */
    UpdateIcon(marker) {
        const /** @type {?} */ payload = (m, icon, iconInfo) => {
            if (icon && icon !== '') {
                m.SetIcon(icon);
                marker.DynamicMarkerCreated.emit(iconInfo);
            }
        };
        return this._markers.get(marker).then((m) => {
            if (marker.IconInfo) {
                const /** @type {?} */ s = Marker.CreateMarker(marker.IconInfo);
                if (typeof (s) === 'string') {
                    return (payload(m, s, marker.IconInfo));
                }
                else {
                    return s.then(x => {
                        return (payload(m, x.icon, x.iconInfo));
                    });
                }
            }
            else {
                return (m.SetIcon(marker.IconUrl));
            }
        });
    }
    /**
     * Updates the label on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     *
     */
    UpdateLabel(marker) {
        return this._markers.get(marker).then((m) => { m.SetLabel(marker.Label); });
    }
    /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     *
     */
    UpdateMarkerPosition(marker) {
        return this._markers.get(marker).then((m) => m.SetPosition({
            latitude: marker.Latitude,
            longitude: marker.Longitude
        }));
    }
    /**
     * Updates the title on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     *
     */
    UpdateTitle(marker) {
        return this._markers.get(marker).then((m) => m.SetTitle(marker.Title));
    }
    /**
     * Updates the visibility on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the visibility has been updated.
     *
     */
    UpdateVisible(marker) {
        return this._markers.get(marker).then((m) => m.SetVisible(marker.Visible));
    }
}
BingMarkerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMarkerService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: ClusterService },
    { type: NgZone }
];
function BingMarkerService_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMarkerService.prototype._markers;
    /** @type {?} */
    BingMarkerService.prototype._mapService;
    /** @type {?} */
    BingMarkerService.prototype._layerService;
    /** @type {?} */
    BingMarkerService.prototype._clusterService;
    /** @type {?} */
    BingMarkerService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBS3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQVFyRCxNQUFNOzs7Ozs7Ozs7Ozs7SUFzQkYsWUFBb0IsV0FBdUIsRUFDdkIsZUFDQSxpQkFDQTtRQUhBLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYTtRQUNiLG9CQUFlLEdBQWYsZUFBZTtRQUNmLFVBQUssR0FBTCxLQUFLO3dCQXBCb0MsSUFBSSxHQUFHLEVBQXVDO0tBcUIxRzs7Ozs7Ozs7O0lBYU0sU0FBUyxDQUFDLE1BQTBCO1FBQ3ZDLHVCQUFNLENBQUMsR0FBbUI7WUFDdEIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDcEUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZ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QUEwQjtRQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNqQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1NBQzlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBWUwsV0FBVyxDQUFDLE1BQTBCO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFZNUUsYUFBYSxDQUFDLE1BQTBCO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7WUE1VTFGLFVBQVU7Ozs7WUFaRixVQUFVO1lBQ1YsWUFBWTtZQUNaLGNBQWM7WUFWRixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1tYXJrZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXJrZXJTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBCaW5nIE1hcHMgVjguXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdNYXJrZXJTZXJ2aWNlIGltcGxlbWVudHMgTWFya2VyU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX21hcmtlcnM6IE1hcDxNYXBNYXJrZXJEaXJlY3RpdmUsIFByb21pc2U8TWFya2VyPj4gPSBuZXcgTWFwPE1hcE1hcmtlckRpcmVjdGl2ZSwgUHJvbWlzZTxNYXJrZXI+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ01hcmtlclNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgQmluZ0xheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX2NsdXN0ZXJTZXJ2aWNlIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgQmluZ0NsdXN0ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2NsdXN0ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZW1iZXJzIGFuZCBNYXJrZXJTZXJ2aWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBtYXJrZXIuIERlcGVuZGluZyBvbiB0aGUgbWFya2VyIGNvbnRleHQsIHRoZSBtYXJrZXIgd2lsbCBlaXRoZXIgYnkgYWRkZWQgdG8gdGhlIG1hcCBvciBhIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gdG8gYmUgYWRkZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBJTWFya2VyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgbGF0aXR1ZGU6IG1hcmtlci5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBtYXJrZXIuTG9uZ2l0dWRlIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBtYXJrZXIuVGl0bGUsXHJcbiAgICAgICAgICAgIGxhYmVsOiBtYXJrZXIuTGFiZWwsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogbWFya2VyLkRyYWdnYWJsZSxcclxuICAgICAgICAgICAgaWNvbjogbWFya2VyLkljb25VcmwsXHJcbiAgICAgICAgICAgIGljb25JbmZvOiBtYXJrZXIuSWNvbkluZm8sXHJcbiAgICAgICAgICAgIGlzRmlyc3Q6IG1hcmtlci5Jc0ZpcnN0SW5TZXQsXHJcbiAgICAgICAgICAgIGlzTGFzdDogbWFya2VyLklzTGFzdEluU2V0XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobWFya2VyLldpZHRoKSB7IG8ud2lkdGggPSBtYXJrZXIuV2lkdGg7IH1cclxuICAgICAgICBpZiAobWFya2VyLkhlaWdodCkgeyBvLmhlaWdodCA9IG1hcmtlci5IZWlnaHQ7IH1cclxuICAgICAgICBpZiAobWFya2VyLkFuY2hvcikgeyBvLmFuY2hvciA9IG1hcmtlci5BbmNob3I7IH1cclxuICAgICAgICBpZiAobWFya2VyLk1ldGFkYXRhKSB7IG8ubWV0YWRhdGEgPSBtYXJrZXIuTWV0YWRhdGE7IH1cclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG1hcmtlciB2aWEgcHJvbWlzZS5cclxuICAgICAgICBsZXQgbWFya2VyUHJvbWlzZTogUHJvbWlzZTxNYXJrZXI+ID0gbnVsbDtcclxuICAgICAgICBpZiAobWFya2VyLkluQ2x1c3RlckxheWVyKSB7XHJcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UgPSB0aGlzLl9jbHVzdGVyU2VydmljZS5DcmVhdGVNYXJrZXIobWFya2VyLkxheWVySWQsIG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtYXJrZXIuSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZU1hcmtlcihtYXJrZXIuTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVNYXJrZXIobyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tYXJrZXJzLnNldChtYXJrZXIsIG1hcmtlclByb21pc2UpO1xyXG4gICAgICAgIGlmIChtYXJrZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgbWFya2VyUHJvbWlzZS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpY29uSW5mbyB0byBwcm92aWRlIGhvb2sgdG8gZG8gcG9zdCBpY29uIGNyZWF0aW9uIGFjdGl2aXRpZXMgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBhbHNvIHJlLWFuY2hvciB0aGUgbWFya2VyXHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuRHluYW1pY01hcmtlckNyZWF0ZWQuZW1pdChvLmljb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHA6IElQb2ludCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiAoby5pY29uSW5mby5zaXplICYmIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKG8uaWNvbkluZm8uc2l6ZS53aWR0aCAqIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueCkgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChvLmljb25JbmZvLnNpemUgJiYgby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoby5pY29uSW5mby5zaXplLmhlaWdodCAqIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueSkgOiAwLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG0uU2V0QW5jaG9yKHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlcn0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYjogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ21vdXNlbW92ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdyaWdodGNsaWNrJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy8vIG1vdXNlbW92ZSBhbmQgcmlnaHRjbGljayBhcmUgbm90IHN1cHBvcnRlZCBieSBiaW5nIHBvbHlnb25zLlxyXG4gICAgICAgIC8vL1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIG0uQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0ge0BsaW5rIE1hcE1hcmtlcn0gdG8gYmUgZGVsZXRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFya2VyIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcclxuICAgICAgICBsZXQgcDogUHJvbWlzZTx2b2lkPiA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcCA9IG0udGhlbigobWE6IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci5JbkNsdXN0ZXJMYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKG1hcmtlci5MYXllcklkKS50aGVuKGwgPT4geyBsLlJlbW92ZUVudGl0eShtYSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci5JbkN1c3RvbUxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKG1hcmtlci5MYXllcklkKS50aGVuKGwgPT4geyBsLlJlbW92ZUVudGl0eShtYSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYS5EZWxldGVNYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLmRlbGV0ZShtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICghZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlLnByaW1pdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoZS5wcmltaXRpdmUgaW5zdGFuY2VvZiBNaWNyb3NvZnQuTWFwcy5QdXNocGluKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IGUucHJpbWl0aXZlO1xyXG4gICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBwLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGxvYy5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBsb2MubG9uZ2l0dWRlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgbW9kZWwgZm9yIHRoZSBtYXJrZXIgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJ9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIG1hcmtlciBtb2RlbC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTWFya2VyfSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE5hdGl2ZU1hcmtlcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8TWFya2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgcGl4ZWwgbG9jYXRpb24gZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgcGl4ZWxzIG9mIHRoZSBtYXJrZXIgb24gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQaXhlbHNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElQb2ludCB7XHJcbiAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZSk7XHJcbiAgICAgICAgaWYgKGxvYyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsb2MpO1xyXG4gICAgICAgIGNvbnN0IHA6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID0gPE1pY3Jvc29mdC5NYXBzLlBvaW50Pig8QmluZ01hcFNlcnZpY2U+XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UpLk1hcEluc3RhbmNlLnRyeUxvY2F0aW9uVG9QaXhlbChsLCBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcclxuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgcmV0dXJuIHsgeDogcC54LCB5OiBwLnkgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhcmdldCAtIEVpdGhlciBhIHtAbGluayBNYXBNYXJrZXJ9IG9yIGEge0BsaW5rIElMYXRMb25nfSBmb3IgdGhlIGJhc2lzIG9mIHRyYW5zbGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYSB7QGxpbmsgSVBvaW50fVxyXG4gICAgICogd2l0aCB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMgb2YgdGhlIE1hcE1hcmtlciBvciBJTGF0TG9uZyByZWxhdGl2ZSB0byB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uVG9Qb2ludCh0YXJnZXQ6IE1hcE1hcmtlckRpcmVjdGl2ZSB8IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcE1hcmtlckRpcmVjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQodGFyZ2V0KS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGw6IElMYXRMb25nID0gbS5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHA6IFByb21pc2U8SVBvaW50PiA9IHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwU2VydmljZS5Mb2NhdGlvblRvUG9pbnQodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGFuY2hvciBwb3NpdGlvbiBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlcn0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgYW5jaG9yLlxyXG4gICAgICogQW5jaG9yIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGFuY2hvciBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlQW5jaG9yKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIG0uU2V0QW5jaG9yKG1hcmtlci5BbmNob3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIGRyYWdhYmlsaXR5LlxyXG4gICAgICogRHJhZ2FiaWxpdHkgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbWFya2VyIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVEcmFnZ2FibGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0RHJhZ2dhYmxlKG1hcmtlci5EcmFnZ2FibGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIEljb24gb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlcn0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgaWNvbi5cclxuICAgICAqIEljb24gaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaWNvbiBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlSWNvbihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAobTogTWFya2VyLCBpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHtcclxuICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIG0uU2V0SWNvbihpY29uKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5EeW5hbWljTWFya2VyQ3JlYXRlZC5lbWl0KGljb25JbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG1hcmtlci5JY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyByZXR1cm4ocGF5bG9hZChtLCBzLCBtYXJrZXIuSWNvbkluZm8pKTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuKHBheWxvYWQobSwgeC5pY29uLCB4Lmljb25JbmZvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4obS5TZXRJY29uKG1hcmtlci5JY29uVXJsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxhYmVsIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGxhYmVsLlxyXG4gICAgICogTGFiZWwgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGFiZWwgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZUxhYmVsKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7IG0uU2V0TGFiZWwobWFya2VyLkxhYmVsKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGNvb3JkaW5hdGVzLlxyXG4gICAgICogQ29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlTWFya2VyUG9zaXRpb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKFxyXG4gICAgICAgICAgICAobTogTWFya2VyKSA9PiBtLlNldFBvc2l0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IG1hcmtlci5Mb25naXR1ZGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGl0bGUgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgdGl0bGUuXHJcbiAgICAgKiBUaXRsZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSB0aXRsZSBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlVGl0bGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0VGl0bGUobWFya2VyLlRpdGxlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2aXNpYmlsaXR5IG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHZpc2libGl0eS5cclxuICAgICAqIFZpc2liaWxpdHkgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgdmlzaWJpbGl0eSBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlVmlzaWJsZShtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5TZXRWaXNpYmxlKG1hcmtlci5WaXNpYmxlKSk7XHJcbiAgICB9XHJcbn1cclxuIl19