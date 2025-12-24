import { Directive, inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export interface PresentationContext<T> {
	$implicit: T;
}

@Directive({
	selector: '[luPresentationDisplay]',
})
export class PresentationDisplayDirective implements OnInit {
	#formFieldRef = inject(FormFieldComponent);

	public readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);

	#vcr = inject(ViewContainerRef);

	ngOnInit() {
		this.#formFieldRef.presentationDisplayTpl.set(this.templateRef);
		this.#vcr.clear();
	}

	public static ngTemplateContextGuard<T>(_dir: PresentationDisplayDirective, ctx: unknown): ctx is PresentationContext<T> {
		return true;
	}
}
