import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

/**
* adds class ng-empty (or a different class) when the model is empty
*/
@Directive({
	selector: '[luNotEmpty]',
	providers: [NgModel],
})
export class NotEmptyDirective implements OnInit {
	@Input() luNotEmpty: (val: any) => boolean;
	get notEmptyFn() {
		return this.luNotEmpty || (val => val !== undefined || val !== null);
	}
	constructor(private element: ElementRef, private ngModel: NgModel, private renderer: Renderer2) {}
	ngOnInit() {
		this.ngModel.valueChanges.subscribe((newVal: any) => {
			if (this.notEmptyFn(newVal)) {
				this.renderer.addClass(this.element.nativeElement, 'ng-not-empty');
				this.renderer.removeClass(this.element.nativeElement, 'ng-empty');
			} else {
				this.renderer.addClass(this.element.nativeElement, 'ng-empty');
				this.renderer.removeClass(this.element.nativeElement, 'ng-not-empty');
			}
		});
	}
}
