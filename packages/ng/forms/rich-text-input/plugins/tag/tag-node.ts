import { EditorConfig, LexicalNode, NodeKey, TextNode } from 'lexical';

export class TagNode extends TextNode {
	constructor(text: string, key?: NodeKey) {
		super(text, key);
		this.__mode = 1; // TextModeType.Token (it cannot be edited by the user)
	}

	static override getType(): string {
		return 'tag';
	}

	static override clone(node: TagNode): TagNode {
		return new TagNode(node.__text, node.__key);
	}

	override createDOM(config: EditorConfig): HTMLElement {
		const element = super.createDOM(config);
		element.style.color = 'var(--palettes-neutral-0)';
		element.style.backgroundColor = 'var(--palettes-product-700)';
		element.style.borderRadius = 'var(--pr-t-spacings-50)';
		element.style.padding = 'var(--pr-t-spacings-25) var(--pr-t-spacings-100)';

		return element;
	}
}

export function $createColoredNode(text: string): TagNode {
	return new TagNode(text);
}

export function $isColoredNode(node: LexicalNode | null | undefined): node is TagNode {
	return node instanceof TagNode;
}
