import { LexicalEditor } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './rich-text-formatter';
import { $convertFromMarkdownString, $convertToMarkdownString, Transformer, TRANSFORMERS } from '@lexical/markdown';
import { Provider } from '@angular/core';

export class MarkdownFormatter extends RichTextFormatter {
	#transformers = TRANSFORMERS;

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
