import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { provideLuFormly } from '@lucca-front/ng/formly';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'formly-stories',
	imports: [FormlyModule, ReactiveFormsModule, JsonPipe],
	template: `
		<form [formGroup]="form" role="form" autocomplete="off" (ngSubmit)="submit()">
			<formly-form class="form" [form]="form" [fields]="fields" [model]="model" />
		</form>

		<pr-story-model-display>{{ model | json }}</pr-story-model-display>
	`,
})
class FormlyStory {
	form = new FormGroup({});
	model = {};

	fields: FormlyFieldConfig[] = [
		{
			type: 'input',
			key: 'input0',
			templateOptions: {
				label: 'Field',
				type: 'text',
			},
		},
		{
			type: 'input',
			key: 'input1',
			templateOptions: {
				label: 'Field with validation',
				type: 'text',
				required: true,
			},
			validation: {
				messages: {
					required: 'Title is required',
				},
			},
		},
		{
			type: 'input',
			key: 'input2',
			templateOptions: {
				label: 'Field with icon',
				type: 'text',
				icon: 'user',
			},
		},
		{
			type: 'input',
			key: 'input2',
			templateOptions: {
				label: 'Field with suffix',
				type: 'number',
				suffix: '€',
			},
		},
		{
			type: 'input',
			key: 'input3',
			templateOptions: {
				label: 'Field with helper',
				type: 'number',
				helper: 'This is a helper',
			},
		},
		{
			type: 'radio',
			key: 'radio',
			templateOptions: {
				label: 'Radio',
				options: [
					{ value: 1, label: 'Option 1' },
					{ value: 2, label: 'Option 2' },
					{ value: 3, label: 'Option 3' },
				],
			},
		},
		{
			type: 'checkbox',
			key: 'checkbox0',
			templateOptions: {
				label: 'Checkbox',
			},
		},
		{
			type: 'checkbox',
			key: 'checkbox1',
			templateOptions: {
				label: 'Checkbox with validation',
			},
			validators: {
				shoudBeChecked: (control: AbstractControl) => control.value === true,
			},
			validation: {
				messages: {
					shoudBeChecked: 'This checkbox should be checked',
				},
			},
		},
		{
			type: 'date',
			key: 'date',
			templateOptions: {
				label: 'Date',
			},
		},
		{
			type: 'textarea',
			key: 'textarea',
			templateOptions: {
				label: 'Textarea',
			},
		},
		{
			type: 'select',
			key: 'select',
			templateOptions: {
				label: 'Select',
				options: [
					{ value: 1, name: 'Option 1' },
					{ value: 2, name: 'Option 2' },
					{ value: 3, name: 'Option 3' },
				],
			},
		},
		{
			type: 'user',
			key: 'user',
			templateOptions: {
				label: 'User',
				placeholder: 'User placeholder',
			},
		},
		{
			type: 'api',
			key: 'api0',
			templateOptions: {
				standard: 'v4',
				api: '/organization/structure/api/establishments',
				label: 'Api',
				mod: 'mod-long',
				placeholder: 'Api placeholder',
			},
		},
		{
			type: 'api',
			key: 'api1',
			templateOptions: {
				standard: 'v4',
				api: '/organization/structure/api/establishments',
				label: 'Api multiple',
				mod: 'mod-long',
				placeholder: 'Api placeholder',
				multiple: true,
			},
		},
		{
			type: 'department',
			key: 'department',
			templateOptions: {
				label: 'Department',
				mod: 'mod-long',
				multiple: true,
				placeholder: 'Department placeholder',
			},
		},
		{
			type: 'establishment',
			key: 'establishment',
			templateOptions: {
				label: 'Establishment',
				mod: 'mod-long',
				multiple: true,
				placeholder: 'Establishment placeholder',
			},
		},
	];
}

const meta: Meta = {
	title: 'QA/Formly',
	component: FormlyStory,
	decorators: [
		applicationConfig({
			providers: [
				provideHttpClient(),
				provideLuFormly(),
				FormlyModule.forRoot().providers,
				{
					provide: ALuDateAdapter,
					useClass: LuNativeDateAdapter,
				},
			],
		}),
	],
};

export default meta;

export const Basic: StoryObj<FormlyStory> = {};
