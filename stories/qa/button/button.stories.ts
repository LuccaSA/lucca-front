import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'button-stories',
	templateUrl: './button.stories.html',
	styles: ['.button::after { animation-play-state: paused; }'],
})
class ButtonStory {}

export default {
	title: 'QA/Button',
	component: ButtonStory,
} as Meta;

const template: StoryFn<ButtonStory> = () => ({});

export const basic = template.bind({});
