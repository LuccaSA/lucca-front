import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, inject, input, model, output, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { FORM_FIELD_INSTANCE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioGroupInputArrow, RadioGroupInputFramedSize, RadioGroupInputSize } from './radio-group-input.type';
import { RADIO_GROUP_INSTANCE } from './radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio-group-input',
	template: '<ng-content />',
	styleUrl: './radio-group-input.component.scss',
	host: {
		'[class.inputFramedWrapper]': 'framed()',
		role: 'radiogroup',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: RADIO_GROUP_INSTANCE,
			useExisting: forwardRef(() => RadioGroupInputComponent),
		},
	],
})
export class RadioGroupInputComponent<T = unknown> implements FormValueControl<T | null> {
	readonly formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	readonly value = model<T | null>(null);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly name = input<string>(`radio-group-${nextId++}`);

	readonly touch = output<void>();

	readonly size = input<RadioGroupInputSize>();

	readonly framed = input(false, { transform: booleanAttribute });

	readonly framedCenter = input(false, { transform: booleanAttribute });

	readonly framedSize = input<RadioGroupInputFramedSize | null>(null);

	readonly arrow = input<RadioGroupInputArrow>();

	constructor() {
		if (this.formField) {
			this.formField.layout.set('fieldset');
		}
	}
}
