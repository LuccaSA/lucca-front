import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<ChipStory> = () => ({});

export const basic = template.bind({});