import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'notchedbox-stories',
	templateUrl: './notched-box.stories.html',
}) class NotchedBoxStory { }

export default {
	title: 'QA/NotchedBox',
	component: NotchedBoxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NotchedBoxStory]
		})
	]
} as Meta;

const template: Story<NotchedBoxStory> = () => ({});

export const basic = template.bind({});