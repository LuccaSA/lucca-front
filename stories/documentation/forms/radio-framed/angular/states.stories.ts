import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface RadioFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Radio Framed/Angular/States',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule, ReactiveFormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {},
	render: (args: RadioFramedBasicStory) => {
		return {
			template: cleanupTemplate(`
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required>
			<lu-radio [value]="1">Option A</lu-radio>
			<lu-radio [value]="2" disabled>Option B</lu-radio>
			<lu-radio [value]="3">Option C</lu-radio>
		</lu-radio-group-input>
	</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
