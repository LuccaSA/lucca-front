import { Component } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<ChipStory> = () => ({});

export const Basic = template.bind({});
