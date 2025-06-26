import { COMMAND_PRIORITY_NORMAL, type DOMConversion, type DOMConversionMap, type DOMExportOutput, type EditorConfig, type LexicalEditor, type LexicalNode, type NodeKey, TextNode } from 'lexical';

import type { Tag } from './tag.model';

export class TagNode extends TextNode {
	tag: Tag;
	static #currentAvailableTags: Tag[] = [];

	static setAvailableTags(tags: Tag[]): void {
		TagNode.#currentAvailableTags = tags;
	}

	constructor(tag: Tag, key?: NodeKey) {
		super(tag.description, key);
		this.tag = tag;
		this.__mode = 1; // TextModeType.Token (it cannot be edited by the user)
	}

	static override getType(): string {
		return 'tag';
	}

	static override clone(node: TagNode): TagNode {
		return new TagNode(node.tag, node.__key);
	}

	override createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
		const element = super.createDOM(config);
		element.className = 'chip';

		const button = document.createElement('button');
		button.onclick = (event: MouseEvent) => {
			event.stopPropagation();
			editor.update(() => {
				this.remove(); // Remove the node from the editor
			});
		};
		button.className = 'chip-kill';

		const span = document.createElement('span');
		span.className = 'u-mask';
		span.textContent = 'delete';
		button.appendChild(span);
		element.appendChild(button);

		return element;
	}

	override exportDOM(): DOMExportOutput {
		const element = document.createElement('span');
		element.textContent = `{{${this.tag.key}}}`;
		return { element };
	}

	static override importDOM(): DOMConversionMap {
		const importers = TextNode.importDOM();
		return {
			...importers,
			'#text': (domNode: Node) => domConversionFunction(domNode, TagNode.#currentAvailableTags),
		};
	}
}

function domConversionFunction(domNode: Node, availableTags: Tag[]): DOMConversion {
	const html = domNode.textContent ?? '';

	const regex = /\{\{(?:.*?)\}\}/u;
	const convertedParts: LexicalNode[] = [];
	const match = regex.exec(html);

	if (match) {
		// Diviser le contenu en parties de texte et de balises
		const beforeTag = html.slice(0, match.index);
		if (beforeTag) {
			convertedParts.push(new TextNode(beforeTag));
		}

		// Traiter le tag
		const tagContent = match[0].replace(/\{\{|\}\}/gu, '').trim();
		const tag = availableTags.find((t) => t.key === tagContent);

		if (tag) {
			convertedParts.push(new TagNode(tag));
		} else {
			convertedParts.push(new TextNode(match[0])); // Garder {{tag}} tel quel
		}

		const afterTag = html.slice(match.index + match[0].length);
		if (afterTag) {
			convertedParts.push(new TextNode(afterTag));
		}
	} else {
		convertedParts.push(new TextNode(html));
	}

	return {
		// La fonction de conversion reçoit le nœud DOM et doit retourner un nœud Lexical
		conversion: () => ({
			node: convertedParts,
		}),

		// Priorité (plus le nombre est élevé, plus la conversion est prioritaire)
		priority: COMMAND_PRIORITY_NORMAL,
	};
}
