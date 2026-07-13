import { DestroyRef, Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

/**
 * adds class is-filled when model is empty
 */
@Directive({
	selector: '[luInput]',
})
export class LuInputDirective implements OnInit {
	protected _destroyRef = inject(DestroyRef);

	constructor(
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
		protected _ngControl: NgControl,
	) {}
	protected isEmpty(value) {
		if (typeof value === 'string') {
			return value === '';
		}
		return value === null || value === undefined;
	}
	protected applyClasses(value) {
		if (this.isEmpty(value)) {
			this._renderer.removeClass(this._elementRef.nativeElement, 'is-filled');
		} else {
			this._renderer.addClass(this._elementRef.nativeElement, 'is-filled');
		}
	}
	ngOnInit() {
		this._ngControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((v) => this.applyClasses(v));
		const val: unknown = this._ngControl.value;
		this.applyClasses(val);
	}
}
