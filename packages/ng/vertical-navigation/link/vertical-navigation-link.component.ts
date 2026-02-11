import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'span[luVerticalNavigationLink], a[luVerticalNavigationLink]',
	templateUrl: './vertical-navigation-link.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent],
	host: {
		class: 'verticalNavigation-list-item-link',
		'[attr.role]': 'disabled() ? "presentation" : null',
		'[attr.tabindex]': 'disabled() ? -1 : null',
	},
})
export class VerticalNavigationLinkComponent {
	/**
	 * adds an icon to the vertical navigation link
	 */
	readonly icon = input<LuccaIcon | null>(null);

	/**
	 * Disabled the vertical navigation link
	 */
	readonly disabled = input(false, { transform: booleanAttribute });
}
