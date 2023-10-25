import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-page-stories',
	styleUrls: ['empty-page.stories.scss'],
	templateUrl: './empty-page.stories.html',
})
class EmptyPageStory {}

export default {
	title: 'QA/Empty Page',
	component: EmptyPageStory,
} as Meta;

const template: StoryFn<EmptyPageStory> = () => ({});

export const basic = template.bind({});
