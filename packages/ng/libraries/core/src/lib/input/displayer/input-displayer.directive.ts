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
export class LuInputDisplayerDirective<T = any> implements ILuInputDisplayer<T> {
	constructor(protected template: TemplateRef<LuInputDisplayerContext<T>>) {}
	getViewRef(value: T): ViewRef {
		return this.template.createEmbeddedView({ $implicit: value });
	}
	getElementRef(value: T): ElementRef {
		return undefined;
	}
}

export class LuInputDisplayerContext<T = any> {
	constructor(public $implicit: T) {}
}
