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

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Listings/Data table/Angular/Overflow',
	argTypes: {
		cols: {
			description: 'Nombre de colonnes.',
			control: { type: 'range', min: 2, max: 8 },
			table: { category: 'inputs' },
		},
		lines: {
			description: 'Nombre de lignes.',
			control: { type: 'range', min: 2, max: 8 },
			table: { category: 'inputs' },
		},
		stickyColsStart: {
			description: 'Nombre de colonnes figées depuis la gauche. Limité à 1 avec l’usage de colspan.',
			control: { type: 'range', min: 0, max: 4 },
			table: { category: 'inputs' },
		},
		stickyColsEnd: {
			description: 'Nombre de colonnes figées depuis la droite. Non compatible avec l’usage de colspan.',
			control: { type: 'range', min: 0, max: 4 },
			table: { category: 'inputs' },
		},
		noOverflow: {
			description: 'Désactive le défilement horizontal du tableau. Celui-ci prendra alors la place nécessaire pour afficher tout son contenu.',
			table: { category: 'inputs' },
		},
		stickyHeader: {
			description: 'Fige le header lors du défilement vertical.',
			table: { category: 'inputs' },
		},
		pagination: {
			description: 'Affiche une pagination sous le tableau.',
			table: { category: 'inputs' },
		},
		group: {
			control: {
				type: 'boolean',
			},
			description: 'Présente un groupe de lignes dans la story.',
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
				NumericBadgeComponent,
				PaginationComponent,
			],
		}),
	],

	render: (args, { argTypes }) => {
		const { cols, stickyHeader, lines, stickyColsStart, stickyColsEnd, pagination, noOverflow, group, groupButtonAlt, expanded, ...inputArgs } = args;

		const text = 'cell';
		const textHeader = 'header';

		const stickyHeaderAttr = stickyHeader ? ` sticky` : ``;
		const overflowingAttr = noOverflow ? ` noOverflow` : ``;

		const stickyColsStartValue = group ? Math.min(stickyColsStart, 1) : stickyColsStart;
		const stickyColsStartAttr = stickyColsStartValue > 0 ? ` stickyColsStart="${stickyColsStartValue}"` : ``;
		const stickyColsEndAttr = stickyColsEnd > 0 ? ` stickyColsEnd="${stickyColsEnd}"` : ``;
		const groupAttr = group ? ` groupButtonAlt="${groupButtonAlt}" [group]="samplePortalContent"` : ``;
		const expandedAttr = expanded ? ` [expanded]="true"` : ``;

		let colsContent = `
			<td luDataTableCell>${text}</td>`;
		let colsHeaderContent = `
			<th luDataTableCell>${textHeader}</th>`;
		let linesContent = ``;
		const col = `
			<td luDataTableCell>${text}</td>`;
		const header = `
			<th luDataTableCell>${textHeader}</th>`;
		for (let i = 1; i <= cols - 3; i++) {
			colsContent = colsContent + col;
		}
		for (let i = 1; i <= cols - 3; i++) {
			colsHeaderContent = colsHeaderContent + header;
		}
		const line = `
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell>${text}</td>
		</tr>`;
		for (let i = 1; i <= lines; i++) {
			linesContent = linesContent + line;
		}
		const samplePortalContentTpl = group
			? `
<ng-template #samplePortalContent>
	Group
	<lu-numeric-badge [value]="${lines}" />
</ng-template>`
			: ``;
		const paginationTpl = pagination
			? `
	<lu-pagination dataTablePagination from="1" to="20" itemsCount="27" isFirstPage />`
			: ``;

		return {
			styles: [noOverflow ? `` : `lu-data-table { max-block-size: 15rem; max-inline-size: 30rem; inline-size: fit-content }`],
			props: { example: text },
			template: `<lu-data-table${stickyColsStartAttr}${stickyColsEndAttr}${overflowingAttr}>
	<thead luDataTableHead${stickyHeaderAttr}>
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>${colsHeaderContent}
			<th luDataTableCell>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${groupAttr}${expandedAttr}>${linesContent}
	</tbody>${paginationTpl}
</lu-data-table>${samplePortalContentTpl}`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		noOverflow: false,
		cols: 8,
		lines: 2,
		stickyColsStart: 0,
		stickyColsEnd: 0,
		stickyHeader: false,
		pagination: false,
		group: false,
		groupButtonAlt: 'Afficher X lignes supplémentaires',
		expanded: false,
	},
};
