import { Component } from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'clear-stories',
	templateUrl: './clear.stories.html',
	imports: [ClearComponent],
})
class ClearStory {}

export default {
	title: 'QA/Clear',
	component: ClearStory,
} as Meta;

const template: StoryFn<ClearStory> = () => ({});

export const basic = template.bind({});
