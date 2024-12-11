import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DurationPickerComponent } from '../../../../packages/ng/time/duration-picker/duration-picker.component';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Duration Picker/Angular Form',
	decorators: [
		moduleMetadata({
			imports: [DurationPickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
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

export const Basic: StoryObj<DurationPickerComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field [rolePresentationLabel]="true" ${generateInputs(
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
	<lu-duration-picker label="${label}" ${generateInputs(inputArgs, argTypes)} [(ngModel)]="example">
	</lu-duration-picker>
</lu-form-field>

{{example}}`),
		};
	},
	args: {
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		hideZeroValue: false,
		displayArrows: false,
		disabled: false,
		step: 'PT1M',
		max: 'PT99H',
	},
};
