import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'highlight-data-stories',
	templateUrl: './highlight-data.stories.html',
	imports: [HighlightDataComponent, ButtonComponent, LinkComponent],
})
class HighlightDataStory {}

export default {
	title: 'QA/HighlightData',
	component: HighlightDataStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template: StoryFn<HighlightDataStory> = () => ({});

export const basic = template.bind({});
