import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, contentChildren, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { BreadcrumbsLinkDirective } from './breadcrumbs-link.directive';
import { LU_BREADCRUMBS_TRANSLATIONS } from './breadcrumbs.translate';

let nextId = 0;

@Component({
	selector: 'lu-breadcrumbs',
	standalone: true,
	styleUrls: ['./breadcrumbs.component.scss'],
	templateUrl: './breadcrumbs.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	host: {
		class: 'breadcrumbs',
	},
})
export class BreadcrumbsComponent {
	intl = getIntl(LU_BREADCRUMBS_TRANSLATIONS);

	disableCompact = input(false, { transform: booleanAttribute });

	links = contentChildren(BreadcrumbsLinkDirective);

	isCompact = computed(() => this.links().length <= 2 && !this.disableCompact());

	@HostBinding('attr.aria-describedby')
	id = `breadcrumbs-title-${nextId++}`;

	@HostBinding('class.mod-compact')
	get classCompact(): boolean {
		return this.isCompact();
	}

	@HostBinding('attr.role')
	get roleAttr(): string {
		return this.isCompact() ? 'presentation' : 'nav';
	}
}
