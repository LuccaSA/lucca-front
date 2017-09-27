import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';

@Component({
	selector: 'demo-formly-debug',
	templateUrl: './debug.html',
})
export class DebugComponent {
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
				// mod: 'mod-compact',
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
	];

	user = {
		age: 0,
	};

	submit(user) {
		console.log(user);
	}
}


