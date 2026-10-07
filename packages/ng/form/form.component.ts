import { ChangeDetectionStrategy, Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { LU_FORM_INSTANCE } from './form-instance';
import { LuDialogRef } from '@lucca-front/ng/dialog';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'form[luForm]',
	template: '<ng-content />',
	styleUrl: './form.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form',
		'[class.mod-maxWidth]': 'maxWidth()',
		'[class.dialog-inside-formOptional]': 'dialogRef !== null',
		'[attr.role]': 'presentation() ? "presentation" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: LU_FORM_INSTANCE,
			useExisting: forwardRef(() => FormComponent),
		},
	],
})
export class FormComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });

	/**
	 * Limits the maximum width of the form
	 */
	readonly maxWidth = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays all the form fields of the form in presentation mode
	 */
	readonly presentation = input(false, { transform: luBooleanAttribute });
}
