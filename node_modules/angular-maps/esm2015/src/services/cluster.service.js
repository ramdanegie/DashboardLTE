/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LayerService } from './layer.service';
/**
 * Abstract class to to define teh cluster layer service contract. Must be realized by implementing provider.
 *
 * @export
 * @abstract
 * @abstract
 */
export class ClusterService extends LayerService {
}
ClusterService.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVVuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBUy9DLE1BQU0scUJBQStCLFNBQVEsWUFBWTs7O1lBRHhELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQ2x1c3RlckxheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jbHVzdGVyLWxheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjbGFzcyB0byB0byBkZWZpbmUgdGVoIGNsdXN0ZXIgbGF5ZXIgc2VydmljZSBjb250cmFjdC4gTXVzdCBiZSByZWFsaXplZCBieSBpbXBsZW1lbnRpbmcgcHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDbHVzdGVyU2VydmljZSBleHRlbmRzIExheWVyU2VydmljZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0IG9mIGVudGl0aWVzXHJcbiAgICAgKiBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXHJcbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcclxuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnRDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxyXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXHJcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gQ2x1c3RlckxheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFN0b3BDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxufVxyXG4iXX0=