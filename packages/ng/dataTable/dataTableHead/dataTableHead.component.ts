import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_HEAD_INSTANCE } from './dataTableHead.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'thead[luDataTableHead]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-head',
		'[class.mod-sticky]': 'sticky()',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_HEAD_INSTANCE,
			useExisting: forwardRef(() => DataTableHeadComponent),
		},
	],
})
export class DataTableHeadComponent {
	sticky = input(false, { transform: booleanAttribute });
}
