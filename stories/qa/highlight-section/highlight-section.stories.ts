import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'highlight-section-stories',
	templateUrl: './highlight-section.stories.html',
	imports: [HighlightSectionComponent, LuSafeExternalSvgPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HighlightSectionStory {}

export default {
	title: 'QA/HighlightSection',
	component: HighlightSectionStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<HighlightSectionStory> = {
	args: {},
	render: template,
};
