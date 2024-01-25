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
		type: {
			options: ['text', 'number', 'password'],
			description: 'Le type password ajoute automatiquement un bouton pour afficher la valeur du champ.',
			control: {
				type: 'select',
			},
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
		size: 'M',
		label: 'Label',
		tooltip: "Tooltip message",
		hiddenLabel: false,
		required: true,
		type: 'text',
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
		hasSearchIcon: false,
		searchIcon: 'search',
		prefix: {
			icon: 'dollar',
			ariaLabel: 'Dollar',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
	},
};
