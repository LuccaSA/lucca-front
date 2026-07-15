import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxIcon,
	ApprobationInboxIconsComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
	ApprobationInboxSubtleComponent,
} from '@lucca-front/ng/approbation-inbox';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/List',
	argTypes: {
		group: {
			description: 'Groupe les éléments.',
		},
		groupLabel: {
			description: 'Titre du groupe (aussi reprit dans l’intitulé masqué de sa sélection).',
			if: { arg: 'group', truthy: true },
		},
		checked: {
			description: 'Sélectionne un élément et affiche le footer de la sélection multiple.',
			if: { arg: 'selectable', truthy: true },
		},
		itemCount: {
			description: 'Nombre d’éléments affichés dans la liste.',
			control: { type: 'range', min: 0, max: 5 },
		},
		emptyIllustration: {
			description: 'Illustration affichée lorsque la liste est vide.',
			options: ['', 'awardRibbon'],
			control: {
				type: 'select',
			},
			if: { arg: 'itemCount', eq: 0 },
		},
		emptyLabel: {
			description: 'Texte affiché lorsque la liste est vide.',
			if: { arg: 'itemCount', eq: 0 },
		},
		emptyResetLabel: {
			description: 'Texte du bouton de réinitialisation des filtres affiché lorsque la liste est vide.',
			if: { arg: 'itemCount', eq: 0 },
		},
		label: {
			description: 'Titre de la liste.',
		},
		button: {
			description: 'Exemple d’élément qui ne serait pas géré via un lien.',
		},
		current: {
			description: 'Définit le lien (ou le bouton) comme l’élément courant affiché.',
		},
		filterBar: {
			description: 'Exemple de barre de filtres.',
		},
		selectable: {
			description: 'Active la sélection multiple',
		},
		data: {
			description: 'Exemple de données complémentaires.',
		},
		illustration: {
			description: 'Affiche un exemple d’illustration au début d’un élément.',
		},
		itemLabel: {
			description: 'Titre de l’élément (aussi reprit dans l’intitulé masqué de sa sélection).',
		},
		center: {
			description: 'Centre verticalement les données d’un élément',
		},
		icons: {
			description: 'Icônes affichées dans les données complémentaires.',
			control: { type: 'object' },
			if: { arg: 'data', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				ApprobationInboxListComponent,
				ApprobationInboxItemComponent,
				ApprobationInboxLinkComponent,
				ApprobationInboxButtonComponent,
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
				LuUserPictureComponent,
				IconComponent,
				LuTooltipTriggerDirective,
				ButtonComponent,
			],
		}),
	],
	render: ({ filterBar, group, groupLabel, button, illustration, data, center, checked, itemCount, itemLabel, current, icons, ...args }, { argTypes }) => {
		const centerParam = center ? ` center` : ``;
		const checkedParam = checked ? ` [checked]="true"` : ``;
		const currentParam = current ? ` current` : ``;
		const startTpl = illustration
			? `
			<lu-user-picture approbationInboxListItemIllustration />`
			: ``;
		const endTpl = data
			? `
			<ng-container approbationInboxListItemData>
				<lu-approbation-inbox-list-icons [icons]="icons" />
				Data
				<lu-approbation-inbox-list-subtle>Data</lu-approbation-inbox-list-subtle>
			</ng-container>`
			: ``;
		const actionTpl = button
			? `<button type="button"${currentParam} lu-approbation-inbox-list-action approbationInboxListItemTitle>${itemLabel}</button>`
			: `<a href="#"${currentParam} lu-approbation-inbox-list-action approbationInboxListItemTitle>${itemLabel}</a>`;
		const centerTpl = `
			${actionTpl}
			Metadata`;
		const defaultItemTpl = `
		<lu-approbation-inbox-list-item>
			<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>Title</a>
		</lu-approbation-inbox-list-item>`;
		const itemTpl =
			itemCount != 0
				? `<lu-approbation-inbox-list-item${centerParam}${checkedParam}>${startTpl}${centerTpl}${endTpl}
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
		const footerTpl = args['selectable']
			? ``
			: ``;
		return {
			props: {
				icons,
			},
			template: `<lu-approbation-inbox-list${generateInputs(args, argTypes)}>${filterBarTpl}${groupTpl}${footerTpl}</lu-approbation-inbox-list>`,
		};
	},
} as Meta;

export const Basic: StoryObj<
	ApprobationInboxListComponent & {
		filterBar: boolean;
		group: false;
		groupLabel: string;
		button: boolean;
		current: boolean;
		illustration: boolean;
		data: boolean;
		center: boolean;
		checked: boolean;
		itemCount: number;
		itemLabel: string;
		icons: ApprobationInboxIcon[];
	}
> = {
	args: {
		label: 'Lorem ipsum',
		filterBar: false,
		selectable: false,
		checked: false,
		group: false,
		groupLabel: 'Group',
		button: false,
		current: false,
		itemLabel: 'Title',
		illustration: false,
		data: false,
		icons: [
			{ icon: 'formatClipperAttachment', alt: 'Contient une pièce jointe' },
			{ icon: 'bubbleSpeech', alt: 'Contient un commentaire' },
			{ icon: 'signWarning', alt: 'Contient un avertissement', state: 'warning' },
		],
		center: false,
		itemCount: 1,
		emptyIllustration: '',
		emptyLabel: 'Votre recherche ne donne aucun résultat.',
		emptyResetLabel: 'Réinitialiser les filtres',
	},
};
