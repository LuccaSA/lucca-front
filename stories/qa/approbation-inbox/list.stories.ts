import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxDetailComponent,
	ApprobationInboxGroupComponent,
	ApprobationInboxIcon,
	ApprobationInboxIconsComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
	ApprobationInboxSubtleComponent,
} from '@lucca-front/ng/approbation-inbox';
import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta } from '@storybook/angular-vite';

@Component({
	selector: 'approbation-inbox-list-stories',
	templateUrl: './list.stories.html',
	imports: [
		FormsModule,
		ApprobationInboxDetailComponent,
		ApprobationInboxListComponent,
		ApprobationInboxItemComponent,
		ApprobationInboxLinkComponent,
		ApprobationInboxGroupComponent,
		ApprobationInboxIconsComponent,
		ApprobationInboxSubtleComponent,
		LuUserPictureComponent,
		FilterBarComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		LuSafeExternalSvgPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApprobationInboxListStory {
	protected readonly icons: ApprobationInboxIcon[] = [
		{ icon: 'formatClipperAttachment', alt: 'Contains an attachment' },
		{ icon: 'bubbleSpeech', alt: 'Contains a comment' },
		{ icon: 'signWarning', alt: 'Contains a warning', state: 'warning' },
	];
}

export default {
	title: 'QA/ApprobationInbox/List',
	component: ApprobationInboxListStory,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
} as Meta;

export const Basic = {};
