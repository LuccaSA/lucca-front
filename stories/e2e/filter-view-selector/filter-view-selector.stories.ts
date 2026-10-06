import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/filter-view-selector.stories';

export default {
	...meta,
	title: 'E2E/FilterViewSelector',
	tags: ['!autodocs'],
};

const SELECT_VIEW = 'Sélectionner une vue';

const VIEW_NAMES = ['Product manager', 'Product designer', 'Développeur', 'Customer success', 'Sales'];

// The translation uses a non-breaking space before the colon (French typography), which the
// accessible-name matcher does not normalize away.
const optionsButtonName = (viewName: string) => `Options de la vue\u00a0: ${viewName}`;

/**
 * Only the `lu-filter-view-selector` interactions are covered here: trigger label, popover opening
 * (mouse + keyboard), view selection, and the per-view options menu. This is based on the `Basic`
 * story on purpose: its `renameView` / `deleteView` handlers do nothing but log, so no dialog gets
 * in the way of the selector's own behaviour.
 */
export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const getTrigger = () => canvas.getByRole('button', { name: new RegExp(SELECT_VIEW) });
	const getRadios = () => screen.queryAllByRole('radio');
	const openPopover = async () => {
		await userEvent.click(getTrigger());
		await waitForAngular();
	};
	const openOptionsMenu = async (viewName: string) => {
		await userEvent.click(screen.getByRole('button', { name: optionsButtonName(viewName) }));
		await waitForAngular();
	};

	await step('Initial render — the trigger displays the selected view', async () => {
		await expect(getTrigger()).toHaveTextContent(`${SELECT_VIEW} - ${VIEW_NAMES[0]}`);
		await expect(getRadios()).toHaveLength(0);
	});

	await step('Click opens the popover and lists every view', async () => {
		await openPopover();

		const radios = getRadios();
		await expect(radios).toHaveLength(VIEW_NAMES.length);
		for (const [index, name] of VIEW_NAMES.entries()) {
			await expect(radios[index]).toHaveAccessibleName(name);
		}
		// The initially selected view is reflected on its radio.
		await expect(radios[0]).toBeChecked();
	});

	await step('Selecting a view closes the popover and updates the trigger', async () => {
		await userEvent.click(screen.getByRole('radio', { name: VIEW_NAMES[1] }));
		await waitForAngular();

		await expect(getRadios()).toHaveLength(0);
		await expect(getTrigger()).toHaveTextContent(`${SELECT_VIEW} - ${VIEW_NAMES[1]}`);
	});

	await step('ArrowDown on the trigger opens the popover with the new selection checked', async () => {
		const trigger = getTrigger();
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();

		await expect(getRadios()).toHaveLength(VIEW_NAMES.length);
		await expect(screen.getByRole('radio', { name: VIEW_NAMES[1] })).toBeChecked();
	});

	await step('Keyboard selection updates the trigger', async () => {
		const radio = screen.getByRole('radio', { name: VIEW_NAMES[3] });
		radio.focus();
		await expect(radio).toHaveFocus();
		await userEvent.keyboard(' ');
		await waitForAngular();

		await expect(getRadios()).toHaveLength(0);
		await expect(getTrigger()).toHaveTextContent(`${SELECT_VIEW} - ${VIEW_NAMES[3]}`);
	});

	await step('The options menu exposes rename and delete for every view', async () => {
		await openPopover();
		await openOptionsMenu(VIEW_NAMES[1]);

		await expect(screen.getByRole('button', { name: 'Modifier le nom' })).toBeVisible();
		await expect(screen.getByRole('button', { name: 'Supprimer' })).toBeVisible();
	});

	await step('Renaming a view closes the popover without changing the selection', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Modifier le nom' }));
		await waitForAngular();

		await expect(getRadios()).toHaveLength(0);
		await expect(getTrigger()).toHaveTextContent(`${SELECT_VIEW} - ${VIEW_NAMES[3]}`);
	});

	await step('Deleting a view closes the popover without changing the selection', async () => {
		await openPopover();
		await openOptionsMenu(VIEW_NAMES[2]);
		await userEvent.click(screen.getByRole('button', { name: 'Supprimer' }));
		await waitForAngular();

		await expect(getRadios()).toHaveLength(0);
		// The selector only emits: dropping a view is the consumer's job, so the selection stands.
		await expect(getTrigger()).toHaveTextContent(`${SELECT_VIEW} - ${VIEW_NAMES[3]}`);
	});
});
