import {
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BasicStory {
	layoutFixed: boolean;
	pagination: boolean;
}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Scrollbox',
	argTypes: {
		layoutFixed: {
			description: 'Applique une largeur fixe aux colonnes et force le tableau à se compresser dans le scrollbox.',
		},
		pagination: {
			description: 'Ajoute une pagination au tableau.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				IndexTableComponent,
				IndexTableBodyComponent,
				IndexTableRowComponent,
				IndexTableRowCellComponent,
				IndexTableRowCellHeaderComponent,
				IndexTableHeadComponent,
				PaginationComponent,
				ScrollBoxComponent,
			],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	const paginationTpl = args.pagination
		? `
		<lu-pagination indexTablePagination from="1" to="20" itemsCount="27" isFirstPage />`
		: ``;
	const layoutFixedAttr = args.layoutFixed ? ` layoutFixed class="pr-u-flexShrink1"` : ``;

	return `<lu-scroll-box>
	<lu-index-table${layoutFixedAttr}>
		<thead luIndexTableHead>
			<tr luIndexTableRow>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
				<th luIndexTableCell>Label</th>
			</tr>
		</thead>
		<tbody luIndexTableBody>
			<tr luIndexTableRow>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
			</tr>
			<tr luIndexTableRow>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
			</tr>
			<tr luIndexTableRow>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
				<td luIndexTableCell>Content</td>
			</tr>
		</tbody>${paginationTpl}
	</lu-index-table>
</lu-scroll-box>
`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			lu-index-table {
				min-inline-size: 1200px;
			}
		`,
	],
});

export const Basic: StoryObj<BasicStory> = {
	args: {
		layoutFixed: false,
		pagination: false,
	},
	render: Template,
};
