/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
export class GoogleLayer {
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * \@memberof GoogleLayer
     * @param {?} _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param {?} _maps MapService. MapService implementation to leverage for the layer.
     *
     * @param {?} _id
     */
    constructor(_layer, _maps, _id) {
        this._layer = _layer;
        this._maps = _maps;
        this._id = _id;
        this._entities = new Array();
        this._visible = true;
    }
    /**
     * Get the native primitive underneath the abstraction layer. Google does not have the concept of a custom layer,
     * so we are returning the Map as the native object because it hosts all the markers.
     *
     * \@memberof GoogleLayer
     * @return {?} GoogleMapTypes.GoogleMap.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
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
    AddListener(eventType, fn) {
        throw (new Error('Events are not supported on Google Layers. You can still add events to individual markers.'));
    }
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
    AddEntity(entity) {
        if (entity.NativePrimitve) {
            this._entities.push(entity);
            entity.NativePrimitve.setVisible(this._visible);
            entity.NativePrimitve.setMap(this.NativePrimitve);
        }
    }
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            this._entities.push(...entities);
            eachSeries([...entities], (e, next) => {
                e.NativePrimitve.setVisible(this._visible);
                e.NativePrimitve.setMap(this.NativePrimitve);
                nextTick(() => next());
            });
        }
    }
    /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    Delete() {
        eachSeries(this._entities.splice(0), (e, next) => {
            e.NativePrimitve.setMap(null);
            nextTick(() => next());
        });
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    GetOptions() {
        const /** @type {?} */ options = {
            id: this._id
        };
        return options;
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._visible;
    }
    /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    RemoveEntity(entity) {
        if (entity.NativePrimitve) {
            const /** @type {?} */ j = this._entities.indexOf(entity);
            if (j > -1) {
                this._entities.splice(j, 1);
            }
            entity.NativePrimitve.setMap(null);
        }
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        this.Delete();
        this.AddEntities(entities);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        this._id = options.id;
    }
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    SetVisible(visible) {
        eachSeries([...this._entities], (e, next) => {
            e.NativePrimitve.setVisible(visible);
            nextTick(() => next());
        });
        this._visible = visible;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7Ozs7O0FBaUI3QyxNQUFNOzs7Ozs7Ozs7O0lBb0NGLFlBQW9CLE1BQWdDLEVBQVUsS0FBaUIsRUFBVSxHQUFXO1FBQWhGLFdBQU0sR0FBTixNQUFNLENBQTBCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVE7eUJBL0JyQyxJQUFJLEtBQUssRUFBc0M7d0JBQ2xGLElBQUk7S0E4QnlFOzs7Ozs7Ozs7UUFoQjlGLGNBQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7OztJQStCaEIsV0FBVyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEZBQTRGLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZN0csU0FBUyxDQUFDLE1BQWdEO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDckQ7Ozs7Ozs7Ozs7O0lBV0UsV0FBVyxDQUFDLFFBQW1EO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNsQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0MsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O0lBUUUsTUFBTTtRQUNULFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM3QyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLFVBQVU7UUFDYix1QkFBTSxPQUFPLEdBQWtCO1lBQzNCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7SUFVWixVQUFVO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7SUFVbEIsWUFBWSxDQUFDLE1BQWdEO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHVCQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQzVDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDOzs7Ozs7Ozs7OztJQVdFLFdBQVcsQ0FBQyxRQUE4RTtRQUM3RixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd4QixVQUFVLENBQUMsT0FBc0I7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVW5CLFVBQVUsQ0FBQyxPQUFnQjtRQUM5QixVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN4QyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7Q0FHL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlYWNoU2VyaWVzLCBuZXh0VGljayB9IGZyb20gJ2FzeW5jJztcclxuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi9nb29nbGUtbWFya2VyJztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL2xheWVyJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbWFya2VyJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgbGF5ZXIgZm9yIHRoZSBHb29nbGUgTWFwIFByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlTGF5ZXIgaW1wbGVtZW50cyBMYXllciB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2VudGl0aWVzOiBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPiA9IG5ldyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPigpO1xyXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLiBHb29nbGUgZG9lcyBub3QgaGF2ZSB0aGUgY29uY2VwdCBvZiBhIGN1c3RvbSBsYXllcixcclxuICAgICAqIHNvIHdlIGFyZSByZXR1cm5pbmcgdGhlIE1hcCBhcyB0aGUgbmF0aXZlIG9iamVjdCBiZWNhdXNlIGl0IGhvc3RzIGFsbCB0aGUgbWFya2Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGNsYXNzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbGF5ZXIgR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyLiBOYXRpdmUgR29vZ2xlIE1hcHMgTWFya2VyIENsdXN0ZXJlciBzdXBwb3J0aW5nIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGF5ZXI6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCwgcHJpdmF0ZSBfbWFwczogTWFwU2VydmljZSwgcHJpdmF0ZSBfaWQ6IG51bWJlcikgeyB9XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXHJcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdFdmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gR29vZ2xlIExheWVycy4gWW91IGNhbiBzdGlsbCBhZGQgZXZlbnRzIHRvIGluZGl2aWR1YWwgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuIFVzZSB0aGlzIG1ldGhvZCB3aXRoIGNhdXRpb24gYXMgaXQgd2lsbFxyXG4gICAgICogdHJpZ2dlciBhIHJlY2FsdWF0aW9uIG9mIHRoZSBjbHVzdGVycyAoYW5kIGFzc29jaWF0ZWQgbWFya2VycyBpZiBhcHByb3ByaXRlKSBmb3JcclxuICAgICAqIGVhY2ggaW52b2NhdGlvbi4gSWYgeW91IHVzZSB0aGlzIG1ldGhvZCB0byBhZGQgbWFueSBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyLCB1c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMQXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyIHwgSW5mb1dpbmRvdyB8IFBvbHlnb24gfCBQb2x5bGluZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKTtcclxuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldE1hcCh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcclxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTEF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdGllcyAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpICYmIGVudGl0aWVzLmxlbmd0aCAhPT0gMCApIHtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXMucHVzaCguLi5lbnRpdGllcyk7XHJcbiAgICAgICAgICAgIGVhY2hTZXJpZXMoWy4uLmVudGl0aWVzXSwgKGUsIG5leHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKTtcclxuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4gbmV4dCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXIgYW5iZCB0aGUgbWFya2VycyBpbiBpdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICBlYWNoU2VyaWVzKHRoaXMuX2VudGl0aWVzLnNwbGljZSgwKSwgKGUsIG5leHQpID0+IHtcclxuICAgICAgICAgICAgZS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIElMYXllck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0T3B0aW9ucygpOiBJTGF5ZXJPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgQm9vbGVhbi4gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlciB8IEluZm9XaW5kb3cgfCBQb2x5Z29uIHwgUG9seWxpbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGo6IG51bWJlciA9IHRoaXMuX2VudGl0aWVzLmluZGV4T2YoZW50aXR5KTtcclxuICAgICAgICAgICAgaWYgKGogPiAtMSkgeyB0aGlzLl9lbnRpdGllcy5zcGxpY2UoaiwgMSk7IH1cclxuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+IGNvbnRhaW5pbmdcclxuICAgICAqIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4gfCBBcnJheTxJbmZvV2luZG93PiB8IEFycmF5PFBvbHlnb24+IHwgQXJyYXk8UG9seWxpbmU+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5EZWxldGUoKTtcclxuICAgICAgICB0aGlzLkFkZEVudGl0aWVzKGVudGl0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIElMYXllck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXHJcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lkID0gb3B0aW9ucy5pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgZWFjaFNlcmllcyhbLi4udGhpcy5fZW50aXRpZXNdLCAoZSwgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldFZpc2libGUodmlzaWJsZSk7XHJcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==