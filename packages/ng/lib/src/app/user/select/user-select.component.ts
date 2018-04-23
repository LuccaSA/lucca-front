import {
	Component,
	forwardRef,
	Renderer2,
	ElementRef,
	OnInit,
	OnChanges,
	Input,
	SimpleChanges,
} from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { IUser } from '../user.model';
import { LuSelect } from '../../select';
import { LuApiSelectPicker } from '../../api';
import { UserSelectApiFeeder } from './user-select-api-feeder';
/**
 * User select
 *
 */
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'lu-user-select',
	templateUrl: './user-select.component.html',
	styleUrls: ['./user-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuUserSelect),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuUserSelect),
			multi: true,
		},
	],
})
// tslint:disable-next-line:component-class-suffix
export class LuUserSelect<T extends IUser> extends LuSelect<T>
	implements OnInit, OnChanges {
	/** The pagingStart.  */
	@Input() pagingStart = 0;
	/** The paging size. */
	@Input() pagingSize = 10;
	/** True if you want to see the former Employees. */
	@Input() formerEmployees = false;

	/** The additionnals fields to use in the search. */
	@Input() fields = [];

	constructor(
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
		public userSelectApiFeeder: UserSelectApiFeeder<T>,
	) {
		super(_elementRef, _renderer);
	}

	ngOnInit() {
		super.ngOnInit();
		this.userSelectApiFeeder.pagingStart = this.pagingStart;
		this.userSelectApiFeeder.pagingSize = this.pagingSize;
		this.userSelectApiFeeder.formerEmployees = this.formerEmployees;
		this.userSelectApiFeeder.fields = this.fields;
	}

	/** True if you want to see the former Employees. */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['pagingStart']) {
			this.userSelectApiFeeder.pagingStart = <number>changes['pagingStart']
				.currentValue;
		}
		if (changes['pagingSize']) {
			this.userSelectApiFeeder.pagingSize = <number>changes['pagingSize']
				.currentValue;
		}
		if (changes['formerEmployees']) {
			this.userSelectApiFeeder.formerEmployees = <boolean>changes[
				'formerEmployees'
			].currentValue;
		}
		if (changes['fields']) {
			this.userSelectApiFeeder.fields = <string[]>changes['fields']
				.currentValue;
		}
	}
}
