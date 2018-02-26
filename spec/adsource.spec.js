import VMAP from '../src/vmap';
import { readXMLFile } from './utils';

describe('AdSources', () => {
  const xml = readXMLFile('samples/correct-vmap.xml');
  const vmap = new VMAP(xml);

  describe('#1 ad break, ad source', () => {
    const adsource = vmap.adBreaks[0].adSource;

    it('should have ad source id 1', () => {
      expect(adsource.id).toBe('1');
    });

    it('should have only vast data set', () => {
      expect(adsource.vastData).not.toBeNull();
      expect(adsource.adTagURI).toBeNull();
      expect(adsource.customData).toBeNull();
    });
  });

  describe('#2 ad break, ad source', () => {
    const adsource = vmap.adBreaks[1].adSource;

    it('should have ad source id 2', () => {
      expect(adsource.id).toBe('2');
    });

    it('should have only vast data set', () => {
      expect(adsource.vastData).not.toBeNull();
      expect(adsource.adTagURI).toBeNull();
      expect(adsource.customData).toBeNull();
    });
  });

  describe('#3 ad break, ad source', () => {
    const adsource = vmap.adBreaks[2].adSource;

    it('should have ad source id 3', () => {
      expect(adsource.id).toBe('3');
    });

    it('should have only vast data set', () => {
      expect(adsource.vastData).not.toBeNull();
      expect(adsource.adTagURI.uri).toBe('http://server.com/vast.xml');
      expect(adsource.customData).toBeNull();
    });
  });
});
