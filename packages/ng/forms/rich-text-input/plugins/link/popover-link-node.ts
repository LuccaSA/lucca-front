import { LinkNode } from '@lexical/link';
import { DOMExportOutput, LexicalEditor } from 'lexical';
import { TemplateRef, ViewContainerRef } from '@angular/core';

export class PopoverLinkNode extends LinkNode {
	static #viewContainerRef: ViewContainerRef;
	static #templateRef: TemplateRef<{ href?: string; title?: string; target?: string }>;

	static setViewContainerRef(vcr: ViewContainerRef): void {
		PopoverLinkNode.#viewContainerRef = vcr;
	}
	static setTemplateRef(vcr: TemplateRef<unknown>): void {
		PopoverLinkNode.#templateRef = vcr;
	}

	static override getType(): string {
		return 'popoverlink';
	}

	override createDOM() {
		if (PopoverLinkNode.#viewContainerRef && PopoverLinkNode.#templateRef) {
			// Create the view
			const view = PopoverLinkNode.#viewContainerRef.createEmbeddedView(PopoverLinkNode.#templateRef, {
				href: this.sanitizeUrl(this.__url),
				title: this.__title,
				target: this.__target,
			});

			// Return the template DOM element
			return view.rootNodes[0] as HTMLElement;
		}
		throw new Error('ViewContainerRef is not set for PopoverLinkNode. Ensure it is initialized before creating PopoverLinkNode instances.');
	}

	override exportDOM(editor: LexicalEditor): DOMExportOutput {
		return {
			element: super.createDOM(editor._config),
		};
	}

	static override clone(node: PopoverLinkNode): PopoverLinkNode {
		return new PopoverLinkNode(node.__url, { target: node.__target, rel: node.__rel, title: node.__title }, node.__key);
	}
}
