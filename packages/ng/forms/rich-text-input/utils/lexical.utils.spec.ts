import { $createParagraphNode, $createRangeSelection, $createTextNode, $getRoot, $getSelection, $isRangeSelection, createEditor, LexicalEditor, LexicalNode, RootNode, TextNode } from 'lexical';
import { getSelectedNode, replaceTextNodeContentPartWith } from './lexical.utils';

describe('Lexical Utils', () => {
	// Do not mock LexicalEditor: we need most functionalities for tests to have sense
	let editor: LexicalEditor;

	beforeEach(() => {
		const container = document.createElement('div');
		container.contentEditable = 'true';
		document.body.appendChild(container);
		editor = createEditor();
		editor.setRootElement(container);
	});

	describe('replaceTextNodeContentPartWith', () => {
		it(`should insert node inside text`, () => {
			expect.hasAssertions();
			let root: RootNode = undefined as unknown as RootNode;
			editor.update(() => {
				root = $getRoot();
				const p = $createParagraphNode();
				const text = $createTextNode('test');

				p.append(text);
				root.append(p);

				replaceTextNodeContentPartWith(text, 1, 3, () => $createTextNode('hello'));
				expect(root.getTextContent()).toEqual('thellot');
			});
		});

		it(`should keep text style before and after`, () => {
			expect.hasAssertions();
			let root: RootNode = undefined as unknown as RootNode;
			editor.update(() => {
				root = $getRoot();
				const p = $createParagraphNode();
				const text = $createTextNode('test');
				text.setFormat('bold');

				p.append(text);
				root.append(p);

				replaceTextNodeContentPartWith(text, 1, 3, () => $createTextNode('hello'));
				expect(root.getAllTextNodes()[0].getFormat()).toEqual(1);
				expect(root.getAllTextNodes()[1].getFormat()).toEqual(0);
				expect(root.getAllTextNodes()[2].getFormat()).toEqual(1);
			});
		});
	});

	describe(`getSelectedNode`, () => {
		it(`should return the selected node`, () => {
			expect.hasAssertions();
			let root: RootNode = undefined as unknown as RootNode;
			editor.update(() => {
				root = $getRoot();
				const p = $createParagraphNode();
				const text = $createTextNode('test');

				p.append(text);
				root.append(p);
				text.select();

				const selection = $getSelection();
				let node: LexicalNode | undefined = undefined;
				if ($isRangeSelection(selection)) {
					node = getSelectedNode(selection);
				}
				expect(node).toEqual(text);
			});
		});

		it(`should return the selected focus node if selection is multi node and not backward`, () => {
			let node: TextNode | undefined = undefined;
			let text2: TextNode | undefined = undefined;
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const text = $createTextNode('test');
				text2 = $createTextNode('test2');

				p.append(text, text2);
				root.append(p);

				const selection = $createRangeSelection();
				selection.setTextNodeRange(text, 3, text2, 1);
				node = getSelectedNode(selection) as TextNode;
			});
			expect(node).toEqual(text2);
		});

		it(`should return the selected anchor node if selection is multi node and not backward at node end`, () => {
			let node: TextNode | undefined = undefined;
			let text: TextNode | undefined = undefined;
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				text = $createTextNode('test');
				const text2 = $createTextNode('test2');

				p.append(text, text2);
				root.append(p);

				const selection = $createRangeSelection();
				selection.setTextNodeRange(text, 4, text2, 4);
				node = getSelectedNode(selection) as TextNode;
			});
			expect(node).toEqual(text);
		});

		it(`should return the selected focus node if selection is multi node and backward`, () => {
			let node: TextNode | undefined = undefined;
			let text: TextNode | undefined = undefined;
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				text = $createTextNode('test');
				const text2 = $createTextNode('test2');

				p.append(text, text2);
				root.append(p);

				const selection = $createRangeSelection();
				selection.setTextNodeRange(text2, 3, text, 1);
				node = getSelectedNode(selection) as TextNode;
			});
			expect(node).toEqual(text);
		});

		it(`should return the selected anchor node if selection is multi node and backward at node end`, () => {
			let node: TextNode | undefined = undefined;
			let text2: TextNode | undefined = undefined;
			editor.update(() => {
				const root = $getRoot();
				const p = $createParagraphNode();
				const text = $createTextNode('test');
				text2 = $createTextNode('test2');

				p.append(text, text2);
				root.append(p);

				const selection = $createRangeSelection();
				selection.setTextNodeRange(text2, 1, text, 4);
				node = getSelectedNode(selection) as TextNode;
			});

			expect(node).toEqual(text2);
		});
	});
});
