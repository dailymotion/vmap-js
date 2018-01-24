import VMAPAdSource from './adsource';

class VMAPAdBreak {
  constructor(xml) {
    this.timeOffset = xml.getAttribute('timeOffset');
    this.breakType = xml.getAttribute('breakType');
    this.breakId = xml.getAttribute('breakId');
    this.repeatAfter = xml.getAttribute('repeatAfter');
    this.adSource = null;
    this.trackingEvents = [];
    console.log(this.trackingEvents);
    console.log(typeof this.trackingEvents);
    this.extensions = [];

    for (let nodeKey in xml.childNodes) {
      const node = xml.childNodes[nodeKey];

      switch (node.localName) {
        case 'AdSource':
          this.adSource = new VMAPAdSource(node);
          break;
        case 'TrackingEvents':
          for (let subnodeKey in node.childNodes) {
            const subnode = node.childNodes[subnodeKey];

            if (subnode.localName === 'Tracking') {
              this.trackingEvents.push({
                event: subnode.getAttribute('event'),
                uri: (subnode.textContent || subnode.text || '').trim()
              });
            }
          };
          break;
        case 'Extensions':
          this.extensions = node.childNodes;
          break;
      }
    };
  }

  track(event, errorCode) {
    this.trackingEvents.forEach(function(tracker) {
      if (tracker.event === event) {
        let { uri } = tracker;
        if (tracker.event === 'error') {
          uri = uri.replace('[ERRORCODE]', errorCode);
        }
        this.tracker(uri);
      }
    });
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
