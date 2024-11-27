import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'highlighted-header-stories',
	templateUrl: './highlighted-header.stories.html',
})
class HighlightedHeaderStory {}

export default {
	title: 'QA/Highlighted Header',
	component: HighlightedHeaderStory,
} as Meta;

const template: StoryFn<HighlightedHeaderStory> = () => ({});

export const basic = template.bind({});
