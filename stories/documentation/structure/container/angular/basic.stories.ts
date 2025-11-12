import { ContainerComponent } from '@lucca-front/ng/container';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Container/Angular/Basic',
	argTypes: {
		max: {
			options: [null, 'M', 'L', 'XL', 'XXL', 'XXXL'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ContainerComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { ...inputs } = args;
		return {
			styles: [
				`.fakeContent {
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
	}`,
			],
			template: cleanupTemplate(
				`
<lu-container${generateInputs(inputs, argTypes)}>
	<div class="fakeContent">container</div>
</lu-container>
<lu-container>
	<div class="fakeContent">container</div>
</lu-container>
<lu-container>
	<div class="fakeContent">container</div>
</lu-container>
`,
			),
		};
	},
} as Meta;

export const Basic: StoryObj<ContainerComponent> = {
	args: {
		center: false,
		max: null,
		overflow: false,
	},
};
