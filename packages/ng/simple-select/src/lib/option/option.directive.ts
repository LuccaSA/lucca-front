import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';
import { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luOption]',
	standalone: true,
})
export class LuOptionDirective<T> {
	@Input('luOptionSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.optionTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<T>>) {}

	public static ngTemplateContextGuard<T>(_dir: LuOptionDirective<T>, ctx: unknown): ctx is LuOptionContext<T> {
		return true;
	}
}
