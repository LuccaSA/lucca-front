import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand, INSERT_PARAGRAPH_COMMAND, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { $handleListInsertParagraph, insertList, ListNode, ListType, removeList } from '@lexical/list';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { getSelectedNode } from '../../utils';

export const FORMAT_LIST = createCommand<ListType>('FORMAT_LIST');

export function registerListsGlobal(editor: LexicalEditor) {
	return mergeRegister(
		editor.registerCommand(
			FORMAT_LIST,
			(type) => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = getSelectedNode(selection);
					const parent = $getNearestNodeOfType(node, ListNode);
					if (parent && parent.getListType() === type) {
						removeList(editor);
					} else if (parent) {
						parent.setListType(type);
					} else {
						insertList(editor, type);
					}
				}
				return true;
			},
			COMMAND_PRIORITY_NORMAL,
		),
		// end list with enter key on an empty list item node
		editor.registerCommand(INSERT_PARAGRAPH_COMMAND, () => $handleListInsertParagraph(), COMMAND_PRIORITY_NORMAL),
	);
}

export function registerListsSelectionChange(editor: LexicalEditor, type: ListType, onselectionchange: (isList: boolean) => void) {
	return editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const node = getSelectedNode(selection);
				const parent = $getNearestNodeOfType(node, ListNode);
				onselectionchange(Boolean(parent && parent.getListType() === type));
			}
			return false;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
