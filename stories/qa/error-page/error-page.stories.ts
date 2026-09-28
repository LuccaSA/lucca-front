import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'error-page-stories',
	templateUrl: './error-page.stories.html',
	imports: [ErrorPageComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ErrorPageStory {}

export default {
	title: 'QA/ErrorPage',
	component: ErrorPageStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ErrorPageStory> = {
	args: {},
	render: template,
};
