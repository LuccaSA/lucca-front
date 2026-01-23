import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { stateArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'form-field-stories',
	templateUrl: './form-field.stories.html',
	imports: [FormFieldComponent, InputDirective, TextInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

const template = () => ({});

export const Basic: StoryObj<FormFieldStory> = {
	args: {},
	render: template,
};
