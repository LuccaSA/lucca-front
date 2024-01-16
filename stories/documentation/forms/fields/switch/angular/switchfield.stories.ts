import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	decorators: [
		moduleMetadata({
			imports: [SwitchInputComponent, FormFieldComponent, FormsModule],
		}),
	],
} as Meta;

export const Basic: StoryObj<SwitchInputComponent & FormFieldComponent> = {
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

	<lu-switch-input
	required="${required}"
	[(ngModel)]="example"/>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		tooltip: "Je suis un message d'aide",
	},
};
