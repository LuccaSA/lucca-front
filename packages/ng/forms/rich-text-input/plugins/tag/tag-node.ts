import {
	$createTextNode,
	$getNodeByKey,
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

// Chip components per editor and node key. Not stored on the nodes: Lexical clones them and reuses old instances on undo/redo.
const tagChips = new WeakMap<LexicalEditor, Map<NodeKey, Set<ComponentRef<ChipComponent>>>>();

function getTagChips(editor: LexicalEditor): Map<NodeKey, Set<ComponentRef<ChipComponent>>> {
	let chips = tagChips.get(editor);
	if (!chips) {
		chips = new Map();
		tagChips.set(editor, chips);
	}
	return chips;
}

/** Destroy the chip components of a tag node that are no longer in the editor DOM. */
export function destroyStaleTagChips(editor: LexicalEditor, nodeKey: NodeKey): void {
	const chips = getTagChips(editor);
	const refs = chips.get(nodeKey);
	if (!refs) {
		return;
	}
	const currentElement = editor.getElementByKey(nodeKey);
	refs.forEach((ref) => {
		if (ref.location.nativeElement !== currentElement) {
			ref.destroy();
			refs.delete(ref);
		}
	});
	if (refs.size === 0) {
		chips.delete(nodeKey);
	}
}

/** Destroy stale chip components once Lexical has reconciled the DOM. */
export function registerTagChipsCleanup(editor: LexicalEditor): () => void {
	return editor.registerMutationListener(TagNode, (mutations) => {
		mutations.forEach((_mutation, nodeKey) => destroyStaleTagChips(editor, nodeKey));
	});
}

export class TagNode extends DecoratorNode<string> {
	#tagKey: string;
	#tagDescription?: string;
	#disabled: boolean;
	#viewContainerRef?: ViewContainerRef;

	setViewContainerRef(vcr: ViewContainerRef): this {
		const self = this.getWritable();
		self.#viewContainerRef = vcr;
		return self;
	}

	getViewContainerRef(): ViewContainerRef | undefined {
		return this.#viewContainerRef;
	}

	constructor(tagKey = '', viewContainerRef?: ViewContainerRef, tagDescription?: string, disabled = false, key?: NodeKey) {
		super(key);
		this.#tagKey = tagKey;
		this.#tagDescription = tagDescription;
		this.#disabled = disabled;
		this.#viewContainerRef = viewContainerRef;
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

	getTagDescription(): string | undefined {
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
		return new TagNode(node.#tagKey, node.#viewContainerRef, node.#tagDescription, node.#disabled, node.__key);
	}

	/**
	 * This method must be implemented but has no purpose outside of react
	 */
	override decorate(): string {
		return this.getTextContent();
	}

	override createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
		if (this.#viewContainerRef) {
			if (!editor.isEditable()) {
				const span = document.createElement('span');
				span.textContent = this.#tagDescription ?? this.#tagKey;
				return span;
			}
			// Always create a new component, stale ones are destroyed by `registerTagChipsCleanup`
			const componentRef = this.#viewContainerRef.createComponent(ChipComponent);
			const chips = getTagChips(editor);
			const nodeKey = this.getKey();
			if (!chips.has(nodeKey)) {
				chips.set(nodeKey, new Set());
			}
			chips.get(nodeKey)?.add(componentRef);

			// Set inputs on the component instance
			componentRef.setInput('unkillable', false);
			componentRef.setInput('palette', 'product');
			componentRef.setInput('disabled', this.#disabled);

			// Get the component's DOM element
			const componentElement = componentRef.location.nativeElement as HTMLElement;
			const textNode = document.createTextNode(this.#tagDescription ?? this.#tagKey);
			componentElement.insertBefore(textNode, componentElement.firstChild);
			componentElement.classList.add('mod-S');
			componentElement.classList.add('richTextField-content-chip');

			// Add click handler ONLY to the delete button, not the whole chip
			componentRef.instance.kill.subscribe(() => {
				editor.update(() => {
					$getNodeByKey(nodeKey)?.remove();
				});
			});

			// Return the component's DOM element
			return componentElement;
		}
		const element = document.createElement('span');
		element.textContent = this.getTextContent();
		return element;
	}

	override updateDOM(prevNode: TagNode, _dom: HTMLElement, _config: EditorConfig): boolean {
		return this.#tagDescription !== prevNode.#tagDescription || this.#tagKey !== prevNode.#tagKey || this.#disabled !== prevNode.#disabled || this.#viewContainerRef !== prevNode.#viewContainerRef;
	}

	override exportDOM(): DOMExportOutput {
		const element = document.createTextNode(this.getTextContent());
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

	override getTextContent(): string {
		// node must have text content or it will be ignored when formatting
		return `{{${this.#tagKey}}}`;
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

export function $createTagNode(key = '', viewContainerRef?: ViewContainerRef, description?: string): TagNode {
	return new TagNode(key, viewContainerRef, description);
}

export function $isTagNode(node: LexicalNode | null | undefined): node is TagNode {
	return node instanceof TagNode;
}
