/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export var /** @type {?} */ google;
/**
 * @record
 */
export function GoogleMap() { }
function GoogleMap_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    GoogleMap.prototype.data;
    /** @type {?} */
    GoogleMap.prototype.constructor;
    /** @type {?} */
    GoogleMap.prototype.panTo;
    /** @type {?} */
    GoogleMap.prototype.setZoom;
    /** @type {?} */
    GoogleMap.prototype.getCenter;
    /** @type {?} */
    GoogleMap.prototype.setCenter;
    /** @type {?} */
    GoogleMap.prototype.getBounds;
    /** @type {?} */
    GoogleMap.prototype.getZoom;
    /** @type {?} */
    GoogleMap.prototype.getDiv;
    /** @type {?} */
    GoogleMap.prototype.getProjection;
    /** @type {?} */
    GoogleMap.prototype.setOptions;
    /** @type {?} */
    GoogleMap.prototype.panToBounds;
    /** @type {?} */
    GoogleMap.prototype.fitBounds;
}
/**
 * @record
 */
export function LatLng() { }
function LatLng_tsickle_Closure_declarations() {
    /** @type {?} */
    LatLng.prototype.constructor;
    /** @type {?} */
    LatLng.prototype.lat;
    /** @type {?} */
    LatLng.prototype.lng;
}
/**
 * @record
 */
export function Marker() { }
function Marker_tsickle_Closure_declarations() {
    /** @type {?} */
    Marker.prototype.constructor;
    /** @type {?} */
    Marker.prototype.setMap;
    /** @type {?} */
    Marker.prototype.setPosition;
    /** @type {?} */
    Marker.prototype.setTitle;
    /** @type {?} */
    Marker.prototype.setLabel;
    /** @type {?} */
    Marker.prototype.setPosition;
    /** @type {?} */
    Marker.prototype.setDraggable;
    /** @type {?} */
    Marker.prototype.setIcon;
    /** @type {?} */
    Marker.prototype.setOpacity;
    /** @type {?} */
    Marker.prototype.setOptions;
    /** @type {?} */
    Marker.prototype.setVisible;
    /** @type {?} */
    Marker.prototype.setZIndex;
    /** @type {?} */
    Marker.prototype.getLabel;
    /** @type {?} */
    Marker.prototype.getPosition;
    /** @type {?} */
    Marker.prototype.getVisible;
}
/**
 * @record
 */
export function MarkerOptions() { }
function MarkerOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    MarkerOptions.prototype.position;
    /** @type {?|undefined} */
    MarkerOptions.prototype.title;
    /** @type {?|undefined} */
    MarkerOptions.prototype.map;
    /** @type {?|undefined} */
    MarkerOptions.prototype.label;
    /** @type {?|undefined} */
    MarkerOptions.prototype.draggable;
    /** @type {?|undefined} */
    MarkerOptions.prototype.clickable;
    /** @type {?|undefined} */
    MarkerOptions.prototype.icon;
    /** @type {?|undefined} */
    MarkerOptions.prototype.opacity;
    /** @type {?|undefined} */
    MarkerOptions.prototype.visible;
    /** @type {?|undefined} */
    MarkerOptions.prototype.zIndex;
}
/**
 * @record
 */
export function MarkerLabel() { }
function MarkerLabel_tsickle_Closure_declarations() {
    /** @type {?} */
    MarkerLabel.prototype.color;
    /** @type {?} */
    MarkerLabel.prototype.fontFamily;
    /** @type {?} */
    MarkerLabel.prototype.fontSize;
    /** @type {?} */
    MarkerLabel.prototype.fontWeight;
    /** @type {?} */
    MarkerLabel.prototype.text;
}
/**
 * @record
 */
export function ClusterStyle() { }
function ClusterStyle_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ClusterStyle.prototype.url;
    /** @type {?|undefined} */
    ClusterStyle.prototype.height;
    /** @type {?|undefined} */
    ClusterStyle.prototype.width;
    /** @type {?|undefined} */
    ClusterStyle.prototype.anchor;
    /** @type {?|undefined} */
    ClusterStyle.prototype.textColor;
    /** @type {?|undefined} */
    ClusterStyle.prototype.textSize;
    /** @type {?|undefined} */
    ClusterStyle.prototype.backgroundPosition;
}
/**
 * @record
 */
export function MarkerClusterer() { }
function MarkerClusterer_tsickle_Closure_declarations() {
    /** @type {?} */
    MarkerClusterer.prototype.isZoomOnClick;
    /** @type {?} */
    MarkerClusterer.prototype.isAverageCenter;
    /** @type {?} */
    MarkerClusterer.prototype.getMarkers;
    /** @type {?} */
    MarkerClusterer.prototype.getTotalMarkers;
    /** @type {?} */
    MarkerClusterer.prototype.setMaxZoom;
    /** @type {?} */
    MarkerClusterer.prototype.getMaxZoom;
    /** @type {?} */
    MarkerClusterer.prototype.addMarkers;
    /** @type {?} */
    MarkerClusterer.prototype.addMarker;
    /** @type {?} */
    MarkerClusterer.prototype.removeMarkers;
    /** @type {?} */
    MarkerClusterer.prototype.removeMarker;
    /** @type {?} */
    MarkerClusterer.prototype.getTotalClusters;
    /** @type {?} */
    MarkerClusterer.prototype.getMap;
    /** @type {?} */
    MarkerClusterer.prototype.setMap;
    /** @type {?} */
    MarkerClusterer.prototype.getGridSize;
    /** @type {?} */
    MarkerClusterer.prototype.setGridSize;
    /** @type {?} */
    MarkerClusterer.prototype.getMinClusterSize;
    /** @type {?} */
    MarkerClusterer.prototype.setMinClusterSize;
    /** @type {?} */
    MarkerClusterer.prototype.clearMarkers;
    /** @type {?} */
    MarkerClusterer.prototype.setStyles;
    /** @type {?} */
    MarkerClusterer.prototype.getStyles;
    /** @type {?} */
    MarkerClusterer.prototype.setCalculator;
    /** @type {?} */
    MarkerClusterer.prototype.getCalculator;
    /** @type {?} */
    MarkerClusterer.prototype.resetViewport;
    /** @type {?} */
    MarkerClusterer.prototype.redraw;
}
/**
 * @record
 */
export function Circle() { }
function Circle_tsickle_Closure_declarations() {
    /** @type {?} */
    Circle.prototype.getBounds;
    /** @type {?} */
    Circle.prototype.getCenter;
    /** @type {?} */
    Circle.prototype.getDraggable;
    /** @type {?} */
    Circle.prototype.getEditable;
    /** @type {?} */
    Circle.prototype.getMap;
    /** @type {?} */
    Circle.prototype.getRadius;
    /** @type {?} */
    Circle.prototype.getVisible;
    /** @type {?} */
    Circle.prototype.setCenter;
    /** @type {?} */
    Circle.prototype.setDraggable;
    /** @type {?} */
    Circle.prototype.setEditable;
    /** @type {?} */
    Circle.prototype.setMap;
    /** @type {?} */
    Circle.prototype.setOptions;
    /** @type {?} */
    Circle.prototype.setRadius;
    /** @type {?} */
    Circle.prototype.setVisible;
}
/**
 * @record
 */
export function CircleOptions() { }
function CircleOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    CircleOptions.prototype.center;
    /** @type {?|undefined} */
    CircleOptions.prototype.clickable;
    /** @type {?|undefined} */
    CircleOptions.prototype.draggable;
    /** @type {?|undefined} */
    CircleOptions.prototype.editable;
    /** @type {?|undefined} */
    CircleOptions.prototype.fillColor;
    /** @type {?|undefined} */
    CircleOptions.prototype.fillOpacity;
    /** @type {?|undefined} */
    CircleOptions.prototype.map;
    /** @type {?|undefined} */
    CircleOptions.prototype.radius;
    /** @type {?|undefined} */
    CircleOptions.prototype.strokeColor;
    /** @type {?|undefined} */
    CircleOptions.prototype.strokeOpacity;
    /** @type {?|undefined} */
    CircleOptions.prototype.strokePosition;
    /** @type {?|undefined} */
    CircleOptions.prototype.strokeWeight;
    /** @type {?|undefined} */
    CircleOptions.prototype.visible;
    /** @type {?|undefined} */
    CircleOptions.prototype.zIndex;
}
/**
 * @record
 */
export function LatLngBounds() { }
function LatLngBounds_tsickle_Closure_declarations() {
    /** @type {?} */
    LatLngBounds.prototype.contains;
    /** @type {?} */
    LatLngBounds.prototype.equals;
    /** @type {?} */
    LatLngBounds.prototype.extend;
    /** @type {?} */
    LatLngBounds.prototype.getCenter;
    /** @type {?} */
    LatLngBounds.prototype.getNorthEast;
    /** @type {?} */
    LatLngBounds.prototype.getSouthWest;
    /** @type {?} */
    LatLngBounds.prototype.intersects;
    /** @type {?} */
    LatLngBounds.prototype.isEmpty;
    /** @type {?} */
    LatLngBounds.prototype.toJSON;
    /** @type {?} */
    LatLngBounds.prototype.toSpan;
    /** @type {?} */
    LatLngBounds.prototype.toString;
    /** @type {?} */
    LatLngBounds.prototype.toUrlValue;
    /** @type {?} */
    LatLngBounds.prototype.union;
}
/**
 * @record
 */
export function LatLngBoundsLiteral() { }
function LatLngBoundsLiteral_tsickle_Closure_declarations() {
    /** @type {?} */
    LatLngBoundsLiteral.prototype.east;
    /** @type {?} */
    LatLngBoundsLiteral.prototype.north;
    /** @type {?} */
    LatLngBoundsLiteral.prototype.south;
    /** @type {?} */
    LatLngBoundsLiteral.prototype.west;
}
/**
 * @record
 */
export function LatLngLiteral() { }
function LatLngLiteral_tsickle_Closure_declarations() {
    /** @type {?} */
    LatLngLiteral.prototype.lat;
    /** @type {?} */
    LatLngLiteral.prototype.lng;
}
/**
 * @record
 */
export function MouseEvent() { }
function MouseEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    MouseEvent.prototype.latLng;
}
/**
 * @record
 */
export function MapOptions() { }
function MapOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MapOptions.prototype.center;
    /** @type {?|undefined} */
    MapOptions.prototype.zoom;
    /** @type {?|undefined} */
    MapOptions.prototype.minZoom;
    /** @type {?|undefined} */
    MapOptions.prototype.maxZoom;
    /** @type {?|undefined} */
    MapOptions.prototype.disableDoubleClickZoom;
    /** @type {?|undefined} */
    MapOptions.prototype.disableDefaultUI;
    /** @type {?|undefined} */
    MapOptions.prototype.scrollwheel;
    /** @type {?|undefined} */
    MapOptions.prototype.backgroundColor;
    /** @type {?|undefined} */
    MapOptions.prototype.draggable;
    /** @type {?|undefined} */
    MapOptions.prototype.draggableCursor;
    /** @type {?|undefined} */
    MapOptions.prototype.draggingCursor;
    /** @type {?|undefined} */
    MapOptions.prototype.keyboardShortcuts;
    /** @type {?|undefined} */
    MapOptions.prototype.styles;
    /** @type {?|undefined} */
    MapOptions.prototype.zoomControl;
    /** @type {?|undefined} */
    MapOptions.prototype.zoomControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.streetViewControl;
    /** @type {?|undefined} */
    MapOptions.prototype.streetViewControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.scaleControl;
    /** @type {?|undefined} */
    MapOptions.prototype.scaleControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.mapTypeControl;
    /** @type {?|undefined} */
    MapOptions.prototype.mapTypeControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.panControl;
    /** @type {?|undefined} */
    MapOptions.prototype.panControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.rotateControl;
    /** @type {?|undefined} */
    MapOptions.prototype.rotateControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.fullscreenControl;
    /** @type {?|undefined} */
    MapOptions.prototype.fullscreenControlOptions;
    /** @type {?|undefined} */
    MapOptions.prototype.mapTypeId;
    /** @type {?|undefined} */
    MapOptions.prototype.clickableIcons;
    /** @type {?|undefined} */
    MapOptions.prototype.gestureHandling;
}
/**
 * @record
 */
export function MapTypeStyle() { }
function MapTypeStyle_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MapTypeStyle.prototype.elementType;
    /** @type {?|undefined} */
    MapTypeStyle.prototype.featureType;
    /** @type {?} */
    MapTypeStyle.prototype.stylers;
}
/**
 *  If more than one key is specified in a single MapTypeStyler, all but one will be ignored.
 * @record
 */
export function MapTypeStyler() { }
function MapTypeStyler_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MapTypeStyler.prototype.color;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.gamma;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.hue;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.invert_lightness;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.lightness;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.saturation;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.visibility;
    /** @type {?|undefined} */
    MapTypeStyler.prototype.weight;
}
/**
 * @record
 */
export function InfoWindow() { }
function InfoWindow_tsickle_Closure_declarations() {
    /** @type {?} */
    InfoWindow.prototype.constructor;
    /** @type {?} */
    InfoWindow.prototype.close;
    /** @type {?} */
    InfoWindow.prototype.getContent;
    /** @type {?} */
    InfoWindow.prototype.getPosition;
    /** @type {?} */
    InfoWindow.prototype.getZIndex;
    /** @type {?} */
    InfoWindow.prototype.open;
    /** @type {?} */
    InfoWindow.prototype.setContent;
    /** @type {?} */
    InfoWindow.prototype.setOptions;
    /** @type {?} */
    InfoWindow.prototype.setPosition;
    /** @type {?} */
    InfoWindow.prototype.setZIndex;
}
/**
 * @record
 */
export function MVCObject() { }
function MVCObject_tsickle_Closure_declarations() {
    /** @type {?} */
    MVCObject.prototype.addListener;
}
/**
 * @record
 */
export function MapsEventListener() { }
function MapsEventListener_tsickle_Closure_declarations() {
    /** @type {?} */
    MapsEventListener.prototype.remove;
}
/**
 * @record
 */
export function Size() { }
function Size_tsickle_Closure_declarations() {
    /** @type {?} */
    Size.prototype.height;
    /** @type {?} */
    Size.prototype.width;
    /** @type {?} */
    Size.prototype.constructor;
    /** @type {?} */
    Size.prototype.equals;
    /** @type {?} */
    Size.prototype.toString;
}
/**
 * @record
 */
export function InfoWindowOptions() { }
function InfoWindowOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.content;
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.disableAutoPan;
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.maxWidth;
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.pixelOffset;
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.position;
    /** @type {?|undefined} */
    InfoWindowOptions.prototype.zIndex;
}
/**
 * @record
 */
export function Point() { }
function Point_tsickle_Closure_declarations() {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
    /** @type {?} */
    Point.prototype.equals;
    /** @type {?} */
    Point.prototype.toString;
}
/**
 * @record
 */
export function GoogleSymbol() { }
function GoogleSymbol_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    GoogleSymbol.prototype.anchor;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.fillColor;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.fillOpacity;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.labelOrigin;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.path;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.rotation;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.scale;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.strokeColor;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.strokeOpacity;
    /** @type {?|undefined} */
    GoogleSymbol.prototype.strokeWeight;
}
/**
 * @record
 */
export function IconSequence() { }
function IconSequence_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IconSequence.prototype.fixedRotation;
    /** @type {?|undefined} */
    IconSequence.prototype.icon;
    /** @type {?|undefined} */
    IconSequence.prototype.offset;
    /** @type {?|undefined} */
    IconSequence.prototype.repeat;
}
/**
 * @record
 */
export function PolylineOptions() { }
function PolylineOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PolylineOptions.prototype.clickable;
    /** @type {?|undefined} */
    PolylineOptions.prototype.draggable;
    /** @type {?|undefined} */
    PolylineOptions.prototype.editable;
    /** @type {?|undefined} */
    PolylineOptions.prototype.geodesic;
    /** @type {?|undefined} */
    PolylineOptions.prototype.icon;
    /** @type {?|undefined} */
    PolylineOptions.prototype.map;
    /** @type {?|undefined} */
    PolylineOptions.prototype.path;
    /** @type {?|undefined} */
    PolylineOptions.prototype.strokeColor;
    /** @type {?|undefined} */
    PolylineOptions.prototype.strokeOpacity;
    /** @type {?|undefined} */
    PolylineOptions.prototype.strokeWeight;
    /** @type {?|undefined} */
    PolylineOptions.prototype.visible;
    /** @type {?|undefined} */
    PolylineOptions.prototype.zIndex;
}
/**
 * @record
 */
export function Polyline() { }
function Polyline_tsickle_Closure_declarations() {
    /** @type {?} */
    Polyline.prototype.getDraggable;
    /** @type {?} */
    Polyline.prototype.getEditable;
    /** @type {?} */
    Polyline.prototype.getMap;
    /** @type {?} */
    Polyline.prototype.getPath;
    /** @type {?} */
    Polyline.prototype.getVisible;
    /** @type {?} */
    Polyline.prototype.setDraggable;
    /** @type {?} */
    Polyline.prototype.setEditable;
    /** @type {?} */
    Polyline.prototype.setMap;
    /** @type {?} */
    Polyline.prototype.setOptions;
    /** @type {?} */
    Polyline.prototype.setPath;
    /** @type {?} */
    Polyline.prototype.setVisible;
}
/**
 * PolyMouseEvent gets emitted when the user triggers mouse events on a polyline.
 * @record
 */
export function PolyMouseEvent() { }
function PolyMouseEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    PolyMouseEvent.prototype.edge;
    /** @type {?} */
    PolyMouseEvent.prototype.path;
    /** @type {?} */
    PolyMouseEvent.prototype.vertex;
}
/**
 * @record
 */
export function PolygonOptions() { }
function PolygonOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PolygonOptions.prototype.clickable;
    /** @type {?|undefined} */
    PolygonOptions.prototype.draggable;
    /** @type {?|undefined} */
    PolygonOptions.prototype.editable;
    /** @type {?|undefined} */
    PolygonOptions.prototype.fillColor;
    /** @type {?|undefined} */
    PolygonOptions.prototype.fillOpacity;
    /** @type {?|undefined} */
    PolygonOptions.prototype.geodesic;
    /** @type {?|undefined} */
    PolygonOptions.prototype.icon;
    /** @type {?|undefined} */
    PolygonOptions.prototype.map;
    /** @type {?|undefined} */
    PolygonOptions.prototype.paths;
    /** @type {?|undefined} */
    PolygonOptions.prototype.strokeColor;
    /** @type {?|undefined} */
    PolygonOptions.prototype.strokeOpacity;
    /** @type {?|undefined} */
    PolygonOptions.prototype.strokeWeight;
    /** @type {?|undefined} */
    PolygonOptions.prototype.visible;
    /** @type {?|undefined} */
    PolygonOptions.prototype.zIndex;
}
/**
 * @record
 */
export function Polygon() { }
function Polygon_tsickle_Closure_declarations() {
    /** @type {?} */
    Polygon.prototype.zIndex;
    /** @type {?} */
    Polygon.prototype.getDraggable;
    /** @type {?} */
    Polygon.prototype.getEditable;
    /** @type {?} */
    Polygon.prototype.getMap;
    /** @type {?} */
    Polygon.prototype.getPath;
    /** @type {?} */
    Polygon.prototype.getPaths;
    /** @type {?} */
    Polygon.prototype.getVisible;
    /** @type {?} */
    Polygon.prototype.setDraggable;
    /** @type {?} */
    Polygon.prototype.setEditable;
    /** @type {?} */
    Polygon.prototype.setMap;
    /** @type {?} */
    Polygon.prototype.setPath;
    /** @type {?} */
    Polygon.prototype.setOptions;
    /** @type {?} */
    Polygon.prototype.setPaths;
    /** @type {?} */
    Polygon.prototype.setVisible;
}
/**
 * @record
 */
export function KmlLayer() { }
function KmlLayer_tsickle_Closure_declarations() {
    /** @type {?} */
    KmlLayer.prototype.getDefaultViewport;
    /** @type {?} */
    KmlLayer.prototype.getMap;
    /** @type {?} */
    KmlLayer.prototype.getMetadata;
    /** @type {?} */
    KmlLayer.prototype.getStatus;
    /** @type {?} */
    KmlLayer.prototype.getUrl;
    /** @type {?} */
    KmlLayer.prototype.getZIndex;
    /** @type {?} */
    KmlLayer.prototype.setMap;
    /** @type {?} */
    KmlLayer.prototype.setOptions;
    /** @type {?} */
    KmlLayer.prototype.setUrl;
    /** @type {?} */
    KmlLayer.prototype.setZIndex;
}
/**
 * See: https://developers.google.com/maps/documentation/javascript/reference?hl=de#KmlLayerMetadata
 * @record
 */
export function KmlLayerMetadata() { }
function KmlLayerMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    KmlLayerMetadata.prototype.author;
    /** @type {?} */
    KmlLayerMetadata.prototype.description;
    /** @type {?} */
    KmlLayerMetadata.prototype.hasScreenOverlays;
    /** @type {?} */
    KmlLayerMetadata.prototype.name;
    /** @type {?} */
    KmlLayerMetadata.prototype.snippet;
}
/**
 * @record
 */
export function KmlAuthor() { }
function KmlAuthor_tsickle_Closure_declarations() {
    /** @type {?} */
    KmlAuthor.prototype.email;
    /** @type {?} */
    KmlAuthor.prototype.name;
    /** @type {?} */
    KmlAuthor.prototype.uri;
}
/**
 * @record
 */
export function KmlLayerOptions() { }
function KmlLayerOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.clickable;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.map;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.preserveViewport;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.screenOverlays;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.suppressInfoWindows;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.url;
    /** @type {?|undefined} */
    KmlLayerOptions.prototype.zIndex;
}
/**
 * @record
 */
export function KmlFeatureData() { }
function KmlFeatureData_tsickle_Closure_declarations() {
    /** @type {?} */
    KmlFeatureData.prototype.author;
    /** @type {?} */
    KmlFeatureData.prototype.description;
    /** @type {?} */
    KmlFeatureData.prototype.id;
    /** @type {?} */
    KmlFeatureData.prototype.infoWindowHtml;
    /** @type {?} */
    KmlFeatureData.prototype.name;
    /** @type {?} */
    KmlFeatureData.prototype.snippet;
}
/**
 * @record
 */
export function KmlMouseEvent() { }
function KmlMouseEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    KmlMouseEvent.prototype.featureData;
    /** @type {?} */
    KmlMouseEvent.prototype.pixelOffset;
}
/**
 * @record
 */
export function Data() { }
function Data_tsickle_Closure_declarations() {
    /** @type {?} */
    Data.prototype.features;
    /** @type {?} */
    Data.prototype.constructor;
    /** @type {?} */
    Data.prototype.addGeoJson;
    /** @type {?} */
    Data.prototype.remove;
    /** @type {?} */
    Data.prototype.setControlPosition;
    /** @type {?} */
    Data.prototype.setControls;
    /** @type {?} */
    Data.prototype.setDrawingMode;
    /** @type {?} */
    Data.prototype.setMap;
    /** @type {?} */
    Data.prototype.setStyle;
    /** @type {?} */
    Data.prototype.forEach;
}
/**
 * @record
 */
export function Feature() { }
function Feature_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Feature.prototype.id;
    /** @type {?} */
    Feature.prototype.geometry;
    /** @type {?} */
    Feature.prototype.properties;
}
/**
 * @record
 */
export function DataOptions() { }
function DataOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DataOptions.prototype.controlPosition;
    /** @type {?|undefined} */
    DataOptions.prototype.controls;
    /** @type {?|undefined} */
    DataOptions.prototype.drawingMode;
    /** @type {?|undefined} */
    DataOptions.prototype.featureFactory;
    /** @type {?|undefined} */
    DataOptions.prototype.map;
    /** @type {?|undefined} */
    DataOptions.prototype.style;
}
/**
 * @record
 */
export function DataMouseEvent() { }
function DataMouseEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    DataMouseEvent.prototype.feature;
}
/**
 * @record
 */
export function GeoJsonOptions() { }
function GeoJsonOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    GeoJsonOptions.prototype.idPropertyName;
}
/**
 * @record
 */
export function Geometry() { }
function Geometry_tsickle_Closure_declarations() {
    /** @type {?} */
    Geometry.prototype.type;
}
/** @enum {number} */
var ControlPosition = {
    BOTTOM_CENTER: 0,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    LEFT_BOTTOM: 3,
    LEFT_CENTER: 4,
    LEFT_TOP: 5,
    RIGHT_BOTTOM: 6,
    RIGHT_CENTER: 7,
    RIGHT_TOP: 8,
    TOP_CENTER: 9,
    TOP_LEFT: 10,
    TOP_RIGHT: 11,
};
export { ControlPosition };
ControlPosition[ControlPosition.BOTTOM_CENTER] = "BOTTOM_CENTER";
ControlPosition[ControlPosition.BOTTOM_LEFT] = "BOTTOM_LEFT";
ControlPosition[ControlPosition.BOTTOM_RIGHT] = "BOTTOM_RIGHT";
ControlPosition[ControlPosition.LEFT_BOTTOM] = "LEFT_BOTTOM";
ControlPosition[ControlPosition.LEFT_CENTER] = "LEFT_CENTER";
ControlPosition[ControlPosition.LEFT_TOP] = "LEFT_TOP";
ControlPosition[ControlPosition.RIGHT_BOTTOM] = "RIGHT_BOTTOM";
ControlPosition[ControlPosition.RIGHT_CENTER] = "RIGHT_CENTER";
ControlPosition[ControlPosition.RIGHT_TOP] = "RIGHT_TOP";
ControlPosition[ControlPosition.TOP_CENTER] = "TOP_CENTER";
ControlPosition[ControlPosition.TOP_LEFT] = "TOP_LEFT";
ControlPosition[ControlPosition.TOP_RIGHT] = "TOP_RIGHT";
/** @enum {number} */
var MapTypeId = {
    /** This map type displays a transparent layer of major streets on satellite images. */
    hybrid: 0,
    /** This map type displays a normal street map. */
    roadmap: 1,
    /** This map type displays satellite images. */
    satellite: 2,
    /** This map type displays maps with physical features such as terrain and vegetation. */
    terrain: 3,
};
export { MapTypeId };
MapTypeId[MapTypeId.hybrid] = "hybrid";
MapTypeId[MapTypeId.roadmap] = "roadmap";
MapTypeId[MapTypeId.satellite] = "satellite";
MapTypeId[MapTypeId.terrain] = "terrain";
/**
 * Options for the rendering of the map type control.
 * @record
 */
export function MapTypeControlOptions() { }
function MapTypeControlOptions_tsickle_Closure_declarations() {
    /**
     * IDs of map types to show in the control.
     * @type {?|undefined}
     */
    MapTypeControlOptions.prototype.mapTypeIds;
    /**
     * Position id. Used to specify the position of the control on the map.
     * The default position is TOP_RIGHT.
     * @type {?|undefined}
     */
    MapTypeControlOptions.prototype.position;
    /**
     * Style id. Used to select what style of map type control to display.
     * @type {?|undefined}
     */
    MapTypeControlOptions.prototype.style;
}
/** @enum {number} */
var MapTypeControlStyle = {
    DEFAULT: 0,
    DROPDOWN_MENU: 1,
    HORIZONTAL_BAR: 2,
};
export { MapTypeControlStyle };
MapTypeControlStyle[MapTypeControlStyle.DEFAULT] = "DEFAULT";
MapTypeControlStyle[MapTypeControlStyle.DROPDOWN_MENU] = "DROPDOWN_MENU";
MapTypeControlStyle[MapTypeControlStyle.HORIZONTAL_BAR] = "HORIZONTAL_BAR";
/**
 * @record
 */
export function OverviewMapControlOptions() { }
function OverviewMapControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    OverviewMapControlOptions.prototype.opened;
}
/**
 * Options for the rendering of the pan control.
 * @record
 */
export function PanControlOptions() { }
function PanControlOptions_tsickle_Closure_declarations() {
    /**
     * Position id. Used to specify the position of the control on the map.
     * The default position is TOP_LEFT.
     * @type {?|undefined}
     */
    PanControlOptions.prototype.position;
}
/**
 * Options for the rendering of the rotate control.
 * @record
 */
export function RotateControlOptions() { }
function RotateControlOptions_tsickle_Closure_declarations() {
    /**
     * Position id. Used to specify the position of the control on the map.
     * The default position is TOP_LEFT.
     * @type {?|undefined}
     */
    RotateControlOptions.prototype.position;
}
/**
 * Options for the rendering of the scale control.
 * @record
 */
export function ScaleControlOptions() { }
function ScaleControlOptions_tsickle_Closure_declarations() {
    /**
     * Style id. Used to select what style of scale control to display.
     * @type {?|undefined}
     */
    ScaleControlOptions.prototype.style;
}
/** @enum {number} */
var ScaleControlStyle = {
    DEFAULT: 0,
};
export { ScaleControlStyle };
ScaleControlStyle[ScaleControlStyle.DEFAULT] = "DEFAULT";
/**
 * Options for the rendering of the Street View pegman control on the map.
 * @record
 */
export function StreetViewControlOptions() { }
function StreetViewControlOptions_tsickle_Closure_declarations() {
    /**
     * Position id. Used to specify the position of the control on the map. The
     * default position is embedded within the navigation (zoom and pan) controls.
     * If this position is empty or the same as that specified in the
     * zoomControlOptions or panControlOptions, the Street View control will be
     * displayed as part of the navigation controls. Otherwise, it will be displayed
     * separately.
     * @type {?|undefined}
     */
    StreetViewControlOptions.prototype.position;
}
/**
 * Options for the rendering of the zoom control.
 * @record
 */
export function ZoomControlOptions() { }
function ZoomControlOptions_tsickle_Closure_declarations() {
    /**
     * Position id. Used to specify the position of the control on the map.
     * The default position is TOP_LEFT.
     * @type {?|undefined}
     */
    ZoomControlOptions.prototype.position;
    /** @type {?|undefined} */
    ZoomControlOptions.prototype.style;
}
/** @enum {number} */
var ZoomControlStyle = {
    DEFAULT: 0,
    LARGE: 1,
    SMALL: 2,
};
export { ZoomControlStyle };
ZoomControlStyle[ZoomControlStyle.DEFAULT] = "DEFAULT";
ZoomControlStyle[ZoomControlStyle.LARGE] = "LARGE";
ZoomControlStyle[ZoomControlStyle.SMALL] = "SMALL";
/**
 * Options for the rendering of the fullscreen control.
 * @record
 */
export function FullscreenControlOptions() { }
function FullscreenControlOptions_tsickle_Closure_declarations() {
    /**
     * Position id. Used to specify the position of the control on the map.
     * The default position is RIGHT_TOP.
     * @type {?|undefined}
     */
    FullscreenControlOptions.prototype.position;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxDQUFDLHFCQUFJLE1BQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBsZXQgZ29vZ2xlOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1hcCBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgZGF0YT86IERhdGE7XHJcbiAgY29uc3RydWN0b3IoZWw6IEhUTUxFbGVtZW50LCBvcHRzPzogTWFwT3B0aW9ucyk6IHZvaWQ7XHJcbiAgcGFuVG8obGF0TG5nOiBMYXRMbmd8TGF0TG5nTGl0ZXJhbCk6IHZvaWQ7XHJcbiAgc2V0Wm9vbSh6b29tOiBudW1iZXIpOiB2b2lkO1xyXG4gIGdldENlbnRlcigpOiBMYXRMbmc7XHJcbiAgc2V0Q2VudGVyKGxhdExuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xyXG4gIGdldEJvdW5kcygpOiBMYXRMbmdCb3VuZHM7XHJcbiAgZ2V0Wm9vbSgpOiBudW1iZXI7XHJcbiAgZ2V0RGl2KCk6IEhUTUxEaXZFbGVtZW50O1xyXG4gIGdldFByb2plY3Rpb24oKTogYW55O1xyXG4gIHNldE9wdGlvbnMob3B0aW9uczogTWFwT3B0aW9ucyk6IHZvaWQ7XHJcbiAgcGFuVG9Cb3VuZHMobGF0TG5nQm91bmRzOiBMYXRMbmdCb3VuZHN8TGF0TG5nQm91bmRzTGl0ZXJhbCk6IHZvaWQ7XHJcbiAgZml0Qm91bmRzKGJvdW5kczogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExhdExuZyB7XHJcbiAgY29uc3RydWN0b3IobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyKTogdm9pZDtcclxuICBsYXQoKTogbnVtYmVyO1xyXG4gIGxuZygpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2VyIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFya2VyT3B0aW9ucyk6IHZvaWQ7XHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcclxuICBzZXRQb3NpdGlvbihsYXRMbmc6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcclxuICBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZDtcclxuICBzZXRMYWJlbChsYWJlbDogc3RyaW5nfE1hcmtlckxhYmVsKTogdm9pZDtcclxuICBzZXRQb3NpdGlvbihsYXRsbmc6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcclxuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRJY29uKGljb246IHN0cmluZyk6IHZvaWQ7XHJcbiAgc2V0T3BhY2l0eShvcGFjaXR5OiBudW1iZXIpOiB2b2lkO1xyXG4gIHNldE9wdGlvbnMob3B0aW9uczogTWFya2VyT3B0aW9ucyk6IHZvaWQ7XHJcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRaSW5kZXgoekluZGV4OiBudW1iZXIpOiB2b2lkO1xyXG4gIGdldExhYmVsKCk6IE1hcmtlckxhYmVsO1xyXG4gIGdldFBvc2l0aW9uKCk6IExhdExuZztcclxuICBnZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2VyT3B0aW9ucyB7XHJcbiAgcG9zaXRpb246IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIG1hcD86IEdvb2dsZU1hcDtcclxuICBsYWJlbD86IHN0cmluZ3xNYXJrZXJMYWJlbDtcclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG4gIGNsaWNrYWJsZT86IGJvb2xlYW47XHJcbiAgaWNvbj86IHN0cmluZztcclxuICBvcGFjaXR5PzogbnVtYmVyO1xyXG4gIHZpc2libGU/OiBib29sZWFuO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXJMYWJlbCB7XHJcbiAgY29sb3I6IHN0cmluZztcclxuICBmb250RmFtaWx5OiBzdHJpbmc7XHJcbiAgZm9udFNpemU6IHN0cmluZztcclxuICBmb250V2VpZ2h0OiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENsdXN0ZXJTdHlsZSB7XHJcbiAgdXJsPzogc3RyaW5nO1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICB3aWR0aD86IG51bWJlcjtcclxuICBhbmNob3I/OiBBcnJheTxudW1iZXI+O1xyXG4gIHRleHRDb2xvcj86IHN0cmluZztcclxuICB0ZXh0U2l6ZT86IG51bWJlcjtcclxuICBiYWNrZ3JvdW5kUG9zaXRpb24/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2VyQ2x1c3RlcmVyIHtcclxuICBpc1pvb21PbkNsaWNrKCk6IGJvb2xlYW47XHJcbiAgaXNBdmVyYWdlQ2VudGVyKCk6IGJvb2xlYW47XHJcbiAgZ2V0TWFya2VycygpOiBBcnJheTxNYXJrZXI+O1xyXG4gIGdldFRvdGFsTWFya2VycygpOiBudW1iZXI7XHJcbiAgc2V0TWF4Wm9vbShtYXhab29tOiBudW1iZXIpOiB2b2lkO1xyXG4gIGdldE1heFpvb20oKTogbnVtYmVyO1xyXG4gIGFkZE1hcmtlcnMobWFya2VyczogQXJyYXk8TWFya2VyPiwgb3B0X25vZHJhdz86IGJvb2xlYW4pOiB2b2lkO1xyXG4gIGFkZE1hcmtlcihtYXJrZXI6IE1hcmtlciwgb3B0X25vZHJhdz86IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHJlbW92ZU1hcmtlcnMobWFya2VyczogQXJyYXk8TWFya2VyPiwgb3B0X25vZHJhdz86IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcmtlciwgb3B0X25vZHJhdz86IGJvb2xlYW4pOiB2b2lkO1xyXG4gIGdldFRvdGFsQ2x1c3RlcnMoKTogbnVtYmVyO1xyXG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcclxuICBnZXRHcmlkU2l6ZSgpOiBudW1iZXI7XHJcbiAgc2V0R3JpZFNpemUoZ3JpZFNpemU6IG51bWJlcik6IHZvaWQ7XHJcbiAgZ2V0TWluQ2x1c3RlclNpemUoKTogbnVtYmVyO1xyXG4gIHNldE1pbkNsdXN0ZXJTaXplKG1pbkNsdXN0ZXJTaXplOiBudW1iZXIpOiB2b2lkO1xyXG4gIGNsZWFyTWFya2VycygpOiB2b2lkO1xyXG4gIHNldFN0eWxlcyhzdHlsZXM6IEFycmF5PENsdXN0ZXJTdHlsZT4pOiB2b2lkO1xyXG4gIGdldFN0eWxlcygpOiBBcnJheTxDbHVzdGVyU3R5bGU+O1xyXG4gIHNldENhbGN1bGF0b3IoY2FsbGJhY2s6IChtYXJrZXJzOiBBcnJheTxNYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcikgPT4geyB0ZXh0OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ9KTogdm9pZDtcclxuICBnZXRDYWxjdWxhdG9yKCk6IChtYXJrZXJzOiBBcnJheTxNYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcikgPT4geyB0ZXh0OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ9O1xyXG4gIHJlc2V0Vmlld3BvcnQoaGlkZT86IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHJlZHJhdygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENpcmNsZSBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgZ2V0Qm91bmRzKCk6IExhdExuZ0JvdW5kcztcclxuICBnZXRDZW50ZXIoKTogTGF0TG5nO1xyXG4gIGdldERyYWdnYWJsZSgpOiBib29sZWFuO1xyXG4gIGdldEVkaXRhYmxlKCk6IGJvb2xlYW47XHJcbiAgZ2V0TWFwKCk6IEdvb2dsZU1hcDtcclxuICBnZXRSYWRpdXMoKTogbnVtYmVyO1xyXG4gIGdldFZpc2libGUoKTogYm9vbGVhbjtcclxuICBzZXRDZW50ZXIoY2VudGVyOiBMYXRMbmd8TGF0TG5nTGl0ZXJhbCk6IHZvaWQ7XHJcbiAgc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbiAgc2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBDaXJjbGVPcHRpb25zKTogdm9pZDtcclxuICBzZXRSYWRpdXMocmFkaXVzOiBudW1iZXIpOiB2b2lkO1xyXG4gIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2lyY2xlT3B0aW9ucyB7XHJcbiAgY2VudGVyPzogTGF0TG5nfExhdExuZ0xpdGVyYWw7XHJcbiAgY2xpY2thYmxlPzogYm9vbGVhbjtcclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG4gIGVkaXRhYmxlPzogYm9vbGVhbjtcclxuICBmaWxsQ29sb3I/OiBzdHJpbmc7XHJcbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XHJcbiAgbWFwPzogR29vZ2xlTWFwO1xyXG4gIHJhZGl1cz86IG51bWJlcjtcclxuICBzdHJva2VDb2xvcj86IHN0cmluZztcclxuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHN0cm9rZVBvc2l0aW9uPzogJ0NFTlRFUid8J0lOU0lERSd8J09VVFNJREUnO1xyXG4gIHN0cm9rZVdlaWdodD86IG51bWJlcjtcclxuICB2aXNpYmxlPzogYm9vbGVhbjtcclxuICB6SW5kZXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nQm91bmRzIHtcclxuICBjb250YWlucyhsYXRMbmc6IExhdExuZyk6IGJvb2xlYW47XHJcbiAgZXF1YWxzKG90aGVyOiBMYXRMbmdCb3VuZHN8TGF0TG5nQm91bmRzTGl0ZXJhbCk6IGJvb2xlYW47XHJcbiAgZXh0ZW5kKHBvaW50OiBMYXRMbmcpOiB2b2lkO1xyXG4gIGdldENlbnRlcigpOiBMYXRMbmc7XHJcbiAgZ2V0Tm9ydGhFYXN0KCk6IExhdExuZztcclxuICBnZXRTb3V0aFdlc3QoKTogTGF0TG5nO1xyXG4gIGludGVyc2VjdHMob3RoZXI6IExhdExuZ0JvdW5kc3xMYXRMbmdCb3VuZHNMaXRlcmFsKTogYm9vbGVhbjtcclxuICBpc0VtcHR5KCk6IGJvb2xlYW47XHJcbiAgdG9KU09OKCk6IExhdExuZ0JvdW5kc0xpdGVyYWw7XHJcbiAgdG9TcGFuKCk6IExhdExuZztcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgdG9VcmxWYWx1ZShwcmVjaXNpb24/OiBudW1iZXIpOiBzdHJpbmc7XHJcbiAgdW5pb24ob3RoZXI6IExhdExuZ0JvdW5kc3xMYXRMbmdCb3VuZHNMaXRlcmFsKTogTGF0TG5nQm91bmRzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExhdExuZ0JvdW5kc0xpdGVyYWwge1xyXG4gIGVhc3Q6IG51bWJlcjtcclxuICBub3J0aDogbnVtYmVyO1xyXG4gIHNvdXRoOiBudW1iZXI7XHJcbiAgd2VzdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExhdExuZ0xpdGVyYWwge1xyXG4gIGxhdDogbnVtYmVyO1xyXG4gIGxuZzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vdXNlRXZlbnQgeyBsYXRMbmc6IExhdExuZzsgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBPcHRpb25zIHtcclxuICBjZW50ZXI/OiBMYXRMbmd8TGF0TG5nTGl0ZXJhbDtcclxuICB6b29tPzogbnVtYmVyO1xyXG4gIG1pblpvb20/OiBudW1iZXI7XHJcbiAgbWF4Wm9vbT86IG51bWJlcjtcclxuICBkaXNhYmxlRG91YmxlQ2xpY2tab29tPzogYm9vbGVhbjtcclxuICBkaXNhYmxlRGVmYXVsdFVJPzogYm9vbGVhbjtcclxuICBzY3JvbGx3aGVlbD86IGJvb2xlYW47XHJcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgZHJhZ2dhYmxlQ3Vyc29yPzogc3RyaW5nO1xyXG4gIGRyYWdnaW5nQ3Vyc29yPzogc3RyaW5nO1xyXG4gIGtleWJvYXJkU2hvcnRjdXRzPzogYm9vbGVhbjtcclxuICBzdHlsZXM/OiBNYXBUeXBlU3R5bGVbXTtcclxuICB6b29tQ29udHJvbD86IGJvb2xlYW47XHJcbiAgem9vbUNvbnRyb2xPcHRpb25zPzogWm9vbUNvbnRyb2xPcHRpb25zO1xyXG4gIHN0cmVldFZpZXdDb250cm9sPzogYm9vbGVhbjtcclxuICBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM/OiBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM7XHJcbiAgc2NhbGVDb250cm9sPzogYm9vbGVhbjtcclxuICBzY2FsZUNvbnRyb2xPcHRpb25zPzogU2NhbGVDb250cm9sT3B0aW9ucztcclxuICBtYXBUeXBlQ29udHJvbD86IGJvb2xlYW47XHJcbiAgbWFwVHlwZUNvbnRyb2xPcHRpb25zPzogTWFwVHlwZUNvbnRyb2xPcHRpb25zO1xyXG4gIHBhbkNvbnRyb2w/OiBib29sZWFuO1xyXG4gIHBhbkNvbnRyb2xPcHRpb25zPzogUGFuQ29udHJvbE9wdGlvbnM7XHJcbiAgcm90YXRlQ29udHJvbD86IGJvb2xlYW47XHJcbiAgcm90YXRlQ29udHJvbE9wdGlvbnM/OiBSb3RhdGVDb250cm9sT3B0aW9ucztcclxuICBmdWxsc2NyZWVuQ29udHJvbD86IGJvb2xlYW47XHJcbiAgZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zPzogRnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zO1xyXG4gIG1hcFR5cGVJZD86IHN0cmluZ3xNYXBUeXBlSWQ7XHJcbiAgY2xpY2thYmxlSWNvbnM/OiBib29sZWFuO1xyXG4gIGdlc3R1cmVIYW5kbGluZz86ICdjb29wZXJhdGl2ZSd8J2dyZWVkeSd8J25vbmUnfCdhdXRvJztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBUeXBlU3R5bGUge1xyXG4gIGVsZW1lbnRUeXBlPzogJ2FsbCd8J2dlb21ldHJ5J3wnZ2VvbWV0cnkuZmlsbCd8J2dlb21ldHJ5LnN0cm9rZSd8J2xhYmVscyd8J2xhYmVscy5pY29uJ3xcclxuICAgICAgJ2xhYmVscy50ZXh0J3wnbGFiZWxzLnRleHQuZmlsbCd8J2xhYmVscy50ZXh0LnN0cm9rZSc7XHJcbiAgZmVhdHVyZVR5cGU/OiAnYWRtaW5pc3RyYXRpdmUnfCdhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5J3wnYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWwnfFxyXG4gICAgICAnYWRtaW5pc3RyYXRpdmUubG9jYWxpdHknfCdhZG1pbmlzdHJhdGl2ZS5uZWlnaGJvcmhvb2QnfCdhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZSd8J2FsbCd8XHJcbiAgICAgICdsYW5kc2NhcGUnfCdsYW5kc2NhcGUubWFuX21hZGUnfCdsYW5kc2NhcGUubmF0dXJhbCd8J2xhbmRzY2FwZS5uYXR1cmFsLmxhbmRjb3Zlcid8XHJcbiAgICAgICdsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluJ3wncG9pJ3wncG9pLmF0dHJhY3Rpb24nfCdwb2kuYnVzaW5lc3MnfCdwb2kuZ292ZXJubWVudCd8XHJcbiAgICAgICdwb2kubWVkaWNhbCd8J3BvaS5wYXJrJ3wncG9pLnBsYWNlX29mX3dvcnNoaXAnfCdwb2kuc2Nob29sJ3wncG9pLnNwb3J0c19jb21wbGV4J3wncm9hZCd8XHJcbiAgICAgICdyb2FkLmFydGVyaWFsJ3wncm9hZC5oaWdod2F5J3wncm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzJ3wncm9hZC5sb2NhbCd8J3RyYW5zaXQnfFxyXG4gICAgICAndHJhbnNpdC5saW5lJ3wndHJhbnNpdC5zdGF0aW9uJ3wndHJhbnNpdC5zdGF0aW9uLmFpcnBvcnQnfCd0cmFuc2l0LnN0YXRpb24uYnVzJ3xcclxuICAgICAgJ3RyYW5zaXQuc3RhdGlvbi5yYWlsJ3wnd2F0ZXInO1xyXG4gIHN0eWxlcnM6IE1hcFR5cGVTdHlsZXJbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqICBJZiBtb3JlIHRoYW4gb25lIGtleSBpcyBzcGVjaWZpZWQgaW4gYSBzaW5nbGUgTWFwVHlwZVN0eWxlciwgYWxsIGJ1dCBvbmUgd2lsbCBiZSBpZ25vcmVkLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNYXBUeXBlU3R5bGVyIHtcclxuICBjb2xvcj86IHN0cmluZztcclxuICBnYW1tYT86IG51bWJlcjtcclxuICBodWU/OiBzdHJpbmc7XHJcbiAgaW52ZXJ0X2xpZ2h0bmVzcz86IGJvb2xlYW47XHJcbiAgbGlnaHRuZXNzPzogbnVtYmVyO1xyXG4gIHNhdHVyYXRpb24/OiBudW1iZXI7XHJcbiAgdmlzaWJpbGl0eT86IHN0cmluZztcclxuICB3ZWlnaHQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mb1dpbmRvdyBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0cz86IEluZm9XaW5kb3dPcHRpb25zKTogdm9pZDtcclxuICBjbG9zZSgpOiB2b2lkO1xyXG4gIGdldENvbnRlbnQoKTogc3RyaW5nfE5vZGU7XHJcbiAgZ2V0UG9zaXRpb24oKTogTGF0TG5nO1xyXG4gIGdldFpJbmRleCgpOiBudW1iZXI7XHJcbiAgb3BlbihtYXA/OiBHb29nbGVNYXAsIGFuY2hvcj86IE1WQ09iamVjdCk6IHZvaWQ7XHJcbiAgc2V0Q29udGVudChjb250ZW50OiBzdHJpbmd8Tm9kZSk6IHZvaWQ7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBJbmZvV2luZG93T3B0aW9ucyk6IHZvaWQ7XHJcbiAgc2V0UG9zaXRpb24ocG9zaXRpb246IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcclxuICBzZXRaSW5kZXgoekluZGV4OiBudW1iZXIpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1WQ09iamVjdCB7IGFkZExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IE1hcHNFdmVudExpc3RlbmVyOyB9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcHNFdmVudExpc3RlbmVyIHsgcmVtb3ZlKCk6IHZvaWQ7IH1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2l6ZSB7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgd2lkdGhVbml0Pzogc3RyaW5nLCBoZWlnaHRVbml0Pzogc3RyaW5nKTogdm9pZDtcclxuICBlcXVhbHMob3RoZXI6IFNpemUpOiBib29sZWFuO1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbmZvV2luZG93T3B0aW9ucyB7XHJcbiAgY29udGVudD86IHN0cmluZ3xOb2RlO1xyXG4gIGRpc2FibGVBdXRvUGFuPzogYm9vbGVhbjtcclxuICBtYXhXaWR0aD86IG51bWJlcjtcclxuICBwaXhlbE9mZnNldD86IFNpemU7XHJcbiAgcG9zaXRpb24/OiBMYXRMbmd8TGF0TG5nTGl0ZXJhbDtcclxuICB6SW5kZXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgZXF1YWxzKG90aGVyOiBQb2ludCk6IGJvb2xlYW47XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZVN5bWJvbCB7XHJcbiAgYW5jaG9yPzogUG9pbnQ7XHJcbiAgZmlsbENvbG9yPzogc3RyaW5nO1xyXG4gIGZpbGxPcGFjaXR5Pzogc3RyaW5nO1xyXG4gIGxhYmVsT3JpZ2luPzogUG9pbnQ7XHJcbiAgcGF0aD86IHN0cmluZztcclxuICByb3RhdGlvbj86IG51bWJlcjtcclxuICBzY2FsZT86IG51bWJlcjtcclxuICBzdHJva2VDb2xvcj86IHN0cmluZztcclxuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHN0cm9rZVdlaWdodD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJY29uU2VxdWVuY2Uge1xyXG4gIGZpeGVkUm90YXRpb24/OiBib29sZWFuO1xyXG4gIGljb24/OiBHb29nbGVTeW1ib2w7XHJcbiAgb2Zmc2V0Pzogc3RyaW5nO1xyXG4gIHJlcGVhdD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb2x5bGluZU9wdGlvbnMge1xyXG4gIGNsaWNrYWJsZT86IGJvb2xlYW47XHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuICBlZGl0YWJsZT86IGJvb2xlYW47XHJcbiAgZ2VvZGVzaWM/OiBib29sZWFuO1xyXG4gIGljb24/OiBBcnJheTxJY29uU2VxdWVuY2U+O1xyXG4gIG1hcD86IEdvb2dsZU1hcDtcclxuICBwYXRoPzogQXJyYXk8TGF0TG5nPnxBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD47XHJcbiAgc3Ryb2tlQ29sb3I/OiBzdHJpbmc7XHJcbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcclxuICBzdHJva2VXZWlnaHQ/OiBudW1iZXI7XHJcbiAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlsaW5lIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBnZXREcmFnZ2FibGUoKTogYm9vbGVhbjtcclxuICBnZXRFZGl0YWJsZSgpOiBib29sZWFuO1xyXG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XHJcbiAgZ2V0UGF0aCgpOiBBcnJheTxMYXRMbmc+O1xyXG4gIGdldFZpc2libGUoKTogYm9vbGVhbjtcclxuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcclxuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBvbHlsaW5lT3B0aW9ucyk6IHZvaWQ7XHJcbiAgc2V0UGF0aChwYXRoOiBBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD4pOiB2b2lkO1xyXG4gIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQb2x5TW91c2VFdmVudCBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciB0cmlnZ2VycyBtb3VzZSBldmVudHMgb24gYSBwb2x5bGluZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9seU1vdXNlRXZlbnQgZXh0ZW5kcyBNb3VzZUV2ZW50IHtcclxuICBlZGdlOiBudW1iZXI7XHJcbiAgcGF0aDogbnVtYmVyO1xyXG4gIHZlcnRleDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlnb25PcHRpb25zIHtcclxuICBjbGlja2FibGU/OiBib29sZWFuO1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgZWRpdGFibGU/OiBib29sZWFuO1xyXG4gIGZpbGxDb2xvcj86IHN0cmluZztcclxuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcclxuICBnZW9kZXNpYz86IGJvb2xlYW47XHJcbiAgaWNvbj86IEFycmF5PEljb25TZXF1ZW5jZT47XHJcbiAgbWFwPzogR29vZ2xlTWFwO1xyXG4gIHBhdGhzPzogQXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+fEFycmF5PEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPj47XHJcbiAgc3Ryb2tlQ29sb3I/OiBzdHJpbmc7XHJcbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcclxuICBzdHJva2VXZWlnaHQ/OiBudW1iZXI7XHJcbiAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlnb24gZXh0ZW5kcyBNVkNPYmplY3Qge1xyXG4gIHpJbmRleDogbnVtYmVyO1xyXG4gIGdldERyYWdnYWJsZSgpOiBib29sZWFuO1xyXG4gIGdldEVkaXRhYmxlKCk6IGJvb2xlYW47XHJcbiAgZ2V0TWFwKCk6IEdvb2dsZU1hcDtcclxuICBnZXRQYXRoKCk6IEFycmF5PExhdExuZz47XHJcbiAgZ2V0UGF0aHMoKTogQXJyYXk8QXJyYXk8TGF0TG5nPj47XHJcbiAgZ2V0VmlzaWJsZSgpOiBib29sZWFuO1xyXG4gIHNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xyXG4gIHNldFBhdGgocGF0aDogQXJyYXk8TGF0TG5nPnxBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD4pOiB2b2lkO1xyXG4gIHNldE9wdGlvbnMob3B0aW9uczogUG9seWdvbk9wdGlvbnMpOiB2b2lkO1xyXG4gIHNldFBhdGhzKHBhdGhzOiBBcnJheTxBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD4+fEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPik6IHZvaWQ7XHJcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLbWxMYXllciBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgZ2V0RGVmYXVsdFZpZXdwb3J0KCk6IExhdExuZ0JvdW5kcztcclxuICBnZXRNYXAoKTogR29vZ2xlTWFwO1xyXG4gIGdldE1ldGFkYXRhKCk6IEttbExheWVyTWV0YWRhdGE7XHJcbiAgZ2V0U3RhdHVzKCk6IEttbExheWVyU3RhdHVzO1xyXG4gIGdldFVybCgpOiBzdHJpbmc7XHJcbiAgZ2V0WkluZGV4KCk6IG51bWJlcjtcclxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xyXG4gIHNldE9wdGlvbnMob3B0aW9uczogS21sTGF5ZXJPcHRpb25zKTogdm9pZDtcclxuICBzZXRVcmwodXJsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNldFpJbmRleCh6SW5kZXg6IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L3JlZmVyZW5jZT9obD1kZSNLbWxMYXllclN0YXR1c1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgS21sTGF5ZXJTdGF0dXMgPSAnRE9DVU1FTlRfTk9UX0ZPVU5EJyB8XHJcbiAgICAnRE9DVU1FTlRfVE9PX0xBUkdFJyB8ICdGRVRDSF9FUlJPUicgfCAnSU5WQUxJRF9ET0NVTUVOVCcgfCAnSU5WQUxJRF9SRVFVRVNUJyB8XHJcbiAgICAnTElNSVRTX0VYQ0VFREVEJyB8ICdPSycgfCAnVElNRURfT1VUJyB8ICdVTktOT1dOJztcclxuXHJcbi8qKlxyXG4gKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L3JlZmVyZW5jZT9obD1kZSNLbWxMYXllck1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEttbExheWVyTWV0YWRhdGEge1xyXG4gIGF1dGhvcjogS21sQXV0aG9yO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgaGFzU2NyZWVuT3ZlcmxheXM6IGJvb2xlYW47XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHNuaXBwZXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLbWxBdXRob3Ige1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHVyaTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEttbExheWVyT3B0aW9ucyB7XHJcbiAgY2xpY2thYmxlPzogYm9vbGVhbjtcclxuICBtYXA/OiBHb29nbGVNYXA7XHJcbiAgcHJlc2VydmVWaWV3cG9ydD86IGJvb2xlYW47XHJcbiAgc2NyZWVuT3ZlcmxheXM/OiBib29sZWFuO1xyXG4gIHN1cHByZXNzSW5mb1dpbmRvd3M/OiBib29sZWFuO1xyXG4gIHVybD86IHN0cmluZztcclxuICB6SW5kZXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS21sRmVhdHVyZURhdGEge1xyXG4gIGF1dGhvcjogS21sQXV0aG9yO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICBpbmZvV2luZG93SHRtbDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzbmlwcGV0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS21sTW91c2VFdmVudCBleHRlbmRzIE1vdXNlRXZlbnQge1xyXG4gIGZlYXR1cmVEYXRhOiBLbWxGZWF0dXJlRGF0YTtcclxuICBwaXhlbE9mZnNldDogU2l6ZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBmZWF0dXJlczogRmVhdHVyZVtdO1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBEYXRhT3B0aW9ucyk6IHZvaWQ7XHJcbiAgYWRkR2VvSnNvbihnZW9Kc29uOiBPYmplY3QsIG9wdGlvbnM/OiBHZW9Kc29uT3B0aW9ucyk6IEZlYXR1cmVbXTtcclxuICByZW1vdmUoZmVhdHVyZTogRmVhdHVyZSk6IHZvaWQ7XHJcbiAgc2V0Q29udHJvbFBvc2l0aW9uKGNvbnRyb2xQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uKTogdm9pZDtcclxuICBzZXRDb250cm9scyhjb250cm9sczogc3RyaW5nW10pOiB2b2lkO1xyXG4gIHNldERyYXdpbmdNb2RlKGRyYXdpbmdNb2RlOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XHJcbiAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAvKlxyXG4gICogVHNsaW50IGNvbmZpZ3VyYXRpb24gY2hlY2stcGFyYW1ldGVycyB3aWxsIHByb21wdCBlcnJvcnMgZm9yIHRoZXNlIGxpbmVzIG9mIGNvZGUuXHJcbiAgKiBodHRwczovL3BhbGFudGlyLmdpdGh1Yi5pby90c2xpbnQvcnVsZXMvbm8tdW51c2VkLXZhcmlhYmxlL1xyXG4gICovXHJcbiAgc2V0U3R5bGUoc3R5bGU6ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gIGZvckVhY2goY2FsbGJhY2s6IChmZWF0dXJlOiBGZWF0dXJlKSA9PiB2b2lkKTogdm9pZDtcclxuICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmVhdHVyZSBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgaWQ/OiBudW1iZXJ8c3RyaW5nfHVuZGVmaW5lZDtcclxuICBnZW9tZXRyeTogR2VvbWV0cnk7XHJcbiAgcHJvcGVydGllczogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGFPcHRpb25zIHtcclxuICBjb250cm9sUG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XHJcbiAgY29udHJvbHM/OiBzdHJpbmdbXTtcclxuICBkcmF3aW5nTW9kZT86IHN0cmluZztcclxuICBmZWF0dXJlRmFjdG9yeT86IChnZW9tZXRyeTogR2VvbWV0cnkpID0+IEZlYXR1cmU7XHJcbiAgbWFwPzogR29vZ2xlTWFwO1xyXG4gIHN0eWxlPzogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhTW91c2VFdmVudCBleHRlbmRzIE1vdXNlRXZlbnQge1xyXG4gIGZlYXR1cmU6IEZlYXR1cmU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2VvSnNvbk9wdGlvbnMge1xyXG4gIGlkUHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2VvbWV0cnkge1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIElkZW50aWZpZXJzIHVzZWQgdG8gc3BlY2lmeSB0aGUgcGxhY2VtZW50IG9mIGNvbnRyb2xzIG9uIHRoZSBtYXAuIENvbnRyb2xzIGFyZVxyXG4gKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIG90aGVyIGNvbnRyb2xzIGluIHRoZSBzYW1lIGxheW91dCBwb3NpdGlvbi4gQ29udHJvbHMgdGhhdFxyXG4gKiBhcmUgYWRkZWQgZmlyc3QgYXJlIHBvc2l0aW9uZWQgY2xvc2VyIHRvIHRoZSBlZGdlIG9mIHRoZSBtYXAuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBDb250cm9sUG9zaXRpb24ge1xyXG4gIEJPVFRPTV9DRU5URVIsXHJcbiAgQk9UVE9NX0xFRlQsXHJcbiAgQk9UVE9NX1JJR0hULFxyXG4gIExFRlRfQk9UVE9NLFxyXG4gIExFRlRfQ0VOVEVSLFxyXG4gIExFRlRfVE9QLFxyXG4gIFJJR0hUX0JPVFRPTSxcclxuICBSSUdIVF9DRU5URVIsXHJcbiAgUklHSFRfVE9QLFxyXG4gIFRPUF9DRU5URVIsXHJcbiAgVE9QX0xFRlQsXHJcbiAgVE9QX1JJR0hUXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1hcFR5cGVJZCB7XHJcbiAgLyoqIFRoaXMgbWFwIHR5cGUgZGlzcGxheXMgYSB0cmFuc3BhcmVudCBsYXllciBvZiBtYWpvciBzdHJlZXRzIG9uIHNhdGVsbGl0ZSBpbWFnZXMuICovXHJcbiAgaHlicmlkLFxyXG4gIC8qKiBUaGlzIG1hcCB0eXBlIGRpc3BsYXlzIGEgbm9ybWFsIHN0cmVldCBtYXAuICovXHJcbiAgcm9hZG1hcCxcclxuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBzYXRlbGxpdGUgaW1hZ2VzLiAqL1xyXG4gIHNhdGVsbGl0ZSxcclxuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBtYXBzIHdpdGggcGh5c2ljYWwgZmVhdHVyZXMgc3VjaCBhcyB0ZXJyYWluIGFuZCB2ZWdldGF0aW9uLiAqL1xyXG4gIHRlcnJhaW5cclxufVxyXG5cclxuLyoqKioqIENvbnRyb2xzICoqKioqL1xyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgbWFwIHR5cGUgY29udHJvbC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNYXBUeXBlQ29udHJvbE9wdGlvbnMge1xyXG4gIC8qKiBJRHMgb2YgbWFwIHR5cGVzIHRvIHNob3cgaW4gdGhlIGNvbnRyb2wuICovXHJcbiAgbWFwVHlwZUlkcz86IChNYXBUeXBlSWR8c3RyaW5nKVtdO1xyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXHJcbiAgICogVGhlIGRlZmF1bHQgcG9zaXRpb24gaXMgVE9QX1JJR0hULlxyXG4gICAqL1xyXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xyXG4gIC8qKiBTdHlsZSBpZC4gVXNlZCB0byBzZWxlY3Qgd2hhdCBzdHlsZSBvZiBtYXAgdHlwZSBjb250cm9sIHRvIGRpc3BsYXkuICovXHJcbiAgc3R5bGU/OiBNYXBUeXBlQ29udHJvbFN0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNYXBUeXBlQ29udHJvbFN0eWxlIHtcclxuICBERUZBVUxULFxyXG4gIERST1BET1dOX01FTlUsXHJcbiAgSE9SSVpPTlRBTF9CQVJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPdmVydmlld01hcENvbnRyb2xPcHRpb25zIHtcclxuICBvcGVuZWQ/OiBib29sZWFuO1xyXG59XHJcblxyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgcGFuIGNvbnRyb2wuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFuQ29udHJvbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXHJcbiAgICogVGhlIGRlZmF1bHQgcG9zaXRpb24gaXMgVE9QX0xFRlQuXHJcbiAgICovXHJcbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XHJcbn1cclxuXHJcbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSByb3RhdGUgY29udHJvbC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSb3RhdGVDb250cm9sT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cclxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBUT1BfTEVGVC5cclxuICAgKi9cclxuICBwb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvbjtcclxufVxyXG5cclxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIHNjYWxlIGNvbnRyb2wuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2NhbGVDb250cm9sT3B0aW9ucyB7XHJcbiAgLyoqIFN0eWxlIGlkLiBVc2VkIHRvIHNlbGVjdCB3aGF0IHN0eWxlIG9mIHNjYWxlIGNvbnRyb2wgdG8gZGlzcGxheS4gKi9cclxuICBzdHlsZT86IFNjYWxlQ29udHJvbFN0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBTY2FsZUNvbnRyb2xTdHlsZSB7XHJcbiAgREVGQVVMVFxyXG59XHJcblxyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgU3RyZWV0IFZpZXcgcGVnbWFuIGNvbnRyb2wgb24gdGhlIG1hcC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuIFRoZVxyXG4gICAqIGRlZmF1bHQgcG9zaXRpb24gaXMgZW1iZWRkZWQgd2l0aGluIHRoZSBuYXZpZ2F0aW9uICh6b29tIGFuZCBwYW4pIGNvbnRyb2xzLlxyXG4gICAqIElmIHRoaXMgcG9zaXRpb24gaXMgZW1wdHkgb3IgdGhlIHNhbWUgYXMgdGhhdCBzcGVjaWZpZWQgaW4gdGhlXHJcbiAgICogem9vbUNvbnRyb2xPcHRpb25zIG9yIHBhbkNvbnRyb2xPcHRpb25zLCB0aGUgU3RyZWV0IFZpZXcgY29udHJvbCB3aWxsIGJlXHJcbiAgICogZGlzcGxheWVkIGFzIHBhcnQgb2YgdGhlIG5hdmlnYXRpb24gY29udHJvbHMuIE90aGVyd2lzZSwgaXQgd2lsbCBiZSBkaXNwbGF5ZWRcclxuICAgKiBzZXBhcmF0ZWx5LlxyXG4gICAqL1xyXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xyXG59XHJcblxyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgem9vbSBjb250cm9sLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFpvb21Db250cm9sT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cclxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBUT1BfTEVGVC5cclxuICAgKi9cclxuICBwb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvbjtcclxuICBzdHlsZT86IFpvb21Db250cm9sU3R5bGU7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFpvb21Db250cm9sU3R5bGUge1xyXG4gIERFRkFVTFQsXHJcbiAgTEFSR0UsXHJcbiAgU01BTExcclxufVxyXG5cclxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIGZ1bGxzY3JlZW4gY29udHJvbC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXHJcbiAgICogVGhlIGRlZmF1bHQgcG9zaXRpb24gaXMgUklHSFRfVE9QLlxyXG4gICAqL1xyXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBPdmVybGF5VmlldyB7XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBhbnk7XHJcbiAgICBwdWJsaWMgc2V0VmFsdWVzKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBwdWJsaWMgZ2V0UGFuZXMoKTogYW55O1xyXG4gICAgcHVibGljIGdldFByb2plY3Rpb24oKTogYW55O1xyXG4gICAgcHVibGljIGdldE1hcCgpOiBHb29nbGVNYXA7XHJcbn1cclxuIl19