import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

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
	links = input();

	noBorder = input(false, { transform: booleanAttribute });
	container = input(false, { transform: booleanAttribute });
	vertical = input(false, { transform: booleanAttribute });
	size = input<null | 'S'>(null);

	@HostBinding('class.mod-noBorder')
	get hasNoBorder() {
		return this.noBorder();
	}

	@HostBinding('class.mod-S')
	get isSizeS() {
		return this.size() === 'S';
	}

	@HostBinding('class.mod-vertical')
	get isVertical() {
		return this.vertical();
	}
}
