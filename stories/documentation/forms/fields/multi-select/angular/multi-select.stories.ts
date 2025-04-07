import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { generateInputs } from '../../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Multi Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuMultiSelectInputComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
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
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<LuMultiSelectInputComponent<unknown> & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
			props: { legumes: allLegumes, example: [] },
			template: `<lu-form-field ${generateInputs(
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
	<lu-multi-select ${generateInputs(inputArgs, argTypes)}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[(ngModel)]="example">
	</lu-multi-select>
</lu-form-field>

{{example | json}}`,
			moduleMetadata: {
				imports: [LuMultiSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: false,
		placeholder: 'Placeholder',
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		loading: false,
	},
};
