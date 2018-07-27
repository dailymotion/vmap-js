import {
  childrenByName,
  parseNodeText,
  parseXMLNode
} from '../src/parser_utils';
import { readXMLFile } from './utils';

describe('ParserUtils', () => {
  describe('childrenByName function', () => {
    const testNode = {
      childNodes: [
        {
          nodeName: 'Test'
        },
        {
          nodeName: 'Test2'
        },
        {
          nodeName: 'vmap:Test'
        },
        {
          nodeName: 'vmap:Test2'
        },
        {
          nodeName: 'Test:Test'
        },
        {
          nodeName: 'Test:Test2'
        },
        {
          nodeName: 'vmap:Test:Test'
        },
        {
          nodeName: 'vmap:'
        },
        {
          nodeName: ''
        },
        {
          nodeName: undefined
        },
        {
          nodeName: null
        }
      ]
    };

    it('should select children named Test', () => {
      const result = childrenByName(testNode, 'Test');

      expect(result).toEqual([
        {
          nodeName: 'Test'
        },
        {
          nodeName: 'vmap:Test'
        }
      ]);
    });

    it('should select children named vmap:Test', () => {
      const result = childrenByName(testNode, 'vmap:Test');

      expect(result).toEqual([
        {
          nodeName: 'Test'
        },
        {
          nodeName: 'vmap:Test'
        }
      ]);
    });

    it('should select children named Test:Test', () => {
      const result = childrenByName(testNode, 'Test:Test');

      expect(result).toEqual([
        {
          nodeName: 'Test:Test'
        },
        {
          nodeName: 'vmap:Test:Test'
        }
      ]);
    });

    it('should select children named vmap:Test:Test', () => {
      const result = childrenByName(testNode, 'vmap:Test:Test');

      expect(result).toEqual([
        {
          nodeName: 'Test:Test'
        },
        {
          nodeName: 'vmap:Test:Test'
        }
      ]);
    });
  });

  describe('parseNodeText function', () => {
    const testNode = {
      childNodes: [
        {
          nodeName: 'Test',
          textContent: 'Wrong'
        },
        {
          nodeName: '#text',
          textContent: '       Blabla    '
        },
        {
          nodeName: ''
        },
        {
          nodeName: undefined
        },
        {
          nodeName: null
        },
        {
          nodeName: '#text',
          textContent: '       Blobloblo    '
        }
      ]
    };

    it('should correctly extract text', () => {
      const result = parseNodeText(testNode);

      expect(result).toEqual('BlablaBlobloblo');
    });
  });

  describe('parseXMLNode function', () => {
    const testXML = readXMLFile('samples/parsing-example.xml');

    const result = parseXMLNode(testXML);

    it('should correctly parse XML', () => {
      expect(result).toEqual({
        attributes: {},
        children: {
          'vmap:Extension': {
            attributes: {
              extAttribute: 'extAttribute content',
              extAttribute2: 'extAttribute2 content'
            },
            children: {
              'vmap:Test': {
                attributes: {
                  testAttribute: 'testAttribute content',
                  testAttribute2: 'testAttribute2 content'
                },
                children: {},
                value: 'Test value'
              },
              'vmap:Test2': {
                attributes: {
                  test2Attribute: 'test2Attribute content',
                  test2Attribute2: 'test2Attribute2 content'
                },
                children: {},
                value: 'Test2 value'
              }
            },
            value: 'Extension value'
          }
        },
        value: null
      });
    });
  });
});
