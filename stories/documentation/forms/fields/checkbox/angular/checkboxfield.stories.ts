import { CheckboxfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/Angular',
	component: CheckboxfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [CheckboxfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
	render: (inputs, { argTypes }) => {
		return {
			props: {
				example: false,
			},
			template: cleanupTemplate(`<lu-checkboxfield ${generateInputs(inputs, argTypes)}
	[(ngModel)]="example">
</lu-checkboxfield>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxfieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
} as Meta;

export const Basic: StoryObj<CheckboxfieldComponent> = {
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
