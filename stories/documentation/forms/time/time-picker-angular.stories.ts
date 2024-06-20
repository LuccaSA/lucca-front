import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Time Picker/Angular Form',
	decorators: [
		moduleMetadata({
			imports: [TimePickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
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

export const Basic: StoryObj<TimePickerComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field [label]="labelID" [rolePresentationLabel]="true" ${generateInputs(
				{
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>
	<lu-time-picker label="${label}" ${generateInputs(inputArgs, argTypes)} [(ngModel)]="example">
	</lu-time-picker>
	<ng-template #labelID>
			<span aria-hidden="true">${label}</span>
		</ng-template>
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
		displayArrows: false,
		disabled: false,
		step: 'PT1M',
		max: '23:59:59',
	},
};
