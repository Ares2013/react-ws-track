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

const _isNotBrowser = typeof window === 'undefined' || typeof document === 'undefined';

let _debug = false;
let _titleCase = true;
let _testMode = false;
let _alwaysSendToDefaultTracker = true;

const internalWsTrack = (...args) => {
  console.log("ares internalWsTrack args---->",...args);
  if (_testMode) return TestModeAPI.wsTrack(...args);
  if (_isNotBrowser) return false;
  if (!window.WsTrack) return warn('ReactWsTrack.initialize must be called first or track js Analytics should be loaded manually');
  return window.WsTrack(...args);
};

function _format(s) {
  return format(s, _titleCase);
}

function _wsTrackCommand(trackerNames, ...args) {
  const command = args[0];
  if (typeof internalWsTrack === 'function') {
    if (typeof command !== 'string') {
      warn('wsTrack command must be a string');
      return;
    }

    if (_alwaysSendToDefaultTracker || !Array.isArray(trackerNames)) internalWsTrack(...args);
    if (Array.isArray(trackerNames)) {
      trackerNames.forEach((name) => {
        internalWsTrack(...[`${name}.${command}`].concat(args.slice(1)));
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

  if (options && options.wsTrackOptions) {
    //internalWsTrack('create', wsTrackId, options.wsTrackOptions);
  } else {
    //internalWsTrack('create', wsTrackId, 'auto');
  }
}

export function initialize(configsOrTrackingId, options) {
  if (!configsOrTrackingId) {
    warn('wsTrackId is required in initialize()');
    return;
  }
  if (options && !options.sparrowServer){
    if (options && options.brandName) {
      let sparrwSer = sparrowServer(options.brandName);
      if (Array.isArray(sparrwSer) && sparrwSer.length>0) {
        let {brandName,sparrowServer} = sparrwSer[0] || '';
        options.sparrowServer = sparrowServer;
        options.brandName = brandName;
      }
    }
  }
  if (options && !options.wsTrackId){
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

  _alwaysSendToDefaultTracker = (options && typeof options.alwaysSendToDefaultTracker === 'boolean') ?
    options.alwaysSendToDefaultTracker : true;

  if (Array.isArray(configsOrTrackingId)) {
    configsOrTrackingId.forEach((config) => {
      if (typeof config !== 'object') {
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
export function wsTrack(...args) {
  if (args.length > 0) {
    internalWsTrack(...args);
    if (_debug) {
      log('called wsTrack(\'arguments\');');
      log(`with arguments: ${JSON.stringify(args)}`);
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

  if (typeof fieldsObject !== 'object') {
    warn('Expected `fieldsObject` arg to be an Object');
    return;
  }

  if (Object.keys(fieldsObject).length === 0) {
    warn('empty `fieldsObject` given to .set()');
  }

  _wsTrackCommand(trackerNames, 'set', fieldsObject);

  if (_debug) {
    log('called ga(\'set\', fieldsObject);');
    log(`with fieldsObject: ${JSON.stringify(fieldsObject)}`);
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
    log(`with fieldObject: ${JSON.stringify(fieldObject)}`);
    log(`with trackers: ${JSON.stringify(trackerNames)}`);
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
  console.log("rawPath--->",rawPath);
  console.log("trackerNames--->",trackerNames);
  console.log("title--->",title);
  if (!rawPath) {
    warn('path is required in .pageview()');
    return;
  }

  const path = trim(rawPath);
  if (path === '') {
    warn('path cannot be an empty string in .pageview()');
    return;
  }

  const extraFields = {};
  if (title) {
    extraFields.title = title;
  }

  if (typeof wsTrack === 'function') {
    _wsTrackCommand('pageview', path);

    if (_debug) {
      log('called wsTrack(\'send\', \'pageview\', path);');
      let extraLog = '';
      if (title) {
        extraLog = ` and title: ${title}`;
      }
      log(`with path: ${path}${extraLog}`);
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

  const modalName = removeLeadingSlash(trim(rawModalName));

  if (modalName === '') {
    warn('modalName cannot be an empty string or a single / in .modalview()');
    return;
  }

  if (typeof wsTrack === 'function') {
    const path = `/modal/${modalName}`;
    _wsTrackCommand(trackerNames, 'send', 'pageview', path);

    if (_debug) {
      log('called wsTrack(\'send\', \'pageview\', path);');
      log(`with path: ${path}`);
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
export function timing({
  category,
  variable,
  value,
  label
} = {}, trackerNames) {
  if (typeof wsTrack === 'function') {
    if (!category || !variable || !value || typeof value !== 'number') {
      warn('args.category, args.variable ' +
        'AND args.value are required in timing() ' +
        'AND args.value has to be a number');
      return;
    }
    category = _format(category);
    variable = _format(variable)
    if (label) {
      label = _format(label);
    }
    _wsTrackCommand(trackerNames,category,variable,label,value);
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
export function event({
  category,
  action,
  label,
  value,
  nonInteraction,
  transport,
  ...args
} = {}, trackerNames) {
  if (typeof wsTrack === 'function') {
    // Simple Validation
    if (!category || !action) {
      warn('args.category AND args.action are required in event()');
      return;
    }
    category = _format(category);
    action = _format(action);
    // Optional Fields
    if (label) {
      label = trim(label);
    }
    _wsTrackCommand(trackerNames,category,action,label,value);
  }
}

/**
 * exception:
 * GA exception tracking
 * @param args.description {String} optional
 * @param args.fatal {boolean} optional
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */
export function exception({
  description,
  fatal
}, trackerNames) {
  if (typeof wsTrack === 'function') {
    // Required Fields
    const fieldObject = {
      hitType: 'exception'
    };

    // Optional Fields
    if (description) {
      fieldObject.exDescription = _format(description);
    }

    if (typeof fatal !== 'undefined') {
      if (typeof fatal !== 'boolean') {
        warn('`args.fatal` must be a boolean.');
      } else {
        fieldObject.exFatal = fatal;
      }
    }

    // Send to GA
    send(fieldObject, trackerNames);
  }
}

export const plugin = {
  /**
   * require:
   * GA requires a plugin
   * @param name {String} e.g. 'ecommerce' or 'myplugin'
   * @param options {Object} optional e.g {path: '/log', debug: true}
   */
  require: (rawName, options) => {
    if (typeof wsTrack === 'function') {
      // Required Fields
      if (!rawName) {
        warn('`name` is required in .require()');
        return;
      }

      const name = trim(rawName);
      if (name === '') {
        warn('`name` cannot be an empty string in .require()');
        return;
      }

      // Optional Fields
      if (options) {
        if (typeof options !== 'object') {
          warn('Expected `options` arg to be an Object');
          return;
        }

        if (Object.keys(options).length === 0) {
          warn('Empty `options` given to .require()');
        }

        wsTrack('require', name, options);

        if (_debug) {
          log(`called wsTrack('require', '${name}', ${JSON.stringify(options)}`);
        }
      } else {
        wsTrack('require', name);

        if (_debug) {
          log(`called wsTrack('require', '${name}');`);
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
  execute: (pluginName, action, ...args) => {
    let payload;
    let actionType;

    if (args.length === 1) {
      payload = args[0];
    } else {
      actionType = args[0];
      payload = args[1];
    }

    if (typeof wsTrack === 'function') {
      if (typeof pluginName !== 'string') {
        warn('Expected `pluginName` arg to be a String.');
      } else if (typeof action !== 'string') {
        warn('Expected `action` arg to be a String.');
      } else {
        const command = `${pluginName}:${action}`;
        payload = payload || null;
        if (actionType && payload) {
          wsTrack(command, actionType, payload);
          if (_debug) {
            log(`called wsTrack('${command}');`);
            log(`actionType: "${actionType}" with payload: ${JSON.stringify(payload)}`);
          }
        } else if (payload) {
          wsTrack(command, payload);
          if (_debug) {
            log(`called wsTrack('${command}');`);
            log(`with payload: ${JSON.stringify(payload)}`);
          }
        } else {
          wsTrack(command);
          if (_debug) {
            log(`called ga('${command}');`);
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
    }

    // Required Fields
    const fieldObject = {
      hitType: 'event',
      eventCategory: 'Outbound',
      eventAction: 'Click',
      eventLabel: _format(args.label)
    };

    let safetyCallbackCalled = false;
    const safetyCallback = () => {
      // This prevents a delayed response from GA
      // causing hitCallback from being fired twice
      safetyCallbackCalled = true;

      hitCallback();
    };

    // Using a timeout to ensure the execution of critical application code
    // in the case when the GA server might be down
    // or an ad blocker prevents sending the data

    // register safety net timeout:
    const t = setTimeout(safetyCallback, 250);

    const clearableCallbackForGA = () => {
      clearTimeout(t);
      if (!safetyCallbackCalled) {
        hitCallback();
      }
    };

    fieldObject.hitCallback = clearableCallbackForGA;

    // Send to wsTrack
    send(fieldObject, trackerNames);
  } else {
    // if wsTrack is not defined, return the callback so the application
    // continues to work as expected
    setTimeout(hitCallback, 0);
  }
}

export const testModeAPI = TestModeAPI;

export default {
  initialize,
  wsTrack,
  set,
  send,
  pageview,
  modalview,
  timing,
  event,
  exception,
  plugin,
  outboundLink,
  testModeAPI: TestModeAPI
};
