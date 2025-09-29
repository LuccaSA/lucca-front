import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DurationPickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Duration Picker/Angular Form',
	decorators: [
		moduleMetadata({
			imports: [DurationPickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
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
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
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
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
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
