import { LinkNode } from '@lexical/link';
import { $createTextNode, LexicalEditor, TextNode } from 'lexical';
import { PopoverLinkNode } from './popover-link-node';

const URL_REGEX = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;
const EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

interface Matcher {
	regex: RegExp;
	transformer: (text: string) => string;
}

const MATCHERS: Matcher[] = [
	{
		regex: URL_REGEX,
		transformer: (text: string) => (text.startsWith('http') ? text : `https://${text}`),
	},
	{
		regex: EMAIL_REGEX,
		transformer: (text: string) => `mailto:${text}`,
	},
];

function findMatch(text: string): { matcher: Matcher; match: RegExpMatchArray; index: number } | null {
	for (const matcher of MATCHERS) {
		const match = text.match(matcher.regex);
		if (match && match.index !== undefined) {
			return { matcher, match, index: match.index };
		}
	}
	return null;
}

export function registerLinkTransform(editor: LexicalEditor): () => void {
	return editor.registerNodeTransform(TextNode, (textNode: TextNode) => {
		// Don't auto-link if already inside a link
		const parent = textNode.getParent();
		if (parent && (parent.getType() === PopoverLinkNode.getType() || parent.getType() === LinkNode.getType())) {
			return;
		}

		const text = textNode.getTextContent();
		const result = findMatch(text);

		if (!result) {
			return;
		}

		const { matcher, match, index } = result;
		const matchedText = match[0];
		const url = matcher.transformer(matchedText);
		const matchLength = matchedText.length;

		// Create the link node
		const linkNode = new PopoverLinkNode(url);
		const linkTextNode = $createTextNode(matchedText);
		linkNode.append(linkTextNode);

		// Case 1: The match is in the middle of the text
		if (index > 0 && index + matchLength < text.length) {
			const beforeText = text.slice(0, index);
			const afterText = text.slice(index + matchLength);

			textNode.setTextContent(beforeText);
			const afterNode = $createTextNode(afterText);

			textNode.insertAfter(linkNode);
			linkNode.insertAfter(afterNode);
		}
		// Case 2: The match is at the beginning
		else if (index === 0 && matchLength < text.length) {
			const afterText = text.slice(matchLength);
			const afterNode = $createTextNode(afterText);

			textNode.replace(linkNode);
			linkNode.insertAfter(afterNode);
		}
		// Case 3: The match is at the end
		else if (index > 0 && index + matchLength >= text.length) {
			const beforeText = text.slice(0, index);

			textNode.setTextContent(beforeText);
			textNode.insertAfter(linkNode);
		}
		// Case 4: The match is the entire text
		else {
			textNode.replace(linkNode);
		}
	});
}
