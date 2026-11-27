import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ChipsInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

@Component({
	selector: 'chips-field-stories',
	templateUrl: './chips-field.stories.html',
	imports: [FormFieldComponent, ChipsInputComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChipsFieldStory {
	readonly sizes = ['M', 'S'] as const;
	readonly isEmail = isEmail;
	readonly unkillableValues = ['contact@example.com'];
	readonly values = ['marie.dupont@example.com', 'paul.martin@example', 'contact@example.com'];

	readonly empty = { M: new FormControl<string[]>([]), S: new FormControl<string[]>([]) };
	readonly filled = { M: new FormControl<string[]>(this.values), S: new FormControl<string[]>(this.values) };
	readonly invalid = { M: this.#invalidControl(), S: this.#invalidControl() };
	readonly disabled = { M: new FormControl<string[]>({ value: this.values, disabled: true }), S: new FormControl<string[]>({ value: this.values, disabled: true }) };
	readonly presentation = new FormControl<string[]>(this.values);

	#invalidControl(): FormControl<string[] | null> {
		const control = new FormControl<string[]>([], Validators.required);
		control.markAsTouched();
		return control;
	}
}

export default {
	title: 'QA/ChipsField',
	component: ChipsFieldStory,
	decorators: [moduleMetadata({ entryComponents: [ChipsFieldStory] })],
} as Meta;

export const Basic: StoryObj<ChipsFieldStory> = {
	args: {},
	render: () => ({}),
};
