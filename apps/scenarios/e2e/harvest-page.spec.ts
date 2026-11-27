import type { Page } from '@playwright/test';
import { expect, expectNoAxeViolations, mainLayoutBannerFalsePositive, test } from './fixtures';

// Harvest 1 of the fictional data set
const harvestName = 'Fève ancienne, Mirabelle ancienne';

const pageHeading = (page: Page) => page.getByRole('heading', { level: 1, name: harvestName });
const editDialog = (page: Page) => page.getByRole('dialog', { name: 'Modifier la récolte' });

test('A harvest of the planning opens on its own page', async ({ page }) => {
	await page.goto('/harvests');

	await test.step('The link of a harvest leads to its page, titled after it', async () => {
		await page.getByRole('row').nth(1).getByRole('link').click();
		await expect(page).toHaveURL('/harvests/1');
		await expect(page).toHaveTitle(harvestName);
		await expect(pageHeading(page)).toBeVisible();
		await expectNoAxeViolations(page, { knownViolations: [mainLayoutBannerFalsePositive] });
	});

	await test.step('The browser goes back to the planning', async () => {
		await page.goBack();
		await expect(page).toHaveURL('/harvests');
		await expect(page).toHaveTitle('Planning des récoltes');
		await expect(page.getByRole('row')).toHaveCount(41);
	});

	await test.step('The back button of the page header leads back to the planning too', async () => {
		await page.goForward();
		await page.getByRole('link', { name: 'Retour au planning des récoltes' }).click();
		await expect(page).toHaveURL('/harvests');
	});
});

test('An unknown harvest leads back to the planning', async ({ page }) => {
	await page.goto('/harvests/999');
	await expect(page).toHaveURL('/harvests');
});

test.describe('The edit dialog of a harvest page is a route', () => {
	test('The browser history opens and closes it', async ({ page }) => {
		const dialog = editDialog(page);
		const quantity = dialog.getByRole('spinbutton', { name: /Quantité estimée/ });
		await page.goto('/harvests/1');

		await test.step('The edit button opens the dialog at its own URL', async () => {
			await page.getByRole('link', { name: 'Modifier', exact: true }).click();
			await expect(page).toHaveURL('/harvests/1/edit');
			await expect(quantity).toHaveValue('145');
		});

		await test.step('Back closes it, forward opens it again', async () => {
			await page.goBack();
			await expect(dialog).toHaveCount(0);
			await expect(page).toHaveURL('/harvests/1');
			await page.goForward();
			await expect(dialog).toBeVisible();
			await expect(page).toHaveURL('/harvests/1/edit');
		});

		await test.step('Saving updates the harvest page and leaves the dialog URL', async () => {
			await quantity.fill('160');
			await dialog.getByRole('button', { name: 'Enregistrer' }).click();
			await expect(dialog).toHaveCount(0);
			await expect(page).toHaveURL('/harvests/1');
			await expect(page.getByText('160 kg')).toBeVisible();
		});
	});

	test('A link to the dialog opens it over the harvest page', async ({ page }) => {
		await page.goto('/harvests/1/edit');
		await expect(editDialog(page)).toBeVisible();
		await expect(page).toHaveTitle(harvestName);

		await page.keyboard.press('Escape');
		await expect(editDialog(page)).toHaveCount(0);
		await expect(page).toHaveURL('/harvests/1');
		await expect(pageHeading(page)).toBeVisible();
	});

	test('Leaving with unsaved changes asks for a confirmation, through the browser history too', async ({ page }) => {
		const dialog = editDialog(page);
		const comment = dialog.getByRole('textbox', { name: 'Commentaire' });
		const confirmation = page.getByRole('alertdialog', { name: 'Quitter sans enregistrer ?' });
		// From the planning, so that one back too many lands somewhere visible
		await page.goto('/harvests');
		await page.getByRole('row').nth(1).getByRole('link').click();
		await page.getByRole('link', { name: 'Modifier', exact: true }).click();
		await comment.fill('Récolte du soir');

		await test.step('Back asks for a confirmation before closing the dialog', async () => {
			await page.goBack();
			await expect(confirmation).toBeVisible();
			await expect(dialog).toBeVisible();
		});

		await test.step('Going back to the form keeps what was typed and the dialog URL', async () => {
			await page.getByRole('button', { name: 'Reprendre les modifications' }).click();
			await expect(confirmation).toHaveCount(0);
			await expect(page).toHaveURL('/harvests/1/edit');
			await expect(comment).toHaveValue('Récolte du soir');
		});

		await test.step('Back again then discarding lands on the harvest page, not on the planning', async () => {
			// With the default `canceledNavigationResolution`, the cancelled back rewrote the history entry of the
			// harvest page, and this back would skip it
			await page.goBack();
			await expect(page).toHaveURL('/harvests/1');
			await page.getByRole('button', { name: 'Quitter sans enregistrer', exact: true }).click();
			await expect(dialog).toHaveCount(0);
			await expect(page).toHaveURL('/harvests/1');
			await expect(pageHeading(page)).toBeVisible();
			await expect(page.getByText('Récolte du soir')).toHaveCount(0);
		});
	});
});
