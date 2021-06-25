import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'utilities-border-radius-stories',
	templateUrl: './border-radius.stories.html',
	styles: ['.example-box { border: 2px black solid }']
}) class UBorderRadiusStory {
}

export default {
	title: 'SCSS/Utilities/BorderRadius',
	component: UBorderRadiusStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UBorderRadiusStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<UBorderRadiusStory> = (args: UBorderRadiusStory) => ({
	props: args,
});

export const def = template.bind({});
