import {
	Component,
	OnInit,
	ContentChildren,
	QueryList,
	AfterContentInit
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
 * Component that manage the possibility to clear a select. null value will be set when we click on it
 */
export class LuSelectSearcherComponent<T> implements OnInit, AfterContentInit, ISelectSearcher<T>  {

	private _clue = '';
	private _focus = false;
	private _clue$: Subject<string> = new Subject<string>();

	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;

	constructor() {
		this._clue$
		.debounceTime(100) // wait 100ms after the last event before emitting last event
		.distinctUntilChanged() // only emit if value is different from previous value
		.subscribe(model => {
			this._clue = model;
			console.log(`Clue Changed : ${this._clue} / ${model}`);

			// Call the filter function
			this.filter(this._clue, this.luOptions.toArray());
		});
	}

	onMouseDown($e) {
		this._focus = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
	}

	onBlur() {
		this._focus = false;
	}

	ngOnInit(): void {
		console.log('OnInit Clue : ', this._clue);
	}

	ngAfterContentInit(): void {
		console.log('AfterContentInit Clue : ', this._clue);
	}

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

	hasFocus(): boolean {
		return this._focus;
	}

	private _onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

}
