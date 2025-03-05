import { $createParagraphNode, $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, CommandPayloadType, createCommand, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingNode } from '@lexical/rich-text';
import { $getNearestNodeOfType } from '@lexical/utils';
import { getSelectedNode } from '../../utils';

export const FORMAT_HEADINGS = createCommand<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph'>('FORMAT_HEADINGS');

export function registerHeadings(editor: LexicalEditor) {
	return editor.registerCommand(
		FORMAT_HEADINGS,
		(headingSize) => {
			editor.update(() => {
				const selection = $getSelection();
				$setBlocksType(selection, () => {
					if (headingSize === 'paragraph') {
						return $createParagraphNode();
					}
					return $createHeadingNode(headingSize);
				});
			});

			return true;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}

export function registerHeadingsSelectionChange(editor: LexicalEditor, onselectionchange: (type: CommandPayloadType<typeof FORMAT_HEADINGS>) => void) {
	return editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const node = getSelectedNode(selection);
				const element = $getNearestNodeOfType(node, HeadingNode);
				const type = element ? element.getTag() : 'paragraph';
				onselectionchange(type as CommandPayloadType<typeof FORMAT_HEADINGS>);
			}
			return false;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
