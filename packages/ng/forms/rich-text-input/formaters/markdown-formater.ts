import { LexicalEditor } from 'lexical';
import { RichTextFormater } from './rich-text-formater';
import { $convertFromMarkdownString, $convertToMarkdownString, Transformer, TRANSFORMERS } from '@lexical/markdown';

export class MarkdownFormater extends RichTextFormater {
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
