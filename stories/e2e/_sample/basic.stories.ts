import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
// Reuse the documentation meta and stories instead of rewriting them: the test always runs what the docs show.
import meta, { Basic } from '@/stories/_sample/angular/basic.stories';
import { StoryContext } from '@storybook/angular-vite';
import { expect, within } from 'storybook/test';

export default {
	...meta,
	// `E2E/<Component>` when the component has a single e2e file, `E2E/<Component>/<Variant>` otherwise.
	title: 'E2E/Sample',
	// No docs page for tests.
	tags: ['!autodocs'],
};

// A configuration only needed by the tests is derived from a documentation story and is not exported:
// every named export of a CSF file becomes a story.
const LongContent = { ...Basic, args: { ...Basic.args, content: 'A much longer sample content' } };

// A scenario shared by several tests is declared once.
const expectContentPlay = async ({ canvasElement, args, step }: StoryContext) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Renders the content', async () => {
		await expect(canvas.getByText(args['content'] as string)).toBeVisible();
	});
};

// Only tests are exported, suffixed with `TEST`.
export const BasicTEST = createTestStory(Basic, expectContentPlay);

export const LongContentTEST = createTestStory(LongContent, async (context) => {
	await expectContentPlay(context);

	await context.step('Keeps the content in a single element', async () => {
		const canvas = within(context.canvasElement);
		await expect(canvas.getAllByText(/sample content/)).toHaveLength(1);
	});
});
