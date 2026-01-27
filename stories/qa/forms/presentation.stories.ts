import { allLegumes } from '@/stories/forms/select/select.utils';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormComponent } from '@lucca-front/ng/form';
import { DataPresentationComponent, FormFieldComponent } from '@lucca-front/ng/form-field';
import {
	CheckboxInputComponent,
	MultilanguageInputComponent,
	MultilanguageTranslation,
	NumberFormatInputComponent,
	NumberInputComponent,
	RadioComponent,
	RadioGroupInputComponent,
	SwitchInputComponent,
	TextareaInputComponent,
	TextInputComponent,
} from '@lucca-front/ng/forms';
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
				SwitchInputComponent,
				TextareaInputComponent,
				RadioGroupInputComponent,
				RadioComponent,
				FormFieldComponent,
				FormsModule,
				FormComponent,
				DataPresentationComponent,
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
	<lu-simple-select [options]="legumes" [(ngModel)]="legume" />
</lu-form-field>
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
<br>
<br>
<lu-form-field presentation label="Radio input" ${generateInputs(
				{
					tooltip,
					size,
				},
				argTypes,
			)}>
	<lu-radio-group-input	[ngModel]="2">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
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
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	},
};

export const GlobalToForm: StoryObj = {
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
<form luForm presentation>
	<lu-form-field label="Checkbox input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-checkbox-input [(ngModel)]="boolean" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Switch input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-switch-input [(ngModel)]="boolean" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Text input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-text-input [(ngModel)]="text" [ngModelOptions]="{standalone: true}"/>
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Text Area input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-textarea-input [(ngModel)]="textAreaValue" [ngModelOptions]="{standalone: true}"/>
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Date input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-date-input [(ngModel)]="dateValue" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Multilanguage input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-multilanguage-input [(ngModel)]="multiLanguageValue" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Number input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-number-input [(ngModel)]="numberValue" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Number format input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-number-format-input [(ngModel)]="numberValue" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Phone number input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-phone-number-input [(ngModel)]="phoneNumberValue" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Simple select input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-simple-select [options]="legumes" [(ngModel)]="legume" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Multiple select input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-multi-select [options]="legumes" [(ngModel)]="legumes" [ngModelOptions]="{standalone: true}" />
	</lu-form-field>
	<br>
	<br>
	<lu-form-field label="Radio input" ${generateInputs(
		{
			tooltip,
			size,
		},
		argTypes,
	)}>
		<lu-radio-group-input	[ngModel]="2" [ngModelOptions]="{standalone: true}">
			<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
			<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
			<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
		</lu-radio-group-input>
	</lu-form-field>
</form>
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
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	},
};

export const StandaloneDataDisplay: StoryObj = {
	render: () => {
		return {
			template: cleanupTemplate(`
			<lu-data-presentation label="Data presentation">
				Valeur à afficher
			</lu-data-presentation>
			`),
		};
	},
};
