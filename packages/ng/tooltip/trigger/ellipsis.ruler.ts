import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EllipsisRuler {
	#document = inject(DOCUMENT);
	readonly elementCloned = this.#document.createElement('div');
	readonly parentMasked = this.#document.createElement('div');

	constructor() {
		this.parentMasked.classList.add('u-mask');
		this.parentMasked.setAttribute('aria-hidden', 'true');

		this.elementCloned.style.width = 'fit-content';
		this.elementCloned.style.whiteSpace = 'nowrap';

		this.parentMasked.appendChild(this.elementCloned);
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
	 */
	hasEllipsis(element: HTMLElement): boolean {
		const elementStyle = window.getComputedStyle(element);

		if (elementStyle.textOverflow !== 'ellipsis') {
			return false;
		}

		Object.assign(this.elementCloned.style, {
			padding: elementStyle.padding,
			borderWidth: elementStyle.borderWidth,
			borderStyle: elementStyle.borderStyle,
			boxSizing: elementStyle.boxSizing,
			fontFamily: elementStyle.fontFamily,
			fontWeight: elementStyle.fontWeight,
			fontStyle: elementStyle.fontStyle,
			fontSize: (Number(elementStyle.fontSize.replace('px', '')) / Number(window.getComputedStyle(document.body).fontSize.replace('px', ''))).toString() + 'rem',
		});

		this.elementCloned.innerHTML = element.innerHTML;

		try {
			const elementClonedWidth = this.elementCloned.getBoundingClientRect().width;
			const elementWidth = element.getBoundingClientRect().width;

			return elementClonedWidth > elementWidth;
		} catch (e) {
			return false;
		}
	}
}
