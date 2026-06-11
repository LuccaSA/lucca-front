import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, within } from 'storybook/test';

interface TextFlowBasicStory {}

export default {
	title: 'Documentation/Texts/Text flow/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [TextFlowComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: TextFlowBasicStory): string {
	return `<lu-text-flow>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<p>Paragraph</p>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<ul>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ul>
	<h3>Heading 3</h3>
	<p>Paragraph</p>
	<h4>Heading 4</h4>
	<ol>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ol>
</lu-text-flow>`;
}

const Template = (args: TextFlowBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextFlowBasicStory> = {
	args: {},
	render: Template,
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie que les titres sont affichés', async () => {
		const heading1 = canvas.getByRole('heading', { level: 1 });
		await expect(heading1).toBeVisible();
		await expect(heading1).toHaveTextContent('Heading 1');
	});

	await step('Vérifie que les paragraphes sont affichés', async () => {
		const paragraphs = canvas.getAllByText('Paragraph');
		await expect(paragraphs.length).toBeGreaterThan(0);
		await expect(paragraphs[0]).toBeVisible();
	});

	await step('Vérifie que les éléments de liste sont affichés', async () => {
		const listItems = canvas.getAllByText('List item');
		await expect(listItems.length).toBeGreaterThan(0);
		await expect(listItems[0]).toBeVisible();
	});
});
