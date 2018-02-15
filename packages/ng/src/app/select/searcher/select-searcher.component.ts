import {
	Component,
	Input,
	ContentChildren,
	QueryList
} from '@angular/core';
import { ISelectSearcher } from './select-searcher.model';
import { LuSelectOption } from '../option/select-option.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector: 'lu-select-searcher',
	templateUrl: './select-searcher.component.html',
	styleUrls: ['./select-searcher.component.scss'],
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class LuSelectSearcherComponent<T> implements ISelectSearcher<T>  {

	@Input() luOptionFeeder = true;
	private _clue = '';
	private _focus = false;
	private _clue$: Subject<string> = new Subject<string>();

	/**
	 * The options detected
	 */
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;

	constructor() {
		this._clue$
		.debounceTime(100) // wait 100ms after the last event before emitting last event
		.distinctUntilChanged() // only emit if value is different from previous value
		.subscribe(model => {
			this._clue = model;
			// Call the filter function
			this.filter(this._clue, this.luOptions.toArray());
		});
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
			if (match) {
				console.log(`Match found : ${option.viewValue}`);
			}
			return match;
		});
	}

	/**
	 * See ISelectSearcher
	 */
	hasFocus(): boolean {
		return this._focus;
	}

	private _onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

}
