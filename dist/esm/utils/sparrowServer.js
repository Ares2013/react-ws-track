function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import trim from './trim';
var brandSparrowServer = {
  wondershare: "helper-stats.wondershare.com/sparrow/visit",
  aimersoft: "helper-stats.aimersoft.com/sparrow/visit",
  iskysoft: "helper-stats.isky.com/sparrow/visit",
  keepvid: "helper-stats.keepvid.com/sparrow/visit"
};
export default function sparrowServer(s) {
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