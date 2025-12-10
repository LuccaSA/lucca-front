import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { BreadcrumbsLinkDirective } from './breadcrumbs-link.directive';
import { LU_BREADCRUMBS_TRANSLATIONS } from './breadcrumbs.translate';

let nextId = 0;

@Component({
	selector: 'lu-breadcrumbs',
	styleUrl: './breadcrumbs.component.scss',
	templateUrl: './breadcrumbs.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	host: {
		class: 'breadcrumbs',
		'[attr.role]': 'isCompact() ? "presentation" : "nav"',
		'[class.mod-compact]': 'isCompact()',
		'[attr.aria-describedby]': 'id',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	intl = getIntl(LU_BREADCRUMBS_TRANSLATIONS);

	disableCompact = input(false, { transform: booleanAttribute });

	links = contentChildren(BreadcrumbsLinkDirective);

	isCompact = computed(() => this.links().length <= 2 && !this.disableCompact());

	readonly id = `breadcrumbs-title-${nextId++}`;
}
