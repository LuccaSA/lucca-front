import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';

@Directive({
	selector: '[luDisplayer]',
	standalone: true,
})
export class LuDisplayerDirective<T> {
	@Input('luDisplayerSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.valueTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<{ $implicit: T }>) {}
}
