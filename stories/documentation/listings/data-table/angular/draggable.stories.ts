import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Listings/Data table/Angular/Draggable',
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
				CdkDrag,
				CdkDropList,
			],
		}),
	],
	render: (args) => {
		const lines = [
			{ text: 'cell #1', header: 'header #1' },
			{ text: 'cell #2', header: 'header #2' },
			{ text: 'cell #3', header: 'header #3' },
			{ text: 'cell #4', header: 'header #4' },
		];

		function drop(event: CdkDragDrop<string[]>, tpLines) {
			moveItemInArray(tpLines, event.previousIndex, event.currentIndex);
		}
		return {
			props: {
				...args,
				drop,
				lines,
			},
			template: `<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>Header</th>
			<th luDataTableCell>Cell</th>
		</tr>
	</thead>
	<tbody luDataTableBody cdkDropList (cdkDropListDropped)="drop($event, lines)">
		${lines
			.map(
				(line) =>
					`<tr luDataTableRow cdkDrag>
				<th luDataTableCell>${line.header}</th>
				<td luDataTableCell>${line.text}</td>
			</tr>`,
			)
			.join('')}
	</tbody>
</lu-data-table>`,
		};
	},
} as Meta;

export const Draggable: StoryObj = {};
