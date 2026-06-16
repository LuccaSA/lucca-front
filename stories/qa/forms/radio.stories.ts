import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-radio-stories',
	templateUrl: './radio.stories.html',
	imports: [FormsModule, FormFieldComponent, RadioGroupInputComponent, RadioComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RadioStory {
	radioDefault = 'A';
	radioSmall = 'A';
	radioDisabled = 'A';
	radioError = 'A';
}

export default {
	title: 'QA/Forms/Radio',
	component: RadioStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<RadioStory> = {
	args: {},
	render: template,
};
