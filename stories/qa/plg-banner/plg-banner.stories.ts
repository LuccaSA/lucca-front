import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'plg-banner-stories',
	templateUrl: './plg-banner.stories.html',
})
class PLGBannerStory {}

export default {
	title: 'QA/PLG Banner',
	component: PLGBannerStory,
} as Meta;

const template: StoryFn<PLGBannerStory> = () => ({});

export const basic = template.bind({});
