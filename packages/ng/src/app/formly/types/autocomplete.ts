import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { MatAutocompleteSelectedEvent } from '@angular/material';
export interface IOption {
	id: number;
	name: string;
}
@Component({
	selector: 'lu-formly-field-autocomplete',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './autocomplete.html',
})
export class LuFormlyFieldAutocomplete extends FieldType implements OnInit {
	searchControl = new FormControl({});
	private get _options(): IOption[] { return this.to.options || []; }
	private _options$: BehaviorSubject<IOption[]>;
	options$: Observable<IOption[]>;

	ngOnInit () {
		this._options$ = new BehaviorSubject<IOption[]>(this._options);
		this.options$ = this._options$.asObservable();

		this.formControl.valueChanges
		.subscribe(val => {
			this.searchControl.setValue(val);
		});
		const initialValue = this.formControl.value;
		this.searchControl.setValue(initialValue);
		this.searchControl.valueChanges
		.subscribe(val => this.search(val));

	}
	displayFn(option: IOption) { return !!option ? option.name : ''; }
	focus() {
		this.to._isFocused = true;
		this.search();
	}
	blur() {
		this.to._isFocused = false;
	}
	search(clue: string = ''): void {
		if (typeof clue === 'string') {
			const options = this._options.filter(o => {
				return o.name.toLowerCase().startsWith(clue.toLowerCase());
			});
			this._options$.next(options);
		}
	}
	select($event: MatAutocompleteSelectedEvent) {
		this.formControl.setValue($event.option.value);
	}
}
