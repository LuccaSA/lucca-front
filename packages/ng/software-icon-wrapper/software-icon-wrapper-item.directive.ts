import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	// `luSoftwareIconWrapperItem` is deprecated, to be removed in 23.0: the 22.0 documentation showed it, though no
	// directive matched it and only the former any-template query rendered it.
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[SoftwareIconWrapperItem],[luSoftwareIconWrapperItem]',
	standalone: true,
})
export class SoftwareIconWrapperItemDirective {
	readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
