import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'utilities-min-width-stories',
	templateUrl: './min-width.stories.html',
	styles: [`.resize {
		resize: horizontal;
		overflow: hidden;
	}`]
}) class UMinWidthStory {}

export default {
	title: 'SCSS/Utilities/MinWidth',
	component: UMinWidthStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UMinWidthStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<UMinWidthStory> = (args: UMinWidthStory) => ({
	props: args,
});

export const basic = template.bind({});