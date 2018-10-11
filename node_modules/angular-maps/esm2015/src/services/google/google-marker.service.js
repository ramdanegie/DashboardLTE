/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapMarkerDirective } from '../../components/map-marker';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
import { ClusterService } from '../cluster.service';
import { GoogleConversions } from './google-conversions';
/**
 * Concrete implementation of the MarkerService abstract class for Google.
 *
 * @export
 */
export class GoogleMarkerService {
    /**
     * Creates an instance of GoogleMarkerService.
     * \@memberof GoogleMarkerService
     * @param {?} _mapService - {\@link MapService} instance.
     * The concrete {\@link GoogleMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link GoogleLayerService} implementation is expected.
     * @param {?} _clusterService - {\@link ClusterService} instance.
     * The concrete {\@link GoogleClusterService} implementation is expected.
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
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     * @return {?}
     */
    AddMarker(marker) {
        const /** @type {?} */ o = {
            anchor: marker.Anchor,
            position: { latitude: marker.Latitude, longitude: marker.Longitude },
            title: marker.Title,
            label: marker.Label,
            draggable: marker.Draggable,
            icon: marker.IconUrl,
            iconInfo: marker.IconInfo,
            width: marker.Width,
            height: marker.Height,
            isFirst: marker.IsFirstInSet,
            isLast: marker.IsLastInSet
        };
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
     * \@memberof GoogleMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarkerDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     */
    CreateEventObservable(eventName, marker) {
        return Observable.create((observer) => {
            this._markers.get(marker).then((m) => {
                m.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     */
    DeleteMarker(marker) {
        const /** @type {?} */ m = this._markers.get(marker);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((ma) => {
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
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GetCoordinatesFromClick(e) {
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
    }
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     */
    GetNativeMarker(marker) {
        return this._markers.get(marker);
    }
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     */
    GetPixelsFromClick(e) {
        if (!e || !e.latLng || !e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        if (this._mapService.MapInstance == null) {
            return null;
        }
        let /** @type {?} */ crossesDateLine = false;
        const /** @type {?} */ m = this._mapService.MapInstance;
        const /** @type {?} */ p = m.getProjection();
        const /** @type {?} */ s = Math.pow(2, m.getZoom());
        const /** @type {?} */ b = m.getBounds();
        if (b.getCenter().lng() < b.getSouthWest().lng() ||
            b.getCenter().lng() > b.getNorthEast().lng()) {
            crossesDateLine = true;
        }
        const /** @type {?} */ offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
        const /** @type {?} */ offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
        const /** @type {?} */ point = p.fromLatLngToPoint(e.latLng);
        return {
            x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
            y: Math.floor((point.y - offsetY) * s)
        };
    }
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof GoogleMarkerService
     * @param {?} target - Either a {\@link MapMarkerDirective}
     * or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
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
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     */
    UpdateAnchor(marker) {
        return this._markers.get(marker).then((m) => {
            m.SetAnchor(marker.Anchor);
        });
    }
    /**
     * Updates whether the marker is draggable.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     */
    UpdateDraggable(marker) {
        return this._markers.get(marker).then((m) => m.SetDraggable(marker.Draggable));
    }
    /**
     * Updates the Icon on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     */
    UpdateIcon(marker) {
        return this._markers.get(marker).then((m) => {
            if (marker.IconInfo) {
                const /** @type {?} */ x = {
                    position: { latitude: marker.Latitude, longitude: marker.Longitude },
                    iconInfo: marker.IconInfo
                };
                const /** @type {?} */ o = GoogleConversions.TranslateMarkerOptions(x);
                m.SetIcon(o.icon);
                marker.DynamicMarkerCreated.emit(x.iconInfo);
            }
            else {
                m.SetIcon(marker.IconUrl);
            }
        });
    }
    /**
     * Updates the label on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     */
    UpdateLabel(marker) {
        return this._markers.get(marker).then((m) => { m.SetLabel(marker.Label); });
    }
    /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
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
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    UpdateTitle(marker) {
        return this._markers.get(marker).then((m) => m.SetTitle(marker.Title));
    }
    /**
     * Updates the visibility on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    UpdateVisible(marker) {
        return this._markers.get(marker).then((m) => m.SetVisible(marker.Visible));
    }
}
GoogleMarkerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMarkerService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: ClusterService },
    { type: NgZone }
];
function GoogleMarkerService_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMarkerService.prototype._markers;
    /** @type {?} */
    GoogleMarkerService.prototype._mapService;
    /** @type {?} */
    GoogleMarkerService.prototype._layerService;
    /** @type {?} */
    GoogleMarkerService.prototype._clusterService;
    /** @type {?} */
    GoogleMarkerService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBbUIsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFRekQsTUFBTTs7Ozs7Ozs7Ozs7OztJQXVCRixZQUFvQixXQUF1QixFQUMvQixlQUNBLGlCQUNBO1FBSFEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsVUFBSyxHQUFMLEtBQUs7d0JBckI0QyxJQUFJLEdBQUcsRUFBdUM7S0FzQjFHOzs7Ozs7OztJQVFNLFNBQVMsQ0FBQyxNQUEwQjtRQUN2Qyx1QkFBTSxDQUFDLEdBQW1CO1lBQ3RCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNwRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFNBQVMsRUFB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Q0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OztJQVc1RSxhQUFhLENBQUMsTUFBMEI7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7OztZQWxUMUYsVUFBVTs7OztZQVhGLFVBQVU7WUFDVixZQUFZO1lBQ1osY0FBYztZQVZGLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbWFya2VyJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4vZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgTWFya2VyU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgR29vZ2xlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXJrZXJTZXJ2aWNlIGltcGxlbWVudHMgTWFya2VyU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX21hcmtlcnM6IE1hcDxNYXBNYXJrZXJEaXJlY3RpdmUsIFByb21pc2U8TWFya2VyPj4gPSBuZXcgTWFwPE1hcE1hcmtlckRpcmVjdGl2ZSwgUHJvbWlzZTxNYXJrZXI+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFya2VyU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBHb29nbGVMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9jbHVzdGVyU2VydmljZSAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jbHVzdGVyU2VydmljZTogQ2x1c3RlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbWFya2VyLiBEZXBlbmRpbmcgb24gdGhlIG1hcmtlciBjb250ZXh0LCB0aGUgbWFya2VyIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYSBjb3JyZWNzcG9uZGluZyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZE1hcmtlcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IElNYXJrZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBhbmNob3I6IG1hcmtlci5BbmNob3IsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogbWFya2VyLkxvbmdpdHVkZSB9LFxyXG4gICAgICAgICAgICB0aXRsZTogbWFya2VyLlRpdGxlLFxyXG4gICAgICAgICAgICBsYWJlbDogbWFya2VyLkxhYmVsLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGljb246IG1hcmtlci5JY29uVXJsLFxyXG4gICAgICAgICAgICBpY29uSW5mbzogbWFya2VyLkljb25JbmZvLFxyXG4gICAgICAgICAgICB3aWR0aDogbWFya2VyLldpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG1hcmtlci5IZWlnaHQsXHJcbiAgICAgICAgICAgIGlzRmlyc3Q6IG1hcmtlci5Jc0ZpcnN0SW5TZXQsXHJcbiAgICAgICAgICAgIGlzTGFzdDogbWFya2VyLklzTGFzdEluU2V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG1hcmtlciB2aWEgcHJvbWlzZS5cclxuICAgICAgICBsZXQgbWFya2VyUHJvbWlzZTogUHJvbWlzZTxNYXJrZXI+ID0gbnVsbDtcclxuICAgICAgICBpZiAobWFya2VyLkluQ2x1c3RlckxheWVyKSB7XHJcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UgPSB0aGlzLl9jbHVzdGVyU2VydmljZS5DcmVhdGVNYXJrZXIobWFya2VyLkxheWVySWQsIG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtYXJrZXIuSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZU1hcmtlcihtYXJrZXIuTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVNYXJrZXIobyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tYXJrZXJzLnNldChtYXJrZXIsIG1hcmtlclByb21pc2UpO1xyXG4gICAgICAgIGlmIChtYXJrZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgbWFya2VyUHJvbWlzZS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpY29uSW5mbyB0byBwcm92aWRlIGhvb2sgdG8gZG8gcG9zdCBpY29uIGNyZWF0aW9uIGFjdGl2aXRpZXMgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBhbHNvIHJlLWFuY2hvciB0aGUgbWFya2VyXHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuRHluYW1pY01hcmtlckNyZWF0ZWQuZW1pdChvLmljb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHA6IElQb2ludCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiAoby5pY29uSW5mby5zaXplICYmIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKG8uaWNvbkluZm8uc2l6ZS53aWR0aCAqIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueCkgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChvLmljb25JbmZvLnNpemUgJiYgby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoby5pY29uSW5mby5zaXplLmhlaWdodCAqIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueSkgOiAwLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG0uU2V0QW5jaG9yKHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBtYXJrZXIgaGFzIGJlZW4gZGVsZXRlZC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobWE6IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFya2VyLkluQ2x1c3RlckxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFya2VyLkluQ3VzdG9tTGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWEuRGVsZXRlTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLmRlbGV0ZShtYXJrZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAoIWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcubGF0IHx8ICFlLmxhdExuZy5sbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiBlLmxhdExuZy5sYXQoKSwgbG9uZ2l0dWRlOiBlLmxhdExuZy5sbmcoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIG1vZGVsIGZvciB0aGUgbWFya2VyIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmtlciAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBtYXJrZXIgbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TmF0aXZlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTxNYXJrZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIG1hcmtlciBwaXhlbCBsb2NhdGlvbiBmb3IgdGhlIG1hcmtlciBvbiB0aGUgY2xpY2sgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBwaXhlbHMgb2YgdGhlIG1hcmtlciBvbiB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQaXhlbHNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElQb2ludCB7XHJcbiAgICAgICAgaWYgKCFlIHx8ICFlLmxhdExuZyB8fCAhZS5sYXRMbmcubGF0IHx8ICFlLmxhdExuZy5sbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3Jvc3Nlc0RhdGVMaW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2U7XHJcbiAgICAgICAgY29uc3QgcCA9IG0uZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGgucG93KDIsIG0uZ2V0Wm9vbSgpKTtcclxuICAgICAgICBjb25zdCBiOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHMgPSBtLmdldEJvdW5kcygpO1xyXG4gICAgICAgIGlmIChiLmdldENlbnRlcigpLmxuZygpIDwgYi5nZXRTb3V0aFdlc3QoKS5sbmcoKSAgfHxcclxuICAgICAgICAgICAgYi5nZXRDZW50ZXIoKS5sbmcoKSA+IGIuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpIHsgY3Jvc3Nlc0RhdGVMaW5lID0gdHJ1ZTsgfVxyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXRZOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0Tm9ydGhFYXN0KCkpLnk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0WDogbnVtYmVyID0gcC5mcm9tTGF0TG5nVG9Qb2ludChiLmdldFNvdXRoV2VzdCgpKS54O1xyXG4gICAgICAgIGNvbnN0IHBvaW50OiBHb29nbGVNYXBUeXBlcy5Qb2ludCA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoZS5sYXRMbmcpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoKHBvaW50LnggLSBvZmZzZXRYICsgKChjcm9zc2VzRGF0ZUxpbmUgJiYgcG9pbnQueCA8IG9mZnNldFgpID8gMjU2IDogMCkpICogcyksXHJcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoKHBvaW50LnkgLSBvZmZzZXRZKSAqIHMpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhcmdldCAtIEVpdGhlciBhIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9XHJcbiAgICAgKiBvciBhIHtAbGluayBJTGF0TG9uZ30gZm9yIHRoZSBiYXNpcyBvZiB0cmFuc2xhdGlvbi5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIGEge0BsaW5rIElQb2ludH1cclxuICAgICAqIHdpdGggdGhlIHBpeGVsIGNvb3JkaW5hdGVzIG9mIHRoZSBNYXBNYXJrZXIgb3IgSUxhdExvbmcgcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BvaW50KHRhcmdldDogTWFwTWFya2VyRGlyZWN0aXZlIHwgSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwTWFya2VyRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldCh0YXJnZXQpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSBtLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogUHJvbWlzZTxJUG9pbnQ+ID0gdGhpcy5fbWFwU2VydmljZS5Mb2NhdGlvblRvUG9pbnQobCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uVG9Qb2ludCh0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYW5jaG9yIHBvc2l0aW9uIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBhbmNob3IuXHJcbiAgICAgKiBBbmNob3IgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgYW5jaG9yIHBvc2l0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlQW5jaG9yKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIG0uU2V0QW5jaG9yKG1hcmtlci5BbmNob3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIGRyYWdhYmlsaXR5LlxyXG4gICAgICogRHJhZ2FiaWxpdHkgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbWFya2VyIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlRHJhZ2dhYmxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLlNldERyYWdnYWJsZShtYXJrZXIuRHJhZ2dhYmxlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBJY29uIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGljb24uIEljb24gaW5mb3JtYXRpb24gaXMgcHJlc2VudFxyXG4gICAgICogaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGljb24gaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVJY29uKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXIuSWNvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IElNYXJrZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7IGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogbWFya2VyLkxvbmdpdHVkZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25JbmZvOiBtYXJrZXIuSWNvbkluZm9cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyh4KTtcclxuICAgICAgICAgICAgICAgIG0uU2V0SWNvbihvLmljb24pO1xyXG4gICAgICAgICAgICAgICAgbWFya2VyLkR5bmFtaWNNYXJrZXJDcmVhdGVkLmVtaXQoeC5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtLlNldEljb24obWFya2VyLkljb25VcmwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbGFiZWwgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgbGFiZWwuXHJcbiAgICAgKiBMYWJlbCBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYWJlbCBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZUxhYmVsKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7IG0uU2V0TGFiZWwobWFya2VyLkxhYmVsKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGNvb3JkaW5hdGVzLlxyXG4gICAgICogQ29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZU1hcmtlclBvc2l0aW9uKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihcclxuICAgICAgICAgICAgKG06IE1hcmtlcikgPT4gbS5TZXRQb3NpdGlvbih7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogbWFya2VyLkxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBtYXJrZXIuTG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpdGxlIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHRpdGxlLlxyXG4gICAgICogVGl0bGUgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgdGl0bGUgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVUaXRsZShtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5TZXRUaXRsZShtYXJrZXIuVGl0bGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZpc2liaWxpdHkgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgdGl0bGUuXHJcbiAgICAgKiBUaXRsZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSB0aXRsZSBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZVZpc2libGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0VmlzaWJsZShtYXJrZXIuVmlzaWJsZSkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=