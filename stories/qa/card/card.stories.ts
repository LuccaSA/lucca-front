import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<CardStory> = () => ({});

export const basic = template.bind({});