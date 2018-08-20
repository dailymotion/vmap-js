import VMAP from '../src/vmap';
import { readXMLFile } from './utils';

describe('AdBreaks', () => {
  const xml = readXMLFile('samples/correct-vmap.xml');
  const vmap = new VMAP(xml);

  describe('#1 ad break', () => {
    const adbreak = vmap.adBreaks[0];
    let tracked = [];

    adbreak.tracker = (uri) => tracked.push(uri);

    beforeEach(() => (tracked = []));

    it('should have time offset set to start', () => {
      expect(adbreak.timeOffset).toBe('start');
    });

    it('should have break type linear', () => {
      expect(adbreak.breakType).toBe('linear');
    });

    it('should have break id set to mypre', () => {
      expect(adbreak.breakId).toBe('mypre');
    });

    it('should have one tracking event', () => {
      const trackingEvents = adbreak.trackingEvents;

      expect(trackingEvents.length).toBe(4);

      expect(trackingEvents[0].event).toBe('breakStart');
      expect(trackingEvents[0].uri).toBe('http://server.com/breakstart');

      expect(trackingEvents[1].event).toBe('breakEnd');
      expect(trackingEvents[1].uri).toBe('http://server.com/breakend');

      expect(trackingEvents[2].event).toBe('breakEnd');
      expect(trackingEvents[2].uri).toBe('http://server.com/breakend2');

      expect(trackingEvents[3].event).toBe('error');
      expect(trackingEvents[3].uri).toBe('http://server.com/error?[ERRORCODE]');
    });

    it('should call start trackers', () => {
      adbreak.track('breakStart');

      expect(tracked).toEqual(['http://server.com/breakstart']);
    });

    it('should call end trackers', () => {
      adbreak.track('breakEnd');

      expect(tracked).toEqual(['http://server.com/breakend', 'http://server.com/breakend2']);
    });

    it('should call error trackers with variable', () => {
      adbreak.track('error', 402);

      expect(tracked).toEqual(['http://server.com/error?402']);
    });
  });

  describe('#2 ad break', () => {
    const adbreak = vmap.adBreaks[1];

    it('should have time offset set to 00:10:23.125', () => {
      expect(adbreak.timeOffset).toBe('00:10:23.125');
    });

    it('should have break type linear', () => {
      expect(adbreak.breakType).toBe('linear');
    });

    it('should have break id set to myid', () => {
      expect(adbreak.breakId).toBe('myid');
    });

    it('should have one tracking event', () => {
      const trackingEvents = adbreak.trackingEvents;

      expect(trackingEvents.length).toBe(1);

      expect(trackingEvents[0].event).toBe('breakStart');
      expect(trackingEvents[0].uri).toBe('http://server.com/breakstart');
    });
  });

  describe('#3 ad break', () => {
    const adbreak = vmap.adBreaks[2];

    it('should have time offset set to end', () => {
      expect(adbreak.timeOffset).toBe('end');
    });

    it('should have break type linear', () => {
      expect(adbreak.breakType).toBe('linear');
    });

    it('should have break id set to mypost', () => {
      expect(adbreak.breakId).toBe('mypost');
    });

    it('should have one tracking event', () => {
      const trackingEvents = adbreak.trackingEvents;

      expect(trackingEvents.length).toBe(1);

      expect(trackingEvents[0].event).toBe('breakStart');
      expect(trackingEvents[0].uri).toBe('http://server.com/breakstart');
    });
  });

  describe('Ad break with extensions', () => {
    const xmlWithExtensions = readXMLFile('samples/correct-vmap-with-extension.xml');
    const vmapWithExtensions = new VMAP(xmlWithExtensions);
    const adbreak = vmapWithExtensions.adBreaks[0];

    it('should parse extensions', () => {
      expect(adbreak.extensions).toEqual([
        {
          attributes: {
            extAttribute: 'extAttribute content',
            extAttribute2: 'extAttribute2 content',
          },
          children: {
            'vmap:Test': {
              attributes: {
                testAttribute: 'testAttribute content',
                testAttribute2: 'testAttribute2 content',
              },
              children: {},
              value: 'Test value',
            },
            'vmap:Test2': {
              attributes: {
                test2Attribute: 'test2Attribute content',
                test2Attribute2: 'test2Attribute2 content',
              },
              children: {},
              value: 'Test2 value',
            },
          },
          value: 'Extension value',
        },
        {
          attributes: {},
          children: {
            'vmap:Child': {
              attributes: {
                childAttribute: 'childAttribute content',
                childAttribute2: 'childAttribute2 content',
              },
              children: {},
              value: 'Child value',
            },
          },
          value: 'Extension2 value',
        },
      ]);
    });
  });
});
