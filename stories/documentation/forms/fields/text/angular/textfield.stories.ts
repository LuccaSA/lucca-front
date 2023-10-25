import { TextfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	component: TextfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [TextfieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj<TextfieldComponent & { disabled: boolean }> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, prefix, suffix, inlineMessageState, hasClearer, disabled, tooltip, hasSearchIcon, searchIcon }) => {
		return {
			props: {
				prefix,
				suffix,
			},
			template: `
<lu-textfield label="${label}"
required="${required}"
${hiddenLabel ? 'hiddenLabel' : ''}
${hasClearer ? 'hasClearer' : ''}
${hasSearchIcon ? 'hasSearchIcon' : ''}
${disabled ? 'disabled' : ''}
[prefix]="prefix"
[suffix]="suffix"
inlineMessage="${inlineMessage}"
inlineMessageState="${inlineMessageState}"
size="${size}"
searchIcon="${searchIcon}"
placeholder="${placeholder}"
tooltip="${tooltip}"
[(ngModel)]="example">
</lu-textfield>

{{example}}`,
			moduleMetadata: {
				imports: [TextfieldComponent, FormsModule, BrowserAnimationsModule],
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
