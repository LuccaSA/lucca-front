import { FormsModule } from '@angular/forms';
import { FormFieldComponent, FramedInputComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';

import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedCheckboxStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Checkbox',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, CheckboxInputComponent, FormsModule, FramedInputComponent],
		}),
	],
	argTypes: {},
	render: (args: InputFramedCheckboxStory) => {
		return {
			template: cleanupTemplate(`
<div class="inputFramedWrapper">
	<lu-framed-input>
		<lu-form-field label="Option A" inlineMessage="Lorem ipsum dolor">
			<lu-checkbox-input [ngModel]="false" />
		</lu-form-field>
	</lu-framed-input>
	<lu-framed-input>
		<lu-form-field label="Option B" inlineMessage="Lorem ipsum dolor">
			<lu-checkbox-input [ngModel]="false" />
		</lu-form-field>
	</lu-framed-input>
</div>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
