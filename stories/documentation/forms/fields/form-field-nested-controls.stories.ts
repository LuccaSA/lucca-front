import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/Form Field/Nested Controls',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [
				FormFieldComponent,
				InputDirective,
				BrowserAnimationsModule,
				FormsModule,
				ReactiveFormsModule,
				RadioGroupInputComponent,
				RadioComponent,
				TextInputComponent,
				JsonPipe,
				StoryModelDisplayComponent,
			],
		}),
	],
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		return {
			props: {
				form: new FormGroup({
					foo: new FormControl(0),
					bar: new FormControl('', [Validators.required]),
				}),
			},
			template: `
			<form [formGroup]="form">
				<lu-form-field label="Level 1">
					<lu-radio-group-input formControlName="foo">
						<lu-radio [value]="0">
							Pas Coucou
						</lu-radio>
						<lu-radio [value]="1">
							Coucou
							@if(form.value.foo === 1) {
								<lu-form-field label="Level 2">
									<lu-text-input formControlName="bar" />
								</lu-form-field>
							}
						</lu-radio>
					</lu-radio-group-input>
				</lu-form-field>
			</form>
			<pr-story-model-display>{{ form.value | json }}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent & { required: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		errorInlineMessage: 'Error helper text',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
	},
};
