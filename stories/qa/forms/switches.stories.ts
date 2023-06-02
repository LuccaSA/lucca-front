import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-switches-stories',
	templateUrl: './switches.stories.html',
})
class SwitchesStory {}

export default {
	title: 'QA/Forms/Switches',
	component: SwitchesStory,
} as Meta;

const template: StoryFn<SwitchesStory> = () => ({});

export const basic = template.bind({});
