import { IndexTableComponent, IndexTableHeadComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent } from '@lucca-front/ng/index-table';
import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SkeletonIndexTableStory {}

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton IndexTable',
	decorators: [
		moduleMetadata({
			imports: [SkeletonIndexTableComponent, IndexTableComponent, IndexTableHeadComponent, IndexTableRowComponent, IndexTableRowCellHeaderComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: SkeletonIndexTableStory): string {
	return `<lu-index-table inert="inert">
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell align="center">Label</th>
			<th luIndexTableCell align="end">Label</th>
		</tr>
	</thead>
	<lu-skeleton-index-table tableBodyOnly [cols]="3" [rows]="8" [colsAlign]="{ '1': 'center', '2': 'end' }" />
</lu-index-table>`;
}

const Template = (args: SkeletonIndexTableStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		th:first-child {
			inline-size: 15rem;
		}
	`,
	],
});

export const TableBodyOnly: StoryObj<SkeletonIndexTableStory> = {
	args: {},
	render: Template,
};
