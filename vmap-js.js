'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var VMAPAdSource = function VMAPAdSource(xml) {
  classCallCheck(this, VMAPAdSource);

  this.id = xml.getAttribute('id');
  this.allowMultipleAds = xml.getAttribute('allowMultipleAds');
  this.followRedirects = xml.getAttribute('followRedirects');
  this.vastAdData = null;
  this.adTagURI = null;
  this.customData = null;

  for (var nodeKey in xml.childNodes) {
    var node = xml.childNodes[nodeKey];

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
        while (this.vastAdData && this.vastAdData.nodeType !== 1) {
          this.vastAdData = this.vastAdData.nextSibling;
        }
        break;
      case 'CustomAdData':
        this.customData = node;
        break;
    }
  }
};

var VMAPAdBreak = function () {
  function VMAPAdBreak(xml) {
    classCallCheck(this, VMAPAdBreak);

    this.timeOffset = xml.getAttribute('timeOffset');
    this.breakType = xml.getAttribute('breakType');
    this.breakId = xml.getAttribute('breakId');
    this.repeatAfter = xml.getAttribute('repeatAfter');
    this.adSource = null;
    this.trackingEvents = [];
    this.extensions = [];

    for (var nodeKey in xml.childNodes) {
      var node = xml.childNodes[nodeKey];

      switch (node.localName) {
        case 'AdSource':
          this.adSource = new VMAPAdSource(node);
          break;
        case 'TrackingEvents':
          for (var subnodeKey in node.childNodes) {
            var subnode = node.childNodes[subnodeKey];

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
    }
  }

  createClass(VMAPAdBreak, [{
    key: 'track',
    value: function track(event, errorCode) {
      for (var trackerKey in this.trackingEvents) {
        var tracker = this.trackingEvents[trackerKey];

        if (tracker.event === event) {
          var uri = tracker.uri;

          if (tracker.event === 'error') {
            uri = uri.replace('[ERRORCODE]', errorCode);
          }
          this.tracker(uri);
        }
      }
    }

    // Easy to overwrite tracker client for unit testing

  }, {
    key: 'tracker',
    value: function tracker(uri) {
      if (typeof window !== 'undefined' && window !== null) {
        var i = new Image();
        i.src = uri;
      }
    }
  }]);
  return VMAPAdBreak;
}();

var VMAP = function VMAP(xml) {
  classCallCheck(this, VMAP);

  if ((xml != null ? xml.documentElement : undefined) == null || xml.documentElement.localName !== "VMAP") {
    throw new Error('Not a VMAP document');
  }

  this.version = xml.documentElement.getAttribute('version');
  this.adBreaks = [];
  this.extensions = [];

  for (var nodeKey in xml.documentElement.childNodes) {
    var node = xml.documentElement.childNodes[nodeKey];

    switch (node.localName) {
      case 'AdBreak':
        this.adBreaks.push(new VMAPAdBreak(node));
        break;
      case 'Extensions':
        this.extensions = node.childNodes;
        break;
    }
  }
};

module.exports = VMAP;
