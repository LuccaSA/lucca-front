import { Component } from '@angular/core';
import { ɵIconsList } from '@lucca-front/icons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
})
class IconStory {
	icons = ɵIconsList;
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
