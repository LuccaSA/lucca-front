import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-checkboxes-stories',
	templateUrl: './checkboxes.stories.html',
})
class CheckboxesStory {}

export default {
	title: 'QA/Forms/Checkboxes',
	component: CheckboxesStory,
} as Meta;

const template: StoryFn<CheckboxesStory> = () => ({});

export const basic = template.bind({});
