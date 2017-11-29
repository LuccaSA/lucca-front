import { Directive, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy, Renderer2, ElementRef, HostListener } from '@angular/core';
import {
	NgModel,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
	Validators,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { IApiItem, ICoerce } from './api.model';

@Directive({
	selector: 'input[luApi]',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuApiDirective), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuApiDirective), multi: true },
	],
})
export class LuApiDirective<T extends IApiItem> implements ControlValueAccessor, OnDestroy, OnInit, Validator {

	private onInput = new EventEmitter<string>();
	private onInputSub: Subscription;

	protected _validator: ValidatorFn | null;
	protected get _strValue(): string {
		return this._elementRef.nativeElement.value as string;
	}
	protected _value: T | null;
	get value(): T | null {
		return this._value;
	}
	set value(value:  T | null) {
		const lastValue = this._value;
		this._value = value;

		// display the number of hours/days
		this.render(value);
		// emit change
		if (!this.same(lastValue, value)) {
			this._valueChange.emit(value);
		}
	}
	/**
	 * the api to consult
	 */
	@Input() api: string;

	protected _valueChange = new EventEmitter<T|null>();

	constructor(
		private _elementRef: ElementRef,
		private _renderer: Renderer2,
		protected http: HttpClient,
	) {}
	// From ControlValueAccessor interface
	writeValue(value: T) {
		this.value = value;
	}

	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}

	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}
	@HostListener('document:keydown.enter', ['$event'])
	onEnterKeydown() {
		if (!!this.value) {
			this.render();
		}
	}
	@HostListener('blur')
	onBlur() {
		this._onTouched();
		this.render();
	}
	_onTouched = () => {};
	private _cvaOnChange: (value: any) => void = () => {};

	@HostListener('input', ['$event.target.value'])
	_onInput(value: string) {
		this.onInput.next(value);
	}

	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
		const coercionObs = this.onInput.mergeMap(value => this.asyncCoerceApiItem(value));
		this.onInputSub = Observable.combineLatest(this.onInput, coercionObs)
		.subscribe(next => {
			const currentClue = next[0];
			const coercion = next[1];
			if (currentClue === coercion.clue) {
				this._value = coercion.item;
				this._cvaOnChange(coercion.item);
				this._valueChange.emit(coercion.item);
			}
		});
	}
	ngOnDestroy() {
		this._valueChange.complete();
		this.onInputSub.unsubscribe();
		this.onInput.complete();
	}
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}
	private _validatorOnChange = () => {};
	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		if (!this._strValue) {
			return null;
		}
		return (!!this.value && !!this.value.id) ? null : {'tpApi': {'text': `0 or several items match '${this._elementRef.nativeElement.value}'`}};
	}
	protected render(value = this.value) {
		this._renderer.setProperty(this._elementRef.nativeElement, 'value', this.display(value));
	}
	protected same(oldItem: T, newItem: T) {
		if (oldItem === newItem) {
			return true;
		}
		if (!oldItem && !newItem) {
			return true;
		}
		if (!oldItem || !newItem) {
			return false;
		}
		return oldItem.id === newItem.id;
	}
	protected display(value: T | null): string {
		if (!value) {
			return '';
		}
		return value.name;
	}
	protected asyncCoerceApiItem(value: string | null): Observable<ICoerce<T>> {
		const stringVal = value as string;
		if (!stringVal || stringVal.length < 2) {
			return Observable.of({ clue: value, item: null });
		}
		return this.http.get<{ data: { items: T[] } }>(`${this.api}?name=like,${stringVal}&paging=0,2&fields=id,name`)
		.map(r => {
			const matchingItems = r.data.items;
			if (!!matchingItems && matchingItems.length === 1) {
				return { clue: value, item: matchingItems[0] };
			}
			return { clue: value, item: null };
		});
	}
}
