import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { isNil } from '@lucca-front/ng/core';
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
		role: 'link',
		class: 'verticalNavigation-list-item-link',
	},
})
export class VerticalNavigationItemComponent {
	label = input.required<string>();
	icon = input<LuccaIcon | null>(null);

	isIconless = computed(() => isNil(this.icon()));
	verticalNavigationIconClass = computed(() => (this.isIconless() ? 'verticalNavigation-list-item-link' : 'verticalNavigation-list-item-link-icon'));
}
