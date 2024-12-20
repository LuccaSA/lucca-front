import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { generateInputs } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	decorators: [
		moduleMetadata({
			imports: [SwitchInputComponent, FormFieldComponent, FormsModule],
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
	},
} as Meta;

export const Basic: StoryObj<SwitchInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			props: {
				example: false,
			},
			template: `<lu-form-field ${generateInputs(
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

	<lu-switch-input ${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="example"/>

</lu-form-field>

{{example}}`,
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
	},
};
