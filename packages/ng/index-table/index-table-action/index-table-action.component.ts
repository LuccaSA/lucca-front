import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luIndexTableAction], a[luIndexTableAction], label[luIndexTableAction]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTable-body-row-cell-link',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexTableActionComponent {}
