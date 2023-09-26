import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Forms/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule],
		}),
	],
	render: ({ label, required, inlineMessage, hiddenLabel, size, invalid, inlineMessageState, tooltip }) => {
		return {
			template: `<lu-form-field label="${label}" ${required ? 'required' : ''} ${invalid ? 'invalid' : ''}  ${
				hiddenLabel ? 'hiddenLabel' : ''
			} inlineMessage="${inlineMessage}" inlineMessageState="${inlineMessageState}" size="${size}" tooltip="${tooltip}">
		<input luInput type="text" placeholder="Placeholder"/>
</lu-form-field>

<lu-form-field label="${label}" ${required ? 'required' : ''}  ${
				hiddenLabel ? 'hiddenLabel' : ''
			} inlineMessage="${inlineMessage}" inlineMessageState="${inlineMessageState}" mode="checkbox" tooltip="${tooltip}">
		<input type="checkbox" class="checkboxField-input" luInput/>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		invalid: false,
		inlineMessage: 'Helper Text',
		size: 'M',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story !',
	},
};
