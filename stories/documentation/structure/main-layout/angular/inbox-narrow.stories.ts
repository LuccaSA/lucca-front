import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxDetailComponent,
	ApprobationInboxDetailsMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxHeaderComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DialogCloseDirective, DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, DialogOpenDirective } from '@lucca-front/ng/dialog';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta, moduleMetadata } from '@storybook/angular';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentOverflowing: boolean;
	repeatContent: number;
	repeatOverflow: number;
}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/Inbox/Narrow',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [
				ButtonComponent,
				ResourceCardComponent,
				ResourceCardLinkComponent,
				ResourceCardWrapperComponent,
				IconComponent,
				CheckboxInputComponent,
				FormFieldComponent,
				FormsModule,
				DividerComponent,
				CalloutComponent,
				FilterBarComponent,
				FilterPillAddonAfterDirective,
				FilterPillAddonBeforeDirective,
				FilterPillComponent,
				SegmentedControlComponent,
				SegmentedControlFilterComponent,
				NumericBadgeComponent,
				ApprobationInboxDetailsMainBlockComponent,
				ApprobationInboxListComponent,
				ApprobationInboxGroupComponent,
				ApprobationInboxItemComponent,
				ApprobationInboxLinkComponent,
				ApprobationInboxButtonComponent,
				ApprobationInboxDetailComponent,
				ApprobationInboxHeaderComponent,
				ContainerComponent,
				ListingComponent,
				ListingItemComponent,
				LuUserPictureComponent,
				LuTooltipTriggerDirective,
				DialogComponent,
				DialogHeaderComponent,
				DialogFooterComponent,
				DialogOpenDirective,
				DialogContentComponent,
				DialogCloseDirective,
				DialogDismissDirective,
				FormComponent,
				LuDropdownTriggerDirective,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
			],
		}),
	],
	render: (args: MainLayoutHTMLBasicStory) => {
		return {
			template: `<button luButton type="button" [luDialogOpen]="approbationInboxDetailsTpl" [luDialogConfig]="{ surfaceDefault: true, size: 'maxContent', mode: 'sheet'}">
	Approbation inbox details
</button>
<ng-template #approbationInboxDetailsTpl>
	<lu-dialog #dialog>
		<form luForm>
			<lu-dialog-header>
				<h1>Abscence à approuver</h1>
			</lu-dialog-header>
			<lu-dialog-content>
				<lu-approbation-inbox-detail>
					<lu-approbation-inbox-detail-header approbationInboxDetailHeader label="Lorem ispum dolor" delegation="Délégué par Marie Bragoulet">
						<lu-user-picture size="L" approbationInboxDetailIllustration />
						<lu-listing inline divider>
							<lu-listing-item>Lorem ipsum</lu-listing-item>
							<lu-listing-item>Dolor sit amet</lu-listing-item>
						</lu-listing>
					</lu-approbation-inbox-detail-header>
					<lu-callout state="warning">
						<p>Callout feedback description</p>
					</lu-callout>
					<lu-approbation-inbox-details-main-block label="Sit amet">
						Dolor sit amet
					</lu-approbation-inbox-details-main-block>
					<lu-approbation-inbox-details-main-block label="Sit amet">
						Dolor sit amet
					</lu-approbation-inbox-details-main-block>
					<lu-approbation-inbox-details-main-block label="Sit amet">
						Dolor sit amet
					</lu-approbation-inbox-details-main-block>
					<lu-approbation-inbox-details-main-block label="Circuit d’approbation">
						Dolor sit amet
					</lu-approbation-inbox-details-main-block>
				</lu-approbation-inbox-detail>
			</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="submit" luButton luDialogClose>Approuver</button>
					<button type="button" luButton="outlined" luDialogDismiss>Refuser</button>
					<button type="button" luButton="ghost" [luDropdown]="dropdownOtherOptions">
						<lu-icon icon="menuDots" alt="Autres options" />
					</button>
					<ng-template #dropdownOtherOptions>
						<lu-dropdown-menu>
							<lu-dropdown-item>
								<button lu-dropdown-action type="button">
									Lorem
								</button>
							</lu-dropdown-item>
							<lu-dropdown-item>
								<button lu-dropdown-action type="button">
									Ipsum
								</button>
							</lu-dropdown-item>
							<lu-dropdown-item>
								<button lu-dropdown-action type="button">
									Dolor
								</button>
							</lu-dropdown-item>
						</lu-dropdown-menu>
					</ng-template>
				</div>
			</lu-dialog-footer>
		</form>
	</lu-dialog>
</ng-template>
`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
