import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: ['.grid-demo { background: #eee; border-radius: 3px; min-height: 2.7rem; padding: .6rem var(--spacings-S);} .grid + .grid { margin-top: var(--spacings-S) }'],
})
class GridStory {}

export default {
	title: 'QA/Grid',
	component: GridStory,
	decorators: [
		moduleMetadata({
			entryComponents: [GridStory],
		}),
	],
} as Meta;

const template: Story<GridStory> = () => ({});

export const basic = template.bind({});
