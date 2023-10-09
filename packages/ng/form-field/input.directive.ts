import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
	selector: '[luInput]',
	standalone: true,
})
export class InputDirective {
	@HostBinding('class')
	clazz = 'textField-input-value';

	public host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
}
