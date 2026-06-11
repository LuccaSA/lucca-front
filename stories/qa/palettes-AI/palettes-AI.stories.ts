import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'palettes-AI-stories',
	templateUrl: './palettes-AI.stories.html',
	imports: [],
	styles: [
		`
			.demo-QAtable {
				inline-size: 100%;
				table-layout: fixed;

				.palette {
					block-size: 1lh;
					background-image: var(--backgroundImage);
					background-color: var(--backgroundColor);
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PalettesAIStory {}

export default {
	title: 'QA/Palettes AI',
	component: PalettesAIStory,
	decorators: [],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PalettesAIStory> = {
	args: {},
	render: template,
};
