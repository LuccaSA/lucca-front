import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterLink } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'links-stories',
	templateUrl: './links.stories.html',
	imports: [LinkComponent, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LinksStory {}

export default {
	title: 'QA/Links',
	component: LinksStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<LinksStory> = {
	args: {},
	render: template,
};
