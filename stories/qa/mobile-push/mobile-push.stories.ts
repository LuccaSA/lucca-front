import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

@Component({
	selector: 'mobile-push-stories',
	templateUrl: './mobile-push.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MobilePushStory {
	protected readonly cdnUrl = CDN_URL;
}

export default {
	title: 'QA/MobilePush',
	component: MobilePushStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<MobilePushStory> = {
	args: {},
	render: template,
};
