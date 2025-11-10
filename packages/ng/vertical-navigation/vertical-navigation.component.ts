import { ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { VerticalNavigationGroupComponent } from './group/vertical-navigation-group.component';
import { VerticalNavigationLinkComponent } from './link/vertical-navigation-link.component';

@Component({
	selector: 'lu-vertical-navigation',
	standalone: true,
	templateUrl: './vertical-navigation.component.html',
	styleUrl: './vertical-navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'verticalNavigation',
		'[class.mod-iconless]': 'isIconless()',
	},
})
export class VerticalNavigationComponent {
	heading = input.required<PortalContent>();
	level = input<number>(3);

	verticalNavigationGroup = contentChildren(VerticalNavigationGroupComponent, { descendants: true });
	vertivalNavigationLinks = contentChildren(VerticalNavigationLinkComponent, { descendants: true });

	isIconless = computed(
		() => !this.verticalNavigationGroup().filter((verticalGroup) => verticalGroup?.icon()).length || !this.vertivalNavigationLinks().filter((verticalLink) => verticalLink?.icon()).length,
	);
}
