import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'input[luIndexTableAction]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTable-body-row-cell-link, pr-u-mask',
	},
})
export class IndexTableActionFileComponent {}
