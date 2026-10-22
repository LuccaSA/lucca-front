import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

/**
 * Stands in for `ngModel` / `formControl` on a custom element: form components inject `NgControl` and
 * expose their value through `ControlValueAccessor` only. Exposes that value to the page as `element.value`
 * and a `valueChange` event.
 */
export class ElementControl extends NgControl {
	readonly #element: HTMLElement;
	/**
	 * False for components with their own `value` model, which already emits `valueChange`
	 */
	readonly #exposesValue: boolean;
	readonly #control = new FormControl<unknown>(null);
	#accessor: ControlValueAccessor | null = null;

	constructor(element: HTMLElement, exposesValue: boolean) {
		super();
		this.#element = element;
		this.#exposesValue = exposesValue;
	}

	override get control(): FormControl<unknown> {
		return this.#control;
	}

	override viewToModelUpdate(): void {
		// The value is propagated by the accessor's `onChange` callback
	}

	/**
	 * Binds the accessor of a newly created component: Angular Elements recreates the component when the element is moved.
	 * Like `ngModel`, always writes an initial value: the component's own `value` when it has one.
	 */
	connect(accessor: ControlValueAccessor, ownValue: unknown): void {
		if (accessor === this.#accessor) {
			return;
		}
		this.#accessor = accessor;
		this.valueAccessor = accessor;
		accessor.writeValue(this.#exposesValue ? this.#control.value : ownValue);
		accessor.registerOnChange((value: unknown) => {
			this.#control.setValue(value, { emitModelToViewChange: false });
			if (this.#exposesValue) {
				this.#element.dispatchEvent(new CustomEvent('valueChange', { detail: value }));
			}
		});
		accessor.registerOnTouched(() => this.#control.markAsTouched());
	}

	setValue(value: unknown): void {
		this.#control.setValue(value);
		this.#accessor?.writeValue(value);
	}
}
