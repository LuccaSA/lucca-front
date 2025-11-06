import { ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { isNil } from '../core/misc';
import { VerticalNavigationItemComponent } from './item/vertical-navigation-item.component';
import { VerticalNavigationListComponent } from './list/vertical-navigation-list.component';

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
	title = input.required<string>();

	navigationList = contentChildren(VerticalNavigationListComponent);
	navigationItems = contentChildren(VerticalNavigationItemComponent);

	isIconless = computed(() => this.navigationItems().some((item) => isNil(item.icon())) || this.navigationList().some((list) => isNil(list.icon())));
}
