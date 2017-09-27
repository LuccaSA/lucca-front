import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';

@Component({
	selector: 'demo-formly-basic',
	templateUrl: './basic.html',
})
export class BasicComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			key: 'name',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'input type - text',
				placeholder: 'Enter email'
			},
		},
		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'input type - email',
				placeholder: 'Enter email'
			},
		},
		{
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'input type - password',
				placeholder: 'password'
			},
		},
		{
			key: 'age',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'input type - number',
				placeholder: 'Enter email'
			},
		},
		
	];

	user = {};

	submit(user) {
		console.log(user);
	}
}


