import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'form-header-stories',
	templateUrl: './form-header.stories.html',
	imports: [FormHeaderComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormHeaderStory {}

export default {
	title: 'QA/FormHeader',
	component: FormHeaderStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FormHeaderStory> = {
	args: {},
	render: template,
};
