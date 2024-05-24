import { booleanAttribute, Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
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

	/**
	 * Prevents message and label ids from being propagated, useful if the input holds its own message and label (like for radios)
	 */
	@Input({ transform: booleanAttribute, alias: 'luInputStandalone' })
	standalone = false;

	ngOnInit(): void {
		// If the field is used as standalone, we won't have the ref provided so it'll crash
		if (this.formFieldRef) {
			this.formFieldRef.addInput(this);
		}
	}
}
