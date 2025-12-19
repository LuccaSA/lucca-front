import { IconsList } from '@/stories/icons-list';
import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
	imports: [IconComponent],
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
