import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EllipsisRuler {
	#document = inject(DOCUMENT);
	readonly #parentMasked = this.#document.createElement('div');

	constructor() {
		this.#parentMasked.classList.add('pr-u-mask');
		this.#parentMasked.setAttribute('aria-hidden', 'true');
		this.#document.body.appendChild(this.#parentMasked);
	}

	/**
	 * Checks for ellipsis by cloning the node and comparing its unconstrained width against the original element.
	 *
	 * We used to do this using scrollWidth but the thing is, it's a rounded value. Sometimes,
	 * you'd get true while it should be false and vice-versa, because of rounding.
	 *
	 * So we duplicate the properties we're interested in on the element to be tested to calculate its ideal size,
	 * which we then compare with its current size.
	 */
	async hasEllipsis(element: HTMLElement): Promise<boolean> {
		await this.#nextFrame();

		const elementStyle = getComputedStyle(element);
		const bodyStyle = getComputedStyle(this.#document.body);

		if (elementStyle.textOverflow !== 'ellipsis') {
			return false;
		}

		const { padding, borderWidth, borderStyle, boxSizing, fontFamily, fontWeight, fontStyle } = elementStyle;
		const fontSize = (Number(elementStyle.fontSize.replace('px', '')) / Number(bodyStyle.fontSize.replace('px', ''))).toString() + 'rem';

		await this.#nextFrame();

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

		this.#parentMasked.appendChild(elementCloned);
		elementCloned.innerHTML = element.innerHTML;

		try {
			const clonedElementWidth = elementCloned.getBoundingClientRect().width.toFixed(3);
			const elementWidth = element.getBoundingClientRect().width.toFixed(3);

			return parseFloat(clonedElementWidth) > parseFloat(elementWidth);
		} catch {
			return false;
		} finally {
			this.#parentMasked.removeChild(elementCloned);
		}
	}

	#nextFrame(): Promise<void> {
		return new Promise((resolve) => requestAnimationFrame(() => resolve()));
	}
}
