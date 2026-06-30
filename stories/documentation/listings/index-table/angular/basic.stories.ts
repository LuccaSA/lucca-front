import { HttpClientModule, provideHttpClient } from '@angular/common/http';
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
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { setStoryOptions } from 'stories/helpers/stories';

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
		mixed: {
			if: { arg: 'selectable', truthy: true },
			description: "Applique un état de sélection mixte (-) à la checkbox d'une ligne.",
		},
		disabled: {
			if: { arg: 'selectable', truthy: true },
		},
		action: {
			options: ['link', 'button', 'user', 'file'],
			control: {
				type: 'select',
			},
			description: 'Modifie le type d’élément HTML cliquable.',
		},
		hiddenLabel: {
			description: 'Masque les cellules d’en-tête du tableau.',
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
			description: 'Affiche une ligne sous la forme d’un empilement d’éléments.',
		},
		sort: {
			options: setStoryOptions(INDEX_TABLE_SORT),
			control: {
				type: 'select',
			},
			description: 'Définit l’état de tri d’une cellule d’en-tête.',
		},
		align: {
			options: setStoryOptions(INDEX_TABLE_ALIGN),
			control: {
				type: 'select',
			},
			description: 'Aligne le contenu des cellules horizontalement.',
		},
		allowSelection: {
			description: 'Permet de sélectionner le texte d’une cellule. Désactive l’action principal au clic sur la cellule.',
		},
		allowAction: {
			description: 'Permet de rendre une cellule cliquable. Désactive l’action principal au clic sur la cellule.',
		},
		intermediateFooter: {
			description: 'Présente une ligne de tableau sous la forme d’un footer intermédiaire. Exemple : Sous-total.',
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
			allowSelection,
			groupButtonAlt,
			intermediateFooter,
			action,
			hiddenLabel,
			sort,
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
		const allowSelectionAttr = allowSelection ? ` allowTextSelection` : ``;
		const allowActionTpl = allowAction ? `<a href="#">Content</a>` : `Content`;
		const intermediateFooterAttr = intermediateFooter ? ` tfoot` : ``;
		const hiddenLabelAttr = hiddenLabel ? ` hiddenLabel` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
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
			<td luIndexTableCell colspan="3"${alignAttr}${intermediateFooterAttr}>Content</td>
		</tr>
		<tr luIndexTableRow${selectableParam}>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell${allowSelectionAttr}>${allowActionTpl}</td>
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
			<th luIndexTableCell${alignAttr}${sortAttr}>Label</th>
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
};
