import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';

@Directive({
	selector: '[luOption]',
	standalone: true,
})
export class LuOptionDirective<T> {
	@Input('luOptionSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.optionTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<{ $implicit: T }>) {}
}
