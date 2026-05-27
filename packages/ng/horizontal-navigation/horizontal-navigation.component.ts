import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { HorizontalNavigationLinkDirective } from './horizontal-navigation-link.directive';

@Component({
	selector: 'lu-horizontal-navigation',
	templateUrl: './horizontal-navigation.component.html',
	styleUrl: './horizontal-navigation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
	host: {
		class: 'horizontalNavigation',
		'[class.mod-noBorder]': 'noBorder()',
		'[class.mod-S]': 'size() === `S`',
		'[class.mod-vertical]': 'vertical()',
	},
})
export class HorizontalNavigationComponent {
	readonly links = contentChildren(HorizontalNavigationLinkDirective);

	readonly noBorder = input(false, { transform: luBooleanAttribute });

	readonly container = input(false, { transform: luBooleanAttribute });

	readonly vertical = input(false, { transform: luBooleanAttribute });

	/**
	 * Which size should the horizontal navigation be? Defaults and small
	 */
	readonly size = input<null | 'S'>(null);
}
