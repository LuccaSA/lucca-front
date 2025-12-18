import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'tokens-stories',
	templateUrl: './tokens.stories.html',
})
class TokenStory {}

export default {
	title: 'QA/Token',
	component: TokenStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TokenStory> = {
	args: {},
	render: template,
};
