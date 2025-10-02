import { Component } from '@angular/core';
import { IconsList } from '@lucca-front/icons/icons-list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
})
class IconStory {
	icons = IconsList;
}

export default {
	title: 'QA/Icon',
	component: IconStory,
	decorators: [
		moduleMetadata({
			entryComponents: [IconStory],
		}),
	],
} as Meta;

export const Template: StoryObj<IconStory> = {};
