import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[luMultiSelectSelectedChip]',
})
export class ɵLuMultiSelectSelectedChipDirective<T> implements Highlightable {
	@Input('luMultiSelectSelectedChip') option?: T;

	elementRef = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	setActiveStyles(): void {
		this.elementRef.querySelector('button').focus();
	}
	setInactiveStyles(): void {
		// Nothing to do
	}
}
