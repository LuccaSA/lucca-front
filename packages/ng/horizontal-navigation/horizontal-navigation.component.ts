import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, input, ViewEncapsulation } from '@angular/core';
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

	/**
	 * Removes the separator border on horizontal navigation
	 */
	readonly noBorder = input(false, { transform: booleanAttribute });

	/**
	 * Display horizontal navigation in container
	 */
	readonly container = input(false, { transform: booleanAttribute });

	/**
	 * Display horizontal navigation in vertical (horizontal by default)
	 */
	readonly vertical = input(false, { transform: booleanAttribute });

	/**
	 * Which size should the horizontal navigation be? Defaults and small
	 */
	readonly size = input<null | 'S'>(null);
}
