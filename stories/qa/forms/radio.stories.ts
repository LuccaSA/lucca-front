import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-radio-stories',
	templateUrl: './radio.stories.html',
})
class RadioStory {}

export default {
	title: 'QA/Forms/Radio',
	component: RadioStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioStory],
		}),
	],
} as Meta;

const template: StoryFn<RadioStory> = () => ({});

export const basic = template.bind({});
