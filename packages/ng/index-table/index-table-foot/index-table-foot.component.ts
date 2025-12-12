import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { LU_INDEX_TABLE_FOOT_INSTANCE } from './index-table-foot.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tfoot[luIndexTableFoot]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTable-foot',
	},
	providers: [
		{
			provide: LU_INDEX_TABLE_FOOT_INSTANCE,
			useExisting: forwardRef(() => IndexTableFootComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexTableFootComponent {}
