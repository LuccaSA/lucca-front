import {
	AfterContentInit,
	Component,
	Input,
	EventEmitter,
	forwardRef,
	ElementRef,
	OnInit,
	OnDestroy,
	QueryList,
	ContentChildren,
	ViewEncapsulation,
	ViewChild,
} from '@angular/core';
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
import {LuSelectDirective} from './select.directive';
import {LuSelectPopover} from './select.popover.component';
import {Subject} from 'rxjs/Subject';
import {take} from 'rxjs/operators/take';
import {startWith} from 'rxjs/operators/startWith';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {LuSelectOption} from './select.option.component';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */


/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-select',
	encapsulation: ViewEncapsulation.Emulated,
	template: `
	<div class="textfield mod-select {{mod}}" [class.mod-remove]="_canRemove">
		<div [luSelect]="selectRef"
			class="textfield-input"
			name="linkLabel"
			luEmpty
			[clearable]="clearable"
			(canremove)="canRemove($event)"></div>
		<label *ngIf="placeholder" class="textfield-label" for="linkLabel">{{placeholder}}</label>
		<lu-select-popover #selectRef (itemSelected)="optionSelected($event)">
			<ng-content></ng-content>
		</lu-select-popover>
		<button class="actionIcon" (click)="clear()" tabIndex="-1">
			<i class="lucca-icon">cross_thin</i>
		</button>
	</div>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuSelect), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuSelect), multi: true },
	],
	styleUrls: ['./select.component.scss'],
})
export class LuSelect<T> implements ControlValueAccessor, AfterContentInit, OnInit, OnDestroy {

	private _destroy$ = new Subject<void>();
	protected _value: T | null;
	protected _validator: ValidatorFn | null;
	protected _canRemove = false;
	get value(): T | null {
		return this._value;
	}
	set value(value:  T | null) {
		const lastValue = this._value;
		this._value = value;
		// render
		if (!this.same(lastValue, value)) {
			this._valueChange.emit(value);
			this._cvaOnChange(value);
			this._field.value = value;
		}

	}
	protected _valueChange = new EventEmitter<T|null>();
	@ViewChild(LuSelectDirective) _field: LuSelectDirective<T>;
	@ViewChild(LuSelectPopover) _popover: LuSelectPopover<T>;
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;

	@Input() placeholder: String;
	@Input() clearable = false;
	@Input() mod: String;
	private _cvaOnChange: (value: T) => void = () => {};


	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		return null;
	}
	_onTouched = () => {};

	constructor(private element: ElementRef
	) {
	}
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
	}
	ngOnDestroy() {

	}

	ngAfterContentInit() {
		this.luOptions.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe((option) => {
			console.log(option);
			if (this._popover.luOptions$) {
				this._popover.luOptions$.next(this.luOptions.toArray());
			}
		});
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

	setDisabledState(isDisabled: boolean): void {

	}

	canRemove(canRemove: boolean) {
		this._canRemove = canRemove;
	}

	clear() {
		this.value = null;
	}
	optionSelected(option: LuSelectOption<T>) {
		this.value = option ? option.value : null;
	}

	// Utilities

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
		return JSON.stringify(oldItem) === JSON.stringify(newItem);
	}

}
