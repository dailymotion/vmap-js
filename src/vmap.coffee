VMAPAdBreak = require './adbreak'

class VMAP
  constructor: (xml) ->
    unless xml?.documentElement? and xml.documentElement.localName is "VMAP"
      throw new Error('Not a VMAP document')

    @version = xml.documentElement.getAttribute 'version'
    @adBreaks = []
    @extensions = []

    for node in xml.documentElement.childNodes
      switch node.localName
        when 'AdBreak'
          @adBreaks.push new VMAPAdBreak(node)
        when 'Extensions'
          @extensions = node.childNodes

module.exports = VMAP
