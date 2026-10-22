import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

/**
 * Stands in for `ngModel` / `formControl` on a custom element: form components inject `NgControl` and
 * expose their value through `ControlValueAccessor` only. Exposes that value to the page as `element.value`
 * and a `valueChange` event.
 */
export class ElementControl extends NgControl {
	readonly #element: HTMLElement;
	readonly #control = new FormControl<unknown>(null);
	#accessor: ControlValueAccessor | null = null;

	constructor(element: HTMLElement) {
		super();
		this.#element = element;
	}

	override get control(): FormControl<unknown> {
		return this.#control;
	}

	override viewToModelUpdate(): void {
		// The value is propagated by the accessor's `onChange` callback
	}

	/**
	 * Binds the accessor of a newly created component: Angular Elements recreates the component when the element is moved.
	 */
	connect(accessor: ControlValueAccessor): void {
		if (accessor === this.#accessor) {
			return;
		}
		this.#accessor = accessor;
		this.valueAccessor = accessor;
		accessor.writeValue(this.#control.value);
		accessor.registerOnChange((value: unknown) => {
			this.#control.setValue(value, { emitModelToViewChange: false });
			this.#element.dispatchEvent(new CustomEvent('valueChange', { detail: value }));
		});
		accessor.registerOnTouched(() => this.#control.markAsTouched());
	}

	setValue(value: unknown): void {
		this.#control.setValue(value);
		this.#accessor?.writeValue(value);
	}
}
