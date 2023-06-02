import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
})
class ChipStory {}

export default {
	title: 'QA/Chip',
	component: ChipStory,
} as Meta;

const template: StoryFn<ChipStory> = () => ({});

export const basic = template.bind({});
