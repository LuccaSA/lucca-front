import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'card-stories',
	templateUrl: './card.stories.html',
})
class CardStory {}

export default {
	title: 'QA/Card',
	component: CardStory,
} as Meta;

const template: StoryFn<CardStory> = () => ({});

export const Basic = template.bind({});
