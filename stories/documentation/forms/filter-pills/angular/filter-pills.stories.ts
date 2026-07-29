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
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '../../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { waitForAngular } from '../../../../helpers/test';

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

const CLEAR_BTN_NAME = 'Vider ce champ';
const getWrapper = (btn: HTMLElement): HTMLElement => btn.closest('.filterPillWrapper') as HTMLElement;

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Simple select — set and clear via mouse', async () => {
		const pillBtn = canvas.getByRole('button', { name: /Legume \(simple\)/ });
		const wrapper = getWrapper(pillBtn);

		await userEvent.click(pillBtn);
		await waitForAngular();
		// Panel opens automatically when filter pill opens
		await userEvent.click(within(screen.getByRole('listbox')).getAllByRole('option')[0]);
		await waitForAngular();
		// Filter pill auto-closes after simple-select picks a value

		const clearBtn = within(wrapper).getByRole('button', { name: CLEAR_BTN_NAME });
		await expect(clearBtn).toBeVisible();
		await userEvent.click(clearBtn);
		await waitForAngular();
		await expect(clearBtn).not.toBeVisible();
	});

	await step('Simple select — set and clear via keyboard', async () => {
		const pillBtn = canvas.getByRole('button', { name: /Legume \(simple\)/ });
		const wrapper = getWrapper(pillBtn);

		pillBtn.focus();
		await expect(pillBtn).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();

		const clearBtn = within(wrapper).getByRole('button', { name: CLEAR_BTN_NAME });
		await expect(clearBtn).toBeVisible();
		clearBtn.focus();
		await expect(clearBtn).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(clearBtn).not.toBeVisible();
	});

	await step('Multi select — set and clear via mouse', async () => {
		const pillBtn = canvas.getByRole('button', { name: /Légume \(multi\)/ });
		const wrapper = getWrapper(pillBtn);

		await userEvent.click(pillBtn);
		await waitForAngular();
		// Panel opens automatically; skip select-all option if present
		const options = within(screen.getByRole('listbox'))
			.getAllByRole('option')
			.filter((o) => !o.id.includes('select-all'));
		await userEvent.click(options[0]);
		await waitForAngular();
		// Escape closes the select panel, which also closes the filter pill popover
		await userEvent.keyboard('{Escape}');
		await waitForAngular();

		const clearBtn = within(wrapper).getByRole('button', { name: CLEAR_BTN_NAME });
		await expect(clearBtn).toBeVisible();
		await userEvent.click(clearBtn);
		await waitForAngular();
		await expect(clearBtn).not.toBeVisible();
	});

	await step('Date — set and clear via mouse', async () => {
		const pillBtn = canvas.getByRole('button', { name: /Date de début/ });
		const wrapper = getWrapper(pillBtn);

		await userEvent.click(pillBtn);
		await waitForAngular();
		// Calendar renders inline inside the filter pill popover (no second overlay)
		const grid = screen.getByRole('grid');
		const today = new Date();
		const targetDay = today.getDate() === 15 ? 16 : 15;
		const calWrapper = grid.closest('.calendarWrapper') as HTMLElement;
		await userEvent.click(within(calWrapper).getByText(targetDay.toString()));
		await waitForAngular();
		// Filter pill auto-closes after date selection

		const clearBtn = within(wrapper).getByRole('button', { name: CLEAR_BTN_NAME });
		await expect(clearBtn).toBeVisible();
		await userEvent.click(clearBtn);
		await waitForAngular();
		await expect(clearBtn).not.toBeVisible();
	});

	await step('Date range — set and clear via mouse', async () => {
		const pillBtn = canvas.getByRole('button', { name: /Période/ });
		const wrapper = getWrapper(pillBtn);

		await userEvent.click(pillBtn);
		await waitForAngular();
		// Two calendar grids render inline; pick start then end in the first grid
		const today = new Date();
		const startDay = today.getDate() === 10 ? 11 : 10;
		const endDay = today.getDate() === 20 ? 21 : 20;
		const firstGrid = screen.getAllByRole('grid')[0];
		await userEvent.click(within(firstGrid as HTMLElement).getByText(startDay.toString()));
		await waitForAngular();
		await userEvent.click(within(firstGrid as HTMLElement).getByText(endDay.toString()));
		await waitForAngular();
		// Filter pill auto-closes after end date selection

		const clearBtn = within(wrapper).getByRole('button', { name: CLEAR_BTN_NAME });
		await expect(clearBtn).toBeVisible();
		await userEvent.click(clearBtn);
		await waitForAngular();
		await expect(clearBtn).not.toBeVisible();
	});
});
