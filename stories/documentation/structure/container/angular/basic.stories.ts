import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';
import { CONTAINER_SIZE, ContainerComponent } from '@lucca-front/ng/container';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Container/Angular/Basic',
	argTypes: {
		center: {
			description: 'Centre horizontalement le container.',
			table: { category: 'inputs' },
		},
		overflow: {
			description:
				'Permet au container de s’élargir selon son contenu (<code>min-inline-size: fit-content</code>) au lieu de se réduire à l’espace disponible. Utile pour un contenu plus large que l’écran, comme un tableau.',
			table: { category: 'inputs' },
		},
		max: {
			description: 'Définit la largeur maximale du container.',
			options: setStoryOptions(CONTAINER_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
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
		overflow: false,
	},
};
