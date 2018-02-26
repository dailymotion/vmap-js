import VMAP from '../src/vmap';
import { readXMLFile } from './utils';

describe('A correct VMAP', () => {
  const xml = readXMLFile('samples/correct-vmap.xml');
  const vmap = new VMAP(xml);

  it('should have version 1.0', () => {
    expect(vmap.version).toBe('1.0');
  });

  it('should have 3 ad breaks', () => {
    expect(vmap.adBreaks.length).toBe(3);
  });

  it('should have no extensions', () => {
    expect(vmap.extensions.length).toBe(0);
  });
});

describe('An incorrect VMAP', () => {
  const xml = readXMLFile('samples/incorrect-vmap.xml');

  it('should throw an error in the constructor', () => {
    expect(() => new VMAP(xml)).toThrow(new Error('Not a VMAP document'));
  });
});
