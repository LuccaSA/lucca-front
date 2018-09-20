import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'demo-formly-fieldgroup',
	templateUrl: './fieldgroup.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldgroupComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			className: 'form-group',
			fieldGroup: [
				{
					className: 'form-group-line',
					fieldGroup: [
						{
							className: 'form-group-line-md6',
							key: 'firstName',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'first name',
								mod: 'mod-framed',
							},
						},
						{
							className: 'form-group-line-md6',
							key: 'lastName',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'last name',
								mod: 'mod-framed',
							},
						},
					],
					templateOptions: {},
				},
				{
					className: 'form-group-line',
					fieldGroup: [
						{
							className: 'form-group-line-md2',
							key: 'buildingNumber',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'Building Number',
								mod: 'mod-framed',
							},
						},
						{
							className: 'form-group-line-md10',
							key: 'streetName',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'Street Name',
								mod: 'mod-framed',
							},
						},
					],
					templateOptions: {},
				},
				{
					fieldGroup: [
						{
							key: 'Comments',
							type: 'textarea',
							templateOptions: {
								label: 'comments',
								mod: 'mod-framed textarea',
							},
						},
					],
					templateOptions: {},
				},
				{
					className: 'form-group-line',
					fieldGroup: [
						{
							className: 'form-group-line-md4',
							key: 'radio_choice',
							type: 'radio',
							templateOptions: {
								label: 'Radio choices',
								options: [
									{ value: 1, label: 'Option 1'},
									{ value: 2, label: 'Option 2'},
								],
								mod: 'mod-framed',
							},
						},
					],
					templateOptions: {},
				},
			],
			templateOptions: {
				title: 'section 1',
			},
		},
		{
			className: 'form-group',
			templateOptions: {
				title: 'section 2',
				mod: 'mod-framed',
			},
			fieldGroup: [
				{
					key: 'iam',
					type: 'select',
					templateOptions: {
						label: 'I am (select single)',
						options: [
							{ id: 0, name: 'female' },
							{ id: 1, name: 'male' },
							{ id: 2, name: 'other' },
						],
						mod: 'mod-framed',
					},
				}, {
					key: 'iwant',
					type: 'select',
					templateOptions: {
						label: 'And im looking for (select multiple)',
						multiple: true,
						options: [
							{ id: 0, name: 'female' },
							{ id: 1, name: 'male' },
							{ id: 2, name: 'other' },
						],
						mod: 'mod-framed',
					},
				},
			],
		},
	];

	user = {};

	submit(stuff) {}
}
