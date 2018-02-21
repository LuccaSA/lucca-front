import {
	Component,
	Input,
	ContentChildren,
	ViewChild,
	ElementRef,
	forwardRef,
	ChangeDetectorRef,
	OnDestroy,
	QueryList
} from '@angular/core';
import { ISelectSearcher } from './select-searcher.model';
import { AbstractSelectOptionFeederComponent } from '../option/select-option-feeder.component';
import { LuSelectOption } from '../option/select-option.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { LuSelectSearchIntl } from './select-searcher-intl';

@Component({
	selector: 'lu-select-searcher',
	templateUrl: './select-searcher.component.html',
	styleUrls: ['./select-searcher.component.scss'],
	providers: [{provide: AbstractSelectOptionFeederComponent, useExisting: forwardRef(() => LuSelectSearcherComponent)}]
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class LuSelectSearcherComponent<T> extends AbstractSelectOptionFeederComponent<T> implements ISelectSearcher<T>, OnDestroy  {

	private _clue = '';
	private _focus = false;
	private _noResults = false;
	private _clue$: Subject<string> = new Subject<string>();

	private _intlChanges: Subscription;

	/**
	 * The options detected
	 */
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;
	@ViewChild('inputClue') _inputElement : ElementRef;


	constructor(public _intl: LuSelectSearchIntl,
		private _changeDetectorRef: ChangeDetectorRef) {
		super();
		this._clue$
		.debounceTime(100) // wait 100ms after the last event before emitting last event
		.distinctUntilChanged() // only emit if value is different from previous value
		.subscribe(model => {
			this._clue = model;
			// Call the filter function
			this._noResults = this.filter(this._clue, this.luOptions.toArray()).length === 0;
		});
		this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}


	private _onMouseDown($e) {
		this._focus = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
	}

	private _onBlur() {
		this._focus = false;
		// When we quit the field, we reset the search item
		this._clue = '';
	}

	/**
	 * See ISelectSearcher
	 */
	filter(clue: string, options: LuSelectOption<T>[]): LuSelectOption<T>[] {
		return options.filter((option) => {
			const match = option.viewValue.indexOf(clue) !== -1;
			option.displayed = match;
			return match;
		});
	}

	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return this._focus;
	}

	private _onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {
		this._focus = true;
		this._inputElement.nativeElement.focus();
	}

}
