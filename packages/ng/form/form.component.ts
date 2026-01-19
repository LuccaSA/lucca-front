import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'form[luForm]',
	template: '<ng-content />',
	styleUrl: './form.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form',
		'[class.mod-maxWidth]': 'maxWidth()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	readonly maxWidth = input(false, { transform: booleanAttribute });
}
