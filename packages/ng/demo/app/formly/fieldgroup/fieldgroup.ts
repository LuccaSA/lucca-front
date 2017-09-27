import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';

@Component({
	selector: 'demo-formly-fieldgroup',
	templateUrl: './fieldgroup.html',
})
export class FieldgroupComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			className: 'form-group',
			templateOptions: {
				title: 'section 1',
			},
			fieldGroup: [{
				className: 'form-group-line',
				fieldGroup: [
					{
						className: 'form-grid-md6',
						key: 'firstName',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'first name',
						},
					}, {
						className: 'form-grid-md6',
						key: 'lastName',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'last name',
						},
					}
				],
			},
		],
	},
	{
		className: 'form-group',
		templateOptions: {
			title: 'section 2',
		},
		fieldGroup: [],
	
	}
];

user = {};

}


