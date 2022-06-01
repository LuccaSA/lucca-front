import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSelectInput2Component } from '../input';

@Directive({ selector: '[luDisplayer]' })
export class LuDisplayerDirective<T> {
	@Input('luDisplayerSelect') set select(select: LuSelectInput2Component<T>) {
		select.valueTpl = this.templateRef;
	}

	@Input('luDisplayer') value: T;

	public constructor(private templateRef: TemplateRef<{ $implicit: T }>) {}
}
