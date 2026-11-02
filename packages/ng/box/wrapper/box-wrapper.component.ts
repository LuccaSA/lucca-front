import { ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { luNullableNumberAttribute } from '@lucca-front/ng/core';
import { LU_BOX_WRAPPER_INSTANCE } from './box-wrapper.token';

@Component({
	selector: 'lu-box-wrapper',
	template: '<ng-content />',
	styleUrl: './box-wrapper.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'boxWrapper',
		'[style.--components-boxWrapper-columns]': 'columns()',
	},
	providers: [
		{
			provide: LU_BOX_WRAPPER_INSTANCE,
			useExisting: forwardRef(() => BoxWrapperComponent),
		},
	],
})
export class BoxWrapperComponent {
	/**
	 * Number of columns the boxes are laid out in. Defaults to a single column.
	 */
	readonly columns = input(null, { transform: luNullableNumberAttribute });
}
