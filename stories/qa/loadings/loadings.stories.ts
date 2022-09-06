import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: ['.demo-invert { background: #444; display: inline-block; padding: var(--spacings-smaller) var(--spacings-small); margin: 0 var(--spacings-smaller); border-radius: 3px; }'],
})
class LoadingsStory {}

export default {
	title: 'QA/Loadings',
	component: LoadingsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [LoadingsStory],
		}),
	],
} as Meta;

const template: Story<LoadingsStory> = () => ({});

export const basic = template.bind({});
