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
 * Parses a node text (for legacy support).
 * @param  {Object} node - The node to parse the text from.
 * @return {String}
 */
function parseNodeText(node) {
  return (
    node &&
    node.childNodes &&
    [...node.childNodes]
      .filter(node => node.nodeName === '#text')
      .reduce((previous, current) => previous + current.textContent.trim(), '')
  );
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
    value: null
  };

  parsedNode.value = parseNodeText(node) || null;

  if (node.attributes) {
    [...node.attributes].forEach(nodeAttr => {
      if (
        nodeAttr.nodeName &&
        nodeAttr.nodeValue !== undefined &&
        nodeAttr.nodeValue !== null
      ) {
        parsedNode.attributes[nodeAttr.nodeName] = nodeAttr.nodeValue;
      }
    });
  }

  [...node.childNodes]
    .filter(
      childNode =>
        childNode.nodeName !== '#text' && childNode.nodeName !== '#comment'
    )
    .forEach(childNode => {
      parsedNode.children[childNode.nodeName] = parseXMLNode(childNode);
    });

  return parsedNode;
}

export { childrenByName, parseNodeText, parseXMLNode };
