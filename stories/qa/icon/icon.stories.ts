import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconsList } from '@lucca-front/icons/icons-list';

@Component({
	standalone: true,
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
	imports: [NgForOf],
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
