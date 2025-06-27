import { Transformer } from '@lexical/markdown';
import { TagNode } from './tag-node';

/**
 * Transformer for tag nodes
 * It will match the following pattern `{{Tag}}` and create a TagNode (using `replace` function).
 * It will export the tag node to markdown (as `{{Tag}}`) using the `export` function.
 *
 * @docs https://github.com/facebook/lexical/tree/main/packages/lexical-markdown#transformers
 */
export const TAG: Transformer = {
	dependencies: [TagNode],
	export: (node) => (node instanceof TagNode ? node.exportMarkdown() : null),
	importRegExp: /{{(\w+)}}/,
	regExp: /{{(\w+)}}/,
	replace: (textNode, match) => {
		const [, key] = match;
		textNode.replace(new TagNode(key));
	},
	type: 'text-match',
	trigger: '{{',
};
