import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<ChipStory> = {
	args: {},
	render: template,
};
