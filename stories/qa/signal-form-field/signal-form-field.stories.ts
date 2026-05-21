import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import {
	CheckboxInputComponent,
	NumberFormatInputComponent,
	NumberInputComponent,
	RadioComponent,
	RadioGroupInputComponent,
	SwitchInputComponent,
	TextareaInputComponent,
	TextInputComponent,
} from '@lucca-front/ng/forms';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { stateArgType } from 'stories/helpers/common-arg-types';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

@Component({
	selector: 'signal-form-field-stories',
	templateUrl: './signal-form-field.stories.html',
	imports: [
		FormFieldComponent,
		InputDirective,
		ReactiveFormsModule,
		JsonPipe,
		StoryModelDisplayComponent,
		FormField,
		// Components
		TextInputComponent,
		TextareaInputComponent,
		NumberInputComponent,
		NumberFormatInputComponent,
		SwitchInputComponent,
		CheckboxInputComponent,
		RadioGroupInputComponent,
		RadioComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		FormField,
		// Compat directives
		// TextInputCompatDirective,
		// TextareaInputCompatDirective,
		// NumberInputCompatDirective,
		// NumberFormatInputCompatDirective,
		// SwitchInputCompatDirective,
		// CheckboxInputCompatDirective,
		// RadioGroupInputCompatDirective,
		// SegmentedControlCompatDirective,
	],
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

	compatTextareaForm = new FormControl('Textarea compat');
	compatNumberForm = new FormControl<number | null>(42);
	compatNumberFormatForm = new FormControl<number | null>(1234.56);
	switchForm = form(signal(false), (schemaPath) => {
		required(schemaPath, { message: 'This switch field is required' });
	});
	compatCheckboxForm = new FormControl(false);
	compatRadioForm = new FormControl<string | null>(null);
	compatSegmentedForm = new FormControl<string | null>(null);

	radioOptions = [
		{ value: 'a', label: 'Option A' },
		{ value: 'b', label: 'Option B' },
		{ value: 'c', label: 'Option C' },
	];

	segmentedOptions = [
		{ value: 'x', label: 'X' },
		{ value: 'y', label: 'Y' },
		{ value: 'z', label: 'Z' },
	];
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
