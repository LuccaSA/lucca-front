import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';
import { RichTextFormater } from './rich-text-formater';
import { sanitize } from 'isomorphic-dompurify';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';

export class HTMLFormater extends RichTextFormater {
	override parse(editor: LexicalEditor, htmlString?: string | null): void {
		const parser = new DOMParser();
		const dom = parser.parseFromString(
			sanitize(htmlString, {
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
		return sanitize(result, {
			FORBID_ATTR: ['style'],
		});
	}
}
