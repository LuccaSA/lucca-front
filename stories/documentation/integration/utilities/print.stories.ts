import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'utilities-print-stories',
	standalone: true,
	templateUrl: './print.stories.html',
})
class UtilitiesPrintStory {}

export default {
	title: 'Documentation/Integration/Utilities/Print',
	component: UtilitiesPrintStory,
} as Meta;

const template: StoryFn<UtilitiesPrintStory> = (args) => ({
	props: args,
});

export const def = template.bind({});
