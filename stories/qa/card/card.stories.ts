import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'card-stories',
	templateUrl: './card.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardStory {}

export default {
	title: 'QA/Card',
	component: CardStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CardStory> = {
	args: {},
	render: template,
};
