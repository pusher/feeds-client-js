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
                /******/return __webpack_require__(__webpack_require__.s = 8);
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
                var logger_1 = __webpack_require__(1);
                var resumable_subscription_1 = __webpack_require__(3);
                var retry_strategy_1 = __webpack_require__(4);
                var stateless_subscription_1 = __webpack_require__(5);
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
                        this.logger = options.logger || new logger_1.ConsoleLogger();
                    }
                    BaseClient.prototype.request = function (options) {
                        var xhr = this.createXHR(this.baseURL, options);
                        //TODO: add retrying
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
                    BaseClient.prototype.newStatelessSubscription = function (subOptions) {
                        var _this = this;
                        var method = "SUBSCRIBE";
                        if (!subOptions.retryStrategy) {
                            subOptions.retryStrategy = new retry_strategy_1.ExponentialBackoffRetryStrategy({
                                logger: this.logger,
                                requestMethod: method
                            });
                        }
                        return new stateless_subscription_1.StatelessSubscription(function () {
                            return _this.createXHR(_this.baseURL, {
                                method: method,
                                path: subOptions.path,
                                headers: {},
                                body: null
                            });
                        }, subOptions);
                    };
                    BaseClient.prototype.newResumableSubscription = function (subOptions) {
                        var _this = this;
                        var method = "SUBSCRIBE";
                        if (!subOptions.retryStrategy) {
                            subOptions.retryStrategy = new retry_strategy_1.ExponentialBackoffRetryStrategy({
                                logger: this.logger,
                                requestMethod: method
                            });
                        }
                        return new resumable_subscription_1.ResumableSubscription(function () {
                            return _this.createXHR(_this.baseURL, {
                                method: method,
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
                /**
                 * Wrapper around the token provider that contains a retry strategy
                 * TODO: test
                 * Currently not used anywhere
                 */
                var RetryingTokenProvider = function () {
                    function RetryingTokenProvider(baseTokenProvider, retryStrategy) {
                        this.baseTokenProvider = baseTokenProvider;
                        this.retryStrategy = retryStrategy;
                    }
                    RetryingTokenProvider.prototype.fetchToken = function () {
                        return this.tryFetching();
                    };
                    RetryingTokenProvider.prototype.invalidateToken = function (token) {
                        this.baseTokenProvider.invalidateToken(token);
                    };
                    RetryingTokenProvider.prototype.tryFetching = function () {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            _this.baseTokenProvider.fetchToken().then(function (token) {
                                resolve(token);
                            }).catch(function (error) {
                                _this.retryStrategy.checkIfRetryable(error).then(function () {
                                    _this.tryFetching();
                                }).catch(function (error) {
                                    reject(error);
                                });
                            });
                        });
                    };
                    return RetryingTokenProvider;
                }();
                exports.RetryingTokenProvider = RetryingTokenProvider;
                /**
                 * No-op token provider. Fetches undefined so we can more easily replace it.
                 * Never fails.
                 */
                var NoOpTokenProvider = function () {
                    function NoOpTokenProvider() {}
                    NoOpTokenProvider.prototype.fetchToken = function () {
                        return new Promise(function (resolve) {
                            resolve(undefined);
                        });
                    };
                    NoOpTokenProvider.prototype.invalidateToken = function (token) {};
                    return NoOpTokenProvider;
                }();
                exports.NoOpTokenProvider = NoOpTokenProvider;
                /**
                 * A token provider that always returns the same token. Can be used for debugging purposes.
                 */
                var FixedTokenProvider = function () {
                    function FixedTokenProvider(jwt) {
                        this.jwt = jwt;
                    }
                    FixedTokenProvider.prototype.fetchToken = function () {
                        var _this = this;
                        return new Promise(function (resolve) {
                            resolve(_this.jwt);
                        });
                    };
                    FixedTokenProvider.prototype.invalidateToken = function (token) {};
                    return FixedTokenProvider;
                }();
                exports.FixedTokenProvider = FixedTokenProvider;

                /***/
            },
            /* 3 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var token_provider_1 = __webpack_require__(2);
                var base_subscription_1 = __webpack_require__(6);
                var ResumableSubscription = function () {
                    function ResumableSubscription(xhrSource, options) {
                        this.xhrSource = xhrSource;
                        this.options = options;
                        this.lastEventIdReceived = options.lastEventId;
                        this.logger = options.logger;
                        this.retryStrategy = options.retryStrategy;
                        if (!this.options.tokenProvider) this.options.tokenProvider = new token_provider_1.NoOpTokenProvider();
                        this.options = base_subscription_1.replaceUnimplementedListenersWithNoOps(options);
                    }
                    ResumableSubscription.prototype.tryNow = function () {
                        var _this = this;
                        var newXhr = this.xhrSource();
                        if (this.lastEventIdReceived) {
                            newXhr.setRequestHeader("Last-Event-Id", this.lastEventIdReceived);
                        }
                        this.options.tokenProvider.fetchToken().then(function (token) {
                            _this.baseSubscription = new base_subscription_1.BaseSubscription(newXhr, {
                                path: _this.options.path,
                                headers: _this.options.headers,
                                jwt: token,
                                onOpen: function () {
                                    _this.options.onOpen();
                                    _this.retryStrategy.reset(); //We need to reset the counter once the connection has been re-established.
                                },
                                onEvent: function (event) {
                                    _this.options.onEvent(event);
                                    _this.lastEventIdReceived = event.eventId;
                                },
                                onEnd: _this.options.onEnd,
                                onError: function (error) {
                                    _this.retryStrategy.checkIfRetryable(error).then(function () {
                                        if (_this.options.onRetry) {
                                            _this.options.onRetry();
                                        } else {
                                            _this.tryNow();
                                        }
                                    }).catch(function (error) {
                                        _this.options.onError(error);
                                    });
                                },
                                logger: _this.logger
                            });
                            _this.baseSubscription.open();
                        }).catch(function (error) {
                            _this.options.onError(error);
                        });
                    };
                    ResumableSubscription.prototype.open = function () {
                        this.tryNow();
                    };
                    ResumableSubscription.prototype.unsubscribe = function () {
                        if (!this.baseSubscription) {
                            throw new Error("Subscription doesn't exist! Have you called open()?");
                        }
                        this.retryStrategy.cancel();
                        this.baseSubscription.unsubscribe(); // We'll get onEnd and bubble this up
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
                        this.retryUnsafeRequests = false;
                        this.limit = -1;
                        this.retryCount = 0;
                        this.maxBackoffMillis = 5000;
                        this.defaultBackoffMillis = 1000;
                        this.currentBackoffMillis = this.defaultBackoffMillis;
                        this.pendingTimeouts = new Set();
                        this.requestMethod = options.requestMethod;
                        this.logger = options.logger;
                        if (options.retryUnsafeRequests) this.retryUnsafeRequests = options.retryUnsafeRequests;
                        //Backoff limits
                        if (options.limit) this.limit = options.limit;
                        if (options.initialBackoffMillis) {
                            this.currentBackoffMillis = options.initialBackoffMillis;
                            this.defaultBackoffMillis = options.initialBackoffMillis;
                        }
                        if (options.maxBackoffMillis) this.maxBackoffMillis = options.maxBackoffMillis;
                    }
                    ExponentialBackoffRetryStrategy.prototype.checkIfRetryable = function (error) {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            var shouldRetry = _this.shouldRetry(error);
                            if (shouldRetry instanceof DoNotRetry) {
                                reject(error);
                            } else if (shouldRetry instanceof Retry) {
                                _this.retryCount += 1;
                                var timeout_1 = window.setTimeout(function () {
                                    _this.pendingTimeouts.delete(timeout_1);
                                    resolve();
                                }, shouldRetry.waitTimeMillis);
                                _this.pendingTimeouts.add(timeout_1);
                            }
                        });
                    };
                    ExponentialBackoffRetryStrategy.prototype.reset = function () {
                        this.retryCount = 0;
                        this.currentBackoffMillis = this.defaultBackoffMillis;
                    };
                    ExponentialBackoffRetryStrategy.prototype.cancel = function () {
                        var _this = this;
                        this.pendingTimeouts.forEach(function (timeout) {
                            window.clearTimeout(timeout);
                            _this.pendingTimeouts.delete(timeout);
                        });
                    };
                    ExponentialBackoffRetryStrategy.prototype.requestMethodIsSafe = function () {
                        switch (this.requestMethod) {
                            case 'GET':
                            case 'HEAD':
                            case 'OPTIONS':
                            case 'SUBSCRIBE':
                                return true;
                            default:
                                return false;
                        }
                    };
                    ExponentialBackoffRetryStrategy.prototype.shouldRetry = function (error) {
                        this.logger.verbose(this.constructor.name + ":  Error received", error);
                        if (this.retryCount >= this.limit && this.limit >= 0) {
                            this.logger.verbose(this.constructor.name + ":  Retry count is over the maximum limit: " + this.limit);
                            return new DoNotRetry(error);
                        }
                        if (error instanceof base_client_1.ErrorResponse && error.headers['Retry-After']) {
                            this.logger.verbose(this.constructor.name + ":  Retry-After header is present, retrying in " + error.headers['Retry-After']);
                            return new Retry(parseInt(error.headers['Retry-After']) * 1000);
                        }
                        if (error instanceof base_client_1.NetworkError || this.requestMethodIsSafe() || this.retryUnsafeRequests) {
                            return this.shouldSafeRetry(error);
                        }
                        this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                        return new DoNotRetry(error);
                    };
                    ExponentialBackoffRetryStrategy.prototype.shouldSafeRetry = function (error) {
                        if (error instanceof base_client_1.NetworkError) {
                            this.logger.verbose(this.constructor.name + ": It's a Network Error, will retry", error);
                            return new Retry(this.calulateMillisToRetry());
                        }
                        if (error instanceof base_client_1.ErrorResponse) {
                            if (error.statusCode >= 500 && error.statusCode < 600) {
                                this.logger.verbose(this.constructor.name + ": Error 5xx, will retry");
                                return new Retry(this.calulateMillisToRetry());
                            }
                            if (error.statusCode === 401) {
                                this.logger.verbose(this.constructor.name + ": Error 401 - probably expired token, retrying immediately");
                                return new Retry(0); //Token expired - can retry immediately
                            }
                        }
                        this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                        return new DoNotRetry(error);
                    };
                    ExponentialBackoffRetryStrategy.prototype.calulateMillisToRetry = function () {
                        if (this.currentBackoffMillis >= this.maxBackoffMillis || this.currentBackoffMillis * 2 >= this.maxBackoffMillis) {
                            this.currentBackoffMillis = this.maxBackoffMillis;
                        } else if (this.retryCount > 0) {
                            this.currentBackoffMillis = this.currentBackoffMillis * 2;
                        }
                        this.logger.verbose("Retrying in " + this.currentBackoffMillis + "ms");
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

                Object.defineProperty(exports, "__esModule", { value: true });
                var token_provider_1 = __webpack_require__(2);
                var base_subscription_1 = __webpack_require__(6);
                // pattern of callbacks: ((onOpening (onOpen onEvent*)?)? (onError|onEnd)) | onError
                var StatelessSubscription = function () {
                    function StatelessSubscription(xhrSource, options) {
                        this.xhrSource = xhrSource;
                        this.options = options;
                        this.logger = options.logger;
                        if (!this.options.tokenProvider) this.options.tokenProvider = new token_provider_1.NoOpTokenProvider();
                        this.options = base_subscription_1.replaceUnimplementedListenersWithNoOps(options);
                        this.retryStrategy = options.retryStrategy;
                    }
                    StatelessSubscription.prototype.tryNow = function () {
                        var _this = this;
                        var newXhr = this.xhrSource();
                        this.options.tokenProvider.fetchToken().then(function (token) {
                            _this.baseSubscription = new base_subscription_1.BaseSubscription(newXhr, {
                                path: _this.options.path,
                                headers: _this.options.headers,
                                jwt: token,
                                onOpen: function () {
                                    _this.options.onOpen();
                                    _this.retryStrategy.reset(); //We need to reset the counter once the connection has been re-established.
                                },
                                onEvent: _this.options.onEvent,
                                onEnd: _this.options.onEnd,
                                onError: function (error) {
                                    _this.retryStrategy.checkIfRetryable(error).then(function () {
                                        _this.logger.verbose("Then!");
                                        if (_this.options.onRetry) {
                                            _this.options.onRetry();
                                        } else {
                                            _this.tryNow();
                                        }
                                    }).catch(function (error) {
                                        _this.options.onError(error);
                                    });
                                },
                                logger: _this.logger
                            });
                            _this.baseSubscription.open();
                        }).catch(function (error) {
                            _this.options.onError(error);
                        });
                    };
                    StatelessSubscription.prototype.open = function () {
                        this.tryNow();
                    };
                    StatelessSubscription.prototype.unsubscribe = function () {
                        if (!this.baseSubscription) {
                            throw new Error("Subscription doesn't exist! Have you called open()?");
                        }
                        this.retryStrategy.cancel();
                        this.baseSubscription.unsubscribe(); // We'll get onEnd and bubble this up
                    };
                    return StatelessSubscription;
                }();
                exports.StatelessSubscription = StatelessSubscription;

                /***/
            },
            /* 6 */
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
                /**
                * Allows avoiding making null check every. Single. Time.
                * @param options the options that come in
                * @returns the mutated options
                * TODO: should this be cloned instead?
                */
                function replaceUnimplementedListenersWithNoOps(options) {
                    if (!options.onOpen) options.onOpen = function () {};
                    if (!options.onEvent) options.onEvent = function (event) {};
                    if (!options.onEnd) options.onEnd = function () {};
                    if (!options.onError) options.onError = function (error) {};
                    return options;
                }
                exports.replaceUnimplementedListenersWithNoOps = replaceUnimplementedListenersWithNoOps;
                var BaseSubscription = function () {
                    function BaseSubscription(xhr, options) {
                        var _this = this;
                        this.xhr = xhr;
                        this.options = options;
                        this.state = SubscriptionState.UNOPENED;
                        this.lastNewlineIndex = 0;
                        /******
                        Message parsing
                        ******/
                        this.gotEOS = false;
                        //Apply headers    
                        for (var key in options.headers) {
                            xhr.setRequestHeader(key, options.headers[key]);
                        }
                        xhr.onreadystatechange = function () {
                            switch (_this.xhr.readyState) {
                                case base_client_1.XhrReadyState.UNSENT:
                                case base_client_1.XhrReadyState.OPENED:
                                case base_client_1.XhrReadyState.HEADERS_RECEIVED:
                                    _this.assertStateIsIn(SubscriptionState.OPENING);
                                    break;
                                case base_client_1.XhrReadyState.LOADING:
                                    _this.onLoading();
                                    break;
                                case base_client_1.XhrReadyState.DONE:
                                    _this.onDone();
                                    break;
                            }
                        };
                    }
                    BaseSubscription.prototype.open = function () {
                        if (this.state !== SubscriptionState.UNOPENED) {
                            throw new Error("Called .open() on Subscription object in unexpected state: " + this.state);
                        }
                        this.state = SubscriptionState.OPENING;
                        if (this.options.jwt) {
                            this.xhr.setRequestHeader("authorization", "Bearer " + this.options.jwt);
                        }
                        this.xhr.send();
                    };
                    BaseSubscription.prototype.unsubscribe = function () {
                        this.state = SubscriptionState.ENDED;
                        this.xhr.abort();
                        this.options.onEnd();
                    };
                    BaseSubscription.prototype.onLoading = function () {
                        this.assertStateIsIn(SubscriptionState.OPENING, SubscriptionState.OPEN, SubscriptionState.ENDING);
                        if (this.xhr.status === 200) {
                            //Check if we just transitioned to the open state
                            if (this.state === SubscriptionState.OPENING) {
                                this.state = SubscriptionState.OPEN;
                                this.options.onOpen();
                            }
                            this.assertStateIsIn(SubscriptionState.OPEN);
                            var err = this.onChunk(); // might transition our state from OPEN -> ENDING
                            this.assertStateIsIn(SubscriptionState.OPEN, SubscriptionState.ENDING);
                            if (err) {
                                this.state = SubscriptionState.ENDED;
                                if (err.statusCode != 204) {
                                    this.options.onError(err);
                                }
                                // Because we abort()ed, we will get no more calls to our onreadystatechange handler,
                                // and so we will not call the event handler again.
                                // Finish with options.onError instead of the options.onEnd.
                            } else {
                                    // We consumed some response text, and all's fine. We expect more text.
                                }
                        }
                    };
                    BaseSubscription.prototype.onDone = function () {
                        if (this.xhr.status === 200) {
                            if (this.state === SubscriptionState.OPENING) {
                                this.state = SubscriptionState.OPEN;
                                this.options.onOpen();
                            }
                            this.assertStateIsIn(SubscriptionState.OPEN, SubscriptionState.ENDING);
                            var err = this.onChunk();
                            if (err) {
                                this.state = SubscriptionState.ENDED;
                                if (err.statusCode === 204) {
                                    this.options.onEnd();
                                } else {
                                    this.options.onError(err);
                                }
                            } else if (this.state <= SubscriptionState.ENDING) {
                                this.options.onError(new Error("HTTP response ended without receiving EOS message"));
                            } else {
                                // Stream ended normally.
                                this.options.onEnd();
                            }
                        } else {
                            this.assertStateIsIn(SubscriptionState.OPENING, SubscriptionState.OPEN, SubscriptionState.ENDED);
                            if (this.state === SubscriptionState.ENDED) {
                                // We aborted the request deliberately, and called onError/onEnd elsewhere.
                                return;
                            } else if (this.xhr.status === 0) {
                                this.options.onError(new base_client_1.NetworkError("Connection lost."));
                            } else {
                                this.options.onError(base_client_1.ErrorResponse.fromXHR(this.xhr));
                            }
                        }
                    };
                    BaseSubscription.prototype.onChunk = function () {
                        this.assertStateIsIn(SubscriptionState.OPEN);
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
                    /**
                    * Calls options.onEvent 0+ times, then returns an Error or null
                    * Also asserts the message is formatted correctly and we're in an allowed state (not terminated).
                    */
                    BaseSubscription.prototype.onMessage = function (message) {
                        this.assertStateIsIn(SubscriptionState.OPEN);
                        this.verifyMessage(message);
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
                    BaseSubscription.prototype.onEventMessage = function (eventMessage) {
                        this.assertStateIsIn(SubscriptionState.OPEN);
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
                        this.options.onEvent({ eventId: id, headers: headers, body: body });
                    };
                    /**
                    * EOS message received. Sets subscription state to Ending and returns an error with given status code
                    * @param eosMessage final message of the subscription
                    */
                    BaseSubscription.prototype.onEOSMessage = function (eosMessage) {
                        this.assertStateIsIn(SubscriptionState.OPEN);
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
                    /******
                    Utility methods
                    ******/
                    /**
                    * Asserts whether this subscription falls in one of the expected states and logs a warning if it's not.
                    * @param validStates Array of possible states this subscription could be in.
                    */
                    BaseSubscription.prototype.assertStateIsIn = function () {
                        var _this = this;
                        var validStates = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            validStates[_i] = arguments[_i];
                        }
                        var stateIsValid = validStates.some(function (validState) {
                            return validState === _this.state;
                        });
                        if (!stateIsValid) {
                            var expectedStates = validStates.map(function (state) {
                                return SubscriptionState[state];
                            }).join(', ');
                            var actualState = SubscriptionState[this.state];
                            this.options.logger.warn("Expected this.state to be one of [" + expectedStates + "] but it is " + actualState);
                        }
                    };
                    /**
                    * Check if a single subscription message is in the right format.
                    * @param message The message to check.
                    * @returns null or error if the message is wrong.
                    */
                    BaseSubscription.prototype.verifyMessage = function (message) {
                        if (this.gotEOS) {
                            return new Error("Got another message after EOS message");
                        }
                        if (!Array.isArray(message)) {
                            return new Error("Message is not an array");
                        }
                        if (message.length < 1) {
                            return new Error("Message is empty array");
                        }
                    };
                    return BaseSubscription;
                }();
                exports.BaseSubscription = BaseSubscription;

                /***/
            },
            /* 7 */
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
                        if (!options.instanceId) throw new Error('Expected `instanceId` property in Instance options!');
                        if (options.instanceId.split(":").length !== 3) throw new Error('The instance property is in the wrong format!');
                        if (!options.serviceName) throw new Error('Expected `serviceName` property in Instance options!');
                        if (!options.serviceVersion) throw new Error('Expected `serviceVersion` property in Instance otpions!');
                        var splitInstance = options.instanceId.split(":");
                        this.platformVersion = splitInstance[0];
                        this.cluster = splitInstance[1];
                        this.id = splitInstance[2];
                        this.serviceName = options.serviceName;
                        this.serviceVersion = options.serviceVersion;
                        this.host = options.host || this.cluster + "." + HOST_BASE;
                        this.logger = options.logger || new logger_1.ConsoleLogger();
                        this.client = options.client || new base_client_1.BaseClient({
                            encrypted: options.encrypted,
                            host: this.host,
                            logger: this.logger
                        });
                    }
                    Instance.prototype.request = function (options) {
                        var _this = this;
                        options.path = this.absPath(options.path);
                        if (!options.logger) options.logger = this.logger;
                        if (!options.jwt && options.tokenProvider) {
                            return options.tokenProvider.fetchToken().then(function (jwt) {
                                return _this.client.request(__assign({ jwt: jwt }, options));
                            });
                        } else {
                            return this.client.request(options);
                        }
                    };
                    Instance.prototype.subscribe = function (options) {
                        this.logger.verbose("Starting to statelessly subscribe");
                        options.path = this.absPath(options.path);
                        if (!options.logger) options.logger = this.logger;
                        var subscription = this.client.newStatelessSubscription(__assign({}, options));
                        subscription.open();
                        return subscription;
                    };
                    Instance.prototype.resumableSubscribe = function (options) {
                        options.path = this.absPath(options.path);
                        if (!options.logger) options.logger = this.logger;
                        var resumableSubscription = this.client.newResumableSubscription(__assign({}, options));
                        resumableSubscription.open();
                        return resumableSubscription;
                    };
                    Instance.prototype.absPath = function (relativePath) {
                        return ("/services/" + this.serviceName + "/" + this.serviceVersion + "/" + this.id + "/" + relativePath).replace(/\/+/g, "/").replace(/\/+$/, "");
                    };
                    return Instance;
                }();
                exports.default = Instance;

                /***/
            },
            /* 8 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var token_provider_1 = __webpack_require__(2);
                exports.FixedTokenProvider = token_provider_1.FixedTokenProvider;
                exports.RetryingTokenProvider = token_provider_1.RetryingTokenProvider;
                exports.NoOpTokenProvider = token_provider_1.NoOpTokenProvider;
                var instance_1 = __webpack_require__(7);
                exports.Instance = instance_1.default;
                var base_client_1 = __webpack_require__(0);
                exports.BaseClient = base_client_1.BaseClient;
                var logger_1 = __webpack_require__(1);
                exports.ConsoleLogger = logger_1.ConsoleLogger;
                exports.EmptyLogger = logger_1.EmptyLogger;
                var resumable_subscription_1 = __webpack_require__(3);
                exports.ResumableSubscription = resumable_subscription_1.ResumableSubscription;
                var stateless_subscription_1 = __webpack_require__(5);
                exports.StatelessSubscription = stateless_subscription_1.StatelessSubscription;
                var retry_strategy_1 = __webpack_require__(4);
                exports.ExponentialBackoffRetryStrategy = retry_strategy_1.ExponentialBackoffRetryStrategy;
                exports.default = {
                    Instance: instance_1.default,
                    BaseClient: base_client_1.BaseClient,
                    ResumableSubscription: resumable_subscription_1.ResumableSubscription,
                    StatelessSubscription: stateless_subscription_1.StatelessSubscription,
                    ExponentialBackoffRetryStrategy: retry_strategy_1.ExponentialBackoffRetryStrategy,
                    ConsoleLogger: logger_1.ConsoleLogger, EmptyLogger: logger_1.EmptyLogger,
                    NoOpTokenProvider: token_provider_1.NoOpTokenProvider, RetryingTokenProvider: token_provider_1.RetryingTokenProvider, FixedTokenProvider: token_provider_1.FixedTokenProvider
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
    this.subscribed = false;
  }

  createClass(Feed, [{
    key: "subscribe",
    value: function subscribe() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var onOpen = _ref2.onOpen,
          onItem = _ref2.onItem,
          options = objectWithoutProperties(_ref2, ["onOpen", "onItem"]);

      if (onOpen && typeof onOpen !== "function") {
        throw new TypeError("onOpen must be a function, got " + onOpen);
      }
      if (typeof onItem !== "function") {
        throw new TypeError("Must provide an `onItem` callback");
      }
      var onEvent = function onEvent(event) {
        if (event.body.type === 0 && onOpen) {
          onOpen(event.body.data);
        } else if (event.body.type === 1 && onItem) {
          onItem(event.body.data);
        } else if (event.body.type > 1) {
          throw new TypeError("Unsupported event type '" + event.body.type + "'");
        }
      };
      return this.instance.resumableSubscribe(_extends({}, options, {
        // Mapping our itemId to platform library eventId
        lastEventId: options.lastItemId,
        path: "feeds/" + this.feedId + "/items" + queryString({
          previous_items: options.previousItems
        }),
        tokenProvider: this.readTokenProvider,
        onEvent: onEvent
      }));
    }
  }, {
    key: "paginate",
    value: function paginate() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          cursor = _ref3.cursor,
          _ref3$limit = _ref3.limit,
          limit = _ref3$limit === undefined ? 50 : _ref3$limit;

      return parseResponse(this.instance.request({
        method: "GET",
        path: "feeds/" + this.feedId + "/items" + queryString({
          cursor: cursor,
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
var instanceIdRegex = /^v([1-9][0-9]*):([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)$/;
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
        instanceId = _ref.instanceId,
        logLevel = _ref.logLevel,
        logger = _ref.logger;

    classCallCheck(this, Feeds);

    this.authData = authData;
    this.authEndpoint = authEndpoint;
    if (!instanceId || !instanceId.match(instanceIdRegex)) {
      throw new TypeError("Invalid instanceId: " + instanceId);
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
      instanceId: instanceId,
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
        if (event.body.type === 0 && onPublish) {
          onPublish(event.body.data);
        } else if (event.body.type === 1 && onSubscribe) {
          onSubscribe(event.body.data);
        } else if (event.body.type === 2 && onUnsubscribe) {
          onUnsubscribe(event.body.data);
        } else if (event.body.type > 2) {
          throw new TypeError("Unsupported firehose event type '" + event.body.type + "'");
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
