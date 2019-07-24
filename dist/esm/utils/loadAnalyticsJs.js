export default function (options) {
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