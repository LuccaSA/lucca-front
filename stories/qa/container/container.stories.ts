import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'container-stories',
	templateUrl: './container.stories.html',
}) class ContainerStory {}

export default {
  title: 'QA/Container',
  component: ContainerStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ContainerStory]
		})
	]
} as Meta;

const template: Story<ContainerStory> = () => ({});

export const basic = template.bind({});
