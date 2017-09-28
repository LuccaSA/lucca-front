import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';

/**
* adds class ng-empty when the model is empty
*/
@Directive({
	selector: '[luEmpty]',
})
export class LuEmptyDirective implements OnInit {
	/**
	 * a custom function to check if the value is empty, defalt is undefined or null or '' -> empty
	 */
	@Input() luEmpty: (val: any) => boolean;
	/**
	 * the form control it'll plug into
	 */
	@Input() formControl: FormControl;
	/**
	 * the ngModel it'll plug into
	 */
	@Input() ngModel: NgModel;
	
	get isEmptyFn() {
		return this.luEmpty || (val => val === undefined || val === null || val === '');
	}
	constructor(
		private element: ElementRef,
		private renderer: Renderer2
	) {}
	ngOnInit() {
		const applyClasses = (newVal: any) => {
			if (this.isEmptyFn(newVal)) {
				this.renderer.removeClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.addClass(this.element.nativeElement, 'ng-empty');
			} else {
				this.renderer.addClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.removeClass(this.element.nativeElement, 'ng-empty');
			}
		};
		// subscribe to valueChanges
		if (!!this.ngModel && !!this.ngModel.valueChanges) {
			this.ngModel.valueChanges.subscribe(applyClasses);
		} else if (!!this.formControl && !!this.formControl.valueChanges) {
			this.formControl.valueChanges.subscribe(applyClasses);
		}

		// apply for initial value
		let val;
		if (!!this.ngModel) {
			val = this.ngModel.value;
		} else if (!!this.formControl) {
			val = this.formControl.value;
		}
		applyClasses(val);
	}
}
