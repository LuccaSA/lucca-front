import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'childComponent, [childComponent]',
	template: '<ng-content />',
	styles: [
		`
			childComponent,
			[childComponent] {
				background-color: gold !important;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'childComponent',
	},
})
export class ChildComponent {}
