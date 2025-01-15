import { $createParagraphNode, $createTextNode, $getSelection, $isRangeSelection, $isTextNode, COMMAND_PRIORITY_NORMAL, createCommand, LexicalEditor } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { replaceTextNodeContentPartWith } from '../../utils';

export const CLEAR_FORMAT = createCommand<void>('CLEAR_FORMAT');

export function registerClearFormat(editor: LexicalEditor) {
	return editor.registerCommand(
		CLEAR_FORMAT,
		() => {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const anchor = selection.anchor;
					const focus = selection.focus;
					const nodes = selection.getNodes();

					nodes.forEach((node) => {
						if ($isTextNode(node)) {
							// use selection offsets if within current node
							const start = node.getKey() === anchor.key ? anchor.offset : 0;
							const end = node.getKey() === focus.key ? focus.offset : node.getTextContent().length;
							if (start === end) {
								node.setFormat(0);
								node.setStyle('');
							} else {
								replaceTextNodeContentPartWith(node, start, end, (text) => $createTextNode(text));
							}
						}
					});
				}
				$setBlocksType(selection, () => $createParagraphNode());
			});

			return true;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
