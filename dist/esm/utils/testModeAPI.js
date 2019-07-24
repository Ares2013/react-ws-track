export var wsTrackCalls = [];
export default {
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