import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/MultilanguageField/Angular',
	decorators: [
		moduleMetadata({
			imports: [MultilanguageInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
		},
		width: {
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
			description: '[v19.2]',
		},
	},
} as Meta;

export const Basic: StoryObj<
	MultilanguageInputComponent &
		FormFieldComponent & {
			disabled: boolean;
			required: boolean;
		}
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
			props: {
				example: [
					{
						cultureCode: 'invariant',
						value: '',
					},
					{
						cultureCode: 'fr-FR',
						value: '',
					},
					{
						cultureCode: 'en-EN',
						value: '',
					},
					{
						cultureCode: 'de-DE',
						value: '',
					},
				] as MultilanguageTranslation[],
			},
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					width,
				},
				argTypes,
			)}>
	<lu-multilanguage-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`),
		};
	},
	args: {
		disabled: false,
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		openOnFocus: false,
	},
};
