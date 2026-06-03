import { allLegumes } from '@/stories/forms/select/select.utils';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
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
				ReactiveFormsModule,
				DatePipe,
				FormComponent,
				DataPresentationComponent,
				RichTextInputComponent,
				RichTextPluginTagComponent,
				RichTextInputToolbarComponent,
			],
			providers: [provideLuRichTextMarkdownFormatter()],
		}),
	],
} as Meta;

export const Basic: StoryObj = {
	render: (args, { argTypes }) => {
		const { tooltip, size, booleanValue, stringValue, dateValue, numberValue, phoneNumberValue, textAreaValue, richTextContent } = args;
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
						value: 'Valeur en français',
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
				richTextContent,
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
<br>
<br>
<lu-form-field presentation label="Rich Text Editor">
	<lu-rich-text-input placeholder="Placeholder…" autoResize	[(ngModel)]="richTextContent">
		<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
`),
		};
	},
	args: {
		tooltip: '',
		size: '',
		booleanValue: false,
		stringValue: 'Example string value',
		richTextContent: 'Lorem **ipsum** dolor {{tag1}} *italic* {{unregisteredTag}} and regular {{tag2}} trailing text\nLine 2\n\nParagraph 2\n\n\n\nParagraph 3',
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
						value: 'Valeur en français',
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
		stringValue: 'Example string value',
		dateValue: new Date(),
		numberValue: 123456789,
		phoneNumberValue: '+33700000000',
		textAreaValue:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	},
};

/**
 * Repro: when a control value changes programmatically while the form field is in presentation mode,
 * the presentation display is NOT updated.
 *
 * Steps: click on "Update all values programmatically" → every presentation display should reflect the new
 * control values (displayed at the top), but some keep the old one.
 *
 * Affected (stale): number, checkbox, switch, radio.
 * Accidentally working: text (ngx-mask side effect — remove `[mask]` from its template and it breaks too),
 * textarea (`detectChanges()` call in its `valueChanges` subscription), date & simple-select (their
 * `writeValue` updates internal signals, which refreshes their view).
 *
 * Root cause: the `*luPresentationDisplayDefault` templates interpolate `ngControl.value`, which is not reactive.
 * The template is rendered through `ngTemplateOutlet` inside the OnPush FormFieldComponent, and a control value
 * change marks neither the form field nor the declaring input component for check, so the embedded view is
 * only refreshed when the input component happens to trigger CD on its own.
 */
export const ValueUpdateBugRepro: StoryObj = {
	render: () => {
		const controls = {
			text: new FormControl('Text A'),
			textarea: new FormControl('Textarea A'),
			number: new FormControl(1),
			checkbox: new FormControl(false),
			switch: new FormControl(false),
			date: new FormControl(new Date(2020, 0, 1)),
			select: new FormControl(allLegumes[0]),
			radio: new FormControl(1),
		};
		const updateAll = () => {
			controls.text.setValue(controls.text.value === 'Text A' ? 'Text B' : 'Text A');
			controls.textarea.setValue(controls.textarea.value === 'Textarea A' ? 'Textarea B' : 'Textarea A');
			controls.number.setValue(controls.number.value === 1 ? 2 : 1);
			controls.checkbox.setValue(!controls.checkbox.value);
			controls.switch.setValue(!controls.switch.value);
			controls.date.setValue(controls.date.value?.getFullYear() === 2020 ? new Date(2021, 5, 15) : new Date(2020, 0, 1));
			controls.select.setValue(controls.select.value === allLegumes[0] ? allLegumes[1] : allLegumes[0]);
			controls.radio.setValue(controls.radio.value === 1 ? 2 : 1);
		};
		return {
			props: {
				controls,
				legumes: allLegumes,
				updateAll,
			},
			template: cleanupTemplate(`
<button type="button" class="button" (click)="updateAll()">Update all values programmatically</button>
<br>
<br>
Control values:
text=<strong>{{ controls.text.value }}</strong>,
textarea=<strong>{{ controls.textarea.value }}</strong>,
number=<strong>{{ controls.number.value }}</strong>,
checkbox=<strong>{{ controls.checkbox.value }}</strong>,
switch=<strong>{{ controls.switch.value }}</strong>,
date=<strong>{{ controls.date.value | date }}</strong>,
select=<strong>{{ controls.select.value?.name }}</strong>,
radio=<strong>{{ controls.radio.value }}</strong>
<hr>
<lu-form-field presentation label="Text input">
	<lu-text-input [formControl]="controls.text" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Textarea input">
	<lu-textarea-input [formControl]="controls.textarea" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Number input">
	<lu-number-input [formControl]="controls.number" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Checkbox input">
	<lu-checkbox-input [formControl]="controls.checkbox" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Switch input">
	<lu-switch-input [formControl]="controls.switch" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Date input">
	<lu-date-input [formControl]="controls.date" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Simple select input">
	<lu-simple-select [options]="legumes" [formControl]="controls.select" />
</lu-form-field>
<br>
<br>
<lu-form-field presentation label="Radio input">
	<lu-radio-group-input [formControl]="controls.radio">
		<lu-radio [value]="1">Option A</lu-radio>
		<lu-radio [value]="2">Option B</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
`),
		};
	},
};

export const StandaloneDataDisplay: StoryObj = {
	render: () => {
		return {
			template: cleanupTemplate(`
			<lu-data-presentation label="Data presentation">
				Valeur à afficher.
			</lu-data-presentation>
			`),
		};
	},
};
