import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: '[lu-vertical-navigation-list]',
	standalone: true,
	templateUrl: './vertical-navigation-list.component.html',
	styleUrl: './vertical-navigation-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent],
	host: {
		class: 'verticalNavigation-list',
	},
	// host: {
	// 	class: 'verticalNavigation-list-item',
	// 	'[class.is-disabled]': 'disabled()',
	// },
})
export class VerticalNavigationListComponent {
	icon = input<LuccaIcon | null>(null);
	disabled = input(false, { transform: booleanAttribute });

	// isIconless = computed(() => isNil(this.icon()));
	// verticalNavigationIconClass = computed(() => (this.isIconless() ? 'verticalNavigation-list-item-link' : 'verticalNavigation-list-item-link-icon'));
}
