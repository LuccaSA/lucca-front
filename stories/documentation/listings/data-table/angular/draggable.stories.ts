import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, input, LOCALE_ID } from '@angular/core';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { HiddenArgType } from '@/helpers/common-arg-types';

@Component({
	selector: 'data-table-draggable-stories',
	imports: [
		DataTableComponent,
		DataTableHeadComponent,
		DataTableBodyComponent,
		DataTableFootComponent,
		DataTableRowComponent,
		DataTableRowCellComponent,
		DataTableRowCellHeaderComponent,
		CdkDropList,
		CdkDrag,
		ReorderDirective,
		ReorderItemLabelDirective,
	],
	templateUrl: './draggable.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DataTableDraggableStory {
	selectable = input<boolean>(false);

	listItem: Array<{ id: number; header: string; cell: string }> = [
		{ id: 1, header: 'Header 1', cell: 'cell 1' },
		{ id: 2, header: 'Header 2', cell: 'cell 2' },
		{ id: 3, header: 'Header 3', cell: 'cell 3' },
	];

	// Remplacé par l'action Storybook déclarée dans `argTypes`, d'où le typage en fonction optionnelle.
	luReorder?: (event: ReorderEvent) => void;

	onReorder(event: ReorderEvent) {
		moveItemInArray(this.listItem, event.previousIndex, event.currentIndex);
		this.luReorder?.(event);
	}
}

export default {
	title: 'Documentation/Listings/Data table/Angular/Draggable',
	component: DataTableDraggableStory,
	decorators: [applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] })],
	argTypes: {
		selectable: {
			control: 'boolean',
			description: 'Rend les lignes du tableau sélectionnables via des checkbox.',
			table: { category: 'inputs' },
		},
		luReorder: {
			description: 'Événement déclenché lorsqu’une ligne est déplacée, à la souris, depuis le menu de sa poignée ou au clavier.',
			action: 'luReorder',
			control: false,
			table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
		},
		listItem: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<DataTableDraggableStory> = {
	name: 'Reorder',
	args: {
		selectable: false,
	},
};

const code = `<lu-data-table drag>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>Header</th>
			<th luDataTableCell>Cell</th>
		</tr>
	</thead>
	<tbody luDataTableBody cdkDropList luReorder (luReorder)="onReorder($event)">
		<tr luDataTableRow selectedLabel="selectable" draggable cdkDrag luReorderItemLabel="Header 1">
			<th luDataTableCell>Header 1</th>
			<td luDataTableCell>cell 1</td>
		</tr>
		<tr luDataTableRow selectedLabel="selectable" draggable cdkDrag luReorderItemLabel="Header 2">
			<th luDataTableCell>Header 2</th>
			<td luDataTableCell>cell 2</td>
		</tr>
	</tbody>
</lu-data-table>
`;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
