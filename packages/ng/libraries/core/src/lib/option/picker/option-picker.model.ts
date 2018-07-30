import { ILuPickerPanel, ALuPickerPanel } from '../../input/index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ILuOptionItem } from '../item/index';
import { ElementRef } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ILuOptionOperator } from '../operator/index';
import { ESCAPE } from '@angular/cdk/keycodes';

export interface ILuOptionPickerPanel<T = any> extends ILuPickerPanel<T> {}

export abstract class ALuOptionPicker<T = any> extends ALuPickerPanel<T> implements ILuOptionPickerPanel<T> {
	private __operators;
	private __subs = new Subscription();
	onSelectValue: Observable<T>;
	setValue(value: T) {}
	constructor() {
		super();
		this.triggerEvent = 'click';
	}
	protected set _optionItems$(optionItems$: Observable<ILuOptionItem<T>[]>) {
		const singleFlow$ = optionItems$.map(items => merge(...items.map(i => i.onSelect))).mergeMap(item => item);
		this.__subs.add(
			singleFlow$
			.subscribe((value: T) => this._select(value))
		);
	}
	protected set _operators(operators: ILuOptionOperator<T>[]) {
		this.__operators = operators;
		let options$: Observable<T[]>;
		operators.forEach(operator => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
	}
	onScrollBottom() {
		if (!this.__operators) { return; }
		this.__operators.forEach(o => {
			if (!o.onScrollBottom) { return; }
			o.onScrollBottom();
		});
	}
	protected abstract _select(val: T);
	protected destroy() {
		this.__subs.unsubscribe();
	}
	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
				this.onClose();
				return;
			default:
				this.__operators.forEach(o => {
					if (!o.onKeydown) { return; }
					o.onKeydown(event.keyCode);
				});
		}
	}
	onOpen() {
		this.__operators.forEach(o => {
			if (!o.onOpen) { return; }
			o.onOpen();
		});
		this._emitOpenEvent();
	}
	onClose() {
		this.__operators.forEach(o => {
			if (!o.onClose) { return; }
			o.onClose();
		});
		this._emitCloseEvent();
	}
}
