(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trim;

// browsers have String.prototoype.trim().
function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warn;

function warn(s) {
  console.warn('[react-ws-track]', s);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.wsTrack = wsTrack;
exports.set = set;
exports.send = send;
exports.pageview = pageview;
exports.modalview = modalview;
exports.timing = timing;
exports.event = event;
exports.exception = exception;
exports.outboundLink = outboundLink;
exports.default = exports.testModeAPI = exports.plugin = void 0;

var _format2 = _interopRequireDefault(__webpack_require__(3));

var _removeLeadingSlash = _interopRequireDefault(__webpack_require__(6));

var _trim = _interopRequireDefault(__webpack_require__(0));

var _sparrowServer2 = _interopRequireDefault(__webpack_require__(7));

var _loadAnalyticsJs = _interopRequireDefault(__webpack_require__(8));

var _warn = _interopRequireDefault(__webpack_require__(1));

var _log = _interopRequireDefault(__webpack_require__(9));

var _testModeAPI = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _isNotBrowser = typeof window === 'undefined' || typeof document === 'undefined';

var _debug = false;
var _titleCase = true;
var _testMode = false;
var _alwaysSendToDefaultTracker = true;

var internalWsTrack = function internalWsTrack() {
  var _console, _window;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ["ares internalWsTrack args---->"].concat(args));

  if (_testMode) return _testModeAPI.default.wsTrack.apply(_testModeAPI.default, args);
  if (_isNotBrowser) return false;
  if (!window.WsTrack) return (0, _warn.default)('ReactWsTrack.initialize must be called first or track js Analytics should be loaded manually');
  return (_window = window).WsTrack.apply(_window, args);
};

function _format(s) {
  return (0, _format2.default)(s, _titleCase);
}

function _wsTrackCommand(trackerNames) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var command = args[0];

  if (typeof internalWsTrack === 'function') {
    if (typeof command !== 'string') {
      (0, _warn.default)('wsTrack command must be a string');
      return;
    }

    if (_alwaysSendToDefaultTracker || !Array.isArray(trackerNames)) internalWsTrack.apply(void 0, args);

    if (Array.isArray(trackerNames)) {
      trackerNames.forEach(function (name) {
        internalWsTrack.apply(void 0, _toConsumableArray(["".concat(name, ".").concat(command)].concat(args.slice(1))));
      });
    }
  }
}

function _initialize(wsTrackId, options) {
  if (!wsTrackId) {
    (0, _warn.default)('wsTrackId is required in initialize()');
    return;
  }

  if (options) {
    if (options.debug && options.debug === true) {
      _debug = true;
    }

    if (options.titleCase === false) {
      _titleCase = false;
    }
  }

  if (options && options.wsTrackOptions) {//internalWsTrack('create', wsTrackId, options.wsTrackOptions);
  } else {//internalWsTrack('create', wsTrackId, 'auto');
    }
}

function initialize(configsOrTrackingId, options) {
  if (!configsOrTrackingId) {
    (0, _warn.default)('wsTrackId is required in initialize()');
    return;
  }

  if (options && !options.sparrowServer) {
    if (options && options.brandName) {
      var sparrwSer = (0, _sparrowServer2.default)(options.brandName);

      if (Array.isArray(sparrwSer) && sparrwSer.length > 0) {
        var _ref = sparrwSer[0] || '',
            brandName = _ref.brandName,
            _sparrowServer = _ref.sparrowServer;

        options.sparrowServer = _sparrowServer;
        options.brandName = brandName;
      }
    }
  }

  if (options && !options.wsTrackId) {
    options.wsTrackId = configsOrTrackingId;
  }

  if (options && options.testMode === true) {
    _testMode = true;
  } else {
    if (_isNotBrowser) {
      return false;
    }

    if (!options || options.standardImplementation !== true) (0, _loadAnalyticsJs.default)(options);
  }

  _alwaysSendToDefaultTracker = options && typeof options.alwaysSendToDefaultTracker === 'boolean' ? options.alwaysSendToDefaultTracker : true;

  if (Array.isArray(configsOrTrackingId)) {
    configsOrTrackingId.forEach(function (config) {
      if (_typeof(config) !== 'object') {
        (0, _warn.default)('All configs must be an object');
        return;
      }

      _initialize(config.trackingId, config);
    });
  } else {
    _initialize(configsOrTrackingId, options);
  }

  return true;
}
/**
 * wsTrack:
 * Returns the original wsTrack object.
 */


function wsTrack() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args.length > 0) {
    internalWsTrack.apply(void 0, args);

    if (_debug) {
      (0, _log.default)('called wsTrack(\'arguments\');');
      (0, _log.default)("with arguments: ".concat(JSON.stringify(args)));
    }
  }

  return window.wsTrack;
}
/**
 * set:
 * GA tracker set method
 * @param {Object} fieldsObject - a field/value pair or a group of field/value pairs on the tracker
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function set(fieldsObject, trackerNames) {
  if (!fieldsObject) {
    (0, _warn.default)('`fieldsObject` is required in .set()');
    return;
  }

  if (_typeof(fieldsObject) !== 'object') {
    (0, _warn.default)('Expected `fieldsObject` arg to be an Object');
    return;
  }

  if (Object.keys(fieldsObject).length === 0) {
    (0, _warn.default)('empty `fieldsObject` given to .set()');
  }

  _wsTrackCommand(trackerNames, 'set', fieldsObject);

  if (_debug) {
    (0, _log.default)('called ga(\'set\', fieldsObject);');
    (0, _log.default)("with fieldsObject: ".concat(JSON.stringify(fieldsObject)));
  }
}
/**
 * send:
 * Clone of the low level `ga.send` method
 * WARNING: No validations will be applied to this
 * @param  {Object} fieldObject - field object for tracking different analytics
 * @param  {Array} trackerNames - trackers to send the command to
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function send(fieldObject, trackerNames) {
  _wsTrackCommand(trackerNames, 'send', fieldObject);

  if (_debug) {
    (0, _log.default)('called ga(\'send\', fieldObject);');
    (0, _log.default)("with fieldObject: ".concat(JSON.stringify(fieldObject)));
    (0, _log.default)("with trackers: ".concat(JSON.stringify(trackerNames)));
  }
}
/**
 * pageview:
 * Basic GA pageview tracking
 * @param  {String} rawPath - the current page page e.g. '/about'
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 * @param {String} title - (optional) the page title e. g. 'My Website'
 */


function pageview(rawPath, trackerNames, title) {
  console.log("rawPath--->", rawPath);
  console.log("trackerNames--->", trackerNames);
  console.log("title--->", title);

  if (!rawPath) {
    (0, _warn.default)('path is required in .pageview()');
    return;
  }

  var path = (0, _trim.default)(rawPath);

  if (path === '') {
    (0, _warn.default)('path cannot be an empty string in .pageview()');
    return;
  }

  var extraFields = {};

  if (title) {
    extraFields.title = title;
  }

  if (typeof wsTrack === 'function') {
    _wsTrackCommand('pageview', path);

    if (_debug) {
      (0, _log.default)('called wsTrack(\'send\', \'pageview\', path);');
      var extraLog = '';

      if (title) {
        extraLog = " and title: ".concat(title);
      }

      (0, _log.default)("with path: ".concat(path).concat(extraLog));
    }
  }
}
/**
 * modalview:
 * a proxy to basic GA pageview tracking to consistently track
 * modal views that are an equivalent UX to a traditional pageview
 * @param  {String} modalName e.g. 'add-or-edit-club'
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function modalview(rawModalName, trackerNames) {
  if (!rawModalName) {
    (0, _warn.default)('modalName is required in .modalview(modalName)');
    return;
  }

  var modalName = (0, _removeLeadingSlash.default)((0, _trim.default)(rawModalName));

  if (modalName === '') {
    (0, _warn.default)('modalName cannot be an empty string or a single / in .modalview()');
    return;
  }

  if (typeof wsTrack === 'function') {
    var path = "/modal/".concat(modalName);

    _wsTrackCommand(trackerNames, 'send', 'pageview', path);

    if (_debug) {
      (0, _log.default)('called wsTrack(\'send\', \'pageview\', path);');
      (0, _log.default)("with path: ".concat(path));
    }
  }
}
/**
 * timing:
 * GA timing
 * @param args.category {String} required
 * @param args.variable {String} required
 * @param args.value  {Int}  required
 * @param args.label  {String} required
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function timing() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      category = _ref2.category,
      variable = _ref2.variable,
      value = _ref2.value,
      label = _ref2.label;

  var trackerNames = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof wsTrack === 'function') {
    if (!category || !variable || !value || typeof value !== 'number') {
      (0, _warn.default)('args.category, args.variable ' + 'AND args.value are required in timing() ' + 'AND args.value has to be a number');
      return;
    }

    category = _format(category);
    variable = _format(variable);

    if (label) {
      label = _format(label);
    }

    _wsTrackCommand(trackerNames, category, variable, label, value);
  }
}
/**
 * event:
 * GA event tracking
 * @param args.category {String} required
 * @param args.action {String} required
 * @param args.label {String} optional
 * @param args.value {Int} optional
 * @param args.nonInteraction {boolean} optional
 * @param args.transport {string} optional
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function event() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      category = _ref3.category,
      action = _ref3.action,
      label = _ref3.label,
      value = _ref3.value,
      nonInteraction = _ref3.nonInteraction,
      transport = _ref3.transport,
      args = _objectWithoutProperties(_ref3, ["category", "action", "label", "value", "nonInteraction", "transport"]);

  var trackerNames = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof wsTrack === 'function') {
    // Simple Validation
    if (!category || !action) {
      (0, _warn.default)('args.category AND args.action are required in event()');
      return;
    }

    category = _format(category);
    action = _format(action); // Optional Fields

    if (label) {
      label = (0, _trim.default)(label);
    }

    _wsTrackCommand(trackerNames, category, action, label, value);
  }
}
/**
 * exception:
 * GA exception tracking
 * @param args.description {String} optional
 * @param args.fatal {boolean} optional
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */


function exception(_ref4, trackerNames) {
  var description = _ref4.description,
      fatal = _ref4.fatal;

  if (typeof wsTrack === 'function') {
    // Required Fields
    var fieldObject = {
      hitType: 'exception'
    }; // Optional Fields

    if (description) {
      fieldObject.exDescription = _format(description);
    }

    if (typeof fatal !== 'undefined') {
      if (typeof fatal !== 'boolean') {
        (0, _warn.default)('`args.fatal` must be a boolean.');
      } else {
        fieldObject.exFatal = fatal;
      }
    } // Send to GA


    send(fieldObject, trackerNames);
  }
}

var plugin = {
  /**
   * require:
   * GA requires a plugin
   * @param name {String} e.g. 'ecommerce' or 'myplugin'
   * @param options {Object} optional e.g {path: '/log', debug: true}
   */
  require: function require(rawName, options) {
    if (typeof wsTrack === 'function') {
      // Required Fields
      if (!rawName) {
        (0, _warn.default)('`name` is required in .require()');
        return;
      }

      var name = (0, _trim.default)(rawName);

      if (name === '') {
        (0, _warn.default)('`name` cannot be an empty string in .require()');
        return;
      } // Optional Fields


      if (options) {
        if (_typeof(options) !== 'object') {
          (0, _warn.default)('Expected `options` arg to be an Object');
          return;
        }

        if (Object.keys(options).length === 0) {
          (0, _warn.default)('Empty `options` given to .require()');
        }

        wsTrack('require', name, options);

        if (_debug) {
          (0, _log.default)("called wsTrack('require', '".concat(name, "', ").concat(JSON.stringify(options)));
        }
      } else {
        wsTrack('require', name);

        if (_debug) {
          (0, _log.default)("called wsTrack('require', '".concat(name, "');"));
        }
      }
    }
  },

  /**
   * execute:
   * GA execute action for plugin
   * Takes variable number of arguments
   * @param pluginName {String} e.g. 'ecommerce' or 'myplugin'
   * @param action {String} e.g. 'addItem' or 'myCustomAction'
   * @param actionType {String} optional e.g. 'detail'
   * @param payload {Object} optional e.g { id: '1x5e', name : 'My product to track' }
   */
  execute: function execute(pluginName, action) {
    var payload;
    var actionType;

    if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 1) {
      payload = arguments.length <= 2 ? undefined : arguments[2];
    } else {
      actionType = arguments.length <= 2 ? undefined : arguments[2];
      payload = arguments.length <= 3 ? undefined : arguments[3];
    }

    if (typeof wsTrack === 'function') {
      if (typeof pluginName !== 'string') {
        (0, _warn.default)('Expected `pluginName` arg to be a String.');
      } else if (typeof action !== 'string') {
        (0, _warn.default)('Expected `action` arg to be a String.');
      } else {
        var command = "".concat(pluginName, ":").concat(action);
        payload = payload || null;

        if (actionType && payload) {
          wsTrack(command, actionType, payload);

          if (_debug) {
            (0, _log.default)("called wsTrack('".concat(command, "');"));
            (0, _log.default)("actionType: \"".concat(actionType, "\" with payload: ").concat(JSON.stringify(payload)));
          }
        } else if (payload) {
          wsTrack(command, payload);

          if (_debug) {
            (0, _log.default)("called wsTrack('".concat(command, "');"));
            (0, _log.default)("with payload: ".concat(JSON.stringify(payload)));
          }
        } else {
          wsTrack(command);

          if (_debug) {
            (0, _log.default)("called ga('".concat(command, "');"));
          }
        }
      }
    }
  }
};
/**
 * outboundLink:
 * GA outboundLink tracking
 * @param args.label {String} e.g. url, or 'Create an Account'
 * @param {function} hitCallback - Called after processing a hit.
 */

exports.plugin = plugin;

function outboundLink(args, hitCallback, trackerNames) {
  if (typeof hitCallback !== 'function') {
    (0, _warn.default)('hitCallback function is required');
    return;
  }

  if (typeof wsTrack === 'function') {
    // Simple Validation
    if (!args || !args.label) {
      (0, _warn.default)('args.label is required in outboundLink()');
      return;
    } // Required Fields


    var fieldObject = {
      hitType: 'event',
      eventCategory: 'Outbound',
      eventAction: 'Click',
      eventLabel: _format(args.label)
    };
    var safetyCallbackCalled = false;

    var safetyCallback = function safetyCallback() {
      // This prevents a delayed response from GA
      // causing hitCallback from being fired twice
      safetyCallbackCalled = true;
      hitCallback();
    }; // Using a timeout to ensure the execution of critical application code
    // in the case when the GA server might be down
    // or an ad blocker prevents sending the data
    // register safety net timeout:


    var t = setTimeout(safetyCallback, 250);

    var clearableCallbackForGA = function clearableCallbackForGA() {
      clearTimeout(t);

      if (!safetyCallbackCalled) {
        hitCallback();
      }
    };

    fieldObject.hitCallback = clearableCallbackForGA; // Send to wsTrack

    send(fieldObject, trackerNames);
  } else {
    // if wsTrack is not defined, return the callback so the application
    // continues to work as expected
    setTimeout(hitCallback, 0);
  }
}

var testModeAPI = _testModeAPI.default;
exports.testModeAPI = testModeAPI;
var _default = {
  initialize: initialize,
  wsTrack: wsTrack,
  set: set,
  send: send,
  pageview: pageview,
  modalview: modalview,
  timing: timing,
  event: event,
  exception: exception,
  plugin: plugin,
  outboundLink: outboundLink,
  testModeAPI: _testModeAPI.default
};
exports.default = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _mightBeEmail = _interopRequireDefault(__webpack_require__(4));

var _toTitleCase = _interopRequireDefault(__webpack_require__(5));

var _warn = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redacted = 'REDACTED (Potential Email Address)';

function format(s, titleCase) {
  if ((0, _mightBeEmail.default)(s)) {
    (0, _warn.default)('This arg looks like an email address, redacting.');
    return redacted;
  }

  if (titleCase) {
    return (0, _toTitleCase.default)(s);
  }

  return s;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mightBeEmail;

// See if s could be an email address. We don't want to send personal data like email.
// https://support.google.com/analytics/answer/2795983?hl=en
function mightBeEmail(s) {
  // There's no point trying to validate rfc822 fully, just look for ...@...
  return /[^@]+@[^@]+/.test(s);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toTitleCase;

var _trim = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * To Title Case 2.1 - http://individed.com/code/to-title-case/
 * Copyright 2008-2013 David Gouch. Licensed under the MIT License.
 * https://github.com/gouch/to-title-case
 */
var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

function toTitleCase(string) {
  return (0, _trim.default)(string).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
    if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' && (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') && title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeLeadingSlash;

function removeLeadingSlash(string) {
  if (string.substring(0, 1) === '/') {
    return string.substring(1);
  }

  return string;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sparrowServer;

var _trim = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var brandSparrowServer = {
  wondershare: "helper-stats.wondershare.com/sparrow/visit",
  aimersoft: "helper-stats.aimersoft.com/sparrow/visit",
  iskysoft: "helper-stats.isky.com/sparrow/visit",
  keepvid: "helper-stats.keepvid.com/sparrow/visit"
};

function sparrowServer(s) {
  var configSparrowServer = new Array();

  if (s && Array.isArray(s)) {
    configsOrTrackingId.forEach(function (config) {
      var configSparrow = {
        brandName: "",
        sparrowServer: ""
      };

      if (_typeof(config) !== 'object') {
        warn('All configs must be an object');
        return;
      }

      if (config && config.brandName) {
        var brandName = config.brandName;

        if (brandSparrowServer[brandName]) {
          configSparrow.brandName = brandName;
          configSparrow.sparrowServer = brandSparrowServer[brandName];
          configSparrowServer.push(configSparrow);
        }
      }
    });
  } else {
    var configSparrow = {
      brandName: "",
      sparrowServer: ""
    };
    var brandName = s;

    if (brandSparrowServer[brandName]) {
      configSparrow.brandName = brandName;
      configSparrow.sparrowServer = brandSparrowServer[brandName];
      configSparrowServer.push(configSparrow);
    }
  }

  return configSparrowServer;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(options) {
  var wstrackAddress = 'https://static.wondershare.com/common/images-www/script/analytics/track.js';
  var wstrackSparrowSer = 'helper-stats.wondershare.com/sparrow/visit';
  var wstrackId = 'tid-u201907191022-01';

  if (options && options.wsTrackAddress) {
    wstrackAddress = options.wsTrackAddress;
  } else if (options && options.debug) {
    wstrackAddress = 'https://static.wondershare.com/common/images-www/script/analytics/track.js?v=' + Math.random();
  } else if (options && options.wsTrackId) {
    wstrackId = options.wsTrackId;
  } else if (options && options.sparrowServer) {
    wstrackSparrowSer = options.sparrowServer;
  }
  /* eslint-disable */


  (function (i, s, o, g, d, t, a, m) {
    var r = 'WsTrack';

    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    };

    i[r].d = d, i[r].t = t, a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', wstrackAddress, wstrackSparrowSer, wstrackId);
  /* eslint-enable */

}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

function log(s) {
  console.info('[react-ws-track]', s);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.wsTrackCalls = void 0;
var wsTrackCalls = [];
exports.wsTrackCalls = wsTrackCalls;
var _default = {
  calls: wsTrackCalls,
  wsTrack: function wsTrack() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    wsTrackCalls.push([].concat(args));
  },
  resetCalls: function resetCalls() {
    wsTrackCalls.length = 0;
  }
};
exports.default = _default;

/***/ })
/******/ ]);
});