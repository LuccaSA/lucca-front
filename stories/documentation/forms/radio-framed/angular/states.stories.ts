import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface InputFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/States',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule, ReactiveFormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {},
	render: (args: InputFramedBasicStory) => {
		return {
			props: { example: 'B' },
			template: cleanupTemplate(`
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required>
			<lu-radio [value]="'A'">Option A</lu-radio>
			<lu-radio [value]="'B'">Option B</lu-radio>
			<lu-radio [value]="'C'" disabled>Option C</lu-radio>
			<lu-radio [value]="'D'">Option D</lu-radio>
		</lu-radio-group-input>
	</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
