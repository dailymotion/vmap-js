/**
 * Returns all the elements of the given node which nodeName match the given name.
 * @param  {any} node - The node to use to find the matches.
 * @param  {any} name - The name to look for.
 * @return {Array}
 */
function childrenByName(node, name) {
  return [...node.childNodes].filter(
    child =>
      child.nodeName === name ||
      name === `vmap:${child.nodeName}` ||
      child.nodeName === `vmap:${name}`
  );
}

/**
 * Parses a node value giving priority to CDATA as a JSON over text, if CDATA is not a valid JSON it is converted to text
 * @param  {Object} node - The node to parse the value from.
 * @return {String|Object}
 */
function parseNodeValue(node) {
  const childNodes = node && node.childNodes && [...node.childNodes];
  if (!childNodes) {
    return {};
  }

  // Trying to find and parse CDATA as JSON
  const cdatas = childNodes.filter(childNode => childNode.nodeName === '#cdata-section');
  if (cdatas && cdatas.length > 0) {
    try {
      return JSON.parse(cdatas[0].data);
    } catch (e) {}
  }

  // Didn't find any CDATA or failed to parse it as JSON
  return childNodes.reduce((previousText, childNode) => {
    let nodeText = '';
    switch (childNode.nodeName) {
      case '#text':
        nodeText = childNode.textContent.trim();
        break;
      case '#cdata-section':
        nodeText = childNode.data;
        break;
    }
    return previousText + nodeText;
  }, '');
}

/**
 * Parses an XML node recursively.
 * @param  {Object} node - The node to parse.
 * @return {Object}
 */
function parseXMLNode(node) {
  const parsedNode = {
    attributes: {},
    children: {},
    value: {},
  };

  parsedNode.value = parseNodeValue(node);

  if (node.attributes) {
    [...node.attributes].forEach(nodeAttr => {
      if (nodeAttr.nodeName && nodeAttr.nodeValue !== undefined && nodeAttr.nodeValue !== null) {
        parsedNode.attributes[nodeAttr.nodeName] = nodeAttr.nodeValue;
      }
    });
  }

  if (node.childNodes) {
    [...node.childNodes]
      .filter(childNode => childNode.nodeName.substring(0, 1) !== '#')
      .forEach(childNode => {
        parsedNode.children[childNode.nodeName] = parseXMLNode(childNode);
      });
  }

  return parsedNode;
}

export { childrenByName, parseNodeValue, parseXMLNode };
