import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_INSTANCE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { RADIO_GROUP_INSTANCE } from './radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio-group-input',
	imports: [ReactiveFormsModule],
	hostDirectives: [NoopValueAccessorDirective],
	template: '<ng-content />',
	styleUrl: './radio-group-input.component.scss',
	host: {
		'[class.inputFramedWrapper]': 'framed()',
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
export class RadioGroupInputComponent {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	readonly size = input<'S' | 'M'>();

	readonly framed = input(false, { transform: booleanAttribute });

	readonly framedCenter = input(false, { transform: booleanAttribute });

	readonly framedSize = input<'L' | null>(null);

	readonly arrow = input<'neutral' | 'default'>();

	name = `radio-group-${nextId++}`;

	constructor() {
		if (this.formField) {
			this.formField.layout.set('fieldset');
		}
	}
}
