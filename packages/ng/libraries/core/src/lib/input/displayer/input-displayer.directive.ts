import { Directive, TemplateRef, forwardRef, ElementRef, ViewRef, EmbeddedViewRef } from '@angular/core';
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
export class LuInputDisplayerDirective<T = any> extends ALuInputDisplayer<T> implements ILuInputDisplayer<T> {
	constructor(protected template: TemplateRef<LuInputDisplayerContext<T>>) { super(); }
	getViewRef(value: T | T[]): ViewRef {
		return this.template.createEmbeddedView({ $implicit: value });
	}
}

export class LuInputDisplayerContext<T = any> {
	constructor(public $implicit: T | T[]) {}
}
