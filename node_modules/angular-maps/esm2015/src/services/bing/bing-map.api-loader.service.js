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
 * Bing Maps V8 specific loader configuration to be used with the {\@link BingMapAPILoader}
 *
 * @export
 */
export class BingMapAPILoaderConfig {
    constructor() {
        this.apiKey = '';
        this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
        this.protocol = ScriptProtocol.HTTPS;
        this.branch = '';
    }
}
BingMapAPILoaderConfig.decorators = [
    { type: Injectable },
];
function BingMapAPILoaderConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.apiKey;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.hostAndPath;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.protocol;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.branch;
}
/**
 * Default loader configuration.
 */
const /** @type {?} */ DEFAULT_CONFIGURATION = new BingMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
export class BingMapAPILoader extends MapAPILoader {
    /**
     * Creates an instance of BingMapAPILoader.
     * \@memberof BingMapAPILoader
     * @param {?} _config  - The loader configuration.
     * @param {?} _windowRef - An instance of {\@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param {?} _documentRef - An instance of {\@link DocumentRef}.
     * Necessary because Bing Map V8 interacts with the document object.
     *
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
     * \@memberof BingMapAPILoader
     * @return {?}
     */
    get Config() { return this._config; }
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof BingMapAPILoader
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
        const /** @type {?} */ callbackName = `angular2bingmaps${new Date().getMilliseconds()}`;
        script.src = this.GetScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            (/** @type {?} */ (this._windowRef.GetNativeWindow()))[callbackName] = () => {
                resolve();
            };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    }
    /**
     * Gets the Bing Map V8 scripts url for injections into the header.
     *
     * \@memberof BingMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
     * @return {?} - The url to be used to load the Bing Map scripts.
     *
     */
    GetScriptSrc(callbackName) {
        const /** @type {?} */ protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
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
        const /** @type {?} */ hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
        const /** @type {?} */ queryParams = {
            callback: callbackName
        };
        if (this._config.branch !== '') {
            queryParams['branch'] = this._config.branch;
        }
        const /** @type {?} */ params = Object.keys(queryParams)
            .map((k, i) => {
            let /** @type {?} */ param = (i === 0) ? '?' : '&';
            return param += `${k}=${queryParams[k]}`;
        })
            .join('');
        return `${protocol}//${hostAndPath}${params}`;
    }
}
BingMapAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapAPILoader.ctorParameters = () => [
    { type: BingMapAPILoaderConfig, decorators: [{ type: Optional }] },
    { type: WindowRef },
    { type: DocumentRef }
];
function BingMapAPILoader_tsickle_Closure_declarations() {
    /** @type {?} */
    BingMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    BingMapAPILoader.prototype._config;
    /** @type {?} */
    BingMapAPILoader.prototype._windowRef;
    /** @type {?} */
    BingMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CdkUsTUFBTTs7c0JBS08sRUFBRTsyQkFLRyxrQ0FBa0M7d0JBS3JCLGNBQWMsQ0FBQyxLQUFLO3NCQUt0QyxFQUFFOzs7O1lBckJkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQTJCWCx1QkFBTSxxQkFBcUIsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7Ozs7OztBQVEzRCxNQUFNLHVCQUF3QixTQUFRLFlBQVk7Ozs7Ozs7Ozs7SUE0QjlDLFlBQWlDLE9BQStCLEVBQVUsVUFBcUIsRUFBVSxZQUF5QjtRQUM5SCxLQUFLLEVBQUUsQ0FBQztRQURxQixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUU5SCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUN4QztLQUNKOzs7Ozs7OztRQWhCVSxNQUFNLEtBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0lBMkIzRCxJQUFJO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ3JDO1FBRUQsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUNoQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQix1QkFBTSxZQUFZLEdBQUcsbUJBQW1CLElBQUksSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztRQUN2RSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksT0FBTyxDQUFPLENBQUMsT0FBaUIsRUFBRSxNQUFnQixFQUFFLEVBQUU7WUFDbkYsbUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDMUQsT0FBTyxFQUFFLENBQUM7YUFDYixDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN6RCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDOzs7Ozs7Ozs7O0lBZTlCLFlBQVksQ0FBQyxZQUFvQjtRQUNyQyx1QkFBTSxZQUFZLEdBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUMvRyxxQkFBSSxRQUFnQixDQUFDO1FBRXJCLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxjQUFjLENBQUMsSUFBSTtnQkFDcEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxLQUFLLENBQUM7WUFDVixLQUFLLGNBQWMsQ0FBQyxJQUFJO2dCQUNwQixRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUNuQixLQUFLLENBQUM7WUFDVixLQUFLLGNBQWMsQ0FBQyxLQUFLO2dCQUNyQixRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUNwQixLQUFLLENBQUM7U0FDYjtRQUVELHVCQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxxQkFBcUIsQ0FBQyxXQUFXLENBQUM7UUFDMUYsdUJBQU0sV0FBVyxHQUE4QjtZQUMzQyxRQUFRLEVBQUUsWUFBWTtTQUN6QixDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDL0M7UUFDRCx1QkFBTSxNQUFNLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDMUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO1lBQzFCLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbEMsTUFBTSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUM1QyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsUUFBUSxLQUFLLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQzs7OztZQTVHckQsVUFBVTs7OztZQTZCbUMsc0JBQXNCLHVCQUFsRCxRQUFRO1lBbEZILFNBQVM7WUFBRSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuXHJcbi8qKlxyXG4gKiBQcm90b2NvbCBlbnVtZXJhdGlvblxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBTY3JpcHRQcm90b2NvbCB7XHJcbiAgICBIVFRQLFxyXG4gICAgSFRUUFMsXHJcbiAgICBBVVRPXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5nIE1hcHMgVjggc3BlY2lmaWMgbG9hZGVyIGNvbmZpZ3VyYXRpb24gdG8gYmUgdXNlZCB3aXRoIHRoZSB7QGxpbmsgQmluZ01hcEFQSUxvYWRlcn1cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ01hcEFQSUxvYWRlckNvbmZpZyAge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEFQSSBrZXkgZm9yIGJpbmcgbWFwc1xyXG4gICAgLy8vXHJcbiAgICBhcGlLZXkgPSAnJztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cclxuICAgIC8vL1xyXG4gICAgaG9zdEFuZFBhdGggPSAnd3d3LmJpbmcuY29tL2FwaS9tYXBzL21hcGNvbnRyb2wnO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RvY29sIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cclxuICAgIC8vL1xyXG4gICAgcHJvdG9jb2w6IFNjcmlwdFByb3RvY29sID0gU2NyaXB0UHJvdG9jb2wuSFRUUFM7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gVGhlIGJyYW5jaCB0byBiZSB1c2VkLiBMZWF2ZSBlbXB0eSBmb3IgcHJvZHVjdGlvbi4gVXNlIGV4cGVyaW1lbnRhbFxyXG4gICAgLy8vXHJcbiAgICBicmFuY2ggPSAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUX0NPTkZJR1VSQVRJT04gPSBuZXcgQmluZ01hcEFQSUxvYWRlckNvbmZpZygpO1xyXG5cclxuLyoqXHJcbiAqIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHtAbGluayBNYXBBUElMb2FkZXJ9IHNlcnZpY2UuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdNYXBBUElMb2FkZXIgZXh0ZW5kcyBNYXBBUElMb2FkZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlZmludGl0aW9ucy5cclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfc2NyaXB0TG9hZGluZ1Byb21pc2U6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zLlxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsb2FkZXIgY29uZmlndXJhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ29uZmlnKCk6IEJpbmdNYXBBUElMb2FkZXJDb25maWcgeyByZXR1cm4gdGhpcy5fY29uZmlnOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXBBUElMb2FkZXIuXHJcbiAgICAgKiBAcGFyYW0gX2NvbmZpZyAgLSBUaGUgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gX3dpbmRvd1JlZiAtIEFuIGluc3RhbmNlIG9mIHtAbGluayBXaW5kb3dSZWZ9LiBOZWNlc3NhcnkgYmVjYXVzZSBCaW5nIE1hcCBWOCBpbnRlcmFjdHMgd2l0aCB0aGUgd2luZG93IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBfZG9jdW1lbnRSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgRG9jdW1lbnRSZWZ9LlxyXG4gICAgICogTmVjZXNzYXJ5IGJlY2F1c2UgQmluZyBNYXAgVjggaW50ZXJhY3RzIHdpdGggdGhlIGRvY3VtZW50IG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciggQE9wdGlvbmFsKCkgcHJpdmF0ZSBfY29uZmlnOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnLCBwcml2YXRlIF93aW5kb3dSZWY6IFdpbmRvd1JlZiwgcHJpdmF0ZSBfZG9jdW1lbnRSZWY6IERvY3VtZW50UmVmKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnID09PSBudWxsIHx8IHRoaXMuX2NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IERFRkFVTFRfQ09ORklHVVJBVElPTjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcEFQSUxvYWRlciBpbXBsZW1lbnRhdGlvbi5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIG5lY2Vzc2FyeSByZXNvdXJjZXMgZm9yIEJpbmcgTWFwcyBWOC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBjYWxsYmFja05hbWUgPSBgYW5ndWxhcjJiaW5nbWFwcyR7bmV3IERhdGUoKS5nZXRNaWxsaXNlY29uZHMoKX1gO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSB0aGlzLkdldFNjcmlwdFNyYyhjYWxsYmFja05hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzLl93aW5kb3dSZWYuR2V0TmF0aXZlV2luZG93KCkpW2NhbGxiYWNrTmFtZV0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yOiBFdmVudCkgPT4geyByZWplY3QoZXJyb3IpOyB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgQmluZyBNYXAgVjggc2NyaXB0cyB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja05hbWUgLSBOYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgQmluZyBNYXBzIFY4IHNjcmlwdHMgYXJlIGxvYWRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB0byBiZSB1c2VkIHRvIGxvYWQgdGhlIEJpbmcgTWFwIHNjcmlwdHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBHZXRTY3JpcHRTcmMoY2FsbGJhY2tOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHByb3RvY29sVHlwZTogU2NyaXB0UHJvdG9jb2wgPSAodGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5wcm90b2NvbCkgfHwgREVGQVVMVF9DT05GSUdVUkFUSU9OLnByb3RvY29sO1xyXG4gICAgICAgIGxldCBwcm90b2NvbDogc3RyaW5nO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkFVVE86XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuSFRUUDpcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHA6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFBTOlxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cHM6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaG9zdEFuZFBhdGg6IHN0cmluZyA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCBERUZBVUxUX0NPTkZJR1VSQVRJT04uaG9zdEFuZFBhdGg7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja05hbWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuYnJhbmNoICE9PSAnJykge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtc1snYnJhbmNoJ10gPSB0aGlzLl9jb25maWcuYnJhbmNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAgICAgICAubWFwKChrOiBzdHJpbmcsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtID0gKGkgPT09IDApID8gJz8nIDogJyYnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtICs9IGAke2t9PSR7cXVlcnlQYXJhbXNba119YDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJycpO1xyXG4gICAgICAgIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdEFuZFBhdGh9JHtwYXJhbXN9YDtcclxuICAgIH1cclxufVxyXG4iXX0=