import type { Locator, Page } from '@playwright/test';
import { expect, expectNoAxeViolations, expectUniqueIds, mainLayoutBannerFalsePositive, test } from './fixtures';

const formDialog = (page: Page, name: string) => page.getByRole('dialog', { name });

/** Opens the select, types a search and picks the option, waiting for it when it comes from the API. */
async function pickOption(page: Page, combobox: Locator, clue: string, option: string | RegExp): Promise<void> {
	await combobox.click();
	await page.keyboard.type(clue);
	await page.getByRole('option', { name: option }).click();
}

test.beforeEach(async ({ page }) => {
	await page.goto('/harvests');
});

test('The planning has no accessibility violation', async ({ page }) => {
	await expect(page.getByRole('row')).toHaveCount(41);
	await expectNoAxeViolations(page, { knownViolations: [mainLayoutBannerFalsePositive] });
});

test('Planning a harvest', async ({ page }) => {
	const addButton = page.getByRole('button', { name: 'Planifier une récolte' });
	const dialog = formDialog(page, 'Planifier une récolte');
	const gardener = dialog.getByRole('combobox', { name: /Jardinier ou jardinière/ });
	const submitButton = dialog.getByRole('button', { name: 'Planifier la récolte' });
	// Callout popover of the dialog footer, named after the errors left to fix
	const errorSummary = dialog.getByRole('button', { name: /^Il vous reste/ });
	await expect(page.getByRole('row')).toHaveCount(41);

	await test.step('Submitting the empty form keeps it open, counts its errors and focuses the first invalid field', async () => {
		await addButton.click();
		await expect(errorSummary).toHaveCount(0);
		await submitButton.click();
		await expect(gardener).toBeFocused();
		await expect(gardener).toHaveAttribute('aria-invalid', 'true');
		await expect(dialog).toBeVisible();
		await expect(errorSummary).toHaveAccessibleName('Il vous reste 5 erreurs à corriger.');
	});

	await test.step('The gardener is searched among 500 people, accents ignored', async () => {
		await pickOption(page, gardener, 'zoe sau', /Sauge Zoé/);
		await expect(gardener).toHaveAccessibleName(/Sauge Zoé/);
		await expect(errorSummary).toHaveAccessibleName('Il vous reste 4 erreurs à corriger.');
	});

	await test.step('A plot and several varieties are picked, Escape only closes the select panel', async () => {
		const plot = dialog.getByRole('combobox', { name: /Parcelle/ });
		await pickOption(page, plot, 'serre 3', 'Serre 3');

		const varieties = dialog.getByRole('combobox', { name: /Variétés/ });
		// While searching, each option also shows the name of its group: "Tomate ancienne Légumes"
		await pickOption(page, varieties, 'tomate', /^Tomate ancienne/);
		await page.getByRole('option', { name: /^Tomate rayée/ }).click();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('listbox')).toHaveCount(0);
		await expect(dialog).toBeVisible();

		// Each select announces its own value (#5434, #5686)
		await expect(plot).toHaveAccessibleName(/Serre 3/);
		await expect(plot).not.toHaveAccessibleName(/Tomate/);
		await expect(varieties).not.toHaveAccessibleName(/Serre 3/);
	});

	await test.step('The period and the quantity are typed', async () => {
		const period = dialog.getByRole('group', { name: 'Période de récolte' });
		await period.getByRole('combobox').first().pressSequentially('01/07/2026');
		await period.getByRole('combobox').last().pressSequentially('15/07/2026');
		// Leave the period without Escape: Escape in the calendar closes the whole dialog (#5661)
		await dialog.getByRole('heading', { name: 'Planifier une récolte' }).click();
		const quantity = dialog.getByRole('spinbutton', { name: /Quantité estimée/ });
		await quantity.fill('0');
		await expect(dialog.getByText('La quantité doit être d’au moins 1 kg.')).toBeVisible();
		await expect(errorSummary).toHaveAccessibleName('Il vous reste 1 erreur à corriger.');
		await quantity.fill('120');
		await expect(errorSummary).toHaveCount(0);
	});

	await test.step('The filled form has no accessibility violation and no duplicate id', async () => {
		await expectNoAxeViolations(page, {
			include: '[role="dialog"]',
			knownViolations: [
				{
					rule: 'aria-allowed-role',
					selector: 'lu-form-field label[role="presentation"]',
					reason: 'lu-form-field turns its label into a presentation one around a fieldset based input (date range), and a label allows no role',
				},
			],
		});
		await expectUniqueIds(page);
	});

	await test.step('Saving adds the harvest on top of the list and gives the focus back', async () => {
		await submitButton.click();
		await expect(page.getByRole('dialog')).toHaveCount(0);
		await expect(page.getByRole('row')).toHaveCount(42);
		const created = page.getByRole('row').nth(1);
		await expect(created.getByRole('cell', { name: /Sauge Zoé/ })).toBeVisible();
		await expect(created.getByRole('cell', { name: 'Serre 3', exact: true })).toBeVisible();
		await expect(created.getByRole('cell', { name: 'Tomate ancienne, Tomate rayée', exact: true })).toBeVisible();
		await expect(created.getByRole('cell', { name: '120', exact: true })).toBeVisible();
		await expect(addButton).toBeFocused();
	});
});

test('Editing a harvest from its row action', async ({ page }) => {
	const actions = page.getByRole('button', { name: 'Actions de la récolte 1', exact: true });
	const dialog = formDialog(page, 'Modifier la récolte');
	const quantity = dialog.getByRole('spinbutton', { name: /Quantité estimée/ });

	await test.step('The edit action of a row opens the form filled with the harvest', async () => {
		await actions.click();
		await page.getByRole('button', { name: 'Modifier', exact: true }).click();
		await expect(dialog.getByRole('combobox', { name: /Parcelle/ })).toHaveAccessibleName(/Carré surélevé 5/);
		await expect(quantity).toHaveValue('145');
	});

	await test.step('Escape closes the pristine form and gives the focus back to the row action without its tooltip (#5271)', async () => {
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toHaveCount(0);
		await expect(actions).toBeFocused();
		// Leaves time to a tooltip that would open on focus
		await page.waitForTimeout(400);
		await expect(page.getByRole('tooltip')).toHaveCount(0);
	});

	await test.step('Saving a change updates the row', async () => {
		await actions.click();
		await page.getByRole('button', { name: 'Modifier', exact: true }).click();
		await quantity.fill('160');
		await dialog.getByRole('button', { name: 'Enregistrer' }).click();
		await expect(page.getByRole('dialog')).toHaveCount(0);
		await expect(page.getByRole('row').nth(1).getByRole('cell', { name: '160', exact: true })).toBeVisible();
	});
});

test('Leaving the form with unsaved changes', async ({ page }) => {
	const dialog = formDialog(page, 'Planifier une récolte');
	const comment = dialog.getByRole('textbox', { name: 'Commentaire' });
	const confirmation = page.getByRole('alertdialog', { name: 'Quitter sans enregistrer ?' });

	await test.step('Dismissing a changed form asks for a confirmation in a stacked dialog', async () => {
		await page.getByRole('button', { name: 'Planifier une récolte' }).click();
		await comment.fill('Récolte du matin');
		await page.keyboard.press('Escape');
		await expect(confirmation).toBeVisible();
		await expect(dialog).toBeVisible();
		await expectNoAxeViolations(page, { include: '[role="alertdialog"]' });
	});

	await test.step('Escape neither dismisses the blocking confirmation nor reaches the form below it', async () => {
		await page.keyboard.press('Escape');
		// Leaves time to a closing animation
		await page.waitForTimeout(300);
		await expect(confirmation).toBeVisible();
		await expect(dialog).toBeVisible();
	});

	await test.step('Going back to the form keeps what was typed', async () => {
		await page.getByRole('button', { name: 'Reprendre les modifications' }).click();
		await expect(confirmation).toHaveCount(0);
		await expect(comment).toHaveValue('Récolte du matin');
	});

	await test.step('Confirming discards the form without adding a harvest', async () => {
		await dialog.getByRole('button', { name: 'Annuler' }).click();
		await page.getByRole('button', { name: 'Quitter sans enregistrer', exact: true }).click();
		await expect(page.getByRole('dialog')).toHaveCount(0);
		await expect(page.getByRole('row')).toHaveCount(41);
	});
});

test('Deleting a harvest', async ({ page }) => {
	const confirmation = page.getByRole('dialog', { name: 'Supprimer la récolte ?' });

	await test.step('The delete action asks for a confirmation through the legacy modal API', async () => {
		await page.getByRole('button', { name: 'Actions de la récolte 2', exact: true }).click();
		await page.getByRole('button', { name: 'Supprimer', exact: true }).click();
		await expect(confirmation).toContainText('Potager sud 1');
		await expectNoAxeViolations(page, { include: '[role="dialog"]' });
	});

	await test.step('Confirming removes the row', async () => {
		await confirmation.getByRole('button', { name: 'Supprimer la récolte' }).click();
		await expect(page.getByRole('dialog')).toHaveCount(0);
		await expect(page.getByRole('row')).toHaveCount(40);
		await expect(page.getByRole('button', { name: 'Actions de la récolte 2', exact: true })).toHaveCount(0);
	});
});
