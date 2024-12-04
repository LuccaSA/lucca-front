import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, LexicalEditor, SELECTION_CHANGE_COMMAND, TextFormatType } from 'lexical';

export function registerFormatSelectionChange(editor: LexicalEditor, format: TextFormatType, onselectionchange: (hasFormat: boolean) => void) {
	return editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				onselectionchange(selection.hasFormat(format));
			}
			return false;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
