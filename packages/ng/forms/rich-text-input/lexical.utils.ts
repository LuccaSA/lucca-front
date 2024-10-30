import { $createTextNode, LexicalNode, TextNode } from 'lexical';

/**
 * Cut a single text node into:
 * - A shorter text node
 * - A new node created by the replacer
 * - The remaining text in a new text node
 *
 * Returns the new node created by the replacer.
 */
export function replaceTextNodeContentPartWith<TNode extends LexicalNode>(textNode: TextNode, fromIndex: number, toIndex: number, replacer: (text: string) => TNode): TNode {
	const safeFrom = Math.min(toIndex, fromIndex);
	const safeTo = Math.max(toIndex, fromIndex);
	const text = textNode.getTextContent();
	const beforeText = text.slice(0, safeFrom);
	const betweenText = text.slice(safeFrom, safeTo);
	const afterText = text.slice(safeTo);

	// 1. Shorten the original text node
	textNode.setTextContent(beforeText);

	// 2. Create the new node
	const betweenNode = replacer(betweenText);
	textNode.insertAfter(betweenNode);

	// 3. Add the remaining text
	betweenNode.insertAfter($createTextNode(afterText));

	return betweenNode;
}
