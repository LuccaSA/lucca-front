import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'footer-stories',
	templateUrl: './footer.stories.html',
}) class FooterStory {}

export default {
  title: 'QA/Footer',
  component: FooterStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FooterStory]
		})
	]
} as Meta;

const template: Story<FooterStory> = () => ({});

export const basic = template.bind({});
