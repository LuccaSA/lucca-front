import { MultiSelectFieldComponent, SimpleSelectFieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Forms/Fields/Multi Select/Angular',
	component: SimpleSelectFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [MultiSelectFieldComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<MultiSelectFieldComponent<unknown>> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, inlineMessageState, disabled, tooltip }) => {
		return {
			props: { legumes: allLegumes, example: [] },
			// TODO use generateStoryArgs here once merged
			template: `<lu-multi-select-field label="${label}"
	required="${required}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	${disabled ? 'disabled' : ''}
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	placeholder="${placeholder}"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	tooltip="${tooltip}"
	[(ngModel)]="example">
</lu-multi-select-field>

{{example | json}}`,
			moduleMetadata: {
				imports: [MultiSelectFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		disabled: false,
		clearable: true,
		loading: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: "Je suis un message d'aide",
	},
};
