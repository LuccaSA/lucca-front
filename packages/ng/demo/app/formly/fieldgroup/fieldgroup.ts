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
							button: {
								click: () => {},
								label: 'button after a field',
								class: 'palette-primary',
							}
						},
					}
				],
				templateOptions: {
					button: {
						click: () => {},
						label: 'button after a line',
						class: 'mod-flat',
					}
				}
			},
		],
		templateOptions: {
			title: 'section 1',
			button: {
				click: () => { console.log('mdr')},
				label: 'button after a section',
			}
		}
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


