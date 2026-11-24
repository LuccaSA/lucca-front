import { ChangeDetectionStrategy, Component, computed, input, signal, WritableSignal } from '@angular/core';
import {
	ApprobationInboxDetailComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import {
	IndexTableActionComponent,
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { Meta, StoryObj } from '@storybook/angular-vite';

/*
 * POC stories of the range selection (PR #5437): one story per case, to try the behaviour with the design team
 * and with the developer who will implement it. Each story lists steps, each with the action to try and the expected result.
 */

interface Row {
	id: number;
	label: string;
	selected: WritableSignal<boolean>;
	disabled: WritableSignal<boolean>;
}

/** A step of a story: the action to try and its expected result, as HTML */
interface Step {
	try: string;
	expected: string;
}

function createRows(count: number, prefix = 'Ligne ', start = 1): Row[] {
	return Array.from({ length: count }, (_, index) => ({
		id: start + index,
		label: `${prefix}${start + index}`,
		selected: signal(false),
		disabled: signal(false),
	}));
}

function selectionSummary(rows: readonly Row[]): string {
	const selected = rows.filter((row) => row.selected()).map((row) => row.label);
	return selected.length ? `${selected.length} sélectionnée(s) : ${selected.join(', ')}` : 'aucune';
}

const SHIFT = '<kbd>Shift</kbd>';

/** Steps and notes shown in the Controls panel, as rows without control: the action as name, the expected result as description */
function stepsArgTypes(steps: Step[], notes: string[] = []): Meta['argTypes'] {
	const toText = (html: string) => html.replace(/<\/?(kbd|code)>/g, '');
	const toMarkdown = (html: string) => html.replace(/<\/?code>/g, '`');
	const argTypes: Meta['argTypes'] = {};
	steps.forEach((step, index) => {
		argTypes[`step${index + 1}`] = {
			name: `${index + 1}. ${toText(step.try)}`,
			description: toMarkdown(step.expected),
			control: false,
			table: { category: 'Étapes', type: { summary: undefined } },
		};
	});
	notes.forEach((note, index) => {
		argTypes[`note${index + 1}`] = { name: '—', description: toMarkdown(note), control: false, table: { category: 'À savoir', type: { summary: undefined } } };
	});
	return argTypes;
}

const DATA_TABLE = [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent];

/** Live state of the selection */
@Component({
	selector: 'range-story-state',
	imports: [StoryModelDisplayComponent],
	template: `<pr-story-model-display heading="Sélection">{{ summary() }}</pr-story-model-display>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RangeStoryStateComponent {
	readonly rows = input.required<readonly Row[]>();
	protected readonly summary = computed(() => selectionSummary(this.rows()));
}

const STORY_IMPORTS = [RangeStoryStateComponent, StoryModelDisplayComponent];

/** Buttons above a table */
const ACTIONS_STYLES = `
	.rangeStory-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1rem;
		margin-block-end: 1rem;
	}
`;

// Basic

@Component({
	selector: 'range-story-basic',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected" (selectedChange)="changes.set(changes() + 1)">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-data-table>

		<range-story-state [rows]="rows" />
		<pr-story-model-display heading="selectedChange émis par les lignes">{{ changes() }}</pr-story-model-display>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicStory {
	readonly rows = createRows(10);
	readonly changes = signal(0);

	static readonly steps: Step[] = [
		{
			try: `Cocher la ligne 2. ${SHIFT} enfoncé, survoler la ligne 6 sans cliquer.`,
			expected: 'Les lignes 3 à 6 montrent une coche pâle (état futur). La ligne 2, déjà cochée, ne change pas, ni « Tout sélectionner », qui resterait mixte.',
		},
		{
			try: `${SHIFT} + clic sur la ligne 6.`,
			expected: 'Les lignes 2 à 6 sont cochées. Le compteur de <code>selectedChange</code> augmente de 4 : un par ligne modifiée.',
		},
		{
			try: `Cliquer la ligne 9, puis ${SHIFT} + clic sur la ligne 4.`,
			expected: 'Les lignes 4 à 9 prennent l’état de la ligne 4 après son clic. Dans un sens comme dans l’autre, la plage part de la dernière case cliquée.',
		},
		{
			try: `${SHIFT} enfoncé, survoler la ligne 2 (cochée).`,
			expected: 'Les lignes 2 et 3, qui seraient décochées depuis la ligne 4, deviennent des cases grises vides (état futur).',
		},
	];

	static readonly notes = [`Pendant l’appui sur ${SHIFT}, l’aperçu suit la case survolée : survoler sa cellule suffit. Il n’apparaît que si le pointeur est dans le tableau.`];
}

// Keyboard

@Component({
	selector: 'range-story-keyboard',
	imports: [
		...STORY_IMPORTS,
		IndexTableComponent,
		IndexTableHeadComponent,
		IndexTableBodyComponent,
		IndexTableRowComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		IndexTableActionComponent,
	],
	template: `
		<lu-index-table selectable>
			<thead luIndexTableHead>
				<tr luIndexTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luIndexTableCell>Nom</th>
					<th luIndexTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luIndexTableBody>
				@for (row of rows; track row.id) {
					<tr luIndexTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luIndexTableCell>
							<a href="#" luIndexTableAction>{{ row.label }}</a>
						</th>
						<td luIndexTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-index-table>

		<range-story-state [rows]="rows" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class KeyboardStory {
	readonly rows = createRows(8);

	static readonly steps: Step[] = [
		{
			try: '<kbd>Tab</kbd> jusqu’à la case de la ligne 2, puis <kbd>Espace</kbd>.',
			expected: 'La ligne 2 est cochée : c’est le point de départ de la plage.',
		},
		{
			try: `<kbd>Tab</kbd> (sans ${SHIFT}) jusqu’à la case de la ligne 5, puis appuyer sur ${SHIFT} et le garder enfoncé.`,
			expected: 'Les lignes 3 à 5 montrent une coche pâle : l’aperçu suit la case focalisée.',
		},
		{
			try: `Toujours ${SHIFT} enfoncé, <kbd>Espace</kbd>.`,
			expected: 'Les lignes 2 à 5 sont cochées.',
		},
		{
			try: `Toujours ${SHIFT} enfoncé, remonter avec <kbd>Tab</kbd> jusqu’à la case de la ligne 3.`,
			expected: 'L’aperçu s’affiche sur chaque case et disparaît sur les liens, où <kbd>Espace</kbd> ne sélectionne pas. Sur la ligne 3, les lignes 3 à 5 montrent une case grise vide.',
		},
		{
			try: `Toujours ${SHIFT} enfoncé, <kbd>Espace</kbd>.`,
			expected: 'Les lignes 3 à 5 sont décochées : la plage part de la ligne 5, la dernière case cochée.',
		},
	];
	static readonly notes = [
		`Avec ${SHIFT} enfoncé, <kbd>Tab</kbd> remonte : on descend sans ${SHIFT}, puis on l’enfonce sur la case d’arrivée.`,
		'Garder le pointeur hors du tableau : la case survolée l’emporte sur la case focalisée.',
	];
}

// Screen reader

@Component({
	selector: 'range-story-screen-reader',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-data-table>

		<range-story-state [rows]="rows" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScreenReaderStory {
	readonly rows = createRows(6);

	static readonly steps: Step[] = [
		{
			try: `Lecteur d’écran actif (VoiceOver, NVDA…) : cocher la ligne 1, puis ${SHIFT} + clic sur la ligne 4.`,
			expected: 'Le lecteur d’écran annonce la sélection de 3 éléments (« You just selected 3 items », Storybook étant en anglais) : lignes 2 à 4, seules les lignes qui ont changé.',
		},
		{
			try: `${SHIFT} + clic sur la ligne 1.`,
			expected: 'Le lecteur d’écran annonce la désélection de 4 éléments (« You just unselected 4 items ») : la plage part de la ligne 4, la dernière case cliquée.',
		},
		{
			try: `Cocher la ligne 1, puis la ligne 2 (clics simples), puis ${SHIFT} + clic sur la ligne 3.`,
			expected: 'Seul l’état de la case de la ligne 3 est annoncé, sans annonce de plage : la ligne 2 était déjà cochée, seule la ligne 3 a changé.',
		},
	];
	static readonly notes = ['L’aperçu (avec Shift enfoncé) est visuel uniquement : il n’est pas annoncé, la sélection par plage fonctionne sans lui.'];
}

// Disabled rows

@Component({
	selector: 'range-story-disabled',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<div class="rangeStory-actions">
			<button type="button" class="button mod-outlined" (click)="rows[0].disabled.set(!rows[0].disabled())">{{ rows[0].disabled() ? 'Réactiver' : 'Désactiver' }} la ligne 1</button>
		</div>

		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected" [disabled]="row.disabled()">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>{{ row.disabled() ? 'Désactivée' : 'En attente' }}</td>
					</tr>
				}
			</tbody>
		</lu-data-table>

		<range-story-state [rows]="rows" />
	`,
	styles: ACTIONS_STYLES,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledRowsStory {
	readonly rows = createRows(8);
	static readonly steps: Step[] = [
		{
			try: `Cocher la ligne 2. ${SHIFT} enfoncé, survoler la ligne 8.`,
			expected: 'Les lignes désactivées 4 et 6 (la 6 étant cochée) ne sont pas marquées par l’aperçu.',
		},
		{
			try: `${SHIFT} + clic sur la ligne 8.`,
			expected: 'Les lignes 2 à 8 sont cochées, sauf la 4 : les lignes désactivées sont sautées. La 6 reste cochée.',
		},
		{
			try: `Cliquer « Tout sélectionner » jusqu’à ce que les lignes actives soient décochées. Cocher la ligne 1, cliquer « Désactiver la ligne 1 », puis ${SHIFT} + clic sur la ligne 5.`,
			expected: `Seule la ligne 5 change : la dernière case cliquée, devenue désactivée, ne sert plus de point de départ, et l’aperçu ne montrait rien avec ${SHIFT} enfoncé.`,
		},
	];

	constructor() {
		this.rows[3].disabled.set(true);
		this.rows[5].disabled.set(true);
		this.rows[5].selected.set(true);
	}
}

// Collapsed groups

@Component({
	selector: 'range-story-groups',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			@for (group of groups; track group.label) {
				<tbody luDataTableBody [group]="'Groupe ' + group.label" groupButtonAlt="Afficher ou masquer le groupe" [(expanded)]="group.expanded">
					@for (row of group.rows; track row.id) {
						<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
							<th luDataTableCell>{{ row.label }}</th>
							<td luDataTableCell>En attente</td>
						</tr>
					}
				</tbody>
			}
		</lu-data-table>

		<range-story-state [rows]="allRows" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CollapsedGroupsStory {
	readonly groups = ['A', 'B', 'C'].map((label) => ({ label, expanded: signal(label !== 'B'), rows: createRows(3, label) }));
	readonly allRows = this.groups.flatMap((group) => group.rows);
	static readonly steps: Step[] = [
		{
			try: `Cocher A1, puis ${SHIFT} + clic sur C2 (le groupe B est replié).`,
			expected: 'A1 à A3, C1 et C2 sont cochées ; B1 à B3 sont sautées : dans un tableau, rien ne représente les lignes d’un groupe replié. Voir l’état de la sélection sous le tableau.',
		},
		{
			try: 'Déplier le groupe B.',
			expected: 'B1 à B3 sont décochées.',
		},
		{
			try: `Cliquer « Tout sélectionner » jusqu’à ce que tout soit décoché. Cocher B2, replier B, puis ${SHIFT} + clic sur C3.`,
			expected: 'Seule C3 change : la dernière case cliquée, masquée dans un groupe replié, ne sert plus de point de départ.',
		},
	];
	static readonly notes = [
		'« Tout sélectionner » change aussi les lignes masquées : son libellé dit « tout ». Dans Approbation inbox, une plage comprend les demandes d’un groupe replié, que la case du groupe représente.',
	];
}

// "Select all" managed by the table

@Component({
	selector: 'range-story-table-select-all',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<div class="rangeStory-actions">
			<button type="button" class="button mod-outlined" (click)="rows[2].selected.set(!rows[2].selected())">{{ rows[2].selected() ? 'Décocher' : 'Cocher' }} la ligne 3 (désactivée)</button>
			<button type="button" class="button mod-outlined" (click)="toggleAllDisabled()">
				{{ allDisabled() ? 'Réactiver les lignes' : 'Désactiver toutes les lignes' }}
			</button>
		</div>

		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage (selectedChange)="headChanges.set(headChanges() + 1)">
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected" [disabled]="row.disabled()">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>{{ row.disabled() ? 'Désactivée' : 'En attente' }}</td>
					</tr>
				}
			</tbody>
		</lu-data-table>

		<range-story-state [rows]="rows" />
		<pr-story-model-display heading="selectedChange émis par la ligne d’en-tête">{{ headChanges() }}</pr-story-model-display>
	`,
	styles: ACTIONS_STYLES,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TableSelectAllStory {
	readonly rows = createRows(8);
	readonly headChanges = signal(0);
	readonly allDisabled = signal(false);
	static readonly steps: Step[] = [
		{
			try: `Cliquer « Tout sélectionner », puis ${SHIFT} + clic sur la ligne 5.`,
			expected: 'Toutes les lignes sauf les 5 premières sont cochées : après « Tout sélectionner », la plage part de la première ligne.',
		},
		{
			try: 'Cocher les lignes 1, 2, 4 et 5 : toutes les lignes actives sont cochées, la ligne 3 (désactivée) restant décochée.',
			expected: '« Tout sélectionner » est mixte : son état suit toutes les lignes, désactivées comprises.',
		},
		{
			try: 'Cliquer « Tout sélectionner » (mixte).',
			expected: 'Les lignes actives sont décochées : elles étaient toutes cochées, le clic décoche même si la case est mixte. La ligne 3 ne change pas.',
		},
		{
			try: 'Cliquer « Cocher la ligne 3 », puis « Tout sélectionner ».',
			expected: 'Toutes les lignes actives sont cochées, « Tout sélectionner » est coché.',
		},
		{
			try: 'Cliquer « Désactiver toutes les lignes ».',
			expected: '« Tout sélectionner » est désactivé, et son état reflète toujours les lignes.',
		},
	];
	static readonly notes = ['La ligne d’en-tête n’émet rien : le compteur sous le tableau reste à 0. Le consommateur écoute les lignes.'];

	constructor() {
		this.rows[2].disabled.set(true);
	}

	toggleAllDisabled() {
		const disabled = !this.allDisabled();
		this.allDisabled.set(disabled);
		this.rows.forEach((row, index) => row.disabled.set(disabled || index === 2));
	}
}

// "Select all" managed by the consumer

@Component({
	selector: 'range-story-consumer-select-all',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner (toutes les pages)" [selected]="allSelected()" [mixed]="mixed()" (selectedChange)="selectAll($event)">
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-data-table>

		<range-story-state [rows]="rows" />
		<pr-story-model-display heading="Autres pages">{{ otherPagesSelected() ? '20 lignes sélectionnées' : 'aucune ligne sélectionnée' }}</pr-story-model-display>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConsumerSelectAllStory {
	readonly rows = createRows(8);
	readonly otherPagesSelected = signal(false);
	readonly allSelected = computed(() => this.otherPagesSelected() && this.rows.every((row) => row.selected()));
	readonly mixed = computed(() => !this.allSelected() && (this.otherPagesSelected() || this.rows.some((row) => row.selected())));
	static readonly steps: Step[] = [
		{
			try: 'Cliquer « Tout sélectionner ».',
			expected:
				'Le consommateur sélectionne les 8 lignes affichées et les 20 lignes des autres pages, avec sa propre logique (<code>selected</code>, <code>mixed</code>, <code>selectedChange</code>) : pas d’<code>autoSelectAllOnPage</code>.',
		},
		{
			try: `${SHIFT} enfoncé, survoler la ligne 3.`,
			expected: 'Les lignes 1 à 3 montrent leur état futur ; « Tout sélectionner » n’a pas d’aperçu : le tableau ne sait pas ce qu’il représente.',
		},
		{
			try: `${SHIFT} + clic sur la ligne 3.`,
			expected: 'Les lignes 1 à 3 sont décochées : après « Tout sélectionner », la plage part quand même de la première ligne.',
		},
	];

	static readonly notes = [
		'Sans <code>autoSelectAllOnPage</code>, c’est au consommateur de gérer « Tout sélectionner » : son état, son état mixte, et ce que la case sélectionne. La sélection par plage fonctionne comme ailleurs, mais la case « Tout sélectionner » n’a pas d’aperçu : le consommateur ne connaît pas l’état futur des lignes.',
	];

	selectAll(selected: boolean) {
		this.otherPagesSelected.set(selected);
		this.rows.forEach((row) => row.selected.set(selected));
	}
}

// Index table links

@Component({
	selector: 'range-story-index-table-links',
	imports: [
		...STORY_IMPORTS,
		IndexTableComponent,
		IndexTableHeadComponent,
		IndexTableBodyComponent,
		IndexTableRowComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		IndexTableActionComponent,
	],
	template: `
		<lu-index-table selectable>
			<thead luIndexTableHead>
				<tr luIndexTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luIndexTableCell>Nom</th>
					<th luIndexTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luIndexTableBody>
				@for (row of rows; track row.id) {
					<tr luIndexTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luIndexTableCell>
							<a href="#" luIndexTableAction>{{ row.label }}</a>
						</th>
						<td luIndexTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-index-table>

		<range-story-state [rows]="rows" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class IndexTableLinksStory {
	readonly rows = createRows(8);

	static readonly steps: Step[] = [
		{
			try: `Cocher la ligne 2. ${SHIFT} enfoncé, survoler la ligne 6 ailleurs que sur sa case.`,
			expected: 'Pas d’aperçu : un clic à cet endroit ouvre le lien de la ligne, il ne coche pas.',
		},
		{
			try: `${SHIFT} enfoncé, survoler la cellule de la case de la ligne 6.`,
			expected: 'L’aperçu apparaît : les lignes 3 à 6 montrent une coche pâle.',
		},
	];
}

// Approbation inbox: groups and "Select all"

@Component({
	selector: 'range-story-approbation-inbox',
	imports: [...STORY_IMPORTS, ApprobationInboxListComponent, ApprobationInboxDetailComponent, ApprobationInboxGroupComponent, ApprobationInboxItemComponent, ApprobationInboxLinkComponent],
	template: `
		<lu-approbation-inbox-list selectable [detailsComponent]="detailRef">
			@for (group of groups; track group.label) {
				<lu-approbation-inbox-list-group [label]="'Groupe ' + group.label" [(expanded)]="group.expanded">
					@for (row of group.rows; track row.id) {
						<lu-approbation-inbox-list-item [(checked)]="row.selected">
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>{{ row.label }}</a>
						</lu-approbation-inbox-list-item>
					}
				</lu-approbation-inbox-list-group>
			}
		</lu-approbation-inbox-list>
		<lu-approbation-inbox-detail #detailRef />

		<range-story-state [rows]="allRows" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApprobationInboxStory {
	readonly groups = ['A', 'B', 'C'].map((label) => ({ label, expanded: signal(label !== 'B'), rows: createRows(3, label) }));
	readonly allRows = this.groups.flatMap((group) => group.rows);
	static readonly steps: Step[] = [
		{
			try: `Cocher la case du groupe A. ${SHIFT} enfoncé, survoler C2.`,
			expected: 'Les demandes de B (replié) et C1, C2 montrent leur état futur, la case du groupe B aussi (coche pâle), celle du groupe C est mixte pâle.',
		},
		{
			try: `${SHIFT} + clic sur C2.`,
			expected: 'A1 à C2 sont cochées, demandes du groupe replié B comprises : une case de groupe est un point de départ, à la position de son en-tête.',
		},
		{
			try: `Cliquer « Tout sélectionner » jusqu’à ce que tout soit décoché. Cocher A2, puis ${SHIFT} + clic sur la case du groupe C.`,
			expected: 'A2 à C3 sont cochées : une case de groupe est aussi un point d’arrivée, et coche ses propres demandes.',
		},
		{
			try: `Cliquer « Tout sélectionner » jusqu’à ce que tout soit coché, puis ${SHIFT} + clic sur A3.`,
			expected: 'A1 à A3 sont décochées : après « Tout sélectionner », la plage part de la première demande.',
		},
	];
}

// Pagination

@Component({
	selector: 'range-story-pagination',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<div class="rangeStory-actions">
			<button type="button" class="button mod-outlined" [disabled]="page() === 0" (click)="page.set(page() - 1)">Page précédente</button>
			<span>Page {{ page() + 1 }} / 3</span>
			<button type="button" class="button mod-outlined" [disabled]="page() === 2" (click)="page.set(page() + 1)">Page suivante</button>
		</div>
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of pageRows(); track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luDataTableCell>{{ row.label }}</th>
					</tr>
				}
			</tbody>
		</lu-data-table>
		<range-story-state [rows]="rows" />
	`,
	styles: ACTIONS_STYLES,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PaginationStory {
	readonly rows = createRows(15);
	readonly page = signal(0);
	readonly pageRows = computed(() => this.rows.slice(this.page() * 5, this.page() * 5 + 5));

	static readonly steps: Step[] = [
		{
			try: `Cocher la ligne 2, passer à la page suivante, puis ${SHIFT} + clic sur la ligne 9.`,
			expected: 'Seule la ligne 9 change : la plage est limitée à la page affichée, la dernière case cliquée, sur la page précédente, ne sert pas de point de départ.',
		},
		{
			try: 'Revenir à la page précédente.',
			expected: 'La ligne 2 est toujours cochée : la sélection des autres pages est conservée par le consommateur.',
		},
	];
	static readonly notes = [
		'Les lignes sont suivies par identifiant (<code>@for (row of rows; track row.id)</code>) : c’est la bonne pratique. Avec <code>track $index</code>, les lignes seraient réutilisées d’une page à l’autre et une plage pourrait partir d’une ligne de la page précédente.',
	];
}

// Perfs

@Component({
	selector: 'range-story-perfs',
	imports: [...STORY_IMPORTS, ...DATA_TABLE],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Tout sélectionner" autoSelectAllOnPage>
					<th luDataTableCell>Nom</th>
					<th luDataTableCell>Statut</th>
				</tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track row.id) {
					<tr luDataTableRow [selectedLabel]="'Sélectionner ' + row.label" [(selected)]="row.selected">
						<th luDataTableCell>{{ row.label }}</th>
						<td luDataTableCell>En attente</td>
					</tr>
				}
			</tbody>
		</lu-data-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PerfsStory {
	readonly rows = createRows(1000);

	static readonly steps: Step[] = [
		{
			try: `Survoler rapidement les lignes, sans ${SHIFT}.`,
			expected: 'Survol fluide : rien n’est calculé sans Shift.',
		},
		{
			try: `${SHIFT} enfoncé, survoler rapidement les cases.`,
			expected: 'Aperçu sans à-coup notable (environ 4 ms par case survolée sur 1 000 lignes).',
		},
		{
			try: `Cocher la ligne 10, puis ${SHIFT} + clic sur la ligne 900.`,
			expected: 'Les lignes 10 à 900 sont cochées sans délai notable.',
		},
	];
}

export default {
	title: 'QA/Range selection (POC)',
	tags: ['!autodocs'],
	parameters: { controls: { expanded: true } },
} as Meta;

export const Basic: StoryObj = {
	name: 'Basic',
	argTypes: stepsArgTypes(BasicStory.steps, BasicStory.notes),
	render: () => ({ moduleMetadata: { imports: [BasicStory] }, template: `<range-story-basic />` }),
};

export const Keyboard: StoryObj = {
	name: 'Keyboard',
	argTypes: stepsArgTypes(KeyboardStory.steps, KeyboardStory.notes),
	render: () => ({ moduleMetadata: { imports: [KeyboardStory] }, template: `<range-story-keyboard />` }),
};

export const ScreenReader: StoryObj = {
	name: 'Screen reader',
	argTypes: stepsArgTypes(ScreenReaderStory.steps, ScreenReaderStory.notes),
	render: () => ({ moduleMetadata: { imports: [ScreenReaderStory] }, template: `<range-story-screen-reader />` }),
};

export const DisabledRows: StoryObj = {
	name: 'Disabled rows',
	argTypes: stepsArgTypes(DisabledRowsStory.steps),
	render: () => ({ moduleMetadata: { imports: [DisabledRowsStory] }, template: `<range-story-disabled />` }),
};

export const CollapsedGroups: StoryObj = {
	name: 'Collapsed groups',
	argTypes: stepsArgTypes(CollapsedGroupsStory.steps, CollapsedGroupsStory.notes),
	render: () => ({ moduleMetadata: { imports: [CollapsedGroupsStory] }, template: `<range-story-groups />` }),
};

export const TableSelectAll: StoryObj = {
	name: 'Select all managed by the table',
	argTypes: stepsArgTypes(TableSelectAllStory.steps, TableSelectAllStory.notes),
	render: () => ({ moduleMetadata: { imports: [TableSelectAllStory] }, template: `<range-story-table-select-all />` }),
};

export const ConsumerSelectAll: StoryObj = {
	name: 'Select all managed by the consumer',
	argTypes: stepsArgTypes(ConsumerSelectAllStory.steps, ConsumerSelectAllStory.notes),
	render: () => ({ moduleMetadata: { imports: [ConsumerSelectAllStory] }, template: `<range-story-consumer-select-all />` }),
};

export const IndexTableLinks: StoryObj = {
	name: 'Index table links',
	argTypes: stepsArgTypes(IndexTableLinksStory.steps),
	render: () => ({ moduleMetadata: { imports: [IndexTableLinksStory] }, template: `<range-story-index-table-links />` }),
};

export const ApprobationInbox: StoryObj = {
	name: 'Approbation inbox',
	argTypes: stepsArgTypes(ApprobationInboxStory.steps),
	render: () => ({ moduleMetadata: { imports: [ApprobationInboxStory] }, template: `<range-story-approbation-inbox />` }),
};

export const Pagination: StoryObj = {
	name: 'Pagination',
	argTypes: stepsArgTypes(PaginationStory.steps, PaginationStory.notes),
	render: () => ({ moduleMetadata: { imports: [PaginationStory] }, template: `<range-story-pagination />` }),
};

export const Perfs: StoryObj = {
	name: 'Perfs',
	argTypes: stepsArgTypes(PerfsStory.steps),
	render: () => ({ moduleMetadata: { imports: [PerfsStory] }, template: `<range-story-perfs />` }),
};
