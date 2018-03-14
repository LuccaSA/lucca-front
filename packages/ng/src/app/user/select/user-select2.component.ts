import {
	Component,
	forwardRef,
	Renderer2,
	ElementRef,
	Input,
} from '@angular/core';
import {
	NgModel,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
	Validators,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from '@angular/forms';
import {
	IUser
} from '../user.model';
import { LuSelect, LuSelectClearerComponent, ISelectClearer, ASelectOptionFeeder, ISelectOptionFeeder } from '../../select';
import {  } from '../../select/clearer/select-clearer.model';
/**
 * User select
 *
*/
@Component({
	selector: 'user-select2',
	templateUrl: './user-select2.component.html',
	styleUrls: ['./user-select2.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuUserSelect2), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuUserSelect2), multi: true },
	],
})
export class LuUserSelect2<T extends IUser>
extends LuSelect<T> {

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
	) {
		super(_elementRef, _renderer);
	}

}
