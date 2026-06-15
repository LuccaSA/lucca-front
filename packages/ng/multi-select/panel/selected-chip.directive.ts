import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
	selector: '[luMultiSelectSelectedChip]',
})
export class ɵLuMultiSelectSelectedChipDirective<T> implements Highlightable {
	readonly option = input<T>(undefined, { alias: 'luMultiSelectSelectedChip' });

	elementRef = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	setActiveStyles(): void {
		this.elementRef.querySelector('button')?.focus();
	}

	setInactiveStyles(): void {
		// Nothing to do
	}
}
