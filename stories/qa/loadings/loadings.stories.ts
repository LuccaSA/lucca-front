import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: ['.demo-invert { background: #444; display: inline-block; padding: var(--spacings-XS) var(--spacings-S); margin: 0 var(--spacings-XS); border-radius: 3px; }'],
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

const template: StoryFn<LoadingsStory> = () => ({});

export const basic = template.bind({});
