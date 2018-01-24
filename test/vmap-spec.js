import should from 'should';
import path from 'path';
import fs from 'fs';
import VMAP from '../src/vmap';
import { DOMParser } from 'xmldom';

const readXMLFile = function(file) {
  const url = path.resolve(path.dirname(module.filename), file).replace(/\\/g, '/');
  const data = fs.readFileSync(url, 'utf8');
  const xml = new DOMParser().parseFromString(data);
  return xml;
};

describe('VMAP', function() {
  const xml = readXMLFile('sample.xml');
  const vmap = new VMAP(xml);

  it('should version be 1.0', () => vmap.version.should.equal('1.0'));

  it('should have 3 ad breaks', () => vmap.adBreaks.length.should.equal(3));

  describe('#1 ad break', function() {
    const adbreak = vmap.adBreaks[0];
    let tracked = [];
    adbreak.tracker = uri => tracked.push(uri);

    beforeEach(() => tracked = []);
    it('should have time offset set to start', () => adbreak.timeOffset.should.equal('start'));
    it('should have break type linear', () => adbreak.breakType.should.equal('linear'));
    it('should have break id set to mypre', () => adbreak.breakId.should.equal('mypre'));
    it('should have ad source id 1', () => adbreak.adSource.id.should.equal('1'));
    it('should have only vast data set', function() {
      should(adbreak.adSource.vastData).not.be.null;
      should(adbreak.adSource.adTagURI).be.null;
      should(adbreak.adSource.customData).be.null;
    });
    it('should have one tracking event', function() {
      adbreak.trackingEvents.length.should.equal(4);
      adbreak.trackingEvents[0].event.should.equal('breakStart');
      adbreak.trackingEvents[0].uri.should.equal('http://server.com/breakstart');
      adbreak.trackingEvents[1].event.should.equal('breakEnd');
      adbreak.trackingEvents[1].uri.should.equal('http://server.com/breakend');
      adbreak.trackingEvents[2].event.should.equal('breakEnd');
      adbreak.trackingEvents[2].uri.should.equal('http://server.com/breakend2');
      adbreak.trackingEvents[3].event.should.equal('error');
      adbreak.trackingEvents[3].uri.should.equal('http://server.com/error?[ERRORCODE]');
    });
    it('should call start trackers', function() {
      adbreak.track('breakStart');
      tracked.should.eql(['http://server.com/breakstart']);
    });
    it('should call end trackers', function() {
      adbreak.track('breakEnd');
      tracked.should.eql(['http://server.com/breakend', 'http://server.com/breakend2']);
    });
    it('should call error trackers with variable', function() {
      adbreak.track('error', 402);
      tracked.should.eql(['http://server.com/error?402']);
    });
  });

  describe('#2 ad break', function() {
    const adbreak = vmap.adBreaks[1];
    it('should have time offset set to 00:10:23.125', () => adbreak.timeOffset.should.equal('00:10:23.125'));
    it('should have break type linear', () => adbreak.breakType.should.equal('linear'));
    it('should have break id set to myid', () => adbreak.breakId.should.equal('myid'));
    it('should have ad source id 2', () => adbreak.adSource.id.should.equal('2'));
    it('should have only vast data set', function() {
      should(adbreak.adSource.vastData).not.be.null;
      should(adbreak.adSource.adTagURI).be.null;
      should(adbreak.adSource.customData).be.null;
    });
    it('should have one tracking event', function() {
      adbreak.trackingEvents.length.should.equal(1);
      adbreak.trackingEvents[0].event.should.equal('breakStart');
      adbreak.trackingEvents[0].uri.should.equal('http://server.com/breakstart');
    });
  });

  describe('#3 ad break', function() {
    const adbreak = vmap.adBreaks[2];
    it('should have time offset set to end', () => adbreak.timeOffset.should.equal('end'));
    it('should have break type linear', () => adbreak.breakType.should.equal('linear'));
    it('should have break id set to mypost', () => adbreak.breakId.should.equal('mypost'));
    it('should have ad source id 3', () => adbreak.adSource.id.should.equal('3'));
    it('should have only vast data set', function() {
      should(adbreak.adSource.vastData).not.be.null;
      adbreak.adSource.adTagURI.uri.should.equal('http://server.com/vast.xml');
      should(adbreak.adSource.customData).be.null;
    });
    it('should have 4 tracking event', function() {
      adbreak.trackingEvents.length.should.equal(1);
      adbreak.trackingEvents[0].event.should.equal('breakStart');
      adbreak.trackingEvents[0].uri.should.equal('http://server.com/breakstart');
    });
  });
});
