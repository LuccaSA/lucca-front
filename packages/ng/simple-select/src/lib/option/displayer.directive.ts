import { Directive, Input, TemplateRef } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../input';
import { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luSimpleDisplayer]',
	standalone: true,
})
export class LuSimpleSelectDisplayerDirective<T> {
	@Input('luSimpleDisplayerSelect') set select(select: LuSimpleSelectInputComponent<T>) {
		select.valueTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<T>>) {}

	public static ngTemplateContextGuard<T>(_dir: LuSimpleSelectDisplayerDirective<T>, ctx: unknown): ctx is LuOptionContext<T> {
		return true;
	}
}
