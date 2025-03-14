import { $createTextNode, ElementNode, LexicalNode, RangeSelection, TextNode } from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';

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
	const afterNode = $createTextNode(afterText);
	afterNode.setStyle(textNode.getStyle());
	afterNode.setFormat(textNode.getFormat());
	betweenNode.insertAfter(afterNode);

	return betweenNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
	const anchor = selection.anchor;
	const focus = selection.focus;
	const anchorNode = selection.anchor.getNode();
	const focusNode = selection.focus.getNode();
	if (anchorNode === focusNode) {
		return anchorNode;
	}
	const isBackward = selection.isBackward();
	if (isBackward) {
		return $isAtNodeEnd(focus) ? anchorNode : focusNode;
	} else {
		return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
	}
}
