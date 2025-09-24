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
	STRIKETHROUGH,
	Transformer,
	UNORDERED_LIST,
} from '@lexical/markdown';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
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
	#shouldPreserveNewLinesInMarkdown = false;

	constructor(transformers?: Transformer[], shouldPreserveNewLinesInMarkdown = false) {
		super();
		if (transformers) {
			this.#transformers = transformers;
		}
		this.#shouldPreserveNewLinesInMarkdown = shouldPreserveNewLinesInMarkdown;
	}

	override parse(editor: LexicalEditor, markdown?: string | null): void {
		editor.update(() => {
			$convertFromMarkdownString(markdown ?? '', this.#transformers, undefined, this.#shouldPreserveNewLinesInMarkdown);
		});
		$convertFromMarkdownString(markdown ?? '', this.#transformers, undefined, this.#shouldPreserveNewLinesInMarkdown);
	}

	override format(editor: LexicalEditor): string {
		let result = '';
		editor.getEditorState().read(() => (result = $convertToMarkdownString(this.#transformers, undefined, this.#shouldPreserveNewLinesInMarkdown)));
		return result;
	}
}

export function provideLuRichTextMarkdownFormatter(transformers?: Transformer[], shouldPreserveNewLinesInMarkdown = false): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new MarkdownFormatter(transformers, shouldPreserveNewLinesInMarkdown),
	};
}
