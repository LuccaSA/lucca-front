import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/legal-unit-establishment-select/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/LegalUnitEstablishmentSelect',
	tags: ['!autodocs'],
};

// Scoped to the tree: a selected option also shows up as a chip in the input.
// The chip of a legal unit carries a leading icon; the masked a11y copy is left out of the query.
function chipIcons(canvasElement: HTMLElement): Element[] {
	return [...canvasElement.querySelectorAll('.multipleSelect-displayer-chip .icon-buildingCompany')];
}

function disclosureOf(row: HTMLElement): HTMLElement {
	return row.querySelector<HTMLElement>('.listboxOption-content-disclosure')!;
}

function rowOf(tree: HTMLElement, name: string): HTMLElement {
	return within(tree).getByText(name).closest('[role="treeitem"]') as HTMLElement;
}

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);

	await userEvent.click(canvas.getByRole('combobox'));
	await waitForAngular();
	const tree = screen.getByRole('tree');
	const panel = within(tree);

	await step('Lists the legal units, and them alone', async () => {
		// The handler is delayed, so wait for the data before counting the rows
		await expect(await panel.findByText('Lucca FR')).toBeVisible();
		await expect(panel.getAllByRole('treeitem')).toHaveLength(3);
		// The establishments are not loaded until a legal unit is unfolded
		await expect(panel.queryByText('Lucca Paris')).toBeNull();
	});

	await step('Unfolds a legal unit and loads its establishments', async () => {
		const legalUnit = rowOf(tree, 'Lucca FR');
		await expect(disclosureOf(legalUnit).getAttribute('aria-expanded')).toBe('false');

		await userEvent.click(disclosureOf(legalUnit));
		await waitForAngular();

		await expect(disclosureOf(rowOf(tree, 'Lucca FR')).getAttribute('aria-expanded')).toBe('true');
		await expect(await panel.findByText('Lucca Paris')).toBeVisible();
	});

	await step('Selecting one establishment leaves its legal unit unchecked', async () => {
		await userEvent.click(await panel.findByText('Lucca Paris'));
		await waitForAngular();

		// A rule was not chosen, so the legal unit box stays empty — never a partial state
		await expect(rowOf(tree, 'Lucca FR').getAttribute('aria-selected')).toBe('false');
		await expect(rowOf(tree, 'Lucca FR').hasAttribute('aria-checked')).toBe(false);
		await expect(rowOf(tree, 'Lucca Paris').getAttribute('aria-selected')).toBe('true');
		const model = canvas.getByTestId('pr-ng-model');
		await expect(model.textContent).toContain('"name": "Lucca Paris"');
		// Published under establishments, and no rule was chosen
		await expect(model.textContent).toContain('"legalUnits": []');
		// An establishment is an element, not a rule: its chip stays plain
		await expect(chipIcons(canvasElement)).toHaveLength(0);
	});

	await step('Selecting the legal unit publishes a rule, not its establishments', async () => {
		// Drop the establishment picked above, so what follows is about the rule alone
		await userEvent.click(panel.getByText('Lucca Paris'));
		await waitForAngular();

		await userEvent.click(panel.getByText('Lucca FR'));
		await waitForAngular();

		const legalUnit = rowOf(tree, 'Lucca FR');
		await expect(legalUnit.hasAttribute('aria-checked')).toBe(false);
		await expect(legalUnit.getAttribute('aria-selected')).toBe('true');

		const model = canvas.getByTestId('pr-ng-model');
		await expect(model.textContent).toContain('"name": "Lucca FR"');
		// The rule covers the establishments it holds, so none of them is published next to it
		await expect(model.textContent).toContain('"establishments": []');
		await expect(chipIcons(canvasElement)).toHaveLength(1);

		// Covered by the rule: checked without being in the value, and still actionable
		const covered = rowOf(tree, 'Lucca Paris');
		await expect(covered.getAttribute('aria-selected')).toBe('true');
		await expect(covered.getAttribute('aria-disabled')).toBe('false');
	});

	await step('Unchecking a covered establishment breaks the rule into the list it stood for', async () => {
		await userEvent.click(panel.getByText('Lucca Paris'));
		await waitForAngular();

		const model = canvas.getByTestId('pr-ng-model');
		// The rule is gone and the establishments it covered take its place, minus the one unchecked
		await expect(model.textContent).toContain('"legalUnits": []');
		await expect(model.textContent).toContain('"name": "Lucca Marseille"');
		await expect(model.textContent).not.toContain('"name": "Lucca Paris"');
		await expect(chipIcons(canvasElement)).toHaveLength(0);
	});
});
