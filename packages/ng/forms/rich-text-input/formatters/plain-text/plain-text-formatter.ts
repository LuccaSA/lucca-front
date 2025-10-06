import { Provider } from '@angular/core';
import { $convertFromMarkdownString, $convertToMarkdownString, Transformer } from '@lexical/markdown';
import { registerPlainText } from '@lexical/plain-text';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
import { LexicalEditor } from 'lexical';

const DEFAULT_PLAIN_TEXT_MD_TRANSFORMERS: Transformer[] = [];

export class PlainTextFormatter extends RichTextFormatter {
	#transformers: Transformer[] = DEFAULT_PLAIN_TEXT_MD_TRANSFORMERS;
	readonly #shouldPreserveNewLinesInMarkdown = true;

	constructor(transformers?: Transformer[]) {
		super();
		if (transformers) {
			this.#transformers = transformers;
		}
	}

	override registerTextPlugin(editor: LexicalEditor) {
		return registerPlainText(editor);
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

export function provideLuRichTextPlainTextFormatter(transformers?: Transformer[]): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new PlainTextFormatter(transformers),
	};
}
