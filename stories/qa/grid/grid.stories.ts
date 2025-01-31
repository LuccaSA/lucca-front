import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: [
		`
			.gridDemo {
				background-color: #eee;
				border-radius: 3px;
				min-block-size: 2.7rem;
				padding-block: 0.6rem;
				padding-inline: var(--pr-t-spacings-200);
			}
			.grid + .grid {
				margin-block-start: var(--pr-t-spacings-200);
			}
		`,
	],
})
class GridStory {}

export default {
	title: 'QA/Grid',
	component: GridStory,
} as Meta;

const template: StoryFn<GridStory> = () => ({});

export const basic = template.bind({});
