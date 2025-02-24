import { AsyncPipe } from '@angular/common';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { delay, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'jenAiMarreDeFaireDesTests',
})
class JenAiMarreDeFaireDesTests implements PipeTransform {
	#ref = inject(FORM_FIELD_INSTANCE);

	transform(value: boolean, valid: AbstractControl, invalid: AbstractControl): AbstractControl {
		setTimeout(() => {
			this.#ref.refreshControls();
		});
		return value ? valid : invalid;
	}
}

export default {
	title: 'Documentation/Forms/Fields/Form Field/Control Switch',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, TextInputComponent, AsyncPipe, JenAiMarreDeFaireDesTests],
		}),
	],
	render: () => {
		const invalidControl = new FormControl('', [Validators.required]);
		invalidControl.markAsTouched();
		return {
			props: {
				invalidControl,
				validControl: new FormControl('Valid'),
				isValidControl$: of(true).pipe(delay(5000), startWith(false)),
			},
			template: `
			<form>
				<lu-form-field label="Houston" inlineMessage="We might have a problem">
					<lu-text-input [formControl]="(isValidControl$ | async | jenAiMarreDeFaireDesTests:validControl:invalidControl)"></lu-text-input>
				</lu-form-field>
			</form>

			<pre>Current control: {{(isValidControl$ | async) === true ? 'validControl' : 'invalidControl'}}</pre>
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
