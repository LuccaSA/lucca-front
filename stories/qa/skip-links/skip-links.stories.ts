import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'skip-links-stories',
	templateUrl: './skip-links.stories.html',
})
class SkipLinksStory {}

export default {
	title: 'QA/SkipLinks',
	component: SkipLinksStory,
} as Meta;

const template: StoryFn<SkipLinksStory> = () => ({});

export const basic = template.bind({});
