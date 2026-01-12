import { allLegumes } from '@/stories/forms/select/select.utils';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, MultilanguageInputComponent, MultilanguageTranslation, NumberFormatInputComponent, NumberInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'QA/Forms/Presentation',
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
		moduleMetadata({
			imports: [
				CheckboxInputComponent,
				TextInputComponent,
				DateInputComponent,
				MultilanguageInputComponent,
				NumberInputComponent,
				NumberFormatInputComponent,
				PhoneNumberInputComponent,
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
				FormFieldComponent,
				FormsModule,
			],
		}),
	],
} as Meta;

export const Basic: StoryObj = {
	render: (args, { argTypes }) => {
		const { tooltip, size, booleanValue, stringValue, dateValue, numberValue, phoneNumberValue, textAreaValue } = args;
		return {
			props: {
				boolean: booleanValue,
				text: stringValue,
				dateValue,
				multiLanguageValue: [
					{
						cultureCode: 'invariant',
						value: 'Invariant value',
					},
					{
						cultureCode: 'fr-FR',
						value: 'Valeur en Français',
					},
					{
						cultureCode: 'en-EN',
						value: 'English value',
					},
					{
						cultureCode: 'de-DE',
						value: "I don't speak German",
					},
				] as MultilanguageTranslation[],
				numberValue,
				phoneNumberValue,
				textAreaValue,
				legumes: allLegumes,
				legume: allLegumes[2],
			},
			template: cleanupTemplate(`
<lu-form-field presentation label="Checkbox input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-checkbox-input [(ngModel)]="boolean" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Switch input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-switch-input [(ngModel)]="boolean" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Text input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-text-input [(ngModel)]="text"/>
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Text Area input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-textarea-input [(ngModel)]="textAreaValue"/>
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Date input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-date-input [(ngModel)]="dateValue" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Multilanguage input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-multilanguage-input [(ngModel)]="multiLanguageValue" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Number input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-number-input [(ngModel)]="numberValue" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Number format input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-number-format-input [(ngModel)]="numberValue" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Phone number input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-phone-number-input [(ngModel)]="phoneNumberValue" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Simple select input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
</lu-form-field>
	<lu-simple-select [options]="legumes" [(ngModel)]="legume" />
<br>
<br>
<lu-form-field presentation label="Multiple select input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-multi-select [options]="legumes" [(ngModel)]="legumes" />
</lu-form-field>
`),
		};
	},
	args: {
		tooltip: '',
		size: '',
		booleanValue: false,
		stringValue: 'example string value',
		dateValue: new Date(),
		numberValue: 123456789,
		phoneNumberValue: '+33700000000',
		textAreaValue:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
};
