/* Example plugin, don't use this in live code. */
export function rawtextPlugin() {
  const toHTMLRenderers = {
    rawtext(node) {
      const rawtext = node.literal;
      return [
        { type: 'openTag', tagName: 'div', outerNewLine: true },
        { type: 'html', content: rawtext },
        { type: 'closeTag', tagName: 'div', outerNewLine: true }
      ];
    },
  }

  return { toHTMLRenderers }
}

export function itemCardPlugin() {
  const toHTMLRenderers = {
    itemCard(node) {
      return [
        { type: 'openTag', tagName: 'div', outerNewLine: true },
        { type: 'html', content: node.literal },
        { type: 'closeTag', tagName: 'div', outerNewLine: true }
      ];
    },
  }

  return { toHTMLRenderers }
}