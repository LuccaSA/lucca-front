import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/List',
	// TODO inbox
	argTypes: {
		group: {
			description: '',
		},
		groupLabel: {
			description: '',
			if: { arg: 'group', truthy: true },
		},
		checked: {
			description: '',
			if: { arg: 'selectable', truthy: true },
		},
		itemCount: {
			description: '',
			control: { type: 'range', min: 0, max: 5 },
		},
		emptyIllustration: {
			description: '',
			options: ['', 'awardRibbon'],
			control: {
				type: 'select',
			},
			if: { arg: 'itemCount', eq: 0 },
		},
		emptyLabel: {
			description: '',
			if: { arg: 'itemCount', eq: 0 },
		},
		emptyResetLabel: {
			description: '',
			if: { arg: 'itemCount', eq: 0 },
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
			],
		}),
	],
	render: ({ filterBar, group, groupLabel, button, start, end, center, checked, itemCount, itemLabel, current, ...args }, { argTypes }) => {
		const centerParam = center ? ` center` : ``;
		const checkedParam = checked ? ` [checked]="true"` : ``;
		const currentParam = current ? ` current` : ``;
		const startTpl = start
			? `
			<lu-user-picture approbationInboxListItemStart />`
			: ``;
		const endTpl = end
			? `
			<ng-container approbationInboxListItemEnd>
				<p class="pr-u-bodyM">Metadata</p>
				<p class="pr-u-displayFlex pr-u-colorTextSubtle pr-u-gap25">
					<lu-icon size="XS" class="pr-u-focusVisible pr-u-borderRadiusSmall" icon="formatClipperAttachment" alt="Contient une pièce jointe" luTooltip="Contient une pièce jointe" luTooltipOnlyForDisplay />
					<lu-icon size="XS" class="pr-u-focusVisible pr-u-borderRadiusSmall" icon="bubbleSpeech" alt="Contient un commentaire" luTooltip="Contient un commentaire" luTooltipOnlyForDisplay />
					<lu-icon size="XS" class="pr-u-focusVisible pr-u-borderRadiusSmall pr-u-textWarning" icon="signWarning" alt="Contient un avertissement" luTooltip="Contient un avertissement" luTooltipOnlyForDisplay />
				</p>
			</ng-container>`
			: ``;
		const actionTpl = button
			? `<button type="button"${currentParam} lu-approbation-inbox-action approbationInboxListItemTitle>${itemLabel}</button>`
			: `<a href="#"${currentParam} lu-approbation-inbox-action approbationInboxListItemTitle>${itemLabel}</a>`;
		const centerTpl = `
			${actionTpl}
			<p class="pr-u-bodyS pr-u-colorTextSubtle">Metadata</p>`;
		const defaultItemTpl = `
		<lu-approbation-inbox-item>
			<a href="#" lu-approbation-inbox-action approbationInboxListItemTitle>Title</a>
		</lu-approbation-inbox-item>`;
		const itemTpl =
			itemCount != 0
				? `<lu-approbation-inbox-item${centerParam}${checkedParam}>${startTpl}${centerTpl}${endTpl}
		</lu-approbation-inbox-item>`
				: ``;
		const filterBarTpl = filterBar
			? `
	<lu-filter-bar approbationInboxListFilterBar>
		<lu-segmented-control class="filterBar-segmentedControl" *luFilterPillAddonBefore [(ngModel)]="example">
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
	<lu-approbation-inbox-group label="${groupLabel}">${itemsTpl}</lu-approbation-inbox-group>
`
			: `${itemsTpl}`;
		return {
			template: `<lu-approbation-inbox-list${generateInputs(args, argTypes)}>${filterBarTpl}${groupTpl}</lu-approbation-inbox-list>`,
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
		start: boolean;
		end: boolean;
		center: boolean;
		checked: boolean;
		itemCount: number;
		itemLabel: string;
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
		start: false,
		end: false,
		center: false,
		itemCount: 1,
		emptyIllustration: '',
		emptyLabel: 'Votre recherche ne donne aucun résultat.',
		emptyResetLabel: 'Réinitialiser les filtres',
	},
};
