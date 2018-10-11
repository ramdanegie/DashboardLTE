/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
/** @enum {number} */
const ScriptProtocol = {
    HTTP: 0,
    HTTPS: 1,
    AUTO: 2,
};
export { ScriptProtocol };
ScriptProtocol[ScriptProtocol.HTTP] = "HTTP";
ScriptProtocol[ScriptProtocol.HTTPS] = "HTTPS";
ScriptProtocol[ScriptProtocol.AUTO] = "AUTO";
/**
 * Bing Maps V8 specific loader configuration to be used with the {\@link GoogleMapAPILoader}
 *
 * @export
 */
export class GoogleMapAPILoaderConfig {
}
GoogleMapAPILoaderConfig.decorators = [
    { type: Injectable },
];
function GoogleMapAPILoaderConfig_tsickle_Closure_declarations() {
    /**
     * The Google Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiKey;
    /**
     * The Google Maps client ID (for premium plans).
     * When you have a Google Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Google Maps API will fail to load if both a client ID and an API key are included.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clientId;
    /**
     * The Google Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.channel;
    /**
     * Google Maps API version.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiVersion;
    /**
     * Host and Path used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.hostAndPath;
    /**
     * Protocol used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.protocol;
    /**
     * Defines which Google Maps libraries should get loaded.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.libraries;
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.region;
    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.language;
    /**
     * The Google Maps API requires a separate library for clustering. Set the property
     * to true in order to load this library.
     * See https://developers.google.com/maps/documentation/javascript/marker-clustering
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.enableClustering;
    /**
     * Host and Path used for the cluster library `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clusterHostAndPath;
}
/**
 * Default loader configuration.
 */
const /** @type {?} */ DEFAULT_CONFIGURATION = new GoogleMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
export class GoogleMapAPILoader extends MapAPILoader {
    /**
     * Creates an instance of GoogleMapAPILoader.
     * \@memberof GoogleMapAPILoader
     * @param {?} _config - The loader configuration.
     * @param {?} _windowRef - An instance of {\@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param {?} _documentRef - An instance of {\@link DocumentRef}.
     *                                     Necessary because Bing Map V8 interacts with the document object.
     */
    constructor(_config, _windowRef, _documentRef) {
        super();
        this._config = _config;
        this._windowRef = _windowRef;
        this._documentRef = _documentRef;
        if (this._config === null || this._config === undefined) {
            this._config = DEFAULT_CONFIGURATION;
        }
    }
    /**
     * Gets the loader configuration.
     *
     * \@readonly
     * \@memberof GoogleMapAPILoader
     * @return {?}
     */
    get Config() { return this._config; }
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof GoogleMapAPILoader
     * @return {?}
     */
    Load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        const /** @type {?} */ script = this._documentRef.GetNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const /** @type {?} */ callbackName = `Create`;
        script.src = this.GetMapsScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            (/** @type {?} */ (this._windowRef.GetNativeWindow()))[callbackName] = () => {
                if (this._config.enableClustering) {
                    // if clustering is enabled then delay the loading until after the cluster library is loaded
                    const /** @type {?} */ clusterScript = this._documentRef.GetNativeDocument().createElement('script');
                    clusterScript.type = 'text/javascript';
                    clusterScript.src = this.GetClusterScriptSrc();
                    clusterScript.onload = clusterScript.onreadystatechange = () => {
                        resolve();
                    };
                    this._documentRef.GetNativeDocument().head.appendChild(clusterScript);
                }
                else {
                    resolve();
                }
            };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    }
    /**
     * Gets the Google Maps scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Google Maps scripts are loaded.
     * @return {?} - The url to be used to load the Google Map scripts.
     *
     */
    GetMapsScriptSrc(callbackName) {
        const /** @type {?} */ hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const /** @type {?} */ queryParams = {
            v: this._config.apiVersion,
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        return this.GetScriptSrc(hostAndPath, queryParams);
    }
    /**
     * Gets the Google Maps Cluster library url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @return {?} - The url to be used to load the Google Map Cluster library.
     *
     */
    GetClusterScriptSrc() {
        const /** @type {?} */ hostAndPath = this._config.clusterHostAndPath ||
            'developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
        return this.GetScriptSrc(hostAndPath, {});
    }
    /**
     * Gets a scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} hostAndPath - Host and path name of the script to load.
     * @param {?} queryParams - Url query parameters.
     * @return {?} - The url with correct protocol, path, and query parameters.
     *
     */
    GetScriptSrc(hostAndPath, queryParams) {
        const /** @type {?} */ protocolType = /** @type {?} */ (((this._config && this._config.protocol) || ScriptProtocol.HTTPS));
        let /** @type {?} */ protocol;
        switch (protocolType) {
            case ScriptProtocol.AUTO:
                protocol = '';
                break;
            case ScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case ScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const /** @type {?} */ params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            const /** @type {?} */ i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
GoogleMapAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapAPILoader.ctorParameters = () => [
    { type: GoogleMapAPILoaderConfig, decorators: [{ type: Optional }] },
    { type: WindowRef },
    { type: DocumentRef }
];
function GoogleMapAPILoader_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    GoogleMapAPILoader.prototype._config;
    /** @type {?} */
    GoogleMapAPILoader.prototype._windowRef;
    /** @type {?} */
    GoogleMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CdkUsTUFBTTs7O1lBREwsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJFWCx1QkFBTSxxQkFBcUIsR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7Ozs7OztBQVE3RCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7Ozs7Ozs7OztJQTJCaEQsWUFBaUMsT0FBaUMsRUFBVSxVQUFxQixFQUFVLFlBQXlCO1FBQ2hJLEtBQUssRUFBRSxDQUFDO1FBRHFCLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBRWhJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1NBQ3hDO0tBQ0o7Ozs7Ozs7O1FBZlUsTUFBTSxLQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztJQTBCN0QsSUFBSTtRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7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Q3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDekM7WUFDRCxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUM1QyxDQUFDO2FBQ0QsR0FBRyxDQUFDLENBQUMsS0FBcUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3pGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsR0FBRyxRQUFRLEtBQUssV0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDOzs7O1lBbEt0RCxVQUFVOzs7O1lBNEJtQyx3QkFBd0IsdUJBQXBELFFBQVE7WUFqSUgsU0FBUztZQUFFLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBBUElMb2FkZXIsIFdpbmRvd1JlZiwgRG9jdW1lbnRSZWYgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xyXG5cclxuLyoqXHJcbiAqIFByb3RvY29sIGVudW1lcmF0aW9uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBlbnVtIFNjcmlwdFByb3RvY29sIHtcclxuICAgIEhUVFAsXHJcbiAgICBIVFRQUyxcclxuICAgIEFVVE9cclxufVxyXG5cclxuLyoqXHJcbiAqIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBsb2FkZXIgY29uZmlndXJhdGlvbiB0byBiZSB1c2VkIHdpdGggdGhlIHtAbGluayBHb29nbGVNYXBBUElMb2FkZXJ9XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB7XHJcbiAgICAvKipcclxuICAgICAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSBLZXkgKHNlZTpcclxuICAgICAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvZ2V0LWFwaS1rZXkpXHJcbiAgICAgICAqL1xyXG4gICAgYXBpS2V5Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIGNsaWVudCBJRCAoZm9yIHByZW1pdW0gcGxhbnMpLlxyXG4gICAgICogV2hlbiB5b3UgaGF2ZSBhIEdvb2dsZSBNYXBzIEFQSXMgUHJlbWl1bSBQbGFuIGxpY2Vuc2UsIHlvdSBtdXN0IGF1dGhlbnRpY2F0ZVxyXG4gICAgICogeW91ciBhcHBsaWNhdGlvbiB3aXRoIGVpdGhlciBhbiBBUEkga2V5IG9yIGEgY2xpZW50IElELlxyXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSB3aWxsIGZhaWwgdG8gbG9hZCBpZiBib3RoIGEgY2xpZW50IElEIGFuZCBhbiBBUEkga2V5IGFyZSBpbmNsdWRlZC5cclxuICAgICAqL1xyXG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgY2hhbm5lbCBuYW1lIChmb3IgcHJlbWl1bSBwbGFucykuXHJcbiAgICAgKiBBIGNoYW5uZWwgcGFyYW1ldGVyIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGFsbG93cyB5b3UgdG8gdHJhY2sgdXNhZ2UgdW5kZXIgeW91ciBjbGllbnRcclxuICAgICAqIElEIGJ5IGFzc2lnbmluZyBhIGRpc3RpbmN0IGNoYW5uZWwgdG8gZWFjaCBvZiB5b3VyIGFwcGxpY2F0aW9ucy5cclxuICAgICAqL1xyXG4gICAgY2hhbm5lbD86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdvb2dsZSBNYXBzIEFQSSB2ZXJzaW9uLlxyXG4gICAgICovXHJcbiAgICBhcGlWZXJzaW9uPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9zdCBhbmQgUGF0aCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXHJcbiAgICAgKi9cclxuICAgIGhvc3RBbmRQYXRoPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdG9jb2wgdXNlZCBmb3IgdGhlIGA8c2NyaXB0PmAgdGFnLlxyXG4gICAgICovXHJcbiAgICBwcm90b2NvbD86IFNjcmlwdFByb3RvY29sO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGljaCBHb29nbGUgTWFwcyBsaWJyYXJpZXMgc2hvdWxkIGdldCBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGxpYnJhcmllcz86IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlZmF1bHQgYmlhcyBmb3IgdGhlIG1hcCBiZWhhdmlvciBpcyBVUy5cclxuICAgICAqIElmIHlvdSB3aXNoIHRvIGFsdGVyIHlvdXIgYXBwbGljYXRpb24gdG8gc2VydmUgZGlmZmVyZW50IG1hcCB0aWxlcyBvciBiaWFzIHRoZVxyXG4gICAgICogYXBwbGljYXRpb24sIHlvdSBjYW4gb3ZlcndyaXRlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIChVUykgYnkgZGVmaW5pbmcgYSBgcmVnaW9uYC5cclxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9iYXNpY3MjUmVnaW9uXHJcbiAgICAgKi9cclxuICAgIHJlZ2lvbj86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgdXNlcyB0aGUgYnJvd3NlcidzIHByZWZlcnJlZCBsYW5ndWFnZSB3aGVuIGRpc3BsYXlpbmdcclxuICAgICAqIHRleHR1YWwgaW5mb3JtYXRpb24uIElmIHlvdSB3aXNoIHRvIG92ZXJ3cml0ZSB0aGlzIGJlaGF2aW9yIGFuZCBmb3JjZSB0aGUgQVBJXHJcbiAgICAgKiB0byB1c2UgYSBnaXZlbiBsYW5ndWFnZSwgeW91IGNhbiB1c2UgdGhpcyBzZXR0aW5nLlxyXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2Jhc2ljcyNMYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBsYW5ndWFnZT86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgcmVxdWlyZXMgYSBzZXBhcmF0ZSBsaWJyYXJ5IGZvciBjbHVzdGVyaW5nLiBTZXQgdGhlIHByb3BlcnR5XHJcbiAgICAgKiB0byB0cnVlIGluIG9yZGVyIHRvIGxvYWQgdGhpcyBsaWJyYXJ5LlxyXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L21hcmtlci1jbHVzdGVyaW5nXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUNsdXN0ZXJpbmc/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9zdCBhbmQgUGF0aCB1c2VkIGZvciB0aGUgY2x1c3RlciBsaWJyYXJ5IGA8c2NyaXB0PmAgdGFnLlxyXG4gICAgICovXHJcbiAgICBjbHVzdGVySG9zdEFuZFBhdGg/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IGxvYWRlciBjb25maWd1cmF0aW9uLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9DT05GSUdVUkFUSU9OID0gbmV3IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZygpO1xyXG5cclxuLyoqXHJcbiAqIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHtAbGluayBNYXBBUElMb2FkZXJ9IHNlcnZpY2UuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcEFQSUxvYWRlciBleHRlbmRzIE1hcEFQSUxvYWRlciB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVmaW50aXRpb25zLlxyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9zY3JpcHRMb2FkaW5nUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnMuXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENvbmZpZygpOiBHb29nbGVNYXBBUElMb2FkZXJDb25maWcgeyByZXR1cm4gdGhpcy5fY29uZmlnOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZU1hcEFQSUxvYWRlci5cclxuICAgICAqIEBwYXJhbSBfY29uZmlnIC0gVGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxyXG4gICAgICogQHBhcmFtIF93aW5kb3dSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgV2luZG93UmVmfS4gTmVjZXNzYXJ5IGJlY2F1c2UgQmluZyBNYXAgVjggaW50ZXJhY3RzIHdpdGggdGhlIHdpbmRvdyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gX2RvY3VtZW50UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIERvY3VtZW50UmVmfS5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSBkb2N1bWVudCBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBwcml2YXRlIF9jb25maWc6IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZywgcHJpdmF0ZSBfd2luZG93UmVmOiBXaW5kb3dSZWYsIHByaXZhdGUgX2RvY3VtZW50UmVmOiBEb2N1bWVudFJlZikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZyA9PT0gbnVsbCB8fCB0aGlzLl9jb25maWcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSBERUZBVUxUX0NPTkZJR1VSQVRJT047XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBBUElMb2FkZXIgaW1wbGVtZW50YXRpb24uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBuZWNlc3NhcnkgcmVzb3VyY2VzIGZvciBCaW5nIE1hcHMgVjguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBjYWxsYmFja05hbWUgPSBgQ3JlYXRlYDtcclxuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5HZXRNYXBzU2NyaXB0U3JjKGNhbGxiYWNrTmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuX3dpbmRvd1JlZi5HZXROYXRpdmVXaW5kb3coKSlbY2FsbGJhY2tOYW1lXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuZW5hYmxlQ2x1c3RlcmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGNsdXN0ZXJpbmcgaXMgZW5hYmxlZCB0aGVuIGRlbGF5IHRoZSBsb2FkaW5nIHVudGlsIGFmdGVyIHRoZSBjbHVzdGVyIGxpYnJhcnkgaXMgbG9hZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2x1c3RlclNjcmlwdCA9IHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNjcmlwdC5zcmMgPSB0aGlzLkdldENsdXN0ZXJTY3JpcHRTcmMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyU2NyaXB0Lm9ubG9hZCA9IGNsdXN0ZXJTY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmhlYWQuYXBwZW5kQ2hpbGQoY2x1c3RlclNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoZXJyb3I6IEV2ZW50KSA9PiB7IHJlamVjdChlcnJvcik7IH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIE1hcHMgc2NyaXB0cyB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja05hbWUgLSBOYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgR29vZ2xlIE1hcHMgc2NyaXB0cyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgdXJsIHRvIGJlIHVzZWQgdG8gbG9hZCB0aGUgR29vZ2xlIE1hcCBzY3JpcHRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZXRNYXBzU2NyaXB0U3JjKGNhbGxiYWNrTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaG9zdEFuZFBhdGg6IHN0cmluZyA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCAnbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcyc7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB9ID0ge1xyXG4gICAgICAgICAgICB2OiB0aGlzLl9jb25maWcuYXBpVmVyc2lvbixcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrTmFtZSxcclxuICAgICAgICAgICAga2V5OiB0aGlzLl9jb25maWcuYXBpS2V5LFxyXG4gICAgICAgICAgICBjbGllbnQ6IHRoaXMuX2NvbmZpZy5jbGllbnRJZCxcclxuICAgICAgICAgICAgY2hhbm5lbDogdGhpcy5fY29uZmlnLmNoYW5uZWwsXHJcbiAgICAgICAgICAgIGxpYnJhcmllczogdGhpcy5fY29uZmlnLmxpYnJhcmllcyxcclxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLl9jb25maWcucmVnaW9uLFxyXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5fY29uZmlnLmxhbmd1YWdlXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRTY3JpcHRTcmMoaG9zdEFuZFBhdGgsIHF1ZXJ5UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBNYXBzIENsdXN0ZXIgbGlicmFyeSB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB0byBiZSB1c2VkIHRvIGxvYWQgdGhlIEdvb2dsZSBNYXAgQ2x1c3RlciBsaWJyYXJ5LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZXRDbHVzdGVyU2NyaXB0U3JjKCkge1xyXG4gICAgICAgIGNvbnN0IGhvc3RBbmRQYXRoOiBzdHJpbmcgPSB0aGlzLl9jb25maWcuY2x1c3Rlckhvc3RBbmRQYXRoIHx8XHJcbiAgICAgICAgICAgICdkZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvZXhhbXBsZXMvbWFya2VyY2x1c3RlcmVyL21hcmtlcmNsdXN0ZXJlci5qcyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0U2NyaXB0U3JjKGhvc3RBbmRQYXRoLCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgc2NyaXB0cyB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBob3N0QW5kUGF0aCAtIEhvc3QgYW5kIHBhdGggbmFtZSBvZiB0aGUgc2NyaXB0IHRvIGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXMgLSBVcmwgcXVlcnkgcGFyYW1ldGVycy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB3aXRoIGNvcnJlY3QgcHJvdG9jb2wsIHBhdGgsIGFuZCBxdWVyeSBwYXJhbWV0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZXRTY3JpcHRTcmMoaG9zdEFuZFBhdGg6IHN0cmluZywgcXVlcnlQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB9KTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBwcm90b2NvbFR5cGU6IFNjcmlwdFByb3RvY29sID1cclxuICAgICAgICAgICAgPFNjcmlwdFByb3RvY29sPigodGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5wcm90b2NvbCkgfHwgU2NyaXB0UHJvdG9jb2wuSFRUUFMpO1xyXG4gICAgICAgIGxldCBwcm90b2NvbDogc3RyaW5nO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkFVVE86XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuSFRUUDpcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHA6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFBTOlxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cHM6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zOiBzdHJpbmcgPVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGs6IHN0cmluZykgPT4gcXVlcnlQYXJhbXNba10gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGs6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBhcnJheXNcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmlzQXJyYXkocXVlcnlQYXJhbXNba10pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSAmJiBxdWVyeVBhcmFtc1trXS5sZW5ndGggPiAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKChrOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBqb2luIGFycmF5cyBhcyBjb21tYSBzZXBlcmF0ZWQgc3RyaW5nc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBxdWVyeVBhcmFtc1trXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXk6IGssIHZhbHVlOiBpLmpvaW4oJywnKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXk6IGssIHZhbHVlOiBxdWVyeVBhcmFtc1trXSB9O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKGVudHJ5OiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH0pID0+IHsgcmV0dXJuIGAke2VudHJ5LmtleX09JHtlbnRyeS52YWx1ZX1gOyB9KVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJyYnKTtcclxuICAgICAgICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RBbmRQYXRofT8ke3BhcmFtc31gO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==