/**
 * Returns all the elements of the given node which nodeName match the given name.
 * @param  {Node} node - The node to use to find the matches.
 * @param  {String} name - The name to look for.
 * @return {Array<ChildNode>}
 */
function childrenByName(node, name) {
  const children = [];
  for (const childKey in node.childNodes) {
    const child = node.childNodes[childKey];

    if (
      child.nodeName === name ||
      name === `vmap:${child.nodeName}` ||
      child.nodeName === `vmap:${name}`
    ) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Parses a node value giving priority to CDATA as a JSON over text, if CDATA is not a valid JSON it is converted to text
 * @param  {Node} node - The node to parse the value from.
 * @return {String|Object}
 */
function parseNodeValue(node) {
  if (!node || !node.childNodes) {
    return {};
  }

  // Trying to find and parse CDATA as JSON
  const cdatas = [];
  for (const childKey in node.childNodes) {
    const childNode = node.childNodes[childKey];

    if (childNode.nodeName === '#cdata-section') {
      cdatas.push(childNode);
    }
  }

  if (cdatas && cdatas.length > 0) {
    try {
      return JSON.parse(cdatas[0].data);
    } catch (e) {}
  }

  // Didn't find any CDATA or failed to parse it as JSON
  let nodeText = '';
  for (const childKey in node.childNodes) {
    const childNode = node.childNodes[childKey];

    switch (childNode.nodeName) {
      case '#text':
        nodeText += childNode.textContent.trim();
        break;
      case '#cdata-section':
        nodeText += childNode.data;
        break;
    }
  }
  return nodeText;
}

/**
 * Parses an XML node recursively.
 * @param  {Node} node - The node to parse.
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
    for (const attrKey in node.attributes) {
      const nodeAttr = node.attributes[attrKey];

      if (nodeAttr.nodeName && nodeAttr.nodeValue !== undefined && nodeAttr.nodeValue !== null) {
        parsedNode.attributes[nodeAttr.nodeName] = nodeAttr.nodeValue;
      }
    }
  }

  if (node.childNodes) {
    for (const childKey in node.childNodes) {
      const childNode = node.childNodes[childKey];
      if (childNode.nodeName && childNode.nodeName.substring(0, 1) !== '#') {
        parsedNode.children[childNode.nodeName] = parseXMLNode(childNode);
      }
    }
  }

  return parsedNode;
}

export { childrenByName, parseNodeValue, parseXMLNode };
