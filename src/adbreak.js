import VMAPAdSource from './adsource';
import { childrenByName, parseXMLNode } from './parser_utils';

class VMAPAdBreak {
  constructor(xml) {
    this.timeOffset = xml.getAttribute('timeOffset');
    this.breakType = xml.getAttribute('breakType');
    this.breakId = xml.getAttribute('breakId');
    this.repeatAfter = xml.getAttribute('repeatAfter');
    this.adSource = null;
    this.trackingEvents = [];
    this.extensions = [];

    for (const nodeKey in xml.childNodes) {
      const node = xml.childNodes[nodeKey];

      switch (node.localName) {
        case 'AdSource':
          this.adSource = new VMAPAdSource(node);
          break;
        case 'TrackingEvents':
          for (const subnodeKey in node.childNodes) {
            const subnode = node.childNodes[subnodeKey];

            if (subnode.localName === 'Tracking') {
              this.trackingEvents.push({
                event: subnode.getAttribute('event'),
                uri: (subnode.textContent || subnode.text || '').trim(),
              });
            }
          }
          break;
        case 'Extensions':
          this.extensions = childrenByName(node, 'Extension').map((extension) =>
            parseXMLNode(extension)
          );
          break;
      }
    }
  }

  track(event, errorCode) {
    for (const trackerKey in this.trackingEvents) {
      const tracker = this.trackingEvents[trackerKey];

      if (tracker.event === event) {
        let { uri } = tracker;
        if (tracker.event === 'error') {
          uri = uri.replace('[ERRORCODE]', errorCode);
        }
        this.tracker(uri);
      }
    }
  }

  // Easy to overwrite tracker client for unit testing
  tracker(uri) {
    if (typeof window !== 'undefined' && window !== null) {
      const i = new Image();
      i.src = uri;
    }
  }
}

export default VMAPAdBreak;
