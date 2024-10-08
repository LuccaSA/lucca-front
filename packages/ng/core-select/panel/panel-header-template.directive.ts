import { Directive, TemplateRef, effect, inject, input } from '@angular/core';
import { ALuSelectInputComponent } from '../input';

@Directive({
	selector: '[luSelectPanelHeader]',
	standalone: true,
})
export class LuCoreSelectPanelHeaderDirective {
	readonly templateRef = inject<TemplateRef<void>>(TemplateRef);

	readonly select = input.required<ALuSelectInputComponent<unknown, unknown>>({ alias: 'luSelectPanelHeader' });

	constructor() {
		effect(() => this.select().panelHeaderTpl.set(this.templateRef));
	}

	public static ngTemplateContextGuard(_dir: LuCoreSelectPanelHeaderDirective, ctx: unknown): ctx is void {
		return true;
	}
}
