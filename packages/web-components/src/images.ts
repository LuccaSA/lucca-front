import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

// Declared by build.js around the bundle: the SVG images of the exposed components, by CDN URL
declare const PRISME_IMAGES: Record<string, string>;

const CSS_CDN_URL = /url\((['"]?)((?:https:)?\/\/cdn\.lucca\.fr\/[\w./-]+\.svg)\1\)/g;

const embedded = (url: string): string | undefined => PRISME_IMAGES[url.startsWith('//') ? `https:${url}` : url];

const dataUrl = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

/**
 * Sandboxed pages cannot reach the CDN: SVG requests (`luSafeExternalSvg`) are served from the bundle.
 */
export const imagesInterceptor: HttpInterceptorFn = (request, next) => {
	const svg = embedded(request.url);
	return svg ? of(new HttpResponse({ status: 200, body: svg })) : next(request);
};

function resolve(element: Element): void {
	if (element instanceof HTMLImageElement) {
		const svg = embedded(element.getAttribute('src') ?? '');
		if (svg) {
			element.src = dataUrl(svg);
		}
	}
	// Custom properties holding `url(...)`, set by components (empty state backgrounds, fancy dialog illustrations)
	const style = element.getAttribute('style');
	if (style?.includes('cdn.lucca.fr')) {
		// Quoted: the data URL may hold parentheses
		const resolved = style.replace(CSS_CDN_URL, (match, _quote, url: string) => {
			const svg = embedded(url);
			return svg ? `url("${dataUrl(svg)}")` : match;
		});
		if (resolved !== style) {
			element.setAttribute('style', resolved);
		}
	}
}

function resolveWithin(root: Element): void {
	resolve(root);
	root.querySelectorAll('img[src*="cdn.lucca.fr"], [style*="cdn.lucca.fr"]').forEach(resolve);
}

/**
 * Sandboxed pages cannot reach the CDN: the images components point to are replaced by the ones of the bundle, as
 * they are rendered (`src` of flags and file icons, `url()` in style attributes).
 */
export function resolveImages(): void {
	resolveWithin(document.documentElement);
	new MutationObserver((mutations) =>
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				resolve(mutation.target as Element);
			} else {
				mutation.addedNodes.forEach((node) => node instanceof Element && resolveWithin(node));
			}
		}),
	).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'style'] });
}
