import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-vertical-navigation-group',
	templateUrl: './vertical-navigation-group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, PortalDirective],
	host: {
		role: 'listitem',
		class: 'verticalNavigation-list-item',
		'[class.is-disabled]': 'disabled()',
	},
})
export class VerticalNavigationGroupComponent {
	/**
	 * Changes the text displayed by the vertical navigation group
	 */
	readonly label = input.required<PortalContent>();

	/**
	 * Adds an icon to the vertical navigation group
	 */
	readonly icon = input<LuccaIcon | null>(null);

	/**
	 * Disabled the vertical navigation group
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	readonly expanded = model(true);

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
