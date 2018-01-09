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
import { transformPopover } from '../popover';

/**
 * The component that provides available options for lu-select
 */
@Component({
	selector: 'lu-select-option',
	template: `<li
			class="lu-select-option"
			(click)="selectOption()"
			[ngClass]="{'is-focus': focused}">
			<ng-content></ng-content>
	</li>`,
	styleUrls: ['./select.option.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		transformPopover,
	],
})
export class LuSelectOption<T> implements OnInit, OnDestroy {

	private _focused = false;
	private _selected = false;

	get focused(): boolean {return this._focused; }
	get selected(): boolean {return this._selected; }

	get viewValue(): string {return (this._elementRef.nativeElement.textContent || '').trim(); }

	@Input() value: T;

	@Output() onSelectionChange = new EventEmitter<LuSelectOptionSelectionChange<T>>();

	@Input() rendering: LuSelectOptionRendering<T>;

	constructor(
		protected _elementRef: ElementRef,
	) {}

	ngOnInit() {
	}
	ngOnDestroy() {
	}
	onMouseDown($e) {
		$e.preventDefault();
	}

	getLabel(): string { return this.viewValue; }

	selectOption(): void {
		this.onSelectionChange.emit(new LuSelectOptionSelectionChange<T>(this, true));
	}


	focus(): void {
		this._focused = true;
	}

	unfocus(): void {
		this._focused = false;
	}

	select(): void {
		this._selected = true;
		this.selectOption();
	}

	unselect(): void {
		this._selected = false;
	}

}

export interface LuSelectOptionRendering<T> {

	getStrValue(): string;

	equals(optionValue: T): boolean;
}

export class LuSelectOptionSelectionChange<T> {
	constructor(
		/** Reference to the option that emitted the event. */
		public source: LuSelectOption<T>,
		/** Whether the change in the option's value was a result of a user action. */
		public isUserInput = false) { }
}
