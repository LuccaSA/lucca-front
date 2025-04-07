import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { $createLinkNode, $isLinkNode, $toggleLink, AutoLinkNode, LinkNode } from '@lexical/link';
import { $getNearestNodeOfType } from '@lexical/utils';
import { getSelectedNode } from '../../utils';

export const FORMAT_LINK = createCommand<string | undefined>('FORMAT_LINK');

export function registerLink(editor: LexicalEditor) {
	return editor.registerCommand(
		FORMAT_LINK,
		(href) => {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = getSelectedNode(selection);
					const parent = $getNearestNodeOfType(node, LinkNode) || $getNearestNodeOfType(node, AutoLinkNode);
					if (parent) {
						if (href) {
							const linkNode = $createLinkNode(href, {
								rel: parent.__rel,
								target: parent.__target,
								title: parent.__title,
							});
							parent.replace(linkNode, true);
						} else {
							$toggleLink(null);
						}
					} else if (href) {
						$toggleLink(href);
					}
				}
			});
			return true;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}

export function registerLinkSelectionChange(editor: LexicalEditor, onselectionchange: (isLink: boolean) => void) {
	return editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const node = getSelectedNode(selection);
				const parent = node.getParent();
				onselectionchange($isLinkNode(node) || $isLinkNode(parent));
			}
			return false;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
