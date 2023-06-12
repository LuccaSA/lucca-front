import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'typography-stories',
	templateUrl: './typography.stories.html',
}) class TypographyStory {}

export default {
  title: 'QA/Typography',
  component: TypographyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TypographyStory]
		})
	]
} as Meta;

const template: Story<TypographyStory> = () => ({});

export const basic = template.bind({});
