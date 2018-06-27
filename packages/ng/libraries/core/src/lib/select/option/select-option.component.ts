import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
	ViewEncapsulation,
	ElementRef,
	ChangeDetectorRef,
	ViewChild,
} from '@angular/core';
import { LuSelectOptionSelectionChange } from './select-option.event';

/**
 * The component that provides available options for lu-select
 */
@Component({
	selector: 'lu-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [],
})
// tslint:disable-next-line:component-class-suffix
export class LuSelectOption<T> implements OnInit, OnDestroy {
	private _focused = false;
	private _selected = false;
	private _displayed = true;

	private _multiple = false;
	private _boudingRect: any;

	public _checked = false;


	get multiple(): boolean {
		return this._multiple;
	}

	set multiple(multiple: boolean) {
		this._multiple = multiple;
		this._changeDetector.markForCheck();
	}

	/**
	 * true if the option is focused
	 */
	get focused(): boolean {
		return this._focused;
	}
	/**
	 * true if the option is selected
	 */
	get selected(): boolean {
		return this._selected;
	}

	/**
	 * true if the option should be displayed (you can with this hide / show dynamicly options)
	 */
	get displayed(): boolean {
		return this._displayed;
	}
	/**
	 * Set it to false if you don't want to show the option
	 */
	set displayed(display: boolean) {
		this._displayed = display;
		this._changeDetector.markForCheck();
	}


	get checked(): boolean {
		return this._checked;
	}

	set checked(checked: boolean) {
		this._checked = checked;
		this._changeDetector.markForCheck();
	}

	/**
	 * the representation as string of the option
	 */
	get viewValue(): string {
		return (this._elementRef.nativeElement.textContent || '').trim();
	}


	/**
	 * The value of the option
	 */
	@Input() luOptionValue: T;

	/**
	 * Emit an event when the option is selected, the LuSelectOption is passed as parameterr
	 */
	@Output()
	onSelectionChange = new EventEmitter<LuSelectOptionSelectionChange<T>>();

	constructor(
		protected _elementRef: ElementRef,
		protected _changeDetector: ChangeDetectorRef,
	) {}

	// LifeCycle methods
	ngOnInit() {}
	ngOnDestroy() {}
	// Override method
	onMouseDown($e) {
		$e.preventDefault();
	}

	/**
	 * @returns the representation as string of the option
	 */
	getLabel(): string {
		return this.viewValue;
	}

	/**
	 * Select the current option. This method will emit an event onSelectionChange
	 */
	_selectOption(): void {
		if (this.multiple) {
			this._checked = !this._checked;
		}
		this.onSelectionChange.emit(
			new LuSelectOptionSelectionChange<T>(this, true),
		);
	}

	/**
	 * Make the focus to the element
	 */
	focus(): void {
		this._focused = true;
		this._changeDetector.markForCheck();
	}

	/**
	 * Remove the focus of the element
	 */
	unfocus(): void {
		this._focused = false;
		this._changeDetector.markForCheck();
	}

	/**
	 * Select the option. This method will emit an event onSelectionChange
	 */
	select(): void {
		this._selected = true;
		this._selectOption();
		this._changeDetector.markForCheck();
	}

	/**
	 * Unselect the option
	 */
	unselect(): void {
		this._selected = false;
		this._changeDetector.markForCheck();
	}

	/**
	 * Define the Offset top of the element fir scrolling
	 */
	offsetTop(): number {
		if (!this._boudingRect) {
			this._boudingRect = this._elementRef.nativeElement.getBoundingClientRect();
		}
		this._changeDetector.markForCheck();
		return this._elementRef.nativeElement.offsetTop - this._boudingRect.height;
	}
}
