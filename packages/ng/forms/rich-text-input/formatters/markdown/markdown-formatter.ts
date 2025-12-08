import { Provider } from '@angular/core';
import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
	BOLD_ITALIC_STAR,
	BOLD_ITALIC_UNDERSCORE,
	BOLD_STAR,
	BOLD_UNDERSCORE,
	HEADING,
	INLINE_CODE,
	ITALIC_STAR,
	ITALIC_UNDERSCORE,
	LINK,
	ORDERED_LIST,
	registerMarkdownShortcuts,
	STRIKETHROUGH,
	Transformer,
	UNORDERED_LIST,
} from '@lexical/markdown';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
import { sanitize } from 'isomorphic-dompurify';
import { LexicalEditor } from 'lexical';

export const DEFAULT_MARKDOWN_TRANSFORMERS: Transformer[] = [
	UNORDERED_LIST,
	HEADING,
	ORDERED_LIST,
	BOLD_ITALIC_STAR,
	BOLD_ITALIC_UNDERSCORE,
	BOLD_STAR,
	BOLD_UNDERSCORE,
	INLINE_CODE,
	ITALIC_STAR,
	ITALIC_UNDERSCORE,
	STRIKETHROUGH,
	LINK,
];

export class MarkdownFormatter extends RichTextFormatter {
	#transformers: Transformer[] = DEFAULT_MARKDOWN_TRANSFORMERS;

	constructor(transformers?: Transformer[]) {
		super();
		if (transformers) {
			this.#transformers = transformers;
		}
	}

	override registerTextPlugin(editor: LexicalEditor): () => void {
		return mergeRegister(registerMarkdownShortcuts(editor, this.#transformers), registerRichText(editor));
	}

	override parse(editor: LexicalEditor, markdown?: string | null): void {
		editor.update(() => {
			$convertFromMarkdownString(sanitize(markdown ?? ''), this.#transformers, null, true);
		});
	}

	override format(editor: LexicalEditor): string {
		let result = '';
		editor.getEditorState().read(() => (result = $convertToMarkdownString(this.#transformers, null, true)));
		return sanitize(result);
	}
}

export function provideLuRichTextMarkdownFormatter(transformers?: Transformer[]): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new MarkdownFormatter(transformers),
	};
}
