import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-checkbox-stories',
	templateUrl: './checkbox.stories.html',
	imports: [FormsModule, ReactiveFormsModule, FormFieldComponent, CheckboxInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxStory {
	// Invalid + touched → aria-invalid + error styling
	invalidControl = new FormControl(false, Validators.requiredTrue);
	// Always invalid, to QA the checked + invalid state
	invalidCheckedControl = new FormControl(true, () => ({ custom: true }));

	constructor() {
		this.invalidControl.markAsTouched();
		this.invalidCheckedControl.markAsTouched();
	}
}

export default {
	title: 'QA/Forms/Checkbox',
	component: CheckboxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CheckboxStory> = {
	args: {},
	render: template,
};
