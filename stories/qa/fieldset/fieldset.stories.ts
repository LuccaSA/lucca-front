import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<fieldsetStory> = {
	args: {},
	render: template,
};
