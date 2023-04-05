import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

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

const template: Story<NotchBoxStory> = () => ({});

export const basic = template.bind({});