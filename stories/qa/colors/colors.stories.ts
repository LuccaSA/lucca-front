import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'colors-stories',
	templateUrl: './colors.stories.html',
})
class ColorsStory {}

export default {
	title: 'QA/Colors',
	component: ColorsStory,
} as Meta;

const template: StoryFn<ColorsStory> = () => ({});

export const basic = template.bind({});
