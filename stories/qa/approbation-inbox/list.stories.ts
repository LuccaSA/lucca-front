import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	ApprobationInboxGroupComponent,
	ApprobationInboxIcon,
	ApprobationInboxIconsComponent,
	ApprobationInboxItemComponent,
	ApprobationInboxLinkComponent,
	ApprobationInboxListComponent,
	ApprobationInboxSubtleComponent,
} from '@lucca-front/ng/approbation-inbox';
import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { applicationConfig, Meta } from '@storybook/angular-vite';

@Component({
	selector: 'approbation-inbox-list-stories',
	templateUrl: './list.stories.html',
	imports: [
		FormsModule,
		ApprobationInboxListComponent,
		ApprobationInboxItemComponent,
		ApprobationInboxLinkComponent,
		ApprobationInboxGroupComponent,
		ApprobationInboxIconsComponent,
		ApprobationInboxSubtleComponent,
		LuUserPictureComponent,
		NumericBadgeComponent,
		FilterBarComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		ButtonComponent,
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
