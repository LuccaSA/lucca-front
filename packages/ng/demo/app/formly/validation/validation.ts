import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
	selector: 'demo-formly-validation',
	templateUrl: './validation.html',
})
export class ValidationComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			key: 'name',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Name',
				placeholder: 'required',
			},
			validators: {
				validation: Validators.compose([
					Validators.required,
				]),
			},
			validation: {
				messages: {
					required: 'this field is required',
				},
			}
		},
		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email address',
				placeholder: 'Enter email',
				mod: 'mod-compact'
			},
			validators: {
				validation: Validators.compose([
					Validators.email,
				]),
			},
			validation: {
				messages: {
					email: 'its the message cuz its not a valid email',
				},
			}
		},
		{
			key: 'age',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Age',
				placeholder: 'between 18 and 122',
			},
			validators: {
				validation: Validators.compose([
					Validators.min(18),
					Validators.max(122),
				]),
			},
			validation: {
				messages: {
					min: 'i declare on my honor i am 18 year old',
					max: 'nobody is that old',
				},
			}
		},
		{
			key: 'bogus',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'multiple',
				placeholder: 'over 10 and below 5',
				helper: 'it will display every validation message',
				mod: 'mod-compact'
			},
			validators: {
				validation: Validators.compose([
					Validators.min(10),
					Validators.max(5),
				]),
			},
			validation: {
				messages: {
					min: 'you must enter over 10',
					max: 'you must enter below 5',
				},
			}
		},
	];

	user = {
		age: 0,
		bogus: 7,
	};

	submit(user) {
		console.log(user);
	}
}


