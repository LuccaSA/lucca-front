import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { FORM_FIELD_INSTANCE } from './form-field.token';

@Directive({
	selector: '[luInput]',
	standalone: true,
})
export class InputDirective implements OnInit {
	public readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

	public readonly formFieldRef = inject(FORM_FIELD_INSTANCE);

	ngOnInit(): void {
		this.formFieldRef.input = this;
	}
}
