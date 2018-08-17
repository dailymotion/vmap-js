import VMAPAdBreak from './adbreak';
import { childrenByName, parseXMLNode } from './parser_utils';

class VMAP {
  constructor(xml) {
    if (
      (xml != null ? xml.documentElement : undefined) == null ||
      xml.documentElement.localName !== 'VMAP'
    ) {
      throw new Error('Not a VMAP document');
    }

    this.version = xml.documentElement.getAttribute('version');
    this.adBreaks = [];
    this.extensions = [];

    for (const nodeKey in xml.documentElement.childNodes) {
      const node = xml.documentElement.childNodes[nodeKey];

      switch (node.localName) {
        case 'AdBreak':
          this.adBreaks.push(new VMAPAdBreak(node));
          break;
        case 'Extensions':
          this.extensions = childrenByName(node, 'Extension').map(extension =>
            parseXMLNode(extension)
          );
          break;
      }
    }
  }
}

export default VMAP;
