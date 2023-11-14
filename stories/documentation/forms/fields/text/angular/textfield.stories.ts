import { TextfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	component: TextfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [TextfieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	render: ({ prefix, suffix, ...inputs }, { argTypes }) => {
		return {
			props: {
				prefix,
				suffix,
			},
			template: cleanupTemplate(`<lu-textfield ${generateInputs(inputs, argTypes)}
	[prefix]="prefix"
	[suffix]="suffix"
	[(ngModel)]="example">
</lu-textfield>

{{example}}`),
			moduleMetadata: {
				imports: [TextfieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	argTypes: {
		tooltip: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj<TextfieldComponent & { disabled: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: true,
		hasSearchIcon: false,
		searchIcon: 'search',
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: "Je suis un message d'aide",
		prefix: {
			icon: 'dollar',
			ariaLabel: 'Dollar',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
	},
};
