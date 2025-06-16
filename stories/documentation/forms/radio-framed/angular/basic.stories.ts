import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule],
		}),
	],
	argTypes: {},
	render: (args: InputFramedBasicStory) => {
		return {
			template: cleanupTemplate(`
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<lu-radio value="A" inlineMessage="Lorem ipsum dolor">Option A</lu-radio>
		<lu-radio value="B" inlineMessage="Lorem ipsum dolor">Option B</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
