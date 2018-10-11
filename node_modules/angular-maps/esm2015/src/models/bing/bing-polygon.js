/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polygon } from '../polygon';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
export class BingPolygon extends Polygon {
    /**
     * Creates an instance of BingPolygon.
     * \@memberof BingPolygon
     * @param {?} _polygon - The {\@link Microsoft.Maps.Polygon} underlying the model.
     * @param {?} _mapService Instance of the Map Service.
     * @param {?} _layer - The context layer.
     */
    constructor(_polygon, _mapService, _layer) {
        super();
        this._polygon = _polygon;
        this._mapService = _mapService;
        this._layer = _layer;
        this._map = null;
        this._isEditable = false;
        this._title = '';
        this._maxZoom = -1;
        this._minZoom = -1;
        this._showLabel = false;
        this._showTooltip = false;
        this._label = null;
        this._tooltip = null;
        this._hasToolTipReceiver = false;
        this._tooltipVisible = false;
        this._metadata = new Map();
        this._map = this._mapService.MapInstance;
        this._originalPath = this.GetPaths();
    }
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get LabelMaxZoom() { return this._maxZoom; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LabelMaxZoom(val) {
        this._maxZoom = val;
        this.ManageLabel();
    }
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get LabelMinZoom() { return this._minZoom; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LabelMinZoom(val) {
        this._minZoom = val;
        this.ManageLabel();
    }
    /**
     * Gets the polygon metadata.
     *
     * \@readonly
     * \@memberof BingPolygon
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the polygon, in this case {\@link Microsoft.Maps.Polygon}
     *
     * \@readonly
     * \@memberof BingPolygon
     * @return {?}
     */
    get NativePrimitve() { return this._polygon; }
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof BingPolygon
     * \@property
     * @return {?}
     */
    get ShowLabel() { return this._showLabel; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowLabel(val) {
        this._showLabel = val;
        this.ManageLabel();
    }
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof BingPolygon
     * \@property
     * @return {?}
     */
    get ShowTooltip() { return this._showTooltip; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowTooltip(val) {
        this._showTooltip = val;
        this.ManageTooltip();
    }
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof BingPolygon
     * \@property
     * @return {?}
     */
    get Title() { return this._title; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Title(val) {
        this._title = val;
        this.ManageLabel();
        this.ManageTooltip();
    }
    /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        const /** @type {?} */ supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polygon, eventType, (e) => {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            let /** @type {?} */ handlerId;
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', e => {
                handlerId = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', m => fn(m));
            });
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', e => {
                if (handlerId) {
                    Microsoft.Maps.Events.removeHandler(handlerId);
                }
            });
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    }
    /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    Delete() {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._label) {
            this._label.Delete();
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    }
    /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return false;
    }
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._isEditable;
    }
    /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GetPath() {
        const /** @type {?} */ p = this._polygon.getLocations();
        const /** @type {?} */ path = new Array();
        p.forEach(l => path.push({ latitude: l.latitude, longitude: l.longitude }));
        return path;
    }
    /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GetPaths() {
        const /** @type {?} */ p = this._polygon.getRings();
        const /** @type {?} */ paths = new Array();
        p.forEach(x => {
            const /** @type {?} */ path = new Array();
            x.forEach(y => path.push({ latitude: y.latitude, longitude: y.longitude }));
            paths.push(path);
        });
        return paths;
    }
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polygon.getVisible();
    }
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        //      ?forum=bingmaps
        throw (new Error('The bing maps implementation currently does not support draggable polygons.'));
    }
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        const /** @type {?} */ isChanged = this._isEditable !== editable;
        this._isEditable = editable;
        if (!isChanged) {
            return;
        }
        if (this._isEditable) {
            this._originalPath = this.GetPaths();
            this._mapService.GetDrawingTools().then(t => {
                t.edit(this._polygon);
            });
        }
        else {
            this._mapService.GetDrawingTools().then(t => {
                t.finish((editedPolygon) => {
                    if (editedPolygon !== this._polygon || !this._editingCompleteEmitter) {
                        return;
                    }
                    const /** @type {?} */ newPath = this.GetPaths();
                    const /** @type {?} */ originalPath = this._originalPath;
                    this.SetPaths(newPath);
                    // this is necessary for the new path to persist it appears.
                    this._editingCompleteEmitter({
                        Click: null,
                        Polygon: this,
                        OriginalPath: originalPath,
                        NewPath: newPath
                    });
                });
            });
        }
    }
    /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = BingConversions.TranslatePolygonOptions(options);
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
        if (typeof options.editable !== 'undefined') {
            this.SetEditable(options.editable);
        }
    }
    /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    SetPath(path) {
        const /** @type {?} */ p = new Array();
        path.forEach(x => p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
        this._originalPath = [path];
        this._polygon.setLocations(p);
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    }
    /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    SetPaths(paths) {
        if (paths == null) {
            return;
        }
        if (!Array.isArray(paths)) {
            return;
        }
        if (paths.length === 0) {
            this._polygon.setRings(new Array());
            if (this._label) {
                this._label.Delete();
                this._label = null;
            }
            return;
        }
        if (Array.isArray(paths[0])) {
            // parameter is an array or arrays
            const /** @type {?} */ p = new Array();
            (/** @type {?} */ (paths)).forEach(path => {
                const /** @type {?} */ _p = new Array();
                path.forEach(x => _p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
                p.push(_p);
            });
            this._originalPath = /** @type {?} */ (paths);
            this._polygon.setRings(p);
            if (this._label) {
                this._centroid = null;
                this.ManageLabel();
            }
        }
        else {
            // parameter is a simple array....
            this.SetPath(/** @type {?} */ (paths));
        }
    }
    /**
     * Sets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polygon.setOptions(/** @type {?} */ ({ visible: visible }));
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    }
    /**
     * Configures the label for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    ManageLabel() {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                position: BingConversions.TranslateLocation(this.Centroid)
            };
            if (o["position"] == null) {
                return;
            }
            if (this._minZoom !== -1) {
                o["minZoom"] = this._minZoom;
            }
            if (this._maxZoom !== -1) {
                o["maxZoom"] = this._maxZoom;
            }
            if (this._label == null) {
                this._label = new BingMapLabel(o);
                this._label.SetMap(this._map);
            }
            else {
                this._label.SetValues(o);
            }
            this._label.Set('hidden', !this.GetVisible());
        }
        else {
            if (this._label) {
                this._label.SetMap(null);
                this._label = null;
            }
        }
    }
    /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                align: 'left',
                offset: new Microsoft.Maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                this._tooltip = new BingMapLabel(o);
                this._tooltip.SetMap(this._map);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', (e) => {
                    this._tooltip.Set('position', e.location);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                    this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', (m) => {
                        if (this._tooltipVisible && m.location && m.primitive === this._polygon) {
                            this._tooltip.Set('position', m.location);
                        }
                    });
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                    if (this._mouseMoveListener) {
                        Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    }
}
function BingPolygon_tsickle_Closure_declarations() {
    /** @type {?} */
    BingPolygon.prototype._map;
    /** @type {?} */
    BingPolygon.prototype._isEditable;
    /** @type {?} */
    BingPolygon.prototype._title;
    /** @type {?} */
    BingPolygon.prototype._maxZoom;
    /** @type {?} */
    BingPolygon.prototype._minZoom;
    /** @type {?} */
    BingPolygon.prototype._showLabel;
    /** @type {?} */
    BingPolygon.prototype._showTooltip;
    /** @type {?} */
    BingPolygon.prototype._label;
    /** @type {?} */
    BingPolygon.prototype._tooltip;
    /** @type {?} */
    BingPolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolygon.prototype._tooltipVisible;
    /** @type {?} */
    BingPolygon.prototype._mouseOverListener;
    /** @type {?} */
    BingPolygon.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolygon.prototype._mouseOutListener;
    /** @type {?} */
    BingPolygon.prototype._metadata;
    /** @type {?} */
    BingPolygon.prototype._originalPath;
    /** @type {?} */
    BingPolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    BingPolygon.prototype._polygon;
    /** @type {?} */
    BingPolygon.prototype._mapService;
    /** @type {?} */
    BingPolygon.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBTzVDLE1BQU0sa0JBQW1CLFNBQVEsT0FBTzs7Ozs7Ozs7SUFzSHBDLFlBQ1ksVUFDRSxXQUEyQixFQUMzQixNQUE0QjtRQUV0QyxLQUFLLEVBQUUsQ0FBQztRQUpBLGFBQVEsR0FBUixRQUFRO1FBQ04sZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQXNCO29CQXBIUCxJQUFJOzJCQUNSLEtBQUs7c0JBQ1gsRUFBRTt3QkFDQSxDQUFDLENBQUM7d0JBQ0YsQ0FBQyxDQUFDOzBCQUNDLEtBQUs7NEJBQ0gsS0FBSztzQkFDTixJQUFJO3dCQUNGLElBQUk7bUNBQ0UsS0FBSzsrQkFDVCxLQUFLO3lCQUlGLElBQUksR0FBRyxFQUFlO1FBeUd4RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hDOzs7Ozs7OztRQTdGVSxZQUFZLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O1FBQzlDLFlBQVksQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7O1FBU1osWUFBWSxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxD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QkFBa0IsQ0FBQyxDQUFDO2lCQUFFO2dCQUM5RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDOUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzthQUNwQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEI7U0FDSjs7Q0FHUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdNYXBMYWJlbCB9IGZyb20gJy4vYmluZy1sYWJlbCc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEgcG9seWdvbiBtb2RlbCBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlnb24gZXh0ZW5kcyBQb2x5Z29uIGltcGxlbWVudHMgUG9seWdvbiB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2lzRWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX21heFpvb206IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbWluWm9vbTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9zaG93TGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9sYWJlbDogQmluZ01hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IEJpbmdNYXBMYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9oYXNUb29sVGlwUmVjZWl2ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tb3VzZU92ZXJMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21vdXNlTW92ZUxpc3RlbmVyOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICAgIHByaXZhdGUgX29yaWdpbmFsUGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PjtcclxuICAgIHByaXZhdGUgX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXI6IChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4Wm9vbTsgfVxyXG4gICAgcHVibGljIHNldCBMYWJlbE1heFpvb20odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tYXhab29tID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMYWJlbE1pblpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pblpvb207IH1cclxuICAgIHB1YmxpYyBzZXQgTGFiZWxNaW5ab29tKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbWluWm9vbSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbiwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29ufVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiB7IHJldHVybiB0aGlzLl9wb2x5Z29uOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBTaG93TGFiZWwoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93TGFiZWw7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rvb2x0aXAgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH1cclxuICAgIHB1YmxpYyBzZXQgVGl0bGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gY29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBfcG9seWdvbiAtIFRoZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbn0gdW5kZXJseWluZyB0aGUgbW9kZWwuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgSW5zdGFuY2Ugb2YgdGhlIE1hcCBTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9sYXllciAtIFRoZSBjb250ZXh0IGxheWVyLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3BvbHlnb246IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24sXHJcbiAgICAgICAgcHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcixcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnXTtcclxuICAgICAgICBpZiAoc3VwcG9ydGVkRXZlbnRzLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWdvbiwgZXZlbnRUeXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm4oZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnbW91c2Vtb3ZlJykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlcklkOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wb2x5Z29uLCAnbW91c2VvdmVyJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVySWQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCBtID0+IGZuKG0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlnb24sICdtb3VzZW91dCcsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXJJZCkgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcihoYW5kbGVySWQpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gaWYgKGV2ZW50VHlwZSA9PT0gJ3BhdGhjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyID0gPChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZD5mbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllcikgeyB0aGlzLl9sYXllci5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmVudGl0aWVzLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLkRlbGV0ZSgpOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHsgdGhpcy5fdG9vbHRpcC5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gQmluZyBwb2x5Z29ucyBhcmUgbm90IGRyYWdnYWJsZSBieSBkZWZhdWx0LlxyXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cclxuICAgICAgICAvLy8gICAgIDdhYWFlNzQ4LTRkNWYtNGJlNS1hN2JiLTkwNDk4ZTA4YjQxYy9ob3ctY2FuLWktbWFrZS1wb2x5Z29ucG9seWxpbmUtZHJhZ2dhYmxlLWluLWJpbmctbWFwcy04P1xyXG4gICAgICAgIC8vLyAgICAgZm9ydW09YmluZ21hcHNcclxuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEVkaXRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VkaXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSB0aGlzLl9wb2x5Z29uLmdldExvY2F0aW9ucygpO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICBwLmZvckVhY2gobCA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogbC5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBsLmxvbmdpdHVkZSB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBhdGhzKCk6IEFycmF5PEFycmF5PElMYXRMb25nPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSB0aGlzLl9wb2x5Z29uLmdldFJpbmdzKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBuZXcgQXJyYXk8QXJyYXk8SUxhdExvbmc+PigpO1xyXG4gICAgICAgIHAuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgICAgICB4LmZvckVhY2goeSA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeS5sYXRpdHVkZSwgbG9uZ2l0dWRlOiB5LmxvbmdpdHVkZSB9KSk7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb24uZ2V0VmlzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlnb24gZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvLy8gQmluZyBwb2x5Z29ucyBhcmUgbm90IGRyYWdnYWJsZSBieSBkZWZhdWx0LlxyXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cclxuICAgICAgICAvLy8gICAgIDdhYWFlNzQ4LTRkNWYtNGJlNS1hN2JiLTkwNDk4ZTA4YjQxYy9ob3ctY2FuLWktbWFrZS1wb2x5Z29ucG9seWxpbmUtZHJhZ2dhYmxlLWluLWJpbmctbWFwcy04XHJcbiAgICAgICAgLy8gICAgICA/Zm9ydW09YmluZ21hcHNcclxuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1RoZSBiaW5nIG1hcHMgaW1wbGVtZW50YXRpb24gY3VycmVudGx5IGRvZXMgbm90IHN1cHBvcnQgZHJhZ2dhYmxlIHBvbHlnb25zLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlnb24gcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0aGlzLl9pc0VkaXRhYmxlICE9PSBlZGl0YWJsZTtcclxuICAgICAgICB0aGlzLl9pc0VkaXRhYmxlID0gZWRpdGFibGU7XHJcbiAgICAgICAgaWYgKCFpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldERyYXdpbmdUb29scygpLnRoZW4odCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0LmVkaXQodGhpcy5fcG9seWdvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXREcmF3aW5nVG9vbHMoKS50aGVuKHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdC5maW5pc2goKGVkaXRlZFBvbHlnb246IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGVkUG9seWdvbiAhPT0gdGhpcy5fcG9seWdvbiB8fCAhdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5fb3JpZ2luYWxQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2V0UGF0aHMobmV3UGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciB0aGUgbmV3IHBhdGggdG8gcGVyc2lzdCBpdCBhcHBlYXJzLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljazogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9seWdvbjogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luYWxQYXRoOiBvcmlnaW5hbFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ld1BhdGg6IG5ld1BhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCAmJiB0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhb3B0aW9ucy52aXNpYmxlKTsgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWRpdGFibGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RWRpdGFibGUob3B0aW9ucy5lZGl0YWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gcC5wdXNoKG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbih4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSBbcGF0aF07XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRMb2NhdGlvbnMocCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWdvbiBwYXRoIG9yIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoc1xyXG4gICAgICogQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoKHMpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcclxuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF0aHMpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRSaW5ncyhuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IG5ldyBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+KCk7XHJcbiAgICAgICAgICAgICg8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocykuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9wOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBfcC5wdXNoKG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbih4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcclxuICAgICAgICAgICAgICAgIHAucHVzaChfcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocztcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRSaW5ncyhwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cGF0aHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlnb24gdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKDxNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnM+eyB2aXNpYmxlOiB2aXNpYmxlIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhdmlzaWJsZSk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyB0aGUgbGFiZWwgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZUxhYmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkdldFBhdGggPT0gbnVsbCB8fCB0aGlzLkdldFBhdGgoKS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl90aXRsZSAhPSBudWxsICYmIHRoaXMuX3RpdGxlICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHRoaXMuQ2VudHJvaWQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChvLnBvc2l0aW9uID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9taW5ab29tICE9PSAtMSkgeyBvLm1pblpvb20gPSB0aGlzLl9taW5ab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhab29tICE9PSAtMSkgeyBvLm1heFpvb20gPSB0aGlzLl9tYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRNYXAodGhpcy5fbWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF0aGlzLkdldFZpc2libGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBwb2x5Z29uXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcCh0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbiwgJ21vdXNlb3ZlcicsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIChtOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUgJiYgbS5sb2NhdGlvbiAmJiBtLnByaW1pdGl2ZSA9PT0gdGhpcy5fcG9seWdvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBtLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29uLCAnbW91c2VvdXQnLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoIXRoaXMuX3Nob3dUb29sdGlwIHx8IHRoaXMuX3RpdGxlID09PSAnJyB8fCB0aGlzLl90aXRsZSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlT3Zlckxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==