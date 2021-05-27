import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<SectionStory> = () => ({});

export const basic = template.bind({});
