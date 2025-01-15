import {
	$createParagraphNode,
	$createRangeSelection,
	$createTextNode,
	$getRoot,
	$getSelection,
	$isRangeSelection,
	$setSelection,
	createEditor,
	LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { getSelectedNode } from '@shared/components/rich-text-editor/utils';
import {
	FORMAT_LINK,
	registerLink,
	registerLinkSelectionChange,
} from './link.command';
import { $createLinkNode, AutoLinkNode, LinkNode } from '@lexical/link';

describe(`Link Commands`, () => {
	// Do not mock LexicalEditor: we need most functionalities for tests to have sense
	let editor: LexicalEditor;
	let command: () => void;

	beforeEach(() => {
		const container = document.createElement('div');
		container.contentEditable = 'true';
		document.body.appendChild(container);
		editor = createEditor({
			nodes: [LinkNode, AutoLinkNode],
		});
		command = mergeRegister(registerLink(editor));
		editor.setRootElement(container);
	});

	afterEach(() => {
		command();
	});

	describe(`registerLink`, () => {
		let href: string | undefined;

		it(`should convert node to given link`, () => {
			expect.hasAssertions();
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const node1 = $createTextNode('text');
				node1.setFormat('bold');
				p.append(node1);
				root.append(p);

				const selection = $createRangeSelection();
				selection.setTextNodeRange(node1, 0, node1, 2);
				$setSelection(selection);
			});

			editor.dispatchCommand(FORMAT_LINK, 'http://link.fr');

			editor.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = getSelectedNode(selection);
					const linkNode = $getNearestNodeOfType(node, LinkNode);
					expect(linkNode?.getURL()).toEqual('http://link.fr');
					expect(linkNode?.getAllTextNodes()?.length).toEqual(1);
					expect(
						linkNode?.getAllTextNodes()[0]?.getTextContent(),
					).toEqual('te');
					expect(linkNode?.getAllTextNodes()[0]?.getFormat()).toEqual(
						1,
					);
				}
			});
		});

		it(`should update existing link if url is changed`, () => {
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const link = $createLinkNode('http://link.fr');
				const node1 = $createTextNode('text');
				link.append(node1);
				p.append(link);
				root.append(p);

				const selection = node1.select();
				$setSelection(selection);
			});

			editor.dispatchCommand(FORMAT_LINK, 'http://test.fr');

			editor.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = getSelectedNode(selection);
					const linkNode = $getNearestNodeOfType(node, LinkNode);
					href = linkNode?.getURL();
				}
			});

			expect(href).toEqual('http://test.fr');
		});

		it(`should delete existing link if null is provided`, () => {
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const link = $createLinkNode('http://link.fr');
				const node1 = $createTextNode('text');
				link.append(node1);
				p.append(link);
				root.append(p);

				const selection = node1.select();
				$setSelection(selection);
			});

			editor.dispatchCommand(FORMAT_LINK, undefined);

			editor.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = getSelectedNode(selection);
					const linkNode = $getNearestNodeOfType(node, LinkNode);
					href = linkNode?.getURL();
					expect(href).toEqual(undefined);
				}
			});
		});
	});

	describe(`registerLinkSelectionChange`, () => {
		let link: boolean;
		let cleanup: () => void;

		beforeEach(() => {
			cleanup = registerLinkSelectionChange(editor, (isLink) => {
				link = isLink;
			});
		});

		afterEach(() => {
			cleanup();
		});

		it('should listen to selection change and return true if selected text is a link', () => {
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const link = $createLinkNode('http://link.fr');
				const node1 = $createTextNode('text');
				link.append(node1);
				p.append(link);
				root.append(p);

				const selection = node1.select();
				$setSelection(selection);

				editor.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
			});

			expect(link).toEqual(true);
		});

		it('should listen to selection change and return false is not a link', () => {
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const node1 = $createTextNode('text');
				p.append(node1);
				root.append(p);

				const selection = node1.select();
				$setSelection(selection);

				editor.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
			});

			expect(link).toEqual(false);
		});
	});
});
