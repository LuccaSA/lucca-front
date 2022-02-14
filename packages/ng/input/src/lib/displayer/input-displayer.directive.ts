import { Directive, forwardRef, Input, TemplateRef, ViewRef } from '@angular/core';
import { ALuInputDisplayer, ILuInputDisplayer } from './input-displayer.model';

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
export class LuInputDisplayerDirective<T> extends ALuInputDisplayer<T> implements ILuInputDisplayer<T> {
	@Input('luDisplayerMultiple') set argMultiple(m: boolean) {
		this.multiple = !!m;
	}
	@Input('multiple') set inputMultiple(m: boolean | string) {
		if (m === '') {
			// allows to have multiple = true when writing
			// <ng-template luDisplayer multiple>
			this.multiple = true;
		} else {
			this.multiple = !!m;
		}
	}
	constructor(protected template: TemplateRef<LuInputDisplayerContext<T>>) {
		super();
	}
	getViewRef(value: T | T[]): ViewRef {
		return this.template.createEmbeddedView({ $implicit: value });
	}
}

export class LuInputDisplayerContext<T> {
	constructor(public $implicit: T | T[]) {}
}
