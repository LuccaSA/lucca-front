import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: ['.demo-grid { background: #eee; border-radius: 3px; min-height: 2.7rem; margin-bottom: var(--spacings-S); padding: .6rem var(--spacings-S);}'],
})
class GridStory {}

export default {
	title: 'QA/Grid',
	component: GridStory,
} as Meta;

const template: StoryFn<GridStory> = () => ({});

export const basic = template.bind({});
