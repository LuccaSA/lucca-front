import {
	Directive,
	OnInit,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	OnDestroy,
	Renderer2,
	ElementRef,
	ViewContainerRef,
	HostListener
} from '@angular/core';
import {
	// ConnectedPositionStrategy,
	// OriginConnectionPosition,
	Overlay,
	// OverlayConnectionPosition,
	// OverlayRef,
	// OverlayConfig,
	// HorizontalConnectionPos,
	// VerticalConnectionPos
} from '@angular/cdk/overlay';
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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';

import { IApiItem, ICoerce } from '../api.model';
import { LuPopoverTrigger, IPopoverPanel, PopoverTriggerEvent } from '../../popover';

/**
 * Directive to put on a input to allow it to match the text inputed to an item available on an api
 */
@Directive({
	selector: 'input[luApiPicker]',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuApiPickerDirective), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuApiPickerDirective), multi: true },
	],
})
export class LuApiPickerDirective<T extends IApiItem>
extends LuPopoverTrigger
implements ControlValueAccessor, OnDestroy, OnInit, Validator {
	/**
	 * the api to query
	 */
	@Input() api: string;
	/** the name of the picker linked to this input */
	@Input('picker') popover: IPopoverPanel;
	triggerEvent = 'focus' as PopoverTriggerEvent;
	// value stuff
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
		// render
		this.render(value);
		// emit change
		if (!this.same(lastValue, value)) {
			this._valueChange.emit(value);
		}
	}
	protected _valueChange = new EventEmitter<T|null>();

	protected _validator: ValidatorFn | null;

	// internal observables and subscription
	private onInput = new EventEmitter<string>();
	private onInputSub: Subscription;

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		protected http: HttpClient,
	) {
		super(
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
	}
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

	// host listening
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
	private _cvaOnChange: (value: T) => void = () => {};

	@HostListener('input', ['$event.target.value'])
	_onInput(value: string) {
		this.onInput.next(value);
	}

	// init/destroy
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

	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}
	private _validatorOnChange = () => {};
	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		if (!this._strValue) {
			return null;
		}
		if (!!this.value && !!this.value.id) {
			return null;
		}
		return {'tpApi': {'text': `0 or several items match '${this._elementRef.nativeElement.value}'`}};
	}

	// render/display
	protected render(value = this.value) {
		this._renderer.setProperty(this._elementRef.nativeElement, 'value', this.display(value));
	}
	protected display(value: T | null): string {
		if (!value) {
			return '';
		}
		return value.name;
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
