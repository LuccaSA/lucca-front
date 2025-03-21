import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, contentChildren, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { HorizontalNavigationLinkDirective } from './horizontal-navigation-link.directive';

@Component({
	selector: 'lu-horizontal-navigation',
	standalone: true,
	templateUrl: './horizontal-navigation.component.html',
	styleUrls: ['./horizontal-navigation.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	host: {
		class: 'horizontalNavigation',
		role: 'navigation',
	},
})
export class HorizontalNavigationComponent {
	links = contentChildren(HorizontalNavigationLinkDirective);

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
