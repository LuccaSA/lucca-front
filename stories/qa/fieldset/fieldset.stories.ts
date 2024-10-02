import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'fieldset-stories',
	templateUrl: './fieldset.stories.html',
})
class fieldsetStory {}

export default {
	title: 'QA/fieldset',
	component: fieldsetStory,
} as Meta;

const template: StoryFn<fieldsetStory> = () => ({});

export const basic = template.bind({});
