import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxButtonComponent,
	ApprobationInboxDetailsMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/Basic',
	argTypes: {
		label: {
			description: '',
		},
		selectable: {
			description: '',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				ApprobationInboxDetailsMainBlockComponent,
				ApprobationInboxListComponent,
				ApprobationInboxGroupComponent,
				ApprobationInboxItemComponent,
				ApprobationInboxLinkComponent,
				ApprobationInboxButtonComponent,
				FilterBarComponent,
				FilterPillAddonAfterDirective,
				FilterPillAddonBeforeDirective,
				FilterPillComponent,
				SegmentedControlComponent,
				SegmentedControlFilterComponent,
				NumericBadgeComponent,
				FormsModule,
			],
		}),
	],
	render: ({ group, ...args }, { argTypes }) => {
		const tplGroup = group
			? `<lu-approbation-inbox-group label="Group label">
			<lu-approbation-inbox-item center>
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
		</lu-approbation-inbox-group>`
			: `<lu-approbation-inbox-item center>
			<ng-container approbationInboxListItemStart>slot start</ng-container>
			slot main with <a href="#" lu-approbation-inbox-action current>link</a>
			<ng-container approbationInboxListItemEnd>slot end</ng-container>
		</lu-approbation-inbox-item>
		<lu-approbation-inbox-item center>
			slot main with <button type="button" lu-approbation-inbox-action>button</button>
		</lu-approbation-inbox-item>
		<lu-approbation-inbox-item center>
			slot main with <button type="button" lu-approbation-inbox-action>button</button>
		</lu-approbation-inbox-item>
		<lu-approbation-inbox-item center>
			slot main with <button type="button" lu-approbation-inbox-action>button</button>
		</lu-approbation-inbox-item>`;
		return {
			template: `<div class="approbationInbox">
	<lu-approbation-inbox-list${generateInputs(args, argTypes)}>
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
		${tplGroup}
	</lu-approbation-inbox-list>
	<!--
	<lu-approbation-inbox-details-main-block label="Sit amet">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
	<lu-approbation-inbox-details-main-block label="Sit amet">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
	<lu-approbation-inbox-details-main-block label="Circuit d’approbation">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
	-->
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ApprobationInboxListComponent & { group: boolean }> = {
	args: {
		label: 'Lorem ipsum',
		selectable: false,
		group: false,
	},
};
