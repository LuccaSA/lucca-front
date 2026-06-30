import {
	ApprobationInboxActionComponent,
	ApprobationInboxDetailsMainBlockComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxListComponent,
} from '@lucca-front/ng/approbation-inbox';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Approbation Inbox/Angular/Basic',
	argTypes: {
		label: {
			description: '',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ApprobationInboxDetailsMainBlockComponent, ApprobationInboxListComponent, ApprobationInboxGroupComponent, ApprobationInboxItemComponent, ApprobationInboxActionComponent],
		}),
	],
	render: ({ ...args }, { argTypes }) => {
		return {
			template: `<div class="approbationInbox">
	<lu-approbation-inbox-list${generateInputs(args, argTypes)}>
		<!--
		<ng-container approbationInboxListFilterBar>Filter bar</ng-container>
		-->
		<lu-approbation-inbox-group label="Group label 1" [expanded]="true">
			<lu-approbation-inbox-item selectable center>
				<ng-container approbationInboxListItemStart>slot start</ng-container>
				slot main with <a href="#" aria-current="page" lu-approbation-inbox-action>link</a>
				<ng-container approbationInboxListItemEnd>slot end</ng-container>
			</lu-approbation-inbox-item>
			<lu-approbation-inbox-item selectable center>
				slot main with <button type="button" lu-approbation-inbox-action>button</button>
			</lu-approbation-inbox-item>
		</lu-approbation-inbox-group>
		<lu-approbation-inbox-group label="Group label 2" [expanded]="false">
			<lu-approbation-inbox-item>
				<ng-container approbationInboxListItemStart>slot start</ng-container>
				slot main with <a href="#" lu-approbation-inbox-action>link</a>
				<ng-container approbationInboxListItemEnd>slot end</ng-container>
			</lu-approbation-inbox-item>
			<lu-approbation-inbox-item>
				<ng-container approbationInboxListItemStart>slot start</ng-container>
				slot main with <a href="#" lu-approbation-inbox-action>link</a>
				<ng-container approbationInboxListItemEnd>slot end</ng-container>
			</lu-approbation-inbox-item>
		</lu-approbation-inbox-group>
	</lu-approbation-inbox-list>
	<lu-approbation-inbox-details-main-block${generateInputs(args, argTypes)}>
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
	<lu-approbation-inbox-details-main-block label="Sit amet">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
	<lu-approbation-inbox-details-main-block label="Circuit d’approbation">
		Dolor sit amet
	</lu-approbation-inbox-details-main-block>
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ApprobationInboxDetailsMainBlockComponent> = {
	args: {
		label: 'Lorem ipsum',
	},
};
