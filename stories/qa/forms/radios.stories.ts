import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-radios-stories',
	templateUrl: './radios.stories.html',
})
class RadiosStory {}

export default {
	title: 'QA/Forms/Radios',
	component: RadiosStory,
} as Meta;

const template: StoryFn<RadiosStory> = () => ({});

export const basic = template.bind({});
