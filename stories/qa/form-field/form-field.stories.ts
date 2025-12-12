import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { stateArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'form-field-stories',
	templateUrl: './form-field.stories.html',
	imports: [FormFieldComponent, InputDirective, TextInputComponent, FormsModule],
})
class FormFieldStory {
	stateOptions = stateArgType.options;
	widthOptions = ['20', '30', '40', '50', '60'];
}

export default {
	title: 'QA/FormField',
	component: FormFieldStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FormFieldStory],
		}),
	],
} as Meta;

const template: StoryFn<FormFieldStory> = () => ({});

export const basic = template.bind({});
