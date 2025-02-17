import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateInputs } from '../../../helpers/stories';
import { interval, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

export default {
	title: 'Documentation/Forms/Fields/[Test] Form Field Async Loading',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AsyncPipe],
		}),
	],
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		return {
			props: {
				form: new FormGroup({
					example: new FormControl(null, [Validators.required]),
				}),
				timer$: interval(2000).pipe(
					map(() => true),
					startWith(false),
				),
			},
			template: `
@if(timer$ | async){

<form [formGroup]="form">
	<lu-form-field ${generateInputs(fieldArgs, argTypes)}>
		<div class="textField">
			<div class="textField-input">
				<textarea
					type="text"
					luInput
					class="textField-input-value"
					formControlName="example"
					placeholder="Placeholder">
				</textarea>
			</div>
		</div>
	</lu-form-field>
</form>
} @else {
Loading...
}`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent & { required: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		errorInlineMessage: 'Error helper text',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
	},
};
