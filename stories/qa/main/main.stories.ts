import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'main-stories',
	templateUrl: './main.stories.html',
})
class MainStory {}

export default {
	title: 'QA/Main',
	component: MainStory,
} as Meta;

const template: StoryFn<MainStory> = () => ({});

export const basic = template.bind({});
