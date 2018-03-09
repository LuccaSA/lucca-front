import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'lu-formly-field-select',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './select.html',
})
export class LuFormlyFieldSelect extends FieldType implements OnInit {
	get _options() { return <any[]>this.to.options || []; }
	ngOnInit () {
		this.formControl.valueChanges.subscribe(value => {
			this.setToOption(value);
		});
		const value = this.formControl.value;
		this.setToOption(value);
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
