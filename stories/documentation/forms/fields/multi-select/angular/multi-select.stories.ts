import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

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
				type: 'radio',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
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

export const Basic: StoryObj<LuMultiSelectInputComponent<unknown> & FormFieldComponent> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, inlineMessageState, disabled, tooltip, clearable }) => {
		return {
			props: { legumes: allLegumes, example: [] },
			template: `
<lu-form-field
	label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	tooltip="${tooltip}"
>
	<lu-multi-select
		${disabled ? 'disabled' : ''}
		${clearable ? 'clearable' : ''}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		placeholder="${placeholder}"
		required="${required}"
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
		size: 'M',
		label: 'Label',
		tooltip: "Tooltip message",
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
