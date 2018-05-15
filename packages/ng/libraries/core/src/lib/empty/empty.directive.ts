import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgModel, FormControl, NgControl } from '@angular/forms';

/**
 * adds class ng-empty when the model is empty and classes ng-not-empty and is-filled when not empty
 */
@Directive({
	selector: '[luEmpty]',
})
export class LuEmptyDirective implements OnInit {
	/**
	 * a custom function to check if the value is empty, defalt is undefined or null or '' -> empty
	 */
	@Input() luEmpty: (val: any) => boolean;

	get isEmptyFn() {
		return (
			this.luEmpty || (val => val === undefined || val === null || val === '')
		);
	}
	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private ngControl: NgControl,
	) {}

	ngOnInit() {
		const applyClasses = (newVal: any) => {
			if (this.isEmptyFn(newVal)) {
				this.renderer.removeClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.removeClass(this.element.nativeElement, 'is-filled');
				this.renderer.addClass(this.element.nativeElement, 'ng-empty');
			} else {
				this.renderer.addClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.addClass(this.element.nativeElement, 'is-filled');
				this.renderer.removeClass(this.element.nativeElement, 'ng-empty');
			}
		};

		this.ngControl.valueChanges.subscribe(applyClasses);
		const val = this.ngControl.value;
		applyClasses(val);
	}
}
