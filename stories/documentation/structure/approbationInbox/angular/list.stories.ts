import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxDetailComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxIcon,
	ApprobationInboxIconsComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
	ApprobationInboxSubtleComponent,
	luApprobationInboxListGroupTranslations,
	luApprobationInboxListItemTranslations,
	luApprobationInboxListTranslations,
} from '@lucca-front/ng/approbation-inbox';
import { BUBBLE_ILLUSTRATION } from '@lucca-front/ng/bubble-illustration';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/List',
	argTypes: {
		label: {
			description: 'Titre de la liste. Par défaut, le libellé traduit « Demandes à approuver ». [PortalContent]',
			control: { type: 'text' },
			table: { category: 'inputs' },
		},
		detailsComponent: {
			description: 'Référence du composant <code>lu-approbation-inbox-detail</code> associé, affiché dans une modale lorsqu’un élément est ouvert sous le breakpoint M. Requis.',
			control: false,
			table: { category: 'inputs', type: { summary: 'ApprobationInboxDetailComponent' } },
		},
		selectable: {
			description: 'Active la sélection multiple',
			table: { category: 'inputs' },
		},
		selected: {
			name: '↳ selected',
			description: 'Sélectionne un élément (via son model <code>checked</code>) et affiche le footer de la sélection multiple.',
			if: { arg: 'selectable', truthy: true },
			table: { category: 'story' },
		},
		itemCount: {
			description: 'Nombre d’éléments affichés dans la liste.',
			control: { type: 'range', min: 0, max: 5 },
			table: { category: 'story' },
		},
		emptyIllustration: {
			name: '↳ emptyIllustration',
			description: 'Illustration affichée lorsque la liste est vide.',
			options: setStoryOptions(BUBBLE_ILLUSTRATION),
			control: {
				type: 'select',
			},
			if: { arg: 'itemCount', eq: 0 },
			table: { category: 'inputs', defaultValue: { summary: 'magnifyingGlass' } },
		},
		emptyResetButton: {
			name: '↳ emptyResetButton',
			description: 'Affiche un bouton de réinitialisation lorsque la liste est vide.',
			if: { arg: 'itemCount', eq: 0 },
			table: { category: 'inputs' },
		},
		submitEvent: {
			description: 'Événement déclenché à la soumission du formulaire de sélection multiple.',
			action: 'submitEvent',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		resetEvent: {
			description: 'Événement déclenché à la réinitialisation du formulaire de sélection multiple.',
			action: 'resetEvent',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		forwardEvent: {
			description: 'Événement déclenché par le bouton de transfert du footer de la sélection multiple.',
			action: 'forwardEvent',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		filterBar: {
			description: 'Exemple de barre de filtres.',
			table: { category: 'story' },
		},
		group: {
			description: 'Groupe les éléments.',
			table: { category: 'story' },
		},
		groupLabel: {
			name: '↳ label',
			description: 'Titre du groupe (aussi repris dans l’intitulé masqué de sa sélection). Requis.',
			if: { arg: 'group', truthy: true },
			table: { category: 'inputs (approbation-inbox-list-group)' },
		},
		expanded: {
			name: '↳ expanded',
			description: 'Déplie le groupe. Two-way.',
			control: false,
			if: { arg: 'group', truthy: true },
			table: { category: 'models (approbation-inbox-list-group)', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
		},
		itemLabel: {
			description: 'Titre de l’élément (aussi repris dans l’intitulé masqué de sa sélection).',
			table: { category: 'story' },
		},
		visual: {
			description: 'Affiche un exemple de visuel au début d’un élément.',
			table: { category: 'story' },
		},
		rightContent: {
			description: 'Exemple de données complémentaires.',
			table: { category: 'story' },
		},
		center: {
			description: 'Centre verticalement les données d’un élément',
			table: { category: 'inputs (approbation-inbox-list-item)' },
		},
		checked: {
			description: 'Sélectionne l’élément lorsque la liste est <code>selectable</code>. Two-way.',
			control: false,
			table: { category: 'models (approbation-inbox-list-item)', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		current: {
			description: 'Définit le lien (ou le bouton) comme l’élément courant affiché.',
			table: { category: 'inputs (approbation-inbox-list-action)' },
		},
		icons: {
			name: '↳ icons',
			description: 'Icônes affichées dans les données complémentaires.',
			control: { type: 'object' },
			if: { arg: 'rightContent', truthy: true },
			table: { category: 'inputs (approbation-inbox-list-icons)' },
		},
		intl: intlArgType(luApprobationInboxListTranslations, 'LuApprobationInboxListTranslations'),
		intlListGroup: intlArgType(luApprobationInboxListGroupTranslations, 'LuApprobationInboxListGroupTranslations', 'lu-approbation-inbox-list-group'),
		intlListItem: intlArgType(luApprobationInboxListItemTranslations, 'LuApprobationInboxListItemTranslations', 'lu-approbation-inbox-list-item'),
	},
	decorators: [
		moduleMetadata({
			imports: [
				ApprobationInboxListComponent,
				ApprobationInboxDetailComponent,
				ApprobationInboxItemComponent,
				ApprobationInboxLinkComponent,
				ApprobationInboxGroupComponent,
				ApprobationInboxIconsComponent,
				ApprobationInboxSubtleComponent,
				FilterBarComponent,
				FilterPillAddonAfterDirective,
				FilterPillAddonBeforeDirective,
				FilterPillComponent,
				SegmentedControlComponent,
				SegmentedControlFilterComponent,
				NumericBadgeComponent,
				FormsModule,
				CheckboxInputComponent,
				LuUserPictureComponent,
				IconComponent,
				LuTooltipTriggerDirective,
				ButtonComponent,
			],
		}),
	],
	render: ({ filterBar, group, groupLabel, visual, rightContent, center, selected, itemCount, itemLabel, current, icons, submitEvent, resetEvent, forwardEvent, ...args }, { argTypes }) => {
		const centerParam = center ? ` center` : ``;
		const selectedParam = selected ? ` [checked]="true"` : ``;
		const currentParam = current ? ` current` : ``;
		const startTpl = visual
			? `
			<lu-user-picture approbationInboxListItemVisual />`
			: ``;
		const endTpl = rightContent
			? `
			<ng-container approbationInboxListItemRightContent>
				<lu-approbation-inbox-list-icons [icons]="icons" />
				Data
				<lu-approbation-inbox-list-subtle>Data</lu-approbation-inbox-list-subtle>
			</ng-container>`
			: ``;
		const actionTpl = `<a href="#"${currentParam} lu-approbation-inbox-list-action approbationInboxListItemTitle>${itemLabel}</a>`;
		const centerTpl = `
			${actionTpl}
			Metadata`;
		const defaultItemTpl = `
		<lu-approbation-inbox-list-item>
			<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>Title</a>
		</lu-approbation-inbox-list-item>`;
		const itemTpl =
			itemCount != 0
				? `<lu-approbation-inbox-list-item${centerParam}${selectedParam}>${startTpl}${centerTpl}${endTpl}
		</lu-approbation-inbox-list-item>`
				: ``;
		const filterBarTpl = filterBar
			? `
	<lu-filter-bar approbationInboxListFilterBar>
		<lu-segmented-control *luFilterPillAddonBefore [(ngModel)]="example">
			<ng-template #label0>Par vous <lu-numeric-badge [value]="12" /></ng-template>
			<ng-template #label1>Par d’autres <lu-numeric-badge [value]="5" /></ng-template>
			<lu-segmented-control-filter [label]="label0" value="0" />
			<lu-segmented-control-filter [label]="label1" value="1" />
		</lu-segmented-control>
		<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
			<lu-checkbox-input [ngModel]="false" />
		</lu-filter-pill>
	</lu-filter-bar>`
			: ``;
		const itemsTpl = `
		${itemTpl}${defaultItemTpl.repeat(itemCount - 1 < 0 ? 0 : itemCount - 1)}
	`;
		const groupTpl = group
			? `
	<lu-approbation-inbox-list-group label="${groupLabel}">${itemsTpl}</lu-approbation-inbox-list-group>
`
			: `${itemsTpl}`;
		return {
			props: {
				icons,
				example: '0',
				submitEvent,
				resetEvent,
				forwardEvent,
			},
			template: `<lu-approbation-inbox-list${generateInputs(args, argTypes)} [detailsComponent]="detailRef" (submitEvent)="submitEvent($event)" (resetEvent)="resetEvent($event)" (forwardEvent)="forwardEvent($event)">${filterBarTpl}${groupTpl}</lu-approbation-inbox-list>
<lu-approbation-inbox-detail #detailRef />`,
		};
	},
} as Meta;

export const Basic: StoryObj<
	ApprobationInboxListComponent & {
		filterBar: boolean;
		group: false;
		groupLabel: string;
		current: boolean;
		visual: boolean;
		rightContent: boolean;
		center: boolean;
		selected: boolean;
		itemCount: number;
		itemLabel: string;
		icons: ApprobationInboxIcon[];
	}
> = {
	args: {
		filterBar: false,
		selectable: false,
		selected: false,
		group: false,
		groupLabel: 'Group',
		current: false,
		itemLabel: 'Title',
		visual: false,
		rightContent: false,
		icons: [
			{ icon: 'formatClipperAttachment', alt: 'Contient une pièce jointe' },
			{ icon: 'bubbleSpeech', alt: 'Contient un commentaire' },
			{ icon: 'signWarning', alt: 'Contient un avertissement', state: 'warning' },
		],
		center: false,
		itemCount: 1,
		emptyIllustration: 'magnifyingGlass',
		emptyResetButton: false,
	},
};
