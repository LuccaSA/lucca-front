import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'filter-bar-stories',
	templateUrl: './filter-bar.stories.html',
})
class FilterBarStory {}

export default {
	title: 'QA/Filter Bar',
	component: FilterBarStory,
} as Meta;

const template: StoryFn<FilterBarStory> = () => ({});

export const basic = template.bind({});
