import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
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
	readonly intl = input(...intlInputOptions(LU_BREADCRUMBS_TRANSLATIONS));

	readonly disableCompact = input(false, { transform: booleanAttribute });

	readonly links = contentChildren(BreadcrumbsLinkDirective);

	readonly isCompact = computed(() => this.links().length <= 2 && !this.disableCompact());

	readonly id = `breadcrumbs-title-${nextId++}`;
}
