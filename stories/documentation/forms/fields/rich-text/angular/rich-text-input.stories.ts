import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent, RichTextInputToolbarComponent, TagComponent, TAGS } from '@lucca-front/ng/forms/rich-text-input';
import { provideLuRichTextHTMLFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { DEFAULT_MARKDOWN_TRANSFORMERS, provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RichTextInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [RichTextInputToolbarComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent, DividerComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
		}),
	],
	argTypes: {},
} as Meta;

export const Basic: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{value}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
				providers: [provideLuRichTextMarkdownFormatter()],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
	},
};

export const WithNoInitialValue: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{value}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
				providers: [provideLuRichTextMarkdownFormatter()],
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
	},
};

export const WithHtmlFormatter: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{value}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
				providers: [provideLuRichTextHTMLFormatter()],
			},
		};
	},
	args: {
		value: 'Lorem <b>ipsum</b> dolor',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
	},
};

export const WithTagPlugin: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="value" [disabled]="disabled" [required]="required">
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
																	]"/>
		</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{value}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, TagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
				providers: [provideLuRichTextHTMLFormatter()],
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
	},
};

export const WithTagPluginMarkdown: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
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
																]"/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{value}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, TagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
				providers: [provideLuRichTextMarkdownFormatter([...DEFAULT_MARKDOWN_TRANSFORMERS, TAGS])],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor {{tag1}} *italic* {{unregisteredTag}} and regular {{tag2}} trailing text',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
	},
};
