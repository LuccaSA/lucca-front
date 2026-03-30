import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { stateArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'signal-form-field-stories',
	templateUrl: './signal-form-field.stories.html',
	imports: [FormFieldComponent, InputDirective, TextInputComponent, FormField, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SignalFormFieldStory {
	stateOptions = stateArgType.options;
	widthOptions = ['20', '30', '40', '50', '60'];

	value = signal('Test');
	form = form(this.value);
	compatForm = new FormControl('Test');
}

export default {
	title: 'QA/SignalFormField',
	component: SignalFormFieldStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SignalFormFieldStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SignalFormFieldStory> = {
	args: {},
	render: template,
};
