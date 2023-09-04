import { Meta, StoryObj } from "@storybook/angular";
import { Component } from "@angular/core";
import { FormFieldLabelComponent, FormFieldMessageComponent } from "@lucca-front/ng/form-field-elements";

/**
 * Demo component for now, will make it standalone later
 */
@Component({
	standalone: true,
	imports: [FormFieldMessageComponent, FormFieldLabelComponent],
	template: `
		<div class="textField">
			<input type="text" placeholder="demo input" id="test-input" class="textField-input"/>
			<label for="test-input" lu-form-field-label required help>Label demo</label>
			<lu-form-field-message message="Helper message" state="success"></lu-form-field-message>
		</div>
	`,
})
class TextFieldComponent {}

export default {
	title: 'Documentation/Forms/Textfield/Wrapper',
	component: TextFieldComponent,
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		required: {
			control: {
				type: 'boolean',
			},
		},
		invalid: {
			control: {
				type: 'boolean',
			},
		},
		help: {
			control: {
				type: 'boolean',
			},
		},
		clear: {
			control: {
				type: 'boolean',
			},
		},
		id: {
			control: {
				type: 'text',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
		message: {
			control: {
				type: 'text',
			},
		},
		messageState: {
			options: ['', 'error', 'warning', 'success'],
			control: {
				type: 'select',
			},
		},
	}
} as Meta;

export const Template: StoryObj<TextFieldComponent> = {};
