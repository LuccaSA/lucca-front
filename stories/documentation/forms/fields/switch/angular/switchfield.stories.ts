import { CheckboxfieldComponent, SwitchfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	component: SwitchfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [SwitchfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
	render: (inputs, { argTypes }) => {
		return {
			props: {
				example: false,
			},
			template: cleanupTemplate(`<lu-switchfield ${generateInputs(inputs, argTypes)}
	[(ngModel)]="example">
</lu-switchfield>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxfieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
} as Meta;

export const Basic: StoryObj<SwitchfieldComponent> = {
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
