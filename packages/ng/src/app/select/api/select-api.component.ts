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
	LuSelect,
} from '../select.component';
import {
	LuSelectClearerComponent,
	ISelectClearer,
} from '../clearer';
import {
	ASelectOptionFeeder,
	ISelectOptionFeeder
} from '../option';
import { ISelectApiFeeder } from './picker';
/**
 * User select
 *
*/
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'select-api',
	templateUrl: './select-api.component.html',
	styleUrls: ['./select-api.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuSelectApi), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuSelectApi), multi: true },
	],
})
// tslint:disable-next-line:component-class-suffix
export class LuSelectApi<T>
extends LuSelect<T> {

	@Input() selectApiFeeder: ISelectApiFeeder<T>;


	constructor(
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
	) {
		super(_elementRef, _renderer);
	}

}
