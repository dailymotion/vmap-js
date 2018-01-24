import VMAPAdBreak from './adbreak';

class VMAP {
  constructor(xml) {
    if (((xml != null ? xml.documentElement : undefined) == null) || (xml.documentElement.localName !== "VMAP")) {
      throw new Error('Not a VMAP document');
    }

    this.version = xml.documentElement.getAttribute('version');
    this.adBreaks = [];
    this.extensions = [];

    for (let node in xml.documentElement.childNodes) {
      switch (xml.documentElement.childNodes[node].localName) {
        case 'AdBreak':
          this.adBreaks.push(new VMAPAdBreak(xml.documentElement.childNodes[node]));
          break;
        case 'Extensions':
          this.extensions = xml.documentElement.childNodes[node].childNodes;
          break;
      }
    };
  }
}

export default VMAP;
