import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { DEFAULT_MARKDOWN_TRANSFORMERS, MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective, TAGS } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PLAINTEXT_TAGS, PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

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
		placeholder: {
			description: 'Applique un placeholder au champ.',
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		disableSpellcheck: {
			description: "Désactive le correcteur d'orthographe.",
		},
		autoResize: {
			description: "Active / désactive l'autoresize du champ.",
		},
		hideToolbar: {
			description: 'Masque les options de mise en forme.',
		},
	},
} as Meta;

export const Basic: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithMarkdownFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterDirective],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor [link](https://example.com) *italic* and regular text',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
	},
};

export const WithNoInitialValue: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithMarkdownFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterDirective],
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
	},
};

export const WithHtmlFormatter: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithHtmlFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, HtmlFormatterDirective],
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
		hideToolbar: false,
	},
};

export const WithTagPlugin: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		return {
			props: { value, disabled, required },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithHtmlFormatter
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
																	]" />
		</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
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
	},
};

export const WithTagPluginMarkdown: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;
		const transformers = [...DEFAULT_MARKDOWN_TRANSFORMERS, TAGS];
		return {
			props: { value, disabled, required, transformers },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithMarkdownTagsFormatter
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
																]" />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, RichTextPluginTagComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, MarkdownFormatterWithTagsDirective],
			},
		};
	},
	args: {
		value: 'Lorem **ipsum** dolor {{tag1}} *italic* {{unregisteredTag}} and regular {{tag2}} trailing text\nLine 2\n\nParagraph 2\n\n\n\nParagraph 3',
		placeholder: 'Placeholder…',
		disabled: false,
		required: false,
		disableSpellcheck: false,
		autoResize: true,
		hideToolbar: false,
	},
};

export const WithTagPluginPlainText: StoryObj<RichTextInputComponent & { value: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value, disabled, required, ...inputArgs } = args;

		const transformers = [PLAINTEXT_TAGS];
		return {
			props: { value, disabled, required, transformers },
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input luWithPlainTextTagsFormatter
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="value" [disabled]="disabled" [required]="required">
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
<pr-story-model-display>{{ value }}</pr-story-model-display>`),
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
	},
};

export const WithTagPluginMarkdownContentChange: StoryObj<RichTextInputComponent & { value: string; valueFr: string; disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { value: valueEn, valueFr, disabled, required, ...inputArgs } = args;
		const value = valueEn;
		const transformers = [...DEFAULT_MARKDOWN_TRANSFORMERS, TAGS];
		return {
			props: { value, disabled, required, transformers },
			template: cleanupTemplate(`<button luButton="outlined" size="S" (click)="value='${valueEn}';">EN</button>
				<button luButton="outlined" size="S" (click)="value='${valueFr}';">FR</button>
				<lu-form-field label="Label">
	<lu-rich-text-input luWithMarkdownTagsFormatter
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
	},
};
