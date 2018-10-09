import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'demo-formly-option',
	templateUrl: './option.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			className: 'form-group',
			templateOptions: {
				title: 'label, placeholder, helper, suffix',
			},
			fieldGroup: [
				{
					className: 'form-group-line',
					fieldGroup: [
						{
							className: 'form-group-line-md6',
							key: 'label',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'this is the label',
							},
						},
						{
							className: 'form-group-line-md6',
							key: 'placeholder',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'this one has a placeholder',
								placeholder: 'placeholder',
							},
						},
					],
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
							className: 'form-group-line-md6',
							key: 'icon',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'this one has an icon',
								icon: 'heart',
							},
						},
						{
							className: 'form-group-line-md6',
							key: 'suffix',
							type: 'input',
							templateOptions: {
								type: 'text',
								label: 'this one has a suffix',
								suffix: 'LOL',
							},
						},
					],
				},
			],
		},
	];

	user = {};
	submit(stuff) {}
}
