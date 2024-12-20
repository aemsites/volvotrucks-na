/**
 * Add text-alignment or special styling to text blocks, as some stylings are stripped from the
 * Word document.
 * @param block
 */
export default function decorate(block) {
  // unwrap empty divs that represent the row in the Word document.
  // leaving the column-div to ensure that each row is a block.
  [...block.children]
    .filter((e) => e.tagName === 'DIV')
    .filter((e) => e.attributes.length === 0)
    .forEach((node) => {
      // Move all children nodes to the parent
      while (node.firstChild) {
        block.insertBefore(node.firstChild, node);
      }

      // node becomes an empty element
      node.remove();
    });
}
