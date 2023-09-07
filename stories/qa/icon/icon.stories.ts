import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import * as icons from '@lucca-front/icons';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
	imports: [NgForOf],
})
class IconStory {
	icons: readonly string[] = icons.default;
	public camelize(str): string {
		let arr = str.split('_');
		let capital = arr.map((item, index) => (index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()));
		return capital.join('');
	}
}

export default {
	title: 'QA/Icon',
	component: IconStory,
} as Meta;

const template: StoryFn<IconStory> = () => ({});

export const basic = template.bind({});
