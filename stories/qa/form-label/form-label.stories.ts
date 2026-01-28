import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'form-label-stories',
	templateUrl: './form-label.stories.html',
	imports: [FormLabelComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormLabelStory {}

export default {
	title: 'QA/FormLabel',
	component: FormLabelStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FormLabelStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FormLabelStory> = {
	args: {},
	render: template,
};
