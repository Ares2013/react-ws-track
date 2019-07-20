import should from 'should';
import sinon from 'sinon';

import warn from '../../../src/utils/console/warn';

describe('warn()', function () {
  it('should append [react-ws-track] to warning messages', function () {
    sinon.stub(console, 'warn');
    console.warn.callCount.should.eql(0);
    warn('foo bar');
    console.warn.callCount.should.eql(1);
    console.warn.getCall(0).args.should.eql(['[react-ws-track]', 'foo bar']);
    console.warn.restore();
  });
});
