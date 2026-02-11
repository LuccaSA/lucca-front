import { Provider } from '@angular/core';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { registerRichText } from '@lexical/rich-text';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from '@lucca-front/ng/forms/rich-text-input';
import DOMPurify from 'isomorphic-dompurify';
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';

export class HtmlFormatter extends RichTextFormatter {
	override registerTextPlugin(editor: LexicalEditor) {
		return registerRichText(editor);
	}

	override parse(editor: LexicalEditor, htmlString?: string | null): void {
		const parser = new DOMParser();
		const dom = parser.parseFromString(
			DOMPurify.sanitize(htmlString, {
				FORBID_ATTR: ['style', 'class'],
			}),
			'text/html',
		);

		editor.update(() => {
			// Once you have the DOM instance it's easy to generate LexicalNodes.
			const nodes = $generateNodesFromDOM(editor, dom);

			// Select the root
			$getRoot().clear();
			$getRoot().select();

			// Insert them at a selection.
			$insertNodes(nodes);
		});
	}

	override format(editor: LexicalEditor): string {
		let result = '';
		editor.getEditorState().read(() => (result = $generateHtmlFromNodes(editor)));
		return DOMPurify.sanitize(result, {
			FORBID_ATTR: ['style', 'class'],
		});
	}
}

export function provideLuRichTextHTMLFormatter(): Provider {
	return {
		provide: RICH_TEXT_FORMATTER,
		useFactory: () => new HtmlFormatter(),
	};
}
