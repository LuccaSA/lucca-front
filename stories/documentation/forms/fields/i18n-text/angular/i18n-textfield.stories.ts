import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { I18nTextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/I18nTextfield/Angular',
	decorators: [
		moduleMetadata({
			imports: [I18nTextInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S', 'XS'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<I18nTextInputComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>

	<lu-i18n-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-i18n-text-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [I18nTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
	},
};
