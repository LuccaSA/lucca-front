import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/Angular',
	decorators: [
		moduleMetadata({
			imports: [CheckboxInputComponent, FormFieldComponent, FormsModule],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
		},
		checklist: {
			control: {
				type: 'boolean',
			},
			description: '[v20.2]',
		},
	},
} as Meta;

export const Basic: StoryObj<CheckboxInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			props: {
				example: false,
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
	<lu-checkbox-input ${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="example"/>
</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		mixed: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		checklist: false,
	},
};
