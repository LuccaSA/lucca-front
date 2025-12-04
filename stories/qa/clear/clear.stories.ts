import { Component } from '@angular/core';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'clear-stories',
	templateUrl: './clear.stories.html',
})
class ClearStory {}

export default {
	title: 'QA/Clear',
	component: ClearStory,
} as Meta;

export const Basic = {};
