import { Directive, Input, TemplateRef } from '@angular/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luOption]',
	standalone: true,
})
export class LuOptionDirective<T> {
	@Input('luOptionSelect') set select(select: ALuSelectInputComponent<T, unknown>) {
		select.optionTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<T>>) {}

	public static ngTemplateContextGuard<T>(_dir: LuOptionDirective<T>, ctx: unknown): ctx is LuOptionContext<T> {
		return true;
	}
}
