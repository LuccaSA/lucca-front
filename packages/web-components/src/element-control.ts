import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { Subscription } from 'rxjs';

/**
 * Stands in for `ngModel` / `formControl` on a custom element: form components inject `NgControl` and
 * expose their value through `ControlValueAccessor` only. Exposes that value to the page as `element.value`
 * and a `valueChange` event, and supports the `required` attribute.
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
		if (!this.#exposesValue) {
			this.syncOwnValue(ownValue);
		}
		accessor.writeValue(this.#control.value);
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

	/**
	 * For components with their own `value` model: keeps the control in sync with a value set on the component
	 * (required state included).
	 */
	syncOwnValue(value: unknown): void {
		this.#control.setValue(value, { emitModelToViewChange: false });
	}

	#formFieldSubscription: Subscription | null = null;

	/**
	 * `lu-form-field` reads the required and invalid states from the controls of its template, which a control in another
	 * custom element is not: set them on the closest form field instead.
	 */
	linkFormField(formField: { element: HTMLElement; instance: FormFieldComponent } | null): void {
		this.#formFieldSubscription?.unsubscribe();
		this.#formFieldSubscription = null;

		const required = this.#element.hasAttribute('required');
		this.#control.setValidators(required ? Validators.required : null);
		this.#control.updateValueAndValidity({ emitEvent: false });

		if (!formField) {
			return;
		}
		formField.instance.forceInputRequired.set(required);
		// The page controls the invalid state itself
		if (formField.element.hasAttribute('invalid')) {
			return;
		}
		// Like a form field around `ngModel`: invalid once touched. Set through the element's `invalid` input.
		const fieldElement = formField.element as HTMLElement & { invalid: boolean };
		const updateInvalid = () => (fieldElement.invalid = this.#control.invalid && this.#control.touched);
		updateInvalid();
		this.#formFieldSubscription = this.#control.events.subscribe(updateInvalid);
	}
}
