import {
	COMMAND_PRIORITY_NORMAL,
	DecoratorNode,
	type DOMConversion,
	type DOMConversionMap,
	type DOMExportOutput,
	type EditorConfig,
	type LexicalEditor,
	type LexicalNode,
	type NodeKey,
	TextNode,
} from 'lexical';

import { ComponentRef, ViewContainerRef } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';
import type { Tag } from './tag.model';

export class TagNode extends DecoratorNode<string> {
	tag: Tag;
	// Store the component reference on the node instance
	#componentRef?: ComponentRef<ChipComponent>;
	#deleteButton?: HTMLButtonElement;
	static #currentAvailableTags: Tag[] = [];
	static #viewContainerRef: ViewContainerRef;

	static setViewContainerRef(vcr: ViewContainerRef): void {
		TagNode.#viewContainerRef = vcr;
	}

	static setAvailableTags(tags: Tag[]): void {
		TagNode.#currentAvailableTags = tags;
	}

	constructor(tag: Tag, key?: NodeKey) {
		super(key);
		this.tag = tag;
	}

	static override getType(): string {
		return 'tag';
	}

	static override clone(node: TagNode): TagNode {
		return new TagNode(node.tag, node.__key);
	}

	/**
	 * This method must be implemented but has no purpose outside of react
	 */
	override decorate(): string {
		return `{{${this.tag.key}}}`;
	}

	override createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
		if (TagNode.#viewContainerRef) {
			// Create the component
			this.#componentRef = TagNode.#viewContainerRef.createComponent(ChipComponent);

			// Set inputs on the component instance
			this.#componentRef.instance.unkillable = false;
			this.#componentRef.instance.palette = 'product';

			// Get the component's DOM element
			const componentElement = this.#componentRef.location.nativeElement as HTMLElement;

			// Add our text as the first child - it will be projected via <ng-content />
			const textNode = document.createTextNode(this.tag.description ?? this.tag.key);
			componentElement.insertBefore(textNode, componentElement.firstChild);

			// Trigger change detection to apply the input changes and render the template
			this.#componentRef.hostView.detectChanges();

			// Add click handler ONLY to the delete button, not the whole chip
			this.#deleteButton = componentElement.querySelector<HTMLButtonElement>('.chip-kill');
			if (this.#deleteButton) {
				this.#deleteButton.onclick = (event: MouseEvent) => {
					event.stopPropagation();
					editor.update(() => {
						this.remove();
					});
				};
			}

			// Return the component's DOM element
			return componentElement;
		}
		throw new Error('ViewContainerRef is not set for TagNode. Ensure it is initialized before creating TagNode instances.');
	}

	override updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
		return false;
	}

	override remove(preserveEmptyParent?: boolean): void {
		super.remove(preserveEmptyParent);
		if (this.#deleteButton) {
			this.#deleteButton.onclick = null;
		}
		this.#componentRef?.destroy();
	}

	override exportDOM(): DOMExportOutput {
		const element = document.createTextNode(`{{${this.tag.key}}}`);
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
