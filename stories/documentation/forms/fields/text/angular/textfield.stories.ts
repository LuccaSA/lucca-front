import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj<TextInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, prefix, suffix, inlineMessageState, hasClearer, disabled, tooltip, hasSearchIcon, searchIcon, type }) => {
		return {
			props: {
				prefix,
				suffix,
			},
			template: cleanupTemplate(`
<lu-form-field label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	tooltip="${tooltip}"
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}">

	<lu-text-input
		required="${required}"
		${hasClearer ? 'hasClearer' : ''}
		${hasSearchIcon ? 'hasSearchIcon' : ''}
		${disabled ? 'disabled' : ''}
		[prefix]="prefix"
		[suffix]="suffix"
		searchIcon="${searchIcon}"
		placeholder="${placeholder}"
		type="${type}"
		[(ngModel)]="example">
	</lu-text-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
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
		type: 'text',
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
