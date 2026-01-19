import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'plg-push-stories',
	templateUrl: './plg-push.stories.html',
	imports: [PLGPushComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PLGPushStory {}

export default {
	title: 'QA/PLGPush',
	component: PLGPushStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PLGPushStory> = {
	args: {},
	render: template,
};
