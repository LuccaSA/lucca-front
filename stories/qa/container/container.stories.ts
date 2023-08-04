import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'container-stories',
	templateUrl: './container.stories.html',
})
class ContainerStory {}

export default {
	title: 'QA/Container',
	component: ContainerStory,
} as Meta;

const template: StoryFn<ContainerStory> = () => ({});

export const basic = template.bind({});
