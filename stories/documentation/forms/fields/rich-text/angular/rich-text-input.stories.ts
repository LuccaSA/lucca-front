import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { luRichTextInputTranslations, RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, useControlledStoryModel, generateInputs, intlArgType } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RichTextInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [RichTextInputToolbarComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent, DividerComponent, ButtonComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr' }, provideRouter([])],
		}),
	],
	argTypes: {
		value: {
			description: '[Story] Valeur du champ.',
			table: { category: 'inputs' },
		},
		placeholder: {
			description: 'Applique un placeholder au champ.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs (ngModel)' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		disableSpellcheck: {
			description: 'Désactive le correcteur d’orthographe.',
			table: { category: 'inputs' },
		},
		autoResize: {
			description: 'Active / désactive l’autoresize du champ.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hideToolbar: {
			description: 'Masque les options de mise en forme.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		tags: {
			control: false,
			description: 'Liste des tags proposés par le plugin <code>lu-rich-text-plugin-tag</code> (clé, libellé, <code>secondary</code>, <code>group</code>). Requis.',
			table: { category: 'inputs (rich-text-plugin-tag)', type: { summary: 'Tag[]' } },
		},
		intl: intlArgType(luRichTextInputTranslations, 'ILuRichTextInputLabel', 'lu-rich-text-plugin-*'),
	},
} as Meta;

export const Basic: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithMarkdownFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterDirective],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor [link](https://example.com) *italic* and regular text. This is an auto link https://example.com',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const RequiredWithNoInitialValue: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithMarkdownFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterDirective],
			},
		};
	},
	args: {
		value: '',
		placeholder: 'Placeholder…',
		disabled: false,
		required: true,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithTagPluginWithNoInitialValue: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithHtmlFormatter
	${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
		<lu-rich-text-input-toolbar />
		<lu-rich-text-plugin-tag [tags]="[
																		{
																			key: 'tag1',
																			description: 'Tag 1',
																		},
																		{
																			key: 'tag2',
																			description: 'Tag 2',
																		},
																		{
																			key: 'tag3',
																			description: 'Tag 3',
																		},
																		{
																			key: 'tag4',
																			description: 'Tag 4',
																			secondary: true,
																		},
																		{
																			key: 'tag5',
																			description: 'Prénom',
																			secondary: true,
																		},
																		{
																			key: 'tag6',
																			description: 'Téléphone',
																			secondary: true,
																		},
																	]" />
		</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, HtmlFormatterDirective],
			},
		};
	},
	args: {
		value: '',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithHtmlFormatter: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithHtmlFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, HtmlFormatterDirective],
			},
		};
	},
	args: {
		value: '<a href="https://example.com">Lorem</a> <b>ipsum</b> dolor https://example.com',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithTagPlugin: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithHtmlFormatter
	${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
		<lu-rich-text-input-toolbar />
		<lu-rich-text-plugin-tag [tags]="[
																		{
																			key: 'tag1',
																			description: 'Tag 1',
																		},
																		{
																			key: 'tag2',
																			description: 'Tag 2',
																		},
																		{
																			key: 'tag3',
																			description: 'Tag 3',
																		},
																		{
																		key: 'tag4',
																		description: 'Tag 4',
																		secondary: true,
																			group: 'Groupe 2'
																		},
																		{
																			key: 'tag6',
																			description: 'Téléphone',
																			secondary: true,
																			group: 'Groupe 2'
																		},
																		{
																			key: 'tag5',
																			description: 'Prénom',
																			secondary: true,
																			group: 'Groupe 1'
																		},
																	]" />
		</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, HtmlFormatterDirective],
			},
		};
	},
	args: {
		value: 'Lorem <b>ipsum</b> dolor {{tag1}} <i>italic</i> {{unregisteredTag}} and regular {{tag2}} trailing text',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithTagPluginMarkdown: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithMarkdownTagsFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
			<lu-rich-text-plugin-tag [tags]="[
																	{
																		key: 'tag1',
																		description: 'Tag 1',
																	},
																	{
																		key: 'tag2',
																		description: 'Tag 2',
																	},
																	{
																		key: 'tag3',
																		description: 'Tag 3',
																	},
																	{
																		key: 'tag4',
																		description: 'Tag 4',
																		secondary: true,
																	},
																	{
																		key: 'tag5',
																		description: 'Prénom',
																		secondary: true,
																	},
																	{
																		key: 'tag6',
																		description: 'Téléphone',
																		secondary: true,
																	},
																]" />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterWithTagsDirective],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor {{tag1}} *italic* {{unregisteredTag}} and {{tag4}} regular {{tag2}} trailing text\nLine 2\n\nParagraph 2\n\n\n\nParagraph 3',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithTagPluginPlainText: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithPlainTextTagsFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-plugin-tag [tags]="[
																	{
																		key: 'tag1',
																		description: 'Tag 1',
																	},
																	{
																		key: 'tag2',
																		description: 'Tag 2',
																	},
																	{
																		key: 'tag3',
																		description: 'Tag 3',
																	},
																]" />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, PlainTextFormatterWithTagsDirective],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor {{tag1}} *italic* {{unregisteredTag}} and regular {{tag2}} trailing text\nLine 2\n\nLine 4\n\n\n\nLine 8',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};

export const WithTagPluginMarkdownContentChange: StoryObj<RichTextInputComponent & { value: string; valueFr: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value: valueEn, valueFr, disabled, required, presentation, ...inputArgs } = args;
		const value = valueEn;
		return {
			props: { model: useControlledStoryModel(value), disabled, required },
			template: cleanupTemplate(`<button luButton="outlined" size="S" (click)="model.example='${valueEn}';">EN</button>
				<button luButton="outlined" size="S" (click)="model.example='${valueFr}';">FR</button>
				<lu-form-field label="Label" ${generateInputs({ presentation }, argTypes)}>
	<lu-rich-text-input luWithMarkdownTagsFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
			<lu-rich-text-plugin-tag [tags]="[
																	{
																		key: 'tag1',
																		description: 'Tag 1',
																	},
																	{
																		key: 'tag2',
																		description: 'Tag 2',
																	},
																	{
																		key: 'tag3',
																		description: 'Tag 3',
																	},
																	{
																		key: 'tag4',
																		description: 'Tag 4',
																		secondary: true,
																	},
																	{
																		key: 'tag5',
																		description: 'Prénom',
																		secondary: true,
																	},
																	{
																		key: 'tag6',
																		description: 'Téléphone',
																		secondary: true,
																	},
																]"/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterWithTagsDirective],
			},
		};
	},
	args: {
		value: 'This is a **template** with {{tag1}} *and* {{tag2}} in English',
		valueFr: 'Ceci est un **modèle** avec {{tag1}} *et* {{tag2}} en français',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
		presentation: false,
	},
};
