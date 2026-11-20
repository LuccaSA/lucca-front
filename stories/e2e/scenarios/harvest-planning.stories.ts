import { createScenarioTestStory, expectNoAxeViolations, expectUniqueIds } from '@/helpers/scenarios';
import { sleep, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/scenarios/harvest-planning/harvest-planning.stories';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

export default { ...meta, title: 'E2E/Scenarios/HarvestPlanning', tags: ['scenario', '!autodocs'] };

const getFormDialog = (name: string) => screen.getByRole('dialog', { name });

async function waitForDialogsToClose(): Promise<void> {
	await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
}

/** Opens the select, types a search and picks the option, waiting for it when it comes from the API. */
async function pickOption(combobox: HTMLElement, clue: string, option: string | RegExp): Promise<void> {
	await userEvent.click(combobox);
	await userEvent.type(combobox, clue);
	await userEvent.click(await screen.findByRole('option', { name: option }, { timeout: 3000 }));
	await waitForAngular();
}

export const CreateTEST = createScenarioTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const addButton = canvas.getByRole('button', { name: 'Planifier une récolte' });
	await expect(canvas.getAllByRole('row')).toHaveLength(41);

	await step('Submitting the empty form keeps it open and focuses the first invalid field', async () => {
		await userEvent.click(addButton);
		const dialog = getFormDialog('Planifier une récolte');
		await userEvent.click(within(dialog).getByRole('button', { name: 'Enregistrer' }));
		await waitForAngular();
		const gardener = within(dialog).getByRole('combobox', { name: /Jardinier ou jardinière/ });
		await expect(gardener).toHaveFocus();
		await expect(gardener).toHaveAttribute('aria-invalid', 'true');
		await expect(dialog).toBeVisible();
	});

	await step('The gardener is searched among 500 people, accents ignored', async () => {
		const dialog = getFormDialog('Planifier une récolte');
		const gardener = within(dialog).getByRole('combobox', { name: /Jardinier ou jardinière/ });
		await pickOption(gardener, 'zoe sau', /Sauge Zoé/);
		await expect(gardener).toHaveAccessibleName(expect.stringContaining('Sauge Zoé'));
	});

	await step('A plot and several varieties are picked, Escape only closes the select panel', async () => {
		const dialog = getFormDialog('Planifier une récolte');
		const plot = within(dialog).getByRole('combobox', { name: /Parcelle/ });
		await pickOption(plot, 'serre 3', 'Serre 3');

		const varieties = within(dialog).getByRole('combobox', { name: /Variétés/ });
		// While searching, each option also shows the name of its group: "Tomate ancienne Légumes"
		await pickOption(varieties, 'tomate', /^Tomate ancienne/);
		await userEvent.click(screen.getByRole('option', { name: /^Tomate rayée/ }));
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		await expect(getFormDialog('Planifier une récolte')).toBeVisible();

		// Each select announces its own value (#5434, #5686)
		await expect(plot).toHaveAccessibleName(expect.stringContaining('Serre 3'));
		await expect(plot).not.toHaveAccessibleName(expect.stringContaining('Tomate'));
		await expect(varieties).not.toHaveAccessibleName(expect.stringContaining('Serre 3'));
	});

	await step('The period and the quantity are typed', async () => {
		const dialog = getFormDialog('Planifier une récolte');
		const period = within(dialog).getByRole('group', { name: 'Période de récolte' });
		const [start, end] = within(period).getAllByRole('combobox');
		await userEvent.type(start, '01/07/2026');
		await userEvent.type(end, '15/07/2026');
		// Leave the period without Escape: Escape in the calendar closes the whole dialog (#5661)
		await userEvent.click(within(dialog).getByRole('heading', { name: 'Planifier une récolte' }));
		await userEvent.type(within(dialog).getByRole('spinbutton', { name: /Quantité estimée/ }), '120');
		await waitForAngular();
	});

	await step('The filled form has no accessibility violation and no duplicate id', async () => {
		await expectNoAxeViolations(getFormDialog('Planifier une récolte'), [
			{
				rule: 'aria-allowed-role',
				selector: 'lu-form-field label[role="presentation"]',
				reason: 'lu-form-field turns its label into a presentation one around a fieldset based input (date range), and a label allows no role',
			},
		]);
		await expectUniqueIds();
	});

	await step('Saving adds the harvest on top of the list and gives the focus back', async () => {
		await userEvent.click(within(getFormDialog('Planifier une récolte')).getByRole('button', { name: 'Enregistrer' }));
		await waitForDialogsToClose();
		const rows = canvas.getAllByRole('row');
		await expect(rows).toHaveLength(42);
		const created = within(rows[1]);
		await expect(created.getByRole('cell', { name: /Sauge Zoé/ })).toBeVisible();
		await expect(created.getByRole('cell', { name: 'Serre 3' })).toBeVisible();
		await expect(created.getByRole('cell', { name: 'Tomate ancienne, Tomate rayée' })).toBeVisible();
		await expect(created.getByRole('cell', { name: '120' })).toBeVisible();
		await expect(addButton).toHaveFocus();
	});
});

export const EditFromRowActionTEST = createScenarioTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const actions = canvas.getByRole('button', { name: 'Actions de la récolte 1' });

	await step('The edit action of a row opens the form filled with the harvest', async () => {
		await userEvent.click(actions);
		await userEvent.click(await screen.findByRole('button', { name: 'Modifier' }));
		const dialog = getFormDialog('Modifier la récolte');
		await expect(within(dialog).getByRole('combobox', { name: /Parcelle/ })).toHaveAccessibleName(expect.stringContaining('Carré surélevé 5'));
		await expect(within(dialog).getByRole('spinbutton', { name: /Quantité estimée/ })).toHaveValue(145);
	});

	await step('Escape closes the pristine form and gives the focus back to the row action without its tooltip (#5271)', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForDialogsToClose();
		await expect(actions).toHaveFocus();
		// Leaves time to a tooltip that would open on focus
		await sleep(400);
		await expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	await step('Saving a change updates the row', async () => {
		await userEvent.click(actions);
		await userEvent.click(await screen.findByRole('button', { name: 'Modifier' }));
		const dialog = getFormDialog('Modifier la récolte');
		const quantity = within(dialog).getByRole('spinbutton', { name: /Quantité estimée/ });
		await userEvent.clear(quantity);
		await userEvent.type(quantity, '160');
		await userEvent.click(within(dialog).getByRole('button', { name: 'Enregistrer' }));
		await waitForDialogsToClose();
		await expect(within(canvas.getAllByRole('row')[1]).getByRole('cell', { name: '160' })).toBeVisible();
	});
});

export const UnsavedChangesTEST = createScenarioTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);

	await step('Dismissing a changed form asks for a confirmation in a stacked dialog', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Planifier une récolte' }));
		await userEvent.type(within(getFormDialog('Planifier une récolte')).getByRole('textbox', { name: 'Commentaire' }), 'Récolte du matin');
		await userEvent.keyboard('{Escape}');
		const confirmation = await screen.findByRole('alertdialog', { name: 'Abandonner les modifications ?' });
		await expect(getFormDialog('Planifier une récolte')).toBeInTheDocument();
		await expectNoAxeViolations(confirmation);
	});

	await step('Escape neither dismisses the blocking confirmation nor reaches the form below it', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.getAllByRole('alertdialog')).toHaveLength(1);
		await expect(getFormDialog('Planifier une récolte')).toBeInTheDocument();
	});

	await step('Going back to the form keeps what was typed', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Continuer la saisie' }));
		await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
		const dialog = getFormDialog('Planifier une récolte');
		await expect(within(dialog).getByRole('textbox', { name: 'Commentaire' })).toHaveValue('Récolte du matin');
	});

	await step('Confirming discards the form without adding a harvest', async () => {
		await userEvent.click(within(getFormDialog('Planifier une récolte')).getByRole('button', { name: 'Annuler' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Abandonner' }));
		await waitForDialogsToClose();
		await expect(canvas.getAllByRole('row')).toHaveLength(41);
	});
});

export const DeleteTEST = createScenarioTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);

	await step('The delete action asks for a confirmation through the legacy modal API', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Actions de la récolte 2' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Supprimer' }));
		const confirmation = await screen.findByRole('dialog', { name: 'Supprimer la récolte ?' });
		await expect(confirmation).toHaveTextContent('Potager sud 1');
		await expectNoAxeViolations(confirmation);
	});

	await step('Confirming removes the row', async () => {
		await userEvent.click(within(screen.getByRole('dialog', { name: 'Supprimer la récolte ?' })).getByRole('button', { name: 'Supprimer' }));
		await waitForDialogsToClose();
		await expect(canvas.getAllByRole('row')).toHaveLength(40);
		await expect(canvas.queryByRole('button', { name: 'Actions de la récolte 2' })).not.toBeInTheDocument();
	});
});
