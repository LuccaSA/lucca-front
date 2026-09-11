import { $isTagNode, TagNode } from '@lucca-front/ng/forms/rich-text-input';
import { $createParagraphNode, $createTextNode, $getRoot, $isTextNode, createEditor, LexicalEditor, LexicalNode, ParagraphNode, TextNode } from 'lexical';
import { PlainTextFormatter } from './plain-text-formatter';

describe(PlainTextFormatter.name, () => {
	// Do not mock LexicalEditor: node transforms are the behaviour under test
	let editor: LexicalEditor;
	let formatter: PlainTextFormatter;
	let unregister: () => void;

	beforeEach(() => {
		const container = document.createElement('div');
		container.contentEditable = 'true';
		document.body.appendChild(container);
		editor = createEditor({
			nodes: [TagNode],
			onError: (error) => {
				throw error;
			},
		});
		editor.setRootElement(container);
		formatter = new PlainTextFormatter();
		unregister = formatter.registerTextPlugin(editor);
	});

	afterEach(() => {
		unregister();
	});

	function $getFirstParagraphChildren(): LexicalNode[] {
		return $getRoot().getFirstChildOrThrow<ParagraphNode>().getChildren();
	}

	function describeNode(node: LexicalNode): string {
		if ($isTagNode(node)) {
			return `tag:${node.getTagKey()}`;
		}
		if ($isTextNode(node)) {
			return `text:${node.getTextContent()}`;
		}
		return node.getType();
	}

	describe('parse', () => {
		it('should convert tags of the initial value into tag nodes', () => {
			editor.update(() => formatter.parse(editor, 'Hello {{tag1}} world'), { discrete: true });

			editor.read(() => {
				expect($getFirstParagraphChildren().map(describeNode)).toEqual(['text:Hello ', 'tag:tag1', 'text: world']);
			});
		});
	});

	describe('text node transform', () => {
		it('should convert a tag pasted as raw text into a tag node', () => {
			editor.update(
				() => {
					const paragraph = $createParagraphNode();
					paragraph.append($createTextNode('Hello world'));
					$getRoot().append(paragraph);
				},
				{ discrete: true },
			);

			// Simulates what Lexical does on paste in plain-text mode: the clipboard text is inserted as raw text
			editor.update(
				() => {
					const paragraph = $getRoot().getFirstChildOrThrow<ParagraphNode>();
					paragraph.getFirstChildOrThrow<TextNode>().select(6, 6).insertRawText('{{tag1}} ');
				},
				{ discrete: true },
			);

			editor.read(() => {
				expect($getFirstParagraphChildren().map(describeNode)).toEqual(['text:Hello ', 'tag:tag1', 'text: world']);
			});
		});

		it('should convert several tags pasted at once', () => {
			editor.update(
				() => {
					const paragraph = $createParagraphNode();
					paragraph.append($createTextNode('{{tag1}} and {{tag2}}'));
					$getRoot().append(paragraph);
				},
				{ discrete: true },
			);

			editor.read(() => {
				expect($getFirstParagraphChildren().map(describeNode)).toEqual(['tag:tag1', 'text: and ', 'tag:tag2']);
			});
		});

		it('should leave text without tags untouched', () => {
			editor.update(
				() => {
					const paragraph = $createParagraphNode();
					paragraph.append($createTextNode('Hello {{ not a tag }} world'));
					$getRoot().append(paragraph);
				},
				{ discrete: true },
			);

			editor.read(() => {
				expect($getFirstParagraphChildren().map(describeNode)).toEqual(['text:Hello {{ not a tag }} world']);
			});
		});

		it('should keep formatting the tag as {{key}}', () => {
			editor.update(() => formatter.parse(editor, 'Hello {{tag1}}'), { discrete: true });

			expect(formatter.format(editor)).toBe('Hello {{tag1}}');
		});
	});
});
