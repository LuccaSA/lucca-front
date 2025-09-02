import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, HostBinding, inject, input, Input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_INSTANCE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { RADIO_GROUP_INSTANCE } from './radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio-group-input',
	standalone: true,
	imports: [ReactiveFormsModule],
	hostDirectives: [NoopValueAccessorDirective],
	template: '<ng-content />',
	styleUrl: './radio-group-input.component.scss',
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

	@Input()
	size: 'S' | 'M';

	framed = input(false, { transform: booleanAttribute });
	framedAlign = input<'top' | 'center'>('top');

	name = `radio-group-${nextId++}`;

	@Input()
	arrow?: 'neutral' | 'default';

	@HostBinding('class.inputFramedWrapper')
	public get isFramed() {
		return this.framed();
	}

	constructor() {
		if (this.formField) {
			this.formField.layout.set('fieldset');
		}
	}
}
