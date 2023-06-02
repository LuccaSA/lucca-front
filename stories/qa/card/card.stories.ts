import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'card-stories',
	templateUrl: './card.stories.html',
}) class CardStory {}

export default {
  title: 'QA/Card',
  component: CardStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CardStory]
		})
	]
} as Meta;

const template: StoryFn<CardStory> = () => ({});

export const basic = template.bind({});
