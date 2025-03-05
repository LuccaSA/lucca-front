import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[luHorizontalNavigationLink]',
})
export class HorizontalNavigationLinkDirective {
	public template: TemplateRef<unknown>;

	constructor(private templateRef: TemplateRef<unknown>) {
		this.template = this.templateRef;
	}
}
