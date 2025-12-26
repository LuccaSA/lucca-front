import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'container-stories',
	templateUrl: './container.stories.html',
	imports: [ContainerComponent],
	styles: [
		`
			.fakeContent {
				background-color: var(--pr-t-elevation-surface-raised);
				border: 1px solid var(--palettes-neutral-50);
				padding: var(--pr-t-spacings-150);
				align-items: center;
				justify-content: center;
				display: flex;
				flex-direction: column;
				color: var(--palettes-brand-700);
				font-family: monospace;
				white-space: nowrap;
				border-radius: var(--pr-t-border-radius-default);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ContainerStory {}

export default {
	title: 'QA/Container',
	component: ContainerStory,
} as Meta;

const template = () => ({});

export const basic: StoryObj<ContainerStory> = {
	args: {},
	render: template,
};
