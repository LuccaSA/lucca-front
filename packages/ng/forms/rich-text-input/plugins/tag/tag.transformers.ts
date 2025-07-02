import { TextMatchTransformer } from '@lexical/markdown';
import { TagNode } from './tag-node';

/**
 * Transformer for tag nodes
 * It will match the following pattern `{{Tag}}` and create a TagNode (using `replace` function).
 * It will export the tag node to markdown (as `{{Tag}}`) using the `export` function.
 *
 * @docs https://github.com/facebook/lexical/tree/main/packages/lexical-markdown#transformers
 */
export const TAGS: TextMatchTransformer = {
	dependencies: [TagNode],
	export: (node) => (node instanceof TagNode ? `{{${node.tag.key}}}` : null),
	importRegExp: /{{(\w+)}}/,
	regExp: /{{(\w+)}}/,
	replace: (textNode, match) => {
		const tag = TagNode.getAvailableTags().find((t) => t.key === match[1]);
		if (tag) {
			textNode.replace(new TagNode(tag));
		}
	},
	type: 'text-match',
	trigger: '{{',
};
