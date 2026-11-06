import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/listbox-option/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/ListboxOption/Basic',
	tags: ['!autodocs'],
};

const getOptionByText = (canvasElement: HTMLElement, text: string) => within(canvasElement).getByText(text).closest('lu-listbox-option');

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The listbox is single selection and not busy', async () => {
		await expect(listbox).not.toHaveAttribute('aria-multiselectable');
		await expect(listbox).toHaveAttribute('aria-busy', 'false');
		await expect(listbox).not.toHaveAttribute('aria-describedby');
		await expect(within(listbox).getAllByRole('option')).toHaveLength(6);
	});

	await step('Checked options are exposed as selected', async () => {
		for (const text of ['option 3', 'option 4', 'option 6']) {
			await expect(getOptionByText(canvasElement, text)).toHaveAttribute('aria-selected', 'true');
		}
		for (const text of ['option 1', 'option 2', 'option 5']) {
			await expect(getOptionByText(canvasElement, text)).toHaveAttribute('aria-selected', 'false');
		}
	});

	await step('Disabled options are exposed as disabled', async () => {
		await expect(getOptionByText(canvasElement, 'option 5')).toHaveAttribute('aria-disabled', 'true');
		await expect(getOptionByText(canvasElement, 'option 6')).toHaveAttribute('aria-disabled', 'true');
		await expect(getOptionByText(canvasElement, 'option 1')).toHaveAttribute('aria-disabled', 'false');
	});

	await step('Hovered options are highlighted', async () => {
		await expect(getOptionByText(canvasElement, 'option 2').querySelector('.listboxOption-content')).toHaveClass('is-hovered');
		await expect(getOptionByText(canvasElement, 'option 1').querySelector('.listboxOption-content')).not.toHaveClass('is-hovered');
	});

	await step('Single selection options have no checkbox', async () => {
		await expect(listbox.querySelector('.checkboxField')).not.toBeInTheDocument();
	});
});

export const MultipleTEST = createTestStory({ ...Basic, name: 'Multiple', args: { ...Basic.args, multiple: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const listbox = within(canvasElement).getByRole('listbox');

	await step('The listbox is multi selection', async () => {
		await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
	});

	await step('Every option has a checkbox hidden from assistive technologies', async () => {
		for (const option of within(listbox).getAllByRole('option')) {
			const checkbox = option.querySelector('.checkboxField');
			await expect(checkbox).toBeInTheDocument();
			await expect(checkbox).toHaveAttribute('aria-hidden', 'true');
		}
	});
});

export const LoadingTEST = createTestStory({ ...Basic, name: 'Loading', args: { ...Basic.args, state: 'loading', withOption: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The listbox is busy', async () => {
		await expect(listbox).toHaveAttribute('aria-busy', 'true');
	});

	await step('The options stay displayed and an inert skeleton is added after them', async () => {
		const skeleton = listbox.querySelector('lu-listbox-option.is-loading');
		await expect(skeleton).toHaveAttribute('inert');
		await expect(listbox.lastElementChild.previousElementSibling).toBe(skeleton);
		await expect(canvas.getByText('option 1')).toBeInTheDocument();
	});

	await step('The status message is available to assistive technologies', async () => {
		await expect(canvas.getByText('Chargement…')).toHaveClass('pr-u-mask');
	});
});

export const EmptyTEST = createTestStory({ ...Basic, name: 'Empty', args: { ...Basic.args, state: 'empty', withOption: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The projected options are not rendered', async () => {
		await expect(canvas.queryByText('option 1')).not.toBeInTheDocument();
	});

	await step('The listbox is described by the empty status message', async () => {
		await expect(listbox).toHaveAccessibleDescription('Aucun résultat pour votre recherche');
		const emptyOption = canvasElement.querySelector(`#${listbox.getAttribute('aria-describedby')}`);
		await expect(emptyOption).toHaveAttribute('aria-hidden', 'true');
	});

	await step('The empty status message is not exposed as an option', async () => {
		await expect(within(listbox).queryAllByRole('option')).toHaveLength(0);
	});
});
