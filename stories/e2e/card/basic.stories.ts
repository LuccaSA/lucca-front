import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/structure/card2/angular/basic.stories';
import { expect, fn, userEvent, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Card',
	tags: ['!autodocs'],
};

const InteractiveContent = { ...Basic, args: { ...Basic.args, content: '<a href="#content" class="link">Card content</a>' } };
const Disabled = { ...Basic, args: { ...Basic.args, disabled: true } };
const Wrapper = { ...Basic, args: { ...Basic.args, wrapper: true, cards: 3, wrapperAction: true } };
const Grid = { ...Basic, args: { ...Basic.args, wrapper: true, grid: true, cards: 4, heading: 'A longer card title that wraps on two lines in a grid column' } };

// Clicks are recorded without following the link
const spyClicks = (element: HTMLElement) => {
	const spy = fn();
	element.addEventListener('click', (event) => {
		event.preventDefault();
		spy();
	});
	return spy;
};

// The element actually hit by the pointer at a given point of the page, like a real click
const elementAt = (x: number, y: number) => document.elementFromPoint(x, y) as HTMLElement;

const resetFocus = () => (document.activeElement as HTMLElement | null)?.blur();

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const link = canvas.getByRole('link', { name: 'Title' });
	const clicks = spyClicks(link);

	await step('Exposes the title as a heading', async () => {
		await expect(canvas.getByRole('heading', { name: 'Title', level: 3 })).toBeVisible();
	});

	await step('The whole surface of the card triggers the link', async () => {
		const card = canvasElement.querySelector('lu-card')!.getBoundingClientRect();
		const corner = elementAt(card.right - 4, card.bottom - 4);
		await expect(corner).toBe(link);
		await userEvent.click(corner);
		await expect(clicks).toHaveBeenCalledTimes(1);
	});

	await step('Keyboard: Tab focuses the link, Enter activates it', async () => {
		resetFocus();
		await userEvent.tab();
		await expect(link).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await expect(clicks).toHaveBeenCalledTimes(2);
	});
});

export const InteractiveContentTEST = createTestStory(InteractiveContent, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const title = canvas.getByRole('link', { name: 'Title' });
	const contentLink = canvas.getByRole('link', { name: 'Card content' });
	const titleClicks = spyClicks(title);
	const contentClicks = spyClicks(contentLink);

	await step('The content link sits above the action', async () => {
		const box = contentLink.getBoundingClientRect();
		const hit = elementAt(box.left + box.width / 2, box.top + box.height / 2);
		await expect(hit).toBe(contentLink);
		await userEvent.click(hit);
		await expect(contentClicks).toHaveBeenCalledTimes(1);
		await expect(titleClicks).not.toHaveBeenCalled();
	});

	await step('Keyboard: the title comes before the content link', async () => {
		resetFocus();
		await userEvent.tab();
		await expect(title).toHaveFocus();
		await userEvent.tab();
		await expect(contentLink).toHaveFocus();
	});
});

export const DisabledTEST = createTestStory(Disabled, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('The action without href is neither a link nor focusable', async () => {
		await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
		resetFocus();
		await userEvent.tab();
		await expect(canvasElement.contains(document.activeElement)).toBe(false);
	});
});

export const WrapperTEST = createTestStory(Wrapper, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const list = canvas.getByRole('list');
	const button = canvas.getByRole('button', { name: 'Button' });

	await step('Cards are the items of a list, the action stays outside', async () => {
		await expect(within(list).getAllByRole('listitem')).toHaveLength(3);
		await expect(list).not.toContainElement(button);
	});

	await step('Keyboard: the cards come before the action', async () => {
		const links = within(list).getAllByRole('link');
		resetFocus();
		for (const link of links) {
			await userEvent.tab();
			await expect(link).toHaveFocus();
		}
		await userEvent.tab();
		await expect(button).toHaveFocus();
	});
});

export const GridTEST = createTestStory(Grid, async ({ canvasElement, step }) => {
	await waitForAngular();
	// The test viewport is too narrow for several columns
	canvasElement.style.inlineSize = '1000px';

	await step('Cards on the same row have the same height', async () => {
		const cards = [...canvasElement.querySelectorAll('lu-card')].map((card) => card.getBoundingClientRect());
		const firstRow = cards.filter((card) => card.top === cards[0].top);
		await expect(firstRow.length).toBeGreaterThan(1);
		for (const card of firstRow) {
			await expect(card.height).toBe(firstRow[0].height);
		}
	});
});
