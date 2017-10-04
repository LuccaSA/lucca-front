import { Component, OnInit } from '@angular/core';
import { FieldType } from 'ng-formly';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'lu-formly-field-select',
	templateUrl: './select.html',
})
export class LuFormlyFieldSelect extends FieldType implements OnInit {
	get _options() { return this.to.options || []; }
	ngOnInit () {
	}
	displayFn(option) { return option.name; }
}
