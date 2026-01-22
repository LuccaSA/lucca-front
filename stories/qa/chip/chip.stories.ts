import { Component } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
	imports: [ChipComponent, IconComponent],
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
