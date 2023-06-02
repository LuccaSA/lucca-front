import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
	decorators: [
		moduleMetadata({
			entryComponents: [UMinWidthStory],
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: StoryFn<UMinWidthStory> = (args: UMinWidthStory) => ({
	props: args,
});

export const basic = template.bind({});
