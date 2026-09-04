import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DATA_TABLE_ALIGN,
	DATA_TABLE_SORT,
	DATA_TABLE_VERTICAL_ALIGN,
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { HiddenArgType } from '@/helpers/common-arg-types';
import { setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Listings/Data table/Angular/Basic',
	argTypes: {
		empty: {
			description: 'Affiche un empty state à la place des lignes de tableau.',
			table: { category: 'inputs' },
		},
		sort: {
			options: setStoryOptions(DATA_TABLE_SORT),
			control: {
				type: 'select',
			},
			description: 'Définit l’état de tri d’une cellule d’en-tête.',
			table: { category: 'models' },
		},
		align: {
			options: setStoryOptions(DATA_TABLE_ALIGN),
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules horizontalement.',
			table: { category: 'inputs' },
		},
		verticalAlign: {
			options: setStoryOptions(DATA_TABLE_VERTICAL_ALIGN),
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules verticalement.',
			table: { category: 'inputs' },
		},
		inlineSize: {
			if: { arg: 'layoutFixed', truthy: true },
			description: 'Modifie la largeur d’une colonne lorsque <code>layoutFixed</code> est activé.',
			table: { category: 'inputs' },
		},
		selected: {
			if: { arg: 'selectable', truthy: true },
			description: 'Applique l’état actif à une ligne sélectionnable.',
			table: { category: 'models' },
		},
		selectedLabel: {
			if: { arg: 'selectable', truthy: true },
			description: 'Texte alternatif restitué à la sélection d’une ligne.',
			table: { category: 'inputs' },
		},
		selectedLabelHead: {
			if: { arg: 'selectable', truthy: true },
			description: 'Texte alternatif restitué à la sélection de l’ensemble des lignes.',
			table: { category: 'inputs' },
		},
		mixed: {
			if: { arg: 'selectable', truthy: true },
			description: "Applique un état de sélection mixte (-) à la checkbox d'une ligne.",
		},
		disabled: {
			if: { arg: 'selectable', truthy: true },
			table: { category: 'inputs' },
		},
		inlineSizeValue: {
			if: { arg: 'inlineSize', truthy: true },
			table: { category: 'inputs' },
		},
		groupButtonAlt: {
			if: { arg: 'group', truthy: true },
			description: 'Texte alternatif restitué au focus de l’action sur le groupe.',
			table: { category: 'inputs' },
		},
		expanded: {
			if: { arg: 'group', truthy: true },
			description: 'Affiche le groupe dans son état étendu.',
			table: { category: 'models' },
		},
		cols: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Modifie le nombre de colonnes dans la story.',
			table: { category: 'inputs' },
		},
		lines: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Modifie le nombre de lignes dans la story.',
			table: { category: 'inputs' },
		},
		tfoot: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche un footer.',
			table: { category: 'inputs' },
		},
		stickyHeader: HiddenArgType,
		hover: {
			control: {
				type: 'boolean',
			},
			description: 'Marque la ligne au survol pour faciliter la lisibilité des tableaux larges (ne sous-entend pas une interaction).',
			table: { category: 'inputs' },
		},
		cellBorder: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute un séparateur vertical entre les cellules.',
			table: { category: 'inputs' },
		},
		layoutFixed: {
			control: {
				type: 'boolean',
			},
			description: 'Applique une largeur fixe aux colonnes. La largeur d’une colonne peut être redéfinie via <code>fixedWidth</code>.',
			table: { category: 'inputs' },
		},
		selectable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend les lignes du tableau sélectionnables via des checkbox.',
			table: { category: 'inputs' },
		},
		group: {
			control: {
				type: 'boolean',
			},
			description: 'Présente un groupe de lignes dans la story.',
			table: { category: 'inputs' },
		},
		editable: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute un champ de saisie dans une cellule.',
			table: { category: 'inputs' },
		},
		nested: {
			control: {
				type: 'boolean',
			},
			description: 'Réduit le <code>border-radius</code> du tableau pour l’imbriquer dans un composant structure.',
			table: { category: 'inputs' },
		},
		actions: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute des actions rapides à droite d’une ligne.',
			table: { category: 'inputs' },
		},
		pagination: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute une pagination au tableau.',
			table: { category: 'inputs' },
		},
		drag: HiddenArgType,
	},
	decorators: [
		moduleMetadata({
			imports: [
				DataTableComponent,
				DataTableHeadComponent,
				DataTableBodyComponent,
				DataTableFootComponent,
				DataTableRowComponent,
				DataTableRowCellComponent,
				DataTableRowCellHeaderComponent,
				FormFieldComponent,
				TextInputComponent,
				FormsModule,
				ButtonComponent,
				EmptyStateSectionComponent,
				IconComponent,
				PaginationComponent,
				StoryModelDisplayComponent,
				NumericBadgeComponent,
			],
		}),
	],
	render: (args, { argTypes }) => {
		const {
			cols,
			actions,
			editable,
			empty,
			verticalAlign,
			align,
			group,
			expanded,
			groupButtonAlt,
			tfoot,
			selected,
			disabled,
			layoutFixed,
			hover,
			sort,
			cellBorder,
			inlineSize,
			inlineSizeValue,
			mixed,
			selectable,
			lines,
			nested,
			selectedLabel,
			selectedLabelHead,
			pagination,
			drag,
			...inputArgs
		} = args;

		const text = 'cell';
		const textHeader = 'header';
		const layoutFixedAttr = layoutFixed ? ` layoutFixed` : ``;
		const hoverAttr = hover ? ` hover` : ``;
		const cellBorderAttr = cellBorder ? ` cellBorder` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
		const inlineSizeAttr = inlineSize && inlineSizeValue !== `` ? ` inlineSize="${inlineSizeValue}"` : ``;
		const selectableAttr = selectable ? ` selectable` : ``;
		const draggable = drag ? ` drag` : ``;
		const selectedAttr = selected ? ` [selected]="true"` : ``;
		const selectableLabelAttr = selectable ? ` selectedLabel="${selectedLabel}"` : ``;
		const selectableLabelHeadAttr = selectable ? ` selectedLabel="${selectedLabelHead}"` : ``;
		const mixedAttr = mixed ? ` mixed` : ``;
		const disabledAttr = disabled ? ` disabled` : ``;
		const groupAttr = group ? ` groupButtonAlt="${groupButtonAlt}" [group]="samplePortalContent"` : ``;
		const expandedAttr = expanded ? ` [expanded]="true"` : ``;
		const emptyAttr = empty ? ` empty` : ``;
		const alignAttr = align ? ` align="${align}"` : ``;
		const verticalAlignAttr = verticalAlign ? ` verticalAlign="${verticalAlign}"` : ``;
		const editableAttr = editable ? ` editable` : ``;
		const actionsAttr = actions ? ` actions` : ``;
		const nestedAttr = nested ? ` nested` : ``;
		const verticalAlignContent = verticalAlign ? `<br />${textHeader}` : ``;
		let colsContent = ``;
		let colsHeaderContent = ``;
		let linesContent = ``;
		const col = `
			<td luDataTableCell>${text}</td>`;
		const header = `
			<th luDataTableCell>${textHeader}</th>`;
		for (let i = 1; i <= cols - 2; i++) {
			colsContent = colsContent + col;
		}
		for (let i = 1; i <= cols - 2; i++) {
			colsHeaderContent = colsHeaderContent + header;
		}
		const line = `
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell>${text}</td>
		</tr>`;
		for (let i = 1; i <= lines - 2; i++) {
			linesContent = linesContent + line;
		}
		const paginationTpl = pagination
			? `
	<lu-pagination dataTablePagination from="1" to="20" itemsCount="27" isFirstPage />`
			: ``;

		const actionsContent = actions
			? `
				<button type="button" luButton>
					<lu-icon icon="officePen" alt="Edit" />
				</button>
				<button type="button" luButton>
					<lu-icon icon="trashDelete" alt="Delete" />
				</button>
			`
			: text;
		const editableContent = editable
			? `
				<lu-form-field label="Label" hiddenLabel>
					<lu-text-input type="text" [(ngModel)]="example" />
				</lu-form-field>
			`
			: text;
		const samplePortalContentTpl = group
			? `
<ng-template #samplePortalContent>
	Group
	<lu-numeric-badge [value]="${lines}" />
</ng-template>`
			: ``;
		const tfootTpl = tfoot
			? `
	<tfoot luDataTableFoot>
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell>${text}</td>
		</tr>
	</tfoot>`
			: ``;
		const modelEditableDisplayer = editable ? `<pr-story-model-display>{{ example }}</pr-story-model-display>` : ``;
		const tbodyTpl = empty
			? `<tr luDataTableRow>
			<th luDataTableCell colspan="${cols}">
				<lu-empty-state-section
					hx="3"
					illustration="magnifyingGlass"
					heading="Empty State"
					description="Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus."
				/>
			</th>
		</tr>`
			: `${linesContent}<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}${verticalAlignContent}</th>${colsContent}
			<td luDataTableCell${actionsAttr}>${actionsContent}</td>
		</tr>
		<tr luDataTableRow${selectableLabelAttr}${selectedAttr}${disabledAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell${editableAttr}>${editableContent}</td>
		</tr>`;

		return {
			props: { example: text },
			template: `<lu-data-table${layoutFixedAttr}${hoverAttr}${cellBorderAttr}${selectableAttr}${verticalAlignAttr}${nestedAttr}${draggable}${emptyAttr}>
	<thead luDataTableHead>
		<tr luDataTableRow${selectableLabelHeadAttr}${mixedAttr}>
			<th luDataTableCell>${textHeader}</th>${colsHeaderContent}
			<th luDataTableCell${inlineSizeAttr}${sortAttr}${alignAttr}>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${groupAttr}${expandedAttr}>
		${tbodyTpl}
	</tbody>${tfootTpl}${paginationTpl}
</lu-data-table>
${samplePortalContentTpl}${modelEditableDisplayer}`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		cols: 2,
		lines: 2,
		tfoot: false,
		align: undefined,
		empty: false,
		verticalAlign: undefined,
		sort: undefined,
		hover: false,
		cellBorder: false,
		layoutFixed: false,
		inlineSize: false,
		inlineSizeValue: '6rem',
		selectable: false,
		selected: false,
		mixed: false,
		disabled: false,
		selectedLabel: 'Sélectionner cette ligne',
		selectedLabelHead: 'Sélectionner toutes les lignes',
		group: false,
		groupButtonAlt: 'Afficher X lignes supplémentaires',
		expanded: false,
		editable: false,
		actions: false,
		nested: false,
		pagination: false,
		drag: false,
	},
};
