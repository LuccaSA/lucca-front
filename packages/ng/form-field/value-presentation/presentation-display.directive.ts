import { Directive, inject, OnInit, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormFieldComponent } from '../form-field.component';

@Directive({
	selector: '[luPresentationDisplay]',
})
export class PresentationDisplayDirective implements OnInit {
	#formFieldRef = inject(FormFieldComponent, { optional: true });

	public readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);

	#vcr = inject(ViewContainerRef);

	defaultDisplay = signal(false);

	ngOnInit() {
		if (this.#formFieldRef) {
			// If it's default display, we do not override the existing value, this way consumers can override easily without any kind of race condition.
			if (!this.#formFieldRef.presentationDisplayTpl() || !this.defaultDisplay()) {
				this.#formFieldRef.presentationDisplayTpl.set(this.templateRef);
			}
		}
		this.#vcr.clear();
	}

	public static ngTemplateContextGuard(_dir: PresentationDisplayDirective, ctx: unknown): ctx is void {
		return true;
	}
}
