import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, input, model, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { isNil } from '@lucca-front/ng/core';
import { IconComponent } from '../icon/icon.component';
import { VerticalNavigationLinkDirective } from './vertical-naviguation-link.directive';

@Component({
	selector: 'lu-vertical-navigation',
	standalone: true,
	templateUrl: './vertical-navigation.component.html',
	styleUrl: './vertical-navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, IconComponent],
	host: {
		class: 'verticalNavigation',
		'[class.mod-iconless]': 'isIconless()',
	},
})
export class VerticalNavigationComponent {
	sectionTitle = input.required<string>();
	title = input.required<string>();
	icon = input<LuccaIcon | null>(null);

	links = contentChildren(VerticalNavigationLinkDirective);

	expanded = model(true);

	isIconless = computed(() => isNil(this.icon()));
	verticalNavigationIconClass = computed(() => (this.isIconless() ? 'verticalNavigation-list-item-link' : 'verticalNavigation-list-item-link-icon'));

	toggleExpanded() {
		this.expanded.set(!this.expanded());
	}
}
