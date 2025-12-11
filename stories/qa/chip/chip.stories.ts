import { Component } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
	imports: [ChipComponent],
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
