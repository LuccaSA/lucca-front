import { Component } from '@angular/core';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'filter-bar-deprecated-stories',
	templateUrl: './filter-bar-deprecated.stories.html',
	imports: [LuSimpleSelectInputComponent],
})
class FilterBarDeprecatedStory {}

export default {
	title: 'QA/Filter Bar Deprecated',
	component: FilterBarDeprecatedStory,
} as Meta;

const template: StoryFn<FilterBarDeprecatedStory> = () => ({});

export const basic = template.bind({});
