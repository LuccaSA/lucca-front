import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'fieldset-stories',
	templateUrl: './fieldset.stories.html',
	imports: [FieldsetComponent, FormFieldComponent, TextInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class fieldsetStory {}

export default {
	title: 'QA/fieldset',
	component: fieldsetStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<fieldsetStory> = {
	args: {},
	render: template,
};
