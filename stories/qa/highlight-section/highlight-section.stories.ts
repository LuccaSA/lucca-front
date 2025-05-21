import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'highlight-content-stories',
	templateUrl: './highlight-section.stories.html',
	imports: [HighlightSectionComponent, ButtonComponent, LinkComponent],
})
class highlightSectionStory {}

export default {
	title: 'QA/Highlight Section',
	component: highlightSectionStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template: StoryFn<highlightSectionStory> = () => ({});

export const basic = template.bind({});
