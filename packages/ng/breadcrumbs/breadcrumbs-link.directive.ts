import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	selector: '[luBreadcrumbsLink]',
})
export class BreadcrumbsLinkDirective {
	public template = inject(TemplateRef);
}
