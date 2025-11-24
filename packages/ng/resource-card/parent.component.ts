import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'parentComponent, [parentComponent]',
	template: '<ng-content />',
	styles: [
		`
			parentComponent,
			[parentComponent] {
				display: block;
				border: 1px solid red !important;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'parentComponent',
	},
})
export class ParentComponent {}
