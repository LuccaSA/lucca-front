import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[SoftwareIconWrapperItem]',
	standalone: true,
})
export class SoftwareIconWrapperItemDirective {
	readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
