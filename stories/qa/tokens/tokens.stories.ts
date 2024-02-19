import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<TokenStory> = () => ({});

export const basic = template.bind({});
