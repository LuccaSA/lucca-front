import { ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { luNullableNumberAttribute, luNumberAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { VerticalNavigationGroupComponent } from './group/vertical-navigation-group.component';
import { VerticalNavigationLinkComponent } from './link/vertical-navigation-link.component';

@Component({
	selector: 'lu-vertical-navigation',
	templateUrl: './vertical-navigation.component.html',
	styleUrl: './vertical-navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective],
	host: {
		class: 'verticalNavigation',
		'[class.mod-iconless]': 'isIconless()',
	},
})
export class VerticalNavigationComponent {
	/**
	 * Changes the heading title displayed by the vertical navigation
	 */
	readonly heading = input<PortalContent | null>(null);

	/**
	 * Aria level of the heading title. Defaults to 3.
	 */
	readonly headingLevel = input(null, { transform: luNullableNumberAttribute<1 | 2 | 3 | 4 | 5 | 6> });

	/**
	 * @deprecated use `headingLevel` instead
	 */
	readonly level = input(3, { transform: luNumberAttribute });

	readonly headingLevelValue = computed(() => this.headingLevel() ?? this.level());

	readonly verticalNavigationGroup = contentChildren(VerticalNavigationGroupComponent, { descendants: true });
	readonly verticalNavigationLinks = contentChildren(VerticalNavigationLinkComponent, { descendants: true });

	readonly isIconless = computed(
		() => !this.verticalNavigationGroup().filter((verticalGroup) => verticalGroup?.icon()).length || !this.verticalNavigationLinks().filter((verticalLink) => verticalLink?.icon()).length,
	);
}
