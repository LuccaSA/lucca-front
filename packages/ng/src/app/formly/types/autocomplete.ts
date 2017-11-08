import { Component, OnInit } from '@angular/core';
import { FieldType } from 'ng-formly';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'lu-formly-field-autocomplete',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './autocomplete.html',
})
export class LuFormlyFieldAutocomplete extends FieldType implements OnInit {
	filteredOptions: Observable<{ id: any, name: string }[]>;
	get _options() { return this.to.options || []; }
	ngOnInit () {
		this.formControl.valueChanges.subscribe(value => {
			this.setToOption(value);
		});
		const value = this.formControl.value;
		this.setToOption(value);
		this.filteredOptions = this.formControl.valueChanges
		.startWith(null)
		.map(option => option ? this.filterOptions(option) : this._options.slice());
	}
	displayFn(option) { return !!option ? option.name : ''; }
	filterOptions(name: string) {
		return this._options.filter(option =>
			option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}
	setToOption(value) {
		if (!!value && !this._options.includes(value) && this._options.map(o => o.id).includes(value.id)) {
			// replace formValue with the option value with the same id
			const option = this._options.find(o => o.id === value.id);
			this.formControl.setValue(option);
		}
	}
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
