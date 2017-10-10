import { Component, OnInit } from '@angular/core';
import { FieldType } from 'ng-formly';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'lu-formly-field-select',
	styles: [`
	:host {
		width: 100%;
		display: inherit;
		align-items: inherit;
	}
	:host-context(.mod-framed) {
		display: initial;
	}`],
	templateUrl: './select.html',
})
export class LuFormlyFieldSelect extends FieldType implements OnInit {
	get _options() { return this.to.options || []; }
	ngOnInit () {
		const value = this.formControl.value;
		if (!!value && !this._options.includes(value) && this._options.map(o => o.id).includes(value.id)) {
			// replace formValue with the option value with the same id
			const option = this._options.find(o => o.id === value.id);
			this.formControl.setValue(option);
		}
	}
}
