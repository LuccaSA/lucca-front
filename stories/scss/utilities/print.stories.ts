import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'utilities-print-stories',
	templateUrl: './print.stories.html',
}) class UtilitiesPrintStory {}

export default {
	title: 'SCSS/Utilities/Print',
	component: UtilitiesPrintStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UtilitiesPrintStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<UtilitiesPrintStory> = (args: UtilitiesPrintStory) => ({
	props: args,
});

export const def = template.bind({});