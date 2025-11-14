import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	IndexTableActionComponent,
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableFootComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { IndexTableActionInputComponent } from 'packages/ng/index-table/index-table-action-file/index-table-action.component';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Basic',
	argTypes: {
		bob: HiddenArgType,
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
				IndexTableFootComponent,
				IndexTableActionComponent,
				IndexTableActionInputComponent,
				PaginationComponent,
				ButtonComponent,
				LuUserDisplayModule,
				LuUserPopoverComponent,
				LuUserPopoverDirective,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideLuUserPopover(), provideHttpClient()],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	return `@let layoutfixed = {
    layoutFixedAtMediaMinS: true
};
<lu-index-table selectable [responsive]="layoutfixed">
	<thead luIndexTableHead>
		<tr luIndexTableRow selectedLabel="Sélectionner toutes les lignes">
			<th luIndexTableCell sort="null">Label</th>
			<th luIndexTableCell hiddenLabel>Label</th>
			<th luIndexTableCell align="end" sort="descending">Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody groupButtonAlt="Afficher 7 lignes supplémentaires" group="Group label" [expanded]="true">
		<tr luIndexTableRow selectedLabel="Sélectionner cette ligne">
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">Content</td>
		</tr>
		<tr luIndexTableRow selectedLabel="Sélectionner cette ligne">
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell allowTextSelection>Content selectable</td>
			<td luIndexTableCell align="end"><a href="#">Content actionnable</a></td>
		</tr>
		<tr luIndexTableRow selectedLabel="Sélectionner cette ligne">
			<th luIndexTableCell>
				<button luIndexTableAction type="button">
					<span class="pr-u-mask">{{ bob | luUserDisplay:'lf' }}</span>
				</button>
				<button class="userPopover_trigger" [luUserPopover]="bob">
					Content <code class="code">luUserPopover</code>
				</button>
			</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">Content</td>
		</tr>
		<tr luIndexTableRow>
			<td luIndexTableCell tfoot colspan="3" align="end">Content</td>
		</tr>
		<tr luIndexTableRow selectedLabel="Sélectionner cette ligne" stack="3">
			<th luIndexTableCell>Content</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end"><a href="#" luIndexTableAction>Content <code class="code">a</code></a></td>
		</tr>
		<tr luIndexTableRow selectedLabel="Sélectionner cette ligne" stack="2">
			<th luIndexTableCell><button type="button" luIndexTableAction>Content <code class="code">button</code></button></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">Content</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<label luIndexTableAction for="myInput">Content <code class="code">input file</code></label>
				<input luIndexTableAction id="myInput" type="file" accept=".pdf, .jpg, .jpeg, .png" />
			</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">Content</td>
		</tr>
	</tbody>
	<tfoot luIndexTableFoot>
		<tr luIndexTableRow>
			<td colspan="3" luIndexTableCell>Content</td>
		</tr>
	</tfoot>
	<lu-pagination indexTablePagination from="1" to="20" itemsCount="27" isFirstPage />
</lu-index-table>
`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { bob };
