import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

@Component({
	standalone: true,
	selector: 'filter-bar-stories',
	templateUrl: './filter-bar.stories.html',
	imports: [LuSimpleSelectInputComponent],
})
class FilterBarStory {}

export default {
	title: 'QA/Filter Bar',
	component: FilterBarStory,
} as Meta;

const template: StoryFn<FilterBarStory> = () => ({});

export const basic = template.bind({});
