import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';
import { FieldType } from 'ng-formly';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({
	selector: 'demo-formly-debug',
	templateUrl: './debug.html',
})
export class DebugComponent implements OnInit {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			key: 'age',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Email address',
				placeholder: 'Enter email',
				helper: 'dis iz da helper',
				suffix: 'heart',
				// mod: 'mod-inline',
			},
			validators: {
				validation: Validators.compose([
					Validators.required,
					Validators.min(1),
					Validators.max(-1),
				]),
			},
			validation: {
				messages: {
					required: 'its required dummy',
					min: 'below minimum, stupid',
					max: 'over maximum, stupid',
				}
			}
		},
		// {
		// 	key: 'email',
		// 	type: 'input',
		// 	templateOptions: {
		// 		type: 'email',
		// 		label: 'Email address',
		// 		placeholder: 'Enter email',
		// 		// mod: 'mod-inline',
		// 	},
		// },
	];

	user = {
		age: 0,
	};

	submit(user) {
		console.log(user);
	}

	// autocomplete example fro sandy
	filteredOptions: Observable<{ id: any, name: string }[]>;
	options = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }, { id: 3, name: 'three' }, ]
	autoCompleteFC  = new FormControl();
	selectFC  = new FormControl();
	ngOnInit () {
		this.filteredOptions = this.autoCompleteFC.valueChanges
		.startWith(null)
		.map(option => option ? this.filterOptions(option) : this.options.slice());
	}
	displayFn(option) { return !!option ? option.name : ''; }
	filterOptions(name: string) {
		return this.options.filter(option =>
			option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}
}
