/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
import { Polygon } from '../polygon';
import { GoogleMapLabel } from './google-label';
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export class GooglePolygon extends Polygon {
    /**
     * Creates an instance of GooglePolygon.
     * \@memberof GooglePolygon
     * @param {?} _polygon - The {\@link GoogleMapTypes.Polygon} underlying the model.
     *
     */
    constructor(_polygon) {
        super();
        this._polygon = _polygon;
        this._title = '';
        this._showLabel = false;
        this._showTooltip = false;
        this._maxZoom = -1;
        this._minZoom = -1;
        this._label = null;
        this._tooltip = null;
        this._tooltipVisible = false;
        this._hasToolTipReceiver = false;
        this._mouseOverListener = null;
        this._mouseOutListener = null;
        this._mouseMoveListener = null;
        this._metadata = new Map();
        this._editingCompleteEmitter = null;
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
     * \@memberof GoolePolygon
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the polygon, in this case {\@link GoogleMapTypes.Polygon}
     *
     * \@readonly
     * \@memberof GooglePolygon
     * @return {?}
     */
    get NativePrimitve() { return this._polygon; }
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof GooglePolygon
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
     * \@memberof GooglePolygon
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
     * \@memberof GooglePolygon
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
     * \@memberof GooglePolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        const /** @type {?} */ supportedEvents = [
            'click',
            'dblclick',
            'drag', 'dragend',
            'dragstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'rightclick'
        ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            this._polygon.addListener(eventType, fn);
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    }
    /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    Delete() {
        this._polygon.setMap(null);
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
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return this._polygon.getDraggable();
    }
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._polygon.getEditable();
    }
    /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GetPath() {
        const /** @type {?} */ p = this._polygon.getPath();
        const /** @type {?} */ path = new Array();
        p.forEach(x => path.push({ latitude: x.lat(), longitude: x.lng() }));
        return path;
    }
    /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GetPaths() {
        const /** @type {?} */ p = this._polygon.getPaths();
        const /** @type {?} */ paths = new Array();
        p.forEach(x => {
            const /** @type {?} */ path = new Array();
            x.forEach(y => path.push({ latitude: y.lat(), longitude: y.lng() }));
            paths.push(path);
        });
        return paths;
    }
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polygon.getVisible();
    }
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        this._polygon.setDraggable(draggable);
    }
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        const /** @type {?} */ previous = this._polygon.getEditable();
        this._polygon.setEditable(editable);
        if (previous && !editable && this._editingCompleteEmitter) {
            this._editingCompleteEmitter({
                Click: null,
                Polygon: this,
                OriginalPath: this._originalPath,
                NewPath: this.GetPaths()
            });
            this._originalPath = this.GetPaths();
        }
    }
    /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        const /** @type {?} */ o = GoogleConversions.TranslatePolygonOptions(options);
        if (typeof o.editable !== 'undefined') {
            this.SetEditable(o.editable);
            delete o.editable;
        }
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
    }
    /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    SetPath(path) {
        const /** @type {?} */ p = new Array();
        path.forEach(x => p.push(new google.maps.LatLng(x.latitude, x.longitude)));
        this._polygon.setPath(p);
        this._originalPath = [path];
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    }
    /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
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
            this._polygon.setPaths(new Array());
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
                path.forEach(x => _p.push(new google.maps.LatLng(x.latitude, x.longitude)));
                p.push(_p);
            });
            this._polygon.setPaths(p);
            this._originalPath = /** @type {?} */ (paths);
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
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polygon.setVisible(visible);
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    }
    /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    ManageLabel() {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                position: GoogleConversions.TranslateLocationObject(this.Centroid)
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
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                this._label = new GoogleMapLabel(o);
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
     * \@memberof GooglePolygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const /** @type {?} */ o = {
                text: this._title,
                align: 'left',
                offset: new google.maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = 100000;
                this._tooltip = new GoogleMapLabel(o);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', (e) => {
                    this._tooltip.Set('position', e.latLng);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('position', e.latLng);
                    }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    google.maps.event.removeListener(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    google.maps.event.removeListener(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    google.maps.event.removeListener(this._mouseMoveListener);
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
function GooglePolygon_tsickle_Closure_declarations() {
    /** @type {?} */
    GooglePolygon.prototype._title;
    /** @type {?} */
    GooglePolygon.prototype._showLabel;
    /** @type {?} */
    GooglePolygon.prototype._showTooltip;
    /** @type {?} */
    GooglePolygon.prototype._maxZoom;
    /** @type {?} */
    GooglePolygon.prototype._minZoom;
    /** @type {?} */
    GooglePolygon.prototype._label;
    /** @type {?} */
    GooglePolygon.prototype._tooltip;
    /** @type {?} */
    GooglePolygon.prototype._tooltipVisible;
    /** @type {?} */
    GooglePolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    GooglePolygon.prototype._originalPath;
    /** @type {?} */
    GooglePolygon.prototype._mouseOverListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseOutListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseMoveListener;
    /** @type {?} */
    GooglePolygon.prototype._metadata;
    /** @type {?} */
    GooglePolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    GooglePolygon.prototype._polygon;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVVoRCxNQUFNLG9CQUFxQixTQUFRLE9BQU87Ozs7Ozs7SUFnSHRDLFlBQW9CLFFBQWdDO1FBQ2hELEtBQUssRUFBRSxDQUFDO1FBRFEsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7c0JBOUczQixFQUFFOzBCQUNHLEtBQUs7NEJBQ0gsS0FBSzt3QkFDVixDQUFDLENBQUM7d0JBQ0YsQ0FBQyxDQUFDO3NCQUNJLElBQUk7d0JBQ0YsSUFBSTsrQkFDSixLQUFLO21DQUNELEtBQUs7a0NBRW1CLElBQUk7aUNBQ0wsSUFBSTtrQ0FDSCxJQUFJO3lCQUM3QixJQUFJLEdBQUcsRUFBZTt1Q0FDTSxJQUFJO1FBa0dsRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN4Qzs7Ozs7Ozs7UUF2RlUsWUFBWSxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztRQUM5QyxZQUFZLENBQUMsR0FBVztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7OztRQVNaLFlBQVksS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDOUMsWUFBWSxDQUFDLEdBQVc7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcs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QUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7Ozs7Ozs7Ozs7O0lBV0UsUUFBUSxDQUFDLEtBQStDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssRUFBeUIsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsTUFBTSxDQUFDO1NBQ1Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFMUIsdUJBQU0sQ0FBQyxHQUF3QyxJQUFJLEtBQUssRUFBZ0MsQ0FBQztZQUN6RixtQkFBeUIsS0FBSyxFQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQyx1QkFBTSxFQUFFLEdBQWlDLElBQUksS0FBSyxFQUF5QixDQUFDO2dCQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FB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SSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUFFO2dCQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzNGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O0NBR1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbkV2ZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1ldmVudCc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9wb2x5Z29uJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwTGFiZWwgfSBmcm9tICcuL2dvb2dsZS1sYWJlbCc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIGZvciBhIHBvbHlnb24gbW9kZWwgZm9yIEdvb2dsZSBNYXBzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlUG9seWdvbiBleHRlbmRzIFBvbHlnb24gaW1wbGVtZW50cyBQb2x5Z29uIHtcclxuXHJcbiAgICBwcml2YXRlIF90aXRsZTogc3RyaW5nID0gJyc7XHJcbiAgICBwcml2YXRlIF9zaG93TGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3Nob3dUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tYXhab29tOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX21pblpvb206IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbGFiZWw6IEdvb2dsZU1hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IEdvb2dsZU1hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9oYXNUb29sVGlwUmVjZWl2ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX29yaWdpbmFsUGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PjtcclxuICAgIHByaXZhdGUgX21vdXNlT3Zlckxpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tb3VzZU91dExpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tb3VzZU1vdmVMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gICAgcHJpdmF0ZSBfZWRpdGluZ0NvbXBsZXRlRW1pdHRlcjogKGV2ZW50OiBJUG9seWdvbkV2ZW50KSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtYXhpbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4Wm9vbTsgfVxyXG4gICAgcHVibGljIHNldCBMYWJlbE1heFpvb20odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tYXhab29tID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMYWJlbE1pblpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pblpvb207IH1cclxuICAgIHB1YmxpYyBzZXQgTGFiZWxNaW5ab29tKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbWluWm9vbSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIG1ldGFkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdGhpcy5fbWV0YWRhdGE7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIHBvbHlnb24sIGluIHRoaXMgY2FzZSB7QGxpbmsgR29vZ2xlTWFwVHlwZXMuUG9seWdvbn1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuUG9seWdvbiB7IHJldHVybiB0aGlzLl9wb2x5Z29uOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbDsgfVxyXG4gICAgcHVibGljIHNldCBTaG93TGFiZWwodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd0xhYmVsID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBTaG93VG9vbHRpcCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dUb29sdGlwOyB9XHJcbiAgICBwdWJsaWMgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dUb29sdGlwID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlVG9vbHRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aXRsZSBvZmYgdGhlIHBvbHlnb25cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH1cclxuICAgIHB1YmxpYyBzZXQgVGl0bGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gY29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVQb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIF9wb2x5Z29uIC0gVGhlIHtAbGluayBHb29nbGVNYXBUeXBlcy5Qb2x5Z29ufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5Z29uOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkRXZlbnRzID0gW1xyXG4gICAgICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgICAgICAnZGJsY2xpY2snLFxyXG4gICAgICAgICAgICAnZHJhZycsICdkcmFnZW5kJyxcclxuICAgICAgICAgICAgJ2RyYWdzdGFydCcsXHJcbiAgICAgICAgICAgICdtb3VzZWRvd24nLFxyXG4gICAgICAgICAgICAnbW91c2Vtb3ZlJyxcclxuICAgICAgICAgICAgJ21vdXNlb3V0JyxcclxuICAgICAgICAgICAgJ21vdXNlb3ZlcicsXHJcbiAgICAgICAgICAgICdtb3VzZXVwJyxcclxuICAgICAgICAgICAgJ3JpZ2h0Y2xpY2snXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAoc3VwcG9ydGVkRXZlbnRzLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5hZGRMaXN0ZW5lcihldmVudFR5cGUsIGZuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3BhdGhjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyID0gPChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZD5mbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLkRlbGV0ZSgpOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHsgdGhpcy5fdG9vbHRpcC5EZWxldGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldERyYWdnYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIHBhdGggY2FuIGJlIGVkaXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRFZGl0YWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbi5nZXRFZGl0YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSB0aGlzLl9wb2x5Z29uLmdldFBhdGgoKTtcclxuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XHJcbiAgICAgICAgcC5mb3JFYWNoKHggPT4gcGF0aC5wdXNoKHsgbGF0aXR1ZGU6IHgubGF0KCksIGxvbmdpdHVkZTogeC5sbmcoKSB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UGF0aHMoKTogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSB0aGlzLl9wb2x5Z29uLmdldFBhdGhzKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBuZXcgQXJyYXk8QXJyYXk8SUxhdExvbmc+PigpO1xyXG4gICAgICAgIHAuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgICAgICB4LmZvckVhY2goeSA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeS5sYXQoKSwgbG9uZ2l0dWRlOiB5LmxuZygpIH0pKTtcclxuICAgICAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGF0aHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldFZpc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYWtlIHRoZSBwb2x5Z29uIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldERyYWdnYWJsZShkcmFnZ2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBpcyBlZGl0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWdvbiBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLl9wb2x5Z29uLmdldEVkaXRhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRFZGl0YWJsZShlZGl0YWJsZSk7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzICYmICFlZGl0YWJsZSAmJiB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIoe1xyXG4gICAgICAgICAgICAgICAgQ2xpY2s6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBQb2x5Z29uOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgT3JpZ2luYWxQYXRoOiB0aGlzLl9vcmlnaW5hbFBhdGgsXHJcbiAgICAgICAgICAgICAgICBOZXdQYXRoOiB0aGlzLkdldFBhdGhzKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xyXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG8uZWRpdGFibGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RWRpdGFibGUoby5lZGl0YWJsZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvLmVkaXRhYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCAmJiB0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhb3B0aW9ucy52aXNpYmxlKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xyXG4gICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IHAucHVzaChuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0UGF0aChwKTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSBbcGF0aF07XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgcG9seWdvbiBwYXRoIG9yIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRocyBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoKHMpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRocyhwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChwYXRocyA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXRocykpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFBhdGhzKG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLkRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcclxuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSBuZXcgQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4oKTtcclxuICAgICAgICAgICAgKDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzKS5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgX3A6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xyXG4gICAgICAgICAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gX3AucHVzaChuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKF9wKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb24uc2V0UGF0aHMocCk7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cclxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cGF0aHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlnb24gdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFZpc2libGUodmlzaWJsZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF2aXNpYmxlKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIHRoZSBsYWJlbCBmb3IgdGhlIHBvbHlnb25cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlTGFiZWwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuR2V0UGF0aCA9PSBudWxsIHx8IHRoaXMuR2V0UGF0aCgpLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAodGhpcy5fc2hvd0xhYmVsICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdCh0aGlzLkNlbnRyb2lkKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoby5wb3NpdGlvbiA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWluWm9vbSAhPT0gLTEpIHsgby5taW5ab29tID0gdGhpcy5fbWluWm9vbTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Wm9vbSAhPT0gLTEpIHsgby5tYXhab29tID0gdGhpcy5fbWF4Wm9vbTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgby5tYXAgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmdldE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgby56SW5kZXggPSB0aGlzLk5hdGl2ZVByaW1pdHZlLnpJbmRleCA/IHRoaXMuTmF0aXZlUHJpbWl0dmUuekluZGV4ICsgMSA6IDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbmV3IEdvb2dsZU1hcExhYmVsKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0VmFsdWVzKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIXRoaXMuR2V0VmlzaWJsZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyB0aGUgdG9vbHRpcCBmb3IgdGhlIHBvbHlnb25cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvd1Rvb2x0aXAgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDI1KSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvLm1hcCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuZ2V0TWFwKCk7XHJcbiAgICAgICAgICAgICAgICBvLnpJbmRleCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBuZXcgR29vZ2xlTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPdmVyTGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHsgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sYXRMbmcpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCghdGhpcy5fc2hvd1Rvb2x0aXAgfHwgdGhpcy5fdGl0bGUgPT09ICcnIHx8IHRoaXMuX3RpdGxlID09IG51bGwpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU91dExpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19