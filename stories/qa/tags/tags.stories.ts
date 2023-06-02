import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
}) class TagsStory {}

export default {
  title: 'QA/Tags',
  component: TagsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TagsStory]
		})
	]
} as Meta;

const template: StoryFn<TagsStory> = () => ({});

export const basic = template.bind({});
