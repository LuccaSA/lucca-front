import { Component } from '@angular/core';
import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'box-stories',
	templateUrl: './box.stories.html',
	imports: [BoxComponent],
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
} as Meta;

const template: StoryFn<BoxStory> = () => ({});

export const Basic = template.bind({});
