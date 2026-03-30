import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { LinkAttributes, LinkNode, SerializedLinkNode } from '@lexical/link';
import { DOMExportOutput, EditorConfig, LexicalEditor, type NodeKey } from 'lexical';

export class PopoverLinkNode extends LinkNode {
	#viewContainerRef?: ViewContainerRef;
	#templateRef?: TemplateRef<{ href?: string; title?: string; target?: string }>;
	#view?: EmbeddedViewRef<{ href?: string; title?: string; target?: string }>;

	setViewContainerRef(vcr: ViewContainerRef): this {
		const self = this.getWritable();
		self.#viewContainerRef = vcr;
		return self;
	}
	getViewContainerRef(): ViewContainerRef {
		return this.#viewContainerRef;
	}
	setTemplateRef(vcr: TemplateRef<{ href?: string; title?: string; target?: string }>): this {
		const self = this.getWritable();
		self.#templateRef = vcr;
		return self;
	}
	getTemplateRef(): TemplateRef<{ href?: string; title?: string; target?: string }> {
		return this.#templateRef;
	}

	static override getType(): string {
		return 'popoverlink';
	}

	constructor(url?: string, attributes?: LinkAttributes & { viewContainerRef: ViewContainerRef; templateRef: TemplateRef<{ href?: string; title?: string; target?: string }> }, key?: NodeKey) {
		super(url, attributes, key);
		this.#viewContainerRef = attributes?.viewContainerRef;
		this.#templateRef = attributes?.templateRef;
	}

	override createDOM(config: EditorConfig): HTMLElement {
		if (this.#viewContainerRef && this.#templateRef) {
			const context = {
				href: this.sanitizeUrl(this.__url),
				title: this.__title,
				target: this.__target,
				key: this.__key,
			};
			if (this.#view) {
				this.#view.context = context;
				this.#view.markForCheck();
			} else {
				// Create the view
				this.#view = this.#viewContainerRef.createEmbeddedView(this.#templateRef, context);
			}

			// Return the template DOM element
			return this.#view.rootNodes[0] as HTMLElement;
		}
		return super.createDOM(config);
	}

	override updateDOM(prevNode: this): boolean {
		return (
			prevNode.getURL() !== this.getURL() ||
			prevNode.getTarget() !== this.getTarget() ||
			prevNode.getRel() !== this.getRel() ||
			prevNode.getTitle() !== this.getTitle() ||
			this.#templateRef !== prevNode.#templateRef ||
			this.#viewContainerRef !== prevNode.#viewContainerRef
		);
	}

	override exportDOM(editor: LexicalEditor): DOMExportOutput {
		return {
			element: super.createDOM(editor._config),
		};
	}

	override remove(preserveEmptyParent?: boolean) {
		super.remove(preserveEmptyParent);
		this.#view?.destroy();
	}

	static override importJSON(serializedNode: SerializedLinkNode): PopoverLinkNode {
		return $createPopoverLinkNode().updateFromJSON(serializedNode);
	}

	static override clone(node: PopoverLinkNode): PopoverLinkNode {
		return new PopoverLinkNode(node.__url, { target: node.__target, rel: node.__rel, title: node.__title, templateRef: node.#templateRef, viewContainerRef: node.#viewContainerRef }, node.__key);
	}
}

export function $createPopoverLinkNode(
	url?: string,
	attributes?: LinkAttributes & { viewContainerRef: ViewContainerRef; templateRef: TemplateRef<{ href?: string; title?: string; target?: string }> },
	key?: NodeKey,
): PopoverLinkNode {
	return new PopoverLinkNode(url, attributes, key);
}

export function $isPopoverLinkNode(node: LinkNode | null | undefined): node is PopoverLinkNode {
	return node instanceof PopoverLinkNode;
}
