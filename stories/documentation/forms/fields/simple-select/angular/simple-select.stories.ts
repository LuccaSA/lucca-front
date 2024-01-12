import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

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
	render: ({ label, required, clearable, loading, hiddenLabel, inlineMessage, size, placeholder, inlineMessageState, disabled, tooltip }) => {
		return {
			props: { legumes: allLegumes },
			template: `
<lu-form-field
	label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	tooltip="${tooltip}"
>
	<lu-simple-select
		${loading ? 'loading' : ''}
		${disabled ? 'disabled' : ''}
		${clearable ? 'clearable' : ''}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		placeholder="${placeholder}"
		required="${required}"
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
		label: 'Label',
		required: true,
		hiddenLabel: false,
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: "Je suis un message d'aide",
		clearable: false,
		loading: false,
	},
};
