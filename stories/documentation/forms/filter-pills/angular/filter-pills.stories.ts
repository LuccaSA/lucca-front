import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterPills/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				CheckboxInputComponent,
				FormsModule,
				DateRangeInputComponent,
				DateInputComponent,
				StoryModelDisplayComponent,
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
				LuCoreSelectDepartmentsDirective,
				FilterLegumesPipe,
				FormFieldComponent,
				TextInputComponent,
				FilterLegumesPipe,
				TreeSelectDirective,
				LuMultiSelectWithSelectAllDirective,
				LuCoreSelectTotalCountDirective,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	argTypes: {
		clearable: {
			description: 'Affiche une croix pour réinitialiser le filtre si celui-ci est renseigné.',
		},
		label: {
			description: 'Modifie le label du filtre.',
		},
		filterPillLabelPlural: {
			description: 'Dans le cas d’un multi select, permet de définir le label lorsque plusieurs éléments sont sélectionnés.',
		},
		optional: {
			description:
				'Rend disponible le filtre via le bouton d’ajout de filtre. Celui-ci est désactivé par défaut. Lorsque qu’un filtre est optionnel, celui-ci doit obligatoirement porter un attribut `name`. (Voir Filter bar)',
		},
		name: {
			description: 'Dans le cas d’un filtre optionnel, permet de faire le lien entre la liste de filtres disponible et l’affichage du filtre.',
		},
		disabled: {
			description: 'Désactive le filtre.',
			control: {
				type: 'boolean',
			},
		},
	},
	render: (args, { argTypes }) => {
		const clearableProperty = args['clearable'] ? '' : 'clearable="false" ';
		const disabledPill = args['disabled'] ? 'disabled' : '';
		const label = args['label'];
		const filterPillLabelPlural = args['filterPillLabelPlural'];
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				date: null,
				dateRange: null,
				legumes: allLegumes,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},

			template: `<lu-filter-pill label="Inclure les collaborateurs partis">
	<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
<lu-filter-pill label="${label} (multi)" name="legume">
	<lu-multi-select [ngModel]="[]" ${clearableProperty}[options]="legumes | filterLegumes:clue" [totalCount]="legumes.length" (clueChange)="clue = $event" filterPillLabelPlural="${filterPillLabelPlural}" ${disabledPill} />
</lu-filter-pill>
<lu-filter-pill label="Legume (simple)" name="department">
	<lu-simple-select [ngModel]="null" ${clearableProperty}[options]="legumes | filterLegumes:clue" />
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select [ngModel]="[]" ${clearableProperty}filterPillLabelPlural="départements" departments />
</lu-filter-pill>
<lu-filter-pill label="Tree (simple)">
	<lu-simple-select [ngModel]="null" ${clearableProperty}[treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Tree (multi)">
	<lu-multi-select [ngModel]="[]" ${clearableProperty}filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [ngModel]="null" ${clearableProperty}/>
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input [ngModel]="null" ${clearableProperty}[(ngModel)]="dateRange" />
</lu-filter-pill>`,
			styles: [
				`
	:host {
		display: flex;
		flex-wrap: wrap;
		gap: var(--pr-t-spacings-100);
	}`,
			],
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent & { clearable: boolean; filterPillLabelPlural: string }> = {
	args: {
		clearable: true,
		label: 'Légume',
		filterPillLabelPlural: 'légumes',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	// 1. Wait for Angular to stabilize
	await waitForAngular();

	const canvas = within(canvasElement);
	// On cible la pill portée par un simple-select (aucun appel HTTP requis).
	const getPill = () => canvas.getByRole('button', { name: /Legume \(simple\)/ });
	// Le bouton de réinitialisation est un frère de la pill dans son wrapper : on scope
	// la recherche pour éviter les collisions quand plusieurs pills sont renseignées.
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('État initial : la pill est fermée et sans valeur', async () => {
		const pill = getPill();
		await expect(pill).toBeVisible();
		await expect(pill).toHaveAttribute('aria-expanded', 'false');
		// Aucune valeur sélectionnée → pas de bouton de réinitialisation.
		await expect(queryClearer(pill)).not.toBeInTheDocument();
	});

	await step('Ouverture du popover à la souris', async () => {
		await userEvent.click(getPill());
		await waitForAngular();
		await expect(getPill()).toHaveAttribute('aria-expanded', 'true');
		// Le contenu du popover (le select) est rendu dans l'overlay global.
		await expect(screen.getByRole('combobox')).toBeVisible();
	});

	let selectedOptionText = '';
	await step('Sélection d’une option', async () => {
		const combobox = screen.getByRole('combobox');
		await userEvent.click(combobox);
		await waitForAngular();
		const listbox = within(screen.getByRole('listbox'));
		const options = await listbox.findAllByRole('option');
		selectedOptionText = options[0].innerText;
		await userEvent.click(options[0]);
		await waitForAngular();
		// La valeur choisie est reflétée dans la pill et le bouton de réinitialisation apparaît.
		await expect(getPill()).toHaveTextContent(selectedOptionText);
		await expect(getClearer(getPill())).toBeVisible();
	});

	await step('Réinitialisation via le bouton clear', async () => {
		await userEvent.click(getClearer(getPill()));
		await waitForAngular();
		// La valeur est retirée et le bouton de réinitialisation disparaît.
		await expect(getPill()).not.toHaveTextContent(selectedOptionText);
		await expect(queryClearer(getPill())).not.toBeInTheDocument();
	});

	await step('Ouverture et fermeture au clavier', async () => {
		const pill = getPill();
		pill.focus();
		await expect(pill).toHaveFocus();
		// La flèche bas ouvre le popover.
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(getPill()).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('combobox')).toBeVisible();
		// Échap referme le popover.
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(getPill()).toHaveAttribute('aria-expanded', 'false'));
	});

	await step('Coche la checkbox', async () => {
		// La pill checkbox n'ouvre pas de popover : c'est un bouton bascule (aria-pressed).
		const pill = canvas.getByRole('button', { name: /Inclure les collaborateurs partis/ });
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
	});

	await step('Sélectionne plusieurs items dans le multi-select', async () => {
		const pill = canvas.getByRole('button', { name: /Légume \(multi\)/ });
		await userEvent.click(pill);
		await waitForAngular();
		await userEvent.click(screen.getByRole('combobox'));
		await waitForAngular();
		const listbox = within(screen.getByRole('listbox'));
		// On écarte l'option « tout sélectionner » pour ne cliquer que de vraies options.
		const options = (await listbox.findAllByRole('option')).filter((option) => !option.id.includes('select-all'));
		await userEvent.click(options[0]);
		await userEvent.click(options[1]);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		// Une fois renseignée, la pill affiche le label pluriel « légumes » (son nom
		// accessible change) : on réutilise la référence capturée plus haut.
		await expect(pill).toHaveTextContent(/légumes/);
		await expect(getClearer(pill)).toBeVisible();
	});

	await step('Sélectionne une date', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await userEvent.click(pill);
		await waitForAngular();
		const dateInput = screen.getByTestId('lu-date-input');
		await pickDay(dateInput, 15);
		await waitForAngular();
		// Une date choisie → la pill est renseignée et propose une réinitialisation.
		await expect(getClearer(pill)).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});

	await step('Sélectionne une période dans le date range', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(pill);
		await waitForAngular();
		const startInput = screen.getByLabelText('Start');
		const endInput = screen.getByLabelText('End');
		// `multipleGrid` : le date range affiche deux calendriers côte à côte.
		await pickDay(startInput, 10, true);
		await pickDay(endInput, 20, true);
		await waitForAngular();
		await expect(getClearer(pill)).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});
