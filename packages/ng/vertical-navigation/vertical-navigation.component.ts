import { ChangeDetectionStrategy, Component, contentChildren, input, ViewEncapsulation } from '@angular/core';
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
		'[class.mod-iconless]': 'true',
	},
})
export class VerticalNavigationComponent {
	headingLabel = input.required<string>();
	level = input<number>(3);

	navigationList = contentChildren(VerticalNavigationListComponent);
	navigationItems = contentChildren(VerticalNavigationItemComponent);
}
