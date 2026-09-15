import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: [
		`
			.gridDemo {
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-50);
				min-block-size: 1.5rem;
				min-inline-size: 1.5rem;
			}
		`,
	],
	imports: [GridColumnComponent, GridComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
