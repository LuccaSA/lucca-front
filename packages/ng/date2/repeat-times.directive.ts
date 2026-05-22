import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';

@Directive({
	selector: '[luRepeatTimes]',
})
export class RepeatTimesDirective {
	private templateRef = inject<TemplateRef<void>>(TemplateRef);

	private viewContainerRef = inject(ViewContainerRef);

	readonly repeatTimes = input<number>(0, { alias: 'luRepeatTimes' });

	constructor() {
		ɵeffectWithDeps([this.repeatTimes], (times) => {
			this.viewContainerRef.clear();

			for (let i = 0; i < times; i++) {
				this.viewContainerRef.createEmbeddedView(this.templateRef);
			}
		});
	}

	public static ngTemplateContextGuard(_dir: RepeatTimesDirective, ctx: unknown): ctx is void {
		return true;
	}
}
