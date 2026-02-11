import { Provider } from '@angular/core';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
import { $createParagraphNode, $createTextNode, $getRoot, LexicalEditor, TextNode } from 'lexical';
import { $rootTextContent } from '@lexical/text';
import { PLAINTEXT_TAGS, PlainTextTransformer } from './transformers';
import { registerPlainText } from '@lexical/plain-text';

export class PlainTextFormatter extends RichTextFormatter {
	#transformers: PlainTextTransformer[] = [PLAINTEXT_TAGS];

	constructor(transformers?: PlainTextTransformer[]) {
		super();
		if (transformers) {
			this.#transformers = transformers;
		}
	}

	override registerTextPlugin(editor: LexicalEditor) {
		return registerPlainText(editor);
	}

	override parse(editor: LexicalEditor, text?: string | null): void {
		editor.update(() => {
			const rootNode = $getRoot();
			rootNode.clear();
			if (text) {
				const paragraphNode = $createParagraphNode();
				const textNode = $createTextNode(text);
				paragraphNode.append(textNode);
				rootNode.append(paragraphNode);
				this.#applyTransformers(textNode);
			}
		});
	}

	override format(editor: LexicalEditor): string {
		let result = '';
		editor.getEditorState().read(() => (result = $rootTextContent()));
		return result;
	}

	#applyTransformers(textNode: TextNode): void {
		for (const t of this.#transformers) {
			const match = textNode.getTextContent().match(t.regExp);

			if (!match) {
				continue;
			}

			const startIndex = match.index || 0;
			const endIndex = startIndex + match[0].length;

			let transformedNode: TextNode, nodeAfter: TextNode, nodeBefore: TextNode;
			if (startIndex === 0) {
				[transformedNode, nodeAfter] = textNode.splitText(endIndex);
			} else {
				[nodeBefore, transformedNode, nodeAfter] = textNode.splitText(startIndex, endIndex);
			}
			if (transformedNode) {
				t.replace(transformedNode, match);
			}
			if (nodeAfter) {
				this.#applyTransformers(nodeAfter);
			}
			if (nodeBefore) {
				this.#applyTransformers(nodeBefore);
			}
			break;
		}
	}
}

export function provideLuRichTextPlainTextFormatter(transformers?: PlainTextTransformer[]): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new PlainTextFormatter(transformers),
	};
}
