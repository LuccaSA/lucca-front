import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: [
		`
			.gridDemo {
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-50);
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

const template = () => ({});

export const Basic: StoryObj<GridStory> = {
	args: {},
	render: template,
};
