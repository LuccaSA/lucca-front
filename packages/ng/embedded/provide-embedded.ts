import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { LuEmbeddedOverlayContainer } from './embedded-overlay-container';
import { LuEmbeddedShadowRoots } from './embedded-shadow-roots';

export interface LuEmbeddedOptions {
	/**
	 * URL of the stylesheet compiled from `@lucca-front/ng/src/embedded-document`, added once to the page
	 */
	documentStylesheet?: string;
}

/**
 * Configures an application embedded in pages that run their own Angular and Lucca Front versions, such as a
 * custom element built with `createCustomElement` from `@angular/elements`. Its root component uses
 * `ViewEncapsulation.ShadowDom`: the styles of the application, its overlays and its dialogs stay in that shadow
 * root, and the page only receives `documentStylesheet`.
 */
export function provideLuEmbedded({ documentStylesheet }: LuEmbeddedOptions = {}): EnvironmentProviders {
	return makeEnvironmentProviders([
		LuEmbeddedShadowRoots,
		{ provide: OverlayContainer, useClass: LuEmbeddedOverlayContainer },
		provideEnvironmentInitializer(() => {
			inject(LuEmbeddedShadowRoots);
			if (documentStylesheet) {
				addStylesheet(inject(DOCUMENT), documentStylesheet);
			}
		}),
	]);
}

function addStylesheet(document: Document, href: string): void {
	const url = new URL(href, document.baseURI).href;
	if ([...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].some((link) => link.href === url)) {
		return;
	}
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	document.head.appendChild(link);
}
