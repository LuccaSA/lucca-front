import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Listings/Data table/Angular/Responsive',
	argTypes: {
		inlineSize: {
			description: 'Modifie la largeur d’une colonne lorsque <code>layoutFixed</code> est activé. La valeur est définie par <code>inlineSizeValue</code> dans la story.',
			table: { category: 'inputs (th[luDataTableCell])' },
		},
		inlineSizeValue: {
			name: '↳ inlineSizeValue',
			if: { arg: 'inlineSize', truthy: true },
			description: 'Valeur passée à l’input <code>inlineSize</code> (longueur CSS).',
			table: { category: 'story' },
		},
		responsive: {
			description:
				'Applique <code>layoutFixed</code> à partir d’un breakpoint (<code>ResponsiveConfig</code>, ex. <code>{ layoutFixedAtMediaMinS: true }</code>). Dans la story, la configuration est déclarée via <code>@let</code> puis liée à l’input.',
			table: { category: 'inputs', type: { summary: "ResponsiveConfig<'layoutFixed', true>" } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent],
		}),
	],

	render: (args) => {
		const { inlineSize, inlineSizeValue, responsive } = args;

		const text = 'cell';
		const textHeader = 'header';
		const inlineSizeAttr = inlineSize && inlineSizeValue !== '' ? ` inlineSize="${inlineSizeValue}"` : ``;

		return {
			props: { example: text },
			template: `${responsive}
<lu-data-table [responsive]="layoutfixed">
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader} ${textHeader} ${textHeader}</th>
			<th luDataTableCell${inlineSizeAttr}>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>
			<td luDataTableCell>${text}</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>
			<td luDataTableCell>${text}</td>
		</tr>
	</tbody>
</lu-data-table>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		inlineSize: false,
		inlineSizeValue: '6rem',
		responsive: `@let layoutfixed = {
	layoutFixedAtMediaMinS: true
};`,
	},
};
