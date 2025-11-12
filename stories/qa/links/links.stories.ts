import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'links-stories',
	templateUrl: './links.stories.html',
})
class LinksStory {}

export default {
	title: 'QA/Links',
	component: LinksStory,
} as Meta;

const template: StoryFn<LinksStory> = () => ({});

export const basic = template.bind({});
