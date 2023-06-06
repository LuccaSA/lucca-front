import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'grid-stories',
	templateUrl: './grid.stories.html',
	styles: ['.gridLegacy-demo { background: #eee; border-radius: 3px; min-height: 2.7rem; margin-bottom: var(--spacings-S); padding: .6rem var(--spacings-S);}'],
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
