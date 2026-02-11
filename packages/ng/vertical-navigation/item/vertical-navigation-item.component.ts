import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-vertical-navigation-item',
	templateUrl: './vertical-navigation-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		role: 'listitem',
		class: 'verticalNavigation-list-item',
		'[class.is-disabled]': 'disabled()',
	},
})
export class VerticalNavigationItemComponent {
	/**
	 * Changes the text displayed by the vertical navigation item
	 */
	readonly label = input<string | null>(null);

	/**
	 * Adds an icon to the vertical navigation item
	 */
	readonly icon = input<LuccaIcon | null>(null);

	/**
	 * Disabled the vertical navigation item
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	readonly expanded = model(true);

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
