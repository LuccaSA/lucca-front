import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { filter, firstValueFrom, shareReplay, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EllipsisRuler {
	// As EllipsisRuler is a singleton, we can use shareReplay so the first subscriber starts the timer and the last one stops it
	// The timer allows us to alternate between read and write phases
	#interval = timer(100, 100).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
	#readPhase = this.#interval.pipe(filter((n) => n % 2 === 0));
	#writePhase = this.#interval.pipe(filter((n) => n % 2 === 1));

	#document = inject(DOCUMENT);
	readonly parentMasked = this.#document.createElement('div');

	constructor() {
		this.parentMasked.classList.add('pr-u-mask');
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
		let elementStyle: CSSStyleDeclaration;
		let bodyStyle: CSSStyleDeclaration;

		await this.#readOperation(() => {
			elementStyle = getComputedStyle(element);
			bodyStyle = getComputedStyle(document.body);
		});

		if (elementStyle.textOverflow !== 'ellipsis') {
			return false;
		}

		const { padding, borderWidth, borderStyle, boxSizing, fontFamily, fontWeight, fontStyle } = elementStyle;

		const fontSize = (Number(elementStyle.fontSize.replace('px', '')) / Number(bodyStyle.fontSize.replace('px', ''))).toString() + 'rem';

		let elementCloned: HTMLDivElement;

		await this.#writeOperation(() => {
			elementCloned = this.#document.createElement('div');

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
		});

		// To avoid multiple reflows, we wait for the next microtask before calculating the width

		try {
			let clonedElementWidth: number;
			let elementWidth: number;

			await this.#readOperation(() => {
				clonedElementWidth = elementCloned.getBoundingClientRect().width;
				elementWidth = element.getBoundingClientRect().width;
			});

			return clonedElementWidth > elementWidth;
		} catch {
			return false;
		} finally {
			await this.#writeOperation(() => {
				this.parentMasked.removeChild(elementCloned);
			});
		}
	}

	// To avoid multiple reflows, we wait for the next read phase before computing/reading element style
	async #readOperation(operation: () => void): Promise<void> {
		await firstValueFrom(this.#readPhase);
		operation();
	}

	// To avoid multiple reflows, we wait for the next write before inserting/removing the cloned element
	async #writeOperation(operation: () => void): Promise<void> {
		await firstValueFrom(this.#writePhase);
		operation();
	}
}
