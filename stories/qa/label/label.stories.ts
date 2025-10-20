import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'label-stories',
	templateUrl: './label.stories.html',
})
class LabelStory {}

export default {
	title: 'QA/Label',
	component: LabelStory,
} as Meta;

const template: StoryFn<LabelStory> = () => ({});

export const basic = template.bind({});
