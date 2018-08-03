import { Directive, TemplateRef, forwardRef } from '@angular/core';
import { ILuInputDisplayer, ALuInputDisplayer } from './input-displayer.model';

@Directive({
	selector: '[luDisplayer]',
	providers: [
		{
			provide: ALuInputDisplayer,
			useExisting: forwardRef(() => LuInputDisplayerDirective),
			multi: true,
		},
	],
})
export class LuInputDisplayerDirective<T = any> implements ILuInputDisplayer<T> {
	constructor(protected template: TemplateRef<LuInputDisplayerContext<T>>) {}
	getViewRef(value: T) {
		return this.template.createEmbeddedView({ $implicit: value });
	}
	getElementRef(value: T) {
		return undefined;
	}
}

export class LuInputDisplayerContext<T> {
	constructor(public $implicit: T) {}
}
