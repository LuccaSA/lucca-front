import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: '[luInput]',
	standalone: true,
})
export class InputDirective {
	public readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
}
