import { Component } from '@angular/core';
import { FooterComponent } from '@lucca-front/ng/footer';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'footer-stories',
	templateUrl: './footer.stories.html',
	imports: [FooterComponent],
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

const template: StoryFn<FooterStory> = () => ({});

export const Basic = template.bind({});
