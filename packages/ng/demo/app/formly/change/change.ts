import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
const	choose = {
	key: 'choose',
	type: 'select',
	formControl: new FormControl(),
	templateOptions: {
		label: 'choose next field',
		options: [
			{ id: 0, name: 'input' },
			{ id: 1, name: 'select' },
			{ id: 2, name: 'autocomplete' },
		]
	},
};
const	input = {
	key: 'input',
	type: 'input',
	templateOptions: {
		label: 'input',
	},
};
const	select = {
	key: 'select',
	type: 'select',
	templateOptions: {
		label: 'select',
		options: [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
			{ id: 3, name: 'three' },
		]
	},
};
const	autocomplete = {
	key: 'autocomplete',
	type: 'autocomplete',
	templateOptions: {
		label: 'autocomplete',
		options: [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
			{ id: 3, name: 'three' },
		]
	},
};
@Component({
	selector: 'demo-formly-change',
	templateUrl: './change.html',
})
export class ChangeComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	fields = [
		choose,
	] as any[];

	user = {};

	ngOnInit() {
		choose.formControl.valueChanges.subscribe((val) => {
			switch (val.id) {
				case 0:
				this.fields = [choose, input];
				break;
				case 1:
				this.fields = [choose, select];
				break;
				case 2:
				this.fields = [choose, autocomplete];
				break;
		}
		});
	}

}


