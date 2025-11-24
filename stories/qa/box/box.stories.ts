import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'box-stories',
	templateUrl: './box.stories.html',
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
} as Meta;

const template: StoryFn<BoxStory> = () => ({});

export const basic = template.bind({});
