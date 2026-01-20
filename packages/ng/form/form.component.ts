import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LU_FORM_INSTANCE } from './form-instance';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'form[luForm]',
	template: '<ng-content />',
	styleUrl: './form.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form',
		'[class.mod-maxWidth]': 'maxWidth()',
		'[role]': 'presentation() ? "presentation" : null',
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
	readonly maxWidth = input(false, { transform: booleanAttribute });

	readonly presentation = input(false, { transform: booleanAttribute });
}
