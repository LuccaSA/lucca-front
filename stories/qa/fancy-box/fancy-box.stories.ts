import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'fancy-box-stories',
	templateUrl: './fancy-box.stories.html',
})
class FancyBoxStory {}

export default {
	title: 'QA/Fancy box',
	component: FancyBoxStory,
} as Meta;

const template: StoryFn<FancyBoxStory> = () => ({});

export const basic = template.bind({});
