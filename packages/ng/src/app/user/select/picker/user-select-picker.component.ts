import {
	Component,
	Input,
	AfterViewInit,
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
		AfterViewInit {

	// Inner references
	_clue = '';
	_noResults = false;
	_loading = false;
	_users: T[];
	private _clue$: Subject<string> = new Subject<string>();
	private _noMoreResults = false;

	/** The pagingStart.  */
	@Input() pagingStart = 0;
	/** The paging size. */
	@Input() pagingSize = 10;
	/** True if you want to see the former Employees. */
	@Input() formerEmployees = false;

	/** The additionnals fields to use in the search. */
	@Input() fields = [];

	private _intlChanges: Subscription;

	private innerMap = {};

	private _api = '/api/v3/users/find';



	private _originalList:  T[];
	/**
	 * The input element
	 */
	@ViewChild('inputClue') _inputElement : ElementRef;
	/** The scroll element */
	@ViewChild('scrollElement') _scrollElement : ElementRef;
	/** The list of users (option) */
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
			this.pagingStart = 0;
			this._noMoreResults = false;
			this._resetUsers(this._clue);
		});
		this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
		this._resetUsers('', true);
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	ngAfterViewInit(): void {
		this._userList.changes.subscribe(options => {
			if (this._callbackOptions){
				this._callbackOptions(this._userList.toArray());
			}
		});
	}

	// Events
	_onMouseDown($e) {
		this._focused = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
	}

	_onBlur() {
		this._focused = false;
		// When we quit the field, we reset the search item
		this.pagingStart = 0;
		this._noMoreResults = false;
		this._clue$.next('');
	}

	_onKeydown($event: KeyboardEvent){
		this._callbackKeyEvent($event);
	}

	_onScroll($event: Event){
		const height = this._scrollElement.nativeElement.offsetHeight;
		const top = this._scrollElement.nativeElement.scrollTop;
		if (height - top < 50 && !this._loading && !this._noMoreResults){
			this.pagingStart += this.pagingSize;
			this._resetUsers(this._clue, false, true);
		}
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

	private _resetUsers(clue: string = '', resetOptions: boolean = false, completeList: boolean = false): void {
		this._loading = true;
		if (this._requestSubscription && !this._requestSubscription.closed){
			this._requestSubscription.unsubscribe();
			this._requestSubscription = null;
		}

		this._requestSubscription = this._getUsers(this._clue).subscribe( users => {
			if (completeList){
				this._users = this._users.concat(users);
			}else{
				this._users = users;
			}
			this._userList.setDirty();
			this._userList.notifyOnChanges();
			this._noResults = this._users.length === 0;
			this._noMoreResults = users.length === 0;

			if (resetOptions){
				this._originalList = users;
			}
			this._requestSubscription = null;
			this._loading = false;
		});
	}

	private _normalizeString(str: string){
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
	}


	_onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {
		this._focused = true;
		this._inputElement.nativeElement.focus();
		if (!this._users || this._users.length === 0){
			this._resetUsers('', true);
		}
	}

	/**
	 * See ISelectOptionFeeder
	 */
	scrollTo(index: number) {
		const luOption = this._userList.toArray()[index];

		this._scrollElement.nativeElement.scrollTop = luOption.offsetTop();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	textValue(item: T): string {
		return `${item.firstName} ${item.lastName}`;
	}

	_selectUser(user: LuSelectOption<T>) {
		this._callbackSelectOption(user);
	}

	private _getUsers(clue: string = ''): Observable<T[]> {
		const fields = ['id','firstName','lastName'].concat(this.fields);
		const params = [
				`formerEmployees=${this.formerEmployees}`,
				`clue=${encodeURIComponent(clue)}`,
				`paging=${this.pagingStart},${this.pagingSize}`,
				`fields=${fields.join(',')}`,
				//'orderBy=lastname,asc'
			];
		const url = `${this._api}?${params.join('&')}`;
		return this._http.get<{ data: { items: T[] } }>(url)
		.map(r => r.data.items);
	}

}
