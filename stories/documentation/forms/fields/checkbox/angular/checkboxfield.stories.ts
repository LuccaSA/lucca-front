import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/Angular',
	decorators: [
		moduleMetadata({
			imports: [CheckboxInputComponent, FormFieldComponent, FormsModule],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
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
	}
} as Meta;

export const Basic: StoryObj<CheckboxInputComponent & FormFieldComponent> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState, tooltip }) => {
		return {
			props: {
				example: false,
			},
			template: cleanupTemplate(`<lu-form-field label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	tooltip="${tooltip}"
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}">
	<lu-checkbox-input
	required="${required}"
	[(ngModel)]="example"/>
</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		size: 'M',
		label: 'Label',
		tooltip: "Tooltip message",
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
	},
};
