import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'notchbox-stories',
	templateUrl: './notch-box.stories.html',
}) class NotchBoxStory { }

export default {
	title: 'QA/NotchBox',
	component: NotchBoxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NotchBoxStory]
		})
	]
} as Meta;

const template: StoryFn<NotchBoxStory> = () => ({});

export const basic = template.bind({});