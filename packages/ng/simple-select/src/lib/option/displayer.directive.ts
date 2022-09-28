import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';

@Directive({ selector: '[luDisplayer]' })
export class LuDisplayerDirective<T> {
	@Input('luDisplayerSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.valueTpl = this.templateRef;
	}

	@Input('luDisplayer') value: T;

	public constructor(private templateRef: TemplateRef<{ $implicit: T }>) {}
}
