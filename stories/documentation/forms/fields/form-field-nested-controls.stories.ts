import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

@Component({
	selector: 'form-field-nested-controls-story',
	imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, TextInputComponent, FormField, JsonPipe, StoryModelDisplayComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Level 1">
			<lu-radio-group-input [formField]="form.foo">
				<lu-radio [value]="0">Pas Coucou</lu-radio>
				<lu-radio [value]="1">
					Coucou
					@if (form.foo().value() === 1) {
						<lu-form-field label="Level 2">
							<lu-text-input [formField]="form.bar" />
						</lu-form-field>
					}
				</lu-radio>
			</lu-radio-group-input>
		</lu-form-field>
		<pr-story-model-display>{{ form().value() | json }}</pr-story-model-display>
	`,
})
class FormFieldNestedControlsStory {
	readonly model = signal({ foo: 0, bar: '' });
	readonly form = form(this.model, (p) => {
		required(p.bar);
	});
}

export default {
	title: 'Documentation/Forms/Fields/Form Field/Nested Controls',
	component: FormFieldComponent,
	render: () => ({
		moduleMetadata: { imports: [FormFieldNestedControlsStory, BrowserAnimationsModule] },
		template: `<form-field-nested-controls-story />`,
	}),
} as Meta;

export const Template: StoryObj = {};
