import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutoLinkNode, LinkAttributes, LinkNode, SerializedAutoLinkNode } from '@lexical/link';
import { DOMExportOutput, EditorConfig, LexicalEditor, type NodeKey } from 'lexical';
import { LinkTemplateContext } from './link-template-context';

export class PopoverAutoLinkNode extends AutoLinkNode {
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
	setTemplateRef(vcr: TemplateRef<LinkTemplateContext>): this {
		const self = this.getWritable();
		self.#templateRef = vcr;
		return self;
	}
	getTemplateRef(): TemplateRef<LinkTemplateContext> | undefined {
		return this.#templateRef;
	}

	static override getType(): string {
		return 'popoverautolink';
	}

	constructor(url?: string, attributes?: LinkAttributes & { viewContainerRef?: ViewContainerRef; templateRef?: TemplateRef<LinkTemplateContext> }, key?: NodeKey) {
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
				isAutoLink: true,
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

	static override importJSON(serializedNode: SerializedAutoLinkNode): PopoverAutoLinkNode {
		return $createPopoverAutoLinkNode().updateFromJSON(serializedNode);
	}

	static override clone(node: PopoverAutoLinkNode): PopoverAutoLinkNode {
		return $createPopoverAutoLinkNode(
			node.__url,
			{ target: node.__target, rel: node.__rel, title: node.__title, templateRef: node.#templateRef, viewContainerRef: node.#viewContainerRef },
			node.__key,
		);
	}
}

export function $createPopoverAutoLinkNode(
	url?: string,
	attributes?: LinkAttributes & { viewContainerRef?: ViewContainerRef; templateRef?: TemplateRef<LinkTemplateContext> },
	key?: NodeKey,
): PopoverAutoLinkNode {
	return new PopoverAutoLinkNode(url, attributes, key);
}

export function $isPopoverAutoLinkNode(node: LinkNode | null | undefined): node is PopoverAutoLinkNode {
	return node instanceof PopoverAutoLinkNode;
}
