import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSelectInput2Component } from '../input';

@Directive({ selector: '[luOption]' })
export class LuOptionDirective<T> {
	@Input('luOptionSelect') set select(select: LuSelectInput2Component<T>) {
		select.optionTpl = this.templateRef;
	}

	@Input('luOption') value: T;

	public constructor(private templateRef: TemplateRef<{ $implicit: T }>) {}
}
