import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { generateInputs } from '../../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Simple Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
		size: {
			options: ['M', 'S', 'XS'],
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
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<LuSimpleSelectInputComponent<unknown> & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			props: { legumes: allLegumes },
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
	<lu-simple-select	${generateInputs(inputArgs, argTypes)}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[(ngModel)]="example">
	</lu-simple-select>
</lu-form-field>

{{example | json}}`,
			moduleMetadata: {
				imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		size: 'M',
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: false,
		placeholder: 'Placeholder',
		clearable: true,
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		loading: false,
	},
};
