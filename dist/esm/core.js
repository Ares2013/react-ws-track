function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * React ws track Analytics Module
 * @package react-ws-track
**/

/**
 * Utilities
 */
import format from './utils/format';
import removeLeadingSlash from './utils/removeLeadingSlash';
import trim from './utils/trim';
import sparrowServer from './utils/sparrowServer';
import loadWsTrack from './utils/loadAnalyticsJs';
import warn from './utils/console/warn';
import log from './utils/console/log';
import TestModeAPI from './utils/testModeAPI';

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

  if (_testMode) return TestModeAPI.wsTrack.apply(TestModeAPI, args);
  if (_isNotBrowser) return false;
  if (!window.WsTrack) return warn('ReactWsTrack.initialize must be called first or track js Analytics should be loaded manually');
  return (_window = window).WsTrack.apply(_window, args);
};

function _format(s) {
  return format(s, _titleCase);
}

function _wsTrackCommand(trackerNames) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var command = args[0];

  if (typeof internalWsTrack === 'function') {
    if (typeof command !== 'string') {
      warn('wsTrack command must be a string');
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
    warn('wsTrackId is required in initialize()');
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

export function initialize(configsOrTrackingId, options) {
  if (!configsOrTrackingId) {
    warn('wsTrackId is required in initialize()');
    return;
  }

  if (options && !options.sparrowServer) {
    if (options && options.brandName) {
      var sparrwSer = sparrowServer(options.brandName);

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

    if (!options || options.standardImplementation !== true) loadWsTrack(options);
  }

  _alwaysSendToDefaultTracker = options && typeof options.alwaysSendToDefaultTracker === 'boolean' ? options.alwaysSendToDefaultTracker : true;

  if (Array.isArray(configsOrTrackingId)) {
    configsOrTrackingId.forEach(function (config) {
      if (_typeof(config) !== 'object') {
        warn('All configs must be an object');
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

export function wsTrack() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args.length > 0) {
    internalWsTrack.apply(void 0, args);

    if (_debug) {
      log('called wsTrack(\'arguments\');');
      log("with arguments: ".concat(JSON.stringify(args)));
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

export function set(fieldsObject, trackerNames) {
  if (!fieldsObject) {
    warn('`fieldsObject` is required in .set()');
    return;
  }

  if (_typeof(fieldsObject) !== 'object') {
    warn('Expected `fieldsObject` arg to be an Object');
    return;
  }

  if (Object.keys(fieldsObject).length === 0) {
    warn('empty `fieldsObject` given to .set()');
  }

  _wsTrackCommand(trackerNames, 'set', fieldsObject);

  if (_debug) {
    log('called ga(\'set\', fieldsObject);');
    log("with fieldsObject: ".concat(JSON.stringify(fieldsObject)));
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

export function send(fieldObject, trackerNames) {
  _wsTrackCommand(trackerNames, 'send', fieldObject);

  if (_debug) {
    log('called ga(\'send\', fieldObject);');
    log("with fieldObject: ".concat(JSON.stringify(fieldObject)));
    log("with trackers: ".concat(JSON.stringify(trackerNames)));
  }
}
/**
 * pageview:
 * Basic GA pageview tracking
 * @param  {String} rawPath - the current page page e.g. '/about'
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 * @param {String} title - (optional) the page title e. g. 'My Website'
 */

export function pageview(rawPath, trackerNames, title) {
  console.log("rawPath--->", rawPath);
  console.log("trackerNames--->", trackerNames);
  console.log("title--->", title);

  if (!rawPath) {
    warn('path is required in .pageview()');
    return;
  }

  var path = trim(rawPath);

  if (path === '') {
    warn('path cannot be an empty string in .pageview()');
    return;
  }

  var extraFields = {};

  if (title) {
    extraFields.title = title;
  }

  if (typeof wsTrack === 'function') {
    _wsTrackCommand('pageview', path);

    if (_debug) {
      log('called wsTrack(\'send\', \'pageview\', path);');
      var extraLog = '';

      if (title) {
        extraLog = " and title: ".concat(title);
      }

      log("with path: ".concat(path).concat(extraLog));
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

export function modalview(rawModalName, trackerNames) {
  if (!rawModalName) {
    warn('modalName is required in .modalview(modalName)');
    return;
  }

  var modalName = removeLeadingSlash(trim(rawModalName));

  if (modalName === '') {
    warn('modalName cannot be an empty string or a single / in .modalview()');
    return;
  }

  if (typeof wsTrack === 'function') {
    var path = "/modal/".concat(modalName);

    _wsTrackCommand(trackerNames, 'send', 'pageview', path);

    if (_debug) {
      log('called wsTrack(\'send\', \'pageview\', path);');
      log("with path: ".concat(path));
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

export function timing() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      category = _ref2.category,
      variable = _ref2.variable,
      value = _ref2.value,
      label = _ref2.label;

  var trackerNames = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof wsTrack === 'function') {
    if (!category || !variable || !value || typeof value !== 'number') {
      warn('args.category, args.variable ' + 'AND args.value are required in timing() ' + 'AND args.value has to be a number');
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

export function event() {
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
      warn('args.category AND args.action are required in event()');
      return;
    }

    category = _format(category);
    action = _format(action); // Optional Fields

    if (label) {
      label = trim(label);
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

export function exception(_ref4, trackerNames) {
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
        warn('`args.fatal` must be a boolean.');
      } else {
        fieldObject.exFatal = fatal;
      }
    } // Send to GA


    send(fieldObject, trackerNames);
  }
}
export var plugin = {
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
        warn('`name` is required in .require()');
        return;
      }

      var name = trim(rawName);

      if (name === '') {
        warn('`name` cannot be an empty string in .require()');
        return;
      } // Optional Fields


      if (options) {
        if (_typeof(options) !== 'object') {
          warn('Expected `options` arg to be an Object');
          return;
        }

        if (Object.keys(options).length === 0) {
          warn('Empty `options` given to .require()');
        }

        wsTrack('require', name, options);

        if (_debug) {
          log("called wsTrack('require', '".concat(name, "', ").concat(JSON.stringify(options)));
        }
      } else {
        wsTrack('require', name);

        if (_debug) {
          log("called wsTrack('require', '".concat(name, "');"));
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
        warn('Expected `pluginName` arg to be a String.');
      } else if (typeof action !== 'string') {
        warn('Expected `action` arg to be a String.');
      } else {
        var command = "".concat(pluginName, ":").concat(action);
        payload = payload || null;

        if (actionType && payload) {
          wsTrack(command, actionType, payload);

          if (_debug) {
            log("called wsTrack('".concat(command, "');"));
            log("actionType: \"".concat(actionType, "\" with payload: ").concat(JSON.stringify(payload)));
          }
        } else if (payload) {
          wsTrack(command, payload);

          if (_debug) {
            log("called wsTrack('".concat(command, "');"));
            log("with payload: ".concat(JSON.stringify(payload)));
          }
        } else {
          wsTrack(command);

          if (_debug) {
            log("called ga('".concat(command, "');"));
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

export function outboundLink(args, hitCallback, trackerNames) {
  if (typeof hitCallback !== 'function') {
    warn('hitCallback function is required');
    return;
  }

  if (typeof wsTrack === 'function') {
    // Simple Validation
    if (!args || !args.label) {
      warn('args.label is required in outboundLink()');
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
export var testModeAPI = TestModeAPI;
export default {
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
  testModeAPI: TestModeAPI
};