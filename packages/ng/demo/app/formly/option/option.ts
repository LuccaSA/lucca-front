import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';

@Component({
	selector: 'demo-formly-option',
	templateUrl: './option.html',
})
export class OptionComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			className: 'form-group',
			templateOptions: {
				title: 'label, placeholder, helper, suffix',
			},
			fieldGroup: [{
				className: 'form-group-line',
				fieldGroup: [
					{
						className: 'form-grid-md6',
						key: 'label',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'this is the label',
						},
					}, {
						className: 'form-grid-md6',
						key: 'placeholder',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'this one has a placeholder',
							placeholder: 'placeholder',
						},
					}
				]
			},
			{
				key: 'helper',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'this one has a helper',
					helper: 'this is the helper message',
				},
			},
				{
				className: 'form-group-line',
				fieldGroup: [
					{
						className: 'form-grid-md6',
						key: 'icon',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'this one has an icon',
							icon: 'heart',
						},
					}, {
						className: 'form-grid-md6',
						key: 'suffix',
						type: 'input',
						templateOptions: {
							type: 'text',
							label: 'this one has a suffix',
							suffix: 'LOL',
						},
					}
				]
			}],
		},
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
								click: () => { console.log('click on the button after a field'); },
								label: 'button after a field',
								className: 'palette-primary',
							}
						},
					}
				],
				templateOptions: {
					button: {
						click: () => { console.log('click on the button after a line'); },
						label: 'button after a line',
						className: 'mod-flat',
					}
				}
			}],
			templateOptions: {
				title: 'add a button after a field/line/section',
				button: {
					click: () => { console.log('click on the button after a section'); },
					label: 'button after a section',
				}
			}
		},

	];

user = {};

}


