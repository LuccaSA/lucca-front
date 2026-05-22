import { Directive, input, TemplateRef } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { LuOptionContext } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '../input';

@Directive({
	selector: '[luMultiDisplayer]',
})
export class LuMultiDisplayerDirective<T> {
	readonly select = input<LuMultiSelectInputComponent<T>>(undefined, { alias: 'luMultiDisplayerSelect' });

	public constructor(private templateRef: TemplateRef<LuOptionContext<T[]>>) {
		syncInputSignal(this.select, (select) => {
			select.valuesTpl.set(this.templateRef);
		});
	}

	public static ngTemplateContextGuard<T>(_dir: LuMultiDisplayerDirective<T>, ctx: unknown): ctx is LuOptionContext<T[]> {
		return true;
	}
}
