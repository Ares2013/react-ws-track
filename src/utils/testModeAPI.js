export const wsTrackCalls = [];

export default {
  calls: wsTrackCalls,
  wsTrack: (...args) => {
    wsTrackCalls.push([...args]);
  },
  resetCalls: () => {
    wsTrackCalls.length = 0;
  }
};
