import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: ['.demo-invert { background: #444; display: inline-block; padding: .5rem 1rem; margin: 0 .5rem; border-radius: 3px; }']
}) class LoadingsStory {}

export default {
  title: 'QA/Loadings',
  component: LoadingsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [LoadingsStory]
		})
	]
} as Meta;

const template: Story<LoadingsStory> = () => ({});

export const basic = template.bind({});
