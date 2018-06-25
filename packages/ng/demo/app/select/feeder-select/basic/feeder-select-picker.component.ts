import {
	ChangeDetectionStrategy,
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
	QueryList,
} from '@angular/core';
import {
	ASelectOptionFeeder,
	LuSelectOption,
	LuSelectOptionSelectionChange,
	LuSelectSearchIntl,
	LuSelectIntl,
} from '../../../../../src/app/select/';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector: 'demo-select-feeder-picker',
	templateUrl: './feeder-select-picker.component.html',
	styleUrls: ['./feeder-select-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ASelectOptionFeeder,
			useExisting: forwardRef(() => DemoSelectFeederPickerComponent),
		},
	],
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class DemoSelectFeederPickerComponent extends ASelectOptionFeeder<any>
	implements OnDestroy, OnInit, AfterViewInit {
	protected _intlChanges: Subscription;

	options: any[];
	/**
	 * The options detected
	 */
	@ViewChild('scrollElement') _scrollElement: ElementRef;
	@ViewChildren(LuSelectOption) luOptions: QueryList<LuSelectOption<any>>;

	constructor(
		public _intlSelect: LuSelectIntl,
		public _intl: LuSelectSearchIntl,
		protected _changeDetectorRef: ChangeDetectorRef,
	) {
		super(_intlSelect, _changeDetectorRef);

		this._intlChanges = _intl.changes.subscribe(() =>
			this._changeDetectorRef.markForCheck(),
		);
	}

	ngOnInit() {
		const optionsTmp = [];
		setTimeout(() => {
			for (let i = 1; i <= 100; i++) {
				optionsTmp.push({
					id: i,
					name: `option ${i}`,
				});
			}
			this.options = optionsTmp;
			this.luOptions.setDirty();
			this.luOptions.notifyOnChanges();
			this._changeDetectorRef.markForCheck();
		}, 1000);
	}

	ngAfterViewInit() {
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
	scrollTo(index: number) {
		const luOption = this.luOptions.toArray()[index];

		this._scrollElement.nativeElement.scrollTop = luOption.offsetTop();
	}

	selectOption(option: LuSelectOptionSelectionChange<any>): void {
		this._callbackSelectOption(option.source);
	}

	/**
	 * See ISelectOptionFeeder
	 */
	textValue(item: any): string {
		return item.name;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	open(): void {}

	length(): number {
		return this.options.length;
	}

	getAllEntities(): Observable<any[]> {
		return Observable.of(this.options);
	}
}
