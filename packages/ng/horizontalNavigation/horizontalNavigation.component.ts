import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-horizontal-navigation',
	standalone: true,
	templateUrl: './horizontalNavigation.component.html',
	styleUrls: ['./horizontalNavigation.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'horizontalNavigation',
		role: 'navigation',
	},
})
export class HorizontalNavigationComponent {
	@Input({
		required: true,
	})
	links;

	@Input()
	noBorder = false;

	@Input()
	size?: undefined | 'S';

	@Input()
	header = true;
}
