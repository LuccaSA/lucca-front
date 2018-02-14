import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
	ViewEncapsulation,
	ElementRef,
} from '@angular/core';
import {LuSelectOptionSelectionChange} from './select-option.event';

/**
 * The component that provides available options for lu-select
 */
@Component({
	selector: 'lu-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
	],
})
export class LuSelectOption<T> implements OnInit, OnDestroy {

	private _focused = false;
	private _selected = false;
	private _displayed = true;

	/**
	 * true if the option is focused
	 */
	get focused(): boolean {return this._focused; }
	/**
	 * true if the option is selected
	 */
	get selected(): boolean {return this._selected; }

	/**
	 * true if the option should be displayed (you can with this hide / show dynamicly options)
	 */
	get displayed(): boolean {return this._displayed; }
	/**
	 * Set it to false if you don't want to show the option
	 */
	set displayed(display: boolean) {this._displayed = display; }

	/**
	 * the representation as string of the option
	 */
	get viewValue(): string {return (this._elementRef.nativeElement.textContent || '').trim(); }

	/**
	 * The value of the option
	 */
	@Input() luOptionValue: T;

	/**
	 * Emit an event when the option is selected, the LuSelectOption is passed as parameterr
	 */
	@Output() onSelectionChange = new EventEmitter<LuSelectOptionSelectionChange<T>>();

	constructor(
		protected _elementRef: ElementRef,
	) {}

	// LifeCycle methods
	ngOnInit() {
	}
	ngOnDestroy() {
	}
	// Override method
	onMouseDown($e) {
		$e.preventDefault();
	}

	/**
	 * @returns the representation as string of the option
	 */
	getLabel(): string { return this.viewValue; }

	/**
	 * Select the current option. This method will emit an event onSelectionChange
	 */
	_selectOption(): void {
		this.onSelectionChange.emit(new LuSelectOptionSelectionChange<T>(this, true));
	}


	/**
	 * Make the focus to the element
	 */
	focus(): void {
		this._focused = true;
	}

	/**
	 * Remove the focus of the element
	 */
	unfocus(): void {
		this._focused = false;
	}

	/**
	 * Select the option. This method will emit an event onSelectionChange
	 */
	select(): void {
		this._selected = true;
		this._selectOption();
	}

	/**
	 * Unselect the option
	 */
	unselect(): void {
		this._selected = false;
	}

}
