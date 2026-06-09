import { AsyncPipe } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';
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
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { timer } from 'rxjs';

export default {
	title: 'Documentation/Actions/Link/Angular/Inside table',
	decorators: [
		moduleMetadata({
			imports: [
				LinkComponent,
				RouterLink,
				AsyncPipe,
				DataTableComponent,
				DataTableHeadComponent,
				DataTableRowCellComponent,
				DataTableBodyComponent,
				DataTableRowComponent,
				DataTableRowCellHeaderComponent,
				IndexTableComponent,
				IndexTableHeadComponent,
				IndexTableBodyComponent,
				IndexTableRowCellComponent,
				IndexTableRowCellHeaderComponent,
				IndexTableRowComponent,
				IndexTableActionComponent,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],

	render: (args) => {
		return {
			props: {
				tick$: timer(0, 1000),
			},
			template: `<lu-data-table>
    <thead luDataTableHead>
        <tr luDataTableRow>
            <th luDataTableCell>header</th>
            <th luDataTableCell>header</th>
						<th luDataTableCell>header</th>
        </tr>
    </thead>
    <tbody luDataTableBody>
        <tr luDataTableRow>
				<tr luDataTableRow>
						<th luDataTableCell>header</th>
            <td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
            <td luDataTableCell>cell</td>
        </tr>
        <tr luDataTableRow>
						<th luDataTableCell>header</th>
            <td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
            <td luDataTableCell>cell</td>
        </tr>
    </tbody>
</lu-data-table><br />
<lu-index-table>
    <thead luIndexTableHead>
        <tr luIndexTableRow>
            <th luIndexTableCell>header</th>
            <th luIndexTableCell>header</th>
            <th luIndexTableCell>header</th>
        </tr>
    </thead>
    <tbody luIndexTableBody>
        <tr luIndexTableRow>
            <th luIndexTableCell>
                <a luIndexTableAction href="#">header</a>
            </th>
            <td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
            <td luIndexTableCell>cell</td>
        </tr>
        <tr luIndexTableRow>
            <th luIndexTableCell>
                <a luIndexTableAction href="#">header</a>
            </th>
            <td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
            <td luIndexTableCell>cell</td>
        </tr>
    </tbody>
</lu-index-table>
			`,
		};
	},
	argTypes: {},
} as Meta;

export const Basic: StoryObj = {
	args: {},
};
