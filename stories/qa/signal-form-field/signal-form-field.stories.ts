import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { TextInputCompatDirective } from '@lucca-front/ng/forms/compat';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { stateArgType } from 'stories/helpers/common-arg-types';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

@Component({
	selector: 'signal-form-field-stories',
	templateUrl: './signal-form-field.stories.html',
	imports: [FormFieldComponent, TextInputCompatDirective, InputDirective, TextInputComponent, FormField, ReactiveFormsModule, JsonPipe, StoryModelDisplayComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SignalFormFieldStory {
	stateOptions = stateArgType.options;
	widthOptions = ['20', '30', '40', '50', '60'];

	value = signal({
		default: 'Test',
		iban: 'FR',
	});
	form = form(this.value);

	compatForm = new FormControl('Test');
	compatFormValue = toSignal(this.compatForm.valueChanges, { initialValue: this.compatForm.value });
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
