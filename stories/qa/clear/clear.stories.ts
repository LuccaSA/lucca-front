import { Component } from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'clear-stories',
	templateUrl: './clear.stories.html',
	imports: [ClearComponent],
})
class ClearStory {}

export default {
	title: 'QA/Clear',
	component: ClearStory,
} as Meta;

const template = () => ({});

export const basic: StoryObj<ClearStory> = {
	args: {},
	render: template,
};
