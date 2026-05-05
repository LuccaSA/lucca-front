import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { LinkAttributes, LinkNode, SerializedLinkNode } from '@lexical/link';
import { DOMExportOutput, EditorConfig, LexicalEditor, type NodeKey } from 'lexical';
import { LinkTemplateContext } from './link-template-context';

export class PopoverLinkNode extends LinkNode {
	#viewContainerRef?: ViewContainerRef;
	#templateRef?: TemplateRef<LinkTemplateContext>;
	#view?: EmbeddedViewRef<LinkTemplateContext>;

	setViewContainerRef(vcr: ViewContainerRef): this {
		const self = this.getWritable();
		self.#viewContainerRef = vcr;
		return self;
	}
	getViewContainerRef(): ViewContainerRef | undefined {
		return this.#viewContainerRef;
	}
	setTemplateRef(templateRef: TemplateRef<LinkTemplateContext>): this {
		const self = this.getWritable();
		self.#templateRef = templateRef;
		return self;
	}
	getTemplateRef(): TemplateRef<LinkTemplateContext> | undefined {
		return this.#templateRef;
	}

	static override getType(): string {
		return 'popoverlink';
	}

	constructor(url?: string, attributes?: LinkAttributes & { viewContainerRef?: ViewContainerRef; templateRef?: TemplateRef<LinkTemplateContext> }, key?: NodeKey) {
		super(url, attributes, key);
		this.#viewContainerRef = attributes?.viewContainerRef;
		this.#templateRef = attributes?.templateRef;
	}

	override createDOM(config: EditorConfig): HTMLElement {
		if (this.#viewContainerRef && this.#templateRef) {
			const context: LinkTemplateContext = {
				href: this.sanitizeUrl(this.__url),
				title: this.__title ?? undefined,
				target: this.__target ?? undefined,
				key: this.__key ?? undefined,
				isAutoLink: false,
			};
			// if view already exists, destroy it. Can't reuse it since Lexical injects HTML content inside afterward (link text).
			if (this.#view) {
				this.#view.destroy();
			}
			// Create the view
			this.#view = this.#viewContainerRef.createEmbeddedView(this.#templateRef, context);

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
		return $createPopoverLinkNode(node.__url, { target: node.__target, rel: node.__rel, title: node.__title, templateRef: node.#templateRef, viewContainerRef: node.#viewContainerRef }, node.__key);
	}
}

export function $createPopoverLinkNode(
	url?: string,
	attributes?: LinkAttributes & { viewContainerRef?: ViewContainerRef; templateRef?: TemplateRef<LinkTemplateContext> },
	key?: NodeKey,
): PopoverLinkNode {
	return new PopoverLinkNode(url, attributes, key);
}

export function $isPopoverLinkNode(node: LinkNode | null | undefined): node is PopoverLinkNode {
	return node instanceof PopoverLinkNode;
}
