import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'box-stories',
	templateUrl: './box.stories.html',
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [BoxStory],
		}),
	],
} as Meta;

const template: Story<BoxStory> = () => ({});

export const basic = template.bind({});
