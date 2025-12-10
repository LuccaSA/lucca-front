import { Component } from '@angular/core';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'plg-push-stories',
	templateUrl: './plg-push.stories.html',
	imports: [PLGPushComponent],
})
class PLGPushStory {}

export default {
	title: 'QA/PLGPush',
	component: PLGPushStory,
} as Meta;

const template: StoryFn<PLGPushStory> = () => ({});

export const basic = template.bind({});
