import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'secondary-nav-stories',
	templateUrl: './secondary-nav.stories.html',
})
class SecondaryNavStory {}

export default {
	title: 'QA/Secondary Nav',
	component: SecondaryNavStory,
} as Meta;

const template: StoryFn<SecondaryNavStory> = () => ({});

export const basic = template.bind({});
