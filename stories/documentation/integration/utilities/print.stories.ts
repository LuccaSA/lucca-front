import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'utilities-print-stories',
	standalone: true,
	templateUrl: './print.stories.html',
})
class UtilitiesPrintStory {}

export default {
	title: 'Documentation/Integration/Utilities/Print',
	component: UtilitiesPrintStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UtilitiesPrintStory],
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<UtilitiesPrintStory> = (args: UtilitiesPrintStory) => ({
	props: args,
});

export const def = template.bind({});
