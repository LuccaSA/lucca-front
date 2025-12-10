import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'secondary-nav-stories',
	templateUrl: './secondary-nav.stories.html',
})
class SecondaryNavStory {}

export default {
	title: 'QA/SecondaryNav',
	component: SecondaryNavStory,
} as Meta;

const template: StoryFn<SecondaryNavStory> = () => ({});

export const Basic = template.bind({});
