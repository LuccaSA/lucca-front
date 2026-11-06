import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'loadings-stories',
	templateUrl: './loadings.stories.html',
	styles: [
		`
			.loading::after {
				animation-play-state: paused;
			}
			.demo-QAtable {
				inline-size: 100%;
				table-layout: fixed;
			}
			.demo-QAtable td:first-child {
				inline-size: 12rem;
			}
		`,
	],
	imports: [LoadingComponent],
	providers: [{ provide: LOCALE_ID, useValue: 'en' }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoadingsStory {}

export default {
	title: 'QA/Loadings',
	component: LoadingsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<LoadingsStory> = {
	args: {},
	render: template,
};
