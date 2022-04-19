import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'utilities-border-radius-stories',
	templateUrl: './border-radius.stories.html',
	styles: ['.example-box { border: 1px solid; margin: 1rem; width: 1rem; aspect-ratio: 1; float: left; }'],
})
class UBorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
	component: UBorderRadiusStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UBorderRadiusStory],
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<UBorderRadiusStory> = (args: UBorderRadiusStory) => ({
	props: args,
});

export const def = template.bind({});
