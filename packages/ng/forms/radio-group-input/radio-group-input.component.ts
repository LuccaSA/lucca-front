import { ChangeDetectionStrategy, Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { RadioGroupInputArrow, RadioGroupInputFramedSize, RadioGroupInputSize } from './radio-group-input.type';
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
export class RadioGroupInputComponent {
	readonly formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	/**
	 * Size of the radio buttons in the group
	 */
	readonly size = input<RadioGroupInputSize>();

	/**
	 * Displays each radio button of the group inside a frame
	 */
	readonly framed = input(false, { transform: luBooleanAttribute });

	/**
	 * Centers the content of the frames, only applies when `framed` is true
	 */
	readonly framedCenter = input(false, { transform: luBooleanAttribute });

	/**
	 * Size of the frames, only applies when `framed` is true
	 */
	readonly framedSize = input<RadioGroupInputFramedSize | null>(null);

	/**
	 * Displays an arrow below each radio button, in the given style
	 */
	readonly arrow = input<RadioGroupInputArrow>();

	name = `radio-group-${nextId++}`;

	constructor() {
		if (this.formField) {
			this.formField.layout.set('fieldset');
		}
	}
}
