import {
	$createTextNode,
	COMMAND_PRIORITY_NORMAL,
	DecoratorNode,
	type DOMConversion,
	type DOMConversionMap,
	type DOMExportOutput,
	type EditorConfig,
	type LexicalEditor,
	type LexicalNode,
	LexicalUpdateJSON,
	type NodeKey,
	SerializedLexicalNode,
	Spread,
	TextNode,
} from 'lexical';

import { ComponentRef, ViewContainerRef } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';

export type SerializedTagNode = Spread<
	{
		tagKey?: string;
		tagDescription?: string;
		disabled?: boolean;
	},
	SerializedLexicalNode
>;

export class TagNode extends DecoratorNode<string> {
	#tagKey: string;
	#tagDescription?: string;
	#disabled: boolean;
	// Store the component reference on the node instance
	#componentRef?: ComponentRef<ChipComponent>;
	static #viewContainerRef: ViewContainerRef;

	static setViewContainerRef(vcr: ViewContainerRef): void {
		TagNode.#viewContainerRef = vcr;
	}

	constructor(tagKey = '', tagDescription?: string, disabled = false, key?: NodeKey) {
		super(key);
		this.#tagKey = tagKey;
		this.#tagDescription = tagDescription;
		this.#disabled = disabled;
	}

	isDisabled(): boolean {
		return this.#disabled;
	}

	setDisabled(disabled: boolean): this {
		const self = this.getWritable();
		self.#disabled = disabled;
		return self;
	}

	getTagKey(): string {
		return this.#tagKey;
	}

	setTagKey(tagKey: string): this {
		const self = this.getWritable();
		self.#tagKey = tagKey;
		return self;
	}

	getTagDescription(): string {
		return this.#tagDescription;
	}

	setTagDescription(description: string): this {
		const self = this.getWritable();
		self.#tagDescription = description;
		return self;
	}

	static override getType(): string {
		return 'tag';
	}

	static override clone(node: TagNode): TagNode {
		return new TagNode(node.#tagKey, node.#tagDescription, node.#disabled, node.__key);
	}

	/**
	 * This method must be implemented but has no purpose outside of react
	 */
	override decorate(): string {
		return `{{${this.getKey()}}}`;
	}

	override createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
		if (TagNode.#viewContainerRef) {
			// Create the component
			this.#componentRef = TagNode.#viewContainerRef.createComponent(ChipComponent);

			// Set inputs on the component instance
			this.#componentRef.setInput('unkillable', false);
			this.#componentRef.setInput('palette', 'product');
			this.#componentRef.setInput('disabled', this.#disabled);

			// Get the component's DOM element
			const componentElement = this.#componentRef.location.nativeElement as HTMLElement;

			const textNode = document.createTextNode(this.#tagDescription ?? this.#tagKey);
			componentElement.insertBefore(textNode, componentElement.firstChild);
			componentElement.classList.add('mod-S');
			componentElement.classList.add('richTextField-content-chip');

			// Add click handler ONLY to the delete button, not the whole chip
			this.#componentRef.instance.kill.subscribe(() => {
				editor.update(() => {
					this.remove();
				});
			});

			// Return the component's DOM element
			return componentElement;
		}
		throw new Error('ViewContainerRef is not set for TagNode. Ensure it is initialized before creating TagNode instances.');
	}

	override updateDOM(prevNode: TagNode, _dom: HTMLElement, _config: EditorConfig): boolean {
		return this.#tagDescription !== prevNode.#tagDescription || this.#tagKey !== prevNode.#tagKey || this.#disabled !== prevNode.#disabled;
	}

	override remove(preserveEmptyParent?: boolean): void {
		super.remove(preserveEmptyParent);
		this.#componentRef?.destroy();
	}

	override exportDOM(): DOMExportOutput {
		const element = document.createTextNode(`{{${this.#tagKey}}}`);
		return { element };
	}

	static override importDOM(): DOMConversionMap {
		const importers = TextNode.importDOM();
		return {
			...importers,
			'#text': (domNode: Node) => domConversionFunction(domNode),
		};
	}

	static override importJSON(serializedNode: SerializedTagNode): TagNode {
		return $createTagNode().updateFromJSON(serializedNode);
	}

	override updateFromJSON(serializedNode: LexicalUpdateJSON<SerializedTagNode>): this {
		return super
			.updateFromJSON(serializedNode)
			.setTagDescription(serializedNode.tagDescription ?? '')
			.setTagKey(serializedNode.tagKey ?? '')
			.setDisabled(serializedNode.disabled ?? false);
	}

	override exportJSON(): SerializedTagNode {
		return {
			...super.exportJSON(),
			...{ tagDescription: this.#tagDescription, tagKey: this.#tagKey, disabled: this.#disabled },
		};
	}
}

function domConversionFunction(domNode: Node): DOMConversion {
	const html = domNode.textContent ?? '';

	const regex = /\{\{(?:.*?)\}\}/gu;
	const convertedParts: LexicalNode[] = [];
	const matches = html.match(regex);

	if (matches) {
		// Diviser le contenu en parties de texte et de balises
		const otherText = html.split(regex);
		matches.forEach((match, index) => {
			convertedParts.push($createTextNode(otherText[index]));
			// Traiter le tag
			const tagContent = match.replace(/\{\{|\}\}/gu, '').trim();
			convertedParts.push($createTagNode(tagContent));

			if (index === matches.length - 1) {
				convertedParts.push($createTextNode(otherText[index + 1]));
			}
		});
	} else {
		convertedParts.push($createTextNode(html));
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

export function $createTagNode(key = '', description?: string): TagNode {
	return new TagNode(key, description);
}

export function $isTagNode(node: LexicalNode | null | undefined): node is TagNode {
	return node instanceof TagNode;
}
