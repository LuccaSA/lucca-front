import { bob } from '@/stories/users/user.mocks';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import {
	IndexTableActionComponent,
	IndexTableActionFileComponent,
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
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {
	action: string;
	pagination: boolean;
	selectable: boolean;
	stack: number;
	group: boolean;
	groupLabel: string;
	groupButtonAlt: string;
	expanded: boolean;
	footer: boolean;
	intermediateFooter: boolean;
	allowSelection: boolean;
	allowAction: boolean;
	hiddenLabel: boolean;
	sort: string;
	align: string;
	layoutFixed: boolean;
	empty: boolean;
}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Basic',
	argTypes: {
		bob: HiddenArgType,
		action: {
			options: ['link', 'button', 'user', 'file'],
			control: {
				type: 'select',
			},
		},
		expanded: {
			if: { arg: 'group', truthy: true },
		},
		groupLabel: {
			if: { arg: 'group', truthy: true },
		},
		groupButtonAlt: {
			if: { arg: 'group', truthy: true },
		},
		stack: {
			control: { type: 'range', min: 1, max: 3 },
		},
		sort: {
			options: ['', 'null', 'ascending', 'descending'],
			control: {
				type: 'select',
			},
		},
		align: {
			options: ['', 'start', 'center', 'end'],
			control: {
				type: 'select',
			},
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
				IndexTableFootComponent,
				IndexTableActionComponent,
				IndexTableActionFileComponent,
				PaginationComponent,
				ButtonComponent,
				LuUserDisplayModule,
				LuUserPopoverComponent,
				LuUserPopoverDirective,
				EmptyStateSectionComponent,
				HttpClientModule,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideLuUserPopover(), provideHttpClient()],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	const stackParam = args.stack >= 2 ? ` stack="${args.stack}"` : ``;
	const selectableAttr = args.selectable ? ` selectable` : ``;
	const selectableParam = args.selectable ? ` selectedLabel="Sélectionner cette ligne"` : ``;
	const selectableAllParam = args.selectable ? ` selectedLabel="Sélectionner toutes les lignes"` : ``;
	const groupAttr = args.group ? ` group="${args.groupLabel}"` : ``;
	const allowSelectionAttr = args.allowSelection ? ` allowTextSelection` : ``;
	const allowActionTpl = args.allowAction ? `<a href="#">Content</a>` : `Content`;
	const intermediateFooterAttr = args.intermediateFooter ? ` tfoot` : ``;
	const hiddenLabelAttr = args.hiddenLabel ? ` hiddenLabel` : ``;
	const sortAttr = args.sort ? ` sort="${args.sort}"` : ``;
	const alignAttr = args.align ? ` align="${args.align}"` : ``;
	const groupExpandedAttr = args.expanded && args.group ? ` [expanded]="true"` : ``;
	const groupButtonAltAttr = args.group ? ` groupButtonAlt="${args.groupButtonAlt}"` : ``;
	const layoutFixedAttr = args.layoutFixed ? ` layoutFixed` : ``;
	const emptyAttr = args.empty ? ` empty` : ``;
	const footerTpl = args.footer
		? `
	<tfoot luIndexTableFoot>
		<tr luIndexTableRow>
			<td colspan="3" luIndexTableCell>Content</td>
		</tr>
	</tfoot>`
		: ``;
	const paginationTpl = args.pagination
		? `
	<lu-pagination indexTablePagination from="1" to="20" itemsCount="27" isFirstPage />`
		: ``;
	let actionTpl = ``;
	switch (args.action) {
		case 'button':
			actionTpl = `
				<button luIndexTableAction type="button">button</button>
			`;
			break;
		case 'user':
			actionTpl = `
				<button luIndexTableAction type="button" class="pr-u-mask">{{ bob | luUserDisplay:'lf' }}</button>
				<button class="userPopover_trigger" [luUserPopover]="bob">user</button>
			`;
			break;
		case 'file':
			actionTpl = `
				<label luIndexTableAction for="myInput">file</label>
				<input luIndexTableAction id="myInput" type="file" />
			`;
			break;
		default:
			actionTpl = `
				<a luIndexTableAction href="#">link</a>
			`;
	}
	const tbodyTpl = args.empty
		? `<tr luIndexTableRow>
			<th luIndexTableCell colspan="3">
				<lu-empty-state-section
					hx="3"
					icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconSearch.svg"
					heading="Empty State"
					description="Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus."
				/>
			</th>
		</tr>`
		: `<tr luIndexTableRow${selectableParam}${stackParam}>
			<th luIndexTableCell>${actionTpl}</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell${alignAttr}>Content</td>
		</tr>
		<tr luIndexTableRow>
			<td luIndexTableCell colspan="3"${alignAttr}${intermediateFooterAttr}>Content</td>
		</tr>
		<tr luIndexTableRow${selectableParam}>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell${allowSelectionAttr}>${allowActionTpl}</td>
			<td luIndexTableCell${alignAttr}>Content Content Content</td>
		</tr>`;

	return `<lu-index-table${selectableAttr}${layoutFixedAttr}${emptyAttr}>
	<thead luIndexTableHead>
		<tr luIndexTableRow${selectableAllParam}>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell${hiddenLabelAttr}>Label</th>
			<th luIndexTableCell${alignAttr}${sortAttr}>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody${groupAttr}${groupButtonAltAttr}${groupExpandedAttr}>
		${tbodyTpl}
	</tbody>${footerTpl}${paginationTpl}
</lu-index-table>
`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	bob,
	empty: false,
	layoutFixed: false,
	selectable: false,

	sort: '',
	align: '',
	hiddenLabel: false,

	action: 'link',
	stack: 1,

	group: false,
	groupLabel: 'Group label',
	groupButtonAlt: 'Afficher X lignes supplémentaires',
	expanded: false,

	allowSelection: false,
	allowAction: false,

	intermediateFooter: false,
	footer: false,
	pagination: false,
};
