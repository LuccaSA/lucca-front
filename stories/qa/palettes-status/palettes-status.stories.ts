import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-status-stories',
	templateUrl: './palettes-status.stories.html',
	imports: [],
	styles: [
		`
			.demo-QAtable {
				width: 100%;
				table-layout: fixed;

				.palette {
					block-size: 1lh;
					background-color: var(--backgroundColor);
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PalettesStatusStory {}

export default {
	title: 'QA/Palettes status',
	component: PalettesStatusStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesStatusStory> = {
	args: {},
	render: template,
};
