import { Directive, inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormFieldComponent } from '../form-field.component';

@Directive({
	selector: '[luPresentationDisplay]',
})
export class PresentationDisplayDirective implements OnInit {
	#formFieldRef = inject(FormFieldComponent, { optional: true });

	public readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);

	#vcr = inject(ViewContainerRef);

	ngOnInit() {
		if (this.#formFieldRef) {
			this.#formFieldRef.presentationDisplayTpl.set(this.templateRef);
		}
		this.#vcr.clear();
	}

	public static ngTemplateContextGuard(_dir: PresentationDisplayDirective, ctx: unknown): ctx is void {
		return true;
	}
}
