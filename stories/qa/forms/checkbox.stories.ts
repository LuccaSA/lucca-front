import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-checkbox-stories',
	templateUrl: './checkbox.stories.html',
	imports: [FormsModule, FormFieldComponent, CheckboxInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxStory {}

export default {
	title: 'QA/Forms/Checkbox',
	component: CheckboxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CheckboxStory> = {
	args: {},
	render: template,
};
