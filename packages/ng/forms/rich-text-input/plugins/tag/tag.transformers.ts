import { TextMatchTransformer } from '@lexical/markdown';
import { $createTagNode, TagNode } from './tag-node';

/**
 * Transformer for tag nodes
 * It will match the following pattern `{{Tag}}` and create a TagNode (using `replace` function).
 * It will export the tag node to markdown (as `{{Tag}}`) using the `export` function.
 *
 * @docs https://github.com/facebook/lexical/tree/main/packages/lexical-markdown#transformers
 */
export const TAGS: TextMatchTransformer = {
	dependencies: [TagNode],
	export: (node) => (node instanceof TagNode ? `{{${node.getTagKey()}}}` : null),
	importRegExp: /{{(\w+)}}/,
	regExp: /{{(\w+)}}/,
	replace: (textNode, match) => {
		if (match[1]) {
			textNode.replace($createTagNode(match[1]));
		}
	},
	type: 'text-match',
	trigger: '{{',
};
