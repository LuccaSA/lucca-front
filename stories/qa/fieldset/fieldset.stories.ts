import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetActionDirective, FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'fieldset-stories',
	templateUrl: './fieldset.stories.html',
	imports: [FieldsetComponent, FieldsetActionDirective, ButtonComponent, FormFieldComponent, TextInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class fieldsetStory {}

export default {
	title: 'QA/Fieldset',
	component: fieldsetStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<fieldsetStory> = {
	args: {},
	render: template,
};
