import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luVerticalNavigationLink]',
	templateUrl: './vertical-navigation-link.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent],
	host: {
		class: 'verticalNavigation-list-item-link',
	},
})
export class VerticalNavigationLinkComponent {
	icon = input<LuccaIcon | null>(null);
}
