import { LexicalEditor } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
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
	STRIKETHROUGH,
	Transformer,
	UNORDERED_LIST,
} from '@lexical/markdown';
import { Provider } from '@angular/core';

export class MarkdownFormatter extends RichTextFormatter {
	#transformers: Transformer[] = [
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

	constructor(transformers?: Transformer[]) {
		super();
		if (transformers) {
			this.#transformers = transformers;
		}
	}

	override parse(editor: LexicalEditor, markdown?: string | null): void {
		editor.update(() => {
			$convertFromMarkdownString(markdown ?? '', this.#transformers);
		});
		$convertFromMarkdownString(markdown ?? '', this.#transformers);
	}

	override format(editor: LexicalEditor): string {
		let result = '';
		editor.getEditorState().read(() => (result = $convertToMarkdownString(this.#transformers)));
		return result;
	}
}

export function provideLuRichTextMarkdownFormatter(transformers?: Transformer[]): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new MarkdownFormatter(transformers),
	};
}
