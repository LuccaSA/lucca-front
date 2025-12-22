import { Component } from '@angular/core';
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'fancy-box-stories',
	templateUrl: './fancy-box.stories.html',
	imports: [FancyBoxComponent],
})
class FancyBoxStory {}

export default {
	title: 'QA/FancyBox',
	component: FancyBoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FancyBoxStory> = {
	args: {},
	render: template,
};
