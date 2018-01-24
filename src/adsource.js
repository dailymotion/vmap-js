class VMAPAdSource {
  constructor(xml) {
    this.id = xml.getAttribute('id');
    this.allowMultipleAds = xml.getAttribute('allowMultipleAds');
    this.followRedirects = xml.getAttribute('followRedirects');
    this.vastAdData = null;
    this.adTagURI = null;
    this.customData = null;

   for(let nodeKey in xml.childNodes) {
      const node = xml.childNodes[nodeKey];

      switch (node.localName) {
        case 'AdTagURI':
          this.adTagURI = {
            templateType: node.getAttribute('templateType'),
            uri: (node.textContent || node.text || '').trim()
          };
          break;
        case 'VASTAdData':
          this.vastAdData = node.firstChild;
          // Some browsers treats empty white-spaces or new lines as text nodes.
          // Ensure we get the first element node
          while (this.vastAdData && (this.vastAdData.nodeType !== 1)) {
            this.vastAdData = this.vastAdData.nextSibling;
          }
          break;
        case 'CustomAdData':
          this.customData = node;
          break;
      }
    };
  }
}

export default VMAPAdSource;
