import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedTagStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Tag',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule],
		}),
	],
	argTypes: {},
	render: (args: InputFramedTagStory) => {
		return {
			template: cleanupTemplate(`
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<lu-radio value="A" tag="Tag">
			Option A
		</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
