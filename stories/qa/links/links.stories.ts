import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

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

const template: Story<LinksStory> = () => ({});

export const basic = template.bind({});
