import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'tokens-stories',
	templateUrl: './tokens.stories.html',
	styles: [
		`
			.demo-surface,
			.demo-surfaceWrapper {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				inline-size: 5rem;
				block-size: 5rem;
				border-radius: var(--pr-t-border-radius-100);
			}

			.demo-surface {
				z-index: 1;
			}

			.demo-surface-under {
				inline-size: 2rem;
				block-size: 2rem;
				position: absolute;
				inset-block-start: -1rem;
				inset-inline-end: -1rem;
				background-color: var(--palettes-neutral-0);
				border-radius: var(--pr-t-border-radius-full);
			}

			.demo-spacing {
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-50);
			}

			.demo-spacing div {
				background-color: var(--pr-t-elevation-surface-raised);
				inline-size: 2.5rem;
				block-size: 2.5rem;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				border-radius: var(--pr-t-border-radius-50);
			}

			.demo-radius {
				display: inline-flex;
				align-items: flex-start;
				gap: 1rem;
			}

			.demo-radius div {
				background-color: var(--pr-t-elevation-surface-sunken);
				inline-size: 4rem;
				block-size: 4rem;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
		`,
	],
})
class TokenStory {}

export default {
	title: 'QA/Token',
	component: TokenStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TokenStory> = {
	args: {},
	render: template,
};
