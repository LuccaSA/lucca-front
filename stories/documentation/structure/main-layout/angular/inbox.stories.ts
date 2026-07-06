import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxDetailComponent,
	ApprobationInboxDetailsMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
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
import { ApprobationInboxHeaderComponent } from 'packages/ng/approbation-inbox/approbation-inbox-header/approbation-inbox-header.component';

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
	title: 'Documentation/Structure/Main Layout/Angular/Inbox',
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
			],
		}),
	],
	render: (args: MainLayoutHTMLBasicStory) => {
		return {
			styles: [
				`
@layer components {
		:host {
			margin: -1rem;
			display: block;
		}

		.mainLayout {
			overflow: hidden;
			min-block-size: 296px;
			resize: vertical;
			border-bottom: 1px solid var(--palettes-neutral-200);

			@media (min-width: 64em) {
				margin-inline-start: calc(15rem / 1);

				&::before {
					content: '';
					position: absolute;
					inset: 0 auto auto 0;
					background-color: #192157;
					inline-size: calc(15rem / 1);
					block-size: 100dvh;
				}
			}
		}
	}
}
				`,
			],
			template: `

		<main role="main" class="mainLayout mod-wideM approbationInbox">
			<div class="mainLayout-sidebar">
				<lu-approbation-inbox-list label="Test" selectable>
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
					</lu-filter-bar>
					<lu-approbation-inbox-group label="Group label">
						<lu-approbation-inbox-item>
							<a href="#" lu-approbation-inbox-action current>link</a>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item>
							<a href="#" lu-approbation-inbox-action>link</a>
						</lu-approbation-inbox-item>
						<!-- TODO inbox -->
						<lu-approbation-inbox-item center>
							<lu-user-picture size="S" approbationInboxListItemStart />
							<h2 class="pr-u-h4"><a href="#" lu-approbation-inbox-action>Title</a></h2>
							<p class="pr-u-bodyS pr-u-colorTextSubtle">Metadata</p>
							<ng-container approbationInboxListItemEnd>
								<p class="pr-u-bodyM">Metadata</p>
								<p class="pr-u-displayFlex pr-u-colorTextSubtle pr-u-gap25">
									<lu-icon size="XS" class="pr-u-focusVisible pr-u-borderRadiusSmall" icon="formatClipperAttachment" alt="Contient une pièce jointe" luTooltip="Contient une pièce jointe" luTooltipOnlyForDisplay />
									<lu-icon size="XS" class="pr-u-focusVisible pr-u-borderRadiusSmall" icon="bubbleSpeech" alt="Contient un commentaire" luTooltip="Contient un commentaire" luTooltipOnlyForDisplay />
									<lu-icon size="XS" class="pr-u-textWarning" icon="signWarning" alt="Contient un avertissement" luTooltip="Contient un avertissement" luTooltipOnlyForDisplay />
								</p>
							</ng-container>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item>
							<button type="button" lu-approbation-inbox-action>button</button>
						</lu-approbation-inbox-item>
					</lu-approbation-inbox-group>
					<lu-approbation-inbox-group label="Group label">
						<lu-approbation-inbox-item>
							<a href="#" lu-approbation-inbox-action>link</a>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item>
							<a href="#" lu-approbation-inbox-action>link</a>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item>
							<a href="#" lu-approbation-inbox-action>link</a>
						</lu-approbation-inbox-item>
					</lu-approbation-inbox-group>
				</lu-approbation-inbox-list>
			</div>
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					<lu-approbation-inbox-detail>
						<lu-approbation-inbox-detail-header approbationInboxDetailHeader label="Lorem ispum dolor" delegation="Délégué par Marie Bragoulet">
							<!-- TODO inbox -->
							<lu-user-picture size="L" approbationInboxDetailStart />
							<lu-listing inline divider>
								<lu-listing-item>Lorem ipsum</lu-listing-item>
								<lu-listing-item>Dolor sit amet</lu-listing-item>
							</lu-listing>
							<ng-container approbationInboxDetailEnd>
								<button luButton="ghost" type="button">
									<lu-icon icon="menuDots" alt="Plus d’options" />
								</button>
							</ng-container>
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
				</div>
			</div>
		</main>`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
