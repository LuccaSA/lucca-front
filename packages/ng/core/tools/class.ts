import { ElementRef, inject, Injectable, Renderer2 } from '@angular/core';

type LuClassSupportedTypes = string | string[] | Set<string> | { [klass: string]: boolean };

interface CssClassState {
	enabled: boolean;
	changed: boolean;
	touched: boolean;
}

@Injectable()
export class LuClass {
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	#renderer = inject(Renderer2);

	#state: Record<string, boolean> = {};
	#stateMap = new Map<string, CssClassState>();

	public setState(value: LuClassSupportedTypes) {
		this.#state = normalizeToRecord(value);

		for (const [klass, enabled] of Object.entries(this.#state)) {
			this.#updateState(klass, enabled);
		}

		this.#applyStateDiff();
	}

	#updateState(klass: string, nextEnabled: boolean) {
		const state = this.#stateMap.get(klass);
		if (state !== undefined) {
			if (state.enabled !== nextEnabled) {
				state.changed = true;
				state.enabled = nextEnabled;
			}
			state.touched = true;
		} else {
			this.#stateMap.set(klass, { enabled: nextEnabled, changed: true, touched: true });
		}
	}

	#applyStateDiff() {
		for (const stateEntry of this.#stateMap) {
			const klass = stateEntry[0];
			const state = stateEntry[1];

			if (state.changed) {
				this.#toggleClass(klass, state.enabled);
				state.changed = false;
			} else if (!state.touched) {
				// A class that was previously active got removed from the new collection of classes -
				// remove from the DOM as well.
				if (state.enabled) {
					this.#toggleClass(klass, false);
				}
				this.#stateMap.delete(klass);
			}

			state.touched = false;
		}
	}

	#toggleClass(klass: string, enabled: boolean): void {
		if (enabled) {
			this.#renderer.addClass(this.#elementRef.nativeElement, klass);
		} else {
			this.#renderer.removeClass(this.#elementRef.nativeElement, klass);
		}
	}
}

function normalizeToRecord(obj: LuClassSupportedTypes): Record<string, boolean> {
	if (Array.isArray(obj) || obj instanceof Set) {
		const result: Record<string, boolean> = {};

		for (const item of obj) {
			result[item] = true;
		}

		return result;
	}

	if (typeof obj === 'string') {
		obj = obj.trim();
		return obj ? { [obj]: true } : {};
	}

	return obj;
}
