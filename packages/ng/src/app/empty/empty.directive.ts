import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

/**
* adds class ng-empty (or a different class) when the model is empty
*/
@Directive({
	selector: '[luEmpty]',
	providers: [NgModel],
})
export class LuEmptyDirective implements OnInit {
	/**
	 * a custom function to check if the value is empty, defalt is undefined or null or '' -> empty
	 */
	@Input() luEmpty: (val: any) => boolean;
	
	get isEmptyFn() {
		return this.luEmpty || (val => val === undefined || val === null || val === '');
	}
	constructor(private element: ElementRef, private ngModel: NgModel, private renderer: Renderer2) {}
	ngOnInit() {
		this.ngModel.valueChanges.subscribe((newVal: any) => {
			if (this.isEmptyFn(newVal)) {
				this.renderer.removeClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.addClass(this.element.nativeElement, 'ng-empty');
			} else {
				this.renderer.addClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.removeClass(this.element.nativeElement, 'ng-empty');
			}
		});
	}
}
