/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
export class BingLayer {
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * \@memberof BingLayer
     * @param {?} _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param {?} _maps MapService. MapService implementation to leverage for the layer.
     *
     */
    constructor(_layer, _maps) {
        this._layer = _layer;
        this._maps = _maps;
        this._pendingEntities = new Array();
    }
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof BingLayer
     * @return {?} Microsoft.Maps.Layer.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, (e) => {
            fn(e);
        });
    }
    /**
     * Adds an entity to the layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    AddEntity(entity) {
        if (entity && entity.NativePrimitve) {
            if (this.GetVisible()) {
                this._layer.add(entity.NativePrimitve);
            }
            else {
                this._pendingEntities.push(entity);
            }
        }
    }
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        //
        // use eachSeries as opposed to _layer.add([]) to provide a non-blocking experience for larger data sets.
        //
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            eachSeries([...entities], (e, next) => {
                if (this.GetVisible()) {
                    this._layer.add(e.NativePrimitve);
                }
                else {
                    this._pendingEntities.push(e);
                }
                nextTick(() => next());
            });
        }
    }
    /**
     * Deletes the layer.
     *
     * \@memberof BingLayer
     * @return {?}
     */
    Delete() {
        this._maps.DeleteLayer(this);
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GetOptions() {
        const /** @type {?} */ o = {
            id: Number(this._layer.getId())
        };
        return o;
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._layer.getVisible();
    }
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
     *
     * @return {?}
     */
    RemoveEntity(entity) {
        if (entity.NativePrimitve) {
            this._layer.remove(entity.NativePrimitve);
        }
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        //
        // we are using removal and add as opposed to set as for large number of objects it yields a non-blocking, smoother performance...
        //
        this._layer.setPrimitives([]);
        this.AddEntities(entities);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        this._layer.metadata.id = options.id.toString();
    }
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._layer.setVisible(visible);
        if (visible && this._pendingEntities.length > 0) {
            this.AddEntities(this._pendingEntities.splice(0));
        }
    }
}
function BingLayer_tsickle_Closure_declarations() {
    /** @type {?} */
    BingLayer.prototype._pendingEntities;
    /** @type {?} */
    BingLayer.prototype._layer;
    /** @type {?} */
    BingLayer.prototype._maps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7Ozs7O0FBZTdDLE1BQU07Ozs7Ozs7OztJQStCRixZQUFvQixNQUE0QixFQUFVLEtBQWlCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtnQ0E3QkwsSUFBSSxLQUFLLEVBQXNDO0tBNkJyQzs7Ozs7Ozs7UUFoQnJFLGNBQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7OztJQStCaEIsV0FBVyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVCxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVQSxTQUFTLENBQUMsTUFBMEM7UUFDdkQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUMxQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEM7U0FDSjs7Ozs7Ozs7Ozs7SUFXRSxXQUFXLENBQUMsUUFBbUQ7Ozs7UUFJbEUsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxVQUFVLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO2dCQUNELFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzFCLENBQUMsQ0FBQztTQUNOOzs7Ozs7OztJQVFFLE1BQU07UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVTFCLFVBQVU7UUFDYix1QkFBTSxDQUFDLEdBQWtCO1lBQ3JCLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNsQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVU4sVUFBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTdCLFlBQVksQ0FBQyxNQUEwQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDN0M7Ozs7Ozs7Ozs7O0lBV0UsV0FBVyxDQUFDLFFBQXdFOzs7O1FBSXZGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXhCLFVBQVUsQ0FBQyxPQUFzQjtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQVU3QyxVQUFVLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRDs7Q0FHUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVhY2hTZXJpZXMsIG5leHRUaWNrIH0gZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1hcCBsYXllciBmb3IgdGhlIEJpbmcgTWFwIFByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ0xheWVyIGltcGxlbWVudHMgTGF5ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX3BlbmRpbmdFbnRpdGllczogQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4gPSBuZXcgQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEJpbmdDbHVzdGVyTGF5ZXIgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllciBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIuIE5hdGl2ZSBCaW5nIENsdXN0ZXIgTGF5ZXIgc3VwcG9ydGluZyB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqIEBwYXJhbSBfbWFwcyBNYXBTZXJ2aWNlLiBNYXBTZXJ2aWNlIGltcGxlbWVudGF0aW9uIHRvIGxldmVyYWdlIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIsIHByaXZhdGUgX21hcHM6IE1hcFNlcnZpY2UpIHsgfVxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcywgTGF5ZXIgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHN0cmluZy4gVHlwZSBvZiBldmVudCB0byBhZGQgKGNsaWNrLCBtb3VzZW92ZXIsIGV0YykuIFlvdSBjYW4gdXNlIGFueSBldmVudCB0aGF0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZVxyXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX2xheWVyLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGZuKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZS4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbnRpdHkgJiYgZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkdldFZpc2libGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuYWRkKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nRW50aXRpZXMucHVzaChlbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG51bWJlciBvZiBlbnRpdGllcyB0byB0aGUgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXHJcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4uIEVudGl0aWVzIHRvIGFkZCB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZCB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB1c2UgZWFjaFNlcmllcyBhcyBvcHBvc2VkIHRvIF9sYXllci5hZGQoW10pIHRvIHByb3ZpZGUgYSBub24tYmxvY2tpbmcgZXhwZXJpZW5jZSBmb3IgbGFyZ2VyIGRhdGEgc2V0cy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIGlmIChlbnRpdGllcyAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpICYmIGVudGl0aWVzLmxlbmd0aCAhPT0gMCApIHtcclxuICAgICAgICAgICAgZWFjaFNlcmllcyhbLi4uZW50aXRpZXNdLCAoZSwgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0VmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuYWRkKGUuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ0VudGl0aWVzLnB1c2goZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiBuZXh0KCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwcy5EZWxldGVMYXllcih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgSUNsdXN0ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElMYXllck9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IElMYXllck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBOdW1iZXIodGhpcy5fbGF5ZXIuZ2V0SWQoKSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgQm9vbGVhbi4gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllci5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlbW92ZShlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4gY29udGFpbmluZyB0aGUgZW50aXRpZXMgdG8gYWRkIHRvIHRoZSBjbHVzdGVyLlxyXG4gICAgICogVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+KTogdm9pZCB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB3ZSBhcmUgdXNpbmcgcmVtb3ZhbCBhbmQgYWRkIGFzIG9wcG9zZWQgdG8gc2V0IGFzIGZvciBsYXJnZSBudW1iZXIgb2Ygb2JqZWN0cyBpdCB5aWVsZHMgYSBub24tYmxvY2tpbmcsIHNtb290aGVyIHBlcmZvcm1hbmNlLi4uXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLl9sYXllci5zZXRQcmltaXRpdmVzKFtdKTtcclxuICAgICAgICB0aGlzLkFkZEVudGl0aWVzKGVudGl0aWVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciB0aGUgY2x1c3RlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBJQ2x1c3Rlck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXHJcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElMYXllck9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9sYXllci5tZXRhZGF0YS5pZCA9IG9wdGlvbnMuaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIuc2V0VmlzaWJsZSh2aXNpYmxlKTtcclxuICAgICAgICBpZiAodmlzaWJsZSAmJiB0aGlzLl9wZW5kaW5nRW50aXRpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEVudGl0aWVzKHRoaXMuX3BlbmRpbmdFbnRpdGllcy5zcGxpY2UoMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19