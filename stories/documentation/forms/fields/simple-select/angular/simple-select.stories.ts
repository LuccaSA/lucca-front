import { SimpleSelectFieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';

export default {
	title: 'Documentation/Forms/Fields/Simple Select/Angular',
	component: SimpleSelectFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [SimpleSelectFieldComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj<SimpleSelectFieldComponent<unknown>> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, inlineMessageState, disabled, tooltip }) => {
		return {
			props: { legumes: allLegumes },
			// TODO use generateStoryArgs here once merged
			template: `<lu-simple-select-field label="${label}"
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
</lu-simple-select-field>

{{example | json}}`,
			moduleMetadata: {
				imports: [SimpleSelectFieldComponent, FormsModule, BrowserAnimationsModule],
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
	},
};
