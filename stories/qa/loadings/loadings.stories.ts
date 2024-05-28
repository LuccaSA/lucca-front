import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: ['.demo-invert { background: #444; display: inline-block; padding: var(--pr-t-spacings-100) var(--pr-t-spacings-200); margin: 0 var(--pr-t-spacings-100); border-radius: 3px; }'],
})
class LoadingsStory {}

export default {
	title: 'QA/Loadings',
	component: LoadingsStory,
} as Meta;

const template: StoryFn<LoadingsStory> = () => ({});

export const basic = template.bind({});
