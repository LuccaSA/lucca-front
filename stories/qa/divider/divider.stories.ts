import { Component } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
	imports: [DividerComponent],
})
class DividerStory {}

export default {
	title: 'QA/Divider',
	component: DividerStory,
} as Meta;

const template: StoryFn<DividerStory> = () => ({});

export const Basic = template.bind({});
