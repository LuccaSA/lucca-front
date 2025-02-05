import { InjectionToken } from '@angular/core';
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';
import { sanitize } from 'isomorphic-dompurify';

export abstract class RichTextFormater {
	abstract parse(editor: LexicalEditor, text?: string | null): Promise<void>;
	abstract format(editor: LexicalEditor): Promise<string>;
}

export class MarkdownFormater extends RichTextFormater {
	override async parse(editor: LexicalEditor, markdown?: string | null): Promise<void> {
		const lexicalMarkdown = await import('@lexical/markdown');
		editor.update(() => {
			lexicalMarkdown.$convertFromMarkdownString(markdown ?? '', lexicalMarkdown.TRANSFORMERS);
		});
		lexicalMarkdown.$convertFromMarkdownString(markdown ?? '', lexicalMarkdown.TRANSFORMERS);
	}

	override async format(editor: LexicalEditor): Promise<string> {
		const lexicalMarkdown = await import('@lexical/markdown');
		let result = '';
		editor.getEditorState().read(() => (result = lexicalMarkdown.$convertToMarkdownString(lexicalMarkdown.TRANSFORMERS)));
		return result;
	}
}

export class HTMLFormater extends RichTextFormater {
	override async parse(editor: LexicalEditor, htmlString?: string | null): Promise<void> {
		const parser = new DOMParser();
		const dom = parser.parseFromString(
			sanitize(htmlString, {
				FORBID_ATTR: ['style'],
			}),
			'text/html',
		);
		const lexicalHtml = await import('@lexical/html');

		editor.update(() => {
			// Once you have the DOM instance it's easy to generate LexicalNodes.
			const nodes = lexicalHtml.$generateNodesFromDOM(editor, dom);

			// Select the root
			$getRoot().clear();
			$getRoot().select();

			// Insert them at a selection.
			$insertNodes(nodes);
		});
	}

	override async format(editor: LexicalEditor): Promise<string> {
		const lexicalHTML = await import('@lexical/html');
		let result = '';
		editor.getEditorState().read(() => (result = lexicalHTML.$generateHtmlFromNodes(editor)));
		return sanitize(result, {
			FORBID_ATTR: ['style'],
		});
	}
}

export const RICH_TEXT_FORMATER = new InjectionToken<RichTextFormater>('RICH_TEXT_FORMATER', {
	factory: () => new MarkdownFormater(),
});
