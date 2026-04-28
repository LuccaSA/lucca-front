import { booleanAttribute, Directive, inject, input, signal, TemplateRef } from '@angular/core';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';

@Directive({
	selector: '[luSkeletonContainer]',
})
export class SkeletonContainerDirective {
	public readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);

	readonly isLoading = input(false, { transform: booleanAttribute });
	readonly dark = input(false, { transform: booleanAttribute });

	defaultDisplay = signal(false);

	constructor() {
		ɵeffectWithDeps([this.isLoading], (isLoading) => {
			if (isLoading) {
				// set on child loading
			}
		});
	}
}
