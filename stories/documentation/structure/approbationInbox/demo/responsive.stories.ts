import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxDetailComponent,
	ApprobationInboxDetailMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxHeaderComponent,
	ApprobationInboxIconsComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
	ApprobationInboxSubtleComponent,
} from '@lucca-front/ng/approbation-inbox';

import { CalloutComponent } from '@lucca-front/ng/callout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
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
	title: 'Documentation/Structure/Approbation Inbox/Layout/Responsive',
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
				ApprobationInboxDetailMainBlockComponent,
				ApprobationInboxListComponent,
				ApprobationInboxGroupComponent,
				ApprobationInboxItemComponent,
				ApprobationInboxLinkComponent,
				ApprobationInboxButtonComponent,
				ApprobationInboxDetailComponent,
				ApprobationInboxHeaderComponent,
				ApprobationInboxIconsComponent,
				ApprobationInboxSubtleComponent,
				ContainerComponent,
				ListingComponent,
				ListingItemComponent,
				LuUserPictureComponent,
				LuTooltipTriggerDirective,
				LuDropdownTriggerDirective,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
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
		<main role="main" class="mainLayout mod-wideM">
			<div class="mainLayout-sidebar">
				<lu-approbation-inbox-list label="Test" submitLabel="Approuver les objets" forwardLabel="Transférer les objets" selectable noResultLabel="Votre recherche ne donne aucun résultat.">
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
					</lu-filter-bar>
					<lu-approbation-inbox-list-group label="Group label">
						<lu-approbation-inbox-list-item>
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle current>link</a>
						</lu-approbation-inbox-list-item>
						<lu-approbation-inbox-list-item>
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>link</a>
						</lu-approbation-inbox-list-item>
						<lu-approbation-inbox-list-item>
							<lu-user-picture approbationInboxListItemIllustration />
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>Title</a>
							Metadata
							<ng-container approbationInboxListItemData>
								<lu-approbation-inbox-list-icons [icons]="[ { icon: 'formatClipperAttachment', alt: 'Contient une pièce jointe' }, { icon: 'bubbleSpeech', alt: 'Contient un commentaire' }, { icon: 'signWarning', alt: 'Contient un avertissement', state: 'warning' } ]" />
								Data
								<lu-approbation-inbox-list-subtle>Data</lu-approbation-inbox-list-subtle>
							</ng-container>
						</lu-approbation-inbox-list-item>
						<lu-approbation-inbox-list-item>
							<button type="button" lu-approbation-inbox-list-action approbationInboxListItemTitle>button</button>
						</lu-approbation-inbox-list-item>
					</lu-approbation-inbox-list-group>
					<lu-approbation-inbox-list-group label="Group label">
						<lu-approbation-inbox-list-item>
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>link</a>
						</lu-approbation-inbox-list-item>
						<lu-approbation-inbox-list-item>
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>link</a>
						</lu-approbation-inbox-list-item>
						<lu-approbation-inbox-list-item>
							<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>link</a>
						</lu-approbation-inbox-list-item>
					</lu-approbation-inbox-list-group>
				</lu-approbation-inbox-list>
			</div>
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					<lu-approbation-inbox-detail>
						<lu-approbation-inbox-detail-header approbationInboxDetailHeader label="Lorem ispum dolor Lorem ispum dolor Lorem ispum dolor Lorem ispum dolor" delegation="Délégué par Marie Bragoulet">
							<lu-user-picture approbationInboxDetailIllustration />
							<lu-listing inline divider>
								<lu-listing-item>Lorem ipsum</lu-listing-item>
								<lu-listing-item>Dolor sit amet</lu-listing-item>
							</lu-listing>
							<ng-container approbationInboxDetailActions>
								<button luButton type="button">Approuver</button>
								<button luButton type="button">Refuser</button>
							</ng-container>
							<ng-container approbationInboxDetailActionsMore>
								<button luButton type="button" [luDropdown]="dropdownOtherOptions">
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
							</ng-container>
						</lu-approbation-inbox-detail-header>
						<lu-callout state="warning">
							<p>Callout feedback description. </p>
						</lu-callout>
						<lu-approbation-inbox-detail-main-block label="Sit amet">
							Dolor sit amet
						</lu-approbation-inbox-detail-main-block>
						<lu-approbation-inbox-detail-main-block label="Circuit d’approbation">
							Dolor sit amet
						</lu-approbation-inbox-detail-main-block>
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
