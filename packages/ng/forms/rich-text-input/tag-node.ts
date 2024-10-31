import { EditorConfig, LexicalNode, NodeKey, TextNode } from 'lexical';

export class TagNode extends TextNode {
	__color: string;
	__background: string;

	constructor(text: string, color: string, background: string, key?: NodeKey) {
		super(text, key);
		this.__color = color;
		this.__background = background;
		this.__mode = 1; // TextModeType.Token (it cannot be edited by the user)
	}

	static override getType(): string {
		return 'tag';
	}

	static override clone(node: TagNode): TagNode {
		return new TagNode(node.__text, node.__color, node.__background, node.__key);
	}

	override createDOM(config: EditorConfig): HTMLElement {
		const element = super.createDOM(config);
		element.style.color = this.__color;
		element.style.backgroundColor = this.__background;
		element.style.borderRadius = '4px';
		element.style.padding = '2px 4px';

		return element;
	}

	override updateDOM(prevNode: TagNode, dom: HTMLElement, config: EditorConfig): boolean {
		const isUpdated = super.updateDOM(prevNode, dom, config);
		if (prevNode.__color !== this.__color) {
			dom.style.color = this.__color;
		}
		if (prevNode.__background !== this.__background) {
			dom.style.background = this.__background;
		}
		return isUpdated;
	}
}

export function $createColoredNode(text: string, color: string, background: string): TagNode {
	return new TagNode(text, color, background);
}

export function $isColoredNode(node: LexicalNode | null | undefined): node is TagNode {
	return node instanceof TagNode;
}
