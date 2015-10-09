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
          @vastAdData = node.firstChild
          # Some browsers treats empty white-spaces or new lines as text nodes.
          # Ensure we get the first element node
          while @vastAdData and @vastAdData.nodeType != 1
            @vastAdData = @vastAdData.nextSibling
        when 'CustomAdData'
          @customData = node

module.exports = VMAPAdSource
