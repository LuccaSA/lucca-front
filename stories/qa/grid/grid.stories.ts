import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: ['.grid-demo { background: #eee; border-radius: 3px; min-height: 2.7rem; padding: .6rem var(--pr-t-spacings-200);} .grid + .grid { margin-top: var(--pr-t-spacings-200) }'],
})
class GridStory {}

export default {
	title: 'QA/Grid',
	component: GridStory,
} as Meta;

const template: StoryFn<GridStory> = () => ({});

export const basic = template.bind({});
