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
				type: 'radio',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<DurationPickerComponent & FormFieldComponent> = {
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
	<lu-duration-picker ${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="example">
	</lu-duration-picker>
</lu-form-field>

{{example}}`),
		};
	},
	args: {
		size: 'M',
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
		loopingPoint: 'P3D',
		min: 'PT0S',
		max: 'P1Y',
	},
};
