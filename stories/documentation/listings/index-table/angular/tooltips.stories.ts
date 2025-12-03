import { bob } from '@/stories/users/user.mocks';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
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
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Tooltips',
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
				IndexTableBodyComponent,
				LuTooltipModule,
				ButtonComponent,
				IconComponent,
			],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<lu-index-table layoutFixed>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Action</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell actions>Secondary action</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow #line1>
			<th luIndexTableCell>
				<a href="#" luIndexTableAction class="pr-u-ellipsis" luTooltip="Primary action" [luTooltipAnchor]="line1">
					Tooltip for the row <code class="code">a</code>
				</a>
			</th>
			<td luIndexTableCell>
				<div
					class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall"
					luTooltip luTooltipWhenEllipsis
				>
					Tooltip when ellipsis
				</div>
			</td>
			<td luIndexTableCell selectable>
				Selectable
			</td>
			<td luIndexTableCell>
			  <div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td luIndexTableCell>
			 Content
			</td>
			<td luIndexTableCell align="end">
				<button luButton luTooltip="Secondary action" luTooltipOnlyForDisplay type="button" class="indexTable-body-row-cell-subAction">
					<lu-icon icon="trashDelete" alt="Supprimer" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>
`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { bob };
