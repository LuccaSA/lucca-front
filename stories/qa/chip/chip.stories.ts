import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
}) class ChipStory {}

export default {
  title: 'QA/Chip',
  component: ChipStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ChipStory]
		})
	]
} as Meta;

const template: StoryFn<ChipStory> = () => ({});

export const basic = template.bind({});
