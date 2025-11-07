import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-vertical-navigation-item',
	standalone: true,
	templateUrl: './vertical-navigation-item.component.html',
	styleUrl: './vertical-navigation-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent],
	host: {
		role: 'listitem',
		class: 'verticalNavigation-list-item',
		'[class.is-disabled]': 'disabled()',
	},
})
export class VerticalNavigationItemComponent {
	label = input<string | null>(null);
	icon = input<LuccaIcon | null>(null);
	disabled = input(false, { transform: booleanAttribute });

	expanded = model(true);

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
