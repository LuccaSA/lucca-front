import { TextfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate } from 'stories/helpers/stories';

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

export const Password: StoryObj<TextfieldComponent & { disabled: boolean }> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, prefix, suffix, inlineMessageState, hasClearer, disabled, tooltip, hasSearchIcon, searchIcon, hasTogglePasswordVisibilityIcon, type }) => {
		return {
			props: {
				prefix,
				suffix,
			},
			template: cleanupTemplate(`<lu-textfield label="${label}"
	required="${required}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	${hasClearer ? 'hasClearer' : ''}
	${hasSearchIcon ? 'hasSearchIcon' : ''}
	${hasTogglePasswordVisibilityIcon ? 'hasTogglePasswordVisibilityIcon' : ''}
	${disabled ? 'disabled' : ''}
	[prefix]="prefix"
	[suffix]="suffix"
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	searchIcon="${searchIcon}"
	placeholder="${placeholder}"
	tooltip="${tooltip}"
	type="${type}"
	[(ngModel)]="example">
</lu-textfield>

{{example}}`),
			moduleMetadata: {
				imports: [TextfieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Password',
		required: false,
		hiddenLabel: false,
		hasClearer: false,
		hasSearchIcon: false,
		hasTogglePasswordVisibilityIcon: true,
		type: 'password',
		searchIcon: 'search',
		disabled: false,
		inlineMessage: '',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: '',
		tooltip: '',
		suffix: {
			content: '',
			ariaLabel: '',
		},
	},
};
