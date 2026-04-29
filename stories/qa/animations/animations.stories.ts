import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'animations-stories',
	templateUrl: './animations.stories.html',
	styles: [
		`
			.demo {
				inline-size: 2.5rem;
				block-size: 2.5rem;
				background-color: var(--palettes-neutral-500);
				border-radius: var(--pr-t-border-radius-structure);
				animation-iteration-count: infinite;
			}

			.demo-QAtable-list {
				overflow: hidden;
				margin: -0.5rem;
				padding: 0.5rem;
				justify-content: center;

				&.mod-vertical {
					min-block-size: 10rem;
				}
			}

			tr:not(:hover) .demo {
				animation-play-state: paused;
			}
		`,
	],

	changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimationsStory {}

export default {
	title: 'QA/Animations',
	component: AnimationsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<AnimationsStory> = {
	args: {},
	render: template,
};
