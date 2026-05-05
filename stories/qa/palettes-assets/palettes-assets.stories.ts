import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-assets-stories',
	templateUrl: './palettes-assets.stories.html',
	imports: [],
	styles: [
		`
			.demo-QAtable {
				width: 100%;
				table-layout: fixed;

				+ & {
					margin-block-start: -1px;
				}

				.palette {
					block-size: 1lh;
					background-color: var(--backgroundColor);
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PalettesAssetsStory {}

export default {
	title: 'QA/Palettes assets',
	component: PalettesAssetsStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesAssetsStory> = {
	args: {},
	render: template,
};
