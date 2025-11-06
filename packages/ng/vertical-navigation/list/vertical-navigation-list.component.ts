import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { isNil } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { VerticalNavigationLinkDirective } from '../vertical-navigation-link.directive';

@Component({
	selector: 'lu-vertical-navigation-list',
	standalone: true,
	templateUrl: './vertical-navigation-list.component.html',
	styleUrl: './vertical-navigation-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, IconComponent],
	host: {
		role: 'listitem',
		class: 'verticalNavigation-list-item',
	},
})
export class VerticalNavigationListComponent {
	label = input.required<string>();
	icon = input<LuccaIcon | null>(null);

	links = contentChildren(VerticalNavigationLinkDirective);

	expanded = model(true);

	isIconless = computed(() => isNil(this.icon()));
	verticalNavigationIconClass = computed(() => (this.isIconless() ? 'verticalNavigation-list-item-link' : 'verticalNavigation-list-item-link-icon'));

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
