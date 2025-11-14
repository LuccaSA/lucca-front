import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
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
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Actions',
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
				PaginationComponent,
				ButtonComponent,
				LuUserDisplayModule,
				LuUserPopoverComponent,
				LuUserPopoverDirective,
				IconComponent,
				LuDropdownTriggerDirective,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
				DropdownGroupComponent,
				LuTooltipModule,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideLuUserPopover(), provideHttpClient()],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell actions>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">
				<button type="button" luButton [luDropdown]="dropdownSample">
					<lu-icon icon="ellipsis" alt="Plus d’options" />
				</button>
			</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>
				<button type="button" luButton luTooltip="Supprimer" luTooltipOnlyForDisplay>
					<lu-icon icon="trash" alt="Supprimer" />
				</button>
				<button type="button" luButton luTooltip="Modifier" luTooltipOnlyForDisplay>
					<lu-icon icon="officePen" alt="Modifier" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>

<lu-index-table layoutFixed>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell actions size="4.5">Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">
				<button type="button" luButton [luDropdown]="dropdownSample">
					<lu-icon icon="ellipsis" alt="Plus d’options" />
				</button>
			</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content <code class="code">a</code></a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>
				<button type="button" luButton luTooltip="Supprimer" luTooltipOnlyForDisplay>
					<lu-icon icon="trash" alt="Supprimer" />
				</button>
				<button type="button" luButton luTooltip="Modifier" luTooltipOnlyForDisplay>
					<lu-icon icon="officePen" alt="Modifier" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>

<ng-template #dropdownSample>
	<lu-dropdown-menu>
		<lu-dropdown-item>
			<button type="button" lu-dropdown-action>
			<lu-icon icon="trash" />
			Supprimer
		</button>
		</lu-dropdown-item>
		<lu-dropdown-item>
			<button type="button" lu-dropdown-action>
			<lu-icon icon="officePen" />
			Modifier
		</button>
		</lu-dropdown-item>
	</lu-dropdown-menu>
</ng-template>
`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.indexTableWrapper + .indexTableWrapper {
			margin-block-start: var(--pr-t-spacings-200);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = { bob };
