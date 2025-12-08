import { Component } from '@angular/core';
import { LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: [
		'.loading::after { animation-play-state: paused; } .demo-invert { background: #444; display: inline-block; padding-block: var(--pr-t-spacings-100); padding-inline: var(--pr-t-spacings-200); margin-block: 0; margin-inline: var(--pr-t-spacings-100); border-radius: var(--pr-t-border-radius-50); }',
	],
	imports: [LoadingComponent],
})
class LoadingsStory {}

export default {
	title: 'QA/Loadings',
	component: LoadingsStory,
} as Meta;

const template: StoryFn<LoadingsStory> = () => ({});

export const basic = template.bind({});
