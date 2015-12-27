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

  track: (event, errorCode) ->
    for tracker in @trackingEvents
      if tracker.event isnt event
        continue
      uri = tracker.uri
      if tracker.event is 'error'
        uri = uri.replace('[ERRORCODE]', errorCode)
      @tracker(uri)

  # Easy to overwrite tracker client for unit testing
  tracker: (uri) ->
    if window?
      i = new Image()
      i.src = uri

module.exports = VMAPAdBreak
