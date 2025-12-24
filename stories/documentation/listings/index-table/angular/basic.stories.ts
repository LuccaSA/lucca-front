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
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {
	action: string;
	pagination: boolean;
	selectable: boolean;
	stack: number;
	group: boolean;
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
		empty: {
			description: 'Affiche un empty state à la place des lignes de tableau.',
		},
		layoutFixed: {
			description: 'Applique une largeur fixe aux colonnes.',
		},
		selectable: {
			description: 'Rend les lignes du tableau sélectionnables via des checkbox.',
		},
		action: {
			options: ['link', 'button', 'user', 'file'],
			control: {
				type: 'select',
			},
			description: "Modifie le type d'élément HTML cliquable.",
		},
		hiddenLabel: {
			description: "Masque les cellules d'en-tête du tableau.",
		},
		expanded: {
			if: { arg: 'group', truthy: true },
			description: 'Affiche le groupe dans son état déplié.',
		},
		group: {
			description: 'Regroupe des lignes de tableau en les rendant dépliables.',
		},
		groupButtonAlt: {
			if: { arg: 'group', truthy: true },
			description: 'Texte restitué par le bouton du groupe.',
		},
		stack: {
			control: { type: 'range', min: 1, max: 3 },
			description: "Affiche une ligne sous la forme d'un empilement d'éléments.",
		},
		sort: {
			options: ['', 'none', 'ascending', 'descending'],
			control: {
				type: 'select',
			},
			description: "Définit l'état de tri d'une cellule d'en-tête.",
		},
		align: {
			options: ['', 'start', 'center', 'end'],
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules horizontalement.',
		},
		allowSelection: {
			description: "Permet de sélectionner le texte d'une cellule. Désactive l'action principal au clic sur la cellule.",
		},
		allowAction: {
			description: "Permet de rendre une cellule cliquable. Désactive l'action principal au clic sur la cellule.",
		},
		intermediateFooter: {
			description: "Présente une ligne de tableau sous la forme d'un footer intermédiaire. Exemple : Sous-total.",
		},
		footer: {
			description: 'Présente le tableau avec un footer.',
		},
		pagination: {
			description: 'Présente le tableau avec une pagination.',
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
				NumericBadgeComponent,
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
	const groupAttr = args.group ? ` [group]="samplePortalContent"` : ``;
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
			<td luIndexTableCell>Content</td>
		</tr>
		<tr luIndexTableRow${selectableParam}>
			<td luIndexTableCell colspan="3"${alignAttr}${intermediateFooterAttr}>Content</td>
		</tr>
		<tr luIndexTableRow${selectableParam}>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell${allowSelectionAttr}>${allowActionTpl}</td>
			<td luIndexTableCell>Content Content Content</td>
		</tr>`;
	const samplePortalContentTpl = args.group
		? `
<ng-template #samplePortalContent>
	Group label
	<lu-numeric-badge [value]="8" />
</ng-template>`
		: ``;

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
</lu-index-table>${samplePortalContentTpl}
`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {
		empty: false,
		layoutFixed: false,
		selectable: false,

		sort: '',
		align: '',
		hiddenLabel: false,

		action: 'link',
		stack: 1,

		group: false,
		groupButtonAlt: 'Afficher X lignes supplémentaires',
		expanded: false,

		allowSelection: false,
		allowAction: false,

		intermediateFooter: false,
		footer: false,
		pagination: false,
	},
	render: Template,
};
