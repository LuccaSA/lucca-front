import { $createLinkNode, $isLinkNode, $toggleLink } from '@lexical/link';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import { $createTextNode, $getSelection, $isRangeSelection, $isTextNode, COMMAND_PRIORITY_NORMAL, KEY_ENTER_COMMAND, LexicalEditor, createCommand } from 'lexical';
import { replaceTextNodeContentPartWith } from './lexical.utils';

export const FORMAT_HEADINGS = createCommand<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>('FORMAT_HEADINGS');

export const FORMAT_QUOTE = createCommand<void>('FORMAT_QUOTE');
export const FORMAT_LINK = createCommand<void>('FORMAT_LINK');
export const CLEAR_FORMAT = createCommand<void>('CLEAR_FORMAT');

export function registerFormatOptions(editor: LexicalEditor): () => void {
	return mergeRegister(
		editor.registerCommand(
			FORMAT_HEADINGS,
			(headingSize) => {
				editor.update(() => {
					const selection = $getSelection();
					$setBlocksType(selection, () => $createHeadingNode(headingSize));
				});

				return true;
			},
			COMMAND_PRIORITY_NORMAL,
		),
		editor.registerCommand(
			FORMAT_QUOTE,
			() => {
				editor.update(() => {
					const selection = $getSelection();
					$setBlocksType(selection, () => $createQuoteNode());
				});

				return true;
			},
			COMMAND_PRIORITY_NORMAL,
		),
		editor.registerCommand(
			CLEAR_FORMAT,
			() => {
				editor.update(() => {
					$getSelection()
						?.getNodes()
						.filter($isTextNode)
						.forEach((node) => node.setFormat(0));
				});

				return true;
			},
			COMMAND_PRIORITY_NORMAL,
		),
		editor.registerCommand(
			FORMAT_LINK,
			() => {
				editor.update(() => {
					const selection = $getSelection();
					if (!selection || !$isRangeSelection(selection)) {
						return;
					}
					for (const node of selection.getNodes()) {
						if ($isLinkNode(node)) {
							$toggleLink(null);
						} else if ($isTextNode(node)) {
							replaceTextNodeContentPartWith(node, selection.anchor.offset, selection.focus.offset, (selectedText) => {
								const href = selectedText.startsWith('http') ? selectedText : `https://${selectedText}`;
								const link = $createLinkNode(href);
								link.append($createTextNode(selectedText));
								return link;
							});
						}
					}
				});

				return true;
			},
			COMMAND_PRIORITY_NORMAL,
		),
	);
}

export function registerCtrlEnterShortcut(editor: LexicalEditor, onCtrlEnter: () => void): () => void {
	return editor.registerCommand(
		KEY_ENTER_COMMAND,
		(event) => {
			const isCtrlEnter = event?.ctrlKey || event?.metaKey;

			if (isCtrlEnter) {
				onCtrlEnter();
				event?.preventDefault();
			}

			return !!isCtrlEnter;
		},
		COMMAND_PRIORITY_NORMAL,
	);
}
