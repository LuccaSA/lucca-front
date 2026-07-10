import { ApprobationInboxDetailComponent, ApprobationInboxDetailMainBlockComponent, ApprobationInboxHeaderComponent } from '@lucca-front/ng/approbation-inbox';
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
	// TODO inbox: descriptions
	argTypes: {
		blockCount: {
			description: '',
			control: { type: 'range', min: 0, max: 5 },
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
				ApprobationInboxDetailMainBlockComponent,
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
	render: ({ insideDialog, headerContent, callout, calloutLabel, blockLabel, blockCount, moreActions, illustration, ...args }, { argTypes }) => {
		const insideDialogParam = insideDialog ? ` insideDialog` : ``;
		const contentTpl = `
	<lu-approbation-inbox-detail-main-block label="${blockLabel}">
		Dolor sit amet
	</lu-approbation-inbox-detail-main-block>`;
		const calloutTpl = callout
			? `
	<lu-callout state="warning">
		<p>${calloutLabel}</p>
	</lu-callout>`
			: ``;
		const headerContentTpl = headerContent
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
		const headerTpl =
			blockCount != 0
				? `
	<lu-approbation-inbox-detail-header approbationInboxDetailHeader${generateInputs(args, argTypes)}>${headerIllustrationTpl}${headerContentTpl}
		<ng-container approbationInboxDetailActions>
			<button luButton type="button">Approuver</button>
			<button luButton type="button">Refuser</button>
		</ng-container>${moreActionsTpl}
	</lu-approbation-inbox-detail-header>`
				: ``;
		const contentDefaultTpl =
			blockCount != 0
				? `
	<lu-approbation-inbox-detail-main-block label="Circuit d’approbation">
		Dolor sit amet
	</lu-approbation-inbox-detail-main-block>`
				: ``;
		return {
			template: `<lu-approbation-inbox-detail${insideDialogParam}>${headerTpl}${calloutTpl}${contentTpl.repeat(blockCount - 1 < 0 ? 0 : blockCount - 1)}${contentDefaultTpl}
</lu-approbation-inbox-detail>`,
		};
	},
} as Meta;

export const Basic: StoryObj<
	ApprobationInboxHeaderComponent & {
		insideDialog: boolean;
		headerContent: boolean;
		moreActions: boolean;
		callout: boolean;
		calloutLabel: string;
		blockLabel: string;
		blockCount: number;
		illustration: boolean;
	}
> = {
	args: {
		insideDialog: false,
		label: 'Title',
		illustration: false,
		headerContent: false,
		delegation: '',
		moreActions: false,
		callout: false,
		calloutLabel: 'Callout feedback description. ',
		blockLabel: 'Title',
		blockCount: 1,
	},
};
