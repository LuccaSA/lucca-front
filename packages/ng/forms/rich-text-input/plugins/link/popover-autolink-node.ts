import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AutoLinkNode } from '@lexical/link';
import { DOMExportOutput, LexicalEditor } from 'lexical';

export class PopoverAutoLinkNode extends AutoLinkNode {
	static #viewContainerRef: ViewContainerRef;
	static #templateRef: TemplateRef<{ href?: string; title?: string; target?: string }>;

	static setViewContainerRef(vcr: ViewContainerRef): void {
		PopoverAutoLinkNode.#viewContainerRef = vcr;
	}
	static setTemplateRef(vcr: TemplateRef<unknown>): void {
		PopoverAutoLinkNode.#templateRef = vcr as TemplateRef<{
			href?: string;
			title?: string;
			target?: string;
		}>;
	}

	static override getType(): string {
		return 'popoverautolink';
	}

	override createDOM() {
		if (PopoverAutoLinkNode.#viewContainerRef && PopoverAutoLinkNode.#templateRef) {
			// Create context
			const context: { href?: string; title?: string; target?: string } = {
				href: this.sanitizeUrl(this.__url),
				title: this.__title ?? undefined,
				target: this.__target ?? undefined,
			};
			// Create the view
			const view = PopoverAutoLinkNode.#viewContainerRef.createEmbeddedView(PopoverAutoLinkNode.#templateRef, context);

			// Return the template DOM element
			return view.rootNodes[0] as HTMLElement;
		}
		throw new Error('ViewContainerRef is not set for PopoverAutoLinkNode. Ensure it is initialized before creating PopoverAutoLinkNode instances.');
	}

	override exportDOM(editor: LexicalEditor): DOMExportOutput {
		return {
			element: super.createDOM(editor._config),
		};
	}

	static override clone(node: PopoverAutoLinkNode): PopoverAutoLinkNode {
		return new PopoverAutoLinkNode(node.__url, { target: node.__target, rel: node.__rel, title: node.__title }, node.__key);
	}
}
