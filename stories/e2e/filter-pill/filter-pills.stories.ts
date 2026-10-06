import { allLegumes } from '@/stories/forms/select/select.utils';
import { LOCALE_ID } from '@angular/core';
import { applicationConfig } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { findPanelOptions, pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/filter-pills.stories';

export default {
	...meta,
	title: 'E2E/FilterPill/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	// 1. Wait for Angular to stabilize
	await waitForAngular();

	const canvas = within(canvasElement);
	// Targets the pill holding a simple select (no HTTP call needed).
	const getPill = () => canvas.getByRole('button', { name: /Legume \(simple\)/ });
	// The clear button is a sibling of the pill in its wrapper: the query is scoped
	// to avoid collisions when several pills are filled.
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('Initial state: the pill is closed and empty', async () => {
		const pill = getPill();
		await expect(pill).toBeVisible();
		await expect(pill).toHaveAttribute('aria-expanded', 'false');
		// No selected value → no clear button.
		await expect(queryClearer(pill)).not.toBeInTheDocument();
	});

	await step('The popover opens on click', async () => {
		await userEvent.click(getPill());
		await waitForAngular();
		await expect(getPill()).toHaveAttribute('aria-expanded', 'true');
		// Le contenu du popover (le select) est rendu dans l'overlay global.
		await expect(screen.getByRole('combobox')).toBeVisible();
	});

	let selectedOptionText = '';
	await step('Selecting an option', async () => {
		const combobox = screen.getByRole('combobox');
		await userEvent.click(combobox);
		await waitForAngular();
		const listbox = within(screen.getByRole('listbox'));
		const options = await listbox.findAllByRole('option');
		selectedOptionText = options[0].innerText;
		await userEvent.click(options[0]);
		await waitForAngular();
		// The selected value is displayed in the pill and the clear button appears.
		await expect(getPill()).toHaveTextContent(selectedOptionText);
		await expect(getClearer(getPill())).toBeVisible();
	});

	await step('Clearing with the clear button', async () => {
		await userEvent.click(getClearer(getPill()));
		await waitForAngular();
		// The value is removed and the clear button disappears.
		await expect(getPill()).not.toHaveTextContent(selectedOptionText);
		await expect(queryClearer(getPill())).not.toBeInTheDocument();
	});

	await step('Opening and closing with the keyboard', async () => {
		const pill = getPill();
		pill.focus();
		await expect(pill).toHaveFocus();
		// ArrowDown opens the popover.
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(getPill()).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('combobox')).toBeVisible();
		// Échap referme le popover.
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(getPill()).toHaveAttribute('aria-expanded', 'false'));
	});

	await step('Checking the checkbox', async () => {
		// La pill checkbox n'ouvre pas de popover : c'est un bouton bascule (aria-pressed).
		const pill = canvas.getByRole('button', { name: /Inclure les collaborateurs partis/ });
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
	});

	await step('Selecting several items in the multi select', async () => {
		const pill = canvas.getByRole('button', { name: /Légume \(multi\)/ });
		await userEvent.click(pill);
		await waitForAngular();
		await userEvent.click(screen.getByRole('combobox'));
		await waitForAngular();
		const listbox = within(screen.getByRole('listbox'));
		// Skips the “select all” option, to only click actual options.
		const options = (await listbox.findAllByRole('option')).filter((option) => !option.id.includes('select-all'));
		await userEvent.click(options[0]);
		await userEvent.click(options[1]);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		// Once filled, the pill displays the “légumes” plural label (its accessible
		// name changes): the reference captured above is reused.
		await expect(pill).toHaveTextContent(/légumes/);
		await expect(getClearer(pill)).toBeVisible();
	});

	await step('Picking a date', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await userEvent.click(pill);
		await waitForAngular();
		const dateInput = screen.getByTestId('lu-date-input');
		await pickDay(dateInput, 15);
		await waitForAngular();
		// A picked date → the pill is filled and offers to clear it.
		await expect(getClearer(pill)).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});

	await step('Picking a period in the date range', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(pill);
		await waitForAngular();
		const startInput = screen.getByLabelText('Start');
		const endInput = screen.getByLabelText('End');
		// `multipleGrid`: the date range displays two calendars side by side.
		await pickDay(startInput, 10, true);
		await pickDay(endInput, 20, true);
		await waitForAngular();
		await expect(getClearer(pill)).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});

const colonSpacingPlay =
	(expectedFilledLabel: string): Parameters<typeof createTestStory>[1] =>
	async ({ canvasElement, step }) => {
		// 1. Wait for Angular to stabilize
		await waitForAngular();

		const canvas = within(canvasElement);
		const getPill = () => canvas.getByRole('button', { name: /Legume \(simple\)/ });
		// Reads the raw textContent (without jest-dom normalization) to tell
		// the U+00A0 non-breaking space apart from a regular space or no space at all.
		const labelOf = (pill: HTMLElement) => pill.querySelector('.filterPill-label')?.textContent?.trim() ?? '';

		await step('Initial state: no colon while the pill is empty', async () => {
			await expect(labelOf(getPill())).toBe('Legume (simple)');
		});

		await step('Selecting an option', async () => {
			await userEvent.click(getPill());
			await waitForAngular();
			await userEvent.click(screen.getByRole('combobox'));
			await waitForAngular();
			const listbox = within(screen.getByRole('listbox'));
			const options = await listbox.findAllByRole('option');
			await userEvent.click(options[0]);
			await waitForAngular();
		});

		await step('The label displays the colon expected for the locale', async () => {
			await expect(labelOf(getPill())).toBe(expectedFilledLabel);
		});
	};

export const ColonSpacingTEST = createTestStory(Basic, colonSpacingPlay('Legume (simple) :'));

export const ColonSpacingEnglishTEST = {
	...createTestStory(Basic, colonSpacingPlay('Legume (simple):')),
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
};

export const KeyboardTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getPill = () => canvas.getByRole('button', { name: /Legume \(simple\)/ });
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('ArrowUp opens the popover and moves the focus into it', async () => {
		getPill().focus();
		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expect(getPill()).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('combobox')).toHaveFocus();
	});

	let selectedOptionText = '';
	await step('Selecting an option with the keyboard fills the pill', async () => {
		const options = await within(screen.getByRole('listbox')).findAllByRole('option');
		selectedOptionText = options[0].innerText;
		// The first option is highlighted when the panel opens
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(getPill()).toHaveTextContent(selectedOptionText);
	});

	await step('Escape closes the popover and gives the focus back to the pill', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(getPill()).toHaveAttribute('aria-expanded', 'false'));
		await expect(getPill()).toHaveFocus();
	});

	await step('Clearing with the keyboard empties the pill and gives the focus back to it', async () => {
		getClearer(getPill()).focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(getPill()).not.toHaveTextContent(selectedOptionText);
		await expect(queryClearer(getPill())).not.toBeInTheDocument();
		await expect(getPill()).toHaveFocus();
	});

	await step('Space toggles the checkbox pill', async () => {
		const pill = canvas.getByRole('button', { name: /Inclure les collaborateurs partis/ });
		pill.focus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
	});

	await step('An option of the multi-select can be selected with the keyboard', async () => {
		const pill = canvas.getByRole('button', { name: /Légume \(multi\)/ });
		pill.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('combobox')).toHaveFocus();
		const [firstOption] = await findPanelOptions();
		const firstOptionText = firstOption.innerText;
		// Moving the highlight with a second ArrowDown is not handled in the test environment
		// (see multi-select.stories.ts), so we stick to the option highlighted on opening
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(firstOption).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));
		await expect(pill).toHaveFocus();
		await expect(pill).toHaveTextContent(firstOptionText);
	});
});

export const DisabledTEST = createTestStory({ ...Basic, name: 'Disabled', args: { ...Basic.args, disabled: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Légume \(multi\)/ });

	await step('A disabled pill is disabled and shows no placeholder', async () => {
		await expect(pill).toBeDisabled();
		await expect(pill).not.toHaveTextContent('Aucune valeur sélectionnée');
	});

	await step('A disabled pill does not open its popover', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-expanded', 'false');
		await expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

		pill.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-expanded', 'false');
	});

	await step('The other pills stay enabled', async () => {
		await expect(canvas.getByRole('button', { name: /Legume \(simple\)/ })).toBeEnabled();
	});
});

export const NotClearableTEST = createTestStory({ ...Basic, name: 'Not clearable', args: { ...Basic.args, clearable: false } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Legume \(simple\)/ });

	await step('A filled pill has no clear button when clearable is false', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		const options = await within(screen.getByRole('listbox')).findAllByRole('option');
		const selectedOptionText = options[0].innerText;
		await userEvent.click(options[0]);
		await waitForAngular();
		await expect(pill).toHaveTextContent(selectedOptionText);
		await expect(within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ })).not.toBeInTheDocument();
	});
});

export const CustomizationTEST = createTestStory(
	{
		name: 'Customization',
		render: () => ({
			props: { legumes: allLegumes },
			template: `<lu-filter-pill label="Légume" placeholder="Tous" icon="heart">
	<lu-simple-select [ngModel]="null" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [ngModel]="null" />
</lu-filter-pill>`,
		}),
	},
	async ({ canvasElement, step }) => {
		await waitForAngular();

		const canvas = within(canvasElement);

		await step('The placeholder input replaces the default placeholder', async () => {
			const pill = canvas.getByRole('button', { name: /Légume/ });
			await expect(pill).toHaveTextContent('Tous');
			await expect(pill).not.toHaveTextContent('Aucune valeur sélectionnée');
		});

		await step('The icon input replaces the default icon', async () => {
			const pill = canvas.getByRole('button', { name: /Légume/ });
			await expect(pill.querySelector('.filterPill-toggle .lucca-icon')).toHaveClass('icon-heart');
		});

		await step('The input component provides its own default icon and placeholder', async () => {
			const pill = canvas.getByRole('button', { name: /Date de début/ });
			await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
			await expect(pill.querySelector('.filterPill-toggle .lucca-icon')).not.toHaveClass('icon-arrowChevronBottom');
		});
	},
);
