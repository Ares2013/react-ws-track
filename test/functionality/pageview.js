import * as WsTrack from '../../src';

export default function pageviewTests(spies) {
  describe('pageview()', function () {
    it('should output debug info, if debug is on', function () {
      const options = { debug: true };
      WsTrack.initialize('foo', options);
      WsTrack.pageview('/valid');
      spies.info.args.should.eql([
        ["called ga('send', 'pageview', path);"],
        ['with path: /valid']
      ]);
    });

    it('should record a pageview', function () {
      WsTrack.initialize('foo');
      WsTrack.pageview('/valid');
      spies.ga.args.should.eql([
        ['create', 'foo', 'auto'],
        ['send', { hitType: 'pageview', page: '/valid' }]
      ]);
    });

    it('should pass an optional title', function () {
      WsTrack.initialize('foo');
      WsTrack.pageview('/valid', null, 'Title');
      spies.ga.args.should.eql([
        ['create', 'foo', 'auto'],
        ['send', { hitType: 'pageview', page: '/valid', title: 'Title' }]
      ]);
    });

    it('should record a pageview with multiple trackers', function () {
      WsTrack.initialize([
        { trackingId: 'foo' },
        { trackingId: 'bar', wsTrackOptions: { name: 'baz' } }
      ]);
      WsTrack.pageview('/valid', ['baz']);
      spies.ga.args.should.eql([
        ['create', 'foo', 'auto'],
        ['create', 'bar', { name: 'baz' }],
        ['send', { hitType: 'pageview', page: '/valid' }],
        ['baz.send', { hitType: 'pageview', page: '/valid' }]
      ]);
    });

    it('should record a pageview with multiple trackers, except default', function () {
      ReactGA.initialize([
        { trackingId: 'foo' },
        { trackingId: 'bar', wsTrackOptions: { name: 'baz' } }
      ], { alwaysSendToDefaultTracker: false });
      ReactGA.pageview('/valid', ['baz']);
      spies.ga.args.should.eql([
        ['create', 'foo', 'auto'],
        ['create', 'bar', { name: 'baz' }],
        ['baz.send', { hitType: 'pageview', page: '/valid' }]
      ]);
    });

    it('should abort, log warning if path is not provided', function () {
      ReactGA.initialize('foo');
      ReactGA.pageview();
      spies.warn.args.should.eql([
        ['path is required in .pageview()']
      ]);
    });

    it('should abort, log warning if path is empty string', function () {
      ReactGA.initialize('foo');
      ReactGA.pageview('');
      spies.warn.args.should.eql([
        ['path is required in .pageview()']
      ]);
    });

    it('should abort, log warning if path is empty string of spaces', function () {
      ReactGA.initialize('foo');
      ReactGA.pageview('  ');
      spies.warn.args.should.eql([
        ['path cannot be an empty string in .pageview()']
      ]);
    });
  });
}
