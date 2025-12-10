import { TextNode } from 'lexical';

export interface PlainTextTransformer {
	regExp: RegExp;
	replace: (texNode: TextNode, match: RegExpMatchArray) => void;
}
