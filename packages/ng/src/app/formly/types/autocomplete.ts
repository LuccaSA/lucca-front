import { Component, OnInit } from '@angular/core';
import { FieldType } from 'ng-formly';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'lu-formly-field-autocomplete',
	templateUrl: './autocomplete.html',
})
export class LuFormlyFieldAutocomplete extends FieldType implements OnInit {
	filteredOptions: Observable<{ id: any, name: string }[]>;
	get _options() { return this.to.options || []; }
	ngOnInit () {
		const value = this.formControl.value;
		if (!!value && !this._options.includes(value) && this._options.map(o => o.id).includes(value.id)) {
			// replace formValue with the option value with the same id
			const option = this._options.find(o => o.id === value.id);
			this.formControl.setValue(option);
		}
		this.filteredOptions = this.formControl.valueChanges
		.startWith(null)
		.map(option => option ? this.filterOptions(option) : this._options.slice());
	}
	displayFn(option) { return !!option ? option.name : ''; }
	filterOptions(name: string) {
		return this._options.filter(option =>
			option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}
}
