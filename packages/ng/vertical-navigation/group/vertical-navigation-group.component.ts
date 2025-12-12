import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-vertical-navigation-group',
	standalone: true,
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
	label = input.required<PortalContent>();
	icon = input<LuccaIcon | null>(null);
	disabled = input(false, { transform: booleanAttribute });

	expanded = model(true);

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
