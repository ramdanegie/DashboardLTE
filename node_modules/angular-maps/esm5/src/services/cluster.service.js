/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LayerService } from './layer.service';
/**
 * Abstract class to to define teh cluster layer service contract. Must be realized by implementing provider.
 *
 * @export
 * @abstract
 * @abstract
 */
var ClusterService = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterService, _super);
    function ClusterService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClusterService.decorators = [
        { type: Injectable },
    ];
    return ClusterService;
}(LayerService));
export { ClusterService };
function ClusterService_tsickle_Closure_declarations() {
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof ClusterService
     * @abstract
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    ClusterService.prototype.StartClustering = function (layer) { };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof ClusterService
     * @abstract
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    ClusterService.prototype.StopClustering = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFVbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7SUFTRiwwQ0FBWTs7Ozs7Z0JBRHhELFVBQVU7O3lCQWxCWDtFQW1CNkMsWUFBWTtTQUFuQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4vbGF5ZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgY2xhc3MgdG8gdG8gZGVmaW5lIHRlaCBjbHVzdGVyIGxheWVyIHNlcnZpY2UgY29udHJhY3QuIE11c3QgYmUgcmVhbGl6ZWQgYnkgaW1wbGVtZW50aW5nIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2x1c3RlclNlcnZpY2UgZXh0ZW5kcyBMYXllclNlcnZpY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHRoZSBpbml0aWFsIHNldCBvZiBlbnRpdGllc1xyXG4gICAgICogaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gQ2x1c3RlckxheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFN0YXJ0Q2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cclxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xyXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTdG9wQ2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbn1cclxuIl19