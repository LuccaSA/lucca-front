import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApprobationInboxDetailComponent, ApprobationInboxDetailMainBlockComponent, ApprobationInboxHeaderComponent } from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'approbation-inbox-detail-stories',
	templateUrl: './detail.stories.html',
	imports: [
		ApprobationInboxDetailComponent,
		ApprobationInboxHeaderComponent,
		ApprobationInboxDetailMainBlockComponent,
		CalloutComponent,
		ListingComponent,
		ListingItemComponent,
		LuUserPictureComponent,
		ButtonComponent,
		IconComponent,
		LuDropdownTriggerDirective,
		DropdownMenuComponent,
		DropdownItemComponent,
		DropdownActionComponent,
	],
	styles: [
		`
		/*
		Force the component to display, hidden by default below the M breakpoint
		*/
		.approbationInbox-detail {
			display: flex !important;
		}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApprobationInboxDetailStory {}

export default {
	title: 'QA/ApprobationInbox/Detail',
	component: ApprobationInboxDetailStory,
} as Meta;

export const Basic = {};
