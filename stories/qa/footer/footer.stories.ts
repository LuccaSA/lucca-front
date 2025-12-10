import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'footer-stories',
	templateUrl: './footer.stories.html',
})
class FooterStory {}

export default {
	title: 'QA/Footer',
	component: FooterStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FooterStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FooterStory> = {
	args: {},
	render: template,
};
