import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'section-stories',
	templateUrl: './section.stories.html',
}) class SectionStory {}

export default {
  title: 'QA/Section',
  component: SectionStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SectionStory]
		})
	]
} as Meta;

const template: StoryFn<SectionStory> = () => ({});

export const basic = template.bind({});
