import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'radio-framed-stories',
	templateUrl: './radio-framed.stories.html',
})
class radioFramedStory {}

export default {
	title: 'QA/radioFramed',
	component: radioFramedStory,
} as Meta;

const template: StoryFn<radioFramedStory> = () => ({});

export const basic = template.bind({});
