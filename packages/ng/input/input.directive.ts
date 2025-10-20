import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * adds class is-filled when model is empty
 */
@Directive({
	selector: '[luInput]',
})
export class LuInputDirective implements OnInit {
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
		this._ngControl.valueChanges.subscribe((v) => this.applyClasses(v));
		const val: unknown = this._ngControl.value;
		this.applyClasses(val);
	}
}
