import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	selector: '[luTableOfContentLink]',
})
export class TableOfContentLinkDirective {
	public template = inject(TemplateRef);
}
