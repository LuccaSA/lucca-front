import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { FORM_FIELD_INSTANCE } from './form-field.token';

@Directive({
	selector: '[luInput]',
	standalone: true,
	host: {
		// Used to autofocus in dialog boxes, do not change except if you know what you're doing
		class: 'luNativeInput',
	},
})
export class InputDirective implements OnInit {
	public readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

	public readonly formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	ngOnInit(): void {
		// If the field is used as standalone, we won't have the ref provided so it'll crash
		if (this.formFieldRef) {
			this.formFieldRef.addInput(this);
		}
	}
}
