import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'secondary-nav-compact-stories',
	templateUrl: './secondary-nav-compact.stories.html',
})
class SecondaryNavCompactStory {}

export default {
	title: 'QA/Secondary Nav',
	component: SecondaryNavCompactStory,
} as Meta;

const template: StoryFn<SecondaryNavCompactStory> = () => ({});

export const compact = template.bind({});
