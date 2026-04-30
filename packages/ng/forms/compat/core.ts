import { DestroyRef, effect, inject, Injector, ModelSignal, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';

export function provideNgValueAccessorCompat<T>(componentFactory: () => FormValueControl<T> & { disabled?: ModelSignal<boolean>; touched: ModelSignal<boolean> }): Provider {
	return {
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useFactory: (): ControlValueAccessor | null => {
			const component = componentFactory();
			const injector = inject(Injector);
			const destroyRef = inject(DestroyRef);

			return {
				registerOnChange(fn: (value: T) => void) {
					if (destroyRef.destroyed) {
						return;
					}
					effect(
						() => {
							fn(component.value());
						},
						{ injector },
					);
				},
				registerOnTouched: (fn: () => void) => {
					if (destroyRef.destroyed) {
						return;
					}
					effect(
						() => {
							component.touched(); // subscribe to touched changes
							fn();
						},
						{ injector },
					);
				},
				writeValue(value: T) {
					component.value.set(value);
				},
				setDisabledState(isDisabled: boolean) {
					component.disabled?.set(isDisabled);
				},
			};
		},
	};
}
