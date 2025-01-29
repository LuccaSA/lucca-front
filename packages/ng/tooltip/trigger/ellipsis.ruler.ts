import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EllipsisRuler {
	#document = inject(DOCUMENT);
	readonly parentMasked = this.#document.createElement('div');

	constructor() {
		this.parentMasked.classList.add('u-mask');
		this.parentMasked.setAttribute('aria-hidden', 'true');
		this.#document.body.appendChild(this.parentMasked);
	}

	/**
	 * Hacky af but let's explain everything
	 * This method checks for ellipsis by cloning the node and checking its width against original element.
	 *
	 * We used to do this using scrollWidth but the thing is, it's a rounded value. Sometimes,
	 * you'd get true while it should be false and vice-versa, because of rounding.
	 *
	 * So we duplicate the properties we're interested in on the element to be tested to calculate its ideal size,
	 * which we then compare with its current size.
	 *
	 * To avoid doing multiple reflow per check, we wait for the next microtask on each key step of the process:
	 * - After computing element style
	 * - After cloning the element and appending it to the DOM
	 * - After computing the width of the cloned element
	 * - After removing the cloned element from the DOM
	 *
	 * This way, we have 2 reflows per check, no matter how many elements are checked in a row.
	 */
	async hasEllipsis(element: HTMLElement): Promise<boolean> {
		const elementStyle = getComputedStyle(element);

		if (elementStyle.textOverflow !== 'ellipsis') {
			return false;
		}

		const { padding, borderWidth, borderStyle, boxSizing, fontFamily, fontWeight, fontStyle } = elementStyle;

		const fontSize = (Number(elementStyle.fontSize.replace('px', '')) / Number(getComputedStyle(document.body).fontSize.replace('px', ''))).toString() + 'rem';

		// When multiple elements are checked in a row, we wait for the next microtask to before cloning the element
		// to avoid the browser to reflow the page for each tooltip
		await Promise.resolve();

		const elementCloned = this.#document.createElement('div');

		Object.assign(elementCloned.style, {
			inlineSize: 'fit-content',
			whiteSpace: 'nowrap',
			position: 'absolute',
			visibility: 'hidden',
			padding,
			borderWidth,
			borderStyle,
			boxSizing,
			fontFamily,
			fontWeight,
			fontStyle,
			fontSize,
		});

		this.parentMasked.appendChild(elementCloned);

		elementCloned.innerHTML = element.innerHTML;

		// To avoid multiple reflows, we wait for the next microtask before calculating the width
		await Promise.resolve();

		try {
			const elementClonedWidth = elementCloned.getBoundingClientRect().width;
			const elementWidth = element.getBoundingClientRect().width;

			return elementClonedWidth > elementWidth;
		} catch {
			return false;
		} finally {
			// To avoid multiple reflows, we wait for the next microtask before removing the cloned element
			await Promise.resolve();
			this.parentMasked.removeChild(elementCloned);
		}
	}
}
