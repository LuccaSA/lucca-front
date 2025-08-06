import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'mobile-push-stories',
	templateUrl: './mobile-push.stories.html',
})
class MobilePushStory {}

export default {
	title: 'QA/Mobile Push',
	component: MobilePushStory,
} as Meta;

const template: StoryFn<MobilePushStory> = () => ({});

export const basic = template.bind({});
