import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[luRepeatTimes]',
	standalone: true,
})
export class RepeatTimesDirective {
	private templateRef = inject<TemplateRef<void>>(TemplateRef);
	private viewContainerRef = inject(ViewContainerRef);

	@Input('luRepeatTimes')
	public set repeatTimes(times: number) {
		this.viewContainerRef.clear();

		for (let i = 0; i < times; i++) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		}
	}
}
