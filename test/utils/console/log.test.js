import should from 'should';
import sinon from 'sinon';

import log from '../../../src/utils/console/log';

describe('log()', function () {
  it('should append [react-ws-track] to log messages', function () {
    sinon.stub(console, 'info');
    console.info.callCount.should.eql(0);
    log('foo bar');
    console.info.callCount.should.eql(1);
    console.info.getCall(0).args.should.eql(['[react-ws-track]', 'foo bar']);
    console.info.restore();
  });
});
