import { HighlightComponent } from '@lucca-front/ng/highlight-text';
import { Meta, moduleMetadata } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

import { cleanupTemplate, createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, within } from 'storybook/test';

interface HighlightBasicStory {}

export default {
	title: 'Documentation/Texts/Highlight Text/Angular/Basic',
	argTypes: {
		palette: PaletteAllArgType,
	},
	decorators: [
		moduleMetadata({
			imports: [HighlightComponent],
		}),
	],
	render: (args: HighlightBasicStory) => {
		const paletteArg = args['palette'] !== 'product' ? ` palette="${args['palette']}"` : ``;
		return {
			template: cleanupTemplate(`<h1>Lorem <lu-highlight-text${paletteArg}>ipsum</lu-highlight-text> dolor</h1>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		palette: 'product',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie que le texte mis en évidence est affiché', async () => {
		const highlighted = canvas.getByText('ipsum');
		await expect(highlighted).toBeVisible();
	});

	await step('Vérifie que le texte entourant le highlight est présent', async () => {
		const heading = canvas.getByRole('heading', { level: 1 });
		await expect(heading).toBeVisible();
		await expect(heading).toHaveTextContent('Lorem ipsum dolor');
	});
});
