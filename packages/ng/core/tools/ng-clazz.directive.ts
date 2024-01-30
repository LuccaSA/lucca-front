import { ChangeDetectorRef, Directive, ElementRef, inject, IterableDiffers, KeyValueDiffers, Renderer2 } from '@angular/core';
import { NgClass } from '@angular/common';

// This directive exists to temporarily resolve a conflict in how directives work, see https://github.com/angular/angular/issues/52072
@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[ngClazz]',
	standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NgClazz extends NgClass {
	#cdr = inject(ChangeDetectorRef);

	override set ngClass(value: NgClass['ngClass']) {
		super.ngClass = value;
		setTimeout(() => this.#cdr.markForCheck());
	}

	constructor() {
		super(inject(IterableDiffers), inject(KeyValueDiffers), inject(ElementRef), inject(Renderer2));
	}
}
