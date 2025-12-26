import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@lucca-front/ng/footer';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'footer-stories',
	templateUrl: './footer.stories.html',
	imports: [FooterComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FooterStory {}

export default {
	title: 'QA/Footer',
	component: FooterStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FooterStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FooterStory> = {
	args: {},
	render: template,
};
