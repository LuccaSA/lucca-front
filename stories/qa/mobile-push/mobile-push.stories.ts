import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'mobile-push-stories',
	templateUrl: './mobile-push.stories.html',
})
class MobilePushStory {}

export default {
	title: 'QA/MobilePush',
	component: MobilePushStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<MobilePushStory> = {
	args: {},
	render: template,
};
