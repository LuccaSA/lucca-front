import { HiddenArgType } from '@/helpers/common-arg-types';
import { setStoryOptions } from '@/helpers/stories';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import {
	INDEX_TABLE_ALIGN,
	INDEX_TABLE_SORT,
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
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Listings/Index Table/Angular/Basic',
	argTypes: {
		bob: HiddenArgType,
		empty: {
			description: 'Affiche un empty state à la place des lignes de tableau.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		layoutFixed: {
			description: 'Applique une largeur fixe aux colonnes.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		responsive: {
			control: false,
			description: 'Applique des modificateurs selon la taille de l’écran (ex. : `{ layoutFixedAtMediaMinS: true }`).',
			table: { category: 'inputs', type: { summary: "ResponsiveConfig<'layoutFixed', true>" }, defaultValue: { summary: '{}' } },
		},
		selectable: {
			description: 'Rend les lignes du tableau sélectionnables via des checkbox.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		selected: {
			name: '↳ selected',
			if: { arg: 'selectable', truthy: true },
			control: false,
			description: 'Indique si la ligne est sélectionnée. Two-way.',
			table: { category: 'models (tr[luIndexTableRow])', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		selectedLabel: {
			name: '↳ selectedLabel',
			if: { arg: 'selectable', truthy: true },
			control: false,
			description: 'Libellé de la checkbox de sélection d’une ligne. La checkbox n’est affichée que si ce libellé est renseigné.',
			table: { category: 'inputs (tr[luIndexTableRow])', type: { summary: 'string | null' }, defaultValue: { summary: 'null' } },
		},
		mixed: {
			name: '↳ mixed',
			if: { arg: 'selectable', truthy: true },
			description: "Applique un état de sélection mixte (-) à la checkbox d'une ligne.",
			table: { category: 'inputs (tr[luIndexTableRow])', defaultValue: { summary: 'false' } },
		},
		disabled: {
			name: '↳ disabled',
			if: { arg: 'selectable', truthy: true },
			description: 'Désactive la checkbox de sélection d’une ligne.',
			table: { category: 'inputs (tr[luIndexTableRow])', defaultValue: { summary: 'false' } },
		},
		action: {
			options: ['link', 'button', 'user', 'file'],
			control: {
				type: 'select',
			},
			description: '[Story] Modifie le type d’élément HTML cliquable.',
			table: { category: 'story' },
		},
		hiddenLabel: {
			description: 'Masque les cellules d’en-tête du tableau.',
			table: { category: 'inputs (th[luIndexTableCell])', defaultValue: { summary: 'false' } },
		},
		actions: {
			control: false,
			description: 'Indique que la colonne contient les actions secondaires. Son libellé est masqué visuellement.',
			table: { category: 'inputs (th[luIndexTableCell])', defaultValue: { summary: 'false' } },
		},
		inlineSize: {
			control: false,
			description: 'Largeur fixe de la colonne, à utiliser avec `layoutFixed`.',
			table: { category: 'inputs (th[luIndexTableCell])', type: { summary: 'number' }, defaultValue: { summary: '0' } },
		},
		group: {
			description: 'Regroupe des lignes de tableau en les rendant dépliables. Le contenu sert de libellé au groupe. [PortalContent]',
			table: { category: 'inputs (tbody[luIndexTableBody])', type: { summary: 'PortalContent | null' }, defaultValue: { summary: 'null' } },
		},
		expanded: {
			name: '↳ expanded',
			if: { arg: 'group', truthy: true },
			description: 'Affiche le groupe dans son état déplié. Two-way.',
			table: { category: 'models (tbody[luIndexTableBody])', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		groupButtonAlt: {
			name: '↳ groupButtonAlt',
			if: { arg: 'group', truthy: true },
			description: 'Texte restitué par le bouton du groupe.',
			table: { category: 'inputs (tbody[luIndexTableBody])', defaultValue: { summary: 'null' } },
		},
		stack: {
			control: { type: 'range', min: 1, max: 3 },
			description: 'Affiche une ligne sous la forme d’un empilement d’éléments.',
			table: { category: 'inputs (tr[luIndexTableRow])', defaultValue: { summary: '1' } },
		},
		sort: {
			options: setStoryOptions(INDEX_TABLE_SORT),
			control: {
				type: 'select',
			},
			description: 'Définit l’état de tri d’une cellule d’en-tête. Two-way.',
			table: { category: 'models (th[luIndexTableCell])', type: { summary: 'IndexTableSort | null' }, defaultValue: { summary: 'null' } },
		},
		sortWithEllipsis: {
			name: '↳ sortWithEllipsis',
			if: { arg: 'sort', truthy: true },
			description: 'Tronque le libellé du header avec une ellipsis si la colonne n’offre pas assez de largeur.',
			table: { category: 'inputs (th[luIndexTableCell])', defaultValue: { summary: 'false' } },
		},
		align: {
			options: setStoryOptions(INDEX_TABLE_ALIGN),
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules horizontalement.',
			table: { category: 'inputs (th/td[luIndexTableCell])', defaultValue: { summary: 'null' } },
		},
		allowTextSelection: {
			description: 'Permet de sélectionner le texte d’une cellule. Désactive l’action principale au clic sur la cellule.',
			table: { category: 'inputs (td[luIndexTableCell])', defaultValue: { summary: 'false' } },
		},
		allowAction: {
			description: '[Story] Permet de rendre une cellule cliquable. Désactive l’action principale au clic sur la cellule.',
			table: { category: 'story' },
		},
		tfoot: {
			description: 'Présente une ligne de tableau sous la forme d’un footer intermédiaire. Exemple : Sous-total.',
			table: { category: 'inputs (td[luIndexTableCell])', defaultValue: { summary: 'false' } },
		},
		footer: {
			description: '[Story] Présente le tableau avec un footer.',
			table: { category: 'story' },
		},
		pagination: {
			description: '[Story] Présente le tableau avec une pagination.',
			table: { category: 'story' },
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
				NumericBadgeComponent,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient()],
		}),
	],
	render: (args, { argTypes }) => {
		const {
			stack,
			selectable,
			mixed,
			disabled,
			group,
			allowAction,
			allowTextSelection,
			groupButtonAlt,
			tfoot,
			action,
			hiddenLabel,
			sort,
			sortWithEllipsis,
			align,
			expanded,
			pagination,
			layoutFixed,
			empty,
			footer,
		} = args;

		const stackParam = stack >= 2 ? ` stack="${stack}"` : ``;
		const selectableAttr = selectable ? ` selectable` : ``;
		const disabledAttr = disabled ? ` disabled` : ``;
		const mixedAttr = mixed ? ` mixed` : ``;
		const selectableParam = selectable ? ` selectedLabel="Sélectionner cette ligne"` : ``;
		const selectableAllParam = selectable ? ` selectedLabel="Sélectionner toutes les lignes"` : ``;
		const groupAttr = group ? ` [group]="samplePortalContent"` : ``;
		const allowTextSelectionAttr = allowTextSelection ? ` allowTextSelection` : ``;
		const allowActionTpl = allowAction ? `<a href="#">Content</a>` : `Content`;
		const tfootAttr = tfoot ? ` tfoot` : ``;
		const hiddenLabelAttr = hiddenLabel ? ` hiddenLabel` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
		const sortWithEllipsisAttr = sortWithEllipsis ? ` sortWithEllipsis` : ``;
		const alignAttr = align ? ` align="${align}"` : ``;
		const groupExpandedAttr = expanded && group ? ` [expanded]="true"` : ``;
		const groupButtonAltAttr = group ? ` groupButtonAlt="${groupButtonAlt}"` : ``;
		const layoutFixedAttr = layoutFixed ? ` layoutFixed` : ``;
		const emptyAttr = empty ? ` empty` : ``;
		const footerTpl = footer
			? `
	<tfoot luIndexTableFoot>
		<tr luIndexTableRow>
			<td colspan="3" luIndexTableCell>Content</td>
		</tr>
	</tfoot>`
			: ``;
		const paginationTpl = pagination
			? `
	<lu-pagination indexTablePagination from="1" to="20" itemsCount="27" isFirstPage />`
			: ``;
		let actionTpl = ``;
		switch (action) {
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
		const tbodyTpl = empty
			? `<tr luIndexTableRow>
			<th luIndexTableCell colspan="3">
				<lu-empty-state-section
					hx="3"
					illustration="magnifyingGlass"
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
		<tr luIndexTableRow${selectableParam}${disabledAttr}>
			<td luIndexTableCell colspan="3"${alignAttr}${tfootAttr}>Content</td>
		</tr>
		<tr luIndexTableRow${selectableParam}>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell${allowTextSelectionAttr}>${allowActionTpl}</td>
			<td luIndexTableCell>Content Content Content</td>
		</tr>`;
		const samplePortalContentTpl = group
			? `
<ng-template #samplePortalContent>
	Group label
	<lu-numeric-badge [value]="8" />
</ng-template>`
			: ``;

		return {
			template: `<lu-index-table${selectableAttr}${layoutFixedAttr}${emptyAttr}>
	<thead luIndexTableHead>
		<tr luIndexTableRow${selectableAllParam}${mixedAttr}>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell${hiddenLabelAttr}>Label</th>
			<th luIndexTableCell${alignAttr}${sortAttr}${sortWithEllipsisAttr}>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody${groupAttr}${groupButtonAltAttr}${groupExpandedAttr}>
		${tbodyTpl}
	</tbody>${footerTpl}${paginationTpl}
</lu-index-table>${samplePortalContentTpl}
`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		empty: false,
		layoutFixed: false,
		selectable: false,
		disabled: false,
		mixed: false,

		sort: '',
		sortWithEllipsis: false,
		align: '',
		hiddenLabel: false,

		action: 'link',
		stack: 1,

		group: false,
		groupButtonAlt: 'Afficher X lignes supplémentaires',
		expanded: false,

		allowTextSelection: false,
		allowAction: false,

		tfoot: false,
		footer: false,
		pagination: false,
	},
};
