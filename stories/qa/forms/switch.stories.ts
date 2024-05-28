import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-switch-stories',
	templateUrl: './switch.stories.html',
})
class SwitchStory {}

export default {
	title: 'QA/Forms/Switch',
	component: SwitchStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchStory],
		}),
	],
} as Meta;

const template: StoryFn<SwitchStory> = () => ({});

export const basic = template.bind({});
