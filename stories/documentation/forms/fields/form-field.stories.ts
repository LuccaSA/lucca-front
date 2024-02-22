import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

export default {
	title: 'Documentation/Forms/Fields/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule],
		}),
	],
	render: ({ label, required, inlineMessage, hiddenLabel, size, inlineMessageState, tooltip }) => {
		return {
			template: `
<lu-form-field label="${label}" ${hiddenLabel ? 'hiddenLabel' : ''} inlineMessage="${inlineMessage}" inlineMessageState="${inlineMessageState}" tooltip="${tooltip}">
	<div class="textField">
			<div class="textField-input">
				<textarea
					type="text"
					luInput
					class="textField-input-value"
					${required ? 'required' : ''}
					[(ngModel)]="example"
					placeholder="Placeholder">
				</textarea>
			</div>
	</div>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		size: 'M',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story !',
	},
};
