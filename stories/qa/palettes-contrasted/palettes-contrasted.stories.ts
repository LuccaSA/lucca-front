import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-contrasted-stories',
	templateUrl: './palettes-contrasted.stories.html',
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
class PalettesContrastedStory {}

export default {
	title: 'QA/Palettes contrasted',
	component: PalettesContrastedStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesContrastedStory> = {
	args: {},
	render: template,
};
