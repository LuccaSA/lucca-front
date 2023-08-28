import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
})
class DividerStory {}

export default {
	title: 'QA/Divider',
	component: DividerStory,
} as Meta;

const template: StoryFn<DividerStory> = () => ({});

export const basic = template.bind({});
