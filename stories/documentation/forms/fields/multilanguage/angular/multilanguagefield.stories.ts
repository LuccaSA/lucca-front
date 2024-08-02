import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/MultilanguageField/Angular',
	decorators: [
		moduleMetadata({
			imports: [MultilanguageInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
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

export const Basic: StoryObj<MultilanguageInputComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
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
				},
				argTypes,
			)}>

	<lu-multilanguage-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-multilanguage-input>

</lu-form-field>

{{example | json}}`),
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
