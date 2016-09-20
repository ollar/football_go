/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = new _app2.default({ el: '#app' });
	
	app.render();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _firebase = __webpack_require__(9);
	
	var _firebase2 = _interopRequireDefault(_firebase);
	
	var _view = __webpack_require__(14);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _table = __webpack_require__(50);
	
	var _table2 = _interopRequireDefault(_table);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_View) {
	  _inherits(App, _View);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this2 = this;
	
	      var config = {
	        apiKey: 'AIzaSyAIbkLzp46HhDXBcMBmQiGXc6lbtWZ7l7s',
	        authDomain: 'footballgo-fcfc3.firebaseapp.com',
	        databaseURL: 'https://footballgo-fcfc3.firebaseio.com',
	        storageBucket: 'footballgo-fcfc3.appspot.com',
	        messagingSenderId: '421380806800'
	      };
	
	      this.user = new Backbone.Model();
	
	      _firebase2.default.initializeApp(config);
	      this.playersTable = new _table2.default({
	        userModel: this.user
	      });
	
	      _firebase2.default.auth().onAuthStateChanged(function (user) {
	        if (user) {
	          _this2.user.set({
	            isAnonymous: user.isAnonymous,
	            uid: user.uid
	          });
	        } else {
	          _this2.user.set({});
	          _firebase2.default.auth().signInAnonymously().catch(function (error) {
	            _this2.user.set({});
	            console.log('Sign in failure: ' + error.code + ': ' + error.message);
	          });
	        }
	      });
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return this.playersTable.render();
	    }
	  }]);
	
	  return App;
	}(_view2.default);
	
	exports.default = App;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch, _, Backbone) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _backbone = __webpack_require__(8);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function checkStatus(response) {
	  console.log(response.status);
	
	  if (response.ok) {
	    return response;
	  } else {
	    var error = new Error(response.statusText);
	    try {
	      error.response = response.json();
	    } catch (e) {
	      error.response = response.text();
	    }
	
	    throw error;
	  }
	} /* eslint-disable */
	
	
	function parseJSON(response) {
	  var _res;
	
	  if (response.body) {
	    try {
	      _res = response.json();
	    } catch (e) {
	      _res = response.text();
	    }
	  } else {
	    // if server just responds with status (like on DELETE action)
	    return true;
	  }
	
	  return _res;
	}
	
	var paddedLt = /^\s*</;
	_backbone2.default.VERSION = '1.3.3.1';
	
	_backbone2.default.ajax = function (options) {
	  return fetch(options.url, {
	    method: options.type,
	    body: options.data
	  }).then(checkStatus).then(parseJSON).then(options.success, options.error);
	};
	
	// Overrides
	_backbone2.default.View.prototype.$ = function (selector) {
	  return this.el.querySelector(selector);
	};
	
	_backbone2.default.View.prototype._removeElement = function () {
	  this.undelegateEvents();
	  if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
	};
	
	// Make a event delegation handler for the given `eventName` and `selector`
	// and attach it to `this.el`.
	// If selector is empty, the listener will be bound to `this.el`. If not, a
	// new handler that will recursively traverse up the event target's DOM
	// hierarchy looking for a node that matches the selector. If one is found,
	// the event's `delegateTarget` property is set to it and the return the
	// result of calling bound `listener` with the parameters given to the
	// handler.
	_backbone2.default.View.prototype.delegate = function (eventName, selector, listener) {
	  if (_.isFunction(selector)) {
	    listener = selector;
	    selector = null;
	  }
	
	  var root = this.el,
	      handler;
	  if (!selector) handler = listener;else handler = function handler(e) {
	    var node = e.target || e.srcElement;
	    for (; node && node != root; node = node.parentNode) {
	      if (matchesSelector.call(node, selector)) {
	        e.delegateTarget = node;
	        return listener.apply(this, arguments);
	      }
	    }
	  };
	
	  elementAddEventListener.call(root, eventName, handler, false);
	  this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
	  return handler;
	};
	
	// Remove all events created with `delegate` from `el`
	_backbone2.default.View.prototype.undelegateEvents = function () {
	  if (this.el) {
	    _.each(this._domEvents, function (item) {
	      elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
	    }, this);
	    this._domEvents = [];
	  }
	  return this;
	};
	
	// Remove a single delegated event. Either `eventName` or `selector` must
	// be included, `selector` and `listener` are optional.
	_backbone2.default.View.prototype.undelegate = function (eventName, selector, listener) {
	  if (_.isFunction(selector)) {
	    listener = selector;
	    selector = null;
	  }
	
	  var handlers = this._domEvents;
	
	  if (this.el) {
	    _(handlers).chain().filter(function (item) {
	      return item.eventName === eventName && (listener ? item.listener === listener : true) && (selector ? item.selector === selector : true);
	    }).forEach(function (item) {
	      elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
	      handlers.splice(_.indexOf(handlers, item), 1);
	    }, this);
	  }
	  return this;
	};
	
	_backbone2.default.View.prototype._setAttributes = function (attrs) {
	  for (var attr in attrs) {
	    attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
	  }
	};
	
	_backbone2.default.View.prototype._setElement = function (element) {
	  if (typeof element == 'string') {
	    if (paddedLt.test(element)) {
	      var el = document.createElement('div');
	      el.innerHTML = element;
	      this.el = el.firstChild;
	    } else {
	      this.el = document.querySelector(element);
	    }
	  } else {
	    this.el = element;
	  }
	};
	
	exports.default = _backbone2.default;

	/*** EXPORTS FROM exports-loader ***/
	module.exports = Backbone.default;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(7), __webpack_require__(2)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise, global) {/*** IMPORTS FROM imports-loader ***/
	(function() {
	
	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);
	
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.fetch;
	}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, Promise, global) {/*** IMPORTS FROM imports-loader ***/
	(function() {
	
	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(6);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,
	
	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }
	
	    var P = local.Promise;
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.Promise;
	}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	var define = false;
	
	//     Backbone.js 1.3.3
	
	//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org
	
	(function(factory) {
	
	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self === self && self) ||
	            (typeof global == 'object' && global.global === global && global);
	
	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (typeof define === 'function' && define.amd) {
	    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    });
	
	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (true) {
	    var _ = __webpack_require__(7), $;
	    try { $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())); } catch (e) {}
	    factory(root, exports, _, $);
	
	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }
	
	})(function(root, Backbone, _, $) {
	
	  // Initial Setup
	  // -------------
	
	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;
	
	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;
	
	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.3.3';
	
	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;
	
	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };
	
	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;
	
	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;
	
	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };
	
	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };
	
	  // Backbone.Events
	  // ---------------
	
	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};
	
	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;
	
	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space-separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };
	
	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };
	
	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	      context: context,
	      ctx: obj,
	      listening: listening
	    });
	
	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }
	
	    return obj;
	  };
	
	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo = function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];
	
	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }
	
	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };
	
	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;
	
	      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
	    }
	    return events;
	  };
	
	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off = function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	      context: context,
	      listeners: this._listeners
	    });
	    return this;
	  };
	
	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening = function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;
	
	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);
	
	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];
	
	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;
	
	      listening.obj.off(name, callback, this);
	    }
	
	    return this;
	  };
	
	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;
	
	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;
	
	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }
	
	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];
	
	      // Bail out if there are no events stored.
	      if (!handlers) break;
	
	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }
	
	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    return events;
	  };
	
	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once = function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    if (typeof name === 'string' && context == null) callback = void 0;
	    return this.on(events, callback, context);
	  };
	
	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce = function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };
	
	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };
	
	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger = function(name) {
	    if (!this._events) return this;
	
	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];
	
	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };
	
	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, callback, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };
	
	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };
	
	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;
	
	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);
	
	  // Backbone.Model
	  // --------------
	
	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.
	
	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    var defaults = _.result(this, 'defaults');
	    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };
	
	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {
	
	    // A hash of attributes whose current and previous value differ.
	    changed: null,
	
	    // The value returned during the last failed validation.
	    validationError: null,
	
	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',
	
	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',
	
	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},
	
	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },
	
	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },
	
	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },
	
	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },
	
	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },
	
	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },
	
	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;
	
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }
	
	      options || (options = {});
	
	      // Run validation.
	      if (!this._validate(attrs, options)) return false;
	
	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;
	
	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }
	
	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;
	
	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }
	
	      // Update the `id`.
	      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);
	
	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }
	
	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },
	
	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },
	
	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },
	
	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },
	
	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },
	
	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },
	
	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },
	
	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },
	
	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }
	
	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;
	
	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else if (!this._validate(attrs, options)) {
	        return false;
	      }
	
	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	
	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);
	
	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);
	
	      // Restore attributes.
	      this.attributes = attributes;
	
	      return xhr;
	    },
	
	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;
	
	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };
	
	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };
	
	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },
	
	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },
	
	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },
	
	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },
	
	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },
	
	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.extend({}, options, {validate: true}));
	    },
	
	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }
	
	  });
	
	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1};
	
	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');
	
	  // Backbone.Collection
	  // -------------------
	
	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.
	
	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };
	
	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};
	
	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    var i;
	    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };
	
	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {
	
	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,
	
	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},
	
	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },
	
	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },
	
	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },
	
	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed.length) {
	        options.changes = {added: [], merged: [], removed: removed};
	        this.trigger('update', this, options);
	      }
	      return singular ? removed[0] : removed;
	    },
	
	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;
	
	      options = _.extend({}, setOptions, options);
	      if (options.parse && !this._isModel(models)) {
	        models = this.parse(models, options) || [];
	      }
	
	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();
	
	      var at = options.at;
	      if (at != null) at = +at;
	      if (at > this.length) at = this.length;
	      if (at < 0) at += this.length + 1;
	
	      var set = [];
	      var toAdd = [];
	      var toMerge = [];
	      var toRemove = [];
	      var modelMap = {};
	
	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;
	
	      var sort = false;
	      var sortable = this.comparator && at == null && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
	
	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model, i;
	      for (i = 0; i < models.length; i++) {
	        model = models[i];
	
	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            toMerge.push(existing);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;
	
	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }
	
	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }
	
	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
	          return m !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }
	
	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});
	
	      // Unless silenced, it's time to fire all appropriate add/sort/update events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length || toMerge.length) {
	          options.changes = {
	            added: toAdd,
	            removed: toRemove,
	            merged: toMerge
	          };
	          this.trigger('update', this, options);
	        }
	      }
	
	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },
	
	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },
	
	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },
	
	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },
	
	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },
	
	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },
	
	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },
	
	    // Get a model from the set by id, cid, model object with id or cid
	    // properties, or an attributes object that is transformed through modelId.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      return this._byId[obj] ||
	        this._byId[this.modelId(obj.attributes || obj)] ||
	        obj.cid && this._byId[obj.cid];
	    },
	
	    // Returns `true` if the model is in the collection.
	    has: function(obj) {
	      return this.get(obj) != null;
	    },
	
	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },
	
	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },
	
	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },
	
	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});
	
	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);
	
	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },
	
	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return this.map(attr + '');
	    },
	
	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },
	
	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(m, resp, callbackOpts) {
	        if (wait) collection.add(m, callbackOpts);
	        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },
	
	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },
	
	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },
	
	    // Define how to uniquely identify models in the collection.
	    modelId: function(attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },
	
	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },
	
	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },
	
	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;
	
	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;
	
	        // Remove references before triggering 'remove' event to prevent an
	        // infinite loop. #3693
	        delete this._byId[model.cid];
	        var id = this.modelId(model.attributes);
	        if (id != null) delete this._byId[id];
	
	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }
	
	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed;
	    },
	
	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function(model) {
	      return model instanceof Model;
	    },
	
	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },
	
	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },
	
	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if (model) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        if (event === 'change') {
	          var prevId = this.modelId(model.previousAttributes());
	          var id = this.modelId(model.attributes);
	          if (prevId !== id) {
	            if (prevId != null) delete this._byId[prevId];
	            if (id != null) this._byId[id] = model;
	          }
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }
	
	  });
	
	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
	      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};
	
	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');
	
	  // Backbone.View
	  // -------------
	
	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.
	
	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };
	
	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
	
	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
	
	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {
	
	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',
	
	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },
	
	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},
	
	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },
	
	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },
	
	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },
	
	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },
	
	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },
	
	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },
	
	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },
	
	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },
	
	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },
	
	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },
	
	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },
	
	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }
	
	  });
	
	  // Backbone.sync
	  // -------------
	
	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];
	
	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });
	
	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};
	
	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }
	
	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }
	
	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }
	
	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }
	
	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }
	
	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };
	
	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };
	
	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch': 'PATCH',
	    'delete': 'DELETE',
	    'read': 'GET'
	  };
	
	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };
	
	  // Backbone.Router
	  // ---------------
	
	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };
	
	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	
	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {
	
	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},
	
	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },
	
	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },
	
	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },
	
	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },
	
	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },
	
	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }
	
	  });
	
	  // Backbone.History
	  // ----------------
	
	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);
	
	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };
	
	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;
	
	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;
	
	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;
	
	  // Has the history handling already been started?
	  History.started = false;
	
	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {
	
	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,
	
	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },
	
	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var rootPath = path.slice(0, this.root.length - 1) + '/';
	      return rootPath === this.root;
	    },
	
	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },
	
	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },
	
	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },
	
	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },
	
	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },
	
	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;
	
	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();
	
	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');
	
	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {
	
	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var rootPath = this.root.slice(0, -1) || '/';
	          this.location.replace(rootPath + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;
	
	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }
	
	      }
	
	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }
	
	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function(eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };
	
	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }
	
	      if (!this.options.silent) return this.loadUrl();
	    },
	
	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function(eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };
	
	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }
	
	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }
	
	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },
	
	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },
	
	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();
	
	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }
	
	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },
	
	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },
	
	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};
	
	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');
	
	      // Don't include a trailing slash on the root.
	      var rootPath = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        rootPath = rootPath.slice(0, -1) || '/';
	      }
	      var url = rootPath + fragment;
	
	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));
	
	      if (this.fragment === fragment) return;
	      this.fragment = fragment;
	
	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	
	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
	          var iWindow = this.iframe.contentWindow;
	
	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }
	
	          this._updateHash(iWindow.location, fragment, options.replace);
	        }
	
	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },
	
	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }
	
	  });
	
	  // Create the default Backbone.history.
	  Backbone.history = new History;
	
	  // Helpers
	  // -------
	
	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;
	
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }
	
	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);
	
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function and add the prototype properties.
	    child.prototype = _.create(parent.prototype, protoProps);
	    child.prototype.constructor = child;
	
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	
	    return child;
	  };
	
	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
	
	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };
	
	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };
	
	  return Backbone;
	});
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Firebase libraries for browser - npm package.
	 *
	 * Usage:
	 *
	 *   firebase = require('firebase');
	 */
	var firebase = __webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	module.exports = firebase;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Promise) {/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	var firebase = null; (function() { var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this,k=function(){k=function(){};h.Symbol||(h.Symbol=ba)},ca=0,ba=function(a){return"jscomp_symbol_"+(a||"")+ca++},n=function(){k();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=h.Symbol("iterator"));
	"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return m(this)}});n=function(){}},m=function(a){var b=0;return da(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},da=function(a){n();a={next:a};a[h.Symbol.iterator]=function(){return this};return a},q=this,r=function(){},t=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);
	if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},v=function(a){return"function"==t(a)},ea=function(a,
	b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},w=function(a,b,c){w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return w.apply(null,arguments)},x=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},y=function(a,b){function c(){}c.prototype=b.prototype;a.ga=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.fa=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var z;z="undefined"!==typeof window?window:"undefined"!==typeof self?self:global;function __extends(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}
	function __decorate(a,b,c,d){var e=arguments.length,f=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;g=z.Reflect;if("object"===typeof g&&"function"===typeof g.decorate)f=g.decorate(a,b,c,d);else for(var l=a.length-1;0<=l;l--)if(g=a[l])f=(3>e?g(f):3<e?g(b,c,f):g(b,c))||f;return 3<e&&f&&Object.defineProperty(b,c,f),f}function __metadata(a,b){var c=z.Reflect;if("object"===typeof c&&"function"===typeof c.metadata)return c.metadata(a,b)}
	var __param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,f){function g(a){try{p(d.next(a))}catch(u){f(u)}}function l(a){try{p(d.throw(a))}catch(u){f(u)}}function p(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(g,l)}p((d=d.apply(a,b)).next())})};"undefined"!==typeof z.L&&z.L||(z.ca=__extends,z.ba=__decorate,z.da=__metadata,z.ea=__param,z.aa=__awaiter);var A=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,A);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};y(A,Error);A.prototype.name="CustomError";var ga=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var B=function(a,b){b.unshift(a);A.call(this,ga.apply(null,b));b.shift()};y(B,A);B.prototype.name="AssertionError";var ha=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new B(""+e,f||[]);},C=function(a,b,c){a||ha("",null,b,Array.prototype.slice.call(arguments,2))},D=function(a,b,c){v(a)||ha("Expected function but got %s: %s.",[t(a),a],b,Array.prototype.slice.call(arguments,2))};var E=function(a,b,c){this.S=c;this.M=a;this.U=b;this.s=0;this.o=null};E.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.M();return a};E.prototype.put=function(a){this.U(a);this.s<this.S&&(this.s++,a.next=this.o,this.o=a)};var F;a:{var ia=q.navigator;if(ia){var ja=ia.userAgent;if(ja){F=ja;break a}}F=""};var ka=function(a){q.setTimeout(function(){throw a;},0)},G,la=function(){var a=q.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==F.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
	"//"+b.location.host,a=w(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==F.indexOf("Trident")&&-1==F.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.F;c.F=null;a()}};return function(a){d.next={F:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){q.setTimeout(a,0)}};var H=function(){this.v=this.f=null},ma=new E(function(){return new I},function(a){a.reset()},100);H.prototype.add=function(a,b){var c=ma.get();c.set(a,b);this.v?this.v.next=c:(C(!this.f),this.f=c);this.v=c};H.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.v=null),a.next=null);return a};var I=function(){this.next=this.scope=this.B=null};I.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
	I.prototype.reset=function(){this.next=this.scope=this.B=null};var M=function(a,b){J||na();L||(J(),L=!0);oa.add(a,b)},J,na=function(){if(q.Promise&&q.Promise.resolve){var a=q.Promise.resolve(void 0);J=function(){a.then(pa)}}else J=function(){var a=pa;!v(q.setImmediate)||q.Window&&q.Window.prototype&&-1==F.indexOf("Edge")&&q.Window.prototype.setImmediate==q.setImmediate?(G||(G=la()),G(a)):q.setImmediate(a)}},L=!1,oa=new H,pa=function(){for(var a;a=oa.remove();){try{a.B.call(a.scope)}catch(b){ka(b)}ma.put(a)}L=!1};var O=function(a,b){this.b=0;this.K=void 0;this.j=this.g=this.u=null;this.m=this.A=!1;if(a!=r)try{var c=this;a.call(b,function(a){N(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}N(c,3,a)})}catch(d){N(this,3,d)}},qa=function(){this.next=this.context=this.h=this.c=this.child=null;this.w=!1};qa.prototype.reset=function(){this.context=this.h=this.c=this.child=null;this.w=!1};
	var ra=new E(function(){return new qa},function(a){a.reset()},100),sa=function(a,b,c){var d=ra.get();d.c=a;d.h=b;d.context=c;return d},ua=function(a,b,c){ta(a,b,c,null)||M(x(b,a))};O.prototype.then=function(a,b,c){null!=a&&D(a,"opt_onFulfilled should be a function.");null!=b&&D(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return va(this,v(a)?a:null,v(b)?b:null,c)};O.prototype.then=O.prototype.then;O.prototype.$goog_Thenable=!0;
	O.prototype.X=function(a,b){return va(this,null,a,b)};var xa=function(a,b){a.g||2!=a.b&&3!=a.b||wa(a);C(null!=b.c);a.j?a.j.next=b:a.g=b;a.j=b},va=function(a,b,c,d){var e=sa(null,null,null);e.child=new O(function(a,g){e.c=b?function(c){try{var e=b.call(d,c);a(e)}catch(K){g(K)}}:a;e.h=c?function(b){try{var e=c.call(d,b);a(e)}catch(K){g(K)}}:g});e.child.u=a;xa(a,e);return e.child};O.prototype.Y=function(a){C(1==this.b);this.b=0;N(this,2,a)};O.prototype.Z=function(a){C(1==this.b);this.b=0;N(this,3,a)};
	var N=function(a,b,c){0==a.b&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,ta(c,a.Y,a.Z,a)||(a.K=c,a.b=b,a.u=null,wa(a),3!=b||ya(a,c)))},ta=function(a,b,c,d){if(a instanceof O)return null!=b&&D(b,"opt_onFulfilled should be a function."),null!=c&&D(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),xa(a,sa(b||r,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),
	!0;e=typeof a;if("object"==e&&null!=a||"function"==e)try{var f=a.then;if(v(f))return za(a,f,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1},za=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},l=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,l)}catch(p){l(p)}},wa=function(a){a.A||(a.A=!0,M(a.O,a))},Aa=function(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.j=null);null!=b&&C(null!=b.c);return b};
	O.prototype.O=function(){for(var a;a=Aa(this);){var b=this.b,c=this.K;if(3==b&&a.h&&!a.w){var d;for(d=this;d&&d.m;d=d.u)d.m=!1}if(a.child)a.child.u=null,Ba(a,b,c);else try{a.w?a.c.call(a.context):Ba(a,b,c)}catch(e){Ca.call(null,e)}ra.put(a)}this.A=!1};var Ba=function(a,b,c){2==b?a.c.call(a.context,c):a.h&&a.h.call(a.context,c)},ya=function(a,b){a.m=!0;M(function(){a.m&&Ca.call(null,b)})},Ca=ka;function P(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=P(a[c],b[c]));return a};var Da=Error.captureStackTrace,R=function(a,b){this.code=a;this.message=b;if(Da)Da(this,Q.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};R.prototype=Object.create(Error.prototype);R.prototype.constructor=R;R.prototype.name="FirebaseError";var Q=function(a,b,c){this.V=a;this.W=b;this.N=c;this.pattern=/\{\$([^}]+)}/g};
	Q.prototype.create=function(a,b){void 0===b&&(b={});var c=this.N[a];a=this.V+"/"+a;var c=void 0===c?"Error":c.replace(this.pattern,function(a,c){a=b[c];return void 0!==a?a.toString():"<"+c+"?>"}),c=this.W+": "+c+" ("+a+").",c=new R(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};O.all=function(a){return new O(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},l=0,p;l<a.length;l++)p=a[l],ua(p,x(f,l),g);else b(e)})};O.resolve=function(a){if(a instanceof O)return a;var b=new O(r);N(b,2,a);return b};O.reject=function(a){return new O(function(b,c){c(a)})};O.prototype["catch"]=O.prototype.X;var S=O;"undefined"!==typeof Promise&&(S=Promise);var Ea=S;function Fa(a,b){a=new T(a,b);return a.subscribe.bind(a)}var T=function(a,b){var c=this;this.a=[];this.J=0;this.task=Ea.resolve();this.l=!1;this.D=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};T.prototype.next=function(a){U(this,function(b){b.next(a)})};T.prototype.error=function(a){U(this,function(b){b.error(a)});this.close(a)};T.prototype.complete=function(){U(this,function(a){a.complete()});this.close()};
	T.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=Ga(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=V);void 0===e.error&&(e.error=V);void 0===e.complete&&(e.complete=V);a=this.$.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.G?e.error(d.G):e.complete()}catch(f){}});this.a.push(e);return a};
	T.prototype.$=function(a){void 0!==this.a&&void 0!==this.a[a]&&(delete this.a[a],--this.J,0===this.J&&void 0!==this.D&&this.D(this))};var U=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Ha(a,c,b)},Ha=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){}})};T.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.G=a),this.task.then(function(){b.a=void 0;b.D=void 0}))};
	function Ga(a){if("object"!==typeof a||null===a)return!1;var b;b=["next","error","complete"];n();var c=b[Symbol.iterator];b=c?c.call(b):m(b);for(c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1}function V(){};var W=S,X=function(a,b,c){var d=this;this.H=c;this.I=!1;this.i={};this.C=b;this.T=P(void 0,a);Object.keys(c.INTERNAL.factories).forEach(function(a){var b=c.INTERNAL.useAsService(d,a);null!==b&&(d[a]=d.R.bind(d,b))})};X.prototype.delete=function(){var a=this;return(new W(function(b){Y(a);b()})).then(function(){a.H.INTERNAL.removeApp(a.C);return W.all(Object.keys(a.i).map(function(b){return a.i[b].INTERNAL.delete()}))}).then(function(){a.I=!0;a.i={}})};
	X.prototype.R=function(a){Y(this);void 0===this.i[a]&&(this.i[a]=this.H.INTERNAL.factories[a](this,this.P.bind(this)));return this.i[a]};X.prototype.P=function(a){P(this,a)};var Y=function(a){a.I&&Z(Ia("deleted",{name:a.C}))};h.Object.defineProperties(X.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.C}},options:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.T}}});X.prototype.name&&X.prototype.options||X.prototype.delete||console.log("dc");
	function Ja(){function a(a){a=a||"[DEFAULT]";var b=d[a];void 0===b&&Z("noApp",{name:a});return b}function b(a,b){Object.keys(e).forEach(function(d){d=c(a,d);if(null!==d&&f[d])f[d](b,a)})}function c(a,b){if("serverAuth"===b)return null;var c=b;a=a.options;"auth"===b&&(a.serviceAccount||a.credential)&&(c="serverAuth","serverAuth"in e||Z("serverAuthMissing"));return c}var d={},e={},f={},g={__esModule:!0,initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||Z("bad-app-name",
	{name:c+""});void 0!==d[c]&&Z("dupApp",{name:c});a=new X(a,c,g);d[c]=a;b(a,"create");void 0!=a.INTERNAL&&void 0!=a.INTERNAL.getToken||P(a,{INTERNAL:{getToken:function(){return W.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return a},app:a,apps:null,Promise:W,SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,c,d,u){e[b]&&Z("dupService",{name:b});e[b]=c;u&&(f[b]=u);c=function(c){void 0===c&&(c=a());return c[b]()};void 0!==d&&P(c,d);return g[b]=c},createFirebaseNamespace:Ja,
	extendNamespace:function(a){P(g,a)},createSubscribe:Fa,ErrorFactory:Q,removeApp:function(a){b(d[a],"delete");delete d[a]},factories:e,useAsService:c,Promise:O,deepExtend:P}};g["default"]=g;Object.defineProperty(g,"apps",{get:function(){return Object.keys(d).map(function(a){return d[a]})}});a.App=X;return g}function Z(a,b){throw Error(Ia(a,b));}
	function Ia(a,b){b=b||{};b={noApp:"No Firebase App '"+b.name+"' has been created - call Firebase App.initializeApp().","bad-app-name":"Illegal App name: '"+b.name+"'.",dupApp:"Firebase App named '"+b.name+"' already exists.",deleted:"Firebase App named '"+b.name+"' already deleted.",dupService:"Firebase Service named '"+b.name+"' already registered.",serverAuthMissing:"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain."}[a];
	return void 0===b?"Application Error: ("+a+")":b};"undefined"!==typeof firebase&&(firebase=Ja()); })();
	firebase.SDK_VERSION = "3.4.0";
	module.exports = firebase;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(10);
	/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	(function(){var h,aa=aa||{},l=this,ba=function(){},ca=function(){throw Error("unimplemented abstract method");},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=
	typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){return null===a},ea=function(a){return"array"==m(a)},fa=function(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},ga=function(a){return"number"==typeof a},p=function(a){return"function"==m(a)},ha=function(a){var b=typeof a;
	return"object"==b&&null!=a||"function"==b},ia=function(a,b,c){return a.call.apply(a.bind,arguments)},ja=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,
	arguments)},ka=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},la=Date.now||function(){return+new Date},t=function(a,b){function c(){}c.prototype=b.prototype;a.Pc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ne=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},na=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},oa=/&/g,pa=/</g,qa=/>/g,sa=/"/g,ta=/'/g,ua=/\x00/g,va=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},wa=function(a,b){return a<b?-1:a>b?1:0};var xa=function(a,b){b.unshift(a);u.call(this,ma.apply(null,b));b.shift()};t(xa,u);xa.prototype.name="AssertionError";
	var ya=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new xa(""+e,f||[]);},w=function(a,b,c){a||ya("",null,b,Array.prototype.slice.call(arguments,2))},za=function(a,b){throw new xa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Aa=function(a,b,c){ga(a)||ya("Expected number but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2));return a},Ba=function(a,b,c){n(a)||ya("Expected string but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,
	2))},Ca=function(a,b,c){p(a)||ya("Expected function but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2))};var Da=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},x=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ea=function(a,b){for(var c=n(a)?
	a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Fa=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=n(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ga=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
	Ia=function(a){var b;a:{b=Ha;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]},Ja=function(a,b){return 0<=Da(a,b)},La=function(a,b){b=Da(a,b);var c;(c=0<=b)&&Ka(a,b);return c},Ka=function(a,b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Ma=function(a,b){var c=0;Ea(a,function(d,e){b.call(void 0,d,e,a)&&Ka(a,e)&&c++})},Na=function(a){return Array.prototype.concat.apply(Array.prototype,
	arguments)},Oa=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Pa=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},Qa=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(fa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};var Ra=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Sa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Ta=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ua=function(a){for(var b in a)return!1;return!0},Va=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},Wa=function(a){var b={},c;for(c in a)b[c]=a[c];return b},Xa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	Ya=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Xa.length;f++)c=Xa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Za;a:{var $a=l.navigator;if($a){var ab=$a.userAgent;if(ab){Za=ab;break a}}Za=""}var y=function(a){return v(Za,a)};var bb=function(a){bb[" "](a);return a};bb[" "]=ba;var db=function(a,b){var c=cb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var eb=y("Opera"),z=y("Trident")||y("MSIE"),fb=y("Edge"),gb=fb||z,hb=y("Gecko")&&!(v(Za.toLowerCase(),"webkit")&&!y("Edge"))&&!(y("Trident")||y("MSIE"))&&!y("Edge"),ib=v(Za.toLowerCase(),"webkit")&&!y("Edge"),jb=function(){var a=l.document;return a?a.documentMode:void 0},kb;
	a:{var lb="",mb=function(){var a=Za;if(hb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(fb)return/Edge\/([\d\.]+)/.exec(a);if(z)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ib)return/WebKit\/(\S+)/.exec(a);if(eb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();mb&&(lb=mb?mb[1]:"");if(z){var nb=jb();if(null!=nb&&nb>parseFloat(lb)){kb=String(nb);break a}}kb=lb}
	var ob=kb,cb={},A=function(a){return db(a,function(){for(var b=0,c=na(String(ob)).split("."),d=na(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];if(0==g[0].length&&0==k[0].length)break;b=wa(0==g[1].length?0:parseInt(g[1],10),0==k[1].length?0:parseInt(k[1],10))||wa(0==g[2].length,0==k[2].length)||wa(g[2],k[2]);g=g[3];k=k[3]}while(0==b)}return 0<=b})},pb=l.document,
	qb=pb&&z?jb()||("CSS1Compat"==pb.compatMode?parseInt(ob,10):5):void 0;var rb=null,sb=null,ub=function(a){var b="";tb(a,function(a){b+=String.fromCharCode(a)});return b},tb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=sb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}vb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},vb=function(){if(!rb){rb={};sb={};for(var a=0;65>a;a++)rb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
	sb[rb[a]]=a,62<=a&&(sb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var wb=!z||9<=Number(qb),xb=z&&!A("9");!ib||A("528");hb&&A("1.9b")||z&&A("8")||eb&&A("9.5")||ib&&A("528");hb&&!A("8")||z&&A("9");var yb=function(){this.ya=this.ya;this.Tb=this.Tb};yb.prototype.ya=!1;yb.prototype.isDisposed=function(){return this.ya};yb.prototype.Oa=function(){if(this.Tb)for(;this.Tb.length;)this.Tb.shift()()};var zb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.Va=!1;this.ud=!0};zb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ud=!1};var Ab=function(a,b){zb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.lb=this.state=null;a&&this.init(a,b)};t(Ab,zb);
	Ab.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(hb){var e;a:{try{bb(b.nodeName);e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=ib||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=ib||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:
	a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.lb=a;a.defaultPrevented&&
	this.preventDefault()};Ab.prototype.preventDefault=function(){Ab.Pc.preventDefault.call(this);var a=this.lb;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,xb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Ab.prototype.ce=function(){return this.lb};var Bb="closure_listenable_"+(1E6*Math.random()|0),Cb=0;var Db=function(a,b,c,d,e){this.listener=a;this.Xb=null;this.src=b;this.type=c;this.Cb=!!d;this.Kb=e;this.key=++Cb;this.$a=this.Bb=!1},Eb=function(a){a.$a=!0;a.listener=null;a.Xb=null;a.src=null;a.Kb=null};var Fb=function(a){this.src=a;this.w={};this.yb=0};Fb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.w[f];a||(a=this.w[f]=[],this.yb++);var g=Gb(a,b,d,e);-1<g?(b=a[g],c||(b.Bb=!1)):(b=new Db(b,this.src,f,!!d,e),b.Bb=c,a.push(b));return b};Fb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.w))return!1;var e=this.w[a];b=Gb(e,b,c,d);return-1<b?(Eb(e[b]),Ka(e,b),0==e.length&&(delete this.w[a],this.yb--),!0):!1};
	var Hb=function(a,b){var c=b.type;c in a.w&&La(a.w[c],b)&&(Eb(b),0==a.w[c].length&&(delete a.w[c],a.yb--))};Fb.prototype.uc=function(a,b,c,d){a=this.w[a.toString()];var e=-1;a&&(e=Gb(a,b,c,d));return-1<e?a[e]:null};var Gb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.$a&&f.listener==b&&f.Cb==!!c&&f.Kb==d)return e}return-1};var Ib="closure_lm_"+(1E6*Math.random()|0),Jb={},Kb=0,Lb=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Lb(a,b[f],c,d,e);else c=Mb(c),a&&a[Bb]?a.listen(b,c,d,e):Nb(a,b,c,!1,d,e)},Nb=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=Ob(a);k||(a[Ib]=k=new Fb(a));c=k.add(b,c,d,e,f);if(c.Xb)return;d=Pb();c.Xb=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Qb(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
	Kb++},Pb=function(){var a=Rb,b=wb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},Sb=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Sb(a,b[f],c,d,e);else c=Mb(c),a&&a[Bb]?Tb(a,b,c,d,e):Nb(a,b,c,!0,d,e)},Ub=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Ub(a,b[f],c,d,e);else c=Mb(c),a&&a[Bb]?a.Y.remove(String(b),c,d,e):a&&(a=Ob(a))&&(b=a.uc(b,c,!!d,e))&&Vb(b)},Vb=function(a){if(ga(a)||!a||a.$a)return;var b=a.src;if(b&&
	b[Bb]){Hb(b.Y,a);return}var c=a.type,d=a.Xb;b.removeEventListener?b.removeEventListener(c,d,a.Cb):b.detachEvent&&b.detachEvent(Qb(c),d);Kb--;(c=Ob(b))?(Hb(c,a),0==c.yb&&(c.src=null,b[Ib]=null)):Eb(a)},Qb=function(a){return a in Jb?Jb[a]:Jb[a]="on"+a},Xb=function(a,b,c,d){var e=!0;if(a=Ob(a))if(b=a.w[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.Cb==c&&!f.$a&&(f=Wb(f,d),e=e&&!1!==f)}return e},Wb=function(a,b){var c=a.listener,d=a.Kb||a.src;a.Bb&&Vb(a);return c.call(d,b)},Rb=function(a,
	b){if(a.$a)return!0;if(!wb){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Ab(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.currentTarget;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;!b.Va&&0<=e;e--){b.currentTarget=d[e];var f=Xb(d[e],a,!0,b),c=c&&f}for(e=0;!b.Va&&e<d.length;e++)b.currentTarget=
	d[e],f=Xb(d[e],a,!1,b),c=c&&f}return c}return Wb(a,new Ab(b,this))},Ob=function(a){a=a[Ib];return a instanceof Fb?a:null},Yb="__closure_events_fn_"+(1E9*Math.random()>>>0),Mb=function(a){w(a,"Listener can not be null.");if(p(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[Yb]||(a[Yb]=function(b){return a.handleEvent(b)});return a[Yb]};var Zb=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var ac=function(){this.fc="";this.Md=$b};ac.prototype.Nb=!0;ac.prototype.Ib=function(){return this.fc};ac.prototype.toString=function(){return"Const{"+this.fc+"}"};var bc=function(a){if(a instanceof ac&&a.constructor===ac&&a.Md===$b)return a.fc;za("expected object of type Const, got '"+a+"'");return"type_error:Const"},$b={};var B=function(){this.ja="";this.Ld=cc};B.prototype.Nb=!0;B.prototype.Ib=function(){return this.ja};B.prototype.toString=function(){return"SafeUrl{"+this.ja+"}"};
	var dc=function(a){if(a instanceof B&&a.constructor===B&&a.Ld===cc)return a.ja;za("expected object of type SafeUrl, got '"+a+"' of type "+m(a));return"type_error:SafeUrl"},ec=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,gc=function(a){if(a instanceof B)return a;a=a.Nb?a.Ib():String(a);ec.test(a)||(a="about:invalid#zClosurez");return fc(a)},cc={},fc=function(a){var b=new B;b.ja=a;return b};fc("about:blank");var hc=function(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))},ic=function(a){a=String(a);if(hc(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},lc=function(a){var b=[];jc(new kc,a,b);return b.join("")},kc=function(){this.ac=void 0},
	jc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ea(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],jc(a,a.ac?a.ac.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),mc(d,c),c.push(":"),jc(a,a.ac?a.ac.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":mc(b,
	c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},nc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},oc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,mc=function(a,b){b.push('"',a.replace(oc,function(a){var b=nc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),
	nc[a]=b);return b}),'"')};var pc=function(){};pc.prototype.Tc=null;pc.prototype.kb=ca;var qc=function(a){return a.Tc||(a.Tc=a.Qb())};pc.prototype.Qb=ca;var rc,sc=function(){};t(sc,pc);sc.prototype.kb=function(){var a=tc(this);return a?new ActiveXObject(a):new XMLHttpRequest};sc.prototype.Qb=function(){var a={};tc(this)&&(a[0]=!0,a[1]=!0);return a};
	var tc=function(a){if(!a.gd&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.gd=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.gd};rc=new sc;var uc=function(){};t(uc,pc);uc.prototype.kb=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new vc;throw Error("Unsupported browser");};uc.prototype.Qb=function(){return{}};
	var vc=function(){this.oa=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.oa.onload=r(this.ee,this);this.oa.onerror=r(this.ed,this);this.oa.onprogress=r(this.fe,this);this.oa.ontimeout=r(this.ge,this)};h=vc.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.oa.open(a,b)};
	h.send=function(a){if(a)if("string"==typeof a)this.oa.send(a);else throw Error("Only string data is supported");else this.oa.send()};h.abort=function(){this.oa.abort()};h.setRequestHeader=function(){};h.ee=function(){this.status=200;this.responseText=this.oa.responseText;wc(this,4)};h.ed=function(){this.status=500;this.responseText="";wc(this,4)};h.ge=function(){this.ed()};h.fe=function(){this.status=200;wc(this,1)};var wc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};var C=function(a,b){this.h=[];this.g=b;for(var c=!0,d=a.length-1;0<=d;d--){var e=a[d]|0;c&&e==b||(this.h[d]=e,c=!1)}},xc={},yc=function(a){if(-128<=a&&128>a){var b=xc[a];if(b)return b}b=new C([a|0],0>a?-1:0);-128<=a&&128>a&&(xc[a]=b);return b},F=function(a){if(isNaN(a)||!isFinite(a))return D;if(0>a)return E(F(-a));for(var b=[],c=1,d=0;a>=c;d++)b[d]=a/c|0,c*=4294967296;return new C(b,0)},zc=function(a,b){if(0==a.length)throw Error("number format error: empty string");b=b||10;if(2>b||36<b)throw Error("radix out of range: "+
	b);if("-"==a.charAt(0))return E(zc(a.substring(1),b));if(0<=a.indexOf("-"))throw Error('number format error: interior "-" character');for(var c=F(Math.pow(b,8)),d=D,e=0;e<a.length;e+=8){var f=Math.min(8,a.length-e),g=parseInt(a.substring(e,e+f),b);8>f?(f=F(Math.pow(b,f)),d=d.multiply(f).add(F(g))):(d=d.multiply(c),d=d.add(F(g)))}return d},D=yc(0),Ac=yc(1),Bc=yc(16777216),Cc=function(a){if(-1==a.g)return-Cc(E(a));for(var b=0,c=1,d=0;d<a.h.length;d++)b+=Dc(a,d)*c,c*=4294967296;return b};
	C.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(G(this))return"0";if(-1==this.g)return"-"+E(this).toString(a);for(var b=F(Math.pow(a,6)),c=this,d="";;){var e=Ec(c,b),c=Fc(c,e.multiply(b)),f=((0<c.h.length?c.h[0]:c.g)>>>0).toString(a),c=e;if(G(c))return f+d;for(;6>f.length;)f="0"+f;d=""+f+d}};
	var H=function(a,b){return 0>b?0:b<a.h.length?a.h[b]:a.g},Dc=function(a,b){a=H(a,b);return 0<=a?a:4294967296+a},G=function(a){if(0!=a.g)return!1;for(var b=0;b<a.h.length;b++)if(0!=a.h[b])return!1;return!0};C.prototype.Eb=function(a){if(this.g!=a.g)return!1;for(var b=Math.max(this.h.length,a.h.length),c=0;c<b;c++)if(H(this,c)!=H(a,c))return!1;return!0};C.prototype.compare=function(a){a=Fc(this,a);return-1==a.g?-1:G(a)?0:1};
	var E=function(a){for(var b=a.h.length,c=[],d=0;d<b;d++)c[d]=~a.h[d];return(new C(c,~a.g)).add(Ac)};C.prototype.add=function(a){for(var b=Math.max(this.h.length,a.h.length),c=[],d=0,e=0;e<=b;e++){var f=d+(H(this,e)&65535)+(H(a,e)&65535),g=(f>>>16)+(H(this,e)>>>16)+(H(a,e)>>>16),d=g>>>16,f=f&65535,g=g&65535;c[e]=g<<16|f}return new C(c,c[c.length-1]&-2147483648?-1:0)};var Fc=function(a,b){return a.add(E(b))};
	C.prototype.multiply=function(a){if(G(this)||G(a))return D;if(-1==this.g)return-1==a.g?E(this).multiply(E(a)):E(E(this).multiply(a));if(-1==a.g)return E(this.multiply(E(a)));if(0>this.compare(Bc)&&0>a.compare(Bc))return F(Cc(this)*Cc(a));for(var b=this.h.length+a.h.length,c=[],d=0;d<2*b;d++)c[d]=0;for(d=0;d<this.h.length;d++)for(var e=0;e<a.h.length;e++){var f=H(this,d)>>>16,g=H(this,d)&65535,k=H(a,e)>>>16,q=H(a,e)&65535;c[2*d+2*e]+=g*q;Gc(c,2*d+2*e);c[2*d+2*e+1]+=f*q;Gc(c,2*d+2*e+1);c[2*d+2*e+1]+=
	g*k;Gc(c,2*d+2*e+1);c[2*d+2*e+2]+=f*k;Gc(c,2*d+2*e+2)}for(d=0;d<b;d++)c[d]=c[2*d+1]<<16|c[2*d];for(d=b;d<2*b;d++)c[d]=0;return new C(c,0)};
	var Gc=function(a,b){for(;(a[b]&65535)!=a[b];)a[b+1]+=a[b]>>>16,a[b]&=65535,b++},Ec=function(a,b){if(G(b))throw Error("division by zero");if(G(a))return D;if(-1==a.g)return-1==b.g?Ec(E(a),E(b)):E(Ec(E(a),b));if(-1==b.g)return E(Ec(a,E(b)));if(30<a.h.length){if(-1==a.g||-1==b.g)throw Error("slowDivide_ only works with positive integers.");for(var c=Ac;0>=b.compare(a);)c=c.shiftLeft(1),b=b.shiftLeft(1);var d=Hc(c,1),e=Hc(b,1),f;b=Hc(b,2);for(c=Hc(c,2);!G(b);)f=e.add(b),0>=f.compare(a)&&(d=d.add(c),
	e=f),b=Hc(b,1),c=Hc(c,1);return d}for(c=D;0<=a.compare(b);){d=Math.max(1,Math.floor(Cc(a)/Cc(b)));e=Math.ceil(Math.log(d)/Math.LN2);e=48>=e?1:Math.pow(2,e-48);f=F(d);for(var g=f.multiply(b);-1==g.g||0<g.compare(a);)d-=e,f=F(d),g=f.multiply(b);G(f)&&(f=Ac);c=c.add(f);a=Fc(a,g)}return c},Ic=function(a,b){for(var c=Math.max(a.h.length,b.h.length),d=[],e=0;e<c;e++)d[e]=H(a,e)|H(b,e);return new C(d,a.g|b.g)};
	C.prototype.shiftLeft=function(a){var b=a>>5;a%=32;for(var c=this.h.length+b+(0<a?1:0),d=[],e=0;e<c;e++)d[e]=0<a?H(this,e-b)<<a|H(this,e-b-1)>>>32-a:H(this,e-b);return new C(d,this.g)};var Hc=function(a,b){var c=b>>5;b%=32;for(var d=a.h.length-c,e=[],f=0;f<d;f++)e[f]=0<b?H(a,f+c)>>>b|H(a,f+c+1)<<32-b:H(a,f+c);return new C(e,a.g)};var Jc=function(a,b){this.pb=a;this.na=b};Jc.prototype.Eb=function(a){return this.na==a.na&&this.pb.Eb(Wa(a.pb))};Jc.prototype.toString=ca;
	var Mc=function(a){try{var b;if(b=0==a.lastIndexOf("[",0)){var c=a.length-1;b=0<=c&&a.indexOf("]",c)==c}return b?new Kc(a.substring(1,a.length-1)):new Lc(a)}catch(d){return null}},Lc=function(a){var b=D;if(a instanceof C){if(0!=a.g||0>a.compare(D)||0<a.compare(Nc))throw Error("The address does not look like an IPv4.");b=Wa(a)}else{if(!Oc.test(a))throw Error(a+" does not look like an IPv4 address.");var c=a.split(".");if(4!=c.length)throw Error(a+" does not look like an IPv4 address.");for(var d=0;d<
	c.length;d++){var e;e=c[d];var f=Number(e);e=0==f&&/^[\s\xa0]*$/.test(e)?NaN:f;if(isNaN(e)||0>e||255<e||1!=c[d].length&&0==c[d].lastIndexOf("0",0))throw Error("In "+a+", octet "+d+" is not valid");e=F(e);b=Ic(b.shiftLeft(8),e)}}Jc.call(this,b,4)};t(Lc,Jc);var Oc=/^[0-9.]*$/,Nc=Fc(Ac.shiftLeft(32),Ac);Lc.prototype.toString=function(){if(this.Ca)return this.Ca;for(var a=Dc(this.pb,0),b=[],c=3;0<=c;c--)b[c]=String(a&255),a>>>=8;return this.Ca=b.join(".")};
	var Kc=function(a){var b=D;if(a instanceof C){if(0!=a.g||0>a.compare(D)||0<a.compare(Pc))throw Error("The address does not look like a valid IPv6.");b=Wa(a)}else{if(!Qc.test(a))throw Error(a+" is not a valid IPv6 address.");var c=a.split(":");if(-1!=c[c.length-1].indexOf(".")){a=Dc(Wa((new Lc(c[c.length-1])).pb),0);var d=[];d.push((a>>>16&65535).toString(16));d.push((a&65535).toString(16));Ka(c,c.length-1);Qa(c,d);a=c.join(":")}d=a.split("::");if(2<d.length||1==d.length&&8!=c.length)throw Error(a+
	" is not a valid IPv6 address.");if(1<d.length){c=d[0].split(":");d=d[1].split(":");1==c.length&&""==c[0]&&(c=[]);1==d.length&&""==d[0]&&(d=[]);var e=8-(c.length+d.length);if(1>e)c=[];else{for(var f=[],g=0;g<e;g++)f[g]="0";c=Oa(c,f,d)}}if(8!=c.length)throw Error(a+" is not a valid IPv6 address");for(d=0;d<c.length;d++){e=zc(c[d],16);if(0>e.compare(D)||0<e.compare(Rc))throw Error(c[d]+" in "+a+" is not a valid hextet.");b=Ic(b.shiftLeft(16),e)}}Jc.call(this,b,6)};t(Kc,Jc);
	var Qc=/^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/,Rc=yc(65535),Pc=Fc(Ac.shiftLeft(128),Ac);Kc.prototype.toString=function(){if(this.Ca)return this.Ca;for(var a=[],b=3;0<=b;b--){var c=Dc(this.pb,b),d=c&65535;a.push((c>>>16).toString(16));a.push(d.toString(16))}for(var c=b=-1,e=d=0,f=0;f<a.length;f++)"0"==a[f]?(e++,-1==c&&(c=f),e>d&&(d=e,b=c)):(c=-1,e=0);0<d&&(b+d==a.length&&a.push(""),a.splice(b,d,""),0==b&&(a=[""].concat(a)));return this.Ca=a.join(":")};var Tc=function(){this.Wb="";this.Nd=Sc};Tc.prototype.Nb=!0;Tc.prototype.Ib=function(){return this.Wb};Tc.prototype.toString=function(){return"TrustedResourceUrl{"+this.Wb+"}"};var Sc={};var Vc=function(){this.ja="";this.Kd=Uc};Vc.prototype.Nb=!0;Vc.prototype.Ib=function(){return this.ja};Vc.prototype.toString=function(){return"SafeHtml{"+this.ja+"}"};var Wc=function(a){if(a instanceof Vc&&a.constructor===Vc&&a.Kd===Uc)return a.ja;za("expected object of type SafeHtml, got '"+a+"' of type "+m(a));return"type_error:SafeHtml"},Uc={};Vc.prototype.ne=function(a){this.ja=a;return this};!hb&&!z||z&&9<=Number(qb)||hb&&A("1.9.1");z&&A("9");var Yc=function(a,b){Ra(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Xc.hasOwnProperty(d)?a.setAttribute(Xc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Xc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var Zc=function(a,b,c){this.pe=c;this.Td=a;this.ye=b;this.Sb=0;this.Lb=null};Zc.prototype.get=function(){var a;0<this.Sb?(this.Sb--,a=this.Lb,this.Lb=a.next,a.next=null):a=this.Td();return a};Zc.prototype.put=function(a){this.ye(a);this.Sb<this.pe&&(this.Sb++,a.next=this.Lb,this.Lb=a)};var $c=function(a){l.setTimeout(function(){throw a;},0)},ad,bd=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!y("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=r(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!y("Trident")&&!y("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.Xc;c.Xc=null;a()}};return function(a){d.next={Xc:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var cd=function(){this.kc=this.Ja=null},ed=new Zc(function(){return new dd},function(a){a.reset()},100);cd.prototype.add=function(a,b){var c=ed.get();c.set(a,b);this.kc?this.kc.next=c:(w(!this.Ja),this.Ja=c);this.kc=c};cd.prototype.remove=function(){var a=null;this.Ja&&(a=this.Ja,this.Ja=this.Ja.next,this.Ja||(this.kc=null),a.next=null);return a};var dd=function(){this.next=this.scope=this.tc=null};dd.prototype.set=function(a,b){this.tc=a;this.scope=b;this.next=null};
	dd.prototype.reset=function(){this.next=this.scope=this.tc=null};var jd=function(a,b){fd||gd();hd||(fd(),hd=!0);id.add(a,b)},fd,gd=function(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);fd=function(){a.then(kd)}}else fd=function(){var a=kd;!p(l.setImmediate)||l.Window&&l.Window.prototype&&!y("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(ad||(ad=bd()),ad(a)):l.setImmediate(a)}},hd=!1,id=new cd,kd=function(){for(var a;a=id.remove();){try{a.tc.call(a.scope)}catch(b){$c(b)}ed.put(a)}hd=!1};var ld=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},md=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var I=function(a,b){this.F=0;this.ka=void 0;this.Ma=this.fa=this.o=null;this.Jb=this.sc=!1;if(a!=ba)try{var c=this;a.call(b,function(a){nd(c,2,a)},function(a){if(!(a instanceof od))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}nd(c,3,a)})}catch(d){nd(this,3,d)}},pd=function(){this.next=this.context=this.Sa=this.Ea=this.child=null;this.ib=!1};pd.prototype.reset=function(){this.context=this.Sa=this.Ea=this.child=null;this.ib=!1};
	var qd=new Zc(function(){return new pd},function(a){a.reset()},100),rd=function(a,b,c){var d=qd.get();d.Ea=a;d.Sa=b;d.context=c;return d},J=function(a){if(a instanceof I)return a;var b=new I(ba);nd(b,2,a);return b},K=function(a){return new I(function(b,c){c(a)})},td=function(a,b,c){sd(a,b,c,null)||jd(ka(b,a))},ud=function(a){return new I(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{be:!0,value:f}:{be:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],td(g,ka(e,f,!0),
	ka(e,f,!1));else b(d)})};I.prototype.then=function(a,b,c){null!=a&&Ca(a,"opt_onFulfilled should be a function.");null!=b&&Ca(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return vd(this,p(a)?a:null,p(b)?b:null,c)};ld(I);var xd=function(a,b){b=rd(b,b,void 0);b.ib=!0;wd(a,b);return a};I.prototype.l=function(a,b){return vd(this,null,a,b)};I.prototype.cancel=function(a){0==this.F&&jd(function(){var b=new od(a);yd(this,b)},this)};
	var yd=function(a,b){if(0==a.F)if(a.o){var c=a.o;if(c.fa){for(var d=0,e=null,f=null,g=c.fa;g&&(g.ib||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.F&&1==d?yd(c,b):(f?(d=f,w(c.fa),w(null!=d),d.next==c.Ma&&(c.Ma=d),d.next=d.next.next):zd(c),Ad(c,e,3,b)))}a.o=null}else nd(a,3,b)},wd=function(a,b){a.fa||2!=a.F&&3!=a.F||Bd(a);w(null!=b.Ea);a.Ma?a.Ma.next=b:a.fa=b;a.Ma=b},vd=function(a,b,c,d){var e=rd(null,null,null);e.child=new I(function(a,g){e.Ea=b?function(c){try{var e=b.call(d,c);a(e)}catch(ra){g(ra)}}:
	a;e.Sa=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof od?g(b):a(e)}catch(ra){g(ra)}}:g});e.child.o=a;wd(a,e);return e.child};I.prototype.He=function(a){w(1==this.F);this.F=0;nd(this,2,a)};I.prototype.Ie=function(a){w(1==this.F);this.F=0;nd(this,3,a)};
	var nd=function(a,b,c){0==a.F&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.F=1,sd(c,a.He,a.Ie,a)||(a.ka=c,a.F=b,a.o=null,Bd(a),3!=b||c instanceof od||Cd(a,c)))},sd=function(a,b,c,d){if(a instanceof I)return null!=b&&Ca(b,"opt_onFulfilled should be a function."),null!=c&&Ca(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),wd(a,rd(b||ba,c||null,d)),!0;if(md(a))return a.then(b,c,d),!0;if(ha(a))try{var e=a.then;if(p(e))return Dd(a,
	e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Dd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(q){k(q)}},Bd=function(a){a.sc||(a.sc=!0,jd(a.Xd,a))},zd=function(a){var b=null;a.fa&&(b=a.fa,a.fa=b.next,b.next=null);a.fa||(a.Ma=null);null!=b&&w(null!=b.Ea);return b};I.prototype.Xd=function(){for(var a;a=zd(this);)Ad(this,a,this.F,this.ka);this.sc=!1};
	var Ad=function(a,b,c,d){if(3==c&&b.Sa&&!b.ib)for(;a&&a.Jb;a=a.o)a.Jb=!1;if(b.child)b.child.o=null,Ed(b,c,d);else try{b.ib?b.Ea.call(b.context):Ed(b,c,d)}catch(e){Fd.call(null,e)}qd.put(b)},Ed=function(a,b,c){2==b?a.Ea.call(a.context,c):a.Sa&&a.Sa.call(a.context,c)},Cd=function(a,b){a.Jb=!0;jd(function(){a.Jb&&Fd.call(null,b)})},Fd=$c,od=function(a){u.call(this,a)};t(od,u);od.prototype.name="cancel";/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var Gd=function(a,b){this.bc=[];this.nd=a;this.Zc=b||null;this.nb=this.Qa=!1;this.ka=void 0;this.Nc=this.Sc=this.nc=!1;this.ic=0;this.o=null;this.oc=0};Gd.prototype.cancel=function(a){if(this.Qa)this.ka instanceof Gd&&this.ka.cancel();else{if(this.o){var b=this.o;delete this.o;a?b.cancel(a):(b.oc--,0>=b.oc&&b.cancel())}this.nd?this.nd.call(this.Zc,this):this.Nc=!0;this.Qa||Hd(this,new Id)}};Gd.prototype.Yc=function(a,b){this.nc=!1;Jd(this,a,b)};
	var Jd=function(a,b,c){a.Qa=!0;a.ka=c;a.nb=!b;Kd(a)},Md=function(a){if(a.Qa){if(!a.Nc)throw new Ld;a.Nc=!1}};Gd.prototype.callback=function(a){Md(this);Nd(a);Jd(this,!0,a)};
	var Hd=function(a,b){Md(a);Nd(b);Jd(a,!1,b)},Nd=function(a){w(!(a instanceof Gd),"An execution sequence may not be initiated with a blocking Deferred.")},Rd=function(a){var b=Od("https://apis.google.com/js/client.js?onload="+Pd);Qd(b,null,a,void 0)},Qd=function(a,b,c,d){w(!a.Sc,"Blocking Deferreds can not be re-used");a.bc.push([b,c,d]);a.Qa&&Kd(a)};Gd.prototype.then=function(a,b,c){var d,e,f=new I(function(a,b){d=a;e=b});Qd(this,d,function(a){a instanceof Id?f.cancel():e(a)});return f.then(a,b,c)};
	ld(Gd);
	var Sd=function(a){return Ga(a.bc,function(a){return p(a[1])})},Kd=function(a){if(a.ic&&a.Qa&&Sd(a)){var b=a.ic,c=Td[b];c&&(l.clearTimeout(c.ob),delete Td[b]);a.ic=0}a.o&&(a.o.oc--,delete a.o);for(var b=a.ka,d=c=!1;a.bc.length&&!a.nc;){var e=a.bc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.nb?g:f)try{var k=f.call(e||a.Zc,b);void 0!==k&&(a.nb=a.nb&&(k==b||k instanceof Error),a.ka=b=k);if(md(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.nc=!0}catch(q){b=q,a.nb=!0,Sd(a)||(c=!0)}}a.ka=b;d&&
	(k=r(a.Yc,a,!0),d=r(a.Yc,a,!1),b instanceof Gd?(Qd(b,k,d),b.Sc=!0):b.then(k,d));c&&(b=new Ud(b),Td[b.ob]=b,a.ic=b.ob)},Ld=function(){u.call(this)};t(Ld,u);Ld.prototype.message="Deferred has already fired";Ld.prototype.name="AlreadyCalledError";var Id=function(){u.call(this)};t(Id,u);Id.prototype.message="Deferred was canceled";Id.prototype.name="CanceledError";var Ud=function(a){this.ob=l.setTimeout(r(this.Ge,this),0);this.J=a};
	Ud.prototype.Ge=function(){w(Td[this.ob],"Cannot throw an error that is not scheduled.");delete Td[this.ob];throw this.J;};var Td={};var Od=function(a){var b=new Tc;b.Wb=a;return Vd(b)},Vd=function(a){var b={},c=b.document||document,d;a instanceof Tc&&a.constructor===Tc&&a.Nd===Sc?d=a.Wb:(za("expected object of type TrustedResourceUrl, got '"+a+"' of type "+m(a)),d="type_error:TrustedResourceUrl");var e=document.createElement("SCRIPT");a={vd:e,xb:void 0};var f=new Gd(Wd,a),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){Xd(e,!0);Hd(f,new Yd(1,"Timeout reached for loading script "+d))},k),a.xb=g);e.onload=
	e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(Xd(e,b.Oe||!1,g),f.callback(null))};e.onerror=function(){Xd(e,!0,g);Hd(f,new Yd(0,"Error while loading script "+d))};a=b.attributes||{};Ya(a,{type:"text/javascript",charset:"UTF-8",src:d});Yc(e,a);Zd(c).appendChild(e);return f},Zd=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},Wd=function(){if(this&&this.vd){var a=this.vd;a&&"SCRIPT"==a.tagName&&
	Xd(a,!0,this.xb)}},Xd=function(a,b,c){null!=c&&l.clearTimeout(c);a.onload=ba;a.onerror=ba;a.onreadystatechange=ba;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},Yd=function(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};t(Yd,u);var $d=function(){yb.call(this);this.Y=new Fb(this);this.Qd=this;this.Cc=null};t($d,yb);$d.prototype[Bb]=!0;h=$d.prototype;h.addEventListener=function(a,b,c,d){Lb(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){Ub(this,a,b,c,d)};
	h.dispatchEvent=function(a){ae(this);var b,c=this.Cc;if(c){b=[];for(var d=1;c;c=c.Cc)b.push(c),w(1E3>++d,"infinite loop")}c=this.Qd;d=a.type||a;if(n(a))a=new zb(a,c);else if(a instanceof zb)a.target=a.target||c;else{var e=a;a=new zb(d,c);Ya(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.Va&&0<=g;g--)f=a.currentTarget=b[g],e=be(f,d,!0,a)&&e;a.Va||(f=a.currentTarget=c,e=be(f,d,!0,a)&&e,a.Va||(e=be(f,d,!1,a)&&e));if(b)for(g=0;!a.Va&&g<b.length;g++)f=a.currentTarget=b[g],e=be(f,d,!1,a)&&e;return e};
	h.Oa=function(){$d.Pc.Oa.call(this);if(this.Y){var a=this.Y,b=0,c;for(c in a.w){for(var d=a.w[c],e=0;e<d.length;e++)++b,Eb(d[e]);delete a.w[c];a.yb--}}this.Cc=null};h.listen=function(a,b,c,d){ae(this);return this.Y.add(String(a),b,!1,c,d)};
	var Tb=function(a,b,c,d,e){a.Y.add(String(b),c,!0,d,e)},be=function(a,b,c,d){b=a.Y.w[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.$a&&g.Cb==c){var k=g.listener,q=g.Kb||g.src;g.Bb&&Hb(a.Y,g);e=!1!==k.call(q,d)&&e}}return e&&0!=d.ud};$d.prototype.uc=function(a,b,c,d){return this.Y.uc(String(a),b,c,d)};var ae=function(a){w(a.Y,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var ce="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},de=function(){};de.prototype.next=function(){throw ce;};de.prototype.Pd=function(){return this};var ee=function(a,b){this.Z={};this.s=[];this.na=this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=ee.prototype;h.dd=function(){return this.i};h.T=function(){fe(this);for(var a=[],b=0;b<this.s.length;b++)a.push(this.Z[this.s[b]]);return a};h.ha=function(){fe(this);return this.s.concat()};h.jb=function(a){return ge(this.Z,a)};
	h.Eb=function(a,b){if(this===a)return!0;if(this.i!=a.dd())return!1;b=b||he;fe(this);for(var c,d=0;c=this.s[d];d++)if(!b(this.get(c),a.get(c)))return!1;return!0};var he=function(a,b){return a===b};ee.prototype.remove=function(a){return ge(this.Z,a)?(delete this.Z[a],this.i--,this.na++,this.s.length>2*this.i&&fe(this),!0):!1};
	var fe=function(a){if(a.i!=a.s.length){for(var b=0,c=0;b<a.s.length;){var d=a.s[b];ge(a.Z,d)&&(a.s[c++]=d);b++}a.s.length=c}if(a.i!=a.s.length){for(var e={},c=b=0;b<a.s.length;)d=a.s[b],ge(e,d)||(a.s[c++]=d,e[d]=1),b++;a.s.length=c}};h=ee.prototype;h.get=function(a,b){return ge(this.Z,a)?this.Z[a]:b};h.set=function(a,b){ge(this.Z,a)||(this.i++,this.s.push(a),this.na++);this.Z[a]=b};
	h.addAll=function(a){var b;a instanceof ee?(b=a.ha(),a=a.T()):(b=Ta(a),a=Sa(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ha(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new ee(this)};h.Pd=function(a){fe(this);var b=0,c=this.na,d=this,e=new de;e.next=function(){if(c!=d.na)throw Error("The map has changed since the iterator was created");if(b>=d.s.length)throw ce;var e=d.s[b++];return a?e:d.Z[e]};return e};
	var ge=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var ie=function(a){if(a.T&&"function"==typeof a.T)return a.T();if(n(a))return a.split("");if(fa(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Sa(a)},je=function(a){if(a.ha&&"function"==typeof a.ha)return a.ha();if(!a.T||"function"!=typeof a.T){if(fa(a)||n(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Ta(a)}},ke=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(fa(a)||n(a))x(a,b,void 0);else for(var c=je(a),d=ie(a),e=
	d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};var le=function(a,b,c,d,e){this.reset(a,b,c,d,e)};le.prototype.ad=null;var me=0;le.prototype.reset=function(a,b,c,d,e){"number"==typeof e||me++;d||la();this.rb=a;this.re=b;delete this.ad};le.prototype.yd=function(a){this.rb=a};var ne=function(a){this.se=a;this.fd=this.pc=this.rb=this.o=null},oe=function(a,b){this.name=a;this.value=b};oe.prototype.toString=function(){return this.name};var pe=new oe("SEVERE",1E3),qe=new oe("CONFIG",700),re=new oe("FINE",500);ne.prototype.getParent=function(){return this.o};ne.prototype.yd=function(a){this.rb=a};var se=function(a){if(a.rb)return a.rb;if(a.o)return se(a.o);za("Root logger has no level set.");return null};
	ne.prototype.log=function(a,b,c){if(a.value>=se(this).value)for(p(b)&&(b=b()),a=new le(a,String(b),this.se),c&&(a.ad=c),c="log:"+a.re,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.fd)for(var e=0,f;f=b.fd[e];e++)f(d);c=c.getParent()}};
	var te={},ue=null,ve=function(a){ue||(ue=new ne(""),te[""]=ue,ue.yd(qe));var b;if(!(b=te[a])){b=new ne(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ve(a.substr(0,c));c.pc||(c.pc={});c.pc[d]=b;b.o=c;te[a]=b}return b};var L=function(a,b){a&&a.log(re,b,void 0)};var we=function(a,b,c){if(p(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)},xe=function(a){var b=null;return(new I(function(c,d){b=we(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).l(function(a){l.clearTimeout(b);throw a;})};var ye=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,ze=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e,f=null;0<=d?(e=a[c].substring(0,d),f=a[c].substring(d+1)):e=a[c];b(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}};var M=function(a){$d.call(this);this.headers=new ee;this.mc=a||null;this.pa=!1;this.lc=this.a=null;this.qb=this.ld=this.Rb="";this.Ba=this.xc=this.Ob=this.rc=!1;this.fb=0;this.hc=null;this.td="";this.jc=this.xe=this.Gd=!1};t(M,$d);var Ae=M.prototype,Be=ve("goog.net.XhrIo");Ae.P=Be;var Ce=/^https?$/i,De=["POST","PUT"];
	M.prototype.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.Rb+"; newUri="+a);b=b?b.toUpperCase():"GET";this.Rb=a;this.qb="";this.ld=b;this.rc=!1;this.pa=!0;this.a=this.mc?this.mc.kb():rc.kb();this.lc=this.mc?qc(this.mc):qc(rc);this.a.onreadystatechange=r(this.qd,this);this.xe&&"onprogress"in this.a&&(this.a.onprogress=r(function(a){this.pd(a,!0)},this),this.a.upload&&(this.a.upload.onprogress=r(this.pd,this)));try{L(this.P,Ee(this,"Opening Xhr")),
	this.xc=!0,this.a.open(b,String(a),!0),this.xc=!1}catch(f){L(this.P,Ee(this,"Error opening Xhr: "+f.message));this.J(5,f);return}a=c||"";var e=this.headers.clone();d&&ke(d,function(a,b){e.set(b,a)});d=Ia(e.ha());c=l.FormData&&a instanceof l.FormData;!Ja(De,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.td&&(this.a.responseType=this.td);"withCredentials"in this.a&&this.a.withCredentials!==this.Gd&&(this.a.withCredentials=
	this.Gd);try{Fe(this),0<this.fb&&(this.jc=Ge(this.a),L(this.P,Ee(this,"Will abort after "+this.fb+"ms if incomplete, xhr2 "+this.jc)),this.jc?(this.a.timeout=this.fb,this.a.ontimeout=r(this.xb,this)):this.hc=we(this.xb,this.fb,this)),L(this.P,Ee(this,"Sending request")),this.Ob=!0,this.a.send(a),this.Ob=!1}catch(f){L(this.P,Ee(this,"Send error: "+f.message)),this.J(5,f)}};var Ge=function(a){return z&&A(9)&&ga(a.timeout)&&void 0!==a.ontimeout},Ha=function(a){return"content-type"==a.toLowerCase()};
	M.prototype.xb=function(){"undefined"!=typeof aa&&this.a&&(this.qb="Timed out after "+this.fb+"ms, aborting",L(this.P,Ee(this,this.qb)),this.dispatchEvent("timeout"),this.abort(8))};M.prototype.J=function(a,b){this.pa=!1;this.a&&(this.Ba=!0,this.a.abort(),this.Ba=!1);this.qb=b;He(this);Ie(this)};var He=function(a){a.rc||(a.rc=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
	M.prototype.abort=function(){this.a&&this.pa&&(L(this.P,Ee(this,"Aborting")),this.pa=!1,this.Ba=!0,this.a.abort(),this.Ba=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Ie(this))};M.prototype.Oa=function(){this.a&&(this.pa&&(this.pa=!1,this.Ba=!0,this.a.abort(),this.Ba=!1),Ie(this,!0));M.Pc.Oa.call(this)};M.prototype.qd=function(){this.isDisposed()||(this.xc||this.Ob||this.Ba?Je(this):this.ve())};M.prototype.ve=function(){Je(this)};
	var Je=function(a){if(a.pa&&"undefined"!=typeof aa)if(a.lc[1]&&4==Ke(a)&&2==Le(a))L(a.P,Ee(a,"Local request error detected and ignored"));else if(a.Ob&&4==Ke(a))we(a.qd,0,a);else if(a.dispatchEvent("readystatechange"),4==Ke(a)){L(a.P,Ee(a,"Request complete"));a.pa=!1;try{var b=Le(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.Rb).match(ye)[1]||null;if(!f&&l.self&&l.self.location)var g=l.self.location.protocol,
	f=g.substr(0,g.length-1);e=!Ce.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<Ke(a)?a.a.statusText:""}catch(q){L(a.P,"Can not get status: "+q.message),k=""}a.qb=k+" ["+Le(a)+"]";He(a)}}finally{Ie(a)}}};M.prototype.pd=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(Me(a,"progress"));this.dispatchEvent(Me(a,b?"downloadprogress":"uploadprogress"))};
	var Me=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Ie=function(a,b){if(a.a){Fe(a);var c=a.a,d=a.lc[0]?ba:null;a.a=null;a.lc=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.P)&&a.log(pe,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Fe=function(a){a.a&&a.jc&&(a.a.ontimeout=null);ga(a.hc)&&(l.clearTimeout(a.hc),a.hc=null)},Ke=function(a){return a.a?a.a.readyState:0},Le=function(a){try{return 2<Ke(a)?
	a.a.status:-1}catch(b){return-1}},Ne=function(a){try{return a.a?a.a.responseText:""}catch(b){return L(a.P,"Can not get responseText: "+b.message),""}},Ee=function(a,b){return b+" ["+a.ld+" "+a.Rb+" "+Le(a)+"]"};var Oe=function(a,b){this.ga=this.Ia=this.la="";this.Ua=null;this.Aa=this.ra="";this.M=this.oe=!1;var c;a instanceof Oe?(this.M=void 0!==b?b:a.M,Pe(this,a.la),c=a.Ia,N(this),this.Ia=c,Qe(this,a.ga),Re(this,a.Ua),Se(this,a.ra),Te(this,a.aa.clone()),a=a.Aa,N(this),this.Aa=a):a&&(c=String(a).match(ye))?(this.M=!!b,Pe(this,c[1]||"",!0),a=c[2]||"",N(this),this.Ia=Ue(a),Qe(this,c[3]||"",!0),Re(this,c[4]),Se(this,c[5]||"",!0),Te(this,c[6]||"",!0),a=c[7]||"",N(this),this.Aa=Ue(a)):(this.M=!!b,this.aa=new O(null,
	0,this.M))};Oe.prototype.toString=function(){var a=[],b=this.la;b&&a.push(Ve(b,We,!0),":");var c=this.ga;if(c||"file"==b)a.push("//"),(b=this.Ia)&&a.push(Ve(b,We,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.Ua,null!=c&&a.push(":",String(c));if(c=this.ra)this.ga&&"/"!=c.charAt(0)&&a.push("/"),a.push(Ve(c,"/"==c.charAt(0)?Xe:Ye,!0));(c=this.aa.toString())&&a.push("?",c);(c=this.Aa)&&a.push("#",Ve(c,Ze));return a.join("")};
	Oe.prototype.resolve=function(a){var b=this.clone(),c=!!a.la;c?Pe(b,a.la):c=!!a.Ia;if(c){var d=a.Ia;N(b);b.Ia=d}else c=!!a.ga;c?Qe(b,a.ga):c=null!=a.Ua;d=a.ra;if(c)Re(b,a.Ua);else if(c=!!a.ra){if("/"!=d.charAt(0))if(this.ga&&!this.ra)d="/"+d;else{var e=b.ra.lastIndexOf("/");-1!=e&&(d=b.ra.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):".."==k?((1<f.length||
	1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?Se(b,d):c=""!==a.aa.toString();c?Te(b,Ue(a.aa.toString())):c=!!a.Aa;c&&(a=a.Aa,N(b),b.Aa=a);return b};Oe.prototype.clone=function(){return new Oe(this)};
	var Pe=function(a,b,c){N(a);a.la=c?Ue(b,!0):b;a.la&&(a.la=a.la.replace(/:$/,""))},Qe=function(a,b,c){N(a);a.ga=c?Ue(b,!0):b},Re=function(a,b){N(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.Ua=b}else a.Ua=null},Se=function(a,b,c){N(a);a.ra=c?Ue(b,!0):b},Te=function(a,b,c){N(a);b instanceof O?(a.aa=b,a.aa.Mc(a.M)):(c||(b=Ve(b,$e)),a.aa=new O(b,0,a.M))},P=function(a,b,c){N(a);a.aa.set(b,c)},N=function(a){if(a.oe)throw Error("Tried to modify a read-only Uri");};
	Oe.prototype.Mc=function(a){this.M=a;this.aa&&this.aa.Mc(a);return this};
	var af=function(a){return a instanceof Oe?a.clone():new Oe(a,void 0)},bf=function(a,b){var c=new Oe(null,void 0);Pe(c,"https");a&&Qe(c,a);b&&Se(c,b);return c},Ue=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Ve=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,cf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},cf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},We=/[#\/\?@]/g,Ye=/[\#\?:]/g,Xe=/[\#\?]/g,$e=/[\#\?@]/g,
	Ze=/#/g,O=function(a,b,c){this.i=this.j=null;this.I=a||null;this.M=!!c},df=function(a){a.j||(a.j=new ee,a.i=0,a.I&&ze(a.I,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},ff=function(a){var b=je(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new O(null,0,void 0);a=ie(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];ea(f)?ef(c,e,f):c.add(e,f)}return c};h=O.prototype;h.dd=function(){df(this);return this.i};
	h.add=function(a,b){df(this);this.I=null;a=this.K(a);var c=this.j.get(a);c||this.j.set(a,c=[]);c.push(b);this.i=Aa(this.i)+1;return this};h.remove=function(a){df(this);a=this.K(a);return this.j.jb(a)?(this.I=null,this.i=Aa(this.i)-this.j.get(a).length,this.j.remove(a)):!1};h.jb=function(a){df(this);a=this.K(a);return this.j.jb(a)};h.ha=function(){df(this);for(var a=this.j.T(),b=this.j.ha(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
	h.T=function(a){df(this);var b=[];if(n(a))this.jb(a)&&(b=Na(b,this.j.get(this.K(a))));else{a=this.j.T();for(var c=0;c<a.length;c++)b=Na(b,a[c])}return b};h.set=function(a,b){df(this);this.I=null;a=this.K(a);this.jb(a)&&(this.i=Aa(this.i)-this.j.get(a).length);this.j.set(a,[b]);this.i=Aa(this.i)+1;return this};h.get=function(a,b){a=a?this.T(a):[];return 0<a.length?String(a[0]):b};var ef=function(a,b,c){a.remove(b);0<c.length&&(a.I=null,a.j.set(a.K(b),Pa(c)),a.i=Aa(a.i)+c.length)};
	O.prototype.toString=function(){if(this.I)return this.I;if(!this.j)return"";for(var a=[],b=this.j.ha(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.T(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.I=a.join("&")};O.prototype.clone=function(){var a=new O;a.I=this.I;this.j&&(a.j=this.j.clone(),a.i=this.i);return a};O.prototype.K=function(a){a=String(a);this.M&&(a=a.toLowerCase());return a};
	O.prototype.Mc=function(a){a&&!this.M&&(df(this),this.I=null,this.j.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),ef(this,b,a))},this));this.M=a};var hf=function(){var a=gf();return z&&!!qb&&11==qb||/Edge\/\d+/.test(a)},jf=function(){return l.window&&l.window.location.href||""},kf=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):ea(a[d])?Va(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<kf(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},mf=function(){var a;a=gf();a="Chrome"!=lf(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],
	10):null;return a&&30>a?!1:!z||!qb||9<qb},nf=function(a){(a||l.window).close()},of=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};d&&(b.target=d);"Firefox"==lf(gf())&&(a=a||"http://localhost",b.scrollbars=!0);var g;c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof B?c:gc("undefined"!=typeof c.href?
	c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;default:e.push(g+"="+(d[g]?1:0))}g=e.join(",");(y("iPhone")&&!y("iPod")&&!y("iPad")||y("iPad")||y("iPod"))&&a.navigator&&a.navigator.standalone&&c&&"_self"!=c?(g=a.document.createElement("A"),"undefined"!=typeof HTMLAnchorElement&&"undefined"!=typeof Location&&"undefined"!=typeof Element&&(e=g&&(g instanceof HTMLAnchorElement||
	!(g instanceof Location||g instanceof Element)),f=ha(g)?g.constructor.displayName||g.constructor.name||Object.prototype.toString.call(g):void 0===g?"undefined":null===g?"null":typeof g,w(e,"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",f)),b=b instanceof B?b:gc(b),g.href=dc(b),g.setAttribute("target",c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",
	c,g),d=dc(b),g&&(gb&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=new ac,a.fc="b/12014412, meta tag with sanitized URL",va.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(oa,"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(pa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(qa,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(sa,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(ta,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(ua,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',Ba(bc(a),"must provide justification"),
	w(!/^[\s\xa0]*$/.test(bc(a)),"must provide non-empty justification"),g.document.write(Wc((new Vc).ne(d))),g.document.close())):g=a.open(dc(b),c,g);if(g)try{g.focus()}catch(k){}return g},pf=function(a){return new I(function(b){var c=function(){xe(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},qf=function(){var a=null;return(new I(function(b){"complete"==l.document.readyState?b():(a=function(){b()},Sb(window,"load",a))})).l(function(b){Ub(window,"load",a);throw b;})},rf=function(a){switch(a||
	l.navigator&&l.navigator.product||""){case "ReactNative":return"ReactNative";default:return"undefined"!==typeof l.process?"Node":"Browser"}},sf=function(){var a=rf();return"ReactNative"===a||"Node"===a},lf=function(a){var b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,"iemobile"))return"IEMobile";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"blackberry"))return"Blackberry";
	if(v(b,"webos"))return"Webos";if(!v(b,"safari/")||v(b,"chrome/")||v(b,"crios/")||v(b,"android"))if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if(v(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},tf=function(a){var b=rf(void 0);return("Browser"===b?lf(gf()):b)+"/JsCore/"+a},gf=function(){return l.navigator&&l.navigator.userAgent||""},uf=function(a){a=a.split(".");for(var b=l,c=0;c<a.length&&
	"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b},wf=function(){var a;if(!(a=!l.location||!l.location.protocol||"http:"!=l.location.protocol&&"https:"!=l.location.protocol||sf())){var b;a:{try{var c=l.localStorage,d=vf();if(c){c.setItem(d,"1");c.removeItem(d);b=hf()?!!l.indexedDB:!0;break a}}catch(e){}b=!1}a=!b}return!a},xf=function(a){a=a||gf();var b=(a||gf()).toLowerCase();return b.match(/android/)||b.match(/webos/)||b.match(/iphone|ipad|ipod/)||b.match(/blackberry/)||
	b.match(/windows phone/)||b.match(/iemobile/)||"Firefox"==lf(a)?!1:!0},yf=function(a){return"undefined"===typeof a?null:lc(a)},zf=function(a){if(null!==a){var b;try{b=ic(a)}catch(c){try{b=JSON.parse(a)}catch(d){throw c;}}return b}},vf=function(a){return a?a:""+Math.floor(1E9*Math.random()).toString()},Af=function(){var a=l.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null};var Bf;try{var Cf={};Object.defineProperty(Cf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Cf,"abcd",{configurable:!0,enumerable:!0,value:2});Bf=2==Cf.abcd}catch(a){Bf=!1}
	var Q=function(a,b,c){Bf?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Df=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&Q(a,c,b[c])},Ef=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Ff=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0};var Gf={Hd:{ub:500,tb:600,providerId:"facebook.com"},Id:{ub:500,tb:620,providerId:"github.com"},Jd:{ub:515,tb:680,providerId:"google.com"},Od:{ub:485,tb:705,providerId:"twitter.com"}},Hf=function(a){for(var b in Gf)if(Gf[b].providerId==a)return Gf[b];return null};var R=function(a,b){this.code="auth/"+a;this.message=b||If[a]||""};t(R,Error);R.prototype.G=function(){return{name:this.code,code:this.code,message:this.message}};
	var If={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	"email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.",
	"invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	"invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http or https and web storage must be enabled.',
	"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.",
	"user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported."};var Jf=function(a,b,c,d,e){this.va=a;this.za=b||null;this.hb=c||null;this.cc=d||null;this.J=e||null;if(this.hb||this.J){if(this.hb&&this.J)throw new R("invalid-auth-event");if(this.hb&&!this.cc)throw new R("invalid-auth-event");}else throw new R("invalid-auth-event");};Jf.prototype.getError=function(){return this.J};Jf.prototype.G=function(){return{type:this.va,eventId:this.za,urlResponse:this.hb,sessionId:this.cc,error:this.J&&this.J.G()}};var Kf=function(a){var b="unauthorized-domain",c=void 0,d=af(a);a=d.ga;d=d.la;"http"!=d&&"https"!=d?b="operation-not-supported-in-this-environment":c=ma("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a);R.call(this,b,c)};t(Kf,R);var Lf=function(a){this.qe=a.sub;la();this.Db=a.email||null};var Mf=function(a,b,c,d){var e={};ha(c)?e=c:b&&n(c)&&n(d)?e={oauthToken:c,oauthTokenSecret:d}:!b&&n(c)&&(e={accessToken:c});if(b||!e.idToken&&!e.accessToken)if(b&&e.oauthToken&&e.oauthTokenSecret)Q(this,"accessToken",e.oauthToken),Q(this,"secret",e.oauthTokenSecret);else{if(b)throw new R("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");throw new R("argument-error","credential failed: expected 1 argument (the OAuth access token).");}else e.idToken&&Q(this,
	"idToken",e.idToken),e.accessToken&&Q(this,"accessToken",e.accessToken);Q(this,"provider",a)};Mf.prototype.Gb=function(a){return Nf(a,Of(this))};Mf.prototype.md=function(a,b){var c=Of(this);c.idToken=b;return Pf(a,c)};var Of=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:ff(b).toString(),requestUri:wf()?jf():"http://localhost"}};
	Mf.prototype.G=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
	var Qf=function(a,b){var c=!!b;b=function(){Df(this,{providerId:a,isOAuthProvider:!0});this.Lc=[];"google.com"==a&&this.addScope("profile")};c||(b.prototype.addScope=function(a){Ja(this.Lc,a)||this.Lc.push(a)});b.prototype.Hb=function(){return Pa(this.Lc)};b.credential=function(b,e){return new Mf(a,c,b,e)};Df(b,{PROVIDER_ID:a});return b},Rf=Qf("facebook.com");Rf.prototype.addScope=Rf.prototype.addScope||void 0;var Sf=Qf("github.com");Sf.prototype.addScope=Sf.prototype.addScope||void 0;var Tf=Qf("google.com");
	Tf.prototype.addScope=Tf.prototype.addScope||void 0;Tf.credential=function(a,b){if(!a&&!b)throw new R("argument-error","credential failed: must provide the ID token and/or the access token.");return new Mf("google.com",!1,ha(a)?a:{idToken:a||null,accessToken:b||null})};var Uf=Qf("twitter.com",!0),Vf=function(a,b){this.Db=a;this.Dc=b;Q(this,"provider","password")};Vf.prototype.Gb=function(a){return S(a,Wf,{email:this.Db,password:this.Dc})};
	Vf.prototype.md=function(a,b){return S(a,Xf,{idToken:b,email:this.Db,password:this.Dc})};Vf.prototype.G=function(){return{email:this.Db,password:this.Dc}};var Yf=function(){Df(this,{providerId:"password",isOAuthProvider:!1})};Df(Yf,{PROVIDER_ID:"password"});
	var Zf={Me:Yf,Hd:Rf,Jd:Tf,Id:Sf,Od:Uf},$f=function(a){var b=a&&a.providerId;if(!b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;for(var e in Zf)if(Zf[e].PROVIDER_ID==b)try{return Zf[e].credential({accessToken:c,idToken:a,oauthToken:c,oauthTokenSecret:d})}catch(f){break}return null};var ag=function(a,b,c,d){R.call(this,a,d);Q(this,"email",b);Q(this,"credential",c)};t(ag,R);ag.prototype.G=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.G();b&&(Ya(a,b),a.providerId=b.provider,delete a.provider);return a};var bg=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));return a.email?new ag(b,a.email,$f(a),a.message):new R(b,a.message||void 0)}return null};var cg=function(a){this.Le=a};t(cg,pc);cg.prototype.kb=function(){return new this.Le};cg.prototype.Qb=function(){return{}};
	var T=function(a,b,c){var d;d="Node"==rf();d=l.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new R("internal-error","The XMLHttpRequest compatibility library was not found.");this.v=a;a=b||{};this.Ae=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Be=a.secureTokenTimeout||1E4;this.wd=Wa(a.secureTokenHeaders||dg);this.$d=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.ae=a.firebaseTimeout||
	1E4;this.cd=Wa(a.firebaseHeaders||eg);c&&(this.cd["X-Client-Version"]=c,this.wd["X-Client-Version"]=c);this.Sd=new uc;this.Ke=new cg(d)},fg,dg={"Content-Type":"application/x-www-form-urlencoded"},eg={"Content-Type":"application/json"},hg=function(a,b,c,d,e,f,g){mf()?a=r(a.De,a):(fg||(fg=new I(function(a,b){gg(a,b)})),a=r(a.Ce,a));a(b,c,d,e,f,g)};
	T.prototype.De=function(a,b,c,d,e,f){var g="Node"==rf(),k=sf()?g?new M(this.Ke):new M:new M(this.Sd),q;f&&(k.fb=Math.max(0,f),q=setTimeout(function(){k.dispatchEvent("timeout")},f));k.listen("complete",function(){q&&clearTimeout(q);var a=null;try{var c;c=this.a?ic(this.a.responseText):void 0;a=c||null}catch(Pi){try{a=JSON.parse(Ne(this))||null}catch(Qi){a=null}}b&&b(a)});Tb(k,"ready",function(){q&&clearTimeout(q);this.ya||(this.ya=!0,this.Oa())});Tb(k,"timeout",function(){q&&clearTimeout(q);this.ya||
	(this.ya=!0,this.Oa());b&&b(null)});k.send(a,c,d,e)};var Pd="__fcb"+Math.floor(1E6*Math.random()).toString(),gg=function(a,b){((window.gapi||{}).client||{}).request?a():(l[Pd]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},Rd(function(){b(Error("CORS_UNSUPPORTED"))}))};
	T.prototype.Ce=function(a,b,c,d,e){var f=this;fg.then(function(){window.gapi.client.setApiKey(f.v);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).l(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
	var jg=function(a,b){return new I(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?hg(a,a.Ae+"?key="+encodeURIComponent(a.v),function(a){a?a.error?d(ig(a)):a.access_token&&a.refresh_token?c(a):d(new R("internal-error")):d(new R("network-request-failed"))},"POST",ff(b).toString(),a.wd,a.Be):d(new R("internal-error"))})},kg=function(a){var b={},c;for(c in a)null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return lc(b)},lg=function(a,b,c,d,e){var f=a.$d+
	b+"?key="+encodeURIComponent(a.v);e&&(f+="&cb="+la().toString());return new I(function(b,e){hg(a,f,function(a){a?a.error?e(ig(a)):b(a):e(new R("network-request-failed"))},c,kg(d),a.cd,a.ae)})},mg=function(a){if(!Zb.test(a.email))throw new R("invalid-email");},ng=function(a){"email"in a&&mg(a)},pg=function(a,b){var c=wf()?jf():"http://localhost";return S(a,og,{identifier:b,continueUri:c}).then(function(a){return a.allProviders||[]})},rg=function(a){return S(a,qg,{}).then(function(a){return a.authorizedDomains||
	[]})},sg=function(a){if(!a.idToken)throw new R("internal-error");};T.prototype.signInAnonymously=function(){return S(this,tg,{})};T.prototype.updateEmail=function(a,b){return S(this,ug,{idToken:a,email:b})};T.prototype.updatePassword=function(a,b){return S(this,Xf,{idToken:a,password:b})};var vg={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};
	T.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Ra(vg,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return S(this,ug,c)};T.prototype.sendPasswordResetEmail=function(a){return S(this,wg,{requestType:"PASSWORD_RESET",email:a})};T.prototype.sendEmailVerification=function(a){return S(this,xg,{requestType:"VERIFY_EMAIL",idToken:a})};
	var zg=function(a,b,c){return S(a,yg,{idToken:b,deleteProvider:c})},Ag=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new R("internal-error");},Bg=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=bg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=bg(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=bg(a));if(b)throw b;if(!a.idToken)throw new R("internal-error");},Nf=function(a,
	b){b.returnIdpCredential=!0;return S(a,Cg,b)},Pf=function(a,b){b.returnIdpCredential=!0;return S(a,Dg,b)},Eg=function(a){if(!a.oobCode)throw new R("invalid-action-code");};T.prototype.confirmPasswordReset=function(a,b){return S(this,Fg,{oobCode:a,newPassword:b})};T.prototype.checkActionCode=function(a){return S(this,Gg,{oobCode:a})};T.prototype.applyActionCode=function(a){return S(this,Hg,{oobCode:a})};
	var Hg={endpoint:"setAccountInfo",D:Eg,cb:"email"},Gg={endpoint:"resetPassword",D:Eg,ta:function(a){if(!Zb.test(a.email))throw new R("internal-error");}},Ig={endpoint:"signupNewUser",D:function(a){mg(a);if(!a.password)throw new R("weak-password");},ta:sg,ua:!0},og={endpoint:"createAuthUri"},Jg={endpoint:"deleteAccount",ab:["idToken"]},yg={endpoint:"setAccountInfo",ab:["idToken","deleteProvider"],D:function(a){if(!ea(a.deleteProvider))throw new R("internal-error");}},Kg={endpoint:"getAccountInfo"},
	xg={endpoint:"getOobConfirmationCode",ab:["idToken","requestType"],D:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new R("internal-error");},cb:"email"},wg={endpoint:"getOobConfirmationCode",ab:["requestType"],D:function(a){if("PASSWORD_RESET"!=a.requestType)throw new R("internal-error");mg(a)},cb:"email"},qg={Rd:!0,endpoint:"getProjectConfig",je:"GET"},Fg={endpoint:"resetPassword",D:Eg,cb:"email"},ug={endpoint:"setAccountInfo",ab:["idToken"],D:ng,ua:!0},Xf={endpoint:"setAccountInfo",ab:["idToken"],
	D:function(a){ng(a);if(!a.password)throw new R("weak-password");},ta:sg,ua:!0},tg={endpoint:"signupNewUser",ta:sg,ua:!0},Cg={endpoint:"verifyAssertion",D:Ag,ta:Bg,ua:!0},Dg={endpoint:"verifyAssertion",D:function(a){Ag(a);if(!a.idToken)throw new R("internal-error");},ta:Bg,ua:!0},Lg={endpoint:"verifyCustomToken",D:function(a){if(!a.token)throw new R("invalid-custom-token");},ta:sg,ua:!0},Wf={endpoint:"verifyPassword",D:function(a){mg(a);if(!a.password)throw new R("wrong-password");},ta:sg,ua:!0},S=
	function(a,b,c){if(!Ff(c,b.ab))return K(new R("internal-error"));var d=b.je||"POST",e;return J(c).then(b.D).then(function(){b.ua&&(c.returnSecureToken=!0);return lg(a,b.endpoint,d,c,b.Rd||!1)}).then(function(a){return e=a}).then(b.ta).then(function(){if(!b.cb)return e;if(!(b.cb in e))throw new R("internal-error");return e[b.cb]})},ig=function(a){var b,c;c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?
	new R(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",
	USER_CANCELLED:"user-cancelled"};b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new R(d[e],b);!b&&a&&(b=yf(a));return new R("internal-error",b)};var Mg=function(a){this.R=a};Mg.prototype.value=function(){return this.R};Mg.prototype.zd=function(a){this.R.style=a;return this};var Ng=function(a){this.R=a||{}};Ng.prototype.value=function(){return this.R};Ng.prototype.zd=function(a){this.R.style=a;return this};var Pg=function(a){this.Je=a;this.wc=null;this.od=Og(this)};Pg.prototype.Bc=function(){return this.od};
	var Qg=function(a){var b=new Ng;b.R.where=document.body;b.R.url=a.Je;b.R.messageHandlersFilter=uf("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.R.attributes=b.R.attributes||{};(new Mg(b.R.attributes)).zd({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.R.dontclear=!0;return b},Og=function(a){return Rg().then(function(){return new I(function(b,c){uf("gapi.iframes.getContext")().open(Qg(a).value(),function(d){a.wc=d;a.wc.restyle({setHideOnLeave:!1});var e=setTimeout(function(){c(Error("Network Error"))},
	5E3),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})},Sg=function(a,b){a.od.then(function(){a.wc.register("authEvent",b,uf("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},Tg="__iframefcb"+Math.floor(1E6*Math.random()).toString(),Rg=function(){return new I(function(a,b){var c=function(){Af();uf("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){Af();b(Error("Network Error"))},timeout:3E3})};uf("gapi.iframes.Iframe")?a():uf("gapi.load")?c():
	(l[Tg]=function(){uf("gapi.load")?c():b(Error("Network Error"))},J(Od("https://apis.google.com/js/api.js?onload="+Tg)).l(function(){b(Error("Network Error"))}))})};var Vg=function(a,b,c,d){this.X=a;this.v=b;this.ea=c;d=this.xa=d||null;a=bf(a,"/__/auth/iframe");P(a,"apiKey",b);P(a,"appName",c);d&&P(a,"v",d);this.ke=a.toString();this.hd=new Pg(this.ke);this.zb=[];Ug(this)};Vg.prototype.Bc=function(){return this.hd.Bc()};
	var Wg=function(a,b,c,d,e,f,g,k,q){a=bf(a,"/__/auth/handler");P(a,"apiKey",b);P(a,"appName",c);P(a,"authType",d);P(a,"providerId",e);f&&f.length&&P(a,"scopes",f.join(","));g&&P(a,"redirectUrl",g);k&&P(a,"eventId",k);q&&P(a,"v",q);return a.toString()},Ug=function(a){Sg(a.hd,function(b){var c={};if(b&&b.authEvent){var d=!1;b=b.authEvent||{};if(b.type){if(c=b.error)var e=(c=b.error)&&(c.name||c.code),c=e?new R(e.substring(5),c.message):null;b=new Jf(b.type,b.eventId,b.urlResponse,b.sessionId,c)}else b=
	null;for(c=0;c<a.zb.length;c++)d=a.zb[c](b)||d;c={};c.status=d?"ACK":"ERROR";return J(c)}c.status="ERROR";return J(c)})},Xg=function(a,b){Ma(a.zb,function(a){return a==b})};var Yg=function(a){this.u=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.u)throw new R("internal-error","The React Native compatibility library was not found.");};h=Yg.prototype;h.get=function(a){return J(this.u.getItem(a)).then(function(a){return a&&zf(a)})};h.set=function(a,b){return J(this.u.setItem(a,yf(b)))};h.remove=function(a){return J(this.u.removeItem(a))};h.Ka=function(){};h.Za=function(){};var Zg=function(){this.u={}};h=Zg.prototype;h.get=function(a){return J(this.u[a])};h.set=function(a,b){this.u[a]=b;return J()};h.remove=function(a){delete this.u[a];return J()};h.Ka=function(){};h.Za=function(){};var ah=function(){if(!$g()){if("Node"==rf())throw new R("internal-error","The LocalStorage compatibility library was not found.");throw new R("web-storage-unsupported");}this.u=l.localStorage||firebase.INTERNAL.node.localStorage},$g=function(){var a="Node"==rf(),a=l.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=ah.prototype;
	h.get=function(a){var b=this;return J().then(function(){var c=b.u.getItem(a);return zf(c)})};h.set=function(a,b){var c=this;return J().then(function(){var d=yf(b);null===d?c.remove(a):c.u.setItem(a,d)})};h.remove=function(a){var b=this;return J().then(function(){b.u.removeItem(a)})};h.Ka=function(a){l.window&&Lb(l.window,"storage",a)};h.Za=function(a){l.window&&Ub(l.window,"storage",a)};var bh=function(){this.u={}};h=bh.prototype;h.get=function(){return J(null)};h.set=function(){return J()};h.remove=function(){return J()};h.Ka=function(){};h.Za=function(){};var dh=function(){if(!ch()){if("Node"==rf())throw new R("internal-error","The SessionStorage compatibility library was not found.");throw new R("web-storage-unsupported");}this.u=l.sessionStorage||firebase.INTERNAL.node.sessionStorage},ch=function(){var a="Node"==rf(),a=l.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=dh.prototype;
	h.get=function(a){var b=this;return J().then(function(){var c=b.u.getItem(a);return zf(c)})};h.set=function(a,b){var c=this;return J().then(function(){var d=yf(b);null===d?c.remove(a):c.u.setItem(a,d)})};h.remove=function(a){var b=this;return J().then(function(){b.u.removeItem(a)})};h.Ka=function(){};h.Za=function(){};var eh=function(a,b,c,d,e,f){if(!window.indexedDB)throw new R("web-storage-unsupported");this.Ud=a;this.Ac=b;this.qc=c;this.Fd=d;this.na=e;this.O={};this.vb=[];this.sb=0;this.le=f||l.indexedDB},fh,gh=function(a){return new I(function(b,c){var d=a.le.open(a.Ud,a.na);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.Ac,{keyPath:a.qc})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},hh=function(a){a.jd||(a.jd=
	gh(a));return a.jd},ih=function(a,b){return b.objectStore(a.Ac)},jh=function(a,b,c){return b.transaction([a.Ac],c?"readwrite":"readonly")},kh=function(a){return new I(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=eh.prototype;
	h.set=function(a,b){var c=!1,d,e=this;return xd(hh(this).then(function(b){d=b;b=ih(e,jh(e,d,!0));return kh(b.get(a))}).then(function(f){var g=ih(e,jh(e,d,!0));if(f)return f.value=b,kh(g.put(f));e.sb++;c=!0;f={};f[e.qc]=a;f[e.Fd]=b;return kh(g.add(f))}).then(function(){e.O[a]=b}),function(){c&&e.sb--})};h.get=function(a){var b=this;return hh(this).then(function(c){return kh(ih(b,jh(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
	h.remove=function(a){var b=!1,c=this;return xd(hh(this).then(function(d){b=!0;c.sb++;return kh(ih(c,jh(c,d,!0))["delete"](a))}).then(function(){delete c.O[a]}),function(){b&&c.sb--})};
	h.Fe=function(){var a=this;return hh(this).then(function(b){var c=ih(a,jh(a,b,!1));return c.getAll?kh(c.getAll()):new I(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.sb){for(d=0;d<b.length;d++)c[b[d][a.qc]]=b[d][a.Fd];d=kf(a.O,c);a.O=c}return d})};h.Ka=function(a){0==this.vb.length&&this.Oc();this.vb.push(a)};
	h.Za=function(a){Ma(this.vb,function(b){return b==a});0==this.vb.length&&this.ec()};h.Oc=function(){var a=this;this.ec();var b=function(){a.Fc=xe(800).then(r(a.Fe,a)).then(function(b){0<b.length&&x(a.vb,function(a){a(b)})}).then(b).l(function(a){"STOP_EVENT"!=a.message&&b()});return a.Fc};b()};h.ec=function(){this.Fc&&this.Fc.cancel("STOP_EVENT")};var oh=function(){this.$c={Browser:lh,Node:mh,ReactNative:nh}[rf()]},ph,lh={V:ah,Qc:dh},mh={V:ah,Qc:dh},nh={V:Yg,Qc:bh};var qh="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),U=function(a,b){return{name:a||"",ca:"a valid string",optional:!!b,da:n}},rh=function(a){return{name:a||"",ca:"a valid object",optional:!1,da:ha}},sh=function(a,b){return{name:a||"",ca:"a function",optional:!!b,da:p}},th=function(){return{name:"",ca:"null",optional:!1,da:da}},uh=function(){return{name:"credential",ca:"a valid credential",optional:!1,da:function(a){return!(!a||!a.Gb)}}},vh=function(){return{name:"authProvider",
	ca:"a valid Auth provider",optional:!1,da:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},wh=function(a,b,c,d){return{name:c||"",ca:a.ca+" or "+b.ca,optional:!!d,da:function(c){return a.da(c)||b.da(c)}}};var yh=function(a,b){for(var c in b){var d=b[c].name;a[d]=xh(d,a[c],b[c].b)}},V=function(a,b,c,d){a[b]=xh(b,c,d)},xh=function(a,b,c){if(!c)return b;var d=zh(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var q=!1,ra=0;ra<c.length;ra++)if(c[ra].optional)q=!0;else{if(q)throw new R("internal-error","Argument validator encountered a required argument after an optional argument.");k++}q=c.length;if(e.length<k||q<e.length)e="Expected "+(k==
	q?1==k?"1 argument":k+" arguments":k+"-"+q+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(q=c[k].optional&&void 0===e[k],!c[k].da(e[k])&&!q){e=c[k];if(0>k||k>=qh.length)throw new R("internal-error","Argument validator received an unsupported number of arguments.");e=qh[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.ca+".";break a}e=null}}if(e)throw new R("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
	b.prototype[e];return a},zh=function(a){a=a.split(".");return a[a.length-1]};var Ah=function(a,b,c,d){this.te=a;this.xd=b;this.ze=c;this.eb=d;this.N={};ph||(ph=new oh);a=ph;try{var e;hf()?(fh||(fh=new eh("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1)),e=fh):e=new a.$c.V;this.Ta=e}catch(f){this.Ta=new Zg,this.eb=!0}try{this.gc=new a.$c.Qc}catch(f){this.gc=new Zg}this.Ad=r(this.Bd,this);this.O={}},Bh,Ch=function(){Bh||(Bh=new Ah("firebase",":","Safari"==lf(gf())&&l.window&&l.window!=l.window.top?!0:!1,xf()));return Bh};h=Ah.prototype;
	h.K=function(a,b){return this.te+this.xd+a.name+(b?this.xd+b:"")};h.get=function(a,b){return(a.V?this.Ta:this.gc).get(this.K(a,b))};h.remove=function(a,b){b=this.K(a,b);a.V&&!this.eb&&(this.O[b]=null);return(a.V?this.Ta:this.gc).remove(b)};h.set=function(a,b,c){var d=this.K(a,c),e=this,f=a.V?this.Ta:this.gc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.V&&!this.eb&&(e.O[d]=b)})};
	h.addListener=function(a,b,c){a=this.K(a,b);this.eb||(this.O[a]=l.localStorage.getItem(a));Ua(this.N)&&this.Oc();this.N[a]||(this.N[a]=[]);this.N[a].push(c)};h.removeListener=function(a,b,c){a=this.K(a,b);this.N[a]&&(Ma(this.N[a],function(a){return a==c}),0==this.N[a].length&&delete this.N[a]);Ua(this.N)&&this.ec()};h.Oc=function(){this.Ta.Ka(this.Ad);this.eb||Dh(this)};
	var Dh=function(a){Eh(a);a.zc=setInterval(function(){for(var b in a.N){var c=l.localStorage.getItem(b);c!=a.O[b]&&(a.O[b]=c,c=new Ab({type:"storage",key:b,target:window,oldValue:a.O[b],newValue:c}),a.Bd(c))}},1E3)},Eh=function(a){a.zc&&(clearInterval(a.zc),a.zc=null)};Ah.prototype.ec=function(){this.Ta.Za(this.Ad);this.eb||Eh(this)};
	Ah.prototype.Bd=function(a){if(a&&a.ce){var b=a.lb.key;if(this.ze){var c=l.localStorage.getItem(b);a=a.lb.newValue;a!=c&&(a?l.localStorage.setItem(b,a):a||l.localStorage.removeItem(b))}this.O[b]=l.localStorage.getItem(b);this.Vc(b)}else x(a,r(this.Vc,this))};Ah.prototype.Vc=function(a){this.N[a]&&x(this.N[a],function(a){a()})};var Fh=function(a){this.B=a;this.A=Ch()},Gh={name:"pendingRedirect",V:!1},Hh=function(a){return a.A.set(Gh,"pending",a.B)},Ih=function(a){return a.A.remove(Gh,a.B)},Jh=function(a){return a.A.get(Gh,a.B).then(function(a){return"pending"==a})};var Mh=function(a,b,c){var d=this,e=(this.xa=firebase.SDK_VERSION||null)?tf(this.xa):null;this.f=new T(b,null,e);this.qa=null;this.X=a;this.v=b;this.ea=c;this.wb=[];this.Pb=!1;this.Rc=r(this.de,this);this.Wa=new Kh(this);this.rd=new Lh(this);this.Ec=new Fh(this.v+":"+this.ea);this.gb={};this.gb.unknown=this.Wa;this.gb.signInViaRedirect=this.Wa;this.gb.linkViaRedirect=this.Wa;this.gb.signInViaPopup=this.rd;this.gb.linkViaPopup=this.rd;this.$b=this.bb=null;this.Ub=new I(function(a,b){d.bb=a;d.$b=b})};
	Mh.prototype.reset=function(){var a=this;this.qa=null;this.Ub.cancel();this.Pb=!1;this.$b=this.bb=null;this.Mb&&Xg(this.Mb,this.Rc);this.Ub=new I(function(b,c){a.bb=b;a.$b=c})};
	var Nh=function(a){var b=jf();return rg(a).then(function(a){a:{for(var c=af(b).ga,e=0;e<a.length;e++){var f;var g=a[e];f=c;var k=Mc(g);k?f=(f=Mc(f))?k.Eb(f):!1:(k=g.split(".").join("\\."),f=(new RegExp("^(.+\\."+k+"|"+k+")$","i")).test(f));if(f){a=!0;break a}}a=!1}if(!a)throw new Kf(jf());})},Oh=function(a){a.Pb||(a.Pb=!0,qf().then(function(){a.Mb=new Vg(a.X,a.v,a.ea,a.xa);a.Mb.Bc().l(function(){a.$b(new R("network-request-failed"));a.reset()});a.Mb.zb.push(a.Rc)}));return a.Ub};
	Mh.prototype.subscribe=function(a){Ja(this.wb,a)||this.wb.push(a);if(!this.Pb){var b=this,c=function(){var a=gf(),c;(c=xf(a))||(a=a||gf(),c="Safari"==lf(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0);c?Ph(b.Wa):Oh(b)};Jh(this.Ec).then(function(a){a?Ih(b.Ec).then(function(){Oh(b)}):c()}).l(function(){c()})}};Mh.prototype.unsubscribe=function(a){Ma(this.wb,function(b){return b==a})};
	Mh.prototype.de=function(a){if(!a)throw new R("invalid-auth-event");this.bb&&(this.bb(),this.bb=null);for(var b=!1,c=0;c<this.wb.length;c++){var d=this.wb[c];if(d.Wc(a.va,a.za)){(b=this.gb[a.va])&&b.sd(a,d);b=!0;break}}Ph(this.Wa);return b};Mh.prototype.getRedirectResult=function(){return this.Wa.getRedirectResult()};
	var Rh=function(a,b,c,d,e,f){if(!b)return K(new R("popup-blocked"));if(f)return Oh(a),J();a.qa||(a.qa=Nh(a.f));return a.qa.then(function(){return Oh(a)}).then(function(){Qh(d);var f=Wg(a.X,a.v,a.ea,c,d.providerId,d.Hb(),null,e,a.xa);(b||l.window).location.href=dc(gc(f))}).l(function(b){"auth/network-request-failed"==b.code&&(a.qa=null);throw b;})},Sh=function(a,b,c,d){a.qa||(a.qa=Nh(a.f));return a.qa.then(function(){Qh(c);var e=Wg(a.X,a.v,a.ea,b,c.providerId,c.Hb(),jf(),d,a.xa);Hh(a.Ec).then(function(){l.window.location.href=
	dc(gc(e))})})},Th=function(a,b,c,d,e){var f=new R("popup-closed-by-user");return a.Ub.l(function(){}).then(function(){return pf(d)}).then(function(){return xe(2E3).then(function(){b.Ha(c,null,f,e)})})},Qh=function(a){if(!a.isOAuthProvider)throw new R("invalid-oauth-provider");},Uh={},Vh=function(a,b,c){var d=b+":"+c;Uh[d]||(Uh[d]=new Mh(a,b,c));return Uh[d]},Kh=function(a){this.A=a;this.Jc=this.Zb=this.Xa=this.W=null;this.Ic=!1};
	Kh.prototype.sd=function(a,b){if(!a)return K(new R("invalid-auth-event"));this.Ic=!0;var c=a.va,d=a.za;"unknown"==c?(this.W||Wh(this,!1,null,null),a=J()):a=a.J?this.Gc(a,b):b.mb(c,d)?this.Hc(a,b):K(new R("invalid-auth-event"));return a};var Ph=function(a){a.Ic||(a.Ic=!0,Wh(a,!1,null,null))};Kh.prototype.Gc=function(a){this.W||Wh(this,!0,null,a.getError());return J()};
	Kh.prototype.Hc=function(a,b){var c=this,d=a.va;b=b.mb(d,a.za);var e=a.hb;a=a.cc;var f="signInViaRedirect"==d||"linkViaRedirect"==d;return this.W?J():b(e,a).then(function(a){c.W||Wh(c,f,a,null)}).l(function(a){c.W||Wh(c,f,null,a)})};var Wh=function(a,b,c,d){b?d?(a.W=function(){return K(d)},a.Zb&&a.Zb(d)):(a.W=function(){return J(c)},a.Xa&&a.Xa(c)):(a.W=function(){return J({user:null})},a.Xa&&a.Xa({user:null}));a.Xa=null;a.Zb=null};
	Kh.prototype.getRedirectResult=function(){var a=this;this.Uc||(this.Uc=new I(function(b,c){a.W?a.W().then(b,c):(a.Xa=b,a.Zb=c,Xh(a))}));return this.Uc};var Xh=function(a){var b=new R("timeout");a.Jc&&a.Jc.cancel();a.Jc=xe(1E4).then(function(){a.W||Wh(a,!0,null,b)})},Lh=function(a){this.A=a};Lh.prototype.sd=function(a,b){if(!a)return K(new R("invalid-auth-event"));var c=a.va,d=a.za;return a.J?this.Gc(a,b):b.mb(c,d)?this.Hc(a,b):K(new R("invalid-auth-event"))};
	Lh.prototype.Gc=function(a,b){b.Ha(a.va,null,a.getError(),a.za);return J()};Lh.prototype.Hc=function(a,b){var c=a.za,d=a.va;return b.mb(d,c)(a.hb,a.cc).then(function(a){b.Ha(d,a,null,c)}).l(function(a){b.Ha(d,null,a,c)})};var Yh=function(a){this.f=a;this.wa=this.S=null;this.Pa=0};Yh.prototype.G=function(){return{apiKey:this.f.v,refreshToken:this.S,accessToken:this.wa,expirationTime:this.Pa}};
	var $h=function(a,b){var c=b.idToken,d=b.refreshToken;b=Zh(b.expiresIn);a.wa=c;a.Pa=b;a.S=d},Zh=function(a){return la()+1E3*parseInt(a,10)},ai=function(a,b){return jg(a.f,b).then(function(b){a.wa=b.access_token;a.Pa=Zh(b.expires_in);a.S=b.refresh_token;return{accessToken:a.wa,expirationTime:a.Pa,refreshToken:a.S}}).l(function(b){"auth/user-token-expired"==b.code&&(a.S=null);throw b;})},bi=function(a){return!(!a.wa||a.S)};
	Yh.prototype.getToken=function(a){a=!!a;return bi(this)?K(new R("user-token-expired")):a||!this.wa||la()>this.Pa-3E4?this.S?ai(this,{grant_type:"refresh_token",refresh_token:this.S}):J(null):J({accessToken:this.wa,expirationTime:this.Pa,refreshToken:this.S})};var ci=function(a,b,c,d,e){Df(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},di=function(a,b){zb.call(this,a);for(var c in b)this[c]=b[c]};t(di,zb);
	var W=function(a,b,c){this.U=[];this.v=a.apiKey;this.ea=a.appName;this.X=a.authDomain||null;a=firebase.SDK_VERSION?tf(firebase.SDK_VERSION):null;this.f=new T(this.v,null,a);this.ba=new Yh(this.f);ei(this,b.idToken);$h(this.ba,b);Q(this,"refreshToken",this.ba.S);fi(this,c||{});$d.call(this);this.Vb=!1;this.X&&wf()&&(this.m=Vh(this.X,this.v,this.ea));this.dc=[]};t(W,$d);
	var ei=function(a,b){a.kd=b;Q(a,"_lat",b)},gi=function(a,b){Ma(a.dc,function(a){return a==b})},hi=function(a){for(var b=[],c=0;c<a.dc.length;c++)b.push(a.dc[c](a));return ud(b).then(function(){return a})},ii=function(a){a.m&&!a.Vb&&(a.Vb=!0,a.m.subscribe(a))},fi=function(a,b){Df(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};Q(W.prototype,"providerId","firebase");
	var ji=function(){},ki=function(a){return J().then(function(){if(a.Vd)throw new R("app-deleted");})},li=function(a){return Fa(a.providerData,function(a){return a.providerId})},ni=function(a,b){b&&(mi(a,b.providerId),a.providerData.push(b))},mi=function(a,b){Ma(a.providerData,function(a){return a.providerId==b})},oi=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&Q(a,b,c)};
	W.prototype.copy=function(a){var b=this;b!=a&&(Df(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),x(a.providerData,function(a){ni(b,a)}),this.ba=a.ba,Q(this,"refreshToken",this.ba.S))};W.prototype.reload=function(){var a=this;return ki(this).then(function(){return pi(a).then(function(){return hi(a)}).then(ji)})};
	var pi=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return qi(a,b).then(function(){c||oi(a,"isAnonymous",!1);return b}).l(function(b){"auth/user-token-expired"==b.code&&(a.dispatchEvent(new di("userDeleted")),ri(a));throw b;})})};
	W.prototype.getToken=function(a){var b=this,c=bi(this.ba);return ki(this).then(function(){return b.ba.getToken(a)}).then(function(a){if(!a)throw new R("internal-error");a.accessToken!=b.kd&&(ei(b,a.accessToken),b.Da());oi(b,"refreshToken",a.refreshToken);return a.accessToken}).l(function(a){if("auth/user-token-expired"==a.code&&!c)return hi(b).then(function(){oi(b,"refreshToken",null);throw a;});throw a;})};
	var si=function(a,b){b.idToken&&a.kd!=b.idToken&&($h(a.ba,b),a.Da(),ei(a,b.idToken),oi(a,"refreshToken",a.ba.S))};W.prototype.Da=function(){this.dispatchEvent(new di("tokenChanged"))};var qi=function(a,b){return S(a.f,Kg,{idToken:b}).then(r(a.we,a))};
	W.prototype.we=function(a){a=a.users;if(!a||!a.length)throw new R("internal-error");a=a[0];fi(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=ti(a),c=0;c<b.length;c++)ni(this,b[c]);oi(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
	var ti=function(a){return(a=a.providerUserInfo)&&a.length?Fa(a,function(a){return new ci(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};W.prototype.reauthenticate=function(a){var b=this;return this.c(a.Gb(this.f).then(function(a){var c;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=ic(ub(e));if(k.sub&&k.iss&&k.aud&&k.exp){c=new Lf(k);break a}}catch(q){}}c=null}if(!c||b.uid!=c.qe)throw new R("user-mismatch");si(b,a);return b.reload()}))};
	var ui=function(a,b){return pi(a).then(function(){if(Ja(li(a),b))return hi(a).then(function(){throw new R("provider-already-linked");})})};h=W.prototype;h.link=function(a){var b=this;return this.c(ui(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.md(b.f,c)}).then(r(this.bd,this)))};h.bd=function(a){si(this,a);var b=this;return this.reload().then(function(){return b})};
	h.updateEmail=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.f.updateEmail(c,a)}).then(function(a){si(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.f.updatePassword(c,a)}).then(function(a){si(b,a);return b.reload()}))};
	h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return ki(this);var b=this;return this.c(this.getToken().then(function(c){return b.f.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){si(b,a);oi(b,"displayName",a.displayName||null);oi(b,"photoURL",a.photoUrl||null);return hi(b)}).then(ji))};
	h.unlink=function(a){var b=this;return this.c(pi(this).then(function(c){return Ja(li(b),a)?zg(b.f,c,[a]).then(function(a){var c={};x(a.providerUserInfo||[],function(a){c[a.providerId]=!0});x(li(b),function(a){c[a]||mi(b,a)});return hi(b)}):hi(b).then(function(){throw new R("no-such-provider");})}))};h.delete=function(){var a=this;return this.c(this.getToken().then(function(b){return S(a.f,Jg,{idToken:b})}).then(function(){a.dispatchEvent(new di("userDeleted"))})).then(function(){ri(a)})};
	h.Wc=function(a,b){return"linkViaPopup"==a&&(this.ia||null)==b&&this.$||"linkViaRedirect"==a&&(this.Yb||null)==b?!0:!1};h.Ha=function(a,b,c,d){"linkViaPopup"==a&&d==(this.ia||null)&&(c&&this.Fa?this.Fa(c):b&&!c&&this.$&&this.$(b),this.C&&(this.C.cancel(),this.C=null),delete this.$,delete this.Fa)};h.mb=function(a,b){return"linkViaPopup"==a&&b==(this.ia||null)||"linkViaRedirect"==a&&(this.Yb||null)==b?r(this.Yd,this):null};h.Fb=function(){return vf(this.uid+":::")};
	h.linkWithPopup=function(a){if(!wf())return K(new R("operation-not-supported-in-this-environment"));var b=this,c=Hf(a.providerId),d=this.Fb(),e=null;!xf()&&this.X&&a.isOAuthProvider&&(e=Wg(this.X,this.v,this.ea,"linkViaPopup",a.providerId,a.Hb(),null,d,firebase.SDK_VERSION||null));var f=of(e,c&&c.ub,c&&c.tb),c=ui(this,a.providerId).then(function(){return hi(b)}).then(function(){vi(b);return b.getToken()}).then(function(){return Rh(b.m,f,"linkViaPopup",a,d,!!e)}).then(function(){return new I(function(a,
	c){b.Ha("linkViaPopup",null,new R("cancelled-popup-request"),b.ia||null);b.$=a;b.Fa=c;b.ia=d;b.C=Th(b.m,b,"linkViaPopup",f,d)})}).then(function(a){f&&nf(f);return a}).l(function(a){f&&nf(f);throw a;});return this.c(c)};
	h.linkWithRedirect=function(a){if(!wf())return K(new R("operation-not-supported-in-this-environment"));var b=this,c=null,d=this.Fb(),e=ui(this,a.providerId).then(function(){vi(b);return b.getToken()}).then(function(){b.Yb=d;return hi(b)}).then(function(a){b.Ga&&(a=b.Ga,a=a.A.set(wi,b.G(),a.B));return a}).then(function(){return Sh(b.m,"linkViaRedirect",a,d)}).l(function(a){c=a;if(b.Ga)return xi(b.Ga);throw c;}).then(function(){if(c)throw c;});return this.c(e)};
	var vi=function(a){if(a.m&&a.Vb)return;if(a.m&&!a.Vb)throw new R("internal-error");throw new R("auth-domain-config-required");};W.prototype.Yd=function(a,b){var c=this;this.C&&(this.C.cancel(),this.C=null);var d=null,e=this.getToken().then(function(d){return Pf(c.f,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=$f(a);return c.bd(a)}).then(function(a){return{user:a,credential:d}});return this.c(e)};
	W.prototype.sendEmailVerification=function(){var a=this;return this.c(this.getToken().then(function(b){return a.f.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};var ri=function(a){for(var b=0;b<a.U.length;b++)a.U[b].cancel("app-deleted");a.U=[];a.Vd=!0;Q(a,"refreshToken",null);a.m&&a.m.unsubscribe(a)};W.prototype.c=function(a){var b=this;this.U.push(a);xd(a,function(){La(b.U,a)});return a};W.prototype.toJSON=function(){return this.G()};
	W.prototype.G=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.v,appName:this.ea,authDomain:this.X,stsTokenManager:this.ba.G(),redirectEventId:this.Yb||null};x(this.providerData,function(b){a.providerData.push(Ef(b))});return a};
	var yi=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-la())/1E3;else return null;var d=new W(b,c,a);a.providerData&&x(a.providerData,function(a){if(a){var b={};Df(b,a);ni(d,b)}});a.redirectEventId&&(d.Yb=a.redirectEventId);
	return d},zi=function(a,b,c){var d=new W(a,b);c&&(d.Ga=c);return d.reload().then(function(){return d})};var Ai=function(a){this.B=a;this.A=Ch()},wi={name:"redirectUser",V:!1},xi=function(a){return a.A.remove(wi,a.B)},Bi=function(a,b){return a.A.get(wi,a.B).then(function(a){a&&b&&(a.authDomain=b);return yi(a||{})})};var Ci=function(a){this.B=a;this.A=Ch()},Di={name:"authUser",V:!0},Ei=function(a,b){return a.A.set(Di,b.G(),a.B)},Fi=function(a){return a.A.remove(Di,a.B)},Gi=function(a,b){return a.A.get(Di,a.B).then(function(a){a&&b&&(a.authDomain=b);return yi(a||{})})};var Y=function(a){this.Na=!1;Q(this,"app",a);if(X(this).options&&X(this).options.apiKey)a=firebase.SDK_VERSION?tf(firebase.SDK_VERSION):null,this.f=new T(X(this).options&&X(this).options.apiKey,null,a);else throw new R("invalid-api-key");this.U=[];this.La=[];this.ue=firebase.INTERNAL.createSubscribe(r(this.me,this));Hi(this,null);this.ma=new Ci(X(this).options.apiKey+":"+X(this).name);this.Ya=new Ai(X(this).options.apiKey+":"+X(this).name);this.Ab=this.c(Ii(this));this.sa=this.c(Ji(this));this.yc=
	!1;this.vc=r(this.Ee,this);this.Dd=r(this.Ra,this);this.Ed=r(this.ie,this);this.Cd=r(this.he,this);Ki(this);this.INTERNAL={};this.INTERNAL.delete=r(this.delete,this)};Y.prototype.toJSON=function(){return{apiKey:X(this).options.apiKey,authDomain:X(this).options.authDomain,appName:X(this).name,currentUser:Z(this)&&Z(this).G()}};
	var Li=function(a){return a.Wd||K(new R("auth-domain-config-required"))},Ki=function(a){var b=X(a).options.authDomain,c=X(a).options.apiKey;b&&wf()&&(a.Wd=a.Ab.then(function(){if(!a.Na)return a.m=Vh(b,c,X(a).name),a.m.subscribe(a),Z(a)&&ii(Z(a)),a.Kc&&(ii(a.Kc),a.Kc=null),a.m}))};h=Y.prototype;h.Wc=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.ia==b&&!!this.$;default:return!1}};
	h.Ha=function(a,b,c,d){"signInViaPopup"==a&&this.ia==d&&(c&&this.Fa?this.Fa(c):b&&!c&&this.$&&this.$(b),this.C&&(this.C.cancel(),this.C=null),delete this.$,delete this.Fa)};h.mb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.ia==b&&this.$?r(this.Zd,this):null};
	h.Zd=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.C&&(this.C.cancel(),this.C=null);var d=null,e=Nf(c.f,a).then(function(a){d=$f(a);return a});a=c.Ab.then(function(){return e}).then(function(a){return Mi(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.c(a)};h.Fb=function(){return vf()};
	h.signInWithPopup=function(a){if(!wf())return K(new R("operation-not-supported-in-this-environment"));var b=this,c=Hf(a.providerId),d=this.Fb(),e=null;!xf()&&X(this).options.authDomain&&a.isOAuthProvider&&(e=Wg(X(this).options.authDomain,X(this).options.apiKey,X(this).name,"signInViaPopup",a.providerId,a.Hb(),null,d,firebase.SDK_VERSION||null));var f=of(e,c&&c.ub,c&&c.tb),c=Li(this).then(function(b){return Rh(b,f,"signInViaPopup",a,d,!!e)}).then(function(){return new I(function(a,c){b.Ha("signInViaPopup",
	null,new R("cancelled-popup-request"),b.ia);b.$=a;b.Fa=c;b.ia=d;b.C=Th(b.m,b,"signInViaPopup",f,d)})}).then(function(a){f&&nf(f);return a}).l(function(a){f&&nf(f);throw a;});return this.c(c)};h.signInWithRedirect=function(a){if(!wf())return K(new R("operation-not-supported-in-this-environment"));var b=this,c=Li(this).then(function(){return Sh(b.m,"signInViaRedirect",a)});return this.c(c)};
	h.getRedirectResult=function(){if(!wf())return K(new R("operation-not-supported-in-this-environment"));var a=this,b=Li(this).then(function(){return a.m.getRedirectResult()});return this.c(b)};
	var Mi=function(a,b){var c={};c.apiKey=X(a).options.apiKey;c.authDomain=X(a).options.authDomain;c.appName=X(a).name;return a.Ab.then(function(){return zi(c,b,a.Ya)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.Ra(b);Hi(a,b);ii(b);return a.Ra(b)}).then(function(){a.Da()})},Hi=function(a,b){Z(a)&&(gi(Z(a),a.Dd),Ub(Z(a),"tokenChanged",a.Ed),Ub(Z(a),"userDeleted",a.Cd));b&&(b.dc.push(a.Dd),Lb(b,"tokenChanged",a.Ed),Lb(b,"userDeleted",a.Cd));Q(a,"currentUser",b)};
	Y.prototype.signOut=function(){var a=this,b=this.sa.then(function(){if(!Z(a))return J();Hi(a,null);return Fi(a.ma).then(function(){a.Da()})});return this.c(b)};
	var Ni=function(a){var b=Bi(a.Ya,X(a).options.authDomain).then(function(b){if(a.Kc=b)b.Ga=a.Ya;return xi(a.Ya)});return a.c(b)},Ii=function(a){var b=X(a).options.authDomain,c=Ni(a).then(function(){return Gi(a.ma,b)}).then(function(b){return b?(b.Ga=a.Ya,b.reload().then(function(){return Ei(a.ma,b).then(function(){return b})}).l(function(c){return"auth/network-request-failed"==c.code?b:Fi(a.ma)})):null}).then(function(b){Hi(a,b||null)});return a.c(c)},Ji=function(a){return a.Ab.then(function(){return a.getRedirectResult()}).l(function(){}).then(function(){return a.Na?
	void 0:a.vc()}).l(function(){}).then(function(){if(!a.Na){a.yc=!0;var b=a.ma;b.A.addListener(Di,b.B,a.vc)}})};Y.prototype.Ee=function(){var a=this;return Gi(this.ma,X(this).options.authDomain).then(function(b){if(!a.Na){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();if(Z(a)||b)Hi(a,b),b&&(ii(b),b.Ga=a.Ya),a.m&&a.m.subscribe(a),a.Da()}})};Y.prototype.Ra=function(a){return Ei(this.ma,a)};
	Y.prototype.ie=function(){this.Da();this.Ra(Z(this))};Y.prototype.he=function(){this.signOut()};var Oi=function(a,b){return a.c(b.then(function(b){return Mi(a,b)}).then(function(){return Z(a)}))};h=Y.prototype;h.me=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.yc&&firebase.Promise.resolve().then(function(){p(a)?a(Z(d)):p(a.next)&&a.next(Z(d))});return this.ue(a,b,c)};
	h.getToken=function(a){var b=this,c=this.sa.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.c(c)};h.signInWithCustomToken=function(a){var b=this;return this.sa.then(function(){return Oi(b,S(b.f,Lg,{token:a}))}).then(function(a){oi(a,"isAnonymous",!1);return b.Ra(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.sa.then(function(){return Oi(c,S(c.f,Wf,{email:a,password:b}))})};
	h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.sa.then(function(){return Oi(c,S(c.f,Ig,{email:a,password:b}))})};h.signInWithCredential=function(a){var b=this;return this.sa.then(function(){return Oi(b,a.Gb(b.f))})};h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?J(a):this.sa.then(function(){return Oi(b,b.f.signInAnonymously())}).then(function(a){oi(a,"isAnonymous",!0);return b.Ra(a)}).then(function(){return Z(b)})};
	var X=function(a){return a.app},Z=function(a){return a.currentUser};h=Y.prototype;h.Da=function(){if(this.yc)for(var a=0;a<this.La.length;a++)if(this.La[a])this.La[a](Z(this)&&Z(this)._lat||null)};h.addAuthTokenListener=function(a){var b=this;this.La.push(a);this.c(this.sa.then(function(){b.Na||Ja(b.La,a)&&a(Z(b)&&Z(b)._lat||null)}))};h.removeAuthTokenListener=function(a){Ma(this.La,function(b){return b==a})};
	h.delete=function(){this.Na=!0;for(var a=0;a<this.U.length;a++)this.U[a].cancel("app-deleted");this.U=[];this.ma&&(a=this.ma,a.A.removeListener(Di,a.B,this.vc));this.m&&this.m.unsubscribe(this);return firebase.Promise.resolve()};h.c=function(a){var b=this;this.U.push(a);xd(a,function(){La(b.U,a)});return a};h.fetchProvidersForEmail=function(a){return this.c(pg(this.f,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};
	h.confirmPasswordReset=function(a,b){return this.c(this.f.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.c(this.f.checkActionCode(a).then(function(a){return{data:{email:a.email}}}))};h.applyActionCode=function(a){return this.c(this.f.applyActionCode(a).then(function(){}))};h.sendPasswordResetEmail=function(a){return this.c(this.f.sendPasswordResetEmail(a).then(function(){}))};yh(Y.prototype,{applyActionCode:{name:"applyActionCode",b:[U("code")]},checkActionCode:{name:"checkActionCode",b:[U("code")]},confirmPasswordReset:{name:"confirmPasswordReset",b:[U("code"),U("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",b:[U("email"),U("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",b:[U("email")]},getRedirectResult:{name:"getRedirectResult",b:[]},onAuthStateChanged:{name:"onAuthStateChanged",b:[wh(rh(),sh(),"nextOrObserver"),
	sh("opt_error",!0),sh("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",b:[U("email")]},signInAnonymously:{name:"signInAnonymously",b:[]},signInWithCredential:{name:"signInWithCredential",b:[uh()]},signInWithCustomToken:{name:"signInWithCustomToken",b:[U("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",b:[U("email"),U("password")]},signInWithPopup:{name:"signInWithPopup",b:[vh()]},signInWithRedirect:{name:"signInWithRedirect",b:[vh()]},signOut:{name:"signOut",
	b:[]},toJSON:{name:"toJSON",b:[U(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",b:[U("code")]}});
	yh(W.prototype,{"delete":{name:"delete",b:[]},getToken:{name:"getToken",b:[{name:"opt_forceRefresh",ca:"a boolean",optional:!0,da:function(a){return"boolean"==typeof a}}]},link:{name:"link",b:[uh()]},linkWithPopup:{name:"linkWithPopup",b:[vh()]},linkWithRedirect:{name:"linkWithRedirect",b:[vh()]},reauthenticate:{name:"reauthenticate",b:[uh()]},reload:{name:"reload",b:[]},sendEmailVerification:{name:"sendEmailVerification",b:[]},toJSON:{name:"toJSON",b:[U(null,!0)]},unlink:{name:"unlink",b:[U("provider")]},
	updateEmail:{name:"updateEmail",b:[U("email")]},updatePassword:{name:"updatePassword",b:[U("password")]},updateProfile:{name:"updateProfile",b:[rh("profile")]}});yh(I.prototype,{l:{name:"catch"},then:{name:"then"}});V(Yf,"credential",function(a,b){return new Vf(a,b)},[U("email"),U("password")]);yh(Rf.prototype,{addScope:{name:"addScope",b:[U("scope")]}});V(Rf,"credential",Rf.credential,[wh(U(),rh(),"token")]);yh(Sf.prototype,{addScope:{name:"addScope",b:[U("scope")]}});
	V(Sf,"credential",Sf.credential,[wh(U(),rh(),"token")]);yh(Tf.prototype,{addScope:{name:"addScope",b:[U("scope")]}});V(Tf,"credential",Tf.credential,[wh(U(),wh(rh(),th()),"idToken"),wh(U(),th(),"accessToken",!0)]);V(Uf,"credential",Uf.credential,[wh(U(),rh(),"token"),U("secret",!0)]);
	(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:Y,Error:R};V(a,"EmailAuthProvider",Yf,[]);V(a,"FacebookAuthProvider",Rf,[]);V(a,"GithubAuthProvider",Sf,[]);V(a,"GoogleAuthProvider",Tf,[]);V(a,"TwitterAuthProvider",Uf,[]);firebase.INTERNAL.registerService("auth",function(a,c){a=new Y(a);c({INTERNAL:{getToken:r(a.getToken,a),addAuthTokenListener:r(a.addAuthTokenListener,a),removeAuthTokenListener:r(a.removeAuthTokenListener,a)}});return a},
	a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:W})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();})();
	module.exports = firebase.auth;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {var firebase = __webpack_require__(10);
	/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	(function() {var g,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.Wb=function(){return a.bf?a.bf:a.bf=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==ca(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
	function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
	function ka(a,b){function c(){}c.prototype=b.prototype;a.Ig=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Eg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function t(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function la(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function ma(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function na(a){var b=0,c;for(c in a)b++;return b}function oa(a){for(var b in a)return b}function pa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ra(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function sa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ta(a,b){var c=sa(a,b,void 0);return c&&a[c]}function ua(a){for(var b in a)return!1;return!0}function va(a){var b={},c;for(c in a)b[c]=a[c];return b};function wa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function xa(){this.Fd=void 0}
	function ya(a,b,c){switch(typeof b){case "string":za(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],ya(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),za(f,c),
	c.push(":"),ya(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Aa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ba=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function za(a,b){b.push('"',a.replace(Ba,function(a){if(a in Aa)return Aa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Aa[a]=e+b.toString(16)}),'"')};var v;a:{var Ca=n.navigator;if(Ca){var Da=Ca.userAgent;if(Da){v=Da;break a}}v=""};function Ea(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ea);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(Ea,Error);Ea.prototype.name="CustomError";var w=Array.prototype,Fa=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ga=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ha=w.filter?function(a,b,c){return w.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Ia=w.map?function(a,b,c){return w.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ja=w.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=r(b,d));return w.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ga(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Ka=w.every?function(a,b,
	c){return w.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function La(a,b){var c=Ma(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Ma(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Na(a,b){var c=Fa(a,b);0<=c&&w.splice.call(a,c,1)}function Oa(a,b,c){return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)}
	function Pa(a,b){a.sort(b||Qa)}function Qa(a,b){return a>b?1:a<b?-1:0};var Ra=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Sa=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Ta=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Ua=-1!=v.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Ra&&n.opera)return a=n.opera.version,ga(a)?a():a;Ta?b=/rv\:([^\);]+)(\)|;)/:Sa?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Ua&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Sa&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();function Va(a){n.setTimeout(function(){throw a;},0)}var Wa;
	function Xa(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==v.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==v.indexOf("Trident")&&-1==v.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Le;c.Le=null;a()}};return function(a){d.next={Le:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function Ya(a,b){Za||$a();ab||(Za(),ab=!0);bb.push(new cb(a,b))}var Za;function $a(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();Za=function(){a.then(db)}}else Za=function(){var a=db;!ga(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(Wa||(Wa=Xa()),Wa(a)):n.setImmediate(a)}}var ab=!1,bb=[];[].push(function(){ab=!1;bb=[]});
	function db(){for(;bb.length;){var a=bb;bb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Wf.call(c.scope)}catch(d){Va(d)}}}ab=!1}function cb(a,b){this.Wf=a;this.scope=b};function eb(a,b){this.L=fb;this.uf=void 0;this.Ca=this.Ha=null;this.jd=this.be=!1;if(a==gb)hb(this,ib,b);else try{var c=this;a.call(b,function(a){hb(c,ib,a)},function(a){if(!(a instanceof jb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}hb(c,kb,a)})}catch(d){hb(this,kb,d)}}var fb=0,ib=2,kb=3;function gb(){}eb.prototype.then=function(a,b,c){return lb(this,ga(a)?a:null,ga(b)?b:null,c)};eb.prototype.then=eb.prototype.then;eb.prototype.$goog_Thenable=!0;g=eb.prototype;
	g.Ag=function(a,b){return lb(this,null,a,b)};g.cancel=function(a){this.L==fb&&Ya(function(){var b=new jb(a);mb(this,b)},this)};function mb(a,b){if(a.L==fb)if(a.Ha){var c=a.Ha;if(c.Ca){for(var d=0,e=-1,f=0,h;h=c.Ca[f];f++)if(h=h.m)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.L==fb&&1==d?mb(c,b):(d=c.Ca.splice(e,1)[0],nb(c,d,kb,b)))}a.Ha=null}else hb(a,kb,b)}function ob(a,b){a.Ca&&a.Ca.length||a.L!=ib&&a.L!=kb||pb(a);a.Ca||(a.Ca=[]);a.Ca.push(b)}
	function lb(a,b,c,d){var e={m:null,hf:null,kf:null};e.m=new eb(function(a,h){e.hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){h(l)}}:a;e.kf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof jb?h(b):a(e)}catch(l){h(l)}}:h});e.m.Ha=a;ob(a,e);return e.m}g.Cf=function(a){this.L=fb;hb(this,ib,a)};g.Df=function(a){this.L=fb;hb(this,kb,a)};
	function hb(a,b,c){if(a.L==fb){if(a==c)b=kb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.L=1;c.then(a.Cf,a.Df,a);return}if(ha(c))try{var f=c.then;if(ga(f)){qb(a,c,f);return}}catch(h){b=kb,c=h}}a.uf=c;a.L=b;a.Ha=null;pb(a);b!=kb||c instanceof jb||rb(a,c)}}function qb(a,b,c){function d(b){f||(f=!0,a.Df(b))}function e(b){f||(f=!0,a.Cf(b))}a.L=1;var f=!1;try{c.call(b,e,d)}catch(h){d(h)}}
	function pb(a){a.be||(a.be=!0,Ya(a.Uf,a))}g.Uf=function(){for(;this.Ca&&this.Ca.length;){var a=this.Ca;this.Ca=null;for(var b=0;b<a.length;b++)nb(this,a[b],this.L,this.uf)}this.be=!1};function nb(a,b,c,d){if(c==ib)b.hf(d);else{if(b.m)for(;a&&a.jd;a=a.Ha)a.jd=!1;b.kf(d)}}function rb(a,b){a.jd=!0;Ya(function(){a.jd&&sb.call(null,b)})}var sb=Va;function jb(a){Ea.call(this,a)}ka(jb,Ea);jb.prototype.name="cancel";var tb=null,ub=null,vb=null;function wb(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");xb();for(var c=b?ub:tb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
	function xb(){if(!tb){tb={};ub={};vb={};for(var a=0;65>a;a++)tb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),ub[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),vb[ub[a]]=a,62<=a&&(vb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function yb(){this.Ya=-1};function zb(){this.Ya=-1;this.Ya=64;this.N=[];this.Wd=[];this.Jf=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Ya;++a)this.zd[a]=0;this.Pd=this.ac=0;this.reset()}ka(zb,yb);zb.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.Pd=this.ac=0};
	function Ab(a,b,c){c||(c=0);var d=a.Jf;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],m=a.N[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+m&4294967295}
	zb.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.Wd,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ab(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){Ab(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){Ab(this,e);f=0;break}}this.ac=f;this.Pd+=b}};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Bb(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function y(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Bb(a,b,d)+"must be a valid function.");}function Cb(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Bb(a,b,!0)+"must be a valid context object.");};var Db=n.Promise||eb;eb.prototype["catch"]=eb.prototype.Ag;function Eb(){var a=this;this.reject=this.resolve=null;this.sa=new Db(function(b,c){a.resolve=b;a.reject=c})}function Fb(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(Gb(a.sa),1===b.length?b(c):b(c,d))}}function Gb(a){a.then(void 0,aa)};function Hb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function A(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function Jb(a){var b=[];Ib(a,function(a,d){da(d)?Ga(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};function Kb(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):wa(a)}function B(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];ya(new xa,a,b);a=b.join("")}return a};function Lb(a,b){if(!a)throw Mb(b);}function Mb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function Nb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Lb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Ob(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function Pb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function Qb(a){this.te=a;this.Bd=[];this.Rb=0;this.Yd=-1;this.Gb=null}function Rb(a,b,c){a.Yd=b;a.Gb=c;a.Yd<a.Rb&&(a.Gb(),a.Gb=null)}function Sb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Rb];){var d=a.Bd[a.Rb];delete a.Bd[a.Rb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Tb(function(){f.te(d[e])})}if(a.Rb===a.Yd){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Rb++}};function Ub(){this.qc={}}Ub.prototype.set=function(a,b){null==b?delete this.qc[a]:this.qc[a]=b};Ub.prototype.get=function(a){return Hb(this.qc,a)?this.qc[a]:null};Ub.prototype.remove=function(a){delete this.qc[a]};Ub.prototype.cf=!0;function Vb(a){this.vc=a;this.Cd="firebase:"}g=Vb.prototype;g.set=function(a,b){null==b?this.vc.removeItem(this.Cd+a):this.vc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.vc.getItem(this.Cd+a);return null==a?null:Kb(a)};g.remove=function(a){this.vc.removeItem(this.Cd+a)};g.cf=!1;g.toString=function(){return this.vc.toString()};function Wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Vb(b)}}catch(c){}return new Ub}var Xb=Wb("localStorage"),Yb=Wb("sessionStorage");function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Nc=function(){return this.path.e()?new Zb(this.source,C):new Zb(this.source,D(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b,c){this.type=bc;this.source=a;this.path=b;this.Ja=c}ac.prototype.Nc=function(a){return this.path.e()?new ac(this.source,C,this.Ja.R(a)):new ac(this.source,D(this.path),this.Ja)};ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function cc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.Cg=d;this.nf=e||"";this.bb=Xb.get("host:"+a)||this.host}function dc(a,b){b!==a.bb&&(a.bb=b,"s-"===a.bb.substr(0,2)&&Xb.set("host:"+a.host,a.bb))}
	function ec(a,b,c){E("string"===typeof b,"typeof type must == string");E("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.bb+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.bb+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.bb&&(c.ns=a.pe);var d=[];t(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	cc.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.nf&&(a+="<"+this.nf+">");return a};function fc(){this.Jd=F}fc.prototype.j=function(a){return this.Jd.Q(a)};fc.prototype.toString=function(){return this.Jd.toString()};function H(a,b,c,d){this.type=a;this.Ma=b;this.Za=c;this.qe=d;this.Dd=void 0}function gc(a){return new H(hc,a)}var hc="value";function ic(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.gd=a}ic.prototype.Zb=function(){var a=this.Md.xb();return"value"===this.gd?a.path:a.getParent().path};ic.prototype.ge=function(){return this.gd};ic.prototype.Ub=function(){return this.ae.Ub(this)};ic.prototype.toString=function(){return this.Zb().toString()+":"+this.gd+":"+B(this.Md.Ue())};function jc(a,b,c){this.ae=a;this.error=b;this.path=c}jc.prototype.Zb=function(){return this.path};jc.prototype.ge=function(){return"cancel"};
	jc.prototype.Ub=function(){return this.ae.Ub(this)};jc.prototype.toString=function(){return this.path.toString()+":cancel"};function kc(){}kc.prototype.Xe=function(){return null};kc.prototype.fe=function(){return null};var lc=new kc;function mc(a,b,c){this.Gf=a;this.Na=b;this.yd=c}mc.prototype.Xe=function(a){var b=this.Na.O;if(nc(b,a))return b.j().R(a);b=null!=this.yd?new oc(this.yd,!0,!1):this.Na.w();return this.Gf.rc(a,b)};mc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:pc(this.Na);a=this.Gf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function qc(){this.wb=[]}function rc(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.$(c.Zb())||(a.wb.push(c),c=null);null===c&&(c=new sc(f));c.add(e)}c&&a.wb.push(c)}function tc(a,b,c){rc(a,c);uc(a,function(a){return a.$(b)})}function vc(a,b,c){rc(a,c);uc(a,function(a){return a.contains(b)||b.contains(a)})}
	function uc(a,b){for(var c=!0,d=0;d<a.wb.length;d++){var e=a.wb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.wb[d],f=0;f<e.hd.length;f++){var h=e.hd[f];if(null!==h){e.hd[f]=null;var k=h.Ub();wc&&I("event: "+h.toString());Tb(k)}}a.wb[d]=null}else c=!1}c&&(a.wb=[])}function sc(a){this.ra=a;this.hd=[]}sc.prototype.add=function(a){this.hd.push(a)};sc.prototype.Zb=function(){return this.ra};function oc(a,b,c){this.A=a;this.ea=b;this.Tb=c}function xc(a){return a.ea}function yc(a){return a.Tb}function zc(a,b){return b.e()?a.ea&&!a.Tb:nc(a,J(b))}function nc(a,b){return a.ea&&!a.Tb||a.A.Fa(b)}oc.prototype.j=function(){return this.A};function Ac(a,b){this.Oa=a;this.ca=b?b:Bc}g=Ac.prototype;g.Ra=function(a,b){return new Ac(this.Oa,this.ca.Ra(a,b,this.Oa).Y(null,null,!1,null,null))};g.remove=function(a){return new Ac(this.Oa,this.ca.remove(a,this.Oa).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ca;!c.e();){b=this.Oa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Cc(a,b){for(var c,d=a.ca,e=null;!d.e();){c=a.Oa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ca.e()};g.count=function(){return this.ca.count()};g.Hc=function(){return this.ca.Hc()};g.fc=function(){return this.ca.fc()};g.ia=function(a){return this.ca.ia(a)};
	g.Xb=function(a){return new Dc(this.ca,null,this.Oa,!1,a)};g.Yb=function(a,b){return new Dc(this.ca,a,this.Oa,!1,b)};g.$b=function(a,b){return new Dc(this.ca,a,this.Oa,!0,b)};g.$e=function(a){return new Dc(this.ca,null,this.Oa,!0,a)};function Dc(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Sa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Sa.push(a);break}else this.Sa.push(a),a=this.le?a.right:a.left}
	function K(a){if(0===a.Sa.length)return null;var b=a.Sa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Sa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Sa.push(b),b=b.left;return c}function Ec(a){if(0===a.Sa.length)return null;var b;b=a.Sa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function Fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Bc;this.right=null!=e?e:Bc}g=Fc.prototype;
	g.Y=function(a,b,c,d,e){return new Fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function Gc(a){return a.left.e()?a:Gc(a.left)}g.Hc=function(){return Gc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
	g.Ra=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ra(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ra(a,b,c));return Hc(e)};function Ic(a){if(a.left.e())return Bc;a.left.fa()||a.left.left.fa()||(a=Jc(a));a=a.Y(null,null,null,Ic(a.left),null);return Hc(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=Jc(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=Kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=Lc(c),c.left.left.fa()&&(c=Kc(c),c=Lc(c)));if(0===b(a,c.key)){if(c.right.e())return Bc;d=Gc(c.right);c=c.Y(d.key,d.value,null,null,Ic(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return Hc(c)};g.fa=function(){return this.color};
	function Hc(a){a.right.fa()&&!a.left.fa()&&(a=Mc(a));a.left.fa()&&a.left.left.fa()&&(a=Kc(a));a.left.fa()&&a.right.fa()&&(a=Lc(a));return a}function Jc(a){a=Lc(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,Kc(a.right)),a=Mc(a),a=Lc(a));return a}function Mc(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function Kc(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
	function Lc(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function Nc(){}g=Nc.prototype;g.Y=function(){return this};g.Ra=function(a,b){return new Fc(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Hc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var Bc=new Nc;var Oc=function(){var a=1;return function(){return a++}}(),E=Lb,Pc=Mb;
	function Qc(a){try{var b;xb();for(var c=vb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Oa(d,c,c+8192));b=a}return b}catch(l){I("base64Decode failed: ",
	l)}return null}function Rc(a){var b=Nb(a);a=new zb;a.update(b);var b=[],c=8*a.Pd;56>a.ac?a.update(a.zd,56-a.ac):a.update(a.zd,a.Ya-(a.ac-56));for(var d=a.Ya-1;56<=d;d--)a.Wd[d]=c&255,c/=256;Ab(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return wb(b)}function Sc(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+Sc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var wc=null,Tc=!0;
	function Uc(a,b){Lb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?wc=r(console.log,console):"object"===typeof console.log&&(wc=function(a){console.log(a)})),b&&Yb.set("logging_enabled",!0)):ga(a)?wc=a:(wc=null,Yb.remove("logging_enabled"))}function I(a){!0===Tc&&(Tc=!1,null===wc&&!0===Yb.get("logging_enabled")&&Uc(!0));if(wc){var b=Sc.apply(null,arguments);wc(b)}}
	function Vc(a){return function(){I(a,arguments)}}function Wc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Sc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Xc(a){var b=Sc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function L(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Sc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Yc(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(q(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Xc(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||Xc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&L("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{kc:new cc(b,d,c,"ws"===e||"wss"===e),path:new M(f)}}function Zc(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function $c(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function ad(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=bd(a),d=bd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function cd(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function dd(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=dd(a[b[d]]);return c+"}"}function ed(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function fd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else t(a,b)}
	function gd(a){E(!Zc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var hd=/^-?\d{1,10}$/;function bd(a){return hd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Tb(a){try{a()}catch(b){setTimeout(function(){L("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function id(a,b,c){Object.defineProperty(a,b,{get:c})};function jd(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Kb(Qc(f[0])||""),c=Kb(Qc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Fg:b,Me:c,data:d,xg:e}}function kd(a){a=jd(a);var b=a.Me;return!!a.xg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function ld(a){a=jd(a).Me;return"object"===typeof a&&!0===A(a,"admin")};function md(a,b,c){this.type=nd;this.source=a;this.path=b;this.children=c}md.prototype.Nc=function(a){if(this.path.e())return a=this.children.subtree(new M(a)),a.e()?null:a.value?new ac(this.source,C,a.value):new md(this.source,C,a);E(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new md(this.source,D(this.path),this.children)};md.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function od(a){this.g=a}g=od.prototype;g.F=function(a,b,c,d,e,f){E(a.zc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).$(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?pd(f,new H("child_removed",e,b)):E(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?pd(f,new H("child_added",c,b)):pd(f,new H("child_changed",c,b,e)));return a.J()&&c.e()?a:a.U(b,c).ob(this.g)};
	g.za=function(a,b,c){null!=c&&(a.J()||a.P(N,function(a,e){b.Fa(a)||pd(c,new H("child_removed",e,a))}),b.J()||b.P(N,function(b,e){if(a.Fa(b)){var f=a.R(b);f.$(e)||pd(c,new H("child_changed",e,b,f))}else pd(c,new H("child_added",e,b))}));return b.ob(this.g)};g.ga=function(a,b){return a.e()?F:a.ga(b)};g.Qa=function(){return!1};g.Vb=function(){return this};function qd(a){this.he=new od(a.g);this.g=a.g;var b;a.la?(b=rd(a),b=a.g.Fc(sd(a),b)):b=a.g.Ic();this.Uc=b;a.oa?(b=td(a),a=a.g.Fc(ud(a),b)):a=a.g.Gc();this.wc=a}g=qd.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.wc)};g.F=function(a,b,c,d,e,f){this.matches(new O(b,c))||(c=F);return this.he.F(a,b,c,d,e,f)};
	g.za=function(a,b,c){b.J()&&(b=F);var d=b.ob(this.g),d=d.ga(F),e=this;b.P(N,function(a,b){e.matches(new O(a,b))||(d=d.U(a,F))});return this.he.za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.he};function vd(){this.hb={}}
	function pd(a,b){var c=b.type,d=b.Za;E("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");E(".priority"!==d,"Only non-priority child changes can be tracked.");var e=A(a.hb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.hb[d]=new H("child_changed",b.Ma,d,e.Ma);else if("child_removed"==c&&"child_added"==f)delete a.hb[d];else if("child_removed"==c&&"child_changed"==f)a.hb[d]=new H("child_removed",e.qe,d);else if("child_changed"==c&&
	"child_added"==f)a.hb[d]=new H("child_added",b.Ma,d);else if("child_changed"==c&&"child_changed"==f)a.hb[d]=new H("child_changed",b.Ma,d,e.qe);else throw Pc("Illegal combination of changes: "+b+" occurred after "+e);}else a.hb[d]=b};function wd(a,b){this.Sd=a;this.Mf=b}function xd(a){this.V=a}
	xd.prototype.gb=function(a,b,c,d){var e=new vd,f;if(b.type===bc)b.source.ee?c=yd(this,a,b.path,b.Ja,c,d,e):(E(b.source.We,"Unknown source."),f=b.source.Ee||yc(a.w())&&!b.path.e(),c=zd(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===nd)b.source.ee?c=Ad(this,a,b.path,b.children,c,d,e):(E(b.source.We,"Unknown source."),f=b.source.Ee||yc(a.w()),c=Bd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Dd)if(b.Id)if(b=b.path,null!=c.mc(b))c=a;else{f=new mc(c,a,d);d=a.O.j();if(b.e()||".priority"===J(b))xc(a.w())?
	b=c.Ba(pc(a)):(b=a.w().j(),E(b instanceof P,"serverChildren would be complete if leaf node"),b=c.sc(b)),b=this.V.za(d,b,e);else{var h=J(b),k=c.rc(h,a.w());null==k&&nc(a.w(),h)&&(k=d.R(h));b=null!=k?this.V.F(d,h,k,D(b),f,e):a.O.j().Fa(h)?this.V.F(d,h,F,D(b),f,e):d;b.e()&&xc(a.w())&&(d=c.Ba(pc(a)),d.J()&&(b=this.V.za(b,d,e)))}d=xc(a.w())||null!=c.mc(C);c=Ed(a,b,d,this.V.Qa())}else c=Fd(this,a,b.path,b.Pb,c,d,e);else if(b.type===$b)d=b.path,b=a.w(),f=b.j(),h=b.ea||d.e(),c=Gd(this,new Hd(a.O,new oc(f,
	h,b.Tb)),d,c,lc,e);else throw Pc("Unknown operation type: "+b.type);e=pa(e.hb);d=c;b=d.O;b.ea&&(f=b.j().J()||b.j().e(),h=Id(a),(0<e.length||!a.O.ea||f&&!b.j().$(h)||!b.j().C().$(h.C()))&&e.push(gc(Id(d))));return new wd(c,e)};
	function Gd(a,b,c,d,e,f){var h=b.O;if(null!=d.mc(c))return b;var k;if(c.e())E(xc(b.w()),"If change path is empty, we must have complete server data"),yc(b.w())?(e=pc(b),d=d.sc(e instanceof P?e:F)):d=d.Ba(pc(b)),f=a.V.za(b.O.j(),d,f);else{var m=J(c);if(".priority"==m)E(1==Jd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.$c(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var l=D(c);nc(h,m)?(k=b.w().j(),d=d.$c(c,h.j(),k),d=null!=d?h.j().R(m).F(l,d):h.j().R(m)):d=d.rc(m,
	b.w());f=null!=d?a.V.F(h.j(),m,d,l,e,f):h.j()}}return Ed(b,f,h.ea||c.e(),a.V.Qa())}function zd(a,b,c,d,e,f,h,k){var m=b.w();h=h?a.V:a.V.Vb();if(c.e())d=h.za(m.j(),d,null);else if(h.Qa()&&!m.Tb)d=m.j().F(c,d),d=h.za(m.j(),d,null);else{var l=J(c);if(!zc(m,c)&&1<Jd(c))return b;var u=D(c);d=m.j().R(l).F(u,d);d=".priority"==l?h.ga(m.j(),d):h.F(m.j(),l,d,u,lc,null)}m=m.ea||c.e();b=new Hd(b.O,new oc(d,m,h.Qa()));return Gd(a,b,c,e,new mc(e,b,f),k)}
	function yd(a,b,c,d,e,f,h){var k=b.O;e=new mc(e,b,f);if(c.e())h=a.V.za(b.O.j(),d,h),a=Ed(b,h,!0,a.V.Qa());else if(f=J(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Ed(b,h,k.ea,k.Tb);else{c=D(c);var m=k.j().R(f);if(!c.e()){var l=e.Xe(f);d=null!=l?".priority"===Kd(c)&&l.Q(c.parent()).e()?l:l.F(c,d):F}m.$(d)?a=b:(h=a.V.F(k.j(),f,d,c,e,h),a=Ed(b,h,k.ea,a.V.Qa()))}return a}
	function Ad(a,b,c,d,e,f,h){var k=b;Ld(d,function(d,l){var u=c.m(d);nc(b.O,J(u))&&(k=yd(a,k,u,l,e,f,h))});Ld(d,function(d,l){var u=c.m(d);nc(b.O,J(u))||(k=yd(a,k,u,l,e,f,h))});return k}function Md(a,b){Ld(b,function(b,d){a=a.F(b,d)});return a}
	function Bd(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!xc(b.w()))return b;var m=b;c=c.e()?d:Nd(Q,c,d);var l=b.w().j();c.children.ia(function(c,d){if(l.Fa(c)){var G=b.w().j().R(c),G=Md(G,d);m=zd(a,m,new M(c),G,e,f,h,k)}});c.children.ia(function(c,d){var G=!nc(b.w(),c)&&null==d.value;l.Fa(c)||G||(G=b.w().j().R(c),G=Md(G,d),m=zd(a,m,new M(c),G,e,f,h,k))});return m}
	function Fd(a,b,c,d,e,f,h){if(null!=e.mc(c))return b;var k=yc(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ea||zc(m,c))return zd(a,b,c,m.j().Q(c),e,f,k,h);if(c.e()){var l=Q;m.j().P(Od,function(a,b){l=l.set(new M(a),b)});return Bd(a,b,c,l,e,f,k,h)}return b}l=Q;Ld(d,function(a){var b=c.m(a);zc(m,b)&&(l=l.set(a,m.j().Q(b)))});return Bd(a,b,c,l,e,f,k,h)};var Pd=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);E(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);E(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function M(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function R(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return R(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function Qd(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=ad(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Jd(a){return a.o.length-a.Z}function D(a){var b=a.Z;b<a.o.length&&b++;return new M(a.o,b)}function Kd(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=M.prototype;
	g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new M(a,0)};
	g.m=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof M)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new M(b,0)};g.e=function(){return this.Z>=this.o.length};g.$=function(a){if(Jd(this)!==Jd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Z,c=a.Z;if(Jd(this)>Jd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new M("");function Rd(a,b){this.Ta=a.slice();this.Ka=Math.max(1,this.Ta.length);this.Te=b;for(var c=0;c<this.Ta.length;c++)this.Ka+=Ob(this.Ta[c]);Sd(this)}Rd.prototype.push=function(a){0<this.Ta.length&&(this.Ka+=1);this.Ta.push(a);this.Ka+=Ob(a);Sd(this)};Rd.prototype.pop=function(){var a=this.Ta.pop();this.Ka-=Ob(a);0<this.Ta.length&&--this.Ka};
	function Sd(a){if(768<a.Ka)throw Error(a.Te+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ta.length)throw Error(a.Te+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Td(a));}function Td(a){return 0==a.Ta.length?"":"in property '"+a.Ta.join(".")+"'"};var Ud=/[\[\].#$\/\u0000-\u001F\u007F]/,Vd=/[\[\].#$\u0000-\u001F\u007F]/;function Wd(a){return q(a)&&0!==a.length&&!Ud.test(a)}function Xd(a){return null===a||q(a)||fa(a)&&!Zc(a)||ha(a)&&Hb(a,".sv")}function Yd(a,b,c,d){d&&!p(b)||Zd(Bb(a,1,d),b,c)}
	function Zd(a,b,c){c instanceof M&&(c=new Rd(c,a));if(!p(b))throw Error(a+"contains undefined "+Td(c));if(ga(b))throw Error(a+"contains a function "+Td(c)+" with contents: "+b.toString());if(Zc(b))throw Error(a+"contains "+b.toString()+" "+Td(c));if(q(b)&&b.length>10485760/3&&10485760<Ob(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Td(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!Wd(b)))throw Error(a+" contains an invalid key ("+b+") "+Td(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Zd(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Td(c)+" in addition to actual children.");}}
	function $d(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Wd(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Qd);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function ae(a,b,c){var d=Bb(a,1,!1);if(!ha(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Ib(b,function(a,b){var k=new M(a);Zd(d,b,c.m(k));if(".priority"===Kd(k)&&!Xd(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});$d(d,e)}
	function be(a,b,c){if(Zc(c))throw Error(Bb(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Xd(c))throw Error(Bb(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function ce(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Bb(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function de(a,b){if(p(b)&&!Wd(b))throw Error(Bb(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ee(a,b){if(!q(b)||0===b.length||Vd.test(b))throw Error(Bb(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function fe(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function ge(a,b){var c=b.path.toString(),d;!(d=!q(b.kc.host)||0===b.kc.host.length||!Wd(b.kc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(q(c)&&0!==c.length&&!Vd.test(c)));if(d)throw Error(Bb(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function he(){this.children={};this.ad=0;this.value=null}function ie(a,b,c){this.ud=a?a:"";this.Ha=b?b:null;this.A=c?c:new he}function je(a,b){for(var c=b instanceof M?b:new M(b),d=a,e;null!==(e=J(c));)d=new ie(e,d,A(d.A.children,e)||new he),c=D(c);return d}g=ie.prototype;g.Ea=function(){return this.A.value};function ke(a,b){E("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;le(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.ad=0;le(this)};
	g.kd=function(){return 0<this.A.ad};g.e=function(){return null===this.Ea()&&!this.kd()};g.P=function(a){var b=this;t(this.A.children,function(c,d){a(new ie(d,b,c))})};function me(a,b,c,d){c&&!d&&b(a);a.P(function(a){me(a,b,!0,d)});c&&d&&b(a)}function ne(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new M(null===this.Ha?this.ud:this.Ha.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Ha};
	function le(a){if(null!==a.Ha){var b=a.Ha,c=a.ud,d=a.e(),e=Hb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.ad--,le(b)):d||e||(b.A.children[c]=a.A,b.A.ad++,le(b))}};function oe(a){E(da(a)&&0<a.length,"Requires a non-empty array");this.Kf=a;this.Ec={}}oe.prototype.Ge=function(a,b){var c;c=this.Ec[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ke.apply(c[d].Pa,Array.prototype.slice.call(arguments,1))};oe.prototype.hc=function(a,b,c){pe(this,a);this.Ec[a]=this.Ec[a]||[];this.Ec[a].push({Ke:b,Pa:c});(a=this.Ye(a))&&b.apply(c,a)};
	oe.prototype.Jc=function(a,b,c){pe(this,a);a=this.Ec[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ke===b&&(!c||c===a[d].Pa)){a.splice(d,1);break}};function pe(a,b){E(La(a.Kf,function(a){return a===b}),"Unknown event: "+b)};function qe(a,b){this.value=a;this.children=b||re}var re=new Ac(function(a,b){return a===b?0:a<b?-1:1});function se(a){var b=Q;t(a,function(a,d){b=b.set(new M(d),a)});return b}g=qe.prototype;g.e=function(){return null===this.value&&this.children.e()};function te(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=te(a,D(b),c),null!=b?{path:(new M(d)).m(b.path),value:b.value}:null):null}
	function ue(a,b){return te(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new qe(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Ra(c,d);return new qe(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new qe(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Ra(b,a),null===this.value&&b.e()?Q:new qe(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
	function Nd(a,b,c){if(b.e())return c;var d=J(b);b=Nd(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Ra(d,b);return new qe(a.value,d)}function ve(a,b){return we(a,C,b)}function we(a,b,c){var d={};a.children.ia(function(a,f){d[a]=we(f,b.m(a),c)});return c(b,a.value,d)}function xe(a,b,c){return ye(a,b,C,c)}function ye(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?ye(a,D(b),c.m(e),d):null}
	function ze(a,b,c){Ae(a,b,C,c)}function Ae(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?Ae(a,D(b),c.m(e),d):Q}function Ld(a,b){Be(a,C,b)}function Be(a,b,c){a.children.ia(function(a,e){Be(e,b.m(a),c)});a.value&&c(b,a.value)}function Ce(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Q=new qe(null);qe.prototype.toString=function(){var a={};Ld(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function De(a,b,c){this.type=Dd;this.source=Ee;this.path=a;this.Pb=b;this.Id=c}De.prototype.Nc=function(a){if(this.path.e()){if(null!=this.Pb.value)return E(this.Pb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Pb.subtree(new M(a));return new De(C,a,this.Id)}E(J(this.path)===a,"operationForChild called for unrelated child.");return new De(D(this.path),this.Pb,this.Id)};
	De.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Pb+")"};var bc=0,nd=1,Dd=2,$b=3;function Fe(a,b,c,d){this.ee=a;this.We=b;this.Ib=c;this.Ee=d;E(!d||b,"Tagged queries must be from server.")}var Ee=new Fe(!0,!1,null,!1),Ge=new Fe(!1,!0,null,!1);Fe.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Ib+")":"server"};function He(){oe.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Nb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Nb&&(c.Nb=b,c.Ge("visible",b))},!1)}}ka(He,oe);He.prototype.Ye=function(a){E("visible"===a,"Unknown event type: "+a);return[this.Nb]};ba(He);function Ie(){this.set={}}g=Ie.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return Hb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return ua(this.set)};g.count=function(){return na(this.set)};function Je(a,b){t(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];t(this.set,function(b,c){a.push(c)});return a};function Ke(a,b){return a&&"object"===typeof a?(E(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Le(a,b){var c=new Me;Ne(a,new M(""),function(a,e){Oe(c,a,Pe(e,b))});return c}function Pe(a,b){var c=a.C().H(),c=Ke(c,b),d;if(a.J()){var e=Ke(a.Ea(),b);return e!==a.Ea()||c!==a.C().H()?new Qe(e,S(c)):a}d=a;c!==a.C().H()&&(d=d.ga(new Qe(c)));a.P(N,function(a,c){var e=Pe(c,b);e!==c&&(d=d.U(a,e))});return d};function Re(){oe.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!Pb()){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.Ge("online",!1))},!1)}}ka(Re,oe);Re.prototype.Ye=function(a){E("online"===a,"Unknown event type: "+a);return[this.ic]};ba(Re);function Se(){}var Te={};function Ue(a){return r(a.compare,a)}Se.prototype.nd=function(a,b){return 0!==this.compare(new O("[MIN_NAME]",a),new O("[MIN_NAME]",b))};Se.prototype.Ic=function(){return Ve};function We(a){E(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ka(We,Se);g=We.prototype;g.yc=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.tc(d);return 0===c?ad(a.name,b.name):c};
	g.Fc=function(a,b){var c=S(a),c=F.F(this.cc,c);return new O(b,c)};g.Gc=function(){var a=F.F(this.cc,Xe);return new O("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function Ye(){}ka(Ye,Se);g=Ye.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.tc(d);return 0===c?ad(a.name,b.name):c};g.yc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().$(b.C())};g.Ic=function(){return Ve};g.Gc=function(){return new O("[MAX_NAME]",new Qe("[PRIORITY-POST]",Xe))};
	g.Fc=function(a,b){var c=S(a);return new O(b,new Qe("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new Ye;function Ze(){}ka(Ze,Se);g=Ze.prototype;g.compare=function(a,b){return ad(a.name,b.name)};g.yc=function(){throw Pc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Ic=function(){return Ve};g.Gc=function(){return new O("[MAX_NAME]",F)};g.Fc=function(a){E(q(a),"KeyIndex indexValue must always be a string.");return new O(a,F)};g.toString=function(){return".key"};
	var Od=new Ze;function $e(){}ka($e,Se);g=$e.prototype;g.compare=function(a,b){var c=a.S.tc(b.S);return 0===c?ad(a.name,b.name):c};g.yc=function(){return!0};g.nd=function(a,b){return!a.$(b)};g.Ic=function(){return Ve};g.Gc=function(){return af};g.Fc=function(a,b){var c=S(a);return new O(b,c)};g.toString=function(){return".value"};var bf=new $e;function cf(a,b){return ad(a.name,b.name)}function df(a,b){return ad(a,b)};function ef(a,b){this.od=a;this.dc=b}ef.prototype.get=function(a){var b=A(this.od,a);if(!b)throw Error("No index defined for "+a);return b===Te?null:b};function ff(a,b,c){var d=la(a.od,function(d,f){var h=A(a.dc,f);E(h,"Missing index implementation for "+f);if(d===Te){if(h.yc(b.S)){for(var k=[],m=c.Xb(gf),l=K(m);l;)l.name!=b.name&&k.push(l),l=K(m);k.push(b);return hf(k,Ue(h))}return Te}h=c.get(b.name);k=d;h&&(k=k.remove(new O(b.name,h)));return k.Ra(b,b.S)});return new ef(d,a.dc)}
	function jf(a,b,c){var d=la(a.od,function(a){if(a===Te)return a;var d=c.get(b.name);return d?a.remove(new O(b.name,d)):a});return new ef(d,a.dc)}var kf=new ef({".priority":Te},{".priority":N});function O(a,b){this.name=a;this.S=b}function gf(a,b){return new O(a,b)};function lf(a){this.ta=new qd(a);this.g=a.g;E(a.ya,"Only valid if limit has been set");this.pa=a.pa;this.Jb=!mf(a)}g=lf.prototype;g.F=function(a,b,c,d,e,f){this.ta.matches(new O(b,c))||(c=F);return a.R(b).$(c)?a:a.Fb()<this.pa?this.ta.Vb().F(a,b,c,d,e,f):nf(this,a,b,c,e,f)};
	g.za=function(a,b,c){var d;if(b.J()||b.e())d=F.ob(this.g);else if(2*this.pa<b.Fb()&&b.zc(this.g)){d=F.ob(this.g);b=this.Jb?b.$b(this.ta.wc,this.g):b.Yb(this.ta.Uc,this.g);for(var e=0;0<b.Sa.length&&e<this.pa;){var f=K(b),h;if(h=this.Jb?0>=this.g.compare(this.ta.Uc,f):0>=this.g.compare(f,this.ta.wc))d=d.U(f.name,f.S),e++;else break}}else{d=b.ob(this.g);d=d.ga(F);var k,m,l;if(this.Jb){b=d.$e(this.g);k=this.ta.wc;m=this.ta.Uc;var u=Ue(this.g);l=function(a,b){return u(b,a)}}else b=d.Xb(this.g),k=this.ta.Uc,
	m=this.ta.wc,l=Ue(this.g);for(var e=0,z=!1;0<b.Sa.length;)f=K(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.pa&&0>=l(f,m))?e++:d=d.U(f.name,F)}return this.ta.Vb().za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.ta.Vb()};
	function nf(a,b,c,d,e,f){var h;if(a.Jb){var k=Ue(a.g);h=function(a,b){return k(b,a)}}else h=Ue(a.g);E(b.Fb()==a.pa,"");var m=new O(c,d),l=a.Jb?of(b,a.g):pf(b,a.g),u=a.ta.matches(m);if(b.Fa(c)){for(var z=b.R(c),l=e.fe(a.g,l,a.Jb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.fe(a.g,l,a.Jb);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&pd(f,new H("child_changed",d,c,z)),b.U(c,d);null!=f&&pd(f,new H("child_removed",z,c));b=b.U(c,F);return null!=l&&a.ta.matches(l)?(null!=f&&pd(f,new H("child_added",
	l.S,l.name)),b.U(l.name,l.S)):b}return d.e()?b:u&&0<=h(l,m)?(null!=f&&(pd(f,new H("child_removed",l.S,l.name)),pd(f,new H("child_added",d,c))),b.U(c,d).U(l.name,F)):b};function qf(a){this.W=a;this.g=a.n.g}function rf(a,b,c,d){var e=[],f=[];Ga(b,function(b){"child_changed"===b.type&&a.g.nd(b.qe,b.Ma)&&f.push(new H("child_moved",b.Ma,b.Za))});sf(a,e,"child_removed",b,d,c);sf(a,e,"child_added",b,d,c);sf(a,e,"child_moved",f,d,c);sf(a,e,"child_changed",b,d,c);sf(a,e,hc,b,d,c);return e}function sf(a,b,c,d,e,f){d=Ha(d,function(a){return a.type===c});Pa(d,r(a.Of,a));Ga(d,function(c){var d=tf(a,c,f);Ga(e,function(e){e.tf(c.type)&&b.push(e.createEvent(d,a.W))})})}
	function tf(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ze(b.Za,b.Ma,a.g));return b}qf.prototype.Of=function(a,b){if(null==a.Za||null==b.Za)throw Pc("Should only compare child_ events.");return this.g.compare(new O(a.Za,a.Ma),new O(b.Za,b.Ma))};function uf(){this.Sb=this.oa=this.Lb=this.la=this.ya=!1;this.pa=0;this.oc="";this.ec=null;this.Ab="";this.bc=null;this.yb="";this.g=N}var vf=new uf;function mf(a){return""===a.oc?a.la:"l"===a.oc}function sd(a){E(a.la,"Only valid if start has been set");return a.ec}function rd(a){E(a.la,"Only valid if start has been set");return a.Lb?a.Ab:"[MIN_NAME]"}function ud(a){E(a.oa,"Only valid if end has been set");return a.bc}
	function td(a){E(a.oa,"Only valid if end has been set");return a.Sb?a.yb:"[MAX_NAME]"}function wf(a){var b=new uf;b.ya=a.ya;b.pa=a.pa;b.la=a.la;b.ec=a.ec;b.Lb=a.Lb;b.Ab=a.Ab;b.oa=a.oa;b.bc=a.bc;b.Sb=a.Sb;b.yb=a.yb;b.g=a.g;return b}g=uf.prototype;g.ne=function(a){var b=wf(this);b.ya=!0;b.pa=a;b.oc="l";return b};g.oe=function(a){var b=wf(this);b.ya=!0;b.pa=a;b.oc="r";return b};g.Nd=function(a,b){var c=wf(this);c.la=!0;p(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.Ab=b):(c.Lb=!1,c.Ab="");return c};
	g.fd=function(a,b){var c=wf(this);c.oa=!0;p(a)||(a=null);c.bc=a;p(b)?(c.Sb=!0,c.yb=b):(c.Hg=!1,c.yb="");return c};function xf(a,b){var c=wf(a);c.g=b;return c}function yf(a){var b={};a.la&&(b.sp=a.ec,a.Lb&&(b.sn=a.Ab));a.oa&&(b.ep=a.bc,a.Sb&&(b.en=a.yb));if(a.ya){b.l=a.pa;var c=a.oc;""===c&&(c=mf(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function T(a){return!(a.la||a.oa||a.ya)}function zf(a){return T(a)&&a.g==N}
	function Af(a){var b={};if(zf(a))return b;var c;a.g===N?c="$priority":a.g===bf?c="$value":a.g===Od?c="$key":(E(a.g instanceof We,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.la&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.Ab)));a.oa&&(b.endAt=B(a.bc),a.Sb&&(b.endAt+=","+B(a.yb)));a.ya&&(mf(a)?b.limitToFirst=a.pa:b.limitToLast=a.pa);return b}g.toString=function(){return B(yf(this))};function Qe(a,b){this.B=a;E(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ba=b||F;Bf(this.ba);this.Eb=null}var Cf=["object","boolean","number","string"];g=Qe.prototype;g.J=function(){return!0};g.C=function(){return this.ba};g.ga=function(a){return new Qe(this.B,a)};g.R=function(a){return".priority"===a?this.ba:F};g.Q=function(a){return a.e()?this:".priority"===J(a)?this.ba:F};g.Fa=function(){return!1};g.Ze=function(){return null};
	g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:F.U(a,b).ga(this.ba)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;E(".priority"!==c||1===Jd(a),".priority must be the last token in a path");return this.U(c,F.F(D(a),b))};g.e=function(){return!1};g.Fb=function(){return 0};g.P=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().H()}:this.Ea()};
	g.hash=function(){if(null===this.Eb){var a="";this.ba.e()||(a+="priority:"+Df(this.ba.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+gd(this.B):a+this.B;this.Eb=Rc(a)}return this.Eb};g.Ea=function(){return this.B};g.tc=function(a){if(a===F)return 1;if(a instanceof P)return-1;E(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Fa(Cf,b),e=Fa(Cf,c);E(0<=d,"Unknown leaf type: "+b);E(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.ob=function(){return this};g.zc=function(){return!0};g.$=function(a){return a===this?!0:a.J()?this.B===a.B&&this.ba.$(a.ba):!1};g.toString=function(){return B(this.H(!0))};function P(a,b,c){this.k=a;(this.ba=b)&&Bf(this.ba);a.e()&&E(!this.ba||this.ba.e(),"An empty node cannot have a priority");this.zb=c;this.Eb=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.ba||F};g.ga=function(a){return this.k.e()?this:new P(this.k,a,this.zb)};g.R=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?F:a};g.Q=function(a){var b=J(a);return null===b?this:this.R(b).Q(D(a))};g.Fa=function(a){return null!==this.k.get(a)};
	g.U=function(a,b){E(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new O(a,b),d,e;b.e()?(d=this.k.remove(a),c=jf(this.zb,c,this.k)):(d=this.k.Ra(a,b),c=ff(this.zb,c,this.k));e=d.e()?F:this.ba;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;E(".priority"!==J(a)||1===Jd(a),".priority must be the last token in a path");var d=this.R(c).F(D(a),b);return this.U(c,d)};g.e=function(){return this.k.e()};g.Fb=function(){return this.k.count()};
	var Ef=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.H(a);c++;e&&Ef.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Eb){var a="";this.C().e()||(a+="priority:"+Df(this.C().H())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":Rc(a)}return this.Eb};
	g.Ze=function(a,b,c){return(c=Ff(this,c))?(a=Cc(c,new O(a,b)))?a.name:null:Cc(this.k,a)};function of(a,b){var c;c=(c=Ff(a,b))?(c=c.Hc())&&c.name:a.k.Hc();return c?new O(c,a.k.get(c)):null}function pf(a,b){var c;c=(c=Ff(a,b))?(c=c.fc())&&c.name:a.k.fc();return c?new O(c,a.k.get(c)):null}g.P=function(a,b){var c=Ff(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.k.ia(b)};g.Xb=function(a){return this.Yb(a.Ic(),a)};
	g.Yb=function(a,b){var c=Ff(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.k.Yb(a.name,gf),d=Ec(c);null!=d&&0>b.compare(d,a);)K(c),d=Ec(c);return c};g.$e=function(a){return this.$b(a.Gc(),a)};g.$b=function(a,b){var c=Ff(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.k.$b(a.name,gf),d=Ec(c);null!=d&&0<b.compare(d,a);)K(c),d=Ec(c);return c};g.tc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===Xe?-1:0};
	g.ob=function(a){if(a===Od||ra(this.zb.dc,a.toString()))return this;var b=this.zb,c=this.k;E(a!==Od,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(gf),f=K(c);f;)e=e||a.yc(f.S),d.push(f),f=K(c);d=e?hf(d,Ue(a)):Te;e=a.toString();c=va(b.dc);c[e]=a;a=va(b.od);a[e]=d;return new P(this.k,this.ba,new ef(a,c))};g.zc=function(a){return a===Od||ra(this.zb.dc,a.toString())};
	g.$=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().$(a.C())&&this.k.count()===a.k.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=K(b),d=K(a);c&&d;){if(c.name!==d.name||!c.S.$(d.S))return!1;c=K(b);d=K(a)}return null===c&&null===d}return!1};function Ff(a,b){return b===Od?null:a.zb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function S(a,b){if(null===a)return F;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);E(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Qe(a,S(c));if(a instanceof Array){var d=F,e=a;t(e,function(a,b){if(Hb(e,b)&&"."!==b.substring(0,1)){var c=S(a);if(c.J()||!c.e())d=
	d.U(b,c)}});return d.ga(S(c))}var f=[],h=!1,k=a;Ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=S(k[a]);b.e()||(h=h||!b.C().e(),f.push(new O(a,b)))}});if(0==f.length)return F;var m=hf(f,cf,function(a){return a.name},df);if(h){var l=hf(f,Ue(N));return new P(m,S(c),new ef({".priority":l},{".priority":N}))}return new P(m,S(c),kf)}var Gf=Math.log(2);
	function Hf(a){this.count=parseInt(Math.log(a+1)/Gf,10);this.Re=this.count-1;this.Lf=a+1&parseInt(Array(this.count+1).join("1"),2)}function If(a){var b=!(a.Lf&1<<a.Re);a.Re--;return b}
	function hf(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new Fc(u,l.S,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new Fc(u,l.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],G=c?c(k):k,z=new Fc(G,k.S,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var G=If(b),Cd=Math.pow(2,b.count-(z+1));G?d(Cd,!1):(d(Cd,!1),d(Cd,!0))}return l}(new Hf(a.length));
	return null!==f?new Ac(d||b,f):new Ac(d||b)}function Df(a){return"number"===typeof a?"number:"+gd(a):"string:"+a}function Bf(a){if(a.J()){var b=a.H();E("string"===typeof b||"number"===typeof b||"object"===typeof b&&Hb(b,".sv"),"Priority must be a string or number.")}else E(a===Xe||a.e(),"priority of unexpected type.");E(a===Xe||a.C().e(),"Priority nodes can't have a priority of their own.")}var F=new P(new Ac(df),null,kf);function Jf(){P.call(this,new Ac(df),F,kf)}ka(Jf,P);g=Jf.prototype;
	g.tc=function(a){return a===this?0:1};g.$=function(a){return a===this};g.C=function(){return this};g.R=function(){return F};g.e=function(){return!1};var Xe=new Jf,Ve=new O("[MIN_NAME]",F),af=new O("[MAX_NAME]",Xe);function Hd(a,b){this.O=a;this.Ld=b}function Ed(a,b,c,d){return new Hd(new oc(b,c,d),a.Ld)}function Id(a){return a.O.ea?a.O.j():null}Hd.prototype.w=function(){return this.Ld};function pc(a){return a.Ld.ea?a.Ld.j():null};function Kf(a,b){this.W=a;var c=a.n,d=new od(c.g),c=T(c)?new od(c.g):c.ya?new lf(c):new qd(c);this.of=new xd(c);var e=b.w(),f=b.O,h=d.za(F,e.j(),null),k=c.za(F,f.j(),null);this.Na=new Hd(new oc(k,f.ea,c.Qa()),new oc(h,e.ea,d.Qa()));this.ab=[];this.Sf=new qf(a)}function Lf(a){return a.W}g=Kf.prototype;g.w=function(){return this.Na.w().j()};g.jb=function(a){var b=pc(this.Na);return b&&(T(this.W.n)||!a.e()&&!b.R(J(a)).e())?b.Q(a):null};g.e=function(){return 0===this.ab.length};g.Ob=function(a){this.ab.push(a)};
	g.mb=function(a,b){var c=[];if(b){E(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Ga(this.ab,function(a){(a=a.Pe(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.ab.length;++f){var h=this.ab[f];if(!h.matches(a))e.push(h);else if(a.af()){e=e.concat(this.ab.slice(f+1));break}}this.ab=e}else this.ab=[];return c};
	g.gb=function(a,b,c){a.type===nd&&null!==a.source.Ib&&(E(pc(this.Na),"We should always have a full cache before handling merges"),E(Id(this.Na),"Missing event cache, even though we have a server cache"));var d=this.Na;a=this.of.gb(d,a,b,c);b=this.of;c=a.Sd;E(c.O.j().zc(b.V.g),"Event snap not indexed");E(c.w().j().zc(b.V.g),"Server snap not indexed");E(xc(a.Sd.w())||!xc(d.w()),"Once a server snap is complete, it should never go back");this.Na=a.Sd;return Mf(this,a.Mf,a.Sd.O.j(),null)};
	function Nf(a,b){var c=a.Na.O,d=[];c.j().J()||c.j().P(N,function(a,b){d.push(new H("child_added",b,a))});c.ea&&d.push(gc(c.j()));return Mf(a,d,c.j(),b)}function Mf(a,b,c,d){return rf(a.Sf,b,c,d?[d]:a.ab)};function Of(a,b,c){this.f=Vc("p:rest:");this.M=a;this.Hb=b;this.Vd=c;this.aa={}}function Pf(a,b){if(p(b))return"tag$"+b;E(zf(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=Of.prototype;
	g.df=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ka());var f=Pf(a,c),h={};this.aa[f]=h;a=Af(a.n);var k=this;Qf(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Hb(e,u,!1,c);A(k.aa,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Ef=function(a,b){var c=Pf(a,b);delete this.aa[c]};g.qf=function(){};g.re=function(){};g.gf=function(){};g.xd=function(){};g.put=function(){};g.ef=function(){};g.ye=function(){};
	function Qf(a,b,c,d){c=c||{};c.format="export";a.Vd.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.M.Sc?"https://":"http://")+a.M.host+b+"?"+Jb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=Kb(h.responseText)}catch(c){L("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&L("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Rf(a){this.He=a}Rf.prototype.getToken=function(a){return this.He.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(I("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Sf(a,b){a.He.INTERNAL.addAuthTokenListener(b)};function Tf(a){this.Nf=a;this.rd=null}Tf.prototype.get=function(){var a=this.Nf.get(),b=va(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};function Uf(){this.uc={}}function Vf(a,b,c){p(c)||(c=1);Hb(a.uc,b)||(a.uc[b]=0);a.uc[b]+=c}Uf.prototype.get=function(){return va(this.uc)};function Wf(a,b){this.zf={};this.Vc=new Tf(a);this.wa=b;var c=1E4+2E4*Math.random();setTimeout(r(this.rf,this),Math.floor(c))}Wf.prototype.rf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&Hb(this.zf,d)&&(b[d]=a[d],c=!0);c&&this.wa.ye(b);setTimeout(r(this.rf,this),Math.floor(6E5*Math.random()))};var Xf={},Yf={};function Zf(a){a=a.toString();Xf[a]||(Xf[a]=new Uf);return Xf[a]}function $f(a,b){var c=a.toString();Yf[c]||(Yf[c]=b());return Yf[c]};var ag=null;"undefined"!==typeof MozWebSocket?ag=MozWebSocket:"undefined"!==typeof WebSocket&&(ag=WebSocket);function bg(a,b,c,d){this.Zd=a;this.f=Vc(this.Zd);this.frames=this.Ac=null;this.qb=this.rb=this.Fe=0;this.Xa=Zf(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ne=ec(b,"websocket",a)}var cg;
	bg.prototype.open=function(a,b){this.kb=b;this.hg=a;this.f("Websocket connecting to "+this.Ne);this.xc=!1;Xb.set("previous_websocket_failure",!0);try{this.La=new ag(this.Ne)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.fb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.xc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.fb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.qb+=
	a.length,Vf(e.Xa,"bytes_received",a.length),dg(e),null!==e.frames)eg(e,a);else{a:{E(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&eg(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.fb()}};bg.prototype.start=function(){};
	bg.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==ag&&!cg};bg.responsesRequiredToBeHealthy=2;bg.healthyTimeout=3E4;g=bg.prototype;g.sd=function(){Xb.remove("previous_websocket_failure")};function eg(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=Kb(c);a.hg(c)}}
	g.send=function(a){dg(this);a=B(a);this.rb+=a.length;Vf(this.Xa,"bytes_sent",a.length);a=ed(a,16384);1<a.length&&fg(this,String(a.length));for(var b=0;b<a.length;b++)fg(this,a[b])};g.Tc=function(){this.Bb=!0;this.Ac&&(clearInterval(this.Ac),this.Ac=null);this.La&&(this.La.close(),this.La=null)};g.fb=function(){this.Bb||(this.f("WebSocket is closing itself"),this.Tc(),this.kb&&(this.kb(this.xc),this.kb=null))};g.close=function(){this.Bb||(this.f("WebSocket is being closed"),this.Tc())};
	function dg(a){clearInterval(a.Ac);a.Ac=setInterval(function(){a.La&&fg(a,"0");dg(a)},Math.floor(45E3))}function fg(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(r(a.fb,a),0)}};function gg(a,b,c,d){this.Zd=a;this.f=Vc(a);this.kc=b;this.qb=this.rb=0;this.Xa=Zf(b);this.Bf=c;this.xc=!1;this.Db=d;this.Yc=function(a){return ec(b,"long_polling",a)}}var hg,ig;
	gg.prototype.open=function(a,b){this.Qe=0;this.ja=b;this.ff=new Qb(a);this.Bb=!1;var c=this;this.tb=setTimeout(function(){c.f("Timed out trying to connect.");c.fb();c.tb=null},Math.floor(3E4));$c(function(){if(!c.Bb){c.Wa=new jg(function(a,b,d,k,m){kg(c,arguments);if(c.Wa)if(c.tb&&(clearTimeout(c.tb),c.tb=null),c.xc=!0,"start"==a)c.id=b,c.mf=d;else if("close"===a)b?(c.Wa.Kd=!1,Rb(c.ff,b,function(){c.fb()})):c.fb();else throw Error("Unrecognized command received: "+a);},function(a,b){kg(c,arguments);
	Sb(c.ff,a,b)},function(){c.fb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.Qd&&(a.cb=c.Wa.Qd);a.v="5";c.Bf&&(a.s=c.Bf);c.Db&&(a.ls=c.Db);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);lg(c.Wa,a,function(){})}})};
	gg.prototype.start=function(){var a=this.Wa,b=this.mf;a.fg=this.id;a.gg=b;for(a.Ud=!0;mg(a););a=this.id;b=this.mf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.Yc(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
	gg.isAvailable=function(){return hg||!ig&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Dg)&&!0};g=gg.prototype;g.sd=function(){};g.Tc=function(){this.Bb=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.tb&&(clearTimeout(this.tb),this.tb=null)};
	g.fb=function(){this.Bb||(this.f("Longpoll is closing itself"),this.Tc(),this.ja&&(this.ja(this.xc),this.ja=null))};g.close=function(){this.Bb||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.rb+=a.length;Vf(this.Xa,"bytes_sent",a.length);a=Nb(a);a=wb(a,!0);a=ed(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.Qc.push({ug:this.Qe,Bg:a.length,Se:a[b]});c.Ud&&mg(c);this.Qe++}};function kg(a,b){var c=B(b).length;a.qb+=c;Vf(a.Xa,"bytes_received",c)}
	function jg(a,b,c,d){this.Yc=d;this.kb=c;this.ve=new Ie;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Oc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||I("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.ib=a.contentDocument:a.contentWindow?a.ib=a.contentWindow.document:a.document&&(a.ib=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.ib.open(),this.Ga.ib.write(a),this.Ga.ib.close()}catch(f){I("frame writing exception"),f.stack&&I(f.stack),I(f)}}
	jg.prototype.close=function(){this.Ud=!1;if(this.Ga){this.Ga.ib.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.kb;b&&(this.kb=null,b())};
	function mg(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.fg;b.pw=a.gg;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Se.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.ug+"&ts"+d+"="+e.Bg+"&d"+d+"="+e.Se;d++}else break;ng(a,b+c,a.$d);return!0}return!1}function ng(a,b,c){function d(){a.ve.remove(c);mg(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));lg(a,b,function(){clearTimeout(e);d()})}
	function lg(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ga.ib.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){I("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ga.ib.body.appendChild(d)}}catch(e){}},Math.floor(1))};function og(a){pg(this,a)}var qg=[gg,bg];function pg(a,b){var c=bg&&bg.isAvailable(),d=c&&!(Xb.cf||!0===Xb.get("previous_websocket_failure"));b.Cg&&(c||L("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[bg];else{var e=a.Wc=[];fd(qg,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function rg(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function sg(a,b,c,d,e,f,h){this.id=a;this.f=Vc("c:"+this.id+":");this.te=c;this.Mc=d;this.ja=e;this.se=f;this.M=b;this.Ad=[];this.Oe=0;this.Af=new og(b);this.L=0;this.Db=h;this.f("Connection created");tg(this)}
	function tg(a){var b=rg(a.Af);a.I=new b("c:"+a.id+":"+a.Oe++,a.M,void 0,a.Db);a.xe=b.responsesRequiredToBeHealthy||0;var c=ug(a,a.I),d=vg(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Cb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=setTimeout(function(){a.md=null;a.Cb||(a.I&&102400<a.I.qb?(a.f("Connection exceeded healthy timeout but has received "+a.I.qb+" bytes.  Marking connection healthy."),a.Cb=!0,a.I.sd()):a.I&&10240<a.I.rb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.rb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function vg(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.L?1===a.L&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.M.bb.substr(0,2)&&(Xb.remove("host:"+a.M.host),a.M.bb=a.M.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function ug(a,b){return function(c){if(2!=a.L)if(b===a.Rc){var d=cd("t",c);c=cd("d",c);if("c"==d){if(d=cd("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.yf=c.s;dc(a.M,f);0==a.L&&(a.I.start(),wg(a,a.I,d),"5"!==e&&L("Protocol version mismatch detected"),c=a.Af,(c=1<c.Wc.length?c.Wc[1]:null)&&xg(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];yg(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.se&&(a.se(c),a.se=null),a.ja=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),dc(a.M,c),1===a.L?a.close():(zg(a),tg(a))):"e"===d?Wc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Ag(a),Bg(a)):Wc("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=cd("t",c),c=cd("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Cg(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.xf--,Cg(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}sg.prototype.va=function(a){Dg(this,{t:"d",d:a})};function yg(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
	function Cg(a){0>=a.xf?(a.f("Secondary connection is healthy."),a.Cb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,yg(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}sg.prototype.wd=function(a){Ag(this);this.te(a)};function Ag(a){a.Cb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Cb=!0,a.I.sd()))}
	function xg(a,b){a.D=new b("c:"+a.id+":"+a.Oe++,a.M,a.yf);a.xf=b.responsesRequiredToBeHealthy||0;a.D.open(ug(a,a.D),vg(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function wg(a,b,c){a.f("Realtime connection established.");a.I=b;a.L=1;a.Mc&&(a.Mc(c,a.yf),a.Mc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Cb=!0):setTimeout(function(){Bg(a)},Math.floor(5E3))}
	function Bg(a){a.Cb||1!==a.L||(a.f("sending ping on primary."),Dg(a,{t:"c",d:{t:"p",d:{}}}))}function Dg(a,b){if(1!==a.L)throw"Connection is not connected";a.Xc.send(b)}sg.prototype.close=function(){2!==this.L&&(this.f("Closing realtime connection."),this.L=2,zg(this),this.ja&&(this.ja(),this.ja=null))};function zg(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function Eg(a,b,c,d,e,f){this.id=Fg++;this.f=Vc("p:"+this.id+":");this.qd={};this.aa={};this.qa=[];this.Pc=0;this.Lc=[];this.na=!1;this.Va=1E3;this.td=3E5;this.Hb=b;this.Kc=c;this.ue=d;this.M=a;this.pb=this.Ia=this.Db=this.ze=null;this.Vd=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Je=f||null;this.vb=null;this.Nb=!1;this.Gd={};this.tg=0;this.Ve=!0;this.Bc=this.me=null;Gg(this,0);He.Wb().hc("visible",this.jg,this);-1===
	a.host.indexOf("fblocal")&&Re.Wb().hc("online",this.ig,this)}var Fg=0,Hg=0;g=Eg.prototype;g.va=function(a,b,c){var d=++this.tg;a={r:d,a:a,b:b};this.f(B(a));E(this.na,"sendRequest call when we're not connected not allowed.");this.Ia.va(a);c&&(this.Gd[d]=c)};
	g.df=function(a,b,c,d){var e=a.ka(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.aa[f]=this.aa[f]||{};E(zf(a.n)||!T(a.n),"listen() called for non-default but complete query");E(!this.aa[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,pg:a,tag:c};this.aa[f][e]=a;this.na&&Ig(this,a)};
	function Ig(a,b){var c=b.pg,d=c.path.toString(),e=c.ka();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=yf(c.n),f.t=b.tag);f.h=b.ld();a.va("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&Hb(k,"w")){var l=A(k,"w");da(l)&&0<=Fa(l,"no_index")&&L("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.aa[d]&&a.aa[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Jg(a,d,e),b.G&&
	b.G(m,k))})}g.qf=function(a){this.pb=a;this.f("Auth token refreshed");this.pb?Kg(this):this.na&&this.va("unauth",{},function(){});if(a&&40===a.length||ld(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Kg(a){if(a.na&&a.pb){var b=a.pb,c=kd(b)?"auth":"gauth",d={cred:b};a.Je&&(d.authvar=a.Je);a.va(c,d,function(c){var d=c.s;c=c.d||"error";a.pb===b&&("ok"===d?this.ke=0:Lg(a,d,c))})}}
	g.Ef=function(a,b){var c=a.path.toString(),d=a.ka();this.f("Unlisten called for "+c+" "+d);E(zf(a.n)||!T(a.n),"unlisten() called for non-default but complete query");if(Jg(this,c,d)&&this.na){var e=yf(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.va("n",c)}};g.re=function(a,b,c){this.na?Mg(this,"o",a,b,c):this.Lc.push({we:a,action:"o",data:b,G:c})};g.gf=function(a,b,c){this.na?Mg(this,"om",a,b,c):this.Lc.push({we:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.na?Mg(this,"oc",a,null,b):this.Lc.push({we:a,action:"oc",data:null,G:b})};function Mg(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.va(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Ng(this,"p",a,b,c,d)};g.ef=function(a,b,c,d){Ng(this,"m",a,b,c,d)};function Ng(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.qa.push({action:b,sf:d,G:e});a.Pc++;b=a.qa.length-1;a.na?Og(a,b):a.f("Buffering put: "+c)}
	function Og(a,b){var c=a.qa[b].action,d=a.qa[b].sf,e=a.qa[b].G;a.qa[b].qg=a.na;a.va(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Pc--;0===a.Pc&&(a.qa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.na&&(a={c:a},this.f("reportStats",a),this.va("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Hb(a.p,a.d,!1,a.t):"m"===b?this.Hb(a.p,a.d,!0,a.t):"c"===b?Pg(this,a.p,a.q):"ac"===b?Lg(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Wc("Unrecognized action received from server: "+
	B(b)+"\nAre you using the latest client?"))}};g.Mc=function(a,b){this.f("connection ready");this.na=!0;this.Bc=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Db=b;if(this.Ve){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;Pb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Qg(this);this.Ve=!1;this.Kc(!0)};
	function Gg(a,b){E(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.vb&&clearTimeout(a.vb);a.vb=setTimeout(function(){a.vb=null;Rg(a)},Math.floor(b))}g.jg=function(a){a&&!this.Nb&&this.Va===this.td&&(this.f("Window became visible.  Reducing delay."),this.Va=1E3,this.Ia||Gg(this,0));this.Nb=a};g.ig=function(a){a?(this.f("Browser went online."),this.Va=1E3,this.Ia||Gg(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
	g.jf=function(){this.f("data client disconnected");this.na=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.sf&&b.qg&&(b.G&&b.G("disconnect"),delete this.qa[a],this.Pc--)}0===this.Pc&&(this.qa=[]);this.Gd={};Sg(this)&&(this.Nb?this.Bc&&(3E4<(new Date).getTime()-this.Bc&&(this.Va=1E3),this.Bc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Va=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Va-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Gg(this,a),this.Va=Math.min(this.td,1.3*this.Va));this.Kc(!1)};
	function Rg(a){if(Sg(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Bc=null;var b=r(a.wd,a),c=r(a.Mc,a),d=r(a.jf,a),e=a.id+":"+Hg++,f=a.Db,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Ia={close:m,va:function(a){E(k,"sendRequest call when we're not connected not allowed.");k.va(a)}};var l=a.de;a.de=!1;a.Vd.getToken(l).then(function(l){h?I("getToken() completed but was canceled"):(I("getToken() completed. Creating connection."),a.pb=l&&l.accessToken,k=new sg(e,a.M,b,c,d,function(b){L(b+
	" ("+a.M.toString()+")");a.eb("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.eb=function(a){I("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Ia?this.Ia.close():(this.vb&&(clearTimeout(this.vb),this.vb=null),this.na&&this.jf())};g.lc=function(a){I("Resuming connection for reason: "+a);delete this.qd[a];ua(this.qd)&&(this.Va=1E3,this.Ia||Gg(this,0))};
	function Pg(a,b,c){c=c?Ia(c,function(a){return dd(a)}).join("$"):"default";(a=Jg(a,b,c))&&a.G&&a.G("permission_denied")}function Jg(a,b,c){b=(new M(b)).toString();var d;p(a.aa[b])?(d=a.aa[b][c],delete a.aa[b][c],0===na(a.aa[b])&&delete a.aa[b]):d=void 0;return d}
	function Lg(a,b,c){I("Auth token revoked: "+b+"/"+c);a.pb=null;a.de=!0;a.Ia.close();"invalid_token"===b&&(a.ke++,3<=a.ke&&(a.Va=3E4,L("Provided authentication credentials are invalid. This usually indicates your FirebaseApp instance was not initialized correctly. Make sure your apiKey and databaseURL match the values provided for your app at https://console.firebase.google.com/, or if you're using a service account, make sure it's authorized to access the specified databaseURL and is from the correct project.")))}
	function Qg(a){Kg(a);t(a.aa,function(b){t(b,function(b){Ig(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Og(a,b);for(;a.Lc.length;)b=a.Lc.shift(),Mg(a,b.action,b.we,b.data,b.G)}function Sg(a){var b;b=Re.Wb().ic;return ua(a.qd)&&b};function Tg(a){this.X=a}var Ug=new Tg(new qe(null));function Vg(a,b,c){if(b.e())return new Tg(new qe(c));var d=ue(a.X,b);if(null!=d){var e=d.path,d=d.value;b=R(e,b);d=d.F(b,c);return new Tg(a.X.set(e,d))}a=Nd(a.X,b,new qe(c));return new Tg(a)}function Wg(a,b,c){var d=a;Ib(c,function(a,c){d=Vg(d,b.m(a),c)});return d}Tg.prototype.Ed=function(a){if(a.e())return Ug;a=Nd(this.X,a,Q);return new Tg(a)};function Xg(a,b){var c=ue(a.X,b);return null!=c?a.X.get(c.path).Q(R(c.path,b)):null}
	function Yg(a){var b=[],c=a.X.value;null!=c?c.J()||c.P(N,function(a,c){b.push(new O(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new O(a,c.value))});return b}function Zg(a,b){if(b.e())return a;var c=Xg(a,b);return null!=c?new Tg(new qe(c)):new Tg(a.X.subtree(b))}Tg.prototype.e=function(){return this.X.e()};Tg.prototype.apply=function(a){return $g(C,this.X,a)};
	function $g(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(E(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=$g(a.m(b),f,c)});c.Q(a).e()||null===d||(c=c.F(a.m(".priority"),d));return c};function ah(){this.T=Ug;this.ma=[];this.Cc=-1}function bh(a,b){for(var c=0;c<a.ma.length;c++){var d=a.ma[c];if(d.Zc===b)return d}return null}g=ah.prototype;
	g.Ed=function(a){var b=Ma(this.ma,function(b){return b.Zc===a});E(0<=b,"removeWrite called with nonexistent writeId.");var c=this.ma[b];this.ma.splice(b,1);for(var d=c.visible,e=!1,f=this.ma.length-1;d&&0<=f;){var h=this.ma[f];h.visible&&(f>=b&&ch(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=dh(this.ma,eh,C),this.Cc=0<this.ma.length?this.ma[this.ma.length-1].Zc:-1;else if(c.Ja)this.T=this.T.Ed(c.path);else{var k=this;t(c.children,function(a,b){k.T=k.T.Ed(c.path.m(b))})}return!0}return!1};
	g.Ba=function(a,b,c,d){if(c||d){var e=Zg(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Xg(e,C)?(e=dh(this.ma,function(b){return(b.visible||d)&&(!c||!(0<=Fa(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||F,e.apply(b)):null}e=Xg(this.T,a);if(null!=e)return e;e=Zg(this.T,a);return e.e()?b:null!=b||null!=Xg(e,C)?(b=b||F,e.apply(b)):null};
	g.sc=function(a,b){var c=F,d=Xg(this.T,a);if(d)d.J()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=Zg(this.T,a);b.P(N,function(a,b){var d=Zg(e,new M(a)).apply(b);c=c.U(a,d)});Ga(Yg(e),function(a){c=c.U(a.name,a.S)})}else e=Zg(this.T,a),Ga(Yg(e),function(a){c=c.U(a.name,a.S)});return c};g.$c=function(a,b,c,d){E(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.m(b);if(null!=Xg(this.T,a))return null;a=Zg(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
	g.rc=function(a,b,c){a=a.m(b);var d=Xg(this.T,a);return null!=d?d:nc(c,b)?Zg(this.T,a).apply(c.j().R(b)):null};g.mc=function(a){return Xg(this.T,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Zg(this.T,a);h=Xg(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.ob(f);if(h.e()||h.J())return[];b=[];a=Ue(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=K(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=K(e);return b};
	function ch(a,b){return a.Ja?a.path.contains(b):!!sa(a.children,function(c,d){return a.path.m(d).contains(b)})}function eh(a){return a.visible}
	function dh(a,b,c){for(var d=Ug,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ja)c.contains(h)?(h=R(c,h),d=Vg(d,h,f.Ja)):h.contains(c)&&(h=R(h,c),d=Vg(d,C,f.Ja.Q(h)));else if(f.children)if(c.contains(h))h=R(c,h),d=Wg(d,h,f.children);else{if(h.contains(c))if(h=R(h,c),h.e())d=Wg(d,C,f.children);else if(f=A(f.children,J(h)))f=f.Q(D(h)),d=Vg(d,C,f)}else throw Pc("WriteRecord should have .snap or .children");}}return d}function fh(a,b){this.Mb=a;this.X=b}g=fh.prototype;
	g.Ba=function(a,b,c){return this.X.Ba(this.Mb,a,b,c)};g.sc=function(a){return this.X.sc(this.Mb,a)};g.$c=function(a,b,c){return this.X.$c(this.Mb,a,b,c)};g.mc=function(a){return this.X.mc(this.Mb.m(a))};g.Xd=function(a,b,c,d,e){return this.X.Xd(this.Mb,a,b,c,d,e)};g.rc=function(a,b){return this.X.rc(this.Mb,a,b)};g.m=function(a){return new fh(this.Mb.m(a),this.X)};function Me(){this.k=this.B=null}Me.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.k)return null;var b=J(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Oe(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Ie);var d=J(b);a.k.contains(d)||a.k.add(d,new Me);a=a.k.get(d);b=D(b);Oe(a,b,c)}}
	function gh(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){Oe(a,new M(b),c)});return gh(a,b)}return null!==a.k?(c=J(b),b=D(b),a.k.contains(c)&&gh(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Ne(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new M(b.toString()+"/"+a);Ne(e,f,c)})}Me.prototype.P=function(a){null!==this.k&&Je(this.k,function(b,c){a(b,c)})};function U(a,b){this.ua=a;this.ra=b}U.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);y("Firebase.onDisconnect().cancel",1,a,!0);var b=new Eb;this.ua.xd(this.ra,Fb(b,a));return b.sa};U.prototype.cancel=U.prototype.cancel;U.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);fe("Firebase.onDisconnect().remove",this.ra);y("Firebase.onDisconnect().remove",1,a,!0);var b=new Eb;hh(this.ua,this.ra,null,Fb(b,a));return b.sa};
	U.prototype.remove=U.prototype.remove;U.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);fe("Firebase.onDisconnect().set",this.ra);Yd("Firebase.onDisconnect().set",a,this.ra,!1);y("Firebase.onDisconnect().set",2,b,!0);var c=new Eb;hh(this.ua,this.ra,a,Fb(c,b));return c.sa};U.prototype.set=U.prototype.set;
	U.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);fe("Firebase.onDisconnect().setWithPriority",this.ra);Yd("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);be("Firebase.onDisconnect().setWithPriority",2,b);y("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new Eb;ih(this.ua,this.ra,a,b,Fb(d,c));return d.sa};U.prototype.setWithPriority=U.prototype.Kb;
	U.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);fe("Firebase.onDisconnect().update",this.ra);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ae("Firebase.onDisconnect().update",a,this.ra);y("Firebase.onDisconnect().update",2,b,!0);
	c=new Eb;jh(this.ua,this.ra,a,Fb(c,b));return c.sa};U.prototype.update=U.prototype.update;function V(a,b,c){this.A=a;this.W=b;this.g=c}V.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};V.prototype.val=V.prototype.H;V.prototype.Ue=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};V.prototype.exportVal=V.prototype.Ue;V.prototype.Vf=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};V.prototype.exists=V.prototype.Vf;
	V.prototype.m=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));ee("Firebase.DataSnapshot.child",a);var b=new M(a),c=this.W.m(b);return new V(this.A.Q(b),c,N)};V.prototype.child=V.prototype.m;V.prototype.Fa=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ee("Firebase.DataSnapshot.hasChild",a);var b=new M(a);return!this.A.Q(b).e()};V.prototype.hasChild=V.prototype.Fa;
	V.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};V.prototype.getPriority=V.prototype.C;V.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);y("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new V(d,b.W.m(c),N))})};V.prototype.forEach=V.prototype.forEach;
	V.prototype.kd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};V.prototype.hasChildren=V.prototype.kd;V.prototype.getKey=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.getKey()};id(V.prototype,"key",V.prototype.getKey);V.prototype.Fb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Fb()};V.prototype.numChildren=V.prototype.Fb;
	V.prototype.xb=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};id(V.prototype,"ref",V.prototype.xb);function kh(a,b,c){this.Qb=a;this.sb=b;this.ub=c||null}g=kh.prototype;g.tf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new ic("value",this,new V(a.Ma,b.xb(),c))};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){E(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.Qb;return function(){d.call(b,a.Md)}};g.Pe=function(a,b){return this.sb?new jc(this,a,b):null};
	g.matches=function(a){return a instanceof kh?a.Qb&&this.Qb?a.Qb===this.Qb&&a.ub===this.ub:!0:!1};g.af=function(){return null!==this.Qb};function lh(a,b,c){this.ha=a;this.sb=b;this.ub=c}g=lh.prototype;g.tf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.Pe=function(a,b){return this.sb?new jc(this,a,b):null};
	g.createEvent=function(a,b){E(null!=a.Za,"Child events should have a childName.");var c=b.xb().m(a.Za);return new ic(a.type,this,new V(a.Ma,c,b.n.g),a.Dd)};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){E(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.ha[a.gd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof lh){if(!this.ha||!a.ha)return!0;if(this.ub===a.ub){var b=na(a.ha);if(b===na(this.ha)){if(1===b){var b=oa(a.ha),c=oa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return ma(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.af=function(){return null!==this.ha};function mh(){this.Aa={}}g=mh.prototype;g.e=function(){return ua(this.Aa)};g.gb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=A(this.Aa,d),E(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];t(this.Aa,function(d){e=e.concat(d.gb(a,b,c))});return e};g.Ob=function(a,b,c,d,e){var f=a.ka(),h=A(this.Aa,f);if(!h){var h=c.Ba(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.sc(d):F,k=!1);h=new Kf(a,new Hd(new oc(h,k,!1),new oc(d,e,!1)));this.Aa[f]=h}h.Ob(b);return Nf(h,b)};
	g.mb=function(a,b,c){var d=a.ka(),e=[],f=[],h=null!=nh(this);if("default"===d){var k=this;t(this.Aa,function(a,d){f=f.concat(a.mb(b,c));a.e()&&(delete k.Aa[d],T(a.W.n)||e.push(a.W))})}else{var m=A(this.Aa,d);m&&(f=f.concat(m.mb(b,c)),m.e()&&(delete this.Aa[d],T(m.W.n)||e.push(m.W)))}h&&null==nh(this)&&e.push(new W(a.u,a.path));return{sg:e,Tf:f}};function oh(a){return Ha(pa(a.Aa),function(a){return!T(a.W.n)})}g.jb=function(a){var b=null;t(this.Aa,function(c){b=b||c.jb(a)});return b};
	function ph(a,b){if(T(b.n))return nh(a);var c=b.ka();return A(a.Aa,c)}function nh(a){return ta(a.Aa,function(a){return T(a.W.n)})||null};function qh(a){this.xa=Q;this.lb=new ah;this.De={};this.jc={};this.Dc=a}function rh(a,b,c,d,e){var f=a.lb,h=e;E(d>f.Cc,"Stacking an older write on top of newer ones");p(h)||(h=!0);f.ma.push({path:b,Ja:c,Zc:d,visible:h});h&&(f.T=Vg(f.T,b,c));f.Cc=d;return e?sh(a,new ac(Ee,b,c)):[]}function th(a,b,c,d){var e=a.lb;E(d>e.Cc,"Stacking an older merge on top of newer ones");e.ma.push({path:b,children:c,Zc:d,visible:!0});e.T=Wg(e.T,b,c);e.Cc=d;c=se(c);return sh(a,new md(Ee,b,c))}
	function uh(a,b,c){c=c||!1;var d=bh(a.lb,b);if(a.lb.Ed(b)){var e=Q;null!=d.Ja?e=e.set(C,!0):Ib(d.children,function(a,b){e=e.set(new M(a),b)});return sh(a,new De(d.path,e,c))}return[]}function vh(a,b,c){c=se(c);return sh(a,new md(Ge,b,c))}function wh(a,b,c,d){d=xh(a,d);if(null!=d){var e=yh(d);d=e.path;e=e.Ib;b=R(d,b);c=new ac(new Fe(!1,!0,e,!0),b,c);return zh(a,d,c)}return[]}
	function Ah(a,b,c,d){if(d=xh(a,d)){var e=yh(d);d=e.path;e=e.Ib;b=R(d,b);c=se(c);c=new md(new Fe(!1,!0,e,!0),b,c);return zh(a,d,c)}return[]}
	qh.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;ze(this.xa,c,function(a,b){var f=R(a,c);d=d||b.jb(f);e=e||null!=nh(b)});var f=this.xa.get(c);f?(e=e||null!=nh(f),d=d||f.jb(C)):(f=new mh,this.xa=this.xa.set(c,f));var h;null!=d?h=!0:(h=!1,d=F,Ce(this.xa.subtree(c),function(a,b){var c=b.jb(C);c&&(d=d.U(a,c))}));var k=null!=ph(f,a);if(!k&&!T(a.n)){var m=Bh(a);E(!(m in this.jc),"View does not exist, but we have a tag");var l=Ch++;this.jc[m]=l;this.De["_"+l]=m}h=f.Ob(a,b,new fh(c,this.lb),d,h);k||
	e||(f=ph(f,a),h=h.concat(Dh(this,a,f)));return h};
	qh.prototype.mb=function(a,b,c){var d=a.path,e=this.xa.get(d),f=[];if(e&&("default"===a.ka()||null!=ph(e,a))){f=e.mb(a,b,c);e.e()&&(this.xa=this.xa.remove(d));e=f.sg;f=f.Tf;b=-1!==Ma(e,function(a){return T(a.n)});var h=xe(this.xa,d,function(a,b){return null!=nh(b)});if(b&&!h&&(d=this.xa.subtree(d),!d.e()))for(var d=Eh(d),k=0;k<d.length;++k){var m=d[k],l=m.W,m=Fh(this,m);this.Dc.Ae(Gh(l),Hh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Dc.Od(Gh(a),null);else{var u=this;Ga(e,function(a){a.ka();
	var b=u.jc[Bh(a)];u.Dc.Od(Gh(a),b)})}Ih(this,e)}return f};qh.prototype.Ba=function(a,b){var c=this.lb,d=xe(this.xa,a,function(b,c){var d=R(b,a);if(d=c.jb(d))return d});return c.Ba(a,d,b,!0)};function Eh(a){return ve(a,function(a,c,d){if(c&&null!=nh(c))return[nh(c)];var e=[];c&&(e=oh(c));t(d,function(a){e=e.concat(a)});return e})}function Ih(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!T(d.n)){var d=Bh(d),e=a.jc[d];delete a.jc[d];delete a.De["_"+e]}}}
	function Gh(a){return T(a.n)&&!zf(a.n)?a.xb():a}function Dh(a,b,c){var d=b.path,e=Hh(a,b);c=Fh(a,c);b=a.Dc.Ae(Gh(b),e,c.ld,c.G);d=a.xa.subtree(d);if(e)E(null==nh(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=ve(d,function(a,b,c){if(!a.e()&&b&&null!=nh(b))return[Lf(nh(b))];var d=[];b&&(d=d.concat(Ia(oh(b),function(a){return a.W})));t(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Dc.Od(Gh(c),Hh(a,c));return b}
	function Fh(a,b){var c=b.W,d=Hh(a,c);return{ld:function(){return(b.w()||F).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=xh(a,d)){var h=yh(b);b=h.path;h=h.Ib;f=R(b,f);f=new Zb(new Fe(!1,!0,h,!0),f);b=zh(a,b,f)}else b=[]}else b=sh(a,new Zb(Ge,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.mb(c,null,f)}}}function Bh(a){return a.path.toString()+"$"+a.ka()}function yh(a){var b=a.indexOf("$");E(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new M(a.substr(0,b))}}function xh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function Hh(a,b){var c=Bh(b);return A(a.jc,c)}var Ch=1;
	function zh(a,b,c){var d=a.xa.get(b);E(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new fh(b,a.lb),null)}function sh(a,b){return Jh(a,b,a.xa,null,new fh(C,a.lb))}function Jh(a,b,c,d,e){if(b.path.e())return Kh(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[],k=J(b.path),m=b.Nc(k);if((c=c.children.get(k))&&m)var l=d?d.R(k):null,k=e.m(k),h=h.concat(Jh(a,m,c,l,k));f&&(h=h.concat(f.gb(b,e,d)));return h}
	function Kh(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[];c.children.ia(function(c,f){var l=d?d.R(c):null,u=e.m(c),z=b.Nc(c);z&&(h=h.concat(Kh(a,z,f,l,u)))});f&&(h=h.concat(f.gb(b,e,d)));return h};function X(a,b,c,d){this.u=a;this.path=b;this.n=c;this.Oc=d}
	function Lh(a){var b=null,c=null;a.la&&(b=sd(a));a.oa&&(c=ud(a));if(a.g===Od){if(a.la){if("[MIN_NAME]"!=rd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.oa){if("[MAX_NAME]"!=td(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!Xd(b)||null!=c&&!Xd(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(E(a.g instanceof We||a.g===bf,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function Mh(a){if(a.la&&a.oa&&a.ya&&(!a.ya||""===a.oc))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Nh(a,b){if(!0===a.Oc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.xb=function(){x("Query.ref",0,0,arguments.length);return new W(this.u,this.path)};
	g.hc=function(a,b,c,d){x("Query.on",2,4,arguments.length);ce("Query.on",a,!1);y("Query.on",2,b,!1);var e=Oh("Query.on",c,d);if("value"===a)Ph(this.u,this,new kh(b,e.cancel||null,e.Pa||null));else{var f={};f[a]=b;Ph(this.u,this,new lh(f,e.cancel,e.Pa))}return b};
	g.Jc=function(a,b,c){x("Query.off",0,3,arguments.length);ce("Query.off",a,!0);y("Query.off",2,b,!0);Cb("Query.off",3,c);var d=null,e=null;"value"===a?d=new kh(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new lh(e,null,c||null));e=this.u;d=".info"===J(this.path)?e.pd.mb(this,d):e.K.mb(this,d);tc(e.da,this.path,d)};
	g.kg=function(a,b){function c(k){f&&(f=!1,e.Jc(a,c),b&&b.call(d.Pa,k),h.resolve(k))}x("Query.once",1,4,arguments.length);ce("Query.once",a,!1);y("Query.once",2,b,!0);var d=Oh("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new Eb;Gb(h.sa);this.hc(a,c,function(b){e.Jc(a,c);d.cancel&&d.cancel.call(d.Pa,b);h.reject(b)});return h.sa};
	g.ne=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.ne(a),this.Oc)};
	g.oe=function(a){x("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.oe(a),this.Oc)};
	g.lg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ee("Query.orderByChild",a);Nh(this,"Query.orderByChild");var b=new M(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new We(b);b=xf(this.n,b);Lh(b);return new X(this.u,this.path,b,!0)};g.mg=function(){x("Query.orderByKey",0,0,arguments.length);Nh(this,"Query.orderByKey");var a=xf(this.n,Od);Lh(a);return new X(this.u,this.path,a,!0)};g.ng=function(){x("Query.orderByPriority",0,0,arguments.length);Nh(this,"Query.orderByPriority");var a=xf(this.n,N);Lh(a);return new X(this.u,this.path,a,!0)};
	g.og=function(){x("Query.orderByValue",0,0,arguments.length);Nh(this,"Query.orderByValue");var a=xf(this.n,bf);Lh(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){x("Query.startAt",0,2,arguments.length);Yd("Query.startAt",a,this.path,!0);de("Query.startAt",b);var c=this.n.Nd(a,b);Mh(c);Lh(c);if(this.n.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new X(this.u,this.path,c,this.Oc)};
	g.fd=function(a,b){x("Query.endAt",0,2,arguments.length);Yd("Query.endAt",a,this.path,!0);de("Query.endAt",b);var c=this.n.fd(a,b);Mh(c);Lh(c);if(this.n.oa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Oc)};
	g.Rf=function(a,b){x("Query.equalTo",1,2,arguments.length);Yd("Query.equalTo",a,this.path,!1);de("Query.equalTo",b);if(this.n.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.oa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).fd(a,b)};
	g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.ka=function(){var a=dd(yf(this.n));return"{}"===a?"default":a};
	g.isEqual=function(a){x("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.$(a.path),d=this.ka()===a.ka();return b&&c&&d};
	function Oh(a,b,c){var d={cancel:null,Pa:null};if(b&&c)d.cancel=b,y(a,3,d.cancel,!0),d.Pa=c,Cb(a,4,d.Pa);else if(b)if("object"===typeof b&&null!==b)d.Pa=b;else if("function"===typeof b)d.cancel=b;else throw Error(Bb(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.hc;X.prototype.off=X.prototype.Jc;X.prototype.once=X.prototype.kg;X.prototype.limitToFirst=X.prototype.ne;X.prototype.limitToLast=X.prototype.oe;X.prototype.orderByChild=X.prototype.lg;
	X.prototype.orderByKey=X.prototype.mg;X.prototype.orderByPriority=X.prototype.ng;X.prototype.orderByValue=X.prototype.og;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.fd;X.prototype.equalTo=X.prototype.Rf;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;id(X.prototype,"ref",X.prototype.xb);function Qh(a){a instanceof Rh||Xc("Don't call new Database() directly - please use firebase.database().");this.ua=a;this.ca=new W(a,C);this.INTERNAL=new Sh(this)}var Th={TIMESTAMP:{".sv":"timestamp"}};g=Qh.prototype;g.app=null;g.pf=function(a){Uh(this,"ref");x("database.ref",0,1,arguments.length);return p(a)?this.ca.m(a):this.ca};
	g.rg=function(a){Uh(this,"database.refFromURL");x("database.refFromURL",1,1,arguments.length);var b=Yc(a);ge("database.refFromURL",b);var c=b.kc;c.host!==this.ua.M.host&&Xc("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ua.M.host+")");return this.pf(b.path.toString())};function Uh(a,b){null===a.ua&&Xc("Cannot call "+b+" on a deleted database.")}g.$f=function(){x("database.goOffline",0,0,arguments.length);Uh(this,"goOffline");this.ua.eb()};
	g.ag=function(){x("database.goOnline",0,0,arguments.length);Uh(this,"goOnline");this.ua.lc()};Object.defineProperty(Qh.prototype,"app",{get:function(){return this.ua.app}});function Sh(a){this.$a=a}Sh.prototype.delete=function(){Uh(this.$a,"delete");var a=Vh.Wb(),b=this.$a.ua;A(a.nb,b.app.name)!==b&&Xc("Database "+b.app.name+" has already been deleted.");b.eb();delete a.nb[b.app.name];this.$a.ua=null;this.$a.ca=null;this.$a=this.$a.INTERNAL=null;return firebase.Promise.resolve()};
	Qh.prototype.ref=Qh.prototype.pf;Qh.prototype.refFromURL=Qh.prototype.rg;Qh.prototype.goOnline=Qh.prototype.ag;Qh.prototype.goOffline=Qh.prototype.$f;Sh.prototype["delete"]=Sh.prototype.delete;function Rh(a,b,c){this.app=c;var d=new Rf(c);this.M=a;this.Xa=Zf(a);this.Vc=null;this.da=new qc;this.vd=1;this.Ua=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.wa=new Of(this.M,r(this.Hb,this),d),setTimeout(r(this.Kc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==ca(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.wa=this.Ua=new Eg(this.M,r(this.Hb,this),r(this.Kc,this),r(this.ue,this),d,b)}var f=this;Sf(d,function(a){f.wa.qf(a)});this.zg=$f(a,r(function(){return new Wf(this.Xa,this.wa)},this));this.nc=new ie;this.ie=new fc;this.pd=new qh({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=sh(f.pd,new ac(Ge,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:aa});Wh(this,"connected",!1);this.ja=new Me;this.$a=new Qh(this);this.ed=
	0;this.je=null;this.K=new qh({Ae:function(a,b,c,d){f.wa.df(a,c,b,function(b,c){var e=d(b,c);vc(f.da,a.path,e)});return[]},Od:function(a,b){f.wa.Ef(a,b)}})}g=Rh.prototype;g.toString=function(){return(this.M.Sc?"https://":"http://")+this.M.host};g.name=function(){return this.M.pe};function Xh(a){a=a.ie.j(new M(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Yh(a){a=a={timestamp:Xh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Hb=function(a,b,c,d){this.ed++;var e=new M(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=la(b,function(a){return S(a)}),a=Ah(this.K,e,b,d)):(b=S(b),a=wh(this.K,e,b,d)):c?(d=la(b,function(a){return S(a)}),a=vh(this.K,e,d)):(d=S(b),a=sh(this.K,new ac(Ge,e,d)));d=e;0<a.length&&(d=Zh(this,e));vc(this.da,d,a)};g.Kc=function(a){Wh(this,"connected",a);!1===a&&$h(this)};g.ue=function(a){var b=this;fd(a,function(a,d){Wh(b,d,a)})};
	function Wh(a,b,c){b=new M("/.info/"+b);c=S(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=sh(a.pd,new ac(Ge,b,c));vc(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Gg:c});var e=Yh(this);b=S(b,c);var e=Pe(b,e),f=this.vd++,e=rh(this.K,a,e,f,!0);rc(this.da,e);var h=this;this.wa.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||L("set at "+a+" failed: "+b);e=uh(h.K,f,!e);vc(h.da,a,e);ai(d,b,c)});e=bi(this,a);Zh(this,e);vc(this.da,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Yh(this),f={};t(b,function(a,b){d=!1;var c=S(a);f[b]=Pe(c,e)});if(d)I("update() called with empty data.  Don't do anything."),ai(c,"ok");else{var h=this.vd++,k=th(this.K,a,f,h);rc(this.da,k);var m=this;this.wa.ef(a.toString(),b,function(b,d){var e="ok"===b;e||L("update at "+a+" failed: "+b);var e=uh(m.K,h,!e),f=a;0<e.length&&(f=Zh(m,a));vc(m.da,f,e);ai(c,b,d)});b=bi(this,a);Zh(this,b);vc(this.da,a,[])}};
	function $h(a){a.f("onDisconnectEvents");var b=Yh(a),c=[];Ne(Le(a.ja,b),C,function(b,e){c=c.concat(sh(a.K,new ac(Ge,b,e)));var f=bi(a,b);Zh(a,f)});a.ja=new Me;vc(a.da,C,c)}g.xd=function(a,b){var c=this;this.wa.xd(a.toString(),function(d,e){"ok"===d&&gh(c.ja,a);ai(b,d,e)})};function hh(a,b,c,d){var e=S(c);a.wa.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&Oe(a.ja,b,e);ai(d,c,h)})}function ih(a,b,c,d,e){var f=S(c,d);a.wa.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&Oe(a.ja,b,f);ai(e,c,d)})}
	function jh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(I("onDisconnect().update() called with empty data.  Don't do anything."),ai(d,"ok")):a.wa.gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=S(c[m]);Oe(a.ja,b.m(m),l)}ai(d,e,f)})}function Ph(a,b,c){c=".info"===J(b.path)?a.pd.Ob(b,c):a.K.Ob(b,c);tc(a.da,b.path,c)}g.eb=function(){this.Ua&&this.Ua.eb("repo_interrupt")};g.lc=function(){this.Ua&&this.Ua.lc("repo_interrupt")};
	g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Tf(this.Xa)),a=this.Vc.get()):a=this.Xa.get();var b=Ja(qa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){Vf(this.Xa,a);this.zg.zf[a]=!0};g.f=function(a){var b="";this.Ua&&(b=this.Ua.id+":");I(b,arguments)};
	function ai(a,b,c){a&&Tb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ci(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new W(a,b);h.hc("value",f);c={path:b,update:c,G:d,status:null,lf:Oc(),Ie:e,wf:0,Rd:function(){h.Jc("value",f)},Td:null,Da:null,bd:null,cd:null,dd:null};d=a.K.Ba(b,void 0)||F;c.bd=d;d=c.update(d.H());if(p(d)){Zd("transaction failed: Data returned ",d,c.path);c.status=1;e=je(a.nc,b);var k=e.Ea()||[];k.push(c);ke(e,k);"object"===typeof d&&null!==d&&Hb(d,".priority")?(k=A(d,".priority"),E(Xd(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Ba(b)||F).C().H();e=Yh(a);d=S(d,k);e=Pe(d,e);c.cd=d;c.dd=e;c.Da=a.vd++;c=rh(a.K,b,e,c.Da,c.Ie);vc(a.da,b,c);di(a)}else c.Rd(),c.cd=null,c.dd=null,c.G&&(a=new V(c.bd,new W(a,c.path),N),c.G(null,!1,a))}function di(a,b){var c=b||a.nc;b||ei(a,c);if(null!==c.Ea()){var d=fi(a,c);E(0<d.length,"Sending zero length transaction queue");Ka(d,function(a){return 1===a.status})&&gi(a,c.path(),d)}else c.kd()&&c.P(function(b){di(a,b)})}
	function gi(a,b,c){for(var d=Ia(c,function(a){return a.Da}),e=a.K.Ba(b,d)||F,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];E(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.wf++;var k=R(b,h.path),d=d.F(k,h.cd)}d=d.H(!0);a.wa.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(uh(a.K,c[f].Da));if(c[f].G){var h=c[f].dd,k=new W(a,c[f].path);d.push(r(c[f].G,
	null,null,!0,new V(h,k,N)))}c[f].Rd()}ei(a,je(a.nc,b));di(a);vc(a.da,b,e);for(f=0;f<d.length;f++)Tb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(L("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Zh(a,b)}},e)}function Zh(a,b){var c=hi(a,b),d=c.path(),c=fi(a,c);ii(a,c,d);return d}
	function ii(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Ha(b,function(a){return 1===a.status}),f=Ia(f,function(a){return a.Da}),h=0;h<b.length;h++){var k=b[h],m=R(c,k.path),l=!1,u;E(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(uh(a.K,k.Da,!0));else if(1===k.status)if(25<=k.wf)l=!0,u="maxretry",e=e.concat(uh(a.K,k.Da,!0));else{var z=a.K.Ba(k.path,f)||F;k.bd=z;var G=b[h].update(z.H());p(G)?(Zd("transaction failed: Data returned ",G,
	k.path),m=S(G),"object"===typeof G&&null!=G&&Hb(G,".priority")||(m=m.ga(z.C())),z=k.Da,G=Yh(a),G=Pe(m,G),k.cd=m,k.dd=G,k.Da=a.vd++,Na(f,z),e=e.concat(rh(a.K,k.path,G,k.Da,k.Ie)),e=e.concat(uh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(uh(a.K,k.Da,!0)))}vc(a.da,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new W(a,b[h].path),d.push(r(b[h].G,null,null,!1,new V(b[h].bd,k,N)))):d.push(r(b[h].G,null,Error(u),!1,null))))}ei(a,a.nc);for(h=0;h<d.length;h++)Tb(d[h]);di(a)}}
	function hi(a,b){for(var c,d=a.nc;null!==(c=J(b))&&null===d.Ea();)d=je(d,c),b=D(b);return d}function fi(a,b){var c=[];ji(a,b,c);c.sort(function(a,b){return a.lf-b.lf});return c}function ji(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){ji(a,b,c)})}function ei(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;ke(b,0<c.length?c:null)}b.P(function(b){ei(a,b)})}
	function bi(a,b){var c=hi(a,b).path(),d=je(a.nc,b);ne(d,function(b){ki(a,b)});ki(a,d);me(d,function(b){ki(a,b)});return c}
	function ki(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(E(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(E(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(uh(a.K,c[h].Da,!0)),c[h].G&&d.push(r(c[h].G,null,Error("set"),!1,null))));-1===f?ke(b,null):c.length=f+1;vc(a.da,b.path(),e);for(h=0;h<d.length;h++)Tb(d[h])}};function Vh(){this.nb={};this.Ff=!1}Vh.prototype.eb=function(){for(var a in this.nb)this.nb[a].eb()};Vh.prototype.lc=function(){for(var a in this.nb)this.nb[a].lc()};Vh.prototype.ce=function(a){this.Ff=a};ba(Vh);Vh.prototype.interrupt=Vh.prototype.eb;Vh.prototype.resume=Vh.prototype.lc;var Y={};Y.pc=Eg;Y.DataConnection=Y.pc;Eg.prototype.yg=function(a,b){this.va("q",{p:a},b)};Y.pc.prototype.simpleListen=Y.pc.prototype.yg;Eg.prototype.Qf=function(a,b){this.va("echo",{d:a},b)};Y.pc.prototype.echo=Y.pc.prototype.Qf;Eg.prototype.interrupt=Eg.prototype.eb;Y.If=sg;Y.RealTimeConnection=Y.If;sg.prototype.sendRequest=sg.prototype.va;sg.prototype.close=sg.prototype.close;
	Y.bg=function(a){var b=Eg.prototype.put;Eg.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Eg.prototype.put=b}};Y.hijackHash=Y.bg;Y.Hf=cc;Y.ConnectionTarget=Y.Hf;Y.ka=function(a){return a.ka()};Y.queryIdentifier=Y.ka;Y.eg=function(a){return a.u.Ua.aa};Y.listens=Y.eg;Y.ce=function(a){Vh.Wb().ce(a)};Y.forceRestClient=Y.ce;Y.Context=Vh;var Z={Xf:function(){hg=cg=!0}};Z.forceLongPolling=Z.Xf;Z.Yf=function(){ig=!0};Z.forceWebSockets=Z.Yf;Z.dg=function(){return bg.isAvailable()};Z.isWebSocketsAvailable=Z.dg;Z.wg=function(a,b){a.u.Ua.ze=b};Z.setSecurityDebugCallback=Z.wg;Z.Be=function(a,b){a.u.Be(b)};Z.stats=Z.Be;Z.Ce=function(a,b){a.u.Ce(b)};Z.statsIncrementCounter=Z.Ce;Z.ed=function(a){return a.u.ed};Z.dataUpdateCount=Z.ed;Z.cg=function(a,b){a.u.je=b};Z.interceptServerData=Z.cg;function li(a,b){this.committed=a;this.snapshot=b};function W(a,b){if(!(a instanceof Rh))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,vf,!1);this.then=void 0;this["catch"]=void 0}ka(W,X);g=W.prototype;g.getKey=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Kd(this.path)};
	g.m=function(a){x("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof M))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ee("Firebase.child",b)}else ee("Firebase.child",a);return new W(this.u,this.path.m(a))};g.getParent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new W(this.u,a)};
	g.Zf=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Pf=function(){return this.u.$a};g.set=function(a,b){x("Firebase.set",1,2,arguments.length);fe("Firebase.set",this.path);Yd("Firebase.set",a,this.path,!1);y("Firebase.set",2,b,!0);var c=new Eb;this.u.Kb(this.path,a,null,Fb(c,b));return c.sa};
	g.update=function(a,b){x("Firebase.update",1,2,arguments.length);fe("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ae("Firebase.update",a,this.path);y("Firebase.update",2,b,!0);c=new Eb;this.u.update(this.path,a,Fb(c,b));return c.sa};
	g.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);fe("Firebase.setWithPriority",this.path);Yd("Firebase.setWithPriority",a,this.path,!1);be("Firebase.setWithPriority",2,b);y("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new Eb;this.u.Kb(this.path,a,b,Fb(d,c));return d.sa};
	g.remove=function(a){x("Firebase.remove",0,1,arguments.length);fe("Firebase.remove",this.path);y("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);fe("Firebase.transaction",this.path);y("Firebase.transaction",1,a,!1);y("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Bb("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new Eb;ga(b)&&Gb(d.sa);ci(this.u,this.path,a,function(a,c,
	h){a?d.reject(a):d.resolve(new li(c,h));ga(b)&&b(a,c,h)},c);return d.sa};g.vg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);fe("Firebase.setPriority",this.path);be("Firebase.setPriority",1,a);y("Firebase.setPriority",2,b,!0);var c=new Eb;this.u.Kb(this.path.m(".priority"),a,null,Fb(c,b));return c.sa};
	g.push=function(a,b){x("Firebase.push",0,2,arguments.length);fe("Firebase.push",this.path);Yd("Firebase.push",a,this.path,!0);y("Firebase.push",2,b,!0);var c=Xh(this.u),d=Pd(c),c=this.m(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.m(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Gb(f)}return c};g.kb=function(){fe("Firebase.onDisconnect",this.path);return new U(this.u,this.path)};W.prototype.child=W.prototype.m;W.prototype.set=W.prototype.set;W.prototype.update=W.prototype.update;
	W.prototype.setWithPriority=W.prototype.Kb;W.prototype.remove=W.prototype.remove;W.prototype.transaction=W.prototype.transaction;W.prototype.setPriority=W.prototype.vg;W.prototype.push=W.prototype.push;W.prototype.onDisconnect=W.prototype.kb;id(W.prototype,"database",W.prototype.Pf);id(W.prototype,"key",W.prototype.getKey);id(W.prototype,"parent",W.prototype.getParent);id(W.prototype,"root",W.prototype.Zf);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=Vh.Wb(),c=a.options.databaseURL;p(c)||Xc("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Yc(c),c=d.kc;ge("Invalid Firebase Database URL",d);d.path.e()||Xc("Database URL must point to the root of a Firebase Database (not including a child path).");(d=A(b.nb,a.name))&&Xc("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Rh(c,b.Ff,a);b.nb[a.name]=
	d;return d.$a},{Reference:W,Query:X,Database:Qh,enableLogging:Uc,INTERNAL:Z,TEST_ACCESS:Y,ServerValue:Th})}catch(mi){Xc("Failed to register the Firebase Database Service ("+mi+")")};})();
	module.exports = firebase.database;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(10);
	/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	(function() {var k,aa=aa||{},l=this,n=function(a){return void 0!==a},ba=function(){},ca=function(){throw Error("unimplemented abstract method");},p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";
	if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"string"==typeof a},r=function(a){return"function"==p(a)},ea=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},fa="closure_uid_"+(1E9*Math.random()>>>
	0),ga=0,ha=function(a,b,c){return a.call.apply(a.bind,arguments)},ia=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},t=function(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return t.apply(null,arguments)},ja=Date.now||function(){return+new Date},
	u=function(a,b){function c(){}c.prototype=b.prototype;a.I=b.prototype;a.prototype=new c;a.Ka=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var ka=function(a,b,c){function d(){N||(N=!0,b.apply(null,arguments))}function e(b){m=setTimeout(function(){m=null;a(f,2===O)},b)}function f(a,b){if(!N)if(a)d.apply(null,arguments);else if(2===O||x)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===O?(O=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){ec||(ec=!0,N||(null!==m?(a||(O=2),clearTimeout(m),e(0)):a||(O=1)))}var h=1,m=null,x=!1,O=0,N=!1,ec=!1;e(0);setTimeout(function(){x=!0;g(!0)},c);return g};var la="https://firebasestorage.googleapis.com";var v=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};u(v,Error);
	var ma=function(){return new v("unknown","An unknown error occurred, please check the error payload for server response.")},na=function(){return new v("canceled","User canceled the upload/download.")},oa=function(){return new v("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")},pa=function(a,b,c){return new v("invalid-argument","Invalid argument in `"+b+"` at index "+a+": "+c)},qa=function(){return new v("app-deleted","The Firebase app was deleted.")},ra=function(a,b){return new v("invalid-format",
	"String does not match format '"+a+"': "+b)};var sa=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},ta=function(a){var b={};sa(a,function(a,d){b[a]=d});return b};var w=function(a,b,c,d){this.i=a;this.b={};this.method=b;this.headers={};this.body="";this.N=c;this.c=this.a=null;this.f=[200];this.g=[];this.h=d};var ua={STATE_CHANGED:"state_changed"},va={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},wa=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var y=function(a){return n(a)&&null!==a},xa=function(a){return"string"===typeof a||a instanceof String},ya=function(){return"undefined"!==typeof Blob};var za=function(a,b,c){this.f=c;this.c=a;this.g=b;this.b=0;this.a=null};za.prototype.get=function(){var a;0<this.b?(this.b--,a=this.a,this.a=a.next,a.next=null):a=this.c();return a};var Aa=function(a,b){a.g(b);a.b<a.f&&(a.b++,b.next=a.a,a.a=b)};var Ba=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ba);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};u(Ba,Error);Ba.prototype.name="CustomError";var Ca=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Ca.prototype.a=null;var Da=0;Ca.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Da++;d||ja();this.b=b;delete this.a};var Ea=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Fa=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ga="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ha=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ga.length;f++)c=Ga[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Ia=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},Ja=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var Ka=function(a){Ka[" "](a);return a};Ka[" "]=ba;var Ma=function(a,b){var c=La;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var Na=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},Oa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Pa=function(a,b){return a<b?-1:a>b?1:0};var Qa=function(a,b){this.a=a;this.b=b};var z=function(a,b){this.bucket=a;this.path=b},Ra=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Sa=function(a){for(var b=null,c=[{ia:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,ba:{bucket:1,path:3},ha:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{ia:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,ba:{bucket:1,path:3},ha:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
	c[d],f=e.ia.exec(a);if(f){b=f[e.ba.bucket];(f=f[e.ba.path])||(f="");b=new z(b,f);e.ha(b);break}}if(null==b)throw new v("invalid-url","Invalid URL '"+a+"'.");return b};var Ta=function(a,b,c){r(a)||y(b)||y(c)?(this.next=a,this.a=b||null,this.b=c||null):(this.next=a.next||null,this.a=a.error||null,this.b=a.complete||null)};var Ua={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Va=function(a){switch(a){case "raw":case "base64":case "base64url":case "data_url":break;default:throw"Expected one of the event types: [raw, base64, base64url, data_url].";}},Wa=function(a,b){this.data=a;this.a=b||null},$a=function(a,b){switch(a){case "raw":return new Wa(Xa(b));case "base64":case "base64url":return new Wa(Ya(a,b));case "data_url":return a=new Za(b),a=a.a?Ya("base64",a.c):Xa(a.c),new Wa(a,(new Za(b)).b)}throw ma();
	},Xa=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(d);else if(2047>=d)b.push(192|d>>6,128|d&63);else if(55296==(d&64512))if(c<a.length-1&&56320==(a.charCodeAt(c+1)&64512)){var e=a.charCodeAt(++c),d=65536|(d&1023)<<10|e&1023;b.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63)}else b.push(239,191,189);else 56320==(d&64512)?b.push(239,191,189):b.push(224|d>>12,128|d>>6&63,128|d&63)}return new Uint8Array(b)},Ya=function(a,b){switch(a){case "base64":var c=-1!==b.indexOf("-"),
	d=-1!==b.indexOf("_");if(c||d)throw ra(a,"Invalid character '"+(c?"-":"_")+"' found: is it base64url encoded?");break;case "base64url":c=-1!==b.indexOf("+");d=-1!==b.indexOf("/");if(c||d)throw ra(a,"Invalid character '"+(c?"+":"/")+"' found: is it base64 encoded?");b=b.replace(/-/g,"+").replace(/_/g,"/")}var e;try{e=atob(b)}catch(f){throw ra(a,"Invalid character found");}a=new Uint8Array(e.length);for(b=0;b<e.length;b++)a[b]=e.charCodeAt(b);return a},Za=function(a){var b=a.match(/^data:([^,]+)?,/);
	if(null===b)throw ra("data_url","Must be formatted 'data:[<mediatype>][;base64],<data>");b=b[1]||null;this.a=!1;this.b=null;if(null!=b){var c=b.length-7;this.b=(this.a=0<=c&&b.indexOf(";base64",c)==c)?b.substring(0,b.length-7):b}this.c=a.substring(a.indexOf(",")+1)};var ab=function(a){var b=encodeURIComponent,c="?";sa(a,function(a,e){a=b(a)+"="+b(e);c=c+a+"&"});return c=c.slice(0,-1)};var A=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=A.prototype;k.na=function(){return this.b};k.Ja=function(){return this.h};k.Ga=function(){return this.f};k.Ba=function(){return this.a};k.pa=function(){if(y(this.a)){var a=this.a.downloadURLs;return y(a)&&y(a[0])?a[0]:null}return null};k.Ia=function(){return this.g};k.Ea=function(){return this.c};var bb=function(a,b){b.unshift(a);Ba.call(this,Na.apply(null,b));b.shift()};u(bb,Ba);bb.prototype.name="AssertionError";
	var cb=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new bb(""+e,f||[]);},B=function(a,b,c){a||cb("",null,b,Array.prototype.slice.call(arguments,2))},db=function(a,b){throw new bb("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},eb=function(a,b,c){r(a)||cb("Expected function but got %s: %s.",[p(a),a],b,Array.prototype.slice.call(arguments,2))};var fb=function(){this.g=this.g;this.o=this.o};fb.prototype.g=!1;fb.prototype.ea=function(){this.g||(this.g=!0,this.C())};fb.prototype.C=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var gb="closure_listenable_"+(1E6*Math.random()|0),hb=0;var ib;a:{var jb=l.navigator;if(jb){var kb=jb.userAgent;if(kb){ib=kb;break a}}ib=""}var C=function(a){return-1!=ib.indexOf(a)};var lb=function(){};lb.prototype.b=null;lb.prototype.a=ca;var mb=function(a){return a.b||(a.b=a.f())};lb.prototype.f=ca;var nb=Array.prototype.indexOf?function(a,b,c){B(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ob=Array.prototype.forEach?function(a,b,c){B(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},pb=Array.prototype.filter?function(a,
	b,c){B(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var m=g[h];b.call(c,m,h,a)&&(e[f++]=m)}return e},qb=Array.prototype.map?function(a,b,c){B(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},rb=Array.prototype.some?function(a,b,c){B(null!=a.length);return Array.prototype.some.call(a,
	b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},tb=function(a){var b;a:{b=sb;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]},ub=function(a,b){return 0<=nb(a,b)},vb=function(a){if("array"!=p(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0},wb=function(a,b){b=nb(a,b);var c;if(c=0<=b)B(null!=a.length),Array.prototype.splice.call(a,
	b,1);return c},xb=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var zb=new za(function(){return new yb},function(a){a.reset()},100),Bb=function(){var a=Ab,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b},yb=function(){this.next=this.b=this.a=null};yb.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};yb.prototype.reset=function(){this.next=this.b=this.a=null};var Cb=function(a,b){this.type=a;this.a=this.target=b;this.ja=!0};Cb.prototype.b=function(){this.ja=!1};var Db=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.U=!!d;this.N=e;++hb;this.O=this.T=!1},Eb=function(a){a.O=!0;a.listener=null;a.a=null;a.src=null;a.N=null};var Fb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;var Gb=function(a,b){b=pb(b.split("/"),function(a){return 0<a.length}).join("/");return 0===a.length?b:a+"/"+b},Hb=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var Ib=function(a){this.src=a;this.a={};this.b=0},Kb=function(a,b,c,d,e,f){var g=b.toString();b=a.a[g];b||(b=a.a[g]=[],a.b++);var h=Jb(b,c,e,f);-1<h?(a=b[h],d||(a.T=!1)):(a=new Db(c,a.src,g,!!e,f),a.T=d,b.push(a));return a},Lb=function(a,b){var c=b.type;c in a.a&&wb(a.a[c],b)&&(Eb(b),0==a.a[c].length&&(delete a.a[c],a.b--))},Jb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.O&&f.listener==b&&f.U==!!c&&f.N==d)return e}return-1};var Mb,Nb=function(){};u(Nb,lb);Nb.prototype.a=function(){var a=Ob(this);return a?new ActiveXObject(a):new XMLHttpRequest};Nb.prototype.f=function(){var a={};Ob(this)&&(a[0]=!0,a[1]=!0);return a};
	var Ob=function(a){if(!a.c&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.c=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.c};Mb=new Nb;var Pb=function(a){this.a=[];if(a)a:{var b;if(a instanceof Pb){if(b=a.H(),a=a.A(),0>=this.b()){for(var c=this.a,d=0;d<b.length;d++)c.push(new Qa(b[d],a[d]));break a}}else b=Fa(a),a=Ea(a);for(d=0;d<b.length;d++)Qb(this,b[d],a[d])}},Qb=function(a,b,c){var d=a.a;d.push(new Qa(b,c));b=d.length-1;a=a.a;for(c=a[b];0<b;)if(d=b-1>>1,a[d].a>c.a)a[b]=a[d],b=d;else break;a[b]=c};Pb.prototype.A=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].b);return b};
	Pb.prototype.H=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].a);return b};Pb.prototype.b=function(){return this.a.length};var Rb=function(){this.c=[];this.a=[]},Sb=function(a){0==a.c.length&&(a.c=a.a,a.c.reverse(),a.a=[]);return a.c.pop()};Rb.prototype.b=function(){return this.c.length+this.a.length};Rb.prototype.A=function(){for(var a=[],b=this.c.length-1;0<=b;--b)a.push(this.c[b]);for(var c=this.a.length,b=0;b<c;++b)a.push(this.a[b]);return a};var Tb=function(a){if(a.A&&"function"==typeof a.A)return a.A();if(q(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ea(a)},Ub=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||q(a))ob(a,b,void 0);else{var c;if(a.H&&"function"==typeof a.H)c=a.H();else if(a.A&&"function"==typeof a.A)c=void 0;else if(da(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Fa(a);for(var d=Tb(a),e=d.length,f=0;f<e;f++)b.call(void 0,
	d[f],c&&c[f],a)}};var Vb=function(a){l.setTimeout(function(){throw a;},0)},Wb,Xb=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!C("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=t(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!C("Trident")&&!C("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(n(c.next)){c=c.next;var a=c.da;c.da=null;a()}};return function(a){d.next={da:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var Yb="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},Zb=function(){};Zb.prototype.next=function(){throw Yb;};Zb.prototype.h=function(){return this};var $b=function(){Pb.call(this)};u($b,Pb);var ac=C("Opera"),D=C("Trident")||C("MSIE"),bc=C("Edge"),cc=C("Gecko")&&!(-1!=ib.toLowerCase().indexOf("webkit")&&!C("Edge"))&&!(C("Trident")||C("MSIE"))&&!C("Edge"),dc=-1!=ib.toLowerCase().indexOf("webkit")&&!C("Edge"),fc=function(){var a=l.document;return a?a.documentMode:void 0},gc;
	a:{var hc="",ic=function(){var a=ib;if(cc)return/rv\:([^\);]+)(\)|;)/.exec(a);if(bc)return/Edge\/([\d\.]+)/.exec(a);if(D)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(dc)return/WebKit\/(\S+)/.exec(a);if(ac)return/(?:Version)[ \/]?(\S+)/.exec(a)}();ic&&(hc=ic?ic[1]:"");if(D){var jc=fc();if(null!=jc&&jc>parseFloat(hc)){gc=String(jc);break a}}gc=hc}
	var kc=gc,La={},E=function(a){return Ma(a,function(){for(var b=0,c=Oa(String(kc)).split("."),d=Oa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=Pa(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||Pa(0==g[2].length,0==h[2].length)||Pa(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})},lc=l.document,
	mc=lc&&D?fc()||("CSS1Compat"==lc.compatMode?parseInt(kc,10):5):void 0;var qc=function(a,b){nc||oc();pc||(nc(),pc=!0);var c=Ab,d=zb.get();d.set(a,b);c.b?c.b.next=d:(B(!c.a),c.a=d);c.b=d},nc,oc=function(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);nc=function(){a.then(rc)}}else nc=function(){var a=rc;!r(l.setImmediate)||l.Window&&l.Window.prototype&&!C("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(Wb||(Wb=Xb()),Wb(a)):l.setImmediate(a)}},pc=!1,Ab=new function(){this.b=this.a=null},rc=function(){for(var a;a=Bb();){try{a.a.call(a.b)}catch(b){Vb(b)}Aa(zb,
	a)}pc=!1};var sc;(sc=!D)||(sc=9<=Number(mc));var tc=sc,uc=D&&!E("9");!dc||E("528");cc&&E("1.9b")||D&&E("8")||ac&&E("9.5")||dc&&E("528");cc&&!E("8")||D&&E("9");var F=function(a,b){this.c={};this.a=[];this.g=this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof F?(c=a.H(),d=a.A()):(c=Fa(a),d=Ea(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};F.prototype.b=function(){return this.f};F.prototype.A=function(){vc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.c[this.a[b]]);return a};F.prototype.H=function(){vc(this);return this.a.concat()};
	var wc=function(a,b){return Object.prototype.hasOwnProperty.call(a.c,b)?(delete a.c[b],a.f--,a.g++,a.a.length>2*a.f&&vc(a),!0):!1},vc=function(a){if(a.f!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.c,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.f!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}};
	F.prototype.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.c,a)?this.c[a]:b};F.prototype.set=function(a,b){Object.prototype.hasOwnProperty.call(this.c,a)||(this.f++,this.a.push(a),this.g++);this.c[a]=b};F.prototype.forEach=function(a,b){for(var c=this.H(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
	F.prototype.h=function(a){vc(this);var b=0,c=this.g,d=this,e=new Zb;e.next=function(){if(c!=d.g)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Yb;var e=d.a[b++];return a?e:d.c[e]};return e};var xc=function(a,b){Cb.call(this,a?a.type:"");this.c=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;if((b=a.relatedTarget)&&cc)try{Ka(b.nodeName)}catch(c){}this.c=a;a.defaultPrevented&&this.b()}};u(xc,Cb);xc.prototype.b=function(){xc.I.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,uc)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var G=function(a,b){this.a=0;this.i=void 0;this.c=this.b=this.f=null;this.g=this.h=!1;if(a!=ba)try{var c=this;a.call(b,function(a){yc(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}yc(c,3,a)})}catch(d){yc(this,3,d)}},zc=function(){this.next=this.f=this.c=this.a=this.b=null;this.g=!1};zc.prototype.reset=function(){this.f=this.c=this.a=this.b=null;this.g=!1};
	var Ac=new za(function(){return new zc},function(a){a.reset()},100),Bc=function(a,b,c){var d=Ac.get();d.a=a;d.c=b;d.f=c;return d},Cc=function(a){if(a instanceof G)return a;var b=new G(ba);yc(b,2,a);return b},Dc=function(a){return new G(function(b,c){c(a)})};
	G.prototype.then=function(a,b,c){null!=a&&eb(a,"opt_onFulfilled should be a function.");null!=b&&eb(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Ec(this,r(a)?a:null,r(b)?b:null,c)};Ia(G);G.prototype.l=function(a,b){return Ec(this,null,a,b)};
	var Gc=function(a,b){a.b||2!=a.a&&3!=a.a||Fc(a);B(null!=b.a);a.c?a.c.next=b:a.b=b;a.c=b},Ec=function(a,b,c,d){var e=Bc(null,null,null);e.b=new G(function(a,g){e.a=b?function(c){try{var e=b.call(d,c);a(e)}catch(x){g(x)}}:a;e.c=c?function(b){try{var e=c.call(d,b);a(e)}catch(x){g(x)}}:g});e.b.f=a;Gc(a,e);return e.b};G.prototype.o=function(a){B(1==this.a);this.a=0;yc(this,2,a)};G.prototype.m=function(a){B(1==this.a);this.a=0;yc(this,3,a)};
	var yc=function(a,b,c){if(0==a.a){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.a=1;var d;a:{var e=c,f=a.o,g=a.m;if(e instanceof G)null!=f&&eb(f,"opt_onFulfilled should be a function."),null!=g&&eb(g,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Gc(e,Bc(f||ba,g||null,a)),d=!0;else if(Ja(e))e.then(f,g,a),d=!0;else{if(ea(e))try{var h=e.then;if(r(h)){Hc(e,h,f,g,a);d=!0;break a}}catch(m){g.call(a,m);d=!0;break a}d=!1}}d||
	(a.i=c,a.a=b,a.f=null,Fc(a),3!=b||Ic(a,c))}},Hc=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,h)}catch(m){h(m)}},Fc=function(a){a.h||(a.h=!0,qc(a.j,a))},Jc=function(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.c=null);null!=b&&B(null!=b.a);return b};
	G.prototype.j=function(){for(var a;a=Jc(this);){var b=this.a,c=this.i;if(3==b&&a.c&&!a.g){var d;for(d=this;d&&d.g;d=d.f)d.g=!1}if(a.b)a.b.f=null,Kc(a,b,c);else try{a.g?a.a.call(a.f):Kc(a,b,c)}catch(e){Lc.call(null,e)}Aa(Ac,a)}this.h=!1};var Kc=function(a,b,c){2==b?a.a.call(a.f,c):a.c&&a.c.call(a.f,c)},Ic=function(a,b){a.g=!0;qc(function(){a.g&&Lc.call(null,b)})},Lc=Vb;var Nc=function(a){this.a=new F;if(a){a=Tb(a);for(var b=a.length,c=0;c<b;c++){var d=a[c];this.a.set(Mc(d),d)}}},Mc=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[fa]||(a[fa]=++ga)):b.substr(0,1)+a};Nc.prototype.b=function(){return this.a.b()};Nc.prototype.A=function(){return this.a.A()};Nc.prototype.h=function(){return this.a.h(!1)};var Oc=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);Cc(!0).then(function(){a.apply(null,b)})}};var Pc="closure_lm_"+(1E6*Math.random()|0),Qc={},Rc=0,Sc=function(a,b,c,d,e){if("array"==p(b)){for(var f=0;f<b.length;f++)Sc(a,b[f],c,d,e);return null}c=Tc(c);a&&a[gb]?(Uc(a),a=Kb(a.b,String(b),c,!1,d,e)):a=Vc(a,b,c,!1,d,e);return a},Vc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=Wc(a);h||(a[Pc]=h=new Ib(a));c=Kb(h,b,c,d,e,f);if(c.a)return c;d=Xc();c.a=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Yc(b.toString()),
	d);else throw Error("addEventListener and attachEvent are unavailable.");Rc++;return c},Xc=function(){var a=Zc,b=tc?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},$c=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)$c(a,b[f],c,d,e);else c=Tc(c),a&&a[gb]?Kb(a.b,String(b),c,!0,d,e):Vc(a,b,c,!0,d,e)},ad=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)ad(a,b[f],c,d,e);else(c=Tc(c),a&&a[gb])?(a=a.b,b=String(b).toString(),
	b in a.a&&(f=a.a[b],c=Jb(f,c,d,e),-1<c&&(Eb(f[c]),B(null!=f.length),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=Wc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=Jb(b,c,!!d,e)),(c=-1<a?b[a]:null)&&bd(c))},bd=function(a){if("number"==typeof a||!a||a.O)return;var b=a.src;if(b&&b[gb]){Lb(b.b,a);return}var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.U):b.detachEvent&&b.detachEvent(Yc(c),d);Rc--;(c=Wc(b))?(Lb(c,a),0==c.b&&(c.src=null,b[Pc]=null)):Eb(a)},Yc=
	function(a){return a in Qc?Qc[a]:Qc[a]="on"+a},dd=function(a,b,c,d){var e=!0;if(a=Wc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.U==c&&!f.O&&(f=cd(f,d),e=e&&!1!==f)}return e},cd=function(a,b){var c=a.listener,d=a.N||a.src;a.T&&bd(a);return c.call(d,b)},Zc=function(a,b){if(a.O)return!0;if(!tc){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new xc(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=
	!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.a;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;0<=e;e--){b.a=d[e];var f=dd(d[e],a,!0,b),c=c&&f}for(e=0;e<d.length;e++)b.a=d[e],f=dd(d[e],a,!1,b),c=c&&f}return c}return cd(a,new xc(b,this))},Wc=function(a){a=a[Pc];return a instanceof Ib?a:null},ed="__closure_events_fn_"+(1E9*Math.random()>>>0),Tc=function(a){B(a,"Listener can not be null.");if(r(a))return a;B(a.handleEvent,"An object listener must have handleEvent method.");
	a[ed]||(a[ed]=function(b){return a.handleEvent(b)});return a[ed]};var H=function(a,b){fb.call(this);this.m=a||0;this.f=b||10;if(this.m>this.f)throw Error("[goog.structs.Pool] Min can not be greater than max");this.a=new Rb;this.c=new Nc;this.j=null;this.S()};u(H,fb);H.prototype.W=function(){var a=ja();if(!(null!=this.j&&0>a-this.j)){for(var b;0<this.a.b()&&(b=Sb(this.a),!this.l(b));)this.S();!b&&this.b()<this.f&&(b=this.i());b&&(this.j=a,this.c.a.set(Mc(b),b));return b}};var gd=function(a){var b=fd;wc(b.c.a,Mc(a))&&b.$(a)};
	H.prototype.$=function(a){wc(this.c.a,Mc(a));this.l(a)&&this.b()<this.f?this.a.a.push(a):hd(a)};H.prototype.S=function(){for(var a=this.a;this.b()<this.m;){var b=this.i();a.a.push(b)}for(;this.b()>this.f&&0<this.a.b();)hd(Sb(a))};H.prototype.i=function(){return{}};var hd=function(a){if("function"==typeof a.ea)a.ea();else for(var b in a)a[b]=null};H.prototype.l=function(a){return"function"==typeof a.oa?a.oa():!0};H.prototype.b=function(){return this.a.b()+this.c.b()};
	H.prototype.C=function(){H.I.C.call(this);if(0<this.c.b())throw Error("[goog.structs.Pool] Objects not released");delete this.c;for(var a=this.a;0!=a.c.length||0!=a.a.length;)hd(Sb(a));delete this.a};/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var id=function(a,b){this.c=[];this.m=b||null;this.a=this.h=!1;this.b=void 0;this.j=this.g=!1;this.f=0;this.i=null;this.o=0};id.prototype.l=function(a,b){this.g=!1;this.h=!0;this.b=b;this.a=!a;jd(this)};var kd=function(a,b,c){B(!a.j,"Blocking Deferreds can not be re-used");a.c.push([b,c,void 0]);a.h&&jd(a)};id.prototype.then=function(a,b,c){var d,e,f=new G(function(a,b){d=a;e=b});kd(this,d,function(a){e(a)});return f.then(a,b,c)};Ia(id);
	var ld=function(a){return rb(a.c,function(a){return r(a[1])})},jd=function(a){if(a.f&&a.h&&ld(a)){var b=a.f,c=md[b];c&&(l.clearTimeout(c.a),delete md[b]);a.f=0}a.i&&(a.i.o--,delete a.i);for(var b=a.b,d=c=!1;a.c.length&&!a.g;){var e=a.c.shift(),f=e[0],g=e[1],e=e[2];if(f=a.a?g:f)try{var h=f.call(e||a.m,b);n(h)&&(a.a=a.a&&(h==b||h instanceof Error),a.b=b=h);if(Ja(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.g=!0}catch(m){b=m,a.a=!0,ld(a)||(c=!0)}}a.b=b;d&&(h=t(a.l,a,!0),d=t(a.l,a,
	!1),b instanceof id?(kd(b,h,d),b.j=!0):b.then(h,d));c&&(b=new nd(b),md[b.a]=b,a.f=b.a)},nd=function(a){this.a=l.setTimeout(t(this.c,this),0);this.b=a};nd.prototype.c=function(){B(md[this.a],"Cannot throw an error that is not scheduled.");delete md[this.a];throw this.b;};var md={};var od=function(a){this.f=a;this.b=this.c=this.a=null},pd=function(a,b){this.name=a;this.value=b};pd.prototype.toString=function(){return this.name};var qd=new pd("SEVERE",1E3),rd=new pd("CONFIG",700),sd=new pd("FINE",500),td=function(a){if(a.c)return a.c;if(a.a)return td(a.a);db("Root logger has no level set.");return null};
	od.prototype.log=function(a,b,c){if(a.value>=td(this).value)for(r(b)&&(b=b()),a=new Ca(a,String(b),this.f),c&&(a.a=c),c="log:"+a.b,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;)c=c.a};
	var ud={},vd=null,wd=function(a){vd||(vd=new od(""),ud[""]=vd,vd.c=rd);var b;if(!(b=ud[a])){b=new od(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=wd(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;ud[a]=b}return b};var xd=function(){fb.call(this);this.b=new Ib(this);this.Y=this;this.G=null};u(xd,fb);xd.prototype[gb]=!0;xd.prototype.removeEventListener=function(a,b,c,d){ad(this,a,b,c,d)};
	var I=function(a,b){Uc(a);var c,d=a.G;if(d){c=[];for(var e=1;d;d=d.G)c.push(d),B(1E3>++e,"infinite loop")}a=a.Y;d=b.type||b;q(b)?b=new Cb(b,a):b instanceof Cb?b.target=b.target||a:(e=b,b=new Cb(d,a),Ha(b,e));var e=!0,f;if(c)for(var g=c.length-1;0<=g;g--)f=b.a=c[g],e=yd(f,d,!0,b)&&e;f=b.a=a;e=yd(f,d,!0,b)&&e;e=yd(f,d,!1,b)&&e;if(c)for(g=0;g<c.length;g++)f=b.a=c[g],e=yd(f,d,!1,b)&&e};
	xd.prototype.C=function(){xd.I.C.call(this);if(this.b){var a=this.b,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,Eb(d[e]);delete a.a[c];a.b--}}this.G=null};var yd=function(a,b,c,d){b=a.b.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.O&&g.U==c){var h=g.listener,m=g.N||g.src;g.T&&Lb(a.b,g);e=!1!==h.call(m,d)&&e}}return e&&0!=d.ja},Uc=function(a){B(a.b,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var J=function(a,b){this.h=new $b;H.call(this,a,b)};u(J,H);k=J.prototype;k.W=function(a,b){if(!a)return J.I.W.call(this);Qb(this.h,n(b)?b:100,a);this.aa()};k.aa=function(){for(var a=this.h;0<a.b();){var b=this.W();if(b){var c;var d=a,e=d.a,f=e.length;c=e[0];if(0>=f)c=void 0;else{if(1==f)vb(e);else{e[0]=e.pop();for(var e=0,d=d.a,f=d.length,g=d[e];e<f>>1;){var h=2*e+1,m=2*e+2,h=m<f&&d[m].a<d[h].a?m:h;if(d[h].a>g.a)break;d[e]=d[h];e=h}d[e]=g}c=c.b}c.apply(this,[b])}else break}};
	k.$=function(a){J.I.$.call(this,a);this.aa()};k.S=function(){J.I.S.call(this);this.aa()};k.C=function(){J.I.C.call(this);l.clearTimeout(void 0);vb(this.h.a);this.h=null};var K=function(a,b){a&&a.log(sd,b,void 0)};var zd=function(a,b,c){if(r(a))c&&(a=t(a,c));else if(a&&"function"==typeof a.handleEvent)a=t(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)};var L=function(a){xd.call(this);this.headers=new F;this.B=a||null;this.c=!1;this.w=this.a=null;this.L=this.l="";this.J=0;this.h="";this.f=this.F=this.j=this.D=!1;this.i=0;this.m=null;this.R="";this.u=this.ca=this.X=!1};u(L,xd);var Ad=L.prototype,Bd=wd("goog.net.XhrIo");Ad.v=Bd;var Cd=/^https?$/i,Dd=["POST","PUT"];
	L.prototype.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.l+"; newUri="+a);b=b?b.toUpperCase():"GET";this.l=a;this.h="";this.J=0;this.L=b;this.D=!1;this.c=!0;this.a=this.B?this.B.a():Mb.a();this.w=this.B?mb(this.B):mb(Mb);this.a.onreadystatechange=t(this.P,this);this.ca&&"onprogress"in this.a&&(this.a.onprogress=t(function(a){this.M(a,!0)},this),this.a.upload&&(this.a.upload.onprogress=t(this.M,this)));try{K(this.v,M(this,"Opening Xhr")),
	this.F=!0,this.a.open(b,String(a),!0),this.F=!1}catch(f){K(this.v,M(this,"Error opening Xhr: "+f.message));Ed(this,f);return}a=c||"";var e=new F(this.headers);d&&Ub(d,function(a,b){e.set(b,a)});d=tb(e.H());c=l.FormData&&a instanceof l.FormData;!ub(Dd,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.R&&(this.a.responseType=this.R);"withCredentials"in this.a&&this.a.withCredentials!==this.X&&(this.a.withCredentials=
	this.X);try{Fd(this),0<this.i&&(this.u=Gd(this.a),K(this.v,M(this,"Will abort after "+this.i+"ms if incomplete, xhr2 "+this.u)),this.u?(this.a.timeout=this.i,this.a.ontimeout=t(this.K,this)):this.m=zd(this.K,this.i,this)),K(this.v,M(this,"Sending request")),this.j=!0,this.a.send(a),this.j=!1}catch(f){K(this.v,M(this,"Send error: "+f.message)),Ed(this,f)}};var Gd=function(a){return D&&E(9)&&"number"==typeof a.timeout&&n(a.ontimeout)},sb=function(a){return"content-type"==a.toLowerCase()};
	L.prototype.K=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.i+"ms, aborting",this.J=8,K(this.v,M(this,this.h)),I(this,"timeout"),Hd(this,8))};var Ed=function(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;a.J=5;Id(a);Jd(a)},Id=function(a){a.D||(a.D=!0,I(a,"complete"),I(a,"error"))},Hd=function(a,b){a.a&&a.c&&(K(a.v,M(a,"Aborting")),a.c=!1,a.f=!0,a.a.abort(),a.f=!1,a.J=b||7,I(a,"complete"),I(a,"abort"),Jd(a))};
	L.prototype.C=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),Jd(this,!0));L.I.C.call(this)};L.prototype.P=function(){this.g||(this.F||this.j||this.f?Kd(this):this.Z())};L.prototype.Z=function(){Kd(this)};
	var Kd=function(a){if(a.c&&"undefined"!=typeof aa)if(a.w[1]&&4==Ld(a)&&2==P(a))K(a.v,M(a,"Local request error detected and ignored"));else if(a.j&&4==Ld(a))zd(a.P,0,a);else if(I(a,"readystatechange"),4==Ld(a)){K(a.v,M(a,"Request complete"));a.c=!1;try{if(Md(a))I(a,"complete"),I(a,"success");else{a.J=6;var b;try{b=2<Ld(a)?a.a.statusText:""}catch(c){K(a.v,"Can not get status: "+c.message),b=""}a.h=b+" ["+P(a)+"]";Id(a)}}finally{Jd(a)}}};
	L.prototype.M=function(a,b){B("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");I(this,Nd(a,"progress"));I(this,Nd(a,b?"downloadprogress":"uploadprogress"))};
	var Nd=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Jd=function(a,b){if(a.a){Fd(a);var c=a.a,d=a.w[0]?ba:null;a.a=null;a.w=null;b||I(a,"ready");try{c.onreadystatechange=d}catch(e){(a=a.v)&&a.log(qd,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Fd=function(a){a.a&&a.u&&(a.a.ontimeout=null);"number"==typeof a.m&&(l.clearTimeout(a.m),a.m=null)},Md=function(a){var b=P(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=
	!0;break a;default:c=!1}if(!c){if(b=0===b)a=String(a.l).match(Fb)[1]||null,!a&&l.self&&l.self.location&&(a=l.self.location.protocol,a=a.substr(0,a.length-1)),b=!Cd.test(a?a.toLowerCase():"");c=b}return c},Ld=function(a){return a.a?a.a.readyState:0},P=function(a){try{return 2<Ld(a)?a.a.status:-1}catch(b){return-1}},Od=function(a){try{return a.a?a.a.responseText:""}catch(b){return K(a.v,"Can not get responseText: "+b.message),""}},Pd=function(a,b){return a.a&&4==Ld(a)?a.a.getResponseHeader(b):void 0},
	M=function(a,b){return b+" ["+a.L+" "+a.l+" "+P(a)+"]"};var Qd=function(a,b,c,d){this.u=a;this.w=!!d;J.call(this,b,c)};u(Qd,J);Qd.prototype.i=function(){var a=new L,b=this.u;b&&b.forEach(function(b,d){a.headers.set(d,b)});this.w&&(a.X=!0);return a};Qd.prototype.l=function(a){return!a.g&&!a.a};var fd=new Qd;var Sd=function(a,b,c,d,e,f,g,h,m,x,O){this.L=a;this.G=b;this.B=c;this.u=d;this.K=e.slice();this.m=f.slice();this.l=this.o=this.f=this.c=null;this.h=this.i=!1;this.w=g;this.j=h;this.g=x;this.M=O;this.F=m;var N=this;this.D=new G(function(a,b){N.o=a;N.l=b;Rd(N)})},Td=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Rd=function(a){function b(a,b){b?a(!1,new Td(!1,null,!0)):fd.W(function(b){b.X=d.M;d.c=b;var c=null;null!==d.g&&(b.ca=!0,c=Sc(b,"uploadprogress",function(a){d.g(a.loaded,a.lengthComputable?
	a.total:-1)}),b.ca=null!==d.g);b.send(d.L,d.G,d.u,d.B);$c(b,"complete",function(b){null!==c&&bd(c);d.c=null;b=b.target;var e=6===b.J&&100<=P(b),f=Md(b)||e,e=P(b);if(!(f=!f))var g=d,f=500<=e&&600>e,h=ub([408,429],e),g=ub(g.m,e),f=f||h||g;f?(e=7===b.J,gd(b),a(!1,new Td(!1,null,e))):(e=ub(d.K,e),a(!0,new Td(e,b)))})})}function c(a,b){var c=d.o;a=d.l;var e=b.c;if(b.b)try{var f=d.w(e,Od(e));n(f)?c(f):c()}catch(x){a(x)}else null!==e?(b=ma(),f=Od(e),b.serverResponse=f,d.j?a(d.j(e,b)):a(b)):(b=b.a?d.h?qa():
	na():new v("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),a(b));gd(e)}var d=a;a.i?c(0,new Td(!1,null,!0)):a.f=ka(b,c,a.F)};Sd.prototype.a=function(){return this.D};Sd.prototype.b=function(a){this.i=!0;this.h=a||!1;null!==this.f&&(0,this.f)(!1);null!==this.c&&Hd(this.c)};
	var Ud=function(a,b,c){var d=ab(a.b),d=a.i+d,e=a.headers?ta(a.headers):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/"+("undefined"!==typeof firebase?firebase.SDK_VERSION:"AppManager");return new Sd(d,a.method,e,a.body,a.f,a.g,a.N,a.a,a.h,a.c,c)};var Vd=function(a){var b=l.BlobBuilder||l.WebKitBlobBuilder;if(n(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=xb(arguments);c=l.BlobBuilder||l.WebKitBlobBuilder;if(n(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(n(l.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},Wd=function(a,b,c){n(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,c):a.mozSlice?a.mozSlice(b,
	c):a.slice?cc&&!E("13.0")||dc&&!E("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var Q=function(a,b){ya()&&a instanceof Blob?(this.s=a,b=a.size,a=a.type):(a instanceof ArrayBuffer?(b?this.s=new Uint8Array(a):(this.s=new Uint8Array(a.byteLength),this.s.set(new Uint8Array(a))),b=this.s.length):(b?this.s=a:(this.s=new Uint8Array(a.length),this.s.set(a)),b=a.length),a="");this.a=b;this.b=a};Q.prototype.type=function(){return this.b};
	Q.prototype.slice=function(a,b){if(ya()&&this.s instanceof Blob)return a=Wd(this.s,a,b),null===a?null:new Q(a);a=new Uint8Array(this.s.buffer,a,b-a);return new Q(a,!0)};
	var Xd=function(a){var b=[];Array.prototype.push.apply(b,arguments);if(ya())return b=qb(b,function(a){return a instanceof Q?a.s:a}),new Q(Vd.apply(null,b));var b=qb(b,function(a){return xa(a)?$a("raw",a).data.buffer:a.s.buffer}),c=0;ob(b,function(a){c+=a.byteLength});var d=new Uint8Array(c),e=0;ob(b,function(a){a=new Uint8Array(a);for(var b=0;b<a.length;b++)d[e++]=a[b]});return new Q(d,!0)};var Yd=function(a){this.c=Dc(a)};Yd.prototype.a=function(){return this.c};Yd.prototype.b=function(){};var Zd=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},$d=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)},ae=function(a){sa(a.a,function(a,c){c&&c.b(!0)});a.a={}};var be=function(a,b,c,d){this.a=a;this.g=null;if(null!==this.a&&(a=this.a.options,y(a))){a=a.storageBucket||null;if(null==a)a=null;else{var e=null;try{e=Sa(a)}catch(f){}if(null!==e){if(""!==e.path)throw new v("invalid-default-bucket","Invalid default bucket '"+a+"'.");a=e.bucket}}this.g=a}this.l=b;this.j=c;this.i=d;this.c=12E4;this.b=6E4;this.h=new Zd;this.f=!1},ce=function(a){return null!==a.a&&y(a.a.INTERNAL)&&y(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return y(a)?a.accessToken:
	null},function(){return null}):Cc(null)};be.prototype.bucket=function(){if(this.f)throw qa();return this.g};var R=function(a,b,c){if(a.f)return new Yd(qa());b=a.j(b,c,null===a.a);$d(a.h,b);return b};var de=function(a,b){return b},S=function(a,b,c,d){this.c=a;this.b=b||a;this.f=!!c;this.a=d||de},ee=null,fe=function(){if(ee)return ee;var a=[];a.push(new S("bucket"));a.push(new S("generation"));a.push(new S("metageneration"));a.push(new S("name","fullPath",!0));var b=new S("name");b.a=function(a,b){return!xa(b)||2>b.length?b:Hb(b)};a.push(b);b=new S("size");b.a=function(a,b){return y(b)?+b:b};a.push(b);a.push(new S("timeCreated"));a.push(new S("updated"));a.push(new S("md5Hash",null,!0));a.push(new S("cacheControl",
	null,!0));a.push(new S("contentDisposition",null,!0));a.push(new S("contentEncoding",null,!0));a.push(new S("contentLanguage",null,!0));a.push(new S("contentType",null,!0));a.push(new S("metadata","customMetadata",!0));a.push(new S("downloadTokens","downloadURLs",!1,function(a,b){if(!(xa(b)&&0<b.length))return[];var c=encodeURIComponent;return qb(b.split(","),function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+c(a.bucket)+"/o/"+c(d));b=ab({alt:"media",token:b});return d+
	b})}));return ee=a},ge=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.l(b,new z(a.bucket,a.fullPath))}})},he=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.f&&(c[f.c]=a[f.b])}return JSON.stringify(c)},ie=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b&&"object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}};var T=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new v("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw pa(f,a,g.message);throw pa(f,a,g);}},U=function(a,b){var c=this;this.a=function(b){c.b&&!n(b)||a(b)};
	this.b=!!b},je=function(a,b){return function(c){a(c);b(c)}},ke=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=je(c,a):d=c;return new U(d,b)},le=function(){return new U(function(a){if(!(a instanceof Uint8Array||a instanceof ArrayBuffer||ya()&&a instanceof Blob))throw"Expected Blob or File.";})},me=function(){return new U(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},ne=function(a,
	b){return new U(function(b){if(!(null===b||y(b)&&b instanceof Object))throw"Expected an Object.";y(a)&&a(b)},b)},oe=function(){return new U(function(a){if(null!==a&&!r(a))throw"Expected a Function.";},!0)};var pe=function(a){if(!a)throw ma();},qe=function(a,b){return function(c,d){a:{var e;try{e=JSON.parse(d)}catch(h){c=null;break a}c=ea(e)?e:null}if(null===c)c=null;else{d={type:"file"};e=b.length;for(var f=0;f<e;f++){var g=b[f];d[g.b]=g.a(d,c[g.c])}ge(d,a);c=d}pe(null!==c);return c}},re=function(a){return function(b,c){b=401===P(b)?new v("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===P(b)?new v("quota-exceeded","Quota for bucket '"+
	a.bucket+"' exceeded, please view quota on https://firebase.google.com/pricing/."):403===P(b)?new v("unauthorized","User does not have permission to access '"+a.path+"'."):c;b.serverResponse=c.serverResponse;return b}},se=function(a){var b=re(a);return function(c,d){var e=b(c,d);404===P(c)&&(e=new v("object-not-found","Object '"+a.path+"' does not exist."));e.serverResponse=d.serverResponse;return e}},te=function(a,b,c){var d=Ra(b);a=new w(la+"/v0"+d,"GET",qe(a,c),a.c);a.a=se(b);return a},ue=function(a,
	b){var c=Ra(b);a=new w(la+"/v0"+c,"DELETE",function(){},a.c);a.f=[200,204];a.a=se(b);return a},ve=function(a,b,c){c=c?ta(c):{};c.fullPath=a.path;c.size=b.a;c.contentType||(a=b&&b.type()||"application/octet-stream",c.contentType=a);return c},we=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var m=0;2>m;m++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+h;e=ve(b,d,e);m=he(e,c);d=Xd("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+
	m+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");if(null===d)throw oa();a=new w(la+"/v0"+f,"POST",qe(a,c),a.b);a.b={name:e.fullPath};a.headers=g;a.body=d.s;a.a=re(b);return a},xe=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},ye=function(a,b){var c;try{c=Pd(a,"X-Goog-Upload-Status")}catch(d){pe(!1)}pe(ub(b||["active"],c));return c},ze=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=ve(b,d,e);e={name:g.fullPath};f=la+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable",
	"X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.a,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=he(g,c);a=new w(f,"POST",function(a){ye(a);var b;try{b=Pd(a,"X-Goog-Upload-URL")}catch(x){pe(!1)}pe(xa(b));return b},a.b);a.b=e;a.headers=d;a.body=c;a.a=re(b);return a},Ae=function(a,b,c,d){a=new w(c,"POST",function(a){var b=ye(a,["active","final"]),c;try{c=Pd(a,"X-Goog-Upload-Size-Received")}catch(h){pe(!1)}a=c;isFinite(a)&&
	(a=String(a));a=q(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;pe(!isNaN(a));return new xe(a,d.a,"final"===b)},a.b);a.headers={"X-Goog-Upload-Command":"query"};a.a=re(b);return a},Be=function(a,b,c,d,e,f){var g=new xe(0,0);f?(g.a=f.a,g.total=f.total):(g.a=0,g.total=d.a);if(d.a!==g.total)throw new v("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var h=f=g.total-g.a,h=Math.min(h,262144),m=g.a;f={"X-Goog-Upload-Command":h===f?"upload, finalize":
	"upload","X-Goog-Upload-Offset":g.a};m=d.slice(m,m+h);if(null===m)throw oa();c=new w(c,"POST",function(a,c){var f=ye(a,["active","final"]),m=g.a+h,O=d.a,x;"final"===f?x=qe(b,e)(a,c):x=null;return new xe(m,O,"final"===f,x)},b.b);c.headers=f;c.body=m.s;c.c=null;c.a=re(a);return c};var W=function(a,b,c,d,e,f){this.K=a;this.c=b;this.i=c;this.f=e;this.h=f||null;this.o=d;this.j=0;this.G=this.m=!1;this.B=[];this.Z=262144<this.f.a;this.b="running";this.a=this.u=this.g=null;var g=this;this.V=function(a){g.a=null;"storage/canceled"===a.code?(g.m=!0,Ce(g)):(g.g=a,V(g,"error"))};this.Y=function(a){g.a=null;"storage/canceled"===a.code?Ce(g):(g.g=a,V(g,"error"))};this.w=this.l=null;this.F=new G(function(a,b){g.l=a;g.w=b;De(g)});this.F.then(null,function(){})},De=function(a){"running"===
	a.b&&null===a.a&&(a.Z?null===a.u?Ee(a):a.m?Fe(a):a.G?Ge(a):He(a):Ie(a))},Je=function(a,b){ce(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":V(a,"canceled");break;case "pausing":V(a,"paused")}})},Ee=function(a){Je(a,function(b){var c=ze(a.c,a.i,a.o,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.u=b;a.m=!1;Ce(a)},this.V)})},Fe=function(a){var b=a.u;Je(a,function(c){var d=Ae(a.c,a.i,b,a.f);a.a=R(a.c,d,c);a.a.a().then(function(b){a.a=null;Ke(a,b.a);a.m=!1;b.b&&
	(a.G=!0);Ce(a)},a.V)})},He=function(a){var b=new xe(a.j,a.f.a),c=a.u;Je(a,function(d){var e;try{e=Be(a.i,a.c,c,a.f,a.o,b)}catch(f){a.g=f;V(a,"error");return}a.a=R(a.c,e,d);a.a.a().then(function(b){a.a=null;Ke(a,b.a);b.b?(a.h=b.c,V(a,"success")):Ce(a)},a.V)})},Ge=function(a){Je(a,function(b){var c=te(a.c,a.i,a.o);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;V(a,"success")},a.Y)})},Ie=function(a){Je(a,function(b){var c=we(a.c,a.i,a.o,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;
	a.h=b;Ke(a,a.f.a);V(a,"success")},a.V)})},Ke=function(a,b){var c=a.j;a.j=b;a.j>c&&Le(a)},V=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.b();break;case "pausing":a.b=b;null!==a.a&&a.a.b();break;case "running":var c="paused"===a.b;a.b=b;c&&(Le(a),De(a));break;case "paused":a.b=b;Le(a);break;case "canceled":a.g=na();a.b=b;Le(a);break;case "error":a.b=b;Le(a);break;case "success":a.b=b,Le(a)}},Ce=function(a){switch(a.b){case "pausing":V(a,"paused");break;case "canceling":V(a,
	"canceled");break;case "running":De(a)}};W.prototype.D=function(){return new A(this.j,this.f.a,wa(this.b),this.h,this,this.K)};
	W.prototype.M=function(a,b,c,d){function e(a){try{g(a);return}catch(N){}try{if(h(a),!(n(a.next)||n(a.error)||n(a.complete)))throw"";}catch(N){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&T("on",a,arguments);var e=new Ta(b,c,d);Me(m,e);return function(){wb(m.B,e)}}}var g=oe().a,h=ne(null,!0).a;T("on",[ke(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";}),ne(e,!0),
	oe(),oe()],arguments);var m=this,x=[ne(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),oe(),oe()];return n(b)||n(c)||n(d)?f(null)(b,c,d):f(x)};W.prototype.then=function(a,b){return this.F.then(a,b)};
	var Me=function(a,b){a.B.push(b);Ne(a,b)},Le=function(a){Oe(a);var b=xb(a.B);ob(b,function(b){Ne(a,b)})},Oe=function(a){if(null!==a.l){var b=!0;switch(wa(a.b)){case "success":Oc(a.l.bind(null,a.D()))();break;case "canceled":case "error":Oc(a.w.bind(null,a.g))();break;default:b=!1}b&&(a.l=null,a.w=null)}},Ne=function(a,b){switch(wa(a.b)){case "running":case "paused":null!==b.next&&Oc(b.next.bind(b,a.D()))();break;case "success":null!==b.b&&Oc(b.b.bind(b))();break;case "canceled":case "error":null!==
	b.a&&Oc(b.a.bind(b,a.g))();break;default:null!==b.a&&Oc(b.a.bind(b,a.g))()}};W.prototype.R=function(){T("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&V(this,"running");return a};W.prototype.P=function(){T("pause",[],arguments);var a="running"===this.b;a&&V(this,"pausing");return a};W.prototype.L=function(){T("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&V(this,"canceling");return a};var X=function(a,b){this.b=a;if(b)this.a=b instanceof z?b:Sa(b);else if(a=a.bucket(),null!==a)this.a=new z(a,"");else throw new v("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");};X.prototype.toString=function(){T("toString",[],arguments);return"gs://"+this.a.bucket+"/"+this.a.path};var Pe=function(a,b){return new X(a,b)};k=X.prototype;
	k.fa=function(a){T("child",[ke()],arguments);var b=Gb(this.a.path,a);return Pe(this.b,new z(this.a.bucket,b))};k.Da=function(){var a;a=this.a.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Pe(this.b,new z(this.a.bucket,a))};k.Fa=function(){return Pe(this.b,new z(this.a.bucket,""))};k.ma=function(){return this.a.bucket};k.ya=function(){return this.a.path};k.Ca=function(){return Hb(this.a.path)};k.Ha=function(){return this.b.i};
	k.ra=function(a,b){T("put",[le(),new U(ie,!0)],arguments);Qe(this,"put");return new W(this,this.b,this.a,fe(),new Q(a),b)};k.sa=function(a,b,c){T("putString",[ke(),ke(Va,!0),new U(ie,!0)],arguments);Qe(this,"putString");var d=$a(y(b)?b:"raw",a),e=c?ta(c):{};!y(e.contentType)&&y(d.a)&&(e.contentType=d.a);return new W(this,this.b,this.a,fe(),new Q(d.data,!0),e)};
	k.delete=function(){T("delete",[],arguments);Qe(this,"delete");var a=this;return ce(this.b).then(function(b){var c=ue(a.b,a.a);return R(a.b,c,b).a()})};k.ga=function(){T("getMetadata",[],arguments);Qe(this,"getMetadata");var a=this;return ce(this.b).then(function(b){var c=te(a.b,a.a,fe());return R(a.b,c,b).a()})};
	k.ta=function(a){T("updateMetadata",[new U(ie,void 0)],arguments);Qe(this,"updateMetadata");var b=this;return ce(this.b).then(function(c){var d=b.b,e=b.a,f=a,g=fe(),h=Ra(e),h=la+"/v0"+h,f=he(f,g),d=new w(h,"PATCH",qe(d,g),d.c);d.headers={"Content-Type":"application/json; charset=utf-8"};d.body=f;d.a=se(e);return R(b.b,d,c).a()})};
	k.qa=function(){T("getDownloadURL",[],arguments);Qe(this,"getDownloadURL");return this.ga().then(function(a){a=a.downloadURLs[0];if(y(a))return a;throw new v("no-download-url","The given file does not have any download URLs.");})};var Qe=function(a,b){if(""===a.a.path)throw new v("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a){this.a=new be(a,function(a,c){return new X(a,c)},Ud,this);this.b=a;this.c=new Re(this)};k=Y.prototype;k.ua=function(a){T("ref",[ke(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new X(this.a);return n(a)?b.fa(a):b};
	k.va=function(a){T("refFromURL",[ke(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Sa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new X(this.a,a)};k.Aa=function(){return this.a.b};k.xa=function(a){T("setMaxUploadRetryTime",[me()],arguments);this.a.b=a};k.za=function(){return this.a.c};k.wa=function(a){T("setMaxOperationRetryTime",[me()],arguments);this.a.c=a};k.la=function(){return this.b};
	k.ka=function(){return this.c};var Re=function(a){this.a=a};Re.prototype.delete=function(){var a=this.a.a;a.f=!0;a.a=null;ae(a.h)};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};X.prototype.toString=X.prototype.toString;X.prototype.child=X.prototype.fa;X.prototype.put=X.prototype.ra;X.prototype.putString=X.prototype.sa;X.prototype["delete"]=X.prototype.delete;X.prototype.getMetadata=X.prototype.ga;X.prototype.updateMetadata=X.prototype.ta;X.prototype.getDownloadURL=X.prototype.qa;Z(X.prototype,"parent",X.prototype.Da);Z(X.prototype,"root",X.prototype.Fa);Z(X.prototype,"bucket",X.prototype.ma);
	Z(X.prototype,"fullPath",X.prototype.ya);Z(X.prototype,"name",X.prototype.Ca);Z(X.prototype,"storage",X.prototype.Ha);Y.prototype.ref=Y.prototype.ua;Y.prototype.refFromURL=Y.prototype.va;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.za);Y.prototype.setMaxOperationRetryTime=Y.prototype.wa;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.Aa);Y.prototype.setMaxUploadRetryTime=Y.prototype.xa;Z(Y.prototype,"app",Y.prototype.la);Z(Y.prototype,"INTERNAL",Y.prototype.ka);Re.prototype["delete"]=Re.prototype.delete;
	Y.prototype.capi_=function(a){la=a};W.prototype.on=W.prototype.M;W.prototype.resume=W.prototype.R;W.prototype.pause=W.prototype.P;W.prototype.cancel=W.prototype.L;Z(W.prototype,"snapshot",W.prototype.D);Z(A.prototype,"bytesTransferred",A.prototype.na);Z(A.prototype,"totalBytes",A.prototype.Ja);Z(A.prototype,"state",A.prototype.Ga);Z(A.prototype,"metadata",A.prototype.Ba);Z(A.prototype,"downloadURL",A.prototype.pa);Z(A.prototype,"task",A.prototype.Ia);Z(A.prototype,"ref",A.prototype.Ea);
	ua.STATE_CHANGED="state_changed";va.RUNNING="running";va.PAUSED="paused";va.SUCCESS="success";va.CANCELED="canceled";va.ERROR="error";Ua.RAW="raw";Ua.BASE64="base64";Ua.BASE64URL="base64url";Ua.DATA_URL="data_url";G.prototype["catch"]=G.prototype.l;G.prototype.then=G.prototype.then;
	(function(){function a(a){return new Y(a)}var b={TaskState:va,TaskEvent:ua,StringFormat:Ua,Storage:Y,Reference:X};if("undefined"!==typeof firebase)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();})();
	module.exports = firebase.storage;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _virtualDom = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var View = function (_Backbone$View) {
	  _inherits(View, _Backbone$View);
	
	  function View() {
	    _classCallCheck(this, View);
	
	    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
	  }
	
	  _createClass(View, [{
	    key: 'update',
	    value: function update() {
	      var tree = this.template;
	      var patches = (0, _virtualDom.diff)(this.tree, tree);
	      (0, _virtualDom.patch)(this.rootNode, patches);
	      this.tree = tree;
	    }
	  }, {
	    key: 'attach',
	    value: function attach() {
	      this.tree = this.template;
	      this.rootNode = (0, _virtualDom.create)(this.tree);
	      if (this.el.parentNode) {
	        return this.el.appendChild(this.rootNode);
	      }
	      return this.tree;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log('render', this);
	      if (this.rootNode) {
	        return this.update();
	      }
	      return this.attach();
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _virtualDom.h)('div');
	    }
	  }]);
	
	  return View;
	}(Backbone.View);
	
	exports.default = View;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(16)
	var patch = __webpack_require__(29)
	var h = __webpack_require__(38)
	var create = __webpack_require__(49)
	var VNode = __webpack_require__(40)
	var VText = __webpack_require__(41)
	
	module.exports = {
	    diff: diff,
	    patch: patch,
	    h: h,
	    create: create,
	    VNode: VNode,
	    VText: VText
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(17)
	
	module.exports = diff


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(18)
	
	var VPatch = __webpack_require__(19)
	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(22)
	var isWidget = __webpack_require__(23)
	var isThunk = __webpack_require__(24)
	var handleThunk = __webpack_require__(25)
	
	var diffProps = __webpack_require__(26)
	
	module.exports = diff
	
	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}
	
	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }
	
	    var apply = patch[index]
	    var applyClear = false
	
	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {
	
	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }
	
	    if (apply) {
	        patch[index] = apply
	    }
	
	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}
	
	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children
	
	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen
	
	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1
	
	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }
	
	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }
	
	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }
	
	    return apply
	}
	
	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}
	
	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1
	
	            destroyWidgets(child, patch, index)
	
	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}
	
	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }
	
	    return false
	}
	
	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }
	
	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1
	
	                unhook(child, patch, index)
	
	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	function undefinedKeys(obj) {
	    var result = {}
	
	    for (var key in obj) {
	        result[key] = undefined
	    }
	
	    return result
	}
	
	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free
	
	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free
	
	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(MAX(N, M)) memory
	    var newChildren = []
	
	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0
	
	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex
	
	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])
	
	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }
	
	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]
	
	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]
	
	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }
	
	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem
	
	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]
	
	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }
	
	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }
	
	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }
	
	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }
	
	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}
	
	function remove(arr, index, key) {
	    arr.splice(index, 1)
	
	    return {
	        from: index,
	        key: key
	    }
	}
	
	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length
	
	    for (var i = 0; i < length; i++) {
	        var child = children[i]
	
	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }
	
	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}
	
	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }
	
	        return apply
	    } else {
	        return patch
	    }
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString
	
	module.exports = nativeIsArray || isArray
	
	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8
	
	module.exports = VirtualPatch
	
	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}
	
	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "2"


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = isVirtualNode
	
	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = isVirtualText
	
	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = isWidget
	
	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = isThunk
	
	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(22)
	var isWidget = __webpack_require__(23)
	var isThunk = __webpack_require__(24)
	
	module.exports = handleThunk
	
	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b
	
	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }
	
	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }
	
	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}
	
	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode
	
	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }
	
	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }
	
	    return renderedThunk
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27)
	var isHook = __webpack_require__(28)
	
	module.exports = diffProps
	
	function diffProps(a, b) {
	    var diff
	
	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }
	
	        var aValue = a[aKey]
	        var bValue = b[aKey]
	
	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }
	
	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }
	
	    return diff
	}
	
	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = isHook
	
	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var patch = __webpack_require__(30)
	
	module.exports = patch


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(31)
	var isArray = __webpack_require__(18)
	
	var render = __webpack_require__(33)
	var domIndex = __webpack_require__(35)
	var patchOp = __webpack_require__(36)
	module.exports = patch
	
	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
	        ? renderOptions.patch
	        : patchRecursive
	    renderOptions.render = renderOptions.render || render
	
	    return renderOptions.patch(rootNode, patches, renderOptions)
	}
	
	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)
	
	    if (indices.length === 0) {
	        return rootNode
	    }
	
	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument
	
	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }
	
	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }
	
	    return rootNode
	}
	
	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }
	
	    var newNode
	
	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)
	
	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)
	
	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }
	
	    return rootNode
	}
	
	function patchIndices(patches) {
	    var indices = []
	
	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }
	
	    return indices
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(32);
	
	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
	
	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	
	    module.exports = doccy;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(31)
	
	var applyProperties = __webpack_require__(34)
	
	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(22)
	var isWidget = __webpack_require__(23)
	var handleThunk = __webpack_require__(25)
	
	module.exports = createElement
	
	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null
	
	    vnode = handleThunk(vnode).a
	
	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }
	
	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)
	
	    var props = vnode.properties
	    applyProperties(node, props)
	
	    var children = vnode.children
	
	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }
	
	    return node
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27)
	var isHook = __webpack_require__(28)
	
	module.exports = applyProperties
	
	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]
	
	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}
	
	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]
	
	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}
	
	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined
	
	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]
	
	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }
	
	        return
	    }
	
	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }
	
	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }
	
	    var replacer = propName === "style" ? "" : undefined
	
	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}
	
	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.
	
	var noChild = {}
	
	module.exports = domIndex
	
	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}
	
	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}
	
	
	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }
	
	        var vChildren = tree.children
	
	        if (vChildren) {
	
	            var childNodes = rootNode.childNodes
	
	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1
	
	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)
	
	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }
	
	                rootIndex = nextIndex
	            }
	        }
	    }
	
	    return nodes
	}
	
	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }
	
	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem
	
	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]
	
	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }
	
	    return false;
	}
	
	function ascending(a, b) {
	    return a > b ? 1 : -1
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var applyProperties = __webpack_require__(34)
	
	var isWidget = __webpack_require__(23)
	var VPatch = __webpack_require__(19)
	
	var updateWidget = __webpack_require__(37)
	
	module.exports = applyPatch
	
	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch
	
	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}
	
	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode
	
	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }
	
	    destroyWidget(domNode, vNode);
	
	    return null
	}
	
	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }
	
	    return parentNode
	}
	
	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode
	
	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)
	
	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }
	
	    return newNode
	}
	
	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode
	
	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }
	
	    var parentNode = domNode.parentNode
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }
	
	    return newNode
	}
	
	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    return newNode
	}
	
	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}
	
	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert
	
	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }
	
	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}
	
	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }
	
	    return newRoot;
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isWidget = __webpack_require__(23)
	
	module.exports = updateWidget
	
	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }
	
	    return false
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(39)
	
	module.exports = h


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArray = __webpack_require__(18);
	
	var VNode = __webpack_require__(40);
	var VText = __webpack_require__(41);
	var isVNode = __webpack_require__(21);
	var isVText = __webpack_require__(22);
	var isWidget = __webpack_require__(23);
	var isHook = __webpack_require__(28);
	var isVThunk = __webpack_require__(24);
	
	var parseTag = __webpack_require__(42);
	var softSetHook = __webpack_require__(44);
	var evHook = __webpack_require__(45);
	
	module.exports = h;
	
	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;
	
	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }
	
	    props = props || properties || {};
	    tag = parseTag(tagName, props);
	
	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }
	
	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }
	
	    // fix cursor bug
	    if (tag === 'INPUT' &&
	        !namespace &&
	        props.hasOwnProperty('value') &&
	        props.value !== undefined &&
	        !isHook(props.value)
	    ) {
	        props.value = softSetHook(props.value);
	    }
	
	    transformProperties(props);
	
	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }
	
	
	    return new VNode(tag, props, childNodes, key, namespace);
	}
	
	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}
	
	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];
	
	            if (isHook(value)) {
	                continue;
	            }
	
	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}
	
	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}
	
	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}
	
	function UnexpectedVirtualElement(data) {
	    var err = new Error();
	
	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' +
	        'Expected a VNode / Vthunk / VWidget / string but:\n' +
	        'got:\n' +
	        errorString(data.foreignObject) +
	        '.\n' +
	        'The parent vnode is:\n' +
	        errorString(data.parentVnode)
	        '\n' +
	        'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;
	
	    return err;
	}
	
	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	var isVNode = __webpack_require__(21)
	var isWidget = __webpack_require__(23)
	var isThunk = __webpack_require__(24)
	var isVHook = __webpack_require__(28)
	
	module.exports = VirtualNode
	
	var noProperties = {}
	var noChildren = []
	
	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null
	
	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks
	
	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }
	
	                hooks[propName] = property
	            }
	        }
	    }
	
	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0
	
	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }
	
	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }
	
	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }
	
	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}
	
	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = VirtualText
	
	function VirtualText(text) {
	    this.text = String(text)
	}
	
	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var split = __webpack_require__(43);
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	module.exports = parseTag;
	
	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }
	
	    var noId = !(props.hasOwnProperty('id'));
	
	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;
	
	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }
	
	    var classes, part, type, i;
	
	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];
	
	        if (!part) {
	            continue;
	        }
	
	        type = part.charAt(0);
	
	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }
	
	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }
	
	        props.className = classes.join(' ');
	    }
	
	    return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = SoftSetHook;
	
	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }
	
	    this.value = value;
	}
	
	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EvStore = __webpack_require__(46);
	
	module.exports = EvHook;
	
	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }
	
	    this.value = value;
	}
	
	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = this.value;
	};
	
	EvHook.prototype.unhook = function(node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = undefined;
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var OneVersionConstraint = __webpack_require__(47);
	
	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);
	
	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;
	
	module.exports = EvStore;
	
	function EvStore(elem) {
	    var hash = elem[hashKey];
	
	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }
	
	    return hash;
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Individual = __webpack_require__(48);
	
	module.exports = OneVersion;
	
	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';
	
	    var versionValue = Individual(enforceKey, version);
	
	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }
	
	    return Individual(key, defaultValue);
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*global window, global*/
	
	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};
	
	module.exports = Individual;
	
	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }
	
	    root[key] = value;
	
	    return value;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var createElement = __webpack_require__(33)
	
	module.exports = createElement


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _virtualDom = __webpack_require__(15);
	
	var _view = __webpack_require__(14);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _team = __webpack_require__(51);
	
	var _team2 = _interopRequireDefault(_team);
	
	var _player = __webpack_require__(53);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _utils = __webpack_require__(73);
	
	var _translate = __webpack_require__(54);
	
	var _translate2 = _interopRequireDefault(_translate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayersTable = function (_View) {
	  _inherits(PlayersTable, _View);
	
	  function PlayersTable() {
	    _classCallCheck(this, PlayersTable);
	
	    return _possibleConstructorReturn(this, (PlayersTable.__proto__ || Object.getPrototypeOf(PlayersTable)).apply(this, arguments));
	  }
	
	  _createClass(PlayersTable, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.collection = new _team2.default();
	      this.collection.fetch();
	      this.listenTo(this.collection, 'update', this.render);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var tree = this.template;
	      var patches = (0, _virtualDom.diff)(this.tree, tree);
	      (0, _virtualDom.patch)(this.rootNode, patches);
	      this.tree = tree;
	    }
	  }, {
	    key: 'addPlayer',
	    value: function addPlayer(e) {
	      e.preventDefault();
	      var data = (0, _utils.serializeObject)(e.target);
	      if (!data.playersName) return;
	      localStorage.setItem('myName', data.playersName);
	      localStorage.setItem('aggreeToGo', true);
	      e.target.reset();
	      this.collection.create(data);
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _virtualDom.h)('div.play-team', [(0, _virtualDom.h)('h1', [(0, _virtualDom.h)('span', _translate2.default.t('Football match process')), this.collection.matchDate ? (0, _virtualDom.h)('span', this.collection.matchDate) : (0, _virtualDom.h)('span', { onclick: this.initMatch.bind(this) }, '+')]),
	      // h('ol.players-list', this.collection.map(model => new PlayerView({ model }).render())),
	      (0, _virtualDom.h)('ol.players-list', this.collection.map(function () {
	        console.log('aaa');
	        return (0, _virtualDom.h)('li', 'test');
	      })), localStorage.getItem('aggreeToGo') ? null : (0, _virtualDom.h)('form', { onsubmit: this.addPlayer.bind(this) }, [(0, _virtualDom.h)('input', {
	        style: localStorage.getItem('myName') ? {
	          visibility: 'hidden',
	          height: 0,
	          width: 0
	        } : {},
	        type: 'text',
	        name: 'playersName',
	        placeholder: _translate2.default.t('Type your name'),
	        value: localStorage.getItem('myName')
	      }), (0, _virtualDom.h)('button.submit-go', _translate2.default.t('submit go'))])]);
	    }
	  }]);
	
	  return PlayersTable;
	}(_view2.default);
	
	exports.default = PlayersTable;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, fetch) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player = __webpack_require__(52);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TeamCollection = function (_Backbone$Collection) {
	  _inherits(TeamCollection, _Backbone$Collection);
	
	  function TeamCollection() {
	    _classCallCheck(this, TeamCollection);
	
	    return _possibleConstructorReturn(this, (TeamCollection.__proto__ || Object.getPrototypeOf(TeamCollection)).apply(this, arguments));
	  }
	
	  _createClass(TeamCollection, [{
	    key: 'initMatch',
	    value: function initMatch() {
	      fetch(this.urlBase + '.json', {
	        method: 'POST',
	        body: {}
	      });
	    }
	  }, {
	    key: 'parse',
	    value: function parse(data) {
	      return Object.keys(data).map(function (key) {
	        return Object.assign({}, { name: key }, data[key]);
	      });
	    }
	  }, {
	    key: 'apiBase',
	    get: function get() {
	      return 'https://footballgo-fcfc3.firebaseio.com';
	    }
	  }, {
	    key: 'urlBase',
	    get: function get() {
	      return this.apiBase + '/players/' + this.matchDate;
	    }
	  }, {
	    key: 'url',
	    get: function get() {
	      return this.urlBase + '.json';
	    }
	  }, {
	    key: 'matchDate',
	    get: function get() {
	      return TeamCollection.formatDate(TeamCollection.nextWednesday);
	    }
	  }, {
	    key: 'model',
	    get: function get() {
	      return _player2.default;
	    }
	  }], [{
	    key: 'formatDate',
	    value: function formatDate(date) {
	      var dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
	
	      return dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
	    }
	  }, {
	    key: 'nextWednesday',
	    get: function get() {
	      var todayDay = new Date().getDay();
	      var today = new Date();
	
	      var dayDelta = function dayDelta() {
	        if (todayDay < 4) return 3 - todayDay;
	        return 10 - todayDay;
	      };
	
	      return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDelta());
	    }
	  }]);
	
	  return TeamCollection;
	}(Backbone.Collection);
	
	exports.default = TeamCollection;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerModel = function (_Backbone$Model) {
	  _inherits(PlayerModel, _Backbone$Model);
	
	  function PlayerModel() {
	    _classCallCheck(this, PlayerModel);
	
	    return _possibleConstructorReturn(this, (PlayerModel.__proto__ || Object.getPrototypeOf(PlayerModel)).apply(this, arguments));
	  }
	
	  _createClass(PlayerModel, [{
	    key: 'url',
	    value: function url() {
	      return '' + this.collection.urlBase + (this.get(this.idAttribute) ? '/' + this.get(this.idAttribute) : '') + '.json';
	    }
	  }, {
	    key: 'defaults',
	    get: function get() {
	      return {
	        playersName: 'Ronaldo',
	        flag: 'ru'
	      };
	    }
	  }, {
	    key: 'idAttribute',
	    get: function get() {
	      return 'name';
	    }
	  }]);
	
	  return PlayerModel;
	}(Backbone.Model);
	
	exports.default = PlayerModel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _virtualDom = __webpack_require__(15);
	
	var _view = __webpack_require__(14);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _translate = __webpack_require__(54);
	
	var _translate2 = _interopRequireDefault(_translate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerView = function (_View) {
	  _inherits(PlayerView, _View);
	
	  function PlayerView() {
	    _classCallCheck(this, PlayerView);
	
	    return _possibleConstructorReturn(this, (PlayerView.__proto__ || Object.getPrototypeOf(PlayerView)).apply(this, arguments));
	  }
	
	  _createClass(PlayerView, [{
	    key: 'onRemove',
	    value: function onRemove() {
	      localStorage.removeItem('aggreeToGo');
	      this.model.destroy();
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _virtualDom.h)('li.player', { key: this.model.get('name') }, [(0, _virtualDom.h)('span', this.model.get('playersName')), (0, _virtualDom.h)('div.remove', { onclick: this.onRemove.bind(this) }, _translate2.default.t('wont go'))]);
	    }
	  }]);
	
	  return PlayerView;
	}(_view2.default);
	
	exports.default = PlayerView;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _i18next = __webpack_require__(55);
	
	var _i18next2 = _interopRequireDefault(_i18next);
	
	var _en = __webpack_require__(71);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _ru = __webpack_require__(72);
	
	var _ru2 = _interopRequireDefault(_ru);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_i18next2.default.init({
	  lng: 'ru-RU',
	  fallbackLng: 'en',
	  resources: {
	    en: _en2.default,
	    ru: _ru2.default
	  }
	});
	
	exports.default = _i18next2.default;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(56).default;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _i18next = __webpack_require__(57);
	
	var _i18next2 = _interopRequireDefault(_i18next);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _i18next2.default;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _EventEmitter2 = __webpack_require__(59);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	var _ResourceStore = __webpack_require__(60);
	
	var _ResourceStore2 = _interopRequireDefault(_ResourceStore);
	
	var _Translator = __webpack_require__(62);
	
	var _Translator2 = _interopRequireDefault(_Translator);
	
	var _LanguageUtils = __webpack_require__(65);
	
	var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);
	
	var _PluralResolver = __webpack_require__(66);
	
	var _PluralResolver2 = _interopRequireDefault(_PluralResolver);
	
	var _Interpolator = __webpack_require__(67);
	
	var _Interpolator2 = _interopRequireDefault(_Interpolator);
	
	var _BackendConnector = __webpack_require__(68);
	
	var _BackendConnector2 = _interopRequireDefault(_BackendConnector);
	
	var _CacheConnector = __webpack_require__(69);
	
	var _CacheConnector2 = _interopRequireDefault(_CacheConnector);
	
	var _defaults2 = __webpack_require__(70);
	
	var _postProcessor = __webpack_require__(63);
	
	var _postProcessor2 = _interopRequireDefault(_postProcessor);
	
	var _v = __webpack_require__(64);
	
	var compat = _interopRequireWildcard(_v);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var I18n = function (_EventEmitter) {
	  _inherits(I18n, _EventEmitter);
	
	  function I18n() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	
	    _classCallCheck(this, I18n);
	
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
	
	    _this.options = (0, _defaults2.transformOptions)(options);
	    _this.services = {};
	    _this.logger = _logger2.default;
	    _this.modules = {};
	
	    if (callback && !_this.isInitialized) _this.init(options, callback);
	    return _this;
	  }
	
	  I18n.prototype.init = function init(options, callback) {
	    var _this2 = this;
	
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};
	
	    if (options.compatibilityAPI === 'v1') {
	      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertAPIOptions(options)), {});
	    } else if (options.compatibilityJSON === 'v1') {
	      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertJSONOptions(options)), {});
	    } else {
	      this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));
	    }
	    if (!callback) callback = function callback() {};
	
	    function createClassOnDemand(ClassOrObject) {
	      if (!ClassOrObject) return;
	      if (typeof ClassOrObject === 'function') return new ClassOrObject();
	      return ClassOrObject;
	    }
	
	    // init services
	    if (!this.options.isClone) {
	      if (this.modules.logger) {
	        _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
	      } else {
	        _logger2.default.init(null, this.options);
	      }
	
	      var lu = new _LanguageUtils2.default(this.options);
	      this.store = new _ResourceStore2.default(this.options.resources, this.options);
	
	      var s = this.services;
	      s.logger = _logger2.default;
	      s.resourceStore = this.store;
	      s.resourceStore.on('added removed', function (lng, ns) {
	        s.cacheConnector.save();
	      });
	      s.languageUtils = lu;
	      s.pluralResolver = new _PluralResolver2.default(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
	      s.interpolator = new _Interpolator2.default(this.options);
	
	      s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.backendConnector.on('*', function (event) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	
	      s.backendConnector.on('loaded', function (loaded) {
	        s.cacheConnector.save();
	      });
	
	      s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.cacheConnector.on('*', function (event) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }
	
	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	
	      if (this.modules.languageDetector) {
	        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
	        s.languageDetector.init(s, this.options.detection, this.options);
	      }
	
	      this.translator = new _Translator2.default(this.services, this.options);
	      // pipe events from translator
	      this.translator.on('*', function (event) {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }
	
	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	    }
	
	    // append api
	    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
	    storeApi.forEach(function (fcName) {
	      _this2[fcName] = function () {
	        return this.store[fcName].apply(this.store, arguments);
	      };
	    });
	
	    // TODO: COMPATIBILITY remove this
	    if (this.options.compatibilityAPI === 'v1') compat.appendBackwardsAPI(this);
	
	    var load = function load() {
	      _this2.changeLanguage(_this2.options.lng, function (err, t) {
	        _this2.emit('initialized', _this2.options);
	        _this2.logger.log('initialized', _this2.options);
	
	        callback(err, t);
	      });
	    };
	
	    if (this.options.resources || !this.options.initImmediate) {
	      load();
	    } else {
	      setTimeout(load, 0);
	    }
	
	    return this;
	  };
	
	  I18n.prototype.loadResources = function loadResources(callback) {
	    var _this3 = this;
	
	    if (!callback) callback = function callback() {};
	
	    if (!this.options.resources) {
	      var _ret = function () {
	        if (_this3.language && _this3.language.toLowerCase() === 'cimode') return {
	            v: callback()
	          }; // avoid loading resources for cimode
	
	        var toLoad = [];
	
	        var append = function append(lng) {
	          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
	          lngs.forEach(function (l) {
	            if (toLoad.indexOf(l) < 0) toLoad.push(l);
	          });
	        };
	
	        append(_this3.language);
	
	        if (_this3.options.preload) {
	          _this3.options.preload.forEach(function (l) {
	            append(l);
	          });
	        }
	
	        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
	          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
	        });
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      callback(null);
	    }
	  };
	
	  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
	    if (!lngs) lngs = this.languages;
	    if (!ns) ns = this.options.ns;
	    this.services.backendConnector.reload(lngs, ns);
	  };
	
	  I18n.prototype.use = function use(module) {
	    if (module.type === 'backend') {
	      this.modules.backend = module;
	    }
	
	    if (module.type === 'cache') {
	      this.modules.cache = module;
	    }
	
	    if (module.type === 'logger' || module.log && module.warn && module.warn) {
	      this.modules.logger = module;
	    }
	
	    if (module.type === 'languageDetector') {
	      this.modules.languageDetector = module;
	    }
	
	    if (module.type === 'postProcessor') {
	      _postProcessor2.default.addPostProcessor(module);
	    }
	
	    return this;
	  };
	
	  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
	    var _this4 = this;
	
	    var done = function done(err) {
	      if (lng) {
	        _this4.emit('languageChanged', lng);
	        _this4.logger.log('languageChanged', lng);
	      }
	
	      if (callback) callback(err, function () {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }
	
	        return _this4.t.apply(_this4, args);
	      });
	    };
	
	    if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();
	
	    if (lng) {
	      this.language = lng;
	      this.languages = this.services.languageUtils.toResolveHierarchy(lng);
	
	      this.translator.changeLanguage(lng);
	
	      if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
	    }
	
	    this.loadResources(function (err) {
	      done(err);
	    });
	  };
	
	  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
	    var _this5 = this;
	
	    var fixedT = function fixedT(key, options) {
	      options = options || {};
	      options.lng = options.lng || fixedT.lng;
	      options.ns = options.ns || fixedT.ns;
	      return _this5.t(key, options);
	    };
	    fixedT.lng = lng;
	    fixedT.ns = ns;
	    return fixedT;
	  };
	
	  I18n.prototype.t = function t() {
	    return this.translator && this.translator.translate.apply(this.translator, arguments);
	  };
	
	  I18n.prototype.exists = function exists() {
	    return this.translator && this.translator.exists.apply(this.translator, arguments);
	  };
	
	  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
	    this.options.defaultNS = ns;
	  };
	
	  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
	    var _this6 = this;
	
	    if (!this.options.ns) return callback && callback();
	    if (typeof ns === 'string') ns = [ns];
	
	    ns.forEach(function (n) {
	      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
	    });
	
	    this.loadResources(callback);
	  };
	
	  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
	    if (typeof lngs === 'string') lngs = [lngs];
	    var preloaded = this.options.preload || [];
	
	    var newLngs = lngs.filter(function (lng) {
	      return preloaded.indexOf(lng) < 0;
	    });
	    // Exit early if all given languages are already preloaded
	    if (!newLngs.length) return callback();
	
	    this.options.preload = preloaded.concat(newLngs);
	    this.loadResources(callback);
	  };
	
	  I18n.prototype.dir = function dir(lng) {
	    if (!lng) lng = this.language;
	    if (!lng) return 'rtl';
	
	    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
	
	    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
	  };
	
	  I18n.prototype.createInstance = function createInstance() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	
	    return new I18n(options, callback);
	  };
	
	  I18n.prototype.cloneInstance = function cloneInstance() {
	    var _this7 = this;
	
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	
	    var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
	    var membersToCopy = ['store', 'translator', 'services', 'language'];
	    membersToCopy.forEach(function (m) {
	      clone[m] = _this7[m];
	    });
	
	    return clone;
	  };
	
	  return I18n;
	}(_EventEmitter3.default);
	
	exports.default = new I18n();

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var consoleLogger = {
	  type: 'logger',
	
	  log: function log(args) {
	    this._output('log', args);
	  },
	  warn: function warn(args) {
	    this._output('warn', args);
	  },
	  error: function error(args) {
	    this._output('error', args);
	  },
	  _output: function _output(type, args) {
	    if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
	  }
	};
	
	var Logger = function () {
	  function Logger(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Logger);
	
	    this.subs = [];
	    this.init(concreteLogger, options);
	  }
	
	  Logger.prototype.init = function init(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.prefix = options.prefix || 'i18next:';
	    this.logger = concreteLogger || consoleLogger;
	    this.options = options;
	    this.debug = options.debug === false ? false : true;
	  };
	
	  Logger.prototype.setDebug = function setDebug(bool) {
	    this.debug = bool;
	    this.subs.forEach(function (sub) {
	      sub.setDebug(bool);
	    });
	  };
	
	  Logger.prototype.log = function log() {
	    this.forward(arguments, 'log', '', true);
	  };
	
	  Logger.prototype.warn = function warn() {
	    this.forward(arguments, 'warn', '', true);
	  };
	
	  Logger.prototype.error = function error() {
	    this.forward(arguments, 'error', '');
	  };
	
	  Logger.prototype.deprecate = function deprecate() {
	    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
	  };
	
	  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
	    if (debugOnly && !this.debug) return;
	    if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
	    this.logger[lvl](args);
	  };
	
	  Logger.prototype.create = function create(moduleName) {
	    var sub = new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
	    this.subs.push(sub);
	
	    return sub;
	  };
	
	  // createInstance(options = {}) {
	  //   return new Logger(options, callback);
	  // }
	
	  return Logger;
	}();
	
	;
	
	exports.default = new Logger();

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);
	
			this.observers = {};
		}
	
		EventEmitter.prototype.on = function on(events, listener) {
			var _this = this;
	
			events.split(' ').forEach(function (event) {
				_this.observers[event] = _this.observers[event] || [];
				_this.observers[event].push(listener);
			});
		};
	
		EventEmitter.prototype.off = function off(event, listener) {
			var _this2 = this;
	
			if (!this.observers[event]) {
				return;
			}
	
			this.observers[event].forEach(function () {
				if (!listener) {
					delete _this2.observers[event];
				} else {
					var index = _this2.observers[event].indexOf(listener);
					if (index > -1) {
						_this2.observers[event].splice(index, 1);
					}
				}
			});
		};
	
		EventEmitter.prototype.emit = function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}
	
			if (this.observers[event]) {
				this.observers[event].forEach(function (observer) {
					observer.apply(undefined, args);
				});
			}
	
			if (this.observers['*']) {
				this.observers['*'].forEach(function (observer) {
					var _ref;
	
					observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
				});
			}
		};
	
		return EventEmitter;
	}();
	
	exports.default = EventEmitter;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _EventEmitter2 = __webpack_require__(59);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	var _utils = __webpack_require__(61);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var ResourceStore = function (_EventEmitter) {
	  _inherits(ResourceStore, _EventEmitter);
	
	  function ResourceStore() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];
	
	    _classCallCheck(this, ResourceStore);
	
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
	
	    _this.data = data;
	    _this.options = options;
	    return _this;
	  }
	
	  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
	    if (this.options.ns.indexOf(ns) < 0) {
	      this.options.ns.push(ns);
	    }
	  };
	
	  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
	    var index = this.options.ns.indexOf(ns);
	    if (index > -1) {
	      this.options.ns.splice(index, 1);
	    }
	  };
	
	  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var keySeparator = options.keySeparator || this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';
	
	    var path = [lng, ns];
	    if (key && typeof key !== 'string') path = path.concat(key);
	    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
	
	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	    }
	
	    return utils.getPath(this.data, path);
	  };
	
	  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
	    var options = arguments.length <= 4 || arguments[4] === undefined ? { silent: false } : arguments[4];
	
	    var keySeparator = this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';
	
	    var path = [lng, ns];
	    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
	
	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      value = ns;
	      ns = path[1];
	    }
	
	    this.addNamespaces(ns);
	
	    utils.setPath(this.data, path, value);
	
	    if (!options.silent) this.emit('added', lng, ns, key, value);
	  };
	
	  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
	    for (var m in resources) {
	      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
	    }
	    this.emit('added', lng, ns, resources);
	  };
	
	  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
	    var path = [lng, ns];
	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      deep = resources;
	      resources = ns;
	      ns = path[1];
	    }
	
	    this.addNamespaces(ns);
	
	    var pack = utils.getPath(this.data, path) || {};
	
	    if (deep) {
	      utils.deepExtend(pack, resources, overwrite);
	    } else {
	      pack = _extends({}, pack, resources);
	    }
	
	    utils.setPath(this.data, path, pack);
	
	    this.emit('added', lng, ns, resources);
	  };
	
	  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
	    if (this.hasResourceBundle(lng, ns)) {
	      delete this.data[lng][ns];
	    }
	    this.removeNamespaces(ns);
	
	    this.emit('removed', lng, ns);
	  };
	
	  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
	    return this.getResource(lng, ns) !== undefined;
	  };
	
	  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
	    if (!ns) ns = this.options.defaultNS;
	
	    // TODO: COMPATIBILITY remove extend in v2.1.0
	    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));
	
	    return this.getResource(lng, ns);
	  };
	
	  ResourceStore.prototype.toJSON = function toJSON() {
	    return this.data;
	  };
	
	  return ResourceStore;
	}(_EventEmitter3.default);
	
	exports.default = ResourceStore;

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeString = makeString;
	exports.copy = copy;
	exports.setPath = setPath;
	exports.pushPath = pushPath;
	exports.getPath = getPath;
	exports.deepExtend = deepExtend;
	exports.regexEscape = regexEscape;
	exports.escape = escape;
	function makeString(object) {
	  if (object == null) return '';
	  return '' + object;
	}
	
	function copy(a, s, t) {
	  a.forEach(function (m) {
	    if (s[m]) t[m] = s[m];
	  });
	}
	
	function getLastOfPath(object, path, Empty) {
	  function cleanKey(key) {
	    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
	  }
	
	  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
	  while (stack.length > 1) {
	    if (!object) return {};
	
	    var key = cleanKey(stack.shift());
	    if (!object[key] && Empty) object[key] = new Empty();
	    object = object[key];
	  }
	
	  if (!object) return {};
	  return {
	    obj: object,
	    k: cleanKey(stack.shift())
	  };
	}
	
	function setPath(object, path, newValue) {
	  var _getLastOfPath = getLastOfPath(object, path, Object);
	
	  var obj = _getLastOfPath.obj;
	  var k = _getLastOfPath.k;
	
	
	  obj[k] = newValue;
	}
	
	function pushPath(object, path, newValue, concat) {
	  var _getLastOfPath2 = getLastOfPath(object, path, Object);
	
	  var obj = _getLastOfPath2.obj;
	  var k = _getLastOfPath2.k;
	
	
	  obj[k] = obj[k] || [];
	  if (concat) obj[k] = obj[k].concat(newValue);
	  if (!concat) obj[k].push(newValue);
	}
	
	function getPath(object, path) {
	  var _getLastOfPath3 = getLastOfPath(object, path);
	
	  var obj = _getLastOfPath3.obj;
	  var k = _getLastOfPath3.k;
	
	
	  if (!obj) return undefined;
	  return obj[k];
	}
	
	function deepExtend(target, source, overwrite) {
	  for (var prop in source) {
	    if (prop in target) {
	      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
	      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
	        if (overwrite) target[prop] = source[prop];
	      } else {
	        deepExtend(target[prop], source[prop], overwrite);
	      }
	    } else {
	      target[prop] = source[prop];
	    }
	  }return target;
	}
	
	function regexEscape(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}
	
	/* eslint-disable */
	var _entityMap = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': '&quot;',
	  "'": '&#39;',
	  "/": '&#x2F;'
	};
	/* eslint-enable */
	
	function escape(data) {
	  if (typeof data === 'string') {
	    return data.replace(/[&<>"'\/]/g, function (s) {
	      return _entityMap[s];
	    });
	  } else {
	    return data;
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _EventEmitter2 = __webpack_require__(59);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	var _postProcessor = __webpack_require__(63);
	
	var _postProcessor2 = _interopRequireDefault(_postProcessor);
	
	var _v = __webpack_require__(64);
	
	var compat = _interopRequireWildcard(_v);
	
	var _utils = __webpack_require__(61);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Translator = function (_EventEmitter) {
	  _inherits(Translator, _EventEmitter);
	
	  function Translator(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Translator);
	
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
	
	    utils.copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);
	
	    _this.options = options;
	    _this.logger = _logger2.default.create('translator');
	    return _this;
	  }
	
	  Translator.prototype.changeLanguage = function changeLanguage(lng) {
	    if (lng) this.language = lng;
	  };
	
	  Translator.prototype.exists = function exists(key) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];
	
	    if (this.options.compatibilityAPI === 'v1') {
	      options = compat.convertTOptions(options);
	    }
	
	    return this.resolve(key, options) !== undefined;
	  };
	
	  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
	    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
	    if (nsSeparator === undefined) nsSeparator = ':';
	
	    var namespaces = options.ns || this.options.defaultNS;
	    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
	      var parts = key.split(nsSeparator);
	      namespaces = parts[0];
	      key = parts[1];
	    }
	    if (typeof namespaces === 'string') namespaces = [namespaces];
	
	    return {
	      key: key,
	      namespaces: namespaces
	    };
	  };
	
	  Translator.prototype.translate = function translate(keys) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	      options = this.options.overloadTranslationOptionHandler(arguments);
	    } else if (this.options.compatibilityAPI === 'v1') {
	      options = compat.convertTOptions(options);
	    }
	
	    // non valid keys handling
	    if (keys === undefined || keys === null || keys === '') return '';
	    if (typeof keys === 'number') keys = String(keys);
	    if (typeof keys === 'string') keys = [keys];
	
	    // return key on CIMode
	    var lng = options.lng || this.language;
	    if (lng && lng.toLowerCase() === 'cimode') return keys[keys.length - 1];
	
	    // separators
	    var keySeparator = options.keySeparator || this.options.keySeparator || '.';
	
	    // get namespace(s)
	
	    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);
	
	    var key = _extractFromKey.key;
	    var namespaces = _extractFromKey.namespaces;
	
	    var namespace = namespaces[namespaces.length - 1];
	
	    // resolve from store
	    var res = this.resolve(keys, options);
	
	    var resType = Object.prototype.toString.apply(res);
	    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
	    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
	
	    // object
	    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
	      if (!options.returnObjects && !this.options.returnObjects) {
	        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
	        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
	      }
	
	      var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy
	
	      for (var m in res) {
	        copy[m] = this.translate('' + key + keySeparator + m, _extends({ joinArrays: false, ns: namespaces }, options));
	      }
	      res = copy;
	    }
	    // array special treatment
	    else if (joinArrays && resType === '[object Array]') {
	        res = res.join(joinArrays);
	        if (res) res = this.extendTranslation(res, key, options);
	      }
	      // string, empty or null
	      else {
	          var usedDefault = false,
	              usedKey = false;
	
	          // fallback value
	          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
	            usedDefault = true;
	            res = options.defaultValue;
	          }
	          if (!this.isValidLookup(res)) {
	            usedKey = true;
	            res = key;
	          }
	
	          // save missing
	          if (usedKey || usedDefault) {
	            this.logger.log('missingKey', lng, namespace, key, res);
	
	            var lngs = [];
	            if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
	              for (var i = 0; i < this.options.fallbackLng.length; i++) {
	                lngs.push(this.options.fallbackLng[i]);
	              }
	            } else if (this.options.saveMissingTo === 'all') {
	              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
	            } else {
	              //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
	              lngs.push(options.lng || this.language);
	            }
	
	            if (this.options.saveMissing) {
	              if (this.options.missingKeyHandler) {
	                this.options.missingKeyHandler(lngs, namespace, key, res);
	              } else if (this.backendConnector && this.backendConnector.saveMissing) {
	                this.backendConnector.saveMissing(lngs, namespace, key, res);
	              }
	            }
	
	            this.emit('missingKey', lngs, namespace, key, res);
	          }
	
	          // extend
	          res = this.extendTranslation(res, key, options);
	
	          // append namespace if still key
	          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;
	
	          // parseMissingKeyHandler
	          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
	        }
	
	    // return
	    return res;
	  };
	
	  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
	    var _this2 = this;
	
	    if (options.interpolation) this.interpolator.init(options);
	
	    // interpolate
	    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
	    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
	    res = this.interpolator.interpolate(res, data, this.language);
	
	    // nesting
	    res = this.interpolator.nest(res, function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _this2.translate.apply(_this2, args);
	    }, options);
	
	    if (options.interpolation) this.interpolator.reset();
	
	    // post process
	    var postProcess = options.postProcess || this.options.postProcess;
	    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
	
	    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
	      res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
	    }
	
	    return res;
	  };
	
	  Translator.prototype.resolve = function resolve(keys) {
	    var _this3 = this;
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var found = void 0;
	
	    if (typeof keys === 'string') keys = [keys];
	
	    // forEach possible key
	    keys.forEach(function (k) {
	      if (_this3.isValidLookup(found)) return;
	
	      var _extractFromKey2 = _this3.extractFromKey(k, options);
	
	      var key = _extractFromKey2.key;
	      var namespaces = _extractFromKey2.namespaces;
	
	      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);
	
	      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
	      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
	
	      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);
	
	      namespaces.forEach(function (ns) {
	        if (_this3.isValidLookup(found)) return;
	
	        codes.forEach(function (code) {
	          if (_this3.isValidLookup(found)) return;
	
	          var finalKey = key;
	          var finalKeys = [finalKey];
	
	          var pluralSuffix = void 0;
	          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);
	
	          // fallback for plural if context not found
	          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
	
	          // get key for context if needed
	          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);
	
	          // get key for plural if needed
	          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
	
	          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
	          var possibleKey = void 0;
	          while (possibleKey = finalKeys.pop()) {
	            if (_this3.isValidLookup(found)) continue;
	            found = _this3.getResource(code, ns, possibleKey, options);
	          }
	        });
	      });
	    });
	
	    return found;
	  };
	
	  Translator.prototype.isValidLookup = function isValidLookup(res) {
	    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
	  };
	
	  Translator.prototype.getResource = function getResource(code, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    return this.resourceStore.getResource(code, ns, key, options);
	  };
	
	  return Translator;
	}(_EventEmitter3.default);
	
	exports.default = Translator;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  processors: {},
	
	  addPostProcessor: function addPostProcessor(module) {
	    this.processors[module.name] = module;
	  },
	  handle: function handle(processors, value, key, options, translator) {
	    var _this = this;
	
	    processors.forEach(function (processor) {
	      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
	    });
	
	    return value;
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertAPIOptions = convertAPIOptions;
	exports.convertJSONOptions = convertJSONOptions;
	exports.convertTOptions = convertTOptions;
	exports.appendBackwardsAPI = appendBackwardsAPI;
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function convertInterpolation(options) {
	
	  options.interpolation = {
	    unescapeSuffix: 'HTML'
	  };
	
	  options.interpolation.prefix = options.interpolationPrefix || '__';
	  options.interpolation.suffix = options.interpolationSuffix || '__';
	  options.interpolation.escapeValue = options.escapeInterpolation || false;
	
	  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
	  options.interpolation.nestingSuffix = options.reuseSuffix || ')';
	
	  return options;
	}
	
	function convertAPIOptions(options) {
	  if (options.resStore) options.resources = options.resStore;
	
	  if (options.ns && options.ns.defaultNs) {
	    options.defaultNS = options.ns.defaultNs;
	    options.ns = options.ns.namespaces;
	  } else {
	    options.defaultNS = options.ns || 'translation';
	  }
	
	  if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;
	
	  options.saveMissing = options.sendMissing;
	  options.saveMissingTo = options.sendMissingTo || 'current';
	  options.returnNull = options.fallbackOnNull ? false : true;
	  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
	  options.returnObjects = options.returnObjectTrees;
	  options.joinArrays = '\n';
	
	  options.returnedObjectHandler = options.objectTreeKeyHandler;
	  options.parseMissingKeyHandler = options.parseMissingKey;
	  options.appendNamespaceToMissingKey = true;
	
	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;
	
	  if (options.shortcutFunction === 'sprintf') {
	    options.overloadTranslationOptionHandler = function (args) {
	      var values = [];
	
	      for (var i = 1; i < args.length; i++) {
	        values.push(args[i]);
	      }
	
	      return {
	        postProcess: 'sprintf',
	        sprintf: values
	      };
	    };
	  }
	
	  options.whitelist = options.lngWhitelist;
	  options.preload = options.preload;
	  if (options.load === 'current') options.load = 'currentOnly';
	  if (options.load === 'unspecific') options.load = 'languageOnly';
	
	  // backend
	  options.backend = options.backend || {};
	  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
	  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
	  options.backend.allowMultiLoading = options.dynamicLoad;
	
	  // cache
	  options.cache = options.cache || {};
	  options.cache.prefix = 'res_';
	  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
	  options.cache.enabled = options.useLocalStorage ? true : false;
	
	  options = convertInterpolation(options);
	  if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;
	
	  // TODO: deprecation
	  // if (options.getAsync === false) throw deprecation error
	
	  return options;
	}
	
	function convertJSONOptions(options) {
	  options = convertInterpolation(options);
	  options.joinArrays = '\n';
	
	  return options;
	}
	
	function convertTOptions(options) {
	  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
	    options = convertInterpolation(options);
	  }
	
	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;
	
	  options.returnObjects = options.returnObjectTrees;
	
	  return options;
	}
	
	function appendBackwardsAPI(i18n) {
	  i18n.lng = function () {
	    _logger2.default.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
	    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
	  };
	
	  i18n.preload = function (lngs, cb) {
	    _logger2.default.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
	    i18n.loadLanguages(lngs, cb);
	  };
	
	  i18n.setLng = function (lng, options, callback) {
	    _logger2.default.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};
	
	    if (options.fixLng === true) {
	      if (callback) return callback(null, i18n.getFixedT(lng));
	    }
	
	    i18n.changeLanguage(lng, callback);
	  };
	
	  i18n.addPostProcessor = function (name, fc) {
	    _logger2.default.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
	    i18n.use({
	      type: 'postProcessor',
	      name: name,
	      process: fc
	    });
	  };
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	var LanguageUtil = function () {
	  function LanguageUtil(options) {
	    _classCallCheck(this, LanguageUtil);
	
	    this.options = options;
	
	    this.whitelist = this.options.whitelist || false;
	    this.logger = _logger2.default.create('languageUtils');
	  }
	
	  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
	    if (code.indexOf('-') < 0) return code;
	
	    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
	    var p = code.split('-');
	    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
	  };
	
	  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
	    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
	      var p = code.split('-');
	
	      if (this.options.lowerCaseLng) {
	        p = p.map(function (part) {
	          return part.toLowerCase();
	        });
	      } else if (p.length === 2) {
	        p[0] = p[0].toLowerCase();
	        p[1] = p[1].toUpperCase();
	
	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	      } else if (p.length === 3) {
	        p[0] = p[0].toLowerCase();
	
	        // if lenght 2 guess it's a country
	        if (p[1].length === 2) p[1] = p[1].toUpperCase();
	        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
	
	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
	      }
	
	      return p.join('-');
	    } else {
	      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	    }
	  };
	
	  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code, exactMatch) {
	    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist && !exactMatch) {
	      code = this.getLanguagePartFromCode(code);
	    }
	    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
	  };
	
	  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
	    var _this = this;
	
	    fallbackCode = fallbackCode || this.options.fallbackLng || [];
	    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];
	
	    var codes = [];
	    var addCode = function addCode(code) {
	      var exactMatch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	      if (_this.isWhitelisted(code, exactMatch)) {
	        codes.push(code);
	      } else {
	        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
	      }
	    };
	
	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code), true);
	      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
	    } else if (typeof code === 'string') {
	      addCode(this.formatLanguageCode(code));
	    }
	
	    fallbackCode.forEach(function (fc) {
	      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
	    });
	
	    return codes;
	  };
	
	  return LanguageUtil;
	}();
	
	;
	
	exports.default = LanguageUtil;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
	/* eslint-disable */
	var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];
	
	var _rulesPluralsTypes = {
	  1: function _(n) {
	    return Number(n > 1);
	  },
	  2: function _(n) {
	    return Number(n != 1);
	  },
	  3: function _(n) {
	    return 0;
	  },
	  4: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  5: function _(n) {
	    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
	  },
	  6: function _(n) {
	    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
	  },
	  7: function _(n) {
	    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  8: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
	  },
	  9: function _(n) {
	    return Number(n >= 2);
	  },
	  10: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
	  },
	  11: function _(n) {
	    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
	  },
	  12: function _(n) {
	    return Number(n % 10 != 1 || n % 100 == 11);
	  },
	  13: function _(n) {
	    return Number(n !== 0);
	  },
	  14: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
	  },
	  15: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  16: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
	  },
	  17: function _(n) {
	    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
	  },
	  18: function _(n) {
	    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
	  },
	  19: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
	  },
	  20: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
	  },
	  21: function _(n) {
	    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
	  }
	};
	/* eslint-enable */
	
	function createRules() {
	  var l,
	      rules = {};
	  sets.forEach(function (set) {
	    set.lngs.forEach(function (l) {
	      return rules[l] = {
	        numbers: set.nr,
	        plurals: _rulesPluralsTypes[set.fc]
	      };
	    });
	  });
	  return rules;
	}
	
	var PluralResolver = function () {
	  function PluralResolver(languageUtils) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, PluralResolver);
	
	    this.languageUtils = languageUtils;
	    this.options = options;
	
	    this.logger = _logger2.default.create('pluralResolver');
	
	    this.rules = createRules();
	  }
	
	  PluralResolver.prototype.addRule = function addRule(lng, obj) {
	    this.rules[lng] = obj;
	  };
	
	  PluralResolver.prototype.getRule = function getRule(code) {
	    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
	  };
	
	  PluralResolver.prototype.needsPlural = function needsPlural(code) {
	    var rule = this.getRule(code);
	
	    return rule && rule.numbers.length <= 1 ? false : true;
	  };
	
	  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
	    var _this = this;
	
	    var rule = this.getRule(code);
	
	    if (rule) {
	      var _ret = function () {
	        if (rule.numbers.length === 1) return {
	            v: ''
	          }; // only singular
	
	        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
	        var suffix = rule.numbers[idx];
	
	        // special treatment for lngs only having singular and plural
	        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	          if (suffix === 2) {
	            suffix = 'plural';
	          } else if (suffix === 1) {
	            suffix = '';
	          }
	        }
	
	        var returnSuffix = function returnSuffix() {
	          return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
	        };
	
	        // COMPATIBILITY JSON
	        // v1
	        if (_this.options.compatibilityJSON === 'v1') {
	          if (suffix === 1) return {
	              v: ''
	            };
	          if (typeof suffix === 'number') return {
	              v: '_plural_' + suffix.toString()
	            };
	          return {
	            v: returnSuffix()
	          };
	        }
	        // v2
	        else if (_this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
	            return {
	              v: returnSuffix()
	            };
	          }
	          // v3 - gettext index
	          else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	              return {
	                v: returnSuffix()
	              };
	            }
	        return {
	          v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
	        };
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      this.logger.warn('no plural rule found for: ' + code);
	      return '';
	    }
	  };
	
	  return PluralResolver;
	}();
	
	;
	
	exports.default = PluralResolver;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(61);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Interpolator = function () {
	  function Interpolator() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Interpolator);
	
	    this.logger = _logger2.default.create('interpolator');
	
	    this.init(options, true);
	  }
	
	  Interpolator.prototype.init = function init() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var reset = arguments[1];
	
	    if (reset) {
	      this.options = options;
	      this.format = options.interpolation && options.interpolation.format || function (value) {
	        return value;
	      };
	    }
	    if (!options.interpolation) options.interpolation = { escapeValue: true };
	
	    var iOpts = options.interpolation;
	
	    this.escapeValue = iOpts.escapeValue;
	
	    this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
	    this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
	    this.formatSeparator = iOpts.formatSeparator ? utils.regexEscape(iOpts.formatSeparator) : iOpts.formatSeparator || ',';
	
	    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
	    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
	
	    this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape('$t(');
	    this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(')');
	
	    // the regexp
	    var regexpStr = this.prefix + '(.+?)' + this.suffix;
	    this.regexp = new RegExp(regexpStr, 'g');
	
	    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
	    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
	
	    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
	    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
	  };
	
	  Interpolator.prototype.reset = function reset() {
	    if (this.options) this.init(this.options);
	  };
	
	  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
	    var _this = this;
	
	    var match = void 0,
	        value = void 0;
	
	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }
	
	    var handleFormat = function handleFormat(key) {
	      if (key.indexOf(_this.formatSeparator) < 0) return utils.getPath(data, key);
	
	      var p = key.split(_this.formatSeparator);
	      var k = p.shift().trim();
	      var f = p.join(_this.formatSeparator).trim();
	
	      return _this.format(utils.getPath(data, k), f, lng);
	    };
	
	    // unescape if has unescapePrefix/Suffix
	    while (match = this.regexpUnescape.exec(str)) {
	      var _value = handleFormat(match[1].trim());
	      str = str.replace(match[0], _value);
	      this.regexpUnescape.lastIndex = 0;
	    }
	
	    // regular escape on demand
	    while (match = this.regexp.exec(str)) {
	      value = handleFormat(match[1].trim());
	      if (typeof value !== 'string') value = utils.makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };
	
	  Interpolator.prototype.nest = function nest(str, fc) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var match = void 0,
	        value = void 0;
	
	    var clonedOptions = JSON.parse(JSON.stringify(options));
	    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup
	
	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }
	
	    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
	    function handleHasOptions(key) {
	      if (key.indexOf(',') < 0) return key;
	
	      var p = key.split(',');
	      key = p.shift();
	      var optionsString = p.join(',');
	      optionsString = this.interpolate(optionsString, clonedOptions);
	
	      try {
	        clonedOptions = JSON.parse(optionsString);
	      } catch (e) {
	        this.logger.error('failed parsing options string in nesting for key ' + key, e);
	      }
	
	      return key;
	    }
	
	    // regular escape on demand
	    while (match = this.nestingRegexp.exec(str)) {
	      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
	      if (typeof value !== 'string') value = utils.makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };
	
	  return Interpolator;
	}();
	
	exports.default = Interpolator;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _utils = __webpack_require__(61);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _EventEmitter2 = __webpack_require__(59);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	function remove(arr, what) {
	  var found = arr.indexOf(what);
	
	  while (found !== -1) {
	    arr.splice(found, 1);
	    found = arr.indexOf(what);
	  }
	}
	
	var Connector = function (_EventEmitter) {
	  _inherits(Connector, _EventEmitter);
	
	  function Connector(backend, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    _classCallCheck(this, Connector);
	
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
	
	    _this.backend = backend;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = _logger2.default.create('backendConnector');
	
	    _this.state = {};
	    _this.queue = [];
	
	    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
	    return _this;
	  }
	
	  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
	    var _this2 = this;
	
	    // find what needs to be loaded
	    var toLoad = [],
	        pending = [],
	        toLoadLanguages = [],
	        toLoadNamespaces = [];
	
	    languages.forEach(function (lng) {
	      var hasAllNamespaces = true;
	
	      namespaces.forEach(function (ns) {
	        var name = lng + '|' + ns;
	
	        if (_this2.store.hasResourceBundle(lng, ns)) {
	          _this2.state[name] = 2; // loaded
	        } else if (_this2.state[name] < 0) {
	            // nothing to do for err
	          } else if (_this2.state[name] === 1) {
	              if (pending.indexOf(name) < 0) pending.push(name);
	            } else {
	              _this2.state[name] = 1; // pending
	
	              hasAllNamespaces = false;
	
	              if (pending.indexOf(name) < 0) pending.push(name);
	              if (toLoad.indexOf(name) < 0) toLoad.push(name);
	              if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
	            }
	      });
	
	      if (!hasAllNamespaces) toLoadLanguages.push(lng);
	    });
	
	    if (toLoad.length || pending.length) {
	      this.queue.push({
	        pending: pending,
	        loaded: {},
	        errors: [],
	        callback: callback
	      });
	    }
	
	    return {
	      toLoad: toLoad,
	      pending: pending,
	      toLoadLanguages: toLoadLanguages,
	      toLoadNamespaces: toLoadNamespaces
	    };
	  };
	
	  Connector.prototype.loaded = function loaded(name, err, data) {
	    var _this3 = this;
	
	    var _name$split = name.split('|');
	
	    var _name$split2 = _slicedToArray(_name$split, 2);
	
	    var lng = _name$split2[0];
	    var ns = _name$split2[1];
	
	
	    if (err) this.emit('failedLoading', lng, ns, err);
	
	    if (data) {
	      this.store.addResourceBundle(lng, ns, data);
	    }
	
	    // set loaded
	    this.state[name] = err ? -1 : 2;
	    // callback if ready
	    this.queue.forEach(function (q) {
	      utils.pushPath(q.loaded, [lng], ns);
	      remove(q.pending, name);
	
	      if (err) q.errors.push(err);
	
	      if (q.pending.length === 0 && !q.done) {
	        q.errors.length ? q.callback(q.errors) : q.callback();
	        _this3.emit('loaded', q.loaded);
	        q.done = true;
	      }
	    });
	
	    // remove done load requests
	    this.queue = this.queue.filter(function (q) {
	      return !q.done;
	    });
	  };
	
	  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
	    var _this4 = this;
	
	    if (!tried) tried = 0;
	    if (!wait) wait = 250;
	
	    if (!lng.length) return callback(null, {}); // noting to load
	
	    this.backend[fcName](lng, ns, function (err, data) {
	      if (err && data /* = retryFlag */ && tried < 5) {
	        setTimeout(function () {
	          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
	        }, wait);
	        return;
	      }
	      callback(err, data);
	    });
	  };
	
	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this5 = this;
	
	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	      return callback && callback();
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);
	
	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];
	
	    var toLoad = this.queueLoad(languages, namespaces, callback);
	    if (!toLoad.toLoad.length) {
	      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
	      return; // pendings will trigger callback
	    }
	
	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);
	
	        toLoad.toLoad.forEach(function (name) {
	          var _name$split3 = name.split('|');
	
	          var _name$split4 = _slicedToArray(_name$split3, 2);
	
	          var l = _name$split4[0];
	          var n = _name$split4[1];
	
	
	          var bundle = utils.getPath(data, [l, n]);
	          if (bundle) {
	            _this5.loaded(name, err, bundle);
	          } else {
	            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	            _this5.loaded(name, _err);
	            _this5.logger.error(_err);
	          }
	        });
	      });
	    }
	
	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this6 = this;
	
	            var _name$split5 = name.split('|');
	
	            var _name$split6 = _slicedToArray(_name$split5, 2);
	
	            var lng = _name$split6[0];
	            var ns = _name$split6[1];
	
	
	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);
	
	              _this6.loaded(name, err, data);
	            });
	          };
	
	          ;
	
	          toLoad.toLoad.forEach(function (name) {
	            readOne.call(_this5, name);
	          });
	        })();
	      }
	  };
	
	  Connector.prototype.reload = function reload(languages, namespaces) {
	    var _this7 = this;
	
	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);
	
	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];
	
	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this7.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this7.logger.log('reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);
	
	        languages.forEach(function (l) {
	          namespaces.forEach(function (n) {
	            var bundle = utils.getPath(data, [l, n]);
	            if (bundle) {
	              _this7.loaded(l + '|' + n, err, bundle);
	            } else {
	              var _err2 = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	              _this7.loaded(l + '|' + n, _err2);
	              _this7.logger.error(_err2);
	            }
	          });
	        });
	      });
	    }
	
	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this8 = this;
	
	            var _name$split7 = name.split('|');
	
	            var _name$split8 = _slicedToArray(_name$split7, 2);
	
	            var lng = _name$split8[0];
	            var ns = _name$split8[1];
	
	
	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this8.logger.warn('reloading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this8.logger.log('reloaded namespace ' + ns + ' for language ' + lng, data);
	
	              _this8.loaded(name, err, data);
	            });
	          };
	
	          ;
	
	          languages.forEach(function (l) {
	            namespaces.forEach(function (n) {
	              readOne.call(_this7, l + '|' + n);
	            });
	          });
	        })();
	      }
	  };
	
	  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
	    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);
	
	    // write to store to avoid resending
	    if (!languages || !languages[0]) return;
	    this.store.addResource(languages[0], namespace, key, fallbackValue);
	  };
	
	  return Connector;
	}(_EventEmitter3.default);
	
	exports.default = Connector;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _utils = __webpack_require__(61);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _EventEmitter2 = __webpack_require__(59);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Connector = function (_EventEmitter) {
	  _inherits(Connector, _EventEmitter);
	
	  function Connector(cache, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    _classCallCheck(this, Connector);
	
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
	
	    _this.cache = cache;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = _logger2.default.create('cacheConnector');
	
	    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
	    return _this;
	  }
	
	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this2 = this;
	
	    if (!this.cache) return callback && callback();
	    var options = _extends({}, this.cache.options, this.options.cache);
	
	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];
	
	    if (options.enabled) {
	      this.cache.load(languages, function (err, data) {
	        if (err) _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
	        if (data) {
	          for (var l in data) {
	            for (var n in data[l]) {
	              if (n === 'i18nStamp') continue;
	              var bundle = data[l][n];
	              if (bundle) _this2.store.addResourceBundle(l, n, bundle);
	            }
	          }
	        }
	        if (callback) callback();
	      });
	    } else {
	      if (callback) callback();
	    }
	  };
	
	  Connector.prototype.save = function save() {
	    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
	  };
	
	  return Connector;
	}(_EventEmitter3.default);
	
	exports.default = Connector;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.transformOptions = transformOptions;
	function get() {
	  return {
	    debug: false,
	    initImmediate: true,
	
	    ns: ['translation'],
	    defaultNS: ['translation'],
	    fallbackLng: ['dev'],
	    fallbackNS: false, // string or array of namespaces
	
	    whitelist: false, // array with whitelisted languages
	    nonExplicitWhitelist: false,
	    load: 'all', // | currentOnly | languageOnly
	    preload: false, // array with preload languages
	
	    keySeparator: '.',
	    nsSeparator: ':',
	    pluralSeparator: '_',
	    contextSeparator: '_',
	
	    saveMissing: false, // enable to send missing values
	    saveMissingTo: 'fallback', // 'current' || 'all'
	    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling
	
	    postProcess: false, // string or array of postProcessor names
	    returnNull: true, // allows null value as valid translation
	    returnEmptyString: true, // allows empty string value as valid translation
	    returnObjects: false,
	    joinArrays: false, // or string to join array
	    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
	    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
	    appendNamespaceToMissingKey: false,
	    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
	      return { defaultValue: args[1] };
	    },
	
	    interpolation: {
	      escapeValue: true,
	      format: function format(value, _format, lng) {
	        return value;
	      },
	      prefix: '{{',
	      suffix: '}}',
	      formatSeparator: ',',
	      // prefixEscaped: '{{',
	      // suffixEscaped: '}}',
	      // unescapeSuffix: '',
	      unescapePrefix: '-',
	
	      nestingPrefix: '$t(',
	      nestingSuffix: ')',
	      // nestingPrefixEscaped: '$t(',
	      // nestingSuffixEscaped: ')',
	      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
	    }
	  };
	}
	
	function transformOptions(options) {
	  // create namespace object if namespace is passed in as string
	  if (typeof options.ns === 'string') options.ns = [options.ns];
	  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
	  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
	
	  // extend whitelist with cimode
	  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');
	
	  return options;
	}

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var locale = {
	  translation: {
	    test: 'asssent',
	    'Football match process': 'Football match process'
	  }
	};
	
	exports.default = locale;

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var locale = {
	  translation: {
	    test: 'asssent',
	    'Football match process': 'Кто пойдет на футбол - ',
	    'submit go': 'Я пойду!',
	    'Type your name': 'Введите имя',
	    'wont go': 'я передумал'
	  }
	};
	
	exports.default = locale;

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.serializeObject = serializeObject;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function serializeObject(el) {
	  var o = {};
	
	  [].concat(_toConsumableArray(el.elements)).forEach(function (item) {
	    if (item.name) {
	      if (typeof o[item.name] !== 'undefined') {
	        if (!o[item.name].push) {
	          o[item.name] = [o[item.name]];
	        }
	        o[item.name].push(item.value || '');
	      } else {
	        o[item.name] = item.value || '';
	      }
	    }
	  });
	
	  return o;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map