import { ApprobationInboxDetailComponent, ApprobationInboxDetailsMainBlockComponent, ApprobationInboxHeaderComponent } from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/Detail',
	argTypes: {
		// TODO inbox
		blockCount: {
			description: '',
			control: { type: 'range', min: 1, max: 5 },
		},
		blockLabel: {
			description: '',
			if: { arg: 'blockCount', neq: 1 },
		},
		calloutLabel: {
			description: '',
			if: { arg: 'callout', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				ApprobationInboxDetailComponent,
				ApprobationInboxHeaderComponent,
				ApprobationInboxDetailsMainBlockComponent,
				ListingComponent,
				ListingItemComponent,
				CalloutComponent,
				LuUserPictureComponent,
				ButtonComponent,
				IconComponent,
				LuDropdownTriggerDirective,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
			],
		}),
	],
	render: ({ headerContent, callout, calloutLabel, blockLabel, blockCount, moreActions, illustration, ...args }, { argTypes }) => {
		const contentTpl = `
	<lu-approbation-inbox-details-main-block label="${blockLabel}">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>`;
		const calloutTpl = callout
			? `
	<lu-callout state="warning">
		<p>${calloutLabel}</p>
	</lu-callout>`
			: ``;
		const headerTpl = headerContent
			? `
		<lu-listing inline divider>
			<lu-listing-item>Lorem ipsum</lu-listing-item>
			<lu-listing-item>Dolor sit amet</lu-listing-item>
		</lu-listing>`
			: ``;
		const headerIllustrationTpl = illustration
			? `
		<lu-user-picture approbationInboxDetailIllustration />`
			: ``;
		const moreActionsTpl = moreActions
			? `
		<ng-container approbationInboxDetailActionsMore>
			<button luButton type="button" [luDropdown]="dropdownOtherOptions">
				<lu-icon icon="menuDots" alt="Autres options" />
			</button>
			<ng-template #dropdownOtherOptions>
				<lu-dropdown-menu>
					<lu-dropdown-item><button lu-dropdown-action type="button">Lorem</button></lu-dropdown-item>
					<lu-dropdown-item><button lu-dropdown-action type="button">Ipsum</button></lu-dropdown-item>
					<lu-dropdown-item><button lu-dropdown-action type="button">Dolor</button></lu-dropdown-item>
				</lu-dropdown-menu>
			</ng-template>
		</ng-container>`
			: ``;
		return {
			template: `<lu-approbation-inbox-detail>
	<lu-approbation-inbox-detail-header approbationInboxDetailHeader${generateInputs(args, argTypes)}>${headerIllustrationTpl}${headerTpl}
		<ng-container approbationInboxDetailActions>
			<button luButton type="button">Approuver</button>
			<button luButton type="button">Refuser</button>
		</ng-container>${moreActionsTpl}
	</lu-approbation-inbox-detail-header>${calloutTpl}${contentTpl.repeat(blockCount - 1)}
	<lu-approbation-inbox-details-main-block label="Circuit d’approbation">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
</lu-approbation-inbox-detail>`,
		};
	},
} as Meta;

export const Basic: StoryObj<
	ApprobationInboxHeaderComponent & { headerContent: boolean; moreActions: boolean; callout: boolean; calloutLabel: string; blockLabel: string; blockCount: number; illustration: boolean }
> = {
	args: {
		label: 'Title',
		illustration: false,
		headerContent: false,
		delegation: '',
		moreActions: false,
		callout: false,
		calloutLabel: 'Callout feedback description',
		blockCount: 1,
		blockLabel: 'Title',
	},
};
