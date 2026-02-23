import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-decoratives-stories',
	templateUrl: './palettes-decoratives.stories.html',
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
class PalettesDecorativesStory {}

export default {
	title: 'QA/Palettes decoratives',
	component: PalettesDecorativesStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesDecorativesStory> = {
	args: {},
	render: template,
};
