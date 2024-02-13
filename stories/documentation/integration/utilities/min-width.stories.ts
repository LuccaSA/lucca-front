import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'utilities-min-width-stories',
	standalone: true,
	templateUrl: './min-width.stories.html',
	styles: [
		`
			.resize {
				resize: horizontal;
				overflow: hidden;
			}
		`,
	],
})
class UMinWidthStory {}

export default {
	title: 'Documentation/Integration/Utilities/MinWidth',
	component: UMinWidthStory,
} as Meta;

const template: StoryFn<UMinWidthStory> = (args) => ({
	props: args,
});

export const basic = template.bind({});
