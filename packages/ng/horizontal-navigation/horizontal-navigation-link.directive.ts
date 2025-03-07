import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	selector: '[luHorizontalNavigationLink]',
})
export class HorizontalNavigationLinkDirective {
	public template = inject(TemplateRef);
}
