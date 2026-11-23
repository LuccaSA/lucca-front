import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@lucca-front/ng/link';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

@Component({
	selector: 'plg-push-stories',
	templateUrl: './plg-push.stories.html',
	imports: [PLGPushComponent, LinkComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PLGPushStory {
	protected readonly cdnUrl = CDN_URL;
}

export default {
	title: 'QA/PLGPush',
	component: PLGPushStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PLGPushStory> = {
	args: {},
	render: template,
};
