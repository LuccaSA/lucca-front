import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'input-card-stories',
	templateUrl: './input-card.stories.html',
})
class InputCardStory {}

export default {
	title: 'QA/InputCard',
	component: InputCardStory,
} as Meta;

const template: StoryFn<InputCardStory> = () => ({});

export const basic = template.bind({});
