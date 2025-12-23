import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Listings/Data table/Angular/Basic',
	argTypes: {
		sort: {
			options: ['', 'none', 'ascending', 'descending'],
			control: {
				type: 'select',
			},
			description: "Définit l'état de tri d'une cellule d'en-tête.",
		},
		align: {
			options: ['', 'start', 'center', 'end'],
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules horizontalement.',
		},
		verticalAlign: {
			options: ['', 'top', 'middle', 'bottom'],
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules verticalement.',
		},
		inlineSize: {
			if: { arg: 'layoutFixed', truthy: true },
			description: "Modifie la largeur d'une colonne lorsque <code>layoutFixed</code> est activé.",
		},
		selected: {
			if: { arg: 'selectable', truthy: true },
			description: "Applique l'état actif à une ligne sélectionnable.",
		},
		selectedLabel: {
			if: { arg: 'selectable', truthy: true },
			description: "Texte alternatif restitué à la sélection d'une ligne.",
		},
		selectedLabelHead: {
			if: { arg: 'selectable', truthy: true },
			description: "Texte alternatif restitué à la sélection de l'ensemble des lignes.",
		},
		disabled: {
			if: { arg: 'selectable', truthy: true },
		},
		inlineSizeValue: {
			if: { arg: 'inlineSize', truthy: true },
		},
		groupButtonAlt: {
			if: { arg: 'group', truthy: true },
			description: "Texte alternatif restitué au focus de l'action sur le groupe.",
		},
		expanded: {
			if: { arg: 'group', truthy: true },
			description: 'Affiche le groupe dans son état étendu.',
		},
		cols: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Modifie le nombre de colonnes dans la story.',
		},
		lines: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Modifie le nombre de lignes dans la story.',
		},
		tfoot: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche un footer.',
		},
		stickyHeader: {
			control: {
				type: 'boolean',
			},
			description: 'Conserve le header visible en cas de scroll.',
		},
		hover: {
			control: {
				type: 'boolean',
			},
			description: 'Marque la ligne au survol pour faciliter la lisibilité des tableaux larges (ne sous-entend pas une interaction).',
		},
		cellBorder: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute un séparateur vertical entre les cellules.',
		},
		layoutFixed: {
			control: {
				type: 'boolean',
			},
			description: "Applique une largeur fixe aux colonnes. La largeur d'une colonne peut être redéfinie via <code>fixedWidth</code>.",
		},
		selectable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend les lignes du tableau sélectionnables via des checkbox.',
		},
		group: {
			control: {
				type: 'boolean',
			},
			description: 'Présente un groupe de lignes dans la story.',
		},
		editable: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute un champ de saisi dans une cellule.',
		},
		nested: {
			control: {
				type: 'boolean',
			},
			description: "Réduit le <code>border-radius</code> du tableau pour l'imbriquer dans un composant structure.",
		},
		actions: {
			control: {
				type: 'boolean',
			},
			description: "Ajoute des actions rapides à droite d'une ligne.",
		},
		pagination: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute une pagination au tableau.',
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
		const disabledAttr = disabled ? ` disabled` : ``;
		const groupAttr = group ? ` groupButtonAlt="${groupButtonAlt}" [group]="samplePortalContent"` : ``;
		const expandedAttr = expanded ? ` [expanded]="true"` : ``;
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

		return {
			props: { example: text },
			template: `<lu-data-table${layoutFixedAttr}${hoverAttr}${cellBorderAttr}${selectableAttr}${verticalAlignAttr}${nestedAttr}${draggable}>
	<thead luDataTableHead>
		<tr luDataTableRow${selectableLabelHeadAttr}>
			<th luDataTableCell>${textHeader}</th>${colsHeaderContent}
			<th luDataTableCell${inlineSizeAttr}${sortAttr}${alignAttr}>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${groupAttr}${expandedAttr}>${linesContent}
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}${verticalAlignContent}</th>${colsContent}
			<td luDataTableCell${actionsAttr}>${actionsContent}</td>
		</tr>
		<tr luDataTableRow${selectableLabelAttr}${selectedAttr}${disabledAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell${editableAttr}>${editableContent}</td>
		</tr>
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
		verticalAlign: undefined,
		sort: undefined,
		hover: false,
		cellBorder: false,
		layoutFixed: false,
		inlineSize: false,
		inlineSizeValue: '6rem',
		selectable: false,
		selected: false,
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
