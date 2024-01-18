import { ChangeDetectorRef, Directive, DoCheck, ElementRef, inject, Input, Renderer2 } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NgClassSupportedTypes = string[] | Set<string> | { [klass: string]: any } | null | undefined;

const WS_REGEXP = /\s+/;

const EMPTY_ARRAY: string[] = [];

interface CssClassState {
	enabled: boolean;
	changed: boolean;
	touched: boolean;
}

// This directive exists to temporarily resolve a conflict in how directives work, see https://github.com/angular/angular/issues/52072
@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[ngClazz]',
	standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NgClazz implements DoCheck {
	#cdr = inject(ChangeDetectorRef);

	private initialClasses = EMPTY_ARRAY;
	private rawClass: NgClassSupportedTypes;

	private stateMap = new Map<string, CssClassState>();

	constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {}

	@Input('class')
	set klass(value: string) {
		this.initialClasses = value != null ? value.trim().split(WS_REGEXP) : EMPTY_ARRAY;
	}

	@Input('ngClass')
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	set ngClass(value: string | string[] | Set<string> | { [klass: string]: any } | null | undefined) {
		this.rawClass = typeof value === 'string' ? value.trim().split(WS_REGEXP) : value;
		setTimeout(() => this.#cdr.markForCheck());
	}

	ngDoCheck(): void {
		// classes from the [class] binding
		for (const klass of this.initialClasses) {
			this._updateState(klass, true);
		}

		// classes from the [ngClass] binding
		const rawClass = this.rawClass;
		if (Array.isArray(rawClass) || rawClass instanceof Set) {
			for (const klass of rawClass) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				this._updateState(klass, true);
			}
		} else if (rawClass != null) {
			for (const klass of Object.keys(rawClass)) {
				this._updateState(klass, Boolean(rawClass[klass]));
			}
		}

		this._applyStateDiff();
	}

	private _updateState(klass: string, nextEnabled: boolean) {
		const state = this.stateMap.get(klass);
		if (state !== undefined) {
			if (state.enabled !== nextEnabled) {
				state.changed = true;
				state.enabled = nextEnabled;
			}
			state.touched = true;
		} else {
			this.stateMap.set(klass, { enabled: nextEnabled, changed: true, touched: true });
		}
	}

	private _applyStateDiff() {
		for (const stateEntry of this.stateMap) {
			const klass = stateEntry[0];
			const state = stateEntry[1];

			if (state.changed) {
				this._toggleClass(klass, state.enabled);
				state.changed = false;
			} else if (!state.touched) {
				// A class that was previously active got removed from the new collection of classes -
				// remove from the DOM as well.
				if (state.enabled) {
					this._toggleClass(klass, false);
				}
				this.stateMap.delete(klass);
			}

			state.touched = false;
		}
	}

	private _toggleClass(klass: string, enabled: boolean): void {
		klass = klass.trim();
		if (klass.length > 0) {
			klass.split(WS_REGEXP).forEach((klass) => {
				if (enabled) {
					this._renderer.addClass(this._ngEl.nativeElement, klass);
				} else {
					this._renderer.removeClass(this._ngEl.nativeElement, klass);
				}
			});
		}
	}
}
