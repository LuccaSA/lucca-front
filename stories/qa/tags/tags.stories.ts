import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<TagsStory> = () => ({});

export const all = template.bind({});
