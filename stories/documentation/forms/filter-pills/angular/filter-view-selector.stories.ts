import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { configureLuDialog } from '@lucca-front/ng/dialog';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '../../../../helpers/stories';
import { waitForAngular } from '../../../../helpers/test';
import { AdvancedFilterViewStoryComponent, SavedView } from './filter-view-selector-advanced-example.component';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterViewSelector/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterBarComponent,
				FilterPillComponent,
				FilterViewSelectorComponent,
				FilterPillAddonBeforeDirective,
				FilterPillAddonAfterDirective,
				CheckboxInputComponent,
				DateInputComponent,
				DateRangeInputComponent,
				ButtonComponent,
				IconComponent,
				FormsModule,
				AdvancedFilterViewStoryComponent,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideAnimations(), configureLuDialog(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	render: () => {
		const views: SavedView[] = [
			{ id: 1, name: 'Product manager' },
			{ id: 2, name: 'Product designer' },
			{ id: 3, name: 'Développeur' },
			{ id: 4, name: 'Customer success' },
			{ id: 5, name: 'Sales' },
		];
		return {
			props: {
				views,
				// Reference the actual array element so it matches (the selector compares views by reference).
				selectedView: views[0],
				example1: new Date(),
				examplePeriod: null,
				onRename: (view: SavedView) => console.log('rename', view),
				onDelete: (view: SavedView) => console.log('delete', view),
			},
			// The consumer decides when to swap the segmented control for the view selector (5+ views here).
			template: `<lu-filter-bar>
	<lu-filter-view-selector
		*luFilterPillAddonBefore
		[views]="views"
		[(selectedView)]="selectedView"
		(renameView)="onRename($event)"
		(deleteView)="onDelete($event)"
	/>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>
	<ng-container *luFilterPillAddonAfter>
		<button type="submit" size="S" luButton="outlined">Exporter</button>
	</ng-container>
</lu-filter-bar>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterViewSelectorComponent<SavedView>> = {
	args: {},
};

/**
 * Un cas d’usage complet tel qu’un consommateur de la librairie l’intégrerait : une `lu-filter-bar`
 * complète (multi-select, simple-select, cases à cocher, dates…) pilotée par un `lu-filter-view-selector`.
 *
 * Chaque vue enregistrée porte sa propre combinaison de filtres. Sélectionner une vue applique ses
 * valeurs à la barre ; renommer ou supprimer une vue ouvre une dialog d’exemple. Tout se passe dans
 * les interactions Storybook — il n’y a rien à documenter côté template.
 *
 * Le code de ce cas d’usage se trouve dans `filter-view-selector-advanced-example.component.ts`.
 */
export const Advanced: StoryObj<FilterViewSelectorComponent<SavedView>> = {
	parameters: {
		docs: { disable: true },
	},
	render: () => ({
		template: `<sb-advanced-filter-view-story />`,
	}),
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
