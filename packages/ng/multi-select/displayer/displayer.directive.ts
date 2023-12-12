import { Directive, Input, TemplateRef } from '@angular/core';
import { LuOptionContext, provideOptionContext } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '../input';

@Directive({
	selector: '[luMultiDisplayer]',
	standalone: true,
	providers: [provideOptionContext()],
})
export class LuMultiDisplayerDirective<T> {
	@Input('luMultiDisplayerSelect') set select(select: LuMultiSelectInputComponent<T>) {
		select.valuesTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<T[]>>) {}

	public static ngTemplateContextGuard<T>(_dir: LuMultiDisplayerDirective<T>, ctx: unknown): ctx is LuOptionContext<T[]> {
		return true;
	}
}
