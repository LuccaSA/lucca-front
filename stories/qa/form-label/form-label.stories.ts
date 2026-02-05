import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'form-label-stories',
	templateUrl: './form-label.stories.html',
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
