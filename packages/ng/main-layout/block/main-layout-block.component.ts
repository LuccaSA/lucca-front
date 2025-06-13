import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-main-layout-block',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	template: `<ng-content />`,
	host: {
		class: 'mainLayout-content-inside-block',
		'[class.mod-overflow]': 'overflow()',
	},
})
export class MainLayoutBlockComponent {
	overflow = input(false, { transform: booleanAttribute });
}
