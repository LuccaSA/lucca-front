import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	selector: '[luVerticalNavigationLink]',
})
export class VerticalNavigationLinkDirective {
	public template = inject(TemplateRef);
}
