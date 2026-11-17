import { DOCUMENT, inject, Injectable } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';

/**
 * Angular registers the page `<head>` as a style host for every root component created outside a shadow root:
 * the custom element itself, and the overlays and dialogs the CDK creates detached from the DOM. Each registration
 * copies every component style of the application into the page. This keeps them in the shadow roots of the
 * `ViewEncapsulation.ShadowDom` components only.
 */
@Injectable()
export class LuEmbeddedShadowRoots {
	readonly #shadowRoots: ShadowRoot[] = [];

	/**
	 * The first shadow root of the application still in use
	 */
	get current(): ShadowRoot | undefined {
		return this.#shadowRoots[0];
	}

	constructor() {
		const stylesHost = inject(SharedStylesHost);
		const head = inject(DOCUMENT).head;
		const addHost = stylesHost.addHost.bind(stylesHost);
		const removeHost = stylesHost.removeHost.bind(stylesHost);

		stylesHost.addHost = (hostNode: Node) => {
			if (hostNode === head) {
				return;
			}
			if (hostNode instanceof ShadowRoot && !this.#shadowRoots.includes(hostNode)) {
				this.#shadowRoots.push(hostNode);
			}
			addHost(hostNode);
		};
		stylesHost.removeHost = (hostNode: Node) => {
			const index = this.#shadowRoots.indexOf(hostNode as ShadowRoot);
			if (index >= 0) {
				this.#shadowRoots.splice(index, 1);
			}
			removeHost(hostNode);
		};
		removeHost(head);
	}
}
