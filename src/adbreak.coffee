VMAPAdSource = require './adsource'

class VMAPAdBreak
  constructor: (xml) ->
    @timeOffset = xml.getAttribute 'timeOffset'
    @breakType = xml.getAttribute 'breakType'
    @breakId = xml.getAttribute 'breakId'
    @repeatAfter = xml.getAttribute 'repeatAfter'
    @adSource = null
    @trackingEvents = []
    @extensions = []

    for node in xml.childNodes
      switch node.localName
        when 'AdSource'
          @adSource = new VMAPAdSource(node)
        when 'TrackingEvents'
          for subnode in node.childNodes
            if subnode.localName is 'Tracking'
              @trackingEvents.push
                event: subnode.getAttribute 'event'
                uri: (subnode.textContent or subnode.text or '').trim()
        when 'Extensions'
          @extensions = node.childNodes

module.exports = VMAPAdBreak
