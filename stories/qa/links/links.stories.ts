import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'links-stories',
	templateUrl: './links.stories.html',
}) class LinksStory {}

export default {
  title: 'QA/Links',
  component: LinksStory,
	decorators: [
		moduleMetadata({
			entryComponents: [LinksStory]
		})
	]
} as Meta;

const template: StoryFn<LinksStory> = () => ({});

export const basic = template.bind({});
