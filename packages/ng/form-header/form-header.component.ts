import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luNumberAttribute } from '@lucca-front/ng/core';
import { FormHeaderHeadingLevel } from './form-header.type';

@Component({
	selector: 'lu-form-header',
	templateUrl: './form-header.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form-header',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
	/**
	 * Define the aria level of the title
	 */
	readonly headingLevel = input(1, { transform: luNumberAttribute<FormHeaderHeadingLevel> });
}
