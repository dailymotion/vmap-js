class VMAPAdSource
  constructor: (xml) ->
    @id = xml.getAttribute 'id'
    @allowMultipleAds = xml.getAttribute 'allowMultipleAds'
    @followRedirects = xml.getAttribute 'followRedirects'
    @vastAdData = null
    @adTagURI = null
    @customData = null

    for node in xml.childNodes
      switch node.localName
        when 'AdTagURI'
          @adTagURI =
            templateType: node.getAttribute 'templateType'
            uri: (node.textContent or node.text or '').trim()
        when 'VASTAdData'
          @vastAdData = node
        when 'CustomAdData'
          @customData = node

module.exports = VMAPAdSource
