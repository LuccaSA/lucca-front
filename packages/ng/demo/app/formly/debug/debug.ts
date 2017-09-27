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
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email address',
				placeholder: 'Enter email',
				helper: 'dis iz da helper',
				suffix: 'heart',
				mod: 'mod-compact',
			},
		},
	];

	user = {
	};

	submit(user) {
		console.log(user);
	}
}


