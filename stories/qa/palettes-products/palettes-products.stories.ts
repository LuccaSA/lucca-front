import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-products-stories',
	templateUrl: './palettes-products.stories.html',
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
class PalettesProductsStory {}

export default {
	title: 'QA/Palettes products',
	component: PalettesProductsStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesProductsStory> = {
	args: {},
	render: template,
};
