import { $createTagNode } from '@lucca-front/ng/forms/rich-text-input';
import { PlainTextTransformer } from './plain-text-transformer';

/**
 * Transformer for tag nodes
 * It will match the following pattern `{{Tag}}` and create a TagNode (using `replace` function).
 *
 */
export const PLAINTEXT_TAGS: PlainTextTransformer = {
	regExp: /{{(\w+)}}/,
	replace: (textNode, match) => {
		if (match[1]) {
			textNode.replace($createTagNode(match[1].trim()));
		}
	},
};
