(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Feeds = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pusherPlatform = createCommonjsModule(function (module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
        module.exports = factory();
    })(commonjsGlobal, function () {
        return (/******/function (modules) {
                // webpackBootstrap
                /******/ // The module cache
                /******/var installedModules = {};
                /******/
                /******/ // The require function
                /******/function __webpack_require__(moduleId) {
                    /******/
                    /******/ // Check if module is in cache
                    /******/if (installedModules[moduleId]) {
                        /******/return installedModules[moduleId].exports;
                        /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/var module = installedModules[moduleId] = {
                        /******/i: moduleId,
                        /******/l: false,
                        /******/exports: {}
                        /******/ };
                    /******/
                    /******/ // Execute the module function
                    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/
                    /******/ // Flag the module as loaded
                    /******/module.l = true;
                    /******/
                    /******/ // Return the exports of the module
                    /******/return module.exports;
                    /******/
                }
                /******/
                /******/
                /******/ // expose the modules object (__webpack_modules__)
                /******/__webpack_require__.m = modules;
                /******/
                /******/ // expose the module cache
                /******/__webpack_require__.c = installedModules;
                /******/
                /******/ // identity function for calling harmony imports with the correct context
                /******/__webpack_require__.i = function (value) {
                    return value;
                };
                /******/
                /******/ // define getter function for harmony exports
                /******/__webpack_require__.d = function (exports, name, getter) {
                    /******/if (!__webpack_require__.o(exports, name)) {
                        /******/Object.defineProperty(exports, name, {
                            /******/configurable: false,
                            /******/enumerable: true,
                            /******/get: getter
                            /******/ });
                        /******/
                    }
                    /******/
                };
                /******/
                /******/ // getDefaultExport function for compatibility with non-harmony modules
                /******/__webpack_require__.n = function (module) {
                    /******/var getter = module && module.__esModule ?
                    /******/function getDefault() {
                        return module['default'];
                    } :
                    /******/function getModuleExports() {
                        return module;
                    };
                    /******/__webpack_require__.d(getter, 'a', getter);
                    /******/return getter;
                    /******/
                };
                /******/
                /******/ // Object.prototype.hasOwnProperty.call
                /******/__webpack_require__.o = function (object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                };
                /******/
                /******/ // __webpack_public_path__
                /******/__webpack_require__.p = "";
                /******/
                /******/ // Load entry module and return exports
                /******/return __webpack_require__(__webpack_require__.s = 6);
                /******/
            }(
            /************************************************************************/
            /******/[
            /* 0 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                var __extends = this && this.__extends || function () {
                    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                        d.__proto__ = b;
                    } || function (d, b) {
                        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    };
                    return function (d, b) {
                        extendStatics(d, b);
                        function __() {
                            this.constructor = d;
                        }
                        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                    };
                }();
                Object.defineProperty(exports, "__esModule", { value: true });
                var subscription_1 = __webpack_require__(2);
                var resumable_subscription_1 = __webpack_require__(3);
                function responseHeadersObj(headerStr) {
                    var headers = {};
                    if (!headerStr) {
                        return headers;
                    }
                    var headerPairs = headerStr.split('\u000d\u000a');
                    for (var i = 0; i < headerPairs.length; i++) {
                        var headerPair = headerPairs[i];
                        var index = headerPair.indexOf('\u003a\u0020');
                        if (index > 0) {
                            var key = headerPair.substring(0, index);
                            var val = headerPair.substring(index + 2);
                            headers[key] = val;
                        }
                    }
                    return headers;
                }
                exports.responseHeadersObj = responseHeadersObj;
                var ErrorResponse = function (_super) {
                    __extends(ErrorResponse, _super);
                    function ErrorResponse(statusCode, headers, info) {
                        var _this = _super.call(this, "ErroResponse: " + statusCode + ": " + info + " \n Headers: " + JSON.stringify(headers)) || this;
                        Object.setPrototypeOf(_this, ErrorResponse.prototype);
                        _this.statusCode = statusCode;
                        _this.headers = headers;
                        _this.info = info;
                        return _this;
                    }
                    ErrorResponse.fromXHR = function (xhr) {
                        return new ErrorResponse(xhr.status, responseHeadersObj(xhr.getAllResponseHeaders()), xhr.responseText);
                    };
                    return ErrorResponse;
                }(Error);
                exports.ErrorResponse = ErrorResponse;
                var NetworkError = function (_super) {
                    __extends(NetworkError, _super);
                    function NetworkError(error) {
                        var _this = _super.call(this, error) || this;
                        //TODO: ugly hack to make the instanceof calls work. We might have to find a better solution.
                        Object.setPrototypeOf(_this, NetworkError.prototype);
                        _this.error = error;
                        return _this;
                    }
                    return NetworkError;
                }(Error);
                exports.NetworkError = NetworkError;
                // Follows https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                var XhrReadyState;
                (function (XhrReadyState) {
                    XhrReadyState[XhrReadyState["UNSENT"] = 0] = "UNSENT";
                    XhrReadyState[XhrReadyState["OPENED"] = 1] = "OPENED";
                    XhrReadyState[XhrReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
                    XhrReadyState[XhrReadyState["LOADING"] = 3] = "LOADING";
                    XhrReadyState[XhrReadyState["DONE"] = 4] = "DONE";
                })(XhrReadyState = exports.XhrReadyState || (exports.XhrReadyState = {}));
                var BaseClient = function () {
                    function BaseClient(options) {
                        this.options = options;
                        var host = options.host.replace(/\/$/, '');
                        this.baseURL = (options.encrypted !== false ? "https" : "http") + "://" + host;
                        this.XMLHttpRequest = options.XMLHttpRequest || window.XMLHttpRequest;
                    }
                    BaseClient.prototype.request = function (options) {
                        var xhr = this.createXHR(this.baseURL, options);
                        return new Promise(function (resolve, reject) {
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        resolve(xhr.responseText);
                                    } else {
                                        reject(ErrorResponse.fromXHR(xhr));
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(options.body));
                        });
                    };
                    BaseClient.prototype.newSubscription = function (subOptions) {
                        return new subscription_1.Subscription(this.createXHR(this.baseURL, {
                            method: "SUBSCRIBE",
                            path: subOptions.path,
                            headers: {},
                            body: null
                        }), subOptions);
                    };
                    BaseClient.prototype.newResumableSubscription = function (subOptions) {
                        var _this = this;
                        return new resumable_subscription_1.ResumableSubscription(function () {
                            return _this.createXHR(_this.baseURL, {
                                method: "SUBSCRIBE",
                                path: subOptions.path,
                                headers: {},
                                body: null
                            });
                        }, subOptions);
                    };
                    BaseClient.prototype.createXHR = function (baseURL, options) {
                        var XMLHttpRequest = this.XMLHttpRequest;
                        var xhr = new XMLHttpRequest();
                        var path = options.path.replace(/^\/+/, "");
                        var endpoint = baseURL + "/" + path;
                        xhr.open(options.method.toUpperCase(), endpoint, true);
                        if (options.body) {
                            xhr.setRequestHeader("content-type", "application/json");
                        }
                        if (options.jwt) {
                            xhr.setRequestHeader("authorization", "Bearer " + options.jwt);
                        }
                        for (var key in options.headers) {
                            xhr.setRequestHeader(key, options.headers[key]);
                        }
                        return xhr;
                    };
                    return BaseClient;
                }();
                exports.BaseClient = BaseClient;

                /***/
            },
            /* 1 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var LogLevel;
                (function (LogLevel) {
                    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
                    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
                    LogLevel[LogLevel["INFO"] = 3] = "INFO";
                    LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
                    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
                })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
                /**
                 * Default implementation of the Logger. Wraps standards console calls.
                 * Logs only calls that are at or above the threshold (verbose/debug/info/warn/error)
                 * If error is passed, it will append the message to the error object.
                 */
                var ConsoleLogger = function () {
                    function ConsoleLogger(threshold) {
                        if (threshold === void 0) {
                            threshold = 2;
                        }
                        this.threshold = threshold;
                    }
                    ConsoleLogger.prototype.log = function (logFunction, level, message, error) {
                        if (level >= this.threshold) {
                            var loggerSignature = "Logger." + LogLevel[level];
                            if (error) {
                                console.group();
                                logFunction(loggerSignature + ": " + message);
                                logFunction(error);
                                console.groupEnd();
                            } else {
                                logFunction(loggerSignature + ": " + message);
                            }
                        }
                    };
                    ConsoleLogger.prototype.verbose = function (message, error) {
                        this.log(console.log, LogLevel.VERBOSE, message, error);
                    };
                    ConsoleLogger.prototype.debug = function (message, error) {
                        this.log(console.log, LogLevel.DEBUG, message, error);
                    };
                    ConsoleLogger.prototype.info = function (message, error) {
                        this.log(console.info, LogLevel.INFO, message, error);
                    };
                    ConsoleLogger.prototype.warn = function (message, error) {
                        this.log(console.warn, LogLevel.WARNING, message, error);
                    };
                    ConsoleLogger.prototype.error = function (message, error) {
                        this.log(console.error, LogLevel.ERROR, message, error);
                    };
                    return ConsoleLogger;
                }();
                exports.ConsoleLogger = ConsoleLogger;
                var EmptyLogger = function () {
                    function EmptyLogger() {}
                    EmptyLogger.prototype.verbose = function (message, error) {};
                    
                    EmptyLogger.prototype.debug = function (message, error) {};
                    
                    EmptyLogger.prototype.info = function (message, error) {};
                    
                    EmptyLogger.prototype.warn = function (message, error) {};
                    
                    EmptyLogger.prototype.error = function (message, error) {};
                    
                    return EmptyLogger;
                }();
                exports.EmptyLogger = EmptyLogger;

                /***/
            },
            /* 2 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(0);
                var SubscriptionState;
                (function (SubscriptionState) {
                    SubscriptionState[SubscriptionState["UNOPENED"] = 0] = "UNOPENED";
                    SubscriptionState[SubscriptionState["OPENING"] = 1] = "OPENING";
                    SubscriptionState[SubscriptionState["OPEN"] = 2] = "OPEN";
                    SubscriptionState[SubscriptionState["ENDING"] = 3] = "ENDING";
                    SubscriptionState[SubscriptionState["ENDED"] = 4] = "ENDED"; // called onEnd() or onError(err)
                })(SubscriptionState = exports.SubscriptionState || (exports.SubscriptionState = {}));
                // Asserts that the subscription state is one of the specified values,
                // otherwise logs the current value.
                function assertState(stateEnum, states) {
                    var _this = this;
                    if (states === void 0) {
                        states = [];
                    }
                    var check = states.some(function (state) {
                        return stateEnum[state] === _this.state;
                    });
                    var expected = states.join(', ');
                    var actual = stateEnum[this.state];
                    console.assert(check, "Expected this.state to be " + expected + " but it is " + actual);
                    if (!check) {
                        console.trace();
                    }
                }
                exports.assertState = assertState;
                
                // Callback pattern: (onOpen onEvent* (onEnd|onError)) | onError
                // A call to `unsubscribe()` will call `options.onEnd()`;
                // a call to `unsubscribe(someError)` will call `options.onError(someError)`.
                var Subscription = function () {
                    function Subscription(xhr, options) {
                        var _this = this;
                        this.xhr = xhr;
                        this.options = options;
                        this.state = SubscriptionState.UNOPENED;
                        this.gotEOS = false;
                        this.lastNewlineIndex = 0;
                        this.assertState = assertState.bind(this, SubscriptionState);
                        if (options.lastEventId) {
                            this.xhr.setRequestHeader("Last-Event-Id", options.lastEventId);
                        }
                        this.xhr.onreadystatechange = function () {
                            if (_this.xhr.readyState === base_client_1.XhrReadyState.UNSENT || _this.xhr.readyState === base_client_1.XhrReadyState.OPENED || _this.xhr.readyState === base_client_1.XhrReadyState.HEADERS_RECEIVED) {
                                // Too early for us to do anything.
                                _this.assertState(['OPENING']);
                            } else if (_this.xhr.readyState === base_client_1.XhrReadyState.LOADING) {
                                // The headers have loaded and we have partial body text.
                                // We can get this one multiple times.
                                _this.assertState(['OPENING', 'OPEN', 'ENDING']);
                                if (_this.xhr.status === 200) {
                                    // We've received a successful response header.
                                    // The partial body text is a partial JSON message stream.
                                    if (_this.state === SubscriptionState.OPENING) {
                                        _this.state = SubscriptionState.OPEN;
                                        if (_this.options.onOpen) {
                                            _this.options.onOpen();
                                        }
                                    }
                                    _this.assertState(['OPEN', 'ENDING']);
                                    var err = _this.onChunk(); // might transition our state from OPEN -> ENDING
                                    _this.assertState(['OPEN', 'ENDING']);
                                    if (err != null) {
                                        _this.state = SubscriptionState.ENDED;
                                        if (err.statusCode != 204) {
                                            if (_this.options.onError) {
                                                _this.options.onError(err);
                                            }
                                        }
                                        // Because we abort()ed, we will get no more calls to our onreadystatechange handler,
                                        // and so we will not call the event handler again.
                                        // Finish with options.onError instead of the options.onEnd.
                                    } else {
                                            // We consumed some response text, and all's fine. We expect more text.
                                        }
                                } else {
                                    // Error response. Wait until the response completes (state 4) before erroring.
                                    _this.assertState(['OPENING']);
                                }
                            } else if (_this.xhr.readyState === base_client_1.XhrReadyState.DONE) {
                                // This is the last time onreadystatechange is called.
                                if (_this.xhr.status === 200) {
                                    if (_this.state === SubscriptionState.OPENING) {
                                        _this.state = SubscriptionState.OPEN;
                                        if (_this.options.onOpen) {
                                            _this.options.onOpen();
                                        }
                                    }
                                    _this.assertState(['OPEN', 'ENDING']);
                                    var err = _this.onChunk();
                                    if (err !== null && err !== undefined) {
                                        _this.state = SubscriptionState.ENDED;
                                        if (err.statusCode === 204) {
                                            if (_this.options.onEnd) {
                                                _this.options.onEnd();
                                            }
                                        } else {
                                            if (_this.options.onError) {
                                                _this.options.onError(err);
                                            }
                                        }
                                    } else if (_this.state <= SubscriptionState.ENDING) {
                                        if (_this.options.onError) {
                                            _this.options.onError(new Error("HTTP response ended without receiving EOS message"));
                                        }
                                    } else {
                                        // Stream ended normally.
                                        if (_this.options.onEnd) {
                                            _this.options.onEnd();
                                        }
                                    }
                                } else {
                                    // The server responded with a bad status code (finish with onError).
                                    // Finish with an error.
                                    _this.assertState(['OPENING', 'OPEN', 'ENDED']);
                                    if (_this.state === SubscriptionState.ENDED) {
                                        // We aborted the request deliberately, and called onError/onEnd elsewhere.
                                    } else if (_this.xhr.status === 0) {
                                        _this.options.onError(new base_client_1.NetworkError("Connection lost."));
                                    } else {
                                        _this.options.onError(base_client_1.ErrorResponse.fromXHR(_this.xhr));
                                    }
                                }
                            }
                        };
                    }
                    Subscription.prototype.open = function (jwt) {
                        if (this.state !== SubscriptionState.UNOPENED) {
                            throw new Error("Called .open() on Subscription object in unexpected state: " + this.state);
                        }
                        this.state = SubscriptionState.OPENING;
                        if (jwt) {
                            this.xhr.setRequestHeader("authorization", "Bearer " + jwt);
                        }
                        this.xhr.send();
                    };
                    // calls options.onEvent 0+ times, then possibly returns an error.
                    // idempotent.
                    Subscription.prototype.onChunk = function () {
                        this.assertState(['OPEN']);
                        var response = this.xhr.responseText;
                        var newlineIndex = response.lastIndexOf("\n");
                        if (newlineIndex > this.lastNewlineIndex) {
                            var rawEvents = response.slice(this.lastNewlineIndex, newlineIndex).split("\n");
                            this.lastNewlineIndex = newlineIndex;
                            for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
                                var rawEvent = rawEvents_1[_i];
                                if (rawEvent.length === 0) {
                                    continue; // FIXME why? This should be a protocol error
                                }
                                var data = JSON.parse(rawEvent);
                                var err = this.onMessage(data);
                                if (err != null) {
                                    return err;
                                }
                            }
                        }
                    };
                    // calls options.onEvent 0+ times, then returns an Error or null
                    Subscription.prototype.onMessage = function (message) {
                        this.assertState(['OPEN']);
                        if (this.gotEOS) {
                            return new Error("Got another message after EOS message");
                        }
                        if (!Array.isArray(message)) {
                            return new Error("Message is not an array");
                        }
                        if (message.length < 1) {
                            return new Error("Message is empty array");
                        }
                        switch (message[0]) {
                            case 0:
                                return null;
                            case 1:
                                return this.onEventMessage(message);
                            case 255:
                                return this.onEOSMessage(message);
                            default:
                                return new Error("Unknown Message: " + JSON.stringify(message));
                        }
                    };
                    // EITHER calls options.onEvent, OR returns an error
                    Subscription.prototype.onEventMessage = function (eventMessage) {
                        this.assertState(['OPEN']);
                        if (eventMessage.length !== 4) {
                            return new Error("Event message has " + eventMessage.length + " elements (expected 4)");
                        }
                        var _ = eventMessage[0],
                            id = eventMessage[1],
                            headers = eventMessage[2],
                            body = eventMessage[3];
                        if (typeof id !== "string") {
                            return new Error("Invalid event ID in message: " + JSON.stringify(eventMessage));
                        }
                        if (typeof headers !== "object" || Array.isArray(headers)) {
                            return new Error("Invalid event headers in message: " + JSON.stringify(eventMessage));
                        }
                        if (this.options.onEvent) {
                            this.options.onEvent({ eventId: id, headers: headers, body: body });
                        }
                    };
                    // calls options.onEvent 0+ times, then possibly returns an error
                    Subscription.prototype.onEOSMessage = function (eosMessage) {
                        this.assertState(['OPEN']);
                        if (eosMessage.length !== 4) {
                            return new Error("EOS message has " + eosMessage.length + " elements (expected 4)");
                        }
                        var _ = eosMessage[0],
                            statusCode = eosMessage[1],
                            headers = eosMessage[2],
                            info = eosMessage[3];
                        if (typeof statusCode !== "number") {
                            return new Error("Invalid EOS Status Code");
                        }
                        if (typeof headers !== "object" || Array.isArray(headers)) {
                            return new Error("Invalid EOS Headers");
                        }
                        this.state = SubscriptionState.ENDING;
                        return new base_client_1.ErrorResponse(statusCode, headers, info);
                    };
                    Subscription.prototype.unsubscribe = function (err) {
                        this.state = SubscriptionState.ENDED;
                        this.xhr.abort();
                        if (err) {
                            if (this.options.onError) {
                                this.options.onError(err);
                            }
                        } else {
                            if (this.options.onEnd) {
                                this.options.onEnd();
                            }
                        }
                    };
                    return Subscription;
                }();
                exports.Subscription = Subscription;

                /***/
            },
            /* 3 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var subscription_1 = __webpack_require__(2);
                var retry_strategy_1 = __webpack_require__(4);
                var ResumableSubscriptionState;
                (function (ResumableSubscriptionState) {
                    ResumableSubscriptionState[ResumableSubscriptionState["UNOPENED"] = 0] = "UNOPENED";
                    ResumableSubscriptionState[ResumableSubscriptionState["OPENING"] = 1] = "OPENING";
                    ResumableSubscriptionState[ResumableSubscriptionState["OPEN"] = 2] = "OPEN";
                    ResumableSubscriptionState[ResumableSubscriptionState["ENDING"] = 3] = "ENDING";
                    ResumableSubscriptionState[ResumableSubscriptionState["ENDED"] = 4] = "ENDED"; // called onEnd() or onError(err)
                })(ResumableSubscriptionState = exports.ResumableSubscriptionState || (exports.ResumableSubscriptionState = {}));
                // Asserts that the subscription state is one of the specified values,
                // otherwise logs the current value.
                function assertState(stateEnum, states) {
                    var _this = this;
                    if (states === void 0) {
                        states = [];
                    }
                    var check = states.some(function (state) {
                        return stateEnum[state] === _this.state;
                    });
                    var expected = states.join(', ');
                    var actual = stateEnum[this.state];
                    console.assert(check, "Expected this.state to be " + expected + " but it is " + actual);
                    if (!check) {
                        console.trace();
                    }
                }
                exports.assertState = assertState;
                
                // pattern of callbacks: ((onOpening (onOpen onEvent*)?)? (onError|onEnd)) | onError
                var ResumableSubscription = function () {
                    function ResumableSubscription(xhrSource, options) {
                        this.xhrSource = xhrSource;
                        this.options = options;
                        this.state = ResumableSubscriptionState.UNOPENED;
                        this.assertState = assertState.bind(this, ResumableSubscriptionState);
                        this.lastEventIdReceived = options.lastEventId;
                        this.logger = options.logger;
                        if (options.retryStrategy !== undefined) {
                            this.retryStrategy = options.retryStrategy;
                        } else {
                            this.retryStrategy = new retry_strategy_1.ExponentialBackoffRetryStrategy({
                                logger: this.logger
                            });
                        }
                    }
                    ResumableSubscription.prototype.tryNow = function () {
                        var _this = this;
                        this.state = ResumableSubscriptionState.OPENING;
                        var newXhr = this.xhrSource();
                        this.subscription = new subscription_1.Subscription(newXhr, {
                            path: this.options.path,
                            lastEventId: this.lastEventIdReceived,
                            onOpen: function () {
                                _this.assertState(['OPENING']);
                                _this.state = ResumableSubscriptionState.OPEN;
                                if (_this.options.onOpen) {
                                    _this.options.onOpen();
                                }
                                _this.retryStrategy.reset(); //We need to reset the counter once the connection has been re-established.
                            },
                            onEvent: function (event) {
                                _this.assertState(['OPEN']);
                                if (_this.options.onEvent) {
                                    _this.options.onEvent(event);
                                }
                                console.assert(!_this.lastEventIdReceived || parseInt(event.eventId) > parseInt(_this.lastEventIdReceived), 'Expected the current event id to be larger than the previous one');
                                _this.lastEventIdReceived = event.eventId;
                            },
                            onEnd: function () {
                                _this.state = ResumableSubscriptionState.ENDED;
                                if (_this.options.onEnd) {
                                    _this.options.onEnd();
                                }
                            },
                            onError: function (error) {
                                _this.state = ResumableSubscriptionState.OPENING;
                                _this.retryStrategy.attemptRetry(error).then(function () {
                                    if (_this.options.onRetry !== undefined) {
                                        _this.options.onRetry();
                                    } else {
                                        _this.tryNow();
                                    }
                                }).catch(function (error) {
                                    _this.state = ResumableSubscriptionState.ENDED;
                                    if (_this.options.onError) {
                                        _this.options.onError(error);
                                    }
                                });
                            },
                            logger: this.logger
                        });
                        if (this.options.tokenProvider) {
                            this.options.tokenProvider.fetchToken().then(function (jwt) {
                                _this.subscription.open(jwt);
                            }).catch(function (err) {
                                if (_this.options.onError) _this.options.onError(err);
                            });
                        } else {
                            this.subscription.open(null);
                        }
                    };
                    ResumableSubscription.prototype.open = function () {
                        this.tryNow();
                    };
                    ResumableSubscription.prototype.unsubscribe = function (error) {
                        this.subscription.unsubscribe(error); // We'll get onEnd and bubble this up
                    };
                    return ResumableSubscription;
                }();
                exports.ResumableSubscription = ResumableSubscription;

                /***/
            },
            /* 4 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(0);
                var logger_1 = __webpack_require__(1);
                var Retry = function () {
                    function Retry(waitTimeMillis) {
                        this.waitTimeMillis = waitTimeMillis;
                    }
                    return Retry;
                }();
                exports.Retry = Retry;
                var DoNotRetry = function () {
                    function DoNotRetry(error) {
                        this.error = error;
                    }
                    return DoNotRetry;
                }();
                exports.DoNotRetry = DoNotRetry;
                var ExponentialBackoffRetryStrategy = function () {
                    function ExponentialBackoffRetryStrategy(options) {
                        this.limit = 6;
                        this.retryCount = 0;
                        this.maxBackoffMillis = 30000;
                        this.defaultBackoffMillis = 1000;
                        this.currentBackoffMillis = this.defaultBackoffMillis;
                        if (options.limit) this.limit = options.limit;
                        if (options.initialBackoffMillis) {
                            this.currentBackoffMillis = options.initialBackoffMillis;
                            this.defaultBackoffMillis = options.defaultBackoffMillis;
                        }
                        if (options.maxBackoffMillis) this.maxBackoffMillis = options.maxBackoffMillis;
                        if (options.logger !== undefined) {
                            this.logger = options.logger;
                        } else {
                            this.logger = new logger_1.EmptyLogger();
                        }
                    }
                    ExponentialBackoffRetryStrategy.prototype.shouldRetry = function (error) {
                        this.logger.verbose(this.constructor.name + ":  Error received", error);
                        if (this.retryCount >= this.limit && this.limit > 0) {
                            this.logger.verbose(this.constructor.name + ":  Retry count is over the maximum limit: " + this.limit);
                            return new DoNotRetry(error);
                        }
                        var retryable = this.isRetryable(error);
                        if (retryable.isRetryable) {
                            if (retryable.backoffMillis) {
                                this.retryCount += 1;
                                return new Retry(retryable.backoffMillis);
                            } else {
                                this.currentBackoffMillis = this.calulateMillisToRetry();
                                this.retryCount += 1;
                                this.logger.verbose(this.constructor.name + ": Will attempt to retry in: " + this.currentBackoffMillis);
                                return new Retry(this.currentBackoffMillis);
                            }
                        } else {
                            this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                            return new DoNotRetry(error);
                        }
                    };
                    ExponentialBackoffRetryStrategy.prototype.attemptRetry = function (error) {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            var shouldRetry = _this.shouldRetry(error);
                            if (shouldRetry instanceof DoNotRetry) {
                                reject(error);
                            } else if (shouldRetry instanceof Retry) {
                                window.setTimeout(resolve, shouldRetry.waitTimeMillis);
                            }
                        });
                    };
                    ExponentialBackoffRetryStrategy.prototype.isRetryable = function (error) {
                        var retryable = {
                            isRetryable: false
                        };
                        //We allow network errors
                        if (error instanceof base_client_1.NetworkError) retryable.isRetryable = true;else if (error instanceof base_client_1.ErrorResponse) {
                            //Only retry after is allowed
                            if (error.headers["Retry-After"]) {
                                retryable.isRetryable = true;
                                retryable.backoffMillis = parseInt(error.headers["retry-after"]) * 1000;
                            }
                        }
                        return retryable;
                    };
                    ExponentialBackoffRetryStrategy.prototype.reset = function () {
                        this.retryCount = 0;
                        this.currentBackoffMillis = this.defaultBackoffMillis;
                    };
                    ExponentialBackoffRetryStrategy.prototype.calulateMillisToRetry = function () {
                        if (this.currentBackoffMillis >= this.maxBackoffMillis || this.currentBackoffMillis * 2 >= this.maxBackoffMillis) {
                            return this.maxBackoffMillis;
                        }
                        if (this.retryCount > 0) {
                            return this.currentBackoffMillis * 2;
                        }
                        return this.currentBackoffMillis;
                    };
                    return ExponentialBackoffRetryStrategy;
                }();
                exports.ExponentialBackoffRetryStrategy = ExponentialBackoffRetryStrategy;

                /***/
            },
            /* 5 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                var __assign = this && this.__assign || Object.assign || function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(0);
                var logger_1 = __webpack_require__(1);
                var HOST_BASE = "pusherplatform.io";
                var Instance = function () {
                    function Instance(options) {
                        if (!options.instance) throw new Error('Expected `instance` property in Instance options!');
                        if (options.instance.split(":").length !== 3) throw new Error('The instance property is in the wrong format!');
                        if (!options.serviceName) throw new Error('Expected `serviceName` property in Instance options!');
                        if (!options.serviceVersion) throw new Error('Expected `serviceVersion` property in Instance otpions!');
                        var splitInstance = options.instance.split(":");
                        this.platformVersion = splitInstance[0];
                        this.cluster = splitInstance[1];
                        this.instanceId = splitInstance[2];
                        this.serviceName = options.serviceName;
                        this.serviceVersion = options.serviceVersion;
                        this.tokenProvider = options.tokenProvider;
                        if (options.host) {
                            this.host = options.host;
                        } else {
                            this.host = this.cluster + "." + HOST_BASE;
                        }
                        this.client = options.client || new base_client_1.BaseClient({
                            encrypted: options.encrypted,
                            host: this.host
                        });
                        if (options.logger !== undefined) {
                            this.logger = options.logger;
                        } else {
                            this.logger = new logger_1.ConsoleLogger();
                        }
                    }
                    Instance.prototype.request = function (options) {
                        var _this = this;
                        options.path = this.absPath(options.path);
                        var tokenProvider = options.tokenProvider || this.tokenProvider;
                        if (!options.jwt && tokenProvider) {
                            return tokenProvider.fetchToken().then(function (jwt) {
                                return _this.client.request(__assign({ jwt: jwt }, options));
                            });
                        } else {
                            return this.client.request(options);
                        }
                    };
                    Instance.prototype.subscribe = function (options) {
                        options.path = this.absPath(options.path);
                        options.logger = this.logger;
                        var subscription = this.client.newSubscription(options);
                        var tokenProvider = options.tokenProvider || this.tokenProvider;
                        if (options.jwt) {
                            subscription.open(options.jwt);
                        } else if (tokenProvider) {
                            tokenProvider.fetchToken().then(function (jwt) {
                                subscription.open(jwt);
                            }).catch(function (err) {
                                subscription.unsubscribe(err);
                            });
                        } else {
                            subscription.open(null);
                        }
                        return subscription;
                    };
                    Instance.prototype.resumableSubscribe = function (options) {
                        if (!options.logger) options.logger = this.logger;
                        options.logger = this.logger;
                        options.path = this.absPath(options.path);
                        var tokenProvider = options.tokenProvider || this.tokenProvider;
                        var resumableSubscription = this.client.newResumableSubscription(__assign({ tokenProvider: tokenProvider }, options));
                        resumableSubscription.open();
                        return resumableSubscription;
                    };
                    Instance.prototype.absPath = function (relativePath) {
                        return ("/services/" + this.serviceName + "/" + this.serviceVersion + "/" + this.instanceId + "/" + relativePath).replace(/\/+/g, "/").replace(/\/+$/, "");
                    };
                    return Instance;
                }();
                exports.default = Instance;

                /***/
            },
            /* 6 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var instance_1 = __webpack_require__(5);
                exports.Instance = instance_1.default;
                var base_client_1 = __webpack_require__(0);
                exports.BaseClient = base_client_1.BaseClient;
                var logger_1 = __webpack_require__(1);
                exports.ConsoleLogger = logger_1.ConsoleLogger;
                exports.EmptyLogger = logger_1.EmptyLogger;
                var resumable_subscription_1 = __webpack_require__(3);
                exports.ResumableSubscription = resumable_subscription_1.ResumableSubscription;
                var retry_strategy_1 = __webpack_require__(4);
                exports.ExponentialBackoffRetryStrategy = retry_strategy_1.ExponentialBackoffRetryStrategy;
                var subscription_1 = __webpack_require__(2);
                exports.Subscription = subscription_1.Subscription;
                exports.default = {
                    Instance: instance_1.default,
                    BaseClient: base_client_1.BaseClient,
                    ResumableSubscription: resumable_subscription_1.ResumableSubscription, Subscription: subscription_1.Subscription,
                    ExponentialBackoffRetryStrategy: retry_strategy_1.ExponentialBackoffRetryStrategy,
                    ConsoleLogger: logger_1.ConsoleLogger, EmptyLogger: logger_1.EmptyLogger
                };

                /***/
            }]
            /******/)
        );
    });
});

var PusherPlatform = unwrapExports(pusherPlatform);

function parseResponse(promise) {
  return new Promise(function (resolve, reject) {
    promise.then(function (response) {
      try {
        resolve(JSON.parse(response));
      } catch (err) {
        reject(err);
      }
    }).catch(reject);
  });
}

function urlEncode(data) {
  return Object.keys(data).filter(function (key) {
    return data[key] !== undefined;
  }).map(function (key) {
    return key + "=" + encodeURIComponent(data[key]);
  }).join("&");
}

function queryString(data) {
  var encodedData = urlEncode(data);
  return encodedData ? "?" + encodedData : "";
}

function unixTimeNow() {
  return Math.floor(Date.now() / 1000);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var Feed = function () {
  function Feed(_ref) {
    var instance = _ref.instance,
        feedId = _ref.feedId,
        readTokenProvider = _ref.readTokenProvider;
    classCallCheck(this, Feed);

    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
  }

  createClass(Feed, [{
    key: "subscribe",
    value: function subscribe() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof options.onItem !== "function") {
        throw new TypeError("Must provide an `onItem` callback");
      }
      return this.instance.resumableSubscribe(_extends({}, options, {
        path: "feeds/" + this.feedId + "/items" + queryString({
          previous_items: options.previousItems
        }),
        tokenProvider: this.readTokenProvider,
        onEvent: options.onItem
      }));
    }
  }, {
    key: "getHistory",
    value: function getHistory() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          fromId = _ref2.fromId,
          _ref2$limit = _ref2.limit,
          limit = _ref2$limit === undefined ? 50 : _ref2$limit;

      return parseResponse(this.instance.request({
        method: "GET",
        path: "feeds/" + this.feedId + "/items" + queryString({
          from_id: fromId,
          limit: limit
        }),
        tokenProvider: this.readTokenProvider
      }));
    }
  }]);
  return Feed;
}();

var cacheExpiryTolerance = 10 * 60; // 10 minutes (in seconds)
var defaultAuthEndpoint = "/feeds/tokens";
var feedIdRegex = /^[a-zA-Z0-9-]+$/;
var instanceRegex = /^v([1-9][0-9]*):([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)$/;
var tokenProviderTimeout = 30 * 1000; // 30 seconds (in ms)

var TokenProvider = function () {
  function TokenProvider(_ref) {
    var authEndpoint = _ref.authEndpoint,
        authData = _ref.authData;
    classCallCheck(this, TokenProvider);

    this.authEndpoint = authEndpoint || defaultAuthEndpoint;
    this.authData = authData;
  }

  createClass(TokenProvider, [{
    key: "fetchToken",
    value: function fetchToken() {
      var _this = this;

      if (this.cacheIsStale) {
        return this.makeAuthRequest().then(function (responseBody) {
          _this.cache(responseBody.access_token, responseBody.expires_in);
          return _this.cachedToken;
        });
      }
      return Promise.resolve(this.cachedToken);
    }
  }, {
    key: "cache",
    value: function cache(token, expiresIn) {
      this.cachedToken = token;
      this.cacheValidUntil = unixTimeNow() + expiresIn - cacheExpiryTolerance;
    }
  }, {
    key: "makeAuthRequest",
    value: function makeAuthRequest() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", _this2.authEndpoint);
        xhr.timeout = tokenProviderTimeout;
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Couldn't fetch token from " + _this2.authEndpoint + "; got " + xhr.status + " " + xhr.statusText + "."));
          }
        };
        xhr.ontimeout = function () {
          reject(new Error("Request timed out while fetching token from " + _this2.authEndpoint));
        };
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(urlEncode(_extends({}, _this2.authData, {
          grant_type: "client_credentials"
        })));
      });
    }
  }, {
    key: "cacheIsStale",
    get: function get$$1() {
      return !this.cachedToken || unixTimeNow() > this.cacheValidUntil;
    }
  }]);
  return TokenProvider;
}();

var Feeds = function () {
  function Feeds() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$authData = _ref.authData,
        authData = _ref$authData === undefined ? {} : _ref$authData,
        authEndpoint = _ref.authEndpoint,
        host = _ref.host,
        instance = _ref.instance,
        logLevel = _ref.logLevel,
        logger = _ref.logger;

    classCallCheck(this, Feeds);

    this.authData = authData;
    this.authEndpoint = authEndpoint;
    if (!instance || !instance.match(instanceRegex)) {
      throw new TypeError("Invalid instance: " + instance);
    }
    this.listTokenProvider = new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: _extends({}, this.authData, {
        path: "feeds",
        action: "READ"
      })
    });
    this.firehoseTokenProvider = new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: _extends({}, this.authData, {
        path: "firehose/items",
        action: "READ"
      })
    });
    if (!logger && logLevel) {
      logger = new PusherPlatform.ConsoleLogger(logLevel);
    }
    this.instance = new PusherPlatform.Instance({
      host: host,
      instance: instance,
      logger: logger,
      serviceName: "feeds",
      serviceVersion: "v1"
    });
  }

  createClass(Feeds, [{
    key: "list",
    value: function list() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          prefix = _ref2.prefix,
          limit = _ref2.limit;

      return parseResponse(this.instance.request({
        method: "GET",
        path: "feeds" + queryString({ prefix: prefix, limit: limit }),
        tokenProvider: this.listTokenProvider
      }));
    }
  }, {
    key: "feed",
    value: function feed(feedId) {
      if (!feedId || !feedId.match(feedIdRegex)) {
        throw new TypeError("Invalid feedId: " + feedId);
      }
      var readTokenProvider = feedId.startsWith("private-") ? new TokenProvider({
        authEndpoint: this.authEndpoint,
        authData: _extends({}, this.authData, {
          path: "feeds/" + feedId + "/items",
          action: "READ"
        })
      }) : null;
      return new Feed({
        instance: this.instance,
        feedId: feedId,
        readTokenProvider: readTokenProvider
      });
    }
  }, {
    key: "firehose",
    value: function firehose() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var onPublish = _ref3.onPublish,
          onSubscribe = _ref3.onSubscribe,
          onUnsubscribe = _ref3.onUnsubscribe,
          options = objectWithoutProperties(_ref3, ["onPublish", "onSubscribe", "onUnsubscribe"]);

      validateFirehoseCallbacks({ onPublish: onPublish, onSubscribe: onSubscribe, onUnsubscribe: onUnsubscribe });
      var onEvent = function onEvent(event) {
        if (event.body.event_type === 0 && onPublish) {
          onPublish(event);
        } else if (event.body.event_type === 1 && onSubscribe) {
          onSubscribe(event);
        } else if (event.body.event_type === 2 && onUnsubscribe) {
          onUnsubscribe(event);
        }
      };
      return this.instance.subscribe(_extends({}, options, {
        onEvent: onEvent,
        path: "firehose/items",
        tokenProvider: this.firehoseTokenProvider
      }));
    }
  }]);
  return Feeds;
}();

function validateFirehoseCallbacks(callbacks) {
  var defined = Object.keys(callbacks).filter(function (k) {
    return callbacks[k] !== undefined;
  }).map(function (k) {
    return { name: k, callback: callbacks[k] };
  });
  defined.forEach(function (_ref4) {
    var name = _ref4.name,
        callback = _ref4.callback;

    if (typeof callback !== "function") {
      throw new TypeError(name + " must be a function, got " + callback);
    }
  });
  if (defined.length === 0) {
    throw new TypeError("Must provide at least one of onPublish, onSubscribe, or onUnsubscribe");
  }
}

return Feeds;

})));
//# sourceMappingURL=pusher-feeds-client.js.map
