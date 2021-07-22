import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'forms-framed-stories',
	templateUrl: './framed.stories.html'
}) class FramedStory {}

export default {
  title: 'QA/Forms/Framed',
  component: FramedStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FramedStory]
		})
	]
} as Meta;

const template: Story<FramedStory> = () => ({});

export const basic = template.bind({});
