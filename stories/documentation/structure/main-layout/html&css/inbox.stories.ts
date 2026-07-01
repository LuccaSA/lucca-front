import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxDetailsMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
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
	title: 'Documentation/Structure/Main Layout/HTML&CSS/Inbox',
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
			],
		}),
	],
	render: (args: MainLayoutHTMLBasicStory) => {
		let content = `content`;

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
				margin-inline-start: 15rem;

				&::before {
					content: '';
					position: absolute;
					inset: 0 auto auto 0;
					background-color: #192157;
					inline-size: 15rem;
					min-block-size: 296px;
					block-size: 657px;
				}
			}
		}

		.container {
			--commons-container-maxWidth: 50rem;
		}

		.approbationInbox-detail {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-50);
				margin: var(--pr-t-spacings-300);
				min-block-size: calc(100% - var(--pr-t-spacings-300) * 2);
		}

		.approbationInbox-detail-header,
		.approbationInbox-detail-main {
				padding: var(--pr-t-spacings-250);
				border-radius: var(--pr-t-border-radius-structure);
				background-color: var(--palettes-neutral-0);
		}

		.approbationInbox-detail-header {
				display: flex;
				justify-content: space-between;
				align-items: start;
		}

		.approbationInbox-detail-main {
				flex-grow: 1;
		}

		.approbationInbox-detail-header-actions {
				display: flex;
				gap: var(--pr-t-spacings-100);
				margin-block: var(--pr-t-spacings-75);
				background-color: var(--palettes-neutral-0);
				inset: auto 0 0;

				/*
				position: fixed;
				padding: 1rem;
				flex-direction: column;
				*/
		}

		.mainLayout {
			&:has(.approbationInbox-list) {
				&:has(.approbationInbox-detail) {
					.approbationInbox-detail {
						@media (min-width: 64em) {
							margin-inline-start: 0;
						}

						@media not all and (min-width: 64em) {
							display: none;
						}
					}
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
					<ng-container approbationInboxListFilterBar>
						<lu-filter-bar>
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
					</ng-container>
					<lu-approbation-inbox-group label="Group label">
						<lu-approbation-inbox-item>
							<ng-container approbationInboxListItemStart>slot start</ng-container>
							slot main with <a href="#" lu-approbation-inbox-action current>link</a>
							<ng-container approbationInboxListItemEnd>slot end</ng-container>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item center>
							<ng-container approbationInboxListItemStart>slot start</ng-container>
							slot main with <a href="#" lu-approbation-inbox-action>link</a>
							<ng-container approbationInboxListItemEnd>slot end</ng-container>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item center>
							<ng-container approbationInboxListItemStart>slot start</ng-container>
							slot main with <a href="#" lu-approbation-inbox-action>link</a>
							<ng-container approbationInboxListItemEnd>slot end</ng-container>
						</lu-approbation-inbox-item>
						<lu-approbation-inbox-item center>
						slot main with <button type="button" lu-approbation-inbox-action>button</button>
						</lu-approbation-inbox-item>
					</lu-approbation-inbox-group>
				</lu-approbation-inbox-list>
			</div>
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					<div class="approbationInbox-detail">
						<header class="approbationInbox-detail-header">
							<div>
								<h2>Bragoulet Marie</h2>
								<p>Ipsum</p>
							</div>
							<div class="approbationInbox-detail-header-actions">
								<button luButton type="button">Approuver</button>
								<button luButton="outlined" type="button">Refuser</button>
							</div>
						</header>
						<div class="approbationInbox-detail-main">
							<lu-callout state="warning">
									<p>Feedback description</p>
							</lu-callout>
							ici
						</div>
					</div>
				</div>
			</div>
		</main>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		header: false,
		headerSticky: false,
		footer: false,
		sidebar: true,
	},
};
