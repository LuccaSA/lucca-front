import { ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
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
	readonly heading = input.required<PortalContent>();
	readonly level = input<number>(3);

	readonly verticalNavigationGroup = contentChildren(VerticalNavigationGroupComponent, { descendants: true });
	readonly verticalNavigationLinks = contentChildren(VerticalNavigationLinkComponent, { descendants: true });

	readonly isIconless = computed(
		() => !this.verticalNavigationGroup().filter((verticalGroup) => verticalGroup?.icon()).length || !this.verticalNavigationLinks().filter((verticalLink) => verticalLink?.icon()).length,
	);
}
