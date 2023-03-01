import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';
import { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luSimpleOption]',
	standalone: true,
})
export class LuSimpleSelectOptionDirective<T> {
	@Input('luSimpleOptionSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.optionTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<T>>) {}

	public static ngTemplateContextGuard<T>(_dir: LuSimpleSelectOptionDirective<T>, ctx: unknown): ctx is LuOptionContext<T> {
		return true;
	}
}
