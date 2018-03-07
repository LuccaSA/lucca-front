import {
	Component,
	Input,
	AfterContentInit,
	AfterViewInit,
	ViewChildren,
	ViewChild,
	ElementRef,
	forwardRef,
	ChangeDetectorRef,
	OnDestroy,
	OnInit,
	QueryList
} from '@angular/core';
import { ASelectOptionFeeder, LuSelectOption, LuSelectOptionSelectionChange, LuSelectSearchIntl } from '../../../../src/app/select/';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector: 'demo-select-feeder-picker',
	templateUrl: './feeder-select-picker.component.html',
	styleUrls: ['./feeder-select-picker.component.scss'],
	providers: [{provide: ASelectOptionFeeder, useExisting: forwardRef(() => DemoSelectFeederPickerComponent)}]
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class DemoSelectFeederPickerComponent<T>
	extends ASelectOptionFeeder<T>
	implements
		OnDestroy,
		OnInit,
		AfterViewInit
		 {

	private _focus = false;

	private _intlChanges: Subscription;


	options:  T[];
	/**
	 * The options detected
	 */
	@ViewChild('scrollElement') _scrollElement : ElementRef;
	@ViewChildren(LuSelectOption) luOptions: QueryList<LuSelectOption<T>>;


	constructor(public _intl: LuSelectSearchIntl,
		private _changeDetectorRef: ChangeDetectorRef) {
		super();

		this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
	}

	ngOnInit() {
		const optionsTmp = [];
		setTimeout(() => {

			for (let i = 1; i <= 100; i++) {
				optionsTmp.push({
					id: i,
					name: `option ${i}`
				});
			}
			this.options = optionsTmp;
			this.luOptions.setDirty();
			this.luOptions.notifyOnChanges();
		}, 1000);

	}

	ngAfterViewInit(){
		this.luOptions.changes.subscribe(options => {
			this._callbackOptions(options);
		});
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return this._focus;
	}

	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {
		this._focus = true;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	scrollTo(index: number) {
		const luOption = this.luOptions.toArray()[index];

		this._scrollElement.nativeElement.scrollTop = luOption.offsetTop();

	}

	selectOption(option: LuSelectOptionSelectionChange<T>): void {
		this._callbackSelectOption(option.source);
	}

}
