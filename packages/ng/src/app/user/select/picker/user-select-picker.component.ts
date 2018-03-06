import {
	Component,
	Input,
	AfterContentInit,
	ContentChildren,
	ViewChild,
	ViewChildren,
	ElementRef,
	forwardRef,
	ChangeDetectorRef,
	OnDestroy,
	QueryList
} from '@angular/core';
import {
	ASelectOptionFeeder,
	ISelectOptionFeeder,
	LuSelectOption,
	LuSelectSearchIntl,
} from '../../../select/';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { IUser } from '../..';

@Component({
	selector: 'user-select-picker',
	templateUrl: './user-select-picker.component.html',
	styleUrls: ['./user-select-picker.component.scss'],
	providers: [{provide: ASelectOptionFeeder, useExisting: forwardRef(() => LuUserPicker)}]
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class LuUserPicker<T extends IUser>
	extends ASelectOptionFeeder<T>
	implements
		OnDestroy,
		AfterContentInit {

	_clue = '';
	private _focus = false;
	_noResults = false;
	private _clue$: Subject<string> = new Subject<string>();

	private _intlChanges: Subscription;

	private innerMap = {};

	private _api = '/api/v3/users';

	users: T[];

	private _originalList:  T[];
	/**
	 * The options detected
	 */
	@ViewChild('inputClue') _inputElement : ElementRef;
	@ViewChild('scrollElement') _scrollElement : ElementRef;
	@ViewChildren(LuSelectOption) _userList : QueryList<LuSelectOption<T>>;

	private _requestSubscription: Subscription;


	constructor(

		protected _elementRef: ElementRef,
		protected _http: HttpClient,
		public _intl: LuSelectSearchIntl,
		private _changeDetectorRef: ChangeDetectorRef) {
		super();
		this._clue$
		.debounceTime(100) // wait 100ms after the last event before emitting last event
		.distinctUntilChanged() // only emit if value is different from previous value
		.subscribe(model => {
			this._clue = model;
			// Call the filter function
			// const optionsFiltered = this.filter(this._clue, this._originalList);
			this._resetUsers(this._clue);
			/*const optionsFiltered = this.filter(this._clue, this._originalList);
			this._noResults = optionsFiltered.length === 0;
			// TODO
			// this.luOptions.reset(optionsFiltered);
			// this.luOptions.notifyOnChanges();
			if (this._callbackOptions){
				this._callbackOptions(optionsFiltered);
			}*/
		});
		this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
		this._resetUsers('', true);
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	ngAfterContentInit(): void {
		//this._originalList = [...this.users];
	}

	_onMouseDown($e) {
		this._focus = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
	}

	_onBlur() {
		this._focus = false;
		// When we quit the field, we reset the search item
		this._clue = '';
		// TODO
		// this.luOptions.reset(this._originalList);
		// this.luOptions.notifyOnChanges();
		// this._callbackOptions(this._originalList);
		// this._originalList.forEach(luOption => luOption.displayed = true);
		this._userList.setDirty();
		this._userList.notifyOnChanges();
		const userOptionList = this._userList.toArray();
		this._callbackOptions(userOptionList);
		userOptionList.forEach(luOption => luOption.displayed = true);
	}

	_onKeydown($event: KeyboardEvent){
		this._callbackKeyEvent($event);
	}

	/**
	 * See ISelectSearcher
	 */
	filter(clue: string, options: LuSelectOption<T>[]): LuSelectOption<T>[] {
		const normalizeClue = this._normalizeString(clue);
		return options
			.map(option => {
				option.displayed = false;
				return option;
			})
			.filter((option) => {
			let valueOption = this.innerMap[option.viewValue];
			if (!valueOption){
				this.innerMap[option.viewValue] = this._normalizeString(option.viewValue);
				valueOption = this.innerMap[option.viewValue];
			}

			return valueOption.indexOf(normalizeClue) !== -1;
		})
		.map(option => {
			option.displayed = true;
			return option;
		});
	}

	private _resetUsers(clue: string = '', resetOptions: boolean = false): void {
		if (this._requestSubscription && !this._requestSubscription.closed){
			this._requestSubscription.unsubscribe();
			this._requestSubscription = null;
		}

		this._requestSubscription = this.getOptions(this._clue).subscribe( options => {
			this.users = options;
			this._userList.setDirty();
			this._userList.notifyOnChanges();
			this._noResults = options.length === 0;
			if (this._callbackOptions){
				this._callbackOptions(this._userList.toArray());
			}
			if (resetOptions){
				this._originalList = options;
			}
			this._requestSubscription = null;
		});
	}

	private _normalizeString(str: string){
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
	}

	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return this._focus;
	}

	_onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {
		this._focus = true;
		this._inputElement.nativeElement.focus();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	scrollTo(index: number) {
		const luOption = this._userList.toArray()[index];

		this._scrollElement.nativeElement.scrollTop = luOption.offsetTop();
	}

	protected getOptions(clue: string = ''): Observable<T[]> {
		const params = [`name=like,${clue}`, 'paging=0,10', 'fields=id,name'];
		const url = `${this._api}?${params.join('&')}`;
		return this._http.get<{ data: { items: T[] } }>(url)
		.map(r => r.data.items);
	}

}
